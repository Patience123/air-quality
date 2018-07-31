<template>
  <div>
    <Tag color="blue" style="margin:10px;">城市</Tag>
    <Cascader :data="data" v-model="cityvalue" trigger="hover" style="width:200px;display:inline-block;" @on-change="changeCity"></Cascader>
    <Row class="analytics-title">
      <div class="analytics-title-h3">空气质量状况预测</div>
    </Row>
    <div id="trendCharts"></div>
  </div>
</template>

<script>
import axios from '../../../lib/util'

export default {
  data() {
    return {
      cityvalue: ['陕西', '咸阳'],
      cityData: [],
      xArray: [],
      currentCity: '咸阳',
      title: ''
    }
  },
  created () {
    this.fetchCity();
    this.fetchTrendData(this.cityvalue[1]);
  },
  mounted () {
    this.fillxArray();
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
    fetchTrendData (city) {
      axios.post({
        url: 'predict',
        data: {
          city: city
        }
      }).then(response => {
        console.log(response);
        this.cityData[0] = response.listone;
        this.cityData[1] = response.listtwo;
        this.cityData[2] = response.listthree;
        this.cityData[3] = response.listfour;
        this.cityData[4] = response.listfive;
        this.title = response.title;
        this.drawTrend();
      }).catch(error => {
        console.log(error);
      })
    },
    changeCity (currentCity) {
        this.fetchTrendData(currentCity[1]);
        this.currentCity = currentCity[1];
    },
    fillxArray () {
        for(let i = 0; i < 60; i++) {
            this.xArray[i] = (`${i+1}`);
        }
        // console.log(this.xArray);
    },
    drawTrend () {
      let myCharts = this.$echarts.init(document.getElementById('trendCharts'));
      let option = {
          backgroundColor: '#000',
          color: ['#fedd32', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
          tooltip: {
              trigger: 'axis',
          },
          "grid": {
              "borderWidth": 0,
              "top": 110,
              "bottom": 50,
          },
          "title": {
              "text": `${this.currentCity}未来5个月空气质量预计 (${this.title})`,
              // "subtext": "by:wang dingding",
              x: "10%",
              y: "5%",

              textStyle: {
                  color: '#cccccc',
                  fontSize: '20'
              },
              subtextStyle: {
                  color: '#777777',
                  fontSize: '14',
              },
          },
          xAxis: {              
              boundaryGap:false,
              splitNumber: 12,
              type: 'category',
              "axisLine": {
                  lineStyle: {
                      color: '#fedd32'
                  },
              },
              data: this.xArray
          },
          yAxis: {
              type: 'value',
              axisLine: {
                  show: true
              },
              splitLine: {
                  show: false
              },
            //   splitNumber: 20,
              "axisLine": {
                  lineStyle: {
                      color: '#fedd32'
                  }
              },
              axisLabel: {
                  formatter: '{value}'
              }
          },
          series: [{
                  name: '预测值',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 4,
                  showSymbol: false,
                  data: this.cityData[0],
                  markPoint: {
                      label: {
                          normal: {
                              textStyle: {
                                  color: '#333'
                              }
                          }
                      },
                      data: [{
                          type: 'max',
                          name: '最大值',

                      }, {
                          type: 'min',
                          name: '最小值'
                      }]
                  }

              }, {
                  name: '95%下界',
                  type: 'line',
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          type: 'dashed',
                          width: 0.5
                      }
                  },
                  data: this.cityData[1],
              }, {
                  name: '80%下界',
                  type: 'line',
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          type: 'dashed',
                          width: 0.5
                      }
                  },
                  data: this.cityData[2],
              },
              {
                  name: '80%上界',
                  type: 'line',
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          type: 'dashed',
                          width: 0.5
                      }
                  },
                  data: this.cityData[3],
              },

              {
                  name: '95%上界',
                  type: 'line',
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          type: 'dashed',
                          width: 0.5
                      }
                  },
                  data: this.cityData[4],
              }
          ]
      };
      myCharts.setOption(option);
    }
  }
};
</script>

<style scoped >
.analytics-title {
    width: 96%;
    padding-bottom: 5px;
    margin: 0 auto;
    border-bottom: 2px solid #e3e8ee;
}
.analytics-title-h3 {
    float: left;
    font-size: 18px;
    color: #4d617d;
    line-height: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    padding-bottom: 10px;
}
#trendCharts {
  width: 100%;
  height: 800px;
}
</style>