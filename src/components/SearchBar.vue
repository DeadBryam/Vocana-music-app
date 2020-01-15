<template>
  <q-input
    @focus="focusSearchBar"
    @blur="blurSearchBar"
    @keydown.enter="searchSongs"
    ref="search-bar"
    bg-color="searchbar"
    color="grey"
    v-model="saveQuery"
    placeholder="Search"
    input-class="search__input"
    class="search-bar"
    :rounded="searchBar.presentationMode"
    :outlined="searchBar.presentationMode"
    :class="{
      bolder: searchBar.icon !== 'search',
      'search-mode': currentRoute === '/',
      'presentation-mode': searchBar.presentationMode && currentRoute === '/'
    }"
  >
    <template v-slot:prepend>
      <q-icon :name="searchBar.icon" @click="clear"></q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchBar: {
        presentationMode: false,
        icon: "search"
      }
    };
  },
  methods: {
    clear() {
      this.$store.commit("songs/saveQuery", "");
    },
    focusSearchBar() {
      this.searchBar.icon = "r_clear";
      if (this.currentRoute === "/") {
        this.searchBar.presentationMode = false;
      }
    },
    blurSearchBar() {
      this.searchBar.icon = "search";
      if (this.currentRoute === "/") {
        this.searchBar.presentationMode = true;
      }
    },
    searchSongs() {
      this.$q.loading.show({ delay: 400 });

      if (this.$store.state.songs.search.query !== "")
        this.$store.commit("songs/search");

      if (this.currentRoute == "/") this.$router.push("/search");
    }
  },
  computed: {
    saveQuery: {
      get() {
        return this.$store.state.songs.search.query;
      },
      set(query) {
        this.$store.commit("songs/saveQuery", query);
      }
    },
    currentRoute() {
      return this.$route.path;
    },
    songList() {
      return this.$store.state.songs.search.list;
    }
  },
  watch: {
    songList(oldList, newList) {
      this.$q.loading.hide();
    },
    currentRoute(now, old) {
      if (now === "/") {
        this.searchBar.presentationMode = true;
      } else {
        this.searchBar.presentationMode = false;
      }
    }
  },
  mounted(){
    if(this.currentRoute === "/"){
      this.searchBar.presentationMode = true;
    }
  }
};
</script>

<style lang="sass" scoped>
@import ../css/components/mixin
.bolder
  div>div>div>i
    font-weight: bold

.search-bar
  div>div>div>i
    padding-left: 10px
    font-size: 30px
    color: $font-color

.search-mode.presentation-mode
  top: 15vh
  width: 80vw
  left: 10vw

.search-mode
  position: absolute
  top: 0
  width: 100vw
  left: 0
  transition: all 0.2s ease-out
  z-index: 100
</style>

<style lang="sass">
.search__input
  font: bold 20px Poppins
  color: $font-color
.presentation-mode
  div>div
    border-radius: 22px !important
    &::before
      border: none !important
</style>
