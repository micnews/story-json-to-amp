/* @flow */

import makeTag from 'html-tag';
import { without } from 'immutable-object-methods';
import createRenderInlineStyles from './render-inline-styles';
import type { StylesType } from '../flow-types';

export default (
  appendStyles: (StylesType) => string,
) => {
  const renderInlineStyles = createRenderInlineStyles(appendStyles);

  return (
    tag: string,
    { width, height, source, styles, inlineStyles = [], ...props }: Object,
    children?: string = '',
  ) => {
    let tagStyles = styles;
    if ([
      'amp-story',
      'amp-story-page',
      'amp-story-grid-layer',
      'amp-video',
      'source',
    ].indexOf(tag) === -1) {
      tagStyles = Object.assign({ display: 'flex' }, tagStyles);
    }

    const className = tagStyles &&
      Object.keys(tagStyles).length > 0 &&
      appendStyles(tagStyles);

    return makeTag(
      tag,
      without({
        ...props,
        width: width && String(width),
        height: height && String(height),
        src: source,
        class: className,
      }, 'annotation'),
      // STAMP does not create newlines on \n or \r
      renderInlineStyles(inlineStyles, children).replace(/\r\n|\r|\n/g, '<br>'),
    );
  };
};
