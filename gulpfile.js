const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//compile SASS
gulp.task('sass', function(){
	return gulp.src(['node_modules/bootstrap-v4-rtl/scss/bootstrap-rtl.scss', 'src/scss/*.scss' ])
	.pipe(sass())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
});


// Move JS Files to src
gulp.task('js', function(){
	return gulp.src(['node_modules/bootstrap-v4-rtl/dist/js/bootstrap.min.js', 
		'node_modules/jquery/dist/jquery.min.js', 
		'node_modules/tether/dist/js/tether.min.js'])
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream());
});


// watch SASS and serve
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: './src'
	});

	gulp.watch(['node_modules/bootstrap-v4-rtl/scss/bootstrap-rtl.scss', 'src/scss/*.scss'], ['sass']);
	gulp.watch('src/*.html').on('change', browserSync.reload); 
})

gulp.task('fonts', function(){
	return gulp.src(['node_modules/samim-font/dist/*.eot', 'node_modules/samim-font/dist/*.ttf', 'node_modules/samim-font/dist/*.woff'])
	.pipe(gulp.dest('src/fonts'));
});

gulp.task('samim-font', function(){
	return gulp.src('node_modules/samim-font/dist/font-face.css')
	.pipe(gulp.dest('src/css'));
});


gulp.task('default', ['js', 'serve', 'samim-font', 'fonts']);