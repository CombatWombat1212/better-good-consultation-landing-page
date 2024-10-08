const DEFAULT = {
  START: "top bottom-=100",
  DURATION: 1,
  DELAY: 0.2,
  DISTANCE: 100,
  EASE: "power2.out",
  OPACITY: { START: 0, END: 1 },
  SCALE: { START: 0.95, END: 1 },
  ROTATE: { START: 4, END: 0 },
  TRANSFORM_ORIGIN: "center center",
};

// const fade = {
//   up: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       y: DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       y: 0,
//     },
//   },
//   left: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       x: -DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       x: 0,
//     },
//   },
//   right: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       x: DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       x: 0,
//     },
//   },
//   down: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       y: -DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       y: 0,
//     },
//   },
// };

// function createFade(overrides = {}) {
//   const omit = Array.isArray(overrides.omit) ? overrides.omit : [overrides.omit];
//   const customFade = JSON.parse(JSON.stringify(fade));

//   const applyOverrides = (obj, overrides) => {
//     for (const key in overrides) {
//       if (key !== 'omit') {
//         if (key === 'distance') {
//           if ('x' in obj) obj.x = obj.x < 0 ? -overrides.distance : overrides.distance;
//           if ('y' in obj) obj.y = obj.y < 0 ? -overrides.distance : overrides.distance;
//         } else {
//           obj[key] = overrides[key];
//         }
//       }
//     }
//   };

//   const removeOmitted = (obj, omit) => {
//     for (const key of omit) {
//       delete obj[key];
//     }
//   };

//   for (const direction in customFade) {
//     applyOverrides(customFade[direction].from, overrides);
//     applyOverrides(customFade[direction].to, overrides);
//     removeOmitted(customFade[direction].from, omit);
//     removeOmitted(customFade[direction].to, omit);
//   }

//   return customFade;
// }

function createFade(options = {}) {
  const distance = options.distance || DEFAULT.DISTANCE;
  const duration = options.duration || DEFAULT.DURATION;
  const delay = options.delay || 0;
  const omit = options.omit || [];
  const omits = Array.isArray(omit) ? omit : [omit];

  const fade = {
    up: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        y: distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        y: 0,
      },
    },
    left: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        x: -distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        x: 0,
      },
    },
    right: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        x: distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        x: 0,
      },
    },
    down: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        y: -distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        y: 0,
      },
    },
  };

  function omitProperties(obj, properties) {
    properties.forEach((property) => {
      if (property in obj) {
        delete obj[property];
      }
    });
  }

  Object.keys(fade).forEach((direction) => {
    omitProperties(fade[direction].from, omits);
    omitProperties(fade[direction].to, omits);
  });

  return fade;
}

function createSlide(options = {}) {
  const distance = options.distance || DEFAULT.DISTANCE;
  const duration = options.duration || DEFAULT.DURATION;
  const delay = options.delay || 0;
  const omit = options.omit || [];
  const omits = Array.isArray(omit) ? omit : [omit];

  const slide = {
    up: {
      from: {
        y: typeof distance === "string" ? distance : distance,
      },
      to: {
        duration,
        delay,
        ease: DEFAULT.EASE,
        y: 0,
      },
    },
    down: {
      from: {
        y: typeof distance === "string" ? `-${distance}` : -distance,
      },
      to: {
        duration,
        delay,
        ease: DEFAULT.EASE,
        y: 0,
      },
    },
    left: {
      from: {
        x: typeof distance === "string" ? `-${distance}` : -distance,
      },
      to: {
        duration,
        delay,
        ease: DEFAULT.EASE,
        x: 0,
      },
    },
    right: {
      from: {
        x: typeof distance === "string" ? distance : distance,
      },
      to: {
        duration,
        delay,
        ease: DEFAULT.EASE,
        x: 0,
      },
    },
  };

  function omitProperties(obj, properties) {
    properties.forEach((property) => {
      if (property in obj) {
        delete obj[property];
      }
    });
  }

  Object.keys(slide).forEach((direction) => {
    omitProperties(slide[direction].from, omits);
    omitProperties(slide[direction].to, omits);
  });

  return slide;
}



