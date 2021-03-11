<template>
  <div id="ModelStore">
    <div id="Selection">
      <selection title="项目" :list="projectList"></selection>
      <selection title="后缀名" :list="fileSuffixList"></selection>
      <bk-button theme="primary" style="margin-left: 10px;">上传模型</bk-button>
    </div>
    <div id="DataTable">
      <bk-table style="margin-top: 15px" :data="data" :size="'small'" :pagination="pagination"
        @page-change="handlePageChange" @page-limit-change="handlePageLimitChange">
        <bk-table-column type="index" label="ID" width="60"></bk-table-column>
        <bk-table-column label="文件名" prop="fileName"></bk-table-column>
        <bk-table-column label="来源" prop="source"></bk-table-column>
        <bk-table-column label="状态" prop="status"></bk-table-column>
        <bk-table-column label="创建时间" prop="createTime"></bk-table-column>
        <bk-table-column label="操作" width="150">
          <template slot-scope="props">
            <bk-button class="mr10" theme="primary" text :disabled="props.row.status === '上传中'"
              @click="reset(props.row)">下载
            </bk-button>
            <bk-button class="mr10" theme="primary" text @click="remove(props.row)">删除</bk-button>
          </template>
        </bk-table-column>
      </bk-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import selection from '@/components/Selection'
import { bkTable, bkTableColumn, bkButton } from 'bk-magic-vue'

export default {
  name: 'ModelStore',
  components: {
    selection,
    bkTable,
    bkTableColumn,
    bkButton
  },
  created () {
    // get model store information
    axios.get('http://localhost:8000/api/getModelStoreInfo').then(res => {
      console.log(res.data)
      this.data = res.data['modelStoreInfo']
    })
  },
  data () {
    return {
      projectList: [
        {
          id: 0,
          name: 'Project 0'
        },
        {
          id: 1,
          name: 'Project 1'
        },
        {
          id: 2,
          name: 'Project 2'
        }
      ],
      fileSuffixList: [
        {
          id: 0,
          name: 'py'
        },
        {
          id: 1,
          name: 'other'
        }
      ],
      size: 'small',
      data: [
        {
          fileName: '模型1',
          source: '用户上传',
          status: '上传中',
          createTime: '2021-01-25 15:02:24'
        },
        {
          fileName: '模型2',
          source: '输出结果',
          status: '正常',
          createTime: '2021-01-25 15:02:24'
        },
        {
          fileName: '模型3',
          source: '用户上传',
          status: '上传中',
          createTime: '2021-01-25 15:02:24'
        }
      ],
      pagination: {
        current: 1,
        count: 3,
        limit: 20
      }
    }
  },
  methods: {
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
#DataTable {
  margin-top: 20px;
  margin-left: 18%;
  margin-right: 18%;
  text-align: center;
  vertical-align: middle;
}
</style>
