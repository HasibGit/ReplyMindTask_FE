export const SALUTATIONS: string[] = ['Mr.', 'Mrs.', 'Miss.', 'Ms.'];

export const USER_PASSWORD_CRITERIA: string[] = [
  'Should be at least 6 characters long',
  'At least one uppercase letter',
  'At least one lowercase letter',
  'At least one number',
  'At least one special character',
];

export const USER_PROFESSIONS: string[] = [
  'Marketing Professional',
  'Entrepreneur',
  'Content Creator',
];

export const AREAS_OF_INTEREST_RELEVANT_TO_PROFESSION: {
  [key: string]: string[];
} = {
  'Marketing Professional': [
    'Growth Marketing',
    'Digital Marketing',
    'Product Marketing',
    'Paid Marketing',
    'Organic Marketing',
  ],
  Entrepreneur: [
    'Startup Enthusiast',
    'SME',
    'Product Enthusiast',
    'Product Leader',
    'Product Owner',
  ],
  'Content Creator': ['Youtube', 'Twitch', 'Twitter', 'Facebook', 'TikTok'],
};

export const YEARS_OF_EXPERIENCE_OPTIONS = [
  '1 year',
  '1 - 5 years',
  '5 years+',
];

export const LOADER_CONFIG = {
  backdropBorderRadius: '3px',
  fullScreenBackdrop: true,
  backdropBackgroundColour: 'rgba(0,0,0,0.3)',
  primaryColour: '#673ab7',
  secondaryColour: '#8d63c9',
  tertiaryColour: '#b492d8',
};
