// Data: Cycle des quintes, gammes

const CIRCLE_OF_FIFTHS = {
  sharps: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'],
  flats: ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb']
};

const ORDER_SHARPS = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const ORDER_FLATS = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

const SCALES = {
  'major-pentatonic': { name: 'Pentatonique majeure', intervals: [0, 2, 4, 7, 9] },
  'minor-pentatonic': { name: 'Pentatonique mineure', intervals: [0, 3, 5, 7, 10] },
  'major': { name: 'Majeure (Ionien)', intervals: [0, 2, 4, 5, 7, 9, 11] },
  // Add more: dorian [0,2,3,5,7,9,10], etc.
};

export { CIRCLE_OF_FIFTHS, ORDER_SHARPS, ORDER_FLATS, SCALES };