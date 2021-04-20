const gulp = require('gulp')
const sass = require('gulp-sass') 
const concat = require('gulp-concat') 
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')

function img(){
    gulp.src('./src/img')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
        ]))
        .pipe(gulp.dest('./src/img/img_min'));
}

function css(){
    return  gulp.src('./src/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 4 versions']
    }))
    .pipe(gulp.dest('./src/css/style.min.css'));
}

function watch(){
    browserSync.init({
        server:{
            baseDir:'./src',
            index: "/index.html"
        }
    });
}

gulp.watch('./src/index.html').on('change', browserSync.reload, gulp.series[watch, css, img]);

exports.watch = watch;