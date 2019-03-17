import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {Avatar} from 'antd'
import {typeOf} from "Utils/tool-utils";
import deepCopy from 'deep-copy';
import {objectFilterByProps} from "Utils/object_utils";
import 'Shared/AvatarWithText/avatarWithText.less'

const AvatarWithText = (props) => {
    let {text, textIcon, iconDefine, iconClickHandler, iconHoverHandler, getAvatarRef, children} = props;
    const defined_props = ['text', 'iconDefine', 'iconClickHandler', 'iconHoverHandler', 'getAvatarRef'];
    const def_props = {
        size: 'large',
        icon: 'user'
    };
    textIcon && defined_props.push('icon');

    const ava_props = deepCopy(Object.assign(def_props, props));
    return (
        <div className={'avatar_with_text'}
             onMouseOver={(e) => typeOf(iconHoverHandler) === 'function' && iconHoverHandler(props, e)}
             onClick={(e) => typeOf(iconClickHandler) === 'function' && iconClickHandler(props, e)}>
            <div className={'avatar_tp'}>
                <Avatar {...objectFilterByProps(ava_props, defined_props)}
                        ref={(ref) => {
                            let avatarDom = ReactDOM.findDOMNode(ref);
                            let iconDom = avatarDom && avatarDom.querySelector('i');
                            (!!iconDefine && iconDom) && (iconDom.className = iconDefine);
                            typeOf(getAvatarRef) === 'function' && getAvatarRef(ref);
                        }}>{textIcon}</Avatar>
            </div>
            {
                !!text && <div className={'avatar_bt'}>
                    {text}
                </div>
            }
            {children}
        </div>
    );
};
AvatarWithText.propTypes = {
    icon: PropTypes.string,
    src: PropTypes.string,
    shape: PropTypes.string,
    size: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    onError: PropTypes.func,
    iconDefine: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    textIcon: PropTypes.string,
    style: PropTypes.object,
    getAvatarRef: PropTypes.func,
    iconClickHandler: PropTypes.func,
    iconHoverHandler: PropTypes.func,
};
export default AvatarWithText;