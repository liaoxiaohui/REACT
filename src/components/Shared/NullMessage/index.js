import React from 'react';
import PropTypes from 'prop-types';
import 'Shared/NullMessage/nullMessage.less';

const NullMessage = (props) => {
    let {message, className} = props;
    return (
        <div className={['NullMessage', className].join(' ')}>
            <div className={'null_message_inner'}>
                <div className={'illustration'}/>
                <div className={'message_tips'}>{message}</div>
            </div>
        </div>
    );
};

NullMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string
};
export default NullMessage;