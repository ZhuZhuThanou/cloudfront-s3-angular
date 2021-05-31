# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Environment
The stack uses S3_BUCKET_NAME environment variable to get its S3 bucket name.
S3_BUCKET_NAME = 'YOUR BUCKET NAME'

## Structure
/lib - this contains the code to specify the infrastructure stack. cloudfront-s3-angular.ts file contains the creation of the S3 bucket and CloudFront distribution.

/web-app/app is the folder that contains the Angular web app. It contains the default NG app.

