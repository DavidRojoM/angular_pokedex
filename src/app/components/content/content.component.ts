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
  constructor(public pokeService: PokemonService) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.pokeService.getPokelist().subscribe(
      (res) => {
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
  }

  onSizeChange(event: any): void {
    this.dataSize = event.target.value
    this.page = 1
    this.POKEMONS = []
    this.fetchData()
  }
}
