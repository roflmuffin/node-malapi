Node MyAnimeList API
===

This module wraps the official [MyAnimeList.net API](http://myanimelist.net/modules.php?go=api)
and also makes use of scraping to retrieve additional information not generally available through the (limited!) official API.

## Install
```
npm install malapi
```

## Examples

### Retrieve anime information by MAL Id

```js
var Anime = require('malapi').Anime;

Anime.fromId(28891).then(anime => {
  console.log(anime);
});
```

### Retrieve anime information by Url

```js
var Anime = require('malapi').Anime;

Anime.fromUrl('http://myanimelist.net/anime/28891/Haikyuu_Second_Season')
.then(anime => {
  console.log(anime);
});
```

### Retrieve anime information by Name

```js
var Anime = require('malapi').Anime;

Anime.fromName('Haikyuu!! Second Season').then(anime => {
  console.log(anime);
});
```

### Get episode list of anime

```js
let haikyuu = ...

haikyuu.getEpisodes().then(episodes => {
  console.log(episodes);
});
```

### Get episode information (includes synopsis)

```js
let firstEp = episodes[0];

firstEp.getInformation().then(episode => {
  console.log(episode.synopsis);
});
```
