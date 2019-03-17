import React from 'react';
import PropTypes from 'prop-types';

const SearchArticle = (props) => {
    let {data, index, handleArticleClick} = props;
    return (
        <li className={'search_result_item'} onClick={(e) => handleArticleClick(props, e)}>
            <div className={'item_tp'}>
                <span className={'serial_number'}>
                    <i className={'number'}>{index}</i>
                </span>
                <span className={'item_title'}>{data.title}</span>
                <i className={'street_scene'}/>
            </div>
            <div className={'item_bt'}>{data.describe}</div>
        </li>
    );
};

SearchArticle.propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    data: PropTypes.object
};
export default SearchArticle;