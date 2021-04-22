<template>
  <div id="ModelApp">
    <div id="ProjectResultTable">
      <bk-table
        style="margin-top: 15px"
        :data="tableData"
        :size="'small'"
        :pagination="pagination"
        v-bkloading="{ isLoading: projectResultTableLoading, zIndex: 10 }"
        @page-change="handlePageChange"
        @page-limit-change="handlePageLimitChange"
      >
        <bk-table-column
          type="index"
          label="ID"
          width="60"
        ></bk-table-column>
        <bk-table-column
          label="结果目录"
          prop="resultDirName"
        ></bk-table-column>
        <bk-table-column
          label="创建时间"
          prop="createTime"
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
              :disabled="props.row.status === '上传中'"
              @click="detail(props.row)"
            >详情
            </bk-button>
          </template>
        </bk-table-column>
      </bk-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { bkButton, bkTable, bkTableColumn } from 'bk-magic-vue'

export default {
  name: 'ModelApp',
  components: {
    bkButton,
    bkTable,
    bkTableColumn
  },
  created () {
    axios.get('http://localhost:8000/api/getProjectResult').then((res) => {
      if (res.status === 200) {
        this.tableData = res.data.projectResultList
      } else {
        this.$bkNotify({
          theme: 'error',
          title: 'Can not get project result information',
          message: res.data.error,
          limitLine: 3,
          offsetY: 80
        })
      }
    }).catch((err) => {
      console.log(err)
      this.$bkNotify({
        theme: 'error',
        title: 'Can not get project result information',
        message: err,
        limitLine: 3,
        offsetY: 80
      })
    })
  },
  data () {
    return {
      tableData: [],
      projectResultTableLoading: false
    }
  },
  methods: {
    detail (row) {
      console.log(row)
    }
  }
}
</script>
