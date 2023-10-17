var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var vevet = new Vevet.Application({
  tablet: 1199,
  phone: 899,
  prefix: 'v-',
  viewportResizeTimeout: 100,
  easing: [0.25, 0.1, 0.25, 1],
});
vevet.pageLoad.onLoaded(function () {
  //scrollBarInit
  var scrollBarInit = function () {
    var scrollBar;
    if (!vevet.isMobile) {
      scrollBar = new Vevet.ScrollBar({ container: window });
    }
    return scrollBar;
  };
  scrollBarInit();
  var debounce = function (_a) {
    var callback = _a.callback,
      _b = _a.wait,
      wait = _b === void 0 ? 250 : _b,
      _c = _a.isImmediate,
      isImmediate = _c === void 0 ? false : _c;
    var timeout;
    return function () {
      var later = function () {
        timeout = undefined;
        callback();
      };
      var isCallNow = isImmediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (isCallNow) {
        callback();
      }
    };
  };
  var useObserver = function (_a) {
    var target = _a.target,
      callbackIn = _a.callbackIn,
      callbackOut = _a.callbackOut,
      _b = _a.isCallOnce,
      isCallOnce = _b === void 0 ? false : _b;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(
        function (entry) {
          var element = entry.target;
          if (entry.isIntersecting) {
            // console.log(entry, element);
            if (!callbackIn) {
              return;
            }
            callbackIn(element);
            if (isCallOnce) {
              observer.unobserve(element);
            }
          } else {
            if (!callbackOut) {
              return;
            }
            callbackOut(element);
          }
        },
        {
          root: null,
          threshold: 0,
          rootMargin: '0px 0px 0px 0px',
        }
      );
    });
    if (!target) {
      return undefined;
    }
    observer.observe(target);
    return observer;
  };
  var makeSlider = function (_a) {
    var container = _a.container,
      className = _a.className,
      _b = _a.isThumb,
      isThumb = _b === void 0 ? false : _b,
      _c = _a.thumb,
      thumb = _c === void 0 ? undefined : _c,
      config = _a.config,
      _d = _a.paginationType,
      paginationType = _d === void 0 ? 'bullets' : _d,
      renderBullets = _a.renderBullets;
    if (!container || !className) {
      return undefined;
    }
    var slider =
      container.querySelector(
        '.'
          .concat(className, '-slider')
          .concat(isThumb ? '-thumb' : '', '.swiper')
      ) || null;
    if (!slider) {
      return undefined;
    }
    var pagination = container.querySelector(
      '.'.concat(className, '-slider-pagination')
    );
    var arrowPrev = container.querySelector(
      '.'
        .concat(className, '-slider')
        .concat(isThumb ? '-thumb' : '', '-controls .')
        .concat(className, '-slider-prev')
    );
    var arrowNext = container.querySelector(
      '.'
        .concat(className, '-slider')
        .concat(isThumb ? '-thumb' : '', '-controls .')
        .concat(className, '-slider-next')
    );
    var sliderInit = new Swiper(
      slider,
      __assign(
        {
          thumbs: {
            swiper: thumb,
          },
          pagination: {
            el: pagination,
            clickable: true,
            type: paginationType,
            renderBullet: renderBullets,
          },
          navigation: {
            nextEl: arrowNext,
            prevEl: arrowPrev,
          },
          slidesPerView: 1,
          spaceBetween: 30,
        },
        config
      )
    );
    return sliderInit;
  };
  var sliderQuizFormInit = function (sliders) {
    var containerArray = document.querySelectorAll('.quiz');
    if (containerArray.length === 0) {
      return;
    }
    containerArray.forEach(function (item, sliderIndex) {
      var slider = makeSlider({
        container: item,
        className: 'quiz',
        config: {
          effect: 'fade',
          allowTouchMove: false,
        },
      });
      if (!slider) {
        return;
      }
      sliders.push({ name: 'quiz-'.concat(sliderIndex), slider: slider });
    });
  };
  var sliderBrandsInit = function (sliders) {
    var containerArray = document.querySelectorAll('.brands');
    if (containerArray.length === 0) {
      return;
    }
    containerArray.forEach(function (item, sliderIndex) {
      var slider = makeSlider({
        container: item,
        className: 'brands',
        config: {
          allowTouchMove: true,
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 40,
          loop: true,
          breakpoints: {
            350: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            650: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 20,
            },
            899: {
              slidesPerView: 4,
              slidesPerGroup: 2,
              spaceBetween: 30,
            },
            1199: {
              slidesPerView: 6,
              slidesPerGroup: 3,
              spaceBetween: 50,
            },
          },
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
        },
      });
      if (slider) {
        sliders.push({ name: 'brands-'.concat(sliderIndex), slider: slider });
      }
    });
  };
  var sliderFeedbackInit = function (sliders) {
    var containerArray = document.querySelectorAll('.feedback');
    if (containerArray.length === 0) {
      return;
    }
    containerArray.forEach(function (item, sliderIndex) {
      var slider = makeSlider({
        container: item,
        className: 'feedback',
        config: {
          effect: 'fade',
          // allowTouchMove: false,
          spaceBetween: 10,
          loop: true,
        },
      });
      if (slider) {
        sliders.push({ name: 'feedback-'.concat(sliderIndex), slider: slider });
      }
    });
  };
  var sliderCalendarInit = function (sliders) {
    var containerArray = document.querySelectorAll('.quiz-calendar');
    if (containerArray.length === 0) {
      return;
    }
    containerArray.forEach(function (item, sliderIndex) {
      var slider = makeSlider({
        container: item,
        className: 'quiz-calendar',
        config: {
          allowTouchMove: true,
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 12,
          breakpoints: {
            350: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            450: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            899: {
              slidesPerView: 7,
              slidesPerGroup: 7,
            },
            1199: {
              slidesPerView: 7,
              slidesPerGroup: 7,
            },
          },
        },
      });
      if (slider) {
        sliders.push({ name: 'calendar-'.concat(sliderIndex), slider: slider });
      }
    });
  };
  var slidersInit = function () {
    var sliders = [];
    sliderQuizFormInit(sliders);
    sliderBrandsInit(sliders);
    sliderFeedbackInit(sliders);
    sliderCalendarInit(sliders);
    return sliders;
  };
  var sliders = slidersInit();
  //footerLinesHelper
  var footerListenerHandler = function (wrapperArray) {
    wrapperArray.forEach(function (wrapper) {
      var widthWrapper = wrapper.getBoundingClientRect().width;
      var widthChildren = 0;
      var itemArray = wrapper.querySelectorAll('.footer-main__item');
      if (itemArray.length === 0) {
        return;
      }
      itemArray.forEach(function (item) {
        var width = item.getBoundingClientRect().width;
        widthChildren += width;
      });
      var gap =
        Math.floor(
          ((widthWrapper - widthChildren) / (itemArray.length - 1)) * 100
        ) / 100;
      wrapper.style.setProperty('--footer-main-gap', ''.concat(gap, 'px'));
    });
  };
  var footerLinesHelper = function () {
    var wrapperArray = document.querySelectorAll('.footer-main');
    if (wrapperArray.length === 0) {
      return;
    }
    if (!vevet.viewport.isPhone) {
      footerListenerHandler(wrapperArray);
    }
    window.addEventListener(
      'resize',
      debounce({
        callback: function () {
          if (vevet.viewport.isPhone) {
            return;
          }
          footerListenerHandler(wrapperArray);
        },
      })
    );
  };
  footerLinesHelper();
  //globAnimation
  var globAnimationHandler = function () {
    var globArray = document.querySelectorAll('.glob-bg');
    if (globArray.length === 0) {
      return;
    }
    globArray.forEach(function (item) {
      useObserver({
        target: item,
        callbackIn: function () {
          item.classList.add('viewed');
        },
        callbackOut: function () {
          item.classList.remove('viewed');
        },
      });
    });
  };
  globAnimationHandler();
  var useParentHeight = function (element) {
    var currentHeight = 0;
    var save = function () {
      var parent = element;
      if (!parent) {
        return;
      }
      currentHeight = parent.clientHeight;
      parent.style.height = ''.concat(currentHeight, 'px');
    };
    var reset = function () {
      var parent = element;
      if (!parent) {
        return;
      }
      currentHeight = 0;
      parent.style.height = '';
    };
    var interpolate = function (targetHeight, progress) {
      var parent = element;
      if (!parent) {
        return;
      }
      var startHeight = currentHeight;
      var difference = targetHeight - startHeight;
      var height = startHeight + difference * progress;
      parent.style.height = ''.concat(height, 'px');
    };
    return { save: save, reset: reset, interpolate: interpolate };
  };
  var makeFadeTimeline = function (_a) {
    var showItemProp = _a.showItem,
      hideItemProp = _a.hideItem,
      parentHeight = _a.parentHeight,
      sectionProp = _a.section,
      activeHeight = _a.activeHeight,
      _b = _a.duration,
      duration = _b === void 0 ? 600 : _b;
    var showItem = showItemProp;
    var hideItem = hideItemProp;
    var section = sectionProp;
    var timeline = new Vevet.Timeline({
      duration: duration,
      easing: [0.25, 0.1, 0.25, 1],
    });
    timeline.addCallback('start', function () {
      parentHeight.save();
      hideItem.classList.add('unactive');
      showItem.classList.remove('unactive');
    });
    timeline.addCallback('progress', function (_a) {
      var progress = _a.progress;
      section.style.pointerEvents = 'none';
      parentHeight.interpolate(activeHeight, progress);
      showItem.style.opacity = ''.concat(progress);
      hideItem.style.opacity = ''.concat(1 - progress);
    });
    timeline.addCallback('end', function () {
      section.style.pointerEvents = '';
      timeline.destroy();
      parentHeight.reset();
    });
    timeline.play();
  };
  var initFadeSection = function (section, activeKey) {
    if (activeKey === void 0) {
      activeKey = '1';
    }
    var parent = section.querySelector('.fade-section-content');
    if (!parent) {
      return;
    }
    var state = {
      active: {
        key: activeKey,
        item: undefined,
        button: undefined,
      },
      prev: {
        key: activeKey,
        item: undefined,
        button: undefined,
      },
      parent: {
        item: parent,
        parentHeight: useParentHeight(parent),
        activeHeight: parent.clientHeight,
      },
    };
    var buttons = Array.from(section.querySelectorAll('.fade-section__button'));
    var items = Array.from(
      section.querySelectorAll('.fade-section-content__item')
    );
    if (items.length === 0) {
      return;
    }
    state.active.button = section.querySelector('.fade-section__button.active');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var data = button.dataset.item;
        state.prev.key = state.active.key;
        state.active.key = data || '1';
        state.prev.button = state.active.button;
        state.active.button = button;
        var showItem;
        var hideItem;
        if (state.prev.key === state.active.key) {
          return;
        }
        if (state.prev.button) {
          state.prev.button.classList.remove('active');
        }
        state.active.button.classList.add('active');
        items.forEach(function (item) {
          if (item.dataset.item === state.active.key) {
            showItem = item;
          }
          if (item.dataset.item === state.prev.key) {
            hideItem = item;
          }
        });
        if (!showItem || !hideItem) {
          return;
        }
        state.parent.activeHeight = showItem.clientHeight;
        state.parent.parentHeight.save();
        makeFadeTimeline({
          showItem: showItem,
          hideItem: hideItem,
          parentHeight: state.parent.parentHeight,
          section: section,
          activeHeight: state.parent.activeHeight,
        });
      });
    });
  };
  var fadeContentInit = function () {
    var sectionArr = document.querySelectorAll('.fade-section');
    if (sectionArr.length === 0) {
      return;
    }
    sectionArr.forEach(function (section) {
      initFadeSection(section);
    });
  };
  fadeContentInit();
  var createSlide = function (date, index) {
    var day = date.getDate();
    var monthLabel = 'Sep';
    switch (date.getMonth()) {
      case 0:
        monthLabel = 'Jan';
        break;
      case 1:
        monthLabel = 'Feb';
        break;
      case 2:
        monthLabel = 'Mar';
        break;
      case 3:
        monthLabel = 'Apr';
        break;
      case 4:
        monthLabel = 'May';
        break;
      case 5:
        monthLabel = 'Jun';
        break;
      case 6:
        monthLabel = 'Jul';
        break;
      case 7:
        monthLabel = 'Aug';
        break;
      case 8:
        monthLabel = 'Sep';
        break;
      case 9:
        monthLabel = 'Oct';
        break;
      case 10:
        monthLabel = 'Nov';
        break;
      case 11:
        monthLabel = 'Dec';
        break;
      default:
        monthLabel = 'Dec';
    }
    var slide =
      "\n    <div class='swiper-slide'>\n      <button \n        class='"
        .concat(
          index === 0 ? 'active' : '',
          " input-container__button quiz-calendar-button'\n        data-value='"
        )
        .concat(monthLabel, ' ')
        .concat(day, "'>\n        <span class='quiz-calendar-button__month'>")
        .concat(
          monthLabel,
          "</span>\n        <span class='quiz-calendar-button__day'>"
        )
        .concat(day, '</span>\n      </button>\n    </div>\n  ');
    return slide;
  };
  var calendarInitHandler = function (slider, dateArray) {
    var slides = [];
    slider.removeAllSlides();
    slider.update();
    dateArray.forEach(function (date, index) {
      var slide = createSlide(date, index);
      slides.push(slide);
    });
    slider.appendSlide(slides);
    slider.update();
  };
  var calendarInit = function (sliders, calendarDaysCount) {
    var dateArray = [];
    var now = new Date();
    dateArray.push(now);
    for (var i = 1; i < calendarDaysCount; i += 1) {
      var future = new Date(now);
      future.setDate(now.getDate() + i);
      dateArray.push(future);
    }
    sliders.forEach(function (_a) {
      var name = _a.name,
        slider = _a.slider;
      if (name.includes('calendar') && slider) {
        calendarInitHandler(slider, dateArray);
      }
    });
  };
  var inputRequieredHandler = function (slide) {
    var requiredArray = slide.querySelectorAll('input.required');
    var buttonArray = slide.querySelectorAll('.quiz-next, .quiz-submit');
    if (requiredArray.length === 0 || buttonArray.length === 0) {
      return;
    }
    requiredArray.forEach(function (input) {
      var typingTimer;
      var interval = 200;
      var doneTyping = function () {
        // console.log('done');
        var isAnyInputEmpty = !!Array.from(requiredArray).find(function (item) {
          return item.value === '';
        });
        // const isTelInputEmpty = !!Array.from(requiredArray).find(
        //   (item) => item.type === 'tel' && item.value.length < 19
        // );
        // console.log(requiredArray, buttonArray);
        buttonArray.forEach(function (button) {
          if (isAnyInputEmpty) {
            button.classList.add('locked');
          } else {
            button.classList.remove('locked');
          }
        });
      };
      input.addEventListener('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, interval);
      });
      input.addEventListener('keydown', function () {
        clearTimeout(typingTimer);
      });
    });
  };
  var initButtonsNextPrev = function (slider) {
    var buttonNextArray = slider.el.querySelectorAll('.quiz-next');
    var buttonPrevArray = slider.el.querySelectorAll('.quiz-prev');
    if (buttonNextArray.length !== 0) {
      buttonNextArray.forEach(function (buttonNext) {
        buttonNext.addEventListener('click', function () {
          slider.slideNext();
        });
      });
    }
    if (buttonPrevArray.length !== 0) {
      buttonPrevArray.forEach(function (buttonPrev) {
        buttonPrev.addEventListener('click', function () {
          slider.slidePrev();
        });
      });
    }
  };
  var buttonInputHandler = function (container) {
    var buttonContainerArray = container.querySelectorAll('.input-container');
    if (buttonContainerArray.length === 0) {
      return;
    }
    buttonContainerArray.forEach(function (buttonContainer) {
      var buttonArray = buttonContainer.querySelectorAll(
        '.input-container__button'
      );
      if (buttonArray.length === 0) {
        return;
      }
      buttonArray.forEach(function (button) {
        button.addEventListener('click', function () {
          buttonArray.forEach(function (otherButton) {
            otherButton.classList.remove('active');
          });
          button.classList.add('active');
        });
      });
    });
  };
  var buttonContainerHandler = function (container, inputFormArray) {
    var buttonContainerArray = container.querySelectorAll('.input-container');
    if (buttonContainerArray.length === 0) {
      return;
    }
    buttonContainerArray.forEach(function (buttonContainer) {
      var buttonActive = buttonContainer.querySelector(
        '.input-container__button.active'
      );
      if (!buttonActive || !buttonActive.dataset.value) {
        return;
      }
      inputFormArray.forEach(function (inputProp) {
        var input = inputProp;
        if (input.name !== buttonContainer.dataset.input) {
          return;
        }
        input.value = buttonActive.dataset.value
          ? buttonActive.dataset.value
          : '';
      });
    });
  };
  var onSubmitHandler = function (form, slider) {
    var inputFormArray = form.querySelectorAll('input');
    var inputStepArray = slider.el.querySelectorAll('input, textarea');
    var submitButton = slider.el.querySelector('.quiz-submit');
    if (
      inputFormArray.length === 0 ||
      inputStepArray.length === 0 ||
      !submitButton
    ) {
      return;
    }
    // console.log(submitButton);
    // console.log(inputFormArray);
    // console.log(inputStepArray);
    submitButton.addEventListener('click', function () {
      inputStepArray.forEach(function (input) {
        inputFormArray.forEach(function (formInputProp) {
          var formInput = formInputProp;
          if (input.name === formInput.name) {
            formInput.value = input.value;
            // console.log(formInput, formInput.name);
          }
        });
      });
      buttonContainerHandler(slider.el, inputFormArray);
      setTimeout(function () {
        slider.slideTo(0);
        inputStepArray.forEach(function (inputProp) {
          var input = inputProp;
          if (input.type !== 'radio') {
            input.value = '';
          }
        });
        slider.slides.forEach(function (slide) {
          var isHasRequired =
            slide.querySelectorAll('input.required').length !== 0;
          var buttonArray = slide.querySelectorAll('.quiz-next, .quiz-submit');
          if (!isHasRequired || buttonArray.length === 0) {
            return;
          }
          buttonArray.forEach(function (button) {
            button.classList.add('locked');
          });
        });
      }, 400);
    });
  };
  var initFormControl = function (form, slider, sliders, calendarDaysCount) {
    initButtonsNextPrev(slider);
    slider.slides.forEach(function (slide) {
      inputRequieredHandler(slide);
    });
    calendarInit(sliders, calendarDaysCount);
    buttonInputHandler(slider.el);
    onSubmitHandler(form, slider);
  };
  var initStepForm = function (sliders, calendarDaysCount) {
    var formArray = document.querySelectorAll('.quiz__form.form');
    if (formArray.length === 0 || sliders.length === 0) {
      return;
    }
    formArray.forEach(function (form, index) {
      sliders.forEach(function (_a) {
        var name = _a.name,
          slider = _a.slider;
        if (name === 'quiz-'.concat(index) && slider) {
          initFormControl(form, slider, sliders, calendarDaysCount);
        }
      });
    });
  };
  initStepForm(sliders, 20);
  var useOutsideClick = function (element, callback) {
    var listener = function (event) {
      if (
        !element.contains(
          event === null || event === void 0 ? void 0 : event.target
        ) &&
        event.which === 1
      ) {
        callback();
      }
    };
    document.addEventListener('mousedown', listener);
  };
  var useOnEscape = function (callback) {
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        callback();
      }
    });
  };
  var renderModalAnimation = function (_a) {
    var progress = _a.progress,
      easing = _a.easing,
      parent = _a.parent,
      overlay = _a.overlay,
      scroll = _a.scroll,
      additional = _a.additional;
    if (parent) {
      var element = parent;
      element.style.display = ''.concat(progress > 0 ? 'flex' : 'none');
      if (parent.classList.contains('popup-header-modal')) {
        element.style.opacity = ''.concat(progress);
      } else {
        element.style.opacity = ''.concat(progress > 0 ? 1 : 0);
      }
    }
    if (overlay) {
      var element = overlay;
      element.style.opacity = ''.concat(easing);
    }
    if (scroll) {
      var element = scroll;
      if (!parent.classList.contains('popup-search')) {
        element.style.opacity = ''.concat(easing);
      }
      if (parent.classList.contains('popup-menu')) {
        element.style.transform = 'translateX('.concat(
          (1 - easing) * 100,
          '%)'
        );
      } else if (parent.classList.contains('popup-header-modal')) {
        element.style.transform = 'translateY('.concat(
          (easing - 1) * 2,
          'rem)'
        );
      } else {
        element.style.transform = 'translateY('.concat(
          (1 - easing) * 2,
          'rem)'
        );
      }
    }
    if (additional) {
      var element = additional;
      element.style.opacity = ''.concat(easing);
      if (parent.classList.contains('popup-menu')) {
        element.style.transform = 'translateX('.concat(
          (1 - easing) * 100,
          '%)'
        );
      } else {
        element.style.transform = 'translateY('.concat(
          (1 - easing) * 2,
          'rem)'
        );
      }
    }
  };
  var makeTimeline = function (parent, scroll, overlay, additional, video) {
    if (!parent || !scroll || !overlay) {
      return undefined;
    }
    var timeline = new Vevet.Timeline({
      duration: 600,
      easing: [0.25, 0.1, 0.25, 1],
    });
    timeline.addCallback('start', function () {
      var _a, _b;
      if (!timeline.isReversed) {
        if (!parent.classList.contains('popup-search')) {
          (_a = document.querySelector('html')) === null || _a === void 0
            ? void 0
            : _a.classList.add('lock');
          (_b = document.querySelector('body')) === null || _b === void 0
            ? void 0
            : _b.classList.add('lock');
        }
        parent.classList.add('_opened');
        if (video) {
          video.play();
        }
      }
    });
    timeline.addCallback('progress', function (_a) {
      var progress = _a.progress,
        easing = _a.easing;
      renderModalAnimation({
        parent: parent,
        scroll: scroll,
        overlay: overlay,
        progress: progress,
        easing: easing,
        additional: additional,
      });
    });
    timeline.addCallback('end', function () {
      var _a, _b;
      if (timeline.isReversed) {
        (_a = document.querySelector('html')) === null || _a === void 0
          ? void 0
          : _a.classList.remove('lock');
        (_b = document.querySelector('body')) === null || _b === void 0
          ? void 0
          : _b.classList.remove('lock');
        parent.classList.remove('_opened');
        if (video) {
          video.pause();
        }
      }
    });
    return timeline;
  };
  var Popup = /** @class */ (function () {
    function Popup(domElement, callback) {
      var _this = this;
      this._isThanks = false;
      this._isError = false;
      this._closeButtons = [];
      this._openButtons = [];
      this._parent = domElement;
      this._callback = callback;
      this._name = domElement.dataset.popupname;
      this._scroll = this._parent.querySelector('.popup__scroll');
      this._overlay = this._parent.querySelector('.popup__overlay');
      this._wrapper = this._parent.querySelector('.popup__wrapper');
      this._additional = this._parent.querySelector('.popup__additional');
      this._video = this._parent.querySelector('.video');
      if (!this._name || !this._scroll || !this._overlay || !this._wrapper) {
        return;
      }
      this._isThanks = this._name === '_popup-thanks';
      this._isError = this._name === '_popup-error';
      this._timeline = makeTimeline(
        this._parent,
        this._scroll,
        this._overlay,
        this._additional,
        this._video
      );
      this._openButtons = Array.from(
        document.querySelectorAll('[data-popup="'.concat(this._name, '"]'))
      );
      this._closeButtons = Array.from(
        this._parent.querySelectorAll('.popup__close, .popup__button')
      );
      if (this._closeButtons.length !== 0) {
        this._closeButtons.forEach(function (button) {
          if (!button) {
            return;
          }
          button.addEventListener('click', function () {
            var _a;
            (_a = _this._timeline) === null || _a === void 0
              ? void 0
              : _a.reverse();
          });
        });
      }
      useOutsideClick(this._wrapper, function () {
        var _a, _b, _c, _d;
        if (_this._parent.classList.contains('_opened')) {
          (_a = _this._timeline) === null || _a === void 0
            ? void 0
            : _a.reverse();
          (_b = document.querySelector('html')) === null || _b === void 0
            ? void 0
            : _b.classList.remove('lock');
          (_c = document.querySelector('body')) === null || _c === void 0
            ? void 0
            : _c.classList.remove('lock');
          (_d = _this._video) === null || _d === void 0 ? void 0 : _d.pause();
        }
      });
      useOnEscape(function () {
        var _a, _b, _c, _d;
        if (_this._parent.classList.contains('_opened')) {
          (_a = _this._timeline) === null || _a === void 0
            ? void 0
            : _a.reverse();
          (_b = document.querySelector('html')) === null || _b === void 0
            ? void 0
            : _b.classList.remove('lock');
          (_c = document.querySelector('body')) === null || _c === void 0
            ? void 0
            : _c.classList.remove('lock');
          (_d = _this._video) === null || _d === void 0 ? void 0 : _d.pause();
        }
      });
    }
    Object.defineProperty(Popup.prototype, 'parent', {
      get: function () {
        return this._parent;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'name', {
      get: function () {
        return this._name;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'isThanks', {
      get: function () {
        return this._isThanks;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'isError', {
      get: function () {
        return this._isError;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'scroll', {
      get: function () {
        return this._scroll;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'overlay', {
      get: function () {
        return this._overlay;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'additional', {
      get: function () {
        return this._additional;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'wrapper', {
      get: function () {
        return this._wrapper;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'video', {
      get: function () {
        return this._video;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'timeline', {
      get: function () {
        return this._timeline;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'closeButtons', {
      get: function () {
        return this._closeButtons;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Popup.prototype, 'openButtons', {
      get: function () {
        return this._openButtons;
      },
      enumerable: false,
      configurable: true,
    });
    Popup.prototype.initOpen = function (popupArr) {
      var _this = this;
      if (popupArr.length === 0 || !this._openButtons) {
        return;
      }
      this._openButtons.forEach(function (openBtn) {
        openBtn.addEventListener('click', function (evt) {
          var _a;
          evt.preventDefault();
          popupArr.forEach(function (popup) {
            var _a;
            if (
              popup.parent.classList.contains('_opened') &&
              popup.name !== _this._name
            ) {
              (_a = popup.timeline) === null || _a === void 0
                ? void 0
                : _a.reverse();
            }
          });
          (_a = _this._timeline) === null || _a === void 0 ? void 0 : _a.play();
        });
      });
    };
    Popup.prototype.onWindowResize = function (callback) {
      this._callback = callback;
      window.addEventListener(
        'resize',
        debounce({
          callback: callback,
        })
      );
    };
    return Popup;
  })();
  var initPopups = function () {
    var popupDomArr = document.querySelectorAll('.popup');
    if (popupDomArr.length === 0) {
      return [];
    }
    var popupArr = [];
    popupDomArr.forEach(function (element) {
      var popup = new Popup(element);
      popupArr.push(popup);
    });
    popupArr.forEach(function (popup) {
      popup.initOpen(popupArr);
    });
    return popupArr;
  };
  var popups = initPopups();
  //anchorsInit
  var closePopupsHandler = function (popups) {
    if (popups.length === 0) {
      return;
    }
    popups.forEach(function (_a) {
      var timeline = _a.timeline,
        openButtons = _a.openButtons;
      if (timeline && timeline.progress > 0) {
        timeline.reverse();
        openButtons.forEach(function (openBtn) {
          openBtn.classList.remove('_opened');
        });
      }
    });
  };
  var scrollHandler = function (link, headerHeight, popups) {
    var sectionName = link.dataset.goto;
    if (!sectionName) {
      return;
    }
    var section = document.querySelector(''.concat(sectionName));
    if (!section) {
      return;
    }
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      closePopupsHandler(popups);
      window.scrollTo({
        top: section.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    });
  };
  var anchorsInit = function (headerHeight, popups) {
    var links = Array.from(document.querySelectorAll('.anchor'));
    if (links.length === 0) {
      return;
    }
    links.forEach(function (link) {
      scrollHandler(link, headerHeight, popups);
    });
  };
  anchorsInit(0, popups);
  var formArr = document.querySelectorAll('form');
  var hasError = false;
  if (formArr.length !== 0) {
    // formArr.forEach((form) => {
    //   form.addEventListener('submit', (evt) => {
    //     evt.preventDefault();
    //     const inputs = Array.from(
    //       form.querySelectorAll('input, textarea') as NodeListOf<
    //         HTMLInputElement | HTMLTextAreaElement
    //       >
    //     );
    //     popups.forEach(({ timeline, isThanks, isError }) => {
    //       if (isThanks && !hasError) {
    //         timeline?.play();
    //         if (inputs.length !== 0) {
    //           inputs.forEach((inputProp) => {
    //             const input = inputProp;
    //             console.log(input, input.value);
    //             // if (input.type === 'tel') {
    //             //   return;
    //             // }
    //             input.value = '';
    //           });
    //         }
    //         // if (inputMaskArray) {
    //         //   inputMaskArray.forEach((inputMaskProp) => {
    //         //     const inputMask = inputMaskProp;
    //         //     inputMask.value = '';
    //         //     inputMask.updateValue();
    //         //   });
    //         // }
    //       } else if (isError && hasError) {
    //         timeline?.play();
    //       } else {
    //         timeline?.reverse();
    //         setTimeout(() => {
    //           document.querySelector('html')?.classList.add('lock');
    //           document.querySelector('body')?.classList.add('lock');
    //         }, 300);
    //       }
    //     });
    //   });
    // });
    document.addEventListener(
      'wpcf7mailsent',
      function () {
        popups.forEach(function (_a) {
          var timeline = _a.timeline,
            isThanks = _a.isThanks,
            isError = _a.isError;
          if (isThanks && !hasError) {
            timeline === null || timeline === void 0 ? void 0 : timeline.play();
            formArr.forEach(function (form) {
              var inputs = Array.from(form.querySelectorAll('input, textarea'));
              if (inputs.length !== 0) {
                inputs.forEach(function (inputProp) {
                  var input = inputProp;
                  // if (input.type === 'tel') {
                  //   return;
                  // }
                  input.value = '';
                });
              }
              // if (inputMaskArray) {
              //   inputMaskArray.forEach((inputMaskProp) => {
              //     const inputMask = inputMaskProp;
              //     inputMask.value = '';
              //     inputMask.updateValue();
              //   });
              // }
            });
          } else if (isError && hasError) {
            timeline === null || timeline === void 0 ? void 0 : timeline.play();
          } else {
            timeline === null || timeline === void 0
              ? void 0
              : timeline.reverse();
            setTimeout(function () {
              var _a, _b;
              (_a = document.querySelector('html')) === null || _a === void 0
                ? void 0
                : _a.classList.add('lock');
              (_b = document.querySelector('body')) === null || _b === void 0
                ? void 0
                : _b.classList.add('lock');
            }, 300);
          }
        });
      },
      false
    );
  }
});
