var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssmin = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var concat  = require('gulp-concat'); 
var server = require('gulp-webserver');

var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};
gulp.task('htmlmin',function(){
    gulp.src('src/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'))
})

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
    gulp.src(['src/js/js.js','!src/js/lib/*.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('copyImg',function(){
    gulp.src('src/img/*.*')
    .pipe(gulp.dest('dist/img'))
});
gulp.task('copyData',function(){
    gulp.src('src/data/*.json')
    .pipe(gulp.dest('dist/data'))
});
gulp.task('copyfont',function(){
    gulp.src('src/font/*.*')
    .pipe(gulp.dest('dist/font'))
})
gulp.task('server',function(){
    gulp.src('dist')
    .pipe(server({
        port:9999,
        open:true,
        livereload:true,
        middleware:function(req, res, next){
            next()
        }
    }))
});

// gulp.task('clean',function(){
//     gulp.src('dist')
//     .pipe(clean())
// });
gulp.task('default',function(cb){
    sequence(['htmlmin','copyCss','copyCSS','copyJS','copyJs','copyImg','copyData','copyfont'],'server',cb) 
})