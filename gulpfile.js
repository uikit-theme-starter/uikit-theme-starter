// gulp include

const gulp = require('gulp');

// gulp plugin include

const pug = require('gulp-pug');
const pump = require('pump');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const dircompare = require('dir-compare');

// browsersync include

const browserSync = require('browser-sync').create();
const reload = browserSync.reload

// html task

gulp.task('html', (pumpCb) => {
    pump([
        gulp.src('./src/theme/pages/*.pug'),
        pug({
            pretty: true
        }),
        gulp.dest('./dist')
    ], pumpCb, reload);
});

// styles task

gulp.task('styles', (pumpCb) => {

    pump([
        gulp.src(['./src/theme/uikit.scss', './src/theme/theme.scss']),
        sass(),
        autoprefixer(),
        cleancss(),
        concat('theme.css'),
        gulp.dest('./dist/css'),
        browserSync.stream()
    ], pumpCb);

    pump([
        gulp.src(['./node_modules/swiper/dist/css/swiper.min.css']),
        concat('plugins.css'),
        gulp.dest('./dist/css')
    ], pumpCb, reload);
});

// scripts task

gulp.task('scripts', (pumpCb) => {
    pump([
        gulp.src(
            [
                './node_modules/jquery/dist/jquery.min.js',
                './node_modules/jquery-validation/dist/jquery.validate.min.js',
                './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
                './node_modules/uikit/dist/js/uikit.min.js',
                './node_modules/uikit/dist/js/uikit-icons.min.js',
                './node_modules/swiper/dist/js/swiper.min.js',
                //'./node_modules/paper/dist/paper-full.min.js'
            ]
        ),
        concat('plugins.js'),
        gulp.dest('./dist/js')
    ], pumpCb);

    return pump([
        gulp.src('./src/theme/theme.js'),
        concat('theme.js'),
        uglify(),
        gulp.dest('./dist/js')
    ], pumpCb, reload);
});

// move tasks

gulp.task('moveFavicon', (pumpCb) => {
    return pump([
        gulp.src('./src/theme/favicon/*', {read: false}),
        gulp.dest('./dist/favicon')
    ], pumpCb)
});

gulp.task('moveFonts', (pumpCb) => {
    return pump([
        gulp.src('./src/theme/fonts/**/*', {read: false}),
        gulp.dest('./dist/fonts')
    ], pumpCb)
});

gulp.task('moveVideos', (pumpCb) => {
    return pump([
        gulp.src('./src/theme/videos/**/*', {read: false}),
        gulp.dest('./dist/videos')
    ], pumpCb)
});

gulp.task('moveIcons', (pumpCb) => {
    let srcPath = './src/theme/images/icons/set/';
    let destPath = './node_modules/uikit/src/images/icons/';

    let res = dircompare.compareSync(srcPath, destPath, {compareSize: true});

    if (res.left) {
        console.log('Yeni ikon eklendi. node_modules/uikit dizininde "npm install" ve "npm run compile" komutlarını çalıştırın');
        return pump([
            gulp.src(srcPath + '**', {read: false}),
            gulp.dest(destPath)
        ], pumpCb)
    }
});

gulp.task('moveImages', (pumpCb) => {
    return pump([
        gulp.src('./src/theme/images/**', {read: false}),
        gulp.dest('./dist/images')
    ], pumpCb);
});

// browsersync task

gulp.task('browser-sync', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('src/pug/**/*.pug', ['html']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/theme/favicon/*', ['moveFavicon']);
    gulp.watch('src/theme/fonts/**/*', ['moveFonts']);
    gulp.watch('src/theme/videos/**/*', ['moveVideos']);
    gulp.watch('src/theme/images/icons/set/**', ['moveIcons']);
    gulp.watch('src/theme/images/**', ['moveImages']);
});

gulp.task('default', [
    'html',
    'styles',
    'scripts',
    'moveFavicon',
    'moveFonts',
    'moveVideos',
    'moveIcons',
    'moveImages',
    'browser-sync'
]);