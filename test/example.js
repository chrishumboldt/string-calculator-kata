/**
 * File: 			example.js
 * Type: 			Javascript test file
 * Author:        	Chris Humboldt
 * Last Edited:   	16 April 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Requires
// Functions
// Tests


// Requires
// ---------------------------------------------------------------------------------------
var $tester = require('unit.js');


// Functions
// ---------------------------------------------------------------------------------------
// Add integers
Array.prototype.sum = function()
{
	var $sum = 0;
	var $negatives = 'negatives not allowed ';
	this.map(function($number)
	{
		$number = parseInt($number);
		$negatives += $number < 0 ? ',' + $number : '';
		$sum += $number > 0 && $number <= 1000 ? $number : 0;
	});
	return $negatives.length === 22 ? $sum : $negatives.substring(0, $negatives.length - 1);
};

// Add function
function add($string)
{
	// Alter the input
	var $delimiters = [',', '\n'];	
	var $string = $string === '' ? '//[;]\n0' : $string.indexOf('//') < 0 ? $string = '//[;]\n' + $string : $string;
	var $string_prefix = $string.split('\n', 1).toString();
	var $string_delimiters = $string_prefix.substring($string.indexOf('//[') === 0 ? 3 : 2, $string_prefix.length - 1).split('][');

	// Add delimiters
	$string_delimiters.map(function($delimiter)
	{
		$delimiters.push(escape_reg_exp($delimiter));
	});

	// Get the numbers
	var $numbers = $string.replace($string_prefix, '').replace(new RegExp($delimiters.join('|'), 'g'), ';').split(';');

	// Add together
	return $numbers.sum();
};

// Escape regular expression
function escape_reg_exp($exp)
{
	return $exp.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


// Tests
// ---------------------------------------------------------------------------------------
describe('Add', function()
{
	it('1) Must return 0 if the string is empty', function()
	{
		$tester.assert(add('') === 0);
	});

	it('2) Must add the string intergers together based on a comma delimiter', function()
	{
		$tester.assert(add('1,2,3') === 6);
	});

	it('3) Must add the string integers together based on custom delimiter', function()
	{
		$tester.assert(add('//&&\n1&&2&&3&&4\n10') === 20);
	});

	it('4) Must return an error if string integers contains a negative value and display these values', function()
	{
		$tester.assert(typeof add('1,2,-3') === 'string');
	});

	it('5) Must add the string integers together that are less than or equal to 1000', function()
	{
		$tester.assert(add('1,2,1001') === 3);
	});

	it('6) Must add the string integers together based on a custom delimiter of any length', function()
	{
		$tester.assert(add('//[***]\n1***2***3') === 6);
	});

	it('7) Must add the string integers together based on multiple custom delimiters of any length', function()
	{
		$tester.assert(add('//[**][%%]\n1**2%%3') === 6);
	});
});


