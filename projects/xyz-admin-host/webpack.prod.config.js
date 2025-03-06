const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require('webpack-merge');
const webpackDevelopConfig = require('./webpack.config');

module.exports = merge(webpackDevelopConfig, {
  plugins: [
    new ModuleFederationPlugin({
      // change domain to 'vercel-app.com'
      remotes: {
        "ticketInvoiceMf": "https://ng-ticket-invoice-mf.vercel.app/remoteEntry.js",
      },
    }),
  ],
});

