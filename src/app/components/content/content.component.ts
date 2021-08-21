import { Component, OnInit } from '@angular/core'
import { PokemonService } from '../../services/pokemon.service'
import { Results } from '../../models/Results'
import { Pokemon } from '../../models/Pokemon'
import { Result } from '../../models/Result'

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

  RESULT: Result = { next: '', previous: '', results: [] }
  POKEMONS: Pokemon[] = []

  API_URL: string = 'https://pokeapi.co/api/v2/pokemon?limit=2000'

  pokeCount: number = 0

  constructor(public pokeService: PokemonService) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.pokeService.getPokelist(this.API_URL).subscribe(
      (res) => {
        this.RESULT = res
        for (let i = this.pokeCount; i < this.pokeCount + 100; i++) {
          this.getPokemon(this.RESULT.results[i])
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
    const lastPage = Math.floor(this.POKEMONS.length / this.dataSize)
    if (this.page === lastPage && lastPage !== 0) {
      this.fetchData()
    }
  }

  onSizeChange(event: any): void {
    this.dataSize = event.target.value
    this.page = 1
    const lastPage = 100 / this.dataSize

    this.POKEMONS = []
    this.pokeCount = 0
    this.fetchData()

    // This just triggers when changing dataSize to 100
    if (this.page === lastPage) {
      this.fetchData()
    }
  }
}
