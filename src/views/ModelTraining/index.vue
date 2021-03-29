<template>
  <div>
    <bk-button
      class="mr10"
      theme="primary"
      @click="launch()"
    >launch model</bk-button>
    <bk-button
      class="mr10"
      theme="danger"
      @click="killModel()"
    >kill model</bk-button>
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
  created () {
    axios.get('http://localhost:8000/api/getModelTrainingInfo').then((res) => {
      console.log(res)
    })
  },
  data () {
    return {
      haha: 'Model training'
    }
  },
  methods: {
    launch () {
      const param = {
        modelname: 'handleData.py'
      }
      axios.post('http://localhost:8000/api/launchtest', param).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$bkNotify({
            theme: 'success',
            title: 'Success',
            message: 'model is launched',
            offsetY: 80,
            limitLine: 3
          })
        }
      })
    },
    killModel () {
      const param = {
        modelname: 'handleData.py'
      }
      // axios.post('http://localhost:8000/api/killModel', param).then((res) => {
      //   console.log(res)
      //   if (res.status === 200) {
      //     this.$bkNotify({
      //       theme: 'success',
      //       title: 'Success',
      //       message: 'model has been killed',
      //       offsetY: 80,
      //       limitLine: 3
      //     })
      //   }
      // })
      axios.post('http://localhost:8000/api/launchcanceltest', param).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
