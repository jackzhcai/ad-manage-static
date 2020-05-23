<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex; justify-items: flex-start; padding-bottom: 24px;">
      <el-button type="primary" style="margin-right: 24px;" @click="handleAddRole">新增</el-button>
      <el-input v-model="listQuery.companyName" placeholder="请输入公司名称" style="width: 200px; margin-bottom: 0; margin-right: 12px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" style="margin-bottom: 0" type="primary" icon="el-icon-search" @click="handleFilter">
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
          <span>{{ row.auditStatusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="操作">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.auditStatus !== 0 && scope.row.auditStatus !== 1" type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button :disabled="scope.row.auditStatus < 4" type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑媒体':'新增媒体'">
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
import { fetchSupplyList } from '@/api/new/article'
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
  name: 'SupplyList',
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
          app_name: data.appName
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
