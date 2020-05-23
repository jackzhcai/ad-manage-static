import Mock from 'mockjs'

const count = 3

const OptimizeAdList = []
const OptimizeBudgetList = []
const OptimizeCategoryList = []
const OptimizeDirectList = []

//
for (let i = 0; i < count; i++) {
  var id = i + 1
  //
  var slotName = (i === 10) ? '信息流' : ((i === 2) ? '播放页' : '通栏')
  //
  OptimizeAdList.push(Mock.mock({
    id: id,
    slotId: id,
    slotName: slotName,
    priorityLevel: (i % 2 === 0) ? 1 : 2,
    priorityLevelDesc: (i % 2 === 0) ? '有道' : '直客'
  }))

  OptimizeDirectList.push(Mock.mock({
    id: id,
    slotId: id,
    slotName: slotName,
    priorityLevel: i % 2 === 0 ? 1 : (i % 2 === 1 ? 2 : 3),
    priorityLevelDesc: (i % 2 === 0) ? '小米信息流' : '奇虎信息流'
  }))

  OptimizeCategoryList.push(Mock.mock({
    id: id,
    slotId: id,
    slotName: slotName,
    priorityLevel: i % 2 === 0 ? 1 : (i % 2 === 1 ? 2 : 3),
    priorityLevelDesc: i % 2 === 0 ? '游戏' : (i % 2 === 1 ? '资讯' : '教育')
  }))

  OptimizeBudgetList.push(Mock.mock({
    id: id,
    slotId: id,
    slotName: slotName,
    budget: i % 3 === 0 ? 1 : (i % 3 === 1 ? 2 : 3),
    budgetDesc: i % 3 === 0 ? '奇虎40%' : (i % 3 === 1 ? '百度 50%' : '其他10%')
  }))
}
export default [
  {
    url: '/optimize/ad/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20 } = config.query

      const mockList = OptimizeAdList.filter(item => {
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        status: 0,
        listCount: mockList.length,
        page: page,
        pageSize: pageSize,
        data: pageList
      }
    }
  },
  {
    url: '/optimize/budget/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20 } = config.query

      const mockList = OptimizeBudgetList.filter(item => {
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        status: 0,
        listCount: mockList.length,
        page: page,
        pageSize: pageSize,
        data: pageList
      }
    }
  },
  {
    url: '/optimize/category/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20 } = config.query

      const mockList = OptimizeCategoryList.filter(item => {
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        status: 0,
        listCount: mockList.length,
        page: page,
        pageSize: pageSize,
        data: pageList
      }
    }
  },
  {
    url: '/optimize/direct/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20 } = config.query

      const mockList = OptimizeDirectList.filter(item => {
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        status: 0,
        listCount: mockList.length,
        page: page,
        pageSize: pageSize,
        data: pageList
      }
    }
  }
]
