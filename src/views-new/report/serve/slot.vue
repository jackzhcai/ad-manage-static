<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex; align-items: flex-start">
      <el-input v-model="listQuery.appName" placeholder="请输入APP名称" style="width: 200px; margin-right: 6px;" class="filter-item" />
      <el-input v-model="listQuery.slotName" placeholder="请输入广告位" style="width: 200px; margin-right: 6px;" class="filter-item" />
      <el-date-picker
        v-model="listQuery.date"
        type="date"
        style="margin-right: 6px;"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      />
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
      <el-table-column label="APP名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.appName }}
        </template>
      </el-table-column>
      <el-table-column label="广告位" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="goToReportServeChannel(scope.$index)"
          >
            {{ scope.row.slotName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="曝光" align="center">
        <template slot-scope="scope">
          {{ scope.row.impressonCount }}
        </template>
      </el-table-column>
      <el-table-column label="点击" align="center">
        <template slot-scope="{row}">
          <span>{{ row.clickCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="填充率" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fillingRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="曝光成功率" align="center">
        <template slot-scope="{row}">
          <span>{{ row.successRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ECPM" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ecpm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CTR" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ctr }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchReportServeSlotList } from '@/api/new/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ReportServeSlot',
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
        slotName: '',
        date: ''
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
      fetchReportServeSlotList(this.listQuery).then(response => {
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
    goToReportServeChannel(index, list) {
      const data = this.list[index] || {}
      this.$router.push({
        name: 'ReportServeChannel',
        query: {
          slot_name: data.slotName
        }
      })
    }
  }
}
</script>
