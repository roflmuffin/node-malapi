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

    const airedMatch = $('table div.fn-grey2').text()
      .match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-9]+, [0-9]{4})\(([A-Z]+)\)/);
    var timeZone = 'GMT';

    const result = {
      number: parseInt($('table h2.fs18 span').text().replace(/[^\d\.\-]/g, ''), 10),
      name: $('table h2.fs18').get(0).childNodes[2].nodeValue,
      alt: $('table h2.fs18').siblings('p').text().trim(),
      synopsis: $("h2:contains('Synopsis')").parent().text().replace('Synopsis', '')
        .trim()
    };


    if (airedMatch !== null) {
      switch (airedMatch[2]) {
        case 'JST':
          timeZone = 'GMT+09:00';
          break;
      }
      result.aired = new Date(airedMatch[1] + ' 00:00:00 ' + timeZone);
    }

    return new Episode(result);
  }

  static fromUrl(url) {
    return request(url).then(resp => {
      const ep = Episode.fromBody(resp.body);
      ep.url = url;
      return ep;
    });
  }

  static fromId(id, number) {
    return Episode.fromUrl(`/anime/${id}/_/episode/${number}`);
  }

}

module.exports = Episode;
