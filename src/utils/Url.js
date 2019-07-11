// const Host = 'http://39.96.23.9:3000' // 正式线
const Host = 'http://localhost:3000' // 本地测试
const HostDongQiuDi = 'https://api.dongqiudi.com/data/v1' // 懂球帝接口

const Url = {
  host: Host,
  home: Host + '/home',
  userCenter: Host + '/userCenter',
  rank: HostDongQiuDi + '/team_ranking/0?',
  login: Host + '/login',
  logout: Host + '/logout',
  getUserInformation: Host + '/get/userInfomation'
}
module.exports = Url
