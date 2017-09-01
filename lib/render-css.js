import toCss from 'to-css';
import dasherize from 'dasherize';
import componentToHtmlTagMap from './component-to-html-tag';

const htmlizeComponentNames = styles => Object.keys(styles).reduce((changedStyles, key) => ({
  ...changedStyles,
  [componentToHtmlTagMap[key] || key]: styles[key],
}), {});

export const renderCSS = styles => toCss(
  htmlizeComponentNames(styles),
  { indent: '  ', property: dasherize },
).slice(0, -1);
export const renderInlineCSS = styles => renderCSS(styles).replace(/\n/g, ' ');
