Stepper
===

A (slightly modified) proper repo for [the Jeff Larson's](http://github.com/thejefflarson) [library for stepper graphics](http://www.propublica.org/nerds/item/anatomy-of-a-stepper-graphic).

Origin story: <https://twitter.com/thejefflarson/status/479039344922329088>

### [Demo](http://mhkeller.github.io/stepper)

# Usage

1. Initialize your stepper object.
2. Add slides.

The library works by creating a div called `stepper-canvas` inside the div of your choice (`#steps` in the example) and modifying its html each time. Get the jQuery reference to the canvas as `this.$canvas` in the `addSlide` callback.

````
$(function(){

	// Initialize your stepper object
  var steps = new Stepper("#steps");

  // Add each slide, setting text through by using the jquery .text method on our canvas.
  steps.addSlide(1, function(){ this.$canvas.text("slide 1"); });

  steps.addSlide(2, function(){ this.$canvas.text("slide 2"); });

  // You can also call this.stop() and this.start() to disable/enable navigation so people can't go to another slide during rendering
  steps.addSlide(3, function(){ 
    this.stop();
    fancyAsyncThing(function(){
      steps.$canvas.text("slide 3"); 
      steps.start();
    });
  });

  // Make it all go
  steps.go();

});
````

#### Tip

* If you don't want to deal with animation in JavaScript, you can also use gifs. Check out the example below.

# Examples in the wild

* [Anatomy of a Deal](http://www.propublica.org/article/freddy-mac-mortgage-eisinger-arnold#how-freddies-investments-work)
* [Tribal Payday Lending 101](http://projects.aljazeera.com/2014/payday-nation/index.html#steps) - Uses animated gifs instead of JavaScript
* [The Rise of the Political Non-profit](http://www.thedailybeast.com/articles/2012/09/17/the-rise-of-the-political-non-profit.html)

#### License

MIT
