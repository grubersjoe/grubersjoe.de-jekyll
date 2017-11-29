const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const cp = require('child_process');
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const $ = gulpLoadPlugins();

const BUILD_DIR = 'assets/';
const FONTS = [
  'node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}',
];

let DEV = true;

// Minify Jekyll's output
gulp.task('html', () => gulp
  .src('_site/**/*.html')
  .pipe($.htmlmin({
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: { compress: { drop_console: true } },
    processConditionalComments: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
  }))
  .pipe(gulp.dest('_site')));

gulp.task('styles', () => gulp
  .src('_scss/styles.scss')
  .pipe($.plumber())
  .pipe($.if(DEV, $.sourcemaps.init()))
  .pipe($.sass.sync({
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.'],
  })
    .on('error', $.sass.logError))
  .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
  .pipe($.if(DEV, $.sourcemaps.write()))
  .pipe($.if(!DEV, $.cssnano({ safe: true, autoprefixer: false })))
  .pipe(gulp.dest(BUILD_DIR))
  .pipe(gulp.dest('_site/' + BUILD_DIR)) // required for hot reload
  .pipe(browserSync.reload({ stream: true })));


gulp.task('scripts', () => gulp
  .src('_scripts/index.js')
  .pipe($.plumber())
  .pipe(webpack(DEV ? webpackConfig.dev : webpackConfig.prod))
  .pipe(gulp.dest(BUILD_DIR)));

gulp.task('lint', () => gulp
  .src('_scripts/**/*.js')
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError()));


gulp.task('fonts', () => gulp
  .src(FONTS)
  .pipe(gulp.dest('assets/fonts')));

gulp.task('images', () => gulp
  .src('assets/images/**/*')
  .pipe($.cache($.imagemin([
    $.imagemin.jpegtran({ progressive: true }),
    $.imagemin.optipng({ optimizationLevel: 5 }),
  ])))
  .pipe(gulp.dest('assets/images')));

gulp.task('size', () => gulp
  .src('_site/**/*')
  .pipe($.size({ title: 'build', gzip: true })));

gulp.task('jekyll-build', (done) => {
  browserSync.notify('Building Jekyll');
  return cp
    .spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('jekyll-build-prod', (done) => {
  browserSync.notify('Building Jekyll (Production)');
  const env = Object.create(process.env);
  env.JEKYLL_ENV = 'production';
  return cp
    .spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit', env })
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  browserSync.notify('Rebuilded Jekyll');
  browserSync.reload();
});

gulp.task('server', ['jekyll-build'], (done) => {
  browserSync.init({
    notify: false,
    server: { baseDir: '_site' },
    host: 'localhost',
  }, done);
});

gulp.task('serve', () => {
  gulp.watch('_scss/**/*.scss', ['styles']);
  gulp.watch('_scripts/**/*.js', ['scripts']);

  runSequence('build', 'server', () => {
    gulp.watch([
      '_data/**/*',
      '_includes/**/*',
      '_layouts/**/*',
      '_pages/**/*',
      '_plugins/**/*',
      '_posts/**/*',
      '*.html',
      './**/*.md',
      `${BUILD_DIR}/fonts/**/*`,
      `${BUILD_DIR}/images/**/*`,
      `${BUILD_DIR}**/*.js`,
    ], ['jekyll-rebuild']);
  });
});

gulp.task('build', () => {
  runSequence(['styles', 'scripts', 'fonts', 'images'], 'jekyll-build');
});

gulp.task('clean', () => {
  del([BUILD_DIR, 'assets/fonts/*']);
  return cp.spawn('bundle', ['exec', 'jekyll', 'clean'], { stdio: 'inherit' });
});

gulp.task('default', () => new Promise((resolve) => {
  DEV = false;
  runSequence('clean', ['lint', 'styles', 'scripts', 'fonts', 'images'], 'jekyll-build-prod', 'html', 'size', resolve);
}));
