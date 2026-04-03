export const isLightBackground = (hex: string): boolean => {
  if (!hex || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export const getContrastTextColor = (backgroundColor: string): string => {
  return isLightBackground(backgroundColor) ? '#18181b' : '#F5F5F7';
};

export const getSecondaryTextColor = (backgroundColor: string): string => {
  return isLightBackground(backgroundColor) ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';
};
