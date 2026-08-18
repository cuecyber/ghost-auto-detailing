provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "ghost-auto-detailing"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}