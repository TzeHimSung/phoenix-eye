<template>
  <div id="DataStore">
<!--    create project dialog-->
    <bk-dialog
      theme="primary"
      title="创建项目"
      v-model="createProjectShow"
      :header-position="'left'"
      @confirm="createProject"
    >
      <bk-input
        class="mr10"
        v-model="newProjectName"
        :placeholder="'请输入项目名称'"
        :clearable="true"
      ></bk-input>
    </bk-dialog>
<!--    create project dialog end-->
    <div id="Selection">
      <selection
        title="项目"
        @change="changeProject"
        :list="projectList"
      ></selection>
      <bk-button
        class="mr10"
        :theme="'primary'"
        @click="createProjectShow = true"
      >创建项目</bk-button>
      <bk-button
        class="mr10"
        :theme="'default'"
        @click="createVEnv"
        v-bkloading="{ isLoading: createVEnvLoading, zIndex: 10 }"
      >安装虚拟环境</bk-button>
      <bk-button
        class="mr10"
        :theme="'default'"
        @click="installRequirement"
        v-bkloading="{ isLoading: installRequirementLoading, zIndex: 10 }"
      >安装依赖包</bk-button>
      <bk-button
        class="mr10"
        :theme="'danger'"
        @click="deleteProject"
        v-bkloading="{ isLoading: deleteProjectLoading, zIndex: 10 }"
      >删除当前项目</bk-button>
    </div>
    <div id="ProjectFileTable">
      <bk-table
        style="margin-top: 15px"
        :data="tableData"
        :size="'small'"
        :pagination="pagination"
        v-bkloading="{ isLoading: projectFileTableLoading, zIndex: 10 }"
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
import Cookies from 'js-cookie'
import selection from '@/components/Selection'
import {
  bkTable,
  bkTableColumn,
  bkButton,
  bkUpload,
  bkDivider,
  bkDialog,
  bkInput
} from 'bk-magic-vue'

