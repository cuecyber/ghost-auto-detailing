# Ghost Auto Detailing

A mobile-first customer inquiry platform for Ghost Auto Detailing, an interior-detailing specialist serving Louisville, Kentucky, and surrounding areas.

## Project Purpose

Ghost Auto Detailing needs a professional online platform where customers can:

- Review detailing packages and starting prices
- Learn about mobile-service requirements
- Submit a service inquiry
- Describe their vehicle’s condition
- Receive an inquiry reference number
- Provide photographs for quote review
- Leave a verified review after completed service

The application will help reduce incomplete customer conversations, organize incoming leads, and create a repeatable workflow that can eventually support multiple detailing employees.

## Planned Features

- Mobile-first landing page
- Interior-detailing packages and add-ons
- Customer inquiry form
- Unique inquiry reference numbers
- Secure customer-information storage
- Owner notifications
- Inquiry and job-status tracking
- Before-and-after gallery
- Verified customer reviews
- PayPal-hosted invoices and digital receipts
- Apple Pay support through the payment provider

## Technology Stack

### Application

- Next.js
- React
- TypeScript
- Tailwind CSS

### AWS Infrastructure

- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon S3
- Amazon CloudFront
- Amazon CloudWatch
- Amazon Simple Notification Service or Simple Email Service

### Development and Deployment

- Docker
- DynamoDB Local
- Terraform
- GitHub
- GitHub Actions

## Security Approach

The application will collect only the customer information required to review and respond to an inquiry.

The Ghost application will not directly collect or store:

- Credit-card numbers
- Bank-account information
- Customer passwords
- Unnecessary personal information

Payments will be processed through a third-party payment provider such as PayPal.

## Current Status

Project foundation created with Next.js, TypeScript, Tailwind CSS, ESLint, App Router, and Turbopack.

The first implementation milestone is the customer-facing landing page and inquiry-form interface.

## Local Development

Install dependencies:

```bash
npm install