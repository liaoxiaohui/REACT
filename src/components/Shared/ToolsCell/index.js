import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import {Tooltip, Popover, Button} from 'antd';
import 'Shared/ToolsCell/toolsCell.less';
import {typeOf} from "Utils/tool-utils";

class ToolsCell extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    state = {
        visible: false,
    };

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = (visible, item) => {
        console.log(visible, item);
        this.setState({visible});
    };
    getBtnTooltip = () => {
        let {icon, title, handleClick} = this.props;
        let {visible} = this.state;
        return (
            <Tooltip placement="left" title={title}>
                <Button className={['tools_btn', visible ? 'selected' : ''].join(' ')}
                        onClick={(e) => typeOf(handleClick) === 'function' && handleClick(this.props, e)}>
                    <i className={['tools_icon', icon].join(' ')}/>
                </Button>
            </Tooltip>
        );
    };

    render() {
        let {className, title, Content} = this.props;
        return (
            <div
                className={['ToolsCell', className, !!Content ? 'has_sub_menu' : ''].join(' ')}>
                {
                    !!Content
                        ? <Popover
                            content={<Content hide={this.hide}
                                              {...this.props}
                                              handleVisibleChange={this.handleVisibleChange}/>}
                            title={title}
                            trigger="click"
                            placement="left"
                            visible={this.state.visible}
                            overlayClassName={'popover_' + className}
                            onVisibleChange={(visible) => this.handleVisibleChange(visible, this.props)}
                        >
                            {
                                this.getBtnTooltip()
                            }
                        </Popover>
                        : this.getBtnTooltip()

                }
            </div>
        );
    }
}

ToolsCell.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    handleClick: PropTypes.func,
    Content: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element])
};

export default ToolsCell;