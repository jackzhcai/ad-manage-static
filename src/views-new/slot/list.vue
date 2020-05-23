<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.appId" placeholder="请选择应用名" clearable style="width: 180px" class="filter-item">
        <el-option v-for="item in apps" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.adType" placeholder="请选择广告形式" clearable class="filter-item" style="width: 180px">
        <el-option v-for="item in ads" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
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
      <el-table-column label="应用ID" align="center">
        <template slot-scope="{row}">
          <span>{{ row.appId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告位ID" align="center">
        <template slot-scope="{row}">
          <span>{{ row.slotId }}</span>
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
import { apps, ads } from '../common/contant'
import { fetchSoltList } from '@/api/article-new'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SlotList',
  components: { Pagination },
  directives: { waves },
  data() {
    const querys = this.$route.query || {}
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        appId: parseInt(querys.app_id) || '',
        adType: ''
      },
      apps: apps,
      ads: ads
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
