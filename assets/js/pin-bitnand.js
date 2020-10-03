/**
 * Description. Generate C code for STM32 
 * @author danjah. 
 */

$.pinbitband = new Map();

$.pinbitband.set('pinname','pinUnnamed');
$.pinbitband.set('pinnum',0);
$.pinbitband.set('gpio',0);
$.pinbitband.set('pindir',0);
$.pinbitband.set('gpionames',['GPIOA','GPIOB','GPIOC','GPIOD']);
$.pinbitband.set('dirnames',['IN','OUT']);
$("#pin-bitband > div > div > *").change(function() {  
	var expression = '';
	$.pinbitband.set(this.getAttribute('par'),this.value);
	//---------------
	var pinnum = parseInt($.pinbitband.get('pinnum'),10);
	var gpio = parseInt($.pinbitband.get('gpio'),10);
	var dir = parseInt($.pinbitband.get('pindir'),10);
	//---------------
	var gpioname = $.pinbitband.get('gpionames')[gpio];
	var pinname = '';
	var dirname = $.pinbitband.get('dirnames')[dir];
	if ($.pinbitband.get('pinname') == 'pinUnnamed'){
		pinname = gpioname+'_'+pinnum+'_'+dirname;
	}else{
		pinname = $.pinbitband.get('pinname');
	}
	//---------------
	 // from datasheet
	var pinaddr = 0x42000000 + ((0x10000 +(0x0800 + gpio * 0x0400) + ( 0x08+ dir * 0x04 ))*32)+ pinnum *4 ;	
	expression = '#define '+ pinname + ' (*((volatile uint32_t *)0x'+ pinaddr.toString(16)+ ')) /* ' + gpioname +' pin '+ $.pinbitband.get('pinnum')+' '+dirname +' */';	
	
	$("#pin-bitband > div > pre > code").html(expression);
});


