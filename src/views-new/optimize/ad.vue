<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增</el-button>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="dataList"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top:30px;"
    >
      <el-table-column align="center" label="广告位ID">
        <template slot-scope="scope">
          {{ scope.row.slotId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="广告位名称">
        <template slot-scope="scope">
          {{ scope.row.slotName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="优先级列表">
        <template slot-scope="scope">
          {{ scope.row.priorityLevelDesc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑广告优先级':'新增广告优先级'">
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
import { fetchOptimizeAdList } from '@/api/new/optimize'
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
  name: 'OptimizeAd',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      loading: false,
      form: Object.assign({}, defaultForm),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      dataList: [],
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const res = await fetchOptimizeAdList(this.listQuery)
      this.total = res.listCount
      this.dataList = res.data
      setTimeout(() => {
        this.listLoading = false
      }, 300)
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
