import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import NullMessage from 'Shared/NullMessage'

class HelpTips extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className={'help_tips'}>
                <NullMessage message={'暂无提示信息'}/>
            </div>
        );
    }
}

HelpTips.propTypes = {
    className: PropTypes.string
};
export default HelpTips;