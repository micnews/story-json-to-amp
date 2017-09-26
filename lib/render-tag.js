/* @flow */

import makeTag from 'html-tag';
import { renderInlineCSS } from './render-css';

const indexToGridAreaMap = {
  '0': 'upper-third', // eslint-disable-line quote-props
  '1': 'middle-third', // eslint-disable-line quote-props
  '2': 'lower-third', // eslint-disable-line quote-props
};

export default (
  tag: string,
  { width, height, source, styles, thirdIndex, ...props }: Object,
  children?: string,
) => makeTag(tag, {
  ...props,
  width: width && String(width),
  height: height && String(height),
  src: source,
  style: styles && renderInlineCSS(styles),
  'grid-area': indexToGridAreaMap[thirdIndex],
}, children);
