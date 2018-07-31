<template>
    <div class="top">
        <Dropdown style="margin: 0 auto 10px; padding-right: 50px;" trigger="click" @on-click="select">
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
        <Tag color="blue" style="margin:10px;">城市</Tag>
        <Cascader :data="data" v-model="cityvalue2" trigger="hover" style="width:200px;display:inline-block;" @on-change="changeCity"></Cascader>
    </div>
</template>

<script>
import axios from '../../../lib/util'

export default {
    name: "top",
    props: {
        defaultCity: Array
    },
    data () {
        return {
            cityData: [],
            cityvalue2: this.defaultCity
        }
    },
    created () {
        this.fetchCity();
    },
    computed: {
        // 根据cityData计算data的值，实现城市选择
        data () {
            let citylists = [];
            this.cityData.forEach((item, index) => {
                    citylists[index] = [];
                    item.cityLists.forEach(item => {
                    citylists[index].push({
                        value: item.city,
                        label: item.citypy
                    });
                });
            });
            // console.log(citylists);
            return this.cityData.map((item, index) => {
                return {
                    value: item.province,
                    label: item.provincepy,
                    children: citylists[index]
                }
            });
        }
    },
    methods: {
        select (index) {
            this.$emit('changeYear', index);
        },
        fetchCity () {
            axios.post({
                url: 'citylist'
            }).then(response => {
                console.log(response);
                this.cityData = response.citylist;
            }).catch(error => {
                console.log(error);
            })
        },
        changeCity (value) {
            // console.log(value);
            this.$emit('changeCity', value);
        }
    }
}
</script>

<style scoped>
    .top {
        /*box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);*/
        overflow: hidden;
    }
    .select {
        font-size: 14px;
        font-weight: bold;
        padding: 4px;
    }
</style>