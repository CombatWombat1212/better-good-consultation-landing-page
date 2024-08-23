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
      parent: "#home--process",
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
