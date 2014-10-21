var gulp = require('gulp');

//plugins
var sass = require('gulp-sass'),
    tinylr = require('tiny-lr'),
    csso = require('gulp-csso'),
    livereload = require('gulp-livereload'),
    server = tinylr();

gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(
            sass( {
                includePaths: ['app/scss'],
                errLogToConsole: true
            } ) )
        .pipe( csso() )
        .pipe( gulp.dest('app/css/') )
        .pipe( livereload( server ));
});

// Rerun tasks when a file changes
gulp.task('watch', function () {
    server.listen(4442, function (err) {
        if (err) return console.log(err);

        gulp.watch('app/scss/*.scss', ['sass']);

    });
});


// The default task (called when you run 'gulp' from cli)
// "sass" compiles the sass to css
// "watch" looks for filechanges, and runs tasks accordingly
gulp.task('default', ['sass', 'watch']);