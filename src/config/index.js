import common from './common';
import dev from './dev';
import prod from './prod';

const mode = process.env.NODE_ENV;

const config = mode === 'production' ? prod : dev;

export default {
  ...common,
  ...config,
  mode,
};
