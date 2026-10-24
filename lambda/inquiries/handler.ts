import { randomUUID } from "node:crypto";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

import { documentClient, inquiriesTableName } from "../../lib/dynamodb";
import { inquirySchema } from "../../lib/inquiry-schema";
import { notifyOwner } from "../../lib/notify-owner";

function jsonResponse(
  statusCode: number,
  body: Record<string, unknown>,
): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function createReferenceNumber() {
  const year = new Date().getFullYear();
  const code = randomUUID().split("-")[0].toUpperCase();

  return `GAD-${year}-${code}`;
}

export async function handler(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> {
  try {
    if (event.requestContext.http.method !== "POST") {
      return jsonResponse(405, {
        message: "Method not allowed.",
      });
    }

    const rawBody = event.body
      ? event.isBase64Encoded
        ? Buffer.from(event.body, "base64").toString("utf8")
        : event.body
      : "";

    if (Buffer.byteLength(rawBody, "utf8") > 20_000) {
      return jsonResponse(413, {
        message: "The inquiry is too large.",
      });
    }

    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return jsonResponse(400, {
        message: "The inquiry must contain valid JSON.",
      });
    }

    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      return jsonResponse(400, {
        message: "Please review the inquiry information.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { website, formStartedAt, ...customerInquiry } = result.data;

    if (website) {
      return jsonResponse(400, {
        message: "Unable to submit the inquiry.",
      });
    }

    const completionTime = Date.now() - formStartedAt;

    if (completionTime < 1_500) {
      return jsonResponse(429, {
        message: "Please wait before submitting the inquiry.",
      });
    }

    const now = new Date().toISOString();
    const inquiryId = randomUUID();
    const referenceNumber = createReferenceNumber();

    const inquiry = {
      inquiryId,
      referenceNumber,
      ...customerInquiry,
      status: "NEW",
      createdAt: now,
      updatedAt: now,
    };

    await documentClient.send(
      new PutCommand({
        TableName: inquiriesTableName,
        Item: inquiry,
        ConditionExpression: "attribute_not_exists(inquiryId)",
      }),
    );

    try {
      await notifyOwner({
        referenceNumber,
        firstName: customerInquiry.firstName,
        phone: customerInquiry.phone,
        vehicleYear: customerInquiry.vehicleYear,
        vehicle: customerInquiry.vehicle,
        requestedService: customerInquiry.requestedService,
        conditions: customerInquiry.conditions,
        details: customerInquiry.details,
        zipCode: customerInquiry.zipCode,
        utilities: customerInquiry.utilities,
        contactConsent: customerInquiry.contactConsent,
      });
    } catch (notificationError) {
      console.error("Owner notification failed", {
        referenceNumber,
        errorName:
          notificationError instanceof Error
            ? notificationError.name
            : "UnknownError",
      });
    }

    console.info("Inquiry created", {
      referenceNumber,
      status: inquiry.status,
    });

    return jsonResponse(201, {
      message: "Your inquiry was received.",
      referenceNumber,
    });
  } catch (error) {
    console.error("Failed to create inquiry", {
      errorName: error instanceof Error ? error.name : "UnknownError",
      errorMessage:
        error instanceof Error ? error.message : "No error message available",
    });

    return jsonResponse(500, {
      message: "We could not submit your inquiry. Please try again.",
    });
  }
}
