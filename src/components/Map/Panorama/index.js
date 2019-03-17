import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import 'Components/Map/Panorama/panorama.less';
import DataFilter from 'Components/Map/MapPrivate/DataFilter';

export default class Panorama extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="Panorama">
                <DataFilter title={'区域筛选'} totalData={0} Content={<Content {...this.props}/>}/>
            </div>
        );
    }
}
const Content = (props) => {
    console.log(props);
    return (
        <div className={'popover_filter_content'}>

        </div>
    );
};