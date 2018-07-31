<template>
    <div class="rank">
        <div class="top">
            <Dropdown style="margin-left: 20px; float: left; margin-bottom: 10px;" trigger="click" @on-click="select">
                <Button type="primary" shape="circle">
                    <Icon type="calendar" size="18" class="calendar"></Icon>
                    <span class="select">选择年份</span>
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem :name="2013">2013</DropdownItem>
                    <DropdownItem :name="2014">2014</DropdownItem>
                    <DropdownItem :name="2015">2015</DropdownItem>
                    <DropdownItem :name="2016">2016</DropdownItem>
                    <DropdownItem :name="2017">2017</DropdownItem>
                    <DropdownItem :name="2018">2018</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div class="top-title">{{currentYear}}年各城市AQI排名</div>
        </div>
        <Table :loading="loading" :data="tableData1" :columns="tableColumns1" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalCity" :current="currentPage" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '../../../lib/util'
    export default {
        created () {
            this.fetchData(this.currentYear, 1);
        },
        data () {
            return {
                loading: true,
                currentYear: "2018",  // 默认当前年份为2018
                tableData1: [],
                currentPage: 1,  // 默认当前为第一页
                totalCity: 0,   // 城市的数量
                tableColumns1: [
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: 'AQI',
                        key: 'avgaqi'
                    },
                    {
                        title: 'PM2.5',
                        key: 'avgpm25'
                    },
                    {
                        title: 'PM10',
                        key: 'avgpm10'
                    },
                    {
                        title: '排名',
                        key: 'rank'
                    }
                ]
            }
        },
        methods: {
            // 选择年份
            select (year) {
                this.loading = true;
                console.log("selected")
                this.currentYear = year;
                console.log(this.currentYear);
                this.tableData1 = [];
                this.currentPage = 1;
                this.fetchData(this.currentYear, this.currentPage);
            },
            // 切换页面
            changePage (index) {
                this.loading = true;
                console.log(index);
                this.tableData1 = [];
                this.currentPage = index
                this.fetchData(this.currentYear, this.currentPage);
            },
            // 获取数据
            fetchData (currentYear, currentPage) {
                axios.post({
                    url: "rank",
                    data: {
                        year: currentYear,
                        page: currentPage
                    }
                }).then((response) => {
                    response.aqiranklist.forEach((item, index) => {
                        this.tableData1.push(item);
                    })
                    this.totalCity = response.listsize;
                    console.log(this.totalCity);
                    console.log(response);
                    this.loading = false;
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    }
</script>

<style scoped>
    .top {
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
        overflow: hidden;
        display: flex;
    }
    .select {
        font-size: 14px;
        font-weight: bold;
        padding: 4px;
    }
    .top-title {
        flex: 1;
        line-height: 46px;
        margin-top: -6px;
        font-size: 20px;
    }
</style>