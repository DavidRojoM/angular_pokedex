import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Result } from '../models/Result'
import { Pokemon } from '../models/Pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(public http: HttpClient) {}

  getPokelist(apiUrl: string) {
    return this.http.get<Result>(apiUrl)
  }

  getPokemon(url: string) {
    return this.http.get<Pokemon>(url)
  }
}
