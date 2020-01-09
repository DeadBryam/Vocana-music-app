<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-header>
        <search-bar/>
      </q-header>

      <q-page style="display: grid;">
        <router-view />
      </q-page>

      <q-footer>
        <mini-player v-if="showMiniPlayer" />
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import MiniPlayer from "../components/MiniPlayer";
import SearchBar from "../components/SearchBar";
export default {
  name: "MyLayout",
  components: { MiniPlayer, SearchBar },

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    showMiniPlayer() {
      return this.$store.state.songs.actual !== null;
    }
  }
};
</script>

<style lang="sass">
.q-layout__section--marginal
  background-color: transparent
</style>
