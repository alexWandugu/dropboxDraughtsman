/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://dropboxdraughtsman.vercel.app/',
    generateRobotsTxt: true, // also generates robots.txt
    sitemapSize: 5000,
  };

  // "postbuild": "next-sitemap" in package.json
  