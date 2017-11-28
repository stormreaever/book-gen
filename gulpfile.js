// require contents file
var contents = require("./src/contents.json");

// require gulp files
var gulp = require("gulp");
var markdown = require("gulp-markdown");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var lodash = {};
    lodash.template = require('lodash.template');
var fs = require('fs');
var template = require('gulp-template');

var src = './src/';
var dist = './dist/';

// create array of chapter files
contents.chapterFiles = [];
for (var i = 0; i < contents.chapters.length; i ++) {
	contents.chapterFiles.push(src + 'contents/' + contents.chapters[i].file + '.md');
}


function compileTemplate(templateSrc, data) {

	var template = fs.readFileSync(src + 'templates/' + templateSrc + '.jst').toString();

	var compile = lodash.template(template);
	var html = compile(data);

	return html;
}

var templateData = {
	"nav": compileTemplate('nav', contents),
	"title": contents.title
}

var mainTemplate = fs.readFileSync(src + 'templates/main.jst').toString();

console.log(mainTemplate);

console.log(compileTemplate('nav', contents));

// define tasks
gulp.task('markdown', function () {
	return gulp.src(contents.chapterFiles)
		.pipe(markdown())
		.pipe(wrap('<section><%= contents %></section>'))
		.pipe(concat('book.html'))
		.pipe(wrap({ "src": './src/templates/main.jst'}))
		.pipe(template(templateData))
		.pipe(funtimes())
		.pipe(gulp.dest(dist));
});

gulp.task('sass', function() {
	return gulp.src(src + 'sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dist + 'css/'));
});

function funtimes() {
	console.log(input);
	return input;
}