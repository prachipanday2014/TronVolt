import darkColors from '../constants/color_dark.json';
import lightColors from '../constants/color_light.json';
import {DarkBg} from '../components/DarkBg';
import {LightBg} from '../components/LightBg';

let defaultTheme = true;
export const SetColors = theme => {
  defaultTheme = theme;
};

export const AppColors = () => {
  return defaultTheme ? darkColors : lightColors;
};

export const AppBgs = () => {
  return defaultTheme ? DarkBg : LightBg;
};
