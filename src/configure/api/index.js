//主服务器IP
const IP_Main = '172.26.99.143';
//java后台主端口
const Port_Main = '8099';
//流程引擎系统的地址
const host = "http://19.128.104.117:8080/";
//新的流程引擎系统地址
const host_new = `http://${IP_Main}:${Port_Main}/`;
//模型执行日志输出地址
const wsLogger = `ws://${IP_Main}:${Port_Main}/`;
//可视化系统地址
const IP = window.location.host;
const sys_url = `http://${IP}/`;
//地图可视化分享系统地址
const sys_shared_url = `http://${IP_Main}:${Port_Main}/`;
//node后台服务地址
let host_node_server = `http://127.0.0.1:3030`;
//鉴权服务地址
const host_Oauth = "http://172.26.99.142/";
const serverHost = `http://${IP_Main}:${Port_Main}/`; //后台服务器地址
//arcgis server代理地址配置
const proxyIP = `http://${IP_Main}:${Port_Main}/Java/proxy.jsp`; //proxy代理IP配置
const proxyUrl = `${proxyIP ? (proxyIP + '?') : ''}`;
const mapserver = `192.168.200.189:6080`; ///地图服务IP与端口,用于proxy代理配置

export default {
    AppId: 755,
    IP_Main: IP_Main,
    Port_Main: Port_Main,
    big_data_sys: sys_url,
    big_data_sys_shared: sys_shared_url + 'analyticPlatMapShared_v4/#/',
    modeler: host + "flow", //旧的流程引擎系统地址
    flow_new: host_new + "flowNew/#/", //新的的流程引擎系统地址
    dci_auth: host_Oauth + "DCIAuth/OAuth/Authorize", //鉴权服务
    node_server: host_node_server, //node后台服务地址
    wsLoggerUrl: wsLogger + "flow/ws?user=zhangsan",//模型执行日志
    geoServerUrl: serverHost + "flow/service/geoserver/wpsxml", //服务元数据
    modelDataSaveUrl: serverHost + "flow/service/model/save", //保存模型和配置信息的数据
    modelDataSaveAndRunUrl: serverHost + "flow/service/model/saveandrun", //保存模型和配置信息的数据,并执行
    getInitModelData: serverHost + "flow/modelsource/", //获取模型初始化数据
    proxyUrl: proxyUrl, //代理服务地址
    mapServer: mapserver //地图服务地址
};
