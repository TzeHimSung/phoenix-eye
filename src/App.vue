<template>
  <div id="app">
    <NavMenuOne></NavMenuOne>
    <ElementContainer></ElementContainer>
    <LearnVue></LearnVue>
  </div>
</template>

<script>
// import self defined components
import ElementContainer from '@/components/ElementContainer'
import LearnVue from '@/components/LearnVue'
import NavMenuOne from '@/components/NavMenuOne'
// default export configuration for App.vue
export default {
  name: 'App',
  components: {
    ElementContainer,
    LearnVue,
    NavMenuOne
  }
}
</script>

<style scoped>
#app {
    position: absolute;
    height: 100%;
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
