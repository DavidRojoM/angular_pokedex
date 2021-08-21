import { Component, OnInit } from '@angular/core'
import { PokemonService } from '../../services/pokemon.service'
import { Results } from '../../models/Results'
import { Pokemon } from '../../models/Pokemon'

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
  API_URL: string = 'https://pokeapi.co/api/v2/pokemon?limit=100'
  constructor(public pokeService: PokemonService) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.pokeService.getPokelist(this.API_URL).subscribe(
      (res) => {
        if (res.next) {
          this.API_URL = res.next
        }
        res.results.forEach((poke) => {
          this.getPokemon(poke)
        })
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
    if (this.page === lastPage) {
      this.fetchData()
    }
  }

  onSizeChange(event: any): void {
    this.dataSize = event.target.value
    this.page = 1
    const lastPage = 100 / this.dataSize

    this.POKEMONS = []
    this.API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100'
    this.fetchData()

    if (this.page === lastPage) {
      this.fetchData()
    }
  }
}
