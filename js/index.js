$(function(){

	var  _splitJson = function(str){
		var tag = '';
		var fields = '';
		
		for( i in str.tags){
			if(str.tags[i] != ''){
				tag+= ','+i+'='+str.tags[i]
			}
		}

		for( i in str.fields){
			var n =  parseInt(str.fields[i]);
			var v = isNaN(n) ? "'"+str.fields[i]+"'":n;
			fields+=','+i+'='+v
		}
		tag = tag == '' ? ' ' :tag.replace(",",'')+' '
		var r = str.table+','+tag+fields.replace(',','')+' '+str.time;
		return r;
	}

	var _alert = function(str){

        if($('.alert').size() ==1){
          $('.alert').remove();
        }
        if($('.overlayout').size() ==1){
          $('.overlayout').remove();
        }
        $('body').append('<div class="overlayout"></div><div class="alert"><div  class="alert-bot" ><span class="btn">知道了</span></div><div class="alert-m">'+str+'</div></div>');
        $('.alert .btn,.overlayout').off('click.alert').on('click.alert',function(){
            $(".alert").remove();
            $('.overlayout').remove();
        });
    }

	var _form = function(){
		$('.error').removeClass("error")
		var table = $.trim($('input[name="table"]').val());
		var loactionDate = new Date().toLocaleDateString().split('/');
      		loactionDate = loactionDate[0]+'/'+(loactionDate[1] < 10 ? '0'+loactionDate[1] : loactionDate[1])+'/'+(loactionDate[2] < 10 ? '0'+loactionDate[2] : loactionDate[2]);	
		var date = $('input[name="time"]').val() != '' ?  Date.parse($('input[name="time"]').val().replace(/-/g,'/')+' 00:00:00')/1000 :  Date.parse(loactionDate+' 00:00:00')/1000;
		var tagName = $.trim($('[data-type="tags"]').siblings(".row").find("input").eq(0).val());
		var tagVal = $.trim($('[data-type="tags"]').siblings(".row").find("input").eq(1).val());
		var fieldsName = $.trim($('[data-type="fields"]').siblings(".row").find("input").eq(0).val());
		var fieldsVal = $.trim($('[data-type="fields"]').siblings(".row").find("input").eq(1).val());

		if(table  == '') $('input[name="table"]').addClass("error")
		if(fieldsName == '') $('[data-type="fields"]').siblings(".row").find("input").eq(0).addClass("error");
		if(fieldsVal == '') $('[data-type="fields"]').siblings(".row").find("input").eq(1).addClass("error");
		if(tagName == '' && tagVal !='')  $('[data-type="tags"]').siblings(".row").eq(0).find("input").eq(0).addClass("error");
		if(tagVal == '' &&  tagName !='')  $('[data-type="tags"]').siblings(".row").eq(0).find("input").eq(1).addClass("error");

		var objstr = {
			table:table,
			time: date,
			tags:{},
			fields:{}
		}
		if($('[data-type="tags"]').siblings(".row").size() > 1){
			for(var i = 0 ; i < $('[data-type="tags"]').siblings(".row").size();i++){
				var n = $.trim($('[data-type="tags"]').siblings(".row").eq(i).find("input").eq(0).val());
				var v = $.trim($('[data-type="tags"]').siblings(".row").eq(i).find("input").eq(1).val());
				if(n == ''  && v != '' ) $('[data-type="tags"]').siblings(".row").eq(i).find("input").eq(0).addClass("error");
				if(v == ''  && n != '' ) $('[data-type="tags"]').siblings(".row").eq(i).find("input").eq(1).addClass("error");
				objstr.tags[n] = v;
			}
		}else{
			objstr.tags[tagName] = tagVal;
		}
		
		if($('[data-type="fields"]').siblings(".row").size() > 1){
			for(var i = 0 ; i < $('[data-type="fields"]').siblings(".row").size();i++){
				var n = $.trim($('[data-type="fields"]').siblings(".row").eq(i).find("input").eq(0).val());
				var v = $.trim($('[data-type="fields"]').siblings(".row").eq(i).find("input").eq(1).val());
				if(n=='') $('[data-type="fields"]').siblings(".row").eq(i).find("input").eq(0).addClass("error")
				if(v=='') $('[data-type="fields"]').siblings(".row").eq(i).find("input").eq(1).addClass("error");

				objstr.fields[n] = v;
			}
		}else{
			objstr.fields[fieldsName] = fieldsVal;
		}

		if($('.error').size() > 1){
			_alert('填写错啦')
		}else{
			$('.code .line').html(_splitJson(objstr)).show();
		}

		$('input').focus(function(){
			$('input').removeClass("error")
		})
	}

	$('.btn-add').click(function(){
		var t;
		var str = $(this).attr('data-type') == 'tags' ? 'Tag' : 'Fields';
		t='<div class="row"><input type="text"  placeholder="'+str+' Name" > - <input type="text"  placeholder="'+str+' Value" ><span class="close">×</span></div>'
		$(this).before(t);
		$('.close').on('click',function(){
			$(this).closest(".row").remove();
		});
	});

	$('.btn-save').click(function(){
		console.log(44)
		_form();
	});

})
		