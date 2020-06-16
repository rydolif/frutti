$(function() {


//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//---------------------------tabs-----------------------
  $('.tabs__wrap').hide();
  $('.tabs__wrap:first').show();
  $('.tabs ul a:first').addClass('active');
  $('.tabs ul a').click(function(event){
    event.preventDefault();
    $('.tabs ul a').removeClass('active');
    $(this).addClass('active');
    $('.tabs__wrap').hide();
    var selectTab = $(this).attr('href');
    $(selectTab).fadeIn();
  });

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        text: "Введите Ваше сообщение",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          card: jQuery('.form-' + index).find("input[name=card]").val(),
          text: jQuery('.form-' + index).find("textarea[name=text]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//------------------------- якоря---------------------------------------
  $(".click").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 0}, 'slow', 'swing');
  });


//------------------------- card---------------------------------------
  function customInput() {
    $('input[type="number"]').each(function(index) {
      $(this).wrap('<div class="custom-input-number catalog__form_input"></div>');
      $(this).before('<button type="button" class="catalog__form_button catalog__form_button--minus">-</button>');
      $(this).after('<button type="button" class="catalog__form_button catalog__form_button--plus">+</button>');
    });
  
    $(".custom-input-number").on("click", function(e) {
      e.preventDefault();
      if (e.target.tagName !== "BUTTON") {
        return;
      }
      var $input = $(this).find('input[type="number"]');
      if (e.target.innerHTML === "+") {
        $input[0].stepUp();
        $input.trigger("input");
      }
      if (e.target.innerHTML === "-") {
        $input[0].stepDown();
        $input.trigger("input");
      }
    });
  }
  
  customInput();
  

//-------------------------------анімація---------------------------------------
  if($(".animation").hasClass('animation')){
    var show = true;
    var countbox = ".wrap--animation";
    $(window).on("scroll load resize", function () {
        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
        var w_height = $(window).height(); // Высота окна браузера
        var d_height = $(document).height(); // Высота всего документа
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
        if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $('.animation').addClass('animation--active')
        }
    });
  }

});

$(window).on('load', function(){
  $('.preloader').delay(2000).fadeOut('slow');
});