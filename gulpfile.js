const gulp = require('gulp')
const sass = require('gulp-sass') 
const concat = require('gulp-concat') 
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')

function style() {
    return gulp.src('./src/css/style.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css/style.min.css'));
}

function wacht(){
    browserSync.init({
        server:{
            baseDir:'./src',
            index: "/index.html"
        }
    })
}

gulp.wacht('./src/index.html').on('change', browserSync.reload);

exports.wacht = start;