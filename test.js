/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import test from 'tape';
import storyJsonToStamp, { convertToReactInlineStyle } from './lib';

test('parsing', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    canonicalUrl: 'https://mic.com/stories/1',
    meta: {
      images: ['mic.com/image'],
      datePublished: '2015-02-05T08:00:00+08:00',
      dateModified: '2015-02-05T09:20:00+08:00',
      author: 'Ryan Campbell',
      publisher: {
        name: 'Mic',
        logo: {
          url: 'mic.com/logo',
          height: 100,
          width: 100,
        },
      },
      description: 'Here be the description',
    },
    defaultStyles: {
      heading: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        fontSize: 28,
        fontFamily: '"MicSans", arial',
      },
      paragraph: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        fontSize: 16,
        fontFamily: '"Graphik", arial',
      },
    },
    pages: [
      {
        id: 'page-0',
        layers: [
          {
            template: 'fill',
            element: {
              type: 'video',
              sources: [
                {
                  source: 'test.com/video.m3u8',
                  type: 'application/x-mpegURL',
                },
              ],
              width: 900,
              height: 1600,
              layout: 'responsive',
              poster: 'test.com/poster.jpg',
              loop: true,
              autoplay: true,
            },
          },
          {
            template: 'vertical',
            styles: {
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            },
            elements: [
              {
                type: 'heading',
                text: 'This is a heading',
                styles: {
                  boxShadow: {
                    offset: { width: 5, height: 5 },
                    radius: 5,
                    color: '#000000',
                  },
                  textShadow: [{
                    offset: { width: 5, height: 5 },
                    radius: 5,
                    color: '#000000',
                  }],
                  transform: [
                    { rotate: '90deg' },
                    { translateX: '50%' },
                    { translateY: 50 },
                    { scale: 2 },
                  ],
                  filter: [
                    { blur: 3 },
                    { grayscale: '30%' },
                  ],
                  backdropFilter: [
                    { blur: 3 },
                    { grayscale: '30%' },
                  ],
                  backgroundLinearGradient: {
                    direction: '50deg',
                    stops: [{
                      color: 'red',
                      distance: 30,
                    }, {
                      color: 'blue',
                      distance: '50%',
                    }, {
                      color: 'black',
                    }],
                  },
                  fontSize: 500,
                  paddingTop: 500,
                },
              },
              {
                type: 'heading1',
                text: 'This is a heading1',
              },
              {
                type: 'heading2',
                text: 'This is a heading2',
              },
              {
                type: 'heading3',
                text: 'This is a heading3',
              },
              {
                type: 'heading4',
                text: 'This is a heading4',
              },
              {
                type: 'heading5',
                text: 'This is a heading5',
              },
              {
                type: 'heading6',
                text: 'This is a heading6',
              },
            ],
          },
        ],
      },
      {
        id: 'page-1',
        layers: [
          {
            template: 'horizontal',
            styles: {
              justifyContent: 'flex-start',
            },
            elements: [
              {
                type: 'paragraph',
                text: 'This is a paragraph\nwith two\rnewlines\r\nin it',
              },
            ],
          },
        ],
      },
      {
        id: 'page-2',
        layers: [
          {
            template: 'thirds',
            elements: [
              {
                type: 'image',
                source: 'test.com/image.jpg',
                alt: 'An image',
                width: 900,
                height: 1600,
                layout: 'responsive',
                styles: {
                  paddingTop: 500,
                },
              },
              {
                type: 'video',
                sources: [{
                  source: 'test.com/video.mp4',
                  type: 'mp4',
                }],
                width: 900,
                height: 1600,
                layout: 'responsive',
                poster: 'test.com/poster.jpg',
                loop: true,
                autoplay: true,
                styles: {
                  paddingTop: 500,
                },
              },
              {
                type: 'container',
                elements: [
                  {
                    type: 'heading',
                    text: 'This is a heading inside a container',
                  },
                ],
                styles: {
                  paddingTop: 500,
                },
              },
            ],
          },
        ],
      },
      {
        id: 'page-3',
        layers: [
          {
            template: 'vertical',
            styles: {
              alignItems: 'flex-end',
            },
            elements: [{
              type: 'container',
            }],
          },
          {
            template: 'fill',
          },
        ],
      },
    ],
    customCss: `@font-face {
  font-family: "Test";
  src:
    url("https://test.com/fonts/Test-Font.woff2") format("woff2"),
    url("https://test.com/fonts/Test-Font.woff") format("woff");
  font-weight: 500;
  font-style: normal;
}`,
  });

  const expected = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://stamp-prototype.appspot.com/v0.js"></script>
    <script async custom-element="amp-story" src="https://stamp-prototype.appspot.com/v0/amp-story-0.1.js"></script>
    <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
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
      @font-face {
        font-family: "Test";
        src: url("https://test.com/fonts/Test-Font.woff2") format("woff2"), url("https://test.com/fonts/Test-Font.woff") format("woff");
        font-weight: 500;
        font-style: normal;
      }
      h1 {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px;
        font-size: 28px;
        font-family: "MicSans", arial;
        grid-gap: 0;
      }
      p {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px;
        font-size: 16px;
        font-family: "Graphik", arial;
        grid-gap: 0;
      }
      .s-1 {
        -webkit-box-shadow: 5px 5px 5px #000000;
        box-shadow: 5px 5px 5px #000000;
        text-shadow: 5px 5px 5px #000000;
        -webkit-transform: rotate(90deg) translateX(50%) translateY(50px) scale(2);
        transform: rotate(90deg) translateX(50%) translateY(50px) scale(2);
        -webkit-filter: blur(3px) grayscale(30%);
        filter: blur(3px) grayscale(30%);
        -webkit-backdrop-filter: blur(3px) grayscale(30%);
        backdrop-filter: blur(3px) grayscale(30%);
        font-size: 500px;
        padding-top: 500px;
        background: linear-gradient(50deg, red 30px, blue 50%, black);
        grid-gap: 0;
      }
      .s-2 {
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        -ms-flex-line-pack: end;
        align-content: flex-end;
        justify-items: flex-end;
        grid-gap: 0;
      }
      .s-3 {
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -ms-flex-line-pack: start;
        align-content: flex-start;
        grid-gap: 0;
      }
      .s-4 {
        padding-top: 500px;
        grid-gap: 0;
      }
      .s-5 {
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        justify-items: flex-end;
        grid-gap: 0;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://mic.com/stories/1"
        },
        "headline": "A test story",
        "image": ["mic.com/image"],
        "datePublished": "2015-02-05T08:00:00+08:00",
        "dateModified": "2015-02-05T09:20:00+08:00",
        "author": {
          "@type": "Person",
          "name": "Ryan Campbell"
        },
        "description": "Here be the description",
        "publisher": {
          "publisher": {
            "@type": "Organization",
            "name": "Mic",
            "logo": {
              "@type": "ImageObject",
              "url": "mic.com/logo",
              "height": 100,
              "width": 100
            }
          }
        }
      }
    </script>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="page-0">
        <amp-story-grid-layer template="fill">
          <amp-video layout="responsive" poster="test.com/poster.jpg" loop autoplay width="900" height="1600" src="test.com/video.m3u8">
            <source type="application/x-mpegURL" src="test.com/video.m3u8">
          </amp-video>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical" class="s-2">
          <h1 class="s-1">This is a heading</h1>
          <h1>This is a heading1</h1>
          <h2>This is a heading2</h2>
          <h3>This is a heading3</h3>
          <h4>This is a heading4</h4>
          <h5>This is a heading5</h5>
          <h6>This is a heading6</h6>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-1">
        <amp-story-grid-layer template="horizontal" class="s-3">
          <p>This is a paragraph<br>with two<br>newlines<br>in it</p>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-2">
        <amp-story-grid-layer template="thirds">
          <amp-img alt="An image" layout="responsive" width="900" height="1600" src="test.com/image.jpg" grid-area="upper-third" class="s-4"></amp-img>
          <amp-video layout="responsive" poster="test.com/poster.jpg" loop autoplay width="900" height="1600" src="test.com/video.mp4" grid-area="middle-third" class="s-4">
            <source type="video/mp4" src="test.com/video.mp4">
          </amp-video>
          <div grid-area="lower-third" class="s-4">
            <h1>This is a heading inside a container</h1>
          </div>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-3">
        <amp-story-grid-layer template="vertical" class="s-5">
          <div></div>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="fill"></amp-story-grid-layer>
      </amp-story-page>
    </amp-story>
  </body>
