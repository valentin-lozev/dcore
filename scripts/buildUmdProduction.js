const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const uglify = require('rollup-plugin-uglify');

module.exports = (input, banner) =>
	rollup
		.rollup({
			input: input,
			plugins: [
				typescript(),
				uglify({
					mangle: false,
					output: {
						comments: 'some'
					}
				})
			]
		})
		.then(bundle => bundle
			.write({
				name: 'justcore',
				format: 'umd',
				banner: banner,
				file: 'dist/justcore.umd.min.js',
				exports: 'named'
			})
			.then(() => console.info('PROD UMD bundled successfully'))
		);