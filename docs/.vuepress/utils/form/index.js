import { getOptions } from '@/api/dict';

// 通用
/* @params
 * prop 参数
 * label 参数描述
 * value 默认值
 * required 是否必填
 * props 其他表单属性，会传到el-form-item组件，比如class
 * input 其他输入属性，会传到input组件
 *
 * 其它
 * options
 * remoteMethod
 * half 宽度占一半
 */
export class Input {
  constructor({ prop, label, value, props, input, half }) {
    this.props = { prop, label, ...props };
    this.value = value;
    this.input = { ...(input || {}) };

    if (half) {
      if (!this.props.class) {
        this.props.class = 'half-width';
      } else {
        this.props.class += ' half-width';
      }
    }
  }
}

const merge = (arr, item) => {
  let result = [];
  if (arr) {
    if (Array.isArray(arr)) {
      result = arr;
    } else {
      result = [arr];
    }
  }
  result.unshift(item);
  return result;
};

// 输入框
export class SimpleInput extends Input {
  constructor(data) {
    super(data);

    this.input = {
      placeholder: `请输入${data.label}`,
      maxlength: 100,
      ...this.input,
      component: 'el-input',
    };

    this.value ||= '';

    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        trigger: 'blur',
        message: `请输入${data.label}`,
      });
    }
  }
}

// 数字输入框
export class NumberInput extends Input {
  constructor(data) {
    super(data);

    this.input.component = 'NumberInput';

    if (!this.value && this.value != null) {
      this.value = undefined;
    }

    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        trigger: 'blur',
        type: 'number',
        message: `请输入${data.label}`,
      });
    }
  }
}

NumberInput.POSITIVE_INTEGER = { min: 1, precision: 0 };

NumberInput.NATURAL_NUMBER = { min: 0, precision: 0 };

// 文本域
export class TextAreaInput extends SimpleInput {
  constructor(data) {
    super(data);

    this.input.type = 'textarea';
    this.input.maxlength = data.maxlength || 200;

    this.input = {
      'show-word-limit': true,
      ...this.input,
    };
  }
}

// 密码
export class PasswordInput extends SimpleInput {
  constructor(data) {
    super(data);

    this.input = {
      ...this.input,
      showPassword: true,
      autocomplete: 'new-password',
    };
  }
}

// 下拉选择
export class SelectInput extends Input {
  constructor(data) {
    super(data);

    this.input = {
      placeholder: `请选择${data.label}`,
      clearable: true,
      component: 'SelectInput',
      options: data.dictKey ? getOptions(data.dictKey) : data.options,
      remoteMethod: data.remoteMethod,
      ...this.input,
    };

    if (this.value === undefined) {
      this.value = null;
    }

    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        trigger: 'change',
        message: `请选择${data.label}`,
      });
    }
  }
}

SelectInput.BOOL_OPTIONS = [
  { label: '是', value: '1' },
  { label: '否', value: '0' },
];

export class CascaderInput extends Input {
  constructor(data) {
    super(data);

    this.input.placeholder = `请选择${data.label}`;
    this.input.component = 'CascaderInput';

    if (this.value === undefined) {
      this.value = null;
    }

    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        trigger: 'change',
        message: `请选择${data.label}`,
      });
    }
  }
}

export class SwitchInput extends Input {
  constructor(data) {
    super(data);
    this.input = {
      // 这两个属性可被覆盖
      'active-value': '1',
      'inactive-value': '0',
      ...this.input,
      component: 'el-switch',
    };
    this.value ||= '1';
  }
}

const valueFormatMap = {
  year: 'yyyy',
  month: 'yyyy-MM',
  datetime: 'yyyy-MM-dd HH:mm:ss',
};

export class DateInput extends Input {
  constructor(data) {
    super(data);

    this.input = {
      // 可覆盖
      'value-format': valueFormatMap[data.type] || 'yyyy-MM-dd',
      placeholder: `请选择${data.label}`,
      ...this.input,
      type: data.type,
      component: 'DateInput',
    };
    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        trigger: 'blur',
        message: `请选择${data.label}`,
      });
    }
  }
}

DateInput.before = {
  disabledDate(time) {
    return time.getTime() > Date.now();
  },
};

export class RadioInput extends Input {
  constructor(data) {
    super(data);
    this.input = {
      ...this.input,
      component: 'RadioGroup',
      options: data.dictKey ? getOptions(data.dictKey) : data.options,
    };
    const first = this.input.options[0] || {};
    this.value ||= first.value;
    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        trigger: 'change',
        message: `请选择${data.label}`,
      });
    }
  }
}

export class CheckboxInput extends Input {
  constructor(data) {
    super(data);
    this.input = {
      ...this.input,
      component: 'CheckboxGroup',
      options: data.dictKey ? getOptions(data.dictKey) : data.options,
    };
    this.value ||= [];
    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        trigger: 'change',
        message: `请选择${data.label}`,
      });
    }
  }
}

export class FileInput extends Input {
  constructor(data) {
    super(data);
    this.input.component = 'FileInput';
    if (data.required) {
      this.props.rules = merge(this.props.rules, {
        required: true,
        message: `请选择文件`,
        trigger: 'change',
      });
    }
  }
}
