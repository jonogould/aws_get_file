/*
*	aws_get_file.js
*	========================================================
*
*	Author: 	jono gould
*	Company: 	TravelGround.com
*	Date: 		3 May 2013
*
*	Description:
*	Function to download files from AWS S3
*	
*	Use this function to download files from your s3 bucket. Requires knox.
*	Make an argument null if not in use.
*
*	========================================================
*	
*	Usage: 				aws_get_file(array_of_files, null, root, destination_dir, aws_connection, function(results){});
*	or from txt file: 	aws_get_file(null, 'test.txt', root, destination_dir, aws_connection, function(results){
*
*	path 				= shell.cat('list.txt').split('\n'); (if it's a file that contains the list, otherwise array)
*	file_name 			= './downloads'
*	root 				= The host where files will start being saved
*	destination_dir 	= The path where files are saved. * NOTE: make 'null' to copy input file's path structure
*	aws_connection 		= The knox client connection, specified with knox.createClient({key, secret, bucket});
*	done 				= function that is called when job is done
*/


//	Dependancies
var fs = require('fs');
var url = require('url');
var shell = require('shelljs');
var _ = require('underscore');


var aws_get_file = function (path, file_name, root, destination_dir, aws_connection, done) {
	//	If the file_name is set, overwrite the path array with this
	if (file_name) {
		path = shell.cat(file_name).split('\n');
	}

	var batch_size = 100;
	var outstanding = 0;
	var open_files = 0;

	var written = [];
	var missed = [];

	_.each(path, function(f) {
		if (f.length === 0)
			return done([]);

		var filename = f.split('/').pop();
		var destination_file = destination_dir + filename;
		var new_file = '';

		//	Check if the destination dir is set, if not then copy the current f path
		if (destination_dir === null) {
			destination_file = url.parse(f).pathname;
		}

		if (open_files < batch_size) {
			open_files++;
			//	Now grab the file from s3
			aws_connection.getFile(f, function(err, res) {
				if(err) return err;

				res.setEncoding('binary');
				
				res.on('data', function(chunk) {
					new_file += chunk;
				});

				res.on('end', function(chunk) {
					//	WRITE FILE
					fs.writeFile(root + '/' + destination_file, new_file, 'binary', function (err) {
						written.push(f + '\n');
						outstanding++;
						open_files--;
						
						if (outstanding === batch_size) done({written: written, missed: missed});
					});
				});
			});
		}
		else {
			missed.push(f + '\n');
		}
	});
};


exports.aws_get_file = aws_get_file;