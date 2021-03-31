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
      // update running model data table
      this.runningModelData = res.data.runningModelList
      this.runningModelDataPagination.count = this.runningModelData.length
      this.runningModelDataLoading = false
      // update finished model data table
      this.finishedModelData = res.data.finishedModelList
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
