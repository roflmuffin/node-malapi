module.exports = {
  TEST_ANIME_ID: process.env.TEST_ANIME_ID || 28891,
  TEST_ANIME_NAME: process.env.TEST_ANIME_NAME || 'Haikyuu!! Second Season',
  TEST_ANIME_URL: process.env.TEST_ANIME_URL || '/anime/28891/',

  // Should match the name of the first episode of anime above.
  TEST_EPISODE_NAME: process.env.TEST_EPISODE_NAME || 'Let\'s Go to Tokyo!',

  // Test for anime that contains missing sidebar information.
  TEST_ANIME_MISSINGINFO: process.env.TEST_ANIME_MISSINGINFO || 7314,

  TEST_LIST_VALID: process.env.TEST_LIST_VALID || 'roflmuffin',
  TEST_LIST_INVALID: process.env.TEST_LIST_INVALID || 'noonecouldeverhavethisusername',
};
