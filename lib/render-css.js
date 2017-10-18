/* @flow */

import postcss from 'postcss';
import postcssJs from 'postcss-js';
import autoprefixer from 'autoprefixer';
import dasherize from 'dasherize';
import { set, chain } from 'immutable-object-methods';
import flow from 'lodash.flow';
import componentToHtmlTagMap from './component-to-html-tag';
import type { StylesType, ElementTypeType, ElementStylesType } from '../flow-types';

const convertToPx = value => `${value}px`;
const convertDistance = distance => (typeof distance === 'number' ? convertToPx(distance) : distance);

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
  convertBackgroundLinearGradient,
  convertFlexProperties,
  overrideGridGap,
];

const convertTransforms = array => array.map((object) => {
  const key = Object.keys(object)[0];
  const value = object[key];
  const convertedValue = typeof value === 'number' && !key.includes('scale')
    ? convertToPx(value)
    : value;

  return `${key}(${convertedValue})`;
}).join(' ');

const convertFilters = array => array.map((object) => {
  const key = Object.keys(object)[0];
  const value = object[key];
  const convertedValue = convertDistance(value);

  return `${dasherize(key)}(${convertedValue})`;
}).join(' ');


const convertShadow = value => (Array.isArray(value) ? value : [value])
  .map(({ offset: { x, y }, color, blurRadius, spread }) => ([
    convertToPx(x),
    convertToPx(y),
    blurRadius && convertToPx(blurRadius),
    spread && convertToPx(spread),
    color,
  ].filter(Boolean).join(' ')))
  .join(', ');

const convertBorder = ({ width, style, color }) => [
  convertToPx(width),
  style,
  color,
].join(' ');

const stylePropertyToCss: { [key: string]: any => string, } = {
  top: convertDistance,
  left: convertDistance,
  bottom: convertDistance,
  right: convertDistance,

  width: convertDistance,
  height: convertDistance,

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

  fontSize: convertToPx,

  border: convertBorder,
  borderTop: convertBorder,
  borderBottom: convertBorder,
  borderRight: convertBorder,
  borderLeft: convertBorder,

  borderRadius: convertToPx,
  borderTopLeftRadius: convertToPx,
  borderTopRightRadius: convertToPx,
  borderBottomLeftRadius: convertToPx,
  borderBottomRightRadius: convertToPx,

  transform: convertTransforms,
  filter: convertFilters,
  backdropFilter: convertFilters,
  boxShadow: convertShadow,
  textShadow: convertShadow,
};

const postCssPlugins = [autoprefixer];
const convertCSS = css => postcss(postCssPlugins).process(css, { parser: postcssJs }).css;
const convertCSSInline = postcssJs.sync(postCssPlugins);

export const convertToReactInlineStyle = (styles?: StylesType = {}) => {
  const convertedStyle = flow(converters)(Object.keys(styles).reduce((accumulator, style) => {
    const propertyConverter = stylePropertyToCss[style];
    const styleValue = styles[style];

    return {
      ...accumulator,
      [style]: propertyConverter ? propertyConverter(styleValue) : styleValue,
    };
  }, {}));

  return convertCSSInline(convertedStyle);
};

const parseStyles = (styles: ElementStylesType) => Object.keys(styles).reduce((
  accumulator,
  elementType: ElementTypeType,
) => ({
  ...accumulator,
  [componentToHtmlTagMap[elementType] || elementType]: convertToReactInlineStyle(
    styles[elementType],
  ),
}), {});

export default (styles: ElementStylesType) => convertCSS(parseStyles(styles));
