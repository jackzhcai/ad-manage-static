import request from '@/utils/request'

//
export function fetchOptimizeAdList(query) {
  return request({
    url: '/optimize/ad/list',
    method: 'get',
    params: query
  })
}

//
export function fetchOptimizeDirectList(query) {
  return request({
    url: '/optimize/direct/list',
    method: 'get',
    params: query
  })
}

//
export function fetchOptimizeCategoryList(query) {
  return request({
    url: '/optimize/category/list',
    method: 'get',
    params: query
  })
}

//
export function fetchOptimizeBudgetList(query) {
  return request({
    url: '/optimize/budget/list',
    method: 'get',
    params: query
  })
}
