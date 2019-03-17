import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Tabs} from 'antd';
import MapLayer from 'Components/Map/Mark/MapLayer';
import MapLayerFactor from 'Components/Map/Mark/MapLayerFactor';
import MapLayerDownload from 'Components/Map/Mark/MapLayerDownload';

import 'Components/Map/Mark/mark.less';
import 'Components/Map/Mark/tabsCircle.less';

const TabPane = Tabs.TabPane;
export default class Mark extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.state = {}
    }

    render() {
        return (
            <div className="Mark">
                <Tabs defaultActiveKey="1" className={'TabsCircle'} size={'small'}>
                    <TabPane tab={<span><i className='iconfont icon-hongqibiaoji-'/>我的标注</span>} key="1">
                        <MapLayer/>
                        <MapLayerFactor/>
                    </TabPane>
                    <TabPane tab={<span><i className='iconfont icon-xiazai'/>标注下载</span>} key="2">
                        <MapLayerDownload/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
