// gulp include

const gulp = require('gulp');

// gulp plugin include
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');

const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const dircompare = require('dir-compare');

// browsersync include

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// html task

gulp.task('html', () => {
    gulp.src('./src/theme/pages/*.pug')
        .pipe(
            pug({
                pretty: true
            })
        )
        .pipe(gulp.dest('./dist'))
        .on('end', reload);
});

// styles task

gulp.task('stylesPlugin', () => {
    gulp.src(['./node_modules/swiper/dist/css/swiper.min.css'])
        .pipe(concat('plugins.css'))
        .pipe(gulp.dest('./dist/css'))
        .on('end', reload);
});

gulp.task('styles', () => {
    gulp.src(['./src/theme/theme.scss'])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleancss())
        //.pipe(concat('theme.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
        .on('end',reload);
});

// scripts task

function compileJs(watch) {
    let bundler = watchify(browserify('./src/theme/theme.js', {debug: true}).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('theme.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/js/'))
            .on('end', reload);
    }

    if (watch) {
        bundler.on('update', function () {
            console.log('-> bundling...');
            rebundle();
        });
    } else {
        rebundle();
    }
}

function watchJs() {
    return compileJs(true);
}

gulp.task('scripts', () => {
    return compileJs();
});

gulp.task('watchScripts', () => {
    return watchJs();
});

gulp.task('scriptsPlugin', () => {
    return gulp.src(
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
        .pipe(gulp.dest('./dist/js'));
});
// move tasks

gulp.task('moveFavicon', () => {
    return gulp.src('./src/theme/favicon/*')
        .pipe(gulp.dest('./dist/favicon'));
});

gulp.task('moveFonts', () => {
    return gulp.src('./src/theme/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('moveVideos', () => {
    return gulp.src('./src/theme/videos/**/*')
        .pipe(gulp.dest('./dist/videos'));
});

gulp.task('moveIcons', () => {
    let srcPath = './src/theme/images/icons/set/';
    let destPath = './node_modules/uikit/src/images/icons/';

    let res = dircompare.compareSync(srcPath, destPath, {compareSize: true});

    if (res.left) {
        console.log('Yeni ikon eklendi. node_modules\\uikit dizininde "npm install" ve "npm run compile" komutlarını çalıştırın');
        gulp.src(srcPath + '**/*').pipe(gulp.dest(destPath));
    }
});

gulp.task('moveImages', () => {
    gulp.src('./src/theme/images/**/*')
        .pipe(gulp.dest('./dist/images'));
});

// browsersync task

gulp.task('browser-sync', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('src/**/*.pug', ['html']);
    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/theme/favicon/*', ['moveFavicon']);
    gulp.watch('src/theme/fonts/**/*', ['moveFonts']);
    gulp.watch('src/theme/videos/**/*', ['moveVideos']);
    gulp.watch('src/theme/images/icons/set/**/*', ['moveIcons']);
    gulp.watch('src/theme/images/**/*', ['moveImages']);
});

gulp.task('default', [
    'html',
    'styles',
    'stylesPlugin',
    'scripts',
    'watchScripts',
    'scriptsPlugin',
    'moveFavicon',
    'moveFonts',
    'moveVideos',
    'moveIcons',
    'moveImages',
    'browser-sync'
]);