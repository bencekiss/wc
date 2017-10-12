/* Word Clock written in the Swiss German dialect of Bern */

/* Magic Mirror
 * Module: Bern Word Clock
 *
 * By Sebastian Plattner https://www.sebastianplattner.ch
 * MIT Licensed.
 */

Module.register("MMM-bernwordclock",{

	// Define module defaults
	defaults: {
		updateInterval: 1000,
	},

	// Define required scripts.
	getStyles: function() {
		return ["bernwordclock.css"];
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

		// Set Interval for Update
		var self = this;
		setInterval(function() {
			self.updateClock();
		}, this.config.updateInterval);
	},

	el: function(selector) {
	  return document.querySelector(selector);
	},

	setClockElOn: function(selector) {
	  this.el(selector).classList.add('on');
	},

	setPrefixElOn: function(number) {
	  var prefixElements = document.querySelectorAll('.prefix');
	  prefixElements[number-1].classList.add('on');
	},

	setSuffixElOn: function(number) {
	  if(number == 13) number = 1;
	  var suffixElements = document.querySelectorAll('.suffix');
	  suffixElements[number-1].classList.add('on');
	},

	setMinutes: function(minutes) {
	  minutes = minutes.toString().split('');

	  switch(parseInt(minutes[0], 10)) {
	    case 2:
	      this.setClockElOn('.twenty-minutes');
	      break;
	    case 3:
	      this.setClockElOn('.thirty-minutes');
	      break;
	    case 4:
	      this.setClockElOn('.forty-minutes');
	      break;
	    case 5:
	      this.setClockElOn('.fifty-minutes');
	      break;
	  }

	  if(minutes % 10 != 0) {
	    this.setSuffixElOn(parseInt(minutes[1], 10))
	  }
	},

	clearClock: function() {
	  var allNodeList = document.querySelectorAll('*');
		var allElements = Array.prototype.slice.call(allNodeList, 0);
	  allElements.forEach(function(element) {
	    element.classList.remove('on');
	  });
	},

	/** Main / Update Clock
	----------------------------------------------------------------------------- */
	updateClock: function() {
	  var date = moment();
	  var hour = date.hours();
	  var minutes = date.minutes();

	  var month = moment().format("MM");
	  var day = moment().format("DD");



	  // Convert 24 hour time to 12 hour
	  if (hour >= 13) hour = hour-12;
	  if (hour == 0) hour = 12;

	  // 'Turn off' all clock elements
	  this.clearClock();

	  if (month == "10" && day == "12") {
  		document.querySelector('.anniversary').classList.add("on");
	  }
	  // One minute past [hour]
	  if(minutes == 1) {
	    this.setClockElOn('.one');
	    this.setClockElOn('.minute');
	    this.setClockElOn('.past');
	    this.setSuffixElOn(hour);
	    return;
	  }

	  // [minutes] past [hour]
	  if(minutes <= 12 && minutes >= 2) {
	    this.setPrefixElOn(minutes);
	    this.setClockElOn('.minutes');
	    this.setClockElOn('.past');
	    this.setSuffixElOn(hour);
	    return;
	  }

	  switch(minutes) {
	    // [hour] o'clock
	    case 0:
	      this.setPrefixElOn(hour);
	      this.setClockElOn('.oclock');
	      return;
	    // [hour] [minutes]
	    case 13:
	      this.setPrefixElOn(hour);
	      this.setClockElOn('.thirteen');
	      return;
	    case 14:
	      this.setPrefixElOn(hour);
	      this.setClockElOn('.fourteen');
	      return;
	    case 16:
	      this.setPrefixElOn(hour);
	      this.setClockElOn('.sixteen');
	      return;
	    case 17:
	      this.setPrefixElOn(hour);
	      this.setClockElOn('.seventeen');
	      return;
	    case 18:
	      this.setPrefixElOn(hour);
	      this.setClockElOn('.eighteen');
	      return;
	    case 19:
	      this.setPrefixElOn(hour);
	      this.setClockElOn('.nineteen');
	      return;
	    // quarter past [hour]
	    case 15:
	      this.setClockElOn('.quarter');
	      this.setClockElOn('.past');
	      this.setSuffixElOn(hour);
	      return;
	    // twenty past [hour]
	    case 20:
	      this.setClockElOn('.twenty');
	      this.setClockElOn('.past');
	      this.setSuffixElOn(hour);
	      return;
	    // half past [hour]
	    case 30:
	      this.setClockElOn('.half');
	      this.setClockElOn('.past');
	      this.setSuffixElOn(hour);
	      return;
	    // half to [next hour]
	    case 40:
	      this.setClockElOn('.twenty');
	      this.setClockElOn('.to');
	      this.setSuffixElOn(hour+1);
	      return;
	    // quarter to [next hour]
	    case 45:
	      this.setClockElOn('.quarter');
	      this.setClockElOn('.to');
	      this.setSuffixElOn(hour+1);
	      return;
	    // ten to [next hour]
	    case 50:
	      this.setClockElOn('.ten');
	      this.setClockElOn('.to');
	      this.setSuffixElOn(hour+1);
	      return;
	    // five to [next hour]
	    case 55:
	      this.setClockElOn('.five');
	      this.setClockElOn('.to');
	      this.setSuffixElOn(hour+1);
	      return;
  	}

		  // [hour] [minutes]
	  this.setPrefixElOn(hour);
	  this.setMinutes(minutes);
	},

	// Override dom generator.
	getDom: function() {

		var wrapper = document.createElement("div");	
		wrapper.classList.add("clock-grid");

		wrapper.innerHTML = "<clock class=\"clock\">" + 
		"<word class=\"one prefix\"><glyph>o</glyph><glyph>n</glyph><glyph>e</glyph></word>" + 
		"<word class=\"two prefix\"><glyph>t</glyph><glyph>w</glyph><glyph>o</glyph></word>" + 
		"<word class=\"three prefix\"><glyph>t</glyph><glyph>h</glyph><glyph>r</glyph><glyph>e</glyph><glyph>e</glyph></word>" + 
		"<word class=\"four prefix\"><glyph>f</glyph><glyph>o</glyph><glyph>u</glyph><glyph>r</glyph></word>" + 
		"<glyph>s</glyph><glyph>a</glyph><glyph>t</glyph>" + 
		"<word class=\"five prefix\"><glyph>f</glyph><glyph>i</glyph><glyph>v</glyph><glyph>e</glyph></word>" + 
		"<word class=\"six prefix\"><glyph>s</glyph><glyph>i</glyph><glyph>x</glyph></word>" + 
		"<word class=\"seven prefix\"><glyph>s</glyph><glyph>e</glyph><glyph>v</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<glyph>b</glyph><glyph>e</glyph>" + 
		"<word class=\"eight prefix\"><glyph>e</glyph><glyph>i</glyph><glyph>g</glyph><glyph>h</glyph><glyph>t</glyph></word>" + 
		"<word class=\"nine prefix\"><glyph>n</glyph><glyph>i</glyph><glyph>n</glyph><glyph>e</glyph></word>" + 
		"<word class=\"ten prefix\"><glyph>t</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<glyph>s</glyph><glyph>o</glyph><glyph>o</glyph><glyph>n</glyph>" + 
		"<word class=\"eleven prefix\"><glyph>e</glyph><glyph>l</glyph><glyph>e</glyph><glyph>v</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<word class=\"twelve prefix\"><glyph>t</glyph><glyph>w</glyph><glyph>e</glyph><glyph>l</glyph><glyph>v</glyph><glyph>e</glyph></word>" + 
		"<word class=\"half\"><glyph>h</glyph><glyph>a</glyph><glyph>l</glyph><glyph>f</glyph></word>" + 
		"<word class=\"quarter\"><glyph>q</glyph><glyph>u</glyph><glyph>a</glyph><glyph>r</glyph><glyph>t</glyph><glyph>e</glyph><glyph>r</glyph></word>" + 
		"<word class=\"minutes\"><word class=\"minute\"><glyph>m</glyph><glyph>i</glyph><glyph>n</glyph><glyph>u</glyph><glyph>t</glyph><glyph>e</glyph></word><glyph>s</glyph></word>" + 
		"<glyph>t</glyph><glyph>o</glyph>" + 
		"<word class=\"twenty\"><glyph>t</glyph><glyph>w</glyph><glyph>e</glyph><glyph>n</glyph><glyph>t</glyph><glyph>y</glyph></word>" + 
		"<words class=\"thirteen\"><glyph>t</glyph><glyph>h</glyph><glyph>i</glyph><glyph>r</glyph><glyph>t</glyph><glyph>e</glyph><glyph>e</glyph><glyph>n</glyph></words>" + 
		"<glyph>a</glyph><glyph>t</glyph>" + 
		"<word class=\"anniversary\"><glyph>v</glyph><glyph>i</glyph><glyph>k</glyph><glyph>i</glyph><glyph>2</glyph><glyph>2</glyph><glyph>0</glyph><glyph>7</glyph><glyph>2</glyph><glyph>0</glyph><glyph>1</glyph><glyph>6</glyph><glyph>s</glyph><glyph>e</glyph><glyph>b</glyph><glyph>a</glyph></word>" + 
		"<words class=\"fourteen\"><glyph>f</glyph><glyph>o</glyph><glyph>u</glyph><glyph>r</glyph><glyph>t</glyph><glyph>e</glyph><glyph>e</glyph><glyph>n</glyph></words>" + 
		"<words class=\"fifteen\"><glyph>f</glyph><glyph>i</glyph><glyph>f</glyph><glyph>t</glyph><glyph>e</glyph><glyph>e</glyph><glyph>n</glyph></words>" + 
		"<glyph>s</glyph>" + 
		"<words class=\"past\"><glyph>p</glyph><glyph>a</glyph><glyph>s</glyph><glyph>t</glyph></words>" + 
		"<word class=\"to\"><glyph>t</glyph><glyph>o</glyph></word>" + 
		"<word class=\"sixteen\"><glyph>s</glyph><glyph>i</glyph><glyph>x</glyph><glyph>t</glyph><glyph>e</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<glyph>c</glyph><glyph>k</glyph><glyph>n</glyph>" + 
		"<word class=\"seventeen\"><glyph>s</glyph><glyph>e</glyph><glyph>v</glyph><glyph>e</glyph><glyph>n</glyph><glyph>t</glyph><glyph>e</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<word class=\"twenty-minutes\"><glyph>t</glyph><glyph>w</glyph><glyph>e</glyph><glyph>n</glyph><glyph>t</glyph><glyph>y</glyph></word>" + 
		"<glyph>a</glyph>" + 
		"<word class=\"eighteen\"><glyph>e</glyph><glyph>i</glyph><glyph>g</glyph><glyph>h</glyph><glyph>t</glyph><glyph>e</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<word class=\"nineteen\"><glyph>n</glyph><glyph>i</glyph><glyph>n</glyph><glyph>e</glyph><glyph>t</glyph><glyph>e</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<word class=\"thirty-minutes\"><glyph>t</glyph><glyph>h</glyph><glyph>i</glyph><glyph>r</glyph><glyph>t</glyph><glyph>y</glyph></word>" + 
		"<word class=\"forty-minutes\"><glyph>f</glyph><glyph>o</glyph><glyph>r</glyph><glyph>t</glyph><glyph>y</glyph></word>" + 
		"<word class=\"fifty-minutes\"><glyph>f</glyph><glyph>i</glyph><glyph>f</glyph><glyph>t</glyph><glyph>y</glyph></word>" + 
		"<word class=\"oclock\"><glyph>o</glyph><glyph>c</glyph><glyph>l</glyph><glyph>o</glyph><glyph>c</glyph><glyph>k</glyph></word>" + 
		"<word class=\"one suffix\"><glyph>o</glyph><glyph>n</glyph><glyph>e</glyph></word>" + 
		"<word class=\"two suffix\"><glyph>t</glyph><glyph>w</glyph><glyph>o</glyph></word>" +
		"<glyph>m</glyph><glyph>o</glyph><glyph>o</glyph><glyph>n</glyph>" + 
		"<word class=\"three suffix\"><glyph>t</glyph><glyph>h</glyph><glyph>r</glyph><glyph>e</glyph><glyph>e</glyph></word>" + 
		"<word class=\"four suffix\"><glyph>f</glyph><glyph>o</glyph><glyph>u</glyph><glyph>r</glyph></word>" + 
		"<word class=\"five suffix\"><glyph>f</glyph><glyph>i</glyph><glyph>v</glyph><glyph>e</glyph></word>" + 
		"<word class=\"six suffix\"><glyph>s</glyph><glyph>i</glyph><glyph>x</glyph></word>" + 
		"<word class=\"seven suffix\"><glyph>s</glyph><glyph>e</glyph><glyph>v</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<word class=\"eight suffix\"><glyph>e</glyph><glyph>i</glyph><glyph>g</glyph><glyph>h</glyph><glyph>t</glyph></word>" + 
		"<word class=\"nine suffix\"><glyph>n</glyph><glyph>i</glyph><glyph>n</glyph><glyph>e</glyph></word>" + 
		"<glyph>i</glyph><glyph>o</glyph>" + 
		"<word class=\"ten suffix\"><glyph>t</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<word class=\"eleven suffix\"><glyph>e</glyph><glyph>l</glyph><glyph>e</glyph><glyph>v</glyph><glyph>e</glyph><glyph>n</glyph></word>" + 
		"<word class=\"twelve suffix\"><glyph>t</glyph><glyph>w</glyph><glyph>e</glyph><glyph>l</glyph><glyph>v</glyph><glyph>e</glyph></word>" + 
		"<glyph>s</glyph></clock>";

		return wrapper;
	}
});
