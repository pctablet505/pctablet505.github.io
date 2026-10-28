// The stepped figures on five case-study pages: each step's title, caption and length. Numbers come from the entry's
// numbers in PROFILE.md, so a step never states a figure its page does not. Cards keep the short loops.
import { profile } from './site';

export interface Stage {
  title: string;
  text: string;
  ms: number;
}
export interface StoryDef {
  caption: string;
  stages: Stage[];
}

export function num(entry: string, id: string): string {
  const v = profile.byId.get(entry)?.numbers.find((n) => n.id === id)?.value;
  if (!v) throw new Error(`stories: number "${id}" is missing from ${entry} in PROFILE.md`);
  return v;
}

// "70% → 90%+" -> ["70%", "90%+"]
export const sides = (v: string): [string, string] => {
  const [a, b] = v.split('→').map((s) => s.trim());
  if (!a || !b) throw new Error(`stories: "${v}" is not a before → after value`);
  return [a, b];
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const bc = (id: string) => num('damaged-barcodes', id);
const [sdk, ours] = sides(bc('read-rate'));
const fr = (id: string) => num('face-recognition', id);
const [scan, tree] = sides(fr('lookup'));
const dd = (id: string) => num('drop-detection', id);
const [accBefore, accAfter] = sides(dd('accuracy'));
const handLong = num('behavioural-identification', 'hand').match(/^(\S+) over (\S+) s$/);
if (!handLong) throw new Error('stories: behavioural-identification "hand" should read "<accuracy> over <time> s"');

export const STORIES: Record<string, StoryDef> = {
  'damaged-barcodes': {
    caption:
      'Illustration drawn by code, not a recording: a real EAN-13 encoding is made, damaged, found, restored, named and read, and a code beyond repair is refused.',
    stages: [
      { title: 'Make the data', text: "Every training image starts as a random string that follows its format's rules, drawn as a real barcode.", ms: 6500 },
      { title: 'Damage it on purpose', text: 'Then the damage is added on purpose: blur, lines, spots, glare, reflections, tears and scratches, each drawn from a probability model.', ms: 7000 },
      { title: 'Make it a photo', text: `Perspective, curvature and light turn it into a camera view on a real object. Its labels move with it and never leave the picture. ${bc('synthetic-images')} images in all.`, ms: 7000 },
      { title: 'Find it, cut it out', text: 'YOLO finds the barcode in the photo, and Mask R-CNN cuts it out along its edges.', ms: 6500 },
      { title: 'Restore the bars', text: 'A U-Net trained pixel to pixel turns the damaged bars back into clean ones.', ms: 6500 },
      { title: 'Name the format', text: `A classifier names the format, one of ${bc('formats')} 1D formats, because each format is read in its own way.`, ms: 6000 },
      { title: 'Read, or refuse', text: 'An open-source decoder reads the restored code, and a confidence score decides: read it, or refuse rather than guess. A wrong read costs more than no read.', ms: 8000 },
      { title: 'The result', text: `On its damaged test set it read ${ours} of codes correctly, where a commercial scanning SDK read ${sdk}. ${cap(bc('scan-clean'))} per scan, ${bc('scan-damaged')} when damaged, with each model ${bc('model-size')}.`, ms: 7500 },
    ],
  },
  'face-recognition': {
    caption:
      'Illustration drawn by code, not a recording: faces drawn from simple curves are found, turned into numbers and matched through a tree index.',
    stages: [
      { title: 'Find every face', text: 'The old detector missed faces. A different detector finds the faces it missed.', ms: 6500 },
      { title: 'Turn a face into numbers', text: "Each face becomes an embedding: a list of numbers that lands close to the same person's other faces.", ms: 6500 },
      { title: 'Search in steps, not one by one', text: `Comparing a face with each of ${fr('users')} registered users took ${scan}. A tree index walks a few branches instead: ${tree} per lookup.`, ms: 8000 },
      { title: 'Known, or unknown', text: 'The nearest stored face names the person. A face close to none of them is marked unknown.', ms: 6000 },
      { title: 'Every camera is different', text: 'Photos are the easy case. Front and back phone cameras and video each behave differently, so it was tested on live feeds.', ms: 7000 },
      { title: 'One engine, many apps', text: `It runs on Android, Windows and Linux: ${fr('accuracy')} accuracy on our own test set, at ${fr('fps')}. The exam-proctoring platform is one app built on it.`, ms: 7500 },
    ],
  },
  'drop-detection': {
    caption:
      'Illustration drawn by code, not a recording: the fall time follows from the physics of a 1 m fall; the impact, surface and toss shapes are drawn to show the idea.',
    stages: [
      { title: 'At rest', text: 'A phone at rest reads about 1 g, from gravity alone.', ms: 5000 },
      { title: 'Free fall', text: 'Falling, it reads close to 0 g. The time spent near 0 g gives the height: h = g·t²/2.', ms: 7000 },
      { title: 'Impact', text: 'The impact is a spike, and its shape tells the surface: a hard surface rings sharply, a soft bed barely does.', ms: 7000 },
      { title: 'Not every fall is a drop', text: 'Toss a phone and catch it, and it is in free fall too. A catch slows it gently, with no impact spike, so it is not counted.', ms: 7000 },
      { title: 'Motion sensors only', text: 'Everything comes from the motion sensors, turned into a handful of features: fall time, peak, ringing and settling.', ms: 6000 },
      { title: 'A model under 22 parameters', text: `Small statistical models on those features replaced a deep network of millions of parameters. Power fell by ${dd('power')}, and accuracy went from ${accBefore} to ${accAfter}.`, ms: 8000 },
    ],
  },
  'crash-detection': {
    caption:
      'Illustration drawn by code, not a recording: the sensor traces are drawn to show which signals move together in each case.',
    stages: [
      { title: 'Four signals at once', text: 'The phone reads its accelerometer, gyroscope, pressure and sound together. Normal driving barely moves them.', ms: 6500 },
      { title: 'Rash driving is not a crash', text: "Hard braking and sharp turns push the readings up, but not to a crash's level. The model sorts normal, rash and extreme cases.", ms: 7000 },
      { title: 'Look-alikes', text: 'A thrown phone, loud music or a film can spike one signal. One signal alone is not enough, and the model was tuned against each kind of false alarm.', ms: 7000 },
      { title: 'A crash', text: 'In a crash, g-force spikes past any driving, sound and pressure catch the airbag, and the gyroscope catches a roll.', ms: 8000 },
      { title: 'SOS', text: 'When the signals agree, the phone sends an SOS to the contacts the user chose.', ms: 6000 },
      { title: 'Tested without crashing cars', text: 'Real crash data is rare, so crashes were simulated with a toy car carrying a phone. Everything that is not a crash was recorded for real.', ms: 7000 },
    ],
  },
  'behavioural-identification': {
    caption:
      'Illustration drawn by code, not a recording: the swipes, taps and meters are drawn to show the idea.',
    stages: [
      { title: 'The hand shows in touch and motion', text: 'Used in one hand, a phone is worked by the thumb, and that leaves cues in touch and motion. One drawn here: a thumb swipe pivots on its joint, so its curve differs between the hands.', ms: 6500 },
      { title: 'Taps and tilt', text: 'Where taps land and how the phone sits in the hand are cues of the same kind. An Android service works out the hand in real time.', ms: 6500 },
      { title: 'Evidence adds up', text: `Each swipe and tap adds a little evidence. Over ${handLong[2]} seconds of use it names the hand ${handLong[1]} of the time; over shorter windows, about ${num('behavioural-identification', 'hand-short')}.`, ms: 8000 },
      { title: 'Who is holding it?', text: 'The hand is the first signal. Swipes, taps, walking pattern and other sensor data describe how each person handles the phone.', ms: 7000 },
      { title: 'Keep checking', text: 'It checks all the time. When the pattern stops matching the owner, access can be limited: against theft, or a colleague picking the phone up.', ms: 7000 },
      { title: 'Small models, always on', text: 'No deep learning: the models are small enough to run all the time on the phone. Used in a deliberately odd way, it could still be fooled.', ms: 6500 },
    ],
  },
};
