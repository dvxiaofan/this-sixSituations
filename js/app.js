/* this 学习 */

/* 第一层：世界尽头
 * 权力最小的大佬是作为备胎的存在，在普通情况下就是全局，浏览器里就是window；
 * 在use strict的情况下就是undefined。 
 * */

function showThis() {
	console.log(this);
	
};

function shouStrictThis() {
	'use strict'
	console.log(this);
	
}

// showThis(); // => window
// shouStrictThis();  //  => undefined

/**  第二层：点石成金
 * 第二层大佬说白了就是找这个函数前面的点  .  。
 * 如果用到this的那个函数是属于某个 context object 的，那么这个 context object 绑定到this。
 * 比如下面的例子，boss是returnThis的 context object ，或者说returnThis属于boss。 
 * */

 var boss = {
	 name: 'boss',
	 returnThis () {
		 return this;
	 }
 };

//  console.log(boss.returnThis() === boss);  //  =>true
 
// 下面这个例子就要小心点

var boss1 = {
	name: 'boss1',
	returnThis () {
		return this;
	}
};

// var boss2 = {
// 	name: 'boss2',
// 	returnThis () {
// 		return boss1.returnThis();
// 	}
// };

var boss3 = {
	name: 'boss3',
	returnThis () {
		var returnThis = boss1.returnThis;
		return returnThis();
	}
};

// console.log(boss1.returnThis());  //  => boss1
// console.log(boss2.returnThis());  //  => boss1
// console.log(boss3.returnThis());  //  => window

// 把this绑定到boss2
var boss2 = {
	name: 'boss2',
	returnThis: boss1.returnThis
};

// console.log(boss2.returnThis());  //  => boss2

/*  第三层：指腹为婚 
 * 第三层大佬是Object.prototype.call和Object.prototype.apply，它们可以通过参数指定this。（
 * 注意this是不可以直接赋值的哦，this = 2会报ReferenceError。） 
 * */

 function returnThis() {
	return this; 
 };

 var boss1 = {name: 'boss1'};

//  console.log(returnThis());				// => window
//  console.log(returnThis.call(boss1));	// => boss1
//  console.log(returnThis.apply(boss1));	// => boss1
 
 /*  第四层：海誓山盟 
  * 第四层大佬是Object.prototype.bind，
  * 他不但通过一个新函数来提供永久的绑定，
  * 还会覆盖第三层大佬的命令。
  * */

  function returnThis() {
	  return this;
  };
 
  var boss1 = { name: 'boss1'};

  var boss1ReturnThis = returnThis.bind(boss1);

//   console.log(boss1ReturnThis());	// => boss1

  var boss2 = { name: 'boss2'};
//   console.log(boss1ReturnThis.call(boss2));	// => boss1
  
  /* 第五层：内有乾坤 
   * 一个比较容易忽略的会绑定this的地方就是new。
   * 当我们new一个函数时，就会自动把this绑定在新对象上，然后再调用这个函数。
   * 它会覆盖bind的绑定。
   * */

   function showThis() {
	   console.log(this);
   };

//    showThis();		// => window
//    new showThis();	// => showThis

   var boss1 = {name: 'boss1'};
//    showThis.call(boss1);	// => boss1
//    new showThis.call(boss1);	// => TypeError

   var boss1ShowThis = showThis.bind(boss1);
//    boss1ShowThis();		// => boss1
//    new boss1ShowThis();	// => showThis

/* 第六层：军令如山
 * 最后一个法力无边的大佬就是 ES2015 的箭头函数。
 * 箭头函数里的this不再妖艳，被永远封印到当前词法作用域之中，称作 Lexical this ，
 * 在代码运行前就可以确定。没有其他大佬可以覆盖。
 * 这样的好处就是方便让回调函数的this使用当前的作用域，不怕引起混淆。
 * 所以对于箭头函数，只要看它在哪里创建的就行。 
 * */

 function callback(cb) {
	 cb();
 };

//  callback(() => {console.log(this); });		// =>window

 var boss1 = {
	 name: 'boss1',
	 callback: callback,
	 callback2() {
		 callback(() => {console.log(this);
		 });
	 }
 };

//  boss1.callback(() => {console.log(this); });	// => window
//  boss1.callback2(() => {console.log(this); });	// => boss1

/* 下面这种奇葩的使用方式就需要注意： */

// var returnThis = () => this
// returnThis() // window
// new returnThis() // TypeError
// var boss1 = {
//   name: 'boss1',
//   returnThis () {
//     var func = () => this
//     return func()
//   }
// }

var returnThis = () => this
// console.log(returnThis());			// => window

// console.log(new returnThis());	// => TypeError

var boss1 = {
	name: 'boss1',
	returnThis() {
		var func = () => this
		return func();
	}
}

console.log(returnThis.call(boss1));	// => window

var boss1ReturnThis = returnThis.bind(boss1);
console.log(boss1ReturnThis());			// => window

console.log(boss1.returnThis());		// => boss1

var boss2 = {
	name: 'boss2',
	returnThis: boss1.returnThis
};

console.log(boss2.returnThis());		// => boss2


