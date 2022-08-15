import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { formatComponentName } from '@/utils/index';
import { auth } from './directives';
import './icon/iconfont';

import '../../mock';

export default ({ Vue }) => {
  Vue.use(Element);
  const requireComponents = require.context('@/components', true, /\.vue$/);
  requireComponents.keys().forEach((key) => {
    const component = requireComponents(key).default;
    Vue.component(component.name, component);
  });

  const requireExamples = require.context('../../examples', true, /\.vue$/);
  requireExamples.keys().forEach((key) => {
    const component = requireExamples(key).default;
    // eslint-disable-next-line
    Vue.component(formatComponentName(key), component);
  });

  Vue.directive('auth', auth);
};
