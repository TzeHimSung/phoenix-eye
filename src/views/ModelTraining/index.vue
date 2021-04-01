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
    axios.get('http://localhost:8000/api/getModelTrainingInfo').then((res) => {
      // convert time format
      const runningModelList = this.timePredeal(res.data.runningModelList)
      // update running model data table
      this.runningModelData = runningModelList
      this.runningModelDataPagination.count = this.runningModelData.length
      this.runningModelDataLoading = false
      // convert time format
      const finishedModelList = this.timePredeal(res.data.finishedModelList)
      // update finished model data table
      this.finishedModelData = finishedModelList
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
    killModel (row) {
      const param = {
        id: row.id,
        scriptName: row.scriptName
      }
      console.log(param)
      axios.post('http://localhost:8000/api/killModel', param).then((res) => {
        console.log(res)
        if (res.status === 200) {
          // delete log from table
          const newTableData = this.runningModelData
          newTableData.splice(newTableData.indexOf(row), 1)
          this.runningModelData = newTableData
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
