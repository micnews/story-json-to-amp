/* @flow */

import makeTag from 'html-tag';
import { without } from 'immutable-object-methods';
import createRenderInlineStyles from './render-inline-styles';
import type { StylesType } from '../flow-types';

const noFlexTags = {
  'amp-story': true,
  'amp-story-page': true,
  'amp-story-grid-layer': true,
  'amp-story-bookend': true,
  'amp-story-auto-ads': true,
  'amp-video': true,
  source: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  p: true,
};

export default (
  appendStyles: (StylesType) => string,
) => {
  const renderInlineStyles = createRenderInlineStyles(appendStyles);

  return (
    tag: string,
    { width, height, source, styles, className, inlineStyles = [], ...props }: Object,
    children?: string = '',
  ) => {
    const tagStyles = noFlexTags[tag]
      ? styles
      : { display: 'flex', ...styles };

    const tagClassName = tagStyles &&
      Object.keys(tagStyles).length > 0 &&
      appendStyles(tagStyles);

    return makeTag(
      tag,
      without({
        ...props,
        width: width && String(width),
        height: height && String(height),
        src: source,
        class: [tagClassName, className].filter(Boolean).join(' ') || undefined,
      }, 'annotation'),
      // STAMP does not create newlines on \n or \r
      renderInlineStyles(inlineStyles, children).replace(/\r\n|\r|\n/g, '<br>'),
    );
  };
};
