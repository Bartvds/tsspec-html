module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-wrap');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	var top = grunt.file.read('./parts/top.html');
	var bottom = grunt.file.read('./parts/bottom.html');
	var menu = grunt.file.read('./parts/menu.html');
	top += menu;

	grunt.initConfig({
		wrap: {
			content: {
				cwd: 'content/',
				expand: true,
				src: ['*.html'],
				dest: 'dist/',
				options: {
					seperator: '\n',
					indent: '\t',
					wrapper: [top, bottom]
				}
			}
		},
		menu: {
			content: {
				cwd: '.',
				expand: true,
				src: ['*.html'],
				dest: 'dist/',
				options: {
					seperator: '\n',
					indent: '\t',
					wrapper: [top, bottom]
				}
			}
		},
		clean: {
			"dist": ['dist']
		},
		copy: {
			"css": {
				files: [
					{expand: true, cwd: 'content/css', src: ['**/*.css'], dest: 'dist/css'}
				]
			},
			"img": {
				files: [
					{expand: true, cwd: 'content/img', src: ['**'], dest: 'dist/img'}
				]
			}
		}
	});

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean:dist', 'wrap:content', 'copy:css', 'copy:img']);
};
