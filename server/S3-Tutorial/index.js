const {S3Client, GetObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
dotenv.config();


const s3client = new S3Client({
    region:"ap-southeast-2",
    credentials:{
        accessKeyId:process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey:process.env.AWS_S3_SECRET_KEY
    }
});

async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket:"s3-practice-private",
        Key:key
    })
    const url = await getSignedUrl(s3client,command);
    return url;
}

async function init(){
    console.log("URL for s3-practice-private",await getObjectURL("Untitled (4).jpg"))
}
init();