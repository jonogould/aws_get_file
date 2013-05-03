aws_get_file
============

by Jono Gould ([TravelGround](http://github.com/TravelGround)), @jonogould

Use this function to download files from your s3 bucket. Requires [knox](https://github.com/LearnBoost/knox).

## Installation

First, you need to install [node](http://nodejs.org). Then you can continue!

This script runs in terminal.

To get these tools running, you need the following dependencies, available off npm:


- [shelljs](http://shelljs.org)
- [underscorejs](http://underscorejs.org)

To install this dependency (the easy way), run the following command from the ``` aws_get_file ``` root dir:

``` $ npm install ```

Or place the dependencies there manually but adding them to a ``` node_modules ``` folder

Or add them individually by calling:

``` $ npm install underscore ```

Lastly make the script executable using ```chmod +x aws_get_file.js```


## Usage

How do you use ``` aws_get_file ```, I hear you asking? Well:

Add it to your ```node_modules``` folder and include it into your script using ```var aws_get_file = require('aws_get_file').aws_get_file;```.

## Examples

Check out the [wiki](https://github.com/TravelGround/aws_get_file/wiki) for some examples on what this tool could be used for, check it out and add your own!


### Now go play, use it to create useful stuff!