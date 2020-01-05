<template>
  <q-page>
    <mini-player></mini-player>
    <song-item></song-item>
    <h1>{{ text }}</h1>

  </q-page>
</template>

<script>
import MiniPlayer from "../components/MiniPlayer";
import SongItem from "../components/SongItem"
export default {
  name: "PageIndex",
  components: { MiniPlayer, SongItem },
  data() {
    return {
      text: "VOCANA"
    };
  }
};
</script>

<style lang="sass">
@import ../css/components/mixin

</style>
