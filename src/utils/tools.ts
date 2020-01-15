/*
 * @Author: LaoZhang
 * @Date: 2020-01-15 09:11:49
 * @LastEditors  : LaoZhange
 * @LastEditTime : 2020-01-15 09:23:12
 * @Description: 作用
 * @FilePath: /easy-interface-doc/src/utils/tools.ts
 */
const firstUpperCase = (...rests: string[]) => {
  const [ first, ...rest ] = rests;
  first.toUpperCase() + rest.join('')
};

const is = function (type: string) {
	return function (target: any) {
		return ({}).toString.call(target) === `[object ${firstUpperCase(type)}]`
	}
}
//  判断一个对象是否是数组
const isArray = Array.isArray || is('array')
const isString = is('string');
const isObject = is('object');
const isBoolean = is('boolean');
const isNumber = is('number');
const isJSON = (str: string): boolean => {
	if (isObject(str)) return true
	if (!isString(str)) return false;
	str = str.replace(/\s/g, '').replace(/\n|\r/, '');
	if (/^\{(.*?)\}$/.test(str))
		return /"(.*?)":(.*?)/g.test(str);
	if (/^\[(.*?)\]$/.test(str)) {
		return str.replace(/^\[/, '')
			.replace(/\]$/, '')
			.replace(/},{/g, '}\n{')
			.split(/\n/)
			.map(function (s) { return isJSON(s); })
			.reduce(function (prev, curr) { return !!curr; });
	}
	return false;
};
module.exports = {
  is,
  isArray,
  isObject,
  isString,
  isJSON,
  isBoolean,
  isNumber
};