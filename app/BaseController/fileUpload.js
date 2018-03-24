var multer = require('multer'),
    mime = require('mime');
var commonImgStore = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/files/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
    },
    fileFilter: function(req, file, cb) {
        cb(null, true);
    }
});

var uploadImage = multer({
    storage: commonImgStore
});

var processImage = function(filepath){
    //to process image
}

module.exports = {
    upload : uploadImage,
    processImage : processImage
};