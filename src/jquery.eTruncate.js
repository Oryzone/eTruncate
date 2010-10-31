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
    var eTruncate = function(container, options)
    {
        var self = this;

        self.version = "1.0";

        self.defaultOptions = {
            elements : ".more", // the selector that identifies the elements that will be hidden
            createButton : true, // a flag that indicates if a link button to show/hide the hidden elements should be created
            buttonContainer : null, // a selector that indicates where the show/hide button should be placed. If null the button will be appended after the each hidden element
            buttonCode : '<span><a href="#"></a></span>', //the html code used to create the show/hide button (the text will be placed inside the a tag)
            showText : "More", // the text on the button when used to show more text
            showClass : "show", // the class attached to the button when it has to show more text
            hideText : "Less", // the text on the button when used to hide text
            hideClass : "hide", // the class attached to the button when it has to hide text
            startStatus : "hidden" // the initial status of the exceding text (use "hidden" if you want to hide it at onLoad or use "show" otherwise)
        };

        self.options = $.extend({}, self.defaultOptions, options);
        self.container = container;

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
        }

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
        }

        self.toggleElements = function()
        {
            if(self.status == "show")
                self.hideElements();
            else if(self.status == "hidden")
                self.showElements();
        }

        init();
    }

    $.fn.eTruncate = function(options)
    {
        return this.each(function(){
            new eTruncate($(this), options);
        });
    }

})(jQuery);