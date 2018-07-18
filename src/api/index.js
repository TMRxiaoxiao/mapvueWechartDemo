const baseUrl = 'https://www.yizhihenhao.com';
function getRequire(url,{method,data}={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      method,
      data,
      success:res=>{
        resolve(res.data.data)
      },
      fail:err=>{
        reject(err);
      }
    })
  })
  
}

export function getToken(code){
  return getRequire(`${baseUrl}/api/job/get/code/token?code=${code}`)
}
export function getPositionList(page,data){
  return getRequire(`${baseUrl}/api/job/position/list?page=${page}&size=10`,{method:'post',data})
}
export function getAllCity(){
  return getRequire(`${baseUrl}/api/job/position/city`)
}
