import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

type RichTextRendererProps = {
  json: any;
};

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => {
      return `<strong>${text}</strong>`;
    },
  },
  renderNode: {
    [BLOCKS.UL_LIST]: (node: any, next: any) => {
      return `<ul class="list-disc pl-4 space-y-1">${next(node.content)}</ul>`;
    },
    [BLOCKS.OL_LIST]: (node: any, next: any) => {
      return `<ul class="list-decimal pl-4 space-y-1">${next(node.content)}</ul>`;
    },
    [BLOCKS.HEADING_3]: (node: any, next: any) => {
      return `<h3 class="text-[1.35rem] font-semibold mb-2">${next(node.content)}</h3>`;
    },
    [BLOCKS.HEADING_4]: (node: any, next: any) => {
      return `<h4 class="text-xl font-semibold mb-2">${next(node.content)}</h4>`;
    },
    [INLINES.HYPERLINK]: (node: any) => {
      const { uri } = node.data as { uri: string }; // Type assertion for node.data
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
