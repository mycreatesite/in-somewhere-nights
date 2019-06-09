var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var wait = require('gulp-wait');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

gulp.task('pug', function buildHTML() {
	return gulp.src('./works/pug/*.pug')
		.pipe(plumber())
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
	return gulp.src('./works/scss/**/*.scss')
		.pipe(wait(500))
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false,
			grid: true
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('babel', function () {
	return gulp.src('./works/js/**/*.js')
		.pipe(plumber())
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream());
});

gulp.task('server', function () {
	browserSync.init({
		server: {
			directory: true,
			baseDir: './'
		}
	});
});

gulp.task('watch', ['server', 'pug', 'sass', 'babel'], function () {
	watch('./works/pug/**/*.pug', function () {
		gulp.start('pug');
	});
	watch('./works/scss/**/*.scss', function () {
		gulp.start('sass');
	});
	watch('./works/js/**/*.js', function () {
		gulp.start('babel');
	});
	watch('./dist/*.html', function () {
		browserSync.reload();
	});
});