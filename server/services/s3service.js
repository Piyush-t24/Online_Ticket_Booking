const { S3 } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.AWS_REGION, 
}); //initialise configuration with aws
const s3 = new S3();
exports.s3Uploadv3 = async (file) => {
  
    if (!file || !file.buffer) {
        throw new Error("File or file buffer is missing.");
    }
    
    const uid = uuidv4();
    const params = {
        Bucket: process.env.BUCKET_NAME, // Make sure your environment variable is correct
        Key: `uploads/${uid}`,
        Body: file.buffer, // Ensure file.buffer is passed correctly
    };

    try {
 
        const uploadResult = await s3.upload(params).promise();
        

        if (uploadResult.Location) {
            return uploadResult;  // Return the result which contains the Location field
        } else {
            throw new Error("Location field not found in S3 upload response.");
        }
    } catch (error) {
        console.error("Error during S3 upload:", error);
        throw error;  // Rethrow the error after logging it
    }
};