export default {
  name: 'DataStore',
  components: {
    selection,
    bkTable,
    bkTableColumn,
    bkButton,
    bkUpload,
    bkDivider,
    bkDialog,
    bkInput
  },
  created () {
    // get project list
    axios.get('http://localhost:8000/api/getProjectInfo').then((res) => {
      const tmpProjectList = []
      // convert project list style
      for (let i = 0; i < res.data.projectList.length; i++) {
        tmpProjectList.push({
          id: i,
          name: res.data.projectList[i].projectName
        })
      }
      this.projectList = tmpProjectList
    }).catch((err) => {
      console.log(err)
      this.$bkNotify({
        theme: 'error',
        title: 'Can not get project information',
        message: err,
        limitLine: 3,
        offsetY: 80
      })
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
      size: 'small',
      tableData: [
        {
          fileName: 'Please select project',
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
      uploadLimit: 10,
      projectFileTableLoading: false,
      currProject: '',
      createProjectShow: false,
      newProjectName: '',
      createVEnvLoading: false,
      installRequirementLoading: false,
      deleteProjectLoading: false
    }
  },
  methods: {
    handlePageLimitChange () {
      console.log('handlePageLimitChange', arguments)
    },
    handlePageChange (page) {
      this.pagination.current = page
    },
    // file upload process success handler
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
    // file upload process done handler
    uploadDone () {
      console.log('done')
    },
    // file upload process error handler
    uploadErr (file, fileList) {
      this.$bkNotify({
        theme: 'error',
        title: '上传失败',
        message: '无法上传' + file.name + '，请检查网络连接',
        offsetY: 80,
        limitLine: 3
      })
    },
    // file upload process response handler
    handleRes (res) {
      // upload successfully
      if (res.id === 0) {
        console.log(res)
        const newTableData = this.tableData
        // need to change
        newTableData.push({
          fileName: res.filename,
          source: 'User upload',
          status: 'Uploaded',
          createTime: res.createTime
        })
        this.tableData = newTableData
        return true
      }
      return false
    },
    // convert time to yyyy-mm-dd hh:MM:SS style
    timePredeal (dataStoreInfo) {
      var retDataStoreInfo = []
      for (let i = 0; i < dataStoreInfo.length; i++) {
        var tmpDataStoreInfo = dataStoreInfo[i]
        tmpDataStoreInfo.createTime = tmpDataStoreInfo.createTime.split('+')[0].replace('T', ' ')
        retDataStoreInfo.push(tmpDataStoreInfo)
      }
      return retDataStoreInfo
    },
    // download file
    download (row) {
      const param = {
        filename: row.fileName,
        projectName: this.currProject
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
    // delete file
    remove (row) {
      const param = {
        filename: row.fileName,
        projectName: this.currProject
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
    },
    // user typed in new project name and confirm
    createProject () {
      const projectName = this.newProjectName
      this.newProjectName = ''
      this.createProjectShow = false
      const param = {
        projectName: projectName
      }
      axios.post('http://localhost:8000/api/createProject', param).then((res) => {
        if (res.status === 200) {
          this.$bkNotify({
            theme: 'success',
            title: 'Success',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        } else {
          this.$bkNotify({
            theme: 'danger',
            title: 'Failed',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$bkNotify({
          theme: 'danger',
          title: 'Can not create project',
          message: err,
          offsetY: 80,
          limitLine: 3
        })
      })
    },
    // change project
    changeProject (newProjectName) {
      this.currProject = newProjectName
      // set project name in cookie
      Cookies.set('projectName', newProjectName)
      const param = {
        projectName: newProjectName
      }
      axios.post('http://localhost:8000/api/getProjectFile', param).then((res) => {
        if (res.status === 200) {
          this.tableData = this.timePredeal(res.data.fileList)
          this.pagination.count = this.tableData.length
        }
      }).catch((err) => {
        this.$bkNotify({
          theme: 'danger',
          title: 'Can not get project file list',
          message: err,
          offsetY: 80,
          limitLine: 3
        })
      })
    },
    // create virtual environment for current project
    createVEnv () {
      // check select project or not
      if (this.currProject === '') {
        this.$bkNotify({
          theme: 'warning',
          title: 'Project not selected',
          message: 'Please select a project',
          offsetY: 80,
          limitLine: 3
        })
        return
      }
      this.createVEnvLoading = true
      this.$bkNotify({
        theme: 'primary',
        title: 'Installing',
        message: 'Virtual environment is installing, please wait',
        offsetY: 80,
        limitLine: 3
      })
      const param = {
        projectName: this.currProject
      }
      axios.post('http://localhost:8000/api/createVirtualEnv', param).then((res) => {
        if (res.status === 200) {
          this.$bkNotify({
            theme: 'success',
            title: 'Success',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        } else {
          this.$bkNotify({
            theme: 'danger',
            title: 'Failed',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        }
        this.createVEnvLoading = false
      }).catch((err) => {
        console.log(err)
        this.$bkNotify({
          theme: 'danger',
          title: 'Can not create virtual environment',
          message: err,
          offsetY: 80,
          limitLine: 3
        })
        this.createVEnvLoading = false
      })
    },
    // install required software package
    installRequirement () {
      // check select project or not
      if (this.currProject === '') {
        this.$bkNotify({
          theme: 'warning',
          title: 'Project not selected',
          message: 'Please select a project',
          offsetY: 80,
          limitLine: 3
        })
        return
      }
      this.installRequirementLoading = true
      this.$bkNotify({
        theme: 'primary',
        title: 'Installing',
        message: 'Required packages is installing, please wait',
        offsetY: 80,
        limitLine: 3
      })
      const param = {
        projectName: this.currProject
      }
      axios.post('http://localhost:8000/api/installRequirement', param).then((res) => {
        if (res.status === 200) {
          this.$bkNotify({
            theme: 'success',
            title: 'Success',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        } else {
          this.$bkNotify({
            theme: 'danger',
            title: 'Failed',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        }
        this.installRequirementLoading = false
      }).catch((err) => {
        console.log(err)
        this.$bkNotify({
          theme: 'danger',
          title: 'Can not install packages',
          message: err,
          offsetY: 80,
          limitLine: 3
        })
        this.installRequirementLoading = false
      })
    },
    // delete current project
    deleteProject () {
      // check select project or not
      if (this.currProject === '') {
        this.$bkNotify({
          theme: 'warning',
          title: 'Project not selected',
          message: 'Please select a project',
          offsetY: 80,
          limitLine: 3
        })
        return
      }
      this.deleteProjectLoading = true
      this.$bkNotify({
        theme: 'primary',
        title: 'Deleting',
        message: 'Deleting project, please wait',
        offsetY: 80,
        limitLine: 3
      })
      const param = {
        projectName: this.currProject
      }
      axios.post('http://localhost:8000/api/deleteProject', param).then((res) => {
        if (res.status === 200) {
          this.$bkNotify({
            theme: 'success',
            title: 'Success',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        } else {
          this.$bkNotify({
            theme: 'danger',
            title: 'Failed',
            message: res.data.message,
            offsetY: 80,
            limitLine: 3
          })
        }
        this.deleteProjectLoading = false
      }).catch((err) => {
        console.log(err)
        this.$bkNotify({
          theme: 'danger',
          title: 'Can not delete project',
          message: err,
          offsetY: 80,
          limitLine: 3
        })
      })
    }
  }
}
</script>

<style>
#ProjectFileTable {
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
