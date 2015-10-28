"use strict";

$(function() {
  // растягивание верхнего блока на высоту экрана

  function update_head_height() {
    $('.section-head').css('height', $(window).height() + 'px');
    $('.section-head').css('min-height', $('.head-left').innerHeight() + 'px');
  }

  update_head_height();
  $(window).resize(update_head_height);

  // слайдер планшета в шапке

  var head_slider = $('.head-tablet-slides').bxSlider({
    mode: 'fade',
    auto: true,
    controls: false,
    pager: false
  });

  $('.head-tablet-slider').click(function() {
    head_slider.stopAuto();
    head_slider.goToNextSlide();
    head_slider.startAuto();
  });

  // поддержка кастомных плейсхолдеров

  $('.form-input').change(function() {
    $(this).toggleClass('empty', $(this).val() == '');
  });

  // маска ввода телефона

  $('.form-input[name="cta-phone"], .form-input[name="contact-phone"]').mask('+7 (999) 999-99-99', {
    autoclear: false
  });

  // слайдер в блоке "Незаменимые свойства"

  function update_func_desc(slide_index) {
    $('.func-desc-list > li').removeClass('active').eq(slide_index).addClass('active');
  }

  var func_slider = $('.func-slides').bxSlider({
    auto: true,
    pause: 5000,
    mode: 'fade',
    controls: false,
    onSliderLoad: function(currentIndex) {
      update_func_desc(currentIndex);
    },
    onSlideBefore: function($slideElement, oldIndex, newIndex) {
      update_func_desc(newIndex);
    }
  });

  $('.func-slides').click(function() {
    func_slider.stopAuto();
    func_slider.goToNextSlide();
    func_slider.startAuto();
  });

  // слайдер с отзывами

  $('.reviews-list').bxSlider({
    auto: true,
    controls: false
  });

  // верхнее фиксированное меню

  var prev_sp = 0;

  function update_topline_menu() {
    var cur_sp = $(window).scrollTop();
    $('.topline-wrapper').toggleClass('visible', cur_sp < prev_sp);
    $('body').toggleClass('topline-visible', cur_sp < prev_sp);

    if (cur_sp == 0) {
      $('.topline-wrapper').removeClass('visible');
      $('body').removeClass('topline-visible');
    }

    prev_sp = cur_sp;
  }

  $(window).scroll(update_topline_menu);

  $('.topline-toggler').click(function(e) {
    $('body').toggleClass('topline-menu-opened');
    e.preventDefault();
    return false;
  });

  $(document).click(function(e) {
    var $target = $(e.target);
    if ($target.parents('.topline').length == 0) {
      $('body').removeClass('topline-menu-opened');
    } else if ($target.is('.topline-menu > li > a')) {
      $('body').removeClass('topline-menu-opened');
    }
  });

  // сохранение пропорций респонсивного блока, для активации
  // достаточно добавить к блоку атрибуты data-prop-x и data-prop-y,
  // отношение между этими величинами будет сохраняться

  function update_proportional_blocks() {
    $('*[data-prop-x]').each(function() {
      var $this = $(this);
      var prop_x = +$this.data('propX');
      var prop_y = +$this.data('propY');

      var ratio = prop_y / prop_x;

      $this.css('height', Math.round($this.innerWidth() * ratio) + 'px');
    });
  }

  update_proportional_blocks();
  $(window).resize(update_proportional_blocks);

  // переключалка в блоке "Сердце приложения"

  function switch_heart_plot() {
    $('.heart-plot').toggleClass('slides-hidden');
  }

  var heart_switch_timer = setInterval(switch_heart_plot, 5000);

  $('.heart-plot').click(function() {
    clearInterval(heart_switch_timer);
    $('.heart-plot').toggleClass('slides-hidden');
    heart_switch_timer = setInterval(switch_heart_plot, 5000);
  });

  // плавная прокрутка при переходе по якорям

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var offset = target.offset().top;
        if (offset < $(window).scrollTop()) {
          offset -= 91; // fixed header height
        }
        $('html,body').animate({
          scrollTop: offset
        }, 1000);
        return false;
      }
    }
  });

  // окошко партнерки

  $('.link-partner').click(function(e) {
    $('.contact-form').addClass('visible');
    $('html,body').animate({
      scrollTop: $('.contact-form').offset().top
    }, 1000);
    e.preventDefault();
    return false;
  });

  // кнопка-телефон

  $('.phone-button').click(function() {
    $(this).addClass('clicked');
  });

  // cta form

  $('.cta-submit').click(function(e) {
    $(this).addClass('sent');
    e.preventDefault();
    return false;
  });
});
