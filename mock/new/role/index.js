import Mock from 'mockjs'
import { deepClone } from '../../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    email: 'tet123@163.com'
  },
  {
    key: 'editor',
    name: 'editor',
    email: 'tet123@gmail.com'
  },
  {
    key: 'admin1',
    name: 'admin1',
    email: '123456546@qq.com'
  }
]

export default [
  // mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        status: 0,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        status: 0,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/role',
    type: 'post',
    response: {
      status: 0,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      status: 0,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      status: 0,
      data: {
        status: 'success'
      }
    }
  }
]
