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
		const result = builder.getQuery("", true, true);

		// Assert
		assert.equal("", result);
	});

	test('Can build single item query', () => {
		// Arrange
		const builder = new InQueryBuilder();

		// Act
		const result = builder.getQuery("One", true, true);

		// Assert
		assert.equal("(\n\t'One'\n)", result);
	});

	test('Can build multi item query - join with new line and comma', () => {
		// Arrange
		const builder = new InQueryBuilder();

		// Act
		const result = builder.getQuery("One\r\nTwo\nThree", true, true);

		// Assert
		assert.equal("(\n\t'One',\n\t'Two',\n\t'Three'\n)", result);
	});

	test('Can build multi item query - join with comma only', () => {
		// Arrange
		const builder = new InQueryBuilder();

		// Act
		const result = builder.getQuery("One\r\nTwo\nThree", false, true);

		// Assert
		assert.equal("('One', 'Two', 'Three')", result);
	});

	test('Can build multi item query - do not quote numbers', () => {
		// Arrange
		const builder = new InQueryBuilder();

		// Act
		const result = builder.getQuery("One\r\n2\n3.5\nFour", false, false);

		// Assert
		assert.equal("('One', 2, 3.5, 'Four')", result);
	});
});
