const imports = require('gulp-imports')
const Eagle = require('gulp-eagle')
const umd = require('gulp-umd')
const gulp = require('gulp')

const { GulpPaths, Task } = Eagle
const moduleName = 'MergeImage'

Eagle.extend('umd', function (src, output) {
  const paths = new GulpPaths().src(src).output(output)

  new Task('umd', function ($) {
    return (
      gulp
        .src(paths.src.path)
        .pipe(imports())
        .pipe(umd({
          exports: function () {
            return moduleName
          },
          namespace: function () {
            return moduleName
          }
        }))
        .pipe(this.minify())
        .pipe(this.save(gulp))
    )
  }, paths)
})

const outputName = 'merge-image.min.js'

Eagle(function (mix) {
  mix
    .babel('./src/index.js', outputName)
    .umd('./dist/' + outputName, outputName)
    // .browserSync({
    //   server: {
    //     baseDir: './',
    //     directory: true
    //   }
    // })
})
