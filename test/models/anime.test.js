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

test('can get episode list', t => (
  Anime.fromId(helper.TEST_ANIME_ID).then(anime => (
    anime.getEpisodes().then(episodes => {
      t.truthy(typeof episodes.length !== 'undefined');
      t.truthy(episodes.length > 0);
    })
  )))
);

test('can be missing sidebar information (alternative titles)', t => (
  Anime.fromId(helper.TEST_ANIME_MISSINGINFO).then(anime => {
    t.is(anime.alternativeTitles.english, null);
  }))
);
