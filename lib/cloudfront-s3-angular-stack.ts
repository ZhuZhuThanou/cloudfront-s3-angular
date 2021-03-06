import { BlockPublicAccess, Bucket } from "@aws-cdk/aws-s3";
import * as cdk from "@aws-cdk/core";
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as path from 'path';

export class CloudfrontS3AngularStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucketName = process.env.S3_BUCKET_NAME || 'cf-s3-bucket-make-me-unique';
    const bucket = new Bucket(this, bucketName, {
      versioned: false,
      bucketName: bucketName,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });
    new cloudfront.Distribution(this, `cf-s3-dist-${bucketName}`, {
      defaultBehavior: { origin: new origins.S3Origin(bucket) },
      defaultRootObject: 'index.html',
      errorResponses: [{ httpStatus:404, 
        responseHttpStatus: 200, 
        responsePagePath: '/index.html'}]
    });

    new s3deploy.BucketDeployment(this, 'deployWeb', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '..', 'web-app', 'dist'))],
      destinationBucket: bucket
    });
  }
}
