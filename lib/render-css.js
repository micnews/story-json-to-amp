import toCss from 'to-css';
import dasherize from 'dasherize';

const componentToHtmlTagMap = {
  heading: 'h1',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  paragraph: 'p',
  image: 'amp-img',
  video: 'amp-video',
  container: 'div',
};

const htmlizeComponentNames = styles => Object.keys(styles).reduce((changedStyles, key) => ({
  ...changedStyles,
  [componentToHtmlTagMap[key] || key]: styles[key],
}), {});

export const renderCSS = styles => toCss(
  htmlizeComponentNames(styles),
  { indent: '  ', property: dasherize },
).slice(0, -1);
export const renderInlineCSS = styles => renderCSS(styles).replace(/\n/g, ' ');
