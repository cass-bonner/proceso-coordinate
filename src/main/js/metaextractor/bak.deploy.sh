#!/bin/bash

ENV=$1
echo "Env: "${ENV}

if [  ${ENV}x == 'x' ] 
then
  echo "Env not set setting to DEV";
  ENV="DEV";
fi

if [  ${ENV} == 'DEV' ] 
then

  echo "Creating artifact for DEV";
  FILENAME=`npm pack`
  echo "Moving ${FILENAME} to target";
  rm -rf target/*;
  #could use npm tar-to-zip 
  mv ${FILENAME} target
  BASE_FILE=`echo ${FILENAME} |sed s/.tgz//g`
  echo ${BASE_FILE}
  cd target; gzip -d *; tar -xf ${BASE_FILE}.tar; rm ${BASE_FILE}.tar
  ZIP_FILE="${BASE_FILE}.zip"
  echo "ZIP_FILE = ${ZIP_FILE}"
  zip -r $ZIP_FILE *
  cd ..
  
fi

echo List of target
ls -l target 


sed -i '' -e "s/CodeUri:.*$/CodeUri: ..\/target\/package/g" cf/${ENV}-ExtractMeta.yaml 
aws cloudformation package --template-file cf/${ENV}-ExtractMeta.yaml --output-template-file cf/S3-${ENV}-ExtractMeta.yaml --s3-bucket proceso-deployments-8927459
aws cloudformation deploy --template-file cf/S3-${ENV}-ExtractMeta.yaml --stack-name ${ENV}-extract-meta 

