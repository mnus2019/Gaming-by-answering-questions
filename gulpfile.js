var gulp =require("gulp"),
gutil = require('gulp-util'),
connect = require('gulp-connect');

gulp.task("html",function(cb){
    gulp.src(["./builds/game.html","./builds/end.html",
    "./builds/quiz.html","./builds/highscores.html"])
    .pipe(gulp.dest("./builds/development"))
    .pipe(connect.reload())
    cb();
})
gulp.task("js",function(cb){
    gulp.src(["./builds/game.js","./builds/end.js","./builds/highscore.js"])
    .pipe(gulp.dest("./builds/development"))
    .pipe(connect.reload())
    cb();
})
gulp.task("css",function(cb){
    gulp.src(["./builds/game.css","./builds/app.css","./builds/end.css","./builds/highscores.css"])
    .pipe(gulp.dest("./builds/development"))
    .pipe(connect.reload())
    cb();
})

gulp.task('watch', function(cb){
   
    gulp.watch(["./builds/game.js","./builds/end.js","./builds/highscore.js"], gulp.series('js'));
    gulp.watch(["./builds/game.html","./builds/end.html",
    "./builds/quiz.html","./builds/highscores.html"], gulp.series('html'));
    gulp.watch(["./builds/game.css","./builds/app.css","./builds/end.css","./builds/highscores.css"], gulp.series('css'));
   
    cb();
});
const quiz="quiz.html";
gulp.task('connect',function(cb){
    connect.server({
        root: 'builds/development',
        livereload:true,
        port:3000,
        index: "quiz.html"
    });
    cb();
});

gulp.task('default' ,gulp.series( 'html', 'js' , 'css', 'connect','watch' ));