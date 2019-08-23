'use strict';

const express = require('express');
const router  = express.Router();
const BlogController = require('../controllers/BlogController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      console.log('inside file name')
      cb(null, file.fieldname + '-' + Date.now()  + '.jpeg');
    }
  })

const upload = multer({ storage : storage });


router.post('/create', upload.array('images', 5), [
    BlogController.createBlog,
]);

router.get('/getAll', [
  BlogController.getAllBlog,
]);

module.exports = router;