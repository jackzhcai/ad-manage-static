import request from '@/utils/request'

// 获取媒体数据
export function fetchSupplyList(query) {
  return request({
    url: '/supply/list',
    method: 'get',
    params: query
  })
}

// 获取广告位数据
export function fetchSoltList(query) {
  return request({
    url: '/slot/list',
    method: 'get',
    params: query
  })
}

// 获取第三方广告主数据
export function fetchThirdPartAdList(query) {
  return request({
    url: '/third-part-ad/list',
    method: 'get',
    params: query
  })
}

// 获取广告主数据
export function fetchAdvertiserList(query) {
  return request({
    url: '/direct/advertiser/list',
    method: 'get',
    params: query
  })
}

// 获取广告数据
export function fetchAdList(query) {
  return request({
    url: '/direct/ad/list',
    method: 'get',
    params: query
  })
}

// 获取广告创意数据
export function fetchCreativeList(query) {
  return request({
    url: '/direct/creative/list',
    method: 'get',
    params: query
  })
}

// 获取报表服务端媒体数据
export function fetchReportServeSupplyList(query) {
  return request({
    url: '/report/serve/supply',
    method: 'get',
    params: query
  })
}

// 获取报表服务端媒体数据
export function fetchReportServeSlotList(query) {
  return request({
    url: '/report/serve/slot',
    method: 'get',
    params: query
  })
}

// 获取报表服务端媒体数据
export function fetchReportServeChannelList(query) {
  return request({
    url: '/report/serve/channel',
    method: 'get',
    params: query
  })
}

