/* @flow */

import toCss from 'to-css';
import postcssJs from 'postcss-js';
import autoprefixer from 'autoprefixer';
import dasherize from 'dasherize';
import { set, chain } from 'immutable-object-methods';
import flow from 'lodash.flow';
import componentToHtmlTagMap from './component-to-html-tag';
import type { StylesType, ElementTypeType, ElementStylesType } from '../flow-types';

const convertDistance = distance => (typeof distance === 'number' ? `${distance}px` : distance);

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
      convertDistance(distance),
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
  const convertedValue = convertDistance(value);

  return `${dasherize(key)}(${convertedValue})`;
}).join(' ');

const stylePropertyToCss: { [key: string]: any => string, } = {
  top: convertDistance,
  left: convertDistance,
  bottom: convertDistance,
  right: convertDistance,
  margin: convertDistance,
  marginTop: convertDistance,
  marginBottom: convertDistance,
  marginRight: convertDistance,
  marginLeft: convertDistance,
  padding: convertDistance,
  paddingTop: convertDistance,
  paddingBottom: convertDistance,
  paddingRight: convertDistance,
  paddingLeft: convertDistance,
  gridGap: convertDistance,
  fontSize: convertDistance,
  transform: convertTransforms,
  filter: convertFilters,
  backdropFilter: convertFilters,
};

export const convertToReactInlineStyle = (styles: StylesType) => flow(converters)(
    Object.keys(styles).reduce((
    accumulator,
    style,
  ) => {
      const propertyConverter = stylePropertyToCss[style];
      const styleValue = styles[style];

      return {
        ...accumulator,
        [style]: propertyConverter ? propertyConverter(styleValue) : styleValue,
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

const addPrefixes = postcssJs.sync([autoprefixer]);

export default (styles: ElementStylesType) => toCss(
  addPrefixes(htmlizeComponentNames(styles)),
  { indent: '  ', property: dasherize },
);
