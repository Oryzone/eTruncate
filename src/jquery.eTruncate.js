/**
 *  jQuery eTruncate is a plugin that easily allows you to hide some paragraphs on long html texts and provides an 
 *  easy way to add a "more/less" button  to show that paragraphs back on demand. It's just an easy way to improve 
 *  user experience by hiding long unconfortable texts and show the full text with a click to provide more 
 *  information only to those users who are really interested on your contents.
 * @fileOverview jQuery eTruncate plugin
 * @author <a href="mailto:lmammino@oryzone.com">Luciano Mammino</a>
 * @author <a href="mailto:amangano@oryzone.com">Andrea Mangano</a>
 * @copyright (c) 2010 <ahref="http://oryzone.com">ORYZONE</a>
 * @license MIT license
 * @version 1.0
 */
(function($)
{
	/**
	 *  Class: eTruncate
	 *  eTruncate object.
	 *	plugin that easily allows you to hide some paragraphs on long html texts and provides an 
	 *  easy way to add a "more/less" button  to show that paragraphs back on demand. It's just an easy way to improve 
	 *  user experience by hiding long unconfortable texts and show the full text with a click to provide more 
	 *  information only to those users who are really interested on your contents.
	 *  Avoid to instantiate this class directly. 
	 *  The default jQuery plugin instantiation is preferred:
	 *  
	 *  > $("selector").eTruncate(options);
	 */
	/**
	 *  Constructor: eTruncate
	 *  Constructor: creates a new eTruncate instance
	 *  
	 *  Parameters:
	 *  - *container* - {jQuery} a jQuery DOM element that contains the elements you want to show/hide
	 *  - *options* - {Object} an array used to configure the plugin instance
	 *  
	 *  The options object can specify the following attributes (the default value is given on parenthesis):
	 *  - *elements* - {String} (".more") the selector that identifies the elements that will be hidden
     *  - *createButton* - {boolean} (true) a flag that indicates if a link button to show/hide the hidden elements should be created
     *  - *buttonContainer* - {jQuery|String} (null) a selector that indicates where the show/hide button should be placed. If null the button will be appended after the each hidden element
     *  - *buttonCode* - {String} ('<span><a href="#"></a></span>') the html code used to create the show/hide button (the text will be placed inside the a tag)
     *  - *showText* - {String} ("More") the text on the button when used to show more text
     *  - *showClass* - {String} ("show") the class attached to the button when it has to show more text
     *  - *hideText* - {String} ("Less") the text on the button when used to hide text
     *  - *hideClass* - {String} ("hide") the class attached to the button when it has to hide text
     *  - *startStatus* - {String} ("hidden") the initial status of the exceding text (use "hidden" if you want to hide it at onLoad or use "show" otherwise)
	 */
    var eTruncate = function(container, options)
    {
        var self = this;

        /**
         *  Variable: version
         *  {String} The version of the plugin
         */
		self.version = "1.0";

		/**
		 *  Variable: status
		 *  {String} The current status of the contained elements: "hide" or "show"
		 */
		self.status = null;

        var defaultOptions = {
            elements : ".more",
            createButton : true,
            buttonContainer : null,
            buttonCode : '<span><a href="#"></a></span>',
            showText : "More",
            showClass : "show",
            hideText : "Less",
            hideClass : "hide",
            startStatus : "hidden"
        };

		/**
		*  Variable: options
		*  {Object} the object that stores all the options that the current instance is using
		*/
        self.options = $.extend({}, defaultOptions, options);

		/**
		*  Variable: container
		*  {jQuery} The jQuery DOM elements used as container for the plugin.
		*/
        self.container = container;

		self.container.data("eTruncate", self);

        var init = function()
        {
            self.elements = self.container.find(self.options.elements);
            if(self.options.createButton && self.elements.length > 0)
                createButton();

            setStartStatus();
        }

        var createButton = function()
        {
            if (self.options.buttonContainer === null)
                self.buttonContainer = self.container;
            else
                self.buttonContainer = $(self.options.buttonContainer);

            self.button = $(self.options.buttonCode)
                         .appendTo(self.buttonContainer);

            self.innerButton = self.button.find("a").click(function(){
                             self.toggleElements();
                             return false;
                         });
        }

        var setStartStatus = function()
        {
            switch(self.options.startStatus)
            {
                case "hidden" :
                    self.hideElements();
                    break;
                case "show" :
                    self.showElements();
                    break;
                default:
                    throw "InvalidStartStatusException";
            }
        }

		/**
		*  Function: hideElements
		*  Hides the elements
		*  
		*  Returns:
		*  {eTruncate} the same eTruncate object to allow methods chainability
		*/
        self.hideElements = function()
        {
            self.elements.hide();
            self.status = "hidden";
            if(self.innerButton)
            {
                self.innerButton.removeClass(self.options.hideClass)
                           .addClass(self.options.showClass)
                           .html(self.options.showText);
            }
            self.container.trigger("ElementStatusChanged", [self, self.status]);
			return self;
        }

		/**
		*  Function: showElements
		*  Show the elements back
		*  
		*  Returns:
		*  {eTruncate} the same eTruncate object to allow methods chainability
		*/
        self.showElements = function()
        {
            self.elements.show();
            self.status = "show";
            if(self.innerButton)
            {
                self.innerButton.removeClass(self.options.showClass)
                           .addClass(self.options.hideClass)
                           .html(self.options.hideText);
            }
            self.container.trigger("ElementStatusChanged", [self, self.status]);
			return self;
        }

		/**
		*  Function: toggleElements
		*  Toggle the elements
		*  
		*  Returns:
		*  {eTruncate} the same eTruncate object to allow methods chainability
		*/
        self.toggleElements = function()
        {
            if(self.status == "show")
                self.hideElements();
            else if(self.status == "hidden")
                self.showElements();
			
			return self;
        }

        init();
    }

	/**
	 *  Class: jQuery.fn
	 *  Extensions provided to the jQuery object to follow the default plugin development conventions
	 */
	/**
	*  Function: eTruncate
	*  Method to instantiate the plugin on one or more elements selected with a jQuery selector.
	*  Should be called as follows:
	*  
	*  > $("selector").eTruncate(options);
	*  
	*  Where *selector* stands for the selectors for the element(s) that contains the elements you
	*  want to hide/show. *Options* is an object that can be used to provide a custom configuration
	*  for the plugin. See the available options on the <eTruncate> constructor.
	*  
	*  You can also use this method on elements with wich you've already instantiated eTruncate to 
	*  retrieve the connected eTruncate object.
	*  To do so you should just pass the string *`instance`* as the *options* object:
	*  
	*  > $("selector").eTruncate("instance");
	*/
    $.fn.eTruncate = function(options)
    {
        if(options === "instance" && $(this).data("eTruncate"))
		{
			return $(this).data("eTruncate");
		}

		return this.each(function(){
            new eTruncate($(this), options);
        });
    }

})(jQuery);