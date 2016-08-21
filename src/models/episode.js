const cheerio = require('cheerio');

const request = require('../util/request');

class Episode {
  constructor(object) {
    Object.assign(this, object);
  }

  getInformation() {
    return Episode.fromUrl(this.url).then(ep => {
      Object.assign(this, ep);
      return this;
    });
  }

  static fromBody(body) {
    const $ = cheerio.load(body);

    const result = {
      number: parseInt($('table h2.fs18 span').text().replace(/[^\d\.\-]/g, ''), 10),
      name: $('table h2.fs18').get(0).childNodes[2].nodeValue,
      alt: $('table h2.fs18').siblings('p').text().trim(),
      synopsis: $("h2:contains('Synopsis')").parent().text().replace('Synopsis', '')
        .trim(),
    };

    return new Episode(result);
  }

  static fromUrl(url) {
    return request(url).then(resp => Episode.fromBody(resp.body));
  }

  static fromId(id, number) {
    return Episode.fromUrl(`/anime/${id}/_/episode/${number}`);
  }

}

module.exports = Episode;
