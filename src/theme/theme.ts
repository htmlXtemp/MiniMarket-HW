export type ThemeName = 'light' | 'dark';

export interface AppTheme {
  name: ThemeName;
  colors: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    primary: string;
    onPrimary: string;
    danger: string;
    onDanger: string;
  };
  radius: string;
  space: (n: number) => string;
}

export type ColorToken = keyof AppTheme['colors'];

export const theme_storage_key = 'mini-market:theme';

const space = (n: number) => `${n * 4}px`;

export const light: AppTheme = {
  name: 'light',
  colors: {
    bg: '#f6f7f9',
    surface: '#ffffff',
    text: '#14161a',
    muted: '#5b6270',
    border: '#d9dde3',
    primary: '#3b5bdb',
    onPrimary: '#ffffff',
    danger: '#d6336c',
    onDanger: '#ffffff',
  },
  radius: '8px',
  space,
};

export const dark: AppTheme = {
  ...light,
  name: 'dark',
  colors: {
    bg: '#0f1115',
    surface: '#171a21',
    text: '#e8eaee',
    muted: '#9aa3b2',
    border: '#2b303b',
    primary: '#7c94ff',
    onPrimary: '#0f1115',
    danger: '#f06595',
    onDanger: '#0f1115',
  },
};