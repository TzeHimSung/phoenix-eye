<template>
  <div id="ModelApp">
    <bk-dialog
      theme="primary"
      title="输出详情"
      v-model="outputDetailShow"
      width="80%"
      :header-position="'left'"
    >
      <bk-table
        style="margin-top: 15px"
        :data="projectResultContent"
        :size="'small'"
        :pagination="projectResultContentPagination"
        v-bkloading="{ isLoading: projectResultContentLoading, zIndex: 10}"
        @page-change="handleResultPageChange"
        @page-limit-change="handleResultPageLimitChange"
      >
        <bk-table-column
          type="index"
          label="ID"
          width="60"
        ></bk-table-column>
        <bk-table-column
          label="出生日期"
          prop="BIR"
        ></bk-table-column>
        <bk-table-column
          label="教育程度"
          prop="EDU"
        ></bk-table-column>
        <bk-table-column
          label="户籍"
          prop="HJ"
        ></bk-table-column>
        <bk-table-column
          label="地址"
          prop="LOC"
        ></bk-table-column>
        <bk-table-column
          label="涉案金额"
          prop="MON"
        ></bk-table-column>
        <bk-table-column
          label="民族"
          prop="NAT"
        ></bk-table-column>
        <bk-table-column
          label="姓名"
          prop="PER"
        ></bk-table-column>
        <bk-table-column
          label="日期"
          prop="T"
        ></bk-table-column>
      </bk-table>
    </bk-dialog>
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
            <bk-button
              class="mr10"
              theme="primary"
              text
              :disabled="props.row.status === '上传中'"
              @click="download(props.row)"
            >下载
            </bk-button>
          </template>
        </bk-table-column>
      </bk-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { bkButton, bkTable, bkTableColumn, bkDialog } from 'bk-magic-vue'

export default {
  name: 'ModelApp',
  components: {
    bkButton,
    bkTable,
    bkTableColumn,
    bkDialog
  },
  created () {
    axios.get('http://localhost:8000/api/getProjectResult').then((res) => {
      if (res.status === 200) {
        this.tableData = this.timePredeal(res.data.projectResultList)
        this.pagination.count = this.tableData.length
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
      projectResultTableLoading: false,
      outputDetailShow: false,
      projectResultContent: [],
      pagination: {
        current: 1,
        count: 3,
        limit: 20
      },
      projectResultContentPagination: {
        current: 1,
        count: 3,
        limit: 20
      },
      projectResultContentLoading: false
    }
  },
  methods: {
    handlePageLimitChange () {
      console.log('handlePageLimitChange', arguments)
    },
    handlePageChange (page) {
      this.pagination.current = page
    },
    handleResultPageChange () {
      console.log('handlePageLimitChange', arguments)
    },
    handleResultPageLimitChange (page) {
      this.projectResultContentPagination.current = page
    },
    detail (row) {
      this.projectResultContentLoading = true
      const param = {
        outputDirName: row.resultDirName
      }
      axios.post('http://localhost:8000/api/loadProjectResult', param).then((res) => {
        this.outputDetailShow = true
        console.log(res.data.content)
        this.projectResultContent = this.resultPredeal(res.data.content.DataList)
        this.projectResultContentLoading = false
      }).catch((err) => {
        console.log(err)
        this.$bkNotify({
          theme: 'danger',
          title: 'Can not load project output detail',
          message: err,
          offsetY: 80,
          limitLine: 3
        })
        this.projectResultContentLoading = false
      })
    },
    resultPredeal (dataListResult) {
      const retDataList = []
      for (let i = 0; i < dataListResult.length; i++) {
        retDataList.push(dataListResult[i].Entity)
      }
      return retDataList
    },
    timePredeal (projectResultList) {
      const retProjectResultList = []
      for (let i = 0; i < projectResultList.length; i++) {
        const tmpDataStoreInfo = projectResultList[i]
        tmpDataStoreInfo.createTime = tmpDataStoreInfo.createTime.split('+')[0].replace('T', ' ')
        retProjectResultList.push(tmpDataStoreInfo)
      }
      return retProjectResultList
    },
    download (row) {
      const param = {
        resultDirName: row.resultDirName
      }
      axios.post('http://localhost:8000/api/downloadResult', param).then((res) => {
        const blob = new Blob([res])
        const filename = param.resultDirName
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, filename)
        }

        // download success notify
        this.$bkNotify({
          theme: 'success',
          title: '下载成功',
          message: '已成功下载 ' + filename,
          offsetY: 80,
          limitLine: 3
        })
      })
    }
  }
}
</script>

<style>
#ProjectResultTable {
  margin-top: 20px;
  margin-left: 18%;
  margin-right: 18%;
}
</style>
