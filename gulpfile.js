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
    return gulp.src('./src/pug/pages/*.pug')
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
    gulp.src('./src/favicon/*')
        .pipe(gulp.dest('./dist/favicon'))
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
    gulp.src('./src/videos/**/*')
        .pipe(gulp.dest('./dist/videos'))
})

// concat task

gulp.task('concat', () => {
    gulp.src(
        [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/jquery-validation/dist/jquery.validate.min.js',
            './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
            './node_modules/uikit/dist/js/uikit.min.js',
            './node_modules/uikit/dist/js/uikit-icons.min.js',
            //'./node_modules/swiper/dist/js/swiper.min.js',
            //'./node_modules/paper/dist/paper-full.min.js',
        ]
    )
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./dist/js'))
    .on('end', reload)

    gulp.src(
        [
            './src/js/**.js'
        ]
    )
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('./dist/js'))
    .on('end', reload)

    gulp.src(
        [
            //'./node_modules/swiper/dist/css/swiper.min.css',
        ]
    )
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('./dist/css'))

    gulp.src(
        [
            './src/css/uikit.css',
            './src/css/main.css',
        ]
    )
    .pipe(concat('theme.css'))
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
    gulp.watch('./src/pug/**/*.pug', ['html']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/images/**/*', ['images']);
    gulp.watch('./src/fonts/**/*', ['move']);
    gulp.watch('./src/favicon/*', ['move']);
    gulp.watch('./src/css/*', ['concat']);
    gulp.watch('./src/js/*', ['concat']);
})

// gulp default task

gulp.task('default', ['browser-sync', 'html', 'css', 'images', 'move', 'concat'])