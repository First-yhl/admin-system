import type {MockMethod} from 'vite-plugin-mock'
import type {User} from '../src/types/user'
import Mock from 'mockjs'
export default[
    {
        url:'/api/user',
        method:'get',
        response:()=>{
            return {
                code:200,
                message:'success',
               data: Mock.mock({
                    'list|15': [
                        {
                            'id|+1': 1,
                            'username': /^[a-z]{4,10}$/,
                            'nickname': /[\u4e00-\u9fa5]{1,4}|\u8D85|\u7F8E|\u52CF|\u5B89|\u5C0F|\u5927/,
                            'phone': /^1[3-9]\d{9}$/,
                            'email': /^[a-z0-9]{2,5}@(qq|163|gmail)\.com$/, 
                            'status|1': ['active', 'disabled'],
                            'role|1': ['common', 'vip'],
                            'createdAt': '@datetime("yyyy-MM-dd HH:mm:ss")',
                        },
                    ],
}).list
            }
        }
    }
] as MockMethod[]