const gulp = require("gulp");
const path = require("path");
const debug = require("gulp-debug");
const browserSync = require("browser-sync").create();
const webpack = require('webpack');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const notifier = require('node-notifier');
const webpackConfig = require('./webpack.config.js');
const statsLog = { // для красивых логов в консоли
  colors: true,
  reasons: true
};

const publicDir = path.join(__dirname, "public");
const appDir = "src";

gulp.task("browser-sync-init", function (done) {
  browserSync.init({
    server: {
      baseDir: publicDir
    }
  });
  done();
});

gulp.task("build-html", function () {
  return gulp
    .src(`${appDir}/**/*.html`, {
      since: gulp.lastRun("build-html")
    })
    .pipe(debug({ title: "build-html" }))
    .pipe(gulp.dest(publicDir));
});


gulp.task("build-js", (done) => {
  // run webpack
  webpack(webpackConfig, onComplete);
  function onComplete(error, stats) {
    if (error) { // Что-то невероятное
      onError(error);
    } else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError(stats.toString(statsLog));
    } else {
      onSuccess(stats.toString(statsLog));
    }
  }
  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    gutil.log('[webpack]', error);
    done();
  }
  function onSuccess(detailInfo) {
    gutil.log('[webpack]', detailInfo);
    done();
  }
});

gulp.task("server", (done) => {
  nodemon({
    script: './server/server.js',
  });
  console.log("Start server");
  done();
});

gulp.task('watch', gulp.series('browser-sync-init', function () {

  gulp.watch(`${appDir}/**/*.jsx?$`, gulp.series('build-js'));
  gulp.watch(`${appDir}/**/*.html`, gulp.series('build-html'));

  gulp.watch(`${publicDir}/*.*`).on('change', (path) => browserSync.reload(path));
}));

gulp.task('default', gulp.series('build-html', 'build-js', 'watch'));
gulp.task('start', gulp.series('build-html', 'build-js', 'server'));