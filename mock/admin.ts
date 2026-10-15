import type { MockMethod } from 'vite-plugin-mock'

const admin = [
   { id: 1, username: 'admin', password: '123456', role: 'admin', name: '超级管理员' },
   { id: 2, username: 'editor', password: '123456', role: 'editor', name: '运营人员' },
   { id: 3, username: 'viewer', password: '123456', role: 'viewer', name: '数据查看员' },
]

export default[
    {
        url:'/api/login',
        method:'post',
        response({body}){
            const {username,password} = body
            const result = admin.find(u=>u.username === username && u.password === password)
            if(!result){
                return {code:400,message:'账号或密码错误',data:null}
            }
            const token = Math.random().toString(36).slice(2) + Date.now().toString(36)
            return{
                code:200,
                message:'OK',
                data:{
                    token,
                    role:result.role,
                    name:result.name,
                    logintime:Date.now()
                }
            }
        }
    }
] as MockMethod[]





























// // 模拟的用户数据（写死，相当于数据库里的用户表）
// const users = [
//   { id: 1, username: 'admin', password: '123456', role: 'admin', name: '超级管理员' },
//   { id: 2, username: 'editor', password: '123456', role: 'editor', name: '运营人员' },
//   { id: 3, username: 'viewer', password: '123456', role: 'viewer', name: '数据查看员' },
// ]

// export default [
//   // 登录接口
//   {
//     url: '/api/login',
//     method: 'post',
//     response: ({ body }) => {
//       const { username, password } = body
//       const user = users.find(u => u.username === username && u.password === password)

//       if (!user) {
//         return { code: 400, message: '账号或密码错误', data: null }
//       }

//       // 生成 token
//       const token = Math.random().toString(36).slice(2) + Date.now().toString(36)

//       return {
//         code: 200,
//         message: '登录成功',
//         data: {
//           token,
//           role: user.role,
//           name: user.name,
//         },
//       }
//     },
//   },
// ] as MockMethod[]
