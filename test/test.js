jQuery(function($)
{
	
	//default initialization
	module("Default initialization");
	
	$("#container").eTruncate();
	var button = $("#container span a");
	
	test("init", function(){
		equals("none", $(".more").css("display"), "'#container .more' elements display");
		ok(button.length > 0, "button created");
		equals("More", button.html(), "button 'more' text");
		ok(button.hasClass("show"), "button 'show' class");
	});
	
	test("button click triggered", function(){
		button.trigger("click");
		equals("block", $(".more").css("display"), "'#container .more' elements display");
		equals("Less", button.html(), "button 'less' text");
		ok(button.hasClass("hide"), "button 'hide' class");
	});
	
	
	//default initialization
	module("Custom initialization");
	
	$("#container2").eTruncate({
		elements : ".hi",
        createButton : true, 
        buttonContainer : "#btn", 
        buttonCode : '<p class="test"><a href="#"></a></span>',
        showText : "MyMore",
        showClass : "MyShow",
        hideText : "MyLess",
        hideClass : "MyHide",
        startStatus : "show"
	});
	
	var newButton = $(".test a");
	
	test("init", function(){
		equals("block", $(".hi").css("display"), "'#container2 .hi' elements display");
		equals("MyLess", newButton.html(), "button 'less' text");
		ok(newButton.hasClass("MyHide"), "button 'hide' class");
		ok(newButton.parent().hasClass("test"), "button code verification");
	});
	
	test("button click triggered", function(){
		newButton.trigger("click");
		equals("none", $(".hi").css("display"), "'#container2 .hi' elements display");
		equals("MyMore", newButton.html(), "button 'more' text");
		ok(newButton.hasClass("MyShow"), "button 'show' class");
	});
	
});