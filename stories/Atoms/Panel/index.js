import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Spinner from '../Spinner';

import isEqual from '../../Utils/isEqual';
import makeStyle from '../../Utils/makeStyle';

const panelPropsCheck = (
  prevPanelProps,
  nextPanelProps,
) => prevPanelProps.cssClass === nextPanelProps.cssClass
  && isEqual(prevPanelProps.styleObj, nextPanelProps.styleObj)
  && prevPanelProps.loaded === nextPanelProps.loaded;

const propTypes = {
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  type: PropTypes.string,
  loaded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

const defaultProps = {
  cssClass: null,
  styleObj: {},
  type: null,
  loaded: true,
};

const Panel = ({
  cssClass,
  styleObj,
  type,
  loaded,
  children,
}) => (
  <div
    className={cssClass}
    style={loaded ? styleObj : makeStyle(styleObj, { position: 'relative' })}
  >
    {
      loaded
        ? children
        : (
          <>
            {
              type
                && (
                  <Icon
                    name={type}
                    width={40}
                    height={40}
                    color="#606060"
                    styleObj={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )
            }
            <Spinner
              width={80}
              height={80}
              strokeWidth={2}
              color="#606060"
            />
          </>
        )
    }
  </div>
);
Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
export default memo(Panel, panelPropsCheck);
