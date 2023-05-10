
const axios = require('axios')
// import { getGitlabBaseUrl, getToken } from './store.js'

// gitlab需要的固定的token头
const TOKEN = 'PRIVATE-TOKEN'

const service = axios.create({
  // baseURL: 'https://gitlab.xxxxxx.com/api/v4',
  withCredentials: true,
  timeout: 15000
  // headers: {
  //   [TOKEN]: getToken()
  // }
})

service.interceptors.request.use(
  config => {
    // gitlab base url
    const baseUrl = 'http://36.133.80.161:8091'

    // 之所以放在这配置不放在axios.create中，是因为放在上面无论命令运行什么就会报错
    // 放在至少是真正请求的时候才会报错
    config.baseURL = `${baseUrl}/api/v4`
    config.headers[TOKEN] = 'DwJKzKBESJYDegSpGA5K'

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(res => {
  return res.data
})

/**
 * 获取gitlab某个组下的所有仓库列表
 * @param {Number}} groupId 组id 会通过配置文件取这个id
 * @see api 👉 https://docs.gitlab.com/ee/api/groups.html#list-a-groups-projects
 */
async function getRepoList (groupId) {
  return service.get(`/groups/${72}/projects`)
}

/**
 * 获取gitlab某个项目的所有分支
 * @param {Number | String} repoId 仓库/项目id
 * @see api 👉 https://docs.gitlab.com/ee/api/branches.html#list-repository-branches
 */
async function getRepoBranches (repoId) {
  return service.get(`/projects/${repoId}/repository/branches`)
}


module.exports = {
  getRepoList,
  getRepoBranches
}