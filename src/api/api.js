// 引入axios
import axios from 'axios'
import eventBus from "../bus.js";
// 请求延时（毫秒数，如果请求话费超过了'timeout'的时间，请求将被中断）
axios.defaults.timeout = 100000
//axios.defaults.baseURL ='/api';
var str = '\\\\SHA-FS-01A\\WinComm-ADOS\\Readiness\\Team\\Tool'
// eventBus.$on("getDataSource",(data)=>{
//     if(data == "opt1"){
//         str = '\\\\wuxcssfs\\cts\\EPS\\Team\\Tool'
//     }else if(data == "opt2"){
//         str = '\\SHA-FS-01A\WinComm-ADOS\Readiness\Team\Tool'
//     }
// });
var tagmapping = str+'\\tagmapping.xlsx'
// var tagmapping = '\\\\wuxcssfs\\CTS\\EPS\\Team\\Tool\\tagmapping.xlsx'
var send=''
var result = str.replaceAll(/\\/g,'%5C') ;
// export const getAllData = params => {
//     return axios.get(`http://10.168.174.68:5000/tools`,{ params:  {'data-src':'%5C%5Cwuxcssfs%5Ccts%5CEPS%5CTeam%5CTool'}});
// };
const getAllData = params => {
    console.log(str);
    return axios.get(`http://10.168.174.68:5000/files`,{ params: {'data-src':str}});
};
// export const getAllData = params => {
//     return axios.get(`http://10.168.174.68:5000/tools?data-src=%5C%5Cwuxcssfs%5Ccts%5CEPS%5CTeam%5CTool`,{ params:  {'data-src':'%5C%5Cwuxcssfs%5Ccts%5CEPS%5CTeam%5CTool'}});
// };
const getDetail = path => {
    // console.log(`http://10.168.174.68:5000/tools/${path}?data-src=${result}`);
    return axios.get(`http://10.168.174.68:5000/files/${path}`,{ params: {'data-src':str}})

}

const readme = toolName =>{
    return axios.get(`http://10.168.174.68:5000/tools/${toolName}`,{ params: {'data-src':tagmapping}})
}
const senarioSearch = senario =>{
    return axios.get(`http://10.168.174.68:5000/tools/scenario/search`,{ params:{'keywords':senario,'data-src':tagmapping}})
}
const download = path => {
    // console.log(`http://10.168.174.68:5000/tools/${path}?data-src=${result}`);
    // return axios.get(`http://10.168.174.68:5000/files/${path}`,{ params: {'data-src':str}})
    eventBus.$emit("download", `http://10.168.174.68:5000/files/${path}?data-src=${str}`);
    // eventBus.$emit("download", axios.get(`http://10.168.174.68:5000/files/${path}`,{ params: {'data-src':str}}));
    // return axios.get(`http://10.168.174.68:5000/files/${path}`,{ params: {'data-src':str}})
    
}
export{
    getAllData,
    getDetail,
    download,
    readme,
    senarioSearch
}