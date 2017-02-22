//查询功能
(function(){
	query();
})();

//增加功能
(function(){
	$(".J-create").on('click',function(){
		$('.popupbox__title').text("新建用户");
		$('input').val("");
		$('.J-update-confirm').hide();
		$('.J-confirm').show();
		$(".J-popupbox,.J-popupbox-mask").css('display','block');
	})

	$(".J-popupbox-close,.J-concel").on('click',function(){
		$(".J-popupbox,.J-popupbox-mask").css('display','none');
	})

	$(".J-confirm").on('click',function(){
		$.ajax({
			url: '/api/',
			dataType: 'json',
			type: 'post',
			data: $("form").serialize(),
			success: function(data){
				if (data.ok) {
					query();
				}else{
					alert('表单要填写完整！')
				}
			}
		});
		$(".J-popupbox,.J-popupbox-mask").css('display','none');
	})
})();

//删除功能
(function(){
	var id;
	$("body").on('click',".J-del",function(){
		var _this = $(this);
		var scrollTop = $(document).scrollTop();
		var scrollLeft = $(document).scrollLeft();
		var _top = _this.offset().top - scrollTop;
		var _left = _this.offset().left - scrollLeft;
		id = _this.attr("_id");
		$(".J-confirmDel").css('display','block');
		$(".J-confirmDel").css({'top':_top - 80, 'left': _left - 50});
	})

	$(".J-del-concel").on('click',function(){
			$(".J-confirmDel").css('display','none');
		})

	$(".J-del-confirm").on('click',function(){
		$.ajax({
			url: '/api/del',
			dataType: 'json',
			type: 'post',
			data: {
				_id: id
			},
			success: function(data) {
				if(data.ok) {
					query();
				}
			}
		})
		$(".J-confirmDel").css('display','none');
	})	
})();

//更新功能
(function(){
	var id;
	$("body").on('click','.J-update',function(){
		var _this = $(this);
		id = _this.attr("_id");
		$('.popupbox__title').text("更改用户");
		$('.J-update-confirm').show();
		$('.J-confirm').hide();

		var _val_1 = $(this).parents('tr').find('td').eq(0).text();
		var _val_2 = $(this).parents('tr').find('td').eq(1).text();
		var _val_3 = $(this).parents('tr').find('td').eq(2).text();
		var _val_4 = $(this).parents('tr').find('td').eq(3).text();
		var _val_5 = $(this).parents('tr').find('td').eq(4).text();
		var _val_6 = $(this).parents('tr').find('td').eq(5).text();
		
		$(".J-popupbox,.J-popupbox-mask").css('display','block');

		$("input[name='name']").val(_val_1);
		$("input[name='studentId']").val(_val_2);
		$("input[name='age']").val(_val_3);
		$("input[name='tel']").val(_val_4);
		$("input[name='email']").val(_val_5);
		$("input[name='address']").val(_val_6);
	})

	$('.J-update-confirm').on('click',function(){
		$.ajax({
			url: '/api/update/'+id,
			dataType: 'json',
			type: 'post',
			data: $("form").serialize(),
			success: function(data){
				if (data.ok) {
					query();
				}else{
					alert('表单要填写完整！')
				}
			}
		});
		$(".J-popupbox,.J-popupbox-mask").css('display','none');
	})

})();

function query(){
	$.ajax({
		url: '/api/',
		dataType: 'json',
		success: function(data){
			var html = '';
			$.each(data.result,function(i,n){
				html += 
				'<tr class="user-row">'+
		    		'<td>'+ n.name +'</td>'+
		    		'<td>'+ n.studentId +'</td>'+
		    		'<td>'+ n.age +'</td>'+
		    		'<td>'+ n.tel +'</td>'+
		    		'<td>'+ n.email +'</td>'+
		    		'<td>'+ n.address +'</td>'+
		    		'<td><a href="javascript:;" _id="'+ n._id +'" class="J-del">删除</a><a href="javascript:;" _id="'+ n._id +'" class="J-update">修改</a></td>'+
		    	'</tr>';
			});
			$(".j-userTable tbody").empty().append(html);
		}
	});
}