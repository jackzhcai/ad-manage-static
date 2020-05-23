<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.appName" placeholder="请输入应用名" style="width: 200px;" class="filter-item" />
      <el-input v-model="listQuery.adType" placeholder="请输入广告形式" style="width: 200px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜素
      </el-button>
    </div>
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
      <el-table-column label="应用名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告位名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.slotName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告形式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adType }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchSoltList } from '@/api/new/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SlotList',
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
        appName: '',
        adType: ''
      }
    }
  },
  watch: {
    '$route': {
      deep: true,
      handler() {
        this.setQuery()
        this.handleFilter()
      }
    }
  },
  created() {
    this.setQuery()
    this.getList()
  },
  methods: {
    setQuery() {
      const querys = this.$route.query || {}
      this.listQuery.appName = querys.app_name || ''
    },
    getList() {
      this.listLoading = true
      fetchSoltList(this.listQuery).then(response => {
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
