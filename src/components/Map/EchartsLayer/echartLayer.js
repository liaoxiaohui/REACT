import echarts from "echarts";
// import echarts from "echarts-gl"
import { graphic, init, matrix, registerCoordinateSystem } from 'echarts';
export const echartsLayer= {};

echartsLayer.ChartLayer= function (view, option) {

	registerCoordinateSystem('arcgis', getE3CoordinateSystem(view));
	/*自定义layer对象*/
	var layer = {
		view: null,
		box: null,
		chart: null,
		chartOption: null,
		visible:true,
		init(map, option) {
			this.setBaseMap(map);
			this.setChartOption(option);
			createLayer();
		},
		setBaseMap(map) {
			this.view = map;
		},
		setChartOption(option) {
			this.chartOption = option;
		},
		setVisible(bool) {
			if (!this.box || this.visible===bool) return;
			this.box.hidden = !bool;
			this.visible = bool;
			bool===true && setCharts();
		},
		refreshBegin(){
			this.box.hidden = true;
		},
		refreshing(){
			setCharts();
		},
		refreshEnd(){
			this.box.hidden = false;
		},
		map_DragStart_Listener : null,
		map_DragEnd_Listener : null,
		map_ZoomStart_Listener : null,
		map_ZoomEnd_Listener : null,
		map_ExtentChange_Listener : null,
		map_click_Listener : null,
	};

	layer.init(view, option);
	this.setChartOption = function (option) {
		layer.setChartOption(option);
		setCharts();
	};
	this.setVisible = function (bool) {
		layer.setVisible(bool);
	};
	this.remove = function () {
		removeLayer();
	};
	this.on = function(eventName, handler, context){
		layer.chart.on(eventName, handler, context);
	};
	this.off = function(eventName, handler, context){
		layer.chart.off(eventName, handler, context);
	};
	/*绘制echarts*/
	function setCharts() {
		if(!layer.visible) return;
		let baseMap = layer.view;
		let baseExtent = baseMap.extent;
		//判断是否使用了mark类型标签，每次重绘要重新转换地理坐标到屏幕坐标
		//根据地图extent,重绘echarts
		layer.chartOption.xAxis = {show: false, min: baseExtent.xmin, max: baseExtent.xmax};
		layer.chartOption.yAxis = {show: false, min: baseExtent.ymin, max: baseExtent.ymax};
		layer.chart.setOption(layer.chartOption);
		layer.chartOption.animation = false;
	};
	/*创建layer的容器，添加到map的layers下面*/
	function createLayer() {
		let box = layer.box = document.createElement("div");
		box.setAttribute("id","testData")
		box.setAttribute("name","testData")
		box.style.width =  view.width + 'px';
		box.style.height = view.height + 'px';
		box.style.position = "absolute";
		box.style.top = 0;
		box.style.left = 0;
		let parent = document.getElementsByClassName("esri-view-surface")[0]
		console.log(parent,"6666666666");
		parent.appendChild(box);
		layer.chart = echarts.init(box);
		setCharts();
		startMapEventListeners();
	};
	/*销毁实例*/
	function removeLayer() {
		layer.box.outerHTML = "";
		layer.view = null;
		layer.box = null;
		layer.originLyr = null;
		layer.features = null;
		layer.screenData = [];
		layer.chart = null;
		layer.chartOption = null;
		layer.map_DragStart_Listener.remove();
		layer.map_DragEnd_Listener.remove();
		layer.map_ZoomStart_Listener.remove();
		layer.map_ZoomEnd_Listener.remove();
		layer.map_ExtentChange_Listener.remove();
	};
	/*监听地图事件，根据图层是否显示，判断是否重绘echarts*/
	function startMapEventListeners() {
		let view=layer.view;
		layer.map_ExtentChange_Listener = view.watch("extent",function () {


			if(!layer.visible) return;
			setCharts();
			layer.chart.resize();
			layer.box.hidden = false;
		});
		layer.map_ExtentChange_Listener = view.watch("rotation",function () {
			if(!layer.visible) return;
			setCharts();
			layer.chart.resize();
			layer.box.hidden = false;
		});

	}
	// /*监听图层的transform*/
	// function mapTransformWatcher(target,config) {
	// 	let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	// 	let observer = new MutationObserver(function(mutations) {
	// 		mutations.some(mutation=>{
	// 			let isTransform = ( mutation.attributeName === "style" );
	// 			isTransform && ( layer.box.style.transform = mutation.target.style.transform );
	// 			return isTransform;
	// 		})
	// 	});
	// 	observer.observe(target, config);
	// 	return observer;
	// }
	// /*重置layer的transform*/
	// function layerTransformReset() {
	// 	layer.box.style.transform = "";
	// }
	function getE3CoordinateSystem(map) {
		var CoordSystem = function CoordSystem(map) {
					this.map = map;
					this._mapOffset = [0, 0];
				};
		CoordSystem.create = function (ecModel) {
			  ecModel.eachSeries(function (seriesModel) {
			  	  if (seriesModel.get('coordinateSystem') ===   'arcgis') {
							seriesModel.coordinateSystem = new CoordSystem(map);
						}
					});
				};
		CoordSystem.getDimensionsInfo = function () {
					return ['x', 'y'];
				};
		CoordSystem.dimensions = ['x', 'y'];
		CoordSystem.prototype.dimensions =  ['x', 'y'];
		CoordSystem.prototype.setMapOffset = function setMapOffset(mapOffset) {
					this._mapOffset = mapOffset;
				}
		CoordSystem.prototype.dataToPoint = function dataToPoint(data) {
			   var point  = {
						type:"point",
						x:data[0],
						y:data[1],
						spatialReference:map.spatialReference
					};
			   var px = map.toScreen(point);
			   var mapOffset = this._mapOffset;
			   return [px.x - mapOffset[0], px.y - mapOffset[1]];
			   }
		CoordSystem.prototype.pointToData=  function pointToData(pt) {
					var mapOffset = this._mapOffset;
					var screentPoint  = { x:pt[0] + mapOffset[0],
					                  	  y:pt[1] + mapOffset[1]
					};
					var data = map.toMap(screentPoint);
					return [data.x, data.y];
				};
		CoordSystem.prototype.getViewRect =  function getViewRect() {
					return new graphic.BoundingRect(0, 0, this.map.width, this.map.height);
				};
		CoordSystem.prototype.getRoamTransform = function getRoamTransform() {
					return matrix.create();
				};
				return CoordSystem
	}
};
