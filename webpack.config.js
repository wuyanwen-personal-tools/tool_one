const path = require('path');
// html
const htmlWebpackPlugin = require('html-webpack-plugin');
// css分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    // 模式
    //mode: 'production',
    // 入口文件
    entry: {
        'app': './src/index.js'
    },
    // 出口文件
    output: {
        // 打包文件地址
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: '[name].[chunkhash].js'
    },
    // 配置loader
    module: {
        rules: [
            // 配置 css-loader 
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // loader: ['style-loader', 'css-loader'],
                // use: MiniCssExtractPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // }),
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "postcss-loader"
                ],
                // 忽略node_modules文件
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // loader: ['style-loader', 'css-loader', 'sass-loader'],
                // use: MiniCssExtractPlugin.extract({
                //     fallback: "style-loader",
                //     use: ["css-loader", "sass-loader"]
                // }),
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    'sass-loader',
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/, // 加载图片
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,  // 小于8k的图片自动转成base64格式
                        name: 'images/[name].[ext]?[hash]', // 图片打包后存放的目录
                        //publicPath: './images/', // css图片引用地址，可修正打包后，css图片引用出错的问题
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: true
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                'file-loader'
                ]
            },
            // 转义es6
            {
                test:/\.js$/,
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/,
                loader: 'babel-loader'  // 从右到左执行，所以注意顺序  
                //es3ify-loader兼容IE8的打包，打包会生成default关键字,IE8会报错
            },
            // {
            //     test: /\.js$/,
            //     include: /src/,          // 只转化src目录下的js
            //     use: [
            //         'babel-loader'
            //     ]
            //     //exclude: /node_modules/, // 忽略掉node_modules下的js
            // },
        ]
    },
    // server 服务
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // 服务器资源的根目录，不写的话，默认为bundle.js
        compress: true, // 服务器资源采用gzip压缩
        port: 80,  // 运行的端口
        overlay: true,  // 出错代码是否显示在html页面上
        hot: true //热加载
    },
    //devtool: 'inline-source-map', 
    // 插件
    plugins: [
        // 
        new htmlWebpackPlugin({
            // 标题
            title: '学习 webpack',
            // 模板
            template: 'src/index.html',
            // 压缩 去掉所有空格
            minify: {
                collapseWhitespace: true //false | true
            },
            // 添加hash,向html引入的src链接后面增加一段hash值,消除缓存
            hash: true
        }),
        // css分离
        new MiniCssExtractPlugin('style.css'),
        // 删除文件 保留新文件
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: {
            //components: path.resolve(__dirname, 'src/components/') // 别名
        },
        extensions: ['.js', '.json'], // 忽略文件后缀
        modules: ['node_modules']
    },
    optimization: {
        // runtimeChunk: { //打包runtime代码
        //   name: 'manifest'
        // },
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: true, // Note `mangle.properties` is `false` by default.
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: true,
              keep_fnames: false,
            },
          }),
        ],
        // splitChunks:{  //打包node_modules里的代码
        //   chunks: 'async',
        //   minSize: 30000,
        //   minChunks: 1,
        //   maxAsyncRequests: 5,
        //   maxInitialRequests: 3,
        //   name: false,
        //   cacheGroups: {
        //     vendor: {
        //       name: 'vendor',
        //       chunks: 'initial',
        //       priority: -10,
        //       reuseExistingChunk: false,
        //       test: /node_modules\/(.*)\.js/
        //     },
        //     styles: {
        //       name: 'styles',
        //       test: /\.(scss|css)$/,
        //       chunks: 'all',
        //       minChunks: 1,
        //       reuseExistingChunk: true,
        //       enforce: true
        //     }
        //   }
        // }
      }

}