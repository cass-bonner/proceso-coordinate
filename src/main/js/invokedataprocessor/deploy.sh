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
  mkdir -p target
  
  #clean the target env
  rm -rf target/*;
  
  mv ${FILENAME} target
  BASE_FILE=`echo ${FILENAME} |sed s/.tgz//g`
  echo ${BASE_FILE}
  cd target; 

  gunzip -c ${FILENAME} | tar xvf -

fi

pwd
echo List of target
ls -l  

cp ../cf/${ENV}-InvokeDataProcessorStepFunction.yaml package/;
cd package 
sed -i '' -e s/CodeUri:.*$/CodeUri:/g InvokeDataProcessorStepFunction.yaml
ls -l 
pwd
aws cloudformation package --template-file ${ENV}-InvokeDataProcessorStepFunction.yaml --output-template-file S3-${ENV}-InvokeDataProcessorStepFunction.yaml --s3-bucket proceso-deployments-8927459
aws cloudformation deploy --template-file S3-${ENV}-InvokeDataProcessorStepFunction.yaml --stack-name ${ENV}-invoke-data-processor-function
cd ../../
