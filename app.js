const AWS = require('aws-sdk');

const fs = require('fs');

const credentials = require('./keys');


AWS.config.update({

accesskeyId: credentials.aws_access_key_id,

secretAccessKey: credentials.aws_secret_access_key,

region: 'sa-east-1'

});

const s3 = new AWS.S3();

const folder = './files/';

let filesArr = [];



(async function() {

fs.readdirSync(folder).forEach(async file =>{

await filesArr.push(file);

});


for(file of filesArr){

let data = fs.readFileSync(`${folder}${file}`);

const base64data = new Buffer(data, 'binary');

const params = {

Bucket: "my-test-bucket-mo9fdlvy69",

Key: file, 

Body: base64data

}
s3PutObject(params, file);
}

}());

async function s3PutObject(params,receivedFile){

await s3.putObject(params, async (err, responseData) =>{

if (err){

console.log(err);

}

else{

console.log(responseData);

console.log("Dados enviados com sucesso para o s3");

await fs.unlinkSync(`${folder}${receivedFile}`);

}

});

}