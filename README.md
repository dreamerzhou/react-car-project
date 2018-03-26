## 二手车交易管理平台
### 前端部分
***
#### 一、图集组件开发  - Picshow
##### 第二步
- 图集展示布局，父组件Picshow，配置less及依赖的安装
##### 第三步 
- 四个子组件的拆分 ， dva model 的书写 相当于就是redux里面的reducers
- 为四个组件用 dva connect向数据库中要数据 实现数据更新视图更新
##### 第四步
- 小图导航通过jQuery来实现span事件点击，不用setState，用setState会触发生命周期效率低，直接用dom来拉动
##### 第五步
- 实现大图左右按钮切换图片，并实现大图片的懒加载。
- 预加载的实现，就是让图片序列连接起来，进行预先加载，network面板查看，缓存图片显示 304，从缓存中读取来的
##### 第六步
- 图集组件更多相似车carlike，与其它组件无联系，把数据请求到全局数据store中，然后在组件中呈递。
滚动条实现最简单方法：
1. overflow: scroll-y
2. jQueryUI 实现滚动条的拖拽。引入jQueryUI的js文件和css文件
3. jQuery插件mousewheel的下载，实现鼠标滚轮滚动上下滑动功能
***
#### 二、汽车列表组件开发  - Carlist
##### 第一步
- antd中 使用layout布局，定制主题，
- 方法一：
去github上下载ant-design源代码，源代码中有构建工具。
源代码文件下 npm install，第二，在项目文件下npm run dist就能构建出node_modules/antd下的 dist文件夹 ，dist文件夹下有样式表 
- 方法二：
去掉webpack.config.js中对less文件的include、exclude的限制。
去掉index.html 中对antd.min.css的引包
新建一个App.less，用less语法@import我们npm装的样式表
也就是，先@import "../../../node_modules/antd/dist/antd.less";
沿着antd.less找到默认样式：node_modules/antd/lib/style/themes/default.less
参考default.less文件自定义样式，自定义样式会覆盖默认样式 
##### 第二步
1. 列表组件 - 筛选器 CheckboxGroup组件
2. 列表组件 - 筛选器 Slider组件
- **全局state** 和 **组件内部state**  实现售价功能 。
- **value**和**onChange** :  受控 使用组件内部的state当作value值和onChange搭档，实现 **按钮**和**Slider组件**的关系
- **defaultValue**和**onAfterChange**: 减轻服务器负担，当用户松手的时候才改变数据，用**onAfterchange**和**defaultValue**搭档，实现全局数据的改变
***
3. 列表组价 - 筛选器 Cascader组件
- 将后台拿来的数据结构形式 转为 前端自己所要的数据结构形式，然后编程
- 方法一：**对象转数组** 数组方法 进行 对象和数组之间的映射
品牌和车系的筛选 Cascader组件，写一个接口。将接口中的以对象形式存在的数据转为Cascader组件中options属性要求的以数组形式存在的数据
- 方法二：**对象转DOM** jsx适合进行对象和DOM之间的映射
品牌和车系分开，Tabs组件，通过拉取服务器接口数据result，是一个对象，将reult作为该组件自己的state，在DOM中，通过state，以jsx语法形式 处理result对象 转为 DOM数据结构（也就是与Tabs组件数据结构形式是一样的）
4. 列表组件 - 品牌和车系两个组件之间通信：自己state
- 品牌和车系有影响全局数据
- 车型和杂项的实现，carbasedata.json中添加车型数据，再mongoimport 到数据库中
5. 列表组件 - 大表视图
- dva中，model文件是发请求的地方，在effects中实现异步操作
- fetch方法发起一个post请求将前端筛选出的信息发送到服务器，在数据库中进行筛选，再将所选择的数据渲染到页面。
- 三部曲：① **改变筛选器** ② **得到最新的筛选器** ③ **发出请求带着最新的筛选器信息**
- 将fetch请求封装出去，用call来调用。写post请求接口(实现了Fuxuankuang组件的功能)，需安装formidable依赖
- 精确匹配 和 范围匹配 
6. 大表视图 - 后端分页的实现 ★★★★★
- **redux的理解：所有“出征”的信息在model中集结，回来的信息在model中接收**
- nodejs实现分页：skip、limit。antd中table组件分页器的实现
- 用户自定义分页的实现，每次更改从第1页第1个开始 antd中table组件showSizeChanger属性设为true
7. 大表视图 - 后端排序的实现 ★★★★★
- antd中table组件 sortby、sortdirection、sorter和sortOrder属性 进行排序
- 思路 步骤：
- ① model文件state中添加发送到服务器中的初始数据
- ② 后端server.js中添加初始数据
- ③ 后端接收到请求（携带初始数据）,得到排序信息 
- ④ 组件onChange事件和dispatch 
- model文件state中写初始数据，再将初始数据通过effects中异步请求函数传到服务器
- 当用户浏览到其他页，触发排序事件，需要从第1页开始进行排序，而不是当前页，这就是副作用，在副作用中，用if语句去判断
8.  大表视图 - 分页和排序 - 出彩功能的实现 ★★★★★
- ① 用户自定义页
- 引入模态框, 以及用jQuery UI Draggable实现拖拽，ul有高才可拖拽，以及两个ul连接需分开写





### 后台起步
- 模拟数据的创建，真接口，假数据
- 前端自己写接口测试，用express写一些接口
- 前端的数据库就是mongodb，我们用mongodb + mongoose来做数据的持久，项目上线，接口是javaee、.net等 
- 图片分大图和小图，小图给组件做缩略图，通过gm将大图变成缩略图
- 基数据是固定的不变的数据，基数据是由图片的真实情况存在的，要写死的东西
- 现在以基数据为依托，拓展这些数据，写入数据库
- 思路：写一个nodejs程序，读取这个数组基数据，遍历数组，给每一项添加车主信息，车辆信息
##### 第一步
- 将基数据和添加的模拟数据导入数据库，开启数据库，写carinfo和carlike接口对数据库进行操作
