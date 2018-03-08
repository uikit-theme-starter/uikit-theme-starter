// gulp include

const gulp = require('gulp');

// gulp plugin include

const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

// browsersync include

const browserSync = require('browser-sync').create();
const reload = browserSync.reload

// html task

gulp.task('html', () => {
    gulp.src('./src/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', reload)
});

// styles task

gulp.task('styles', () => {
    gulp.src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest('./src/css'))
    gulp.src(['./src/css/uikit.css', './src/css/main.css'])
        .pipe(concat('theme.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
        .on('end', reload)
    gulp.src(
            [
                './node_modules/swiper/dist/css/swiper.min.css',
            ]
        )
        .pipe(concat('plugins.css'))
        .pipe(gulp.dest('./dist/css'))
});

// scripts task

gulp.task('scripts', () => {
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
        )
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('./dist/js'))
    gulp.src('./src/js/**.js')
        .pipe(concat('theme.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .on('end', reload)
});

// images task

gulp.task('images', () => {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 7}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./dist/images'))
});

// move task

gulp.task('move', () => {
    gulp.src('./src/favicon/*')
        .pipe(gulp.dest('./dist/favicon'))
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
    gulp.src('./src/videos/**/*')
        .pipe(gulp.dest('./dist/videos'))
})

// browsersync task

gulp.task('browser-sync', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch('src/pug/**/*.pug', ['html']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('default', ['html', 'styles', 'scripts', 'move', 'images', 'browser-sync']);