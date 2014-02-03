module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-wrap');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	var top = grunt.file.read('0.9.1/parts/top.html');
	var bottom = grunt.file.read('0.9.1/parts/bottom.html');
	var menu = grunt.file.read('0.9.1/parts/menu.html');
	top += menu;

	grunt.initConfig({
		wrap: {
			content: {
				cwd: '0.9.1/content/',
				expand: true,
				src: ['*.html'],
				dest: '0.9.1/dist/',
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
				dest: '0.9.1/dist/',
				options: {
					seperator: '\n',
					indent: '\t',
					wrapper: [top, bottom]
				}
			}
		},
		clean: {
			"dist": ['0.9.1/dist']
		},
		copy: {
			"css": {
				files: [
					{expand: true, cwd: '0.9.1/content/css', src: ['**/*.css'], dest: '0.9.1/dist/css'}
				]
			},
			"img": {
				files: [
					{expand: true, cwd: '0.9.1/content/img', src: ['**'], dest: '0.9.1/dist/img'}
				]
			}
		}
	});

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean:dist', 'wrap:content', 'copy:css', 'copy:img']);
};
