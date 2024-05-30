const {S3Client, GetObjectCommand, PutObjectCommand} = require("@aws-sdk/client-s3")
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

//GetObject PreSigned URL 
async function getObjectURL(key){
    const command = new GetObjectCommand({
         Bucket:"s3-practice-private",                       // The Bucket "s3-practice-private" is private but the user Prabhakar is assigned to group "S3-Test" which has permission of Amazon S3 thats why we access the URL and we have also craeted the secret key and access key of the user. If the new IAM user belongs to the same AWS account and has been granted permissions to access the S3 bucket, then yes, they should be able to see and interact with the bucket and its contents.
        Key:key
    })
    const url = await getSignedUrl(s3client,command);
    return url;
}

//PutObject PreSigned URL
async function PutObject(filename,contentType){
    const command = new PutObjectCommand({
        Bucket: "s3-practice-private",
        Key: `/uploads/user-uploads/${filename}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3client,command);
    return url;
}


async function init(){
    // console.log("URL for s3-practice-private",await getObjectURL("Untitled (4).jpg"))
   
    console.log("URL for uploading", await PutObject(`image-${Date.now()}.jpeg`,'image/jpeg'))
}
init();