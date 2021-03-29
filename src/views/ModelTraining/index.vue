<template>
  <div>
    <bk-table
      style="margin-top: 15px;"
      :data="tableData"
      :size="'small'"
      :pagination="pagination"
      @page-change="handlePageChange"
      @page-limit-change="handlePageLimitChange"
    >
      <bk-table-column
        type="index"
        label="序列"
        width="60"
      ></bk-table-column>
      <bk-table-column
        label="进程编号"
        prop="id"
      ></bk-table-column>
      <bk-table-column
        label="名称"
        prop="scriptName"
      ></bk-table-column>
      <bk-table-column
        label="创建时间"
        prop="launchTime"
      ></bk-table-column>
      <bk-table-column
        label="状态"
        prop="status"
      ></bk-table-column>
      <bk-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="props">
          <bk-button
            class="mr10"
            theme="primary"
            text
            :disabled="props.row.status === 'Finished' || props.row.status === 'Killed'"
            @click="killModel(props.row)"
          >终止</bk-button>
        </template>
      </bk-table-column>
    </bk-table>
  </div>
</template>

<script>
import axios from 'axios'
import { bkTable, bkTableColumn } from 'bk-magic-vue'

export default {
  name: 'ModelTraining',
  components: {
    bkTable,
    bkTableColumn
  },
  created () {
    axios.get('http://localhost:8000/api/getModelTrainingInfo').then((res) => {
      console.log(res)
      this.tableData = res.data.data
    })
  },
  data () {
    return {
      haha: 'Model training',
      tableData: [],
      pagination: {
        current: 1,
        count: 500,
        limit: 20
      }
    }
  },
  methods: {
    killModel (row) {
      const param = {
        id: row.id,
        scriptName: row.scriptName
      }
      console.log(param)
      axios.post('http://localhost:8000/api/killModel', param).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$bkNotify({
            theme: 'success',
            title: 'Success',
            message: 'Model has been killed',
            offsetY: 80,
            limitLine: 3
          })
        }
      })
    },
    handlePageLimitChange () {
      console.log('handlePageLimitChange', arguments)
    },
    handlePageChange (page) {
      this.pagination.current = page
    }
  }
}
</script>
