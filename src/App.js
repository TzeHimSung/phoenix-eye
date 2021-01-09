// import common components

// import self defined components
import ElementContainer from '@/components/ElementContainer'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld2 from '@/components/HelloWorld2'
import NavMenuOne from '@/components/NavMenuOne'

// default export configuration for App.vue
export default {
  name: 'App',
  components: {
    HelloWorld,
    HelloWorld2,
    ElementContainer,
    NavMenuOne
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
