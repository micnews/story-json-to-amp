import makeTag from 'html-tag';

export default analytics => analytics.map(({ type, ...opts }) => makeTag(
  'amp-analytics',
  { type },
  makeTag('script', { type: 'application/json' }, JSON.stringify(opts)),
)).join('');
