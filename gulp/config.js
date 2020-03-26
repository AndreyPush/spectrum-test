var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'build';

var config = {
    env       : 'development',
    production: production,

    src: {
        root         : 'src',
        templates    : 'src/*.html',
        sass         : 'src/sass',
        // path for sass files that will be generated automatically via some of tasks
        sassGen      : 'src/sass/generated',
        js           : 'src/js',
        img          : 'src/assets/img',
        svg          : 'src/assets/img/svg',
        icons        : 'src/assets/icons',
        // path to png sources for sprite:png task
        iconsPng     : 'src/assets/icons',
        // path to svg sources for sprite:svg task
        iconsSvg     : 'src/assets/icons',
        // path to svg sources for iconfont task
        iconsFont    : 'src/assets/icons',
        fonts        : 'src/assets/fonts',
        lib          : 'src/lib',
        data         : 'src/assets/data'
    },
    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/css',
        js   : destPath + '/js',
        img  : destPath + '/img',
        fonts: destPath + '/fonts',
        lib  : destPath + '/lib',
        data : destPath + '/data'
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
