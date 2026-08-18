import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

type OwnerNotification = {
  referenceNumber: string;
  firstName: string;
  phone: string;
  vehicleYear: string;
  vehicle: string;
  requestedService: string;
  zipCode: string;
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

  const message = [
    "New Ghost Auto Detailing inquiry",
    "",
    `Reference: ${inquiry.referenceNumber}`,
    `Customer: ${inquiry.firstName}`,
    `Phone: ${inquiry.phone}`,
    `Vehicle: ${inquiry.vehicleYear} ${inquiry.vehicle}`,
    `Requested service: ${inquiry.requestedService}`,
    `Service ZIP code: ${inquiry.zipCode}`,
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
