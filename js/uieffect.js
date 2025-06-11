$(function(){

  const _body = $('body');
  const _window = $(window);

  let ww = _window.width();
  let wwNew = ww;

  const wwNormal = 1000; //此值以上是電腦
  // const wwSlim= 400; //更窄螢幕
  // const wwMedium = 700; //此值以下是手機
  // const wwMaximum = 1440; // 最大寬度


  // 版頭查詢區開合
  // --------------------------------------------------------------- //
  let _searchCtrl = $('.searchCtrl');
  let _search = $('.search');
  const srSpeed = 300;

  _searchCtrl.on( 'click', function(){
    if( _search.is(':visible')) {
      _searchCtrl.removeClass('closeIt').attr('aria-expanded', false);
      _search.slideUp(srSpeed);
    } else {
      _search.slideDown(srSpeed, function(){
        _searchCtrl.addClass('closeIt').attr('aria-expanded', true);
        _search.find('input[type="text"]').trigger('focus');
      });
    }
  })

  _body.on('keydown', function(e){
    if( e.code === 'KeyS' && e.altKey && _search.is(':hidden') ) {
      _search.slideDown(srSpeed, function(){
        _searchCtrl.addClass('closeIt').attr('aria-expanded', true);
        _search.addClass('reveal').find('input[type="text"]').trigger('focus');
      });
    }
  })

  _search.on('keydown', function(e){
    if( e.code === 'Escape' ) {
      _search.slideUp(srSpeed);
      _searchCtrl.removeClass('closeIt');
    }
  })

  _search.find('button').on('keydown', function(e){
    if ( e.code === 'Tab' && !e.shiftKey && ww <  wwNormal ) {
      e.preventDefault();
      _searchCtrl.trigger('focus').removeClass('closeIt');
      _search.slideUp(srSpeed);
    }
  })  

  // --------------------------------------------------------------- //


  // 改變瀏覽器寬度 window resize 
  // --------------------------------------------------------------- //
  let winResizeTimer;
  _window.resize(function () {
    clearTimeout(winResizeTimer);
    winResizeTimer = setTimeout( function () {

      wwNew = _window.width();
      
      // 由小螢幕到寬螢幕
      if( ww < wwNormal && wwNew >= wwNormal ) {
        _search.removeAttr('style');
        _searchCtrl.removeClass('closeIt');
      }

      ww = wwNew;
    }, 200)
  })  

})