let gulp = require('gulp'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    cache = require('gulp-cache'),
    pngquant = require('imagemin-pngquant'),
    del = require('del');

let reload = browserSync.reload;

let config = {
    'src': './src',
    'dest': './dist',
    'html': {
        'src': './src/*.html',
        'dest': './dist/'
    },
    'scss': {
        'dest': './dist/css',
        'src': './src/style/scss/**/*.scss'
    },
    'js': {
      'src': [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/tether/dist/js/tether.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './node_modules/masonry-layout/dist/masonry.pkgd.min.js',
        './src/js/**/*.js'
      ],
      'dest': './dist/js'
    },
    'img': {
        'dest': './dist/images/',
        'src': './src/images/**/*'
    },
    'font': {
        'dest': './dist/fonts',
        'src': './src/fonts/**/*'
    }
};

gulp.task('html', function() {
    return gulp.src(config.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.html.dest))
        .pipe(reload({stream:true}));;
});

gulp.task('compass', function() {
    gulp.src('./src/style/scss/*.scss')
        .pipe(compass({
            config_file: './src/style/config.rb',
            css: './src/style/css',
            sass: './src/style/scss'
        }))
        .pipe(autoprefixer({
            browsers: '> 5%',
            cascade: true
              }))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.scss.dest))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest))
        .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './dist'
        },
        notify: false
    });
});

gulp.task('watch',['browser-sync', 'html', 'compass', 'js'], function() {
    gulp.watch(config.scss.src, ['compass']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.js.src, ['js']);
});

gulp.task('img', function() {
    return gulp.src(config.img.src)
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.img.dest));
});

gulp.task('font', function () {
    return gulp.src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', ['img'], function () {
    return cache.clearAll();
});

gulp.task('build', ['clean', 'html', 'compass', 'js', 'clear', 'font'], function() {

});