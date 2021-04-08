<template>
  <div id="selection">
    <label id="titleStyle">{{ title }} :</label>
    <bk-select
      id="selectStyle"
      :value="value"
      @change="handleChange"
      style="width: 250px; display: inline-block;"
      searchable
    >
      <bk-option
        v-for="option in listData"
        :key="option.id"
        :id="option.id"
        :name="option.name"
      ></bk-option>
    </bk-select>
  </div>
</template>

<script>
import { bkSelect, bkOption } from 'bk-magic-vue'

export default {
  name: 'selection',
  components: {
    bkSelect,
    bkOption
  },
  props: {
    title: String,
    list: Array
  },
  data () {
    return {
      value: '',
      listData: this.list
    }
  },
  watch: {
    list (newValue, oldValue) {
      this.listData = newValue
    }
  },
  methods: {
    handleChange (newValue, oldValue) {
      // debugger
      console.log('list prop:')
      console.log(this.list)
      console.log('list data:')
      console.log(this.listData)
      console.log('old value:')
      console.log(oldValue)
      console.log('new value:')
      console.log(newValue)
      console.log('this value:')
      console.log(this.value)
      this.$emit('change', this.value)
    }
  }
}
</script>

<style>
#selection {
  text-align: center;
  margin: 10px;
  display: inline;
}

#labelStyle {
  vertical-align: middle;
}

#selectStyle {
  vertical-align: middle;
  margin-left: 20px;
}
</style>
