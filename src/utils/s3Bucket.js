import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const s3 = new AWS.S3({});
const bucketName = process.env.BUCKET_NAME;

export const uploadFile = async (folder, fileName, file) => {
    const params = {
        Bucket: bucketName,
        Key: `${folder}/`+fileName,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const deleteFile = async (fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const getFilefromUrl = async (url) => {
    const folder = url.split('/')[3];
    const file = url.split('/')[4];
    const params = {
        Bucket: bucketName,
        Key: `${folder}/${file}`,
    };
    return new Promise((resolve, reject) => {
        s3.getObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};