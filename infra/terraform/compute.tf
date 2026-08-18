data "archive_file" "inquiries_lambda" {
  type        = "zip"
  source_file = "${path.module}/../../dist/lambda/inquiries/index.cjs"
  output_path = "${path.module}/../../dist/lambda/inquiries/function.zip"
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "inquiries_lambda" {
  name               = "${local.name_prefix}-inquiry-api"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.inquiries_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "inquiries_lambda_access" {
  statement {
    sid = "StoreInquiries"

    actions = [
      "dynamodb:PutItem",
    ]

    resources = [
      aws_dynamodb_table.inquiries.arn,
    ]
  }

  statement {
    sid = "PublishOwnerNotifications"

    actions = [
      "sns:Publish",
    ]

    resources = [
      aws_sns_topic.owner_notifications.arn,
    ]
  }

  statement {
    sid = "UseSNSEncryptionKey"

    actions = [
      "kms:Decrypt",
      "kms:GenerateDataKey",
    ]

    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["sns.${var.aws_region}.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "inquiries_lambda_access" {
  name   = "${local.name_prefix}-inquiry-api-access"
  role   = aws_iam_role.inquiries_lambda.id
  policy = data.aws_iam_policy_document.inquiries_lambda_access.json
}

resource "aws_cloudwatch_log_group" "inquiries_lambda" {
  name              = "/aws/lambda/${local.name_prefix}-inquiry-api"
  retention_in_days = 14
}

resource "aws_lambda_function" "inquiries" {
  function_name = "${local.name_prefix}-inquiry-api"
  description   = "Validates and stores Ghost Auto Detailing inquiries."
  role          = aws_iam_role.inquiries_lambda.arn
  runtime       = "nodejs22.x"
  handler       = "index.handler"

  filename         = data.archive_file.inquiries_lambda.output_path
  source_code_hash = data.archive_file.inquiries_lambda.output_base64sha256

  memory_size = 256
  timeout     = 10

  environment {
    variables = {
      DYNAMODB_INQUIRIES_TABLE = aws_dynamodb_table.inquiries.name
      SNS_TOPIC_ARN            = aws_sns_topic.owner_notifications.arn
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.inquiries_lambda,
    aws_iam_role_policy.inquiries_lambda_access,
    aws_iam_role_policy_attachment.lambda_basic_execution,
  ]
}