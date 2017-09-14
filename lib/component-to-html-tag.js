export const textComponentToHtmlTagMap = {
  heading: 'h1',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  paragraph: 'p',
};

export default {
  ...textComponentToHtmlTagMap,
  image: 'amp-img',
  video: 'amp-video',
  container: 'div',
};
