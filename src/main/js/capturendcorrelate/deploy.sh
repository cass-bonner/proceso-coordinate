aws cloudformation package --template-file CaptureAndCorrelate.yaml --output-template-file CaptureAndCorrelate.yaml --s3-bucket proceso-deployments-8927459
aws cloudformation deploy --template-file CaptureAndCorrelate.yaml --stack-name captureandcorrelate 
