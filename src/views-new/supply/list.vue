<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.companyName" placeholder="请输入公司名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="公司名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.companyName }}
        </template>
      </el-table-column>
      <el-table-column label="应用名称" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="goToSlotList(scope.$index)"
          >
            {{ scope.row.appName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="系统" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.os }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用包名" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.packageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下载链接" width="180" align="center">
        <template slot-scope="{row}">
          <span>{{ row.downloadUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="样式截图" width="180" align="center">
        <template slot-scope="{row}">
          <img v-for="(img, index) in row.snapShot" :key="index" :src="img" style="width: 100%; display: block">
        </template>
      </el-table-column>
      <el-table-column label="预估用户" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" min-width="100" align="center">
        <template slot-scope="{row}">
          <span>{{ row.auditStatus }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchSupplyList } from '@/api/article-new'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SupplyList',
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
        companyName: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchSupplyList(this.listQuery).then(response => {
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
    },
    goToSlotList(index, list) {
      const data = this.list[index] || {}
      this.$router.push({
        name: 'SlotList',
        query: {
          app_id: data.appId
        }
      })
    }
  }
}
</script>
