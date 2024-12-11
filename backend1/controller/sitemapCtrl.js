const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const Product = require('../models/productModel');
const Collection = require('../models/collectionModel');
const Blog = require('../models/blogModel');

const router = express.Router();

// Function to fetch and prepare URLs
async function getAllUrls() {
    const products = await Product.find({}).select('handle -_id'); // Fetching product slugs
    const collections = await Collection.find({}).select('handle -_id');
    const blogs = await Blog.find({}).select('handle -_id');

    const pages = [
        { url: "/", changefreq: "monthly", priority: 1 },
        { url: "/home", changefreq: "monthly", priority: 1 },
        { url: "/men", changefreq: "monthly", priority: 1 },
        { url: "/women", changefreq: "monthly", priority: 1 },
        { url: "/kids", changefreq: "monthly", priority: 1 },
        { url: "/accessories", changefreq: "monthly", priority: 1 },
        { url: "/about", changefreq: "monthly", priority: 1 },
        { url: "/pages/contact", changefreq: "monthly", priority: 0.8 },
        { url: "/blogs", changefreq: "weekly", priority: 0.6 },
        { url: "/pages/shipping-policy", changefreq: "monthly", priority: 0.5 },
        { url: "/pages/refund-and-return-policy", changefreq: "monthly", priority: 0.5 },
        { url: "/pages/terms-of-service", changefreq: "monthly", priority: 0.5 },
        { url: "/pages/privacy-policy", changefreq: "monthly", priority: 0.5 },
    ];

    // Combine URLs into a single array
    const allUrls = [
        ...products.map(prod => ({ url: `/products/${prod.handle}`, changefreq: "daily", priority: 0.9 })),
        ...collections.map(col => ({ url: `/collections/${col.handle}`, changefreq: "weekly", priority: 0.7 })),
        ...blogs.map(blog => ({ url: `/blogs/news/${blog.handle}`, changefreq: "weekly", priority: 0.6 })),
        ...pages,
    ];

    // Deduplicate URLs using a Map
    const uniqueUrls = Array.from(
        new Map(allUrls.map(item => [item.url, item])).values()
    );

    return uniqueUrls;
}

// Sitemap Route Handler
const siteMap = async (req, res, next) => {
    try {
        const links = await getAllUrls(); // Fetch unique URLs
        const sitemapStream = new SitemapStream({ hostname: "https://voguemine.com" });

        res.writeHead(200, {
            "Content-Type": "application/xml"
        });

        // Stream the sitemap
        Readable.from(links).pipe(sitemapStream).pipe(res);

        sitemapStream.on("error", (e) => {
            throw e;
        });
    } catch (e) {
        next(e);
    }
};

module.exports = { siteMap };
