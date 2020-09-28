<template>
  <div class="view">
    <div>
      <h1>#字符串扩展</h1>
      <pre>
      1.'𠮷'.codePointAt(0) > '0xFFFF'
      2.String.fromCodePoint('42245') === "ꔅ"
      3.字符串的遍历器接口 for...of
      4.'𠮷'.at(0) // chrome 报错
      5.ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
      6.includes(), startsWith(), endsWith() // 与之前的indexOf检测字符串中是否包含某个字符
      7.repeat(n) // 将字符串复制n个
      8.padStart()，padEnd()
      9.matchAll()详见《正则的扩展》
      10.模板字符串 反引号标识 `${JavaScript表达式}`
      11.模板编译 // 不是太懂
      12.标签模板 alert`123` 等价于 alert('123')，i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
      13.String.raw()方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串
      </pre>
    </div>
    <div>
      <h1>#数值的扩展</h1>
      <pre>
      1.二进制和八进制表示法:ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
      2.Number.isFinite()-->如果参数不是数值一律返回false, Number.isNaN()
      3.Number.parseInt(), Number.parseFloat()
      4.Number.isInteger()用来判断一个数值是否为整数。
      5.Number.EPSILON
      6.安全整数和 Number.isSafeInteger()
      7.Math 对象的扩展ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。
        1）Math.trunc()方法用于去除一个数的小数部分，返回整数部分。
        2）Math.sign()方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
        3）Math.cbrt()方法用于计算一个数的立方根。
        4）Math.clz32()JavaScript 的整数使用 32 位二进制形式表示，Math.clz32方法返回一个数的 32 位无符号整数形式有多少个前导 0。
        5）Math.imul()方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
        6）Math.fround()
        7）Math.hypot()方法返回所有参数的平方和的平方根。
        8）Math.expm1()返回 ex - 1，即Math.exp(x) - 1。
        9）Math.log1p()方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
        10）Math.log10()返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
        11）Math.log2()返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
        12）ath.sinh(x) 返回x的双曲正弦（hyperbolic sine）
        13）Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
        14）Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
        15）Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
        16）Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
        17）Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
        18）ES2016 新增了一个指数运算符（**）
      </pre>
    </div>
    <div>
      <h1>#函数的扩展</h1>
      <pre>
        1.参数设置默认值
        2.与解构赋值默认值结合使用function foo({x, y = 5} = {}) {console.log(x, y);}
        3.参数默认值的位置:通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
        4.函数的 length 属性:指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后
        5.作用域
        6.rest 参数ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
        7.严格模式:规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
        8.name 属性
        9.箭头函数:var f = v => v;
        10.双冒号运算符obj::obj.fun该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
        11.尾调用优化:就是指某个函数的最后一步是调用另一个函数。
        12.尾递归---很容易发生“栈溢出”错误
        13.函数参数的尾逗号
      </pre>
    </div>
    <div>
      <h1>#数组的扩展</h1>
      <pre>
        1.扩展运算符:扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
          1)复制数组
          2)合并数组
          3)与解构赋值结合
          4)字符串
          5)Map 和 Set 结构，Generator 函数
        2.Array.from()方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
        3.Array.of()方法用于将一组值，转换为数组。
        4.数组实例的 copyWithin()[1, 2, 3, 4, 5].copyWithin(0, 3)// [4, 5, 3, 4, 5]
        5.数组实例的 find() 和 findIndex()  find() ->用于找出第一个符合条件的数组成员。
        6.数组实例的 fill()fill方法使用给定值，填充一个数组。
        7.数组实例的 entries()，keys() 和 values()
        8.数组实例的 includes()
        9.数组的空位 ES6 则是明确将空位转为undefined
      </pre>
    </div>
    <div>
      <h1>#对象的扩展</h1>
      <pre>
        1.属性的简洁表示法const foo = 'bar'; const baz = {foo};baz--> // {foo: "bar"}
        2.属性名表达式obj['a' + 'bc'] = 123;把表达式放在方括号内。
        3.方法的 name 属性
        4.Object.is()
        5.Object.assign()方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。warn: 浅拷贝
        6.属性的可枚举性和遍历
          1）for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
          2）Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
          3）Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
          4）Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
          5）Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
        7.Object.getOwnPropertyDescriptors()ES2017 引入了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象。
        8.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
        9.super 关键字
        10.Object.keys()，Object.values()，Object.entries()
        11.对象的扩展运算符let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
      </pre>
    </div>
  </div>
</template>

<script>

export default {
  name: 'use-extend',
  data() {
    return {}
  },
}
</script>

<style scoped lang="stylus">
  .view
    height 80vh
    overflow scroll
</style>
