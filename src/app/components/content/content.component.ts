import { Component, OnInit } from '@angular/core'
import { PokemonService } from '../../services/pokemon.service'
import { Results } from '../../models/Results'
import { Pokemon } from '../../models/Pokemon'
import FetchComm from '../../controllers/FetchComm'
import { getType } from '../../controllers/TypeParser'

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

  pokemons: Pokemon[] = []

  private itemsToBeFetched = 100

  private searching: boolean = false

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=2000'

  private pokeCount = 0

  private fetchComm = FetchComm.getInstance()

  constructor(public pokeService: PokemonService) {}

  ngOnInit(): void {
    this.fetchData()
  }

  public fetchData() {
    this.pokeService.getPokelist(this.apiUrl).subscribe(
      (res) => {
        this.fetchComm.RESULT = res
        for (
          let i = this.pokeCount;
          i < this.pokeCount + this.itemsToBeFetched;
          i++
        ) {
          if (this.fetchComm.RESULT.results[i]) {
            this.getPokemon(this.fetchComm.RESULT.results[i])
          }
        }
        this.pokeCount += this.itemsToBeFetched
      },
      (err) => {
        console.error(err)
      }
    )
  }

  private getPokemon(poke: Results) {
    this.pokeService.getPokemon(poke.url).subscribe(
      (res) => {
        this.pokemons.push(res)
      },
      (err) => {
        console.error(err)
      }
    )
  }

  public onDataChange(event: any) {
    this.page = event
    window.scrollTo(0, 0)
    const lastPage = Math.ceil(this.pokemons.length / this.dataSize)
    if (this.page === lastPage && lastPage !== 0 && !this.searching) {
      this.fetchData()
    }
  }

  public onSizeChange(event: any): void {
    this.dataSize = event.target.value
    this.page = 1

    if (!this.searching) {
      this.pokemons = []
      this.pokeCount = 0

      this.fetchData()

      this.needsToDoubleFetch()
    }
  }

  public search(value: string) {
    this.pokemons = []

    // triggers when searched value is not ''
    if (value) {
      this.searching = true
      this.fetchComm.RESULT.results.forEach((poke) => {
        if (poke.name.match(value.toLocaleLowerCase())) {
          const url = `https://pokeapi.co/api/v2/pokemon/${poke.name}`
          this.pokeService.getPokemon(url).subscribe(
            (res) => {
              this.pokemons.push(res)
            },
            (err) => {
              console.error(err)
            }
          )
        }
      })
    } else {
      this.searching = false
      this.pokeCount = 0

      this.fetchData()
      this.needsToDoubleFetch()
    }
    this.page = 1
  }

  // This just triggers when changing dataSize to 100
  private needsToDoubleFetch() {
    const lastPage = Math.floor(100 / this.dataSize)

    if (this.page === lastPage) {
      this.fetchData()
    }
  }

  public getTypeClass(type: string): string {
    return getType(type)
  }

  capitalize = function (string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  doSomething(name: string) {
    alert(`In development. ${name}`)
  }
}
