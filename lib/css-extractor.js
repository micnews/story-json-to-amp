/* @flow */

import type { StylesType } from './types';

export default () => {
  let classNameIndex = 0;
  const stylesCache = {};

  const getClassName = (styles: StylesType) => {
    const key = JSON.stringify(styles);
    if (stylesCache[key]) {
      return stylesCache[key];
    }

    classNameIndex += 1;
    const value = `s-${classNameIndex}`;

    stylesCache[key] = value;
    return value;
  };

  const combinedCss = {};

  return {
    appendStyles: (styles: StylesType) => {
      const className = getClassName(styles);
      Object.assign(combinedCss, {
        [`.${className}`]: styles,
      });

      return className;
    },
    getCombinedCss: () => combinedCss,
  };
};
