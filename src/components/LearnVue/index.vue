<template>
  <div>
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
      <input v-model="inputMsg" />
    </div>
    <div>
      <p>Using mustaches: {{ rawHtml }}</p>
      <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    </div>
    <div>
      <button :disabled="isBtnDisabled" @click="btnClicked">Button</button>
    </div>
    <div id="example">
      <p>Original message: "{{ inputMsg }}"</p>
      <p>Computed reversed message: "{{ reversedMessage }}"</p>
      <p>reversed message in function: "{{ reverseMessage() }}"</p>
    </div>
    <div id="demo">
      {{ fullName }}
    </div>
    <div id="watch-example">
      <p>
        Ask a yes/no question:
        <input v-model="question" />
      </p>
      <p>{{ answer }}</p>
    </div>
    <div class="static" :class="classObject"></div>
    <div :class="[activeClass, errorClass]"></div>
    <div :class="[isActive ? activeClass : '', errorClass]"></div>
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
      <label>hahaha</label>
    </div>
    <div :style="[styleObject, styleObject2]"></div>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no, React is awesome!</h1>
    <h1 v-if="Math.random() > 0.5">Now you see me</h1>
    <h1 v-else>Now you don't</h1>
    <div v-if="type === 'a'">a</div>
    <div v-else-if="type === 'b'">b</div>
    <div v-else-if="type === 'c'">c</div>
    <div v-else>not a/b/c</div>
    <!-- a rubbish achievement -->
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username">
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address">
    </template>
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" key="username-input">
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" key="email-input">
    </template>
    <!-- v-show doesn't support template and v-else -->
    <h1 v-show="ok">hello v-show!</h1>
    <div>
      <ul id="example-1">
        <li v-for="item in items" :key="item.message">
          {{ item.message }}
        </li>
      </ul>
    </div>
    <div>
      <ul id="example-2">
        <li v-for="(item, index) in items">
          {{ parentMessage }} - {{ index }} - {{ item.message }}
        </li>
      </ul>
    </div>
    <div>
      <ul id="v-for-object" class="demo">
        <li v-for="value in styleObject">
          {{ value }}
        </li>
      </ul>
    </div>
    <div v-for="(value, key, index) in styleObject">
      {{ index }}. {{ key }}: {{ value }}
    </div>
    <div v-for="item in items" :key="item.message">
      {{ item.message }}
    </div>
    <div>
      <ul>
        <li v-for="n in evenNumbers">{{ n }}</li>
      </ul>
    </div>
    <div id="todo-list-example">
      <form v-on:submit.prevent="addNewTodo">
        <label for="new-todo">Add a todo</label>
        <input
          v-model="newTodoText"
          id="new-todo"
          placeholder="E.g Feed the cat"
        >
        <button>Add</button>
      </form>
      <ul>
        <li
          is="todo-item"
          v-for="(todo, index) in todos"
          v-bind:key="todo.id"
          v-bind:title="todo.title"
          v-on:remove="todos.splice(index, 1)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import HelloWorld2 from '@/components/HelloWorld2'

Vue.component('todo-item', {
  template:
    '<li>' +
      '{{ title }}' +
      '<button v-on:click="$emit(\'remove\')">Remove</button>' +
    '</li>',
  props: ['title']
})

export default {
  components: {
    HelloWorld2
  },
  data () {
    return {
      helloWorld2msg: 'this is text message for Helloworld2',
      pSeen: true,
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
      errorClass: 'text-danger',
      activeColor: 'red',
      fontSize: 30,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      styleObject2: {
        'margin-left': '10px',
        'margin-top': '5px'
      },
      awesome: true,
      type: 'a',
      loginType: 'username',
      ok: true,
      parentMessage: 'Parent',
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],
      numbers: [1, 2, 3, 4, 5],
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
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
    },
    evenNumbers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
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
    }
  },
  methods: {
    reverseMessage () {
      this.helloWorld2msg = this.helloWorld2msg.split('').reverse().join('')
    },
    btnClicked () {
      console.log('this btn is clicked.')
    },
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
}
</script>
