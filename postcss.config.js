// module.exports = {
//   plugins: [
//     require('autoprefixer')({browsers:'last 5 version'})指定浏览器支持
//   ]
// }
// module.exports = {
//   plugins: {
//     'autoprefixer': {browsers: 'last 5 version'}
//   }
// }
module.exports = {
    plugins: [
        require('postcss-flexbugs-fixes'),
        require('autoprefixer') // 浏览器支持在webpack.json文件的"browsersList"的值中指定，也可以在.browserslistrc文件中指定
    ]
};
