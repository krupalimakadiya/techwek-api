
const express = require('express');

const router = express.Router();
const multer = require('multer');
const BlogController = require('../controllers/BlogController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
  },
});

const upload = multer({ storage });


router.post('/create', upload.array('images', 5), [
  BlogController.createBlog,
]);

router.get('/getAll', [
  BlogController.getAllBlog,
]);

module.exports = router;
