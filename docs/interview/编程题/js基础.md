---
{
  "title": "js基础",
}
---

## 一、JavaScript基础

> 前端工程师吃饭的家伙，深度、广度一样都不能差。


### 手写call函数

```
    Function.prototype._call = function(context) {
      if (typeof this !== 'function') {
        throw new Error('call must be a function')
      }

      let args = [...arguments].slice(1);

      const fn = Symbol('fn');
      context = context || window;
      context[fn] = this;
      let result = context[fn](...args);
      delete context[fn];
      return result;
    }
```

### 手写apply函数

```
    Function.prototype._apply = function(context, args) {
      if (typeof this !== 'function') {
        throw new Error('call must be a function')
      }

      const fn = Symbol('fn');
      context = context || window;
      context[fn] = this;
      let result = context[fn](...args);
      delete context[fn];
      return result;
    }
```

### 手写bind函数

```
  	Function.prototype._bind = function(context) {
      if (typeof this !== 'function') {
        throw new Error('bind must be on a function')
      }
      let _this = this;
      let args = Array.prototype.slice.call(arguments, 1);
      let nop = function() {};

      let fn = function() {
        return _this.apply(this instanceof _this 
        	? this 
        	: context, args.concat(Array.prototype.slice.call(arguments)))
      }

      if (this.prototype) {
        nop.prototype = this.prototype;
      }
      fn.prototype = new nop();
      return fn;
    }
```

### 手写new函数

```
  	function _new(con, ...args) {
      let obj = Object.create(con.prototype);
      let result = con.apply(obj, args)
      return result instanceof Object ? result : obj;
    }
```

### 手写create函数

```
  	Object.prototype._create = function(obj) {
      function f() {};
      f.prototype = obj;
      return new f();

    }

    function _instanceof(l, r) {
    	var o = r.prototype;
    	l = l.__proto__;

    	while(true) {
    		if (l === null ) return false;
    		if (l === o) return true;
    		l = l.__proto__;
    	}
    }
```

### 手写instanceof函数

```
    function _instanceof(l, r) {
    	var o = r.prototype;
    	l = l.__proto__;

    	while(true) {
    		if (l === null ) return false;
    		if (l === o) return true;
    		l = l.__proto__;
    	}
    }

```

### 手写isArray函数

```
	function _isArray(o) {
    	return Object.prototype.toStirng.call(o) === '[object Array]';
    }
```

### findIndex实现

```
Array.prototype.findIndex = function(fn) {
  for(let i = 0; i < this.length; i++) {
    if(fn(this[i], i, this)) {
      return i;
    }
  }
}
```

### async函数错误统一捕获

```
/**
 * async函数错误统一捕获
 * @param {func}  async函数
 * @return {Array} 
 */
async function errorCaptured(asyncFunc) {
  try {
    let res = await asyncFunc()
    return [null, res]
  } catch (err) {
    return [err, null]
  }
}
```

### compose函数

```
/**
 * compose函数 函数执行从右到左
 * @param {any} 
 * @return {any} 
 */
 function compose(...fns) {
   return function(x) {
     return fns.reduceRight(function(arg, fn) {
       return fn(arg)
     }, x)
   }
 }
```

### pipeline管道函数

```
 /**
 * pipeline管道函数 函数执行从左到右
 * @param {any} 
 * @return {any} 
 */
 function compose(...fns) {
   return function(x) {
     return fns.reduce(function(arg, fn) {
       return fn(arg)
     }, x)
   }
 }
```

### 节流函数

```
	function throttle(fn, wait) {
    	let canRun = true;

    	return function() {
            let context = this;
            let args = arguments;

    		if (!canRun) return;
            canRun = false;

            setTimeout(function() {
                fn.apply(context, args)
                canRun = true;
            }, wait)
    	}

    }
```

### 防抖函数

