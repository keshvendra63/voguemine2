const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const Product=require('../models/productModel');
const Collection  = require('../models/collectionModel');
const Blog  = require('../models/blogModel');

const router = express.Router();

// Assuming you have a way to fetch URLs from your database
async function getAllUrls() {
    const products = await Product.find({}).select('handle -_id'); // Fetching product slugs
    const collections = await Collection.find({}).select('handle -_id'); 
    const blogs = await Blog.find({}).select('handle -_id');
    const pages=[
        {page:"https://voguemine.com/"},        
        {page:"https://voguemine.com/home"},
        {page:"https://voguemine.com/men"},
        {page:"https://voguemine.com/women"},
        {page:"https://voguemine.com/kids"},
        {page:"https://voguemine.com/accessories"},
        {page:"https://voguemine.com/about"},
        {page:"https://voguemine.com/pages/contact"},
        {page:"https://voguemine.com/blogs"},
        {page:"https://voguemine.com/pages/shipping-policy"},
        {page:"https://voguemine.com/pages/refund-and-return-policy"},
        {page:"https://voguemine.com/pages/terms-of-service"},
        {page:"https://voguemine.com/pages/privacy-policy"},

    ] // Fetching category slugs
    // Fetching category slugs
    const urls = products.map(prod => ({ url: `/products/${prod.handle}`, changefreq: 'daily', priority: 0.9 }))
        .concat(collections.map(col => ({ url: `/collections/${col.handle}`, changefreq: 'weekly', priority: 0.5 })))
        .concat(blogs.map(blog => ({ url: `/blogs/news/${blog.handle}`, changefreq: 'weekly', priority: 0.4 })))
        .concat(pages.map(page=>({ url: `${page.page}`, changefreq: 'monthly', priority: 1})))

  
    return urls;
  }
const siteMap=async (req, res, next) => {
  try {
    const links = await getAllUrls(); // This should return an array of URLs
    const sitemapStream = new SitemapStream({ hostname: 'https://voguemine.com' });

    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    const xmlStream = Readable.from(links).pipe(sitemapStream).pipe(res);

    xmlStream.on('error', (e) => {
      throw e;
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {siteMap}