const pop = {
  in: {
    from: {
      opacity: DEFAULT.OPACITY.START,
      scale: DEFAULT.SCALE.START,
      transformOrigin: DEFAULT.TRANSFORM_ORIGIN,
    },
    to: {
      opacity: DEFAULT.OPACITY.END,
      scale: DEFAULT.SCALE.END,
      duration: DEFAULT.DURATION,
      ease: DEFAULT.EASE,
    },
  },
  out: {
    from: {
      opacity: DEFAULT.OPACITY.END,
      scale: DEFAULT.SCALE.END,
      transformOrigin: DEFAULT.TRANSFORM_ORIGIN,
    },
    to: {
      opacity: DEFAULT.OPACITY.START,
      scale: DEFAULT.SCALE.START,
      duration: DEFAULT.DURATION,
      ease: DEFAULT.EASE,
    },
  },
};

function createDeal(options = {}) {
  const {
    distance = DEFAULT.DISTANCE,
    opacity = DEFAULT.OPACITY,
    duration = DEFAULT.DURATION,
    ease = DEFAULT.EASE,
    rotate = DEFAULT.ROTATE,
    omit = [],
  } = options;

  const omitArray = Array.isArray(omit) ? omit : [omit];

  const deal = {
    up: {
      from: {
        opacity: opacity.START,
        duration,
        y: distance,
        rotate: rotate.START,
        transformOrigin: "top center",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        y: 0,
        rotate: rotate.END,
        transformOrigin: "top center",
      },
    },
    down: {
      from: {
        opacity: opacity.START,
        duration,
        y: -distance,
        rotate: -rotate.START,
        transformOrigin: "bottom center",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        y: 0,
        rotate: rotate.END,
        transformOrigin: "bottom center",
      },
    },
    left: {
      from: {
        opacity: opacity.START,
        duration,
        x: -distance,
        rotate: -rotate.START,
        transformOrigin: "center left",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        x: 0,
        rotate: rotate.END,
        transformOrigin: "center left",
      },
    },
    right: {
      from: {
        opacity: opacity.START,
        duration,
        x: distance,
        rotate: rotate.START,
        transformOrigin: "center right",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        x: 0,
        rotate: rotate.END,
        transformOrigin: "center right",
      },
    },
  };

  omitArray.forEach((property) => {
    Object.values(deal).forEach((direction) => {
      delete direction.from[property];
      delete direction.to[property];
    });
  });

  return deal;
}

const deal = createDeal();
const fade = createFade();
const slide = createSlide();

const RESIZE_TIMEOUT = 250;

function defaultAnimateGroup(selector, options = {}) {
  gsap.registerPlugin(ScrollTrigger);

  const {
    group = selector,
    addedDelay = 0,
    delay = DEFAULT.DELAY,
    overlap = 0,
    trigger,
    animation = fade.up,
  } = options;

  const ease = animation.ease || DEFAULT.EASE;
  const selectors = Array.isArray(selector) ? selector : [selector];

  let index = 0;
  selectors.forEach((sel) => {
    if (!document.querySelector(sel)) return;
    gsap.utils.toArray(sel).forEach((elem, i) => {
      const groupSelector = Array.isArray(group) ? group[index] : group;

      // const triggerElement =
      //   elem.closest(trigger) ||
      //   document.querySelector(trigger) ||
      //   elem.closest(`${groupSelector}--row`) ||
      //   elem.closest(groupSelector) ||
      //   elem.closest(`${sel}--row`) ||
      //   elem.closest(".section") ||
      //   elem;

      const triggerElement = (() => {
        if (trigger instanceof HTMLElement) return trigger;
        if (elem instanceof HTMLElement) return elem;
        if (elem.closest(trigger)) return elem.closest(trigger);
        if (document.querySelector(trigger)) return document.querySelector(trigger);
        if (elem.closest(`${groupSelector}--row`)) return elem.closest(`${groupSelector}--row`);
        if (elem.closest(groupSelector)) return elem.closest(groupSelector);
        if (elem.closest(`${sel}--row`)) return elem.closest(`${sel}--row`);
        if (elem.closest(".section")) return elem.closest(".section");
        return elem;
      })();

      // Calculate the actual delay considering the overlap
      const actualDelay = delay * index + addedDelay - overlap * index;

      const main = {
        from: animation.from,
        to: {
          ...animation.to,
          delay: actualDelay > 0 ? actualDelay : 0,
          ease,
          scrollTrigger: {
            trigger: triggerElement,
            start: DEFAULT.START,
          },
        },
      };

      // console.log(triggerElement);

      gsap.fromTo(elem, main.from, main.to);

      index++;
    });
  });
}

