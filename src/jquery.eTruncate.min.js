(function($)
{var eTruncate=function(container,options)
{var self=this;self.version="1.0";self.status=null;self.elements=null;var defaultOptions={elements:".more",createButton:true,buttonContainer:null,buttonCode:'<span><a href="#"></a></span>',showText:"More",showClass:"show",hideText:"Less",hideClass:"hide",startStatus:"hidden"};self.options=$.extend({},defaultOptions,options);self.container=container;self.container.data("eTruncate",self);var init=function()
{self.elements=self.container.find(self.options.elements);if(self.options.createButton&&self.elements.length>0)
createButton();setStartStatus();};var triggerStatusChanged=function()
{self.container.trigger("eTruncate.elementsStatusChanged",[self,self.elements,self.status]);};var createButton=function()
{if(self.options.buttonContainer===null)
self.buttonContainer=self.container;else
self.buttonContainer=$(self.options.buttonContainer);self.button=$(self.options.buttonCode).appendTo(self.buttonContainer);self.innerButton=self.button.find("a").click(function(){self.container.trigger("eTruncate.buttonClicked",[self,self.button,self.innerButton]);self.toggleElements();return false;});self.container.trigger("eTruncate.buttonCreated",[self,self.button,self.innerButton]);};var setStartStatus=function()
{switch(self.options.startStatus)
{case"hidden":self.hideElements();break;case"show":self.showElements();break;default:throw"InvalidStartStatusException";}};self.hideElements=function()
{self.container.trigger("eTruncate.beforeHiding",[self,self.elements]);self.elements.hide();self.status="hidden";if(self.innerButton)
{self.innerButton.removeClass(self.options.hideClass).addClass(self.options.showClass).html(self.options.showText);}
self.container.trigger("eTruncate.afterHiding",[self,self.elements]);triggerStatusChanged();return self;};self.showElements=function()
{self.container.trigger("eTruncate.beforeShowing",[self,self.elements]);self.elements.show();self.status="show";if(self.innerButton)
{self.innerButton.removeClass(self.options.showClass).addClass(self.options.hideClass).html(self.options.hideText);}
self.container.trigger("eTruncate.afterShowing",[self,self.elements]);triggerStatusChanged();return self;};self.toggleElements=function()
{if(self.status=="show")
self.hideElements();else if(self.status=="hidden")
self.showElements();return self;};init();};$.fn.eTruncate=function(options)
{if(options==="instance"&&$(this).data("eTruncate"))
{return $(this).data("eTruncate");}
return this.each(function(){new eTruncate($(this),options);});};})(jQuery);