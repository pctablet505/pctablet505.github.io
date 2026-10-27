// PROFILE.md, parsed and checked, as JSON: the one machine-readable form for other tools and AI screeners.
import type { APIRoute } from 'astro';
import { SECTIONS, type Entry } from '../lib/profile';
import { profile } from '../lib/site';

const clean = (e: Entry) => {
  const { fields: _fields, section: _section, line, ...rest } = e;
  const out: Record<string, unknown> = { ...rest, profile_line: line };
  for (const [k, v] of Object.entries(out)) {
    if (v === undefined || (Array.isArray(v) && v.length === 0) || v === '') delete out[k];
  }
  return out;
};

export const GET: APIRoute = () => {
  const body: Record<string, unknown> = {
    source: 'https://github.com/pctablet505/pctablet505.github.io/blob/main/PROFILE.md',
    format: 'https://github.com/pctablet505/pctablet505.github.io/blob/main/docs/PROFILE-FORMAT.md',
    identity: profile.identity,
    about: profile.about,
  };
  for (const s of SECTIONS) {
    if (s === 'Identity' || s === 'About') continue;
    body[s.toLowerCase().replace(/ /g, '_')] = profile.entries.filter((e) => e.section === s).map(clean);
  }
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
