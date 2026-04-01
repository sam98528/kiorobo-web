export const theme = {
  colors: {
    pageBg: '#FAFAFA',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(0,0,0,0.05)',
    muted: '#F4F4F5',
    inverse: '#18181B',
    textPrimary: 'rgba(0,0,0,0.88)',
    textSecondary: 'rgba(0,0,0,0.45)',
    textTertiary: 'rgba(0,0,0,0.35)',
    textMuted: 'rgba(0,0,0,0.25)',
    labelColor: 'rgba(0,0,0,0.3)',
    accent: '#7C3AED',
    pastel: {
      lavender: '#C4B5FD',
      softViolet: '#DDD6FE',
      blush: '#FBCFE8',
      sky: '#BAE6FD',
      mint: '#BBF7D0',
    },
    badge: {
      lavender: '#EDE9FE',
      blush: '#FCE7F3',
      mint: '#DCFCE7',
      sky: '#E0F2FE',
    },
    navBorder: 'rgba(0,0,0,0.06)',
    divider: 'rgba(0,0,0,0.06)',
    btnOutlineBorder: 'rgba(0,0,0,0.12)',
    /* Dark card style */
    darkCard: {
      bg: 'rgba(255,255,255,0.03)',
      border: 'rgba(0,0,0,0.06)',
      borderHover: 'rgba(0,0,0,0.12)',
    },
  },
  fonts: {
    headline: "'DM Sans', sans-serif",
    body: "'Inter', sans-serif",
    code: "'JetBrains Mono', monospace",
  },
  radii: {
    card: '20px',
    nav: '14px',
    button: '10px',
    badge: '9999px',
  },
  maxWidth: '1200px',
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  media: {
    sm: '@media (max-width: 640px)',
    md: '@media (max-width: 768px)',
    lg: '@media (max-width: 1024px)',
    xl: '@media (max-width: 1280px)',
  },
} as const;

export type Theme = typeof theme;
