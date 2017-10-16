/* @flow */

import makeTag from 'html-tag';
import type { StoryAnalyticsType } from '../flow-types';

export default (analytics: $ReadOnlyArray<StoryAnalyticsType>) => (
  analytics.map(({ type, ...opts }) => makeTag(
    'amp-analytics',
    { type },
    makeTag('script', { type: 'application/json' }, JSON.stringify(opts)),
  )).join('')
);
