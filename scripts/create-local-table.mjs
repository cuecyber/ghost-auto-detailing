import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  waitUntilTableExists,
} from "@aws-sdk/client-dynamodb";

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

async function tableExists() {
  try {
    await client.send(
      new DescribeTableCommand({
        TableName: tableName,
      }),
    );

    return true;
  } catch (error) {
    if (error.name === "ResourceNotFoundException") {
      return false;
    }

    throw error;
  }
}

async function createTable() {
  if (await tableExists()) {
    console.log(`Table already exists: ${tableName}`);
    return;
  }

  console.log(`Creating table: ${tableName}`);

  await client.send(
    new CreateTableCommand({
      TableName: tableName,
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        {
          AttributeName: "inquiryId",
          AttributeType: "S",
        },
        {
          AttributeName: "status",
          AttributeType: "S",
        },
        {
          AttributeName: "createdAt",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "inquiryId",
          KeyType: "HASH",
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "status-createdAt-index",
          KeySchema: [
            {
              AttributeName: "status",
              KeyType: "HASH",
            },
            {
              AttributeName: "createdAt",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
        },
      ],
    }),
  );

  await waitUntilTableExists(
    {
      client,
      maxWaitTime: 30,
    },
    {
      TableName: tableName,
    },
  );

  console.log(`Table is ready: ${tableName}`);
}

createTable()
  .catch((error) => {
    console.error("Failed to create the local inquiry table.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.destroy();
  });
