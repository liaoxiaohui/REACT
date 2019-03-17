import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import Classified from 'Components/Map/MapPrivate/MapSearch/Classified'
import SearchResult from 'Components/Map/MapPrivate/MapSearch/SearchResult'

import 'Components/Map/MapPrivate/MapSearch/mapSearch.less';

const _searchResult = [
    {
        id: 0,
        title: '佛山科学技术学院',
        describe: '广东省佛山市禅城区江湾一路18号',
        is_street_scene: false
    }, {
        id: 1,
        title: '佛山华英学校',
        describe: '广东省佛山市禅城区景湖路29号',
        is_street_scene: true
    }, {
        id: 2,
        title: '佛山科学技术学院',
        describe: '广东省佛山市禅城区江湾一路18号',
        is_street_scene: true
    }, {
        id: 3,
        title: '桂城中学',
        describe: '石龙南路10号',
        is_street_scene: false
    }, {
        id: 4,
        title: '九江中学',
        describe: '广东省佛山市南海区九江镇船栏街100号',
        is_street_scene: true
    }, {
        id: 5,
        title: '佛山市外国语学校',
        describe: '广东省佛山市禅城区湖涌大道1号',
        is_street_scene: false
    }, {
        id: 6,
        title: '佛山市第二中学',
        describe: '广东省佛山市禅城区华远西路12号',
        is_street_scene: true
    }, {
        id: 7,
        title: '广东顺德德胜学校',
        describe: '兴业路与民安路交叉路口西北150米',
        is_street_scene: true
    }, {
        id: 8,
        title: '佛山市惠景中学',
        describe: '广东省佛山市禅城区华远西路66号',
        is_street_scene: false
    }
];

class MapSearch extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            classified: [
                {
                    id: 0,
                    title: '餐饮',
                    bgColor: '#FAA33F',
                    icon: 'iconfont icon-canyin',
                    className: 'classify_avatar first'
                }, {
                    id: 1,
                    title: '酒店',
                    bgColor: '#29B6D2',
                    icon: 'iconfont icon-jiudian',
                    className: 'classify_avatar'
                }, {
                    id: 2,
                    title: '医院',
                    bgColor: '#E5454C',
                    icon: 'iconfont icon-yiyuan',
                    className: 'classify_avatar'
                }, {
                    id: 3,
                    title: '学校',
                    bgColor: '#2F89FC',
                    icon: 'iconfont icon-xuexiao',
                    className: 'classify_avatar'
                }, {
                    id: 4,
                    title: '政府',
                    bgColor: '#2152F5',
                    icon: 'iconfont icon-zhengfu',
                    className: 'classify_avatar'
                }, {
                    id: 5,
                    title: '其他',
                    bgColor: '#6C8492',
                    icon: 'iconfont icon-qita',
                    className: 'classify_avatar last'
                },
            ],
            searchResult: [],
            totalResult: 0
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const {search_keyword} = this.props;
        search_keyword ? this.setState({searchResult: _searchResult}) : this.setState({searchResult: []});
        console.log(nextProps, nextState, nextContext);
    }

    render() {
        const {searchResult, classified, totalResult} = this.state;
        return (
            <div className={'MapSearch search_container'}>
                {
                    searchResult.length > 0
                        ? <SearchResult data={searchResult} total={totalResult} {...this.props}/>
                        : <Classified data={classified}/>
                }
            </div>
        );
    }
}

MapSearch.propTypes = {
    className: PropTypes.string,
    search_keyword: PropTypes.string
};
export default MapSearch;