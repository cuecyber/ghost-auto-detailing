resource "aws_sns_topic" "owner_notifications" {
  name              = "${local.name_prefix}-owner-notifications"
  kms_master_key_id = "alias/aws/sns"
}

resource "aws_sns_topic_subscription" "owner_email" {
  topic_arn = aws_sns_topic.owner_notifications.arn
  protocol  = "email"
  endpoint  = var.owner_notification_email
}