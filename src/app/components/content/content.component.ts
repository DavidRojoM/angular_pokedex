import { Component, OnInit } from '@angular/core'
import { PokemonService } from '../../services/pokemon.service'
import { Results } from '../../models/Results'
import { Pokemon } from '../../models/Pokemon'
import FetchComm from '../../controllers/FetchComm'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  page = 1
  count = 0
  dataSize = 25
  dataSizes = [25, 50, 75, 100]

  POKEMONS: Pokemon[] = []

  SEARCHING: boolean = false

  API_URL: string = 'https://pokeapi.co/api/v2/pokemon?limit=2000'

  pokeCount: number = 0

  fetchComm: FetchComm = FetchComm.getInstance()

  constructor(public pokeService: PokemonService) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.pokeService.getPokelist(this.API_URL).subscribe(
      (res) => {
        this.fetchComm.RESULT = res
        for (let i = this.pokeCount; i < this.pokeCount + 100; i++) {
          if (this.fetchComm.RESULT.results[i]) {
            this.getPokemon(this.fetchComm.RESULT.results[i])
          }
        }
        this.pokeCount += 100
      },
      (err) => {
        console.error(err)
      }
    )
  }

  getPokemon(poke: Results) {
    this.pokeService.getPokemon(poke.url).subscribe(
      (res) => {
        this.POKEMONS.push(res)
      },
      (err) => {
        console.error(err)
      }
    )
  }

  onDataChange(event: any) {
    this.page = event
    window.scrollTo(0, 0)
    const lastPage = Math.ceil(this.POKEMONS.length / this.dataSize)
    if (this.page === lastPage && lastPage !== 0 && !this.SEARCHING) {
      this.fetchData()
    }
  }

  onSizeChange(event: any): void {
    this.dataSize = event.target.value
    this.page = 1

    if (!this.SEARCHING) {
      const lastPage = Math.floor(100 / this.dataSize)

      this.POKEMONS = []
      this.pokeCount = 0

      this.fetchData()

      // This just triggers when changing dataSize to 100
      if (this.page === lastPage) {
        this.fetchData()
      }
    }
  }

  search(value: string) {
    this.POKEMONS = []

    if (!value) {
      this.pokeCount = 0
      this.SEARCHING = false
      this.fetchData()
    } else {
      this.SEARCHING = true
      this.fetchComm.RESULT.results.forEach((poke) => {
        if (poke.name.match(value.toLocaleLowerCase())) {
          const url = `https://pokeapi.co/api/v2/pokemon/${poke.name}`
          this.pokeService.getPokemon(url).subscribe(
            (res) => {
              this.POKEMONS.push(res)
            },
            (err) => {
              console.error(err)
            }
          )
        }
      })
    }
    this.page = 1
  }

  getTypeClass(type: string): string {
    let result = ''
    switch (type) {
      case 'water':
        result = 'bg-primary'
        break
      case 'bug':
        result = 'bg-success'
        break
      case 'fire':
        result = 'bg-reddish'
        break
      case 'grass':
        result = 'bg-success'
        break
      case 'poison':
        result = 'bg-purple'
        break
      case 'flying':
        result = 'bg-info text-dark'
        break
      case 'normal':
        result = 'bg-warning text-dark'
        break
      case 'electric':
        result = 'bg-yellow text-dark'
        break
      case 'ground':
        result = 'bg-brown'
        break
      case 'psychic':
        result = 'bg-pink'
        break
      case 'fighting':
        result = 'bg-warning text-dark'
        break
      case 'fairy':
        result = 'bg-pink'
        break
      case 'steel':
        result = 'bg-light text-dark'
        break
      case 'rock':
        result = 'bg-secondary'
        break
      case 'ghost':
        result = 'bg-light text-dark'
        break
      case 'dragon':
        result = 'bg-warning text-dark'
        break
      case 'ice':
        result = 'bg-info text-dark'
        break
      case 'dark':
        result = 'bg-dark'
    }
    return result
  }
}
