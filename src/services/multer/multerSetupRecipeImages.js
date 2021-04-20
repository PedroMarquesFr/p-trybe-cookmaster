const multer = require('multer');

const storage = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
    // path.extname(file.originalname)
  },
});

const upload = multer({ storage });

module.exports = upload;
