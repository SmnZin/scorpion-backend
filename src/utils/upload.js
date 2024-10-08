const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

//Mecanismo para subir archivos al bucket de GridFS
function upload(){
    const mongodbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.b7on0ah.mongodb.net/${process.env.MONGO_DB_NAME}`;
    const storage = new GridFsStorage({
        url: mongodbUrl,
        file: (req, file) => {
            return new Promise((resolve, _reject) => {
                const fileInfo = {
                    filename: file.originalname,
                    bucketName: 'filesBucket'
                };
                resolve(fileInfo);
            }
            );
        }
    });
    return multer({storage});
}

module.exports = {upload};