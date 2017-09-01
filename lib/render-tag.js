import makeTag from 'html-tag';
import { renderInlineCSS } from './render-css';

const indexToGridAreaMap = {
  '0': 'upper-third', // eslint-disable-line quote-props
  '1': 'middle-third', // eslint-disable-line quote-props
  '2': 'lower-third', // eslint-disable-line quote-props
};

export default (
  tag,
  { width, height, source, styles, thirdIndex, ...props },
  children,
) => makeTag(tag, {
  ...props,
  width: width ? String(width) : undefined,
  height: height ? String(height) : undefined,
  src: source,
  style: renderInlineCSS(styles),
  'grid-area': indexToGridAreaMap[thirdIndex],
}, children);
