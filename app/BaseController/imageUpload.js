var multer = require('multer'),
    mime = require('mime');
var commonImgStore = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/images/')
    },
    filename: function(req, file, cb) {
        if(file.mimetype.indexOf('video/') > -1){
            cb(null, 'video' + '-' + Date.now() + '.' + mime.extension(file.mimetype))            
        } else {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))            
        }
    },
    fileFilter: function(req, file, cb) {
        if (file.mimetype !== 'image/png'&& file.mimetype !== 'image/jpg'
            && file.mimetype !== 'image/jpeg' && file.mimetype !== 'video/mp4' && file.mimetype !== 'video/3gpp' && file.mimetype !== 'video/3gp' && file.mimetype !== 'video/x-flv' && file.mimetype !== 'video/mov' && file.mimetype !== 'video/mpg' && file.mimetype !== 'video/x-ms-wmv' && file.mimetype !== 'video/mpeg' && file.mimetype !== 'video/m4v' && file.mimetype !== 'video/x-matroska' && file.mimetype !== 'video/quicktime' && file.mimetype !== 'video/avi' && file.mimetype !== 'video/mkv') {
          req.fileValidationError = 'Invalid Image Format';
          return cb(null, false, new Error('Invalid Image Format'));
        }
        cb(null, true);
    }
});

var uploadImage = multer({
    storage: commonImgStore,
    limits: {
        fileSize: 100000000
    }
});

var processImage = function(filepath){
    //to process image
}

module.exports = {
    upload : uploadImage,
    processImage : processImage
};