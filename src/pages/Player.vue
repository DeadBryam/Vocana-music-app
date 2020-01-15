<template>
  <div>
    <q-header>
      <q-item class="player-header" style="height:50px;">
        <q-item-section avatar @click="$router.go(-1)">
          <q-icon name="r_clear"></q-icon>
        </q-item-section>
        <q-item-section class="text-center">
          Now playing
        </q-item-section>
        <q-item-section side>
          <q-icon name="playlist_play"></q-icon>
        </q-item-section>
      </q-item>
    </q-header>
    <q-page style="width:90vw;margin:auto;display:grid;">
      <div class="fit column wrap">
        <div class="col-9" style="display:flex;">
          <div class="margin-auto" style="position:relative;width: 90%">
            <q-img
              id="cover-image"
              :src="currentSong.album.cover_big"
              class="vertical-middle shadow-0"
            ></q-img>
            <q-img
              id="cover-shadow"
              :src="currentSong.album.cover_small"
              class="vertical-middle shadow-0"
            ></q-img>
          </div>
        </div>
        <div class="col-3">
          <div class="column">
            <q-item style="padding: 10px 0">
              <q-item-section avatar>
                <q-btn
                  round
                  flat
                  color="primary"
                  icon="favorite"
                  class="favorite float-r"
                  unelevated
                  size="lg"
                />
              </q-item-section>
              <q-item-section class="text-center player">
                <div class="none player player-title">
                  {{ currentSong.title }}
                </div>
                <div class="none player player-author">
                  {{ currentSong.artist.name }}
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  round
                  flat
                  icon="block"
                  class="favorite float-r"
                  unelevated
                  size="lg"
                />
              </q-item-section>
            </q-item>
            <div style="position: relative;">
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
            <div>
              <div class="time time-left">{{ secToMin(songInstance.currentTime) }}</div>
              <div class="time time-right">-{{ secToMin(songInstance.duration - songInstance.currentTime) }}</div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
    <q-footer>
      <div class="row text-center" style="width:90vw;margin:auto">
        <div class="col-2 margin-auto">
          <q-btn
            round
            flat
            color="primary"
            icon="r_shuffle"
            class="media-button"
            size="md"
            unelevated
          />
        </div>
        <div class="col-2 margin-auto">
          <q-btn
            round
            color="secondary"
            icon="skip_previous"
            class="media-button"
            size="lg"
            unelevated
          />
        </div>
        <div class="col-4" style="margin: 30px 0 ">
          <q-btn
            round
            color="primary"
            :icon="songState.icon"
            class="media-button"
            size="32px"
            unelevated
            @click="playSong"
          />
        </div>
        <div class="col-2 margin-auto">
          <q-btn
            round
            color="secondary"
            icon="skip_next"
            class="media-button"
            size="lg"
            unelevated
          />
        </div>
        <div class="col-2 margin-auto">
          <q-btn
            round
            flat
            color="primary"
            icon="r_repeat"
            class="media-button"
            size="md"
            unelevated
          />
        </div>
      </div>
    </q-footer>
  </div>
</template>

<script>
export default {
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
  methods: {
    return() {
      this.$router.pop();
    },
    playSong() {
      this.songInstance.paused
        ? this.songInstance.play()
        : this.songInstance.pause();
    },
    secToMin(seconds) {
      let minute = Math.floor((seconds / 60) % 60);
      let second = seconds % 60;
      second = Math.ceil(second)
      second = second < 10 ? "0" + second : second;
      return `${minute}:${second}`;
    }
  }
};
</script>

<style lang="sass" scoped>
#cover-image
  border-radius: 8px
  z-index: 1
#cover-shadow
  filter: blur(34px)
  width: 90%
  position: absolute
  top: 30px
  left: 5%
  z-index: 0
.player-header
  color: $font-color
  font: 18px Poppins
  font-weight: 600
  div>i
    color: $font-color
    font-size: 30px
    font-weight: bold
.player
  font-family: Poppins
  font-weight: 600
.player-title
  color: $song-name
  font-size: 20px
.player-author
  color: $song-author
  font-size: 16px
.time
  color: $song-author
  font-weight: 600
  font: 13px Poppins
.time-left
  float: left
.time-right
  float: right
</style>
