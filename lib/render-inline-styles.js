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

  const tags = [];
  let latestTag;
  text.split('').forEach((character, index) => {
    const className = getClassname(index);

    if (latestTag && className === latestTag.className) {
      latestTag.characters.push(character);
      return;
    }

    const newTag = {
      className,
      characters: [character],
    };
    tags.push(newTag);
    latestTag = newTag;
  });


  return tags.map(({ className, characters }) => {
    const textString = characters.join('');

    return className ? makeTag('span', { class: className }, textString) : textString;
  }).join('');
};
