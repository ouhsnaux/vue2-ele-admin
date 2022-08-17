import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { formatComponentName } from '@/utils/index';
import { auth } from './directives';
import './icon/iconfont';

import '../../mock';

export default async ({ Vue }) => {
  Vue.use(Element);
  // const requireComponents = require.context('@/components', true, /\.vue$/);
  // const keys = requireComponents.keys();
  // for (let i = 0; i < keys.length; i++) {
  //   await import(`../../src/components/${keys[i].slice(2)}`).then((module) => {
  //     // console.log(module);
  //     const component = module.default;
  //     Vue.component(component.name, component);
  //     // Vue.use(module.default);
  //   });
  // }

  // const requireExamples = require.context('../../examples', true, /\.vue$/);
  // const exampleKeys = requireExamples.keys();
  // for (let i = 0; i < exampleKeys.length; i++) {
  //   await import(`../../examples/${exampleKeys[i].slice(2)}`).then((module) => {
  //     console.log(module);
  //     // console.log(component.name);
  //     const component = module.default;
  //     Vue.component(formatComponentName(exampleKeys[i]), component);
  //   });
  // }

  Vue.directive('auth', auth);
};
