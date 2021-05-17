#!/bin/bash

echo "Deploy Started"

echo "Extracting environment variables..."
source setenv.sh

echo "Compiling REST services..."
cd ./rest-api-service
npm install

echo "Running tests..."
jest || exit 1

echo "Compile and test complete."
cd ..

echo "Deploying Serverless Stack..."
npm install --save serverless-functions-base-path
npm install --save serverless-iam-roles-per-function
npm install --save serverless-pseudo-parameters
npm install --save serverless-dotenv-plugin
sls deploy

echo "Extracting Serverless Outputs..."
export REACT_APP_REST_SERVICE=$(serverless info --verbose | grep ServiceEndpoint | sed s/ServiceEndpoint\:\ //g)
export S3_BUCKET_NAME=$(serverless info --verbose | grep S3BucketName | sed s/S3BucketName\:\ //g)
export CLIENT_ENDPOINT=$(serverless info --verbose | grep ClientEndpoint | sed s/ClientEndpoint\:\ //g)

echo "Compiling React Project..."
cd ./gym-time-site
npm install
rm -rf build
npm run build

echo "Syncing compiled project to S3 bucket for Static hosting..."
aws s3 sync ./build s3://${S3_BUCKET_NAME}

echo "======== Deploy Complete! ========"
echo "Client Endpoint: ${CLIENT_ENDPOINT}"
echo "=================================="