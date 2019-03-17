import React, {Fragment} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';

class Tools extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            map_tools: [
                {
                    id: 0,
                    title: '测距',
                    icon: 'iconfont icon-cemian',
                    handleClick: this.handleClickChange
                },
                {
                    id: 1,
                    title: '测面',
                    icon: 'iconfont icon-ceju',
                    handleClick: this.handleClickChange
                },
                {
                    id: 2,
                    title: '设为书签',
                    icon: 'iconfont icon-xingxing',
                    handleClick: this.handleClickChange
                },
                {
                    id: 3,
                    title: '空间统计',
                    icon: 'iconfont icon-tongji2',
                    handleClick: this.handleClickChange
                },
                {
                    id: 4,
                    title: '空间查询',
                    icon: 'iconfont icon-chaxun1',
                    handleClick: this.handleClickChange
                },
                {
                    id: 5,
                    title: '地址管理',
                    icon: 'iconfont icon-dizhiguanli',
                    handleClick: this.handleClickChange
                },
                {
                    id: 6,
                    title: '地址反查',
                    icon: 'iconfont icon-chaxun',
                    handleClick: this.handleClickChange
                },
                {
                    id: 7,
                    title: '图幅查询',
                    icon: 'iconfont icon-tuzhiwenjianx',
                    handleClick: this.handleClickChange
                },
                {
                    id: 8,
                    title: '标绘管理',
                    icon: 'iconfont icon-biaozhu',
                    handleClick: this.handleClickChange
                },
                {
                    id: 9,
                    title: '坐标切换',
                    icon: 'iconfont icon-qiehuan',
                    handleClick: this.handleClickChange
                },
                {
                    id: 10,
                    title: '地图打印',
                    icon: 'iconfont icon-print',
                    handleClick: this.handleClickChange
                },
                {
                    id: 11,
                    title: '关闭地图',
                    icon: 'iconfont icon-guanbi',
                    handleClick: this.handleClickChange
                }
            ]
        }
    }

    handleClickChange = (data) => {
        console.log(data);
    };

    render() {
        let {map_tools} = this.state;
        return (
            <div className={'tools_map'}>
                {
                    map_tools.map((item, index) => {
                        return (
                            <Fragment key={index + '' + item.id}>
                                <div className={'tools_cell_sub'} onClick={()=>item.handleClick(item)}>
                                    <i className={['tools_cell_sub_icon', 'sub_icon_' + index, item.icon].join(' ')}/>
                                    <span className={'tools_cell_sub_txt'}>
                                        {item.title}
                                    </span>
                                </div>
                                {
                                    (index === 2 || index === 8) && <hr className={'divide_line_h'}/>
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
        );
    }
}

Tools.propTypes = {
    className: PropTypes.string
};
export default Tools;