<template>
  <q-card class="shadow-0 mini-player">
    <q-card-section>
      <div class="row">
        <div class="col-4 col-sm-2 col-md-1 margin-auto" id="cover">
          <q-img
            id="cover-image"
            :src="currentSong.album.cover_medium"
            class="vertical-middle shadow-0"
            @click="changeToPlayer"
          ></q-img>
          <q-img
            id="cover-shadow"
            :src="currentSong.album.cover_small"
            class="vertical-middle shadow-0"
          ></q-img>
        </div>
        <div class="col-8 col-sm-10 col-md-11" id="controls">
          <div class="row" style="height:100%;">
            <div class="col-6 margin-auto">
              <div class="column">
                <div class="none player player-title">
                  {{ currentSong.title }}
                </div>
                <div class="none player player-author">
                  {{ currentSong.artist.name }}
                </div>
              </div>
            </div>
            <div class="col-6 margin-auto media-handler">
              <div class="media-button-handler">
                <q-btn
                  round
                  color="secondary"
                  icon="skip_previous"
                  class="media-button"
                  unelevated
                />
                <q-btn
                  round
                  color="primary"
                  :icon="songState.icon"
                  class="media-button"
                  unelevated
                  @click="playSong"
                />
                <q-btn
                  round
                  color="secondary"
                  icon="skip_next"
                  class="media-button"
                  unelevated
                />
              </div>
            </div>
            <div class="col-12" style="position: relative;">
              <q-slider
                class="duration"
                v-model="songTime"
                thumb-path=""
                :dense="true"
                color="primary"
                :min="0"
                :max="100"
                :step="0.01"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { Platform } from "quasar";
export default {
  name: "MiniPlayer",
  methods: {
    playSong() {
      this.songInstance.paused
        ? this.songInstance.play()
        : this.songInstance.pause();
    },
    changeToPlayer() {
      this.$router.push("/player");
    }
  },
  computed: {
    currentSong() {
      return this.$store.state.songs.current.info;
    },
    songInstance() {
      return this.$store.state.songs.current.song;
    },
    songState() {
      return this.$store.state.songs.current.state;
    },
    songTime: {
      get() {
        return this.songState.time;
      },
      set(time) {
        this.$store.commit(
          "songs/changeSongTime",
          (time / 100) * this.songInstance.duration
        );
      }
    }
  },
  watch: {
    currentSong(newValue, oldValue) {
      this.$store.commit("songs/changeTime", 0);
    }
  }
};
</script>

<style lang="sass" scoped>
@import ../css/components/mixin
#cover
  position: relative
#cover-shadow
  filter: blur(32.6194px)
  width: 50%
  position: absolute
  left: 15%
  top: 15%
  z-index: 0
#cover-image
  width: 70%
  border-radius: 8px
  z-index: 1
.margin-auto
  margin: auto
.q-card__section
  background: #F5F5F6
.q-slider
  position: absolute
  bottom: 0
.player
  font-family: Poppins
  font-weight: 600
.player-title
  color: $song-name
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
  width: 90%
.player-author
  color: $song-author
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
  width: 90%
.media-button-handler
  float: right
  button
    margin: 0 2px
@include for-size(phone)
  .media-button
    font-size: 12px
  .q-card__section
    padding: 10px 20px 10px 10px
  #cover-image
    margin-left: 10px
  #controls
    margin-left: -10px
  .player-title
    font-size: 4.9vw
  .player-author
    font-size: 3.7vw
@include for-size(tablet-portrait)
  .media-button
    font-size: 11px
  .q-card__section
    padding: 15px
  .player-title
    font-size: 3.2vw
  .player-author
    font-size: 1.9vw
@include for-size(tablet-landscape)
  .media-button
    font-size: 12.5px
  #cover-image
    width: 80%
    border-radius: 6px
  .media-handler
    margin: 0
  .player-title
    font-size: 1.8vw
  .player-author
    font-size: 1.5vw
    margin-top: -8px
@include for-size(desktop)
  .media-button
    font-size: 13px
  .q-card__section
    padding: 20px
  .player-title
    font-size: 1.5vw
  .player-author
    font-size: 1vw
</style>

<style lang="sass">
.duration
  div:nth-child(1)
    border-radius: 10px
    background: $secondary
    height: 8px
    div
      background: $primary
</style>
