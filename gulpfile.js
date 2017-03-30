
var gulp     = require('gulp'),
  sass       = require('gulp-sass'),
  concat     = require('gulp-concat'),
  postcss    = require('gulp-postcss'),
  gutil      = require('gulp-util'),
  rename     = require('gulp-rename'),
  autopfx    = require('autoprefixer'),
  uglify     = require('gulp-uglify'),
  clone      = require('gulp-clone'),
  notify     = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps'),
  merge      = require('merge-stream'),
  cssnano    = require('cssnano'),
  path       = require('path');

var setup = {
  dist: {
    dir: "dist"
  },
  css: {
    filename: "cascade.css", // not used yet
    min: { suffix: ".min" },
    srcs: [
      "src/**/*.scss",
      path.join(__dirname, "node_modules\\animate.css\\animate.css")
    ]
  },
  js: {
    filename: "cascade.js",
    min: { suffix: ".min" },
    srcs: [
      "javascript/**/*.js"
    ]
  }
};

gulp.task('buildCSS', function() {

  var source = gulp.src(setup.css.srcs)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autopfx()]))
    .pipe(concat(setup.css.filename));

  var cssPipe = source.pipe(clone())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(setup.dist.dir))
    .pipe(notify(setup.css.filename + ' compield'));

  if(gutil.env.production) {
  var cssMinPipe = source.pipe(clone())
    .pipe(postcss([
      cssnano({
        reduceIdents: {
          keyframes: false
        },
        discardComments: {
          removeAll: true
        }
      })
    ]))
    .pipe(rename(setup.css.min))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(setup.dist.dir));

  return merge(cssPipe, cssMinPipe);
  }

  return cssPipe;
});

gulp.task('buildJS', function() {
  var jsPipe = gulp.src(setup.js.srcs)
    .pipe(concat(setup.js.filename))
    .pipe(gulp.dest(setup.dist.dir))
    .pipe(notify(setup.js.filename + ' compield'));

  if(gutil.env.production) {
  var jsMinPipe = jsPipe.pipe(uglify())
    .pipe(rename(setup.js.min))
    .pipe(gulp.dest(setup.dist.dir));

  return merge(jsPipe, jsMinPipe);
  }

  return jsPipe;
});

gulp.task('default', ['buildCSS'], function() {
  // gulp.watch(setup.js.srcs, ['buildJS']);
  gulp.watch(setup.css.srcs, ['buildCSS']);
});
