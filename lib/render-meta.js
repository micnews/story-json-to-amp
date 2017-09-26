/* @flow */

import type { StoryMetaType } from './types';

const wrapMeta = string => `<script type="application/ld+json">
  ${string}
</script>`;

export default (storyMeta: StoryMetaType) => {
  if (typeof storyMeta === 'string') {
    return wrapMeta(storyMeta);
  }

  const {
    title,
    canonicalUrl,
    images,
    datePublished,
    dateModified,
    author,
    publisher,
    description,
  } = storyMeta;

  const json: Object = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: title,
    image: images && images.length && images,
    datePublished,
    dateModified,
    author: author && {
      '@type': 'Person',
      name: author,
    },
    description,
  };


  if (publisher) {
    json.publisher = {
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        logo: {
          '@type': 'ImageObject',
          ...publisher.logo,
        },
      },
    };
  }

  return wrapMeta(JSON.stringify(json));
};
