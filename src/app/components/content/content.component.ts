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

  OLDPOKEMONS: Pokemon[] = []
  POKEMONS: Pokemon[] = []

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
    if (this.page === lastPage && lastPage !== 0) {
      this.fetchData()
    }
  }

  onSizeChange(event: any): void {
    this.dataSize = event.target.value
    this.page = 1
    const lastPage = Math.floor(100 / this.dataSize)

    this.POKEMONS = []
    this.pokeCount = 0
    this.fetchData()

    // This just triggers when changing dataSize to 100
    if (this.page === lastPage) {
      this.fetchData()
    }
  }

  search(value: string) {
    this.POKEMONS = []
    console.log(value)
    if (!value) {
      console.log('uwu')
      this.pokeCount = 0
      this.fetchData()
    } else {
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
  }
}
