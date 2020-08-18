const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const entry = './src/server/**/*.js';

function buildprod() {
  return gulp.src(entry)
    .pipe(babel({
      babelrc: false,
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
      ]
    }))
    .pipe(gulp.dest('dist'));
}

function builddev() {
  return watch(entry, { ignoreInitial: false },
    function () {
      gulp.src(entry)
        .pipe(babel({
          babelrc: false,
          plugins: [
            '@babel/plugin-transform-modules-commonjs',
          ]
        }))
        .pipe(gulp.dest('dist'));
    })
}

/** 编译清洗 */
function buildconfig() {

}

let build = gulp.series(builddev);
if (process.env.NODE_ENV === 'production') {
  build = gulp.series(buildprod);
}

gulp.task('default', build);