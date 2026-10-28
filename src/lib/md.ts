// Markdown from PROFILE.md to HTML. Raw HTML in the source is shown as text, never rendered.
import { Marked } from 'marked';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const marked = new Marked({ gfm: true });
marked.use({
  renderer: {
    html({ text }) {
      return escape(text);
    },
  },
});

export const md = (s: string | undefined): string => (s ? (marked.parse(s, { async: false }) as string) : '');
export const mdInline = (s: string | undefined): string =>
  s ? (marked.parseInline(s, { async: false }) as string) : '';
