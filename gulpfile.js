const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');

const entry = './src/server/**/*.js';
const clearEntry = './src/server/config/index.js';

/*** 线上环境*/
function buildprod() {
  return gulp.src(entry)
    .pipe(babel({
      babelrc: false,
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
      ],
      ignore: [clearEntry],
    }))
    .pipe(gulp.dest('dist'));
}

/**
 * 开发环境
 */
function builddev() {
  return watch(entry,
    function () {
      gulp.src(entry)
        .pipe(babel({
          babelrc: false,
          plugins: [
            '@babel/plugin-transform-modules-commonjs',
          ],
        }))
        .pipe(gulp.dest('dist'));
    })
}

/** 编译清洗 */
function buildconfig() {
  return gulp.src(entry).pipe(
    rollup({
      input: clearEntry,
      output: {
        format: 'cjs'
      },
      plugins: [replace({ 'process.env.NODE_ENV': "'production'" })],
    }))
}

let build = gulp.series(builddev);
if (process.env.NODE_ENV === 'production') {
  build = gulp.series(buildprod, buildconfig);
}

gulp.task('default', build);