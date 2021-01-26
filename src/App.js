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
      fullName: 'Foo Bar',
      question: '',
      answer: 'I cannot give you an answer until you ask a question!',
      isActive: true,
      error: null,
      activeClass: 'active',
      errorClass: 'text-danger'
    }
  },
  computed: {
    // computed attribute getter and setter
    reversedMessage: {
      get: function () {
        return this.inputMsg.split('').reverse().join('')
      },
      set: function (newValue) {
        this.inputMsg = newValue
      }
    },
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    },
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    reverseMessage () {
      this.helloWorld2msg = this.helloWorld2msg.split('').reverse().join('')
    },
    btnClicked () {
      console.log('this btn is clicked.')
    },
    getAnswer () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
}
