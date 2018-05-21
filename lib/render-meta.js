/* @flow 
* for google structured data validation see
* https://search.google.com/structured-data/testing-tool
*/

import type { StoryMetaType } from '../flow-types';

export default (storyMeta: StoryMetaType) => {
  const {
    title,
    canonicalUrl,
    images,
    datePublished,
    dateModified,
    author,
    authorType,
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
      '@type': authorType,
      name: author,
    },
    description,
  };


  if (publisher) {
    json.publisher = {
        '@type': 'Organization',
        name: publisher.name,
        logo: {
          '@type': 'ImageObject',
          ...publisher.logo,
        }
    };
  }

  return `<script type="application/ld+json">
  ${JSON.stringify(json)}
</script>`;
};
