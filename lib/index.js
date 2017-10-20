/* @flow */

import format from './format-html';
import renderCSS, { convertToReactInlineStyle as _convertToReactInlineStyle } from './render-css';
import createRenderTag from './render-tag';
import renderMeta from './render-meta';
import renderAnalytics from './render-analytics';
import componentToHtmlTagMap, { textComponentToHtmlTagMap } from './component-to-html-tag';
import createCssExtractor from './css-extractor';
import type { StoryType } from '../flow-types';

const ampElementScriptsMap = {
  video: '<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>',
  analytics: '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>',
};

const renderAmpElementScripts = elementsMap => Object.keys(elementsMap)
  .map(element => ampElementScriptsMap[element])
  .join('\n');

const createRenderTextElement = renderTag => tagName => ({ text, ...props }) => renderTag(
  tagName,
  props,
  text.replace(/\r\n|\r|\n/g, '<br>'),
);

const textComponents = Object.keys(textComponentToHtmlTagMap);
export default ({
  title,
  defaultStyles = {},
  pages = [],
  canonicalUrl,
  meta,
  customCss = '',
  analytics = [],
}: StoryType = {}) => {
  const ampElementsThatNeedScripts = {};

  if (analytics.length > 0) {
    ampElementsThatNeedScripts.analytics = true;
  }

  const { appendStyles, getCombinedCss } = createCssExtractor();

  const renderTag = createRenderTag(appendStyles);
  const renderTextElement = createRenderTextElement(renderTag);

  const elementTypeToRenderMap = {
    ...textComponents.reduce((accum, componentName) => ({
      ...accum,
      [componentName]: renderTextElement(textComponentToHtmlTagMap[componentName]),
    }), {}),
    container: ({ elements = [], ...props }) => renderTag(
      componentToHtmlTagMap.container,
      props,
      elements.map(element => renderElement(element)).join(''),    // eslint-disable-line no-use-before-define
    ),
    image: props => renderTag(componentToHtmlTagMap.image, props),
    video: ({ sources, ...props }) => {
      ampElementsThatNeedScripts.video = true;

      return renderTag(
        componentToHtmlTagMap.video,
        {
          ...props,
          source: sources[0].source,
        },
        sources.map(({ source, type }) => renderTag(
          'source',
          { source, type: type.split('/').length === 1 ? `video/${type}` : type },
        )).join(''),
      );
    },
  };

  const renderElement = ({ type, ...layer }) => elementTypeToRenderMap[type](layer);

  const renderAmpStoryGridLayer = ({ template, styles }, children) => renderTag(
    'amp-story-grid-layer',
    { template, styles },
    children,
  );

  const layerTemplateToRenderMap = {
    fill: ({ element, styles }) => renderAmpStoryGridLayer(
      { template: 'fill', styles },
      element ? renderElement(element) : undefined,
    ),
    vertical: ({ elements, styles }) => renderAmpStoryGridLayer(
      { template: 'vertical', styles },
      elements && elements.map(element => renderElement(element)).join(''),
    ),
    horizontal: ({ elements, styles }) => renderAmpStoryGridLayer(
      { template: 'horizontal', styles },
      elements && elements.map(element => renderElement(element)).join(''),
    ),
    thirds: ({ elements, styles }) => renderAmpStoryGridLayer(
      { template: 'thirds', styles },
      elements && elements.map((element, thirdIndex) => renderElement({ ...element, thirdIndex })).join(''),
    ),
  };

  const renderPage = ({ id, layers }) => renderTag(
    'amp-story-page',
    { id },
    layers.map(({ template, ...layer }) => layerTemplateToRenderMap[template](layer)).join(''),
  );

  const renderStory = storyPages => renderTag(
    'amp-story',
    { standalone: true },
    storyPages.map(renderPage).join(''),
  );

  // This has to happen first so that acmpElementsThatNeedScripts will be filled
  const renderedStory = renderStory(pages);

  return format(`<!doctype html>
  <html ⚡ lang="en">
    <head>
      <meta charset="utf-8">
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-0.1.js"></script>
      ${renderAmpElementScripts(ampElementsThatNeedScripts)}
      ${title ? `<title>${title}</title>` : ''}
      ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}" />` : ''}
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
      <style amp-boilerplate>
        body {
          -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        }
        @-webkit-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-moz-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-ms-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-o-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
      </style>
      <noscript>
        <style amp-boilerplate>
          body {
            -webkit-animation: none;
            -moz-animation: none;
            -ms-animation: none;
            animation: none;
          }
        </style>
      </noscript>
      <style>
        ${customCss}${renderCSS({ ...defaultStyles, ...getCombinedCss() })}
      </style>
      ${typeof meta === 'string' ? meta : renderMeta({
        title,
        canonicalUrl,
        ...meta,
      })}
    </head>
    <body>
      ${renderAnalytics(analytics)}
      ${renderedStory}
    </body>
  </html>`);
};

export const convertToReactInlineStyle = _convertToReactInlineStyle;
