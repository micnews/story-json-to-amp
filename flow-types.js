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

type DistanceType = NumberOfPixelsType | PercentageType;

type TransformType =
  | { perspective: NumberOfPixelsType, }
  | { rotate: AngleType, }
  | { rotateX: AngleType, }
  | { rotateY: AngleType, }
  | { rotateZ: AngleType, }
  | { scale: number, }
  | { scaleX: number, }
  | { scaleY: number, }
  | { translateX: DistanceType, }
  | { translateY: DistanceType, }
  | { skewX: AngleType, }
  | { skewY: AngleType, };
type TransformsType = $ReadOnlyArray<TransformType>;

type FilterType =
// This list is ever-expanding
  | { blur: DistanceType, }
  | { brightness: number, }
  | { grayscale: PercentageType, };
type FiltersType = $ReadOnlyArray<FilterType>;

type LinearGradientType = {
  direction: AngleType,
  stops: $ReadOnlyArray<{
    color: ColorType,
    distance?: DistanceType,
  }>,
};

type RootShadowType = {
  offset: { x: NumberOfPixelsType, y: NumberOfPixelsType, },
  color?: ColorType,
  blurRadius?: NumberOfPixelsType,
};
type BoxShadowType = RootShadowType & {
  spread?: NumberOfPixelsType,
};

type BorderType = {
  width: NumberOfPixelsType,
  color: ColorType,
  style: 'solid' | 'dotted' | 'dashed',
};

export type StylesType = {
  position?: 'relative' | 'absolute',
  top?: DistanceType,
  left?: DistanceType,
  bottom?: DistanceType,
  right?: DistanceType,

  width?: DistanceType,
  height?: DistanceType,

  margin?: DistanceType,
  marginTop?: DistanceType,
  marginBottom?: DistanceType,
  marginRight?: DistanceType,
  marginLeft?: DistanceType,

  padding?: DistanceType,
  paddingTop?: DistanceType,
  paddingBottom?: DistanceType,
  paddingRight?: DistanceType,
  paddingLeft?: DistanceType,

  border?: BorderType,
  borderTop?: BorderType,
  borderBottom?: BorderType,
  borderRight?: BorderType,
  borderLeft?: BorderType,

  borderRadius?: NumberOfPixelsType,
  borderTopLeftRadius?: NumberOfPixelsType,
  borderTopRightRadius?: NumberOfPixelsType,
  borderBottomLeftRadius?: NumberOfPixelsType,
  borderBottomRightRadius?: NumberOfPixelsType,

  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex',
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between',
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch',
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',

  backgroundColor?: ColorType,
  backgroundLinearGradient?: LinearGradientType,
  boxShadow?: BoxShadowType | $ReadOnlyArray<BoxShadowType>,

  color?: ColorType,
  fontFamily?: string,
  fontSize?: NumberOfPixelsType,
  lineHeight?: number,
  fontStyle?: 'normal' | 'italic',
  textShadow?: RootShadowType | $ReadOnlyArray<RootShadowType>,

  opacity?: number,
  transform?: TransformsType,
  filter?: FiltersType,
  backdropFilter?: FiltersType,
};

type AnnotationType = any;

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

type ElementCreatorType<T: ElementTypeType, S: ?StylesType, A: ?AnnotationType, P: Object> = P & {
  type: T,
  id?: string,
  annotation?: A,
  styles?: S,
};

export type ContainerElementType<
  E: ?$ReadOnlyArray<ElementType>,
  S: ?StylesType,
  A: ?AnnotationType,
>
  = ElementCreatorType<ContainerTypeType, S, A, {
  elements?: E,
}>;

type MediaLayoutType = 'fill' | 'fixed' | 'fixed-height' | 'flex-item' | 'nodisplay' | 'responsive';

type ImageElementPropsType = {
  alt?: string,
  source: string,
  width: number,
  height: number,
  layout: MediaLayoutType,
};
export type ImageElementType<S: ?StylesType, A: ?AnnotationType> =
  ElementCreatorType<ImageTypeType, S, A, ImageElementPropsType>;

type VideoSourceType = {
  source: string,
  type: string,
};
type VideoElementPropsType = {
  sources: $ReadOnlyArray<VideoSourceType>,
  loop?: true,
  autoplay?: true,
  width: number,
  height: number,
  layout: MediaLayoutType,
  poster?: string,
};
export type VideoElementType<S: ?StylesType, A: ?AnnotationType> =
  ElementCreatorType<VideoTypeType, S, A, VideoElementPropsType>;

export type MediaElementType<S, A> = ImageElementType<S, A> | VideoElementType<S, A>;

export type InlineTextStyleType = {
  start: number,
  length: number,
  styles: StylesType,
};

export type TextElementType<
  T: HeadingTypeType | ParagraphTypeType,
  S: ?StylesType,
  A: ?AnnotationType,
> = ElementCreatorType<T, S, A, { text: string, inlineStyles?: Array<InlineTextStyleType>, }>;
export type HeadingElementType<
  S: ?StylesType,
  A: ?AnnotationType,
> = TextElementType<HeadingTypeType, S, A>;
export type ParagraphElementType<
  S: ?StylesType,
  A: ?AnnotationType,
> = TextElementType<ParagraphTypeType, S, A>;

export type ElementType =
  | ContainerElementType<*, *, *>
  | TextElementType<*, *, *>
  | ImageElementType<*, *>
  | VideoElementType<*, *>;

export type FillLayerType<
  E: ?ElementType,
  S: ?StylesType,
  A: ?AnnotationType,
> = {|
  template: 'fill',
  annotation?: A,
  element?: E,
  styles?: S,
|};

type ThirdsElementType = { thirdIndex: 0 | 1 | 2, } & ElementType;

export type ThirdsLayerType<
  E: ?[ ThirdsElementType, ThirdsElementType, ThirdsElementType, ],
  S: ?StylesType,
  A: ?AnnotationType,
> = {|
  template: 'thirds',
  annotation?: A,
  elements?: E,
  styles?: S,
|};

export type VerticalLayerType<
  E: ?$ReadOnlyArray<ElementType>,
  S: ?StylesType,
  A: ?AnnotationType,
> = {|
  template: 'vertical',
  annotation?: A,
  elements?: E,
  styles?: S,
|};

export type HorizontalLayerType<
  E: ?$ReadOnlyArray<ElementType>,
  S: ?StylesType,
  A: ?AnnotationType,
> = {|
  template: 'horizontal',
  annotation?: A,
  elements?: E,
  styles?: S,
|};

export type LayerType =
  | FillLayerType<*, *, *>
  | ThirdsLayerType<*, *, *>
  | VerticalLayerType<*, *, *>
  | HorizontalLayerType<*, *, *>;

export type PageType<L: $ReadOnlyArray<LayerType>, A: ?AnnotationType> = {|
  id?: string,
  annotation?: A,
  autoAdvanceAfter?: string | number,
  layers: L,
|};

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

export type StoryPreviewType = {
  publisher: string,
  publisherLogoSrc: string,
  posterPortraitSrc: string,
  posterSquareSrc?: string,
  posterLandscapeSrc?: string,
};

export type StoryType = {
  title: string,
  preview: StoryPreviewType,
  canonicalUrl: string,
  meta?: string | StoryMetaType,
  customCss?: string,
  defaultStyles?: { [ElementTypeType]: StylesType, },
  pages?: $ReadOnlyArray<PageType<*, *>>,
  analytics?: Array<StoryAnalyticsType>,
  bookendConfigSrc?: string,
  autoAdsConfig?: Object,
};
