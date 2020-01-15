<!--
 * @Author: LaoZhang
 * @Date: 2019-12-27 12:01:13
 * @LastEditors  : LaoZhange
 * @LastEditTime : 2020-01-15 10:15:25
 * @Description: 作用
 * @FilePath: /easy-interface-doc/README.md
 -->
# Easy-Interface-Doc

快速生成 interface 文档工具, 针对后端 mock 出来的json 自动生成对应的类型.

```json
{
  "name": "小白",
  "age": 12,
  "isMarry": false
}
```

`=>`

```ts
interface Test {
  name: string;
  age: number;
  isMarry: boolean;
}

```

## 版本

`0.0.1`: 仅粗暴的支持整个选中 yapi 文档替换的情况。不支持递归。