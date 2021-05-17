var AWS = require('aws-sdk');
AWS.config.update(process.env.STAGE === 'local' ? {
    endpoint: `${process.env.AWS_ENDPOINT}`,
    region: 'localhost',
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy'
} : {
    region: process.env.REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

const insertItem = (item) => {
    var params = {
        TableName: 'accounts',
        Item: item
    };
    return new Promise((resolve, reject) => {
        docClient.put(params, (err, data) => {
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

const updateAccountStatus = (accountId, status) => {
    var params = {
        TableName: 'accounts',
        Key: {
            accountId: accountId
        },
        UpdateExpression: "set verified = :v",
        ExpressionAttributeValues: {
            ":v" : status
        },
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
        docClient.update(params, (err, data) => {
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

module.exports = {
    insertItem,
    updateAccountStatus
}