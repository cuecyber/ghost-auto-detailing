variable "aws_region" {
  description = "AWS Region used for Ghost infrastructure."
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "production"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be development, staging, or production."
  }
}

variable "owner_notification_email" {
  description = "Email address that receives new-inquiry notifications."
  type        = string
  sensitive   = true

  validation {
    condition     = can(regex("^[^@]+@[^@]+\\.[^@]+$", var.owner_notification_email))
    error_message = "Owner notification email must be a valid email address."
  }
}
variable "allowed_origins" {
  description = "Browser origins allowed to submit inquiries."
  type        = list(string)

  default = [
    "http://localhost:3000",
    "https://main.d2k6n4jnju5mq7.amplifyapp.com",
  ]
}