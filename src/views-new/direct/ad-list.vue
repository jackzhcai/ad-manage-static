
<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex; justify-items: flex-start; padding-bottom: 24px;">
      <!--<el-button type="primary" style="margin-right: 24px;" @click="handleAddRole">新增</el-button>-->
      <el-input v-model="listQuery.advertiserName" placeholder="请输入广告主名称" style="width: 200px; margin-bottom: 0; margin-right: 12px;" class="filter-item" />
      <el-button v-waves class="filter-item" style="margin-bottom: 0;" type="primary" icon="el-icon-search" @click="handleFilter">
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
          <span>{{ row.auditStatusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="操作">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.auditStatus !== 0 && scope.row.auditStatus !== 1" type="primary" size="small">编辑</el-button>
          <el-button :disabled="scope.row.auditStatus < 4" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑广告':'新增广告'">
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="广告位名称">
          <el-input v-model="form.slotName" placeholder="请输入广告位名称" />
        </el-form-item>
        <el-form-item label="优先级列表">
          <el-select v-model="form.priorityLevel" style="width: 100%" placeholder="请选择优先级列表">
            <el-option label="有道" :value="1" />
            <el-option label="直客" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { fetchAdList } from '@/api/new/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultForm = {
  id: '',
  slotId: '',
  slotName: '',
  priorityLevel: '',
  priorityLevelDesc: ''
}
export default {
  name: 'AdList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,

      loading: false,
      listLoading: true,
      form: Object.assign({}, defaultForm),
      dialogVisible: false,
      dialogType: 'new',

      listQuery: {
        page: 1,
        pageSize: 20,
        advertiserId: ''
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
      this.listQuery.advertiserName = querys.advertiser_name || ''
    },
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
          ad_name: data.adName || ''
        }
      })
    },
    goToCreativeListForAdvertiser(index) {
      const data = this.list[index] || {}
      this.$router.push({
        name: 'CreativeList',
        query: {
          advertiser_name: data.advertiserName || ''
        }
      })
    },
    handleAddRole() {
      this.form = Object.assign({}, defaultForm)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.form = deepClone(scope.row)
      this.$nextTick(() => {
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除吗？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    confirmRole() {
      let msg = ''
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        msg = '编辑成功！'
      } else {
        msg = '新建成功！'
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.dialogVisible = false
        this.$message.success(msg)
      }, 1000)
    }
  }
}
</script>
