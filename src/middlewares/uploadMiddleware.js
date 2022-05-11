const multer = require("multer");

const imageFilter = (req, file, cb) => {
    
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, 'uploads')
  },
  filename:function (req, file, cb) {
    console.log(file);
    cb(null,  Date.now()+`archi_${file.originalname}` );
  },
  
  fileFilter: (req, file, callBack)=> {
    console.log(file);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callBack(new Error('Please upload an image'))
    }
    callBack(undefined, true)
}
});
//console.log('file');
const uploadFile = multer({ storage: storage });
module.exports = uploadFile;