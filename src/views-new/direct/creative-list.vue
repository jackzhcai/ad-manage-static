<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.advertiserId" placeholder="请选择广告主名称" clearable style="width: 180px" class="filter-item">
        <el-option v-for="item in advertisers" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.adId" placeholder="请选择广告名称" clearable style="width: 180px" class="filter-item">
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
      <el-table-column label="广告名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.adName }}
        </template>
      </el-table-column>
      <el-table-column label="创意名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.creativeName }}
        </template>
      </el-table-column>
      <el-table-column label="宽度" align="center">
        <template slot-scope="{row}">
          <span>{{ row.width }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高度" align="center">
        <template slot-scope="{row}">
          <span>{{ row.height }}</span>
        </template>
      </el-table-column>
      <el-table-column label="url" align="center">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchCreativeList } from '@/api/article-new'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CreativeList',
  components: { Pagination },
  directives: { waves },
  data() {
    const querys = this.$route.query || {}
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      advertisers: [
        {
          name: '小米',
          id: 1
        }
      ],
      ads: [
        {
          name: '信息流',
          id: 1
        }
      ],
      listQuery: {
        page: 1,
        pageSize: 20,
        adId: parseInt(querys.ad_id) || '',
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
      fetchCreativeList(this.listQuery).then(response => {
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
    }
  }
}
</script>
