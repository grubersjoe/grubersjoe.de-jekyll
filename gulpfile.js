const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const cp = require('child_process');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const $ = gulpLoadPlugins();

const BUILD_DIR = 'assets/dist/';
const FONTS = [
    'node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}',
    'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.{eot,svg,ttf,woff,woff2}'
];

let dev = true;

// Minify the Jekyll's output
gulp.task('html', () => {
    return gulp.src('_site/**/*.html')
        .pipe($.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: {compress: {drop_console: true}},
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('_site'));
});

// Handle SCSS code
gulp.task('styles', () => {
    return gulp.src('assets/_scss/main.scss')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 8
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest(BUILD_DIR))
	    .pipe(gulp.dest('_site/' + BUILD_DIR))
	    .pipe(browserSync.reload({stream: true}))
	    .pipe($.if(!dev, $.cssnano({safe: true, autoprefixer: false})))
	    .pipe($.if(!dev, $.rename({suffix: '.min'})))
	    .pipe($.if(!dev, gulp.dest(BUILD_DIR)))
	    .pipe($.if(!dev, gulp.dest('_site/' + BUILD_DIR)))
});

// Handle JavaScript code
gulp.task('scripts', () => {
    return gulp.src('assets/_js/**/*.js')
        .pipe($.plumber())
	    .pipe($.if(dev, $.sourcemaps.init()))
	    .pipe($.concat('build.js'))
        .pipe($.babel())
        .pipe($.if(dev, $.sourcemaps.write('.')))
        .pipe(gulp.dest(BUILD_DIR))
        .pipe($.if('*.js', $.uglify({compress: {drop_console: true}})))
        .pipe($.if('*.js', $.rename({suffix: '.min'})))
        .pipe(gulp.dest(BUILD_DIR))
});

// Copy web fonts to asset directory
gulp.task('fonts', () => {
    return gulp.src(FONTS).pipe(gulp.dest('assets/fonts'));
});

// Optimize image files
gulp.task('images', () => {
    return gulp.src('assets/images/**/*')
        .pipe($.cache($.imagemin([
            $.imagemin.jpegtran({progressive: true})
        ])))
        .pipe(gulp.dest('assets/images'));
});

// Print the size (gziped)
gulp.task('size', () => {
    return gulp.src('_site/**/*')
        .pipe($.size({title: 'build', gzip: true}))
});

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'}).on('close', done);
});

// Build the Jekyll Site (Production mode)
gulp.task('jekyll-build-prod', function (done) {
    browserSync.notify('Building Jekyll (Production)');
	let env = Object.create(process.env);
	env.JEKYLL_ENV = 'production';
    return cp.spawn('bundle', ['exec', 'jekyll', 'build', ], {stdio: 'inherit', env: env}).on('close', done);
});


// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.notify('Rebuilded Jekyll');
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('server', ['jekyll-build'], (done) => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    }, done);
});

// Build the page, start a server and watch files for changes
gulp.task('serve', () => {
    gulp.watch('assets/_scss/**/*.scss', ['styles']);
    gulp.watch('assets/_js/**/*.js', ['scripts']);
    gulp.watch('assets/images/**/*', ['images']);

    runSequence('build', 'server', () => {
        gulp.watch([
            '!./node_modules/**/*',
            '_data/**/*',
            '_includes/**/*',
            '_layouts/**/*',
            '_plugins/**/*',
            '_posts/**/*',
            '*.html',
            './**/*.md',
            'assets/fonts/**/*',
            'assets/images/**/*',
            BUILD_DIR + '**/*.js'
        ], ['jekyll-rebuild']);
    });
});

// Build all assets and then the Jekyill Site
gulp.task('build', () => {
    runSequence(['styles', 'scripts', 'fonts', 'images'], 'jekyll-build');
});

// Cleanup
gulp.task('clean', () => {
    del('assets/dist');
    return cp.spawn('bundle', ['exec', 'jekyll', 'clean'], {stdio: 'inherit'});
});

// Default action: build the complete in production mode
gulp.task('default', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence('clean', ['styles', 'scripts', 'fonts', 'images'], 'jekyll-build-prod', 'html', 'size', resolve);
    });
});
