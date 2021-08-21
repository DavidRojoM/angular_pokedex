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
  constructor(public pokeService: PokemonService) {}

  POKEMONS: Pokemon[] = []
  ngOnInit(): void {
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
}
