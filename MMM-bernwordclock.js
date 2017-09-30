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

		this.elements = [];

		this.elements["hour1"] = "one";
		this.elements["hour2"] = "two";
		this.elements["hour3"] = "three";
		this.elements["hour4"] = "four";
		this.elements["hour5"] = "five";
		this.elements["hour6"] = "six";
		this.elements["hour7"] = "seven";
		this.elements["hour8"] = "eight";
		this.elements["hour9"] = "nine";
		this.elements["hour10"] = "ten";
		this.elements["hour11"] = "eleven";
		this.elements["hour12"] = "twelve";

		this.elements["before"] = "to";
		this.elements["past"] = "past";

		this.elements["five"] = "five";
		this.elements["ten"] = "ten";
		this.elements["quarter"] = "quarter";
		this.elements["twenty"] = "twenty";
		this.elements["half"] = "half";

		this.elements["it"] = "it";
		this.elements["is"] = "is";

		this.elements["dot1"] = "dot1";
		this.elements["dot2"] = "dot2";
		this.elements["dot3"] = "dot3";
		this.elements["dot4"] = "dot4";
		this.elements["oclock"] = "oclock";

		this.elements["anniversary"] = "V&S07222016"

		// Set Interval for Update
		var self = this;
		setInterval(function() {
			self.updateWordClock();
		}, this.config.updateInterval);
	},

	updateWordClock: function() {

		this.resetWordClock();

	    var currentTime = moment();
	    var elements = ["it","is"];

	  var month = currentTime.month();
	  var day = currentTime.day();

		var hour = currentTime.hour() % 12;
		var minute = currentTime.minute();
		if (month == 7 && day == 22){ elements.push("anniversary"); }

		if (minute >= 0 && minute < 5){ elements.push("oclock"); }
		if (minute >= 5 && minute < 10) { elements.push("five","past"); }
		if (minute >= 10 && minute < 15) { elements.push("ten","past"); }
		if (minute >= 15 && minute < 20) { elements.push("quarter","past"); }
		if (minute >= 20 && minute < 25) { elements.push("twenty","past"); }
		if (minute >= 25 && minute < 30) {
			elements.push("five","before","half");
			hour = (hour + 1) % 12;
		}

		if (minute >= 30 && minute < 35) {
			elements.push("half");
			hour = (hour + 1) % 12;
		}

		if (minute >= 35 && minute < 40) {
			elements.push("five","past","half");
			hour = (hour + 1) % 12;
		}

		if (minute >= 40 && minute < 45) {
			elements.push("twenty","before");
			hour = (hour + 1) % 12;
		}

		if (minute >= 45 && minute < 50) {
			elements.push("quarter","before");
			hour = (hour + 1) % 12;
		}

		if (minute >= 50 && minute < 55) {
			elements.push("ten","before");
			hour = (hour + 1) % 12;
		}

		if (minute >= 55 ) {
			elements.push("five","before");
			hour = (hour + 1) % 12;
		}


		elements.push(this.setHour(hour));
		var dots = this.setDot(minute);
		for (d in dots) {
			elements.push(dots[d]);
		}

		this.changeToAchtive(elements);
	}, 

	setDot : function(minute) {

		minute = minute % 5;
		var elements = [];

		switch (minute) {
			case 0:
				break;
			case 1:
				elements.push("dot1");
				break;
			case 2:
				elements.push("dot1","dot2");
				break;
			case 3:
				elements.push("dot1","dot2","dot3");
				break;
			case 4:
				elements.push("dot1","dot2","dot3","dot4");
				break;
		}

		return elements;
	},
	
	setHour: function(hour) {

		switch(hour) {
			case 0:
				return "hour12";
			case 1:
				return "hour1";
			case 2:
				return "hour2";
			case 3:
				return "hour3";
			case 4:
				return "hour4";
			case 5:
				return "hour5";
			case 6:
				return "hour6";
			case 7:
				return "hour7";
			case 8:
				return "hour8";
			case 9:
				return "hour9";
			case 10:
				return "hour10";
			case 11:
				return "hour11";
			case 12:
				return "hour12";
		}
	},

	resetWordClock: function() {

		for (var i in this.elements) {
			var item = document.getElementById(this.elements[i]);
			item.className = "";
		}

	},

	changeToAchtive: function(elements) {
		for (var i in elements) {
			var item = document.getElementById(this.elements[elements[i]]);
			item.className = "white";
		}
	},
    
	// Override dom generator.
	getDom: function() {

		var wrapper = document.createElement("div");	
		wrapper.innerHTML = "<span id=\"dot1\">.</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id=\"dot2\">.</span><br />" + 
								"&nbsp;<span id=\"it\">I T</span> V <span id=\"is\">I S</span> I K <span id=\"five\">F I V E</span> E&nbsp;<br />" +
								"&nbsp;<span id=\"quarter\">Q U A R T E R</span> I <span id=\"ten\" >T E N</span> G&nbsp;<br />" +
								"&nbsp;<span id=\"twenty\">T W E N T Y</span> & S E <span id=\"to\">T O</span> Y&nbsp;<br />" +
								"&nbsp;<span id=\"past\">P A S T </span>B <span id=\"half\">H A L F </span>A S K&nbsp;<br />" +
								"&nbsp;<span id=\"anniversary\">V & S 0 7 2 2 2 0 1 6 </span> E&nbsp;<br />" +
								"&nbsp;<span id=\"one\">O N E </span><span id=\"two\">T W O </span><span id=\"three\">T H R E E</span> T&nbsp;<br />" +
								"&nbsp;<span id=\"four\">F O U R</span> T <span id=\"five\">F I V E </span>I A T&nbsp;<br />" +
								"&nbsp;<span id=\"six\">S I X </span>N I A <span id=\"seven\">S E V E N</span> O&nbsp;<br />" +
								"&nbsp;<span id=\"eight\">E I G H T </span><span id=\"nine\">N I N E </span>S B O&nbsp;<br />" +
								"&nbsp;<span id=\"ten\">T E N </span>E C <span id=\"eleven\">E L E V E N</span> T&nbsp;<br />" +
								"&nbsp;<span id=\"twelve\">T W E L V E </span><span id=\"oclock\">O C L O C K</span>&nbsp;<br />" +
								"<span id=\"dot3\">.</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id=\"dot4\">.</span><br />";

		return wrapper;
	}
});
