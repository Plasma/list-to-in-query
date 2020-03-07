// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import InQueryBuilder from './InQueryBuilder';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let listToInQueryFunc = (joinValuesUsingNewLine: boolean) => {
		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Select full range if needed
			if (selection.isEmpty) {
				selection = new vscode.Selection(document.positionAt(0), document.positionAt(document.getText().length));
			}

			// Get selected text
			let text = document.getText(selection);

			// Load settings
			const settings = vscode.workspace.getConfiguration('list-to-in-query-builder');
			let indentTextBy: string;
			if (settings.indentUsingTabs) {
				indentTextBy = "\t";
			 } else {
				const tabSizeInSpaces = vscode.workspace.getConfiguration("editor").tabSize;
				indentTextBy = ' '.repeat(tabSizeInSpaces);
			}

			// Create parser
			let parser = new InQueryBuilder();
			let result = parser.getQuery(text, joinValuesUsingNewLine, settings.quoteNumbers, indentTextBy);

			// Write result
			editor.edit(editBuilder => {
				editBuilder.replace(selection, result);
			});
		}
	};

	// Register commands
	context.subscriptions.push(vscode.commands.registerCommand('extension.list-to-in-query.same-line', () => listToInQueryFunc(false)));
	context.subscriptions.push(vscode.commands.registerCommand('extension.list-to-in-query.new-line', () => listToInQueryFunc(true)));
}

// this method is called when your extension is deactivated
export function deactivate() {}
