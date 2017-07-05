var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval-source-map',//错误提示，或者"cheap-eval-source-map"
  entry:{
    main2:'./src/main2.js',
    main:'./src/main.js',
    vueentry:'./src/vueentry.js'
  },
  output: {
    path: __dirname + '/dist/',//打包后的文件位置
    //publicPath:'./', //公共资源路径
    filename: '[name].js'//打包后的文件名
  },
  //-------------------监听文件改动，当监听到文件有改动时自动重新构建-------------------------
  watch:true,
  watchOptions: {
    aggregateTimeout: 300,//每次检查到文件变动延迟300秒构建，这段时间内进行的任何其他更改都聚合到一次重新构建里
    poll: 1000,//一秒检查一次变动
    ignored: /node_modules/  //不监听node_modules文件夹
  },
  //----------------------自动刷新-----------------------------
  devServer: {
    contentBase: __dirname + "/dist",//本地服务器所加载的页面所在的目录
    //port:"8181",//服务器使用的端口，通过locelhost:8181访问，默认情况下为8080
    public:"192.168.0.104:8181",//局域网访问时需加本机局域网ip地址，并且在npm启动webpack-dev-server时添加"--host 局域网ip地址，此时通过ip:8181访问"
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  //--------------------------加载器---------------------------
  //module: {
  //  loaders: [
  //    {
  //      test: /\.json$/,
  //      loader: "json-loader"
  //    },
  //    {
  //      test: /\.css$/,
  //      loader: ExtractTextPlugin.extract('style-loader!css-loader?modules')
  //    }
  //    {
  //      test: /\.js$/,
  //      exclude: /node_modules/,
  //      loader: 'babel',//在webpack的module部分的loaders里进行配置即可
  //      query: {
  //        presets: ['es2015', 'react']
  //      }
  //    }
  //  ]
  //},
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?modules"
        })
      },
      {
        test:/\.json$/,
        use:[
          {loader:'json-loader'}
        ]
      },
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use:[
          {loader: 'babel-loader'}
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use:[
          {loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'} //  <= 8kb的图片base64内联
        ]
      }
    ]
  },
  resolve: {
    //vue别名
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  //postcss: [
  //  require('autoprefixer')//调用autoprefixer插件,能为CSS代码自动添加适应不同浏览器的CSS前缀
  //],
  //----------------------------------------插件------------------
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.tmpl.html",//new 一个这个插件的实例，并传入相关的参数
      title:"这是文件标题",//生成的html文件的标题，如果在模板文件指定了 title，会忽略该属性
      filename:'pp.html',//生成的文件名，默认为index.html
      inject:'body',  //选择js注入模板的位置，值为“body”时注入body内（body为默认值，相当于true），值为"head"时注入head内，值为false时不注入js
      //favicon: 'xxxxx.ico',//给生成的 html 文件生成一个 favicon,如果在模板文件指定了 favicon，会忽略该属性
      minify: {//minify对生成的文件进行压缩,这个压缩选项同 html-minify 的压缩选项完全一样
        removeAttributeQuotes: true // 移除属性的引号
      },
      hash:true,//该值为true时，生成的文件中插入的js后面会跟一个hash值，该hash值和webpack 编译对应的 hash 值是一样的
      cache:true, //默认值为true，表示只有在内容变化时才生成一个新的文件
      showErrors:true,  //默认值为 true ,表示如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内
      chunks:['main'],//当有多入口文件时，该选项可以决定注入哪些js文件
      //excludeChunks:['main3'], //当有多入口文件时，该选项可以决定排除哪些js文件
      chunksSortMode:'auto', //这个选项决定了 script 标签的引用顺序。有四个选项，'none', 'auto', 'dependency', '{function}',默认值为“auto”
      xhtml:false  //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.tmpl.html",//new 一个这个插件的实例，并传入相关的参数
      title:"这是文件标题",//生成的html文件的标题，如果在模板文件指定了 title，会忽略该属性
      filename:'pop.html',//生成的文件名，默认为index.html
      chunks:['main2'],
      xhtml:false  //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.tmpl.html",//new 一个这个插件的实例，并传入相关的参数
      title:"这是文件标题",//生成的html文件的标题，如果在模板文件指定了 title，会忽略该属性
      filename:'myvue.html',//生成的文件名，默认为index.html
      chunks:['vueentry'],
      xhtml:false  //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
    }),

    new ExtractTextPlugin("css/style.css")//分离CSS文件的插件
  ]
}