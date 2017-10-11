/* @flow */

type StyleType =
  'background' | 'backgroundColor' |
  'color' | 'fontFamily' | 'fontSize' |
  'margin' | 'marginTop' | 'marginBottom' | 'marginRight' | 'marginLeft' |
  'padding' | 'paddingTop' | 'paddingBottom' | 'paddingRight' | 'paddingLeft' |
  'justifyContent' | 'justifyItems' | 'alignItems' | 'alignContent';

export type StylesType = { [StyleType]: string, };

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
