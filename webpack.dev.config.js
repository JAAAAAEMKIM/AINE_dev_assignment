var webpack = require('webpack');
var path = require('path');

module.exports = {

    /* webpack-dev-server를 콘솔이 아닌 자바스크립트로 실행 할 땐, 
    HotReloadingModule 를 사용하기 위해선 dev-server 클라이언트와 
    핫 모듈을 따로 entry 에 넣어주어야 합니다. */
    mode: 'development',
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:4000', // 개발서버의 포트가 이 부분에 입력되어야 제대로 작동합니다
        'webpack/hot/only-dev-server',
        './src/style.css'
    ],

    resolve: {
        // root: path.resolve('./src'), // 없어진 문법
        alias:{
            // Comp: path.resolve(__dirname, '/src/components/')
        }, // 경로를 쉽게 import하려면 alias에 등록해주면 된다.
        modules: [
          path.join(__dirname, "src"),
          "node_modules"
        ]
    },

    output: {
        path: '/', // public 이 아니고 /, 이렇게 하면 파일을 메모리에 저장하고 사용합니다
        filename: 'bundle.js'
    },
    // 개발서버 설정입니다
    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        /* 모든 요청을 프록시로 돌려서 express의 응답을 받아오며,
        bundle 파일의 경우엔 우선권을 가져서 devserver 의 스크립트를 사용하게 됩니다 */
        proxy: {
            "**": "http://localhost:3000" // express 서버주소
        },
        stats: {
          // 콘솔 로그를 최소화 합니다
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },
    },


    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: require.resolve('babel-loader'),
                    options:{
                        presets: ['@babel/preset-react'],
                        cacheDirectory:true,
                        plugins: ['react-hot-loader/babel']
                    },    
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }


};