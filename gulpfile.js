const { series, dest, src, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser=require('gulp-terser');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const paths={
    images: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
}

function css(){
    return src(paths.scss)
        .pipe( sourcemaps.init())
        .pipe( sass({outputStyle: 'compressed'}) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('.build/css'))
}

function javascript(){
    return src(paths.js)
        .pipe( sourcemaps.init())
        .pipe( concat(bundle.js))
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('./build/js'))
}

function minifyImg(){
    return src(paths.images)
        .pipe( imagemin())
        .pipe(dest('./buld/img'))
}

function turnWebp(){
    return src(paths.images)
        .pipe(webp())
        .pipe(dest('./build/img'))
}

function watchArchivos(){
    watch(paths.scss, css)
    watch(paths.js, javascript)
}

exports.turnWebp=turnWebp;
exports.minifyImg=minifyImg;
exports.css=css;
exports.javascript=javascript;
exports.default=watchArchivos;
