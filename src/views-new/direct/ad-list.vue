
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.advertiserId" placeholder="请选择广告主名称" clearable style="width: 180px" class="filter-item">
        <el-option v-for="item in advertisers" :key="item.id" :label="item.name" :value="item.id" />
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
      <el-table-column label="广告主名称" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="goToCreativeListForAdvertiser(scope.$index)"
          >
            {{ scope.row.advertiserName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="广告名称" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="goToCreativeListForAd(scope.$index)"
          >
            {{ scope.row.adName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="总预算" align="center">
        <template slot-scope="{row}">
          <span>{{ row.totalBudget }}</span>
        </template>
      </el-table-column>
      <el-table-column label="每日预算" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dailyBudget }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统" align="center">
        <template slot-scope="{row}">
          <span>{{ row.OS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地域" align="center">
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="媒体类别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mediaType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.priceType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告价格" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投放开始时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="落地页" align="center">
        <template slot-scope="{row}">
          <span>{{ row.clickUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { advertisers } from '../common/contant'
import { fetchAdList } from '@/api/article-new'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AdList',
  components: { Pagination },
  directives: { waves },
  data() {
    const querys = this.$route.query || {}
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      advertisers: advertisers,
      listQuery: {
        page: 1,
        pageSize: 20,
        advertiserId: parseInt(querys.advertiser_id) || ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchAdList(this.listQuery).then(response => {
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
    goToCreativeListForAd(index) {
      const data = this.list[index] || {}
      this.$router.push({
        name: 'CreativeList',
        query: {
          ad_id: data.adId || ''
        }
      })
    },
    goToCreativeListForAdvertiser(index) {
      const data = this.list[index] || {}
      this.$router.push({
        name: 'CreativeList',
        query: {
          advertiser_id: data.advertiserId || ''
        }
      })
    }
  }
}
</script>
