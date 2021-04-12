<template>
  <div id="ModelTraining">
    <div id="CardContainer">
      <bk-card
        title="Running Model"
        :is-collapse="true"
        :collapse-status="true"
      >
        <div id="DataTable">
          <bk-table
            style="margin-top: 15px;"
            :data="runningModelData"
            :size="'small'"
            :pagination="runningModelDataPagination"
            v-bkloading="{ isLoading: runningModelDataLoading, zIndex: 10 }"
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
              prop="projectName"
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
                  @click="killProject(props.row)"
                >终止</bk-button>
              </template>
            </bk-table-column>
          </bk-table>
        </div>
      </bk-card>
    </div>
    <div id="CardContainer">
      <bk-card
        title="Finished Model"
        :is-collapse="true"
        :collapse-status="true"
      >
        <div id="DataTable">
          <bk-table
            style="margin-top: 15px;"
            :data="finishedModelData"
            :size="'small'"
            :pagination="finishedModelDataPagination"
            v-bkloading="{ isLoading: finishedModelDataLoading, zIndex: 10 }"
            @page-change="handlePageChange"
            @page-limit-change="handlePageLimitChange"
          >
            <bk-table-column
              type="index"
              label="序列"
              width="60"
            ></bk-table-column>
            <bk-table-column
              label="名称"
              prop="projectName"
            ></bk-table-column>
            <bk-table-column
              label="创建时间"
              prop="launchTime"
            ></bk-table-column>
            <bk-table-column
              label="状态"
              prop="status"
            ></bk-table-column>
          </bk-table>
        </div>
      </bk-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { bkTable, bkTableColumn, bkCard } from 'bk-magic-vue'

export default {
  name: 'ModelTraining',
  components: {
    bkTable,
    bkTableColumn,
    bkCard
  },
  created () {
    axios.get('http://localhost:8000/api/getRunningProjectInfo').then((res) => {
      console.log(res)
      // convert time format
      const runningProjectList = this.timePredeal(res.data.runningProjectList)
      // update running model data table
      this.runningModelData = runningProjectList
      this.runningModelDataPagination.count = this.runningModelData.length
      this.runningModelDataLoading = false
      // convert time format
      const finishedProjectList = this.timePredeal(res.data.finishedProjectList)
      // update finished model data table
      this.finishedModelData = finishedProjectList
      this.finishedModelDataPagination.count = this.finishedModelData.length
      this.finishedModelDataLoading = false
    })
  },
  data () {
    return {
      haha: 'Model training',
      runningModelData: [],
      finishedModelData: [],
      runningModelDataPagination: {
        current: 1,
        count: 500,
        limit: 20
      },
      finishedModelDataPagination: {
        current: 1,
        count: 500,
        limit: 20
      },
      runningModelDataLoading: true,
      finishedModelDataLoading: true
    }
  },
  methods: {
    timePredeal (modelStoreInfo) {
      var retDataStoreInfo = []
      for (let i = 0; i < modelStoreInfo.length; i++) {
        var tmpDataStoreInfo = modelStoreInfo[i]
        if (tmpDataStoreInfo.launchTime.indexOf('.') !== -1) {
          tmpDataStoreInfo.launchTime = tmpDataStoreInfo.launchTime.split('.')[0].replace('T', ' ')
        } else {
          tmpDataStoreInfo.launchTime = tmpDataStoreInfo.launchTime.split('+')[0].replace('T', ' ')
        }
        tmpDataStoreInfo.finishTime = tmpDataStoreInfo.finishTime.split('+')[0].replace('T', ' ')
        retDataStoreInfo.push(tmpDataStoreInfo)
      }
      return retDataStoreInfo
    },
    killProject (row) {
      const param = {
        id: row.id,
        projectName: row.projectName
      }
      axios.post('http://localhost:8000/api/killProject', param).then((res) => {
        if (res.status === 200) {
          // delete log from running model table
          var newTableData = this.runningModelData
          newTableData.splice(newTableData.indexOf(row), 1)
          this.runningModelData = newTableData
          // update running model table pagination
          this.runningModelDataPagination.count -= 1
          // add log to finished model table
          newTableData = this.finishedModelData
          newTableData.push({
            projectName: res.data.projectName,
            launchTime: res.data.projectLaunchTime,
            status: res.data.projectStatus
          })
          // update finished model table pagination
          this.finishedModelDataPagination.count += 1
          // tips
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

<style>
#CardContainer {
  margin-top: 20px;
  margin-left: 18%;
  margin-right: 18%;
}

#DataTable {
  margin: 3px;
}
</style>
