import React from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'Shared/ScrollBar';
import AvatarWithText from 'Shared/AvatarWithText';

const Classified =(props)=> {
    let {data} = props;
    return (
        <div className={'classified'}>
            <ScrollBar className={'classified_scroll'}>
                <ul className={'classified_inner g_clear_fix'}>
                    {
                        data.map((item, i) => {
                            const rows = Math.ceil(data.length / 4);
                            return (
                                <li className={['classified_item',
                                    (i + 1) % 4 === 0 ? 'no_border_right' : '',
                                    Math.ceil((i + 1) / 4) === rows ? 'no_border_bottom' : ''].join(' ')}
                                    key={item.id + '' + i}>
                                    <AvatarWithText text={item.title}
                                                    iconDefine={item.icon}
                                                    iconClickHandler={(e) => console.log(e)}
                                                    className={item.className + ' classify_avatar_' + i}
                                                    style={{background: item.bgColor}}/>
                                </li>
                            );
                        })
                    }
                </ul>
            </ScrollBar>
        </div>
    );
};

Classified.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array
};
export default Classified;