function defaultAnimateSplit(selector, options = {}) {
  gsap.registerPlugin(ScrollTrigger);

  const {
    first = "graphic",
    second = "body",
    group = "container",
    trigger = null,
    addedDelay = 0,
    delay = DEFAULT.DELAY,
  } = options;

  gsap.utils.toArray(selector).forEach((split) => {
    const container = safeQuerySelector(split, group);
    if (!container) return;

    const body = safeQuerySelector(container, first);
    const graphic = safeQuerySelector(container, second);

    if (!body) return;
    const isBodyFirst = container.children[0] === body;

    container.classList.add("split-animation");

    let triggerElement = split.closest(trigger) || split;

    const bodyAnimation = {
      from: isBodyFirst ? fade.left.from : fade.right.from,
      to: {
        ...(isBodyFirst ? fade.left.to : fade.right.to),
        delay: delay + addedDelay,
        scrollTrigger: {
          trigger: triggerElement,
          start: DEFAULT.START,
        },
      },
    };


    gsap.fromTo(body, bodyAnimation.from, bodyAnimation.to);

    if (!graphic) return;

    const graphicAnimation = {
      from: isBodyFirst ? fade.right.from : fade.left.from,
      to: {
        ...(isBodyFirst ? fade.right.to : fade.left.to),
        delay: addedDelay,
        scrollTrigger: {
          trigger: triggerElement,
          start: DEFAULT.START,
        },
      },
    };

    gsap.fromTo(graphic, graphicAnimation.from, graphicAnimation.to);
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  // call scrollTrigger refresh once every 500ms for 5 seconds
  let i = 0;
  const interval = setInterval(() => {
    i++;
    ScrollTrigger.refresh();
    if (i === 30) clearInterval(interval);
  }, 500);
}

function safeQuerySelector(element, selector) {
  try {
    return element.querySelector(selector) || element.querySelector(`[class*='${selector}']`);
  } catch (error) {
    // console.error(`Invalid selector for ${selector}:`, error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  defaultStackAnimation({
    parent: ".hero--highlights .row_col_wrap_12_inner",
    inner: ".wpb_column",
    children: ".text--h4, .text--small",
    trigger: "#home--hero",
    delay: 0.5,
  });

  defaultStackAnimation({
    parent: ".wpb_raw_code",
    inner: ".team--row",
    children: ".team--card",
  });

  defaultStackAnimation(
    {
      parent: "#home--dos-donts .card-list:nth-child(2), #home--dos-donts .card-list:nth-child(4), #overview .point-list:nth-child(2), #overview .point-list:nth-child(4)",
      inner: ".row_col_wrap_12_inner",
      children: ".wpb_column, .wpb_text_column:is(#overview .wpb_text_column)",
    },
    { animation: fade.left },
  );



  defaultStackAnimation(
    {
      parent: "#case-studies, #portfolio--studies",
      inner: ".portfolio--row",
      children: ".portfolio--card",
    },
    {
      animation: fade.up,
      childDelay: 0.25,
    },
  );

  // defaultStackAnimation(
  //   {
  //     parent: "#home--studies",
  //     inner: ".portfolio--row",
  //     children: ".portfolio--card",
  //   },
  //   {
  //     animation: fade.up,
  //     childDelay: 0.25,
  //   },
  // );

  const fullSlide = createSlide({ distance: "100%" });
  defaultStackAnimation(
    {
      parent: "#process",
      inner: ".process--inner-row.title",
      children:
        ".row_col_wrap_12_inner, .row_col_wrap_12_inner .wpb_column, .row_col_wrap_12_inner, .row_col_wrap_12_inner .wpb_column .vc_column-inner",
    },
    {
      animation: fullSlide.left,
      childDelay: 0.35,
    },
  );

  defaultStackAnimation(
    {
      parent: ".nectar-sticky-media-section__content-section",
      inner: ".nectar-sticky-media-section__content-section",
      children: ".number, h3, h6",
    },
    {
      animation: fade.up,
    },
  );

  defaultStackAnimation(
    {
      parent: "#home--faq",
      inner: ".toggles",
      children: ".toggle",
    },
    {
      animation: fade.up,
    },
  );

  defaultStackAnimation(
    {
      parent: "#home--limited",
      inner: ".row_col_wrap_12",
      children: ".row_col_wrap_12 > *",
    },
    {
      animation: fade.up,
    },
  );


  defaultStackAnimation({
    parent: ".wpb_raw_code",
    inner: ".team--row",
    children: ".team--card",
  });


  defaultStackAnimation({
    parent: "#portfolio--key-results",
    inner: ".wpb_row:not(:first-child) .row_col_wrap_12_inner",
    children: ".vc_col-sm-4",
  });
  defaultStackAnimation({
    parent: "#portfolio--services",
    inner: ".list",
    children: ".wpb_column",
  });



});

