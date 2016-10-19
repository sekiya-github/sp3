/**
 * 変数命名規則(css/js/html共通)
 *
 * ・CSS・JSエディタがハイフン繋ぎでは１クリック選択できない。
 * ・閲覧のし易さではハイフン繋ぎが見やすい。
 * ・JSの変数名はさすがにキャメルケース。それと合わせたほうがいい？
 *
 * [最終決定]
 *
 *	  ID/CLASS名	  ：ハイフン繋ぎ
 *	  JSの変数名	  ：キャメルケース
 *	  data-cmd		  ：execCommandで使用するコマンド。なので基本はキャメルケースを使用。
 *
 * [理由]
 *
 *	  bootstrapでもJSはキャメル・ケース。HTMLのID/CLASS名はハイフンだった。
 *	  長いID/CLASS名の場合、結局JSでは短いキャメルケースの変数名にするので
 *
 */
// コンソールにて確認：$('#htmlBody_ifr').contents().find('p').
(function($) {
	console.time('spEditorLoad');
	var settings;
	var myTextarea;
	var fid;
	var f;
	var fdoc;
	var contentWidndow = '';
	var contentDocument = '';
	var unloadAlertFlag = false;
	var dragFlag = false;
	var dragType = '';
	var dragHeight = 0;
	var keyCodeShift = 0;
	var keyCodeCtrl = 0;
	var keyCodeEnter = 0;
	var keyCodeZ = 0;
	var keyCodeY = 0;
	var keyCodeV = 0;
	var os = navigator.platform.indexOf("Win") != -1 ? 'win' : 'mac';
    var maxVersion = 0;
    var nowVersion = 0;
    var maxHistoryCount = 20;
	var itemType = '';
	var imgDialogType = '';
	var historyData = {};
	var editPosition = 0;
	var clickCell = '';
	var ipkMemuHtml = '';
	ipkMemuHtml += '<div id="ipkMenu" class="ignore">';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-drag sp-js-click-execIpkMenuCmd"	  data-cmd="drag" id="ipk-menu-drag" draggable="true"><span class="ignore glyphicon glyphicon-move" aria-hidden="true"></span> drag</div>';
	//ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-item-add sp-js-click-execIpkMenuCmd" data-cmd="itemAdd"><i class="ignore fa fa-plus-circle fa-spin fa-fw"></i> item add</div>';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-copy sp-js-click-execIpkMenuCmd"	  data-cmd="copy"><span class="ignore glyphicon glyphicon-duplicate" aria-hidden="true"></span> copy</div>';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-delete sp-js-click-execIpkMenuCmd"	  data-cmd="delete" id="ipkMenuDelete"><span class="ignore glyphicon glyphicon-remove" aria-hidden="true"></span> delete</div>';
	//ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-setting sp-js-click-execIpkMenuCmd"  data-cmd="setting"><i class="ignore fa fa-cog fa-spin fa-fw"></i></div>';
	ipkMemuHtml += '</div>';

	//ipkMemuHtml = '';
	//ipkMemuHtml += '<div id="ipkMenu" class="ignore">';
	//ipkMemuHtml += '<div title="選択中アイテムをドラッグ移動します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-drag sp-js-click-execIpkMenuCmd"	  data-cmd="drag" id="ipk-menu-drag" draggable="true"><span class="ignore glyphicon glyphicon-move" aria-hidden="true"></span></div>';
	//ipkMemuHtml += '<div title="選択中アイテムを複製します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-copy sp-js-click-execIpkMenuCmd"	  data-cmd="copy"><span class="ignore glyphicon glyphicon-duplicate" aria-hidden="true"></span></div>';
	//ipkMemuHtml += '<div title="選択中アイテムを削除します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-delete sp-js-click-execIpkMenuCmd"	  data-cmd="delete" id="ipkMenuDelete"><span class="ignore glyphicon glyphicon-remove" aria-hidden="true"></span></div>';
	//ipkMemuHtml += '<div title="選択中アイテムを削除します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-delete sp-js-click-execIpkMenuCmd"	  data-cmd="edit-image" id="ipkMenuDelete"><i class="ignore fa fa-video-camera" aria-hidden="true"></i></div>';
	//ipkMemuHtml += '</div>';

	$.fn.sp2Editor = function(options) {
		settings = $.extend({}, {
			staffId: '',
			cssFile: '',
			scrollTop: 0,
			class: ''
		}, options);
		myTextarea = $(this);
		myTextareaId = myTextarea.attr('id');
		fid = myTextareaId + '_ifr';

		//####################################################################################################
		//###### <iframe> INIT START #########################################################################
		//####################################################################################################

		//---------------------------------------
		// <iframe> innerHTML
		//---------------------------------------
		var iframeHtml = '<iframe id="' + fid + '" src=\'javascript:""\' frameborder="0" style="width: 100%; height: 100%; display: block;background-color:white;"></iframe>';
		myTextarea.after(iframeHtml);
		myTextarea.hide();

		//-----------------------------------------------
		// <iframe> onload event : iframe動的読み込み完了時：http://so-zou.jp/web-app/tech/programming/javascript/dom/node/element/html/iframe/
		//-----------------------------------------------
		f = $('#' + fid);
		fdoc = f.contents();
		contentWidndow = document.getElementById(fid) || document.getElementById(fid).contentWindow;
		contentDocument = contentWidndow.contentDocument || contentWidndow.document;
		contentWidndow.onload = function(){
			cc('iframe loaded!!');

			//-----------------------------------------------
			// <iframe> 判定クラス設定
			//-----------------------------------------------
			//fdoc.find('p').addClass('sp-item');
			//fdoc.find('h1').addClass('sp-item');
			//fdoc.find('h2').addClass('sp-item');
			//fdoc.find('h3').addClass('sp-item');
			//fdoc.find('h4').addClass('sp-item');
			//fdoc.find('h5').addClass('sp-item');
			//fdoc.find('h6').addClass('sp-item');
			//fdoc.find('a').addClass('sp-item');
			////fdoc.find('th').addClass('sp-item');
			////fdoc.find('td').addClass('sp-item');
			////fdoc.find('li').addClass('sp-item');
			//fdoc.find('img').addClass('sp-item');


			// fdoc.find('.sp-section').attr('draggable','true');
			// fdoc.find('.row').attr('draggable','true');
			// fdoc.find('.sp-item').attr('draggable','true');

			//-----------------------------------------------
			// <iframe> html event
			//-----------------------------------------------
			fdoc.find('html').on({

				//-----------------------------------------------
				// mouseover
				//-----------------------------------------------
				'mouseover': function(e) {
					// ドラッグ中以外はmouseover処理する。drag時は、dragstartイベントでiframe初期化。編集中はtargetOutlineしない。
					//if(dragFlag == false && fdoc.find('.spEdit').length == 0){
					if(dragFlag == false){
					//if (dragFlag == false) {
						var t = $(e.target);
						//var tagName = t[0].tagName;
						//cc(tagName);
						//cc(t.attr('class'));

						if (t.hasClass('sp-item')) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							//t.addClass('targetOutline').attr('contenteditable','true');
							t.addClass('targetOutline');
							//f_showIpkMenu(t);
							//cc('show');

						} else if (t.closest('.sp-item').length > 0) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t = t.closest('.sp-item').first();
							t.addClass('targetOutline');
							//t.addClass('targetOutline').attr('contenteditable','true');
							//f_showIpkMenu(t);

						} else if (t.hasClass('sp-box')) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t.addClass('targetOutline');

						} else if (t.closest('.sp-box').length > 0) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t = t.closest('.sp-box').first();
							t.addClass('targetOutline');

						} else if (t.hasClass('row')) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t.addClass('targetOutline');
							//f_showIpkMenu(t);
							//cc('show');

						} else if (t.closest('.row').length > 0){
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t = t.closest('.row').first();
							t.addClass('targetOutline');
							//f_showIpkMenu(t);
							//cc('show');

						} else if (t.hasClass('container')) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t.addClass('targetOutline');
							//f_showIpkMenu(t);
							////cc('show');

						} else if (t.closest('.sp-section').length > 0) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t = t.closest('.sp-section').first();
							t.addClass('targetOutline');
							//f_showIpkMenu(t);
							////cc('show');

						} else if (t.hasClass('sp-section')) {
							fdoc.find('.targetOutline').removeClass('targetOutline');
							t.addClass('targetOutline');
							//f_showIpkMenu(t);
							////cc('show');

						//}else if(t.closest('.col-sm-12').length > 0 ){
						//	fdoc.find('.targetOutline').removeClass('targetOutline');
						//	t = t.closest('.sp-item').first();
						//	t.addClass('targetOutline');
						//	f_showIpkMenu(t);
						//

						} else if (t.hasClass('ignore')) {

							// なにもしない

							// mouseover : other
						} else {
							//fdoc.find('.targetOutline').removeClass('targetOutline').removeAttr('contenteditable');
							fdoc.find('.targetOutline').removeClass('targetOutline');
							//fdoc.find('#ipkMenu').hide();
							//cc('hide');
						}

						//f_editable(fdoc.find('.targetOutline').first());
						//f_showIpkMenu(fdoc.find('.targetOutline').first());
						//fdoc.find('#ipkMenuMsg').text(t.attr('data-explain'));
					}
				},
				//-----------------------------------------------
				// mouseleave
				//-----------------------------------------------
				'mouseleave': function(e) {
					//fdoc.find('.targetOutline').removeClass('targetOutline');
				},
				//-----------------------------------------------
				// click
				//-----------------------------------------------
				'click': function(e) {
					e.preventDefault();
					unloadAlertFlag = true;
					var t = $(e.target);
					// var tagName = t[0].tagName;
					// var idName = t.attr('id');
					var closeSpEdit = t.closest('.spEdit');
					var to = fdoc.find('.targetOutline').first();
					var spEdit = fdoc.find('.spEdit').first();
					clickCell = t.closest('td');
					//if(!clickCell){
					//	clickCell = t.closest('th');
					//} 
					
					// if(t.hasClass('ipkMenuCmdBtn')){
					//   // data-cmdに応じた処理実行
					//   f_ipkMenuCmdExec(e);
					// }else{
					//   f_editable(to);
					//   f_setSpEditComputed(t,to);
					// }

					// // 一度外部クリックで選択解除版（動作OK版）end --------------------------------------------------------------
					//
					//// コマンドボタンクリックなら、どんな時でも処理実行
					//if(t.hasClass('ipkMenuCmdBtn')){
					//	f_ipkMenuCmdExec(t);
                    //
					//}else if(t.closest('.ipkMenuCmdBtn').length > 0){
					//	t = t.closest('.ipkMenuCmdBtn');
					//	// data-cmdに応じた処理実行
					//	f_ipkMenuCmdExec(t);
                    //
					//// 編集中なら
					//}else if(spEdit.length > 0){
					//		
					//	// sp-section
					//	if(spEdit.hasClass('sp-section') && !t.hasClass('sp-section')){
                    //
					//		// 履歴登録
					//		//f_historyRegist('.spEdit解除');
					//		spEdit.removeClass('targetOutline').removeClass('spEdit').removeAttr('contenteditable');
					//		fdoc.find('#ipkMenu').hide();
                    //
					//		//-----------------------------------------------
					//		// フォーマットBOX 内部表示設定
					//		//-----------------------------------------------
					//		$('#sp-id-format-noselect-msg').show();
					//		$('#sp-id-format-tab-menu').hide();
					//		$('#sp-id-format-tab-contents').hide();
					//		t.trigger('mouseover');
                    //
					//	// spEditクリックなら
					//	}else if(!spEdit.hasClass('sp-section') && (t.hasClass('spEdit') || closeSpEdit.length > 0 )){
					//		
					//		if(spEdit.prop('tagName') == 'IMG'){
					//			$('#sp-id-img-src-edit-btn').trigger('click');
                    //
					//		}else if(spEdit.data('item-type') == 'replace-item'){
					//			$('#sp-id-replace-item-edit-btn').trigger('click');
                    //
					//		}else{
                    //
					//			// 処理なし
					//			f_setSpEditComputed(t,to);
					//		}
                    //
					//   // それ以外クリックなら、編集解除
					//   }else{
					//		
					//		//-----------------------------------------------
					//		// 選択範囲を広げ、spEdit外に行ってしまってspEditが解除される件の対応
					//		//-----------------------------------------------
					//		// 範囲選択中は編集解除しない
					//		var selection = contentDocument.getSelection();
					//		if(selection.isCollapsed == false){
					//			return;
					//		}
					//		
					//					  
					//		// 履歴登録
					//		//f_historyRegist('.spEdit解除');
					//		spEdit.removeClass('targetOutline').removeClass('spEdit').removeAttr('contenteditable');
					//		fdoc.find('#ipkMenu').hide();
					//		 
					//		//-----------------------------------------------
					//		// フォーマットBOX 内部表示設定
					//		//-----------------------------------------------
					//		$('#sp-id-format-noselect-msg').show();
					//		$('#sp-id-format-tab-menu').hide();
					//		$('#sp-id-format-tab-contents').hide();
                    //
					//		 
                    //
					//		// // ただしsp-itemクリックなら編集中にする
					//		// if(t.hasClass('sp-item')){
					//		//	 t.addClass('targetOutline').trigger('click');
					//		// }else if(closeSpEdit.length > 0){
					//		//	 closeSpEdit.addClass('targetOutline').trigger('click');
					//		// }else{
					//		//	 //t.trigger('mouseover');
					//		// }
					//		
					//		
					//		t.trigger('mouseover');
					//		// var to = fdoc.find('.targetOutline').first();
					//		// f_editable(to);
					//		//   f_setSpEditComputed(t,to);
                    //
					//   }
                    //
					//// 編集中以外なら、クリック要素を編集可能にする
					//}else{
					//	  f_editable(to);
					//	  f_setSpEditComputed(t,to);
                    //
					//}
					// 一度外部クリックで選択解除版（動作OK版）end --------------------------------------------------------------



					// 絶えずtargetOutlineある版（動作OK版）end --------------------------------------------------------------

					// コマンドボタンクリックなら、どんな時でも処理実行
					if(t.hasClass('ipkMenuCmdBtn')){
						f_ipkMenuCmdExec(t);
                    
					}else if(t.closest('.ipkMenuCmdBtn').length > 0){
						t = t.closest('.ipkMenuCmdBtn');
						// data-cmdに応じた処理実行
						f_ipkMenuCmdExec(t);
                    
					}else{
						
						//-----------------------------------------------
						// 選択範囲を広げ、spEdit外に行ってしまってspEditが解除される件の対応
						//-----------------------------------------------
						// 範囲選択中は編集解除しない
						var selection = contentDocument.getSelection();
						if(selection.isCollapsed == false){
							return;
						}

						f_editable(to);
						f_setSpEditComputed(t,to);
					}
					
					//					  // iframe loaded : body click : BODY or DOCTYPE
					//					  if(tagName == 'BODY' || tagName == 'DOCTYPE'){
					//						  //f_historyRegist('body click. edit end!');
					//						  // iframe初期化
					//						  f_resetAll();
					//
					//					  // iframe loaded : body click : ipkMenuCmdBtn
					//					  }else if(t.hasClass('ipkMenuCmdBtn')){
					//						  // data-cmdに応じた処理実行
					//						  f_ipkMenuCmdExec(e);
					//
					//					  // iframe loaded : body click : spEdit内クリック(IMG・A・置換タグ以外) or 無視要素
					//					  }else if( (closeSpEdit.length > 0 && tagName != 'IMG' && tagName != 'A' && !t.hasClass('sp-replace-span')) || t.hasClass('ignore') ){
					//						  // hidden box hide
					//						  f_resetHiddenBox();
					//						  //f_setSpEditComputed(t);
					//						  f_refectIconPanel(t);
					//
					//					  // iframe loaded : body click : other
					//					  }else{
					//						  f_editable(t);
					//					  }
					// 絶えずtargetOutlineある版（動作OK版）end --------------------------------------------------------------
				},
				//-----------------------------------------------
				// keypress
				//-----------------------------------------------
				'keypress': function(e) {
					//console.log('keypress');
					//console.log(e);
					// 改行キー押下時
					if (itemType != 'list' && e.keyCode === 13) {
						// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
						//contentDocument.execCommand('insertHTML', false, '<br>');
						contentDocument.execCommand('insertLineBreak', false, null);
						// prevent the default behaviour of return key pressed
						return false;
					}
				},
				//-----------------------------------------------
				// paste
				//-----------------------------------------------
				'paste': function(e) {
					//console.log('paste');
					//cc(e.originalEvent);
					if (fdoc.find('.spEdit').length > 0) {
						// jquery eventにclipboardDataはない：http://manji602.hatenablog.com/entry/20130829/1377767902
						var cData = e.originalEvent.clipboardData.getData("text/plain");
						//cData = cData.replace(/\r?\n/g, '<br>')
						contentDocument.execCommand('insertText', false, cData);
						return false;
					}
				},
				//-----------------------------------------------
				// dragenter
				//-----------------------------------------------
				'dragenter': function(e) {
					e.preventDefault();
				},
				//-----------------------------------------------
				// dragover ※dragover中はmouseoverイベントは発生しない！！
				//-----------------------------------------------
				'dragover': function(e) {
					//cc('dragover:dataType=' + dragType);

					var t = $(e.target);
					var tagName = t[0].tagName;
					//console.log(t.hasClass('sp-drop-here'), t.closest('.sp-drop-here').length);
					//cc(e.pageY);
					//cc(t.attr('class'));
					//cc('dragType='+dragType);
					//===============================================
					// ドラッグされたのが：sp-item, row
					//===============================================
					if (dragType == 'item') {

						if (t.hasClass('sp-item')) {
							
							fdoc.find('.sp-drop-here').removeClass('sp-drop-here');
							t.addClass('sp-drop-here');

						} else if (t.closest('.sp-item').length > 0) {
							t = t.closest('.sp-item').first();
							fdoc.find('.sp-drop-here').removeClass('sp-drop-here');
							t.addClass('sp-drop-here');

						} else if (t.attr('class').indexOf('col-sm-') != -1) {

							if (t.find('.sp-item').length == 0) {
								
								fdoc.find('.sp-drop-here').removeClass('sp-drop-here');
								t.addClass('sp-drop-here');
							}
						} else {
							
							fdoc.find('.sp-drop-here').removeClass('sp-drop-here');
						
						}

					//===============================================
					// ドラッグされたのが：box
					//===============================================
					} else if (dragType == 'box') {

						if (t.hasClass('sp-box')) {
							f_replaceDragItem(e, t);

						} else if (t.closest('.sp-box').length > 0) {
							t = t.closest('.sp-box').first();
							f_replaceDragItem(e, t);

						} else if (t.attr('class').indexOf('col-sm-') != -1) {

							if (t.find('.sp-item').length == 0) {
								fdoc.find('.sp-drop-here').remove();
								t.prepend(dragHtml);
							}

						//} else if (t.hasClass('row')) {
						//	cc('row');
						//	f_replaceDragItem(e, t);
                        //
						//} else if (t.hasClass('container')) {
						//	if (t.find('.' + dragType).length == 0) {
						//		fdoc.find('.sp-drop-here').remove();
						//		t.prepend(dragHtml);
						//	}
						}

					//===============================================
					// ドラッグされたのが：grid
					//===============================================
					} else if (dragType == 'grid') {

						// 今はシンプル化のため row in row はしないでおく。
						if (t.hasClass('row')){

							f_replaceDragItem(e, t);

						}else if(t.closest('.row').length > 0) {

							f_replaceDragItem(e, t.closest('.row'));

						} else if (t.hasClass('container')) {
							if (t.find('.' + dragType).length == 0) {
								fdoc.find('.sp-drop-here').remove();
								t.prepend(dragHtml);
							}
						}

						// row in row を許可した番
						//if (t.hasClass('sp-item')) {
						//	  //cc('sp-item');
						//	  f_replaceDragItem(e, t);
						//
						//} else if (t.closest('.sp-item').length > 0) {
						//	  cc('sp-item(ct)');
						//	  t = t.closest('.sp-item').first();
						//	  f_replaceDragItem(e, t);
						//
						//} else if (t.hasClass('row')) {
						//	  cc('row');
						//	  f_replaceDragItem(e, t);
						//
						//} else if (t.hasClass('container')) {
						//	  if (t.find('.' + dragType).length == 0) {
						//		  fdoc.find('.sp-drop-here').remove();
						//		  t.prepend(dragHtml);
						//	  }
						//}

					//===============================================
					// ドラッグされたのが：sp-container
					//===============================================
					} else if (dragType == 'container') {
						if (t.hasClass('sp-container')) {
							f_replaceDragItem(e, t);
						}else if(t.hasClass('sp-section') && t.find('.sp-container').length == 0){
							fdoc.find('.sp-drop-here').remove();
							t.prepend(dragHtml);
						}
					//===============================================
					// ドラッグされたのが：sp-section
					//===============================================
					} else if (dragType == 'section') {
						if (t.hasClass('sp-section')) {
							
							// body内の最初のsectionなら置換
							if(fdoc.find('.sp-section').index(t) == 0){
								
								fdoc.find('body').prepend(dragHtml);
							
							}else{
								f_replaceDragItem(e, t);
							}
							
						} else if (tagName == 'BODY' || tagName == 'HTML') {
							if (t.find('.sp-section').length == 0) {
								fdoc.find('body').prepend(dragHtml);
							}
						}
					}
				},
			});
			// --- <iframe> html event end ---

			//-----------------------------------------------
			// <iframe> #ipk-menu-drag DnD event
			//-----------------------------------------------
			fdoc.find('html','.ipk-menu-drag').on({

				//-----------------------------------------------
				// dragstart
				//-----------------------------------------------
				'dragstart': function(e) {
					//('.ipk-menu-drag : dragstart');
//fdoc.find('body').css('zoom','0.2');
					dragFlag = true;
					dragObj = fdoc.find('.spEdit').first();
					dragHeight = dragObj.height();
					dragHtml = dragObj.prop('outerHTML');
					dragObj.addClass('sp-placeholder');
					fdoc.find('.targetOutline').removeClass('targetOutline');
					
					
					dragType = '';
					if (dragObj.hasClass('sp-item')) {
						dragType = 'item';
					} else if (dragObj.hasClass('sp-box')) {
						dragType = 'box';
					} else if (dragObj.hasClass('row')) {
						dragType = 'grid';
					} else if (dragObj.hasClass('sp-section')) {
						dragType = 'section';
					}
					
					//// タグガイド表示
					//var tagGuide = $('.sp-js-click-showTagGuide');
					//if(!tagGuide.prop('checked')){
					//	tagGuide.trigger('click');
					//}
					
				},
				//-----------------------------------------------
				// dragend
				//-----------------------------------------------
				'dragend': function(e) {
					//cc('#ipk-menu-drag : dragend');
//fdoc.find('body').css('zoom','1');
					e.preventDefault();
					
					fdoc.find('.spEdit').remove();
					fdoc.find('.sp-drop-here').after(dragHtml).removeClass('sp-drop-here');
					f_showIpkMenu(fdoc.find('.spEdit').first());
					
					dragFlag = false;
					dragObj = '';
					dragHeight = '';
					dragHtml = '';
					dragType = '';
					
					
					//// タグガイド表示
					//var tagGuide = $('.sp-js-click-showTagGuide');
					//if(tagGuide.prop('checked')){
					//	tagGuide.trigger('click');
					//}
					
					// 履歴登録
					f_historyRegist('dragend .ipk-menu-drag');

					
				},
			});
			// --- <iframe> #ipk-menu-drag DnD event end ---


			// fdoc.find('.sp-section').prepend('<div class="guideBar">section<div style="float:right;"><div title="選択中アイテムをドラッグ移動します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-drag sp-js-click-execIpkMenuCmd" data-cmd="drag" id="ipk-menu-drag" draggable="true" style="visibility: visible;"><span class="ignore glyphicon glyphicon-move" aria-hidden="true"></span></div><div title="選択中アイテムを複製します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-copy sp-js-click-execIpkMenuCmd" data-cmd="copy" style="visibility: visible;"><span class="ignore glyphicon glyphicon-duplicate" aria-hidden="true"></span></div><div title="選択中アイテムを削除します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-delete sp-js-click-execIpkMenuCmd" data-cmd="delete" id="ipkMenuDelete" style="visibility: visible;"><span class="ignore glyphicon glyphicon-remove" aria-hidden="true"></span></div></div>');
			//
			// fdoc.find('.row').prepend('<div class="guideBar">グリッド<div style="float:right;"><div title="選択中アイテムをドラッグ移動します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-drag sp-js-click-execIpkMenuCmd" data-cmd="drag" id="ipk-menu-drag" draggable="true" style="visibility: visible;"><span class="ignore glyphicon glyphicon-move" aria-hidden="true"></span></div><div title="選択中アイテムを複製します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-copy sp-js-click-execIpkMenuCmd" data-cmd="copy" style="visibility: visible;"><span class="ignore glyphicon glyphicon-duplicate" aria-hidden="true"></span></div><div title="選択中アイテムを削除します" class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-delete sp-js-click-execIpkMenuCmd" data-cmd="delete" id="ipkMenuDelete" style="visibility: visible;"><span class="ignore glyphicon glyphicon-remove" aria-hidden="true"></span></div></div>');

			//$('.sp-js-click-showTagGuide').first().trigger('click');


            // iframe : <body>キーイベントセット
            fdoc.find('html').keydown(f_keyEvent);

            // このイベント登録でdocument側のinput textでdelete key が聞かなくなる。document focus時にdelete押してもiframe側操作は一切関わらないようにした。
            // document : <body>キーイベントセット
            $('html').keydown(f_keyEvent);

            // 履歴削除
            f_historyClear('初期表示後');

            // 履歴登録
            f_historyRegist('初期表示後');


		}
		// --- <iframe> onload event end  ---

		//---------------------------------------
		// <iframe> write contents
		//---------------------------------------
		// iframe : CSS + JS
		var iframeJsCss = '';
		iframeJsCss += '<link title="SP2タグ：このタグは触らないでください" rel="stylesheet" href="js/spEditor/css/sp2Editormiko3_sp.css">';
		//iframeJsCss += '<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
		iframeJsCss += '<link href="css/font-awesome-4.6.3/css/font-awesome.min.css" rel="stylesheet">';

		// iframe : write
		var iframeContentsHtml = myTextarea.val();

		if (iframeContentsHtml.indexOf('</head>') >= 0 && iframeContentsHtml.indexOf('</body>') >= 0) {
			iframeContentsHtml = iframeContentsHtml.replace('</head>', iframeJsCss + '</head>');
			iframeContentsHtml = iframeContentsHtml.replace('</body>', ipkMemuHtml + '</body>');
		} else {
			alert('HTMLタグが崩れています：</head> or </body> タグがない。正常に動作しない可能性があります。');
			iframeContentsHtml = iframeContentsHtml + iframeJsCss + ipkMemuHtml;
		}

		// iframe output
		contentDocument.write(iframeContentsHtml);
		cc('iframe content write');
		contentDocument.close();
		cc('iframe content colse');
		//####################################################################################################
		//###### <iframe> INIT END ###########################################################################
		//####################################################################################################



























































































		//####################################################################################################
		//###### <document> INIT START #######################################################################
		//####################################################################################################

		//-----------------------------------------------
		// <document> command event
		//-----------------------------------------------
		$('.sp-js-input-execcommand').on('input', f_execcommand);
		$('.sp-js-input-setSpEditCss').on('input', f_setSpEditCss);
		$('.sp-js-input-setSpEditAttr').on('input', f_setSpEditAttr);
		$('.sp-js-click-execcommand').on('click', f_execcommand);
		$('.sp-js-click-setSpEditCss').on('click', f_setSpEditCss);
		$('.sp-js-change-setSpEditClass').on('change', f_setSpEditClass);
		$('.sp-js-change-setAnimation').on('change', f_setAnimation);
		$('.sp-js-change-setAnimationTest').on('change', f_setAnimationTest);
		$('.sp-js-change-setSpEditAttr').on('change', f_setSpEditAttr);
		$('.sp-js-click-setParallax').on('click', f_setParallax);
		$('.sp-js-click-setOverlay').on('click', f_setOverlay);
		$('.sp-js-click-editTable').on('click', f_editTable);
		
		
		
		//-----------------------------------------------
		// <document> key bind
		//-----------------------------------------------
		f_setKeyCode(os);

		//-----------------------------------------------
		// <document> beforeunload
		//-----------------------------------------------
		$(window).on('beforeunload', function(e) {
			//変更がある場合のみ警告をだす
			if (unloadAlertFlag) {
				return "入力した情報が失われます。";
			}
		});

		//-----------------------------------------------
		// <document> tag guide
		//-----------------------------------------------
		$('.sp-js-click-showTagGuide').on('click',function(e){
			var t = $(this);
			var guideTag = t.data('guide-tag');
			if(guideTag == 'all'){
				//fdoc.find('body').toggleClass('sp-highlight-section sp-highlight-container sp-highlight-row sp-highlight-col sp-highlight-item');
				fdoc.find('body').toggleClass('sp-highlight-section sp-highlight-row sp-highlight-col sp-highlight-item');
			}else{
				fdoc.find('body').toggleClass('sp-highlight-'+guideTag);
			}
		});

		$('#checkbox-section').on('click',function(e){
			if($(this).prop('checked') == true){
				fdoc.find('body').addClass('sp-highlight-section')
			}else{
				fdoc.find('body').removeClass('sp-highlight-section')
			}
		});

		$('#checkbox-col').on('click',function(e){
			if($(this).prop('checked') == true){
				fdoc.find('body').addClass('sp-highlight-row').addClass('sp-highlight-col');
			}else{
				fdoc.find('body').addClass('sp-highlight-row').removeClass('sp-highlight-col');
			}
		});

		$('#checkbox-item').on('click',function(e){
			if($(this).prop('checked') == true){
				fdoc.find('body').addClass('sp-highlight-item')
			}else{
				fdoc.find('body').removeClass('sp-highlight-item')
			}
		});

		//-----------------------------------------------
		// <document> tag guide
		//-----------------------------------------------
		$('.sp-js-click-showMobileView').on('click',function(e){
			f.toggleClass('iframe-mobile-preview');
		});

		//-----------------------------------------------
		// <document> save HTML
		//-----------------------------------------------
		$('.sp-js-click-saveHtml').on('click',function(e){
			localStorage.setItem('saveHead',fdoc.find('head').html());
			localStorage.setItem('saveBody',fdoc.find('body').html());
			//localStorage.setItem('saveBody',document.getElementById(fid).contentDocument.getElementsByTagName('body')[0].outerHTML);
		});

		//-----------------------------------------------
		// <document> restore HTML
		//-----------------------------------------------
		$('.sp-js-click-restoreHtml').on('click',function(e){
			fdoc.find('head').html(localStorage.getItem('saveHead'));
			fdoc.find('body').html(localStorage.getItem('saveBody'));
			//fdoc.find('body').replaceWith(localStorage.getItem('saveBody'));
		});

		//-----------------------------------------------
		//
		// <document> dialog
		//
		//-----------------------------------------------
		//-----------------------------------------------
		// dialog : image library
		//-----------------------------------------------
		// common
		var imageDialog = document.getElementById('sp-id-dialog-name-image');
		imageDialog.querySelector('.close').addEventListener('click', function() {
			imageDialog.close();
		});
		// type : img-src
		$('#sp-id-img-src-edit-btn').on('click', function() {
			imgDialogType = 'img-src';
			imageDialog.showModal();
			imageLibrarySearch();
			$('#sp-id-change-target-image-url').val(fdoc.find('.spEdit').first().attr('src'));
			$('#sp-id-dialog-name-image').data('image-edit-type', 'image-src').find('.mdl-dialog__content').first().focus().scrollTop(0);
		});
		// type : bg-image-url
		$('#sp-id-bg-image-url-edit-btn').on('click', function() {
			imgDialogType = 'bg-image-url';
			imageDialog.showModal();
			imageLibrarySearch();
			var bgImageUrl = getBgImageUrl( fdoc.find('.spEdit').first().css('background-image') );
			$('#sp-id-change-target-image-url').val(bgImageUrl);
			$('#sp-id-dialog-name-image').data('image-edit-type', 'image-src').find('.mdl-dialog__content').first().focus().scrollTop(0);
		});
		// common : change choose image src
		$('.sp-js-click-setChooseImgSrc').on('click', function() {
			var clickImgSrc = $(this).find('img').first().attr('src');
			var spEdit = fdoc.find('.spEdit').first();
			if(imgDialogType == 'img-src'){
				spEdit.attr('src',clickImgSrc);
				$('#sp-id-image-url-label').val(clickImgSrc);
			}else if(imgDialogType == 'bg-image-url'){
				spEdit.css('background-image','url(' + clickImgSrc + ')').css('background-repeat', 'no-repeat').css('background-position', '50% 50%');;
				$('#sp-id-bg-image-url-label').val(clickImgSrc);
			}
			imageDialog.close();
			// 履歴登録
			f_historyRegist('dialog : change choose image src');
		});
		// common : change target image url
		$('#sp-id-change-target-image-url-btn').on('click', function() {
			var targetImageUrl = $('#sp-id-change-target-image-url').val();
			var spEdit = fdoc.find('.spEdit').first();
			if(imgDialogType == 'img-src'){
				spEdit.attr('src',targetImageUrl);
				$('#sp-id-image-url-label').val(targetImageUrl);
			}else if(imgDialogType == 'bg-image-url'){
				spEdit.css('background-image','url(' + targetImageUrl + ')').css('background-repeat', 'no-repeat').css('background-position', '50% 50%');;
				$('#sp-id-bg-image-url-label').val(targetImageUrl);
			}
			imageDialog.close();
			// 履歴登録
			f_historyRegist('dialog : change target image url');
		});


		////-----------------------------------------------
		//// dialog : edit link url
		////-----------------------------------------------
		//var linkDialog = document.getElementById('sp-id-dialog-name-link');
		//linkDialog.querySelector('.close').addEventListener('click', function() {
		//	linkDialog.close();
		//});
		//$('#sp-id-link-edit-btn').on('click', function() {
		//	linkDialog.showModal();
		//	var spEdit = fdoc.find('.spEdit').first();
		//	var href = spEdit.attr('href');
		//	if(href == undefined && spEdit.closest('a').length > 0){
		//		href = spEdit.closest('a').attr('href');
		//	}
		//	$('#sp-id-dialog-input-link-url').val(href);
		//	
		//});
		//linkDialog.querySelector('.sp-js-click-ok').addEventListener('click', function() {
		//	fdoc.find('.spEdit').first().attr('href',$('#sp-id-dialog-input-href-url').val());
		//	linkDialog.close();
		//	// 履歴登録
		//	f_historyRegist('dialog : edit link url');
		//});

		//-----------------------------------------------
		// dialog : edit replace-item
		//-----------------------------------------------
		var replaceItemDialog = document.getElementById('sp-id-dialog-name-replace-item');
		replaceItemDialog.querySelector('.close').addEventListener('click', function() {
			replaceItemDialog.close();
		});
		$('#sp-id-replace-item-edit-btn').on('click', function() {
			replaceItemDialog.showModal();
			var replaceCode = fdoc.find('.spEdit').first().find('template').first().html();
			$('#sp-id-dialog-input-replace-code').val( jQuery.trim(replaceCode) );
		});
		replaceItemDialog.querySelector('.sp-js-click-ok').addEventListener('click', function() {
			var replaceCode = $('#sp-id-dialog-input-replace-code').val();
			//fdoc.find('.spEdit').first().find('template').first().html( jQuery.trim(replaceCode) ); // js入れると実行される。
			fdoc.find('.spEdit').first().find('template').replaceWith('<template>'+replaceCode+'</template>' ); 
			$('#sp-id-replace-item-label').val(replaceCode);
			replaceItemDialog.close();
			// 履歴登録
			f_historyRegist('dialog : edit replace-item');
		});

		//-----------------------------------------------
		// <document> upload image
		//-----------------------------------------------
		$('#sp-js-click-uploadImage').on('click',function(e){

			//function setEventUploadImage(inputTypeFileId, formId, setType) {
			//	// event set
			//	$('#' + inputTypeFileId).change(function(e) {
			//		//cc('image upload start');
			//		// 履歴登録
			//		////f_historyRegist('image upload start');
			//		var spEdit = fdoc.find('.spEdit').first();
			//		var tagName = spEdit[0].tagName;
			//		var formData = new FormData($('#' + formId).get(0));
			//		$.ajax({
			//			url: 'upload_image.php',
			//			type: 'POST',
			//			data: formData,
			//			processData: false,
			//			contentType: false,
			//			cache: false,
			//			dataType: 'json',
			//			timeout: 15000,
			//			beforeSend: function(XMLHttpRequest) {
			//				$("#sp-layer").show();
			//			},
			//			success: function(res) {
			//				//cc(res);
			//				if (res.uploadSuccessFlag == true) {
			//					cc('upload success');
			//					// cmd : image
			//					if (setType == 'image') {
			//						if (tagName == 'IMG') {
			//							spEdit.attr('src', res.uploadImgSrc).css('max-width', '100%');
			//						} else {
			//							contentDocument.execCommand('insertImage', false, res.uploadImgSrc);
			//						}
			//						// cmd : bg-image
			//					} else if (setType == 'bg-image') {
			//						spEdit.css('background', 'url(' + res.uploadImgSrc + ') no-repeat center center');
			//					}
			//				} else {
			//					// show error message
			//					alert(res.errorMsg);
			//				}
			//			},
			//			error: function(XMLHttpRequest, textStatus, errorThrown) {
			//				cc('error');
			//				cc(XMLHttpRequest);
			//				cc(textStatus);
			//				cc(errorThrown);
			//				cc('【ftpUpload】エラーが発生しました。画面はそのままでシステムユニットに連絡して下さい');
			//			},
			//			complete: function(XMLHttpRequest, textStatus) {
			//				//cc('complete');
			//				// input type file value reset. because for event onChange.
			//				$('#' + inputTypeFileId).val('');
			//				f_editable(spEdit);
			//			}
			//		});
			//		return false;
			//	});
			//}

		});
		// --- <document> upload image end ---

		//-----------------------------------------------
		// <document> upload HTML
		//-----------------------------------------------
		$('#sp-js-click-uploadHtml').on('click',function(e) {
			try {
				// confirmをすると処理が重くなる（gifアニメーションも止まる）ので、あとで自前confirmを作成する予定。
				if (confirm('FTPアップロードを行ってもよろしいですか？' + "\n\n" + '[このページのURL]' + "\n" + $('#accessUrl').val())) {

					unloadAlertFlag = false;

					//▼アップ前の削除処理--------------------

					// <head>HTML編集中なら、HTML反映してからアップロード
					var htmlHead = $('#sp-icon-panel-show-html-head');
					if (htmlHead.attr('data-on-off-status') == 'on') {
						htmlHead.trigger('click');
					}

					// <body>HTML編集中なら、HTML反映してからアップロード
					var htmlBody = $('#sp-icon-panel-show-html-body');
					if (htmlBody.attr('data-on-off-status') == 'on') {
						htmlBody.trigger('click');
					}

					// .spEditのクラス名
					fdoc.find('.spEdit').removeClass('spEdit');

					// .タグガイドクラス名
					fdoc.find('.sp-iframe-body').removeClass('sp-iframe-body');

					// ipkMenu
					fdoc.find('#ipkMenu').remove();

					//▲アップ前の削除処理--------------------

					// 整形後のHTMLを取得
					var htmlData = document.getElementById(fid).contentDocument.getElementsByTagName('html')[0].outerHTML;

					// POST用にセット
					$('#' + myTextareaId).val(htmlData);

					// サブミット
					$('#editForm').removeAttr("onsubmit").submit();
				}
			} catch (e) {
				var errMsg = '[exception][' + arguments.callee.name + '] 例外エラーが発生しました。画面はそのままでシステムユニットに連絡して下さい。' + "\n\n-------------------------------------------------------------\n" + e.message;
				console.log(errMsg);
				alert(errMsg);
			}
		});
		// --- <document> upload HTML end ---

		//-----------------------------------------------
		// <document> .sp-js-dragstart-dragItemDoc DnD event
		//-----------------------------------------------
		$('.sp-js-dragstart-dragItemDoc').on({

			//-----------------------------------------------
			// dragstart
			//-----------------------------------------------
			'dragstart': function(e) {
				//cc('.sp-js-dragstart-dragItemDoc : dragstart');

				var t = $(e.currentTarget);
				var dragId = t.attr('data-drag-id');
				dragFlag = true;

				if(dragId == 'grid'){

					dragObj = document.getElementById('sp-js-template').content.querySelector('#' + dragId);
					dragHeight = 20; // dragObj.height(); DOM上に存在しないOBJのためheightが存在しないので、固定値を入れておく。
					dragHtml = f_createGridHtml(t.data('no'));
					dragType = 'grid';
					
				}else{

					dragObj = document.getElementById('sp-js-template').content.querySelector('#' + dragId);
					dragHeight = 20; // dragObj.height(); DOM上に存在しないOBJのためheightが存在しないので、固定値を入れておく。
					dragHtml = dragObj.innerHTML;
					dragType = dragObj.getAttribute('data-drag-type');
					
				}
				
				// タグガイド表示
				//var tagGuide = $('.sp-js-click-showTagGuide');
				//if(!tagGuide.prop('checked')){
				//	tagGuide.trigger('click');
				//}
				
				editPosition = contentDocument.body.scrollTop;
				
				// 履歴登録
				f_historyRegist('dragstarg .ipk-menu-drag');
			},
			//-----------------------------------------------
			// dragend
			//-----------------------------------------------
			'dragend': function(e) {
				//cc('.sp-js-dragstart-dragItemDoc : dragend');

				e.preventDefault();
				fdoc.find('.sp-drop-here').removeClass('sp-drop-here');

				dragFlag = false;
				dragObj = '';
				dragHeight = '';
				dragHtml = '';
				dragType = '';
				
				//// タグガイド表示
				//var tagGuide = $('.sp-js-click-showTagGuide');
				//if(tagGuide.prop('checked')){
				//	tagGuide.trigger('click');
				//}
				
				editPosition = contentDocument.body.scrollTop;
				
				// 履歴登録
				f_historyRegist('dragend : dragItemDoc');
			},
		});
		// --- <document> .sp-js-dragstart-dragItemDoc DnD event end ---
		
		
		//-----------------------------------------------
		// <document> create grid total 12
		//-----------------------------------------------
		$('.sp-js-input-showGridDragButton').on('input',function(e){

			var t = $(this);
			var no = t.data('no');
			var gridCol = t.val();// '1 2 4 5';
			var gridColArr = gridCol.split(' ');

			var total = 0;
			for(var i = 0; i < gridColArr.length; i++){
				colNo = gridColArr[i];
				total += parseInt(colNo);
			}

			if(total == 12){

				$('#btn-drag-item-grid-'+no).prop('disabled',false).prop('draggable',true);

			}else{
			
				$('#btn-drag-item-grid-'+no).prop('disabled',true).prop('draggable',false);
			}

		});
		


		$('.sp-js-input-showGridDragButton').on('input',function(e){

			var t = $(this);
			var no = t.data('no');
			var gridCol = t.val();// '1 2 4 5';
			var gridColArr = gridCol.split(' ');

			var total = 0;
			for(var i = 0; i < gridColArr.length; i++){
				colNo = gridColArr[i];
				total += parseInt(colNo);
			}

			if(total == 12){

				$('#grid-drag-button-'+no).show();

			}else{
				$('#grid-drag-button-'+no).hide();
			}

		});

		//####################################################################################################
		//###### <document> INIT END #########################################################################
		//####################################################################################################





























































































		//####################################################################################################
		//###### <function> INIT START #######################################################################
		//####################################################################################################

		//-----------------------------------------------
		//
		// 【１】f_showIpkMenu
		//
		//-----------------------------------------------
		function f_showIpkMenu(t) {
			//var tagName = t[0].tagName;
			var targetWidth = t.width() + parseInt(t.css('padding-left'), 10) + parseInt(t.css('padding-right'), 10);
			var tOffset = t.offset();
			var positionTop = tOffset.top - 20; // ipkMenuの高さと同じ分引く。
			var positionLeft = targetWidth + tOffset.left - 168;
			//var positionLeft = targetWidth + tOffset.left - 69;
			//var positionLeft = tOffset.left;

			if (positionTop < 5) {
				positionTop = 5;
			}

			//-----------------------------------------------
			// ipkMenu表示
			//-----------------------------------------------
			if (fdoc.find('#ipkMenu').length == 0) {
				fdoc.find('body').append(ipkMemuHtml);
			}
			var ipkMenu = fdoc.find('#ipkMenu').first();

			// コマンドボタン表示切替
			//if(t.hasClass('container')){
			//	ipkMenu.find('.ipkMenuCmdBtn').css('visibility','hidden');
			//	ipkMenu.find('.ipk-menu-setting').css('visibility','visible');
			//}else{
			//	ipkMenu.find('.ipkMenuCmdBtn').css('visibility','visible');
			//}
			ipkMenu.find('.ipkMenuCmdBtn').css('visibility','visible');

			ipkMenu.css('display', 'inline-block').css('top', positionTop).css('left', positionLeft).show();
		}
		//-----------------------------------------------
		//
		// 【２】f_editable
		//
		//-----------------------------------------------
		function f_editable(t) {
			////f_historyRegist('elm click. edit start!');

			// 現在編集中の要素をクリックされた場合
			if(t.hasClass('spEdit')){

				//-----------------------------------------------
				// spEdit直クリックダイアログ表示
				//-----------------------------------------------
				if(t.prop('tagName') == 'IMG'){
					$('#sp-id-img-src-edit-btn').trigger('click');
        
				}else if(t.data('item-type') == 'replace-item'){
					$('#sp-id-replace-item-edit-btn').trigger('click');
        
				}
				
			}else{
			  // 初期化
			  var spEdit = fdoc.find('.spEdit').first().removeClass('spEdit').removeAttr('contenteditable');

			  // クリック要素表示
			  t.addClass('spEdit');

			  // 編集可能にする
			  if(t.hasClass('sp-item')){
				
				var itemType = t.data('item-type');
				
				if(itemType != 'image' && itemType != 'replace-item'){
				
					t.attr('contenteditable','true');
					
					//if(itemType != 'button'){
					//	contentDocument.execCommand('selectAll', false, null);
					//}
				}
			  }

				f_showIpkMenu(t);

			  //f_showIpkMenu(t);
			  //f_resetHiddenBox();
			  // クリックと同時に全選択＋削除（動作確認済み）
			  //contentDocument.execCommand('selectAll',false,null);
			  //contentDocument.execCommand('selectAll',false,null);
			  //contentDocument.execCommand('delete',false,null);
			  //f_setSpEditComputed(t,spEdit);// 現在は.spEditそのもののタグ情報を表示。.spEdit内のクリック要素は表示しない。仕様変更ある時によろしく。
			  //f_refectIconPanel(t);
			  //contentWidndow.focus();
			  t.focus(); // これでキャレット表示される
			  
			  editPosition = contentDocument.body.scrollTop;
			  //ccc(editPosition);
			  
			  // 
			  f_historyRegist('.spEdit 設定');
			  
			}
		}
		//-----------------------------------------------
		//
		// 【３】f_execcommand
		//
		//-----------------------------------------------
		function f_execcommand(e){

			var selection = contentDocument.getSelection();

			// キャレットない、かつ選択範囲がなければ終了（=これ以降の処理は、キャレット、または選択範囲がある）
			if(selection.rangeCount == 0){
				return;
			}

			var ct	= $(e.currentTarget);
			var cmd = ct.attr('data-cmd');
			var val = ct.val();

			//unlink系は選択範囲なくても実行可能
			if(!cmd.match(/^(unlink|undo|redo|justifyLeft|justifyCenter|justifyRight)$/)){
				// キャレットはあるが、選択範囲がない（=テキストが選択されていない）
				if(selection.isCollapsed == true){
					return;
				}
			}

			// -- これ以降の処理はテキスト選択されている状態（unlink系以外）

			// set inline style.
			contentDocument.execCommand('styleWithCSS', true, null);

			// コマンドに応じて処理実行
			//cc(cmd+'='+val);
			switch(cmd){

				case 'bold':
				case 'underline':
				case 'italic':
				case 'strikethrough':
				case 'fontName':
				case 'foreColor':
				case 'backColor':
					contentDocument.execCommand(cmd, false, val);
					fdoc.find('.spEdit').first().focus();
					break;

				case 'fontSize':
					var unit     = $('#sp-id-font-size-unit').val();
					if(val > 0){
						contentDocument.execCommand(cmd, false, '7');// 固定で<span style="font-size: -webkit-xxx-large;">******</span>
						fdoc.find('.spEdit').find('span[style*="font-size: -webkit-xxx-large"]').css('font-size', val+unit);
					}
					// input type number はフォーカス移すとだめ（連続入力できない）。とりあえずコマンド後フォーカスはしないでおく。
					//fdoc.find('.spEdit').first().focus();
					break;

				case 'lineHeight':
					contentDocument.execCommand('subscript', false, null);// 固定で<span style="vertical-align: sub;">*****</span>
					fdoc.find('.spEdit').find('span[style*="vertical-align: sub"]').css('vertical-align','').css('line-height', val+'px');
					// input type number はフォーカス移すとだめ（連続入力できない）。とりあえずコマンド後フォーカスはしないでおく。
					//fdoc.find('.spEdit').first().focus();
					break;

				default:
					cc('unknown command');
					break;
			}

			//fdoc.find('.sp-hidden-box').hide();
			// contentWidndow.focus();

			// 履歴登録
			f_historyRegist('f_execcommand');
		}
		//-----------------------------------------------
		//
		// 【４】f_setSpEditCss
		//
		//-----------------------------------------------
		function f_setSpEditCss(e){

			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}
			
			var historyRegist = true;
			var ct  = $(e.currentTarget);
			var css = ct.attr('data-css');
			var val = ct.val();
			var value = ct.data('value');
			
			switch(css){

				case 'background-color':
				case 'border-color':
				case 'border-style':
				case 'box-shadow':
					//ccc();
					//cc(css);
					//cc(val);
					spEdit.css(css, val);
					break;

				case 'text-align':
					spEdit.css(css, value);
					break;

				case 'border-radius':
				case 'border-width':
				case 'margin':
				case 'margin-bottom':
				case 'margin-left':
				case 'margin-right':
				case 'margin-top':
				case 'padding':
				case 'padding-bottom':
				case 'padding-left':
				case 'padding-right':
				case 'padding-top':
					spEdit.css(css, val+'px');
					break;

				case 'background-image':
					spEdit.css(css, 'url(' + val + ')').css('background-repeat', 'no-repeat').css('background-position', '50% 50%');
					break;

				case 'max-width':
					// rowの幅設定は内部ではcontainer幅設定
					if(spEdit.hasClass('sp-row')){
						spEdit.closest('.sp-container').css('max-width', val+'px').css('width','auto');
					}else{
						spEdit.css('max-width', val+'px').css('width','auto');
					}
					break;

				case 'page-max-width':
					fdoc.find('.sp-container').css('max-width', val+'px');
					break;
					
				case 'opacity':
					var overlay = spEdit.find('.sp-overlay');
					if(overlay.length > 0){
						var overlayRgb = overlay.css('background-color');
						var overlayRgbArr = rgbToArr(overlayRgb);
						var rgba = 'rgba(' + overlayRgbArr[0] + ',' + overlayRgbArr[1] + ',' + overlayRgbArr[2] + ',' + val + ')';
						if(val == 0){
							overlay.css('background-color', overlayRgb);
						}else{
							overlay.css('background-color', rgba);
						}
					}else{
						var spEditRgb = spEdit.css('background-color');
						var spEditRgbArr = rgbToArr(spEditRgb);
						var rgba = 'rgba(' + spEditRgbArr[0] + ',' + spEditRgbArr[1] + ',' + spEditRgbArr[2] + ',' + val + ')';
						if(val == 0){
							spEdit.css('background-color', spEditRgb);
						}else{
							spEdit.css('background-color', rgba);
						}
					}
					historyRegist = false;
					break;

				case 'transform-rotate':
					spEdit.css('transform', 'rotate('+val+'deg)');
					break;

				default:
				  cc('unknown css property');
				  break;
			}

			//fdoc.find('.sp-hidden-box').hide();
			//input type number はフォーカス移すとだめ（連続入力できない）。とりあえずコマンド後フォーカスはしないでおく。
			//fdoc.find('.spEdit').first().focus();
			// contentWidndow.focus();
			
			if(historyRegist == true){
				// 履歴登録
				f_historyRegist('f_setSpEditCss');
			}
		}
		//-----------------------------------------------
		//
		// 【５】f_setSpEditAttr
		//
		//-----------------------------------------------
		function f_setSpEditAttr(e){

			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}

			var ct   = $(e.currentTarget);
			var attr = ct.attr('data-attr');
			var val  = ct.val();
			
			spEdit.attr(attr, val);

			//fdoc.find('.sp-hidden-box').hide();
			//input type number はフォーカス移すとだめ（連続入力できない）。とりあえずコマンド後フォーカスはしないでおく。
			//fdoc.find('.spEdit').first().focus();
			// contentWidndow.focus();

			// 履歴登録
			f_historyRegist('f_setSpEditAttr');
		}
		//-----------------------------------------------
		//
		// 【６】f_replaceDragItem
		//
		//-----------------------------------------------
		function f_replaceDragItem(e, t) {

			//-----------------------------------------------
			// 変数定義
			//-----------------------------------------------
			var tagName = t[0].tagName;
			var thisHeight = t.height();
			var draggingHeight = dragHeight; //$(dragHtml).height(); // うまく高さを取得できない http://dev.adokikaku.com/cat-js/99/div%E7%AE%B1%E3%81%AE%E9%AB%98%E3%81%95%E3%81%8C%E5%8F%96%E5%BE%97%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%EF%BC%81%E3%81%AE%E5%8E%9F%E5%9B%A0%EF%BC%91/
			var placeHolder = fdoc.find('.sp-drop-here').first();
			var placeHolderIndex = placeHolder.index();
			var thisIndex = t.index();
			var pageY = e.originalEvent.pageY;
			//console.log(placeHolderIndex,thisIndex);
			//cc('dragover tag ='+tagName);

			//-----------------------------------------------
			// 以下の状態の場合は、何もしない
			//-----------------------------------------------
			// sp-section が ドラッグアイテムより大きい（高い）場合
			if (thisHeight > draggingHeight) {

				// Dead zone?
				var deadZone = thisHeight - draggingHeight;
				var offsetTop = t.offset().top;

				//console.log(placeHolderIndex,thisIndex);// これ関しては確認OK。信じてよし！！
				//console.log(pageY, offsetTop + deadZone);

				// fdoc内が以下の状態
				//
				//	sp-drop-here
				//	sp-section（ここに上からカーソルが入りdragenter発生。カーソル位置が、まだsp-sectionの上段の場合は処理終了。）
				//
				if (placeHolderIndex < thisIndex && pageY < offsetTop + deadZone) {
					return false;
				}

				// fdoc内が以下の状態
				//
				//	sp-section（ここに下からカーソルが入りdragenter発生。カーソル位置が、まだsp-sectionの下段の場合は処理終了。）
				//	sp-drop-here
				//
				if (placeHolderIndex > thisIndex && pageY > offsetTop + thisHeight - deadZone) {
					return false;
				}
			}


			fdoc.find('.sp-drop-here').remove();
			//cc('remove: sp-drop-here!!');

			//-----------------------------------------------
			// DOM追加
			//-----------------------------------------------
			// fdoc内が以下の状態
			//
			//	sp-drop-here
			//	sp-section（ここに上からカーソルが入りdragenter発生）
			//
			if (placeHolderIndex < thisIndex) {
				t.after(dragHtml);
				//console.log('after!!',dragHtml);

				// fdoc内が以下の状態
				//
				//	sp-section（ここに下からカーソルが入りdragenter発生）
				//	sp-drop-here
				//
			} else {
				t.before(dragHtml);
				//console.log('before!!',dragHtml);
			}
		}
		//-----------------------------------------------
		//
		// 【７】f_setKeyCode
		//
		//-----------------------------------------------
		function f_setKeyCode(os) {
			if (os == 'mac') {
				keyCodeShift = 16;
				keyCodeCtrl = 91;
				keyCodeEnter = 13;
				keyCodeZ = 90;
				keyCodeY = 89;
				keyCodeV = 86;
			} else {
				keyCodeShift = 16;
				keyCodeCtrl = 17;
				keyCodeEnter = 13;
				keyCodeZ = 90;
				keyCodeY = 89;
				keyCodev = 86;
			}
		}
		//-----------------------------------------------
		//
		// 【８】f_createGridHtml
		//
		//-----------------------------------------------
		function f_createGridHtml(no){

			var gridColStr = $('#input-grid-col-'+no).val();
			var gridColArr = gridColStr.split(' ');
			var gridHtml = '';
			var colNo = '';

			gridHtml += '<div class="row sp-drop-here">'+"\n";
			for(var i = 0; i < gridColArr.length; i++){
				colNo = gridColArr[i];
				gridHtml += '	<div class="col-sm-'+colNo+'">'+"\n";
				gridHtml += '		<p class="sp-item" data-item-type="text">'+colNo+'カラム</p>'+"\n";
				gridHtml += '	</div>'+"\n";
			}
			gridHtml += '</div>'+"\n";

			//console.log(gridHtml);
			return gridHtml;
		}
		//-----------------------------------------------
		//
		// 【９】f_ipkMenuCmdExec
		//
		//-----------------------------------------------
		function f_ipkMenuCmdExec(t){

			var spEdit = fdoc.find('.targetOutline').first();

			if(spEdit.length == 0){
				return;
			}

			// t = cmd button
			var cmd = t.attr('data-cmd');

			switch(cmd){

				case 'delete':
					spEdit.remove();
					fdoc.find('#ipkMenu').hide();
					break;

				case 'copy':
					spEdit.after(spEdit.clone(true).removeAttr('contenteditable').removeClass('spEdit').removeClass('targetOutline'));
					break;

				case 'itemAdd':
					spEdit.after('<div class="sp-item-replace sp-item"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>');
					break;

				default:
					cc('unknown command'+cmd);
					break;
			}
			
			// 履歴登録
			f_historyRegist('f_ipkMenuCmdExec');
		}
		//-----------------------------------------------
		//
		// 【１０】f_setSpEditClass
		//
		//-----------------------------------------------
		function f_setSpEditClass(e){
			
			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}
			
			var ct  = $(e.currentTarget);
			var className = ct.val();
			var classPrefix = ct.data('class-prefix');
			regexp = new RegExp('\\b' + classPrefix + '\\S+', 'g'),

			// classPrefix で始まるclassをすべて削除
			spEdit.removeClass(function(index, className) {
			    return (className.match(regexp) || []).join(' ');
			});
			
			// 指定クラス名があるなら、クラス設定（デフォルト値ならクラス削除のみで終了）
			if(className.length > 0){
				spEdit.addClass(className);
			}
			
			// 履歴登録
			f_historyRegist('f_setSpEditClass');
		}
		//-----------------------------------------------
		//
		// 【１１】f_setAnimation
		//
		//-----------------------------------------------
		function f_setAnimation(e){
			
			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}
			
