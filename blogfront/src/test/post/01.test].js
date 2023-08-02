import { post } from '@/common/api/request'

const postUrl=async function(params){
    params.site='blog.icestone.work'
    params.token='bPnkJvPXgMrtHZya'
    return await post('http://data.zz.baidu.com/urls', params)
}

const res=await postUrl({

})
console.log('res--->')
console.log(res)