```
	function debounce(fn, wait, immediate) {
    	let timeout;
        
        return function() {
            let context = this;
            let args = arguments;

            timeout && clearTimeout(timeout);

            if (immediate) {
                let callNow = !timeout;
                timeout = setTimeout(function() {
                    fn.apply(context, args)
                }, wait) 

                if (callNow) fn.apply(context, args)
            } else {
                timeout = setTimeout(function() {
                    fn.apply(context, args)
                }, wait) 
            }
        }
    }
      
```

### 数组扁平化

```
	function _flat(arr) {
    	if (!Array.isArray(arr)) {
    		throw new Error('it is not array')
    	}
    	return arr.reduce((pre, cur) => {
    		return pre.concat(Array.isArray(cur) ? _flat(cur) : cur);
    	}, [])
    }
    function _flat(arr) {
        if (!Array.isArray(arr)) {
        throw new Error('it is not array')
        }
        while (arr.some(item => Array.isArray(item))) {
           arr = [].concat(...arr)
        }
        return arr
    }
    function _flat(arr) {
        if (!Array.isArray(arr)) {
        throw new Error('it is not array')
        }
        return arr.join(',').split(',').map(item => Number(item))
    }
      
```

### 数组去重

```
	function _unique(arr) {
        return [...new Set(arr)]
    }
    function _unique(arr) {
        let obj = {}
        return arr.filter((item, index) => {
            return obj.hasOwnProperty(typeof item + item) 
                ? false 
                : (obj[typeof item + item] = true)
        })
    }
    function _unique(arr) {
        return arr.filter((item, index) => {
            return arr.indexOf(item) === index;
        })
    }
    function _unique(arr) {
        let array = [];
        for (let i = 0; i < arr.length; i++) {
            if (!Array.inclueds(arr[i])) {
                array.push(arr[i])
            }
        }
        return array
    }
      
```

### Promise 实现原理

```
  // 先定义三个常量表示状态
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    // 新建 MyPromise 类
    class MyPromise {
      constructor(executor){
        // executor 是一个执行器，进入会立即执行
        // 并传入resolve和reject方法
        try {
          executor(this.resolve, this.reject)
        } catch (error) {
          this.reject(error)
        }
      }

      // 储存状态的变量，初始值是 pending
      status = PENDING;
      // 成功之后的值
      value = null;
      // 失败之后的原因
      reason = null;

      // 存储成功回调函数
      onFulfilledCallbacks = [];
      // 存储失败回调函数
      onRejectedCallbacks = [];

      // 更改成功后的状态
      resolve = (value) => {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
          // 状态修改为成功
          this.status = FULFILLED;
          // 保存成功之后的值
          this.value = value;
          // resolve里面将所有成功的回调拿出来执行
          while (this.onFulfilledCallbacks.length) {
            // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
            this.onFulfilledCallbacks.shift()(value)
          }
        }
      }

      // 更改失败后的状态
      reject = (reason) => {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
          // 状态成功为失败
          this.status = REJECTED;
          // 保存失败后的原因
          this.reason = reason;
          // resolve里面将所有失败的回调拿出来执行
          while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(reason)
          }
        }
      }

      then(onFulfilled, onRejected) {
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
        const promise2 = new MyPromise((resolve, reject) => {
          const fulfilledMicrotask = () =>  {
            // 创建一个微任务等待 promise2 完成初始化
            queueMicrotask(() => {
              try {
                // 获取成功回调函数的执行结果
                const x = realOnFulfilled(this.value);
                // 传入 resolvePromise 集中处理
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error)
              } 
            })  
          }

          const rejectedMicrotask = () => { 
            // 创建一个微任务等待 promise2 完成初始化
            queueMicrotask(() => {
              try {
                // 调用失败回调，并且把原因返回
                const x = realOnRejected(this.reason);
                // 传入 resolvePromise 集中处理
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error)
              } 
            }) 
          }
          // 判断状态
          if (this.status === FULFILLED) {
            fulfilledMicrotask() 
          } else if (this.status === REJECTED) { 
            rejectedMicrotask()
          } else if (this.status === PENDING) {
            // 等待
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功失败函数的时候再传递
            this.onFulfilledCallbacks.push(fulfilledMicrotask);
            this.onRejectedCallbacks.push(rejectedMicrotask);
          }
        }) 
        
        return promise2;
      }

      // resolve 静态方法
      static resolve (parameter) {
        // 如果传入 MyPromise 就直接返回
        if (parameter instanceof MyPromise) {
          return parameter;
        }

        // 转成常规方式
        return new MyPromise(resolve =>  {
          resolve(parameter);
        });
      }

      // reject 静态方法
      static reject (reason) {
        return new MyPromise((resolve, reject) => {
          reject(reason);
        });
      }
    }

    function resolvePromise(promise2, x, resolve, reject) {
      // 如果相等了，说明return的是自己，抛出类型错误并返回
      if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }
      // 判断x是不是 MyPromise 实例对象
      if(x instanceof MyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        x.then(resolve, reject)
      } else{
        // 普通值
        resolve(x)
      }
    }
      
```