class BenefitRow {
    constructor(element) {
      this.element = element;
      this.benefits = [];
      this.height = 0;
      this.nav = {
        elem: this.element.querySelector(".benefits--nav"),
        height: 0,
        links: Array.from(this.element.querySelectorAll(".benefits--link")),
      };
      this.activeBenefit = null;
    }
  
    init() {
      const elems = this.element.querySelectorAll(".benefits--item");
      this.benefits = Array.from(elems).map((benefit) => new Benefit(benefit));
      this.benefits.forEach((benefit) => benefit.init());
      this.addEventListener();
      this.update();
      this.nav.elem.classList.remove("hidden");
    }
  
    update() {
      this.getNavHeight();
      this.benefits.forEach((benefit) => benefit.update());
      this.post();
      this.checkActiveBenefit();
    }
  
    getNavHeight() {
      const inner = this.nav.elem.querySelector(".benefits--nav-inner");
      this.nav.height = inner.offsetHeight;
    }
  
    checkActiveBenefit() {
      const centerY = window.innerHeight / 2;
      let closestBenefit = null;
      let minDistance = Infinity;
  
      this.benefits.forEach((benefit) => {
        const rect = benefit.element.getBoundingClientRect();
        const benefitCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - benefitCenterY);
  
        if (distance < minDistance) {
          minDistance = distance;
          closestBenefit = benefit;
        }
      });
  
      if (closestBenefit && closestBenefit !== this.activeBenefit) {
        if (this.activeBenefit) {
          this.activeBenefit.element.classList.remove("active");
          this.nav.links.forEach((link) => link.classList.remove("active"));
        }
  
        closestBenefit.element.classList.add("active");
        const activeLink = this.nav.links.find((link) =>
          link.getAttribute("href") === `#${closestBenefit.element.id}`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
  
        this.activeBenefit = closestBenefit;
      }
    }
  
    post() {
      const firstBenefitHeight = this.benefits[0].height;
      const lastBenefitHeight = this.benefits[this.benefits.length - 1].height;
  
      let paddingTop = firstBenefitHeight / 2 - this.nav.height / 2;
      let paddingBottom = lastBenefitHeight / 2 - this.nav.height / 2;
  
      this.element.style.setProperty("--benefits--padding-top", `${paddingTop}px`);
      this.element.style.setProperty("--benefits--padding-bottom", `${paddingBottom}px`);
      this.element.style.setProperty("--benefits--nav-height", `${this.nav.height}px`);
    }
  
