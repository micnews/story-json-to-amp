import toCss from 'to-css';
import dasherize from 'dasherize';

export const renderCSS = styles => toCss(styles, { indent: '  ', property: dasherize }).slice(0, -1);
export const renderInlineCSS = styles => renderCSS(styles).replace(/\n/g, ' ') || undefined;
