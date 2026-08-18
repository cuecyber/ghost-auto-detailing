terraform {
  backend "s3" {
    key          = "ghost-auto-detailing/production/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}