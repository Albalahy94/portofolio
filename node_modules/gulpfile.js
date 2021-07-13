// function defaultTask(cb) {
//     // place code for your default task here
//     cb();
//   }
  
//   exports.default = defaultTask


var gulp = require('gulp');
var browsersync = require('browser-sync');
// var fortawesome = require('@fortawesome/fontawesome-free')
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var sass = require('sass');require("gulp-sass")(require("node-sass"))
// var sass =  require("gulp-sass")(require("node-sass"));
var sourcemaps = require('gulp-sourcemaps');
// var notify = require('notify');
var sass = require('gulp-sass');

var uglify = require('gulp-uglify');

gulp.task('said',function(){
    console.log('ssss');
});

gulp.task('styles', async function () {
    return gulp.src('css/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(rename('app.css'))
      .pipe(gulp.dest('dist/css'))
      // .pipe(notify("Hello Gulp!"))
      .pipe(browsersync.stream());
  })
  
  
gulp.task('scripts',async function () {
    gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browsersync.stream());
  })

  gulp.task('watch', function () {
    browsersync.init({
      server: {
        baseDir: './'
      }
    })
    
  gulp.watch('css/**/**/*.scss',gulp.series('styles') );
  // gulp.watch('src/bootstrap/**/*.scss', bootstrap_styles);
  // gulp.watch('src/images/**/*.*', compress_images);
  // gulp.watch('src/plugins/**/*.css', vendor_styles);
  // gulp.watch('src/plugins/**/*.js', vendor_scripts);
  gulp.watch('js/**/*.js', gulp.series('scripts'));
  gulp.watch('dist/**/**/*.*' );
  gulp.watch('./**/*.*' );

  gulp.watch('./*.html').on('change', browsersync.reload);
})
