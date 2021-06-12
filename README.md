## jQuery.Class
A Java-like class constructor that supports `private` and `parent`.

NOTE: DO NOT USE THIS REPO! Use the [native JS class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) instead.

## Dependency
+ [jQuery](http://jQuery.com) for some handy functions.

## API
```js
var ClassOjbect = jQuery.Class ({
	constructor	: fnConstructor,
	parent		: fnParent,
	public		: { ... },
	private		: { ... },

	// Following are with class it self, not instance.
	static		: { ... },
	constant	: { ... }
});
```

## Example
```js
var Animal = $.Class ({
	constructor: function (name, age) {
		this.setName (name);
		this.setAge  (age);
	},

	public: {
		getName: function () { return this.name ; },
		setName: function (n) {
			if ('string' == typeof n && n.length > 0)
				this.name = n;
		},

		getAge: function () { return this.age ; },
		setAge: function (age) {
			if ('number' == typeof age && age > 0)
				this.age = age;
		},

		toString: function () {
			return 'Name: ' + this.name + '; ' + this.age + ' years old.';
		}
	},

	private: {
		name: '',
		age:  0
	}
});

// Inherited from Animal
var Human = $.Class ({
	parent: Animal,

	public: {
		/* overide */
		setAge: function (age) {
			var _age = parseInt (age);
			if (_age > 0 && _age < 121)
				this.super.setAge (_age);
		}
	}
});

var jixun = new Human ('Jixun', 57);
var neko = new Animal ('Cat', 10);

// Public function
neko.getName () ; // Cat
// Public function from parent
jixun.getName (); // Jixun
jixun.getAge  (); // 57

// Private value
jixun.age ;       // undefined
neko.name ;       // undefined
neko.age  ;       // undefined
```
