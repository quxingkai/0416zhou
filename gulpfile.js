var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssmin = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var concat  = require('gulp-concat'); 
var server = require('gulp-webserver');

gulp.task('copyCSS',function(){
    gulp.src('src/css/lib/*.min.css')
        .pipe(gulp.dest('dist/css/lib'))
});
gulp.task('copyCss',function(){
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
});
gulp.task('copyJS',function(){
    gulp.src('src/js/lib/*.min.js')
    .pipe(gulp.dest('dist/js/lib'))
});
gulp.task('copyJs',function(){
    gulp.src(['src/js/*.js','!src/js/lib/*.min.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('copyImg',function(){
    gulp.src('src/img/*.*')
    .pipe(gulp.dest('dist/img'))
})
gulp.task('server',function(){
    gulp.src('dist')
    .pipe(server({
        host:9999,
        open:true,
        livereload:true,
        middleware:function(req, res, next){
            next()
        }
    }))
});

gulp.task('clean',function(){
    gulp.src('dist')
    .pipe(clean())
});
gulp.task('default',function(cb){
    sequence('clean',['copyCss','copyCSS','copyJS','copyJs','copyImg'],'server',cb) 
})