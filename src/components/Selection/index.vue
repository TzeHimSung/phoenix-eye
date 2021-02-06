<template>
  <div id="selection">
    <label id="titleStyle">{{ title }} :</label>
    <bk-select
      id="selectStyle"
      :disabled="false"
      v-model="value"
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
