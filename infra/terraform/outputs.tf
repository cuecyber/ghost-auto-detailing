output "inquiries_table_name" {
  description = "Name of the DynamoDB table that stores customer inquiries."
  value       = aws_dynamodb_table.inquiries.name
}

output "owner_notifications_topic_arn" {
  description = "ARN of the SNS topic used for owner notifications."
  value       = aws_sns_topic.owner_notifications.arn
}