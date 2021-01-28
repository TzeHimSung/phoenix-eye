<template>
  <div id="app">
    <NavMenuOne></NavMenuOne>
    <ElementContainer></ElementContainer>
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

    <div
      class="static"
      :class="classObject"
    ></div>

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
  </div>
</template>

<script src="./App.js" />

<style src="./App.css" />
