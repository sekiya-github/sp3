/**
 * 変数命名規則(css/js/html共通)
 *
 * ・CSS・JSエディタがハイフン繋ぎでは１クリック選択できない。
 * ・閲覧のし易さではハイフン繋ぎが見やすい。
 * ・JSの変数名はさすがにキャメルケース。それと合わせたほうがいい？
 *
 * [最終決定]
 *
 *    ID/CLASS名      ：ハイフン繋ぎ
 *    JSの変数名      ：キャメルケース
 *    data-cmd        ：execCommandで使用するコマンド。なので基本はキャメルケースを使用。
 *
 * [理由]
 *
 *    bootstrapでもJSはキャメル・ケース。HTMLのID/CLASS名はハイフンだった。
 *    長いID/CLASS名の場合、結局JSでは短いキャメルケースの変数名にするので
 *
 */

(function($) {
    console.time('spEditorLoad');
    var settings;
    var myTextarea;
    var fid;
    var f;
    var fdoc;
    var parentLinkObj;
    var contentWidndow = '';
    var contentDocument = '';
    var dragFlag = false;
    var ipkMemuHtml = '';
    var maxVersion = 0;
    var nowVersion = 0;
    var os = navigator.platform.indexOf("Win") != -1 ? 'win':'mac';
    var keyCodeShift = 0;
    var keyCodeCtrl = 0;
    var keyCodeEnter = 0;
    var keyCodeZ = 0;
    var keyCodeY = 0;
    var maxHistoryCount = 20;
    var dragResize = '';
    var unloadAlertFlag = false;
    ipkMemuHtml += '<div id="ipkMenu" class="ignore">';
        //ipkMemuHtml += '<span class="ignore" id="ipkMenuTagName"></span>';
        ipkMemuHtml += '<span id="ipkEditMenu" style="display:none;" class="ignore">';
            //ipkMemuHtml += '<span class="ignore">｜</span>';
            ipkMemuHtml += '<span class="ignore" id="ipkMenuMsg">編集中</span>';

            ipkMemuHtml += '<span class="ignore">｜</span>';
            ipkMemuHtml += '<img src="js/sp2Editor/img/default-plus-simple-32px.small.png" style="width: 20px;height: 20px;outline:none;" class="ignore ipkMenuCmdBtn" data-cmd="ipkMenuCopy">';

            ipkMemuHtml += '<span class="ignore">｜</span>';
            ipkMemuHtml += '<img src="js/sp2Editor/img/default-close-delete-plain-32px.small.png" style="width: 20px;height: 20px;outline:none;" class="ignore ipkMenuCmdBtn" data-cmd="ipkMenuDelete" id="ipkMenuDelete">';

            ipkMemuHtml += '<span class="ignore">｜</span>';
            ipkMemuHtml += '<img src="js/sp2Editor/img/move_up.png" style="width: 20px;height: 20px;outline:none;" class="ignore ipkMenuCmdBtn" data-cmd="ipkMenuMoveUp" id="ipkMenuMoveUp">';

            ipkMemuHtml += '<span class="ignore">｜</span>';
            ipkMemuHtml += '<img src="js/sp2Editor/img/move_down.png" style="width: 20px;height: 20px;outline:none;" class="ignore ipkMenuCmdBtn" data-cmd="ipkMenuMoveDown" id="ipkMenuMoveDown">';

            ipkMemuHtml += '<span class="ignore">｜</span>';
            ipkMemuHtml += '<img src="js/sp2Editor/img/ipk_select_parent.png" style="width: 20px;height: 20px;outline:none;" class="ignore ipkMenuCmdBtn" data-cmd="ipkMenuSelectParent" id="ipkMenuSelectParent">';

            ipkMemuHtml += '<span class="ignore" id="ipkMenuEditImageBox" style="display:none;">';
                ipkMemuHtml += '<span class="ignore">｜</span>';
                ipkMemuHtml += '<span id="ipkMenuEditImage" style="background-color: #FC7EF2;border-radius: 4px;font-size: 14px;padding: 4px 5px;margin:0 4px;" class="ignore ipkMenuCmdBtn" data-cmd="show-hidden-box-image" style="display:none;">画像を編集</span>';
            ipkMemuHtml += '</span>';

            ipkMemuHtml += '<span class="ignore" id="ipkMenuEditReplaceStringBox" style="display:none;">';
                ipkMemuHtml += '<span class="ignore">｜</span>';
                ipkMemuHtml += '<span id="ipkMenuEditReplaceString" style="background-color: #FC7EF2;border-radius: 4px;font-size: 14px;padding: 4px 5px;margin:0 4px;" class="ignore ipkMenuCmdBtn" data-cmd="show-hidden-box-replace-string" style="display:none;">置換文字を編集</span>';
            ipkMemuHtml += '</span>';

            ipkMemuHtml += '<span class="ignore" id="ipkMenuEditLinkBox" style="display:none;">';
                ipkMemuHtml += '<span class="ignore">｜</span>';
                ipkMemuHtml += '<span class="ignore ipkMenuCmdBtn"id="ipkMenuEditLink" style="background-color: #FC7EF2;border-radius: 4px;font-size: 14px;padding: 4px 5px;margin:0 4px;" data-cmd="show-hidden-box-link">リンクを編集</span>';
            ipkMemuHtml += '</span>';

            ipkMemuHtml += '<span class="ignore" id="ipkMenuEditBgImageBox" style="display:none;">';
                ipkMemuHtml += '<span class="ignore">｜</span>';
                ipkMemuHtml += '<span id="ipkMenuEditBgImage" style="background-color: #FC7EF2;border-radius: 4px;font-size: 14px;padding: 4px 5px;margin:0 4px;" class="ignore ipkMenuCmdBtn" data-cmd="show-hidden-box-bg-image" style="display:none;">背景画像を編集</span>';
            ipkMemuHtml += '</span>';

            ipkMemuHtml += '<span class="ignore" id="ipkMenuEditTimerBox" style="">';
                ipkMemuHtml += '<span class="ignore">｜</span>';
                ipkMemuHtml += '<span id="ipkMenuEditTimer" style="background-color: #FC7EF2;border-radius: 4px;font-size: 14px;padding: 4px 5px;margin:0 4px;" class="ignore ipkMenuCmdBtn" data-cmd="show-hidden-box-timer" style="display:none;">タイマー表示設定を変更</span>';
            ipkMemuHtml += '</span>';

            ipkMemuHtml += '<span class="ignore" id="ipkMenuEditFormInfoBox" style="">';
                ipkMemuHtml += '<span class="ignore">｜</span>';
                ipkMemuHtml += '<span id="ipkMenuEditFormInfo" style="background-color: #FC7EF2;border-radius: 4px;font-size: 14px;padding: 4px 5px;margin:0 4px;" class="ignore ipkMenuCmdBtn" data-cmd="show-hidden-box-form-info" style="display:none;">フォーム情報を編集</span>';
            ipkMemuHtml += '</span>';

        ipkMemuHtml += '</span>';
    ipkMemuHtml += '</div>';
    $.fn.sp2Editor = function(options) {
        settings = $.extend({}, {staffId : '', cssFile : '', scrollTop : 0, class : ''}, options);
        myTextarea = $(this);
        myTextareaId = myTextarea.attr('id');
        fid = myTextareaId+'_ifr';

        //編集準備開始
        $('#sp-layer').show();

        // INIT START ####################################################################################################
        //---------------------------------------
        // INIT : document : <iframe> HTML insert
        //---------------------------------------
        var iframeHtml = '';
        iframeHtml += '<iframe id="'+fid+'" src=\'javascript:""\' frameborder="0" style="width: 100%; height: 100%; display: block;background-color:white;"></iframe>';
        myTextarea.after(iframeHtml);
        myTextarea.hide();

        //---------------------------------------
        // INIT : iframe : content write
        //---------------------------------------
        contentWidndow= document.getElementById(fid) || document.getElementById(fid).contentWindow;
        contentDocument= contentWidndow.contentDocument || contentWidndow.document;

        // iframe : CSS + JS
        var iframeJsCss = '';
        iframeJsCss += '<link title="SP2タグ：このタグは触らないでください" rel="stylesheet" href="js/sp2Editor/css/sp2Editor.css" >';
        iframeJsCss += '<link title="SP2タグ：このタグは触らないでください" rel="stylesheet" href="css/bs_font.css" >';

// 【動作OK】要素リサイズのスクリプト(jquery.resizable)
//    iframeJsCss += '<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">';
//    iframeJsCss += '<script src="//code.jquery.com/jquery-1.10.2.js"></script>';
//    iframeJsCss += '<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>';
//    iframeJsCss += '<script type="text/javascript">';
//    iframeJsCss += '$(function() {';
//    iframeJsCss += '  $("body").on({"click":function(e){$(e.target).resizable({});}});';
//    iframeJsCss += '});';
//    iframeJsCss += '</script>';

// 【動作OK】要素リサイズのスクリプト(interact-1.2.4.js)
//      //iframeJsCss += '<script src="//code.interactjs.io/interact-1.2.4.js"></script>';
//      iframeJsCss += '<script src="js/sp2Editor/interact-1.2.4.js"></script>';
//      iframeJsCss += "<script>";
//      iframeJsCss += "interact('.spEdit')";
//      iframeJsCss += "  .resizable({";
//      iframeJsCss += "    edges: { left: true, right: true, bottom: true, top: true }";
//      iframeJsCss += "  })";
//      iframeJsCss += "  .on('resizemove', function (event) {";
//      iframeJsCss += "    var target = event.target,";
//      iframeJsCss += "        x = (parseFloat(target.getAttribute('data-x')) || 0),";
//      iframeJsCss += "        y = (parseFloat(target.getAttribute('data-y')) || 0);";
//      iframeJsCss += "";
//      iframeJsCss += "    target.style.width  = event.rect.width + 'px';";
//      iframeJsCss += "    target.style.height = event.rect.height + 'px';";
//      iframeJsCss += "";
//      iframeJsCss += "    x += event.deltaRect.left;";
//      iframeJsCss += "    y += event.deltaRect.top;";
//      iframeJsCss += "";
//      iframeJsCss += "    target.style.webkitTransform = target.style.transform =";
//      iframeJsCss += "        'translate(' + x + 'px,' + y + 'px)';";
//      iframeJsCss += "";
//      iframeJsCss += "    target.setAttribute('data-x', x);";
//      iframeJsCss += "    target.setAttribute('data-y', y);";
//      iframeJsCss += "  });";
//      iframeJsCss += "</script>";


        // iframe : write
        var iframeContentsHtml = myTextarea.val();

        if(iframeContentsHtml.indexOf('</head>') >= 0 && iframeContentsHtml.indexOf('</body>') >= 0){
            iframeContentsHtml = iframeContentsHtml.replace('</head>',iframeJsCss+'</head>');
            iframeContentsHtml = iframeContentsHtml.replace('</body>',ipkMemuHtml+'</body>');
        }else{
            alert('HTMLタグが崩れています：</head> or </body> タグがない。正常に動作しない可能性があります。');
            iframeContentsHtml = iframeContentsHtml+iframeJsCss+ipkMemuHtml;
        }

        //console.time('iframeLoad');
        contentDocument.write(iframeContentsHtml);
        contentDocument.close();
        //mark('iframe write');


        // INIT : IFRAME LOADED START ####################################################################################################
        f = $('#'+fid);
        fdoc = f.contents();
        // このイベントはHTMLで$('#htmlBody').sp2Editor()が終わった後に呼び出された。(この処理が非同期と思われる。よってHTML側で.sp2Editor()をconsole.timeで囲んだ時間が純粋なプラグイン実行時間の計測となる)
        f.load(function(){
            //console.log('iframe load end (=user show end) : %f',window.performance.now());
            //mark('[f.load] start');
            //console.timeEnd('iframeLoad');

            // if fixed style no exsist, append style data
            if(fdoc.find('#sp2-common-css').length == 0){
                fdoc.find('head').append('<link title="SP2タグ：このタグは触らないでください" rel="stylesheet" href="//s3-ap-northeast-1.amazonaws.com/jp.speditor.common/css/sp2-common.css" id="sp2-common-css">');
            }

            // 初回起動時に一回のみstyleWithCSS。（<b><u>は使用しない。）
            document.getElementById('htmlBody_ifr').contentDocument.execCommand('styleWithCSS',true,null);

            // 初回起動時に一回のみリサイズ設定
            //sp2DragResize();

            //-----------------------------------------------
            // iframe loaded : body on event
            //-----------------------------------------------
            fdoc.find('body').on({

                //-----------------------------------------------
                // iframe loaded : body mouseover
                //-----------------------------------------------
                'mouseover':function(e){
                    // ドラッグ中以外はmouseover処理する。drag時は、dragstartイベントでiframe初期化。編集中はtargetOutlineしない。
                    if(dragFlag == false && fdoc.find('.spEdit').length == 0){
                        var t = $(e.target);
                        var tagName = t[0].tagName;
                        //cc(tagName);

                        // mouseover : BODY or DOCTYPE
                        if(tagName == 'BODY' || tagName == 'DOCTYPE' || t.hasClass('ignore')){
                            // 処理なし
                            return false;

                        // mouseover: .spEdit内（IMG・A・置換タグ以外）hover
                        }else if(t.closest('.spEdit').length > 0 && tagName != 'IMG' && tagName != 'A' && !t.hasClass('sp-replace-span')){
                            // アウトライン削除
                            fdoc.find('.targetOutline').removeClass('targetOutline');

                        // mouseover : other
                        }else{
                            fdoc.find('.targetOutline').removeClass('targetOutline').removeAttr('contenteditable');

                            // targetが画像or置換spanならcontenteditしない(JS置換など上下カクカクなる)
                            if(tagName == 'IMG' || t.hasClass('sp-replace-span')){
                                t.addClass('targetOutline');
                            }else{
                                t.addClass('targetOutline').attr('contenteditable','true');
                            }
                        }
                    }
                },
                //-----------------------------------------------
                // iframe loaded : body mouseleave
                //-----------------------------------------------
                'mouseleave':function(e){
                    fdoc.find('.targetOutline').removeClass('targetOutline');
                },
                //-----------------------------------------------
                // iframe loaded : body click
                //-----------------------------------------------
                'click':function(e){
                    e.preventDefault();
                    unloadAlertFlag = true;
                    var t = $(e.target);
                    var tagName = t[0].tagName;
                    var idName = t.attr('id');
                    var closeSpEdit = t.closest('.spEdit');

// 一度外部クリックで選択解除版（動作OK版）end --------------------------------------------------------------

                    // 編集中なら
                    if(fdoc.find('.spEdit').length > 0){
                        // spEditクリックなら
                        if(t.hasClass('spEdit') || closeSpEdit.length > 0 ){
                            // 処理なし
                            f_refectIconPanel(t);

                        // iframe loaded : body click : ipkMenuCmdBtn
                        }else if(t.hasClass('ipkMenuCmdBtn')){
                            // data-cmdに応じた処理実行
                            f_cmdExec(e);

                        // それ以外クリックなら、編集解除
                        }else{
                            // iframe初期化
                            f_resetAll();
                            f_historyRegist('編集終了');
                        }

                    // 編集中以外なら、クリック要素を編集可能にする
                    }else{
                        f_editable(t);
                        f_historyRegist('編集開始');
                    }
// 一度外部クリックで選択解除版（動作OK版）end --------------------------------------------------------------


// 絶えずtargetOutlineある版（動作OK版）end --------------------------------------------------------------
//
//                    // iframe loaded : body click : BODY or DOCTYPE
//                    if(tagName == 'BODY' || tagName == 'DOCTYPE'){
//                        f_historyRegist('body click. edit end!');
//                        // iframe初期化
//                        f_resetAll();
//
//                    // iframe loaded : body click : ipkMenuCmdBtn
//                    }else if(t.hasClass('ipkMenuCmdBtn')){
//                        // data-cmdに応じた処理実行
//                        f_cmdExec(e);
//
//                    // iframe loaded : body click : spEdit内クリック(IMG・A・置換タグ以外) or 無視要素
//                    }else if( (closeSpEdit.length > 0 && tagName != 'IMG' && tagName != 'A' && !t.hasClass('sp-replace-span')) || t.hasClass('ignore') ){
//                        // hidden box hide
//                        f_resetHiddenBox();
//                        //f_refectTagInfo(t);
//                        f_refectIconPanel(t);
//
//                    // iframe loaded : body click : other
//                    }else{
//                        f_editable(t);
//                    }
// 絶えずtargetOutlineある版（動作OK版）end --------------------------------------------------------------


                },
            });
            //-- iframe loaded : body on event end ---
            //mark('[f.load] body event end');

            //-----------------------------------------------
            // iframe loaded : other event
            //-----------------------------------------------
            f_setKeyCode(os);

            // iframe : <body>キーイベントセット
            //fdoc.find('body').keydown(f_keyEvent);

            // このイベント登録でdocument側のinput textでdelete key が聞かなくなる。document focus時にdelete押してもiframe側操作は一切関わらないようにした。
            // document : <body>キーイベントセット
            //$('body').keydown(f_keyEvent);

            // 履歴削除
            f_historyClear('初期表示後');

            // 編集準備完了
            $('#sp-layer').fadeOut('first');

            //-----------------------------------------------
            //  document : Reset hidden box, when [sp-layer] click
            //-----------------------------------------------
            $('#sp-layer').click(f_resetHiddenBox);

            // 履歴登録
            f_historyRegist('初期表示後');

            //mark('[f.load] other event end');
            //mark('[f.load] end');
            //console.timeEnd('sp2EditorAll');
            //console.log('SP2 init complete : %f',window.performance.now());
        });
        // INIT : IFRAME LOADED END ####################################################################################################
        //mark('INIT : IFRAME LOADED END');

        // INIT END ####################################################################################################
        //mark('INIT END');

        // DRAG AND DROP START #############################################################################

        //---------------------------------------
        // 1. document : dragstart
        //---------------------------------------
        var spDragItemList = document.querySelectorAll('.sp-drag-item');
        for( var i=0; i<spDragItemList.length; i++ ) {
            var spDragItem = spDragItemList.item(i);
            spDragItem.addEventListener("dragstart", function(e) {
                //cc('dragstart');
                // history regist
                f_historyRegist('dragstart');
                // drag event start
                dragFlag = true;
                // iframe all reset.
                f_resetAll();
                // data Transfer set
                e.dataTransfer.setData("text", e.target.getAttribute('data-drag-item-type'));
            }, false);
        }
        //---------------------------------------
        // 2. iframe : dragenter
        //---------------------------------------
        contentDocument.addEventListener("dragenter", function(e) {
            if(dragFlag == true){
                //cc('dragenter');
                // default action cancel
                e.preventDefault();
                var t = $(e.target);
                //var tagName = t[0].tagName;
                //         // パターン１：SP1と同じドロップエフェクト
                //         if(!t.hasClass('sp-drop-here') && !t.hasClass('sp-drag-enter-item')){
                //             fdoc.find('.sp-drop-here').remove();
                //             fdoc.find('.sp-drag-enter-item').removeClass('sp-drag-enter-item');
                //             t.addClass('sp-drag-enter-item').after('<p class="sp-drop-here">テキスト</p>');
                //         }
                // パターン２：drop here! position relative。
                if(!t.hasClass('sp-drop-here') && !t.hasClass('sp-drag-enter-item')){
                    fdoc.find('.sp-drop-here').remove();
                    fdoc.find('.sp-drag-enter-item').removeClass('sp-drag-enter-item');
                    t.addClass('sp-drag-enter-item').after('<p class="sp-drop-here">drop here!</p>');
                }
            }
        }, false);
        //---------------------------------------
        // 3. iframe : dragover
        //---------------------------------------
        contentDocument.addEventListener("dragover", function(e) {
            if(dragFlag == true){
                //cc('dragover');
                // default action cancel
                e.preventDefault();
            }
        }, false);
        //---------------------------------------
        // 4. iframe : drop
        //---------------------------------------
        contentDocument.addEventListener("drop", function(e) {
            if(dragFlag == true){
                //cc('iframe drop');
                // default action cancel
                e.preventDefault();
                // data Transfer get
                var dragItemType = e.dataTransfer.getData("text");
                // drag item HTML get
                var dragItemHtml = document.getElementById('sp-drag-item-html-template').content.querySelector('#sp-drag-item-html-'+dragItemType).innerHTML;
                // replace HTML
                fdoc.find('.sp-drop-here').replaceWith(dragItemHtml);
            }
        }, false);
        //---------------------------------------
        // 5. document : dragend
        //---------------------------------------
        document.addEventListener("dragend", function(e) {
            //cc('dragend');
            fdoc.find('.sp-drop-here').remove();
            fdoc.find('.sp-drag-enter-item').removeClass('sp-drag-enter-item');
            // history regist
            //f_historyRegist('dragstart');
            // drop後のアニメーションは後で考える
            //fdoc.find('.sp-drop-effect').removeClass('sp-drop-effect');
            fdoc.find('.sp-drop-effect').hide().fadeIn(500,function(e){$(this).removeClass('sp-drop-effect');});
            // drag event end
            dragFlag = false;

        }, false);
        // DRAG AND DROP END #############################################################################
        //mark('DRAG AND DROP END');

        // DOCUMENT EVENT START ####################################################################################################

        //-----------------------------------------------
        //  document : All reset when title bar TD click
        //-----------------------------------------------
        $('#TitleBarTd').click(f_resetAll);

        //-----------------------------------------------
        //  document : execCommand
        //-----------------------------------------------
        $('.sp-exec-cmd').click(f_cmdExec);
        $('.sp-exec-cmd-change').change(f_cmdExec);

        //-----------------------------------------------
        // document : cancel button
        //-----------------------------------------------
        $('.sp-btn-cancel').click(function(e){
            // hide hidden box.
            f_resetHiddenBox();
        });

        //-----------------------------------------------
        // document : Show tag guide
        //-----------------------------------------------
        $('#sp-icon-panel-show-tag-guide').click(function(e){
            t = $(this);
            if(t.attr('data-on-off-status') == 'off'){
                t.attr('data-on-off-status','on');
                fdoc.find('body').addClass('sp-iframe-body');
            }else{
                t.attr('data-on-off-status','off');
                fdoc.find('body').removeClass('sp-iframe-body');
            }
        });

        //-----------------------------------------------
        // document : Show <head> html code
        //-----------------------------------------------
        $('#sp-icon-panel-show-html-head').click(function(e){
            // <body>HTML編集中なら、HTML反映してから<head>HTML編集に移動
            var htmlBody = $('#sp-icon-panel-show-html-body');
            if(htmlBody.attr('data-on-off-status') == 'on'){
                htmlBody.trigger('click');
            }
            t = $(this);
            if(t.attr('data-on-off-status') == 'off'){
                $('#sp-icon-panel-show-html-body').attr('data-on-off-status','off');
                t.attr('data-on-off-status','on');
                f.hide();
                var newHeadHtml = fdoc.find('head').html();
                newHeadHtml = replaceAll(newHeadHtml,'<template>','');
                newHeadHtml = replaceAll(newHeadHtml,'</template>','');
                myTextarea.val(newHeadHtml).css('display','block');
            }else{
                t.attr('data-on-off-status','off');
                myTextarea.hide();
                var newHeadHtml = myTextarea.val();
                newHeadHtml = replaceAll(newHeadHtml,'<script','<template><script');
                newHeadHtml = replaceAll(newHeadHtml,'</script>','</script></template>');
                fdoc.find('head').html(newHeadHtml);
                f.css('display','block');
                f_historyRegist('<head> code change');
            }
        });

        //-----------------------------------------------
        // document : Show <body> html code
        //-----------------------------------------------
        $('#sp-icon-panel-show-html-body').click(function(e){
            // <head>HTML編集中なら、HTML反映してから<head>HTML編集に移動
            var htmlHead = $('#sp-icon-panel-show-html-head');
            if(htmlHead.attr('data-on-off-status') == 'on'){
                htmlHead.trigger('click');
            }
            t = $(this);
            if(t.attr('data-on-off-status') == 'off'){
                $('#sp-icon-panel-show-html-head').attr('data-on-off-status','off');
                t.attr('data-on-off-status','on');
                f.hide();
                myTextarea.val(fdoc.find('body').html()).css('display','block')
            }else{
                t.attr('data-on-off-status','off');
                myTextarea.hide();
                fdoc.find('body').html(myTextarea.val());
                f.css('display','block');
                f_historyRegist('<body> code change');
            }
        });

        //-----------------------------------------------
        // document : Show tracking/A/Btest/remarketing <script> tags code
        //-----------------------------------------------
        $('#sp-icon-panel-tags').click(function(e){
            f_showHiddenBoxCommon('tags','');
        });
        $('#sp-btn-tags-ok').click(function(e){
            f_resetAll();
        });

        //-----------------------------------------------
        // document : Full screen
        //-----------------------------------------------
        $('#sp-icon-panel-full-screen').click(function(e){
            t = $(this);
            if(t.attr('data-on-off-status') == 'off'){
                t.attr('data-on-off-status','on');
                document.body.webkitRequestFullScreen();
            }else{
                t.attr('data-on-off-status','off');
                document.webkitCancelFullScreen();
            }
        });

        //-----------------------------------------------
        // document : Show Tag Info
        //-----------------------------------------------
        $('#sp-icon-panel-tag-info').click(function(e){
            t = $(this);
            if(t.attr('data-on-off-status') == 'off'){
                t.attr('data-on-off-status','on');
                $('.sp-tag-info-place').show();
            }else{
                t.attr('data-on-off-status','off');
                $('.sp-tag-info-place').hide();
            }
        });

        //-----------------------------------------------
        // document : undo
        //-----------------------------------------------
        $('#sp-icon-panel-undo').click(function(e){
            var historyHtml = sessionStorage.getItem('sp2SaveData_'+nowVersion);
            if(historyHtml){
                fdoc.find('body').html(historyHtml);
                contentDocument.body.scrollTop = sessionStorage.getItem('sp2SaveDataScroll_'+nowVersion);
                //cc(sessionStorage.getItem('sp2SaveDataScroll_'+nowVersion));
                console.debug('【ctrl+Z】履歴セット。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                nowVersion--;
            }else{
                console.debug('【ctrl+Z】履歴なし。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                nowVersion++;
            }
            var minVersion = maxVersion - maxHistoryCount;
            // 最低バージョンを下回った場合は、最低バージョンの履歴を表示（移動も含めるためキーイベントキャンセルにしない）
            if(nowVersion < minVersion){
                nowVersion = minVersion;
                console.debug('【ctrl+Z】最低バージョンを下回ったので、最低バージョンの履歴を表示。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
            }
            $('#historyVersion').text(nowVersion);
        });

        //-----------------------------------------------
        // document : redo
        //-----------------------------------------------
        $('#sp-icon-panel-redo').click(function(e){
            var historyHtml = sessionStorage.getItem('sp2SaveData_'+nowVersion);
            if(historyHtml){
                fdoc.find('body').html(historyHtml);
                contentDocument.body.scrollTop = sessionStorage.getItem('sp2SaveDataScroll_'+nowVersion);
                console.debug('【ctrl+Y】履歴セット。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                nowVersion++;
            }else{
                console.debug('【ctrl+Y】履歴なし。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                    nowVersion++;
            }
            // maxバージョンを超えた場合は、maxバージョンの履歴を表示（移動も含めるためキーイベントキャンセルにしない）
            if(nowVersion > maxVersion){
                nowVersion = maxVersion;
                console.debug('【ctrl+Y】maxバージョンを超えたので、maxバージョンの履歴を表示。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
            }
            $('#historyVersion').text(nowVersion);
        });

        //-----------------------------------------------
        //  document : upload image
        //-----------------------------------------------
        setEventUploadImage('spUploadImageInputBox','spUploadImageForm','image');
        setEventUploadImage('spUploadBgImageInputBox','spUploadBgImageForm','bg-image');
        function setEventUploadImage(inputTypeFileId, formId, setType){
            // event set
            $('#'+inputTypeFileId).change(function(e){
                //cc('image upload start');
                // 履歴登録
                //f_historyRegist('image upload start');
                var spEdit = fdoc.find('.spEdit').first();
                var tagName = spEdit[0].tagName;
                var formData = new FormData($('#'+formId).get(0));
                $.ajax({
                    url: 'upload_image.php',
                    type:'POST',
                    data:formData,
                    processData: false,
                    contentType: false,
                    cache: false,
                    dataType:'json',
                    timeout:15000,
                    beforeSend:function(XMLHttpRequest){
                        $("#sp-layer").show();
                    },
                    success: function(res){
                        //cc(res);
                        if(res.uploadSuccessFlag == true){
                            cc('upload success');
                            // cmd : image
                            if(setType == 'image'){
                                if(tagName == 'IMG'){
                                    spEdit.attr('src',res.uploadImgSrc).css('max-width','100%');
                                }else{
                                    contentDocument.execCommand('insertImage',false,res.uploadImgSrc);
                                }
                            // cmd : bg-image
                            }else if(setType == 'bg-image'){
                                spEdit.css('background','url('+res.uploadImgSrc+') no-repeat center center');
                            }
                        }else{
                            // show error message
                            alert(res.errorMsg);
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        cc('error');
                        cc(XMLHttpRequest);
                        cc(textStatus);
                        cc(errorThrown);
                        cc('【ftpUpload】エラーが発生しました。画面はそのままでシステムユニットに連絡して下さい');
                    },
                    complete:function(XMLHttpRequest, textStatus){
                        //cc('complete');
                        // input type file value reset. because for event onChange.
                        $('#'+inputTypeFileId).val('');
                        f_editable(spEdit);
                    }
                });
                return false;
            });
        }
        // --- image upload end ----------

        //-----------------------------------------------
        //  document : upload HTML
        //-----------------------------------------------
        $('#uploadHtml').click(function(e){
            try{
                // confirmをすると処理が重くなる（gifアニメーションも止まる）ので、あとで自前confirmを作成する予定。
                if(confirm('FTPアップロードを行ってもよろしいですか？'+"\n\n"+'[このページのURL]'+"\n"+$('#accessUrl').val())){

                    unloadAlertFlag = false;

                    //▼アップ前の削除処理--------------------

                    // <head>HTML編集中なら、HTML反映してからアップロード
                    var htmlHead = $('#sp-icon-panel-show-html-head');
                    if(htmlHead.attr('data-on-off-status') == 'on'){
                        htmlHead.trigger('click');
                    }

                    // <body>HTML編集中なら、HTML反映してからアップロード
                    var htmlBody = $('#sp-icon-panel-show-html-body');
                    if(htmlBody.attr('data-on-off-status') == 'on'){
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
                    $('#'+myTextareaId).val(htmlData);

                    // サブミット
                    $('#editForm').removeAttr("onsubmit").submit();
                }
            }catch(e){
                var errMsg = '[exception]['+arguments.callee.name+'] 例外エラーが発生しました。画面はそのままでシステムユニットに連絡して下さい。'+"\n\n-------------------------------------------------------------\n"+e.message;
                console.log(errMsg);
                alert(errMsg);
            }
        });

        //-----------------------------------------------
        //  document : beforeunload
        //-----------------------------------------------
        $(window).on('beforeunload',function(e){
          //変更がある場合のみ警告をだす
          if (unloadAlertFlag) {
            return "入力した情報が失われます。";
          }
        });


        // DOCUMENT EVENT END ####################################################################################################
        //mark('DOCUMENT EVENT END');

        // FUNC START ####################################################################################################
        /**
         * f_commandExec
         */
        function f_cmdExec(e){
            //cc('[f_cmdExec]----------------------------------------------');
            // 通常イベントキャンセル（コレしないとinput[type="number"]でバリデート警告が出る。）
            e.preventDefault();
            // cmd処理は共通でここで履歴登録。操作前の履歴を取ることで、例えば画像削除した後すぐにCtrl+Zした場合に、操作前の状態に戻せる。（操作後に戻すと前cmdの位置に戻る）
            f_historyRegist('cmd='+cmd+' cmdVal='+cmdVal);
            var t = $(e.target);
            var tagName = t[0].tagName;
            // <I>の場合は、その親要素にdata-cmd="bold"などがあるので、親要素をtとする
            if(tagName == 'I'){
                t = $(e.currentTarget);
            }
            var cmd = t.data('cmd');
            // color picker panelクリックの場合は、#sp-color-picker-divのdata-cmdで上書きする
            if(t.hasClass('sp-color-picker-panel')){
                // 【注意！】data()はキャッシュされるので、ずっとforeColorのままになってしまうのでdata-cmdを切り替える処理では使用してはダメ。
                //cmd = $('#sp-color-picker-div').data('cmd');
                cmd = $('#sp-color-picker-div').attr('data-cmd');
                //cc(cmd);
            }
            var cmdVal = t.data('val');
            var selection = contentDocument.getSelection();
            var spEdit = fdoc.find('.spEdit').first();
            var spEditTagName = spEdit[0].tagName ? spEdit[0].tagName : '';

            // <A>で囲まれているか判定するために取得
            var closestLinkObj = spEdit.closest('a');

            // 置換タグ系の処理の場合
            var replaceCmdFlag = false;

//            cc(e.currentTarget);
//            cc(e.target);
//            cc(spEdit);
//            cc(spEditTagName);
//            cc(tagName);
//            cc(cmd);
//            cc(selection.anchorNode);
//            cc(selection.anchorOffset);
//            cc(selection.focusNode);
//            cc(selection.focusOffset);
//            cc(selection.rangeCount);

            //-----------------------------------------------
            // 選択範囲の数が0なら終了
            //-----------------------------------------------
            if(spEditTagName == 'IMG'){
                // ターゲットが<IMG>の場合キャレット見ない
            }else if(selection.rangeCount == 0){
                //cc('選択範囲（キャレットなし）なし。終了');
                return;
            }

//            if(selection.isCollapsed == true && cmd != 'insertImage'){
//                $('#sp-cmd-error-msg').text('テキストを選択してください。');
//                return;
//            }

            //-----------------------------------------------
            // cmd名によって処理分岐
            //-----------------------------------------------
            switch(cmd){

                case 'foreColor':
                    break;

                case 'fontSize':
                    cmdVal = t.val();
                    break;

                case 'fontName':
                    cmdVal = "'"+(t.val())+"'";
                  break;

                //-----------------------------------------------
                // show-hidden-box
                //-----------------------------------------------
                case 'show-hidden-box-image':
                    // spEdit自身が<IMG>ならsrc属性を取得し、デフォルトセット
                    if(spEditTagName == 'IMG'){
                        var src = spEdit.attr('src');

                    // spEdit自身が<IMG>以外なら、execCommand新規挿入
                    }else{
                        // execCommand新規挿入
                    }
                    // hidddenBox表示共通処理
                    f_showHiddenBoxCommon('image',src);
                    return false;
                    break;

                case 'show-hidden-box-bg-image':
                    // spEdit自身に背景画像が設定されているならurl()を取得し、デフォルトセット
                    var bgUrl = spEdit.css('background-image');
                    if(bgUrl == 'none'){
                        bgUrl = '';
                    }else{
                        bgUrl = bgUrl.replace('url(','').replace(')','');
                    }
                    // hidddenBox表示共通処理
                    f_showHiddenBoxCommon('bg-image',bgUrl);
                    return false;
                    break;

                case 'show-hidden-box-replace-string':
                    // spEdit自身が 置換タグ なら <template> からvideoタグを取得し、デフォルトセット
                    if(spEdit.hasClass('sp-replace-span')){
                        var replaceString = spEdit.find('template').html();
                    // spEdit自身がvideo置換DIV以外なら、execCommand新規挿入
                    }else{
                        // execCommand新規挿入
                    }
                    // hidddenBox表示共通処理
                    f_showHiddenBoxCommon('replace-string',replaceString);
                    return false;
                    break;

                case 'show-hidden-box-link':
                    if(spEditTagName == 'A'){
                        var href = spEdit.attr('href');

                    // <A>で囲まれている場合もhref見る
                    }else if (closestLinkObj.length > 0){
                        var href = closestLinkObj.attr('href');

                    // spEdit自身が<IMG>以外なら、execCommand新規挿入
                    }else{
                        // execCommand新規挿入
                    }
                    // hidddenBox表示共通処理
                    f_showHiddenBoxCommon('link',href);
                    return false;
                    break;

                case 'show-hidden-box-fore-color':
                    // あとから既存で設定されている色がわかるような処理書きます。
                    // show color picker. cmdType : foreColor
                    $('#sp-color-picker-div').attr('data-cmd','foreColor').show();
                    return false;
                    break;

                case 'show-hidden-box-back-color':
                    // あとから既存で設定されている色がわかるような処理書きます。
                    // show color picker. cmdType : backColor
                    $('#sp-color-picker-div').attr('data-cmd','backColor').show();
                    return false;
                    break;

                case 'show-hidden-box-timer':
                    var second = spEdit.attr('data-sp2-timer-second');
                    // hidddenBox表示共通処理
                    f_showHiddenBoxCommon('timer',second);
                    return false;
                    break;

                case 'show-hidden-box-form-info':
                    // 自身がFORMタグ以外なら、FORM要素をspEdit化
                    if(tagName != 'FORM'){
                        var closestFormObj = spEdit.closest('form');
                        f_editable(closestFormObj);
                        spEdit = closestFormObj;
                    }
                    // フォーム内の<hidden>タグを取得、セットする
                    var actionUrl = spEdit.attr('action');
                    var hiddenHtml = '';
                    spEdit.find('input[type="hidden"]').clone(true).each(function(){
                        hiddenHtml += this.outerHTML;
                        hiddenHtml += "\n";
                    });
                    // hidddenBox表示共通処理　※inputBoxが１つでない為、第2引数は空で、個別プリセット。
                    f_showHiddenBoxCommon('form-info','');
                    $('#sp-input-box-form-action-url').val(actionUrl);
                    $('#sp-input-box-form-hidden').val(hiddenHtml);
                    return false;
                    break;

                //-----------------------------------------------
                // insert-***
                //-----------------------------------------------
                case 'insertImage':
                    var cmdVal = $('#sp-input-box-image').val();
                    cmdVal = f_EmptyFormat(cmdVal);

                    // spEdit自身が<IMG>ならsrc属性変更のみで終了
                    if(spEditTagName == 'IMG'){
                        spEdit.attr('src',cmdVal);
                        f_editable(spEdit);
                        return false;

                    // spEdit自身が<IMG>以外なら、execCommand新規挿入
                    }else{
                        // execCommand新規挿入
                    }
                    break;

                case 'insertBgImage':
                    var bgUrl = $('#sp-input-box-bg-image').val();
                    bgUrl = f_EmptyFormat(bgUrl);
                    // css('background-image','url()')を設定した場合、jqeuryの仕様でブラウザURLが背景画像として設定されるので、値がある場合のみセットする
                    if(bgUrl){
                        spEdit.css('background-image','url('+bgUrl+') no-repeat 50% 50%');
                    }else{
                        spEdit.css('background-image','none');
                    }
                    f_editable(spEdit);
                    return false;
                    break;

                case 'insertVideo':
                case 'insertScript':
                    replaceCmdFlag = true;
                    var replaceType = '';
                    var replaceString = $('#sp-input-box-replace-string').val();
                    replaceString = f_EmptyFormat(replaceString);

//                    // スクリプトタグは許可しない
//                    if (replaceString.indexOf('<script') > 0 || replaceString.indexOf('</script>') > 0) {
//                        alert('[エラー] <script>タグが含まれています。');
//                        return false;
//                    }

                    // spEdit自身が 置換タグなら、<template> から値を取得し、デフォルトセット
                    if(spEdit.hasClass('sp-replace-span')){
                        // 置換タイプ 取得
                        replaceType = spEdit.attr('data-replace-type');
                        spEdit.replaceWith('<span class="sp-replace-span" data-replace-type="'+replaceType+'"><template>'+replaceString+'</template></span>');
                        f_editable(spEdit);
                        return false;

                    // spEdit自身が 置換タグ以外なら、execCommand新規挿入
                    }else{
                        // コマンド名によって置換タイプ決定
                        if(cmd == 'insertVideo')  replaceType = 'video';
                        if(cmd == 'insertScript') replaceType = 'script';
                        // execCommand新規挿入
                        cmd = 'insertHTML';
                        cmdVal = '<span id="sp-replace-temp-string-id">%%SP_REPLACE_TEMP_STRING_ID%%</span>';
                        replaceString = '<span class="sp-replace-span" data-replace-type="'+replaceType+'"><template>'+replaceString+'</template></span>';
                    }
                    break;

                case 'createLink':
                    var href = $('#sp-input-box-link').val();
                    cmdVal = f_EmptyFormat(href);

                    // spEdit自身が<A>の場合、href属性変更のみで終了
                    if(spEditTagName == 'A'){
                        spEdit.attr('href',cmdVal);
                        f_editable(spEdit);
                        return false;

                    // <A>で囲まれていた場合、href属性変更のみで終了
                    }else if(closestLinkObj.length > 0){
                        closestLinkObj.attr('href',cmdVal);
                        f_editable(spEdit);
                        return false;

                    // spEdit自身が<IMG>なら、createLinkが効かないので、jqueryで直接<a>で囲む。
                    }else if(spEditTagName == 'IMG'){
                        //cc(cmdVal);
                        spEdit.wrap('<a href="'+cmdVal+'">');
                        f_editable(spEdit);
                        return false;

                    // spEdit自身が<A>以外なら、execCommand新規挿入
                    }else{
                        // execCommand新規挿入
                    }
                    break;

                case 'setTimer':
                     var second = $('#sp-input-box-timer').val();
                     if(second > 0){
                         spEdit.removeClass (function (index, cn) {
                             return (cn.match (/\bsp2-timer-second-\S+/g) || []).join(' ');
                          }).attr('data-sp2-timer-second',second).addClass('sp2-timer sp2-timer-second-'+second);
                     }else{
                         spEdit.removeClass (function (index, cn) {
                             return (cn.match (/\bsp2-timer-second-\S+/g) || []).join(' ');
                          }).removeAttr('data-sp2-timer-second',second).removeClass('sp2-timer');
                     }
                     f_editable(spEdit);
                     return false;
                     break;

                case 'setFormInfo':
                    spEdit.find('input[type="hidden"]').remove();
                    var actionUrl = $('#sp-input-box-form-action-url').val();
                    var hiddenHtml = $('#sp-input-box-form-hidden').val();
                    spEdit.attr('action',actionUrl).prepend(hiddenHtml);
                    f_editable(spEdit);
                    return false;
                    break;

                //-----------------------------------------------
                // ipkMenu***
                //-----------------------------------------------
                case 'ipkMenuDelete':
                    spEdit.animate(
                        {height: "5px",},
                        {
                            duration: 500,
                            easing: 'swing',
                            complete: function() {
                                $(this).remove();
                                fdoc.find('#ipkMenu').hide();
                                // ここで履歴登録しないと、削除されている途中のDOMで履歴登録されてしまうので、return false の上に記述しないように。
                                //f_historyRegist('ipkMenu :  delete');
                            }
                        }
                    );
                    return false;
                    break;

                case 'ipkMenuCopy':
                    fdoc.find('.ipkMenuCopyAnime').removeClass('ipkMenuCopyAnime');
                    //var copySpEdit = spEdit.clone(true).removeAttr('contenteditable').removeClass('spEdit').css('outline','blue 2px solid');
                    spEdit.after(spEdit.clone(true).removeAttr('contenteditable').removeClass('spEdit').addClass('ipkMenuCopyAnime'));
//                    spEdit.after(
//                        copySpEdit.fadeIn(800,function(){
//                            copySpEdit.css('outline','none');
//                            //f_historyRegist('cmd='+cmd+' cmdVal='+cmdVal);//cmd処理前で共通履歴登録に変更
//                        })
//                    );
                    //f_historyRegist('ipkMenu :  copy');
                    return false;
                    break;

                case 'ipkMenuMoveUp':
                    var spEditPrev = spEdit.prev();
                    if(spEditPrev.length > 0){
                        spEditPrev.before(spEdit.clone(true));
                        spEdit.remove();
                        //f_historyRegist('ipkMenu :  move up');
                    }else{
                        //cc('ipkMenu :  move up is MAX');
                    }
                    return false;
                    break;

                case 'ipkMenuMoveDown':
                    var spEditNext = spEdit.next();
                    if(spEditNext.length > 0){
                        spEditNext.after(spEdit.clone(true));
                        spEdit.remove();
                        //f_historyRegist('ipkMenu :  move down');
                    }else{
                        //cc('ipkMenu :  move down is MAX');
                    }
                    return false;
                    break;

                case 'ipkMenuSelectParent':
                    var spEditParent = spEdit.parent();
                    var tagName = spEditParent[0].tagName;
                    if(spEditParent.length > 0 && tagName != 'BODY'){
                        f_resetAll();
                        f_editable(spEditParent);
                        //f_historyRegist('ipkMenu :  select parent');
                    }else{
                        //cc('ipkMenu :  select parent MAX. tagName='+tagName);
                    }
                    return false;
                    break;

                default:
                    break;
            }


            //cc(contentDocument.queryCommandState(cmd));
            //cc('cmd='+cmd+' cmdVal='+cmdVal);
            contentDocument.execCommand(cmd,false,cmdVal);

            // default property [-webkit-xxx-large] replace to [*px]
            // commandExec後にinnerHTML系すると、選択範囲が消される。
            // 続けてBold、font-size変更などができない。よってcommandExec後に選択要素を取得し、cssだけ変更する。（css変更は選択範囲解除にならない。）
            if(cmd == 'fontSize'){
                // default property [-webkit-xxx-large] replace to [*px]
                spEdit.find('span[style*="font-size: -webkit-xxx-large"]').css('font-size',cmdVal);
            }

            if(cmd == 'insertImage' || cmd == 'createLink'){
                //selection.selectAllChildren(contentDocument.getSelection().getRangeAt(0).startContainer.parentElement);
            }

            // 置換系の処理の場合は、SP_REPLACE_VIDEO_STRING_IDのvalに実際のビデオタグを入れる
            // ※execCommandのinsertHTMLはうまく起動しない（勝手にタグ・属性・値を削除する）ので、
            // 削除されないレベルのタグ「<textarea id="sp-replace-video-textarea-pre" readonly contenteditable="false"></textarea>」を先に挿入し、
            // あとからvalにvideoタグを入れる
            if(replaceCmdFlag == true){
                fdoc.find('#sp-replace-temp-string-id').replaceWith(replaceString);
                fdoc.find("span:contains('%%SP_REPLACE_VIDEO_STRING_ID%%')").replaceWith(replaceString);// execCommnand->insertHTMLで（id/class）属性が消されることがあるので、文字列で置き換え　※置き換えられた例）<span style="font-size: 12.8000001907349px; line-height: 19.2000007629395px;">%%SP_REPLACE_VIDEO%%</span>
            }

            f_editable(spEdit);

            // 履歴登録
            //f_historyRegist('cmd='+cmd+' cmdVal='+cmdVal);//cmd処理前で共通履歴登録に変更

            //selection.removeAllRanges();
            ///if(selection.rangeCount == 0) {return;}
        }

        /**
         * iframe editable
         *
         */
        function f_editable(t){

            //f_historyRegist('elm click. edit start!');

            // リサイズイベント削除＋初期化（コレしないとspEditできなくなる。）この処理は.spEditセットなどの前にする（そうしないとイベントの関係で動かなくなる）
            //cc(dragResize);
            //cc(typeof dragResize);
            if(typeof dragResize == 'object'){
                //cc('detach');
                dragResize.detach();
                dragResize = '';
            }

            // 編集可能にする
            fdoc.find('.spEdit').removeClass('spEdit').removeAttr('contenteditable');
            t.addClass('spEdit').removeClass('targetOutline').attr('contenteditable','true');
            // これがないと親がcontenteditableのままになることがある。全選択時に親要素まで行ってしまう。
            fdoc.find('.targetOutline').removeClass('targetOutline').removeAttr('contenteditable');
            f_showIpkMenu(t);
            f_resetHiddenBox();
            // クリックと同時に全選択＋削除（動作確認済み）
            //contentDocument.execCommand('selectAll',false,null);
            //contentDocument.execCommand('delete',false,null);
            f_refectTagInfo(t);// 現在は.spEditそのもののタグ情報を表示。.spEdit内のクリック要素は表示しない。仕様変更ある時によろしく。
            f_refectIconPanel(t);
            contentWidndow.focus();
            // 画像の場合はリサイズ
            if(t[0].tagName == 'IMG'){
                var planeSpEdit = document.getElementById('htmlBody_ifr').contentDocument.getElementsByClassName('spEdit')[0];
                //dragResize = new DragResize(planeSpEdit ,{ resizeHandle: planeSpEdit});
                cc('sekiya resize set');
            }
        }

        /**
         * show ipkMenu
         */
        function f_showIpkMenu(t){
            var tagName = t[0].tagName;
            var targetWidth = t.width() + parseInt(t.css('padding-left'), 10) + parseInt(t.css('padding-right'), 10);
            var tOffset = t.offset();
            var positionTop = tOffset.top - 32; // ipkMenuの高さと同じ分引く。
            var positionLeft = tOffset.left ;
            var closestLinkObj = t.closest('a');
            var closestFormObj = t.closest('form');
            //cc('ipkMenu Position -------------------');
            //cc(positionTop);
            //cc(positionLeft);

            //-----------------------------------------------
            // ターゲット要素がbodyのサイズに近いレイヤー(縦横誤差50px以上)ならignoreセットし、初期化＋処理終了
            //-----------------------------------------------
            if(positionTop <= 0){
                var fbody = fdoc.find('body');
                var diffpx = (fbody.width() - t.width()) + (fbody.height() - t.height());
//                cc(fbody.width());
//                cc(t.width());
//                cc(fbody.height());
//                cc(t.height());
//                cc(diffpx);
                // 縦横誤差50px未満（ほぼ<body>と同じサイズ）なら、ignoreセットし、初期化＋処理終了
                if(diffpx < 50){
                    fdoc.find('.spEdit').addClass('ignore');
                    f_resetAll();
                    return false;
                // 縦横誤差50px以上なら、ipkMenuをposition.top=1に表示
                }else{
                    positionTop = 1;
                    positionLeft = 1;
                }
            }

            //-----------------------------------------------
            // ipkMenu表示
            //-----------------------------------------------
            if(fdoc.find('#ipkMenu').length == 0){
                fdoc.find('body').append(ipkMemuHtml);
            }
            fdoc.find('#ipkMenu').css('top',positionTop).css('left',positionLeft).css('background-color','rgb(25, 104, 245)').show();
            fdoc.find('#ipkEditMenu').css('display','inline-block');

            //-----------------------------------------------
            // ipkMenuのタグ名表示
            //-----------------------------------------------
            // 基本は通常のタグ名を使用
            var ipkMenuTagName = tagName.toLowerCase();

            // <A>で囲まれている場合は 「a +」 を表示
            if(closestLinkObj.length > 0){
                ipkMenuTagName = 'a + '+ipkMenuTagName;
            }
            fdoc.find('#ipkMenuTagName').html(ipkMenuTagName);

            //-----------------------------------------------
            // ipkMenuCmdBtn（画像・リンク）の場合の表示
            //-----------------------------------------------
            // <IMG>の場合、「画像編集」ボタン表示
            if(tagName == 'IMG'){
                fdoc.find('#ipkMenuEditImageBox').css('display','inline-block');
            }else{
                fdoc.find('#ipkMenuEditImageBox').hide();
            }

            // 背景設定（background-image/background-color) が設定されている場合、「背景画像編集」ボタン表示
            if((t.css('background-image') != 'none' || t.css('background-color') != 'rgba(0, 0, 0, 0)') && !t.hasClass('sp-replace-span')){
                fdoc.find('#ipkMenuEditBgImageBox').css('display','inline-block');
            }else{
                fdoc.find('#ipkMenuEditBgImageBox').hide();
            }

            // <A>の場合、または<A>で囲まれている場合に「リンク編集」ボタン表示
            if(tagName == 'A' || closestLinkObj.length > 0){
                fdoc.find('#ipkMenuEditLinkBox').css('display','inline-block');
            }else{
                fdoc.find('#ipkMenuEditLinkBox').hide();
            }

            // 置換文字の場合、「ビデオを編集」or「Javascriptを編集」ボタン表示
            if(t.hasClass('sp-replace-span')){
                buttonTitle = '置換文字を編集';
                switch(t.attr('data-replace-type')){
                    case 'video':
                        buttonTitle = 'ビデオを編集';
                        break;
                    case 'script':
                        buttonTitle = 'Javascriptを編集';
                        break;
                }
                fdoc.find('#ipkMenuEditReplaceString').text(buttonTitle);
                fdoc.find('#ipkMenuEditReplaceStringBox').css('display','inline-block');
            }else{
                fdoc.find('#ipkMenuEditReplaceStringBox').hide();
            }

            // タイマー表示が設定されている場合、「タイマー表示設定を変更」ボタン表示
            if(t.hasClass('sp2-timer')){
                fdoc.find('#ipkMenuEditTimerBox').css('display','inline-block');
            }else{
                fdoc.find('#ipkMenuEditTimerBox').hide();
            }

            cc(tagName);
            cc(closestFormObj.length);
            // 自身がフォームタグ、またはフォームの子要素なら「フォーム情報の編集」ボタン表示
            if(tagName == 'FORM' || closestFormObj.length > 0){
                fdoc.find('#ipkMenuEditFormInfoBox').css('display','inline-block');
            }else{
                fdoc.find('#ipkMenuEditFormInfoBox').hide();
            }

            //-----------------------------------------------
            // .spEdit存在時のみ点灯箇所
            //-----------------------------------------------
            $('.sp-show-edit-only-place').css('opacity','1');
        }

        /**
         * クリック要素に適用されているアイコン文字色変更
         *
         */
        function f_refectIconPanel(t){
            // アイコン点灯は無駄に処理が多いので、いったん止める。
            // 今はselectboxだけ初期化にしておく。
            $('.sp-exec-cmd-change').find('option:eq(0)').attr("selected",true);
//            f_spIconPanelOnOff(t,'font-weight'    , 'bold'        ,'bold');
//            f_spIconPanelOnOff(t,'text-decoration', 'underline'   ,'underline');
//            f_spIconPanelOnOff(t,'text-decoration', 'line-through','strikethrough');
//            f_spIconPanelOnOff(t,'font-style'     , 'italic'      ,'italic');
//
//            $('#sp-icon-panel-fore-color').css('background-color',t.css('color'));
//            $('#sp-icon-panel-back-color').css('background-color',t.css('background-color'));
//
//            // font-size:100%などもあるし、アイコン変更はやめておこう。
//            $('#sp-icon-panel-font-size').val(t.css('font-size'));
//
//            // フォント指定なしなら
//            if(t.css('font-family').indexOf(',') >= 0){
//                $('#sp-icon-panel-font-family option').first().prop('selected',true);
//            }else{
//                $('#sp-icon-panel-font-family').val(t.css('font-family'));
//            }
//
//            var tagName = t[0].tagName;
//            tagName == 'A' || t.closest('a').length > 0  ? $('#sp-icon-panel-insert-link').addClass('.sp-icon-panel-active')  : $('#sp-icon-panel-insert-link').removeClass('.sp-icon-panel-active');
//            tagName == 'IMG'                             ? $('#sp-icon-panel-insert-image').addClass('.sp-icon-panel-active') : $('#sp-icon-panel-insert-image').removeClass('.sp-icon-panel-active');
//            t.hasClass('sp-replace-span')                ? $('#sp-icon-panel-insert-video').addClass('.sp-icon-panel-active') : $('#sp-icon-panel-insert-video').removeClass('.sp-icon-panel-active');
        }

        /**
         * sp-icon-panel ON/OFF
         *
         */
        function f_spIconPanelOnOff(t,styleName,sytleValue,iconIdSuffix){
            var cssComputedValue = String(t.css(styleName));
            // styleの値があるなら処理する
            if(cssComputedValue){
                var iconPanel = $('#sp-icon-panel-'+iconIdSuffix);
                if(cssComputedValue == sytleValue){
                    iconPanel.addClass('sp-icon-panel-active');
                // text-decoration: underline line-through; の対応。indexOfは文字列にして判定しないとエラーになる
                }else if(cssComputedValue.indexOf(sytleValue) >= 0){
                    iconPanel.addClass('sp-icon-panel-active');
                }else{
                    iconPanel.removeClass('sp-icon-panel-active');
                }
            }
        }

        /**
         * iframe all reset.
         *
         *  1. spEdit remove
         *  2. targetOutline remove
         *  2. ipkMemu remove
         *  3. hide hiddenBox
         */
        function f_resetAll(){
            fdoc.find('.spEdit').removeAttr('contenteditable').removeClass('spEdit');
            fdoc.find('.targetOutline').removeAttr('contenteditable').removeClass('targetOutline');
            fdoc.find('#ipkMenu').hide();
            fdoc.find('.ipkMenuCopyAnime').removeClass('ipkMenuCopyAnime');
            $('.sp-show-edit-only-place').css('opacity','0.2');
            f_resetHiddenBox();
        }

        /**
         * hide hiddenBox
         */
        function f_resetHiddenBox(){
            $('#sp-layer').hide();
            $('.sp-hidden-box').hide();
            //fdoc.find('#ipkMenu').hide();
            //fdoc.find('.spEdit').removeClass('spEdit');
            $('#sp2-common-msg').hide();
            return false;
        }

        /**
         * show hiddenBox common process
         *
         */
        function f_showHiddenBoxCommon(divName,boxVal){
            boxVal = f_EmptyFormat(boxVal);
            $('#sp-layer').show();
            $('#sp-input-div-'+divName).show();
            if($('#sp-input-box-'+divName) && boxVal){
                $('#sp-input-box-'+divName).val(boxVal).focus();
            }
            return false;
        }



        /**
         * undefined formart
         */
        function f_EmptyFormat(data){
            // undefinedなら空文字に変換
            if(!data){
                data = '';
            }
            return data;
        }

        /**
         * outerHTML
         */
        function f_outerHtml(jEle) {
            var div = document.createElement('div');
            div.innerHTML = jEle.clone(true).html();
            var outherHtml = div.innerHTML;
            div = null;
            return outherHtml;
        }

        /**
         * History All Clear
         */
        function f_historyClear(msg) {
            sessionStorage.clear();
            maxVersion = 0;
            nowVersion = 0;
            //console.debug('【履歴初期化】'+msg);
        }

        /**
         *  History regist　※ipkFocusを履歴登録時にborderだけにするため、ipkFocus初期化前に履歴登録すること。
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
            //cc(msg);
            maxVersion++;
            nowVersion++;
            maxVersion = nowVersion;
            // 履歴保存前のHTML整形（ipk初期化処理でボーダーだけ残す版。ipkMenuのイベント設定等が複雑なので履歴にipkMuneは入れない。）
            var cloneBody = fdoc.find('body').clone(true);
            var scrollTop = contentDocument.body.scrollTop;
            // 履歴登録
            sessionStorage.setItem('sp2SaveDataScroll_'+maxVersion, scrollTop);
            sessionStorage.setItem('sp2SaveData_'+maxVersion, cloneBody.html());
            //console.debug('【履歴登録】【maxVersion='+maxVersion+' nowVersion='+nowVersion+' scrollTop='+scrollTop+'】'+msg);
            // 超過分履歴削除
            if( maxVersion > maxHistoryCount){
                var deleteVersion = maxVersion - maxHistoryCount;
                sessionStorage.removeItem('sp2SaveDataScroll_'+deleteVersion);
                sessionStorage.removeItem('sp2SaveData_'+deleteVersion);
                //console.debug('【履歴削除】deleteVersion='+deleteVersion);
            }
            $('#historyVersion').text(nowVersion);
        }

        /**
         * History [Ctrl+Z] [Ctrll+Y]
         */
        function f_keyEvent(e) {
//            cc(f_isEditting());
//            cc(e.shiftKey);
//            cc(e.ctrlKey);
//            cc(e.metaKey);
//            cc(e.keyCode);
            var ctrlKeyFlag = os == 'mac' ? e.metaKey : e.ctrlKey;
            if(ctrlKeyFlag){
                // [Ctrll+Z]
                if(e.keyCode == keyCodeZ){
                    // 編集中
                    if(f_isEditting()){
                    //if(fdoc.find('.spEdit').length > 0){
                        //cc('[Ctrll+Z]press:編集中:undo/redo を contenteditに任せる');
                        // contenteditに任せる。
                    // 編集中以外
                    }else{
                        var historyHtml = sessionStorage.getItem('sp2SaveData_'+nowVersion);
                        if(historyHtml){
                            fdoc.find('body').html(historyHtml);
                            contentDocument.body.scrollTop = sessionStorage.getItem('sp2SaveDataScroll_'+nowVersion);
                            //cc(sessionStorage.getItem('sp2SaveDataScroll_'+nowVersion));
                            //fdoc.find('.comItemPackage').click(ipkSetting);
                            console.debug('【ctrl+Z】履歴セット。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                            nowVersion--;
                        }else{
                            console.debug('【ctrl+Z】履歴なし。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                            nowVersion++;
                        }
                        var minVersion = maxVersion - maxHistoryCount;
                        // 最低バージョンを下回った場合は、最低バージョンの履歴を表示（移動も含めるためキーイベントキャンセルにしない）
                        if(nowVersion < minVersion){
                            nowVersion = minVersion;
                            console.debug('【ctrl+Z】最低バージョンを下回ったので、最低バージョンの履歴を表示。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                        }
                    }
                    // mac/win共にCtrl+Zはchromeショートカット競合なしなので、キーイベントキャンセルしない
                    //return false;
                // [Ctrll+Y]
                }else if(e.keyCode == keyCodeY){
                    // 編集中
                    if(f_isEditting()){
                    //if(fdoc.find('.spEdit').length > 0){
                        //cc('[Ctrll+Y]press:編集中:undo/redo を contenteditに任せる');
                        contentDocument.execCommand('redo',false,null);
                    // 編集中以外
                    }else{
                        var historyHtml = sessionStorage.getItem('sp2SaveData_'+nowVersion);
                        if(historyHtml){
                            fdoc.find('body').html(historyHtml);
                            contentDocument.body.scrollTop = sessionStorage.getItem('sp2SaveDataScroll_'+nowVersion);
                            //fdoc.find('.comItemPackage').click(ipkSetting);
                            console.debug('【ctrl+Y】履歴セット。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                            nowVersion++;
                        }else{
                            console.debug('【ctrl+Y】履歴なし。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                                nowVersion++;
                        }
                        // maxバージョンを超えた場合は、maxバージョンの履歴を表示（移動も含めるためキーイベントキャンセルにしない）
                        if(nowVersion > maxVersion){
                            nowVersion = maxVersion;
                            console.debug('【ctrl+Y】maxバージョンを超えたので、maxバージョンの履歴を表示。maxHistoryCount='+maxHistoryCount+' maxVersion='+maxVersion+' nowVersion='+nowVersion);
                        }
                    }
                    //mac-chromeショートカットと競合するので、キーイベントキャンセル。
                    return false;
                }
            }
            // Disable the [delete/backspace] key is not in edit
            if(f_isEditting() == false && e.keyCode == 8){
            //if(fdoc.find('.spEdit').length == 0 && e.keyCode == 8){
                return false;
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
         * set KeyCode
         */
        function f_setKeyCode(os) {
            if(os == 'mac'){
                keyCodeShift = 16;
                keyCodeCtrl  = 91;
                keyCodeEnter = 13;
                keyCodeZ     = 90;
                keyCodeY     = 89;
            }else{
                keyCodeShift = 16;
                keyCodeCtrl  = 17;
                keyCodeEnter = 13;
                keyCodeZ     = 90;
                keyCodeY     = 89;
            }
        }

        /**
         * str_replace
         */
        function replaceAll(expression, org, dest){
            return expression.split(org).join(dest);
        }

        // FUNC END ####################################################################################################
        //mark('FUNC END');


      // [Tag Info ( Refect Tag Info / Refect .spEdit )] START ####################################################################################################

       /**
        * Refect Tag Info, When .spEdit Click
        *
        */
        function f_refectTagInfo(t){

            // class属性ない（空の）場合にreplaceでエラー起きる
            var className = t.attr('class') ? t.attr('class').replace('targetOutline','').replace('spEdit','') : '';

            //-----------------------------------------------
            // Tag info
            //-----------------------------------------------
            $('#sp-taginfo-tagname').html(t[0].tagName);
            $('#sp-taginfo-id').val(t.attr('id'));
            $('#sp-taginfo-class').val(className);
            //$('#sp-taginfo-style').val(t.attr('style'));
            if(t.attr('style')){
                $('#sp-taginfo-style').val(t.attr('style').split(';').join(";\n"));
            }else{
                $('#sp-taginfo-style').val('');
            }

            //-----------------------------------------------
            // Size
            //-----------------------------------------------
            $('#sp-taginfo-width').val(dpx(t.css('width')));
            $('#sp-taginfo-height').val(dpx(t.css('height')));

            //-----------------------------------------------
            // Background
            //-----------------------------------------------
            var backgroundColorRgb     = t.css('background-color');
            var backgroundColorHex     = '';
            var backgroundColorOpacity = '';
            var backgroundImage        = t.css('background-image').replace('url(','').replace(')','');

            if(backgroundColorRgb == 'rgba(0, 0, 0, 0)'){
                backgroundColorRgb     = backgroundColorRgb;
                backgroundColorHex     = rgbToHex(backgroundColorRgb);
                backgroundColorOpacity = '1';
            }else{
                backgroundColorRgb     = backgroundColorRgb;
                backgroundColorHex     = rgbToHex(backgroundColorRgb);
                backgroundColorOpacity = rgbToOpacity(backgroundColorRgb);
            }
            if(backgroundImage == 'none'){
                backgroundImage = '';
            }

            $('#sp-taginfo-background-color-input').val(backgroundColorHex);
            $('#sp-taginfo-background-color-picker').val(backgroundColorHex);// input[type="color"]は空文字入れるとコンソールWarning出る
            $('#sp-taginfo-background-color-opacity-input').val(backgroundColorOpacity);
            $('#sp-taginfo-background-color-opacity-range').val(backgroundColorOpacity);
            $('#sp-taginfo-background-image').val(backgroundImage);

            //-----------------------------------------------
            // Border
            //-----------------------------------------------
            var borderArr              = t.css('border').split(' ');
            var borderWidth            = borderArr[0];
            var borderStyle            = borderArr[1];
            var borderColor            = rgbToHex(borderArr[2]+borderArr[3]+borderArr[4]);
            var borderRadius           = dpx(t.css('border-radius'));

            if(borderStyle == 'none'){
                borderWidth = '';
            }

            $('#sp-taginfo-border-width').val(borderWidth);
            $('#sp-taginfo-border-style').val(borderStyle);
            $('#sp-taginfo-border-color-input').val(borderColor);
            $('#sp-taginfo-border-color-picker').val(borderColor);// input[type="color"]は空文字入れるとコンソールWarning出る
            $('#sp-taginfo-border-radius-input').val(borderRadius);
            $('#sp-taginfo-border-radius-range').val(borderRadius);

            //-----------------------------------------------
            // Padding
            //-----------------------------------------------
            var pTop      = dpx(t.css('padding-top'));
            var pRight    = dpx(t.css('padding-right'));
            var pBottom   = dpx(t.css('padding-bottom'));
            var pLeft     = dpx(t.css('padding-left'));

            $('#sp-taginfo-padding-top-input').val(pTop);
            $('#sp-taginfo-padding-top-range').val(pTop);
            $('#sp-taginfo-padding-right-input').val(pRight);
            $('#sp-taginfo-padding-right-range').val(pRight);
            $('#sp-taginfo-padding-bottom-input').val(pBottom);
            $('#sp-taginfo-padding-bottom-range').val(pBottom);
            $('#sp-taginfo-padding-left-input').val(pLeft);
            $('#sp-taginfo-padding-left-range').val(pLeft);
            if(pTop == pRight && pTop == pBottom && pTop == pLeft){
                $('#sp-taginfo-padding-all-input').val(pTop);
                $('#sp-taginfo-padding-all-range').val(pTop);
            }else{
                $('#sp-taginfo-padding-all-input').val('');
                $('#sp-taginfo-padding-all-range').val(0);
            }
        }

        //-----------------------------------------------
        // Refect .spEdit, When Tag Info input.
        //-----------------------------------------------
        // Size
        //-----------------------------------------------
        $('#sp-taginfo-id').change(function(e){fdoc.find('.spEdit').attr('id',$(e.target).val());});
        $('#sp-taginfo-class').change(function(e){fdoc.find('.spEdit').attr('class',$(e.target).val());});
        $('#sp-taginfo-style').keyup(function(e){fdoc.find('.spEdit').attr('style',$(e.target).val());});

        // Size
        //-----------------------------------------------
        $('#sp-taginfo-width').change(f_refectSpEditWidthHeight);
        $('#sp-taginfo-height').change(f_refectSpEditWidthHeight);

        // Padding
        //-----------------------------------------------
        $('#sp-taginfo-padding-all-range').mousemove(f_refectSpEditCssPadding);
        $('#sp-taginfo-padding-top-range').mousemove(f_refectSpEditCssPadding);
        $('#sp-taginfo-padding-right-range').mousemove(f_refectSpEditCssPadding);
        $('#sp-taginfo-padding-bottom-range').mousemove(f_refectSpEditCssPadding);
        $('#sp-taginfo-padding-left-range').mousemove(f_refectSpEditCssPadding);

        // border
        //-----------------------------------------------
        $('#sp-taginfo-border-style').change(f_refectSpEditBorder);
        $('#sp-taginfo-border-width').change(f_refectSpEditBorder);
        $('#sp-taginfo-border-color-input').change(f_refectSpEditBorder);
        $('#sp-taginfo-border-color-picker').change(f_refectSpEditBorder);
        $('#sp-taginfo-border-radius-range').mousemove(f_refectSpEditBorderRadius);

        // Background
        //-----------------------------------------------
        $('#sp-taginfo-background-color-input').change(f_refectSpEditBackgroundColor);
        $('#sp-taginfo-background-color-picker').change(f_refectSpEditBackgroundColor);
        $('#sp-taginfo-background-color-opacity-range').mousemove(f_refectSpEditBackgroundColorOpacity);
        $('#sp-taginfo-background-image').change(f_refectSpEditBackgroundImage);

      /**
       * Refect .spEdit : width / height
       */
      function f_refectSpEditWidthHeight(){
          var w = $('#sp-taginfo-width');
          var h = $('#sp-taginfo-height');
          // set .spEdit css
          fdoc.find('.spEdit').css('width',w.val()+'px').css('height',h.val()+'px');
      }

      /**
       * Refect .spEdit : padding
       */
      function f_refectSpEditCssPadding(e){
          var id = e.target.id;
          var setPaddingValue = '';
          var allValue = $('#sp-taginfo-padding-all-input');
          var allRange = $('#sp-taginfo-padding-all-range');
          var topValue = $('#sp-taginfo-padding-top-input');
          var topRange = $('#sp-taginfo-padding-top-range');
          var rightValue = $('#sp-taginfo-padding-right-input');
          var rightRange = $('#sp-taginfo-padding-right-range');
          var bottomValue = $('#sp-taginfo-padding-bottom-input');
          var bottomRange = $('#sp-taginfo-padding-bottom-range');
          var leftValue = $('#sp-taginfo-padding-left-input');
          var leftRange = $('#sp-taginfo-padding-left-range');
          var allRangeValue    = allRange.val();
          var topRangeValue    = topRange.val();
          var rightRangeValue  = rightRange.val();
          var bottomRangeValue = bottomRange.val();
          var leftRangeValue   = leftRange.val();

          if(id == 'sp-taginfo-padding-all-range'){
              allValue.val(allRangeValue);
              topValue.val(allRangeValue);
              rightValue.val(allRangeValue);
              bottomValue.val(allRangeValue);
              leftValue.val(allRangeValue);

              allRange.val(allRangeValue);
              topRange.val(allRangeValue);
              rightRange.val(allRangeValue);
              bottomRange.val(allRangeValue);
              leftRange.val(allRangeValue);

              setPaddingValue = allRangeValue + 'px';

          }else{
              allValue.val('0');
              topValue.val(topRangeValue);
              rightValue.val(rightRangeValue);
              bottomValue.val(bottomRangeValue);
              leftValue.val(leftRangeValue);

              setPaddingValue += topRangeValue + 'px ';
              setPaddingValue += rightRangeValue + 'px ';
              setPaddingValue += bottomRangeValue + 'px ';
              setPaddingValue += leftRangeValue + 'px';
          }

          fdoc.find('.spEdit').css('padding',setPaddingValue);

      }

      /**
       * Refect .spEdit : border
       */
      function f_refectSpEditBorder(){
          // set #sp-taginfo-border-width value.
          var bw = $('#sp-taginfo-border-width');
          var borderWidth = bw.val();
          if(borderWidth.length == 0){
              borderWidth = '1px';
          }
          bw.val(borderWidth);

          // set #sp-taginfo-border-color-input value.
          var bc = $('#sp-taginfo-border-color-input');
          var bcp = $('#sp-taginfo-border-color-picker');
          var borderColor = bcp.val().toUpperCase();
          bc.val(borderColor);

          // set .spEdit css
          var setCssBorder = '';
          setCssBorder += borderWidth;
          setCssBorder += ' ';
          setCssBorder += $('#sp-taginfo-border-style').val();
          setCssBorder += ' ';
          setCssBorder += borderColor;
          fdoc.find('.spEdit').css('border',setCssBorder);
      }

      /**
       * Refect .spEdit : border radius
       */
      function f_refectSpEditBorderRadius(){
          var br = $('#sp-taginfo-border-radius-input');
          var brr = $('#sp-taginfo-border-radius-range');
          var setCssBorderRadius = brr.val();
          br.val(setCssBorderRadius);
          fdoc.find('.spEdit').css('border-radius',setCssBorderRadius+'px');
      }

      /**
       * Refect .spEdit : background color
       */
      function f_refectSpEditBackgroundColor(){
          var bc = $('#sp-taginfo-background-color-input');
          var bcp = $('#sp-taginfo-background-color-picker');
          var backgroundColor = bcp.val().toUpperCase();
          bc.val(backgroundColor);
          fdoc.find('.spEdit').css('background-color',backgroundColor);
      }

      /**
       * Refect .spEdit : background color opacity
       */
      function f_refectSpEditBackgroundColorOpacity(){
          // background-colorに入力値がある場合のみ動作
          if($('#sp-taginfo-background-color-input').val()){
              // range value to value
              var value = $('#sp-taginfo-background-color-opacity-input');
              var range = $('#sp-taginfo-background-color-opacity-range');
              var rangeVal = range.val();
              value.val(rangeVal);

              // apply to .spEdit
              var spEdit = fdoc.find('.spEdit');
              var spEidtRgb = spEdit.css('background-color');
              var spEidtRgbArr = rgbToArr(spEidtRgb);
              var rgba = 'rgba('+spEidtRgbArr[0] + ',' + spEidtRgbArr[1] + ',' + spEidtRgbArr[2] + ',' + rangeVal + ')';
              spEdit.css('background-color',rgba);
          }
      }

      /**
       * Refect .spEdit : background-image
       */
      function f_refectSpEditBackgroundImage(){
          var bgImageUrl = $('#sp-taginfo-background-image').val();
          fdoc.find('.spEdit').css('background-image','url('+bgImageUrl+')').css('background-repeat','no-repeat').css('background-position','50% 50%');
      }

      /**
       * ( rgb or rgba ) to Opacity.
       */
       function rgbToOpacity(rgb){
           var rgbOpacity = '';
           var rgbArr = rgbToArr(rgb);
           if(rgbArr.length == 4){
               rgbOpacity = rgbArr[3];
               // 小数点2桁まで表示
               rgbOpacity = Math.round(rgbOpacity * 100) / 100;
           }else{
               rgbOpacity = '1';
           }
           return rgbOpacity;
       }

      /**
       * rgb to hex
       */
       function rgbToHex(rgb){
           var rgbArr = rgbToArr(rgb);
           var hex = '';
           hex += '#';
           hex += ('0'+parseInt(rgbArr[0]).toString(16)).slice(-2);
           hex += ('0'+parseInt(rgbArr[1]).toString(16)).slice(-2);
           hex += ('0'+parseInt(rgbArr[2]).toString(16)).slice(-2);
           return hex.toUpperCase();
       }

       /**
        * ( rgb or rgba ) to Array.
        */
        function rgbToArr(rgb){
            var newRgb = [0,0,0,0];
            if(rgb){
                rgb = rgb.replace('rgba(','');
                rgb = rgb.replace('rgb(','');
                rgb = rgb.replace(')','');
                rgb = rgb.replace(' ','');
                return rgb.split(',');
            }
            return newRgb;
        }

        /**
         * hex to rgb
         */
         function HexToRgb(hex){
             var h = hex.substr(1,6);
             return parseInt("0x"+h);
         }

         /**
          * delele unit [px]
          */
          function dpx(str){
              str = str.replace('px','');
              return str;
          }

      // [Tag info : input event] END ####################################################################################################












    };
    //---skEditor end -----------------








})(jQuery);

/**
 * console.log
 *
 * @param item
 */
function cc(item){
    console.log(item);
}
/**
 * console.warn
 *
 * @param item
 */
function mark(stringVar){
    console.debug('%f : '+stringVar, window.performance.now());
//     // 高精度タイムスタンプ（ページナビゲートからの経過時間をマイクロ秒を返す）
//     var pastTime = window.performance.now();
//    cci(pastTime);
}
/**
 * console.info
 *
 * @param item
 */
function cci(item){
    console.warn(item);
}
function showCommonMsg(type,msg){
    var comMsg = $('#sp2-common-msg');
    var removeClassName = '';
    var addClassName = '';
    if(comMsg.hasClass('sp2-'+type+'-msg-A')){
        removeClassName = 'sp2-'+type+'-msg-A';
        addClassName = 'sp2-'+type+'-msg-B';
    }else{
        removeClassName = 'sp2-'+type+'-msg-B';
        addClassName = 'sp2-'+type+'-msg-A';
    }
    comMsg.text(msg).removeClass(removeClassName).addClass(addClassName).show();
}



//mark('spEditor.js file loading END');