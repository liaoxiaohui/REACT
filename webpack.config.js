const ArcGISPlugin = require("@arcgis/webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";
const path = require("path");

const ipconfig = require("os").networkInterfaces();
const openBrowser = require("react-dev-utils/openBrowser");
const webpack = require("webpack");
const getLocalIp = () => {
    const keys = Object.keys(ipconfig);
    const ipCollection = [];
    for (let i = 0; i < keys.length; i++) {
        ipconfig[keys[i]].forEach(item => {
            if (item.family === "IPv4" && !item.internal) {
                ipCollection.push(item.address);
                // return item;
            }
        });
    }
    return ipCollection[0] ? ipCollection[0] : "127.0.0.1";
};

const ip = getLocalIp();
module.exports = {
    // context: path.resolve('./src'),
    entry: {
        priority: ["babel-polyfill",'classlist-polyfill',
            'raf/polyfill', 'core-js/es6/map', 'core-js/es6/set',
            'es5-shim', 'es5-shim/es5-sham', 'console-polyfill',
            'es6-promise/auto', 'fetch-detector', 'fetch-ie8', 'whatwg-fetch'],
        index: path.resolve(__dirname, "src/index.js"),
        vendor: ['react', 'react-dom', 'antd']
    },
    output: {
        filename: "[name].[hash:8].js",
        publicPath: "./"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/ /**注意：本工程jsx文件里不能加载样式，否则会报错**/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: [
                    "cache-loader",
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                oneOf: [
                    {
                        test: /\.(png|gif|jpg|jpeg|bmp|svg)$/i,
                        use: [
                            "cache-loader",
                            {
                                loader: "url-loader",
                                options: {
                                    // Inline files smaller than 10 kB (10240 bytes)
                                    limit: 10 * 1024
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/i,
                        use: [
                            "cache-loader",
                            {
                                loader: "file-loader",
                                options: {
                                    name: "build/[name].[ext]"
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: ["style-loader", "css-loader"],
                        include: [
                            path.resolve(__dirname, "./src/assets/styles/Map")
                        ]
                    },
                    {
                        test: /\.css$/,
                        exclude: [path.resolve(__dirname, "./src/assets/styles/Map")],
                        use: [
                            "cache-loader",
                            "style-loader",
                            {
                                loader: require.resolve("css-loader"),
                                options: {
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: require.resolve("postcss-loader"),
                                options: {
                                    config: {
                                        path: "./postcss.config.js"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.less$/,
                        include: [path.resolve(__dirname, "./src/")],
                        use: [
                            "cache-loader",
                            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                            "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: "./postcss.config.js"
                                    }
                                }
                            },
                            "less-loader"
                        ],
                        exclude: /node_modules/
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styleCss: {
                    name: "styleCss",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                },
                styleLess: {
                    name: "styleLess",
                    test: /\.less/,
                    chunks: "all",
                    enforce: true
                }
            }
        },
        flagIncludedChunks: true
    },
    // mode: 'development',
    plugins: [
        new ArcGISPlugin({
            useDefaultAssetLoaders: false,
            features: {
                "3d": false
            }
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "./index.html",
            chunksSortMode: (chunk1, chunk2) => {//'none'
                let order = ['priority', 'vendor', 'index', 'styleCss', 'styleLess'];
                let order1 = order.indexOf(chunk1.names[0]);
                let order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            meta: {
                viewport:
                    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            }
        }),
        new CleanWebpackPlugin(
            ["dist/**", ".cache-loader"], // 匹配要删除的文件，这里则指定每次对dist文件夹进行清理
            {
                root: __dirname, // 指定插件根目录位置
                verbose: true, // 开启在控制台输出信息
                dry: false // 启用删除文件
            }
        ),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),

        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[hash:8].css",
            chunkFilename: devMode ? "[id].css" : "[id].[hash:8].css"
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, "/src"), "node_modules/"],
        extensions: [".js", ".jsx"],
        alias: {
            // 创建 import 或 require加载文件的别名，来确保模块引入变得更简单，如：import 'src/assets/styles/styles.less' ---> import 'Styles/styles.less'
            Shared: path.resolve("./src/components/Shared/"),
            Components: path.resolve("./src/components/"),
            Constants: path.resolve("./src/constants/"),
            Assets: path.resolve("./src/assets/"),
            Styles: path.resolve("./src/styles/"),
            Utils: path.resolve("./src/utils/"),
            Views: path.resolve("./src/views/"),
            Redux: path.resolve("./src/redux/"),
            Plugins: path.resolve("./src/plugins/"),
            Configure: path.resolve("./src/configure/"),
            Layout: path.resolve("./src/layout/"),
            Src:path.resolve("./src/")
        }
    },
    devtool: "cheap-module-eval-source-map", // 开发环境推荐'cheap-module-eval-source-map',生产环境推荐'eval'
    externals: [
        (context, request, callback) => {
            if (/pe-wasm$/.test(request)) {
                return callback(null, "amd " + request);
            }
            callback();
        }
    ],
    node: {
        process: false,
        global: false,
        os: true,
        fs: "empty"
    },
    devServer: {
        historyApiFallback: true, // 不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,
        disableHostCheck: true,
        publicPath: "/",
        compress: true,
        // clientLogLevel: "none",
        // overlay: false,
        // hot: true,
        // proxy: {
        //     // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上
        //     '/api': {
        //         target: 'http://172.26.40.105:3030',
        //         secure: false
        //     }
        // },
        host: "0.0.0.0",
        port: 8998, // 默认8080
        open: false,
        after: () => {
            try {
                openBrowser(`http://${ip}:8998`);
            } catch (e) {
                console.warn(`when open browsser ,we catch an error ${e}`);
            }
        }
    }
};
