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
