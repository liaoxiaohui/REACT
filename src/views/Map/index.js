import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ScrollBar from 'Shared/ScrollBar';
import {connect} from 'react-redux';
/**第三方组件**/
import {Input, Tabs, Icon, Tooltip} from 'antd';
/**模块组件**/
import Catalog from 'Components/Map/Catalog';
import Mark from 'Components/Map/Mark';
import Navigate from 'Components/Map/Navigate';
import Panorama from 'Components/Map/Panorama';
import Navigation from 'Components/Map/MapPrivate/Navigation';
import ToolBar from 'Components/Map/MapPrivate/ToolBar';
import MapSearch from 'Components/Map/MapPrivate/MapSearch';
/**地图样式**/
import 'Views/Map/map.less';
//地图相关组件
import DciMap from 'Components/Map/dciMap';
import {typeOf} from "Utils/tool-utils";


/**主面板高阶组件**/
const PanelWrapper = (WrappedComponent, callbackHandler) => {
    return class extends React.Component {
        constructor(props, context) {
            super(props, context)
        }

        componentDidMount() {
            this.setState({
                scrollRef: this.scrollRef,
                containerRef: this.containerRef
            })
        }

        render() {
            return (
                <ScrollBar className={'panel_main_scroll'}
                           scrollRef={(ref) => (this.scrollRef = ref)}
                           containerRef={(ref) => (this.containerRef = ref)}>
                    <div className={'scroll_inner'}>
                        <WrappedComponent {...this.props} {...this.state}
                                          callbackHandler={callbackHandler}/>
                    </div>
                </ScrollBar>
            )
        }
    }
};

/***地图制图模块核心组件***/
class MapModule extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.getPanelMain = this.getPanelMain.bind(this);
        this.getTabsComponent = this.getTabsComponent.bind(this);

        const PanelCatalog = PanelWrapper(Catalog);
        const PanelMark = PanelWrapper(Mark);
        const PanelNavigate = PanelWrapper(Navigate);
        const PanelPanorama = PanelWrapper(Panorama);
        this.state = {
            toggle_panel: false,
            search_keyword: '',
            tabs: [
                {
                    id: 0,
                    title: '目录',
                    icon: 'iconfont icon-layer',
                    Content: PanelCatalog
                }, {
                    id: 1,
                    title: '标注',
                    icon: 'iconfont icon-biaozhu1',
                    Content: PanelMark
                }, {
                    id: 2,
                    title: '导航',
                    icon: 'iconfont icon-daohang',
                    Content: PanelNavigate
                }, {
                    id: 3,
                    title: '全景',
                    icon: 'iconfont icon-quanjing',
                    Content: PanelPanorama
                }
            ]
        };

    }

    tabClickHandle = (data) => {
        console.log(data);
    };

    getTabsComponent() {
        const TabPane = Tabs.TabPane;
        let {tabs} = this.state;
        const _this = this;
        return (
            <Tabs
                defaultActiveKey="1"
                className={'TabsMain'}
                onTabClick={this.tabClickHandle}
                style={{height: '100%'}}>
                {
                    tabs.map((item, i) => <TabPane tab={
                        <span className={'icon_wrap'}>
                             <i className={item.icon}/>
                            {item.title}
                          </span>} key={i + 1 + ''}>
                        <item.Content {..._this.props}/>
                    </TabPane>)
                }
            </Tabs>
        );
    }

    searchBlurChange = () => this.setState({toggle_panel: true});
    searchInputChange = (val) => this.setState({search_keyword: val});
    searchIconClick = () => {
        this.SearchInput.input.input.value = '';
        this.setState({
            search_keyword: '',
            toggle_panel: false
        });
    };
    getSearchIcon = () => {
        return (
            <Tooltip placement="bottom" title={'清除'}>
                <Icon type="close" theme="outlined"
                      style={{cursor: 'pointer'}}
                      onClick={this.searchIconClick}/>
            </Tooltip>
        );
    };

    getPanelMain() {
        const Search = Input.Search;
        const {toggle_panel, search_keyword} = this.state;
        let panel_hd_style = {height: '80px'};
        if (toggle_panel) {
            panel_hd_style.height = '95px';
            panel_hd_style.borderBottom = '1px solid #C1CDDB';
        }
        return (
            <div className={'panel_main'}>
                <div className={'panel_hd'} style={panel_hd_style}>
                    <div className={'sys_headline'}/>
                    <div className={'sys_searcher'}>
                        <Search
                            placeholder="搜索..."
                            ref={(ref) => {
                                this.SearchInput = ref;
                            }}
                            prefix={toggle_panel && this.getSearchIcon()}
                            onFocus={this.searchBlurChange}
                            onSearch={value => this.searchInputChange(value)}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
                <div className={'panel_bd'} style={{height: `calc(100% - ${panel_hd_style.height})`}}>
                    {
                        toggle_panel
                            ? <MapSearch search_keyword={search_keyword} {...this.state}/>
                            : this.getTabsComponent()
                    }
                </div>
            </div>
        );
    }

    render() {
        const options = {
            dojoConfig: {
                has: {
                    "esri-promise-compatibility": 1
                }
            },
        };
        const mapId = 'dciMainMap';
        return (
            <div className="page_maps g_clear_fix" id={'page_maps'}>
                {this.getPanelMain()}
                <div className="map_canvas" id="map_canvas" style={{}}>
                    <div className="container_map">
                        <DciMap key={0} mapId={mapId} options={options}/>
                    </div>
                </div>
                <Navigation/>
                <ToolBar/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {};
};

const dispatchToProps = (dispatch, ownProps) => {

    return {};
};

export default connect(mapStateToProps, dispatchToProps)(MapModule);