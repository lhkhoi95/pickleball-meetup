export enum PlayFrequency {
  ONCE = '1',
  TWO_TO_THREE = '2-3',
  FOUR_TO_FIVE = '4-5',
  SIX_PLUS = '6+',
}

export const FREQUENCY = [
  { value: PlayFrequency.ONCE, label: 'Once a week' },
  { value: PlayFrequency.TWO_TO_THREE, label: '2-3 times a week' },
  { value: PlayFrequency.FOUR_TO_FIVE, label: '4-5 times a week' },
  { value: PlayFrequency.SIX_PLUS, label: '6+ times a week' },
];
