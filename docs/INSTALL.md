###项目搭建准备：

###项目搭建：
    一、npm初始化
        cnpm init
        ->填写项目的基本信息，或者全部enter，选择默认
    二、安装webpack
        cnpm i/install webpack webpack-dev-server --save-dev
        ->"/"，表示两者取其一，如i/install（前者是后者的简写命令符），以下同
        ->注意webpack是开发依赖，加-dev，以下同
    三、安装react
        cnpm i/install react react-dom --save
        ->注意react是运行依赖，不需-dev，以下同
    四、安装文件和路径加载器
        cnpm i/install file-loader --save-dev
        cnpm i/install url-loader --save-dev
        ->注意要分开安装，先安装file-loader后安装url-loader
    五、安装样式加载器
        cnpm i/install style-loader --save-dev
    六、安装less或sass语言等样式语言和样式相关加载器
        cnpm i/install less --save-dev
        cnpm i/install less-loader --save-dev
        cnpm i/install css-loader --save-dev
        ->注意要分开安装，先安装less后安装less-loader
    七、安装json加载器
        cnpm i/install json-loader --save-dev
    八、安装express框架
        cnpm i/install -g express-generator
        cnpm i/install path express --save-dev
    九、安装ES6语法支持[babel]加载器
        cnpm i/install babel-loader babel-core babel-preset-env webpack --save-dev
    十、安装ES6语法检查相关依赖
        cnpm i/install eslint eslint-loader --save-dev
    十一、安装开发所需的相关plugin依赖
        cnpm i/install react-transform-hmr --save-dev
        cnpm i/install postcss-loader --save-dev
        cnpm i/install open-browser-webpack-plugin --save-dev
        cnpm i/install html-webpack-plugin --save-dev
        cnpm i/install extract-text-webpack-plugin --save-dev
        cnpm i/install autoprefixer --save-dev
        
