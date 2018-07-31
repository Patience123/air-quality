<template>
   <div class="layout">
        <Header class="header">
                <div class="layout-logo"></div>
                <div class="layout-title">城市空气质量分析预测平台</div>
                <div class="layout-nav">
                    <Poptip trigger="hover">
                        <Icon style="cursor:pointer" type="person" size="32" color="white"></Icon>
                        <div slot="title">
                            <template v-if="isLogin">
                                <Icon type="log-in" size="20"></Icon>
                                <span >success</span>
                            </template>
                            <template v-else>
                                <Icon type="log-out" size="20"></Icon>
                                <span >failed</span>
                            </template>
                        </div>
                        <div slot="content">
                            <Button style="margin-right: 18px" type="ghost">账户中心</Button>
                            <Button type="ghost">退出登录</Button>
                        </div>
                    </Poptip>
                </div>
        </Header>
        <Sider hide-trigger :style="{background: '#fff'}" class="side">
            <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="cloud"></Icon>
                        统计排名
                    </template>
                    <router-link to="/">
                        <MenuItem name="1-1">城市排名</MenuItem>
                    </router-link>
                    <router-link to="/generalRank">
                        <MenuItem name="1-2">时段统计</MenuItem>
                    </router-link>
                    <router-link to="/CloudIndex">
                        <MenuItem name="1-3">词云分析</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-pulse-strong"></Icon>
                        变化曲线
                    </template>
                    <router-link :to="{path: '/variationIndex'}">
                        <MenuItem name="2-1">污染变化</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="map"></Icon>
                        城市分布
                    </template>
                    <router-link :to="{path: '/allcity'}">
                        <MenuItem name="3-1">全国城市</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        城市比较
                    </template>
                    <router-link :to="{path: '/compareIndex'}">
                        <MenuItem name="4-1">空气质量比较</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="5">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        相关分析
                    </template>
                    <router-link :to="{path: '/temperatureRelate'}">
                        <MenuItem name="5-1">温度相关</MenuItem>
                    </router-link>
                    <router-link :to="{path: '/rainRelate'}">
                        <MenuItem name="5-2">降水相关</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="6">
                    <template slot="title">
                        <Icon type="social-wordpress"></Icon>
                        预测趋势
                    </template>
                    <router-link :to="{path: '/trend'}">
                        <MenuItem name="6-1">未来空气质量</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="7">
                    <template slot="title">
                        <Icon type="ios-book"></Icon>
                        相关知识
                    </template>
                    <router-link :to="{path: '/intro_aqi'}">
                        <MenuItem name="7-1">AQI简介</MenuItem>
                    </router-link>
                </Submenu>
            </Menu>
        </Sider>
        <router-view class="content"></router-view>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      isLogin: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-layout-header {
    width: 100%;
    height: 72px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #2b83f9;
    background-image: linear-gradient(143deg,#2945cb 20%,#2b83f9 81%,#3a9dff);
}
.layout{
    /*border: 1px solid #d7dde4;*/
    /*background: #f5f7f9;*/
    background: #fff;
    position: relative;
    border-radius: 4px;
    /*overflow: hidden;*/
}
.layout-logo{
    width: 100px;
    height: 100px;
    background: url(/static/img/logo.fa62f7a.png);
    background-size: cover;
    border-radius: 50%;
    float: left;
    position: relative;
    left: 20px;
    overflow: hidden;
}
.layout-nav{
    width: 100px;
    margin: 0 auto;
    margin-right: 20px;
    float: right;
}
.layout-title {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 28px;
    color: white;
    width: 50%;
    height: 72px;
    line-height: 72px;
    float: left;
}
.side {
    width: 200px;
    position: fixed;
    top: 72px;
    left: 0;
    bottom: 0;
    z-index: 20;
    overflow-y: hidden;
    background: #fff;
    border-right: 1px solid #d7dde4;
}
.content {
    position: relative;
    margin-left: 200px;
    /*background-color: #fff*/;
    padding-top: 85px;
}
.ivu-icon {
    vertical-align: middle;
}
</style>
