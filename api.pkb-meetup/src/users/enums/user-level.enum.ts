export enum UserLevel {
  BEGINNER = '1.0-2.0',
  INTERMEDIATE = '2.5-3.0',
  ADVANCED = '3.5-4.0',
  EXPERT = '4.5-5.0',
}

export const SKILL_LEVELS = [
  { value: UserLevel.BEGINNER, label: 'Beginner (1.0-2.0)' },
  { value: UserLevel.INTERMEDIATE, label: 'Intermediate (2.5-3.0)' },
  { value: UserLevel.ADVANCED, label: 'Advanced (3.5-4.0)' },
  { value: UserLevel.EXPERT, label: 'Expert (4.5+)' },
];
