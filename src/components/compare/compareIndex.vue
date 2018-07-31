<template>
    <div id="compareIndex">
        <SearchTitle :is-compare="true" :cityList="citylist" @changeCity="search" />
        <div id="searchContent">
            <Tabs type="card">
                <TabPane label="质量等级">
                    <c-Degree ref="degree" />
                </TabPane>
                <TabPane label="AQI">
                    <c-AQI ref="cAqi" />
                </TabPane>
                <TabPane label="PM2.5">
                    <c-PM25 ref="cPM25" />
                </TabPane>
                <TabPane label="PM10">
                    <c-PM10 ref="cPM10" />
                </TabPane>
                <TabPane label="SO2">
                    <c-SO2 ref="cSO2" />
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import SearchTitle from '../public/SearchTitle'
import cDegree from './children/degree'
import cAQI from './children/cAQI'
import cPM25 from './children/cPM25'
import cPM10 from './children/cPM10'
import cSO2 from './children/cSO2'
import axios from '../../../lib/util'

export default {
    name: 'compareIndex',
    components: {
        SearchTitle,
        cDegree,
        cAQI,
        cPM25,
        cPM10,
        cSO2,
    },
    data() {
        return {
            citylist: [],
            selectedData: {
                cityOne: "杭州",
                cityTwo: "北京",
                dateStart: "2018-05-01",
                dateEnd: "2018-05-30"
            },
            bestCity: ''
        }
    },
    created () {
        this.fetchCity();
    },
    methods: {
        fetchCity () {
            axios.post({
                url: 'citylist'
            }).then(response => {
                console.log(response);
                response.citylist.forEach(item => {
                    this.citylist.push(item);
                });
            }).catch(error => {
                console.log(error);
            })
        },
        search (cityTwo, timeStart, timeEnd, cityOne) {
            console.log("搜索");
            this.selectedData.cityTwo = cityTwo;
            this.selectedData.dateStart = timeStart;
            this.selectedData.dateEnd = timeEnd;
            this.selectedData.cityOne = cityOne;
            this.$refs.degree.fetchQualityOne(cityTwo, timeStart, timeEnd);
            this.$refs.degree.fetchQualityTwo(cityOne, timeStart, timeEnd);
            this.$refs.cAqi.fetchCity1Data(cityTwo, timeStart, timeEnd, 1);
            this.$refs.cAqi.fetchCity2Data(cityOne, timeStart, timeEnd, 1);
            this.$refs.cPM25.fetchCity1Data(cityTwo, timeStart, timeEnd, 2);
            this.$refs.cPM25.fetchCity2Data(cityOne, timeStart, timeEnd, 2);
            this.$refs.cPM10.fetchCity1Data(cityTwo, timeStart, timeEnd, 3);
            this.$refs.cPM10.fetchCity2Data(cityOne, timeStart, timeEnd, 3);
            this.$refs.cSO2.fetchCity1Data(cityTwo, timeStart, timeEnd, 4);
            this.$refs.cSO2.fetchCity2Data(cityOne, timeStart, timeEnd, 4);
        }
    }
}
</script>

<style scoped>

</style>
