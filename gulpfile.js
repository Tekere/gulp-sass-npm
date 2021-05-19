'use strict'
// gulpプラグイン 必須
const gulp = require('gulp')
// Sassをコンパイルするプラグイン 必須
const sass = require('gulp-sass')
// エラーがあった際に、gulpを落とさないプラグイン
const plumber = require('gulp-plumber')
// エラーがあった際にウィンドウに通知してくれるプラグイン
const notify = require('gulp-notify')
// 開発者ツールにSCSSファイルの情報が見られるようにするプラグイン
const sourcemaps = require('gulp-sourcemaps')
//ベンタープレフィックスの自動追加
const autoprefixer = require('gulp-autoprefixer')
// コンパイル後にメディアクエリをまとめる
const postcss = require('gulp-postcss')
const mqpacker = require('css-mqpacker')

//====================
//  タスクの追加
//====================

gulp.task('sass', function () {
	// style.scssファイルを取得
	return (
		gulp
			// Sassのコンパイルを実行
			.src('./scss/*.scss')
			//sourcemap 読み込み srcの直後
			.pipe(sourcemaps.init())
			//エラーが出ても落ちないようにして、ターミナルにエラーメッセージを出す
			.pipe(
				plumber({
					errorHandler: notify.onError('Error: <%= error.message %>')
				})
			)
			//outputStyleでインデントや改行の設定
			.pipe(sass({ outputStyle: 'expanded' }))
			//メディアクエリの整理
			.pipe(postcss([mqpacker()]))
			//ベンダープレフレックスをつける
			.pipe(autoprefixer())
			//sourcemap 実行 inline
			.pipe(sourcemaps.write('./'))
			// 保存先 直下に保存
			.pipe(gulp.dest('./css'))
	)
})

//====================
//  すべての監視
//====================
gulp.task('watch', () => {
	gulp.watch('./scss/*.scss', gulp.series('sass'))
})

//====================
//  デフォルトとして登録。 コマンド gulpでスタート
//====================
gulp.task('default', gulp.series('watch'))
