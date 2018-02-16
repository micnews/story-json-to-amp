# story-json-to-amp

Compile `story-json` documents into [AMP stories](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md).

Not all features of `story-json` format are supported at the moment, open an issue if you need something that isn't supported yet. PRs are always welcome too.

## Usage

```js
import storyJsonToAmp from 'story-json-to-amp';

const ampHtml = storyJsonToAmp({
  canonicalUrl: "https://example.com/story",
  body: <story json content>,
  customCss: <custom css to append to the document>
});
```

## Example

Story example:

https://mic.com/stories/327/what-happens-in-your-brain-when-you-listen-to-music

## License

MIT
