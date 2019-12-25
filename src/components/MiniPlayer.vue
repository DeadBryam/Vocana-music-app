<template>
  <q-card class="shadow-0">
    <q-card-section>
      <div class="row">
        <div class="col-4 col-sm-2 col-md-1 margin-auto" id="cover">
          <q-img
            id="cover-image"
            src="https://e-cdns-images.dzcdn.net/images/cover/a5cb60a182d5df68d5721df9fa75c02b/500x500-000000-80-0-0.jpg"
            class="vertical-middle shadow-3"
          ></q-img>
        </div>
        <div class="col-8 col-sm-10 col-md-11" id="controls">
          <div class="row" style="height:100%;">
            <div class="col-6 margin-auto">
              <div class="column">
                <p class="none player player-title">Sing to me</p>
                <p class="none player player-author">MISSIO</p>
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
                v-model="media.time"
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
    <audio id="music">
      <source
        src="https://cdns-preview-f.dzcdn.net/stream/c-f374d861d381afe9909da18f5c5c3517-3.mp3"
        type="audio/mpeg"
      />
    </audio>
  </q-card>
</template>

<script>
import { Platform } from "quasar";
import "mediaelement";
export default {
  name: "MiniPlayer",
  data() {
    return {
      song: null,
      media: {
        icon: "play_arrow",
        time: 0
      }
    };
  },
  methods: {
    playSong() {
      this.media.icon = this.song.paused ? "pause" : "play_arrow";
      this.song.paused ? this.song.play() : this.song.pause();
      // console.log((this.song.currentTime / this.song.duration) * 100);
    },
    changeTime(time) {
      // console.log((time / 100) * this.song.duration);
      this.song.currentTime = (time / 100) * this.song.duration;
    }
  },
  mounted: function() {
    this.song = document.querySelector("audio");

    this.song.ontimeupdate = () => {
      this.media.time = (this.song.currentTime / this.song.duration) * 100;
    };

    this.song.onended = () => {
      this.media.icon = "play_arrow";
      this.media.time = 0;
    };
  }
};
</script>

<style lang="sass">
@import ../css/components/mixin

// .q-card
//   position: absolute
//   bottom: 0
//   width: 100%
.margin-auto
  margin: auto
.q-slider__thumb-container
  display: none
.q-slider__track-container
  border-radius: 10px
  background: $secondary
.q-card__section
  background: #F5F5F6
.q-slider
  position: absolute
  bottom: 0
#cover-image
  width: 70%
  border-radius: 10px
.player
  font-family: 'aBeeZee'
.player-author
  color: #AAAFB3
.media-button-handler
  float: right
  button
    margin: 0 2px

@include for-size(phone)
  .media-button
    font-size: 10px
  .q-card__section
    padding: 10px 20px 10px 10px
  #cover
    margin-left: 10px
  #controls
    margin-left: -10px
  .player-title
    font-size: 5vw
  .player-author
    font-size: 4vw
  .q-slider__track-container
    height: 6px

@include for-size(tablet-portrait)
  .media-button
    font-size: 12px
  .q-card__section
    padding: 15px
  .player-title
    font-size: 3.2vw
  .player-author
    font-size: 2vw
  .q-slider__track-container
    height: 8px

@include for-size(tablet-landscape)
  #cover-image
    width: 80%
  .media-handler
    margin: 0
  .player-title
    font-size: 2vw
  .player-author
    font-size: 1.6vw
    margin-top: -8px

@include for-size(desktop)
  .media-button
    font-size: 16px
  .q-card__section
    padding: 20px
  .player-title
    font-size: 1.7vw
  .player-author
    font-size: 1.2vw
  .q-slider__track-container
    height: 9px
</style>