</html>`;

  t.equal(actual, expected);

  const actualNoCustomCss = storyJsonToStamp({
    title: 'A test story',
    pages: [],
    canonicalUrl: 'https://mic.com/stories/1',
  });

  const expectedNoCustomCss = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://stamp-prototype.appspot.com/v0.js"></script>
    <script async custom-element="amp-story" src="https://stamp-prototype.appspot.com/v0/amp-story-0.1.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
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
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://mic.com/stories/1"
        },
        "headline": "A test story"
      }
    </script>
  </head>
  <body>
    <amp-story standalone></amp-story>
  </body>
</html>`;

  t.equal(actualNoCustomCss, expectedNoCustomCss);

  t.end();
});

test('analytics', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    pages: [],
    canonicalUrl: 'https://mic.com/stories/1',
    analytics: [{
      requests: {
        pageview: 'https://foo.com/pixel?RANDOM',
      },
      triggers: {
        trackPageview: {
          on: 'visible',
          request: 'pageview',
        },
      },
    }, {
      type: 'nielsen',
      vars: {
        apid: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        apv: '1.0',
        apn: 'Story',
        section: 'news',
        segA: 'Music',
      },
    }],
  });

  const expected = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://stamp-prototype.appspot.com/v0.js"></script>
    <script async custom-element="amp-story" src="https://stamp-prototype.appspot.com/v0/amp-story-0.1.js"></script>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
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
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://mic.com/stories/1"
        },
        "headline": "A test story"
      }
    </script>
  </head>
  <body>
    <amp-analytics>
      <script type="application/json">
        {
          "requests": {
            "pageview": "https://foo.com/pixel?RANDOM"
          },
          "triggers": {
            "trackPageview": {
              "on": "visible",
              "request": "pageview"
            }
          }
        }
      </script>
    </amp-analytics>
    <amp-analytics type="nielsen">
      <script type="application/json">
        {
          "vars": {
            "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "apv": "1.0",
            "apn": "Story",
            "section": "news",
            "segA": "Music"
          }
        }
      </script>
    </amp-analytics>
    <amp-story standalone></amp-story>
  </body>
