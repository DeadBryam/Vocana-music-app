<template>
  <div class="margin-auto container valign-center">
    <div class="text-center">
      <div id="app-name">VOCANA</div>
      <q-img src="/statics/imgs/diamond.png" style="width:200px" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
@import ../css/components/mixin
#app-name
  font-family: Mandatory
  font-size: 60px
  color: var(--q-color-accent)
  letter-spacing: 2px
  text-shadow: 2px 2px 4px rgba(100, 100, 100, 0.690196)
  margin-bottom: 0px
  margin-top: 30px
.valign-center
  display: flex
  justify-content: center
  align-items: center
</style>
