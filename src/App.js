// import common components

// import self defined components
import ElementContainer from '@/components/ElementContainer'
import HelloWorld2 from '@/components/HelloWorld2'
import NavMenuOne from '@/components/NavMenuOne'

// default export configuration for App.vue
export default {
  name: 'App',
  components: {
    HelloWorld2,
    ElementContainer,
    NavMenuOne
  },
  created () {
    console.log('test created hook')
    console.log(this.todos)
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
      inputMsg: 'same message',
      rawHtml: '<span style="color: red">This should be red.</span>',
      isBtnDisabled: false,
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    }
  },
  computed: {
    // computed attribute getter
    reversedMessage: {
      get: function () {
        return this.inputMsg.split('').reverse().join('')
      },
      set: function (newValue) {
        this.inputMsg = newValue
      }
    }
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  },
  methods: {
    reverseMessage () {
      this.helloWorld2msg = this.helloWorld2msg.split('').reverse().join('')
    },
    btnClicked () {
      console.log('this btn is clicked.')
    }
  }
}
