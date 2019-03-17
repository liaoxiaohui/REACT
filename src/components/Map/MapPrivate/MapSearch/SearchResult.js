import React from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'Shared/ScrollBar';
import SearchArticle from './SearchArticle'
import {Popover, Button, Pagination} from 'antd';
import DataFilter from 'Components/Map/MapPrivate/DataFilter';
import PureRenderMixin from "react-addons-pure-render-mixin";

class SearchResult extends React.Component {
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
    handleArticleClick = (data, e) => {
        console.log(data, e);
    };

    render() {
        let {data, total} = this.props;
        return (
            <div className={'search_result_list'}>
                <DataFilter title={'区域筛选'} totalData={data.length} Content={<Content {...this.props}/>}/>
                <ScrollBar className={'search_result_scroll'}>
                    <ul className={'search_result_inner'}>
                        {
                            data.length > 0 && data.map((item, i) => <SearchArticle key={i}
                                                                                    handleArticleClick={this.handleArticleClick}
                                                                                    data={item}
                                                                                    index={i + 1}/>)
                        }
                    </ul>
                </ScrollBar>
                <div className={'pagination_wrap'}>
                    <Pagination size="small"
                                total={50}
                                pageSize={10}
                        // current={1}
                                onChange={(current, pageSize) => console.log(current, pageSize)}
                                showQuickJumper/>
                </div>
            </div>
        );
    }
}

SearchResult.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array
};

const Content = (props) => {
    console.log(props);
    return (
        <div className={'popover_filter_content'}>

        </div>
    );
};

export default SearchResult;