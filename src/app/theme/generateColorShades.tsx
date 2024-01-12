import { darken, lighten } from 'polished';

export function generateColorShades(
  accentColor: string
): [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] {
  return [
    lighten(0.3, accentColor),
    lighten(0.2, accentColor),
    lighten(0.1, accentColor),
    accentColor,
    darken(0.1, accentColor),
    darken(0.2, accentColor),
    darken(0.3, accentColor),
    darken(0.4, accentColor),
    darken(0.5, accentColor),
    darken(0.6, accentColor),
  ];
}
