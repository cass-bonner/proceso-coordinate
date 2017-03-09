aws cloudformation package --template-file InvokeImgStepFunction.yaml --output-template-file InvokeImgStepFunction.yaml --s3-bucket proceso-deployments-8927459
aws cloudformation deploy --template-file InvokeImgStepFunction.yaml --stack-name invokeimgstepfunction 
