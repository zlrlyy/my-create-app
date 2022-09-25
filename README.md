# overseas-advertising-platform

# youdao Ads KOC投放平台

prd: https://confluence.inner.youdao.com/pages/viewpage.action?pageId=286031180

主产品: chenxiaoyi01@corp.netease.com

next.js + react + redux

### 接口地址 next.config.js中
const API_HOST_DEV = 'XXX';

const API_HOST_TEST = 'XXX';

const API_HOST_PROD = 'XXX';

### 开发
```bash
git clone https://gitlab.corp.youdao.com/webfront-ad/overseas-advertising-platform.git

yarn

yarn dev

```


### 上线步骤:

```bash
# 拉取项目代码
git clone https://gitlab.corp.youdao.com/webfront-ad/overseas-advertising-platform.git

# 切换到项目根目录
cd overseas-advertising-management

# 安装依赖
npm install

# 测试环境代码打包
npm run build

# 线上环境代码打包
npm run build:prod

# 启动项目
npm run deploy

```
# Tracking发布
直接tracking -> 发布管理 -> 新建发布 -> 海外 -> ~~海外投放管理平台上线~~

### 测试环境

容器
~~https://kubesphere.corp.youdao.com/ad/clusters/k8s-dev3-nbj04/projects/ad/deployments/overseas-advertising-management/resource-status~~

域名
~~https://overseas-advertising-management-test.inner.youdao.com/login~~

### 线上环境

容器
~~https://kubesphere.corp.youdao.com/ad/clusters/k8s-prod-nbj01/projects/ad/deployments/overseas-advertising-management/resource-status~~

域名
~~https://ad-management.inner.youdao.com/login~~


### 静态文件上传 cdn

svn地址为：https://corp.youdao.com/svn/ydstatic/overseacdn/advertising_platform

静态文件已经改为CI自动上传，不用再手动操作,在一下网址看是否刷新：

在 http://updatecdn.iyoudao.net/ 上刷新 cdn 文件, 对应地址为 overseacdn.ydstatic.com/overseacdn

在 http://corp.youdao.com/IT/updateshared/ 刷新静态服务器的资源访问 (overseacdn 组)


