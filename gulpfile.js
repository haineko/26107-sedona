var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var htmlhint = require("gulp-htmlhint");
var minifyHTML = require('gulp-minify-html');
var cmq = require('gulp-combine-media-queries');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var ghPages = require('gulp-gh-pages');

gulp.task('check', function() { /* TODO: проверить работоспособность */
  gulp.src("./src/*.html")
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

gulp.task('minify-html', function() {
  return gulp.src('./src/*.html')
    .pipe(minifyHTML())
    .pipe(rename({
        suffix: '.min'
      }))
    .pipe(gulp.dest('./dest/'));
});

gulp.task('sass', function() {
  return gulp.src("./src/sass/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dest/css"))
  	.pipe(autoprefixer())
    //.pipe(cmq({
    //  log: true
    //}))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("./dest/css"))
    .pipe(reload({stream: true}));
});

gulp.task('script', function() {
  gulp.src(['./src/js/script.js', 'js/map.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./dest/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dest/js'));
});

gulp.task('image', function() {
  gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dest/img'));
});

gulp.task('deploy', function() {
  return gulp.src('./dest/**/*')
    .pipe(ghPages());
});

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: './src/'
  });

  gulp.watch(".src/sass/**/*.scss", ['sass']);
  gulp.watch(".src/*.html").on('change', reload);
});

gulp.task('build', ['check', 'sass', 'script', 'image', 'deploy']);
gulp.task('default', ['serve']);
