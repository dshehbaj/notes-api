import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: "123",
      noteId: event.pathParameters.id
    },
    UpdateExpression: "SET attachment = :attachment, content = :content",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    ReturnValues: "ALL_NEW"
  };

  const result = await dynamoDb.update(params);
  //return { status: true, result };
  return JSON.stringify(result);
});
