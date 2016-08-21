const Anime = require('./models/anime');
const Episode = require('./models/episode');

const debug = require('debug')('test');


// Anime.fromId('2167').then(function(anime) {
//   anime.getEpisodes().then(function(episodes) {
//     episodes[0].getInformation().then(info => console.log(info));
//   }).catch(err => console.log(err));
// })

// Anime.search('Haikyuu').then(results => {
//   console.log(results[0])
//   Anime.fromSearchResult(results[0]).then(anime => debug(anime));
// });

// Anime.fromName('Full Metal Alchemist').then(anime => debug(anime));

Episode.fromId(31229, 4).then(ep => debug(ep));
