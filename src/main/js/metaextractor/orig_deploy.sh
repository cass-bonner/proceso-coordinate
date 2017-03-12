sed -i '' -e s/CodeUri:.*$/CodeUri:/g cf/DEV-ExtractMeta.yaml
aws cloudformation package --template-file cf/DEV-ExtractMeta.yaml --output-template-file cf/DEV-ExtractMeta.yaml --s3-bucket proceso-deployments-8927459
aws cloudformation deploy --template-file cf/DEV-ExtractMeta.yaml --stack-name captureandcorrelate 
