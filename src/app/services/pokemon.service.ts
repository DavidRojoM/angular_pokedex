import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Result } from '../models/Result'
import { Pokemon } from '../models/Pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100'
  // API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000'

  constructor(public http: HttpClient) {}

  getPokelist() {
    return this.http.get<Result>(this.API_URL)
  }

  getPokemon(url: string) {
    return this.http.get<Pokemon>(url)
  }
}
