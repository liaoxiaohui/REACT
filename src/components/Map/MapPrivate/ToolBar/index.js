import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import ToolsCell from 'Shared/ToolsCell';
import OverlayShp from 'Components/Map/MapPrivate/ToolBar/Secondary/OverlayShp';
import Tools from 'Components/Map/MapPrivate/ToolBar/Secondary/Tools';
import HelpTips from 'Components/Map/MapPrivate/ToolBar/Secondary/HelpTips';
import MapShare from 'Components/Map/MapPrivate/ToolBar/Secondary/MapShare';

import 'Components/Map/MapPrivate/ToolBar/ToolBar.less';

class ToolBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            tools_arr: [
                {
                    id: 0,
                    title: '叠加SHP',
                    icon: 'iconfont icon-zhedie-jia',
                    className: 'overlay_shp first',
                    Content: OverlayShp,
                    handleClick: this.handleClickChange
                },
                {
                    id: 1,
                    title: '地图对比',
                    icon: 'iconfont icon-duibi',
                    className: 'map_compare',
                    handleClick: this.handleClickChange
                },
                {
                    id: 2,
                    title: '工具',
                    icon: 'iconfont icon-gongju',
                    className: 'toolset',
                    Content: Tools,
                    handleClick: this.handleClickChange
                },
                {
                    id: 3,
                    title: '截图',
                    icon: 'iconfont icon-jietu',
                    className: 'screen_shot',
                    handleClick: this.handleClickChange
                },
                {
                    id: 4,
                    title: '全屏',
                    icon: 'iconfont icon-quanping',
                    className: 'full_screen',
                    handleClick: this.handleClickChange
                },
                {
                    id: 5,
                    title: '全景',
                    icon: 'iconfont icon-quanjing1',
                    className: 'panoramic',
                    handleClick: this.handleClickChange
                },
                {
                    id: 6,
                    title: '分享',
                    icon: 'iconfont icon-fenxiang',
                    className: 'share',
                    Content: MapShare,
                    handleClick: this.handleClickChange
                },
                {
                    id: 7,
                    title: '帮助',
                    icon: 'iconfont icon-bangzhu',
                    className: 'helps',
                    Content: HelpTips,
                    handleClick: this.handleClickChange
                },
                {
                    id: 8,
                    title: '删除',
                    icon: 'iconfont icon-shanchu',
                    className: 'delete last',
                    handleClick: this.handleClickChange
                }
            ]
        }
    }

    handleClickChange = (e, item) => {
        console.log(e, item);
    };

    render() {
        let {tools_arr} = this.state;
        let {className} = this.props;
        return (
            <div className={['ToolBar', className].join(' ')}>
                {
                    tools_arr.map((item, index) => <ToolsCell key={index + '' + item.id}
                                                              {...item}/>)
                }
            </div>
        );
    }
}

ToolBar.propTypes = {
    className: PropTypes.string
};

export default ToolBar;