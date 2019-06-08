'use strict';

import gulp from 'gulp';
import del from 'del';
import sourcemap from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import rigger from 'gulp-rigger';
import jsmin from 'gulp-jsmin';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin'

var paths = {
    styles: {
        src: ['node_modules/bootstrap/scss/bootstrap.scss', 'src/sass/*.{scss, css}'],
        dest: 'build/css/'
    },
    scripts: {
        src: 'src/js/*.js',
        concat:'bundle.js',
        dest: 'build/js/'
    },
    html: {
        src: 'src/html/*.html',
        dest: 'build'
    },
    images: {
        src: 'src/images/**',
        dest: 'build/img'
    },
    watch: {
        sass: 'src/sass/**',
        html: 'src/html/**',
        js: 'src/js/**',
        images: 'src/images/**'
    },
    clone: {
        js:['node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/jquery/dist/jquery.js'],
        fonts:['src/sass/fonts/**']
    }
};

function clean(){
    return del('build/**')
}

function styles(){
    return gulp.src(paths.styles.src)
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(sourcemap.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({stream: true}))
}

function browser(){
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

}

function cloneJS(){
    return gulp.src(paths.clone.js)
        .pipe(gulp.dest(paths.scripts.dest))
}

function cloneFonts(){
    return gulp.src(paths.clone.fonts)
        .pipe(gulp.dest(paths.styles.dest + 'fonts'))
}

function html(){
    return gulp.src(paths.html.src)
        .pipe(rigger())
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.reload({stream: true}))
}

function js(){
    return gulp.src(paths.scripts.src)
        .pipe(jsmin())
        .pipe(concat(paths.scripts.concat))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.reload({stream: true}))
}

function images(){
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.reload({stream: true}))
}

function watch(){
    gulp.watch(paths.watch.sass, styles);
    gulp.watch(paths.watch.html, html);
    gulp.watch(paths.watch.js, js);
    gulp.watch(paths.watch.images, images);
}

var build = gulp.series(clean, gulp.parallel(styles, html, js, cloneJS, cloneFonts, images), gulp.parallel(watch, browser));
gulp.task('build', build);

