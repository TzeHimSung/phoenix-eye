<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

    <HelloWorld msg="Welcome to Your Vue.js App" />
    <HelloWorld2 v-bind:msg="helloWorld2msg" />

    <div>
      <p v-if="pSeen">now you can see this p label</p>
    </div>

    <div>
      <ol>
        <li v-for="todo in todos" :key="todo.id">
          {{ todo.text }}
        </li>
      </ol>
    </div>

    <div>
      <p>{{ helloWorld2msg }}</p>
      <button @click="reverseMessage">Reverse message</button>
    </div>

    <div>
      <p>{{ inputMsg }}</p>
      <input v-model="inputMsg">
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloWorld2 from './components/HelloWorld2.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HelloWorld2
  },
  data () {
    return {
      helloWorld2msg: 'this is text message for Helloworld2',
      pSeen: true,
      todos: [
        { id: 1, text: 'Learn JavaScript' },
        { id: 2, text: 'Learn Vue' },
        { id: 3, text: 'Make a big deal' }
      ],
      inputMsg: 'same message'
    }
  },
  methods: {
    reverseMessage () {
      this.helloWorld2msg = this.helloWorld2msg.split('').reverse().join('')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
