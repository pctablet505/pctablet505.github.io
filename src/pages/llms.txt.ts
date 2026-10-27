// A short guide to the site for AI tools (llms.txt): who this is, then every page worth reading, with one line each.
import type { APIRoute } from 'astro';
import { AREA_META, AREA_ORDER, entryHref, identity, isExternal, section, workIn, byPriority } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const abs = (href: string) => (isExternal(href) ? href : new URL(href, site).href);
  const lines: string[] = [
    `# ${identity.handle} (${identity.name})`,
    '',
    `> ${identity.headline}. ${identity.lede ?? ''}`.trim(),
    '',
    `Every fact on this site comes from one file. Full text: ${abs('/llms-full.txt')}. Structured: ${abs('/profile.json')}.`,
    '',
  ];
  for (const a of AREA_ORDER) {
    lines.push(`## ${AREA_META[a].label}`, '');
    for (const e of workIn(a)) lines.push(`- [${e.title}](${abs(entryHref(e))}): ${e.one_line ?? ''}`);
    lines.push('');
  }
  lines.push('## Pages', '');
  for (const [t, p] of [
    ['Experience', '/experience/'], ['Open source', '/open-source/'], ['Writing', '/writing/'], ['Notes', '/notes/'],
    ['Demos', '/demos/'], ['Education and certificates', '/certificates/'], ['About', '/about/'],
  ]) lines.push(`- [${t}](${abs(p)})`);
  lines.push('', '## Writing', '');
  for (const e of byPriority(section('Writing'))) lines.push(`- [${e.title}](${e.url}) (${e.venue}, ${e.date})`);
  lines.push('', '## Contact', '');
  if (identity.email) lines.push(`- Email: ${identity.email}`);
  for (const l of identity.links) lines.push(`- ${l.label}: ${l.url}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
