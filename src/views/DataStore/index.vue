<template>
  <div id="DataStore">
    <div id="Selection">
      <selection title="项目" :list="projectList"></selection>
      <selection title="后缀名" :list="fileSuffixList"></selection>
      <bk-button theme="primary" style="margin-left: 10px;">上传数据</bk-button>
    </div>
    <div id="DataTable">
      <bk-table style="margin-top: 15px" :data="data" :size="'small'" :pagination="pagination"
        @row-mouse-enter="handleRowMouseEnter" @row-mouse-leave="handleRowMouseLeave" @page-change="handlePageChange"
        @page-limit-change="handlePageLimitChange">
        <bk-table-column type="index" label="ID" width="60"></bk-table-column>
        <bk-table-column label="文件名" prop="ip"></bk-table-column>
        <bk-table-column label="来源" prop="source"></bk-table-column>
        <bk-table-column label="状态" prop="status"></bk-table-column>
        <bk-table-column label="创建时间" prop="create_time"></bk-table-column>
        <bk-table-column label="操作" width="150">
          <template slot-scope="props">
            <bk-button class="mr10" theme="primary" text :disabled="props.row.status === '上传中'" @click="reset(props.row)">下载
            </bk-button>
            <bk-button class="mr10" theme="primary" text @click="remove(props.row)">删除</bk-button>
          </template>
        </bk-table-column>
      </bk-table>
    </div>
  </div>
</template>

<script>
import selection from '@/components/Selection'
import { bkTable, bkTableColumn, bkButton } from 'bk-magic-vue'

export default {
  name: 'DataStore',
  components: {
    selection,
    bkTable,
    bkTableColumn,
    bkButton
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
          name: 'csv'
        },
        {
          id: 1,
          name: 'txt'
        },
        {
          id: 2,
          name: 'json'
        }
      ],
      size: 'small',
      data: [
        {
          ip: '数据1',
          source: '用户上传',
          status: '上传中',
          create_time: '2021-01-25 15:02:24'
        },
        {
          ip: '数据2',
          source: '输出结果',
          status: '正常',
          create_time: '2021-01-25 15:02:24'
        },
        {
          ip: '数据3',
          source: '用户上传',
          status: '上传中',
          create_time: '2021-01-25 15:02:24'
        }
      ],
      pagination: {
        current: 1,
        count: 500,
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
