import Songs from "./../../controller/songs";
const songController = new Songs(`https://${process.env.BASE_URL}`);

export function search(state) {
  if (state.search.query !== "")
    songController
      .getSongByQuery(
        {
          "x-rapidapi-host": process.env.BASE_URL,
          "x-rapidapi-key": process.env.API_KEY
        },
        state.search.query
      )
      .then(r => {
        this.commit("songs/setSongsList", r.data);
      });
}

export function setSongsList(state, data) {
  state.search.list = data;
}

export function saveQuery(state, query) {
  state.search.query = query;
}

export function favorite(state, song) {
  //add
}

export function playSong(state, index) {
  state.actual = state.search.list[index];
}
