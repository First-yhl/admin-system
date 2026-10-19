export interface User {
  id: number
  username: string
  nickname: string
  phone: string
  email: string
  status: 'active' | 'disabled'
  role: 'common' | 'vip'
  createdAt: string
}