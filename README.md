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

