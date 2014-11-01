/* jQuery.Class by Jixun; MIT License */

;(function ($, undefined) {
	var batchBind = function (ctx, source, out) {
		if ($.isPlainObject(source)) {
			$.each(source, function (name, val) {
				var _val, _def;

				if ($.isFunction(val)) {
					ctx[name] = out[name] = function () {
						return val.apply (ctx, arguments);
					};
				} else if (out.hasOwnProperty(name)) {
					// Let parent handler resolve this.
					out[name] = val;
				} else {
					// Public or private value
					_val = val;
					_def = {
						get: function ( ) { return _val; },
						set: function (n) { _val = n;    },
						enumerable:   true,
						configurable: true
					};

					// Bind on both of them.
					Object.defineProperty (ctx, name, _def);
					Object.defineProperty (out, name, _def);
				}

			});
		}
	};

	$.ClassCreate = function (base, parent, public, private, static, constant) {
		var _cls = function () {
			var ctx = {};

			// Init class
			var _parent = $.isFunction (parent) ? parent.apply (null, arguments) : null;
			// Backup parent
			var _super  = $.extend ({}, _parent);
			

			// Resolve parent public stuff
			var _public  = {};
			Object.keys (_parent || {}).forEach (function (key) {
				var _def = {
					get: function ()  { return _parent[key]; },
					set: function (n) { _parent[key] = n   ; },

					enumerable:   true,
					configurable: true
				};

				Object.defineProperty (ctx,     key, _def);
				Object.defineProperty (_public, key, _def);
			});
			batchBind (ctx, public,  _public , _parent);

			var _private = {};
			batchBind (ctx, private, _private, {});

			// Extend context
			$.extend (ctx, _public, _private);


			if ($.isFunction (base))
				base.apply (ctx, arguments);

			$.extend (ctx, {
				_public:  _public,
				_private: _private,
				super:    _super
			});

			// _public.ctx = ctx;

			return _public;
		};

		if ($.isPlainObject (constant)) {
			$.each (constant, function (constName, constValue) {
				var c = constant[constName];

				Object.defineProperty (_cls, constName, {
					get: function () { return $.extend ({}, c); },
					set: function () {}
				})
			});
		}
	
		$.extend (_cls, static);

		return _cls;
	};


	$.Class = function (opts) {
		opts = $.extend ({
			constructor	: null,
			parent		: null,
			public		: null,
			private		: null,
			static		: null,
			constant	: null
		}, opts);

		return $.ClassCreate (
			opts.constructor,
			opts.parent,
			opts.public,
			opts.private,
			opts.static,
			opts.constant
		);
	};
})(jQuery);