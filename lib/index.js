/* @flow */

import toCss from 'to-css';
import dasherize from 'dasherize';
import format from './format';
import type { StoryType } from './types';

const ampElementScriptsMap = {
  video: '<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>',
};

const renderAmpElementScripts = elementsMap => Object.keys(elementsMap)
  .map(element => ampElementScriptsMap[element])
  .join('\n');

const renderCSS = styles => toCss(styles, { indent: '  ', property: dasherize }).slice(0, -1);
const renderInlineCSS = (styles) => {
  // This is a hack to get js-to-css to work with inline css
  const placeholderSelector = 'placeholder';
  const cssWithPlaceholder = renderCSS({ [placeholderSelector]: styles });

  // This removes the placeholderSelector, unnecessary curly braces around the CSS, and excess space
  return cssWithPlaceholder
    .slice(placeholderSelector.length + 5, cssWithPlaceholder.length - 2)
    .replace(/\n /g, '');
};

const indexToGridAreaMap = {
  '0': 'upper-third', // eslint-disable-line quote-props
  '1': 'middle-third', // eslint-disable-line quote-props
  '2': 'lower-third', // eslint-disable-line quote-props
};

const makeProps = (propsArray, styles, thirdIndex) => {
  const filteredProps = [
    ...propsArray,
    styles && `style="${renderInlineCSS(styles)}"`,
    typeof thirdIndex === 'number' && `grid-area="${indexToGridAreaMap[thirdIndex]}"`,
  ].filter(Boolean);

  return filteredProps.length ? ` ${filteredProps.join(' ')}` : '';
};

const renderTextElement = tagName => ({ text, styles, thirdIndex }) => {
  const props = makeProps([], styles, thirdIndex);

  return `<${tagName}${props}>${text}</${tagName}>`;
};

export default ({ title, defaultStyles, pages }: StoryType) => {
  const ampElementsThatNeedScripts = {};

  const elementTypeToRenderMap = {
    container: ({ elements, styles, thirdIndex }) => {
      const props = makeProps([], styles, thirdIndex);

      /* eslint-disable no-use-before-define */
      return `<div${props}>
        ${elements.map(element => renderElement(element)).join('')}
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
    image: ({ alt, source, width, height, layout, styles, thirdIndex }) => {
      const props = makeProps([
        alt && `alt="${alt}"`,
        `src="${source}"`,
        `width="${width}"`,
        `height="${height}"`,
        `layout="${layout}"`,
      ], styles, thirdIndex);

      return `<amp-img${props} />`;
    },
    video: ({ sources, loop, autoplay, width, height, layout, poster, styles, thirdIndex }) => {
      ampElementsThatNeedScripts.video = true;

      const props = makeProps([
        `width="${width}"`,
        `height="${height}"`,
        `layout="${layout}"`,
        poster && `poster="${poster}"`,
        loop && 'loop',
        autoplay && 'autoplay',
      ], styles, thirdIndex);

      return `<amp-video${props}>
        ${sources.map(({ source, type }) => `<source src="${source}" type="video/${type}" />`).join('')}
      </amp-video>`;
    },
  };

  const renderElement = ({ type, ...layer }) => elementTypeToRenderMap[type](layer);

  const layerTemplateToRenderMap = {
    fill: ({ element }) => `<amp-story-grid-layer template="fill">
      ${renderElement(element)}
    </amp-story-grid-layer>`,
    vertical: ({ elements }) => `<amp-story-grid-layer template="vertical">
      ${elements.map(element => renderElement(element)).join('')}
    </amp-story-grid-layer>`,
    horizontal: ({ elements }) => `<amp-story-grid-layer template="horizontal">
      ${elements.map(element => renderElement(element)).join('')}
    </amp-story-grid-layer>`,
    thirds: ({ elements }) => `<amp-story-grid-layer template="thirds">
      ${elements.map((element, thirdIndex) => renderElement({ ...element, thirdIndex })).join('')}
    </amp-story-grid-layer>`,
  };

  const renderPage = ({ id, layers }) => `<amp-story-page id="${id}">
    ${layers.map(({ template, ...layer }) => layerTemplateToRenderMap[template](layer)).join('')}
  </amp-story-page>`;

  const renderPages = storyPages => storyPages.map(renderPage).join('');

  // This has to happen first so that ampElementsThatNeedScripts will be filled
  const renderedPages = renderPages(pages);

  return format(`<!doctype html>
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
        ${renderCSS(defaultStyles)}
      </style>
    </head>
    <body>
      <amp-story>
        ${renderedPages}
      </amp-story>
    </body>
  </html>`);
};
