import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import {Table} from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import ResizeableTh from 'Shared/TablePie/ResizeableTh';
import 'Shared/TablePie/tablePie.less';
import {typeOf} from "Utils/tool-utils";

class TablePie extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            columns: props.columns
        }
    }

    componentDidMount() {
        this.TableBodyScroll = new PerfectScrollbar(`#${this.props.id} .ant-table-body`, {
            suppressScrollX: true
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            columns: nextProps.columns
        });
    }

    handleResize = index => (e, {size}) => {
        this.setState(({columns}) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return {columns: nextColumns};
        });
    };
    components = {
        header: {
            cell: ResizeableTh
        }
    };

    defOptions = {
        size: 'small',
        className: 'TablePie',
        pagination: Object.assign({pageSize: Infinity}, this.props.pagination)
    };

    render() {
        let {
            className,
            colResizeable,
            showPagination,
            components,
            rowSelection,
            bordered,
            noBorder,
            noBodyBorder
        } = this.props;
        let {columns} = this.state;

        className = className ? className + ' ' + this.defOptions.className : this.defOptions.className;
        if (showPagination) {
            className += ' ' + 'showPagination';
        }

        if (noBorder) {
            className += ' ' + 'noBorder';
            bordered = false;
        }

        if (noBodyBorder) {
            className += ' ' + 'noBodyBorder';
            bordered = false;
        }

        if (colResizeable) {
            components = Object.assign(this.components, components);
            bordered = true;
            className += ' ' + 'colResizeable';
            columns = columns.map((col, index) => ({
                ...col,
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index),
                }),
            }));
        } else {
            className += ' ' + 'colResizeDisable';
        }
        const OPTIONS = Object.assign(this.defOptions, this.props, {
            components,
            columns,
            rowSelection,
            className,
            bordered
        });
        return (
            <Table {...OPTIONS}/>
        );
    }
}


TablePie.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    colResizeable: PropTypes.bool,
    noBorder: PropTypes.bool,
    noBodyBorder: PropTypes.bool,
    showPagination: PropTypes.bool,
    bordered: PropTypes.bool,
    childrenColumnName: PropTypes.array,
    columns: PropTypes.array,
    components: PropTypes.object,
    dataSource: PropTypes.array,
    defaultExpandAllRows: PropTypes.bool,
    defaultExpandedRowKeys: PropTypes.array,
    expandedRowKeys: PropTypes.array,
    expandedRowRender: PropTypes.func,
    expandRowByClick: PropTypes.bool,
    footer: PropTypes.func,
    indentSize: PropTypes.number,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    locale: PropTypes.object,
    pagination: PropTypes.object,
    rowClassName: PropTypes.func,
    rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    rowSelection: PropTypes.object,
    scroll: PropTypes.object,
    showHeader: PropTypes.bool,
    size: PropTypes.string,
    onChange: PropTypes.func,
    onExpand: PropTypes.func,
    onExpandedRowsChange: PropTypes.func,
    onHeaderRow: PropTypes.func,
    onRow: PropTypes.func
};
export default TablePie;