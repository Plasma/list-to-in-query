import * as assert from 'assert';
import InQueryBuilder from '../../InQueryBuilder';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Empty result is blank', () => {
		// Arrange
		const builder = new InQueryBuilder();

		// Act
		const result = builder.getQuery("");

		// Assert
		assert.equal("", result);
	});

	test('Can build single item query', () => {
		// Arrange
		const builder = new InQueryBuilder();

		// Act
		const result = builder.getQuery("One");

		// Assert
		assert.equal("(\n\t'One'\n)", result);
	});

	test('Can build multi item query', () => {
		// Arrange
		const builder = new InQueryBuilder();

		// Act
		const result = builder.getQuery("One\r\nTwo\nThree");

		// Assert
		assert.equal("(\n\t'One',\n\t'Two',\n\t'Three'\n)", result);
	});
});
