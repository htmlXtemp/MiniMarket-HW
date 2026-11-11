import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { dark, light, theme_storage_key, type ThemeName } from './theme';

interface ThemeModeValue {
  mode: ThemeName;
  toggle: () => void;
}

const ThemeModeContext = createContext<ThemeModeValue | null>(null);

function readSavedMode(): ThemeName | null {
  const saved = localStorage.getItem(theme_storage_key);
  return saved === 'light' || saved === 'dark' ? saved : null;
}

function getSystemMode(): ThemeName {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function saveMode(mode: ThemeName) {
  localStorage.setItem(theme_storage_key, mode);
}

export function useThemeMode() {
  const value = useContext(ThemeModeContext);

  if (!value) {
    throw new Error('useThemeMode нужно использовать внутри ThemeRoot');
  }

  return value;
}

export function ThemeRoot({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeName>(() => readSavedMode() ?? getSystemMode());

  useEffect(() => {
    const activeTheme = mode === 'dark' ? dark : light;
    const root = document.documentElement;

    root.dataset.theme = mode;
    root.style.colorScheme = mode;
    root.style.background = activeTheme.colors.bg;
    document.body.style.background = activeTheme.colors.bg;
    document.body.style.color = activeTheme.colors.text;
  }, [mode]);

  const toggle = () => {
    const next: ThemeName = mode === 'light' ? 'dark' : 'light';
    saveMode(next);
    setMode(next);
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={mode === 'dark' ? dark : light}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}