const { KeyPairEd25519 } = require("near-api-js/lib/utils");
const { createTransaction } = require("near-api-js/lib/transaction");

const permissions = {
    functionCall: {
        receiverId: "mockReceiverId",
        methodName: "mockMethodName",
        args: "mockArgs",
    },
};

console.log(Buffer.from(JSON.stringify(permissions)).toString("base64"));
