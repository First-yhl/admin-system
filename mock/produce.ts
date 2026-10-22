import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

// 商品池：每个商品 名字 + 专属描述 + 分类（category 用统一值，方便按类筛选）
// keyword 规则：取商品名第一个空格前的品牌名

let db:any[] | null = null
const getDb = ()=>{
    if(!db){
        db = items.map((item,i)=>{
            return{
                id:i+1,
                name: item.name,
                keyword: item.name.split(' ')[0],
                description: item.desc,
                category: item.category,
                price: Number(Mock.Random.float(50, 5000, 2, 2)),
                stock: Mock.Random.integer(0, 999),
                createdAt: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                state: 'active',
            }
        })
    }
    return db
}


const items = [
    { name: '苹果 iPhone 14 Pro Max', desc: 'A16仿生芯片，4800万像素主摄，灵动岛交互，全天候OLED屏。', category: '电子产品' },
    { name: '联想 拯救者 Y7000P 2024', desc: '满血140W功耗，RTX4060独显，2.5K 165Hz电竞屏。', category: '电脑办公' },
    { name: '小米 14 Ultra', desc: '徕卡光学四摄，骁龙8Gen3，2K超视感屏，双向卫星通信。', category: '电子产品' },
    { name: '华为 Mate 60 Pro', desc: '麒麟9000S，卫星通话，昆仑玻璃，灵犀通信。', category: '电子产品' },
    { name: '戴尔 XPS 13', desc: '极窄边框设计，13.4英寸OLED屏，轻薄金属机身。', category: '电脑办公' },
    { name: '华为 MateBook X Pro', desc: '3.1K原色屏，超轻镁合金机身，智慧互联协同。', category: '电脑办公' },
    { name: '罗技 MX Master 3S 鼠标', desc: '8000DPI高精度，静音按键，MagSpeed电磁滚轮。', category: '电脑办公' },
    { name: '雷蛇 黑寡妇蜘蛛V4 键盘', desc: '雷蛇绿轴，RGB幻彩灯效，磁吸腕托，全键无冲。', category: '电脑办公' },
    { name: '三星 990 PRO 1TB 固态硬盘', desc: 'PCIe4.0，读取7450MB/s，智能散热动态管理。', category: '电脑办公' },
    { name: '华硕 ROG 玩家国度 显示器', desc: '27英寸2K，Fast IPS，165Hz，1ms响应，电竞旗舰。', category: '电脑办公' },
    { name: '索尼 WH-1000XM5 降噪耳机', desc: '八麦克风降噪，LDAC高清音质，30小时长续航。', category: '电子产品' },
    { name: '佳明 Forerunner 265 运动手表', desc: 'AMOLED彩屏，双频多星定位，全天候健康监测。', category: '电子产品' },
    { name: '大疆 DJI Mini 4 Pro 无人机', desc: '4K HDR 全向避障，249克轻旗舰，34分钟续航。', category: '电子产品' },
    { name: '飞利浦 电动牙刷 HX9911', desc: '声波震动，智能传感，五模清洁，便携充电盒。', category: '家居日用' },
    { name: '美的 Q8 智能小家电', desc: '智能互联，双重控温，一键烹饪，静音运行。', category: '家用电器' },
    { name: '九阳 破壁机 Y1', desc: '12破壁动力，冷热双打，三分钟快煮，自动清洗。', category: '家用电器' },
    { name: '海尔 云溪 洗衣机', desc: '直驱变频电机，10KG大容量，蒸汽除菌洗。', category: '家用电器' },
    { name: '格力 云锦 空调 大1.5匹', desc: '新一级能效，静音柔风，智能WIFI操控。', category: '家用电器' },
    { name: '海信 65E8H 电视', desc: '65英寸MiniLED，144Hz高刷，98%广色域。', category: '家用电器' },
    { name: '网易严选 人体工学椅', desc: '三段式腰托，4D扶手，可调头枕，透气网布。', category: '家居日用' },
    { name: '小米 扫地机器人 X10', desc: '5000Pa大吸力，激光导航，自动集尘洗拖布。', category: '家用电器' },
    { name: '云鲸 J4 拖地机器人', desc: '旋转加压拖地，仿生力度，免手洗拖布。', category: '家用电器' },
    { name: '戴森 V12 吸尘器', desc: '轻量无线，激光探测尘螨，可换多吸头。', category: '家用电器' },
    { name: '博朗 电动剃须刀 7系', desc: '声波科技，往复式刀头，灵动贴面系统。', category: '家居日用' }
]

export default [
    {
    url: '/api/produce',
    method: 'get',
    response: ({ query }) => {
        const db = getDb()
        const data = db.filter(item =>
            (!query.seaname  || item.name.includes(query.seaname)) &&
            (!query.seacata  || item.category === query.seacata) &&
            (!query.seastate || item.state === query.seastate)
        )
        return { code: 200, message: 'ok', data }
    }
},
    {
        url:'/api/produce/:id/state',
        method:'put',
        response:({query,body})=>{
            const id = Number(query.id)
            const item = getDb().find(item => item.id === id)
            if(item){
                item.state = body.state
                return {
                    code: 200,
                    message: '更新商品状态成功',
                    data:item
                }
            }
            return {
                code: 404,
                message: '商品不存在',
                data:null
            }
        }
    },
    {
        url:'/api/produce/:id/select',
        method:'delete',
        response:({query})=>{
            const id = Number(query.id)
            const item = getDb().find(item => item.id === id)
            if(item){
                getDb().splice(getDb().indexOf(item),1)
                return {
                    code: 200,
                    message: '删除商品成功',
                    data:item
                }
            }else{
                return {
                    code: 404,
                    message: '商品不存在',
                    data:null
                }
            }
        }
    },
    {
        url:'/api/produce/post',
        method:'post',
        response:({body})=>{
            const db = getDb()
            const pad = (n:number) => String(n).padStart(2,'0')
            const now = new Date()
             const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
            const newItem ={
                ...body,
                id:db.length+1,
                createdAt: currentTime,
                state:'active'
            }
            db.unshift(newItem)
            return {
                code: 200,
                message: '新增商品成功',
                data:newItem
            }
        }
    },
    {
        url:'/api/produce/filter',
        method:'put',
        response:({body})=>{
            const db = getDb()
            const filterData = db.filter(item=>{
                return (!body.seastate || item.state === body.seastate) &&
                (!body.seacata || item.category === body.seacata)&&
                (!body.seaname || item.name.includes(body.seaname))
            })
            return {
                code: 200,
                message: '获取商品列表成功',
                data:filterData
            }
        }
    },
    {
        url:'/api/produce/:id',
        method:'get',
        response:({query})=>{
            const id= Number(query.id)
            const item = getDb().find(item => item.id === id)
            if(item){
                return {
                    code: 200,
                    message: '获取商品成功',
                    data:item
                }
            }
            return {
                code: 404,
                message: '商品不存在',
                data:null
            }
        }
    }
] as MockMethod[]