    addEventListener() {
      window.addEventListener("resize", this.update.bind(this));
      window.addEventListener("scroll", this.checkActiveBenefit.bind(this));
    }
  }
  
  class Benefit {
    constructor(element) {
      this.element = element;
      this.height = this.element.offsetHeight;
    }
  
    init() {
      this.update();
    }
  
    update() {
      this.height = this.element.offsetHeight;
    }
  
    post() {
      this.element.style.setProperty("--benefit--height", `${this.element.offsetHeight}px`);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const benefitElems = document.querySelectorAll(".benefits");
    if (benefitElems.length === 0) return;
  
    const benefits = Array.from(benefitElems).map((row) => new BenefitRow(row));
    benefits.forEach((row) => row.init());
  });
  
class Stack {
  constructor(parent, inner, children) {
    this.parent = parent;
    this.inner = getSubElements(parent, inner);
    this.children = this.getInnerChildren(this.inner, children);
  }

  getInnerChildren(inner, children) {
    // array of length equal to inner, with each item being an array of children
    // the inner array is a flat array of all the children of the inner element
    return inner.map((innerElement) => {
      return getSubElements(innerElement, children);
    });
  }
}

function parseSelector(selector) {
  // if no selector is provided
  if (!selector) {
    return [];
  }

  // if its an html element
  if (selector instanceof HTMLElement) {
    return [selector];
  }

  // if its a string
  if (typeof selector === "string") {
    return Array.from(document.querySelectorAll(selector));
  }

  // if its an array of html elements
  if (Array.isArray(selector) && selector.every((el) => el instanceof HTMLElement)) {
    return selector;
  }

  // if its an array of strings
  if (Array.isArray(selector) && selector.every((el) => typeof el === "string")) {
    const search = selector.join(", ");
    return Array.from(document.querySelectorAll(search));
  }
}

function getSubElements(parent, sub) {
  // if no sub is provided, get all children
  if (!sub) {
    return Array.from(parent.children);
  }

  // get sub elements based on the selector
  const elements = parseSelector(sub);

  // filter elements to be within the parent
  return elements.filter((el) => parent.contains(el));
}

function defaultStackAnimation(selectors = {}, options = {}) {
  let { parent = null, inner = null, children = null } = selectors;

  let {
    parentDelay = 0,
    innerDelay = DEFAULT.DELAY,
    childDelay = DEFAULT.DELAY / 2,
    duration = DEFAULT.DURATION,
    animation = fade.up,
    mobile = false,
  } = options;

  const isMobile = window.innerWidth < 1000;

  if (isMobile && !mobile) return;

  const parents = parseSelector(parent);
  if (parents.length === 0) return;

  const rows = Array.from(parents).map((parent) => new Stack(parent, inner, children));

  rows.forEach((row) => row.inner.forEach((inner, i) => handleRowInner(row, inner, i)));

  function handleRowInner(row, inner, i) {
    const children = row.children[i];
    row.index = i;

    children.forEach((child, j) => {
      const delay = parentDelay + innerDelay * i + childDelay * j;
      animation = getAnimation(row, delay);
      gsap.fromTo(child, animation.from, animation.to);
    });
  }

  function getAnimation(row, delay) {
    let ani = animation;

    // if animation is an array, get the animation based on the index
    if (Array.isArray(ani) && ani.length === row.inner.length) {
      ani = ani[row.index];
    }

    const scrollTrigger = {
      trigger: row.parent,
      start: DEFAULT.START,
    };

    ani = {
      from: {
        ...ani.from,
      },
      to: {
        ...ani.to,
        delay,
        duration,
      },
    };

    ani.to = {
      ...ani.to,
      scrollTrigger,
    };

    return ani;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const updateElementProperty = ({ watch, target, property = "width", name, all = false }) => {
    const watchedElements = all
      ? document.querySelectorAll(watch)
      : [document.querySelector(watch)];
    if (!watchedElements.length) return;

    watchedElements.forEach((watchedElement) => {
      const computedValue = window.getComputedStyle(watchedElement)[property];
      const targetElements = all
        ? document.querySelectorAll(target)
        : [document.querySelector(target)];
      targetElements.forEach((targetElement) => {
        if (targetElement) {
          if (name) {
            targetElement.style.setProperty(name, computedValue);
          } else {
            targetElement.style[property] = computedValue;
          }
        }
      });
    });
  };

  const createObserver = ({ watch, target, property = "width", name, all = false }) => {
    const debouncedUpdateProperty = debounce(
      () => updateElementProperty({ watch, target, property, name, all }),
      100,
    );

    const observer = new MutationObserver(debouncedUpdateProperty);
    const config = { attributes: true, childList: true, subtree: true };

    const watchedElements = all
      ? document.querySelectorAll(watch)
      : [document.querySelector(watch)];
    watchedElements.forEach((watchedElement) => {
      if (watchedElement) {
        observer.observe(watchedElement, config);
      }
    });

    window.addEventListener("resize", debouncedUpdateProperty);
    debouncedUpdateProperty();
  };

  window.createObserver = createObserver;
});

