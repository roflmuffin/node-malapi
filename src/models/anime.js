const Episode = require('./episode');

const cheerio = require('cheerio');
const debug = require('debug')('malapi:anime');
const xml2js = require('xml2js');

const request = require('../util/request');
const utils = require('../util/parsing');

const searchUrl = '/anime.php?c[]=a&c[]=b&c[]=c&c[]=d&c[]=e&c[]=f&c[]=g';

const parser = new xml2js.Parser({
  explicitRoot: false,
  explicitArray: false,
});

class Anime {
  constructor(object) {
    Object.assign(this, object);
  }

  getEpisodes() {
    return request(this.episodesLink).then(resp => {
      const $ = cheerio.load(resp.body);

      const episodes = $('table.episode_list.ascend tr.episode-list-data').map((i, el) => (
        new Episode({
          alt: $(el).find('.episode-title span').text().trim(),
          name: $(el).find('.episode-title a').text().trim(),
          number: $(el).find('.episode-number').text().trim(),
          url: $(el).find('.episode-title a').attr('href'),
          aid: this.id,
        })
      )).get();

      return episodes;
    });
  }

  static search(term) {
    return request(searchUrl, { query: { q: term } }).then(resp => {
      const $ = cheerio.load(resp.body);

      let results = $(".list table tr:contains('add')");
      results = results.map((i, el) =>
        ({
          name: $(el).find('a.hoverinfo_trigger').text().trim(),
          url: $(el).find('a.hoverinfo_trigger').attr('href'),
          id: $(el).find('a.hoverinfo_trigger').attr('id').replace('sarea', ''),
          type: $(el).find('td.borderClass').eq(2).text()
            .trim(),
        })
      ).get();

      return results;
    });
  }

  static fromBody(body) {
    const $ = cheerio.load(body);

    const result = {
      title: $('h1').text(),
      id: $('input[name="aid"]').val(),
      image: $('img.ac').attr('src'),
      detailsLink: $('a:contains("Details")').attr('href'),
      episodesLink: $('a:contains("Episodes")').attr('href'),

      alternativeTitles: {
        japanese: utils.parseSidebar($, 'Japanese', true),
        english: utils.parseSidebar($, 'English', true),
        synoynms: utils.parseSidebar($, 'Synonyms', true),
      },

      type: $('span:contains("Type:")').next('a').text(),
      episodes: utils.parseSidebar($, 'Episodes'),

      status: utils.parseSidebar($, 'Status'),
      aired: utils.parseSidebar($, 'Aired'),

      genres: $('span:contains("Genres:")').siblings('a').map((i, el) => $(el).text()).get(),

      classification: utils.parseSidebar($, 'Rating'),

      statistics: {
        score: {
          value: $('span[itemprop="ratingValue"]').text(),
          count: $('span[itemprop="ratingCount"]').text(),
        },
        popularity: utils.parseSidebar($, 'Popularity'),
        members: utils.parseSidebar($, 'Members'),
        favorites: utils.parseSidebar($, 'Favorites'),
        ranking: $('.numbers.ranked > strong').text(),
      },

      synopsis: $("h2:contains('Synopsis')").next('span').text(),

      studios: utils.parseSidebar($, 'Studios', true),

      adaptations: $("h2:contains('Related Anime')").next('table').find('tr').map((i, el) => ({
        type: $(el).find('td').eq(0).text()
          .slice(0, -1),
        name: $(el).find('td').eq(1).text()
          .split(','),
      }))
      .get(),

      characters: $('h2:contains("Characters & Voice Actors")')
        .nextAll('table')
        .find('td:nth-child(2) a[href*="/character/"]')
        .map((i, el) => {
          const actorEl = $(el).parent('td').next().find('a');
          const character = {
            name: $(el).text(),
            role: $(el).next().text(),
            actor: $(actorEl).text(),
            language: $(actorEl).siblings('small').text(),
          };
          return character;
        })
        .get(),

      staff: $('h2:contains("Staff")')
        .nextAll('table')
        .find('td:nth-child(2) a[href*="/people/"]')
        .map((i, el) => {
          const row = {
            name: $(el).text(),
            role: $(el).siblings('small').text().split(', '),
          };
          return row;
        })
        .get(),
    };

    return new Anime(result);
  }

  static getList(username) {
    return request('/malappinfo.php', { query: { u: username, status: 'all', type: 'anime' } })
    .then(resp => (
      new Promise((resolve) => {
        parser.parseString(resp.body, (err, parsed) => {
          if (typeof parsed.error !== 'undefined' || parsed.length === 0) {
            resolve(null);
          }
          resolve(parsed);
        });
      })
    ));
  }

  static fromUrl(url) {
    debug(`Anime from URL ${url}`);
    return request(url).then(resp => Anime.fromBody(resp.body));
  }

  static fromId(id) {
    debug(`Anime from ID ${id}`);
    return Anime.fromUrl(`/anime/${id}`);
  }

  static fromSearchResult(result) {
    return Anime.fromId(result.id);
  }

  static fromName(name) {
    return Anime.search(name).then(results =>
      Anime.fromSearchResult(results[0])
    );
  }
}

module.exports = Anime;
