import React from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';

const ResizeableTh = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

ResizeableTh.propTypes = {
    className: PropTypes.string
};
export default ResizeableTh;