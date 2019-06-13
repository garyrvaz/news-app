require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withOffline = require('next-offline')

module.exports = withOffline(withCSS(withSass({
  useFileSystemPublicRoutes: false,
  workboxOpts: {
    globPatterns: ['static/**/*'],
    globDirectory: '.',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 1000
          }
        }
      }
    ]
  },
  exportPathMap: async function() {
    return {
      '/': { page: '/', query: { title: 'Top Headlines'} },
      '/business': { page: '/', query: { title: 'Business Headlines', category: 'business' } },
      '/entertainment': { page: '/', query: { title: 'Entertainment Headlines', category: 'entertainment' } },
      '/health': { page: '/', query: { title: 'Health Headlines', category: 'health' } },
      '/science': { page: '/', query: { title: 'Science Headlines', category: 'science' } },
      '/sports': { page: '/', query: { title: 'Sports Headlines', category: 'sports' } },
      '/technology': { page: '/', query: { title: 'Technology Headlines', category: 'technology' } },
    }
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    config.resolve.alias['@'] = path.join(__dirname, 'src')

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    return config
  },
})))
