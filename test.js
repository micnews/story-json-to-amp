/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import test from 'tape';
import fs from 'fs';
import storyJsonToStamp, { convertToReactInlineStyle } from './lib';

test('parsing', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
      posterSquareSrc: 'https://mic.com/logo-square.jpg',
      posterLandscapeSrc: 'https://mic.com/logo-landscape.jpg',
    },
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
        annotation: 'annotation that should be stripped',
        autoAdvanceAfter: 5,
        layers: [
          {
            type: 'video',
            annotation: 'annotation that should be stripped',
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
          {
            type: 'container',
            styles: {
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            },
            elements: [
              {
                type: 'heading',
                text: 'This is a heading',
                styles: {
                  width: 10,
                  height: 10,
                  border: {
                    width: 1,
                    color: '#000000',
                    style: 'dashed',
                  },
                  borderRadius: 10,
                  boxShadow: {
                    offset: { x: 5, y: 5 },
                    blurRadius: 5,
                    spread: 10,
                    color: '#000000',
                  },
                  textShadow: [{
                    offset: { x: 5, y: 5 },
                    blurRadius: 5,
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
                text: '0123456789',
                inlineStyles: [{
                  start: 2,
                  length: 5,
                  styles: {
                    color: 'red',
                  },
                }, {
                  start: 4,
                  length: 5,
                  styles: {
                    fontStyle: 'italic',
                  },
                }],
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
        autoAdvanceAfter: 'this-is-a-video-id',
        layers: [
          {
            type: 'container',
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
            type: 'container',
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
            type: 'container',
            styles: {
              alignItems: 'flex-end',
            },
            elements: [{
              type: 'container',
            }],
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
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
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
        grid-gap: 0
      }
      p {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px;
        font-size: 16px;
        font-family: "Graphik", arial;
        grid-gap: 0
      }
      .s-1 {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        grid-gap: 0
      }
      .s-2 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        position: absolute;
        grid-gap: 0
      }
      .s-3 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        grid-gap: 0
      }
      .s-4 {
        width: 10px;
        height: 10px;
        border: 1px dashed #000000;
        border-radius: 10px;
        -webkit-box-shadow: 5px 5px 5px 10px #000000;
        box-shadow: 5px 5px 5px 10px #000000;
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
        grid-gap: 0
      }
      .s-5 {
        color: red;
        grid-gap: 0
      }
      .s-6 {
        font-style: italic;
        grid-gap: 0
      }
      .s-7 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        -ms-flex-line-pack: end;
        align-content: flex-end;
        justify-items: flex-end;
        grid-gap: 0
      }
      .s-8 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -ms-flex-line-pack: start;
        align-content: flex-start;
        grid-gap: 0
      }
      .s-9 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding-top: 500px;
        grid-gap: 0
      }
      .s-10 {
        padding-top: 500px;
        grid-gap: 0
      }
      .s-11 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        grid-gap: 0
      }
      .s-12 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        justify-items: flex-end;
        grid-gap: 0
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
    <amp-story standalone title="A test story" publisher="Mic" publisher-logo-src="https://mic.com/logo.jpg" poster-portrait-src="https://mic.com/logo-portrait.jpg" poster-square-src="https://mic.com/logo-square.jpg" poster-landscape-src="https://mic.com/logo-landscape.jpg">
      <amp-story-page id="page-0" auto-advance-after="5s">
        <amp-story-grid-layer template="fill">
          <div class="s-3">
            <div class="s-2">
              <amp-video layout="responsive" poster="test.com/poster.jpg" loop autoplay width="900" height="1600" class="s-1">
                <source type="application/x-mpegURL" src="test.com/video.m3u8">
              </amp-video>
            </div>
          </div>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="fill">
          <div class="s-3">
            <div class="s-2">
              <div class="s-7">
                <h1 class="s-4">This is a heading</h1>
                <h1>01<span class="s-5">23</span><span class="s-5 s-6">456</span><span class="s-6">78</span>9</h1>
                <h2>This is a heading2</h2>
                <h3>This is a heading3</h3>
                <h4>This is a heading4</h4>
                <h5>This is a heading5</h5>
                <h6>This is a heading6</h6>
              </div>
            </div>
          </div>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-1" auto-advance-after="this-is-a-video-id">
        <amp-story-grid-layer template="fill">
          <div class="s-3">
            <div class="s-2">
              <div class="s-8">
                <p>This is a paragraph<br>with two<br>newlines<br>in it</p>
              </div>
            </div>
          </div>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-2">
        <amp-story-grid-layer template="fill">
          <div class="s-3">
            <div class="s-2">
              <div class="s-11">
                <amp-img alt="An image" layout="responsive" width="900" height="1600" src="test.com/image.jpg" class="s-9"></amp-img>
                <amp-video layout="responsive" poster="test.com/poster.jpg" loop autoplay width="900" height="1600" class="s-10">
                  <source type="video/mp4" src="test.com/video.mp4">
                </amp-video>
                <div class="s-9">
                  <h1>This is a heading inside a container</h1>
                </div>
              </div>
            </div>
          </div>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-3">
        <amp-story-grid-layer template="fill">
          <div class="s-3">
            <div class="s-2">
              <div class="s-12">
                <div class="s-3"></div>
              </div>
            </div>
          </div>
        </amp-story-grid-layer>
      </amp-story-page>
    </amp-story>
  </body>
</html>`;

  t.equal(actual, expected);

  const actualNoCustomCss = storyJsonToStamp({
    title: 'A test story',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
    },
    pages: [],
    canonicalUrl: 'https://mic.com/stories/1',
  });

  const expectedNoCustomCss = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
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
    <amp-story standalone title="A test story" publisher="Mic" publisher-logo-src="https://mic.com/logo.jpg" poster-portrait-src="https://mic.com/logo-portrait.jpg"></amp-story>
  </body>
</html>`;

  t.equal(actualNoCustomCss, expectedNoCustomCss);

  t.end();
});

test('analytics', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
    },
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
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
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
    <amp-story standalone title="A test story" publisher="Mic" publisher-logo-src="https://mic.com/logo.jpg" poster-portrait-src="https://mic.com/logo-portrait.jpg">
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
    </amp-story>
  </body>
</html>`;

  t.equal(actual, expected);
  t.end();
});

test('works with minimum options passed', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    canonicalUrl: 'https://mic.com/stories/1',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
    },
  });

  const expected = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
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
    <amp-story standalone title="A test story" publisher="Mic" publisher-logo-src="https://mic.com/logo.jpg" poster-portrait-src="https://mic.com/logo-portrait.jpg"></amp-story>
  </body>
</html>`;

  t.equal(actual, expected);
  t.end();
});

