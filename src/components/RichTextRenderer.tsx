import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

type RichTextRendererProps = {
  json: any;
};

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => {
      return `<strong>${text}</strong>`;
    },
  },
  renderNode: {
    [BLOCKS.UL_LIST]: (node, next) => {
      return `<ul class="list-disc pl-4 space-y-1">${next(node.content)}</ul>`;
    },
    [INLINES.HYPERLINK]: (node) => {
      const { uri } = node.data;
      return `<a href="${uri}" class="text-amber-300 hover:underline">${node.content[0].value}</a>`;
    },
  },
};

const RichTextRenderer = ({ json }: RichTextRendererProps) => (
  <div
    className="space-y-6 leading-7"
    dangerouslySetInnerHTML={{ __html: documentToHtmlString(json, options) }}
  />
);

export default RichTextRenderer;
