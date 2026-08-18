resource "aws_apigatewayv2_api" "inquiries" {
  name          = "${local.name_prefix}-inquiry-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.allowed_origins
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_integration" "inquiries_lambda" {
  api_id = aws_apigatewayv2_api.inquiries.id

  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.inquiries.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
  timeout_milliseconds   = 10000
}

resource "aws_apigatewayv2_route" "create_inquiry" {
  api_id = aws_apigatewayv2_api.inquiries.id

  route_key = "POST /inquiries"
  target    = "integrations/${aws_apigatewayv2_integration.inquiries_lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.inquiries.id
  name   = "$default"

  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 5
    throttling_rate_limit  = 2
  }
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.inquiries.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.inquiries.execution_arn}/*/*"
}