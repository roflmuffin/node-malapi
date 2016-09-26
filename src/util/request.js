const { name } = require('../../package.json');
const { version } = require('../../package.json');

const debug = require('debug')(`${name}:request`);
const got = require('got');

const userAgent = `${name}/${version} (github link)`;

const baseUrl = 'https://myanimelist.net';

module.exports = function request(url = '/', opts = {}) {
  let reqUrl = url;
  if (url.indexOf(baseUrl) > -1) {
    reqUrl = url.replace(baseUrl, '');
  }

  debug(`Requesting ${reqUrl}, options: ${JSON.stringify(opts)}`);

  return got(`https://myanimelist.net${reqUrl}`, Object.assign(opts, {
    'User-Agent': userAgent,
  }));
};
