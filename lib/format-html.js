/* @flow */

import beautify from 'js-beautify';
import condense from 'condense-newlines';
import { textComponentToHtmlTagMap } from './component-to-html-tag';

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

export default (html: string) => condense(beautify.html(html, htmlOpts), condenseOpts);
