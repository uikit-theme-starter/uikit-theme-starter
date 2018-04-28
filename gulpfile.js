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
    gulp.src('./src/theme/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', reload)
});

// styles task

gulp.task('styles', () => {
    gulp.src(['./src/theme/uikit.scss', './src/theme/theme.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(concat('theme.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
         
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
    gulp.src('./src/theme/theme.js')
        .pipe(concat('theme.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .on('end', reload)
});

// move task

gulp.task('move', () => {
    gulp.src('./src/theme/favicon/*')
        .pipe(gulp.dest('./dist/favicon'))
    gulp.src('./src/theme/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
    gulp.src('./src/theme/videos/**/*')
        .pipe(gulp.dest('./dist/videos'))
    gulp.src('./src/theme/images/icons/set/**')
        .pipe(gulp.dest('./node_modules/uikit/src/images/icons/'))
    gulp.src('./src/theme/images/**')
        .pipe(gulp.dest('./dist/images'))
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

gulp.task('default', ['html', 'styles', 'scripts', 'move', 'browser-sync']); 