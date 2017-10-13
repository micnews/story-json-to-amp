/* @flow */

import toCss from 'to-css';
import dasherize from 'dasherize';
import { set, chain } from 'immutable-object-methods';
import flow from 'lodash.flow';
import componentToHtmlTagMap from './component-to-html-tag';
import type { StylesType, ElementTypeType, ElementStylesType } from '../flow-types';

const convertShadow = (styles) => {
  const { shadowColor, shadowOffset, shadowRadius } = styles;

  if (!shadowColor && !shadowOffset && !shadowRadius) {
    return styles;
  }

  const { width, height } = shadowOffset;

  return chain(styles)
    .set('boxShadow', [
      `${width}px`,
      `${height}px`,
      shadowRadius && `${shadowRadius}px`,
      shadowColor,
    ].filter(Boolean).join(' '))
    .without('shadowColor')
    .without('shadowOffset')
    .without('shadowRadius')
    .value;
};

const convertTextShadow = (styles) => {
  const { textShadowColor, textShadowOffset, textShadowRadius } = styles;

  if (!textShadowColor && !textShadowOffset && !textShadowRadius) {
    return styles;
  }

  const { width, height } = textShadowOffset;

  return chain(styles)
    .set('textShadow', [
      `${width}px`,
      `${height}px`,
      textShadowRadius && `${textShadowRadius}px`,
      textShadowColor,
    ].filter(Boolean).join(' '))
    .without('textShadowColor')
    .without('textShadowOffset')
    .without('textShadowRadius')
    .value;
};

const convertBackgroundLinearGradient = (styles) => {
  const { backgroundLinearGradient } = styles;

  if (!backgroundLinearGradient) {
    return styles;
  }

  const { direction, stops } = backgroundLinearGradient;

  const gradientString = [
    direction,
    ...stops.map(({ color, distance }) => [
      color,
      typeof distance === 'number' ? `${distance}px` : distance,
    ].filter(Boolean).join(' ')),
  ].join(', ');

  return chain(styles)
    .set('background', `linear-gradient(${gradientString})`)
    .without('backgroundLinearGradient')
    .value;
};

const convertFlexProperties = (styles) => {
  const { justifyContent, alignItems } = styles;

  if (!justifyContent && !alignItems) {
    return styles;
  }

  let stylesToReturn = { ...styles };
  if (justifyContent) {
    stylesToReturn = set(stylesToReturn, 'alignContent', justifyContent);
  }
  if (alignItems) {
    stylesToReturn = set(stylesToReturn, 'justifyItems', alignItems);
  }

  return stylesToReturn;
};

const overrideGridGap = styles => set(styles, 'gridGap', 0);

const converters = [
  convertShadow,
  convertTextShadow,
  convertBackgroundLinearGradient,
  convertFlexProperties,
  overrideGridGap,
];

const convertToPx = (number: number) => `${number}px`;

const convertTransforms = array => array.map((object) => {
  const key = Object.keys(object)[0];
  const value = object[key];
  const convertedValue = typeof value === 'number' && !key.includes('scale')
    ? `${value}px`
    : value;

  return `${key}(${convertedValue})`;
}).join(' ');

const convertFilters = array => array.map((object) => {
  const key = Object.keys(object)[0];
  const value = object[key];
  const convertedValue = typeof value === 'number' ? `${value}px` : value;

  return `${dasherize(key)}(${convertedValue})`;
}).join(' ');

const styleToCss: Object = {
  top: convertToPx,
  left: convertToPx,
  bottom: convertToPx,
  right: convertToPx,
  margin: convertToPx,
  marginTop: convertToPx,
  marginBottom: convertToPx,
  marginRight: convertToPx,
  marginLeft: convertToPx,
  padding: convertToPx,
  paddingTop: convertToPx,
  paddingBottom: convertToPx,
  paddingRight: convertToPx,
  paddingLeft: convertToPx,
  gridGap: convertToPx,
  fontSize: convertToPx,
  transform: convertTransforms,
  filter: convertFilters,
  backdropFilter: convertFilters,
};

export const convertToReactInlineStyle = (styles: StylesType) => flow(converters)(
    Object.keys(styles).reduce((
    accumulator,
    style,
  ) => {
      const converter = styleToCss[style];
      const styleValue = styles[style];

      return {
        ...accumulator,
        [style]: converter ? converter(styleValue) : styleValue,
      };
    }, {}),
);

const htmlizeComponentNames = (styles: ElementStylesType) => Object.keys(styles).reduce((
  accumulator,
  elementType: ElementTypeType,
) => ({
  ...accumulator,
  [componentToHtmlTagMap[elementType] || elementType]: convertToReactInlineStyle(
    styles[elementType],
  ),
}), {});

export default (styles: ElementStylesType) => toCss(
  htmlizeComponentNames(styles),
  { indent: '  ', property: dasherize },
).slice(0, -1);
