<template>
  <q-page style="display: grid;" class="margin-auto container valign-center">
    <div class="text-center">
      <transition-group
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOut"
    >
      <div id="app-name" key="app-name">VOCANA</div>
      <q-img src="/statics/imgs/diamond.png" style="width:200px" key="app-logo"/>
      </transition-group>
    </div>
  </q-page>
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
