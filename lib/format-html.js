/* @flow */

import beautify from 'js-beautify';
import condense from 'condense-newlines';
import { textComponentToHtmlTagMap } from './component-to-html-tag';

const ampStyleBoilerplate = '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>';
export const ampStyleBoilerplatePlaceholder = '<div>REPLACE ME WITH AMP STYLE BOILERPLATE</div>';

const htmlOpts = {
  unformatted: ['code', 'pre', 'em', 'strong', 'span'],
  content_unformatted: ['pre', ...Object.values(textComponentToHtmlTagMap).map(String)],
  indent_inner_html: true,
  indent_char: ' ',
  indent_size: 2,
};

const condenseOpts = {
  sep: '\n',
};

export default (html: string) => condense(beautify.html(html, htmlOpts), condenseOpts)
  // Have to do this so that js-beautify doesn't add in pretty whitespace in the snippet,
  // thereby breaking AMP validation
  .replace(ampStyleBoilerplatePlaceholder, ampStyleBoilerplate);
