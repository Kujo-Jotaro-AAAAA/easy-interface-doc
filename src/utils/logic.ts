/*
 * @Author: LaoZhang
 * @Date: 2020-01-08 15:05:54
 * @LastEditors  : LaoZhange
 * @LastEditTime : 2020-01-15 09:21:50
 * @Description: 作用
 * @FilePath: /cli-demo/src/utils/logic.ts
 */
const tools = require('./tools');
/**
 * @description: 函数注释前面的长度
 * @param {Object} editor 当前激活文件
 * @return: lineSpace：前面的长度，frontStr：函数注释第一行的长度，line:当前行(数字)，nextLine 激活行的下一行是否有内容
 */
const lineSpaceFn = (editor: any) => {
  const line = editor.selection.active.line; // 当前行
  const lineProperty = editor.document.lineAt(line); // 当前行的属性
  let lineFirst = lineProperty.firstNonWhitespaceCharacterIndex; // 激活行 前面是否有值
  let lineSpace,
    nextLine,
    frontStr = ''; // 前面空几行
  const activeLine = editor.selection.active.line; // 激活行 行号
  // 判断当前行有没有内容 决定选择当前行还是下一行的长度
  if (
    lineProperty.isEmptyOrWhitespace &&
    editor._documentData.document.lineCount !== activeLine + 1
  ) {
    nextLine = activeLine + 1;
    lineSpace = editor.document.lineAt(nextLine)
      .firstNonWhitespaceCharacterIndex;
    lineFirst = lineFirst === 0 ? lineSpace : 0;
    frontStr = ''.padStart(lineFirst);
  } else {
    lineSpace = lineFirst;
  }
  return [lineSpace, frontStr, line, nextLine];
};

/**
 * @description 将匹配的字符转换成 key: value 的格式
 * @param text 
 * @returns `{"key": "value"}`
 */
const parseInterface = (text: string) => {
  let replaceText = text.replace(/".*,/gi, (str: string) => {
    const [ key , value ] = str.split(':');
    let keyCode = determineKey(key);
    let valueCode = determineStringValueType(value);
    return `${keyCode}: ${valueCode}`
  });
  return replaceText
}
/**
 * @description 转换 key
 * @param key 
 */
const determineKey = (key: string) => {
  return key.substring(1, key.length -1);
}
/**
 * @description 判断并转换对应类型的字符
 * @param value 
 */
const determineValueType = (type: any) => {
  // const { isObject, isArray, isString, isBoolean, isNumber } = tools;
  // let targetType: string;
  return typeof type;
}
/**
 * @description 解析字符串所属类型
 * @param value 
 * @returns 返回类型
 */
const determineStringValueType = (value: string) => {
  let str = String(value).trim().substring(0, value.length - 1)
  if (/"|'/g.test(str)) return 'string;'; // 有引号就代表是字符串类型
  if ( /\d/g.test(str) ) return 'number;';
  if ( /true|false/g.test(str) ) return 'boolean;';
}

/**
 * @description JSON方法解析
 * @param text 
 */
const splitComment = (text: string) => {
  const comments: any[] = [];
  let replaceText = text.replace(/\/\/.*\n/g, (comment: string) => {
    comments.push(comment);
    return '';
  });
  const parseReplaceText = JSON.parse(replaceText);
  let result = `{\n`;
  Object.keys(parseReplaceText).map((key, idx: number) => {
    let currCommentVal = comments[idx];
    let value = parseReplaceText[key];
    let typeValue = `${determineValueType(value)}; ${currCommentVal}`;
    result += `${key}: ${typeValue}`
  });
  return `${result}}` 
}
module.exports = {
  lineSpaceFn,
  parseInterface,
  splitComment
};