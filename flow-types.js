/* @flow */

// TODO: refine this type if possible; should be hex codes and rgb(a) values
type ColorType = string;

// This is just to show that these will be converted to `${number}px`,
// as opposed to other numbers which will be left as they are
type NumberOfPixelsType = number;

// TODO: refine this type if possible; should be strings that end in '%'
type PercentageType = string;

// TODO: refine this type if possible; see https://developer.mozilla.org/en-US/docs/Web/CSS/angle
type AngleType = string;

type StyleOffsetType = { width: number, height: number, };

type TransformType =
  | { perspective: NumberOfPixelsType, }
  | { rotate: AngleType, }
  | { rotateX: AngleType, }
  | { rotateY: AngleType, }
  | { rotateZ: AngleType, }
  | { scale: number, }
  | { scaleX: number, }
  | { scaleY: number, }
  | { translateX: NumberOfPixelsType, }
  | { translateY: NumberOfPixelsType, }
  | { skewX: AngleType, }
  | { skewY: AngleType, };
type TransformsType = $ReadOnlyArray<TransformType>;

// This list is ever-expanding
type FilterType =
  | { blur: NumberOfPixelsType, }
  | { brightness: number, }
  | { grayscale: PercentageType, };
type FiltersType = $ReadOnlyArray<FilterType>;

type LinearGradientType = {
  direction: AngleType,
  stops: $ReadOnlyArray<{
    color: ColorType,
    distance?: PercentageType | NumberOfPixelsType,
  }>,
};

type FlexParamType = 'flex-start' | 'center' | 'flex-end' | 'stretch';

// This list is ever-expanding
export type StylesType = {
  position?: 'relative' | 'absolute',
  top?: NumberOfPixelsType,
  left?: NumberOfPixelsType,
  bottom?: NumberOfPixelsType,
  right?: NumberOfPixelsType,

  margin?: NumberOfPixelsType,
  marginTop?: NumberOfPixelsType,
  marginBottom?: NumberOfPixelsType,
  marginRight?: NumberOfPixelsType,
  marginLeft?: NumberOfPixelsType,

  padding?: NumberOfPixelsType,
  paddingTop?: NumberOfPixelsType,
  paddingBottom?: NumberOfPixelsType,
  paddingRight?: NumberOfPixelsType,
  paddingLeft?: NumberOfPixelsType,

  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex',
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  justifyContent?: FlexParamType,
  alignItems?: FlexParamType,
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',

  backgroundColor?: ColorType,
  backgroundLinearGradient?: LinearGradientType,
  shadowColor?: ColorType,
  shadowOffset?: StyleOffsetType,
  shadowRadius?: NumberOfPixelsType,

  color?: ColorType,
  fontFamily?: string,
  fontSize?: NumberOfPixelsType,
  lineHeight?: number,
  fontStyle?: 'normal' | 'italic',
  textShadowColor?: ColorType,
  textShadowOffset?: StyleOffsetType,
  textShadowRadius?: NumberOfPixelsType,

  opacity?: number,
  transform?: TransformsType,
  filter?: FiltersType,
  backdropFilter?: FiltersType,
};

type ContainerTypeType = 'container';
type ImageTypeType = 'image';
type VideoTypeType = 'video';
type HeadingTypeType =
  | 'heading'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6';
type ParagraphTypeType = 'paragraph';
export type ElementTypeType =
  ContainerTypeType |
  HeadingTypeType | ParagraphTypeType |
  ImageTypeType | VideoTypeType;

export type ElementStylesType = { [ElementTypeType]: StylesType, };

type ElementCreatorType<Type: ElementTypeType, Props: Object> = Props & {
  type: Type,
  styles?: StylesType,
  thirdIndex?: 0 | 1 | 2,
};

// eslint-disable-next-line no-use-before-define
type ContainerType = ElementCreatorType<ContainerTypeType, { elements?: Array<ElementType>, }>;

type MediaLayoutType = 'fill' | 'fixed' | 'fixed-height' | 'flex-item' | 'nodisplay' | 'responsive';

type ImageElementPropsType = {
  alt?: string,
  source: string,
  width: string | number,
  height: string | number,
  layout: MediaLayoutType,
};
type ImageElementType = ElementCreatorType<ImageTypeType, ImageElementPropsType>;

type VideoSourceType = {
  source: string,
  type: string,
};
type VideoElementPropsType = {
  sources: Array<VideoSourceType>,
  loop?: true,
  autoplay?: true,
  width: number,
  height: number,
  layout: MediaLayoutType,
  poster?: string,
};
type VideoElementType = ElementCreatorType<VideoTypeType, VideoElementPropsType>;

type TextElementType = ElementCreatorType<HeadingTypeType | ParagraphTypeType, { text: string, }>;

type ElementType =
  ContainerType |
  TextElementType |
  ImageElementType |
  VideoElementType;

type FillPageLayerType = {
  template: 'fill',
  element?: ElementType,
  styles?: StylesType,
};

type ThirdsPageLayerType = {
  template: 'thirds',
  elements?: [ ElementType, ElementType, ElementType, ],
  styles?: StylesType,
};

type PageLayerType = FillPageLayerType | ThirdsPageLayerType | {
  template: 'vertical' | 'horizontal',
  elements?: Array<ElementType>,
  styles?: StylesType,
};

type PageType = {
  id: string,
  layers: Array<PageLayerType>,
};

export type StoryAnalyticsType = {
  type?: string,
  requests?: { [key: string]: any, },
  vars?: { [key: string]: any, },
  extraUrlParams?: { [key: string]: any, },
  triggers?: { [key: string]: any, },
  transport?: {
    beacon?: boolean,
    xhrpost?: boolean,
    image?: boolean,
  },
};

export type StoryMetaType = {
  title?: string,
  canonicalUrl?: string,
  images?: Array<string>,
  datePublished?: string,
  dateModified?: string,
  author?: string,
  publisher?: {
    name: string,
    logo?: {
      url: string,
      height?: number,
      width?: number,
    },
  },
  description?: string,
};

export type StoryType = {
  title?: string,
  meta?: string | StoryMetaType,
  customCss?: string,
  defaultStyles?: { [ElementTypeType]: StylesType, },
  pages?: Array<PageType>,
  canonicalUrl?: string,
  analytics?: Array<StoryAnalyticsType>,
};
