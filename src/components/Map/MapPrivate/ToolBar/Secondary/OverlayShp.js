import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';

class OverlayShp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className={'content_overlay_shp'}>
                叠加SHP
            </div>
        );
    }
}

OverlayShp.propTypes = {
    className: PropTypes.string
};
export default OverlayShp;