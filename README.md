# 微信扣费服务demo-serv

## 技术栈

``` bash
框架：node + koa2 + mongodb
```

## 启动

``` bash
# 安装项目依赖，建议用cnpm，
cnpm install

# 项目启动 localhost:8080
npm run dev
```
## 项目结构

``` bash
bin/
node_modules/
src/
  constant/       常量定义
  controllers/    接口处理逻辑
  middles/        中间件，主要是一些验证方法
  models/         模型
  routes/         接口定义
  schemas/        模式，数据库在逻辑层级上的定义
  app.js          入口
```

## 项目说明

### 数据库库的选型
  由于该项目为demo，因此采用配置和查询（无需写SQL语句）比较简单的mongodb  

### 数据库表结构
  分为3张表
  1. user，即用户信息表，它会关联该用户所开通的所有order（扣费服务度订单信息） 
  2. order，即扣费服务订单表，它会关联订单所有者user，以及该订单的扣费记录record  
  3. record，即扣费记录表，它会关联所扣费的订单order  
  
### 关于安全  
  1. 传输安全    
      将服务升级为HTTPS即可，这里方案采用nginx配置，项目中不体现
  2. 存储安全  
      由于采用mongoose来控制mongodb，它已经提供了ORM，不需要考虑数据库注入问题
  3. csrf攻击
      中间件checkReferer对请求来源做了判断
  4. xss攻击
      涉及到用户输入的地方引入xss库，对其做了相应处理
  5. 用户信息验证
      为了简化项目，此处为mock，并非真实逻辑
  
### 关于登录：
  为了精简项目，该项目的登录用mock方式获得。  
  进入页面后会先请求一个user/info接口获得用户信息，该接口服务端采用mock的方式一定会返回一个用户信息，前端用该用户信息设置userId即登录成功。  
  

