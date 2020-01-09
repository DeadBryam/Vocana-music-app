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
    :class="{ bolder: searchBar.icon !== 'search' }"
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
        presentationMode: true,
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
    },
    blurSearchBar() {
      this.searchBar.icon = "search";
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
    }
  }
};
</script>

<style lang="sass" scoped>
@import ../css/components/mixin
.search-bars
  position: absolute
  left: 10vw
  top: 15vh
  width: 80vw
  transition: all 0.2s ease-out
  z-index: 100
.search-bars.search-mode
  top: 0
  left: 0
  width: 100vw
  div>div
    &::before
      border: none !important

.bolder
  div>div>div>i
    font-weight: bold

.search-bar
  div>div>div>i
    padding-left: 10px
    font-size: 30px
    color: $font-color
</style>

<style lang="sass">
.search__input
  font: bold 20px Poppins
  color: $font-color
</style>
