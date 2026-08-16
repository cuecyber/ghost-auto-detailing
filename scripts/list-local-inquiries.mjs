import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const tableName =
  process.env.DYNAMODB_INQUIRIES_TABLE ??
  "ghost-auto-detailing-inquiries-local";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "us-east-1",
  endpoint: process.env.DYNAMODB_ENDPOINT ?? "http://localhost:8000",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "local",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "local",
  },
});

const documentClient = DynamoDBDocumentClient.from(client);

try {
  const result = await documentClient.send(
    new ScanCommand({
      TableName: tableName,
      ProjectionExpression:
        "referenceNumber, #status, vehicle, requestedService, createdAt",
      ExpressionAttributeNames: {
        "#status": "status",
      },
    }),
  );

  console.table(result.Items ?? []);
} catch (error) {
  console.error("Failed to list local inquiries.");
  console.error(error);
  process.exitCode = 1;
} finally {
  documentClient.destroy();
}
