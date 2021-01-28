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
  </div>
</template>

<script src="./App.js" />

<style src="./App.css" />
