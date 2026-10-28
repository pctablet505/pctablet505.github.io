// The play state of a stepped figure (Story.astro), kept apart from the page so its rules can be tested. Each change
// takes the milliseconds since the clock last started running, and banks them only while it runs.

export interface Clock {
  i: number; // the current step, from 0
  wanted: boolean; // the reader's choice: play on its own, or step by hand
  held: boolean; // paused in the middle of a step: the drawing holds where it is
  seen: boolean; // on screen
  left: number; // milliseconds left in this step
}

export const start = (ms: number, reduce: boolean): Clock => ({ i: 0, wanted: !reduce, held: false, seen: false, left: ms });

export const running = (c: Clock): boolean => c.wanted && c.seen;

// The drawing holds still off screen and while paused mid-step; otherwise it plays, even when the reader steps by hand.
export const frozen = (c: Clock): boolean => !c.seen || c.held;

const bank = (c: Clock, elapsed: number): Clock => (running(c) ? { ...c, left: Math.max(0, c.left - elapsed) } : c);

export const see = (c: Clock, seen: boolean, elapsed: number): Clock => ({ ...bank(c, elapsed), seen });

export function toggle(c: Clock, elapsed: number): Clock {
  const b = bank(c, elapsed);
  return { ...b, wanted: !b.wanted, held: b.wanted };
}

export function go(c: Clock, n: number, stages: { ms: number }[]): Clock {
  const i = (n + stages.length) % stages.length;
  return { ...c, i, left: stages[i].ms, held: false };
}

// The progress bar's animation delay: negative, so the bar starts as far along as the step already is.
export const barDelay = (c: Clock, ms: number): number => Math.round(c.left - ms);
