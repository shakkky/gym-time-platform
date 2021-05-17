#!/bin/bash

echo "Deploy Started"

echo "Extracting environment variables..."
source setenv.sh

echo "Running tests..."
cd ./rest-api-service
jest || exit 1
cd ..

echo "Deploying Serverless Stack..."
sls deploy

echo "Extracting Serverless Outputs..."
export REACT_APP_REST_SERVICE=$(serverless info --verbose | grep ServiceEndpoint | sed s/ServiceEndpoint\:\ //g)
export S3_BUCKET_NAME=$(serverless info --verbose | grep S3BucketName | sed s/S3BucketName\:\ //g)
export CLIENT_ENDPOINT=$(serverless info --verbose | grep ClientEndpoint | sed s/ClientEndpoint\:\ //g)

echo "Compiling React Project..."
cd ./gym-time-site
rm -rf build
npm run build

echo "Syncing compiled project to S3 bucket for Static hosting..."
aws s3 sync ./build s3://${S3_BUCKET_NAME}

echo "======== Deploy Complete! ========"
echo "Client Endpoint: ${CLIENT_ENDPOINT}"
echo "=================================="