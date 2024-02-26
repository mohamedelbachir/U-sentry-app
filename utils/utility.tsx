import { Platform } from "react-native";

import { MD3LightTheme, MD3DarkTheme, MD3Theme } from "react-native-paper";

type ReducerAction<T extends keyof State> = {
  payload: State[T];
  type: T;
};

type IconsColor = {
  flatLeftIcon: string | undefined;
  flatRightIcon: string | undefined;
  outlineLeftIcon: string | undefined;
  outlineRightIcon: string | undefined;
  customIcon: string | undefined;
};

export type State = {
  text: string;
  customIconText: string;
  name: string;
  outlinedText: string;
  largeText: string;
  flatTextPassword: string;
  outlinedLargeText: string;
  outlinedTextPassword: string;
  nameNoPadding: string;
  nameRequired: string;
  flatDenseText: string;
  flatDense: string;
  outlinedDenseText: string;
  outlinedDense: string;
  flatMultiline: string;
  flatTextArea: string;
  flatUnderlineColors: string;
  outlinedMultiline: string;
  outlinedTextArea: string;
  outlinedColors: string;
  outlinedLongLabel: string;
  maxLengthName: string;
  flatTextSecureEntry: boolean;
  outlineTextSecureEntry: boolean;
  iconsColor: IconsColor;
};

export function inputReducer<T extends keyof State>(
  state: State,
  action: ReducerAction<T>
) {
  switch (action.type) {
    case action.type:
      state[action.type] = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
}

export const isWeb = Platform.OS === "web";

const lightBlueColors = {
  colors: {
    primary: "rgb(46, 53, 185)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(224, 224, 255)",
    onPrimaryContainer: "rgb(68, 68, 185)",
    secondary: "rgb(94, 99, 211)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(225, 224, 249)",
    onSecondaryContainer: "rgb(25, 26, 44)",
    tertiary: "rgb(120, 83, 107)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 216, 238)",
    onTertiaryContainer: "rgb(46, 17, 38)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(228, 225, 236)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 239, 244)",
    inversePrimary: "rgb(190, 194, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(245, 242, 255)",
      level2: "rgb(239, 236, 255)",
      level3: "rgb(233, 230, 255)",
      level4: "rgb(231, 228, 255)",
      level5: "rgb(227, 224, 255)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)",
  },
};

const lightCyanColors = {
  colors: {
    primary: "rgb(0, 106, 106)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(0, 251, 251)",
    onPrimaryContainer: "rgb(0, 32, 32)",
    secondary: "rgb(74, 99, 99)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(204, 232, 231)",
    onSecondaryContainer: "rgb(5, 31, 31)",
    tertiary: "rgb(75, 96, 124)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(211, 228, 255)",
    onTertiaryContainer: "rgb(4, 28, 53)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(250, 253, 252)",
    onBackground: "rgb(25, 28, 28)",
    surface: "rgb(250, 253, 252)",
    onSurface: "rgb(25, 28, 28)",
    surfaceVariant: "rgb(218, 229, 228)",
    onSurfaceVariant: "rgb(63, 73, 72)",
    outline: "rgb(111, 121, 121)",
    outlineVariant: "rgb(190, 201, 200)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(45, 49, 49)",
    inverseOnSurface: "rgb(239, 241, 240)",
    inversePrimary: "rgb(0, 221, 221)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 246, 245)",
      level2: "rgb(230, 241, 240)",
      level3: "rgb(223, 237, 236)",
      level4: "rgb(220, 235, 235)",
      level5: "rgb(215, 232, 232)",
    },
    surfaceDisabled: "rgba(25, 28, 28, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 28, 0.38)",
    backdrop: "rgba(41, 50, 50, 0.4)",
  },
};

const darkCyanColors = {
  colors: {
    primary: "rgb(0, 221, 221)",
    onPrimary: "rgb(0, 55, 55)",
    primaryContainer: "rgb(0, 79, 79)",
    onPrimaryContainer: "rgb(0, 251, 251)",
    secondary: "rgb(176, 204, 203)",
    onSecondary: "rgb(27, 53, 52)",
    secondaryContainer: "rgb(50, 75, 75)",
    onSecondaryContainer: "rgb(204, 232, 231)",
    tertiary: "rgb(179, 200, 232)",
    onTertiary: "rgb(28, 49, 75)",
    tertiaryContainer: "rgb(51, 72, 99)",
    onTertiaryContainer: "rgb(211, 228, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 28)",
    onBackground: "rgb(224, 227, 226)",
    surface: "rgb(25, 28, 28)",
    onSurface: "rgb(224, 227, 226)",
    surfaceVariant: "rgb(63, 73, 72)",
    onSurfaceVariant: "rgb(190, 201, 200)",
    outline: "rgb(136, 147, 146)",
    outlineVariant: "rgb(63, 73, 72)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(224, 227, 226)",
    inverseOnSurface: "rgb(45, 49, 49)",
    inversePrimary: "rgb(0, 106, 106)",
    elevation: {
      level0: "transparent",
      level1: "rgb(24, 38, 38)",
      level2: "rgb(23, 43, 43)",
      level3: "rgb(22, 49, 49)",
      level4: "rgb(22, 51, 51)",
      level5: "rgb(22, 55, 55)",
    },
    surfaceDisabled: "rgba(224, 227, 226, 0.12)",
    onSurfaceDisabled: "rgba(224, 227, 226, 0.38)",
    backdrop: "rgba(41, 50, 50, 0.4)",
  },
};

export const colorThemes = {
  paper: {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
  },
  blue: {
    light: {
      ...MD3LightTheme,
      ...lightBlueColors,
    },
    dark: {
      ...MD3LightTheme,
      ...lightBlueColors,
    },
  },
  cyan: {
    light: {
      ...MD3LightTheme,
      ...lightCyanColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkCyanColors,
    },
  },
} as { [key: string]: { light: MD3Theme; dark: MD3Theme } };
