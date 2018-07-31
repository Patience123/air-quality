import axios from "axios"

export default {
    // 对post请求进行封装
    post: function(obj) {
        return new Promise(function(resolve, reject) {
            obj.data = obj.data || {};

            let options = {
                url: obj.url,
                method: 'post',
                baseURL: 'http://172.29.24.28:8080/airquality/aqi/',
                transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return JSON.stringify(data);
                }],
                // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
                transformResponse: [function (data) {
                    // 对 data 进行任意转换处理
                    if(typeof data !== 'object') {
                        try {
                            data = JSON.parse(data);
                        } catch(error) {
                            console.log(error);
                        }
                    }
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json'
                },
                data: obj.data
            };

            axios.request(options).then(response => {
                resolve(response.data, response);
            }).catch(response => {
                reject(response);
            });
        });
    }
}