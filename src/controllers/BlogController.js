const debug = require('debug')('API:BlogController');
const BlogModel = require('../models/BlogModel');
const Boom = require('boom');

exports.createBlog = async function (req, res, next) {
try {  
        let params = req.body;        
        if(req.files) {          
          req.files.map((oneFile, i) => {         
            const imageName = `image${i}`;            
            params[imageName] = oneFile.filename;            
          })
        }                
        const blog = new BlogModel(params);
        const blogData = await blog.save(params);        
        req.session.data = await blogData;             
        return next();
        
} catch (error) {  
  Boom.badData('Something Went Wrong');
}
}

exports.getAllBlog = async function (req, res, next) {
  try {    
    BlogModel.find({}, function (error, document) {
      if (error) {
        return next(Boom.conflict(error));
      }
      document.map(oneDocument => {
        oneDocument.image0 = oneDocument.image0 ? `http://localhost:3000/uploads/` + oneDocument.image0 : null;
        oneDocument.image1 = oneDocument.image1 ? `http://localhost:3000/uploads/` + oneDocument.image1 : null;        
        oneDocument.image2 = oneDocument.image2 ? `http://localhost:3000/uploads/` + oneDocument.image2 : null;        
      });
      req.session.data = document;
      return next();
    })
  } catch (error) {
    Boom.badRequest('Something Want Wrong');
  }
}