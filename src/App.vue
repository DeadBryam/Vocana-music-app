<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch:{
    $route (to,from){
      console.log(to.path)
    }
  }
}
</script>
