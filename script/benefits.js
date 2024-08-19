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
  