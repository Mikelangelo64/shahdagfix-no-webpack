const vevet = new Vevet.Application({
  tablet: 1199,
  phone: 899,
  prefix: 'v-',
  viewportResizeTimeout: 100,
  easing: [0.25, 0.1, 0.25, 1],
});

vevet.pageLoad.onLoaded(() => {
  //scrollBarInit
  const scrollBarInit = () => {
    let scrollBar;
    if (!vevet.isMobile) {
      scrollBar = new Vevet.ScrollBar({ container: window });
    }

    return scrollBar;
  };
  scrollBarInit();

  //config
  type TCallback = () => void;

  interface IDebounce {
    callback: TCallback;
    wait?: number;
    isImmediate?: boolean;
  }

  const debounce = ({
    callback,
    wait = 250,
    isImmediate = false,
  }: IDebounce) => {
    let timeout: NodeJS.Timeout | undefined;

    return () => {
      const later = () => {
        timeout = undefined;
        callback();
      };

      const isCallNow = isImmediate && !timeout;
      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (isCallNow) {
        callback();
      }
    };
  };

  type TObserverCallback = (element: Element) => void;

  interface IUseObserverProps {
    target: HTMLElement | null;
    callbackIn?: TObserverCallback;
    callbackOut?: TObserverCallback;
    isCallOnce?: boolean;
  }

  const useObserver: (
    props: IUseObserverProps
  ) => IntersectionObserver | undefined = ({
    target,
    callbackIn,
    callbackOut,
    isCallOnce = false,
  }) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          const element = entry.target;

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

  //sliders
  interface IMakeSlider {
    container: HTMLElement | null;
    className: string;
    isThumb?: boolean;
    thumb?: Swiper | undefined;
    config?: SwiperOptions | undefined;
    paginationType?: PaginationOptions['type'];
    renderBullets?: (index: number, className: string) => string;
  }

  interface IInitializedSlider {
    name: string;
    slider: Swiper | undefined;
  }

  const makeSlider = ({
    container,
    className,
    isThumb = false,
    thumb = undefined,
    config,
    paginationType = 'bullets',
    renderBullets,
  }: IMakeSlider) => {
    if (!container || !className) {
      return undefined;
    }

    const slider =
      (container.querySelector(
        `.${className}-slider${isThumb ? '-thumb' : ''}.swiper`
      ) as HTMLElement) || null;

    if (!slider) {
      return undefined;
    }

    const pagination: HTMLElement | null = container.querySelector(
      `.${className}-slider-pagination`
    );

    const arrowPrev = container.querySelector(
      `.${className}-slider${
        isThumb ? '-thumb' : ''
      }-controls .${className}-slider-prev`
    ) as HTMLElement | null;

    const arrowNext = container.querySelector(
      `.${className}-slider${
        isThumb ? '-thumb' : ''
      }-controls .${className}-slider-next`
    ) as HTMLElement | null;

    const sliderInit = new Swiper(slider, {
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

      ...config,
    });

    return sliderInit;
  };

  const sliderQuizFormInit = (sliders: Array<IInitializedSlider>) => {
    const containerArray = document.querySelectorAll(
      '.quiz'
    ) as NodeListOf<HTMLElement>;

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((item, sliderIndex) => {
      const slider = makeSlider({
        container: item,
        className: 'quiz',
        config: {
          effect: 'fade',
          allowTouchMove: false,
          // autoplay: {
          //   delay: 6000,
          //   disableOnInteraction: false
          // }
        },
      });

      if (!slider) {
        return;
      }

      sliders.push({ name: `quiz-${sliderIndex}`, slider });
    });
  };

  const sliderBrandsInit = (sliders: Array<IInitializedSlider>) => {
    const containerArray = document.querySelectorAll(
      '.brands'
    ) as NodeListOf<HTMLElement>;

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((item, sliderIndex) => {
      const slider = makeSlider({
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
        sliders.push({ name: `brands-${sliderIndex}`, slider });
      }
    });
  };

  const sliderFeedbackInit = (sliders: Array<IInitializedSlider>) => {
    const containerArray = document.querySelectorAll(
      '.feedback'
    ) as NodeListOf<HTMLElement>;

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((item, sliderIndex) => {
      const slider = makeSlider({
        container: item,
        className: 'feedback',
        config: {
          effect: 'fade',
          // allowTouchMove: false,
          spaceBetween: 10,
          loop: true,

          // autoplay: {
          //   delay: 2000,
          //   disableOnInteraction: false
          // }
        },
      });

      if (slider) {
        sliders.push({ name: `feedback-${sliderIndex}`, slider });
      }
    });
  };

  const sliderCalendarInit = (sliders: Array<IInitializedSlider>) => {
    const containerArray = document.querySelectorAll(
      '.quiz-calendar'
    ) as NodeListOf<HTMLElement>;

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((item, sliderIndex) => {
      const slider = makeSlider({
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
        sliders.push({ name: `calendar-${sliderIndex}`, slider });
      }
    });
  };

  const slidersInit = () => {
    const sliders: Array<IInitializedSlider> = [];

    sliderQuizFormInit(sliders);
    sliderBrandsInit(sliders);
    sliderFeedbackInit(sliders);
    sliderCalendarInit(sliders);

    return sliders;
  };

  const sliders = slidersInit();

  //footerLinesHelper
  const footerListenerHandler = (wrapperArray: NodeListOf<HTMLElement>) => {
    wrapperArray.forEach((wrapper) => {
      const { width: widthWrapper } = wrapper.getBoundingClientRect();
      let widthChildren = 0;

      const itemArray =
        wrapper.querySelectorAll<HTMLElement>('.footer-main__item');

      if (itemArray.length === 0) {
        return;
      }

      itemArray.forEach((item) => {
        const { width } = item.getBoundingClientRect();

        widthChildren += width;
      });

      const gap =
        Math.floor(
          ((widthWrapper - widthChildren) / (itemArray.length - 1)) * 100
        ) / 100;

      wrapper.style.setProperty('--footer-main-gap', `${gap}px`);
    });
  };

  const footerLinesHelper = () => {
    const wrapperArray = document.querySelectorAll<HTMLElement>('.footer-main');
    if (wrapperArray.length === 0) {
      return;
    }

    if (!vevet.viewport.isPhone) {
      footerListenerHandler(wrapperArray);
    }

    window.addEventListener(
      'resize',
      debounce({
        callback: () => {
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
  const globAnimationHandler = () => {
    const globArray = document.querySelectorAll<HTMLElement>('.glob-bg');
    if (globArray.length === 0) {
      return;
    }

    globArray.forEach((item) => {
      useObserver({
        target: item,
        callbackIn: () => {
          item.classList.add('viewed');
        },
        callbackOut: () => {
          item.classList.remove('viewed');
        },
      });
    });
  };

  globAnimationHandler();

  //fadeContentInit
  interface IParentHeight {
    save: () => void;
    reset: () => void;
    interpolate: (targetHeight: number, progress: number) => void;
  }

  interface IMakeFadeTimeline {
    showItem: HTMLElement;
    hideItem: HTMLElement;
    parentHeight: IParentHeight;
    section: HTMLElement;
    activeHeight: number;
    duration?: number;
  }

  interface IStateItem {
    key: string;
    item: HTMLElement | undefined;
    button: HTMLElement | undefined;
  }

  interface IState {
    active: IStateItem;
    prev: IStateItem;
    parent: {
      item: HTMLElement;
      parentHeight: IParentHeight;
      activeHeight: number;
    };
  }

  const useParentHeight = (element: HTMLElement) => {
    let currentHeight = 0;

    const save = () => {
      const parent = element;

      if (!parent) {
        return;
      }

      currentHeight = parent.clientHeight;
      parent.style.height = `${currentHeight}px`;
    };

    const reset = () => {
      const parent = element;

      if (!parent) {
        return;
      }

      currentHeight = 0;
      parent.style.height = '';
    };

    const interpolate = (targetHeight: number, progress: number) => {
      const parent = element;

      if (!parent) {
        return;
      }

      const startHeight = currentHeight;
      const difference = targetHeight - startHeight;
      const height = startHeight + difference * progress;

      parent.style.height = `${height}px`;
    };

    return { save, reset, interpolate };
  };

  const makeFadeTimeline = ({
    showItem: showItemProp,
    hideItem: hideItemProp,
    parentHeight,
    section: sectionProp,
    activeHeight,
    duration = 600,
  }: IMakeFadeTimeline) => {
    const showItem = showItemProp;
    const hideItem = hideItemProp;
    const section = sectionProp;

    const timeline = new Vevet.Timeline({
      duration,
      easing: [0.25, 0.1, 0.25, 1],
    });

    timeline.addCallback('start', () => {
      parentHeight.save();
      hideItem.classList.add('unactive');
      showItem.classList.remove('unactive');
    });

    timeline.addCallback('progress', ({ progress }) => {
      section.style.pointerEvents = 'none';
      parentHeight.interpolate(activeHeight, progress);

      showItem.style.opacity = `${progress}`;
      hideItem.style.opacity = `${1 - progress}`;
    });

    timeline.addCallback('end', () => {
      section.style.pointerEvents = '';

      timeline.destroy();
      parentHeight.reset();
    });

    timeline.play();
  };

  const initFadeSection = (section: HTMLElement, activeKey: string = '1') => {
    const parent = section.querySelector(
      '.fade-section-content'
    ) as HTMLElement;
    if (!parent) {
      return;
    }

    const state: IState = {
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

    const buttons = Array.from(
      section.querySelectorAll('.fade-section__button')
    ) as HTMLElement[];

    const items = Array.from(
      section.querySelectorAll('.fade-section-content__item')
    ) as HTMLElement[];

    if (items.length === 0) {
      return;
    }

    state.active.button = section.querySelector(
      '.fade-section__button.active'
    ) as HTMLElement;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const data = button.dataset.item;
        state.prev.key = state.active.key;
        state.active.key = data || '1';

        state.prev.button = state.active.button;
        state.active.button = button;

        let showItem: HTMLElement | undefined;
        let hideItem: HTMLElement | undefined;

        if (state.prev.key === state.active.key) {
          return;
        }

        if (state.prev.button) {
          state.prev.button.classList.remove('active');
        }
        state.active.button.classList.add('active');

        items.forEach((item) => {
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
          showItem,
          hideItem,
          parentHeight: state.parent.parentHeight,
          section,
          activeHeight: state.parent.activeHeight,
        });
      });
    });
  };

  const fadeContentInit = () => {
    const sectionArr = document.querySelectorAll('.fade-section');

    if (sectionArr.length === 0) {
      return;
    }

    sectionArr.forEach((section) => {
      initFadeSection(section as HTMLElement);
    });
  };

  fadeContentInit();

  //initStepForm
  //calendar
  type TMonthLabel =
    | 'Sep'
    | 'Oct'
    | 'Nov'
    | 'Dec'
    | 'Jan'
    | 'Feb'
    | 'Mar'
    | 'Apr'
    | 'May'
    | 'Jun'
    | 'Jul'
    | 'Aug';

  const createSlide = (date: Date, index: number) => {
    const day = date.getDate();
    let monthLabel: TMonthLabel = 'Sep';

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

    const slide = `
    <div class='swiper-slide'>
      <button 
        class='${
          index === 0 ? 'active' : ''
        } input-container__button quiz-calendar-button'
        data-value='${monthLabel} ${day}'>
        <span class='quiz-calendar-button__month'>${monthLabel}</span>
        <span class='quiz-calendar-button__day'>${day}</span>
      </button>
    </div>
  `;

    return slide;
  };

  const calendarInitHandler = (slider: Swiper, dateArray: Date[]) => {
    const slides: string[] = [];

    slider.removeAllSlides();
    slider.update();

    dateArray.forEach((date, index) => {
      const slide = createSlide(date, index);
      slides.push(slide);
    });

    slider.appendSlide(slides);
    slider.update();
  };

  const calendarInit = (
    sliders: IInitializedSlider[],
    calendarDaysCount: number
  ) => {
    const dateArray: Date[] = [];

    const now = new Date();
    dateArray.push(now);

    for (let i = 1; i < calendarDaysCount; i += 1) {
      const future = new Date(now);
      future.setDate(now.getDate() + i);
      dateArray.push(future);
    }

    sliders.forEach(({ name, slider }) => {
      if (name.includes('calendar') && slider) {
        calendarInitHandler(slider, dateArray);
      }
    });
  };

  const inputRequieredHandler = (slide: HTMLElement) => {
    const requiredArray =
      slide.querySelectorAll<HTMLInputElement>('input.required');

    const buttonArray = slide.querySelectorAll<HTMLElement>(
      '.quiz-next, .quiz-submit'
    );

    if (requiredArray.length === 0 || buttonArray.length === 0) {
      return;
    }

    requiredArray.forEach((input) => {
      let typingTimer: NodeJS.Timeout;
      let interval = 200;

      const doneTyping = () => {
        // console.log('done');

        const isAnyInputEmpty = !!Array.from(requiredArray).find(
          (item) => item.value === ''
        );

        // const isTelInputEmpty = !!Array.from(requiredArray).find(
        //   (item) => item.type === 'tel' && item.value.length < 19
        // );

        // console.log(requiredArray, buttonArray);

        buttonArray.forEach((button) => {
          if (isAnyInputEmpty) {
            button.classList.add('locked');
          } else {
            button.classList.remove('locked');
          }
        });
      };

      input.addEventListener('keyup', () => {
        clearTimeout(typingTimer);

        typingTimer = setTimeout(doneTyping, interval);
      });

      input.addEventListener('keydown', () => {
        clearTimeout(typingTimer);
      });
    });
  };

  const initButtonsNextPrev = (slider: Swiper) => {
    const buttonNextArray =
      slider.el.querySelectorAll<HTMLElement>('.quiz-next');

    const buttonPrevArray =
      slider.el.querySelectorAll<HTMLElement>('.quiz-prev');

    if (buttonNextArray.length !== 0) {
      buttonNextArray.forEach((buttonNext) => {
        buttonNext.addEventListener('click', () => {
          slider.slideNext();
        });
      });
    }

    if (buttonPrevArray.length !== 0) {
      buttonPrevArray.forEach((buttonPrev) => {
        buttonPrev.addEventListener('click', () => {
          slider.slidePrev();
        });
      });
    }
  };

  const buttonInputHandler = (container: HTMLElement) => {
    const buttonContainerArray =
      container.querySelectorAll<HTMLElement>('.input-container');

    if (buttonContainerArray.length === 0) {
      return;
    }

    buttonContainerArray.forEach((buttonContainer) => {
      const buttonArray = buttonContainer.querySelectorAll<HTMLElement>(
        '.input-container__button'
      );

      if (buttonArray.length === 0) {
        return;
      }

      buttonArray.forEach((button) => {
        button.addEventListener('click', () => {
          buttonArray.forEach((otherButton) => {
            otherButton.classList.remove('active');
          });

          button.classList.add('active');
        });
      });
    });
  };

  const buttonContainerHandler = (
    container: HTMLElement,
    inputFormArray: NodeListOf<HTMLInputElement>
  ) => {
    const buttonContainerArray =
      container.querySelectorAll<HTMLElement>('.input-container');

    if (buttonContainerArray.length === 0) {
      return;
    }

    buttonContainerArray.forEach((buttonContainer) => {
      const buttonActive = buttonContainer.querySelector<HTMLElement>(
        '.input-container__button.active'
      );

      if (!buttonActive || !buttonActive.dataset.value) {
        return;
      }

      inputFormArray.forEach((inputProp) => {
        const input = inputProp;

        if (input.name !== buttonContainer.dataset.input) {
          return;
        }

        input.value = buttonActive.dataset.value
          ? buttonActive.dataset.value
          : '';
      });
    });
  };

  const onSubmitHandler = (form: HTMLElement, slider: Swiper) => {
    const inputFormArray = form.querySelectorAll('input');
    const inputStepArray = slider.el.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >('input, textarea');

    const submitButton = slider.el.querySelector<HTMLElement>('.quiz-submit');

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

    submitButton.addEventListener('click', () => {
      inputStepArray.forEach((input) => {
        inputFormArray.forEach((formInputProp) => {
          const formInput = formInputProp;

          if (input.name === formInput.name) {
            formInput.value = input.value;

            // console.log(formInput, formInput.name);
          }
        });
      });

      buttonContainerHandler(slider.el, inputFormArray);

      setTimeout(() => {
        slider.slideTo(0);

        inputStepArray.forEach((inputProp) => {
          const input = inputProp;

          if (input.type !== 'radio') {
            input.value = '';
          }
        });

        slider.slides.forEach((slide) => {
          const isHasRequired =
            slide.querySelectorAll<HTMLElement>('input.required').length !== 0;

          const buttonArray = slide.querySelectorAll<HTMLElement>(
            '.quiz-next, .quiz-submit'
          );

          if (!isHasRequired || buttonArray.length === 0) {
            return;
          }

          buttonArray.forEach((button) => {
            button.classList.add('locked');
          });
        });
      }, 400);
    });
  };

  const buttonLockHandler = (slide: HTMLElement) => {
    const inputRequiredArray =
      slide.querySelectorAll<HTMLInputElement>('input.required');

    if (inputRequiredArray.length === 0) {
      return;
    }

    const buttonArray = slide.querySelectorAll<HTMLElement>(
      '.quiz-next, .quiz-submit'
    );

    let isHasValue = false;

    inputRequiredArray.forEach((input) => {
      isHasValue = !input.value;
    });

    if (!isHasValue || buttonArray.length === 0) {
      return;
    }

    buttonArray.forEach((button) => {
      button.classList.add('locked');
    });
  };

  const initFormControl = (
    form: HTMLElement,
    slider: Swiper,
    sliders: IInitializedSlider[],
    calendarDaysCount: number
  ) => {
    initButtonsNextPrev(slider);

    slider.slides.forEach((slide) => {
      buttonLockHandler(slide);
      inputRequieredHandler(slide);
    });

    calendarInit(sliders, calendarDaysCount);

    buttonInputHandler(slider.el);

    onSubmitHandler(form, slider);
  };

  const initStepForm = (
    sliders: IInitializedSlider[],
    calendarDaysCount: number
  ) => {
    const formArray =
      document.querySelectorAll<HTMLFormElement>('.quiz__form.form');

    if (formArray.length === 0 || sliders.length === 0) {
      return;
    }

    formArray.forEach((form, index) => {
      sliders.forEach(({ name, slider }) => {
        if (name === `quiz-${index}` && slider) {
          initFormControl(form, slider, sliders, calendarDaysCount);
        }
      });
    });
  };

  initStepForm(sliders, 20);

  //popups
  interface IRenderModalAnimationProps {
    progress: number;
    easing: number;
    parent: HTMLElement;
    scroll: HTMLElement;
    overlay: HTMLElement;
    additional: HTMLElement | null;
  }

  type TPopupCallback = () => void;

  type TClickOutsideEvent = MouseEvent | TouchEvent;

  const useOutsideClick = (element: HTMLElement, callback: () => void) => {
    const listener = (event: TClickOutsideEvent) => {
      if (!element.contains(event?.target as Node) && event.which === 1) {
        callback();
      }
    };

    document.addEventListener('mousedown', listener);
  };

  const useOnEscape = (callback: () => void) => {
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        callback();
      }
    });
  };

  const renderModalAnimation = ({
    progress,
    easing,
    parent,
    overlay,
    scroll,
    additional,
  }: IRenderModalAnimationProps) => {
    if (parent) {
      const element = parent;
      element.style.display = `${progress > 0 ? 'flex' : 'none'}`;

      if (parent.classList.contains('popup-header-modal')) {
        element.style.opacity = `${progress}`;
      } else {
        element.style.opacity = `${progress > 0 ? 1 : 0}`;
      }
    }

    if (overlay) {
      const element = overlay;
      element.style.opacity = `${easing}`;
    }

    if (scroll) {
      const element = scroll;

      if (!parent.classList.contains('popup-search')) {
        element.style.opacity = `${easing}`;
      }

      if (parent.classList.contains('popup-menu')) {
        element.style.transform = `translateX(${(1 - easing) * 100}%)`;
      } else if (parent.classList.contains('popup-header-modal')) {
        element.style.transform = `translateY(${(easing - 1) * 2}rem)`;
      } else {
        element.style.transform = `translateY(${(1 - easing) * 2}rem)`;
      }
    }

    if (additional) {
      const element = additional;
      element.style.opacity = `${easing}`;
      if (parent.classList.contains('popup-menu')) {
        element.style.transform = `translateX(${(1 - easing) * 100}%)`;
      } else {
        element.style.transform = `translateY(${(1 - easing) * 2}rem)`;
      }
    }
  };

  const makeTimeline = (
    parent: HTMLElement,
    scroll: HTMLElement | null,
    overlay: HTMLElement | null,
    additional: HTMLElement | null,
    video?: HTMLVideoElement | null
  ) => {
    if (!parent || !scroll || !overlay) {
      return undefined;
    }

    const timeline = new Vevet.Timeline({
      duration: 600,
      easing: [0.25, 0.1, 0.25, 1],
    });
    timeline.addCallback('start', () => {
      if (!timeline.isReversed) {
        if (!parent.classList.contains('popup-search')) {
          document.querySelector('html')?.classList.add('lock');
          document.querySelector('body')?.classList.add('lock');
        }

        parent.classList.add('_opened');

        if (video) {
          video.play();
        }
      }
    });

    timeline.addCallback('progress', ({ progress, easing }) => {
      renderModalAnimation({
        parent,
        scroll,
        overlay,
        progress,
        easing,
        additional,
      });
    });

    timeline.addCallback('end', () => {
      if (timeline.isReversed) {
        document.querySelector('html')?.classList.remove('lock');
        document.querySelector('body')?.classList.remove('lock');
        parent.classList.remove('_opened');

        if (video) {
          video.pause();
        }
      }
    });

    return timeline;
  };

  class Popup {
    get parent() {
      return this._parent;
    }

    private _parent: HTMLElement;

    get name() {
      return this._name;
    }

    private _name: string | undefined;

    get isThanks() {
      return this._isThanks;
    }

    private _isThanks: boolean = false;

    get isError() {
      return this._isError;
    }

    private _isError: boolean = false;

    get scroll() {
      return this._scroll;
    }

    private _scroll: HTMLElement | null;

    get overlay() {
      return this._overlay;
    }

    private _overlay: HTMLElement | null;

    get additional() {
      return this._additional;
    }

    private _additional: HTMLElement | null;

    get wrapper() {
      return this._wrapper;
    }

    private _wrapper: HTMLElement | null;

    get video() {
      return this._video;
    }

    private _video: HTMLVideoElement | null;

    get timeline() {
      return this._timeline;
    }

    private _timeline: Vevet.Timeline | undefined;

    get closeButtons() {
      return this._closeButtons;
    }

    private _closeButtons: Array<HTMLElement | null> = [];

    get openButtons() {
      return this._openButtons;
    }

    private _openButtons: HTMLElement[] = [];

    private _callback: TCallback | undefined;

    constructor(domElement: HTMLElement, callback?: TCallback) {
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
        document.querySelectorAll(`[data-popup="${this._name}"]`)
      );
      this._closeButtons = Array.from(
        this._parent.querySelectorAll(
          '.popup__close, .popup__button'
        ) as NodeListOf<HTMLElement>
      );

      if (this._closeButtons.length !== 0) {
        this._closeButtons.forEach((button) => {
          if (!button) {
            return;
          }

          button.addEventListener('click', () => {
            this._timeline?.reverse();
          });
        });
      }

      useOutsideClick(this._wrapper, () => {
        if (this._parent.classList.contains('_opened')) {
          this._timeline?.reverse();
          document.querySelector('html')?.classList.remove('lock');
          document.querySelector('body')?.classList.remove('lock');

          this._video?.pause();
        }
      });

      useOnEscape(() => {
        if (this._parent.classList.contains('_opened')) {
          this._timeline?.reverse();

          document.querySelector('html')?.classList.remove('lock');
          document.querySelector('body')?.classList.remove('lock');

          this._video?.pause();
        }
      });
    }

    initOpen(popupArr: Popup[]) {
      if (popupArr.length === 0 || !this._openButtons) {
        return;
      }
      this._openButtons.forEach((openBtn) => {
        openBtn.addEventListener('click', (evt) => {
          evt.preventDefault();

          popupArr.forEach((popup) => {
            if (
              popup.parent.classList.contains('_opened') &&
              popup.name !== this._name
            ) {
              popup.timeline?.reverse();
            }
          });

          this._timeline?.play();
        });
      });
    }

    onWindowResize(callback: TPopupCallback) {
      this._callback = callback;

      window.addEventListener(
        'resize',
        debounce({
          callback,
        })
      );
    }
  }

  const initPopups = (): Popup[] => {
    const popupDomArr = document.querySelectorAll('.popup');

    if (popupDomArr.length === 0) {
      return [];
    }

    const popupArr: Popup[] = [];

    popupDomArr.forEach((element) => {
      const popup = new Popup(element as HTMLElement);
      popupArr.push(popup);
    });

    popupArr.forEach((popup) => {
      popup.initOpen(popupArr);
    });

    return popupArr;
  };

  const popups = initPopups();

  //anchorsInit
  const closePopupsHandler = (popups: Popup[]) => {
    if (popups.length === 0) {
      return;
    }

    popups.forEach(({ timeline, openButtons }) => {
      if (timeline && timeline.progress > 0) {
        timeline.reverse();

        openButtons.forEach((openBtn) => {
          openBtn.classList.remove('_opened');
        });
      }
    });
  };

  const scrollHandler = (
    link: HTMLElement,
    headerHeight: number,
    popups: Popup[]
  ) => {
    const sectionName = link.dataset.goto;
    if (!sectionName) {
      return;
    }

    const section = document.querySelector(
      `${sectionName}`
    ) as HTMLElement | null;
    if (!section) {
      return;
    }

    link.addEventListener('click', (evt) => {
      evt.preventDefault();

      closePopupsHandler(popups);

      window.scrollTo({
        top: section.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    });
  };

  const anchorsInit = (headerHeight: number, popups: Popup[]) => {
    const links = Array.from(
      document.querySelectorAll('.anchor') as NodeListOf<HTMLElement>
    );

    if (links.length === 0) {
      return;
    }

    links.forEach((link) => {
      scrollHandler(link, headerHeight, popups);
    });
  };
  anchorsInit(0, popups);

  const formArr = document.querySelectorAll('form');
  const hasError = false;

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
        popups.forEach(({ timeline, isThanks, isError }) => {
          if (isThanks && !hasError) {
            timeline?.play();

            formArr.forEach((form) => {
              const inputs = Array.from(
                form.querySelectorAll('input, textarea') as NodeListOf<
                  HTMLInputElement | HTMLTextAreaElement
                >
              );

              if (inputs.length !== 0) {
                inputs.forEach((inputProp) => {
                  const input = inputProp;
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
            timeline?.play();
          } else {
            timeline?.reverse();

            setTimeout(() => {
              document.querySelector('html')?.classList.add('lock');
              document.querySelector('body')?.classList.add('lock');
            }, 300);
          }
        });
      },
      false
    );
  }
});
