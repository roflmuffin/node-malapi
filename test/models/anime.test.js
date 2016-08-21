import test from 'ava';
const expect = require('expect.js');

const Anime = require('../../src/models/anime');
const helper = require('../helper');

test('can view by id', t => (
  Anime.fromId(helper.TEST_ANIME_ID).then(anime => {
    t.is(anime.title, helper.TEST_ANIME_NAME);
  }))
);

test('can view by url', t => (
  Anime.fromUrl(helper.TEST_ANIME_URL).then(anime => {
    t.is(anime.title, helper.TEST_ANIME_NAME);
  }))
);

test('can view by name', t => (
  Anime.fromName(helper.TEST_ANIME_NAME).then(anime => {
    t.is(anime.title, helper.TEST_ANIME_NAME);
  }))
);

test('can get episode list', () => (
  Anime.fromId(helper.TEST_ANIME_ID).then(anime => {
    anime.getEpisodes().then(episodes => {
      expect(episodes).to.be.an(Array);
      expect(episodes.length).to.be.greaterThan(0);
    });
  }))
);
