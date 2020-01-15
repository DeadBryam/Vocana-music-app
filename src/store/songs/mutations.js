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

export function setSong(state, index) {
  state.current.info = state.search.list[index];
}

export function songInstance(state, instance){
  state.current.song = instance;
}

export function changeIcon(state, icon){
  state.current.state.icon = icon;
}

export function changeTime(state, time){
  state.current.state.time = time;
}

export function changeSongTime(state, time){
  state.current.song.currentTime = time;
}