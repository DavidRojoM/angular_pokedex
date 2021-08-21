// interface OfficialArtwork {
//   // @ts-ignore
//   'front-default': string
// }
//
// interface Other {
//   'official-artwork': OfficialArtwork
// }
//
interface Sprites {
  front_default: string
}

export interface Pokemon {
  id: number
  name: string
  height: number
  sprites: Sprites
}
