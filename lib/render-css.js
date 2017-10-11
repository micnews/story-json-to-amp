/* @flow */

import toCss from 'to-css';
import dasherize from 'dasherize';
import componentToHtmlTagMap from './component-to-html-tag';
import type { ElementTypeType, ElementStylesType } from './types';

const htmlizeComponentNames = styles => Object.keys(styles).reduce((
  changedStyles,
  key: ElementTypeType,
) => ({
  ...changedStyles,
  [componentToHtmlTagMap[key] || key]: styles[key],
}), {});

export default (styles: ElementStylesType) => toCss(
  htmlizeComponentNames(styles),
  { indent: '  ', property: dasherize },
).slice(0, -1);
