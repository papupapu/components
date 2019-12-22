import { memo } from 'react';

import Panel from './index';

import isEqual from '../../Utils/isEqual';

const panelPropsCheck = (
  prevPanelProps,
  nextPanelProps,
) => prevPanelProps.cssClass === nextPanelProps.cssClass
  && isEqual(prevPanelProps.styleObj, nextPanelProps.styleObj)
  && prevPanelProps.loaded === nextPanelProps.loaded;

export default memo(Panel, panelPropsCheck);
