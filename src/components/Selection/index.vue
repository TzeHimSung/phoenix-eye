<template>
  <div id="selection">
    <label id="titleStyle">{{ title }} :</label>
    <bk-select
      id="selectStyle"
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
      listData: this.list
    }
  },
  watch: {
    list (newValue, oldValue) {
      this.listData = newValue
    }
  },
  methods: {
    handleChange (newOptionID) {
      this.$emit('change', this.listData[newOptionID].name)
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

#selectStyle {
  vertical-align: middle;
  margin-left: 20px;
}
</style>
