/* @flow */

import makeTag from 'html-tag';
import type { StylesType, InlineTextStyleType } from '../flow-types';

export default (appendStyles: (StylesType) => string) => (
  inlineStyles: Array<InlineTextStyleType>,
  text: string,
): string => {
  // TODO: make this more efficient
  if (!inlineStyles.length) {
    return text;
  }

  const inlineStylesWithClassName = inlineStyles.map(({ styles, ...props }) => {
    const className = appendStyles(styles);

    return {
      ...props,
      className,
    };
  });

  const getClassname = (
    index: number,
  ) => inlineStylesWithClassName.map(({ className, start, length }) => (
    index >= start && index < start + length && className
  )).filter(Boolean).join(' ');

  let latestTag;
  const tags = text.split('').reduce((accum, character, index) => {
    const className = getClassname(index);

    if (index === 0 || className !== latestTag.className) {
      const newTag = {
        className,
        characters: [],
      };
      accum.push(newTag);
      latestTag = newTag;
    }

    latestTag.characters.push(character);
    return accum;
  }, []);

  return tags.map(({ className, characters }) => {
    const textString = characters.join('');

    return className ? makeTag('span', { class: className }, textString) : textString;
  }).join('');
};
