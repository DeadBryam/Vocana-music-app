export default class songs {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL;
  }

  getSongByQuery(headers, query) {
    if (typeof query !== null)
      return this.request("GET", headers, `search?q=${query}`);
  }

  request(method, headers, params) {
    return fetch(`${this.BASE_URL}/${params}`, {
      method: method,
      headers: headers
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        return [];
      });
  }
}
