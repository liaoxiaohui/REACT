import React, {Fragment} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import TablePie from 'Shared/TablePie';
import {cutStr} from "Utils/tool-utils";
import {formatDate} from "Utils/date-utils";
import './mapLayerDownload.less';

class MapLayerDownload extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                key: i,
                name: `测试数据集测试，数据集测试数据，集测试数据集测试数据，集测试数据集测试数据集 ${i}`,
                dateTime: new Date(),
                action: `操作`
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
                            {cutStr(record.name, 16)}
                        </span>
                    )
                }
            }, {
                title: '时间',
                dataIndex: 'dateTime',
                className: 'columns_2',
                width: 110,
                render: (text, record) => {
                    return (
                        <span title={record.dateTime}>
                            {formatDate(record.dateTime)}
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
                                icon={'download'}
                                title={'下载'}
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

    componentDidMount() {
        // const ps = new PerfectScrollbar('.ant-table-body');
    }

    render() {
        let {columns, data} = this.state;
        return (
            <div className={'MapLayerDownload map_layer_wrap'}>
                <TablePie size="small"
                          id={'table_mark_download'}
                          className={'table_mark_download'}
                          columns={columns}
                          noBodyBorder={true}
                          loading={false}
                          ref={(ref) => console.log(ref)}
                          dataSource={data}
                          scroll={{y: 645}}/>
            </div>
        );
    }
}

MapLayerDownload.propTypes = {
    className: PropTypes.string
};
export default MapLayerDownload;