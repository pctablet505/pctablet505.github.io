// The master file itself, for AI tools that want everything at once.
import type { APIRoute } from 'astro';
import { profile } from '../lib/site';

export const GET: APIRoute = () =>
  new Response(profile.raw, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
