<template>
  <q-card class="shadow-0 mini-player">
    <q-card-section>
      <div class="row">
        <div class="col-4 col-sm-2 col-md-1 margin-auto" id="cover">
          <q-img
            id="cover-image"
            :src="actualSong.album.cover_big"
            class="vertical-middle shadow-3"
          ></q-img>
          <q-img
            id="cover-shadow"
            :src="actualSong.album.cover_big"
            class="vertical-middle shadow-3"
          ></q-img>
        </div>
        <div class="col-8 col-sm-10 col-md-11" id="controls">
          <div class="row" style="height:100%;">
            <div class="col-6 margin-auto">
              <div class="column">
                <div class="none player player-title">
                  {{ actualSong.title }}
                </div>
                <div class="none player player-author">
                  {{ actualSong.artist.name }}
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
                  :icon="media.icon"
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
                v-model="media.time"
                thumb-path=""
                :dense="true"
                color="primary"
                :min="0"
                :max="100"
                :step="0.01"
                @change="changeTime"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <audio id="music" ref="music">
      <source :src="actualSong.preview" type="audio/mpeg" />
    </audio>
  </q-card>
</template>

<script>
import { Platform } from "quasar";
export default {
  name: "MiniPlayer",
  data() {
    return {
      song: null,
      media: {
        icon: "pause",
        time: 0
      }
    };
  },
  methods: {
    playSong() {
      this.media.icon = this.song.paused ? "pause" : "play_arrow";
      this.song.paused ? this.song.play() : this.song.pause();
    },
    changeTime(time) {
      this.song.currentTime = (time / 100) * this.song.duration;
    }
  },
  mounted: function() {
    this.song = this.$refs.music;

    this.song.ontimeupdate = () => {
      this.media.time = (this.song.currentTime / this.song.duration) * 100;
    };

    this.song.onended = () => {
      this.media.icon = "play_arrow";
      this.media.time = 0;
    };
    this.song.play();
  },
  computed: {
    actualSong: {
      get: function() {
        return this.$store.state.songs.actual;
      }
    }
  },
  watch: {
    actualSong(newValue, oldValue) {
      this.song.load();
      this.media.icon = "pause";
      this.media.time = 0;
      this.song.play();
    }
  }
};
</script>

<style lang="sass" scoped>
@import ../css/components/mixin
#cover
  position: relative
#cover-shadow
  filter: blur(30px)
  width: 56%
  position: absolute
  left: 15px
  top: 20px
  z-index: 0
#cover-image
  width: 70%
  border-radius: 10px
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