### async 函数的实现原理

```
	function spawn(genFunc) {
	  return new Promise(function(resolve, reject) {
	    const gen = genFunc();

	    function step(nextFunc) {
	      let next;
	      try {
	        next = nextFunc()
	      } catch(e) {
	        return reject(e)
	      }

	      if(next.done) {
	        return resolve(next.value);
	      }

	      Promise.resolve(next.value).then(
	        function(v) {
	          step(function() {
	            return gen.next(v)
	          })
	        },

	        function(e) {
	          setp(function() {
	            return gen.throw(e)
	          })
	        }
	      )
	    }

	    step(function() {
	      return gen.next(undefined)
	    })
	  })
	}
```

### vue响应式原理简单实现

```
	/**
   * vue响应式原理
   * 基于Object.defineProperty
   */

  let data = {price: 5, quantity: 2}
  let target = null
  class Dep {
    constructor() {
      this.subscribers = [];
    }
    depend() {
      if(target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
        console.log('depend', this.subscribers)
      }
    }
    notify() {
      this.subscribers.forEach(sub => sub())
      console.log('notify', this.subscribers)
    }
  }
 

  Object.keys(data).forEach(key => {
    let internalVale = data[key]

    const dep = new Dep()
    console.log('dep', dep)

    Object.defineProperty(data, key, {
      get() {
        console.log(`get value ${internalVale}`)
        dep.depend()
        return internalVale
      },
      set(newVal) {
        console.log(`set value ${newVal}`)
        internalVale = newVal;
        dep.notify()
      }
    })
  })

  function watcher(fn) {
    target = fn;
    target();
    target = null
    console.log('watcher')
  }

  watcher( _ => {
    data.total = data.price * data.quantity
    console.log(data.total)
  })


  /**
   * vue响应式原理
   * 基于Proxy
   */

  let data = { price:5, quantity: 2 };
  let target = null;

  class Dep {
    constructor () {
      this.subscribers = [];
    }
    depend () {
      if (target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
        console.log('depend', this.subscribers)
      }
    }
    notify() {
      this.subscribers.forEach(sub => sub())
      console.log('notify', this.subscribers)
    }
  }

  let deps = new Map();
  Object.keys(data).forEach(key => {
    deps.set(key, new Dep());
  })
  console.log(deps)

  let data_without_proxy = data;
  data = new Proxy(data_without_proxy, {
    get(obj, key) {
      deps.get(key).depend();
      return obj[key];
    },
    set(obj, key, newVal) {
      obj[key] = newVal;
      deps.get(key).notify()
      return true;
    }
  })

  function watcher(func) {
    target = func;
    target();
    target = null;
  }
  let total = 0;
  watcher(() => {
    total = data.price * data.quantity;
  })
      
```
