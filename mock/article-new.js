import Mock from 'mockjs'

const count = 40

const SupplyList = []
const SlotList = []
const ThirdPartAdList = []
const AdvertiserList = []
const AdList = []
const CreativeList = []

// const arr = [1, 2, 3, 4, 5, 6, 7, 8]

for (let i = 0; i < count; i++) {
  var id = i + 1
  var appId = (i < 10) ? 1 : ((i >= 10 && i < 20) ? 2 : 3)
  var appName = (i < 10) ? '360杀毒' : ((i >= 10 && i < 25) ? '哔哩哔哩' : '爱奇艺')

  var advertiserId = (i < 10) ? 1 : ((i >= 10 && i < 25) ? 2 : 3)
  var advertiserName = (i < 10) ? '小米' : ((i >= 10 && i < 25) ? '华为' : '苹果')

  var adId = (i < 10) ? 1 : ((i >= 10 && i < 25) ? 2 : 3)
  var adName = (i < 10) ? '信息流' : ((i >= 10 && i < 25) ? '播放页' : '通栏')

  //
  SupplyList.push(Mock.mock({
    id: id,
    companyId: 1,
    companyName: '奇虎',
    appId: appId,
    appName: appName,
    os: 'Android,iOS',
    packageName: 'com.qihu.com',
    downloadUrl: 'www.360.com',
    snapShot: ['https://www.baidu.com/img/pc_cc75653cd975aea6d4ba1f59b3697455.png', 'https://www.baidu.com/img/pc_cc75653cd975aea6d4ba1f59b3697455.png'],
    userCount: 300000,
    auditStatus: 1
  }))

  //
  SlotList.push(Mock.mock({
    id: id,
    appId: appId,
    appName: appName,
    slotId: 1,
    slotName: '开屏',
    adType: 1
  }))

  //
  ThirdPartAdList.push(Mock.mock({
    id: id,
    adPlatformName: '有道',
    dockType: 'API',
    adType: '开屏',
    desc: '有道DSP'
  }))

  //
  AdvertiserList.push(Mock.mock({
    id: id,
    advertiserId: advertiserId,
    advertiserName: advertiserName,
    industry: '硬件',
    contact: '雷军',
    tel: '1311111111',
    mainpage: 'www.xiaomi.com'
  }))

  // 广告列表
  AdList.push(Mock.mock({
    id: id,
    advertiserId: advertiserId,
    advertiserName: advertiserName,
    adId: adId,
    adName: adName,
    totalBudget: 10000,
    dailyBudget: 1000,
    OS: 'android',
    location: '全国',
    mediaType: '游戏,资讯',
    priceType: 'CPC',
    adPrice: 2.2,
    startTime: '2020-06-01',
    clickUrl: 'www.xiaomi.com',
    status: '审核通过'
  }))

  //
  CreativeList.push(Mock.mock({
    id: id,
    adId: adId,
    adName: adName,
    creativeName: '大尺寸信息流',
    width: 1080,
    height: 200,
    url: ''
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
  },
  {
    url: '/direct/advertiser/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20 } = config.query

      const pageList = AdvertiserList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        status: 0,
        listCount: AdvertiserList.length,
        page: page,
        pageSize: pageSize,
        data: pageList
      }
    }
  },
  {
    url: '/direct/ad/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20, advertiserId = '' } = config.query

      const mockList = AdList.filter(item => {
        if (advertiserId && item.advertiserId !== Number(advertiserId)) {
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
    url: '/direct/creative/list',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 20, adId = '', advertiserId = '' } = config.query

      const mockList = CreativeList.filter(item => {
        if (adId && item.adId !== Number(adId)) {
          return false
        }
        if (advertiserId && item.advertiserId !== Number(advertiserId)) {
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
  }
]

