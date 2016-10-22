var gulp = require('gulp');
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create();
    sassGlob = require('gulp-sass-bulk-import');

var config = require('./gulpfile-config.json');

// Error notifications.
var reportError = function (error) {
  notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  // print the error in terminal.
  console.log(error.toString());
  this.emit('end');
};

gulp.task('styles', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
    .pipe(gulp.dest('css'));
});

gulp.task('styles:dev', function() {
  return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', reportError))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(sassLint({
      options: {
        formatter: 'table'
      },
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
})

gulp.task('comb', function() {
  return gulp.src(['sass/**/*.scss'], {base: './'})
    .pipe(csscomb())
    .pipe(gulp.dest('./'));
})

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/sprites/*.png')
    .pipe(spritesmith({
      /* this whole image path is used in css background declarations */
      imgName: '../images/sprites/sprite/sprite.png',
      cssName: '_sprites.scss'
    }));
  spriteData.img.pipe(gulp.dest('img'));
  spriteData.css.pipe(gulp.dest('sass'));
});

gulp.task('watch', function() {
  // Set your localhost address
  browserSync.init({
    proxy: config.browserSync.proxy
  });
  // Watch .scss files
  gulp.watch(['images/sprites/*.png'], ['sprite']);
  gulp.watch(["sass/**/*.scss", "sprites.scss", 'images/**/*'], ['styles:dev']);
  // gulp.watch(["js/**/*.js", 'templates/**/*.html.twig']).on('change', browserSync.reload);
  gulp.watch(["sass/**/*.scss", "js/**/*.js", 'index.html']).on('change', browserSync.reload);

});

gulp.task("default", ["watch"]);
