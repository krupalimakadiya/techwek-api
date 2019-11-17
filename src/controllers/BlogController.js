/* eslint-disable no-param-reassign, consistent-return */
const debug = require('debug')('API:BlogController');
const Boom = require('boom');
const BlogModel = require('../models/BlogModel');

exports.createBlog = async (req, res, next) => {
  try {
    const params = req.body;
    if (req.files) {
      req.files.map((oneFile, i) => {
        const imageName = `image${i}`;
        params[imageName] = oneFile.filename;
      });
    }
    const blog = new BlogModel(params);
    debug(blog);
    const blogData = await blog.save(params);
    req.session.data = await blogData;
    return next();
  } catch (error) {
    Boom.badData('Something Went Wrong');
  }
};

exports.getAllBlog = (req, res, next) => {
  try {
    BlogModel.find({}, (error, document) => {
      if (error) {
        return next(Boom.conflict(error));
      }
      document.map((oneDocument) => {
        oneDocument.image0 = oneDocument.image0 ? `http://localhost:3000/uploads/${oneDocument.image0}` : null;
        oneDocument.image1 = oneDocument.image1 ? `http://localhost:3000/uploads/${oneDocument.image1}` : null;
        oneDocument.image2 = oneDocument.image2 ? `http://localhost:3000/uploads/${oneDocument.image2}` : null;
        return oneDocument;
      });
      req.session.data = document;
      return next();
    });
  } catch (error) {
    Boom.badRequest('Something Want Wrong');
  }
};
