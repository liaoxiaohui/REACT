import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import {Popover, Button} from 'antd';
import 'Components/Map/MapPrivate/DataFilter/dataFilter.less';

class DataFilter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    state = {
        visible: false,
    };

    handleVisibleChange = (visible, item) => {
        console.log(visible, item);
        this.setState({visible});
    };

    render() {
        const {className, totalData, Content, title} = this.props;
        return (
            <div className={'DataFilter data_filter g_clear_fix ' + className}>
                <span className={'total_show'}>{`${totalData} 条数据`}</span>
                <Popover
                    content={Content}
                    title={title}
                    trigger="click"
                    placement="rightTop"
                    overlayClassName={'popover_filter'}
                    visible={this.state.visible}
                    onVisibleChange={(visible) => this.handleVisibleChange(visible, this.props)}
                >
                    <Button icon={'filter'}
                            className={'btn_filter'}
                            style={{border: 'none'}}>筛选</Button>
                </Popover>
            </div>
        );
    }
}

DataFilter.propTypes = {
    className: PropTypes.string,
    totalData: PropTypes.number,
    Content: PropTypes.element.isRequired,
    title: PropTypes.string
};
export default DataFilter;