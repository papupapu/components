import React, { cloneElement } from 'react';

import makeCls from '../Utils/makeCls';
import {
  isArray,
  isObject,
} from '../Utils/validvars';
import {
  addSizeMeasureUnit,
  removeSizeMeasureUnit,
} from '../Utils/sizeMeasureUnits';

import {
  mainCls,
  sliderCls,
  buttonCls,
  counterCls,
  controlsCls,
} from './style';

const measuresFromMarginPaddingCssString = (cssString) => {
  const parts = cssString.split(' ').map((part) => removeSizeMeasureUnit(part) || 0);
  if (parts.length === 1) {
    return {
      top: parts[0],
      right: parts[0],
      bottom: parts[0],
      left: parts[0],
    };
  }
  if (parts.length === 2) {
    return {
      top: parts[0],
      right: parts[1],
      bottom: parts[0],
      left: parts[1],
    };
  }
  if (parts.length === 3) {
    return {
      top: parts[0],
      right: parts[1],
      bottom: parts[2],
      left: parts[1],
    };
  }
  if (parts.length === 4) {
    return {
      top: parts[0],
      right: parts[1],
      bottom: parts[2],
      left: parts[3],
    };
  }
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
};

export const getGuttersSize = (galleryPaddingCssString, controlsMarginCssString) => {
  const galleryPaddingMeasures = measuresFromMarginPaddingCssString(galleryPaddingCssString);
  const controlsMarginMeasures = measuresFromMarginPaddingCssString(controlsMarginCssString);
  return {
    galleryPadding: galleryPaddingMeasures,
    controlsMargin: controlsMarginMeasures,
  };
};

const getArgs = (props, el, required) => {
  const args = {};
  required.forEach((x) => {
    let propName = x;
    let val = null;
    if (x in el) {
      val = el[x];
    }
    if (isObject(x)) {
      // eslint-disable-next-line prefer-destructuring
      propName = Object.keys(x)[0];
      if (x[propName] in props) {
        val = props[x[propName]];
      }
    } else if (x in props) {
      val = props[x];
    }
    args[propName] = val;
  });
  return args;
};

const createSlider = (props) => {
  const {
    component,
    cssClass,
    classes,
    ui,
    size,
    move,
    loop,
    theme,
    sliderCurrent,
  } = props;
  const slider = (
    <div
      key="slider"
      className={makeCls([cssClass, classes[`${mainCls}${sliderCls}`]])}
      style={{
        height: addSizeMeasureUnit(size.h),
      }}
    >
      {
        cloneElement(
          component, {
            ui,
            size,
            move,
            loop,
            theme,
            passCurrent: sliderCurrent,
          },
        )
      }
    </div>
  );
  return slider;
};

const createButton = (props) => {
  const {
    component,
    role,
    cssClass,
    classes,
    action,
  } = props;
  return cloneElement(
    component, {
      key: role,
      cssClass: makeCls([cssClass, classes[`${mainCls}${buttonCls}`], role.replace('Button', '')]),
      action,
    },
  );
};

const createCounter = (props) => {
  const {
    component,
    role,
    cssClass,
    classes,
    current,
    totSlides,
  } = props;
  return cloneElement(
    component, {
      key: role,
      children: <p>{`${current}/${totSlides}`}</p>,
      cssClass: makeCls([cssClass, classes[`${mainCls}${counterCls}`], role]),
    },
  );
};

const controlsItems = (props) => {
  const {
    components,
    conf,
  } = props;
  const elements = components.map((child) => ({ role: child.props.role, component: child }));
  const contents = elements.map(
    (el) => {
      const createMethod = el.role in conf ? conf[el.role].method : null;
      if (createMethod && typeof createMethod === 'function') {
        const args = getArgs(props, el, conf[el.role].args);
        return createMethod({ ...args });
      }
      return el.component;
    },
  );
  return contents;
};

const createControls = (props) => {
  const {
    component,
    role,
    cssClass,
    classes,
    current,
    totSlides,
    prevSlide,
    nextSlide,
    conf,
    controlsRef,
  } = props;
  return cloneElement(
    component, {
      key: role,
      forwardRef: controlsRef,
      cssClass: makeCls([cssClass, classes[`${mainCls}${controlsCls}`], role]),
      children: controlsItems({
        components: component.props.children,
        cssClass,
        classes,
        current,
        totSlides,
        prevSlide,
        nextSlide,
        conf,
      }),
    },
  );
};

const defaultArgs = [
  'component',
  'role',
  'cssClass',
  'classes',
];

const createConf = {
  slider: {
    method: createSlider,
    args: [
      ...defaultArgs,
      'ui',
      'size',
      'move',
      'loop',
      'theme',
      'sliderCurrent',
    ],
  },
  prevButton: {
    method: createButton,
    args: [
      ...defaultArgs,
      { action: 'prevSlide' },
    ],
  },
  nextButton: {
    method: createButton,
    args: [
      ...defaultArgs,
      { action: 'nextSlide' },
    ],
  },
  counter: {
    method: createCounter,
    args: [
      ...defaultArgs,
      'current',
      'totSlides',
    ],
  },
  controls: {
    method: createControls,
    args: [
      ...defaultArgs,
      'current',
      'totSlides',
      'prevSlide',
      'nextSlide',
      'controlsRef',
    ],
  },
};

const contentElementConfiguration = (contentElement) => ({
  role: contentElement.props.role,
  component: contentElement,
});

export const createContents = (props) => {
  const components = isArray(props.components)
    ? props.components.map((child) => contentElementConfiguration(child))
    : [contentElementConfiguration(props.components)];
  const totSlides = components.filter((el) => el.role === 'slider')[0].component.props.children.length;
  const propsForArgs = { ...props, ...{ totSlides } };
  const contents = components.map(
    (uiElement) => {
      const createMethod = uiElement.role in createConf ? createConf[uiElement.role].method : null;
      if (createMethod && typeof createMethod === 'function') {
        const args = getArgs(propsForArgs, uiElement, createConf[uiElement.role].args);
        return createMethod({ ...args, ...{ conf: createConf } });
      }
      return uiElement.component;
    },
  );
  return contents;
};
