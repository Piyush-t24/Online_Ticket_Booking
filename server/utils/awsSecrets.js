const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecretValue(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

    if (data.SecretString) {
      return JSON.parse(data.SecretString);
    } else {
      const buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString('ascii'));
    }
  } catch (err) {
    console.error("Error retrieving secret:", err);
  }
}

async function setEnvVariables() {
  const secret = await getSecretValue('my-app-secrets');

  // Set the environment variables
  process.env.PORT = secret.PORT;
  process.env.DB_CONNECT = secret.DB_CONNECT;
  process.env.JWT_SECRET = secret.JWT_SECRET;
  process.env.CLIENT_ID = secret.CLIENT_ID;
  process.env.AWS_REGION = secret.AWS_REGION;
  process.env.ACCESS_KEY = secret.ACCESS_KEY;
  process.env.SECRET_KEY = secret.SECRET_KEY;
  process.env.BUCKET_NAME = secret.BUCKET_NAME;

  process.env.RAZORPAY_KEY_ID = secret.RAZORPAY_KEY_ID;
  process.env.RAZORPAY_KEY_SECRET = secret.RAZORPAY_KEY_SECRET;
  process.env.GOOGLE_CLIENT_ID = secret.GOOGLE_CLIENT_ID;
  process.env.GOOGLE_CLIENT_SECRET = secret.GOOGLE_CLIENT_SECRET;
  process.env.HH_EMAIL = secret.HH_EMAIL;
  process.env.HH_PASSWORD = secret.HH_PASSWORD;
  process.env.NODE_ENV = secret.NODE_ENV;
 


}

module.exports= setEnvVariables;
