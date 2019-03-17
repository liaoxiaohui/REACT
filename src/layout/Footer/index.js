import "Layout/Footer/Footer.less";
import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
//全局底部信息模块组件

class Footer extends React.Component {
   constructor(props, context) {
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
         this
      );
   }
   render() {
      return (
         <footer className="footer" id={"footer"}>
            copyright © 江苏省测绘研究所&nbsp;|&nbsp;广州城市信息研究所有限公司
         </footer>
      );
   }
}
export default Footer;
