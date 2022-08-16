const colors = {
  primary: '#ffd6ff',
  lightViolet: '#e7c6ff',
  violet: '#c8b6ff',
  black: '#222',
  gray100: '#888',
  gray200: '#BBB',
  gray300: '#d7d7d7',
  offWhite: '#f6f6f6',
  white: '#fff',
  red: '#f45452',
} as const;

type COLOR_TYPE = typeof colors;

export default colors;
