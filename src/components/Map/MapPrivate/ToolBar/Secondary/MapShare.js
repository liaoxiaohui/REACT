import React from 'react';
import ReactDom from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {message, Input, Button} from 'antd'

class MapShare extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            url_shared: 'https://chinadci/'
        }
    }

    componentDidMount() {
        const _this = this;
        this.clipboard = new Clipboard('#map_share_url_copy', {
            target: function (trigger) {
                return ReactDom.findDOMNode(_this.UrlInput);
            }
        });
        this.clipboard.on('success', function (e) {
            message.success('复制成功！');
            e.clearSelection();
        });

        this.clipboard.on('error', function (e) {
            message.error('复制失败！');
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    render() {
        let {url_shared} = this.state;
        let {hide} = this.props;
        return (
            <div className={'map_share'}>
                <Input ref={(ref) => {
                    this.UrlInput = ref
                }} defaultValue={url_shared + 'map/Shared?shareId=shdkfjdggs1525g'}/>
                <div className={'map_share_btn_group'}>
                    <Button onClick={hide}>取消</Button>
                    <Button type="primary" id={'map_share_url_copy'}>复制</Button>
                </div>
            </div>
        );
    }
}

MapShare.propTypes = {
    className: PropTypes.string
};
export default MapShare;