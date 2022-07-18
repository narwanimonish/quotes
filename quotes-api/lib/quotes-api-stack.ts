import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class QuotesApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const quoteTable = new dynamodb.Table(this, 'Quote', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
    });

    const getQuote = new lambda.Function(this, 'GetQuoteHandler', {
      runtime: lambda.Runtime.NODEJS_14_X, // execution environment
      code: lambda.Code.fromAsset('lambda'), // code loaded from "lambda" directory
      handler: 'quotes.handler', // file is "hello", function is "handler"
      environment: {
        QUOTES_TABLE_NAME: quoteTable.tableName,
        MAX_QUOTES: '1700',
      },
    });

    quoteTable.grantReadWriteData(getQuote);

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: getQuote,
    });
  }
}
