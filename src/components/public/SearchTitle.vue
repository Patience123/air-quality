<template>
    <div id="searchTitle">
        <Tag v-if="isCompare" color="blue" style="margin:10px;">城市</Tag>
        <Cascader v-if="isCompare" :data="data" filterable change-on-select v-model="cityvalue1" trigger="hover" style="width:200px;display:inline-block;"></Cascader>
        <Tag color="blue" style="margin:10px;">城市</Tag>
        <Cascader :data="data" filterable change-on-select v-model="cityvalue2" trigger="hover" style="width:200px;display:inline-block;"></Cascader>
        <Tag color="green" style="margin:0px 10px 0px 20px;">日期范围</Tag>
        <DatePicker type="date" placeholder="选择起始日期" style="width: 200px;display:inline-block;" v-model="timevalue1"></DatePicker>
        <label>~</label>
        <DatePicker type="date" placeholder="选择终止日期" style="width: 200px;display:inline-block;" v-model="timevalue2"></DatePicker>
        <Button type="primary" shape="circle" icon="ios-search" style="display:inline-block;margin:5px;" @click="changeCity"></Button>
    </div>
</template>

<script>
export default {
  name: "SearchTitle",
  props: {
    isCompare: Boolean,
    cityList: {
      type: Array,
      required: true
    }
  },
  computed: {
    // 根据cityData计算data的值，实现城市选择
    data() {
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
        };
      });
    }
  },
  data() {
    return {
      cityData: this.cityList,
      // 默认城市
      cityvalue1: ["浙江", "杭州"],
      cityvalue2: ["直辖市", "北京"],
      timevalue1: "2018-05-01",
      timevalue2: "2018-05-30"
    };
  },
  methods: {
    changeCity() {
      this.$emit(
        "changeCity",
        this.cityvalue2[1],
        this.timevalue1,
        this.timevalue2,
        this.cityvalue1[1]
      );
    }
  }
};
</script>

<style scoped>
#searchTitle {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
