import "@dojo/shim/Promise";
import "Src/config";
import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Map from "esri/Map";
import Basemap from "esri/Basemap";
import WebTileLayer from "esri/layers/WebTileLayer"
import FeatureLayer from "esri/layers/FeatureLayer";
import VectorTileLayer from "esri/layers/VectorTileLayer"
import TileInfo from "esri/layers/support/TileInfo"
import SpatialReference from "esri/geometry/SpatialReference"
import Point from "esri/geometry/Point"
import Extent from "esri/geometry/Extent"
import BasemapToggle from "esri/widgets/BasemapToggle"
import Legend from "esri/widgets/Legend"
import lang from "esri/core/lang"
import colorSchemes from "esri/renderers/smartMapping/symbology/color"
import rendererJsonUtils from "esri/renderers/support/jsonUtils"
import {echartsLayer} from "./EchartsLayer/echartLayer"

import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from "react-addons-pure-render-mixin";

import { initialMap, delAction } from "./dciMapReducer";
import UUID from "uuid/v1";
import { arcgisToGeoJSON, geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { func } from "prop-types";

class DciMap extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.loadMap = this.loadMap.bind(this);
        this.loadVisualResults = this.loadVisualResults.bind(this);
        this.changeStyLyrRender = this.changeStyLyrRender.bind(this);
    }

    componentDidMount() {
        this.loadMap();
    }

    componentWillUpdate(nextProps, nextState) {
        // let { delActions, actions } = nextProps;
        // let t = this;
        // let completeActions = [];
        // if (actions.length > 0 && actions[0] != 0) {
        //     actions.map(function (items, index) {
        //         if (typeof t[items] == "function") {
        //             t[items](nextProps);
        //             completeActions.push(index);
        //         }
        //     })
        //     delActions(completeActions);
        // }

    }
    loadMap() {
        const { view, basemap, mapId, initMap } = this.props;
        const geojson = geojsonToArcGIS({
            "geometry": {
                "type": "Point",
                "coordinates": [
                    113.512850090792,
                    22.9790744810566
                ]
            },
            "type": "Feature",
            "properties": {
                "gid": 13
            }
        });
        const tileInfo = new TileInfo({
            "dpi": 96,
            "format": "image/png",
            "compressionQuality": 0,
            "spatialReference": new SpatialReference({
                "wkid": 4490
            }),
            "rows": 256,
            "cols": 256,
            "origin": {
                "x": -180,
                "y": 90
            },
            "lods": [
                { "level": 1, "resolution": 0.703125, "scale": 295829355.454566 },
                { "level": 2, "resolution": 0.3515625, "scale": 147914677.727283 },
                { "level": 3, "resolution": 0.17578125, "scale": 73957338.8636414 },
                { "level": 4, "resolution": 0.087890625, "scale": 36978669.4318207 },
                { "level": 5, "resolution": 0.0439453125, "scale": 18489334.7159103 },
                { "level": 6, "resolution": 0.02197265625, "scale": 9244667.35795517 },
                { "level": 7, "resolution": 0.010986328125, "scale": 4622333.67897759 },
                { "level": 8, "resolution": 0.0054931640625, "scale": 2311166.83948879 },
                { "level": 9, "resolution": 0.00274658203125, "scale": 1155583.4197444 },
                { "level": 10, "resolution": 0.001373291015625, "scale": 577791.709872198 },
                { "level": 11, "resolution": 0.0006866455078125, "scale": 288895.854936099 },
                { "level": 12, "resolution": 0.00034332275390625, "scale": 144447.92746805 },
                { "level": 13, "resolution": 0.000171661376953125, "scale": 72223.9637340248 },
                { "level": 14, "resolution": 8.58306884765625E-05, "scale": 36111.9818670124 },
                { "level": 15, "resolution": 4.29153442382813E-05, "scale": 18055.9909335062 },
                { "level": 16, "resolution": 2.14576721191406E-05, "scale": 9027.9954667531 },
                { "level": 17, "resolution": 1.07288360595703E-05, "scale": 4513.99773337655 },
                { "level": 18, "resolution": 5.36441802978516E-06, "scale": 2256.99886668828 },
                { "level": 19, "resolution": 2.68522039674394E-06, "scale": 1128.4994333441375 },
                { "level": 20, "resolution": 1.34261087253974E-06, "scale": 564.25 }
            ]
        });

        //至少一个图层必须指定spatialReference，否则无法加载
        const tiledLayer = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=vec_c&X={col}&Y={row}&L={level}',
            subDomains: ["t0", "t1", "t2"],
            spatialReference: {
                "wkid": 4490
            },
            tileInfo: tileInfo
        });

        const tiledLayerMarker = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=cva_c&X={col}&Y={row}&L={level}',
            subDomains: ["t0", "t1", "t2"],
            spatialReference: {
                "wkid": 4490
            },
            tileInfo: tileInfo
        });

        const Img_tiledLayer = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=img_c&X={col}&Y={row}&L={level}',
            subDomains: ["t0", "t1", "t2"],
            spatialReference: {
                "wkid": 4490
            },
            tileInfo: tileInfo
        })

        const Img_tiledLayerMarker = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=cia_c&X={col}&Y={row}&L={level}',
            subDomains: ["t0", "t1", "t2"],
            spatialReference: {
                "wkid": 4490
            },
            tileInfo: tileInfo
        })

        const dciBasemap = new Basemap({
            baseLayers: [tiledLayer, tiledLayerMarker],
            title: "矢量地图",
            id: "dciBasemap"
            //thumbnailUrl: vec_Img
        });

        const pt = new Point({
            x: 113.122,
            y: 22.616,
            spatialReference: 4490
        });
        const mapView = new MapView({
            container: this.mapDiv,
            zoom: 8,
            map: new Map({
                basemap: dciBasemap,
                logo: false
            })
        });
        mapView.center = pt;
        mapView.ui.remove("zoom");
        mapView.ui.remove("attribution");
        mapView.when(function(){
            let options={
                "series": [
                    {
                        "coordinateSystem": 'arcgis',
                        "type": "lines",
                        "data": [
                            {   coords:[[113.122, 22.616],
                                    [121.122, 21.616]],
                                lineStyle: {
                                    normal: {
                                        color: '#5A94DF'
                                    }
                                }
                            },
                            {  coords:[[113.222, 22.616],
                                [112.122, 21.616]],
                                lineStyle: {
                                    normal: {
                                        color: '#c653df'
                                    }
                                }
                            }
                        ],
                        "effect": {
                            "show": true,
                            "period": 6,
                            "trailLength": 0.7,
                            "color": '#fff',
                            "symbolSize": 3
                        },
                        "silent": true,
                        "lineStyle": {
                            "normal": {
                                "color": "#fdf824",
                                "width": 0.1,
                                "curveness": 0.2
                            }
                        },
                        "zlevel": 1,
                    },
                    {
                        "coordinateSystem": 'arcgis',
                        "type": "lines",
                        "data": [
                            {  coords:[[114.122, 23.616],
                                [121.122, 22.616]],
                                lineStyle: {
                                    normal: {
                                        color: '#5A94DF'
                                    }
                                }
                            },
                            {   coords:[[113.122, 22.616],
                                [122.122, 24.616]],
                                lineStyle: {
                                    normal: {
                                        color: '#c653df'
                                    }
                                }
                            },
                        ],
                        "lineStyle": {
                            "normal": {
                                "color": "#fdd1bf",
                                "width": 1,
                                "opacity": 0.4,
                                "curveness": 0.2
                            }
                        },
                        "effect": {
                            "show": true,
                            "period": 6,
                            "trailLength": 0,
                             "symbol": 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
                            "symbolSize": 15
                        },
                        "zlevel": 2,
                    },
                    {
                        name: '2',
                        type: 'effectScatter',
                        coordinateSystem: 'arcgis',
                        zlevel: 3,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: "#0f19fd"
                            }
                        },
                        data: [
                            {
                                name: "2222",
                                value:[113.122, 22.616],
                                itemStyle: {
                                    normal: {
                                        color: '#85dfbc'
                                    }
                                }
                            },
                            {
                                name: "1111",
                                value:[114.122, 23.616],
                                itemStyle: {
                                    normal: {
                                        color: '#29df95'
                                    }
                                }
                            }
                        ],
                    }
                ]
            }
            let eLayer = echartsLayer.ChartLayer(mapView,options);
        })
        mapView.on("click", function (evt) {
            mapView.hitTest(evt)
                .then(function (response) {
                    let result = response.results[0];
                    if (!!result && result.graphic.popupTemplate) {
                        let content = [{
                            type: "fields",
                            fieldInfos: []
                        }];
                        for (let e in result.graphic.attributes) {
                            let fieldInfo = {
                                fieldName: e,
                                label: e
                            }
                            content[0].fieldInfos.push(fieldInfo);
                        }
                        result.graphic.popupTemplate.content = content;
                        mapView.popup.dockOptions = {
                            position: "top-center"
                        }
                        console.log(result);
                    }
                })
        });
        const imgBasemap = new Basemap({
            baseLayers: [Img_tiledLayer, Img_tiledLayerMarker],
            title: "影像地图",
            //thumbnailUrl: ras_Img
        });
        // mapView.when(function () {
        //     const toggle = new BasemapToggle({
        //         view: mapView,
        //         nextBasemap: imgBasemap,
        //         titleVisible: true
        //     });
        //     mapView.ui.add(toggle, "top-right");
        // })
        initMap(mapView, mapId);
        //this.props.visualResults && !!Object.getOwnPropertyNames(this.props.visualResults) && this.loadVisualResults(this.props.visualResults, mapView, 1)
    }

    loadVisualResults(results, view, type) {
        let { loadVisual, delActions } = this.props, mapobj = null;
        if (!type) {
            view = results.view;
            mapobj = results.mapobj;
        }
        else {
            mapobj = results;
        }
        mapobj.datasetArray.map(function (name, key) {
            let styleLyr = Object.assign({}, name.layersObj["styleLyr"]);
            let analysisLyr = Object.assign({}, name.layersObj["analysisLyr"]);
            let styleLayer = null, analysisLayer = null;
            if (!!Object.keys(styleLyr).length) {
                let template = {  // autocasts as new PopupTemplate()
                    title: "{NAME}"
                }
                switch (styleLyr.sType) {
                    case 0:
                        styleLayer = new VectorTileLayer({
                            url: styleLyr.url,
                        });
                        styleLayer.id = "style_" + name.datasetId;
                        if (view.map.findLayerById(styleLayer.id)) {
                            view.map.remove(view.map.findLayerById(styleLayer.id));
                        }
                        view.map.add(styleLayer);
                        styleLayer.opacity = styleLyr.opacity;
                        styleLayer.visible = styleLyr.visible;
                        view.whenLayerView(styleLayer)
                            .then(function (layerView) {
                                let paint = styleLyr.renderInfo.lyrRenderInfo.paint;
                                if (!!Object.keys(paint).length) {
                                    let tileStyle = lang.clone(styleLayer.get("currentStyleInfo.style"));
                                    tileStyle.layers[0].paint = paint;
                                    styleLayer.loadStyle(tileStyle);
                                }
                            })
                            .catch(function (error) {
                                console.log("加载失败");
                            });
                        break;
                    case 1:
                        styleLayer = new FeatureLayer({
                            url: styleLyr.url,
                            renderer: rendererJsonUtils.fromJSON(styleLyr.renderInfo.lyrRenderInfo),
                            //renderer: !!type ? styleLyr.renderInfo.lyrRenderInfo: rendererJsonUtils.fromJSON(styleLyr.renderInfo.lyrRenderInfo),
                            outFields: ["*"],
                            popupTemplate: template

                        });
                        styleLayer.id = "style_" + name.datasetId;
                        if (view.map.findLayerById(styleLayer.id)) {
                            view.map.remove(view.map.findLayerById(styleLayer.id));
                        }
                        view.map.add(styleLayer);
                        styleLayer.opacity = styleLyr.opacity;
                        styleLayer.visible = styleLyr.visible;
                        break;
                    default:
                        styleLayer = new FeatureLayer({
                            url: styleLyr.url,
                            renderer: styleLyr.renderInfo.lyrRenderInfo,
                            outFields: ["*"],
                            popupTemplate: template
                        });
                        styleLayer.id = "style_" + name.datasetId;
                        if (view.map.findLayerById(styleLayer.id)) {
                            view.map.remove(view.map.findLayerById(styleLayer.id));
                        }
                        view.map.add(styleLayer);
                }
            }
            if (!!Object.keys(analysisLyr).length) {
                let template = {  // autocasts as new PopupTemplate()
                    title: "{NAME}"
                }
                analysisLayer = new FeatureLayer({
                    url: analysisLyr.url,
                    renderer: rendererJsonUtils.fromJSON(analysisLyr.renderInfo.lyrRenderInfo),
                    outFields: ["*"],
                    popupTemplate: template
                });
                analysisLayer.id = "analysis_" + name.datasetId + analysisLyr.resultsId[0];
                if (view.map.findLayerById(analysisLayer.id)) {
                    view.map.remove(view.map.findLayerById(analysisLayer.id));
                }
                view.map.add(analysisLayer);
                analysisLayer.opacity = analysisLyr.opacity;
                analysisLayer.visible = analysisLyr.visible;
            }
            let legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: styleLayer,
                    title: name.datasetName
                }, {
                    layer: analysisLayer,
                    title: analysisLyr.sltTitle
                }]
            });
            view.ui.empty("bottom-left");
            view.ui.add(legend, "bottom-left");
        })

        if (type == 1) {
            delActions([0]);
            loadVisual(results);
        }
    }

    clearMap(results) {
        let { view } = results;
        view.map.removeAll();
    }

    changeStyLyrRender(results) {
        let { mapobj, playMock, view } = results;
        let lyrId = "style_" + results.mapobj.datasetArray[playMock].datasetId;
        if (view.map.findLayerById(lyrId)) {
            let renderer = null;
            if (mapobj.datasetArray[playMock].layersObj.styleLyr.sType === 1) {
                if (mapobj.datasetArray[playMock].layersObj.styleLyr.renderInfo.lyrRenderInfo.type == "uniqueValue") {
                    renderer = rendererJsonUtils.fromJSON(mapobj.datasetArray[playMock].layersObj.styleLyr.renderInfo.lyrRenderInfo);
                } else {
                    renderer = view.map.findLayerById(lyrId).renderer.clone();
                    renderer.visualVariables = mapobj.datasetArray[results.playMock].layersObj.styleLyr.renderInfo.lyrRenderInfo.visualVariables;
                }
                view.map.findLayerById(lyrId).renderer = renderer;
            }
            else {
                let paint = results.mapobj.datasetArray[playMock].layersObj.styleLyr.renderInfo.lyrRenderInfo.paint;
                if (!!Object.keys(paint).length) {
                    let tileStyle = lang.clone(view.map.findLayerById(lyrId).get("currentStyleInfo.style"));
                    tileStyle.layers[0].paint = paint;
                    view.map.findLayerById(lyrId).loadStyle(tileStyle);
                }
            }
            //view.map.findLayerById(lyrId).refresh();
        }
    }

    changeAlyLyrRender(results) {
        let { mapobj, playMock, view } = results;
        let lyrId = "analysis_" + results.mapobj.datasetArray[playMock].datasetId + results.mapobj.datasetArray[playMock].layersObj.analysisLyr.resultsId[0];
        if (view.map.findLayerById(lyrId)) {
            let renderer = rendererJsonUtils.fromJSON(mapobj.datasetArray[playMock].layersObj.analysisLyr.renderInfo.lyrRenderInfo);
            view.map.findLayerById(lyrId).renderer = renderer;
        }
    }

    setOpacity(results) {
        let panelType = results.playPanel;
        let mapobj = results.mapobj;
        let playMock = results.playMock;
        let view = results.view;
        if (panelType == "style") {
            let lyrId = "style_" + results.mapobj.datasetArray[playMock].datasetId;
            view.map.findLayerById(lyrId) && (view.map.findLayerById(lyrId).opacity = mapobj.datasetArray[playMock].layersObj.styleLyr.opacity);
        }
        else {
            let lyrId = "analysis_" + results.mapobj.datasetArray[playMock].datasetId + results.mapobj.datasetArray[playMock].layersObj.analysisLyr.resultsId[0];
            view.map.findLayerById(lyrId) && (view.map.findLayerById(lyrId).opacity = mapobj.datasetArray[playMock].layersObj.analysisLyr.opacity);
        }
    }

    lyrVisible(results) {
        let { mapobj, playMock, view } = results;
        let stylyrId = "style_" + results.mapobj.datasetArray[playMock].datasetId;
        if (results.mapobj.datasetArray[playMock].layersObj.analysisLyr) {
            let alylyrId = "analysis_" + results.mapobj.datasetArray[playMock].datasetId + results.mapobj.datasetArray[playMock].layersObj.analysisLyr.resultsId[0];
            view.map.findLayerById(alylyrId) && (view.map.findLayerById(alylyrId).visible = results.mapobj.datasetArray[playMock].showEye);
        }
        view.map.findLayerById(stylyrId) && (view.map.findLayerById(stylyrId).visible = results.mapobj.datasetArray[playMock].showEye);
    }

    controlLyrVisible(results) {
        let { playPanel, mapobj, view, playMock } = results;
        if (results.mapobj.datasetArray[playMock].layersObj.analysisLyr) {
            let alylyrId = "analysis_" + results.mapobj.datasetArray[playMock].datasetId + results.mapobj.datasetArray[playMock].layersObj.analysisLyr.resultsId[0];
            let stylyrId = "style_" + results.mapobj.datasetArray[playMock].datasetId;
            if (results.mapobj.datasetArray[playMock].showEye) {
                if (playPanel == "样式") {
                    view.map.findLayerById(stylyrId) && (view.map.findLayerById(stylyrId).visible = true);
                    view.map.findLayerById(alylyrId) && (view.map.findLayerById(alylyrId).visible = false);
                } else {
                    view.map.findLayerById(alylyrId) && (view.map.findLayerById(alylyrId).visible = true);
                    view.map.findLayerById(stylyrId) && (view.map.findLayerById(stylyrId).visible = false);
                }
            }
        }
    }

    addVectorLayer(url, view) {
        let tileLyr = new VectorTileLayer({
            url: "https://tiles.arcgis.com/tiles/vqwCdgs2DAtej0Zs/arcgis/rest/services/shuzhi_vectorTile6/VectorTileServer/resources/styles/root.json"
            //url: "http://41server161.geo-k.cn/server/rest/services/Hosted/Fangwu/VectorTileServer/resources/styles/root.json"
            //url: "http://jsapi.maps.arcgis.com/sharing/rest/content/items/75f4dfdff19e445395653121a95a85db/resources/styles/root.json"
        });
        tileLyr.id = "titleLyr";
        view.map.add(tileLyr);
    }

    addFeatureLayer(url, view) {
        if (!view.map.findLayerById("feaLayer") && !view.map.findLayerById("feaLayer1")) {
            let template = {
                title: "{NAME}"
            }
            let feaLayer = new FeatureLayer({
                url: url,
                outFields: ["*"],
                popupTemplate: template
            });
            feaLayer.id = "feaLayer";
            view.map.add(feaLayer);
            let legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: feaLayer,
                    title: "图例"
                }]
            });
            view.ui.empty("bottom-left");
            view.ui.add(legend, "bottom-left");
        }
    }

    renderFeatureLyr(url, renderInfo, view) {
        var t = this;
        if (!view.map.findLayerById("feaLayer1")) {
            if (!!renderInfo) {
                let template = {  // autocasts as new PopupTemplate()
                    title: "{NAME}"
                }
                let feaLayer = new FeatureLayer({
                    url: url,
                    renderer: renderInfo,
                    outFields: ["*"],
                    popupTemplate: template
                });
                feaLayer.id = "feaLayer1";
                view.map.add(feaLayer);
                let legend = new Legend({
                    view: view,
                    layerInfos: [{
                        layer: feaLayer,
                        title: "图例"
                    }]
                });
                view.ui.empty("bottom-left");
                view.ui.add(legend, "bottom-left");
                if (view.map.findLayerById("feaLayer"))
                    view.map.remove(view.map.findLayerById("feaLayer"));
            }
        }
        else {
            t.updateFeatureLyr("feaLayer1", renderInfo, view);
        }
    }

    updateFeatureLyr(id, renderInfo, view) {
        if (view.map.findLayerById("feaLayer1")) {
            let renderer = view.map.findLayerById("feaLayer1").renderer.clone();
            renderer.visualVariables = renderInfo;
            //let url = view.map.findLayerById("feaLayer1").url;
            //view.map.remove(view.map.findLayerById("feaLayer1"));
            //this.renderFeatureLyr(url,renderer,view);

            view.map.findLayerById("feaLayer1").renderer = renderer;
            view.map.findLayerById("feaLayer1").refresh();
        }
    }

    // setOpacity(id, opacityInfo, view) {
    //     if (view.map.findLayerById(id) && view.map.findLayerById(id).opacity)
    //         view.map.findLayerById(id).opacity = opacityInfo;
    // }


    removeAllLyr(view) {
        view.ui.empty("bottom-left");
        view.map.removeAll();
    }

    render() {
        const { options } = this.props;
        return (
            <div className={'container_map'}>
                <div className="webmap"
                    ref={
                        element => this.mapDiv = element
                    }
                    onLoad={this.loadMap}
                >
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        initMap: (view, mapId) => {
            dispatch(initialMap(view, mapId));
        },
        loadVisual: (visualResults) => {
            //dispatch(saveVisualResults(visualResults));
            dispatch({
                type: "SAVE_VISUALRESULTS",
                result: visualResults
            })
        },
        delActions: (actions) => {
            dispatch({
                type: "DEL_ACTIONS",
                actions: actions
            })
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DciMap);