/* this 学习 */

/* 第一层：世界尽头
 * 权力最小的大佬是作为备胎的存在，在普通情况下就是全局，浏览器里就是window；
 * 在use strict的情况下就是undefined。 
 * */

/* function showThis() {
	console.log(this);
	
};

function shouStrictThis() {
	'use strict'
	console.log(this);
	
} */

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

 console.log(boss.returnThis() === boss);  //  =>true

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

console.log(boss1.returnThis());  //  => boss1
// console.log(boss2.returnThis());  //  => boss1
console.log(boss3.returnThis());  //  => window

// 把this绑定到boss2
var boss2 = {
   name: 'boss2',
   returnThis: boss1.returnThis
};

console.log(boss2.returnThis());  //  => boss2



