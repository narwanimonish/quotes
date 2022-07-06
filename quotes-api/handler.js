const AWS = require('aws-sdk');
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const { quotes } = require('./quotes-db');

const app = express();
app.use(cors());

const QUOTES_TABLE = process.env.DYNAMODB_QUOTES_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get('/quote', async function (req, res) {
  const randomKey = Math.floor(Math.random() * 1700);
  const params = {
    TableName: QUOTES_TABLE,
    Key: {
      id: randomKey,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { id, quote } = Item;
      res.json({ id, quote });
    } else {
      res.status(404).json({ error: 'Could not find user with provided' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not retreive user' });
  }
});

app.get('/quotes-import', async function (req, res) {
  let itemCnt = 0;
  let chunkSize = 10;
  for (let i = 0; i < quotes.length; i += chunkSize) {
    const chunk = quotes.slice(i, i + chunkSize);
    const params = [];
    chunk.forEach(async (q) => {
      params.push({
        PutRequest: {
          Item: {
            id: itemCnt++,
            quote: q,
          },
        },
      });
    });
    const req = {
      RequestItems: {
        quotes: params,
      },
    };
    await dynamoDbClient.batchWrite(req).promise();
  }

  return {
    statusCode: 201,
    count: itemCnt,
  };
});

// app.post('/users', async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== 'string') {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== 'string') {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.put(params).promise();
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Could not create user' });
//   }
// });

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports.handler = serverless(app);
