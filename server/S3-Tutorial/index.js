const {S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand} = require("@aws-sdk/client-s3")
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
        Key: `uploads/user-uploads/${filename}`,          // thsi is the location of the file where we store in the bucket
        ContentType: contentType
    });
    const url = await getSignedUrl(s3client,command);
    return url;
}

async function listObjects(){
    const command = new ListObjectsV2Command({                    //This function interacts with AWS S3 to list the objects in a bucket and logs the response.
        Bucket: "s3-practice-private",
        Key:"/"
    })
    const result = await s3client.send(command);
    console.log(result)
}

async function deleteObject(){
    const command = new DeleteObjectCommand({                   //This function interacts with AWS S3 to delete a specific object from a bucket and logs the response.
        Bucket: "s3-practice-private",
        Key:"uploads/user-uploads/image-1717075065328.jpeg"
    })
    const result = await s3client.send(command);
    console.log(result);
}


async function init(){
    // console.log("URL for s3-practice-private",await getObjectURL("Untitled (4).jpg"))                         // this is the key name of the file that we try to reveive through url
   
    // console.log("URL for uploading", await PutObject(`image-${Date.now()}.jpeg`,'image/jpeg'))                   // "image-${Date.now()}.jpeg" is the file name that we give to file during  uploading. "image/jpeg" is the type of file.   after running thsi we get a URL and to test go to postman paste the url and add put request. then add the file that we have to upload anss then run.
   
   // listObjects()

   deleteObject();
}
init();