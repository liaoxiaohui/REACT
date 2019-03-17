import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import 'Components/Map/Navigate/navigate.less';

export default class Navigate extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="Navigate">

            </div>
        );
    }
}