document.addEventListener("DOMContentLoaded", function () {
  const browserInfo = {
    browser: "",
    isChrome: false,
    isFirefox: false,
    isSafari: false,
    isOpera: false,
    isEdge: false,
    browserFound: false,
  };

  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("Chrome") > -1) {
    browserInfo.browser = "Chrome";
    browserInfo.isChrome = true;
    browserInfo.browserFound = true;
  } else if (userAgent.indexOf("Safari") > -1) {
    browserInfo.browser = "Safari";
    browserInfo.isSafari = true;
    browserInfo.browserFound = true;
  } else if (userAgent.indexOf("Firefox") > -1) {
    browserInfo.browser = "Firefox";
    browserInfo.isFirefox = true;
    browserInfo.browserFound = true;
  } else if (userAgent.indexOf("Edge") > -1) {
    browserInfo.browser = "Edge";
    browserInfo.isEdge = true;
    browserInfo.browserFound = true;
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserInfo.browser = "Opera";
    browserInfo.isOpera = true;
    browserInfo.browserFound = true;
  } else {
    browserInfo.browser = userAgent;
    browserInfo.browserFound = true;
  }

  if (browserInfo.browserFound) {
    document.documentElement.classList.add(`${browserInfo.browser.toLowerCase()}`);
  }

  if (browserInfo.isSafari) {
    const replaceLineSeparator = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(/\u2028/g, " ");
      } else {
        node.childNodes.forEach((child) => replaceLineSeparator(child));
      }
    };

    replaceLineSeparator(document.body);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Create the invisible container elements
  const createContainer = (className) => {
    const container = document.createElement("div");
    container.className = className;
    container.style.width = "100%";
    container.style.opacity = "0";
    container.style.visibility = "hidden";
    container.style.pointerEvents = "none";
    container.style.zIndex = "-1";
    document.body.insertAdjacentElement("afterbegin", container);
    return container;
  };

  const container = createContainer("container");

  // Function to set the CSS variables
  const setMaxWidth = () => {
    const computedStyle = getComputedStyle(container);
    const maxWidth = computedStyle.width;
    const marginLeft = parseFloat(computedStyle.marginLeft);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);

    const margin = `${marginLeft + paddingLeft}px`;
    document.documentElement.style.setProperty(
      "--site--max-width__px",
      maxWidth,
    );
    document.documentElement.style.setProperty(
      "--site--container-margin__px",
      margin,
    );
  };

  // Debounce function to limit the rate of function calls
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Run the setMaxWidth function after a timeout of 0s to ensure everything is loaded
  setTimeout(setMaxWidth, 0);

  // Add a resize event listener with debounce
  window.addEventListener("resize", debounce(setMaxWidth, 0));
});

