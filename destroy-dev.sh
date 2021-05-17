#!/bin/bash

echo "Destroy Started"

echo "Extracting Serverless Outputs..."
export S3_BUCKET_NAME=$(serverless info --verbose | grep S3BucketName | sed s/S3BucketName\:\ //g)

echo "Removing files from S3 bucket..."
aws s3 rm --recursive s3://${S3_BUCKET_NAME}

echo "Removing Serverless Stack..."
sls remove
echo "======== Destroy Successful ========"