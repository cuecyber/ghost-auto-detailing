import { randomUUID } from "node:crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

import {
  documentClient,
  inquiriesTableName,
} from "@/lib/dynamodb";
import { inquirySchema } from "@/lib/inquiry-schema";

export const runtime = "nodejs";

function createReferenceNumber() {
  const year = new Date().getFullYear();
  const code = randomUUID().split("-")[0].toUpperCase();

  return `GAD-${year}-${code}`;
}

export async function POST(request: Request) {
  try {
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

    const now = new Date().toISOString();
    const inquiryId = randomUUID();
    const referenceNumber = createReferenceNumber();

    const inquiry = {
      inquiryId,
      referenceNumber,
      ...result.data,
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