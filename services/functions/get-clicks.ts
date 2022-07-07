import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const getParams = {
    TableName: process.env.tableName,
    Key: {
      counter: 'clicks',
    },
  };
  const results = await dynamoDb.get(getParams).promise();

  let count = await results.Item ? results.Item.tally : 0;

  return {
    statusCode: 200,
    body: count,
  };
};