</html>`;

  t.equal(actual, expected);
  t.end();
});

test('works with no options passed', (t) => {
  const actual = storyJsonToStamp();

  const expected = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://stamp-prototype.appspot.com/v0.js"></script>
    <script async custom-element="amp-story" src="https://stamp-prototype.appspot.com/v0/amp-story-0.1.js"></script>
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
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage"
        }
      }
    </script>
  </head>
  <body>
    <amp-story standalone></amp-story>
  </body>
</html>`;

  t.equal(actual, expected);
  t.end();
});

test('works with meta passed as string', (t) => {
  const actual = storyJsonToStamp({ meta: 'this is custom meta' });

  const expected = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://stamp-prototype.appspot.com/v0.js"></script>
    <script async custom-element="amp-story" src="https://stamp-prototype.appspot.com/v0/amp-story-0.1.js"></script>
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
    </style>
    this is custom meta
  </head>
  <body>
    <amp-story standalone></amp-story>
  </body>
</html>`;

  t.equal(actual, expected);
  t.end();
});

test('exports convertToReactInlineStyle function', (t) => {
  const actual = convertToReactInlineStyle({
    boxShadow: {
      offset: { width: 5, height: 5 },
      radius: 5,
      color: '#000000',
    },
    textShadow: [{
      offset: { width: 5, height: 5 },
      radius: 5,
      color: '#000000',
    }],
    transform: [
      { rotate: '90deg' },
      { translateX: 50 },
    ],
    filter: [
      { blur: 3 },
      { grayscale: '30%' },
    ],
    backdropFilter: [
      { blur: 3 },
      { grayscale: '30%' },
    ],
    backgroundLinearGradient: {
      direction: '50deg',
      stops: [{
        color: 'red',
        distance: 30,
      }, {
        color: 'blue',
        distance: '50%',
      }, {
        color: 'black',
      }],
    },
    fontSize: 500,
    paddingTop: 500,
  });

  const expected = {
    WebkitBoxShadow: '5px 5px 5px #000000',
    boxShadow: '5px 5px 5px #000000',
    textShadow: '5px 5px 5px #000000',
    WebkitTransform: 'rotate(90deg) translateX(50px)',
    transform: 'rotate(90deg) translateX(50px)',
    WebkitFilter: 'blur(3px) grayscale(30%)',
    filter: 'blur(3px) grayscale(30%)',
    WebkitBackdropFilter: 'blur(3px) grayscale(30%)',
    backdropFilter: 'blur(3px) grayscale(30%)',
    fontSize: '500px',
    paddingTop: '500px',
    background: 'linear-gradient(50deg, red 30px, blue 50%, black)',
    gridGap: '0',
  };

  t.deepEqual(actual, expected);
  t.end();
});
