import test from 'ava';
const expect = require('expect.js');

const Episode = require('../../src/models/episode');
const helper = require('../helper');

test('can create by id', () => (
  Episode.fromId(helper.TEST_ANIME_ID, 1).then(episode => {
    expect(episode).to.be.an(Episode);
    expect(episode.name).to.be(helper.TEST_EPISODE_NAME);
  }))
);

test('synopsis information can be retrieved', () => (
  Episode.fromId(helper.TEST_ANIME_ID, 1).then(episode => {
    episode.getInformation().then(info => {
      expect(info.number).to.be(1);
      expect(info.synopsis).to.be.a('string');
    });
  }))
);
