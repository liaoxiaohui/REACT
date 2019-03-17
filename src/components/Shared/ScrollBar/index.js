import React from 'react';
import PropTypes from 'prop-types';
import {typeOf} from "Utils/tool-utils";
import ReactPerfectScrollBar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'Shared/ScrollBar/scrollBar.less';

/***
 * 定制滚动条
 * 注意：containerRef以及scrollRef分别可以获取滚动组件以及实例，但需要在初始化之后使用，故使用的时候需要先判断是否存在
 * @param props
 * @returns {*}
 * @constructor
 */
const ScrollBar = (props) => {
    const def_options = {
        handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
        wheelSpeed: 1,
        wheelPropagation: false,
        swipeEasing: true,
        minScrollbarLength: null,
        maxScrollbarLength: null,
        scrollingThreshold: 1000,
        useBothWheelAxes: false,
        suppressScrollX: false,
        suppressScrollY: false,
        scrollXMarginOffset: 0,
        scrollYMarginOffset: 0
    };
    return (
        <ReactPerfectScrollBar {...props}
                               option={Object.assign(def_options, props.options)}
                               className={['react_perfect_scrollbar', props.className].join(' ')}
                               ref={(ref) => typeOf(props.scrollRef) === 'function' && props.scrollRef(ref)}>
            {props.children}
        </ReactPerfectScrollBar>
    )
};
ScrollBar.propTypes = {
    options: PropTypes.object,
    containerRef: PropTypes.func,
    scrollRef: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    className: PropTypes.string,
    onScrollY: PropTypes.func,
    onScrollX: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollDown: PropTypes.func,
    onScrollLeft: PropTypes.func,
    onScrollRight: PropTypes.func,
    onYReachStart: PropTypes.func,
    onYReachEnd: PropTypes.func,
    onXReachStart: PropTypes.func,
    onXReachEnd: PropTypes.func
};

export default ScrollBar;