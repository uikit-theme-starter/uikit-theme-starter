// gulp include

const gulp = require('gulp');

// browsersync include

const browserSync = require('browser-sync').create();
const reload = browserSync.reload

// gulp plugins include

const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');

// pug task

gulp.task('html', () => {
    return gulp.src('./src/pug/pages/**/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', reload)
})

// scss task

gulp.task('css', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream())
})

// images task

gulp.task('images', () => {
    return gulp.src('./src/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 9,
            progressive: false,
            interlaced: false
        })))
        .pipe(gulp.dest('./dist/images'))
        .on('end', reload)
});

// move task

gulp.task('move', () => {
    return gulp.src('./src/favicon/*')
        .pipe(gulp.dest('./dist/favicon'))
})

// concat task

gulp.task('concat', () => {
    gulp.src(
            [
                './node_modules/jquery/dist/jquery.js',
                './node_modules/uikit/dist/js/uikit.js',
                './node_modules/uikit/dist/js/uikit-icons.js',
                './node_modules/swiper/dist/js/swiper.js',
                './src/js/**.js'
            ]
        )
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
    gulp.src(
            [
                './src/css/uikit.css',
                './node_modules/swiper/dist/css/swiper.css',
                './src/css/main.css',
            ]
        )
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css'))
});

// minify css task

gulp.task('minify-css', () => {
    return gulp.src('./dist/css/*.css')
        .pipe(clean({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/css/minify'));
});

// minify js task

gulp.task('minify-js', function (cb) {
    pump([
            gulp.src('./dist/js/*.js'),
            uglify(),
            gulp.dest('./dist/js/minify')
        ],
        cb
    );
});

// browsersync task

gulp.task('browser-sync', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch('./src/pug/**/*.pug', ['html'])
    gulp.watch('./src/scss/**/*.scss', ['css'])
    gulp.watch('./src/scss/*.scss', ['css'])
    gulp.watch('./src/images/**/*', ['images']);
    gulp.watch('./src/fonts/**/*', ['move']);
    gulp.watch('./src/favicon/*', ['move']);
    gulp.watch('./src/css/*', ['concat', 'minify-css']);
    gulp.watch('./src/js/*', ['concat', 'minify-js']);
})

// gulp default task

gulp.task('default', ['browser-sync', 'html', 'css', 'images', 'move', 'concat', 'minify-css', 'minify-js'])