/* eslint-disable import/no-extraneous-dependencies */

import test from 'tape';
import storyJsonToStamp from './lib';

test('parsing', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    defaultStyles: {
      heading: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '5px',
        fontSize: '28px',
        fontFamily: '"MicSans", arial',
      },
      paragraph: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '5px',
        fontSize: '16px',
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
                  source: 'test.com/video.mp4',
                  type: 'mp4',
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
            elements: [
              {
                type: 'heading',
                text: 'This is a heading',
                styles: {
                  fontSize: '500px',
                  paddingTop: '500px',
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
                  paddingTop: '500px',
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
                  paddingTop: '500px',
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
                  paddingTop: '500px',
                },
              },
            ],
          },
        ],
      },
    ],
    canonicalUrl: 'https://mic.com/stories/1',
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
      }
      p {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px;
        font-size: 16px;
        font-family: "Graphik", arial;
      }
    </style>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="page-0">
        <amp-story-grid-layer template="fill">
          <amp-video layout="responsive" poster="test.com/poster.jpg" loop autoplay width="900" height="1600" src="test.com/video.mp4">
            <source type="video/mp4" src="test.com/video.mp4">
          </amp-video>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1 style="font-size: 500px; padding-top: 500px;">This is a heading</h1>
          <h1>This is a heading1</h1>
          <h2>This is a heading2</h2>
          <h3>This is a heading3</h3>
          <h4>This is a heading4</h4>
          <h5>This is a heading5</h5>
          <h6>This is a heading6</h6>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-1">
        <amp-story-grid-layer template="horizontal">
          <p>This is a paragraph<br>with two<br>newlines<br>in it</p>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-2">
        <amp-story-grid-layer template="thirds">
          <amp-img alt="An image" layout="responsive" width="900" height="1600" src="test.com/image.jpg" style="padding-top: 500px;" grid-area="upper-third"></amp-img>
          <amp-video layout="responsive" poster="test.com/poster.jpg" loop autoplay width="900" height="1600" src="test.com/video.mp4" style="padding-top: 500px;" grid-area="middle-third">
            <source type="video/mp4" src="test.com/video.mp4">
          </amp-video>
          <div style="padding-top: 500px;" grid-area="lower-third">
            <h1>This is a heading inside a container</h1>
          </div>
        </amp-story-grid-layer>
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
