aws cloudformation package --template-file DetermineProcessor.yaml --output-template-file DetermineProcessor.yaml --s3-bucket proceso-deployments-8927459
aws cloudformation deploy --template-file DetermineProcessor.yaml --stack-name determineprocessor
