/* @flow */

import makeTag from 'html-tag';
import { without } from 'immutable-object-methods';
import createRenderInlineStyles from './render-inline-styles';
import type { StylesType } from '../flow-types';

const indexToGridAreaMap = {
  '0': 'upper-third', // eslint-disable-line quote-props
  '1': 'middle-third', // eslint-disable-line quote-props
  '2': 'lower-third', // eslint-disable-line quote-props
};

export default (
  appendStyles: (StylesType) => string,
) => {
  const renderInlineStyles = createRenderInlineStyles(appendStyles);

  return (
    tag: string,
    { width, height, source, styles, thirdIndex, inlineStyles = [], ...props }: Object,
    children?: string = '',
  ) => {
    const className = styles &&
      Object.keys(styles).length > 0 &&
      appendStyles(styles);

    return makeTag(
      tag,
      without({
        ...props,
        width: width && String(width),
        height: height && String(height),
        src: source,
        'grid-area': indexToGridAreaMap[thirdIndex],
        class: className,
      }, 'annotation'),
      renderInlineStyles(inlineStyles, children).replace(/\r\n|\r|\n/g, '<br>'),
    );
  };
};
