<template>
  <div id="DataStore">
    <div id="Selection">
      <selection
        title="项目"
        :list="projectList"
      ></selection>
      <selection
        title="后缀名"
        :list="fileSuffixList"
      ></selection>
    </div>
    <div id="DataTable">
      <bk-table
        style="margin-top: 15px"
        :data="tableData"
        :size="'small'"
        :pagination="pagination"
        @page-change="handlePageChange"
        @page-limit-change="handlePageLimitChange"
      >
        <bk-table-column
          type="index"
          label="ID"
          width="60"
        ></bk-table-column>
        <bk-table-column
          label="文件名"
          prop="fileName"
        ></bk-table-column>
        <bk-table-column
          label="来源"
          prop="source"
        ></bk-table-column>
        <bk-table-column
          label="状态"
          prop="status"
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
              @click="download(props.row)"
            >下载
            </bk-button>
            <bk-button
              class="mr10"
              theme="primary"
              text
              @click="remove(props.row)"
            >删除</bk-button>
          </template>
        </bk-table-column>
      </bk-table>
    </div>
    <div style="margin-top: 40px; width: 60%; display: inline-block">
      <bk-divider align="center">上传数据</bk-divider>
    </div>
    <div id="UploadData">
      <bk-upload
        :tip="'最多上传10个文件'"
        :limit="uploadLimit"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'http://localhost:8000/api/uploadData'"
        @on-success="uploadSuccess"
        @on-progress="uploadProgress"
        @on-done="uploadDone"
        @on-error="uploadErr"
      ></bk-upload>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import selection from '@/components/Selection'
import {
  bkTable,
  bkTableColumn,
  bkButton,
  bkUpload,
  bkDivider
} from 'bk-magic-vue'

export default {
  name: 'DataStore',
  components: {
    selection,
    bkTable,
    bkTableColumn,
    bkButton,
    bkUpload,
    bkDivider
  },
  created () {
    // get data store information
    axios.get('http://localhost:8000/api/getDataStoreInfo').then((res) => {
      this.tableData = res.data.dataStoreInfo
      this.tableDataAll = this.tableData
      this.projectList = res.data.projectList
      this.fileSuffixList = res.data.fileSuffixList
    })
  },
  data () {
    return {
      projectList: [
        {
          id: 0,
          name: 'Sample Project'
        }
      ],
      fileSuffixList: [
        {
          id: 0,
          name: 'Sample file suffix'
        }
      ],
      size: 'small',
      tableData: [
        {
          fileName: 'Sample data',
          source: '用户上传',
          status: '上传中',
          createTime: '2021-01-25 15:02:24'
        }
      ],
      tableDataAll: [
        {
          fileName: 'Sample model',
          source: '用户上传',
          status: '上传中',
          createTime: '2021-01-25 15:02:24'
        }
      ],
      pagination: {
        current: 1,
        count: 3,
        limit: 20
      },
      uploadLimit: 10
    }
  },
  methods: {
    handlePageLimitChange () {
      console.log('handlePageLimitChange', arguments)
    },
    handlePageChange (page) {
      this.pagination.current = page
    },
    uploadSuccess (file, fileList) {
      this.$bkNotify({
        theme: 'success',
        title: '上传成功',
        message: file.name + ' 上传成功',
        offsetY: 80,
        limitLine: 3
      })
    },
    uploadProgress (e, file, fileList) {
      console.log(e, file, fileList, 'progress')
    },
    uploadDone () {
      console.log('done')
    },
    uploadErr (file, fileList) {
      this.$bkNotify({
        theme: 'error',
        title: '上传失败',
        message: '无法上传' + file.name + '，请检查网络连接',
        offsetY: 80,
        limitLine: 3
      })
    },
    handleRes (res) {
      // upload successfully
      if (res.id === 0) {
        const newTableData = this.tableData
        newTableData.push({
          fileName: res.filelist[0],
          source: '用户上传',
          status: '已完成',
          createTime: '2021-03-23 00:00:00'
        })
        this.tableData = newTableData
        return true
      }
      return false
    },
    download (row) {
      const param = {
        filename: row.fileName
      }
      axios.post('http://localhost:8000/api/downloadData', param).then((res) => {
        const content = res
        const blob = new Blob([content])
        const filename = param.filename
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
      }).catch((err) => {
        this.$bkNotify({
          theme: 'error',
          title: '下载失败',
          message: err,
          offsetY: 80,
          limitLine: 3
        })
      })
    },
    remove (row) {
      const param = {
        filename: row.fileName
      }
      // confirm delete file or not
      this.$bkInfo({
        title: '是否要删除文件 ' + param.filename,
        confirmFn: () => {
          axios.post('http://localhost:8000/api/deleteData', param).then((res) => {
            if (res.data.id === 0) {
              const newTableData = this.tableData
              newTableData.splice(newTableData.indexOf(row), 1)
              this.tableData = newTableData
              // delete success notify
              this.$bkNotify({
                theme: 'success',
                title: '删除成功',
                message: '成功删除文件 ' + param.filename,
                offsetY: 80,
                limitLine: 3
              })
            }
          }).catch((err) => {
            // do not delete this log
            console.log(err)
            this.$bkNotify({
              theme: 'error',
              title: '删除失败',
              message: err,
              offsetY: 80,
              limitLine: 3
            })
          })
        }
      })
    }
  }
}
</script>

<style>
#DataTable {
  margin-top: 20px;
  margin-left: 18%;
  margin-right: 18%;
}

#UploadData {
  margin-top: 40px;
  margin-left: 18%;
  margin-right: 18%;
}
</style>
