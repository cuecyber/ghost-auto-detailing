import { randomUUID } from "node:crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

import { documentClient, inquiriesTableName } from "@/lib/dynamodb";
import { inquirySchema } from "@/lib/inquiry-schema";
import { notifyOwner } from "@/lib/notify-owner";

export const runtime = "nodejs";

function createReferenceNumber() {
  const year = new Date().getFullYear();
  const code = randomUUID().split("-")[0].toUpperCase();

  return `GAD-${year}-${code}`;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? "0");

    if (contentLength > 20_000) {
      return NextResponse.json(
        {
          message: "The inquiry is too large.",
        },
        {
          status: 413,
        },
      );
    }
    const body: unknown = await request.json();
    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Please review the inquiry information.",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { website, formStartedAt, ...customerInquiry } = result.data;

    if (website) {
      return NextResponse.json(
        {
          message: "Unable to submit the inquiry.",
        },
        {
          status: 400,
        },
      );
    }

    const completionTime = Date.now() - formStartedAt;

    if (completionTime < 1_500) {
      return NextResponse.json(
        {
          message: "Please wait before submitting the inquiry.",
        },
        {
          status: 429,
        },
      );
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
        zipCode: customerInquiry.zipCode,
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

    return NextResponse.json(
      {
        message: "Your inquiry was received.",
        referenceNumber,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Failed to create inquiry", {
      errorName: error instanceof Error ? error.name : "UnknownError",
      errorMessage:
        error instanceof Error ? error.message : "No error message available",
    });
    return NextResponse.json(
      {
        message: "We could not submit your inquiry. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
