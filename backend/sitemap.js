import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { parseString } from 'xml2js';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

const routes = [
  '/',
  '/recipes',
  '/create-account',
  '/log-in',
  '/recipes/:recipeId',
];

// Create a new sitemap stream
const sitemap = new SitemapStream({ hostname: 'https://recipe-blog-d1b4f.uw.r.appspot.com/' }); 

// Add each route to the sitemap
routes.forEach((route) => {
  sitemap.write({ url: route });
});

// End the sitemap stream
sitemap.end();

// Convert the sitemap stream to an XML string
streamToPromise(sitemap)
  .then((data) => {
    const sitemapXML = data.toString();
    return sitemapXML;
  })
  .then((sitemapXML) => {
    // Save the sitemapXML to a file in the frontend's public directory
    const sitemapPath = path.join(__dirname, '../frontend/public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXML);
    console.log('Sitemap generated and saved:', sitemapPath);
  })
  .catch((error) => {
    console.error('Error generating sitemap:', error);
  });