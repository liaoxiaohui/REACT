import React, {Fragment} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import {Button, Input} from 'antd';

const ButtonGroup = Button.Group;
const Search = Input.Search;

import TablePie from 'Shared/TablePie'
import './mapLayerFactor.less';
import {cutStr} from "Utils/tool-utils";

class MapLayerFactor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        const data = [];
        for (let i = 0; i < 100; i++) {
            const random = Math.floor(Math.random() * 10);
            data.push({
                id: i,
                key: i,
                name: `测试数据集测试，数据集测试数据，集测试数据集测试数据，集测试数据集测试数据集 ${i}`,
                type: random === 1 ? '点' : random === 5 ? '线' : '面',
                action: `操作`,
            });
        }
        this.state = {
            selectedRowKeys: [],
            columns: [{
                title: '名称',
                dataIndex: 'name',
                render: (text, record) => {
                    return (
                        <span title={record.name}>
                            {cutStr(record.name, 20)}
                        </span>
                    )
                }
            }, {
                title: '类型',
                dataIndex: 'type',
                width: 50,
            }, {
                title: '操作',
                dataIndex: 'action',
                width: 80,
                align: 'center',
                render: (text, record) => (
                    <Fragment>
                        <Button type="primary"
                                size={'small'}
                                icon={'edit'}
                                title={'编辑'}
                                onClick={() => console.log(record.id, record)}
                                className={'btn_no_border'} ghost/>
                        <Button type="primary"
                                size={'small'}
                                icon={'delete'}
                                title={'删除'}
                                onClick={() => console.log(record.id, record)}
                                className={'btn_no_border'} ghost/>
                    </Fragment>
                )
            }],
            data: data
        }
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    render() {
        const {columns, data, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className={'MarkMapLayerFactor map_layer_factor'}>
                <div className={'mark_tools_group g_clear_fix'}>
                    <ButtonGroup className={'btn_factor_group'}>
                        <Button type="primary" ghost><i className={'iconfont icon-huadian'}/>点</Button>
                        <Button type="primary" ghost><i className={'iconfont icon-huaxian'}/>线</Button>
                        <Button type="primary" ghost><i className={'iconfont icon-huamian'}/>面</Button>
                    </ButtonGroup>
                    <div className={'search_factor_wrap'}>
                        <Search className={'search_factor'} placeholder={'搜索...'}/>
                    </div>
                </div>
                <TablePie size="small"
                          id={'table_mark_factor'}
                          className={'table_mark_factor'}
                          columns={columns}
                          bordered={false}
                          noBodyBorder={true}
                          loading={false}
                          dataSource={data}
                          rowSelection={rowSelection}
                          scroll={{y: 310}}/>
            </div>
        );
    }
}

MapLayerFactor.propTypes = {
    className: PropTypes.string
};
export default MapLayerFactor;