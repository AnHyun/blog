## 欢迎来到我的个人博客


### Jquery中each的三种遍历方法

```markdown
1、选择器+遍历
$('div').each(function (i){
   i就是索引值
   this 表示获取遍历每一个dom对象
});

2、选择器+遍历
$('div').each(function (index,domEle){
   index就是索引值
  domEle 表示获取遍历每一个dom对象
});

3、更适用的遍历方法
1）先获取某个集合对象
2）遍历集合对象的每一个元素
var d=$("div");
$.each(d,function (index,domEle){
  d是要遍历的集合
  index就是索引值
  domEle 表示获取遍历每一个dom对
});
```

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```
