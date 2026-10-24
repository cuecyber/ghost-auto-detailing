import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

type OwnerNotification = {
  referenceNumber: string;
  firstName: string;
  phone: string;
  vehicleYear: string;
  vehicle: string;
  requestedService: string;
  conditions: string[];
  details: string;
  zipCode: string;
  utilities: string;
  contactConsent: boolean;
};

const serviceLabels: Record<string, string> = {
  refresh: "Ghost Refresh",
  detail: "Interior Detail",
  restoration: "Interior Restoration",
  recommendation: "Service recommendation requested",
};

const utilitiesLabels: Record<string, string> = {
  "water-electric": "Water and electric",
  water: "Water only",
  electric: "Electric only",
  neither: "Neither or unsure",
};

const snsClient = new SNSClient({
  region: process.env.AWS_REGION ?? "us-east-1",
});

export async function notifyOwner(inquiry: OwnerNotification) {
  const topicArn = process.env.SNS_TOPIC_ARN;

  if (!topicArn) {
    console.info("Owner notification skipped in local development", {
      referenceNumber: inquiry.referenceNumber,
    });

    return {
      sent: false,
      reason: "SNS_TOPIC_ARN is not configured",
    };
  }

  const selectedConditions =
    inquiry.conditions.length > 0
      ? inquiry.conditions.join(", ")
      : "None selected";

  const message = [
    "New Ghost Auto Detailing inquiry",
    "",
    `Reference: ${inquiry.referenceNumber}`,
    `Customer: ${inquiry.firstName}`,
    `Phone: ${inquiry.phone}`,
    `Vehicle: ${inquiry.vehicleYear} ${inquiry.vehicle}`,
    `Requested service: ${
      serviceLabels[inquiry.requestedService] ?? inquiry.requestedService
    }`,
    `Conditions: ${selectedConditions}`,
    `Details: ${inquiry.details}`,
    `Service ZIP code: ${inquiry.zipCode}`,
    `Hookups available: ${
      utilitiesLabels[inquiry.utilities] ?? inquiry.utilities
    }`,
    `Contact consent: ${inquiry.contactConsent ? "Yes" : "No"}`,
  ].join("\n");

  await snsClient.send(
    new PublishCommand({
      TopicArn: topicArn,
      Subject: `New Ghost inquiry: ${inquiry.referenceNumber}`,
      Message: message,
    }),
  );

  return {
    sent: true,
  };
}
