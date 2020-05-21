import Mock from 'mockjs'

const count = 100
const SupplyList = []
const SlotList = []
const ThirdPartAdList = []

// const arr = [1, 2, 3, 4, 5, 6, 7, 8]

for (let i = 0; i < count; i++) {
  SupplyList.push(Mock.mock({
    id: i + 1,
    companyName: '奇虎',
    appName: '360杀毒',
    os: 'Android,iOS',
    packageName: 'com.qihu.com',
    downloadUrl: 'www.360.com',
    snapShot: 'aa.gif,bb.gif',
    userCount: 300000,
    auditStatus: 1
  }))

  SlotList.push(Mock.mock({
    id: i + 1,
    appId: 1,
    appName: '360杀毒',
    slotId: 1,
    slotName: '开屏',
    adType: 1
  }))

  ThirdPartAdList.push(Mock.mock({
    id: i + 1,
    adPlatformName: '有道',
    dockType: 'API',
    adType: '开屏',
    desc: '有道DSP'
  }))
}

//
SupplyList.push(Mock.mock({
  id: 1001,
  companyName: '360',
  appName: '360杀毒',
  os: 'Android,iOS',
  packageName: 'com.qihu.com',
  downloadUrl: 'www.360.com',
  snapShot: 'aa.gif,bb.gif',
  userCount: 300000,
  auditStatus: 1
}))

//
SlotList.push(Mock.mock({
  id: 1001,
  appId: 2,
  appName: '哔哩哔哩',
  slotId: 2,
  slotName: '开屏',
  adType: 2
}))
SlotList.push(Mock.mock({
  id: 1002,
  appId: 3,
  appName: '爱奇艺',
  slotId: 2,
  slotName: '开屏',
  adType: 2
}))

export default [
  {
    url: '/supply/list',
    type: 'get',
    response: config => {
      const { companyName = '', page = 1, pageSize = 20 } = config.query
      const mockList = SupplyList.filter(item => {
        if (companyName && item.companyName !== companyName) {
          return false
        }
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))
      return {
        status: 0,
        listCount: mockList.length,
        page: Number(page),
        pageSize: Number(pageSize),
        data: pageList
      }
    }
  },
  {
    url: '/slot/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20, appId = '', adType = '' } = config.query
      const mockList = SlotList.filter(item => {
        if (appId && item.appId !== Number(appId)) {
          return false
        }
        if (adType && item.adType !== Number(adType)) {
          return false
        }
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
    url: '/third-part-ad/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20 } = config.query

      const pageList = ThirdPartAdList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        status: 0,
        listCount: ThirdPartAdList.length,
        page: page,
        pageSize: pageSize,
        data: pageList
      }
    }
  }
]

