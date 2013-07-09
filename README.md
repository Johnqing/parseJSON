JSON解析函数
=========

JSON的语法必须正确键必须用引号包裹：

<pre>
{'x':1,'y':{'a':2}}
</pre>

+ JSON字符串解析为对象
<pre>
JSON.parse(data);
</pre>
+ JSON对象解析为字符串
<pre>
JSON.stringify(data);
</pre>
