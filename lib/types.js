/* @flow */

type StyleType =
  'background' | 'backgroundColor' |
  'color' | 'fontFamily' | 'fontSize' |
  'margin' | 'marginTop' | 'marginBottom' | 'marginRight' | 'marginLeft' |
  'padding' | 'paddingTop' | 'paddingBottom' | 'paddingRight' | 'paddingLeft';

type StylesType = { [StyleType]: string, };

type ContainerTypeType = 'container';
type ImageTypeType = 'image';
type VideoTypeType = 'video';
type HeadingTypeType = 'heading';
type ParagraphTypeType = 'paragraph';
type ElementTypeType =
  ContainerTypeType |
  HeadingTypeType | ParagraphTypeType |
  ImageTypeType | VideoTypeType;

type ElementCreatorType<Type: ElementTypeType, Props: Object> = Props & {
  type: Type,
  styles?: StylesType,
  thirdIndex?: 0 | 1 | 2,
};

// eslint-disable-next-line no-use-before-define
type ContainerType = ElementCreatorType<ContainerTypeType, { elements: Array<ElementType>, }>;

type MediaLayoutType = 'fill' | 'fixed' | 'fixed-height' | 'flex-item' | 'nodisplay' | 'responsive';

type ImageElementPropsType = {
  alt?: string,
  source: string,
  width: number,
  height: number,
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
  element: ElementType,
};

type ThirdsPageLayerType = {
  template: 'thirds',
  elements: [ ElementType, ElementType, ElementType, ],
};

type PageLayerType = FillPageLayerType | ThirdsPageLayerType | {
  template: 'vertical' | 'horizontal',
  elements: Array<ElementType>,
};

type PageType = {
  id: string,
  layers: Array<PageLayerType>,
};

export type StoryType = {
  title: string,
  customCss?: string,
  defaultStyles?: { [ElementTypeType]: StylesType, },
  pages: Array<PageType>,
  canonicalUrl: string,
};
