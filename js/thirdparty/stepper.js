(function(){

  var slice = [].slice;
  var extend = function(to, source){
    for(var i in source) to[i] = source[i];
    return to;
  };

  var prefix = function(key, nodot){
    var css = 'stepper-' + key;
    return nodot ? css : '.' + css;
  };

  var make = function(tag, css, children){
    var el = $('<' + tag + ' />').attr({'class': prefix(css, true)});
    if (children) el.append.apply(el, children);
    return el;
  };

  var bind = function(cb, scope){
    return function(){ return cb.apply(scope, slice.call(arguments)); };
  };

  var Node = function(key, cb){
    this.key = key;
    this.cb = cb;
    this.next = null;
    this.prev = null;
  };

  var Stepper = this.Stepper = function(selector){
    this.$el = $($(selector).get(0)); // Cache the jQuery object of the first DOM element retrieved by the selector
    this._buildCanvas();
    this.slides = {};
    this.length = 0;
  };


  Stepper.prototype = extend(Stepper.prototype, {
    _buildCanvas : function(){
      this.$canvas = make('div', 'canvas');
      this.toggle = make('div', 'toggle', [make('a', 'next').attr('href', '#')]);
      this.toggle.find(prefix('next')).text('next').bind('click', bind(this.next, this));
      this.$el.append(this.toggle);
      this.$el.append(this.$canvas);
      var methods = ["start", "stop", "next"];
      for(var i in methods)
        this[methods[i]] = bind(this[methods[i]], this);
    },

    addSlide : function(key, cb){
      var node = new Node(key, cb);
      this.current = (this.current || node);
      this.slides[key] = node;
      if(!(this.head || this.tail)){
        this.head = this.tail = node;
      } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
      this.tail.next = this.head;
      this.head.prev = this.tail;
      var el = make('a', key).attr('href', '#');
      el.text(key);
      this.toggle.find(prefix('next')).before(el);

      el.bind('click', bind(function(e){
        e.preventDefault();
        if(this.paused) return;
        this.clear();
        this.current = node;
        this.toggle.children().removeClass(prefix('active', true));
        el.addClass(prefix('active', true));
        node.cb.apply(this, slice.call(arguments));
      }, this));

      this.length++;
      return this;
    },

    getSlide : function(key){
      return this.slides[key];
    },

    stop : function(){
      this.toggle.addClass(prefix('grayed', true))
      this.paused = true;
    },

    start : function(){
      this.toggle.removeClass(prefix('grayed', true))
      this.paused = false;
    },

    clear : function(){
      this.$canvas.html("");
    },

    _activate : function(node){
      if(this.paused) return false;
      this.toggle.find(prefix(node.key)).trigger('click');
      return node;
    },

    next : function(){
      this._activate(this.current.next);
      return false;
    },

    go : function(){
      return this._activate(this.head);
    }
  });

}).call(this);