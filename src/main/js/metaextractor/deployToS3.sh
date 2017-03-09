rm target/metaextractor.zip 
zip -r target/metaextractor.zip *
aws s3 cp target/metaextractor.zip s3://proceso-deployments-8927459
