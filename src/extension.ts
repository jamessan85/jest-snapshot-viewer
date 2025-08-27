// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {previewSnapshot, createTempIfNotFound} from "./createViewer";


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const viewDefault = vscode.commands.registerCommand('snapshot-viewer.viewSnapshot', () => {
		createTempIfNotFound();
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if (vscode.window.activeTextEditor?.document.fileName.endsWith(".snap")) {
			previewSnapshot(vscode.window.activeTextEditor?.document.fileName);	
		} else {
			vscode.window.showErrorMessage('File selected does not end in .snap');
		}
	});

	context.subscriptions.push(viewDefault);

	const viewVSCode = vscode.commands.registerCommand('snapshot-viewer.viewSnapshotVsCode', () => {
		createTempIfNotFound();
		const fileLocation = vscode.window.activeTextEditor?.document.fileName;
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if (fileLocation?.endsWith(".snap")) {
			const endFileName = fileLocation.split("/").at(-1);
			const panel = vscode.window.createWebviewPanel(`viewSnapshot${endFileName}`, `Snapshot preview for ${endFileName}`, vscode.ViewColumn.Beside);
			panel.webview.html = previewSnapshot(fileLocation, "div", "vscode");	
			const watcher = vscode.workspace.createFileSystemWatcher(fileLocation);
			watcher.onDidChange((uri) => {
				panel.webview.html = previewSnapshot(fileLocation, "div", "vscode");	
			});
		} else {
			vscode.window.showErrorMessage('File selected does not end in .snap');
		}
	});

	context.subscriptions.push(viewVSCode);
}

// This method is called when your extension is deactivated
export function deactivate() {}
