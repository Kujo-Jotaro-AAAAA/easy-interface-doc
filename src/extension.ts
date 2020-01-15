/*
 * @Author: LaoZhang
 * @Date: 2019-12-27 12:01:13
 * @LastEditors  : LaoZhange
 * @LastEditTime : 2020-01-15 17:39:19
 * @Description: 作用
 * @FilePath: /cli-demo/src/extension.ts
 */
import { TextEditor } from "vscode";

/**
 * 为ts申明文件提供便捷服务
 * 通过快捷键快速的将 yapi 上的接口
 * 改变成一个 interface 文件
 * 
 * 1. 获取当前选中的文本
 * 2. 正则匹配选中的文本
 * 3. 写回原文本
 * 
 * 参考:
 * - 选中
 * https://blog.csdn.net/Marksinoberg/article/details/89355341
 */
// import * as vscode from 'vscode';
const vscode = require('vscode');
const logic = require('./utils/logic');
export function activate(context: any) {

	let disposable = vscode.commands.registerCommand('extension.changeTs', () => {
		const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
		let editSelection = editor.selection; // 选择的内容
		editor.edit((editBuilder: any) => { // 当编辑时调用
			let text = editor.document.getText(editSelection);
			let splitTpl = logic.parseInterface(text);
			// let splitTpl = logic.splitComment(text);
			replaceEditActiveStr(editBuilder, splitTpl)
		});
		
	});
	// 添加到命令栈
	context.subscriptions.push(disposable);
}
/**
 * 替换选中区域的文字
 * @param editBuilder 编辑对象
 * @param tpl 更改的字符模板
 */
function replaceEditActiveStr(editBuilder: any, tpl: string) {
	const {selection} = vscode.window.activeTextEditor;
	const { start , end } = selection;
	let reStart = new vscode.Position(start.line, start.character);
	const reEnd = new vscode.Position(end.line, end.character);
	editBuilder.replace(new vscode.Range(reStart, reEnd), tpl);
}
// this method is called when your extension is deactivated
export function deactivate() {
		vscode.window.showInformationMessage('插件已卸载');
}
