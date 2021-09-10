'use strict';

const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const bs = require('browser-sync').create();
const npmDist = require('gulp-npm-dist');
const htmlInjector = require('bs-html-injector');

sass.compiler = require('node-sass');

// Compile scss files to core.css file
function compileStyle() {
  return src('./scss/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('./assets/css'))
  .pipe(bs.stream());
}

// Compile and minify scss files to core.min.css file
function minifyStyle () {
  return src('./scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./assets/css'))
    .pipe(bs.stream());
}

// Start a server
function serve () {
  bs.use(htmlInjector, {
    files: "**/*.html"
  });

  // Now init the Browsersync server
  bs.init({
    injectChanges: true,
    server: true,
    notify: false,
    ui: {
      port: 3005,
    },
    port: process.env.PORT || 3000,
  });

  // Listen to change events on HTML and reload
  watch('**/*.html').on('change', htmlInjector);

  // css files on the page.
  watch('scss/*.scss', series(compileStyle, minifyStyle));
  watch('scss/**/*.scss', series(compileStyle, minifyStyle));
}

exports.compileStyle = compileStyle;
exports.minifyStyle = minifyStyle;

exports.serve = serve;
