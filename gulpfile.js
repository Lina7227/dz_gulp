const gulp = require('gulp')
const sass = require('gulp-sass') 
const concat = require('gulp-concat') 
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')

const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
    return src('src/*.js')
      .pipe(babel())
      .pipe(src('vendor/*.js'))
      .pipe(dest('output/'))
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(dest('output/'));
} 
function img(){
    gulp.src('./src/img/*.jpg')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
        ]))
        .pipe(gulp.dest('./src/img_min'));
}

function css(){
    return  gulp.src('./src/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 4 versions']
    }))
    .pipe(gulp.dest('./src/css/min/*.min.css'));
}

function watch(){
    browserSync.init({
        server:{
            baseDir:'./src',
            index: "/index.html"
        }
    });
}

gulp.watch('./src/index.html').on('change', browserSync.reload, gulp.series[watch, css]);
gulp.watch('./src/css/style.css').on('change', browserSync.reload, css());

exports.watch = watch;
exports.small = img;