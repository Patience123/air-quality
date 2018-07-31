<template>
    <div id="cloud-index">
        <Menu mode="horizontal" :theme="theme1" active-name="1" class="menu">
            <router-link :to="{path: '/CloudIndex'}">
                <MenuItem name="1">
                    <Icon type="happy"></Icon>
                    优
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/CloudIndex/goodlist'}">
                <MenuItem name="2">
                    <Icon type="happy-outline"></Icon>
                    良
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/CloudIndex/lightpollutionlist'}">
                <MenuItem name="3">
                    <Icon type="sad-outline"></Icon>
                    轻度污染
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/CloudIndex/middlepollutionlist'}">
                <MenuItem name="4">
                    <Icon type="sad"></Icon>
                    中度污染
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/CloudIndex/heavypollutionlist'}">
                <MenuItem name="5">
                    <Icon type="ios-bell-outline"></Icon>
                    重度污染
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/CloudIndex/seriouspollutionlist'}">
                <MenuItem name="6">
                   <Icon type="ios-bell"></Icon>
                    严重污染
                </MenuItem>
            </router-link>
        </Menu>
        <router-view class="picture"></router-view>
    </div>
</template>

<script>
export default {
    name:'cloud_index',
    data () {
        return {
            theme1: 'light'
        }
    }
}
</script>

<style scoped>
.picture {
    height: 800px;
}
.menu {
    z-index: 1;
}
</style>