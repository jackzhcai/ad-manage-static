<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" width="80" align="center" sortable="custom" prop="id">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adPlatformName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对接形式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dockType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告形式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="竞价来源" align="center">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchThirdPartAdList } from '@/api/new/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ThirdPartAdList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        appId: '',
        adType: ''
      },
      apps: [
        {
          name: '360杀毒',
          id: 1
        },
        {
          name: '哔哩哔哩',
          id: 2
        },
        {
          name: '爱奇艺',
          id: 3
        }
      ],
      ads: [
        {
          id: 1,
          name: 'name-1'
        },
        {
          id: 2,
          name: 'name-2'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchThirdPartAdList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.listCount
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      // const { prop, order } = data
      // if (prop === 'id') {
      //   this.sortByID(order)
      // }
    },
    sortByID(order) {
      // if (order === 'ascending') {
      //   this.listQuery.sort = '+id'
      // } else {
      //   this.listQuery.sort = '-id'
      // }
      this.handleFilter()
    }
  }
}
</script>
