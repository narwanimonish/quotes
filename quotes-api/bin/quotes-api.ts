#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { QuotesApiStack } from '../lib/quotes-api-stack';

const app = new cdk.App();
new QuotesApiStack(app, 'QuotesApiStack');
