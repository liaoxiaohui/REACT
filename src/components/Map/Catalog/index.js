import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tree} from 'antd';

import 'Components/Map/Catalog/catalog.less';

const TreeNode = Tree.TreeNode;
const DirectoryTree = Tree.DirectoryTree;
const treeData = [{
    title: '市国土规划局',
    key: '0-0',
    children: [{
        title: '基础地理',
        key: '0-0-0',
        children: [
            {title: '政务电子地图', key: '0-0-0-0'},
            {title: '静态三维地图', key: '0-0-0-1'},
            {title: '2016年2月卫星影像', key: '0-0-0-2'},
        ],
    }, {
        title: '规划管理',
        key: '0-0-1',
        children: [
            {title: '菜市场', key: '0-0-1-0'},
            {title: '宾馆酒店', key: '0-0-1-1'},
            {title: '自然村湾', key: '0-0-1-2'},
        ],
    }, {
        title: '国土资源',
        key: '0-0-2',
    }],
}, {
    title: '市发展和改革委员会',
    key: '0-1',
    children: [
        {title: '人口分布', key: '0-1-0-0'},
        {title: '产业划分', key: '0-1-0-1'},
        {title: '信贷规模', key: '0-1-0-2'},
    ],
}, {
    title: '市公安局',
    key: '0-2',
}];

export default class Catalog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
    };

    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({checkedKeys});
    };

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({selectedKeys});
    };

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };

    render() {
        // console.log(this.props.scrollRef, this.props.containerRef);
        return (
            <div className={'Catalog'}>
                <DirectoryTree
                    checkable
                    defaultExpandAll
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(treeData)}
                </DirectoryTree>
            </div>
        );
    }
}