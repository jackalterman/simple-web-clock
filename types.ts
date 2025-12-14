export type Theme = 'light' | 'dark';

export type ClockType = 'analog' | 'digital' | 'binary' | 'progress' | 'neon' | 'word' | 'bar';

export type AccentColor = 'orange' | 'blue' | 'green' | 'purple' | 'red';

export interface WorldZone {
  timezone: string;
  label: string;
}

export interface ClockSettings {
  is24Hour: boolean;
  showSeconds: boolean;
  showDate: boolean;
  accentColor: AccentColor;
  zoom: number; // Scale factor
  worldClocks: WorldZone[];
}

export interface ClockProps {
  time: Date;
  settings: ClockSettings;
}