function mirrorstyle(parentSelector, matchSelector) {
  const RESIZE_TIMEOUT = 150; // Adjust as needed
  const allMirrorstyleParents = document.querySelectorAll(parentSelector);
  const allMirrorstyleMatches = document.querySelectorAll(matchSelector);

  function clearMirrorstylesOnElement(element) {
    const affectedProperty = element.getAttribute("mirrorstyle-properties");
    let styleAttr = element.getAttribute("style") || "";
    const propertyRegExp = new RegExp(`\\s*${affectedProperty}\\s*:\\s*[^;]+;?`, "i");
    const updatedStyleAttr = styleAttr.replace(propertyRegExp, "");
    element.setAttribute("style", updatedStyleAttr);
    element.removeAttribute("mirrorstyle-properties");
  }

  function clearMirrorStyles() {
    const elementsWithMirrorStyleProp = document.querySelectorAll("[mirrorstyle-properties]");
    const elementsToClear = Array.from(elementsWithMirrorStyleProp).filter(
      (element) => !Array.from(allMirrorstyleMatches).includes(element),
    );
    elementsToClear.forEach(clearMirrorstylesOnElement);
  }

  function attachMirrorStyleObservers(elements) {
    elements.forEach((element) => {
      if (element.getAttribute("mirrorstyle-observing") === "true") return;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "mirrorstyle") {
            handleMirrorstyleChange(mutation);
          }
        });
      });

      observer.observe(element, {
        attributes: true,
        attributeFilter: ["mirrorstyle"],
        attributeOldValue: true,
      });
      element.setAttribute("mirrorstyle-observing", "true");
    });
  }

  function handleMirrorstyleChange(mutation) {
    const prevValue = mutation.oldValue;
    const newValue = mutation.target.getAttribute("mirrorstyle");

    if (prevValue && !newValue) {
      clearMirrorstylesOnElement(mutation.target);
    }
  }

  function addStyleNonDestructive(element, property, value) {
    let styleAttr = element.getAttribute("style") || "";
    const propertyRegExp = new RegExp(`\\s*${property}\\s*:\\s*[^;]+;?`, "i");
    const updatedStyleAttr = styleAttr.replace(propertyRegExp, "");
    element.setAttribute("style", `${updatedStyleAttr} ${property}: ${value};`);
  }

  function splitPx(value) {
    return parseFloat(value.replace("px", ""));
  }

  function mirrorstyle() {
    clearMirrorStyles();
    attachMirrorStyleObservers(allMirrorstyleParents);
    attachMirrorStyleObservers(allMirrorstyleMatches);

    const allMirrorstyleMatchGroups = [];
    const allMirrorstyleMatchGroupIDs = [];

    allMirrorstyleMatches.forEach((element) => {
      const mirrorstyleMatchGroupID = element.getAttribute("mirrorstyle-group");
      if (!allMirrorstyleMatchGroupIDs.includes(mirrorstyleMatchGroupID)) {
        allMirrorstyleMatchGroupIDs.push(mirrorstyleMatchGroupID);
      }
    });

    allMirrorstyleMatchGroupIDs.forEach((groupID) => {
      const mirrorstyleMatchGroup = document.querySelectorAll(`[mirrorstyle-group="${groupID}"]`);
      allMirrorstyleMatchGroups.push(mirrorstyleMatchGroup);
    });

    allMirrorstyleMatchGroups.forEach((group) => {
      const property = group[0].getAttribute("mirrorstyle-property");
      let maxVal = 0;

      group.forEach((element) => {
        addStyleNonDestructive(element, property, "fit-content");
        element.setAttribute("mirrorstyle-properties", property);
      });

      group.forEach((element) => {
        const matchChildPropertyVal = splitPx(
          window.getComputedStyle(element, null).getPropertyValue(property),
        );
        if (matchChildPropertyVal > maxVal) {
          maxVal = matchChildPropertyVal;
        }
      });

      group.forEach((element) => {
        addStyleNonDestructive(element, property, `${maxVal}px`);
        element.setAttribute("mirrorstyle-properties", property);
      });
    });
  }

  mirrorstyle();
}