//var id       = 'sekiya001';
//var aniClass = 'flash';
//var second   = '3';
//var scriptId = id + '_' + aniClass
//var script = "";
//script += "<script id="+scriptId+">\n";
//script += "    var start_"+scriptId+" = function(){\n";
//script += "        $('#"+id+"').addClass('"+aniClass+"').addClass('animated');\n";
//script += "        console.log('start_"+scriptId+"');\n";
//script += "        setTimeout(stop_"+scriptId+", 500);\n";
//script += "    };\n";
//script += "    \n";
//script += "    var stop_"+scriptId+" = function(){\n";
//script += "        $('#"+id+"').removeClass('"+aniClass+"').removeClass('animated');\n";
//script += "        console.log('stop_"+scriptId+"');\n";
//script += "        setTimeout(start_"+scriptId+", "+second+"000);\n";
//script += "    };\n";
//script += "    \n";
//script += "    start_"+scriptId+"();\n";
//script += "</script>\n";
//fdoc.find('body').append(script);


			
			var ct  = $(e.currentTarget);
			var className = ct.val();
			var classPrefix = ct.data('class-prefix');
			regexp = new RegExp('\\b' + classPrefix + '\\S+', 'g'),

			// classPrefix で始まるclassをすべて削除
			spEdit.removeClass(function(index, className) {
			    return (className.match(regexp) || []).join(' ');
			});
			
			// 指定クラス名があるなら、クラス設定（デフォルト値ならクラス削除のみで終了）
			if(className.length > 0){
				spEdit.addClass(className);
			}
			
			
			//-----------------------------------------------
			// 2016-09-05(月)動作した！！！！！
			//-----------------------------------------------
			var idName = 'sp-id-'+$.now();
			spEdit.attr('id',idName);
			spEdit.removeClass('Attention Seekers Bouncing Entrances Bouncing Exits Fading Entrances Fading Exits Flippers Lightspeed Rotating Entrances Rotating Exits Sliding Entrances Sliding Exits Specials Zoom Entrances Zoom Exits bounce bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp change-setAnimation fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flash flip flipInX flipInY flipOutX flipOutY hinge jello lightSpeedIn lightSpeedOut pulse rollIn rollOut rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight rubberBand shake slideInDown slideInLeft slideInRight slideInUp slideOutDown slideOutLeft slideOutRight slideOutUp swing tada wobble zoomIn zoomInDown zoomInLeft zoomInRight zoomInUp zoomOut zoomOutDown zoomOutLeft zoomOutRight zoomOutUp');
			
			if(className != ''){
			
				cleartimer = '';
				if(cleartimer){
					clearInterval(cleartimer);
				}
				cleartimer = setAniTest(idName, className, '2000');
			}
			
			// 履歴登録
			f_historyRegist('f_setSpEditClass');
		}
		//-----------------------------------------------
		// 【--】setAni
		//-----------------------------------------------
		function setAniTest(idName, aniClass, aniSecond){

			var t = fdoc.find('#'+idName);

			setInterval(function(e){
				if(t.hasClass(aniClass)){
					t.removeClass(aniClass).removeClass('animated');
					console.log('remove');
				}else{
					t.addClass(aniClass).addClass('animated');
					console.log('add');
				}
			}, aniSecond);
		}
		//-----------------------------------------------
		//
		// 【--】f_setAnimationTest
		//
		//-----------------------------------------------
		function f_setAnimationTest(e){
			
			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}
			
			
			


