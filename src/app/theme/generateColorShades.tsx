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
    darken(0.05, accentColor),
    darken(0.15, accentColor),
    darken(0.25, accentColor),
    darken(0.35, accentColor),
    darken(0.45, accentColor),
    darken(0.65, accentColor),
  ];
}
