<template>
  <div id="DataStore">
    <selection title="Project" :list="projectList"></selection>
  </div>
</template>

<script>
import selection from '@/components/Selection'

export default {
  name: 'DataStore',
  components: {
    selection
  },
  data () {
    return {
      projectList: [
        {
          id: 0,
          name: 'Project 0'
        },
        {
          id: 1,
          name: 'Project 1'
        },
        {
          id: 2,
          name: 'Project 2'
        }
      ]
    }
  }
}
</script>
