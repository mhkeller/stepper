$(function(){

	// Initialize
  var steps = new Stepper("#steps");
  
  // Creates image tag
  var $img = $("<img>");

  // Array of all images needed
  var stepImages = ['images/slides-01.png', 'images/slides-02.png', 'images/slides-03.png'];

  steps.addSlide(1, function(){ 
    this.$canvas.text("Initialize the object.");
    $img.attr("src", stepImages[0])
    this.$canvas.append($img);
  });

  steps.addSlide(2, function(){ 
  	this.$canvas.text("Start adding slides.");
    $img.attr("src", stepImages[1])
    this.$canvas.append($img);
  });

  steps.addSlide(3, function(){ 
  	this.$canvas.text("Make it go.");
    $img.attr("src", stepImages[2])
    this.$canvas.append($img);
  });

  steps.addSlide(4, function(){ 
  	this.stop();
  	this.$canvas.text("You can also delay navigation while the page is rendering. Wait for it... ");
  	// Cache the reference to `this` so you can still reference it within setTimeout.
  	var that = this;
    setTimeout(function(){
	  	that.$canvas.append("Done!");
	  	that.start();
    }, 3000);
  });

  steps.go();

});