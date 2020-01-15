<template>
  <q-page style="display: grid;">
    <div class="margin-auto container short">
      <div class="song-list-title">Result</div>
      <!-- <div class="fit column wrap justify-center"> -->
      <div
        class="text-center song-container"
        :style="{ 'max-height': computedHeight }"
      >
        <q-list >
          <q-item
            clickable
            v-ripple
            class="song-item"
            v-for="(song, index) in songList"
            v-bind:key="index"
            @click="setSong(index)"
          >
            <q-item-section avatar>
              <q-img
                id="cover-image"
                :src="song.album.cover_medium"
                class="vertical-middle shadow-0"
              ></q-img>
            </q-item-section>
            <q-item-section class="text-left">
              <div class="column">
                <div class="song-itram-name">
                  {{ song.title }}
                </div>
                <div class="song-item-author">
                  {{ song.artist.name }}
                </div>
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn
                round
                flat
                color="pink"
                icon="favorite_border"
                class="favorite float-r"
                unelevated
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <!-- </div> -->
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    setSong(index) {
      this.$store.commit("songs/setSong", index);
    }
  },
  computed: {
    songList() {
      return this.$store.state.songs.search.list;
    },
    computedHeight() {
      if (this.$store.state.songs.current.info !== null) {
        return "70vh";
      }
      return "80vh";
    }
  }
};
</script>

<style lang="sass" scoped>
#cover-image
  border-radius: 3px
.song-list-title
  font: 24px Poppins
  font-weight: 600
  color: $font-color
  height: 55px
  display: table-cell
  vertical-align: middle
.song-item
  padding: 8px 1px
  font-family: 'Poppins'
  font-style: italic
  font-weight: bold
.song-item-name
  color: $song-name
  font-size: 14px
.song-item-author
  color: $song-author
  font-size: 12px
.song-container
  overflow-y: auto
</style>
