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
	var ipkMemuHtml = '';
	ipkMemuHtml += '<div id="ipkMenu" class="ignore">';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-item-add sp-js-click-execIpkMenuCmd" data-cmd="itemAdd"><i class="ignore fa fa-plus-circle fa-spin fa-fw"></i> item add</div>';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-copy sp-js-click-execIpkMenuCmd"	  data-cmd="copy"><span class="ignore glyphicon glyphicon-duplicate" aria-hidden="true"></span> copy</div>';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-delete sp-js-click-execIpkMenuCmd"	  data-cmd="delete" id="ipkMenuDelete"><span class="ignore glyphicon glyphicon-remove" aria-hidden="true"></span> delete</div>';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-drag sp-js-click-execIpkMenuCmd"	  data-cmd="drag" id="ipk-menu-drag" draggable="true"><span class="ignore glyphicon glyphicon-move" aria-hidden="true"></span> drag</div>';
	ipkMemuHtml += '<div class="ignore ipkMenuCmdBtn ipkMenuCmd ipk-menu-setting sp-js-click-execIpkMenuCmd"  data-cmd="setting"><i class="ignore fa fa-cog fa-spin fa-fw"></i></div>';
	ipkMemuHtml += '</div>';


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
		// <document> command event
		//-----------------------------------------------
		$('.sp-js-input-execcommand').on('input', f_execcommand);
		$('.sp-js-input-setSpEditCss').on('input', f_setSpEditCss);
		$('.sp-js-input-setSpEditAttr').on('input', f_setSpEditAttr);
		$('.sp-js-click-execcommand').on('click', f_execcommand);
		$('.sp-js-click-setSpEditCss').on('click', f_setSpEditCss);

		//-----------------------------------------------
		//
		// 【３】f_execcommand
		//
		//-----------------------------------------------
		function f_execcommand(e)

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


			// -- これ以降の処理はテキスト選択されている状態（unlink系以外）

			// set inline style.
			contentDocument.execCommand('styleWithCSS', true, null);

			// コマンドに応じて処理実行
			cc(cmd+'='+val);
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
					fdoc.find('.spEdit').find('span[style*="vertical-align: sub"]').css('vertical-align','').css('line-height', val+'em');
					// input type number はフォーカス移すとだめ（連続入力できない）。とりあえずコマンド後フォーカスはしないでおく。
					//fdoc.find('.spEdit').first().focus();
					break;

				default:
					cc('unknown command');
					break;
				}


				// contentWidndow.focus();
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

			var ct	= $(e.currentTarget);
			var css = ct.attr('data-css');
			var val = ct.val();

			cc(css+'='+val);
			switch(css){

				case 'background-color':
				case 'border-color':
				case 'border-style':
				case 'text-align':
					spEdit.css(css, val);
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
					if($('#fixed-width').prop('checked')){
						spEdit.css('width', val+'px');
					}else{
						spEdit.css('max-width', val+'px');
					}
					break;

				case 'opacity':
					var spEidtRgb = spEdit.css('background-color');
					var spEidtRgbArr = rgbToArr(spEidtRgb);
					var rgba = 'rgba(' + spEidtRgbArr[0] + ',' + spEidtRgbArr[1] + ',' + spEidtRgbArr[2] + ',' + val + ')';
					spEdit.css('background-color', rgba);
					break;

				default:
				  cc('unknown css property');
				  break;
			}

			//
			//input type number はフォーカス移すとだめ（連続入力できない）。とりあえずコマンド後フォーカスはしないでおく。
			//fdoc.find('.spEdit').first().focus();
			// contentWidndow.focus();
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

			var ct	= $(e.currentTarget);
			var attr = ct.attr('data-attr');
			var val = ct.val();

			switch(cmd){

				case 'id':
				case 'class':
				case 'style':
				case 'src':
					spEdit.attr(attr, val);
					break;

				default:
				  cc('unknown command');
				  break;
			}

			//
			//input type number はフォーカス移すとだめ（連続入力できない）。とりあえずコマンド後フォーカスはしないでおく。
			//fdoc.find('.spEdit').first().focus();
			// contentWidndow.focus();
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
		function f_createGridHtml(){
			var gridColStr = $('#grid-col-str');
			var gridColArr = gridColStr.split(' ');
			var gridHtml = '';

			console.log(gridColArr);

			gridHtml += '<div class="row sp-drop-here">'+"\n";

			for(var i = 0; i < gridColArr.length; i++){
				var colNo = gridColArr[i];
				console.log(colNo);
				gridHtml += '	<div class="col-sm-'+colNo+'">'+"\n";
				gridHtml += '		<p class="sp-text">grid : '+colNo+'カラム</p>'+"\n";
				gridHtml += '	</div>'+"\n";
			}

			gridHtml += '</div>'+"\n";

			console.log(gridHtml);

			return gridHtml;
		}
		//-----------------------------------------------
		//
		// 【９】f_ipkMenuCmdExec
		//
		//-----------------------------------------------
		function f_ipkMenuCmdExec(e){

			var spEdit = fdoc.find('.spEdit').first();

			if(spEdit.length == 0){
				return;
			}

			// ct = cmd button
			var ct  = $(e.currentTarget);
			var cmd = ct.attr('data-cmd');

			switch(cmd){

				case 'delete':
					spEdit.remove();
					fdoc.find('#ipkMenu').hide();
					break;

				case 'copy':
					spEdit.after(spEdit.clone(true).removeAttr('contenteditable').removeClass('spEdit').removeClass('targetOutline'));
					return false;
					break;

				case 'itemAdd':
					spEdit.after('<div class="sp-item-replace sp-text"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>');
					break;

				default:
					cc('unknown command');
					break;
			}
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

			// class属性ない（空の）場合にreplaceでエラー起きる
			//var className = t.attr('class') ? t.attr('class').replace('targetOutline', '').replace('spEdit', '') : '';


			$('#sp-id-attr-img-src').val(spEdit.attr('src'));
			$('#sp-id-attr-id').val(spEdit.attr('id'));
			$('#sp-id-attr-class').val(spEdit.attr('class'));
			$('#sp-id-attr-style').val(spEdit.attr('style'));


			$('#sp-id-font-name').val(t.css('font-family'));
			$('#sp-id-font-size').val(parseInt(t.css('font-size')));
			$('#sp-id-font-size-unit').val(t.css('font-size').replace(/[0-9]/g,''));
			$('#sp-id-fore-color').val(rgbToHex(t.css('color')));
			$('#sp-id-back-color').val(rgbToHex(t.css('background-color')));
			$('#sp-id-font-size-range').val(parseInt(t.css('font-size')));

			t.css('font-weight') == 'bold'   ? $('#sp-id-bold').addClass('active')   : $('#sp-id-bold').removeClass('active');
			t.css('font-style')  == 'italic' ? $('#sp-id-italic').addClass('active') : $('#sp-id-italic').removeClass('active');
			var textDecoration = t.css('text-decoration');
			textDecoration.indexOf('underline')    != -1 ? $('#sp-id-underline').addClass('active')     : $('#sp-id-underline').removeClass('active');
			textDecoration.indexOf('line-through') != -1 ? $('#sp-id-strikethrough').addClass('active') : $('#sp-id-strikethrough').removeClass('active');


			var textAlign = spEdit.css('text-align');
			if(textAlign == 'center'){
				$('#sp-id-text-align-center').addClass('active');
				$('#sp-id-text-align-left').removeClass('active');
				$('#sp-id-text-align-right').removeClass('active');
			} else if(textAlign == 'left'){
				$('#sp-id-text-align-center').removeClass('active');
				$('#sp-id-text-align-left').addClass('active');
				$('#sp-id-text-align-right').removeClass('active');
			} else if(textAlign == 'right'){
				$('#sp-id-text-align-center').removeClass('active');
				$('#sp-id-text-align-left').removeClass('active');
				$('#sp-id-text-align-right').addClass('active');
			}else{
				$('#sp-id-text-align-center').removeClass('active');
				$('#sp-id-text-align-left').removeClass('active');
				$('#sp-id-text-align-right').removeClass('active');
			}

			$('#sp-id-line-height').val(parseInt(t.css('line-height')));
			$('#sp-id-max-width').val(parseInt(spEdit.css('max-width')));

			$('#sp-id-padding').val(parseInt(spEdit.css('padding-top')));
			$('#sp-id-padding-top').val(parseInt(spEdit.css('padding-top')));
			$('#sp-id-padding-bottom').val(parseInt(spEdit.css('padding-bottom')));
			$('#sp-id-padding-left').val(parseInt(spEdit.css('padding-left')));
			$('#sp-id-padding-right').val(parseInt(spEdit.css('padding-right')));

			$('#sp-id-margin').val(parseInt(spEdit.css('margin-top')));
			$('#sp-id-margin-top').val(parseInt(spEdit.css('margin-top')));
			$('#sp-id-margin-bottom').val(parseInt(spEdit.css('margin-bottom')));
			$('#sp-id-margin-left').val(parseInt(spEdit.css('margin-left')));
			$('#sp-id-margin-right').val(parseInt(spEdit.css('margin-right')));

			$('#sp-id-border-style').val(spEdit.css('border-top-style'));
			$('#sp-id-border-width').val(parseInt(spEdit.css('border-top-width')));
			$('#sp-id-border-color').val(spEdit.css('border-top-color'));
			$('#sp-id-border-radius').val(parseInt(spEdit.css('border-top-left-radius')));

			var backgroundImage = spEdit.css('background-image');
			if(backgroundImage != 'none'){
				$('#sp-id-background-image').val(backgroundImage.replace('url(', '').replace(')', ''));
			}

			var backgroundColor = spEdit.css('background-color');
			if( backgroundColor != 'rgba(0, 0, 0, 0)'){
				$('#sp-id-background-color').val(backgroundColor);
			}

			$('#sp-id-opacity').val(spEdit.css('opacity'));




			cc('----attr----------');
			cc(spEdit.attr('src'));
			cc(spEdit.attr('id'));
			cc(spEdit.attr('class'));
			cc(spEdit.attr('style'));

			cc('----テキスト----------');
			cc(t.css('font-family'));
			cc(parseInt(t.css('font-size')));
			cc(t.css('font-size').replace(/[0-9]/g,''));
			cc(rgbToHex(t.css('color')));
			cc(rgbToHex(t.css('background-color')));
			cc(parseInt(t.css('font-size')));
			cc(t.css('font-weight'));
			cc(textDecoration);

			cc('----配置----------');
			cc(textAlign);
			cc('----行間----------');
			cc(parseInt(t.css('line-height')));
			cc('----幅----------');
			cc(parseInt(spEdit.css('max-width')));

			cc('----padding----------');
			cc(parseInt(spEdit.css('padding-top')));
			cc(parseInt(spEdit.css('padding-top')));
			cc(parseInt(spEdit.css('padding-bottom')));
			cc(parseInt(spEdit.css('padding-left')));
			cc(parseInt(spEdit.css('padding-right')));

			cc('----margin----------');
			cc(parseInt(spEdit.css('margin-top')));
			cc(parseInt(spEdit.css('margin-top')));
			cc(parseInt(spEdit.css('margin-bottom')));
			cc(parseInt(spEdit.css('margin-left')));
			cc(parseInt(spEdit.css('margin-right')));

			cc('----border----------');
			cc(spEdit.css('border-top-style'));
			cc(parseInt(spEdit.css('border-top-width')));
			cc(spEdit.css('border-top-color'));
			cc(parseInt(spEdit.css('border-top-left-radius')));

			cc('----背景----------');
			cc(backgroundImage);
			cc(backgroundColor);
			cc(spEdit.css('opacity'));


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
