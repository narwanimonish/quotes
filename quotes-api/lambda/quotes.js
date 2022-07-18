const { DynamoDB } = require('aws-sdk');
const { random } = require('./helpers/random');
const { response } = require('./helpers/response');

exports.handler = async function (event) {
  const dynamo = new DynamoDB();

  // Todo Replace 1700 with env variable
  const randomKey = random(process.env.MAX_QUOTES);

  const params = {
    TableName: process.env.QUOTES_TABLE_NAME,
    Key: {
      id: {
        N: '1',
      },
    },
  };

  try {
    const { Item } = await dynamo.getItem(params).promise();
    console.log(Item);
    if (Item) {
      return response(200, Item);
    } else {
      return response(404, { error: 'Could not find quote with provided id' });
    }
  } catch (error) {
    console.error(error);
    return response(500, { error: 'Could not retreive user' });
  }
};