test('works with meta passed as string', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    canonicalUrl: 'https://mic.com/stories/1',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
    },
    meta: 'this is custom meta',
  });

  const expected = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
    </style>
    this is custom meta
  </head>
  <body>
    <amp-story standalone title="A test story" publisher="Mic" publisher-logo-src="https://mic.com/logo.jpg" poster-portrait-src="https://mic.com/logo-portrait.jpg"></amp-story>
  </body>
</html>`;

  t.equal(actual, expected);
  t.end();
});

test('exports convertToReactInlineStyle function', (t) => {
  const actual1 = convertToReactInlineStyle({
    boxShadow: {
      offset: { x: 5, y: 5 },
      blurRadius: 5,
      spread: 10,
      color: '#000000',
    },
    textShadow: [{
      offset: { x: 5, y: 5 },
      blurRadius: 5,
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

  const expected1 = {
    boxShadow: '5px 5px 5px 10px #000000',
    textShadow: '5px 5px 5px #000000',
    transform: 'rotate(90deg) translateX(50px)',
    filter: 'blur(3px) grayscale(30%)',
    backdropFilter: 'blur(3px) grayscale(30%)',
    fontSize: '500px',
    paddingTop: '500px',
    background: 'linear-gradient(50deg, red 30px, blue 50%, black)',
    gridGap: '0',
  };

  t.deepEqual(actual1, expected1);

  const actual2 = convertToReactInlineStyle();

  const expected2 = { gridGap: '0' };

  t.deepEqual(actual2, expected2);

  t.end();
});

test('bookendConfigSrc', (t) => {
  const actual = storyJsonToStamp({
    title: 'A test story',
    canonicalUrl: 'https://mic.com/stories/1',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
    },
    bookendConfigSrc: 'https://example.com/bookend',
  });

  const expected = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>A test story</title>
    <link rel="canonical" href="https://mic.com/stories/1" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
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
    <amp-story standalone bookend-config-src="https://example.com/bookend" title="A test story" publisher="Mic" publisher-logo-src="https://mic.com/logo.jpg" poster-portrait-src="https://mic.com/logo-portrait.jpg"></amp-story>
  </body>
</html>`;

  t.equal(actual, expected);
  t.end();
});

test('Hello World', (t) => {
  const actual = storyJsonToStamp({
    version: 1,
    title: 'Hello World',
    canonicalUrl: 'https://mic.com/stories/1',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
    },
    pages: [
      {
        layers: [
          {
            type: 'container',
            styles: {
              flex: 1,
              backgroundColor: '#87d687',
            },
          },
          {
            type: 'container',
            styles: {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            },
            elements: [
              {
                type: 'heading',
                text: 'Hello World',
              },
            ],
          },
        ],
      },
    ],
    defaultStyles: {
      heading: {
        fontFamily: 'sans-serif',
      },
    },
  });

  const expected = fs.readFileSync('hello-world.amp.html', 'utf8').trimRight();
  t.equal(actual, expected);
  t.end();
});

test('Inline text', (t) => {
  const actual = storyJsonToStamp({
    version: 1,
    title: 'Hello World',
    canonicalUrl: 'https://mic.com/stories/1',
    preview: {
      publisher: 'Mic',
      publisherLogoSrc: 'https://mic.com/logo.jpg',
      posterPortraitSrc: 'https://mic.com/logo-portrait.jpg',
    },
    pages: [
      {
        layers: [
          {
            type: 'container',
            styles: {
              flex: 1,
              backgroundColor: '#87d687',
            },
          },
          {
            type: 'container',
            styles: {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            },
            elements: [
              {
                styles: {
                  display: 'inline',
                },
                type: 'heading',
                text: 'Hello World',
              },
            ],
          },
        ],
      },
    ],
    defaultStyles: {
      heading: {
        fontFamily: 'sans-serif',
      },
    },
  });

  const expected = fs.readFileSync('inline-text.amp.html', 'utf8').trimRight();
  t.equal(actual, expected);
  t.end();
});
