import React, {Fragment} from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import {Tooltip} from 'antd';
import AvatarWithText from 'Shared/AvatarWithText';
import 'Components/Map/MapPrivate/navigation.less';

let TweenOneGroup = TweenOne.TweenOneGroup;
const sys_arr = [
    {
        name: '三维分析',
        icon: 'iconfont icon-icon-sanweifenxi',
        link: 'http://baidu.com'
    }, {
        name: '资源编目',
        icon: 'iconfont icon-mulu',
        link: 'http://baidu.com'
    }, {
        name: '系统管理',
        icon: 'iconfont icon-xitongpeizhi',
        link: 'http://baidu.com'
    }, {
        name: '共享统计',
        icon: 'iconfont icon-stat',
        link: 'http://baidu.com'
    }
];

export class SystemLinks extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'details-switch-demo',
    };

    constructor(props) {
        super(props);
        this.state = {
            showInt: 0,
            delay: 300,
            iconActive: '',
            isShow: false,
            sysLinkAni: [
                {translateX: [0, 300], opacity: [1, 0]},
                {translateX: [0, -300], opacity: [1, 0]}
            ]
        };
    }

    toggleSysLink = () => {
        const sysLinkAni_0 = [
            {translateX: [0, -300], opacity: [1, 0]},
            {translateX: [0, 300], opacity: [1, 0]}
        ];
        const sysLinkAni_1 = [
            {translateX: [0, 300], opacity: [1, 0]},
            {translateX: [0, -300], opacity: [1, 0]}
        ];
        this.setState((preProps) => {
            let {iconActive, isShow} = preProps;

            return {
                isShow: !isShow,
                sysLinkAni: isShow ? sysLinkAni_0 : sysLinkAni_1,
                iconActive: !!iconActive ? '' : 'active'
            }
        });
    };

    render() {
        const {iconActive} = this.state;
        return (
            <Fragment>
                {/*<TweenOneGroup className={'sys_link_list'}>*/}
                {/*{*/}
                {/*sys_arr.map((item, i) => {*/}
                {/*return <AvatarWithText text={item.name}*/}
                {/*iconDefine={item.icon}*/}
                {/*key={i}*/}
                {/*className={'avatar_sys'}/>;*/}
                {/*})*/}
                {/*}*/}
                {/*</TweenOneGroup>*/}

                <QueueAnim
                    animConfig={this.state.sysLinkAni}
                    duration={500}
                    delay={[this.state.delay, 0]}
                    ease={['easeOutCubic', 'easeInQuad']}
                    key="sys_link_ani"
                    className={'sys_link_list'}>
                    {
                        sys_arr.map((item, i) => {
                            return <Tooltip placement="bottom" title={item.name} key={i}>
                                <AvatarWithText iconDefine={item.icon}
                                                className={['avatar_sys', 'has_stroke', 'sys_item_' + i].join(' ')}/>
                            </Tooltip>;
                        })
                    }
                </QueueAnim>
                <Tooltip placement="bottom" title={'系统跳转'}>
                    <AvatarWithText iconClickHandler={this.toggleSysLink}
                                    iconDefine={'iconfont icon-tiaozhuan'}
                                    className={`avatar_sys has_stroke ${iconActive}`}/>
                </Tooltip>
            </Fragment>
        );
    }
}

SystemLinks.propTypes = {};

const Navigation = (props) => {
    return (
        <div className={'navigation'}>
            <SystemLinks/>
            <Tooltip placement="bottom" title={'admin'}>
                <AvatarWithText className={'avatar_user has_stroke'}/>
            </Tooltip>
        </div>
    );
};
Navigation.propTypes = {};

export default Navigation;