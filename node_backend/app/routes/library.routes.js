module.exports = app => {
  const libraries = require("../controllers/library.controller.js");
  const auth = require('./auth.routes');

  //for image saving-----------------------------------
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb('Not an image', false);
  }
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter,
  });
  //-----------------------------------------------------

  app.get("/libraries/get_libraries", libraries.getAll);
  app.get("/libraries/get_libraries/:libId", libraries.getAll);

  app.post("/libraries/create", auth.authenticateJWT, upload.single('image'), libraries.create);
};