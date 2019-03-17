import React, {Fragment} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import TablePie from 'Shared/TablePie';
import {cutStr} from "Utils/tool-utils";
import './mapLayer.less';

const ButtonGroup = Button.Group;

class MapLayer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                key: i,
                name: `测试数据集测试，数据集测试数据，集测试数据集测试数据，集测试数据集测试数据集 ${i}`,
                action: `操作`,
            });
        }
        this.state = {
            selectedRowKeys: [],
            columns: [{
                title: '名称',
                dataIndex: 'name',
                className: 'columns_0',
                render: (text, record) => {
                    return (
                        <span title={record.name}>
                            {cutStr(record.name, 28)}
                        </span>
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'action',
                className: 'columns_1',
                width: 80,
                align: 'center',
                render: (text, record) => (
                    <Fragment>
                        <Button type="primary"
                                size={'small'}
                                icon={'edit'}
                                title={'编辑'}
                                onClick={() => console.log(record.id,record)}
                                className={'btn_no_border'} ghost/>
                        <Button type="primary"
                                size={'small'}
                                icon={'delete'}
                                title={'删除'}
                                onClick={() => console.log(record.id,record)}
                                className={'btn_no_border'} ghost/>
                    </Fragment>
                )
            }],
            data: data
        }
    }

    componentDidMount() {
        // const ps = new PerfectScrollbar('.ant-table-body');
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    render() {
        let {columns, data, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className={'MapLayer map_layer_wrap'}>
                <div className={'mark_btn_group'}>
                    <ButtonGroup className={'btn_factor_group'}>
                        <Button type="primary" icon={'plus'} ghost>添加</Button>
                        <Button type="primary" icon={'download'} ghost>下载</Button>
                        <Button type="primary" icon={'delete'} ghost>删除</Button>
                    </ButtonGroup>
                </div>
                <TablePie size="small"
                          id={'table_mark'}
                          className={'table_mark'}
                          columns={columns}
                          noBodyBorder={true}
                          loading={false}
                          ref={(ref) => console.log(ref)}
                          dataSource={data}
                          rowSelection={rowSelection}
                          scroll={{y: 200}}/>
            </div>
        );
    }
}

MapLayer.propTypes = {
    className: PropTypes.string
};
export default MapLayer;