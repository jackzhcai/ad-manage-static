import request from '@/utils/request'

export function fetchSupplyList(query) {
  return request({
    url: '/supply/list',
    method: 'get',
    params: query
  })
}

export function fetchSoltList(query) {
  return request({
    url: '/slot/list',
    method: 'get',
    params: query
  })
}

export function fetchThirdPartAdList(query) {
  return request({
    url: '/third-part-ad/list',
    method: 'get',
    params: query
  })
}

