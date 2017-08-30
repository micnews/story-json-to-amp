/* @flow */

import jsToCss from 'js-to-css';
import dasherize from 'dasherize';
import type { StoryType } from './types';

const ampElementScriptsMap = {
  video: '<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>',
};

const renderAmpElementScripts = elementsMap => Object.keys(elementsMap)
  .map(element => ampElementScriptsMap[element])
  .join('\n');

const makeProps = propsArray => propsArray.filter(Boolean).join(' ');

const indexToGridAreaMap = {
  '0': 'upper-third', // eslint-disable-line quote-props
  '1': 'middle-third', // eslint-disable-line quote-props
  '2': 'lower-third', // eslint-disable-line quote-props
};

const renderTextElement = tagName => ({ text, thirdIndex }) => {
  const props = makeProps([
    typeof thirdIndex === 'number' && `grid-area="${indexToGridAreaMap[thirdIndex]}"`,
  ]);

  return `<${tagName} ${props}>
    ${text}
  </${tagName}>`;
};

const renderDefaultStyles = defaultStyles => jsToCss(dasherize(defaultStyles));

export default ({ title, defaultStyles = {}, pages }: StoryType) => {
  const ampElementsThatNeedScripts = {};

  const elementTypeToRenderMap = {
    container: ({ elements, thirdIndex }) => {
      const props = makeProps([
        typeof thirdIndex === 'number' && `grid-area="${indexToGridAreaMap[thirdIndex]}"`,
      ]);

      /* eslint-disable no-use-before-define */
      return `<div ${props}>
        ${elements.map(element => renderElement(element)).join('\n')}
      </div>`;
      /* eslint-enable no-use-before-define */
    },
    heading: renderTextElement('h1'),
    heading1: renderTextElement('h1'),
    heading2: renderTextElement('h2'),
    heading3: renderTextElement('h3'),
    heading4: renderTextElement('h4'),
    heading5: renderTextElement('h5'),
    heading6: renderTextElement('h6'),
    paragraph: renderTextElement('p'),
    image: ({ alt, source, width, height, layout, thirdIndex }) => {
      const props = makeProps([
        alt && `alt="${alt}"`,
        `src="${source}"`,
        `width="${width}"`,
        `height="${height}"`,
        `layout="${layout}"`,
        `layout="${layout}"`,
        typeof thirdIndex === 'number' && `grid-area="${indexToGridAreaMap[thirdIndex]}"`,
      ]);

      return `<amp-img ${props}></amp-img>`;
    },
    video: ({ sources, loop, autoplay, width, height, layout, poster, thirdIndex }) => {
      ampElementsThatNeedScripts.video = true;

      const props = makeProps([
        `width="${width}"`,
        `height="${height}"`,
        `layout="${layout}"`,
        poster && `poster: "${poster}"`,
        loop && 'loop',
        autoplay && 'autoplay',
        typeof thirdIndex === 'number' && `grid-area="${indexToGridAreaMap[thirdIndex]}"`,
      ]);

      return `<amp-video ${props}>
        ${sources.map(({ source, type }) => `<source src=${source} type=${type} />`)}
      </amp-video>`;
    },
  };

  const renderElement = ({ type, ...layer }) => elementTypeToRenderMap[type](layer);

  const layerTemplateToRenderMap = {
    fill: ({ element }) => `<amp-story-grid-layer template='fill'>
      ${renderElement(element)}
    </amp-story-grid-layer>`,
    vertical: ({ elements }) => `<amp-story-grid-layer template='vertical'>
      ${elements.map(element => renderElement(element)).join('\n')}
    </amp-story-grid-layer>`,
    horizontal: ({ elements }) => `<amp-story-grid-layer template='horizontal'>
      ${elements.map(element => renderElement(element)).join('\n')}
    </amp-story-grid-layer>`,
    thirds: ({ elements }) => `<amp-story-grid-layer template='thirds'>
      ${elements
        .map((element, thirdIndex) => renderElement({ ...element, thirdIndex }))
        .join('\n')
      }
    </amp-story-grid-layer>`,
  };

  const renderLayer = ({ template, ...layer }) => layerTemplateToRenderMap[template](layer);

  const renderPage = ({ id, layers }) => `<amp-story-page id="${id}">
    ${layers.map(renderLayer).join('\n')}
  </amp-story-page>`;

  const renderPages = storyPages => `<amp-story>
    ${storyPages.map(renderPage).join('\n')}
  </amp-story>`;

  return `<!doctype html>
  <html amp amp-story lang="en">
    <head>
      <meta charset="utf-8">
      <script async src="https://stamp-prototype.appspot.com/v0.js"></script>
      <script async custom-element="amp-story" src="https://stamp-prototype.appspot.com/v0/amp-story-0.1.js"></script>
      ${renderAmpElementScripts(ampElementsThatNeedScripts)}
      <title>${title}</title>
      <link rel="canonical" href="http://example.ampproject.org/my-stamp.html" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
      <style amp-boilerplate>
        body {
          -webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
          -moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
          -ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
          animation:-amp-start 8s steps(1,end) 0s 1 normal both
        }

        @-webkit-keyframes -amp-start {
          from { visibility: hidden; }
          to{ visibility: visible; }
        }
        @-moz-keyframes -amp-start {
          from { visibility: hidden; }
          to { visibility: visible; }
        }
        @-ms-keyframes -amp-start {
          from { visibility: hidden; }
          to { visibility: visible; }
        }
        @-o-keyframes -amp-start {
          from { visibility: hidden; }
          to { visibility: visible; }
        }
        @keyframes -amp-start {
          from { visibility: hidden; }
          to { visibility: visible; }
        }
      </style>
      <noscript>
        <style amp-boilerplate>
          body {
            -webkit-animation: none;
            -moz-animation: none;
            -ms-animation:none;
            animation:none;
          }
        </style>
      </noscript>
      <style>
        ${renderDefaultStyles(defaultStyles)}
      </style>
    </head>
    <body>
      ${renderPages(pages)}
    </body>
  </html>`;
};
