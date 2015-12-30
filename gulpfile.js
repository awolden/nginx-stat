'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel'),
        chalk = require('chalk');

gulp.task('build', () => {
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function (err) {
            console.error(chalk.bold.red(err));
            console.error(err.stack);
            this.emit('end');
        })
        .pipe(gulp.dest('./dist'));
});

gulp.task('dev', ['build'], () => {
    gulp.watch(['./src/**/*.js'], ['build']);
});