class Pricing {
  constructor(elem) {
    this.elem = elem;
    this.button = elem.querySelector(".pricing--button");
  }

  init() {
    this.addEventListeners();
  }

  handleMouseEnter() {
    console.log('enter');
    this.elem.classList.add("pricing--column__hover");
  }

  handleMouseLeave() {
    console.log('leave');
    this.elem.classList.remove("pricing--column__hover");
  }

  addEventListeners() {
    this.button.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
    this.button.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const pricingElems = document.querySelectorAll(".pricing--column:not(.pricing--column__small)");
  if (!pricingElems) return;

  const pricing = Array.from(pricingElems).map((pricing) => new Pricing(pricing));
  pricing.forEach((pricing) => pricing.init());
});

// document.addEventListener("DOMContentLoaded", function () {
//   // Get all rows
//   const rows = document.querySelectorAll(".main-content > .row > .wpb_row");
//   let previousColor = null;
//   let previousImage = null;
//   let groupStart = null;

//   const addStartEndClasses = (startRow, endRow) => {
//     if (startRow) {
//       startRow.classList.add("row__bg-change-start");
//     }
//     if (endRow) {
//       endRow.classList.add("row__bg-change-end");
//     }
//   };

//   const checkBackgroundColor = (rowBg) => {
//     return window.getComputedStyle(rowBg).backgroundColor;
//   };

//   const extractUrlFromComputedStyle = (styleValue) => {
//     const urlMatch = styleValue.match(/url\(["']?([^"']*)["']?\)/);
//     return urlMatch ? urlMatch[1] : null;
//   };

//   const checkBackgroundImage = (rowBg) => {
//     const dataSrc = rowBg.getAttribute("data-nectar-img-src");
//     const computedStyleImage = extractUrlFromComputedStyle(window.getComputedStyle(rowBg).backgroundImage);
//     return dataSrc || computedStyleImage;
//   };

//   const handleRow = (row, index) => {
//     const rowBg = row.querySelector(".row-bg");
//     if (rowBg) {
//       const currentColor = checkBackgroundColor(rowBg);

//       // Skip image checking if .using-bg-color is present and .using-image is not
//       if (!rowBg.classList.contains('using-bg-color') || rowBg.classList.contains('using-image')) {
//         const currentImage = checkBackgroundImage(rowBg);

//         if (previousImage !== null && currentImage !== previousImage) {
//           // If the background image changed, mark the end of that group
//           addStartEndClasses(groupStart, rows[index - 1]);
//           // Start a new group
//           groupStart = row;
//         }

//         previousImage = currentImage;
//       }

//       if (previousColor !== null && currentColor !== previousColor) {
//         // If there was a previous group, mark the end of that group
//         addStartEndClasses(groupStart, rows[index - 1]);
//         // Start a new group
//         groupStart = row;
//       }

//       // Update the previous color
//       previousColor = currentColor;

//       const observer = new MutationObserver(() => {
//         handleAllRows();
//       });

//       observer.observe(rowBg, {
//         attributes: true,
//         attributeFilter: ["style", "data-nectar-img-src"],
//       });
//     }
//   };

//   const handleAllRows = () => {
//     previousColor = null;
//     previousImage = null;
//     groupStart = null;

//     rows.forEach((row, index) => {
//       handleRow(row, index);
//     });

//     // Mark the last group if it exists
//     if (groupStart) {
//       addStartEndClasses(groupStart, rows[rows.length - 1]);
//     }
//   };

//   handleAllRows();

//   let counter = 0;
//   const interval = setInterval(() => {
//     handleAllRows();
//     counter++;
//     if (counter >= 10) {
//       clearInterval(interval);
//     }
//   }, 500);
// });

