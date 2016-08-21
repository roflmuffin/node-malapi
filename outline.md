### class Anime
```
  title: string
  aid: number
  image: url <string>
  synopsis: string

  detailsLink: url
  episodesLink: url

  alternativeTitles:
    japanese: string
    english: string
    synonyms: string

  type: string (TV, OVA, Movie)
  episodeCount: number

  // Not immediately retrieved, is requested after details is loaded.
  episodes: array of:
    name: string
    alt: string
    url: string
    synopsis: string    

  airStatus: string (Finished Airing, Currently Airing, Not yet aired)
  airDate: string

  genres: array[string]

  classification: string

  statistics:
    score: number (or NA/null)
    popularity: number
    members: number
    favorites: number
    ranking: number
```
