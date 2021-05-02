const gulp = require("gulp");
// const sass = require("gulp-sass");
// const concat = require("gulp-concat");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");

const rename = require("gulp-rename");
const { watch, series } = require("gulp");

function img() {
    gulp
      .src("./src/img/*.jpg")
      .pipe(imagemin([imagemin.mozjpeg({ quality: 75, progressive: true })]))
      .pipe(gulp.dest("./src/img_min/"));
}

function css() {
    return gulp
      .src("./src/css/style.css")
      .pipe(autoprefixer())
      .pipe(cssnano())
      .pipe(rename({ extname: ".min.css" }))
      .pipe(gulp.dest("./src/css/"));
}

function watchOnHtml() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "/index.html",
        },
    });
}

// gulp.watch("./src/index.html").on("change", browserSync.reload, watch);
// gulp.watch("./src/css/style.css").on("change", browserSync.reload, css);

// exports.watch = watch;
// exports.small = img;
// exports.css = css;
exports.default = function () {
    watchOnHtml(), watch("./src/**/*").on("change", browserSync.reload);
    watch("./src/img/*.*", img);
    watch("./src/css/style.css", css);
    // Or a composed task
    // watch('./src/*.js', series(clean, javascript));
  };