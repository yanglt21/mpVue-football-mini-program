// const Host = 'http://39.96.23.9:3000' // 正式线
const Host = 'http://localhost:3000' // 本地测试
const HostDongQiuDi = 'https://api.dongqiudi.com/data/v1' // 懂球帝接口

const Url = {
  home: Host + '/home',
  userCenter: Host + '/user',
  rank: HostDongQiuDi + '/team_ranking/0?',
  getOpenId: Host + '/getOpenId'
}
module.exports = Url
