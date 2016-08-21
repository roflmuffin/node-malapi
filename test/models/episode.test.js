import test from 'ava';
const expect = require('expect.js');

const Episode = require('../../src/models/episode');
const helper = require('../helper');

test('can create by id', t => (
  Episode.fromId(helper.TEST_ANIME_ID, 1).then(episode => {
    t.is(episode.name, helper.TEST_EPISODE_NAME);
  }))
);

test('synopsis information can be retrieved', t => (
  Episode.fromId(helper.TEST_ANIME_ID, 1).then(episode => (
    episode.getInformation().then(info => {
      t.is(info.number, 1);
      t.truthy(typeof info.synopsis === 'string');
    })
  ))
));
