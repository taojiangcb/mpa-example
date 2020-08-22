# bigpipe 

是指服务端在吐出结果的时候以字节流的形式进行输出，节约对业务层进行编码转换的过程。好处在高pv request 的时候有对输出有一定优化作用.

```
const http = request('http');
let s = '';
for (let i = 0; i < 1024 * 10; i++) {
  s += 'a';
} 

const str = s;
// transform 成 buffter 流
const bufStr = Buffer.from(s);
const server = http.crateServer((req,res) => {
  if(req.url === '/buffer') {
    //进行buff输出
    res.end(bufStr);
  }
  else if(req.url === '/string') {
    res.end(str);
  }
})

server.listen(3000);
```

### 如果确定是否 bigpiple 
在 request Header 中检查 Transform-Encoding:chunked （表示开启 bigpiple）

