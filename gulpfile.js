var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var htmlhint = require("gulp-htmlhint");
var cmq = require('gulp-combine-media-queries');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

gulp.task('check', function() {
  gulp.src("mobile-sedona/*.html")
  .pipe(htmlhint({
    "tag-pair": true,
    "style-disabled": true,
    "img-alt-require": true,
    "tagname-lowercase": true,
    "src-not-empty": true,
    "id-unique": true,
    "spec-char-escape": true
  }));
});

gulp.task('sass', function() {
  return gulp.src("sass/style.scss")
    .pipe(sass())
  	.pipe(autoprefixer())
    .pipe(cmq({
      log: true
    }))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("css"))
    .pipe(reload({stream: true}));
});

gulp.task('script', function() {
  gulp.src('js/script.js', 'js/map.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('.js'));
});

gulp.task('image', function() {
  gulp.src()
  .pipe(imagemin())
  .pipe(gulp.dest('./dest/img'));
}

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: '.'
  });

  gulp.watch("sass/**/*.scss", ['sass']);
  gulp.watch("mobile-sedona/*.html").on('change', reload);
});

gulp.task('default', ['serve']);