//var id       = 'sekiya001';
//var aniClass = 'flash';
//var second   = '3';
//var scriptId = id + '_' + aniClass
//var script = "";
//script += "<script id="+scriptId+">\n";
//script += "    var start_"+scriptId+" = function(){\n";
//script += "        $('#"+id+"').addClass('"+aniClass+"').addClass('animated');\n";
//script += "        console.log('start_"+scriptId+"');\n";
//script += "        setTimeout(stop_"+scriptId+", 500);\n";
//script += "    };\n";
//script += "    \n";
//script += "    var stop_"+scriptId+" = function(){\n";
//script += "        $('#"+id+"').removeClass('"+aniClass+"').removeClass('animated');\n";
//script += "        console.log('stop_"+scriptId+"');\n";
//script += "        setTimeout(start_"+scriptId+", "+second+"000);\n";
//script += "    };\n";
//script += "    \n";
//script += "    start_"+scriptId+"();\n";
//script += "</script>\n";
//fdoc.find('body').append(script);


			
			var ct  = $(e.currentTarget);
			var className = ct.val();
			var classPrefix = ct.data('class-prefix');
			regexp = new RegExp('\\b' + classPrefix + '\\S+', 'g'),

			// classPrefix で始まるclassをすべて削除
			spEdit.removeClass(function(index, className) {
			    return (className.match(regexp) || []).join(' ');
			});
			
			// 指定クラス名があるなら、クラス設定（デフォルト値ならクラス削除のみで終了）
			if(className.length > 0){
				spEdit.addClass(className);
			}
			
			
			//-----------------------------------------------
			// 2016-09-05(月)動作した！！！！！
			//-----------------------------------------------
			var idName = 'sp-id-'+$.now();
			spEdit.attr('id',idName);
			spEdit.removeClass('Attention Seekers Bouncing Entrances Bouncing Exits Fading Entrances Fading Exits Flippers Lightspeed Rotating Entrances Rotating Exits Sliding Entrances Sliding Exits Specials Zoom Entrances Zoom Exits bounce bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp change-setAnimation fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flash flip flipInX flipInY flipOutX flipOutY hinge jello lightSpeedIn lightSpeedOut pulse rollIn rollOut rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight rubberBand shake slideInDown slideInLeft slideInRight slideInUp slideOutDown slideOutLeft slideOutRight slideOutUp swing tada wobble zoomIn zoomInDown zoomInLeft zoomInRight zoomInUp zoomOut zoomOutDown zoomOutLeft zoomOutRight zoomOutUp');
			
			if(className != ''){
			
				cleartimer = '';
				if(cleartimer){
					clearInterval(cleartimer);
				}
				cleartimer = setAniTest(idName, className, '2000');
			}
			
			// 履歴登録
			f_historyRegist('f_setSpEditClass');
		}
		//-----------------------------------------------
		//
		// 【１２】f_setParallax
		//
		//-----------------------------------------------
		function f_setParallax(e){
			
			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}
			
			if($(this).prop('checked')){
				spEdit.css('background-attachment','fixed').css('background-size','cover');
			}else{
				spEdit.css('background-attachment','inherit').css('background-size','inherit');
			}
			
			// 履歴登録
			f_historyRegist('f_setSpEditClass');
		}
		//-----------------------------------------------
		//
		// 【１２】f_setOverlay
		//
		//-----------------------------------------------
		function f_setOverlay(e){
			
			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}
			
			if($(this).prop('checked')){
				
				if(spEdit.find('.sp-overlay').length == 0){
					spEdit.wrapInner('<div class="sp-overlay"></div>');
					//cc('wrapInner');
				}
			
			}else{
			
				if(spEdit.find('.sp-overlay').length > 0){
					spEdit.find('.sp-overlay').children('div').first().unwrap('<div class="sp-overlay"></div>');
				}
			}
			
			// 履歴登録
			f_historyRegist('f_setSpEditClass');
		}
		//-----------------------------------------------
		//
		// 【】f_editTable
		//
		//-----------------------------------------------
		function f_editTable(e){
			var spEdit = fdoc.find('.spEdit').first();
			var ct = $(e.currentTarget);
			var cmd = ct.data('cmd');
			var parentRow = clickCell.closest('tr');
			var newRow = parentRow.clone(true); // TD内部テキスト削除版
			
			switch(cmd){
				case 'row-add-top':
					parentRow.before(newRow);
					parentRow.prev().find('td').html(''); // コピー行のテキストした内容を削除
					parentRow.prev().find('th').html(''); // コピー行のテキストした内容を削除
					break;                     
				case 'row-add-bottom':
					parentRow.after(newRow);
					parentRow.next().find('td').html(''); // コピー行のテキストした内容を削除
					parentRow.next().find('th').html(''); // コピー行のテキストした内容を削除
					break;
				case 'row-delete':
					parentRow.remove();
					break;
				case 'col-add-left':
				case 'col-add-right':
				case 'col-delete':
					f_editTableCol(cmd);
					break;
			}
			
			spEdit.focus();
		}
		//-----------------------------------------------
		//
		// 【】table col add / delete
		//
		//-----------------------------------------------
		function f_editTableCol(type){
			var cellIndex = clickCell.context.cellIndex;
			//cc(rowCount);
			//cc(cellCount);
			//ccc(cellIndex);
			//cc(parentRow.find('td').index(clickCell));
			//cc(parentRow.children().length);
			//cc(parentRow.children().index(clickCell));
			//cc(parentRow.children().get(0));
			//cc(clickCell.cellIndex);
			//cc(clickCell.context.cellIndex);
			
			fdoc.find('.spEdit').first().find('tr').each(function(e){
				if(type == 'col-add-right'){
					var cellList = $(this).children();
					var newCell = cellList.eq(cellIndex).clone(true);
					cellList.eq(cellIndex).after(newCell);
					cellList.eq(cellIndex).next().html(''); // コピー行のテキストした内容を削除
					cellList.eq(cellIndex).next().html(''); // コピー行のテキストした内容を削除
				}else if(type == 'col-add-left'){
					var cellList = $(this).children();
					var newCell = cellList.eq(cellIndex).clone(true);
					cellList.eq(cellIndex).before(newCell);
					cellList.eq(cellIndex).prev().html(''); // コピー行のテキストした内容を削除
					cellList.eq(cellIndex).prev().html(''); // コピー行のテキストした内容を削除
				}else if(type == 'col-delete'){
					var cellList = $(this).children();
					cellList.eq(cellIndex).remove();
				}
			});
		}
		//####################################################################################################
		//###### <function> INIT END #######################################################################
		//####################################################################################################







































































































		//####################################################################################################
		//###### <Refect Computed function> INIT START #######################################################
		//####################################################################################################
		/**
		 * Refect Computed Tag Info, When .spEdit Click
		 *
		 * spEdit.css は 内部で getComputedStyle(e.target) を使用している
		 */
		function f_setSpEditComputed(t,spEdit) {

			var tagName = t[0].tagName;
			var closeLink = spEdit.closest('a');
			var defaultTabId = '';
			
			//var beforeTabI$('.sp-js-tab.is-active').first());
			
			$('#sp-id-tab-drag-item').removeClass('is-active');
			$('#sp-id-tab-format').addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
			
			//-----------------------------------------------
			// フォーマットBOX 内部表示設定
			//-----------------------------------------------
			itemType = spEdit.data('item-type');
			
			$('#sp-id-format-noselect-msg').hide();
			$('#sp-id-format-tab-menu').show();
			$('#sp-id-format-tab-contents').show();
			//$('.sp-js-tab').hide().removeClass('is-active');
			//$('.sp-js-tab').hide();
			
			// スタイル:<select> 表示
			$('.sp-id-spEdit-style').hide();
			$('#sp-id-spEdit-style-'+itemType).show();
			
			// 各タブ表示
			if(itemType == 'image'){
				
				defaultTabId = '#tab-name-image';
				
				$('#tab-name-style').show();
				$('#tab-name-text').hide();
				//$('#tab-name-image').show().addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
				$('#tab-name-image').show(); // clickしないとコンテンツ表示切り替わらない。
				$('#tab-name-table').hide();
				$('#tab-name-replace-item').hide();
				$('#tab-name-gimmick').show();
				$('#tab-name-box-align').show();
				
			}else if(itemType == 'table'){

				defaultTabId = '#tab-name-table';

				$('#tab-name-style').show();
				$('#tab-name-text').show();
				$('#tab-name-image').hide();
				//$('#tab-name-table').show().addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
				$('#tab-name-table').show();
				$('#tab-name-replace-item').hide();
				$('#tab-name-gimmick').show();
				$('#tab-name-box-align').show();

			}else if(itemType == 'replace-item'){

				defaultTabId = '#tab-name-replace-item';
				
				$('#tab-name-style').hide();
				$('#tab-name-text').hide();
				$('#tab-name-image').hide();
				$('#tab-name-table').hide();
				//$('#tab-name-replace-item').show().addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
				$('#tab-name-replace-item').show();
				//$('#tab-name-gimmick').hide();
				$('#tab-name-box-align').hide();
			
			// layout
			}else if(itemType == undefined){

				defaultTabId = '#tab-name-style';

				//$('#tab-name-style').show().addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
				$('#tab-name-style').show();
				$('#tab-name-text').hide();
				$('#tab-name-image').hide();
				$('#tab-name-table').hide();
				$('#tab-name-replace-item').hide();
				$('#tab-name-gimmick').show();
				$('#tab-name-box-align').show();
			
			}else{
				
				defaultTabId = '#tab-name-text';
				
				$('#tab-name-style').show()
				//$('#tab-name-text').show().addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
				$('#tab-name-text').show();
				$('#tab-name-image').hide();
				$('#tab-name-table').hide();
				$('#tab-name-replace-item').hide();
				$('#tab-name-gimmick').show();
				$('#tab-name-box-align').show();
			}
			
			//-----------------------------------------------
			// アクティブタブ決定
			//-----------------------------------------------
			var activeTab = $('.sp-js-tab.is-active');
			var activeTabId = activeTab.attr('id');
			
			// activeタブを削除
			$('.sp-js-tab').removeClass('is-active');
			
			// activeタブが残っているなら、それをデフォルト表示
			if(activeTab.is(':visible')){
				$('#'+activeTabId).addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
			}else{
				$(defaultTabId).addClass('is-active').trigger('click'); // clickしないとコンテンツ表示切り替わらない。
			}
			
			
			//-----------------------------------------------
			// ラベル セット
			//-----------------------------------------------
			// image
			$('#sp-id-image-url-label').val(spEdit.attr('src'));
			
			// link
			var href = spEdit.attr('href');
			if(!href && closeLink.length > 0){
				href = closeLink.attr('href');
			}
			$('#sp-id-link-url-label').val(href);

			// replace-item
			$('#sp-id-replace-item-label').val(fdoc.find('.spEdit').first().find('template').first().html());
			
			







			




			//-----------------------------------------------
			//
			// 配置
			//
			//-----------------------------------------------

            //-----------------------------------------------
            // 配置 : BOX配置
            //-----------------------------------------------
			var boxAlign = '';
			
			if(spEdit.hasClass('sp-box-algin-right')){
				boxAlign = 'sp-box-algin-right';
			}else if(spEdit.hasClass('sp-box-algin-center')){
				boxAlign = 'sp-box-algin-center';
			}else if(spEdit.hasClass('sp-box-algin-left')){
				boxAlign = 'sp-box-algin-left';
			}
			$('#sp-id-spEdit-box-align').val(boxAlign);
			
            //-----------------------------------------------
            // 配置 : 幅
            //-----------------------------------------------
			// max-width trigger使うとspEditに反映するので×
			//var maxWidth = spEdit.css('max-width') != 'none' ? parseInt(spEdit.css('max-width')) : 0; // max-width設定なしの場合0とする。
			var maxWidth = '';
			
			if(spEdit.hasClass('sp-row')){
				var closeContainer = spEdit.closest('.sp-container');
				maxWidth = closeContainer.css('max-width') != 'none' ? parseInt(closeContainer.css('max-width')) : parseInt(closeContainer.css('width')); // max-width設定なしの場合は、通常widthとする。
			}else{
				maxWidth = spEdit.css('max-width') != 'none' ? parseInt(spEdit.css('max-width')) : parseInt(spEdit.css('width')); // max-width設定なしの場合は、通常widthとする。
			}
			//document.getElementById('sp-id-max-width').MaterialSlider.change(maxWidth);
			$('#sp-id-max-width').val(maxWidth);

            //-----------------------------------------------
            // 配置 : ページ幅
            //-----------------------------------------------
			var firstContainer = fdoc.find('.sp-container').first()
			var pageMaxWidth = firstContainer.css('max-width') != 'none' ? parseInt(firstContainer.css('max-width')) : parseInt(firstContainer.css('width')); // max-width設定なしの場合は、通常widthとする。
			$('#sp-id-page-max-width').val(pageMaxWidth);
			
			
            //-----------------------------------------------
            // 配置 : 回転
            //-----------------------------------------------
			var deg = 0;
			var spEditStyle = spEdit.attr('style');
			if(spEditStyle != undefined){
				var tempArr = spEdit.attr('style').split('rotate(');
				if(tempArr.length > 1){
					var tempArr2 = tempArr[1].split('deg)');
					deg = tempArr2[0];
				}
			}
			//var deg = document.getElementById('htmlBody_ifr').contentDocument.querySelector('.spEdit').style('transform'); // ベタで書いても2回目以降取得できない。chromeコンソールからでも同じMDLのせい？？
			document.getElementById('sp-id-transform-rotate').MaterialSlider.change(deg);
			$('#sp-id-transform-rotate-label').text(deg);

            //-----------------------------------------------
            // 配置 : 余白
            //-----------------------------------------------
			$('#sp-id-padding').val(parseInt(spEdit.css('padding-top')));
			$('#sp-id-padding-top').val(parseInt(spEdit.css('padding-top')));
			$('#sp-id-padding-bottom').val(parseInt(spEdit.css('padding-bottom')));
			$('#sp-id-padding-left').val(parseInt(spEdit.css('padding-left')));
			$('#sp-id-padding-right').val(parseInt(spEdit.css('padding-right')));

			$('#sp-id-margin').val(parseInt(spEdit.css('margin-top')));
			$('#sp-id-margin-top').val(parseInt(spEdit.css('margin-top')));
			$('#sp-id-margin-bottom').val(parseInt(spEdit.css('margin-bottom')));
			// 右寄せ/中央寄せ/左寄せされている場合、左右のmarginは空をセット
			//ccc(boxAlign);
			if(boxAlign != ''){
				$('#sp-id-margin-left').val('');
				$('#sp-id-margin-right').val('');
			}else{
				$('#sp-id-margin-left').val(parseInt(spEdit.css('margin-left')));
				$('#sp-id-margin-right').val(parseInt(spEdit.css('margin-right')));
			}
			
			
			
			//-----------------------------------------------
			//
			// テキスト
			//
			//-----------------------------------------------

            //-----------------------------------------------
            // テキスト : フォント
            //-----------------------------------------------
			$('#sp-id-font-name').val(t.css('font-family'));
			$('#sp-id-font-size').val(parseInt(t.css('font-size')));
			$('#sp-id-font-size-unit').val(t.css('font-size').replace(/[0-9]/g,''));
			$('#sp-id-fore-color').val(rgbToHex(t.css('color')));
			$('#sp-id-back-color').val(rgbToHex(t.css('background-color')));
			//ccc(rgbToHex(t.css('color')));
			//ccc(rgbToHex(t.css('background-color')));
			//$('#sp-id-font-size-range').val(parseInt(t.css('font-size')));
			t.css('font-weight') == 'bold'   ? $('#sp-id-bold').addClass('active')   : $('#sp-id-bold').removeClass('active');
			t.css('font-style')  == 'italic' ? $('#sp-id-italic').addClass('active') : $('#sp-id-italic').removeClass('active');
			var textDecoration = t.css('text-decoration');
			textDecoration.indexOf('underline')    != -1 ? $('#sp-id-underline').addClass('active')     : $('#sp-id-underline').removeClass('active');
			textDecoration.indexOf('line-through') != -1 ? $('#sp-id-strikethrough').addClass('active') : $('#sp-id-strikethrough').removeClass('active');

            //-----------------------------------------------
            // テキスト : 配置
            //-----------------------------------------------
			var textAlign = spEdit.css('text-align');
			$('.sp-js-text-align-btn').removeClass('active');
			if(textAlign == 'center'){
				$('#sp-id-text-align-center').addClass('active');
			} else if(textAlign == 'left'){
				$('#sp-id-text-align-left').addClass('active');
			} else if(textAlign == 'right'){
				$('#sp-id-text-align-right').addClass('active');
			}

            //-----------------------------------------------
            // テキスト : 行間
            //-----------------------------------------------
			$('#sp-id-line-height').val(parseInt(t.css('line-height')));

			//-----------------------------------------------
			//
			// スタイル
			//
			//-----------------------------------------------

            //-----------------------------------------------
            // スタイル：Background
            //-----------------------------------------------
            var backgroundColorRgb     = spEdit.css('background-color');
            var backgroundColorHex     = '';
            var backgroundColorOpacity = '';
            var bgImageUrl             = getBgImageUrl(spEdit.css('background-image'));

            if(backgroundColorRgb == 'rgba(0, 0, 0, 0)'){
                backgroundColorRgb     = backgroundColorRgb;
                backgroundColorHex     = rgbToHex(backgroundColorRgb);
                backgroundColorOpacity = '1';
            }else{
                backgroundColorRgb     = backgroundColorRgb;
                backgroundColorHex     = rgbToHex(backgroundColorRgb);
                backgroundColorOpacity = rgbToOpacity(backgroundColorRgb);
            }
            
            if(bgImageUrl == 'none'){
                backgroundImage = '';
            }

            // bg-image
            $('#sp-id-bg-image-url-label').val(bgImageUrl);
			
			// bg-color
            //$('#sp-taginfo-background-color-input').val(backgroundColorHex);
            $('#sp-id-background-color').val(backgroundColorHex);// input[type="color"]は空文字入れるとコンソールWarning出る
            
            // bg-opacity
            document.getElementById('sp-id-opacity').MaterialSlider.change(backgroundColorOpacity);
            $('#sp-id-opacity-label').text(backgroundColorOpacity);

            //-----------------------------------------------
            // スタイル：Border
            //-----------------------------------------------
			var borderRadius = parseInt(spEdit.css('border-top-left-radius'));
			
			$('#sp-id-border-style').val(spEdit.css('border-top-style'));
			$('#sp-id-border-width').val(parseInt(spEdit.css('border-top-width')));
			$('#sp-id-border-color').val(rgbToHex(spEdit.css('border-top-color')));
			$('#sp-id-border-radius').val(spEdit.css('border-radius'));
			//document.getElementById('sp-id-border-radius').MaterialSlider.change(borderRadius);
			//$('#sp-id-border-radius-label').text(borderRadius);
			
            //-----------------------------------------------
            // スタイル：影
            //-----------------------------------------------
            ccc(spEdit.css('box-shadow'));
			//var borderRadius = parseInt(spEdit.css('border-top-left-radius'));
			//
			$('#sp-id-box-shadow').val(spEdit.css('box-shadow'));
			//$('#sp-id-border-width').val(parseInt(spEdit.css('border-top-width')));
			//$('#sp-id-border-color').val(rgbToHex(spEdit.css('border-top-color')));
			//document.getElementById('sp-id-border-radius').MaterialSlider.change(borderRadius);
			//$('#sp-id-border-radius-label').text(borderRadius);

            //-----------------------------------------------
            // スタイル：属性
            //-----------------------------------------------
			// class属性ない（空の）場合にreplaceでエラー起きる
			//var className = t.attr('class') ? t.attr('class').replace('targetOutline', '').replace('spEdit', '') : '';
			$('#sp-id-attr-img-src').val(spEdit.attr('src'));
			$('#sp-id-attr-id').val(spEdit.attr('id'));
			$('#sp-id-attr-class').val(spEdit.attr('class'));
			$('#sp-id-attr-style').val(spEdit.attr('style'));

            //-----------------------------------------------
            // スタイル：リンク
            //-----------------------------------------------
			$('#sp-id-attr-href').val(spEdit.attr('href'));
			$('#sp-id-attr-target').val(spEdit.attr('target'));
			

//			cc('----attr----------');
//			cc(spEdit.attr('src'));
//			cc(spEdit.attr('id'));
//			cc(spEdit.attr('class'));
//			cc(spEdit.attr('style'));
//
//			cc('----テキスト----------');
//			cc(t.css('font-family'));
//			cc(parseInt(t.css('font-size')));
//			cc(t.css('font-size').replace(/[0-9]/g,''));
//			cc(rgbToHex(t.css('color')));
//			cc(rgbToHex(t.css('background-color')));
//			cc(parseInt(t.css('font-size')));
//			cc(t.css('font-weight'));
//			cc(textDecoration);
//
//			cc('----配置----------');
//			cc(textAlign);
//			cc('----行間----------');
//			cc(parseInt(t.css('line-height')));
//			cc('----幅----------');
//			cc(parseInt(spEdit.css('max-width')));
//
//			cc('----padding----------');
//			cc(parseInt(spEdit.css('padding-top')));
//			cc(parseInt(spEdit.css('padding-top')));
//			cc(parseInt(spEdit.css('padding-bottom')));
//			cc(parseInt(spEdit.css('padding-left')));
//			cc(parseInt(spEdit.css('padding-right')));
//
//			cc('----margin----------');
//			cc(parseInt(spEdit.css('margin-top')));
//			cc(parseInt(spEdit.css('margin-top')));
//			cc(parseInt(spEdit.css('margin-bottom')));
//			cc(parseInt(spEdit.css('margin-left')));
//			cc(parseInt(spEdit.css('margin-right')));
//
//			cc('----border----------');
//			cc(spEdit.css('border-top-style'));
//			cc(parseInt(spEdit.css('border-top-width')));
//			cc(spEdit.css('border-top-color'));
//			cc(parseInt(spEdit.css('border-top-left-radius')));
//
//			cc('----背景----------');
//			cc(backgroundImage);
//			cc(backgroundColor);
//			cc(spEdit.css('opacity'));
//

//			//-----------------------------------------------
//			// Tag info
//			//-----------------------------------------------
//			//$('#sp-taginfo-tagname').html(t[0].tagName);
//			$('#sp-taginfo-tagname').html(t.tagName);
//
//			$('#sp-taginfo-id').val(t.attr('id'));
//			$('#sp-taginfo-class').val(className);
//			//$('#sp-taginfo-style').val(t.attr('style'));
//			if (t.attr('style')) {
//				$('#sp-taginfo-style').val(t.attr('style').split(';').join(";\n"));
//			} else {
//				$('#sp-taginfo-style').val('');
//			}
//			cc(t.css('width'));
//			//-----------------------------------------------
//			// Size
//			//-----------------------------------------------
//			$('#sp-taginfo-width').val(dpx(t.css('width')));
//			$('#sp-taginfo-height').val(dpx(t.css('height')));
//
//			//-----------------------------------------------
//			// Background
//			//-----------------------------------------------
//			var backgroundColorRgb = spEdit.css('background-color');
//			var backgroundColorHex = '';
//			var backgroundColorOpacity = '';
//
//			if (backgroundColorRgb == 'rgba(0, 0, 0, 0)') {
//				backgroundColorRgb = backgroundColorRgb;
//				backgroundColorHex = rgbToHex(backgroundColorRgb);
//				backgroundColorOpacity = '1';
//			} else {
//				backgroundColorRgb = backgroundColorRgb;
//				backgroundColorHex = rgbToHex(backgroundColorRgb);
//				backgroundColorOpacity = rgbToOpacity(backgroundColorRgb);
//			}
//			if (backgroundImage == 'none') {
//				backgroundImage = '';
//			}
//
//			$('#sp-taginfo-background-color-input').val(backgroundColorHex);
//			$('#sp-taginfo-background-color-picker').val(backgroundColorHex); // input[type="color"]は空文字入れるとコンソールWarning出る
//			$('#sp-taginfo-background-color-opacity-input').val(backgroundColorOpacity);
//			$('#sp-taginfo-background-color-opacity-range').val(backgroundColorOpacity);
//			$('#sp-taginfo-background-image').val(backgroundImage);
//
//			//-----------------------------------------------
//			// Border
//			//-----------------------------------------------
//			var borderArr = t.css('border').split(' ');
//			var borderWidth = borderArr[0];
//			var borderStyle = borderArr[1];
//			var borderColor = rgbToHex(borderArr[2] + borderArr[3] + borderArr[4]);
//			var borderRadius = dpx(t.css('border-radius'));
//
//			if (borderStyle == 'none') {
//				borderWidth = '';
//			}
//
//			$('#sp-taginfo-border-width').val(borderWidth);
//			$('#sp-taginfo-border-style').val(borderStyle);
//			$('#sp-taginfo-border-color-input').val(borderColor);
//			$('#sp-taginfo-border-color-picker').val(borderColor); // input[type="color"]は空文字入れるとコンソールWarning出る
//			$('#sp-taginfo-border-radius-input').val(borderRadius);
//			$('#sp-taginfo-border-radius-range').val(borderRadius);
//
//			//-----------------------------------------------
//			// Padding
//			//-----------------------------------------------
//			var pTop = dpx(t.css('padding-top'));
//			var pRight = dpx(t.css('padding-right'));
//			var pBottom = dpx(t.css('padding-bottom'));
//			var pLeft = dpx(t.css('padding-left'));
//
//			$('#sp-taginfo-padding-top-input').val(pTop);
//			$('#sp-taginfo-padding-top-range').val(pTop);
//			$('#sp-taginfo-padding-right-input').val(pRight);
//			$('#sp-taginfo-padding-right-range').val(pRight);
//			$('#sp-taginfo-padding-bottom-input').val(pBottom);
//			$('#sp-taginfo-padding-bottom-range').val(pBottom);
//			$('#sp-taginfo-padding-left-input').val(pLeft);
//			$('#sp-taginfo-padding-left-range').val(pLeft);
//			if (pTop == pRight && pTop == pBottom && pTop == pLeft) {
//				$('#sp-taginfo-padding-all-input').val(pTop);
//				$('#sp-taginfo-padding-all-range').val(pTop);
//			} else {
//				$('#sp-taginfo-padding-all-input').val('');
//				$('#sp-taginfo-padding-all-range').val(0);
//			}
		}


		/**
		 * get URL from css background-image property.  
		 */
		function getBgImageUrl(backgroundImage){
			
			var bgImageUrl = '';
			
			if(backgroundImage.substr(0,3) == 'url'){
				bgImageUrl = backgroundImage.replace('url("', '').replace('")', '');
			}
			
			return bgImageUrl;
		}

		/**
		 * ( rgb or rgba ) to Opacity.
		 */
		function rgbToOpacity(rgb) {
			var rgbOpacity = '';
			var rgbArr = rgbToArr(rgb);
			if (rgbArr.length == 4) {
				rgbOpacity = rgbArr[3];
				// 小数点2桁まで表示
				rgbOpacity = Math.round(rgbOpacity * 100) / 100;
			} else {
				rgbOpacity = '1';
			}
			return rgbOpacity;
		}

		/**
		 * rgb to hex
		 */
		function rgbToHex(rgb) {
			
			// デフォルトセットの場合
			if(rgb == 'rgba(0, 0, 0, 0)'){
				return '#FFFFFF';
			}
		
			var rgbArr = rgbToArr(rgb);
			var hex = '';
			hex += '#';
			hex += ('0' + parseInt(rgbArr[0]).toString(16)).slice(-2);
			hex += ('0' + parseInt(rgbArr[1]).toString(16)).slice(-2);
			hex += ('0' + parseInt(rgbArr[2]).toString(16)).slice(-2);
			return hex.toUpperCase();
		}

		/**
		 * ( rgb or rgba ) to Array.
		 */
		function rgbToArr(rgb) {
			var newRgb = [0, 0, 0, 0];
			if (rgb) {
				rgb = rgb.replace('rgba(', '');
				rgb = rgb.replace('rgb(', '');
				rgb = rgb.replace(')', '');
				rgb = rgb.replace(' ', '');
				return rgb.split(',');
			}
			return newRgb;
		}

		/**
		 * hex to rgb
		 */
		function HexToRgb(hex) {
			var h = hex.substr(1, 6);
			return parseInt("0x" + h);
		}

		/**
		 * delele unit [px]
		 */
		function dpx(str) {
			str = str.replace('px', '');
			return str;
		}

		//####################################################################################################
		//###### <Refect Computed function> INIT END #########################################################
		//####################################################################################################



        /**
         * History All Clear
         */
        function f_historyClear(msg) {
            sessionStorage.clear();
            maxVersion = 0;
            nowVersion = 0;
            console.debug('【履歴初期化】'+msg);
        }

        /**
         *  History regist　※spEditを履歴登録時にborderだけにするため、spEdit初期化前に履歴登録すること。
         *
         * [履歴登録タイミング]
         * No    履歴名    履歴    maxVer    nowVer    履歴削除    備考
         * 1    初期表示後    ●            ●    ●
         * 2    テンプレート選択後    ●            ●    ●
         * 3    アイテムドロップ後    ●
         * 4    アイテム編集開始時    ●
         * 5    アイテム編集終了時
         * ※履歴保存時はipkMenuは削除し、ボーダーを表示にしておく。
         *
         */
        function f_historyRegist(msg) {
            maxVersion++;
            nowVersion++;
            maxVersion = nowVersion;
            // 履歴保存前のHTML整形（ipk初期化処理でボーダーだけ残す版。ipkMenuのイベント設定等が複雑なので履歴にipkMuneは入れない。）
            var cloneBody = fdoc.find('body').clone(true);
            //cloneBody.find('.spEdit').removeClass('spEdit').removeAttr('contenteditable');
            //cloneBody.find('#ipkMenu').remove();
            // 履歴登録
            sessionStorage.setItem('sp3SaveDataScroll_'+maxVersion, editPosition);
            //sessionStorage.setItem('sp3SaveDataScroll_'+maxVersion, contentDocument.body.scrollTop);
            sessionStorage.setItem('sp3SaveData_'+maxVersion, cloneBody.html());
            console.debug('【履歴登録】【maxVersion='+maxVersion+' nowVersion='+nowVersion+'】'+msg);
            // 超過分履歴削除
            if( maxVersion > maxHistoryCount){
                var deleteVersion = maxVersion - maxHistoryCount;
                sessionStorage.removeItem('sp3SaveDataScroll_'+deleteVersion);
                sessionStorage.removeItem('sp3SaveData_'+deleteVersion);
                console.debug('【履歴削除】deleteVersion='+deleteVersion);
            }
        }

        /**
         * History [Ctrl+Z] [Ctrll+Y]
         */
        function f_keyEvent(e) {
//            cc(e.shiftKey);
//            cc(e.ctrlKey);
//            cc(e.metaKey);
//            cc(e.keyCode);
			if(f_isIframeFocus()){
	            var ctrlKeyFlag = os == 'mac' ? e.metaKey : e.ctrlKey;
	            if(ctrlKeyFlag){
	                // [Ctrll+Z]
	                if(e.keyCode == keyCodeZ){
	                    // 編集中
	                    if(f_isEditting()){
	                        cc('[Ctrll+Z]press:編集中');
	                        // contenteditに任せる。
	                    // 編集中以外
	                    }else{
	                        nowVersion--;
	                        var minVersion = maxVersion - maxHistoryCount;
	                        // 最低バージョンを下回った場合は、最低バージョンの履歴を表示（移動も含めるためキーイベントキャンセルにしない）
	                        if(nowVersion < minVersion){
	                            nowVersion = minVersion;
	                            console.debug('【ctrl+Z】最低バージョンを下回ったので、最低バージョンの履歴を表示。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
	                        }
	                        var historyHtml = sessionStorage.getItem('sp3SaveData_'+nowVersion);
	                        if(historyHtml){
	                            fdoc.find('body').html(historyHtml);
	                            contentDocument.body.scrollTop = sessionStorage.getItem('sp3SaveDataScroll_'+nowVersion);
	                            console.debug('【ctrl+Z】履歴セット。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
	                        }else{
	                            nowVersion++;
	                            console.debug('【ctrl+Z】履歴なし。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
	                        }
	                    }
	                    // mac/win共にCtrl+Zはchromeショートカット競合なしなので、キーイベントキャンセルしない
	                    //return false;
	                // [Ctrll+Y]
	                }else if(e.keyCode == keyCodeY){
	                    // 編集中
	                    if(f_isEditting()){
	                        cc('[Ctrll+Y]press:編集中');
	                        contentDocument.execCommand('redo',false,null);
	                    // 編集中以外
	                    }else{
	                        nowVersion++;
	                        // maxバージョンを超えた場合は、maxバージョンの履歴を表示（移動も含めるためキーイベントキャンセルにしない）
	                        if(nowVersion > maxVersion){
	                            nowVersion = maxVersion;
	                            console.debug('【ctrl+Y】maxバージョンを超えたので、maxバージョンの履歴を表示。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
	                        }
	                        var historyHtml = sessionStorage.getItem('sp3SaveData_'+nowVersion);
	                        if(historyHtml){
	                            fdoc.find('body').html(historyHtml);
	                            contentDocument.body.scrollTop = sessionStorage.getItem('sp3SaveDataScroll_'+nowVersion);
	                            console.debug('【ctrl+Y】履歴セット。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
	                        }else{
	                            nowVersion--;
	                            console.debug('【ctrl+Y】履歴なし。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
	                       }
	                    }
	                    //mac-chromeショートカットと競合するので、キーイベントキャンセル。
	                    return false;
	                }
	            }

	            if(!f_isEditting() && e.keyCode == 8){
	                return false;
	            }
	        }
        }
        
        /**
         * is Editing
         */
        function f_isEditting() {
            //cc(contentDocument.activeElement);
            if(contentDocument.activeElement.getAttribute('contenteditable')){
                return true;
            }else{
                return false;
            }
        }

        /**
         * is iframe focus
         */
        function f_isIframeFocus() {
            //cc(document.activeElement);
            if(document.activeElement.id == fid){
                return true;
            }else{
                return false;
            }
        }






















































	};
	//---skEditor end -----------------
})(jQuery);

/**
 * console.log
 *
 * @param item
 */
function cc(item) {
	console.log(item);
}
/**
 * console.warn
 *
 * @param item
 */
function mark(stringVar) {
	console.debug('%f : ' + stringVar, window.performance.now());
	//	   // 高精度タイムスタンプ（ページナビゲートからの経過時間をマイクロ秒を返す）
	//	   var pastTime = window.performance.now();
	//	  cci(pastTime);
}
/**
 * console.info
 *
 * @param item
 */
function cci(item) {
	console.warn(item);
}
function ccc(item) {
	console.warn('-------------------------');
	console.warn(item);
}

function showCommonMsg(type, msg) {
	var comMsg = $('#sp2-common-msg');
	var removeClassName = '';
	var addClassName = '';
	if (comMsg.hasClass('sp2-' + type + '-msg-A')) {
		removeClassName = 'sp2-' + type + '-msg-A';
		addClassName = 'sp2-' + type + '-msg-B';
	} else {
		removeClassName = 'sp2-' + type + '-msg-B';
		addClassName = 'sp2-' + type + '-msg-A';
	}
	comMsg.text(msg).removeClass(removeClassName).addClass(addClassName).show();
}
