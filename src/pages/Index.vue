<template>
  <q-page>
    <mini-player></mini-player>
    <h1>{{text}}</h1>
    
  </q-page>
</template>

<script>
import MiniPlayer from '../components/MiniPlayer'
export default {
  name: "PageIndex",
  components: {MiniPlayer},
  data() {
    return {
      text: "Hello"
    };
  }
};
</script>
