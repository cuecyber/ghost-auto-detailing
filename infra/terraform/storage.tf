resource "aws_dynamodb_table" "inquiries" {
  name         = "${local.name_prefix}-inquiries"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "inquiryId"

  attribute {
    name = "inquiryId"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  deletion_protection_enabled = true

  tags = {
    DataClassification = "CustomerPII"
  }
}