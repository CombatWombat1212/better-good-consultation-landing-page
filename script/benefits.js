class BenefitRow {
  constructor(element) {
    this.element = element;
    this.benefits = [];
    this.height = 0;
    this.nav = {
      elem: this.element.querySelector(".benefits--nav"),
      height: 0,
    };
  }

  init() {
    const elems = this.element.querySelectorAll(".benefits--item");
    this.benefits = Array.from(elems).map((benefit) => new Benefit(benefit));
    this.benefits.forEach((benefit) => benefit.init());
    this.addEventListener();
    this.update();
    this.nav.elem.classList.remove("hidden");
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

  update() {
    this.getNavHeight();
    this.benefits.forEach((benefit) => benefit.update());
    this.post();
  }

  getNavHeight() {
    const inner = this.nav.elem.querySelector(".benefits--nav-inner");
    this.nav.height = inner.offsetHeight;
  }

  addEventListener() {
    window.addEventListener("resize", this.update.bind(this));
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
