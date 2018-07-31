<template>
    <div id="aqiTimeSequence">
        <SearchTitle :cityList="citylist" @changeCity="seach"/>
        <div id="searchContent">
            <Tabs type="card">
                <TabPane label="AQI">
                    <v-AQI ref="aqi" />
                </TabPane>
                <TabPane label="PM2.5">
                    <v-PM25 ref="pm25" />
                </TabPane>
                <TabPane label="PM10">
                    <v-PM10 ref="pm10" />
                </TabPane>
                <TabPane label="SO2">
                    <v-SO2 ref="so2" />
                </TabPane>
                <TabPane label="NO2">
                    <v-NO2 ref="no2" />
                </TabPane>
                <TabPane label="CO">
                    <v-CO ref="co" />
                </TabPane>
                <TabPane label="O3">
                    <v-O3 ref="o3" />
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import SearchTitle from '../public/SearchTitle'
import vAQI from './children/vAQI'
import vPM25 from './children/vPM25'
import vPM10 from './children/vPM10'
import vSO2 from './children/vSO2'
import vNO2 from './children/vNO2'
import vCO from './children/vCO'
import vO3 from './children/vO3'
import axios from '../../../lib/util'

export default {
    name: 'aqiTimeSequence',
    components: {
        SearchTitle,
        vAQI,
        vPM25,
        vPM10,
        vSO2,
        vNO2,
        vCO,
        vO3,
    },
    created() {
        this.fetchData();
    },
    data() {
        return {
            citylist: [],
            selectedData: {
                city: "北京",
                dateStart: "2018-05-01",
                dateEnd: "2018-05-30"
            }
        }
    },
    methods: {
        // 获取城市列表数据
        fetchData () {
            axios.post({
                url: "citylist",
            }).then((response) => {
                console.log(response);
                response.citylist.forEach(item => {
                    this.citylist.push(item);
                });
            }).catch((error) => {
                console.log(error);
            })
        },
        seach (city, dateStart, dateEnd) {
            console.log('搜索');
            this.selectedData.city = city;
            this.selectedData.dateStart = dateStart;
            this.selectedData.dateEnd = dateEnd;
            this.$refs.aqi.fetchData(city, dateStart, dateEnd, 1);
            this.$refs.pm25.fetchData(city, dateStart, dateEnd, 2);
            this.$refs.pm10.fetchData(city, dateStart, dateEnd, 3);
            this.$refs.so2.fetchData(city, dateStart, dateEnd, 4);
            this.$refs.no2.fetchData(city, dateStart, dateEnd, 5);
            this.$refs.co.fetchData(city, dateStart, dateEnd, 6);
            this.$refs.o3.fetchData(city, dateStart, dateEnd, 7);
        }
    }
}
</script>

<style scoped>

</style>
