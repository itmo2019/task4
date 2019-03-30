const gulp = require('gulp'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	webpack = require('webpack'),
	webpackStream = require('webpack-stream'),
	adjuster = require('gulp-css-url-adjuster'),
	flatten = require('gulp-flatten'),
	nodemon = require('gulp-nodemon'),
	out = 'public';

function updateHTML() {
	gulp.src('src/index.html')
	.pipe(gulp.dest(out))
	.pipe(reload({ stream: true }));
}

function updateCSS() {
	gulp.src('src/blocks/**/*.css')
	.pipe(concat('styles.css'))
	.pipe(adjuster({ prependRelative: '/../img/' }))
	.pipe(gulp.dest(out + '/css'))
	.pipe(reload({ stream: true }));
}

function updateJS() {
	gulp.src('./src/index.js')
	.pipe(webpackStream({
		mode: 'development',
		output: {
			filename: 'index.js'
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader',
					query: {
						presets: ['@babel/preset-env']
					}
				}
			]
		}
	}))
	.pipe(gulp.dest(out + '/js'))
	.pipe(reload({ stream: true }));
}

function updateImages() {
	gulp.src('src/blocks/**/*.{png,svg,jpg}')
	.pipe(flatten())
	.pipe(gulp.dest(out + '/img'))
	.pipe(reload({ stream: true }));
}

function loadFonts() {
	gulp.src('src/fonts/*')
	.pipe(gulp.dest(out + '/fonts'))
}

function watchFor(pattern, updater) {
	gulp.watch(pattern).on('add', updater);
	gulp.watch(pattern).on('change', updater);
	gulp.watch(pattern).on('unlink', updater);	
}

gulp.task('watch', function(done) {
	browserSync.init({
		proxy: "localhost:8080/",
		port: 3000,
 	});

	watchFor('src/index.html', updateHTML)
	watchFor('src/blocks/**/*.css', updateCSS)
	watchFor('src/blocks/**/*.{png,svg,jpg}', updateImages)
	watchFor('src/**/*.js', updateJS)

	done();
});

gulp.task('server', (done) => {
	let called = false;
    return nodemon({
        script: './app.js',
        ignore: ['gulpfile.js', 'src/', 'public/']
    })
    .on('start', _ => {
        if (!called) {
            called = true;
            done();
        }
    })
});

gulp.task('html', (done) => {
	updateHTML();
	done();
});

gulp.task('css', (done) => {
	updateCSS();
	done();
});

gulp.task('js', (done) => {
	updateJS();
	done();
});

gulp.task('images', (done) => {
	updateImages();
	done();
});

gulp.task('fonts', (done) => {
	loadFonts();
	done();
});

gulp.task('build', gulp.parallel('html', 'css', 'js', 'images', 'fonts'));

gulp.task('default', gulp.series('server', 'watch', 'build'));
