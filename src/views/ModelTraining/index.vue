<template>
  <div>
    <bk-button
      class="mr10"
      theme="primary"
      @click="launch()"
    >launch model</bk-button>
  </div>
</template>

<script>
import axios from 'axios'
import { bkButton } from 'bk-magic-vue'

export default {
  name: 'ModelTraining',
  components: {
    bkButton
  },
  data () {
    return {
      haha: 'Model training'
    }
  },
  methods: {
    launch () {
      const param = {
        modelname: 'main.py'
      }
      axios.post('http://localhost:8000/api/launchtest', param).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
