<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-header v-if="fullscreenPlayer">
        <search-bar />
      </q-header>

      <transition-group
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <router-view key="page" />
      </transition-group>

      <q-footer v-if="fullscreenPlayer">
        <transition-group
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <mini-player key="mini-player" v-if="showMiniPlayer" />
        </transition-group>
      </q-footer>
    </q-page-container>

    <!-- Audio tag -->
    <audio id="music" ref="player">
      <source
        :src="currentSong === null ? '' : currentSong.preview"
        type="audio/mpeg"
      />
    </audio>
  </q-layout>
  <!-- :src="currentSong === null ? '' : currentSong.preview" -->
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
      return this.currentSong !== null;
    },
    fullscreenPlayer() {
      return this.$route.path === "/player" ? false : true;
    },
    currentSong() {
      return this.$store.state.songs.current.info;
    },
    songInstance() {
      return this.$store.state.songs.current.song;
    },
    songState() {
      return this.$store.state.songs.current.state;
    }
  },
  mounted() {
    this.$store.commit("songs/songInstance", this.$refs.player);

    this.songInstance.ontimeupdate = () => {
      this.$store.commit(
        "songs/changeTime",
        (this.songInstance.currentTime / this.songInstance.duration) * 100
      );
    };

    this.songInstance.onended = () => {
      this.$store.commit("songs/changeTime", 0);
      this.$store.commit("songs/changeIcon", "play_arrow");
    };

    this.songInstance.onpause = () => {
      this.$store.commit("songs/changeIcon", "r_play_arrow");
    };

    this.songInstance.onplay = () => {
      this.$store.commit("songs/changeIcon", "r_pause");
    };
  },
  watch: {
    currentSong() {
      this.songInstance.load();
      this.songInstance.play();
    }
  }
};
</script>

<style lang="sass">
.q-layout__section--marginal
  background-color: transparent
</style>
