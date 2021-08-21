import { Result } from '../models/Result'

export default class FetchComm {
  private static fetchComm: FetchComm
  private _RESULT: Result = { next: '', previous: '', results: [] }
  constructor() {}

  static getInstance(): FetchComm {
    if (this.fetchComm == null) {
      this.fetchComm = new FetchComm()
    }
    return this.fetchComm
  }

  get RESULT(): Result {
    return this._RESULT
  }

  set RESULT(value: Result) {
    this._RESULT = value
  }
}
