// ../../../../../../project/记账/demo_front/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}

// ../../../../../../project/记账/demo_front/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t2, r2) {
  if ("object" != _typeof(t2) || !t2)
    return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2 || "default");
    if ("object" != _typeof(i2))
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}

// ../../../../../../project/记账/demo_front/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t2) {
  var i2 = toPrimitive(t2, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}

// ../../../../../../project/记账/demo_front/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e2, r2, t2) {
  return (r2 = toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, {
    value: t2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e2[r2] = t2, e2;
}

// ../../../../../../project/记账/demo_front/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ownKeys(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread2(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}

// ../../../../../../project/记账/demo_front/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2)
        ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Select.js
import { createVNode as _createVNode24, resolveDirective as _resolveDirective14 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/BaseSelect.js
import { resolveDirective as _resolveDirective11, createTextVNode as _createTextVNode2, createVNode as _createVNode19 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-util/warning.js
var warned = {};
function warning(valid, message) {
  if (!valid && console !== void 0) {
    console.error(`Warning: ${message}`);
  }
}
function note(valid, message) {
  if (!valid && console !== void 0) {
    console.warn(`Note: ${message}`);
  }
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
var warning_default = warningOnce;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/utils/valueUtil.js
function getKey(data, index2) {
  const {
    key
  } = data;
  let value;
  if ("value" in data) {
    ({
      value
    } = data);
  }
  if (key !== null && key !== void 0) {
    return key;
  }
  if (value !== void 0) {
    return value;
  }
  return `rc-index-key-${index2}`;
}
function fillFieldNames(fieldNames, childrenAsData) {
  const {
    label,
    value,
    options
  } = fieldNames || {};
  return {
    label: label || (childrenAsData ? "children" : "label"),
    value: value || "value",
    options: options || "options"
  };
}
function flattenOptions(options) {
  let {
    fieldNames,
    childrenAsData
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const flattenList = [];
  const {
    label: fieldLabel,
    value: fieldValue,
    options: fieldOptions
  } = fillFieldNames(fieldNames, false);
  function dig(list, isGroupOption) {
    list.forEach((data) => {
      const label = data[fieldLabel];
      if (isGroupOption || !(fieldOptions in data)) {
        const value = data[fieldValue];
        flattenList.push({
          key: getKey(data, flattenList.length),
          groupOption: isGroupOption,
          data,
          label,
          value
        });
      } else {
        let grpLabel = label;
        if (grpLabel === void 0 && childrenAsData) {
          grpLabel = data.label;
        }
        flattenList.push({
          key: getKey(data, flattenList.length),
          group: true,
          data,
          label: grpLabel
        });
        dig(data[fieldOptions], true);
      }
    });
  }
  dig(options, false);
  return flattenList;
}
function injectPropsWithOption(option) {
  const newOption = _extends({}, option);
  if (!("props" in newOption)) {
    Object.defineProperty(newOption, "props", {
      get() {
        warning(false, "Return type is option instead of Option instance. Please read value directly instead of reading from `props`.");
        return newOption;
      }
    });
  }
  return newOption;
}
function getSeparatedContent(text, tokens) {
  if (!tokens || !tokens.length) {
    return null;
  }
  let match2 = false;
  function separate(str, _ref) {
    let [token, ...restTokens] = _ref;
    if (!token) {
      return [str];
    }
    const list2 = str.split(token);
    match2 = match2 || list2.length > 1;
    return list2.reduce((prevList, unitStr) => [...prevList, ...separate(unitStr, restTokens)], []).filter((unit) => unit);
  }
  const list = separate(text, tokens);
  return match2 ? list : null;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/SelectTrigger.js
import { resolveDirective as _resolveDirective7, createVNode as _createVNode8 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Trigger.js
import { Fragment as _Fragment, createVNode as _createVNode7, resolveDirective as _resolveDirective6 } from "vue";
import { computed as computed7, defineComponent as defineComponent7, inject as inject2, provide as provide2, shallowRef as shallowRef6 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/vue-types/dist/vue-types.m.js
function e(e2, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var r2 = t2[n2];
    r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
  }
}
function t(t2, n2, r2) {
  return n2 && e(t2.prototype, n2), r2 && e(t2, r2), t2;
}
function n() {
  return (n = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }).apply(this, arguments);
}
function r(e2, t2) {
  e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, e2.__proto__ = t2;
}
function i(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, i2 = {}, o2 = Object.keys(e2);
  for (r2 = 0; r2 < o2.length; r2++)
    t2.indexOf(n2 = o2[r2]) >= 0 || (i2[n2] = e2[n2]);
  return i2;
}
function o(e2) {
  return 1 == (null != (t2 = e2) && "object" == typeof t2 && false === Array.isArray(t2)) && "[object Object]" === Object.prototype.toString.call(e2);
  var t2;
}
var u = Object.prototype;
var a = u.toString;
var f = u.hasOwnProperty;
var c = /^\s*function (\w+)/;
function l(e2) {
  var t2, n2 = null !== (t2 = null == e2 ? void 0 : e2.type) && void 0 !== t2 ? t2 : e2;
  if (n2) {
    var r2 = n2.toString().match(c);
    return r2 ? r2[1] : "";
  }
  return "";
}
var s = function(e2) {
  var t2, n2;
  return false !== o(e2) && "function" == typeof (t2 = e2.constructor) && false !== o(n2 = t2.prototype) && false !== n2.hasOwnProperty("isPrototypeOf");
};
var v = function(e2) {
  return e2;
};
var y = v;
if (true) {
  p = "undefined" != typeof console;
  y = p ? function(e2) {
    console.warn("[VueTypes warn]: " + e2);
  } : v;
}
var p;
var d = function(e2, t2) {
  return f.call(e2, t2);
};
var h = Number.isInteger || function(e2) {
  return "number" == typeof e2 && isFinite(e2) && Math.floor(e2) === e2;
};
var b = Array.isArray || function(e2) {
  return "[object Array]" === a.call(e2);
};
var O = function(e2) {
  return "[object Function]" === a.call(e2);
};
var g = function(e2) {
  return s(e2) && d(e2, "_vueTypes_name");
};
var m = function(e2) {
  return s(e2) && (d(e2, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function(t2) {
    return d(e2, t2);
  }));
};
function j(e2, t2) {
  return Object.defineProperty(e2.bind(t2), "__original", { value: e2 });
}
function _(e2, t2, n2) {
  var r2;
  void 0 === n2 && (n2 = false);
  var i2 = true, o2 = "";
  r2 = s(e2) ? e2 : { type: e2 };
  var u2 = g(r2) ? r2._vueTypes_name + " - " : "";
  if (m(r2) && null !== r2.type) {
    if (void 0 === r2.type || true === r2.type)
      return i2;
    if (!r2.required && void 0 === t2)
      return i2;
    b(r2.type) ? (i2 = r2.type.some(function(e3) {
      return true === _(e3, t2, true);
    }), o2 = r2.type.map(function(e3) {
      return l(e3);
    }).join(" or ")) : i2 = "Array" === (o2 = l(r2)) ? b(t2) : "Object" === o2 ? s(t2) : "String" === o2 || "Number" === o2 || "Boolean" === o2 || "Function" === o2 ? function(e3) {
      if (null == e3)
        return "";
      var t3 = e3.constructor.toString().match(c);
      return t3 ? t3[1] : "";
    }(t2) === o2 : t2 instanceof r2.type;
  }
  if (!i2) {
    var a2 = u2 + 'value "' + t2 + '" should be of type "' + o2 + '"';
    return false === n2 ? (y(a2), false) : a2;
  }
  if (d(r2, "validator") && O(r2.validator)) {
    var f2 = y, v2 = [];
    if (y = function(e3) {
      v2.push(e3);
    }, i2 = r2.validator(t2), y = f2, !i2) {
      var p = (v2.length > 1 ? "* " : "") + v2.join("\n* ");
      return v2.length = 0, false === n2 ? (y(p), i2) : p;
    }
  }
  return i2;
}
function T(e2, t2) {
  var n2 = Object.defineProperties(t2, { _vueTypes_name: { value: e2, writable: true }, isRequired: { get: function() {
    return this.required = true, this;
  } }, def: { value: function(e3) {
    return void 0 !== e3 || this.default ? O(e3) || true === _(this, e3, true) ? (this.default = b(e3) ? function() {
      return [].concat(e3);
    } : s(e3) ? function() {
      return Object.assign({}, e3);
    } : e3, this) : (y(this._vueTypes_name + ' - invalid default value: "' + e3 + '"'), this) : this;
  } } }), r2 = n2.validator;
  return O(r2) && (n2.validator = j(r2, n2)), n2;
}
function w(e2, t2) {
  var n2 = T(e2, t2);
  return Object.defineProperty(n2, "validate", { value: function(e3) {
    return O(this.validator) && y(this._vueTypes_name + " - calling .validate() will overwrite the current custom validator function. Validator info:\n" + JSON.stringify(this)), this.validator = j(e3, this), this;
  } });
}
function k(e2, t2, n2) {
  var r2, o2, u2 = (r2 = t2, o2 = {}, Object.getOwnPropertyNames(r2).forEach(function(e3) {
    o2[e3] = Object.getOwnPropertyDescriptor(r2, e3);
  }), Object.defineProperties({}, o2));
  if (u2._vueTypes_name = e2, !s(n2))
    return u2;
  var a2, f2, c2 = n2.validator, l2 = i(n2, ["validator"]);
  if (O(c2)) {
    var v2 = u2.validator;
    v2 && (v2 = null !== (f2 = (a2 = v2).__original) && void 0 !== f2 ? f2 : a2), u2.validator = j(v2 ? function(e3) {
      return v2.call(this, e3) && c2.call(this, e3);
    } : c2, u2);
  }
  return Object.assign(u2, l2);
}
function P(e2) {
  return e2.replace(/^(?!\s*$)/gm, "  ");
}
var x = function() {
  return w("any", {});
};
var A = function() {
  return w("function", { type: Function });
};
var E = function() {
  return w("boolean", { type: Boolean });
};
var N = function() {
  return w("string", { type: String });
};
var q = function() {
  return w("number", { type: Number });
};
var S = function() {
  return w("array", { type: Array });
};
var V = function() {
  return w("object", { type: Object });
};
var F = function() {
  return T("integer", { type: Number, validator: function(e2) {
    return h(e2);
  } });
};
var D = function() {
  return T("symbol", { validator: function(e2) {
    return "symbol" == typeof e2;
  } });
};
function L(e2, t2) {
  if (void 0 === t2 && (t2 = "custom validation failed"), "function" != typeof e2)
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return T(e2.name || "<<anonymous function>>", { validator: function(n2) {
    var r2 = e2(n2);
    return r2 || y(this._vueTypes_name + " - " + t2), r2;
  } });
}
function Y(e2) {
  if (!b(e2))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  var t2 = 'oneOf - value should be one of "' + e2.join('", "') + '".', n2 = e2.reduce(function(e3, t3) {
    if (null != t3) {
      var n3 = t3.constructor;
      -1 === e3.indexOf(n3) && e3.push(n3);
    }
    return e3;
  }, []);
  return T("oneOf", { type: n2.length > 0 ? n2 : void 0, validator: function(n3) {
    var r2 = -1 !== e2.indexOf(n3);
    return r2 || y(t2), r2;
  } });
}
function B(e2) {
  if (!b(e2))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  for (var t2 = false, n2 = [], r2 = 0; r2 < e2.length; r2 += 1) {
    var i2 = e2[r2];
    if (m(i2)) {
      if (g(i2) && "oneOf" === i2._vueTypes_name) {
        n2 = n2.concat(i2.type);
        continue;
      }
      if (O(i2.validator) && (t2 = true), true !== i2.type && i2.type) {
        n2 = n2.concat(i2.type);
        continue;
      }
    }
    n2.push(i2);
  }
  return n2 = n2.filter(function(e3, t3) {
    return n2.indexOf(e3) === t3;
  }), T("oneOfType", t2 ? { type: n2, validator: function(t3) {
    var n3 = [], r3 = e2.some(function(e3) {
      var r4 = _(g(e3) && "oneOf" === e3._vueTypes_name ? e3.type || null : e3, t3, true);
      return "string" == typeof r4 && n3.push(r4), true === r4;
    });
    return r3 || y("oneOfType - provided value does not match any of the " + n3.length + " passed-in validators:\n" + P(n3.join("\n"))), r3;
  } } : { type: n2 });
}
function I(e2) {
  return T("arrayOf", { type: Array, validator: function(t2) {
    var n2, r2 = t2.every(function(t3) {
      return true === (n2 = _(e2, t3, true));
    });
    return r2 || y("arrayOf - value validation error:\n" + P(n2)), r2;
  } });
}
function J(e2) {
  return T("instanceOf", { type: e2 });
}
function M(e2) {
  return T("objectOf", { type: Object, validator: function(t2) {
    var n2, r2 = Object.keys(t2).every(function(r3) {
      return true === (n2 = _(e2, t2[r3], true));
    });
    return r2 || y("objectOf - value validation error:\n" + P(n2)), r2;
  } });
}
function R(e2) {
  var t2 = Object.keys(e2), n2 = t2.filter(function(t3) {
    var n3;
    return !!(null === (n3 = e2[t3]) || void 0 === n3 ? void 0 : n3.required);
  }), r2 = T("shape", { type: Object, validator: function(r3) {
    var i2 = this;
    if (!s(r3))
      return false;
    var o2 = Object.keys(r3);
    if (n2.length > 0 && n2.some(function(e3) {
      return -1 === o2.indexOf(e3);
    })) {
      var u2 = n2.filter(function(e3) {
        return -1 === o2.indexOf(e3);
      });
      return y(1 === u2.length ? 'shape - required property "' + u2[0] + '" is not defined.' : 'shape - required properties "' + u2.join('", "') + '" are not defined.'), false;
    }
    return o2.every(function(n3) {
      if (-1 === t2.indexOf(n3))
        return true === i2._vueTypes_isLoose || (y('shape - shape definition does not include a "' + n3 + '" property. Allowed keys: "' + t2.join('", "') + '".'), false);
      var o3 = _(e2[n3], r3[n3], true);
      return "string" == typeof o3 && y('shape - "' + n3 + '" property validation error:\n ' + P(o3)), true === o3;
    });
  } });
  return Object.defineProperty(r2, "_vueTypes_isLoose", { writable: true, value: false }), Object.defineProperty(r2, "loose", { get: function() {
    return this._vueTypes_isLoose = true, this;
  } }), r2;
}
var $ = function() {
  function e2() {
  }
  return e2.extend = function(e3) {
    var t2 = this;
    if (b(e3))
      return e3.forEach(function(e4) {
        return t2.extend(e4);
      }), this;
    var n2 = e3.name, r2 = e3.validate, o2 = void 0 !== r2 && r2, u2 = e3.getter, a2 = void 0 !== u2 && u2, f2 = i(e3, ["name", "validate", "getter"]);
    if (d(this, n2))
      throw new TypeError('[VueTypes error]: Type "' + n2 + '" already defined');
    var c2, l2 = f2.type;
    return g(l2) ? (delete f2.type, Object.defineProperty(this, n2, a2 ? { get: function() {
      return k(n2, l2, f2);
    } } : { value: function() {
      var e4, t3 = k(n2, l2, f2);
      return t3.validator && (t3.validator = (e4 = t3.validator).bind.apply(e4, [t3].concat([].slice.call(arguments)))), t3;
    } })) : (c2 = a2 ? { get: function() {
      var e4 = Object.assign({}, f2);
      return o2 ? w(n2, e4) : T(n2, e4);
    }, enumerable: true } : { value: function() {
      var e4, t3, r3 = Object.assign({}, f2);
      return e4 = o2 ? w(n2, r3) : T(n2, r3), r3.validator && (e4.validator = (t3 = r3.validator).bind.apply(t3, [e4].concat([].slice.call(arguments)))), e4;
    }, enumerable: true }, Object.defineProperty(this, n2, c2));
  }, t(e2, null, [{ key: "any", get: function() {
    return x();
  } }, { key: "func", get: function() {
    return A().def(this.defaults.func);
  } }, { key: "bool", get: function() {
    return E().def(this.defaults.bool);
  } }, { key: "string", get: function() {
    return N().def(this.defaults.string);
  } }, { key: "number", get: function() {
    return q().def(this.defaults.number);
  } }, { key: "array", get: function() {
    return S().def(this.defaults.array);
  } }, { key: "object", get: function() {
    return V().def(this.defaults.object);
  } }, { key: "integer", get: function() {
    return F().def(this.defaults.integer);
  } }, { key: "symbol", get: function() {
    return D();
  } }]), e2;
}();
function z(e2) {
  var i2;
  return void 0 === e2 && (e2 = { func: function() {
  }, bool: true, string: "", number: 0, array: function() {
    return [];
  }, object: function() {
    return {};
  }, integer: 0 }), (i2 = function(i3) {
    function o2() {
      return i3.apply(this, arguments) || this;
    }
    return r(o2, i3), t(o2, null, [{ key: "sensibleDefaults", get: function() {
      return n({}, this.defaults);
    }, set: function(t2) {
      this.defaults = false !== t2 ? n({}, true !== t2 ? t2 : e2) : {};
    } }]), o2;
  }($)).defaults = n({}, e2), i2;
}
$.defaults = {}, $.custom = L, $.oneOf = Y, $.instanceOf = J, $.oneOfType = B, $.arrayOf = I, $.objectOf = M, $.shape = R, $.utils = { validate: function(e2, t2) {
  return true === _(t2, e2, true);
}, toType: function(e2, t2, n2) {
  return void 0 === n2 && (n2 = false), n2 ? w(e2, t2) : T(e2, t2);
} };
var C = function(e2) {
  function t2() {
    return e2.apply(this, arguments) || this;
  }
  return r(t2, e2), t2;
}(z());

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/vue-types/index.js
var PropTypes = z({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
PropTypes.extend([{
  name: "looseBool",
  getter: true,
  type: Boolean,
  default: void 0
}, {
  name: "style",
  getter: true,
  type: [String, Object],
  default: void 0
}, {
  name: "VueNode",
  getter: true,
  type: null
}]);
function withUndefined(type) {
  type.default = void 0;
  return type;
}
var vue_types_default = PropTypes;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/interface.js
function returnEmptyString() {
  return "";
}
function returnDocument(element) {
  if (element) {
    return element.ownerDocument;
  }
  return window.document;
}
function noop() {
}
var triggerProps = () => ({
  action: vue_types_default.oneOfType([vue_types_default.string, vue_types_default.arrayOf(vue_types_default.string)]).def([]),
  showAction: vue_types_default.any.def([]),
  hideAction: vue_types_default.any.def([]),
  getPopupClassNameFromAlign: vue_types_default.any.def(returnEmptyString),
  onPopupVisibleChange: Function,
  afterPopupVisibleChange: vue_types_default.func.def(noop),
  popup: vue_types_default.any,
  arrow: vue_types_default.bool.def(true),
  popupStyle: {
    type: Object,
    default: void 0
  },
  prefixCls: vue_types_default.string.def("rc-trigger-popup"),
  popupClassName: vue_types_default.string.def(""),
  popupPlacement: String,
  builtinPlacements: vue_types_default.object,
  popupTransitionName: String,
  popupAnimation: vue_types_default.any,
  mouseEnterDelay: vue_types_default.number.def(0),
  mouseLeaveDelay: vue_types_default.number.def(0.1),
  zIndex: Number,
  focusDelay: vue_types_default.number.def(0),
  blurDelay: vue_types_default.number.def(0.15),
  getPopupContainer: Function,
  getDocument: vue_types_default.func.def(returnDocument),
  forceRender: {
    type: Boolean,
    default: void 0
  },
  destroyPopupOnHide: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  // onPopupAlign: PropTypes.func.def(noop),
  popupAlign: vue_types_default.object.def(() => ({})),
  popupVisible: {
    type: Boolean,
    default: void 0
  },
  defaultPopupVisible: {
    type: Boolean,
    default: false
  },
  maskTransitionName: String,
  maskAnimation: String,
  stretch: String,
  alignPoint: {
    type: Boolean,
    default: void 0
  },
  autoDestroy: {
    type: Boolean,
    default: false
  },
  mobile: Object,
  getTriggerDOMNode: Function
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-util/Dom/contains.js
function contains(root2, n2) {
  if (!root2) {
    return false;
  }
  if (root2.contains) {
    return root2.contains(n2);
  }
  return false;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/raf.js
var raf = (callback) => setTimeout(callback, 16);
var caf = (num) => clearTimeout(num);
if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
  raf = (callback) => window.requestAnimationFrame(callback);
  caf = (handle) => window.cancelAnimationFrame(handle);
}
var rafUUID = 0;
var rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
  rafIds.delete(id);
}
function wrapperRaf(callback) {
  let times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  rafUUID += 1;
  const id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id);
      callback();
    } else {
      const realId = raf(() => {
        callRef(leftTimes - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
}
wrapperRaf.cancel = (id) => {
  const realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/util.js
var isFunction = (val) => typeof val === "function";
var controlDefaultValue = Symbol("controlDefaultValue");
var isArray = Array.isArray;
var isString = (val) => typeof val === "string";
var isObject = (val) => val !== null && typeof val === "object";
var onRE = /^on[^a-z]/;
var isOn = (key) => onRE.test(key);
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
function resolvePropValue(options, props3, key, value) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      value = opt.type !== Function && isFunction(defaultValue) ? defaultValue() : defaultValue;
    }
    if (opt.type === Boolean) {
      if (!hasOwn(props3, key) && !hasDefault) {
        value = false;
      } else if (value === "") {
        value = true;
      }
    }
  }
  return value;
}
function getDataAndAriaProps(props3) {
  return Object.keys(props3).reduce((memo, key) => {
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      memo[key] = props3[key];
    }
    return memo;
  }, {});
}
function toPx(val) {
  if (typeof val === "number")
    return `${val}px`;
  return val;
}
function renderHelper(v2) {
  let props3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let defaultV = arguments.length > 2 ? arguments[2] : void 0;
  if (typeof v2 === "function") {
    return v2(props3);
  }
  return v2 !== null && v2 !== void 0 ? v2 : defaultV;
}
function wrapPromiseFn(openFn) {
  let closeFn;
  const closePromise = new Promise((resolve) => {
    closeFn = openFn(() => {
      resolve(true);
    });
  });
  const result = () => {
    closeFn === null || closeFn === void 0 ? void 0 : closeFn();
  };
  result.then = (filled, rejected) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/classNames.js
function classNames() {
  const classes = [];
  for (let i2 = 0; i2 < arguments.length; i2++) {
    const value = i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2];
    if (!value)
      continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (let i3 = 0; i3 < value.length; i3++) {
        const inner = classNames(value[i3]);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(" ");
}
var classNames_default = classNames;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/props-util/index.js
import { isVNode, Fragment, Comment, Text } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/isValid.js
var isValid = (value) => {
  return value !== void 0 && value !== null && value !== "";
};
var isValid_default = isValid;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/props-util/initDefaultProps.js
var initDefaultProps = (types, defaultProps) => {
  const propTypes = _extends({}, types);
  Object.keys(defaultProps).forEach((k2) => {
    const prop = propTypes[k2];
    if (prop) {
      if (prop.type || prop.default) {
        prop.default = defaultProps[k2];
      } else if (prop.def) {
        prop.def(defaultProps[k2]);
      } else {
        propTypes[k2] = {
          type: prop,
          default: defaultProps[k2]
        };
      }
    } else {
      throw new Error(`not have ${k2} prop`);
    }
  });
  return propTypes;
};
var initDefaultProps_default = initDefaultProps;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/props-util/index.js
var splitAttrs = (attrs) => {
  const allAttrs = Object.keys(attrs);
  const eventAttrs = {};
  const onEvents = {};
  const extraAttrs = {};
  for (let i2 = 0, l2 = allAttrs.length; i2 < l2; i2++) {
    const key = allAttrs[i2];
    if (isOn(key)) {
      eventAttrs[key[2].toLowerCase() + key.slice(3)] = attrs[key];
      onEvents[key] = attrs[key];
    } else {
      extraAttrs[key] = attrs[key];
    }
  }
  return {
    onEvents,
    events: eventAttrs,
    extraAttrs
  };
};
var parseStyleText = function() {
  let cssText = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let camel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  if (typeof cssText === "object")
    return cssText;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k2 = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k2] = tmp[1].trim();
      }
    }
  });
  return res;
};
var hasProp = (instance, prop) => {
  return instance[prop] !== void 0;
};
var skipFlattenKey = Symbol("skipFlatten");
var flattenChildren = function() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  let filterEmpty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  const temp = Array.isArray(children) ? children : [children];
  const res = [];
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty2));
    } else if (child && child.type === Fragment) {
      if (child.key === skipFlattenKey) {
        res.push(child);
      } else {
        res.push(...flattenChildren(child.children, filterEmpty2));
      }
    } else if (child && isVNode(child)) {
      if (filterEmpty2 && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty2) {
        res.push(child);
      }
    } else if (isValid_default(child)) {
      res.push(child);
    }
  });
  return res;
};
var getSlot = function(self2) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (isVNode(self2)) {
    if (self2.type === Fragment) {
      return name === "default" ? flattenChildren(self2.children) : [];
    } else if (self2.children && self2.children[name]) {
      return flattenChildren(self2.children[name](options));
    } else {
      return [];
    }
  } else {
    const res = self2.$slots[name] && self2.$slots[name](options);
    return flattenChildren(res);
  }
};
var findDOMNode = (instance) => {
  var _a;
  let node = ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a === void 0 ? void 0 : _a.el) || instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};
var getOptionProps = (instance) => {
  const res = {};
  if (instance.$ && instance.$.vnode) {
    const props3 = instance.$.vnode.props || {};
    Object.keys(instance.$props).forEach((k2) => {
      const v2 = instance.$props[k2];
      const hyphenateKey = hyphenate(k2);
      if (v2 !== void 0 || hyphenateKey in props3) {
        res[k2] = v2;
      }
    });
  } else if (isVNode(instance) && typeof instance.type === "object") {
    const originProps = instance.props || {};
    const props3 = {};
    Object.keys(originProps).forEach((key) => {
      props3[camelize(key)] = originProps[key];
    });
    const options = instance.type.props || {};
    Object.keys(options).forEach((k2) => {
      const v2 = resolvePropValue(options, props3, k2, props3[k2]);
      if (v2 !== void 0 || k2 in props3) {
        res[k2] = v2;
      }
    });
  }
  return res;
};
var getComponent = function(instance) {
  let prop = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : instance;
  let execute = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  let com = void 0;
  if (instance.$) {
    const temp = instance[prop];
    if (temp !== void 0) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else {
      com = instance.$slots[prop];
      com = execute && com ? com(options) : com;
    }
  } else if (isVNode(instance)) {
    const temp = instance.props && instance.props[prop];
    if (temp !== void 0 && instance.props !== null) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else if (instance.type === Fragment) {
      com = instance.children;
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop];
      com = execute && com ? com(options) : com;
    }
  }
  if (Array.isArray(com)) {
    com = flattenChildren(com);
    com = com.length === 1 ? com[0] : com;
    com = com.length === 0 ? void 0 : com;
  }
  return com;
};
function getEvents() {
  let ele = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let on = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  let props3 = {};
  if (ele.$) {
    props3 = _extends(_extends({}, props3), ele.$attrs);
  } else {
    props3 = _extends(_extends({}, props3), ele.props);
  }
  return splitAttrs(props3)[on ? "onEvents" : "events"];
}
function getClass(ele) {
  const props3 = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  const tempCls = props3.class || {};
  let cls = {};
  if (typeof tempCls === "string") {
    tempCls.split(" ").forEach((c2) => {
      cls[c2.trim()] = true;
    });
  } else if (Array.isArray(tempCls)) {
    classNames_default(tempCls).split(" ").forEach((c2) => {
      cls[c2.trim()] = true;
    });
  } else {
    cls = _extends(_extends({}, cls), tempCls);
  }
  return cls;
}
function getStyle(ele, camel) {
  const props3 = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  let style = props3.style || {};
  if (typeof style === "string") {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    const res = {};
    Object.keys(style).forEach((k2) => res[camelize(k2)] = style[k2]);
    return res;
  }
  return style;
}
function isFragment(c2) {
  return c2.length === 1 && c2[0].type === Fragment;
}
function isEmptyContent(c2) {
  return c2 === void 0 || c2 === null || c2 === "" || Array.isArray(c2) && c2.length === 0;
}
function isEmptyElement(c2) {
  return c2 && (c2.type === Comment || c2.type === Fragment && c2.children.length === 0 || c2.type === Text && c2.children.trim() === "");
}
function isStringElement(c2) {
  return c2 && c2.type === Text;
}
function filterEmpty() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const res = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if ((child === null || child === void 0 ? void 0 : child.type) === Fragment) {
      res.push(...filterEmpty(child.children));
    } else {
      res.push(child);
    }
  });
  return res.filter((c2) => !isEmptyElement(c2));
}
function filterEmptyWithUndefined(children) {
  if (children) {
    const coms = filterEmpty(children);
    return coms.length ? coms : void 0;
  } else {
    return children;
  }
}
function isValidElement(element) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0];
  }
  return element && element.__v_isVNode && typeof element.type !== "symbol";
}
function getPropsSlot(slots, props3) {
  let prop = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "default";
  var _a, _b;
  return (_a = props3[prop]) !== null && _a !== void 0 ? _a : (_b = slots[prop]) === null || _b === void 0 ? void 0 : _b.call(slots);
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/supportsPassive.js
var supportsPassive = false;
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e2) {
}
var supportsPassive_default = supportsPassive;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-util/Dom/addEventListener.js
function addEventListenerWrap(target, eventType2, cb, option) {
  if (target && target.addEventListener) {
    let opt = option;
    if (opt === void 0 && supportsPassive_default && (eventType2 === "touchstart" || eventType2 === "touchmove" || eventType2 === "wheel")) {
      opt = {
        passive: false
      };
    }
    target.addEventListener(eventType2, cb, opt);
  }
  return {
    remove: () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventType2, cb);
      }
    }
  };
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/index.js
import { createVNode as _createVNode4, resolveDirective as _resolveDirective3 } from "vue";
import { defineComponent as defineComponent4, shallowRef as shallowRef4, watch as watch4 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/interface.js
var innerProps = {
  visible: Boolean,
  prefixCls: String,
  zIndex: Number,
  destroyPopupOnHide: Boolean,
  forceRender: Boolean,
  arrow: {
    type: Boolean,
    default: true
  },
  // Legacy Motion
  animation: [String, Object],
  transitionName: String,
  // Measure
  stretch: {
    type: String
  },
  // Align
  align: {
    type: Object
  },
  point: {
    type: Object
  },
  getRootDomNode: {
    type: Function
  },
  getClassNameFromAlign: {
    type: Function
  },
  onAlign: {
    type: Function
  },
  onMouseenter: {
    type: Function
  },
  onMouseleave: {
    type: Function
  },
  onMousedown: {
    type: Function
  },
  onTouchstart: {
    type: Function
  }
};
var mobileProps = _extends(_extends({}, innerProps), {
  mobile: {
    type: Object
  }
});
var popupProps = _extends(_extends({}, innerProps), {
  mask: Boolean,
  mobile: {
    type: Object
  },
  maskAnimation: String,
  maskTransitionName: String
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/Mask.js
import { withDirectives as _withDirectives, createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
import { Transition } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/utils/motionUtil.js
function getMotion(_ref) {
  let {
    prefixCls,
    animation,
    transitionName
  } = _ref;
  if (animation) {
    return {
      name: `${prefixCls}-${animation}`
    };
  }
  if (transitionName) {
    return {
      name: transitionName
    };
  }
  return {};
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/Mask.js
function Mask(props3) {
  const {
    prefixCls,
    visible,
    zIndex,
    mask,
    maskAnimation,
    maskTransitionName
  } = props3;
  if (!mask) {
    return null;
  }
  let motion = {};
  if (maskTransitionName || maskAnimation) {
    motion = getMotion({
      prefixCls,
      transitionName: maskTransitionName,
      animation: maskAnimation
    });
  }
  return _createVNode(Transition, _objectSpread2({
    "appear": true
  }, motion), {
    default: () => [_withDirectives(_createVNode("div", {
      "style": {
        zIndex
      },
      "class": `${prefixCls}-mask`
    }, null), [[_resolveDirective("if"), visible]])]
  });
}
Mask.displayName = "Mask";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/MobilePopupInner.js
import { createVNode as _createVNode2 } from "vue";
import { defineComponent, ref, Transition as Transition2 } from "vue";
var MobilePopupInner_default = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "MobilePopupInner",
  inheritAttrs: false,
  props: mobileProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props3, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const elementRef = ref();
    expose({
      forceAlign: () => {
      },
      getElement: () => elementRef.value
    });
    return () => {
      var _a;
      const {
        zIndex,
        visible,
        prefixCls,
        mobile: {
          popupClassName,
          popupStyle,
          popupMotion = {},
          popupRender
        } = {}
      } = props3;
      const mergedStyle = _extends({
        zIndex
      }, popupStyle);
      let childNode = flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
      if (childNode.length > 1) {
        const _childNode = /* @__PURE__ */ function() {
          return childNode;
        }();
        childNode = _createVNode2("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      if (popupRender) {
        childNode = popupRender(childNode);
      }
      const mergedClassName = classNames_default(prefixCls, popupClassName);
      return _createVNode2(Transition2, _objectSpread2({
        "ref": elementRef
      }, popupMotion), {
        default: () => [visible ? _createVNode2("div", {
          "class": mergedClassName,
          "style": mergedStyle
        }, [childNode]) : null]
      });
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/PopupInner.js
import { withDirectives as _withDirectives2, resolveDirective as _resolveDirective2, vShow as _vShow, createVNode as _createVNode3 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/useVisibleStatus.js
import { onBeforeUnmount, shallowRef, watch, onMounted } from "vue";
var __awaiter = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var StatusQueue = ["measure", "align", null, "motion"];
var useVisibleStatus_default = (visible, doMeasure) => {
  const status = shallowRef(null);
  const rafRef = shallowRef();
  const destroyRef = shallowRef(false);
  function setStatus(nextStatus) {
    if (!destroyRef.value) {
      status.value = nextStatus;
    }
  }
  function cancelRaf() {
    wrapperRaf.cancel(rafRef.value);
  }
  function goNextStatus(callback) {
    cancelRaf();
    rafRef.value = wrapperRaf(() => {
      let newStatus = status.value;
      switch (status.value) {
        case "align":
          newStatus = "motion";
          break;
        case "motion":
          newStatus = "stable";
          break;
        default:
      }
      setStatus(newStatus);
      callback === null || callback === void 0 ? void 0 : callback();
    });
  }
  watch(visible, () => {
    setStatus("measure");
  }, {
    immediate: true,
    flush: "post"
  });
  onMounted(() => {
    watch(status, () => {
      switch (status.value) {
        case "measure":
          doMeasure();
          break;
        default:
      }
      if (status.value) {
        rafRef.value = wrapperRaf(() => __awaiter(void 0, void 0, void 0, function* () {
          const index2 = StatusQueue.indexOf(status.value);
          const nextStatus = StatusQueue[index2 + 1];
          if (nextStatus && index2 !== -1) {
            setStatus(nextStatus);
          }
        }));
      }
    }, {
      immediate: true,
      flush: "post"
    });
  });
  onBeforeUnmount(() => {
    destroyRef.value = true;
    cancelRaf();
  });
  return [status, goNextStatus];
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/useStretchStyle.js
import { computed, shallowRef as shallowRef2 } from "vue";
var useStretchStyle_default = (stretch) => {
  const targetSize = shallowRef2({
    width: 0,
    height: 0
  });
  function measureStretch(element) {
    targetSize.value = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const style = computed(() => {
    const sizeStyle = {};
    if (stretch.value) {
      const {
        width,
        height
      } = targetSize.value;
      if (stretch.value.indexOf("height") !== -1 && height) {
        sizeStyle.height = `${height}px`;
      } else if (stretch.value.indexOf("minHeight") !== -1 && height) {
        sizeStyle.minHeight = `${height}px`;
      }
      if (stretch.value.indexOf("width") !== -1 && width) {
        sizeStyle.width = `${width}px`;
      } else if (stretch.value.indexOf("minWidth") !== -1 && width) {
        sizeStyle.minWidth = `${width}px`;
      }
    }
    return sizeStyle;
  });
  return [style, measureStretch];
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/PopupInner.js
import { computed as computed3, defineComponent as defineComponent3, shallowRef as shallowRef3, toRef, Transition as Transition3, watch as watch3, withModifiers } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-align/Align.js
import { nextTick, defineComponent as defineComponent2, ref as ref2, computed as computed2, onMounted as onMounted2, onUpdated, watch as watch2, onUnmounted } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/dom-align/dist-web/index.js
function ownKeys2(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread22(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = null != arguments[i2] ? arguments[i2] : {};
    i2 % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof2(obj) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof2(obj);
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var vendorPrefix;
var jsCssMap = {
  Webkit: "-webkit-",
  Moz: "-moz-",
  // IE did it wrong again ...
  ms: "-ms-",
  O: "-o-"
};
function getVendorPrefix() {
  if (vendorPrefix !== void 0) {
    return vendorPrefix;
  }
  vendorPrefix = "";
  var style = document.createElement("p").style;
  var testProp = "Transform";
  for (var key in jsCssMap) {
    if (key + testProp in style) {
      vendorPrefix = key;
    }
  }
  return vendorPrefix;
}
function getTransitionName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "TransitionProperty") : "transitionProperty";
}
function getTransformName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "Transform") : "transform";
}
function setTransitionProperty(node, value) {
  var name = getTransitionName();
  if (name) {
    node.style[name] = value;
    if (name !== "transitionProperty") {
      node.style.transitionProperty = value;
    }
  }
}
function setTransform(node, value) {
  var name = getTransformName();
  if (name) {
    node.style[name] = value;
    if (name !== "transform") {
      node.style.transform = value;
    }
  }
}
function getTransitionProperty(node) {
  return node.style.transitionProperty || node.style[getTransitionName()];
}
function getTransformXY(node) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue("transform") || style.getPropertyValue(getTransformName());
  if (transform && transform !== "none") {
    var matrix = transform.replace(/[^0-9\-.,]/g, "").split(",");
    return {
      x: parseFloat(matrix[12] || matrix[4], 0),
      y: parseFloat(matrix[13] || matrix[5], 0)
    };
  }
  return {
    x: 0,
    y: 0
  };
}
var matrix2d = /matrix\((.*)\)/;
var matrix3d = /matrix3d\((.*)\)/;
function setTransformXY(node, xy) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue("transform") || style.getPropertyValue(getTransformName());
  if (transform && transform !== "none") {
    var arr;
    var match2d = transform.match(matrix2d);
    if (match2d) {
      match2d = match2d[1];
      arr = match2d.split(",").map(function(item) {
        return parseFloat(item, 10);
      });
      arr[4] = xy.x;
      arr[5] = xy.y;
      setTransform(node, "matrix(".concat(arr.join(","), ")"));
    } else {
      var match3d = transform.match(matrix3d)[1];
      arr = match3d.split(",").map(function(item) {
        return parseFloat(item, 10);
      });
      arr[12] = xy.x;
      arr[13] = xy.y;
      setTransform(node, "matrix3d(".concat(arr.join(","), ")"));
    }
  } else {
    setTransform(node, "translateX(".concat(xy.x, "px) translateY(").concat(xy.y, "px) translateZ(0)"));
  }
}
var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
var getComputedStyleX;
function forceRelayout(elem) {
  var originalStyle = elem.style.display;
  elem.style.display = "none";
  elem.offsetHeight;
  elem.style.display = originalStyle;
}
function css(el, name, v2) {
  var value = v2;
  if (_typeof2(name) === "object") {
    for (var i2 in name) {
      if (name.hasOwnProperty(i2)) {
        css(el, i2, name[i2]);
      }
    }
    return void 0;
  }
  if (typeof value !== "undefined") {
    if (typeof value === "number") {
      value = "".concat(value, "px");
    }
    el.style[name] = value;
    return void 0;
  }
  return getComputedStyleX(el, name);
}
function getClientPosition(elem) {
  var box;
  var x2;
  var y2;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  box = elem.getBoundingClientRect();
  x2 = Math.floor(box.left);
  y2 = Math.floor(box.top);
  x2 -= docElem.clientLeft || body.clientLeft || 0;
  y2 -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x2,
    top: y2
  };
}
function getScroll(w2, top) {
  var ret = w2["page".concat(top ? "Y" : "X", "Offset")];
  var method = "scroll".concat(top ? "Top" : "Left");
  if (typeof ret !== "number") {
    var d2 = w2.document;
    ret = d2.documentElement[method];
    if (typeof ret !== "number") {
      ret = d2.body[method];
    }
  }
  return ret;
}
function getScrollLeft(w2) {
  return getScroll(w2);
}
function getScrollTop(w2) {
  return getScroll(w2, true);
}
function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w2 = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w2);
  pos.top += getScrollTop(w2);
  return pos;
}
function isWindow(obj) {
  return obj !== null && obj !== void 0 && obj == obj.window;
}
function getDocument(node) {
  if (isWindow(node)) {
    return node.document;
  }
  if (node.nodeType === 9) {
    return node;
  }
  return node.ownerDocument;
}
function _getComputedStyle(elem, name, cs) {
  var computedStyle = cs;
  var val = "";
  var d2 = getDocument(elem);
  computedStyle = computedStyle || d2.defaultView.getComputedStyle(elem, null);
  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }
  return val;
}
var _RE_NUM_NO_PX = new RegExp("^(".concat(RE_NUM, ")(?!px)[a-z%]+$"), "i");
var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = "currentStyle";
var RUNTIME_STYLE = "runtimeStyle";
var LEFT = "left";
var PX = "px";
function _getComputedStyleIE(elem, name) {
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];
  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    var style = elem.style;
    var left = style[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT];
    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];
    style[LEFT] = name === "fontSize" ? "1em" : ret || 0;
    ret = style.pixelLeft + PX;
    style[LEFT] = left;
    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }
  return ret === "" ? "auto" : ret;
}
if (typeof window !== "undefined") {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}
function getOffsetDirection(dir, option) {
  if (dir === "left") {
    return option.useCssRight ? "right" : dir;
  }
  return option.useCssBottom ? "bottom" : dir;
}
function oppositeOffsetDirection(dir) {
  if (dir === "left") {
    return "right";
  } else if (dir === "right") {
    return "left";
  } else if (dir === "top") {
    return "bottom";
  } else if (dir === "bottom") {
    return "top";
  }
}
function setLeftTop(elem, offset2, option) {
  if (css(elem, "position") === "static") {
    elem.style.position = "relative";
  }
  var presetH = -999;
  var presetV = -999;
  var horizontalProperty = getOffsetDirection("left", option);
  var verticalProperty = getOffsetDirection("top", option);
  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);
  if (horizontalProperty !== "left") {
    presetH = 999;
  }
  if (verticalProperty !== "top") {
    presetV = 999;
  }
  var originalTransition = "";
  var originalOffset = getOffset(elem);
  if ("left" in offset2 || "top" in offset2) {
    originalTransition = getTransitionProperty(elem) || "";
    setTransitionProperty(elem, "none");
  }
  if ("left" in offset2) {
    elem.style[oppositeHorizontalProperty] = "";
    elem.style[horizontalProperty] = "".concat(presetH, "px");
  }
  if ("top" in offset2) {
    elem.style[oppositeVerticalProperty] = "";
    elem.style[verticalProperty] = "".concat(presetV, "px");
  }
  forceRelayout(elem);
  var old = getOffset(elem);
  var originalStyle = {};
  for (var key in offset2) {
    if (offset2.hasOwnProperty(key)) {
      var dir = getOffsetDirection(key, option);
      var preset = key === "left" ? presetH : presetV;
      var off = originalOffset[key] - old[key];
      if (dir === key) {
        originalStyle[dir] = preset + off;
      } else {
        originalStyle[dir] = preset - off;
      }
    }
  }
  css(elem, originalStyle);
  forceRelayout(elem);
  if ("left" in offset2 || "top" in offset2) {
    setTransitionProperty(elem, originalTransition);
  }
  var ret = {};
  for (var _key in offset2) {
    if (offset2.hasOwnProperty(_key)) {
      var _dir = getOffsetDirection(_key, option);
      var _off = offset2[_key] - originalOffset[_key];
      if (_key === _dir) {
        ret[_dir] = originalStyle[_dir] + _off;
      } else {
        ret[_dir] = originalStyle[_dir] - _off;
      }
    }
  }
  css(elem, ret);
}
function setTransform$1(elem, offset2) {
  var originalOffset = getOffset(elem);
  var originalXY = getTransformXY(elem);
  var resultXY = {
    x: originalXY.x,
    y: originalXY.y
  };
  if ("left" in offset2) {
    resultXY.x = originalXY.x + offset2.left - originalOffset.left;
  }
  if ("top" in offset2) {
    resultXY.y = originalXY.y + offset2.top - originalOffset.top;
  }
  setTransformXY(elem, resultXY);
}
function setOffset(elem, offset2, option) {
  if (option.ignoreShake) {
    var oriOffset = getOffset(elem);
    var oLeft = oriOffset.left.toFixed(0);
    var oTop = oriOffset.top.toFixed(0);
    var tLeft = offset2.left.toFixed(0);
    var tTop = offset2.top.toFixed(0);
    if (oLeft === tLeft && oTop === tTop) {
      return;
    }
  }
  if (option.useCssRight || option.useCssBottom) {
    setLeftTop(elem, offset2, option);
  } else if (option.useCssTransform && getTransformName() in document.body.style) {
    setTransform$1(elem, offset2);
  } else {
    setLeftTop(elem, offset2, option);
  }
}
function each(arr, fn) {
  for (var i2 = 0; i2 < arr.length; i2++) {
    fn(arr[i2]);
  }
}
function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, "boxSizing") === "border-box";
}
var BOX_MODELS = ["margin", "border", "padding"];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;
function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name;
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }
  callback.call(elem);
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}
function getPBMWidth(elem, props3, which) {
  var value = 0;
  var prop;
  var j2;
  var i2;
  for (j2 = 0; j2 < props3.length; j2++) {
    prop = props3[j2];
    if (prop) {
      for (i2 = 0; i2 < which.length; i2++) {
        var cssProp = void 0;
        if (prop === "border") {
          cssProp = "".concat(prop).concat(which[i2], "Width");
        } else {
          cssProp = prop + which[i2];
        }
        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value;
}
var domUtils = {
  getParent: function getParent(element) {
    var parent = element;
    do {
      if (parent.nodeType === 11 && parent.host) {
        parent = parent.host;
      } else {
        parent = parent.parentNode;
      }
    } while (parent && parent.nodeType !== 1 && parent.nodeType !== 9);
    return parent;
  }
};
each(["Width", "Height"], function(name) {
  domUtils["doc".concat(name)] = function(refWin) {
    var d2 = refWin.document;
    return Math.max(
      // firefox chrome documentElement.scrollHeight< body.scrollHeight
      // ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d2.documentElement["scroll".concat(name)],
      // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d2.body["scroll".concat(name)],
      domUtils["viewport".concat(name)](d2)
    );
  };
  domUtils["viewport".concat(name)] = function(win) {
    var prop = "client".concat(name);
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop];
    return doc.compatMode === "CSS1Compat" && documentElementProp || body && body[prop] || documentElementProp;
  };
});
function getWH(elem, name, ex) {
  var extra = ex;
  if (isWindow(elem)) {
    return name === "width" ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === "width" ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  var which = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  var borderBoxValue = name === "width" ? Math.floor(elem.getBoundingClientRect().width) : Math.floor(elem.getBoundingClientRect().height);
  var isBorderBox = isBorderBoxFn(elem);
  var cssBoxValue = 0;
  if (borderBoxValue === null || borderBoxValue === void 0 || borderBoxValue <= 0) {
    borderBoxValue = void 0;
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue === null || cssBoxValue === void 0 || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    cssBoxValue = Math.floor(parseFloat(cssBoxValue)) || 0;
  }
  if (extra === void 0) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  var borderBoxValueOrIsBorderBox = borderBoxValue !== void 0 || isBorderBox;
  var val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ["border", "padding"], which);
    }
    return cssBoxValue;
  } else if (borderBoxValueOrIsBorderBox) {
    if (extra === BORDER_INDEX) {
      return val;
    }
    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ["border"], which) : getPBMWidth(elem, ["margin"], which));
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which);
}
var cssShow = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function getWHIgnoreDisplay() {
  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }
  var val;
  var elem = args[0];
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(void 0, args);
  } else {
    swap(elem, cssShow, function() {
      val = getWH.apply(void 0, args);
    });
  }
  return val;
}
each(["width", "height"], function(name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils["outer".concat(first)] = function(el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  var which = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  domUtils[name] = function(elem, v2) {
    var val = v2;
    if (val !== void 0) {
      if (elem) {
        var isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ["padding", "border"], which);
        }
        return css(elem, name, val);
      }
      return void 0;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});
function mix(to, from) {
  for (var i2 in from) {
    if (from.hasOwnProperty(i2)) {
      to[i2] = from[i2];
    }
  }
  return to;
}
var utils = {
  getWindow: function getWindow(node) {
    if (node && node.document && node.setTimeout) {
      return node;
    }
    var doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },
  getDocument,
  offset: function offset(el, value, option) {
    if (typeof value !== "undefined") {
      setOffset(el, value, option || {});
    } else {
      return getOffset(el);
    }
  },
  isWindow,
  each,
  css,
  clone: function clone(obj) {
    var i2;
    var ret = {};
    for (i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        ret[i2] = obj[i2];
      }
    }
    var overflow = obj.overflow;
    if (overflow) {
      for (i2 in obj) {
        if (obj.hasOwnProperty(i2)) {
          ret.overflow[i2] = obj.overflow[i2];
        }
      }
    }
    return ret;
  },
  mix,
  getWindowScrollLeft: function getWindowScrollLeft(w2) {
    return getScrollLeft(w2);
  },
  getWindowScrollTop: function getWindowScrollTop(w2) {
    return getScrollTop(w2);
  },
  merge: function merge() {
    var ret = {};
    for (var i2 = 0; i2 < arguments.length; i2++) {
      utils.mix(ret, i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2]);
    }
    return ret;
  },
  viewportWidth: 0,
  viewportHeight: 0
};
mix(utils, domUtils);
var getParent2 = utils.getParent;
function getOffsetParent(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return null;
  }
  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent;
  var positionStyle = utils.css(element, "position");
  var skipStatic = positionStyle === "fixed" || positionStyle === "absolute";
  if (!skipStatic) {
    return element.nodeName.toLowerCase() === "html" ? null : getParent2(element);
  }
  for (parent = getParent2(element); parent && parent !== body && parent.nodeType !== 9; parent = getParent2(parent)) {
    positionStyle = utils.css(parent, "position");
    if (positionStyle !== "static") {
      return parent;
    }
  }
  return null;
}
var getParent$1 = utils.getParent;
function isAncestorFixed(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return false;
  }
  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent = null;
  for (
    parent = getParent$1(element);
    // 修复元素位于 document.documentElement 下导致崩溃问题
    parent && parent !== body && parent !== doc;
    parent = getParent$1(parent)
  ) {
    var positionStyle = utils.css(parent, "position");
    if (positionStyle === "fixed") {
      return true;
    }
  }
  return false;
}
function getVisibleRectForElement(element, alwaysByViewport) {
  var visibleRect = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity
  };
  var el = getOffsetParent(element);
  var doc = utils.getDocument(element);
  var win = doc.defaultView || doc.parentWindow;
  var body = doc.body;
  var documentElement = doc.documentElement;
  while (el) {
    if ((navigator.userAgent.indexOf("MSIE") === -1 || el.clientWidth !== 0) && // body may have overflow set on it, yet we still get the entire
    // viewport. In some browsers, el.offsetParent may be
    // document.documentElement, so check for that too.
    el !== body && el !== documentElement && utils.css(el, "overflow") !== "visible") {
      var pos = utils.offset(el);
      pos.left += el.clientLeft;
      pos.top += el.clientTop;
      visibleRect.top = Math.max(visibleRect.top, pos.top);
      visibleRect.right = Math.min(
        visibleRect.right,
        // consider area without scrollBar
        pos.left + el.clientWidth
      );
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.left);
    } else if (el === body || el === documentElement) {
      break;
    }
    el = getOffsetParent(el);
  }
  var originalPosition = null;
  if (!utils.isWindow(element) && element.nodeType !== 9) {
    originalPosition = element.style.position;
    var position = utils.css(element, "position");
    if (position === "absolute") {
      element.style.position = "fixed";
    }
  }
  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);
  var documentWidth = documentElement.scrollWidth;
  var documentHeight = documentElement.scrollHeight;
  var bodyStyle = window.getComputedStyle(body);
  if (bodyStyle.overflowX === "hidden") {
    documentWidth = win.innerWidth;
  }
  if (bodyStyle.overflowY === "hidden") {
    documentHeight = win.innerHeight;
  }
  if (element.style) {
    element.style.position = originalPosition;
  }
  if (alwaysByViewport || isAncestorFixed(element)) {
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    visibleRect.right = Math.min(visibleRect.right, scrollX + viewportWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + viewportHeight);
  } else {
    var maxVisibleWidth = Math.max(documentWidth, scrollX + viewportWidth);
    visibleRect.right = Math.min(visibleRect.right, maxVisibleWidth);
    var maxVisibleHeight = Math.max(documentHeight, scrollY + viewportHeight);
    visibleRect.bottom = Math.min(visibleRect.bottom, maxVisibleHeight);
  }
  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
}
function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
  var pos = utils.clone(elFuturePos);
  var size = {
    width: elRegion.width,
    height: elRegion.height
  };
  if (overflow.adjustX && pos.left < visibleRect.left) {
    pos.left = visibleRect.left;
  }
  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
    size.width -= pos.left + size.width - visibleRect.right;
  }
  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
  }
  if (overflow.adjustY && pos.top < visibleRect.top) {
    pos.top = visibleRect.top;
  }
  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
    size.height -= pos.top + size.height - visibleRect.bottom;
  }
  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
  }
  return utils.mix(pos, size);
}
function getRegion(node) {
  var offset2;
  var w2;
  var h2;
  if (!utils.isWindow(node) && node.nodeType !== 9) {
    offset2 = utils.offset(node);
    w2 = utils.outerWidth(node);
    h2 = utils.outerHeight(node);
  } else {
    var win = utils.getWindow(node);
    offset2 = {
      left: utils.getWindowScrollLeft(win),
      top: utils.getWindowScrollTop(win)
    };
    w2 = utils.viewportWidth(win);
    h2 = utils.viewportHeight(win);
  }
  offset2.width = w2;
  offset2.height = h2;
  return offset2;
}
function getAlignOffset(region, align) {
  var V2 = align.charAt(0);
  var H = align.charAt(1);
  var w2 = region.width;
  var h2 = region.height;
  var x2 = region.left;
  var y2 = region.top;
  if (V2 === "c") {
    y2 += h2 / 2;
  } else if (V2 === "b") {
    y2 += h2;
  }
  if (H === "c") {
    x2 += w2 / 2;
  } else if (H === "r") {
    x2 += w2;
  }
  return {
    left: x2,
    top: y2
  };
}
function getElFuturePos(elRegion, refNodeRegion, points, offset2, targetOffset) {
  var p1 = getAlignOffset(refNodeRegion, points[1]);
  var p2 = getAlignOffset(elRegion, points[0]);
  var diff = [p2.left - p1.left, p2.top - p1.top];
  return {
    left: Math.round(elRegion.left - diff[0] + offset2[0] - targetOffset[0]),
    top: Math.round(elRegion.top - diff[1] + offset2[1] - targetOffset[1])
  };
}
function isFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
}
function isFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
}
function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
}
function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
}
function flip(points, reg, map) {
  var ret = [];
  utils.each(points, function(p) {
    ret.push(p.replace(reg, function(m2) {
      return map[m2];
    }));
  });
  return ret;
}
function flipOffset(offset2, index2) {
  offset2[index2] = -offset2[index2];
  return offset2;
}
function convertOffset(str, offsetLen) {
  var n2;
  if (/%$/.test(str)) {
    n2 = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
  } else {
    n2 = parseInt(str, 10);
  }
  return n2 || 0;
}
function normalizeOffset(offset2, el) {
  offset2[0] = convertOffset(offset2[0], el.width);
  offset2[1] = convertOffset(offset2[1], el.height);
}
function doAlign(el, tgtRegion, align, isTgtRegionVisible) {
  var points = align.points;
  var offset2 = align.offset || [0, 0];
  var targetOffset = align.targetOffset || [0, 0];
  var overflow = align.overflow;
  var source = align.source || el;
  offset2 = [].concat(offset2);
  targetOffset = [].concat(targetOffset);
  overflow = overflow || {};
  var newOverflowCfg = {};
  var fail = 0;
  var alwaysByViewport = !!(overflow && overflow.alwaysByViewport);
  var visibleRect = getVisibleRectForElement(source, alwaysByViewport);
  var elRegion = getRegion(source);
  normalizeOffset(offset2, elRegion);
  normalizeOffset(targetOffset, tgtRegion);
  var elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset2, targetOffset);
  var newElRegion = utils.merge(elRegion, elFuturePos);
  if (visibleRect && (overflow.adjustX || overflow.adjustY) && isTgtRegionVisible) {
    if (overflow.adjustX) {
      if (isFailX(elFuturePos, elRegion, visibleRect)) {
        var newPoints = flip(points, /[lr]/gi, {
          l: "r",
          r: "l"
        });
        var newOffset = flipOffset(offset2, 0);
        var newTargetOffset = flipOffset(targetOffset, 0);
        var newElFuturePos = getElFuturePos(elRegion, tgtRegion, newPoints, newOffset, newTargetOffset);
        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = newPoints;
          offset2 = newOffset;
          targetOffset = newTargetOffset;
        }
      }
    }
    if (overflow.adjustY) {
      if (isFailY(elFuturePos, elRegion, visibleRect)) {
        var _newPoints = flip(points, /[tb]/gi, {
          t: "b",
          b: "t"
        });
        var _newOffset = flipOffset(offset2, 1);
        var _newTargetOffset = flipOffset(targetOffset, 1);
        var _newElFuturePos = getElFuturePos(elRegion, tgtRegion, _newPoints, _newOffset, _newTargetOffset);
        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = _newPoints;
          offset2 = _newOffset;
          targetOffset = _newTargetOffset;
        }
      }
    }
    if (fail) {
      elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset2, targetOffset);
      utils.mix(newElRegion, elFuturePos);
    }
    var isStillFailX = isFailX(elFuturePos, elRegion, visibleRect);
    var isStillFailY = isFailY(elFuturePos, elRegion, visibleRect);
    if (isStillFailX || isStillFailY) {
      var _newPoints2 = points;
      if (isStillFailX) {
        _newPoints2 = flip(points, /[lr]/gi, {
          l: "r",
          r: "l"
        });
      }
      if (isStillFailY) {
        _newPoints2 = flip(points, /[tb]/gi, {
          t: "b",
          b: "t"
        });
      }
      points = _newPoints2;
      offset2 = align.offset || [0, 0];
      targetOffset = align.targetOffset || [0, 0];
    }
    newOverflowCfg.adjustX = overflow.adjustX && isStillFailX;
    newOverflowCfg.adjustY = overflow.adjustY && isStillFailY;
    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
      newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
    }
  }
  if (newElRegion.width !== elRegion.width) {
    utils.css(source, "width", utils.width(source) + newElRegion.width - elRegion.width);
  }
  if (newElRegion.height !== elRegion.height) {
    utils.css(source, "height", utils.height(source) + newElRegion.height - elRegion.height);
  }
  utils.offset(source, {
    left: newElRegion.left,
    top: newElRegion.top
  }, {
    useCssRight: align.useCssRight,
    useCssBottom: align.useCssBottom,
    useCssTransform: align.useCssTransform,
    ignoreShake: align.ignoreShake
  });
  return {
    points,
    offset: offset2,
    targetOffset,
    overflow: newOverflowCfg
  };
}
function isOutOfVisibleRect(target, alwaysByViewport) {
  var visibleRect = getVisibleRectForElement(target, alwaysByViewport);
  var targetRegion = getRegion(target);
  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
}
function alignElement(el, refNode, align) {
  var target = align.target || refNode;
  var refNodeRegion = getRegion(target);
  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target, align.overflow && align.overflow.alwaysByViewport);
  return doAlign(el, refNodeRegion, align, isTargetNotOutOfVisible);
}
alignElement.__getOffsetParent = getOffsetParent;
alignElement.__getVisibleRectForElement = getVisibleRectForElement;
function alignPoint(el, tgtPoint, align) {
  var pageX;
  var pageY;
  var doc = utils.getDocument(el);
  var win = doc.defaultView || doc.parentWindow;
  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);
  if ("pageX" in tgtPoint) {
    pageX = tgtPoint.pageX;
  } else {
    pageX = scrollX + tgtPoint.clientX;
  }
  if ("pageY" in tgtPoint) {
    pageY = tgtPoint.pageY;
  } else {
    pageY = scrollY + tgtPoint.clientY;
  }
  var tgtRegion = {
    left: pageX,
    top: pageY,
    width: 0,
    height: 0
  };
  var pointInView = pageX >= 0 && pageX <= scrollX + viewportWidth && pageY >= 0 && pageY <= scrollY + viewportHeight;
  var points = [align.points[0], "cc"];
  return doAlign(el, tgtRegion, _objectSpread22(_objectSpread22({}, align), {}, {
    points
  }), pointInView);
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/vnode.js
import { cloneVNode, isVNode as isVNode2, Comment as Comment2, Fragment as Fragment2, render as VueRender } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/warning.js
function noop2() {
}
var warning2 = noop2;
if (true) {
  warning2 = (valid, component, message) => {
    warning_default(valid, `[ant-design-vue: ${component}] ${message}`);
    if (false) {
      resetWarned();
    }
  };
}
var warning_default2 = warning2;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/vnode.js
function cloneElement(vnode) {
  let nodeProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  let mergeRef = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  let ele = vnode;
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0];
  }
  if (!ele) {
    return null;
  }
  const node = cloneVNode(ele, nodeProps, mergeRef);
  node.props = override ? _extends(_extends({}, node.props), nodeProps) : node.props;
  warning_default2(typeof node.props.class !== "object", "class must be string");
  return node;
}
function cloneVNodes(vnodes) {
  let nodeProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  return vnodes.map((vnode) => cloneElement(vnode, nodeProps, override));
}
function deepCloneElement(vnode) {
  let nodeProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  let mergeRef = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (Array.isArray(vnode)) {
    return vnode.map((item) => deepCloneElement(item, nodeProps, override, mergeRef));
  } else {
    if (!isVNode2(vnode)) {
      return vnode;
    }
    const cloned = cloneElement(vnode, nodeProps, override, mergeRef);
    if (Array.isArray(cloned.children)) {
      cloned.children = deepCloneElement(cloned.children);
    }
    return cloned;
  }
}
function triggerVNodeUpdate(vm, attrs, dom) {
  VueRender(cloneVNode(vm, _extends({}, attrs)), dom);
}
var ensureValidVNode = (slot) => {
  return (slot || []).some((child) => {
    if (!isVNode2(child))
      return true;
    if (child.type === Comment2)
      return false;
    if (child.type === Fragment2 && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? slot : null;
};
function customRenderSlot(slots, name, props3, fallback) {
  var _a;
  const slot = (_a = slots[name]) === null || _a === void 0 ? void 0 : _a.call(slots, props3);
  if (ensureValidVNode(slot)) {
    return slot;
  }
  return fallback === null || fallback === void 0 ? void 0 : fallback();
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-util/Dom/isVisible.js
var isVisible_default = (element) => {
  if (!element) {
    return false;
  }
  if (element.offsetParent) {
    return true;
  }
  if (element.getBBox) {
    const box = element.getBBox();
    if (box.width || box.height) {
      return true;
    }
  }
  if (element.getBoundingClientRect) {
    const box = element.getBoundingClientRect();
    if (box.width || box.height) {
      return true;
    }
  }
  return false;
};

// ../../../../../../project/记账/demo_front/node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props3) {
  for (var _i = 0, _a = Object.keys(props3); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props3[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x2 = _a.x, y2 = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x: x2,
    y: y2,
    width,
    height,
    top: y2,
    right: x2 + width,
    bottom: height + y2,
    left: x2
  });
  return rect;
}
function createRectInit(x2, y2, width, height) {
  return { x: x2, y: y2, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
}();
var ResizeObserver_es_default = index;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-align/util.js
function isSamePoint(prev, next) {
  if (prev === next)
    return true;
  if (!prev || !next)
    return false;
  if ("pageX" in next && "pageY" in next) {
    return prev.pageX === next.pageX && prev.pageY === next.pageY;
  }
  if ("clientX" in next && "clientY" in next) {
    return prev.clientX === next.clientX && prev.clientY === next.clientY;
  }
  return false;
}
function restoreFocus(activeElement, container) {
  if (activeElement !== document.activeElement && contains(container, activeElement) && typeof activeElement.focus === "function") {
    activeElement.focus();
  }
}
function monitorResize(element, callback) {
  let prevWidth = null;
  let prevHeight = null;
  function onResize(_ref) {
    let [{
      target
    }] = _ref;
    if (!document.documentElement.contains(target))
      return;
    const {
      width,
      height
    } = target.getBoundingClientRect();
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      Promise.resolve().then(() => {
        callback({
          width: fixedWidth,
          height: fixedHeight
        });
      });
    }
    prevWidth = fixedWidth;
    prevHeight = fixedHeight;
  }
  const resizeObserver = new ResizeObserver_es_default(onResize);
  if (element) {
    resizeObserver.observe(element);
  }
  return () => {
    resizeObserver.disconnect();
  };
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-align/hooks/useBuffer.js
var useBuffer_default = (callback, buffer) => {
  let called = false;
  let timeout = null;
  function cancelTrigger() {
    clearTimeout(timeout);
  }
  function trigger(force) {
    if (!called || force === true) {
      if (callback() === false) {
        return;
      }
      called = true;
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
      }, buffer.value);
    } else {
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
        trigger();
      }, buffer.value);
    }
  }
  return [trigger, () => {
    called = false;
    cancelTrigger();
  }];
};

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
var listCacheGet_default = listCacheGet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty2 = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isObject.js
function isObject2(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction2(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var toSource_default = toSource;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty3 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty3).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto4 = Object.prototype;
var hasOwnProperty4 = objectProto4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty4.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_hashHas.js
var objectProto5 = Object.prototype;
var hasOwnProperty5 = objectProto5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty5.call(data, key);
}
var hashHas_default = hashHas;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_SetCache.js
function SetCache(values) {
  var index2 = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache_default();
  while (++index2 < length) {
    this.add(values[index2]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (predicate(array[index2], index2, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index2 < arrLength) {
    var arrValue = array[index2], othValue = other[index2];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_Uint8Array.js
var Uint8Array = root_default.Uint8Array;
var Uint8Array_default = Uint8Array;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_mapToArray.js
function mapToArray(map) {
  var index2 = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index2] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index2 = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index2] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq_default(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray_default;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  var index2 = -1, length = values.length, offset2 = array.length;
  while (++index2 < length) {
    array[offset2 + index2] = values[index2];
  }
  return array;
}
var arrayPush_default = arrayPush;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isArray.js
var isArray2 = Array.isArray;
var isArray_default = isArray2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_getSymbols.js
var objectProto6 = Object.prototype;
var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseTimes.js
function baseTimes(n2, iteratee) {
  var index2 = -1, result = Array(n2);
  while (++index2 < n2) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var baseTimes_default = baseTimes;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isArguments.js
var objectProto7 = Object.prototype;
var hasOwnProperty6 = objectProto7.hasOwnProperty;
var propertyIsEnumerable2 = objectProto7.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty6.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
};
var isArguments_default = isArguments;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag2 = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag2 = "[object Map]";
var numberTag2 = "[object Number]";
var objectTag = "[object Object]";
var regexpTag2 = "[object RegExp]";
var setTag2 = "[object Set]";
var stringTag2 = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag2 = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag2] = typedArrayTags[boolTag2] = typedArrayTags[dataViewTag2] = typedArrayTags[dateTag2] = typedArrayTags[errorTag2] = typedArrayTags[funcTag2] = typedArrayTags[mapTag2] = typedArrayTags[numberTag2] = typedArrayTags[objectTag] = typedArrayTags[regexpTag2] = typedArrayTags[setTag2] = typedArrayTags[stringTag2] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e2) {
  }
}();
var nodeUtil_default = nodeUtil;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_arrayLikeKeys.js
var objectProto8 = Object.prototype;
var hasOwnProperty7 = objectProto8.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_isPrototype.js
var objectProto9 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto9;
  return value === proto;
}
var isPrototype_default = isPrototype;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseKeys.js
var objectProto10 = Object.prototype;
var hasOwnProperty8 = objectProto10.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty8.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto11 = Object.prototype;
var hasOwnProperty9 = objectProto11.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index2 = objLength;
  while (index2--) {
    var key = objProps[index2];
    if (!(isPartial ? key in other : hasOwnProperty9.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index2 < objLength) {
    key = objProps[index2];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView");
var DataView_default = DataView;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set");
var Set_default = Set2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_WeakMap.js
var WeakMap2 = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap2;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_getTag.js
var mapTag3 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag3 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag3 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag3 || Map_default && getTag(new Map_default()) != mapTag3 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag3 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag3;
        case mapCtorString:
          return mapTag3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag3;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var objectTag3 = "[object Object]";
var objectProto12 = Object.prototype;
var hasOwnProperty10 = objectProto12.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag2 : getTag_default(object), othTag = othIsArr ? arrayTag2 : getTag_default(other);
  objTag = objTag == argsTag3 ? objectTag3 : objTag;
  othTag = othTag == argsTag3 ? objectTag3 : othTag;
  var objIsObj = objTag == objectTag3, othIsObj = othTag == objectTag3, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty10.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty10.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// ../../../../../../project/记账/demo_front/node_modules/lodash-es/isEqual.js
function isEqual(value, other) {
  return baseIsEqual_default(value, other);
}
var isEqual_default = isEqual;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-align/Align.js
var alignProps = {
  align: Object,
  target: [Object, Function],
  onAlign: Function,
  monitorBufferTime: Number,
  monitorWindowResize: Boolean,
  disabled: Boolean
};
function getElement(func) {
  if (typeof func !== "function")
    return null;
  return func();
}
function getPoint(point) {
  if (typeof point !== "object" || !point)
    return null;
  return point;
}
var Align_default = defineComponent2({
  compatConfig: {
    MODE: 3
  },
  name: "Align",
  props: alignProps,
  emits: ["align"],
  setup(props3, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const cacheRef = ref2({});
    const nodeRef = ref2();
    const [forceAlign, cancelForceAlign] = useBuffer_default(() => {
      const {
        disabled: latestDisabled,
        target: latestTarget,
        align: latestAlign,
        onAlign: latestOnAlign
      } = props3;
      if (!latestDisabled && latestTarget && nodeRef.value) {
        const source = nodeRef.value;
        let result;
        const element = getElement(latestTarget);
        const point = getPoint(latestTarget);
        cacheRef.value.element = element;
        cacheRef.value.point = point;
        cacheRef.value.align = latestAlign;
        const {
          activeElement
        } = document;
        if (element && isVisible_default(element)) {
          result = alignElement(source, element, latestAlign);
        } else if (point) {
          result = alignPoint(source, point, latestAlign);
        }
        restoreFocus(activeElement, source);
        if (latestOnAlign && result) {
          latestOnAlign(source, result);
        }
        return true;
      }
      return false;
    }, computed2(() => props3.monitorBufferTime));
    const resizeMonitor = ref2({
      cancel: () => {
      }
    });
    const sourceResizeMonitor = ref2({
      cancel: () => {
      }
    });
    const goAlign = () => {
      const target = props3.target;
      const element = getElement(target);
      const point = getPoint(target);
      if (nodeRef.value !== sourceResizeMonitor.value.element) {
        sourceResizeMonitor.value.cancel();
        sourceResizeMonitor.value.element = nodeRef.value;
        sourceResizeMonitor.value.cancel = monitorResize(nodeRef.value, forceAlign);
      }
      if (cacheRef.value.element !== element || !isSamePoint(cacheRef.value.point, point) || !isEqual_default(cacheRef.value.align, props3.align)) {
        forceAlign();
        if (resizeMonitor.value.element !== element) {
          resizeMonitor.value.cancel();
          resizeMonitor.value.element = element;
          resizeMonitor.value.cancel = monitorResize(element, forceAlign);
        }
      }
    };
    onMounted2(() => {
      nextTick(() => {
        goAlign();
      });
    });
    onUpdated(() => {
      nextTick(() => {
        goAlign();
      });
    });
    watch2(() => props3.disabled, (disabled) => {
      if (!disabled) {
        forceAlign();
      } else {
        cancelForceAlign();
      }
    }, {
      immediate: true,
      flush: "post"
    });
    const winResizeRef = ref2(null);
    watch2(() => props3.monitorWindowResize, (monitorWindowResize) => {
      if (monitorWindowResize) {
        if (!winResizeRef.value) {
          winResizeRef.value = addEventListenerWrap(window, "resize", forceAlign);
        }
      } else if (winResizeRef.value) {
        winResizeRef.value.remove();
        winResizeRef.value = null;
      }
    }, {
      flush: "post"
    });
    onUnmounted(() => {
      resizeMonitor.value.cancel();
      sourceResizeMonitor.value.cancel();
      if (winResizeRef.value)
        winResizeRef.value.remove();
      cancelForceAlign();
    });
    expose({
      forceAlign: () => forceAlign(true)
    });
    return () => {
      const child = slots === null || slots === void 0 ? void 0 : slots.default();
      if (child) {
        return cloneElement(child[0], {
          ref: nodeRef
        }, true, true);
      }
      return null;
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/transition.js
import { nextTick as nextTick2 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/type.js
var tuple = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
var tupleNum = function() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return args;
};
var withInstall = (comp) => {
  const c2 = comp;
  c2.install = function(app) {
    app.component(c2.displayName || c2.name, comp);
  };
  return comp;
};
function eventType() {
  return {
    type: [Function, Array]
  };
}
function objectType(defaultVal) {
  return {
    type: Object,
    default: defaultVal
  };
}
function booleanType(defaultVal) {
  return {
    type: Boolean,
    default: defaultVal
  };
}
function functionType(defaultVal) {
  return {
    type: Function,
    default: defaultVal
  };
}
function anyType(defaultVal, required) {
  const type = {
    validator: () => true,
    default: defaultVal
  };
  return required ? type : type;
}
function vNodeType() {
  return {
    validator: () => true
  };
}
function arrayType(defaultVal) {
  return {
    type: Array,
    default: defaultVal
  };
}
function stringType(defaultVal) {
  return {
    type: String,
    default: defaultVal
  };
}
function someType(types, defaultVal) {
  return types ? {
    type: types,
    default: defaultVal
  } : anyType(defaultVal);
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/transition.js
var SelectPlacements = tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
var getTransitionDirection = (placement) => {
  if (placement !== void 0 && (placement === "topLeft" || placement === "topRight")) {
    return `slide-down`;
  }
  return `slide-up`;
};
var getTransitionProps = function(transitionName) {
  let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const transitionProps = transitionName ? _extends({
    name: transitionName,
    appear: true,
    // type: 'animation',
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    // appearActiveClass: `antdv-base-transtion`,
    // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
    enterFromClass: `${transitionName}-enter ${transitionName}-enter-prepare ${transitionName}-enter-start`,
    enterActiveClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
    enterToClass: `${transitionName}-enter ${transitionName}-enter-active`,
    leaveFromClass: ` ${transitionName}-leave`,
    leaveActiveClass: `${transitionName}-leave ${transitionName}-leave-active`,
    leaveToClass: `${transitionName}-leave ${transitionName}-leave-active`
  }, opt) : _extends({
    css: false
  }, opt);
  return transitionProps;
};
var getTransitionGroupProps = function(transitionName) {
  let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const transitionProps = transitionName ? _extends({
    name: transitionName,
    appear: true,
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    appearActiveClass: `${transitionName}`,
    appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
    enterFromClass: `${transitionName}-appear ${transitionName}-enter ${transitionName}-appear-prepare ${transitionName}-enter-prepare`,
    enterActiveClass: `${transitionName}`,
    enterToClass: `${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-active ${transitionName}-enter-active`,
    leaveActiveClass: `${transitionName} ${transitionName}-leave`,
    leaveToClass: `${transitionName}-leave-active`
  }, opt) : _extends({
    css: false
  }, opt);
  return transitionProps;
};
var getTransitionName2 = (rootPrefixCls, motion, transitionName) => {
  if (transitionName !== void 0) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/PopupInner.js
var PopupInner_default = defineComponent3({
  compatConfig: {
    MODE: 3
  },
  name: "PopupInner",
  inheritAttrs: false,
  props: innerProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props3, _ref) {
    let {
      expose,
      attrs,
      slots
    } = _ref;
    const alignRef = shallowRef3();
    const elementRef = shallowRef3();
    const alignedClassName = shallowRef3();
    const [stretchStyle, measureStretchStyle] = useStretchStyle_default(toRef(props3, "stretch"));
    const doMeasure = () => {
      if (props3.stretch) {
        measureStretchStyle(props3.getRootDomNode());
      }
    };
    const visible = shallowRef3(false);
    let timeoutId;
    watch3(() => props3.visible, (val) => {
      clearTimeout(timeoutId);
      if (val) {
        timeoutId = setTimeout(() => {
          visible.value = props3.visible;
        });
      } else {
        visible.value = false;
      }
    }, {
      immediate: true
    });
    const [status, goNextStatus] = useVisibleStatus_default(visible, doMeasure);
    const prepareResolveRef = shallowRef3();
    const getAlignTarget = () => {
      if (props3.point) {
        return props3.point;
      }
      return props3.getRootDomNode;
    };
    const forceAlign = () => {
      var _a;
      (_a = alignRef.value) === null || _a === void 0 ? void 0 : _a.forceAlign();
    };
    const onInternalAlign = (popupDomNode, matchAlign) => {
      var _a;
      const nextAlignedClassName = props3.getClassNameFromAlign(matchAlign);
      const preAlignedClassName = alignedClassName.value;
      if (alignedClassName.value !== nextAlignedClassName) {
        alignedClassName.value = nextAlignedClassName;
      }
      if (status.value === "align") {
        if (preAlignedClassName !== nextAlignedClassName) {
          Promise.resolve().then(() => {
            forceAlign();
          });
        } else {
          goNextStatus(() => {
            var _a2;
            (_a2 = prepareResolveRef.value) === null || _a2 === void 0 ? void 0 : _a2.call(prepareResolveRef);
          });
        }
        (_a = props3.onAlign) === null || _a === void 0 ? void 0 : _a.call(props3, popupDomNode, matchAlign);
      }
    };
    const motion = computed3(() => {
      const m2 = typeof props3.animation === "object" ? props3.animation : getMotion(props3);
      ["onAfterEnter", "onAfterLeave"].forEach((eventName) => {
        const originFn = m2[eventName];
        m2[eventName] = (node) => {
          goNextStatus();
          status.value = "stable";
          originFn === null || originFn === void 0 ? void 0 : originFn(node);
        };
      });
      return m2;
    });
    const onShowPrepare = () => {
      return new Promise((resolve) => {
        prepareResolveRef.value = resolve;
      });
    };
    watch3([motion, status], () => {
      if (!motion.value && status.value === "motion") {
        goNextStatus();
      }
    }, {
      immediate: true
    });
    expose({
      forceAlign,
      getElement: () => {
        return elementRef.value.$el || elementRef.value;
      }
    });
    const alignDisabled = computed3(() => {
      var _a;
      if (((_a = props3.align) === null || _a === void 0 ? void 0 : _a.points) && (status.value === "align" || status.value === "stable")) {
        return false;
      }
      return true;
    });
    return () => {
      var _a;
      const {
        zIndex,
        align,
        prefixCls,
        destroyPopupOnHide,
        onMouseenter,
        onMouseleave,
        onTouchstart = () => {
        },
        onMousedown
      } = props3;
      const statusValue = status.value;
      const mergedStyle = [_extends(_extends({}, stretchStyle.value), {
        zIndex,
        opacity: statusValue === "motion" || statusValue === "stable" || !visible.value ? null : 0,
        // pointerEvents: statusValue === 'stable' ? null : 'none',
        pointerEvents: !visible.value && statusValue !== "stable" ? "none" : null
      }), attrs.style];
      let childNode = flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, {
        visible: props3.visible
      }));
      if (childNode.length > 1) {
        const _childNode = /* @__PURE__ */ function() {
          return childNode;
        }();
        childNode = _createVNode3("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      const mergedClassName = classNames_default(prefixCls, attrs.class, alignedClassName.value, !props3.arrow && `${prefixCls}-arrow-hidden`);
      const hasAnimate = visible.value || !props3.visible;
      const transitionProps = hasAnimate ? getTransitionProps(motion.value.name, motion.value) : {};
      return _createVNode3(Transition3, _objectSpread2(_objectSpread2({
        "ref": elementRef
      }, transitionProps), {}, {
        "onBeforeEnter": onShowPrepare
      }), {
        default: () => {
          return !destroyPopupOnHide || props3.visible ? _withDirectives2(_createVNode3(Align_default, {
            "target": getAlignTarget(),
            "key": "popup",
            "ref": alignRef,
            "monitorWindowResize": true,
            "disabled": alignDisabled.value,
            "align": align,
            "onAlign": onInternalAlign
          }, {
            default: () => _createVNode3("div", {
              "class": mergedClassName,
              "onMouseenter": onMouseenter,
              "onMouseleave": onMouseleave,
              "onMousedown": withModifiers(onMousedown, ["capture"]),
              [supportsPassive_default ? "onTouchstartPassive" : "onTouchstart"]: withModifiers(onTouchstart, ["capture"]),
              "style": mergedStyle
            }, [childNode])
          }), [[_vShow, visible.value]]) : null;
        }
      });
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Popup/index.js
var Popup_default = defineComponent4({
  compatConfig: {
    MODE: 3
  },
  name: "Popup",
  inheritAttrs: false,
  props: popupProps,
  setup(props3, _ref) {
    let {
      attrs,
      slots,
      expose
    } = _ref;
    const innerVisible = shallowRef4(false);
    const inMobile = shallowRef4(false);
    const popupRef = shallowRef4();
    const rootRef = shallowRef4();
    watch4([() => props3.visible, () => props3.mobile], () => {
      innerVisible.value = props3.visible;
      if (props3.visible && props3.mobile) {
        inMobile.value = true;
      }
    }, {
      immediate: true,
      flush: "post"
    });
    expose({
      forceAlign: () => {
        var _a;
        (_a = popupRef.value) === null || _a === void 0 ? void 0 : _a.forceAlign();
      },
      getElement: () => {
        var _a;
        return (_a = popupRef.value) === null || _a === void 0 ? void 0 : _a.getElement();
      }
    });
    return () => {
      const cloneProps = _extends(_extends(_extends({}, props3), attrs), {
        visible: innerVisible.value
      });
      const popupNode = inMobile.value ? _createVNode4(MobilePopupInner_default, _objectSpread2(_objectSpread2({}, cloneProps), {}, {
        "mobile": props3.mobile,
        "ref": popupRef
      }), {
        default: slots.default
      }) : _createVNode4(PopupInner_default, _objectSpread2(_objectSpread2({}, cloneProps), {}, {
        "ref": popupRef
      }), {
        default: slots.default
      });
      return _createVNode4("div", {
        "ref": rootRef
      }, [_createVNode4(Mask, cloneProps, null), popupNode]);
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/utils/alignUtil.js
function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  const baseAlign = builtinPlacements[placementStr] || {};
  return _extends(_extends({}, baseAlign), align);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  const {
    points
  } = align;
  const placements = Object.keys(builtinPlacements);
  for (let i2 = 0; i2 < placements.length; i2 += 1) {
    const placement = placements[i2];
    if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
      return `${prefixCls}-placement-${placement}`;
    }
  }
  return "";
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/BaseMixin.js
import { nextTick as nextTick3 } from "vue";
var BaseMixin_default = {
  methods: {
    setState() {
      let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      let callback = arguments.length > 1 ? arguments[1] : void 0;
      let newState = typeof state === "function" ? state(this.$data, this.$props) : state;
      if (this.getDerivedStateFromProps) {
        const s2 = this.getDerivedStateFromProps(getOptionProps(this), _extends(_extends({}, this.$data), newState));
        if (s2 === null) {
          return;
        } else {
          newState = _extends(_extends({}, newState), s2 || {});
        }
      }
      _extends(this.$data, newState);
      if (this._.isMounted) {
        this.$forceUpdate();
      }
      nextTick3(() => {
        callback && callback();
      });
    },
    __emit() {
      const args = [].slice.call(arguments, 0);
      let eventName = args[0];
      eventName = `on${eventName[0].toUpperCase()}${eventName.substring(1)}`;
      const event = this.$props[eventName] || this.$attrs[eventName];
      if (args.length && event) {
        if (Array.isArray(event)) {
          for (let i2 = 0, l2 = event.length; i2 < l2; i2++) {
            event[i2](...args.slice(1));
          }
        } else {
          event(...args.slice(1));
        }
      }
    }
  }
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/PortalWrapper.js
import { createVNode as _createVNode6, resolveDirective as _resolveDirective5 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/Portal.js
import { createVNode as _createVNode5, resolveDirective as _resolveDirective4 } from "vue";
import { defineComponent as defineComponent5, nextTick as nextTick4, onBeforeMount, onMounted as onMounted3, onUpdated as onUpdated2, Teleport, watch as watch5 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/context.js
import { computed as computed4, inject, provide } from "vue";
var PortalContextKey = Symbol("PortalContextKey");
var useProvidePortal = function(instance) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    inTriggerContext: true
  };
  provide(PortalContextKey, {
    inTriggerContext: config.inTriggerContext,
    shouldRender: computed4(() => {
      const {
        sPopupVisible,
        popupRef,
        forceRender,
        autoDestroy
      } = instance || {};
      let shouldRender = false;
      if (sPopupVisible || popupRef || forceRender) {
        shouldRender = true;
      }
      if (!sPopupVisible && autoDestroy) {
        shouldRender = false;
      }
      return shouldRender;
    })
  });
};
var useInjectPortal = () => {
  useProvidePortal({}, {
    inTriggerContext: false
  });
  const portalContext = inject(PortalContextKey, {
    shouldRender: computed4(() => false),
    inTriggerContext: false
  });
  return {
    shouldRender: computed4(() => portalContext.shouldRender.value || portalContext.inTriggerContext === false)
  };
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/Portal.js
var Portal_default = defineComponent5({
  compatConfig: {
    MODE: 3
  },
  name: "Portal",
  inheritAttrs: false,
  props: {
    getContainer: vue_types_default.func.isRequired,
    didUpdate: Function
  },
  setup(props3, _ref) {
    let {
      slots
    } = _ref;
    let isSSR = true;
    let container;
    const {
      shouldRender
    } = useInjectPortal();
    function setContainer() {
      if (shouldRender.value) {
        container = props3.getContainer();
      }
    }
    onBeforeMount(() => {
      isSSR = false;
      setContainer();
    });
    onMounted3(() => {
      if (container)
        return;
      setContainer();
    });
    const stopWatch = watch5(shouldRender, () => {
      if (shouldRender.value && !container) {
        container = props3.getContainer();
      }
      if (container) {
        stopWatch();
      }
    });
    onUpdated2(() => {
      nextTick4(() => {
        var _a;
        if (shouldRender.value) {
          (_a = props3.didUpdate) === null || _a === void 0 ? void 0 : _a.call(props3, props3);
        }
      });
    });
    return () => {
      var _a;
      if (!shouldRender.value)
        return null;
      if (isSSR) {
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      }
      return container ? _createVNode5(Teleport, {
        "to": container
      }, slots) : null;
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/PortalWrapper.js
import { defineComponent as defineComponent6, shallowRef as shallowRef5, watch as watch6, onMounted as onMounted4, onBeforeUnmount as onBeforeUnmount2, onUpdated as onUpdated3, nextTick as nextTick5, computed as computed6 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/canUseDom.js
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var canUseDom_default = canUseDom;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/hooks/useScrollLocker.js
import { computed as computed5, watchEffect } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-util/Dom/dynamicCSS.js
var APPEND_ORDER = "data-vc-order";
var MARK_KEY = `vc-util-key`;
var containerCache = /* @__PURE__ */ new Map();
function getMark() {
  let {
    mark
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector("head");
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter((node) => node.tagName === "STYLE");
}
function injectCSS(css2) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!canUseDom_default()) {
    return null;
  }
  const {
    csp,
    prepend
  } = option;
  const styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
  if (csp === null || csp === void 0 ? void 0 : csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css2;
  const container = getContainer(option);
  const {
    firstChild
  } = container;
  if (prepend) {
    if (prepend === "queue") {
      const existStyle = findStyles(container).filter((node) => ["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER)));
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const container = getContainer(option);
  return findStyles(container).find((node) => node.getAttribute(getMark(option)) === key);
}
function removeCSS(key) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const existNode = findExistNode(key, option);
  if (existNode) {
    const container = getContainer(option);
    container.removeChild(existNode);
  }
}
function syncRealContainer(container, option) {
  const cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    const placeholderStyle = injectCSS("", option);
    const {
      parentNode
    } = placeholderStyle;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function updateCSS(css2, key) {
  let option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var _a, _b, _c;
  const container = getContainer(option);
  syncRealContainer(container, option);
  const existNode = findExistNode(key, option);
  if (existNode) {
    if (((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) && existNode.nonce !== ((_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce)) {
      existNode.nonce = (_c = option.csp) === null || _c === void 0 ? void 0 : _c.nonce;
    }
    if (existNode.innerHTML !== css2) {
      existNode.innerHTML = css2;
    }
    return existNode;
  }
  const newNode = injectCSS(css2, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/getScrollBarSize.js
var cached;
function getScrollBarSize(fresh) {
  if (typeof document === "undefined") {
    return 0;
  }
  if (fresh || cached === void 0) {
    const inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "200px";
    const outer = document.createElement("div");
    const outerStyle = outer.style;
    outerStyle.position = "absolute";
    outerStyle.top = "0";
    outerStyle.left = "0";
    outerStyle.pointerEvents = "none";
    outerStyle.visibility = "hidden";
    outerStyle.width = "200px";
    outerStyle.height = "150px";
    outerStyle.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    const widthContained = inner.offsetWidth;
    outer.style.overflow = "scroll";
    let widthScroll = inner.offsetWidth;
    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }
    document.body.removeChild(outer);
    cached = widthContained - widthScroll;
  }
  return cached;
}
function ensureSize(str) {
  const match2 = str.match(/^(.*)px$/);
  const value = Number(match2 === null || match2 === void 0 ? void 0 : match2[1]);
  return Number.isNaN(value) ? getScrollBarSize() : value;
}
function getTargetScrollBarSize(target) {
  if (typeof document === "undefined" || !target || !(target instanceof Element)) {
    return {
      width: 0,
      height: 0
    };
  }
  const {
    width,
    height
  } = getComputedStyle(target, "::-webkit-scrollbar");
  return {
    width: ensureSize(width),
    height: ensureSize(height)
  };
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/hooks/useScrollLocker.js
var UNIQUE_ID = `vc-util-locker-${Date.now()}`;
var uuid = 0;
function isBodyOverflowing() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
function useScrollLocker(lock) {
  const mergedLock = computed5(() => !!lock && !!lock.value);
  uuid += 1;
  const id = `${UNIQUE_ID}_${uuid}`;
  watchEffect((onClear) => {
    if (!canUseDom_default()) {
      return;
    }
    if (mergedLock.value) {
      const scrollbarSize = getScrollBarSize();
      const isOverflow = isBodyOverflowing();
      updateCSS(`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ""}
}`, id);
    } else {
      removeCSS(id);
    }
    onClear(() => {
      removeCSS(id);
    });
  }, {
    flush: "post"
  });
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/PortalWrapper.js
var openCount = 0;
var supportDom = canUseDom_default();
var getParent3 = (getContainer2) => {
  if (!supportDom) {
    return null;
  }
  if (getContainer2) {
    if (typeof getContainer2 === "string") {
      return document.querySelectorAll(getContainer2)[0];
    }
    if (typeof getContainer2 === "function") {
      return getContainer2();
    }
    if (typeof getContainer2 === "object" && getContainer2 instanceof window.HTMLElement) {
      return getContainer2;
    }
  }
  return document.body;
};
var PortalWrapper_default = defineComponent6({
  compatConfig: {
    MODE: 3
  },
  name: "PortalWrapper",
  inheritAttrs: false,
  props: {
    wrapperClassName: String,
    forceRender: {
      type: Boolean,
      default: void 0
    },
    getContainer: vue_types_default.any,
    visible: {
      type: Boolean,
      default: void 0
    },
    autoLock: booleanType(),
    didUpdate: Function
  },
  setup(props3, _ref) {
    let {
      slots
    } = _ref;
    const container = shallowRef5();
    const componentRef = shallowRef5();
    const rafId = shallowRef5();
    const triggerUpdate = shallowRef5(1);
    const defaultContainer = canUseDom_default() && document.createElement("div");
    const removeCurrentContainer = () => {
      var _a, _b;
      if (container.value === defaultContainer) {
        (_b = (_a = container.value) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(container.value);
      }
      container.value = null;
    };
    let parent = null;
    const attachToParent = function() {
      let force = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (force || container.value && !container.value.parentNode) {
        parent = getParent3(props3.getContainer);
        if (parent) {
          parent.appendChild(container.value);
          return true;
        }
        return false;
      }
      return true;
    };
    const getContainer2 = () => {
      if (!supportDom) {
        return null;
      }
      if (!container.value) {
        container.value = defaultContainer;
        attachToParent(true);
      }
      setWrapperClassName();
      return container.value;
    };
    const setWrapperClassName = () => {
      const {
        wrapperClassName
      } = props3;
      if (container.value && wrapperClassName && wrapperClassName !== container.value.className) {
        container.value.className = wrapperClassName;
      }
    };
    onUpdated3(() => {
      setWrapperClassName();
      attachToParent();
    });
    useScrollLocker(computed6(() => {
      return props3.autoLock && props3.visible && canUseDom_default() && (container.value === document.body || container.value === defaultContainer);
    }));
    onMounted4(() => {
      let init = false;
      watch6([() => props3.visible, () => props3.getContainer], (_ref2, _ref3) => {
        let [visible, getContainer3] = _ref2;
        let [prevVisible, prevGetContainer] = _ref3;
        if (supportDom) {
          parent = getParent3(props3.getContainer);
          if (parent === document.body) {
            if (visible && !prevVisible) {
              openCount += 1;
            } else if (init) {
              openCount -= 1;
            }
          }
        }
        if (init) {
          const getContainerIsFunc = typeof getContainer3 === "function" && typeof prevGetContainer === "function";
          if (getContainerIsFunc ? getContainer3.toString() !== prevGetContainer.toString() : getContainer3 !== prevGetContainer) {
            removeCurrentContainer();
          }
        }
        init = true;
      }, {
        immediate: true,
        flush: "post"
      });
      nextTick5(() => {
        if (!attachToParent()) {
          rafId.value = wrapperRaf(() => {
            triggerUpdate.value += 1;
          });
        }
      });
    });
    onBeforeUnmount2(() => {
      const {
        visible
      } = props3;
      if (supportDom && parent === document.body) {
        openCount = visible && openCount ? openCount - 1 : openCount;
      }
      removeCurrentContainer();
      wrapperRaf.cancel(rafId.value);
    });
    return () => {
      const {
        forceRender,
        visible
      } = props3;
      let portal = null;
      const childProps = {
        getOpenCount: () => openCount,
        getContainer: getContainer2
      };
      if (triggerUpdate.value && (forceRender || visible || componentRef.value)) {
        portal = _createVNode6(Portal_default, {
          "getContainer": getContainer2,
          "ref": componentRef,
          "didUpdate": props3.didUpdate
        }, {
          default: () => {
            var _a;
            return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, childProps);
          }
        });
      }
      return portal;
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/Trigger.js
var ALL_HANDLERS = ["onClick", "onMousedown", "onTouchstart", "onMouseenter", "onMouseleave", "onFocus", "onBlur", "onContextmenu"];
var Trigger_default = defineComponent7({
  compatConfig: {
    MODE: 3
  },
  name: "Trigger",
  mixins: [BaseMixin_default],
  inheritAttrs: false,
  props: triggerProps(),
  setup(props3) {
    const align = computed7(() => {
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props3;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    });
    const popupRef = shallowRef6(null);
    const setPopupRef = (val) => {
      popupRef.value = val;
    };
    return {
      vcTriggerContext: inject2("vcTriggerContext", {}),
      popupRef,
      setPopupRef,
      triggerRef: shallowRef6(null),
      align,
      focusTime: null,
      clickOutsideHandler: null,
      contextmenuOutsideHandler1: null,
      contextmenuOutsideHandler2: null,
      touchOutsideHandler: null,
      attachId: null,
      delayTimer: null,
      hasPopupMouseDown: false,
      preClickTime: null,
      preTouchTime: null,
      mouseDownTimeout: null,
      childOriginEvents: {}
    };
  },
  data() {
    const props3 = this.$props;
    let popupVisible;
    if (this.popupVisible !== void 0) {
      popupVisible = !!props3.popupVisible;
    } else {
      popupVisible = !!props3.defaultPopupVisible;
    }
    ALL_HANDLERS.forEach((h2) => {
      this[`fire${h2}`] = (e2) => {
        this.fireEvents(h2, e2);
      };
    });
    return {
      prevPopupVisible: popupVisible,
      sPopupVisible: popupVisible,
      point: null
    };
  },
  watch: {
    popupVisible(val) {
      if (val !== void 0) {
        this.prevPopupVisible = this.sPopupVisible;
        this.sPopupVisible = val;
      }
    }
  },
  created() {
    provide2("vcTriggerContext", {
      onPopupMouseDown: this.onPopupMouseDown,
      onPopupMouseenter: this.onPopupMouseenter,
      onPopupMouseleave: this.onPopupMouseleave
    });
    useProvidePortal(this);
  },
  deactivated() {
    this.setPopupVisible(false);
  },
  mounted() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  beforeUnmount() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
    clearTimeout(this.mouseDownTimeout);
    wrapperRaf.cancel(this.attachId);
  },
  methods: {
    updatedCal() {
      const props3 = this.$props;
      const state = this.$data;
      if (state.sPopupVisible) {
        let currentDocument;
        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
          currentDocument = props3.getDocument(this.getRootDomNode());
          this.clickOutsideHandler = addEventListenerWrap(currentDocument, "mousedown", this.onDocumentClick);
        }
        if (!this.touchOutsideHandler) {
          currentDocument = currentDocument || props3.getDocument(this.getRootDomNode());
          this.touchOutsideHandler = addEventListenerWrap(currentDocument, "touchstart", this.onDocumentClick, supportsPassive_default ? {
            passive: false
          } : false);
        }
        if (!this.contextmenuOutsideHandler1 && this.isContextmenuToShow()) {
          currentDocument = currentDocument || props3.getDocument(this.getRootDomNode());
          this.contextmenuOutsideHandler1 = addEventListenerWrap(currentDocument, "scroll", this.onContextmenuClose);
        }
        if (!this.contextmenuOutsideHandler2 && this.isContextmenuToShow()) {
          this.contextmenuOutsideHandler2 = addEventListenerWrap(window, "blur", this.onContextmenuClose);
        }
      } else {
        this.clearOutsideHandler();
      }
    },
    onMouseenter(e2) {
      const {
        mouseEnterDelay
      } = this.$props;
      this.fireEvents("onMouseenter", e2);
      this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e2);
    },
    onMouseMove(e2) {
      this.fireEvents("onMousemove", e2);
      this.setPoint(e2);
    },
    onMouseleave(e2) {
      this.fireEvents("onMouseleave", e2);
      this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
    },
    onPopupMouseenter() {
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseenter) {
        vcTriggerContext.onPopupMouseenter();
      }
      this.clearDelayTimer();
    },
    onPopupMouseleave(e2) {
      var _a;
      if (e2 && e2.relatedTarget && !e2.relatedTarget.setTimeout && contains((_a = this.popupRef) === null || _a === void 0 ? void 0 : _a.getElement(), e2.relatedTarget)) {
        return;
      }
      if (this.isMouseLeaveToHide()) {
        this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
      }
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseleave) {
        vcTriggerContext.onPopupMouseleave(e2);
      }
    },
    onFocus(e2) {
      this.fireEvents("onFocus", e2);
      this.clearDelayTimer();
      if (this.isFocusToShow()) {
        this.focusTime = Date.now();
        this.delaySetPopupVisible(true, this.$props.focusDelay);
      }
    },
    onMousedown(e2) {
      this.fireEvents("onMousedown", e2);
      this.preClickTime = Date.now();
    },
    onTouchstart(e2) {
      this.fireEvents("onTouchstart", e2);
      this.preTouchTime = Date.now();
    },
    onBlur(e2) {
      if (!contains(e2.target, e2.relatedTarget || document.activeElement)) {
        this.fireEvents("onBlur", e2);
        this.clearDelayTimer();
        if (this.isBlurToHide()) {
          this.delaySetPopupVisible(false, this.$props.blurDelay);
        }
      }
    },
    onContextmenu(e2) {
      e2.preventDefault();
      this.fireEvents("onContextmenu", e2);
      this.setPopupVisible(true, e2);
    },
    onContextmenuClose() {
      if (this.isContextmenuToShow()) {
        this.close();
      }
    },
    onClick(event) {
      this.fireEvents("onClick", event);
      if (this.focusTime) {
        let preTime;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      if (this.isClickToShow() && (this.isClickToHide() || this.isBlurToHide()) && event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.domEvent) {
        event.domEvent.preventDefault();
      }
      const nextVisible = !this.$data.sPopupVisible;
      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.setPopupVisible(!this.$data.sPopupVisible, event);
      }
    },
    onPopupMouseDown() {
      const {
        vcTriggerContext = {}
      } = this;
      this.hasPopupMouseDown = true;
      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(() => {
        this.hasPopupMouseDown = false;
      }, 0);
      if (vcTriggerContext.onPopupMouseDown) {
        vcTriggerContext.onPopupMouseDown(...arguments);
      }
    },
    onDocumentClick(event) {
      if (this.$props.mask && !this.$props.maskClosable) {
        return;
      }
      const target = event.target;
      const root2 = this.getRootDomNode();
      const popupNode = this.getPopupDomNode();
      if (
        // mousedown on the target should also close popup when action is contextMenu.
        // https://github.com/ant-design/ant-design/issues/29853
        (!contains(root2, target) || this.isContextMenuOnly()) && !contains(popupNode, target) && !this.hasPopupMouseDown
      ) {
        this.delaySetPopupVisible(false, 0.1);
      }
    },
    getPopupDomNode() {
      var _a;
      return ((_a = this.popupRef) === null || _a === void 0 ? void 0 : _a.getElement()) || null;
    },
    getRootDomNode() {
      var _a, _b, _c, _d;
      const {
        getTriggerDOMNode
      } = this.$props;
      if (getTriggerDOMNode) {
        const domNode = ((_b = (_a = this.triggerRef) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        return findDOMNode(getTriggerDOMNode(domNode));
      }
      try {
        const domNode = ((_d = (_c = this.triggerRef) === null || _c === void 0 ? void 0 : _c.$el) === null || _d === void 0 ? void 0 : _d.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        if (domNode) {
          return domNode;
        }
      } catch (err) {
      }
      return findDOMNode(this);
    },
    handleGetPopupClassFromAlign(align) {
      const className = [];
      const props3 = this.$props;
      const {
        popupPlacement,
        builtinPlacements,
        prefixCls,
        alignPoint: alignPoint2,
        getPopupClassNameFromAlign
      } = props3;
      if (popupPlacement && builtinPlacements) {
        className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint2));
      }
      if (getPopupClassNameFromAlign) {
        className.push(getPopupClassNameFromAlign(align));
      }
      return className.join(" ");
    },
    getPopupAlign() {
      const props3 = this.$props;
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props3;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    getComponent() {
      const mouseProps = {};
      if (this.isMouseEnterToShow()) {
        mouseProps.onMouseenter = this.onPopupMouseenter;
      }
      if (this.isMouseLeaveToHide()) {
        mouseProps.onMouseleave = this.onPopupMouseleave;
      }
      mouseProps.onMousedown = this.onPopupMouseDown;
      mouseProps[supportsPassive_default ? "onTouchstartPassive" : "onTouchstart"] = this.onPopupMouseDown;
      const {
        handleGetPopupClassFromAlign,
        getRootDomNode,
        $attrs
      } = this;
      const {
        prefixCls,
        destroyPopupOnHide,
        popupClassName,
        popupAnimation,
        popupTransitionName,
        popupStyle,
        mask,
        maskAnimation,
        maskTransitionName,
        zIndex,
        stretch,
        alignPoint: alignPoint2,
        mobile,
        arrow,
        forceRender
      } = this.$props;
      const {
        sPopupVisible,
        point
      } = this.$data;
      const popupProps2 = _extends(_extends({
        prefixCls,
        arrow,
        destroyPopupOnHide,
        visible: sPopupVisible,
        point: alignPoint2 ? point : null,
        align: this.align,
        animation: popupAnimation,
        getClassNameFromAlign: handleGetPopupClassFromAlign,
        stretch,
        getRootDomNode,
        mask,
        zIndex,
        transitionName: popupTransitionName,
        maskAnimation,
        maskTransitionName,
        class: popupClassName,
        style: popupStyle,
        onAlign: $attrs.onPopupAlign || noop
      }, mouseProps), {
        ref: this.setPopupRef,
        mobile,
        forceRender
      });
      return _createVNode7(Popup_default, popupProps2, {
        default: this.$slots.popup || (() => getComponent(this, "popup"))
      });
    },
    attachParent(popupContainer) {
      wrapperRaf.cancel(this.attachId);
      const {
        getPopupContainer,
        getDocument: getDocument2
      } = this.$props;
      const domNode = this.getRootDomNode();
      let mountNode;
      if (!getPopupContainer) {
        mountNode = getDocument2(this.getRootDomNode()).body;
      } else if (domNode || getPopupContainer.length === 0) {
        mountNode = getPopupContainer(domNode);
      }
      if (mountNode) {
        mountNode.appendChild(popupContainer);
      } else {
        this.attachId = wrapperRaf(() => {
          this.attachParent(popupContainer);
        });
      }
    },
    getContainer() {
      const {
        $props: props3
      } = this;
      const {
        getDocument: getDocument2
      } = props3;
      const popupContainer = getDocument2(this.getRootDomNode()).createElement("div");
      popupContainer.style.position = "absolute";
      popupContainer.style.top = "0";
      popupContainer.style.left = "0";
      popupContainer.style.width = "100%";
      this.attachParent(popupContainer);
      return popupContainer;
    },
    setPopupVisible(sPopupVisible, event) {
      const {
        alignPoint: alignPoint2,
        sPopupVisible: prevPopupVisible,
        onPopupVisibleChange
      } = this;
      this.clearDelayTimer();
      if (prevPopupVisible !== sPopupVisible) {
        if (!hasProp(this, "popupVisible")) {
          this.setState({
            sPopupVisible,
            prevPopupVisible
          });
        }
        onPopupVisibleChange && onPopupVisibleChange(sPopupVisible);
      }
      if (alignPoint2 && event && sPopupVisible) {
        this.setPoint(event);
      }
    },
    setPoint(point) {
      const {
        alignPoint: alignPoint2
      } = this.$props;
      if (!alignPoint2 || !point)
        return;
      this.setState({
        point: {
          pageX: point.pageX,
          pageY: point.pageY
        }
      });
    },
    handlePortalUpdate() {
      if (this.prevPopupVisible !== this.sPopupVisible) {
        this.afterPopupVisibleChange(this.sPopupVisible);
      }
    },
    delaySetPopupVisible(visible, delayS, event) {
      const delay = delayS * 1e3;
      this.clearDelayTimer();
      if (delay) {
        const point = event ? {
          pageX: event.pageX,
          pageY: event.pageY
        } : null;
        this.delayTimer = setTimeout(() => {
          this.setPopupVisible(visible, point);
          this.clearDelayTimer();
        }, delay);
      } else {
        this.setPopupVisible(visible, event);
      }
    },
    clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    },
    clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
      if (this.contextmenuOutsideHandler1) {
        this.contextmenuOutsideHandler1.remove();
        this.contextmenuOutsideHandler1 = null;
      }
      if (this.contextmenuOutsideHandler2) {
        this.contextmenuOutsideHandler2.remove();
        this.contextmenuOutsideHandler2 = null;
      }
      if (this.touchOutsideHandler) {
        this.touchOutsideHandler.remove();
        this.touchOutsideHandler = null;
      }
    },
    createTwoChains(event) {
      let fn = () => {
      };
      const events = getEvents(this);
      if (this.childOriginEvents[event] && events[event]) {
        return this[`fire${event}`];
      }
      fn = this.childOriginEvents[event] || events[event] || fn;
      return fn;
    },
    isClickToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("click") !== -1 || showAction.indexOf("click") !== -1;
    },
    isContextMenuOnly() {
      const {
        action
      } = this.$props;
      return action === "contextmenu" || action.length === 1 && action[0] === "contextmenu";
    },
    isContextmenuToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("contextmenu") !== -1 || showAction.indexOf("contextmenu") !== -1;
    },
    isClickToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("click") !== -1 || hideAction.indexOf("click") !== -1;
    },
    isMouseEnterToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || showAction.indexOf("mouseenter") !== -1;
    },
    isMouseLeaveToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || hideAction.indexOf("mouseleave") !== -1;
    },
    isFocusToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || showAction.indexOf("focus") !== -1;
    },
    isBlurToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || hideAction.indexOf("blur") !== -1;
    },
    forcePopupAlign() {
      var _a;
      if (this.$data.sPopupVisible) {
        (_a = this.popupRef) === null || _a === void 0 ? void 0 : _a.forceAlign();
      }
    },
    fireEvents(type, e2) {
      if (this.childOriginEvents[type]) {
        this.childOriginEvents[type](e2);
      }
      const event = this.$props[type] || this.$attrs[type];
      if (event) {
        event(e2);
      }
    },
    close() {
      this.setPopupVisible(false);
    }
  },
  render() {
    const {
      $attrs
    } = this;
    const children = filterEmpty(getSlot(this));
    const {
      alignPoint: alignPoint2,
      getPopupContainer
    } = this.$props;
    const child = children[0];
    this.childOriginEvents = getEvents(child);
    const newChildProps = {
      key: "trigger"
    };
    if (this.isContextmenuToShow()) {
      newChildProps.onContextmenu = this.onContextmenu;
    } else {
      newChildProps.onContextmenu = this.createTwoChains("onContextmenu");
    }
    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMousedown = this.onMousedown;
      newChildProps[supportsPassive_default ? "onTouchstartPassive" : "onTouchstart"] = this.onTouchstart;
    } else {
      newChildProps.onClick = this.createTwoChains("onClick");
      newChildProps.onMousedown = this.createTwoChains("onMousedown");
      newChildProps[supportsPassive_default ? "onTouchstartPassive" : "onTouchstart"] = this.createTwoChains("onTouchstart");
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseenter = this.onMouseenter;
      if (alignPoint2) {
        newChildProps.onMousemove = this.onMouseMove;
      }
    } else {
      newChildProps.onMouseenter = this.createTwoChains("onMouseenter");
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseleave = this.onMouseleave;
    } else {
      newChildProps.onMouseleave = this.createTwoChains("onMouseleave");
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains("onFocus");
      newChildProps.onBlur = (e2) => {
        if (e2 && (!e2.relatedTarget || !contains(e2.target, e2.relatedTarget))) {
          this.createTwoChains("onBlur")(e2);
        }
      };
    }
    const childrenClassName = classNames_default(child && child.props && child.props.class, $attrs.class);
    if (childrenClassName) {
      newChildProps.class = childrenClassName;
    }
    const trigger = cloneElement(child, _extends(_extends({}, newChildProps), {
      ref: "triggerRef"
    }), true, true);
    const portal = _createVNode7(PortalWrapper_default, {
      "key": "portal",
      "getContainer": getPopupContainer && (() => getPopupContainer(this.getRootDomNode())),
      "didUpdate": this.handlePortalUpdate,
      "visible": this.$data.sPopupVisible
    }, {
      default: this.getComponent
    });
    return _createVNode7(_Fragment, null, [trigger, portal]);
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-trigger/index.js
var vc_trigger_default = Trigger_default;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/SelectTrigger.js
import { computed as computed8, ref as ref3, defineComponent as defineComponent8 } from "vue";
var __rest = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var getBuiltInPlacements = (dropdownMatchSelectWidth) => {
  const adjustX = dropdownMatchSelectWidth === true ? 0 : 1;
  return {
    bottomLeft: {
      points: ["tl", "bl"],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1
      }
    },
    bottomRight: {
      points: ["tr", "br"],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1
      }
    },
    topLeft: {
      points: ["bl", "tl"],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1
      }
    },
    topRight: {
      points: ["br", "tr"],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1
      }
    }
  };
};
var SelectTrigger = defineComponent8({
  name: "SelectTrigger",
  inheritAttrs: false,
  props: {
    dropdownAlign: Object,
    visible: {
      type: Boolean,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    dropdownClassName: String,
    dropdownStyle: vue_types_default.object,
    placement: String,
    empty: {
      type: Boolean,
      default: void 0
    },
    prefixCls: String,
    popupClassName: String,
    animation: String,
    transitionName: String,
    getPopupContainer: Function,
    dropdownRender: Function,
    containerWidth: Number,
    dropdownMatchSelectWidth: vue_types_default.oneOfType([Number, Boolean]).def(true),
    popupElement: vue_types_default.any,
    direction: String,
    getTriggerDOMNode: Function,
    onPopupVisibleChange: Function,
    onPopupMouseEnter: Function,
    onPopupFocusin: Function,
    onPopupFocusout: Function
  },
  setup(props3, _ref) {
    let {
      slots,
      attrs,
      expose
    } = _ref;
    const builtInPlacements = computed8(() => {
      const {
        dropdownMatchSelectWidth
      } = props3;
      return getBuiltInPlacements(dropdownMatchSelectWidth);
    });
    const popupRef = ref3();
    expose({
      getPopupElement: () => {
        return popupRef.value;
      }
    });
    return () => {
      const _a = _extends(_extends({}, props3), attrs), {
        empty = false
      } = _a, restProps = __rest(_a, ["empty"]);
      const {
        visible,
        dropdownAlign,
        prefixCls,
        popupElement,
        dropdownClassName,
        dropdownStyle,
        direction = "ltr",
        placement,
        dropdownMatchSelectWidth,
        containerWidth,
        dropdownRender,
        animation,
        transitionName,
        getPopupContainer,
        getTriggerDOMNode,
        onPopupVisibleChange,
        onPopupMouseEnter,
        onPopupFocusin,
        onPopupFocusout
      } = restProps;
      const dropdownPrefixCls = `${prefixCls}-dropdown`;
      let popupNode = popupElement;
      if (dropdownRender) {
        popupNode = dropdownRender({
          menuNode: popupElement,
          props: props3
        });
      }
      const mergedTransitionName = animation ? `${dropdownPrefixCls}-${animation}` : transitionName;
      const popupStyle = _extends({
        minWidth: `${containerWidth}px`
      }, dropdownStyle);
      if (typeof dropdownMatchSelectWidth === "number") {
        popupStyle.width = `${dropdownMatchSelectWidth}px`;
      } else if (dropdownMatchSelectWidth) {
        popupStyle.width = `${containerWidth}px`;
      }
      return _createVNode8(vc_trigger_default, _objectSpread2(_objectSpread2({}, props3), {}, {
        "showAction": onPopupVisibleChange ? ["click"] : [],
        "hideAction": onPopupVisibleChange ? ["click"] : [],
        "popupPlacement": placement || (direction === "rtl" ? "bottomRight" : "bottomLeft"),
        "builtinPlacements": builtInPlacements.value,
        "prefixCls": dropdownPrefixCls,
        "popupTransitionName": mergedTransitionName,
        "popupAlign": dropdownAlign,
        "popupVisible": visible,
        "getPopupContainer": getPopupContainer,
        "popupClassName": classNames_default(dropdownClassName, {
          [`${dropdownPrefixCls}-empty`]: empty
        }),
        "popupStyle": popupStyle,
        "getTriggerDOMNode": getTriggerDOMNode,
        "onPopupVisibleChange": onPopupVisibleChange
      }), {
        default: slots.default,
        popup: () => _createVNode8("div", {
          "ref": popupRef,
          "onMouseenter": onPopupMouseEnter,
          "onFocusin": onPopupFocusin,
          "onFocusout": onPopupFocusout
        }, [popupNode])
      });
    };
  }
});
var SelectTrigger_default = SelectTrigger;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/index.js
import { createVNode as _createVNode18 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  /**
   * END
   */
  END: 35,
  /**
   * HOME
   */
  HOME: 36,
  /**
   * LEFT
   */
  LEFT: 37,
  /**
   * UP
   */
  UP: 38,
  /**
   * RIGHT
   */
  RIGHT: 39,
  /**
   * DOWN
   */
  DOWN: 40,
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45,
  /**
   * DELETE
   */
  DELETE: 46,
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91,
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  /**
   * DASH
   */
  DASH: 189,
  /**
   * EQUALS
   */
  EQUALS: 187,
  /**
   * COMMA
   */
  COMMA: 188,
  /**
   * PERIOD
   */
  PERIOD: 190,
  /**
   * SLASH
   */
  SLASH: 191,
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e2) {
    const {
      keyCode
    } = e2;
    if (e2.altKey && !e2.ctrlKey || e2.metaKey || // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  },
  /**
   * whether character is entered.
   */
  isCharacterKey: function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }
    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }
    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }
    if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) {
      return true;
    }
    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  }
};
var KeyCode_default = KeyCode;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/MultipleSelector.js
import { Fragment as _Fragment2, createTextVNode as _createTextVNode, createVNode as _createVNode16 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/TransBtn.js
import { createVNode as _createVNode9 } from "vue";
import { cloneVNode as cloneVNode2, isVNode as isVNode3 } from "vue";
var TransBtn = (props3, _ref) => {
  let {
    slots
  } = _ref;
  var _a;
  const {
    class: className,
    customizeIcon,
    customizeIconProps,
    onMousedown,
    onClick
  } = props3;
  let icon;
  if (typeof customizeIcon === "function") {
    icon = customizeIcon(customizeIconProps);
  } else {
    icon = isVNode3(customizeIcon) ? cloneVNode2(customizeIcon) : customizeIcon;
  }
  return _createVNode9("span", {
    "class": className,
    "onMousedown": (event) => {
      event.preventDefault();
      if (onMousedown) {
        onMousedown(event);
      }
    },
    "style": {
      userSelect: "none",
      WebkitUserSelect: "none"
    },
    "unselectable": "on",
    "onClick": onClick,
    "aria-hidden": true
  }, [icon !== void 0 ? icon : _createVNode9("span", {
    "class": className.split(/\s+/).map((cls) => `${cls}-icon`)
  }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)])]);
};
TransBtn.inheritAttrs = false;
TransBtn.displayName = "TransBtn";
TransBtn.props = {
  class: String,
  customizeIcon: vue_types_default.any,
  customizeIconProps: vue_types_default.any,
  onMousedown: Function,
  onClick: Function
};
var TransBtn_default = TransBtn;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/Input.js
import { createVNode as _createVNode12 } from "vue";
import { defineComponent as defineComponent11, inject as inject3 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/BaseInput.js
import { createVNode as _createVNode11 } from "vue";
import { computed as computed9, defineComponent as defineComponent10, shallowRef as shallowRef8, ref as ref4, watch as watch7 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/BaseInputInner.js
import { createVNode as _createVNode10 } from "vue";
import { defineComponent as defineComponent9, shallowRef as shallowRef7 } from "vue";
var __rest2 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var BaseInputInner = defineComponent9({
  compatConfig: {
    MODE: 3
  },
  // inheritAttrs: false,
  props: {
    disabled: vue_types_default.looseBool,
    type: vue_types_default.string,
    value: vue_types_default.any,
    tag: {
      type: String,
      default: "input"
    },
    size: vue_types_default.string,
    onChange: Function,
    onInput: Function,
    onBlur: Function,
    onFocus: Function,
    onKeydown: Function,
    onCompositionstart: Function,
    onCompositionend: Function,
    onKeyup: Function,
    onPaste: Function,
    onMousedown: Function
  },
  emits: ["change", "input", "blur", "keydown", "focus", "compositionstart", "compositionend", "keyup", "paste", "mousedown"],
  setup(props3, _ref) {
    let {
      expose
    } = _ref;
    const inputRef = shallowRef7(null);
    const focus = () => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };
    const blur = () => {
      if (inputRef.value) {
        inputRef.value.blur();
      }
    };
    const setSelectionRange = (start, end, direction) => {
      var _a;
      (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.setSelectionRange(start, end, direction);
    };
    const select = () => {
      var _a;
      (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.select();
    };
    expose({
      focus,
      blur,
      input: inputRef,
      setSelectionRange,
      select,
      getSelectionStart: () => {
        var _a;
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.selectionStart;
      },
      getSelectionEnd: () => {
        var _a;
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.selectionEnd;
      },
      getScrollTop: () => {
        var _a;
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.scrollTop;
      }
    });
    return () => {
      const {
        tag: Tag,
        value
      } = props3, restProps = __rest2(props3, ["tag", "value"]);
      return _createVNode10(Tag, _objectSpread2(_objectSpread2({}, restProps), {}, {
        "ref": inputRef,
        "value": value
      }), null);
    };
  }
});
var BaseInputInner_default = BaseInputInner;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-util/Dom/css.js
function getClientSize() {
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
  return {
    width,
    height
  };
}
function getOffset2(node) {
  const box = node.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    left: box.left + (window.scrollX || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.scrollY || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
  };
}
function styleToString(style) {
  const styleNames = Array.prototype.slice.apply(style);
  return styleNames.map((name) => `${name}: ${style.getPropertyValue(name)};`).join("");
}
function styleObjectToString(style) {
  return Object.keys(style).reduce((acc, name) => {
    const styleValue = style[name];
    if (typeof styleValue === "undefined" || styleValue === null) {
      return acc;
    }
    acc += `${name}: ${style[name]};`;
    return acc;
  }, "");
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/BaseInput.js
var __rest3 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var BaseInput = defineComponent10({
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: {
    disabled: vue_types_default.looseBool,
    type: vue_types_default.string,
    value: vue_types_default.any,
    lazy: vue_types_default.bool.def(true),
    tag: {
      type: String,
      default: "input"
    },
    size: vue_types_default.string,
    style: vue_types_default.oneOfType([String, Object]),
    class: vue_types_default.string
  },
  emits: ["change", "input", "blur", "keydown", "focus", "compositionstart", "compositionend", "keyup", "paste", "mousedown"],
  setup(props3, _ref) {
    let {
      emit,
      attrs,
      expose
    } = _ref;
    const inputRef = shallowRef8(null);
    const renderValue = ref4();
    const isComposing = ref4(false);
    watch7([() => props3.value, isComposing], () => {
      if (isComposing.value)
        return;
      renderValue.value = props3.value;
    }, {
      immediate: true
    });
    const handleChange = (e2) => {
      emit("change", e2);
    };
    const onCompositionstart = (e2) => {
      isComposing.value = true;
      e2.target.composing = true;
      emit("compositionstart", e2);
    };
    const onCompositionend = (e2) => {
      isComposing.value = false;
      e2.target.composing = false;
      emit("compositionend", e2);
      const event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      e2.target.dispatchEvent(event);
      handleChange(e2);
    };
    const handleInput = (e2) => {
      if (isComposing.value && props3.lazy) {
        renderValue.value = e2.target.value;
        return;
      }
      emit("input", e2);
    };
    const handleBlur = (e2) => {
      emit("blur", e2);
    };
    const handleFocus = (e2) => {
      emit("focus", e2);
    };
    const focus = () => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };
    const blur = () => {
      if (inputRef.value) {
        inputRef.value.blur();
      }
    };
    const handleKeyDown = (e2) => {
      emit("keydown", e2);
    };
    const handleKeyUp = (e2) => {
      emit("keyup", e2);
    };
    const setSelectionRange = (start, end, direction) => {
      var _a;
      (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.setSelectionRange(start, end, direction);
    };
    const select = () => {
      var _a;
      (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.select();
    };
    expose({
      focus,
      blur,
      input: computed9(() => {
        var _a;
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.input;
      }),
      setSelectionRange,
      select,
      getSelectionStart: () => {
        var _a;
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.getSelectionStart();
      },
      getSelectionEnd: () => {
        var _a;
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.getSelectionEnd();
      },
      getScrollTop: () => {
        var _a;
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.getScrollTop();
      }
    });
    const handleMousedown = (e2) => {
      emit("mousedown", e2);
    };
    const handlePaste = (e2) => {
      emit("paste", e2);
    };
    const styleString = computed9(() => {
      return props3.style && typeof props3.style !== "string" ? styleObjectToString(props3.style) : props3.style;
    });
    return () => {
      const {
        style,
        lazy
      } = props3, restProps = __rest3(props3, ["style", "lazy"]);
      return _createVNode11(BaseInputInner_default, _objectSpread2(_objectSpread2(_objectSpread2({}, restProps), attrs), {}, {
        "style": styleString.value,
        "onInput": handleInput,
        "onChange": handleChange,
        "onBlur": handleBlur,
        "onFocus": handleFocus,
        "ref": inputRef,
        "value": renderValue.value,
        "onCompositionstart": onCompositionstart,
        "onCompositionend": onCompositionend,
        "onKeyup": handleKeyUp,
        "onKeydown": handleKeyDown,
        "onPaste": handlePaste,
        "onMousedown": handleMousedown
      }), null);
    };
  }
});
var BaseInput_default = BaseInput;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/Input.js
var inputProps = {
  inputRef: vue_types_default.any,
  prefixCls: String,
  id: String,
  inputElement: vue_types_default.VueNode,
  disabled: {
    type: Boolean,
    default: void 0
  },
  autofocus: {
    type: Boolean,
    default: void 0
  },
  autocomplete: String,
  editable: {
    type: Boolean,
    default: void 0
  },
  activeDescendantId: String,
  value: String,
  open: {
    type: Boolean,
    default: void 0
  },
  tabindex: vue_types_default.oneOfType([vue_types_default.number, vue_types_default.string]),
  /** Pass accessibility props to input */
  attrs: vue_types_default.object,
  onKeydown: {
    type: Function
  },
  onMousedown: {
    type: Function
  },
  onChange: {
    type: Function
  },
  onPaste: {
    type: Function
  },
  onCompositionstart: {
    type: Function
  },
  onCompositionend: {
    type: Function
  },
  onFocus: {
    type: Function
  },
  onBlur: {
    type: Function
  }
};
var Input = defineComponent11({
  compatConfig: {
    MODE: 3
  },
  name: "SelectInput",
  inheritAttrs: false,
  props: inputProps,
  setup(props3) {
    let blurTimeout = null;
    const VCSelectContainerEvent = inject3("VCSelectContainerEvent");
    return () => {
      var _a;
      const {
        prefixCls,
        id,
        inputElement,
        disabled,
        tabindex,
        autofocus,
        autocomplete,
        editable,
        activeDescendantId,
        value,
        onKeydown,
        onMousedown,
        onChange,
        onPaste,
        onCompositionstart,
        onCompositionend,
        onFocus,
        onBlur,
        open: open2,
        inputRef,
        attrs
      } = props3;
      let inputNode = inputElement || _createVNode12(BaseInput_default, null, null);
      const inputProps2 = inputNode.props || {};
      const {
        onKeydown: onOriginKeyDown,
        onInput: onOriginInput,
        onFocus: onOriginFocus,
        onBlur: onOriginBlur,
        onMousedown: onOriginMouseDown,
        onCompositionstart: onOriginCompositionStart,
        onCompositionend: onOriginCompositionEnd,
        style
      } = inputProps2;
      inputNode = cloneElement(inputNode, _extends(_extends(_extends(_extends(_extends({
        type: "search"
      }, inputProps2), {
        id,
        ref: inputRef,
        disabled,
        tabindex,
        lazy: false,
        autocomplete: autocomplete || "off",
        autofocus,
        class: classNames_default(`${prefixCls}-selection-search-input`, (_a = inputNode === null || inputNode === void 0 ? void 0 : inputNode.props) === null || _a === void 0 ? void 0 : _a.class),
        role: "combobox",
        "aria-expanded": open2,
        "aria-haspopup": "listbox",
        "aria-owns": `${id}_list`,
        "aria-autocomplete": "list",
        "aria-controls": `${id}_list`,
        "aria-activedescendant": activeDescendantId
      }), attrs), {
        value: editable ? value : "",
        readonly: !editable,
        unselectable: !editable ? "on" : null,
        style: _extends(_extends({}, style), {
          opacity: editable ? null : 0
        }),
        onKeydown: (event) => {
          onKeydown(event);
          if (onOriginKeyDown) {
            onOriginKeyDown(event);
          }
        },
        onMousedown: (event) => {
          onMousedown(event);
          if (onOriginMouseDown) {
            onOriginMouseDown(event);
          }
        },
        onInput: (event) => {
          onChange(event);
          if (onOriginInput) {
            onOriginInput(event);
          }
        },
        onCompositionstart(event) {
          onCompositionstart(event);
          if (onOriginCompositionStart) {
            onOriginCompositionStart(event);
          }
        },
        onCompositionend(event) {
          onCompositionend(event);
          if (onOriginCompositionEnd) {
            onOriginCompositionEnd(event);
          }
        },
        onPaste,
        onFocus: function() {
          clearTimeout(blurTimeout);
          onOriginFocus && onOriginFocus(arguments.length <= 0 ? void 0 : arguments[0]);
          onFocus && onFocus(arguments.length <= 0 ? void 0 : arguments[0]);
          VCSelectContainerEvent === null || VCSelectContainerEvent === void 0 ? void 0 : VCSelectContainerEvent.focus(arguments.length <= 0 ? void 0 : arguments[0]);
        },
        onBlur: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          blurTimeout = setTimeout(() => {
            onOriginBlur && onOriginBlur(args[0]);
            onBlur && onBlur(args[0]);
            VCSelectContainerEvent === null || VCSelectContainerEvent === void 0 ? void 0 : VCSelectContainerEvent.blur(args[0]);
          }, 100);
        }
      }), inputNode.type === "textarea" ? {} : {
        type: "search"
      }), true, true);
      return inputNode;
    };
  }
});
var Input_default = Input;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/MultipleSelector.js
import { ref as ref6, watchEffect as watchEffect2, computed as computed13, defineComponent as defineComponent17, onMounted as onMounted6, shallowRef as shallowRef10, watch as watch10 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/pickAttrs.js
var attributes = `accept acceptcharset accesskey action allowfullscreen allowtransparency
alt async autocomplete autofocus autoplay capture cellpadding cellspacing challenge
charset checked classid classname colspan cols content contenteditable contextmenu
controls coords crossorigin data datetime default defer dir disabled download draggable
enctype form formaction formenctype formmethod formnovalidate formtarget frameborder
headers height hidden high href hreflang htmlfor for httpequiv icon id inputmode integrity
is keyparams keytype kind label lang list loop low manifest marginheight marginwidth max maxlength media
mediagroup method min minlength multiple muted name novalidate nonce open
optimum pattern placeholder poster preload radiogroup readonly rel required
reversed role rowspan rows sandbox scope scoped scrolling seamless selected
shape size sizes span spellcheck src srcdoc srclang srcset start step style
summary tabindex target title type usemap value width wmode wrap`;
var eventsName = `onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown
    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick
    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown
    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel
    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough
    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`;
var propList = `${attributes} ${eventsName}`.split(/[\s\n]+/);
var ariaPrefix = "aria-";
var dataPrefix = "data-";
function match(key, prefix) {
  return key.indexOf(prefix) === 0;
}
function pickAttrs(props3) {
  let ariaOnly = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  let mergedConfig;
  if (ariaOnly === false) {
    mergedConfig = {
      aria: true,
      data: true,
      attr: true
    };
  } else if (ariaOnly === true) {
    mergedConfig = {
      aria: true
    };
  } else {
    mergedConfig = _extends({}, ariaOnly);
  }
  const attrs = {};
  Object.keys(props3).forEach((key) => {
    if (
      // Aria
      mergedConfig.aria && (key === "role" || match(key, ariaPrefix)) || // Data
      mergedConfig.data && match(key, dataPrefix) || // Attr
      mergedConfig.attr && (propList.includes(key) || propList.includes(key.toLowerCase()))
    ) {
      attrs[key] = props3[key];
    }
  });
  return attrs;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-overflow/Overflow.js
import { resolveDirective as _resolveDirective10, createVNode as _createVNode15 } from "vue";
import { computed as computed12, defineComponent as defineComponent16, shallowRef as shallowRef9, watch as watch9 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-resize-observer/index.js
import { defineComponent as defineComponent12, getCurrentInstance, onMounted as onMounted5, onUnmounted as onUnmounted2, onUpdated as onUpdated4, reactive, watch as watch8 } from "vue";
var vc_resize_observer_default = defineComponent12({
  compatConfig: {
    MODE: 3
  },
  name: "ResizeObserver",
  props: {
    disabled: Boolean,
    onResize: Function
  },
  emits: ["resize"],
  setup(props3, _ref) {
    let {
      slots
    } = _ref;
    const state = reactive({
      width: 0,
      height: 0,
      offsetHeight: 0,
      offsetWidth: 0
    });
    let currentElement = null;
    let resizeObserver = null;
    const destroyObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    };
    const onResize = (entries) => {
      const {
        onResize: onResize2
      } = props3;
      const target = entries[0].target;
      const {
        width,
        height
      } = target.getBoundingClientRect();
      const {
        offsetWidth,
        offsetHeight
      } = target;
      const fixedWidth = Math.floor(width);
      const fixedHeight = Math.floor(height);
      if (state.width !== fixedWidth || state.height !== fixedHeight || state.offsetWidth !== offsetWidth || state.offsetHeight !== offsetHeight) {
        const size = {
          width: fixedWidth,
          height: fixedHeight,
          offsetWidth,
          offsetHeight
        };
        _extends(state, size);
        if (onResize2) {
          Promise.resolve().then(() => {
            onResize2(_extends(_extends({}, size), {
              offsetWidth,
              offsetHeight
            }), target);
          });
        }
      }
    };
    const instance = getCurrentInstance();
    const registerObserver = () => {
      const {
        disabled
      } = props3;
      if (disabled) {
        destroyObserver();
        return;
      }
      const element = findDOMNode(instance);
      const elementChanged = element !== currentElement;
      if (elementChanged) {
        destroyObserver();
        currentElement = element;
      }
      if (!resizeObserver && element) {
        resizeObserver = new ResizeObserver_es_default(onResize);
        resizeObserver.observe(element);
      }
    };
    onMounted5(() => {
      registerObserver();
    });
    onUpdated4(() => {
      registerObserver();
    });
    onUnmounted2(() => {
      destroyObserver();
    });
    watch8(() => props3.disabled, () => {
      registerObserver();
    }, {
      flush: "post"
    });
    return () => {
      var _a;
      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-overflow/context.js
import { computed as computed10, defineComponent as defineComponent13, inject as inject4, provide as provide3 } from "vue";
var OverflowContextProviderKey = Symbol("OverflowContextProviderKey");
var OverflowContextProvider = defineComponent13({
  compatConfig: {
    MODE: 3
  },
  name: "OverflowContextProvider",
  inheritAttrs: false,
  props: {
    value: {
      type: Object
    }
  },
  setup(props3, _ref) {
    let {
      slots
    } = _ref;
    provide3(OverflowContextProviderKey, computed10(() => props3.value));
    return () => {
      var _a;
      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
    };
  }
});
var useInjectOverflowContext = () => {
  return inject4(OverflowContextProviderKey, computed10(() => null));
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-overflow/Item.js
import { resolveDirective as _resolveDirective8, createVNode as _createVNode13 } from "vue";
import { computed as computed11, defineComponent as defineComponent14, onUnmounted as onUnmounted3, ref as ref5 } from "vue";
var __rest4 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var UNDEFINED = void 0;
var Item_default = defineComponent14({
  compatConfig: {
    MODE: 3
  },
  name: "Item",
  props: {
    prefixCls: String,
    item: vue_types_default.any,
    renderItem: Function,
    responsive: Boolean,
    itemKey: {
      type: [String, Number]
    },
    registerSize: Function,
    display: Boolean,
    order: Number,
    component: vue_types_default.any,
    invalidate: Boolean
  },
  setup(props3, _ref) {
    let {
      slots,
      expose
    } = _ref;
    const mergedHidden = computed11(() => props3.responsive && !props3.display);
    const itemNodeRef = ref5();
    expose({
      itemNodeRef
    });
    function internalRegisterSize(width) {
      props3.registerSize(props3.itemKey, width);
    }
    onUnmounted3(() => {
      internalRegisterSize(null);
    });
    return () => {
      var _a;
      const {
        prefixCls,
        invalidate,
        item,
        renderItem,
        responsive,
        registerSize,
        itemKey,
        display,
        order,
        component: Component = "div"
      } = props3, restProps = __rest4(props3, ["prefixCls", "invalidate", "item", "renderItem", "responsive", "registerSize", "itemKey", "display", "order", "component"]);
      const children = (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      const childNode = renderItem && item !== UNDEFINED ? renderItem(item) : children;
      let overflowStyle;
      if (!invalidate) {
        overflowStyle = {
          opacity: mergedHidden.value ? 0 : 1,
          height: mergedHidden.value ? 0 : UNDEFINED,
          overflowY: mergedHidden.value ? "hidden" : UNDEFINED,
          order: responsive ? order : UNDEFINED,
          pointerEvents: mergedHidden.value ? "none" : UNDEFINED,
          position: mergedHidden.value ? "absolute" : UNDEFINED
        };
      }
      const overflowProps2 = {};
      if (mergedHidden.value) {
        overflowProps2["aria-hidden"] = true;
      }
      return _createVNode13(vc_resize_observer_default, {
        "disabled": !responsive,
        "onResize": (_ref2) => {
          let {
            offsetWidth
          } = _ref2;
          internalRegisterSize(offsetWidth);
        }
      }, {
        default: () => _createVNode13(Component, _objectSpread2(_objectSpread2(_objectSpread2({
          "class": classNames_default(!invalidate && prefixCls),
          "style": overflowStyle
        }, overflowProps2), restProps), {}, {
          "ref": itemNodeRef
        }), {
          default: () => [childNode]
        })
      });
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-overflow/RawItem.js
import { resolveDirective as _resolveDirective9, createVNode as _createVNode14 } from "vue";
import { defineComponent as defineComponent15 } from "vue";
var __rest5 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var RawItem_default = defineComponent15({
  compatConfig: {
    MODE: 3
  },
  name: "RawItem",
  inheritAttrs: false,
  props: {
    component: vue_types_default.any,
    title: vue_types_default.any,
    id: String,
    onMouseenter: {
      type: Function
    },
    onMouseleave: {
      type: Function
    },
    onClick: {
      type: Function
    },
    onKeydown: {
      type: Function
    },
    onFocus: {
      type: Function
    },
    role: String,
    tabindex: Number
  },
  setup(props3, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const context = useInjectOverflowContext();
    return () => {
      var _a;
      if (!context.value) {
        const {
          component: Component = "div"
        } = props3, restProps2 = __rest5(props3, ["component"]);
        return _createVNode14(Component, _objectSpread2(_objectSpread2({}, restProps2), attrs), {
          default: () => [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]
        });
      }
      const _b = context.value, {
        className: contextClassName
      } = _b, restContext = __rest5(_b, ["className"]);
      const {
        class: className
      } = attrs, restProps = __rest5(attrs, ["class"]);
      return _createVNode14(OverflowContextProvider, {
        "value": null
      }, {
        default: () => [_createVNode14(Item_default, _objectSpread2(_objectSpread2(_objectSpread2({
          "class": classNames_default(contextClassName, className)
        }, restContext), restProps), props3), slots)]
      });
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-overflow/Overflow.js
var __rest6 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var RESPONSIVE = "responsive";
var INVALIDATE = "invalidate";
function defaultRenderRest(omittedItems) {
  return `+ ${omittedItems.length} ...`;
}
var overflowProps = () => {
  return {
    id: String,
    prefixCls: String,
    data: Array,
    itemKey: [String, Number, Function],
    /** Used for `responsive`. It will limit render node to avoid perf issue */
    itemWidth: {
      type: Number,
      default: 10
    },
    renderItem: Function,
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawItem: Function,
    maxCount: [Number, String],
    renderRest: Function,
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawRest: Function,
    suffix: vue_types_default.any,
    component: String,
    itemComponent: vue_types_default.any,
    /** @private This API may be refactor since not well design */
    onVisibleChange: Function,
    /** When set to `full`, ssr will render full items by default and remove at client side */
    ssr: String,
    onMousedown: Function,
    role: String
  };
};
var Overflow = defineComponent16({
  name: "Overflow",
  inheritAttrs: false,
  props: overflowProps(),
  emits: ["visibleChange"],
  setup(props3, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const fullySSR = computed12(() => props3.ssr === "full");
    const containerWidth = shallowRef9(null);
    const mergedContainerWidth = computed12(() => containerWidth.value || 0);
    const itemWidths = shallowRef9(/* @__PURE__ */ new Map());
    const prevRestWidth = shallowRef9(0);
    const restWidth = shallowRef9(0);
    const suffixWidth = shallowRef9(0);
    const suffixFixedStart = shallowRef9(null);
    const displayCount = shallowRef9(null);
    const mergedDisplayCount = computed12(() => {
      if (displayCount.value === null && fullySSR.value) {
        return Number.MAX_SAFE_INTEGER;
      }
      return displayCount.value || 0;
    });
    const restReady = shallowRef9(false);
    const itemPrefixCls = computed12(() => `${props3.prefixCls}-item`);
    const mergedRestWidth = computed12(() => Math.max(prevRestWidth.value, restWidth.value));
    const isResponsive = computed12(() => !!(props3.data.length && props3.maxCount === RESPONSIVE));
    const invalidate = computed12(() => props3.maxCount === INVALIDATE);
    const showRest = computed12(() => isResponsive.value || typeof props3.maxCount === "number" && props3.data.length > props3.maxCount);
    const mergedData = computed12(() => {
      let items = props3.data;
      if (isResponsive.value) {
        if (containerWidth.value === null && fullySSR.value) {
          items = props3.data;
        } else {
          items = props3.data.slice(0, Math.min(props3.data.length, mergedContainerWidth.value / props3.itemWidth));
        }
      } else if (typeof props3.maxCount === "number") {
        items = props3.data.slice(0, props3.maxCount);
      }
      return items;
    });
    const omittedItems = computed12(() => {
      if (isResponsive.value) {
        return props3.data.slice(mergedDisplayCount.value + 1);
      }
      return props3.data.slice(mergedData.value.length);
    });
    const getKey2 = (item, index2) => {
      var _a;
      if (typeof props3.itemKey === "function") {
        return props3.itemKey(item);
      }
      return (_a = props3.itemKey && (item === null || item === void 0 ? void 0 : item[props3.itemKey])) !== null && _a !== void 0 ? _a : index2;
    };
    const mergedRenderItem = computed12(() => props3.renderItem || ((item) => item));
    const updateDisplayCount = (count, notReady) => {
      displayCount.value = count;
      if (!notReady) {
        restReady.value = count < props3.data.length - 1;
        emit("visibleChange", count);
      }
    };
    const onOverflowResize = (_2, element) => {
      containerWidth.value = element.clientWidth;
    };
    const registerSize = (key, width) => {
      const clone2 = new Map(itemWidths.value);
      if (width === null) {
        clone2.delete(key);
      } else {
        clone2.set(key, width);
      }
      itemWidths.value = clone2;
    };
    const registerOverflowSize = (_2, width) => {
      prevRestWidth.value = restWidth.value;
      restWidth.value = width;
    };
    const registerSuffixSize = (_2, width) => {
      suffixWidth.value = width;
    };
    const getItemWidth = (index2) => {
      return itemWidths.value.get(getKey2(mergedData.value[index2], index2));
    };
    watch9([mergedContainerWidth, itemWidths, restWidth, suffixWidth, () => props3.itemKey, mergedData], () => {
      if (mergedContainerWidth.value && mergedRestWidth.value && mergedData.value) {
        let totalWidth = suffixWidth.value;
        const len = mergedData.value.length;
        const lastIndex = len - 1;
        if (!len) {
          updateDisplayCount(0);
          suffixFixedStart.value = null;
          return;
        }
        for (let i2 = 0; i2 < len; i2 += 1) {
          const currentItemWidth = getItemWidth(i2);
          if (currentItemWidth === void 0) {
            updateDisplayCount(i2 - 1, true);
            break;
          }
          totalWidth += currentItemWidth;
          if (
            // Only one means `totalWidth` is the final width
            lastIndex === 0 && totalWidth <= mergedContainerWidth.value || // Last two width will be the final width
            i2 === lastIndex - 1 && totalWidth + getItemWidth(lastIndex) <= mergedContainerWidth.value
          ) {
            updateDisplayCount(lastIndex);
            suffixFixedStart.value = null;
            break;
          } else if (totalWidth + mergedRestWidth.value > mergedContainerWidth.value) {
            updateDisplayCount(i2 - 1);
            suffixFixedStart.value = totalWidth - currentItemWidth - suffixWidth.value + restWidth.value;
            break;
          }
        }
        if (props3.suffix && getItemWidth(0) + suffixWidth.value > mergedContainerWidth.value) {
          suffixFixedStart.value = null;
        }
      }
    });
    return () => {
      const displayRest = restReady.value && !!omittedItems.value.length;
      const {
        itemComponent,
        renderRawItem,
        renderRawRest,
        renderRest,
        prefixCls = "rc-overflow",
        suffix,
        component: Component = "div",
        id,
        onMousedown
      } = props3;
      const {
        class: className,
        style
      } = attrs, restAttrs = __rest6(attrs, ["class", "style"]);
      let suffixStyle = {};
      if (suffixFixedStart.value !== null && isResponsive.value) {
        suffixStyle = {
          position: "absolute",
          left: `${suffixFixedStart.value}px`,
          top: 0
        };
      }
      const itemSharedProps = {
        prefixCls: itemPrefixCls.value,
        responsive: isResponsive.value,
        component: itemComponent,
        invalidate: invalidate.value
      };
      const internalRenderItemNode = renderRawItem ? (item, index2) => {
        const key = getKey2(item, index2);
        return _createVNode15(OverflowContextProvider, {
          "key": key,
          "value": _extends(_extends({}, itemSharedProps), {
            order: index2,
            item,
            itemKey: key,
            registerSize,
            display: index2 <= mergedDisplayCount.value
          })
        }, {
          default: () => [renderRawItem(item, index2)]
        });
      } : (item, index2) => {
        const key = getKey2(item, index2);
        return _createVNode15(Item_default, _objectSpread2(_objectSpread2({}, itemSharedProps), {}, {
          "order": index2,
          "key": key,
          "item": item,
          "renderItem": mergedRenderItem.value,
          "itemKey": key,
          "registerSize": registerSize,
          "display": index2 <= mergedDisplayCount.value
        }), null);
      };
      let restNode = () => null;
      const restContextProps = {
        order: displayRest ? mergedDisplayCount.value : Number.MAX_SAFE_INTEGER,
        className: `${itemPrefixCls.value} ${itemPrefixCls.value}-rest`,
        registerSize: registerOverflowSize,
        display: displayRest
      };
      if (!renderRawRest) {
        const mergedRenderRest = renderRest || defaultRenderRest;
        restNode = () => _createVNode15(Item_default, _objectSpread2(_objectSpread2({}, itemSharedProps), restContextProps), {
          default: () => typeof mergedRenderRest === "function" ? mergedRenderRest(omittedItems.value) : mergedRenderRest
        });
      } else if (renderRawRest) {
        restNode = () => _createVNode15(OverflowContextProvider, {
          "value": _extends(_extends({}, itemSharedProps), restContextProps)
        }, {
          default: () => [renderRawRest(omittedItems.value)]
        });
      }
      const overflowNode = () => {
        var _a;
        return _createVNode15(Component, _objectSpread2({
          "id": id,
          "class": classNames_default(!invalidate.value && prefixCls, className),
          "style": style,
          "onMousedown": onMousedown,
          "role": props3.role
        }, restAttrs), {
          default: () => [mergedData.value.map(internalRenderItemNode), showRest.value ? restNode() : null, suffix && _createVNode15(Item_default, _objectSpread2(_objectSpread2({}, itemSharedProps), {}, {
            "order": mergedDisplayCount.value,
            "class": `${itemPrefixCls.value}-suffix`,
            "registerSize": registerSuffixSize,
            "display": true,
            "style": suffixStyle
          }), {
            default: () => suffix
          }), (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]
        });
      };
      return _createVNode15(vc_resize_observer_default, {
        "disabled": !isResponsive.value,
        "onResize": onOverflowResize
      }, {
        default: overflowNode
      });
    };
  }
});
Overflow.Item = RawItem_default;
Overflow.RESPONSIVE = RESPONSIVE;
Overflow.INVALIDATE = INVALIDATE;
var Overflow_default = Overflow;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-overflow/index.js
var vc_overflow_default = Overflow_default;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-tree-select/LegacyContext.js
import { inject as inject5, provide as provide4 } from "vue";
var TreeSelectLegacyContextPropsKey = Symbol("TreeSelectLegacyContextPropsKey");
function useProvideLegacySelectContext(props3) {
  return provide4(TreeSelectLegacyContextPropsKey, props3);
}
function useInjectLegacySelectContext() {
  return inject5(TreeSelectLegacyContextPropsKey, {});
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/MultipleSelector.js
var props = {
  id: String,
  prefixCls: String,
  values: vue_types_default.array,
  open: {
    type: Boolean,
    default: void 0
  },
  searchValue: String,
  inputRef: vue_types_default.any,
  placeholder: vue_types_default.any,
  disabled: {
    type: Boolean,
    default: void 0
  },
  mode: String,
  showSearch: {
    type: Boolean,
    default: void 0
  },
  autofocus: {
    type: Boolean,
    default: void 0
  },
  autocomplete: String,
  activeDescendantId: String,
  tabindex: vue_types_default.oneOfType([vue_types_default.number, vue_types_default.string]),
  compositionStatus: Boolean,
  removeIcon: vue_types_default.any,
  choiceTransitionName: String,
  maxTagCount: vue_types_default.oneOfType([vue_types_default.number, vue_types_default.string]),
  maxTagTextLength: Number,
  maxTagPlaceholder: vue_types_default.any.def(() => (omittedValues) => `+ ${omittedValues.length} ...`),
  tagRender: Function,
  onToggleOpen: {
    type: Function
  },
  onRemove: Function,
  onInputChange: Function,
  onInputPaste: Function,
  onInputKeyDown: Function,
  onInputMouseDown: Function,
  onInputCompositionStart: Function,
  onInputCompositionEnd: Function
};
var onPreventMouseDown = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
var SelectSelector = defineComponent17({
  name: "MultipleSelectSelector",
  inheritAttrs: false,
  props,
  setup(props3) {
    const measureRef = shallowRef10();
    const inputWidth = shallowRef10(0);
    const focused = shallowRef10(false);
    const legacyTreeSelectContext = useInjectLegacySelectContext();
    const selectionPrefixCls = computed13(() => `${props3.prefixCls}-selection`);
    const inputValue = computed13(() => props3.open || props3.mode === "tags" ? props3.searchValue : "");
    const inputEditable = computed13(() => props3.mode === "tags" || props3.showSearch && (props3.open || focused.value));
    const targetValue = ref6("");
    watchEffect2(() => {
      targetValue.value = inputValue.value;
    });
    onMounted6(() => {
      watch10(targetValue, () => {
        inputWidth.value = measureRef.value.scrollWidth;
      }, {
        flush: "post",
        immediate: true
      });
    });
    function defaultRenderSelector(title, content, itemDisabled, closable, onClose) {
      return _createVNode16("span", {
        "class": classNames_default(`${selectionPrefixCls.value}-item`, {
          [`${selectionPrefixCls.value}-item-disabled`]: itemDisabled
        }),
        "title": typeof title === "string" || typeof title === "number" ? title.toString() : void 0
      }, [_createVNode16("span", {
        "class": `${selectionPrefixCls.value}-item-content`
      }, [content]), closable && _createVNode16(TransBtn_default, {
        "class": `${selectionPrefixCls.value}-item-remove`,
        "onMousedown": onPreventMouseDown,
        "onClick": onClose,
        "customizeIcon": props3.removeIcon
      }, {
        default: () => [_createTextVNode("×")]
      })]);
    }
    function customizeRenderSelector(value, content, itemDisabled, closable, onClose, option) {
      var _a;
      const onMouseDown = (e2) => {
        onPreventMouseDown(e2);
        props3.onToggleOpen(!open);
      };
      let originData = option;
      if (legacyTreeSelectContext.keyEntities) {
        originData = ((_a = legacyTreeSelectContext.keyEntities[value]) === null || _a === void 0 ? void 0 : _a.node) || {};
      }
      return _createVNode16("span", {
        "key": value,
        "onMousedown": onMouseDown
      }, [props3.tagRender({
        label: content,
        value,
        disabled: itemDisabled,
        closable,
        onClose,
        option: originData
      })]);
    }
    function renderItem(valueItem) {
      const {
        disabled: itemDisabled,
        label,
        value,
        option
      } = valueItem;
      const closable = !props3.disabled && !itemDisabled;
      let displayLabel = label;
      if (typeof props3.maxTagTextLength === "number") {
        if (typeof label === "string" || typeof label === "number") {
          const strLabel = String(displayLabel);
          if (strLabel.length > props3.maxTagTextLength) {
            displayLabel = `${strLabel.slice(0, props3.maxTagTextLength)}...`;
          }
        }
      }
      const onClose = (event) => {
        var _a;
        if (event)
          event.stopPropagation();
        (_a = props3.onRemove) === null || _a === void 0 ? void 0 : _a.call(props3, valueItem);
      };
      return typeof props3.tagRender === "function" ? customizeRenderSelector(value, displayLabel, itemDisabled, closable, onClose, option) : defaultRenderSelector(label, displayLabel, itemDisabled, closable, onClose);
    }
    function renderRest(omittedValues) {
      const {
        maxTagPlaceholder = (omittedValues2) => `+ ${omittedValues2.length} ...`
      } = props3;
      const content = typeof maxTagPlaceholder === "function" ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
      return defaultRenderSelector(content, content, false);
    }
    const handleInput = (e2) => {
      const composing = e2.target.composing;
      targetValue.value = e2.target.value;
      if (!composing) {
        props3.onInputChange(e2);
      }
    };
    return () => {
      const {
        id,
        prefixCls,
        values,
        open: open2,
        inputRef,
        placeholder,
        disabled,
        autofocus,
        autocomplete,
        activeDescendantId,
        tabindex,
        compositionStatus,
        onInputPaste,
        onInputKeyDown,
        onInputMouseDown,
        onInputCompositionStart,
        onInputCompositionEnd
      } = props3;
      const inputNode = _createVNode16("div", {
        "class": `${selectionPrefixCls.value}-search`,
        "style": {
          width: inputWidth.value + "px"
        },
        "key": "input"
      }, [_createVNode16(Input_default, {
        "inputRef": inputRef,
        "open": open2,
        "prefixCls": prefixCls,
        "id": id,
        "inputElement": null,
        "disabled": disabled,
        "autofocus": autofocus,
        "autocomplete": autocomplete,
        "editable": inputEditable.value,
        "activeDescendantId": activeDescendantId,
        "value": targetValue.value,
        "onKeydown": onInputKeyDown,
        "onMousedown": onInputMouseDown,
        "onChange": handleInput,
        "onPaste": onInputPaste,
        "onCompositionstart": onInputCompositionStart,
        "onCompositionend": onInputCompositionEnd,
        "tabindex": tabindex,
        "attrs": pickAttrs(props3, true),
        "onFocus": () => focused.value = true,
        "onBlur": () => focused.value = false
      }, null), _createVNode16("span", {
        "ref": measureRef,
        "class": `${selectionPrefixCls.value}-search-mirror`,
        "aria-hidden": true
      }, [targetValue.value, _createTextVNode(" ")])]);
      const selectionNode = _createVNode16(vc_overflow_default, {
        "prefixCls": `${selectionPrefixCls.value}-overflow`,
        "data": values,
        "renderItem": renderItem,
        "renderRest": renderRest,
        "suffix": inputNode,
        "itemKey": "key",
        "maxCount": props3.maxTagCount,
        "key": "overflow"
      }, null);
      return _createVNode16(_Fragment2, null, [selectionNode, !values.length && !inputValue.value && !compositionStatus && _createVNode16("span", {
        "class": `${selectionPrefixCls.value}-placeholder`
      }, [placeholder])]);
    };
  }
});
var MultipleSelector_default = SelectSelector;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/SingleSelector.js
import { Fragment as _Fragment3, createVNode as _createVNode17 } from "vue";
import { Fragment as Fragment3, computed as computed14, defineComponent as defineComponent18, shallowRef as shallowRef11, watch as watch11 } from "vue";
var props2 = {
  inputElement: vue_types_default.any,
  id: String,
  prefixCls: String,
  values: vue_types_default.array,
  open: {
    type: Boolean,
    default: void 0
  },
  searchValue: String,
  inputRef: vue_types_default.any,
  placeholder: vue_types_default.any,
  compositionStatus: {
    type: Boolean,
    default: void 0
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  mode: String,
  showSearch: {
    type: Boolean,
    default: void 0
  },
  autofocus: {
    type: Boolean,
    default: void 0
  },
  autocomplete: String,
  activeDescendantId: String,
  tabindex: vue_types_default.oneOfType([vue_types_default.number, vue_types_default.string]),
  activeValue: String,
  backfill: {
    type: Boolean,
    default: void 0
  },
  optionLabelRender: Function,
  onInputChange: Function,
  onInputPaste: Function,
  onInputKeyDown: Function,
  onInputMouseDown: Function,
  onInputCompositionStart: Function,
  onInputCompositionEnd: Function
};
var SingleSelector = defineComponent18({
  name: "SingleSelector",
  setup(props3) {
    const inputChanged = shallowRef11(false);
    const combobox = computed14(() => props3.mode === "combobox");
    const inputEditable = computed14(() => combobox.value || props3.showSearch);
    const inputValue = computed14(() => {
      let inputValue2 = props3.searchValue || "";
      if (combobox.value && props3.activeValue && !inputChanged.value) {
        inputValue2 = props3.activeValue;
      }
      return inputValue2;
    });
    const legacyTreeSelectContext = useInjectLegacySelectContext();
    watch11([combobox, () => props3.activeValue], () => {
      if (combobox.value) {
        inputChanged.value = false;
      }
    }, {
      immediate: true
    });
    const hasTextInput = computed14(() => props3.mode !== "combobox" && !props3.open && !props3.showSearch ? false : !!inputValue.value || props3.compositionStatus);
    const title = computed14(() => {
      const item = props3.values[0];
      return item && (typeof item.label === "string" || typeof item.label === "number") ? item.label.toString() : void 0;
    });
    const renderPlaceholder = () => {
      if (props3.values[0]) {
        return null;
      }
      const hiddenStyle = hasTextInput.value ? {
        visibility: "hidden"
      } : void 0;
      return _createVNode17("span", {
        "class": `${props3.prefixCls}-selection-placeholder`,
        "style": hiddenStyle
      }, [props3.placeholder]);
    };
    const handleInput = (e2) => {
      const composing = e2.target.composing;
      if (!composing) {
        inputChanged.value = true;
        props3.onInputChange(e2);
      }
    };
    return () => {
      var _a, _b, _c, _d;
      const {
        inputElement,
        prefixCls,
        id,
        values,
        inputRef,
        disabled,
        autofocus,
        autocomplete,
        activeDescendantId,
        open: open2,
        tabindex,
        optionLabelRender,
        onInputKeyDown,
        onInputMouseDown,
        onInputPaste,
        onInputCompositionStart,
        onInputCompositionEnd
      } = props3;
      const item = values[0];
      let titleNode = null;
      if (item && legacyTreeSelectContext.customSlots) {
        const key = (_a = item.key) !== null && _a !== void 0 ? _a : item.value;
        const originData = ((_b = legacyTreeSelectContext.keyEntities[key]) === null || _b === void 0 ? void 0 : _b.node) || {};
        titleNode = legacyTreeSelectContext.customSlots[(_c = originData.slots) === null || _c === void 0 ? void 0 : _c.title] || legacyTreeSelectContext.customSlots.title || item.label;
        if (typeof titleNode === "function") {
          titleNode = titleNode(originData);
        }
      } else {
        titleNode = optionLabelRender && item ? optionLabelRender(item.option) : item === null || item === void 0 ? void 0 : item.label;
      }
      return _createVNode17(_Fragment3, null, [_createVNode17("span", {
        "class": `${prefixCls}-selection-search`
      }, [_createVNode17(Input_default, {
        "inputRef": inputRef,
        "prefixCls": prefixCls,
        "id": id,
        "open": open2,
        "inputElement": inputElement,
        "disabled": disabled,
        "autofocus": autofocus,
        "autocomplete": autocomplete,
        "editable": inputEditable.value,
        "activeDescendantId": activeDescendantId,
        "value": inputValue.value,
        "onKeydown": onInputKeyDown,
        "onMousedown": onInputMouseDown,
        "onChange": handleInput,
        "onPaste": onInputPaste,
        "onCompositionstart": onInputCompositionStart,
        "onCompositionend": onInputCompositionEnd,
        "tabindex": tabindex,
        "attrs": pickAttrs(props3, true)
      }, null)]), !combobox.value && item && !hasTextInput.value && _createVNode17("span", {
        "class": `${prefixCls}-selection-item`,
        "title": title.value
      }, [_createVNode17(_Fragment3, {
        "key": (_d = item.key) !== null && _d !== void 0 ? _d : item.value
      }, [titleNode])]), renderPlaceholder()]);
    };
  }
});
SingleSelector.props = props2;
SingleSelector.inheritAttrs = false;
var SingleSelector_default = SingleSelector;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/utils/keyUtil.js
function isValidateOpenKey(currentKeyCode) {
  return ![
    // System function button
    KeyCode_default.ESC,
    KeyCode_default.SHIFT,
    KeyCode_default.BACKSPACE,
    KeyCode_default.TAB,
    KeyCode_default.WIN_KEY,
    KeyCode_default.ALT,
    KeyCode_default.META,
    KeyCode_default.WIN_KEY_RIGHT,
    KeyCode_default.CTRL,
    KeyCode_default.SEMICOLON,
    KeyCode_default.EQUALS,
    KeyCode_default.CAPS_LOCK,
    KeyCode_default.CONTEXT_MENU,
    // F1-F12
    KeyCode_default.F1,
    KeyCode_default.F2,
    KeyCode_default.F3,
    KeyCode_default.F4,
    KeyCode_default.F5,
    KeyCode_default.F6,
    KeyCode_default.F7,
    KeyCode_default.F8,
    KeyCode_default.F9,
    KeyCode_default.F10,
    KeyCode_default.F11,
    KeyCode_default.F12
  ].includes(currentKeyCode);
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useLock.js
import { onBeforeUnmount as onBeforeUnmount3 } from "vue";
function useLock() {
  let duration = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 250;
  let lock = null;
  let timeout;
  onBeforeUnmount3(() => {
    clearTimeout(timeout);
  });
  function doLock(locked) {
    if (locked || lock === null) {
      lock = locked;
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      lock = null;
    }, duration);
  }
  return [() => lock, doLock];
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/index.js
import { defineComponent as defineComponent19, ref as ref7 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/createRef.js
function createRef() {
  const func = (node) => {
    func.current = node;
  };
  return func;
}
var createRef_default = createRef;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Selector/index.js
var Selector = defineComponent19({
  name: "Selector",
  inheritAttrs: false,
  props: {
    id: String,
    prefixCls: String,
    showSearch: {
      type: Boolean,
      default: void 0
    },
    open: {
      type: Boolean,
      default: void 0
    },
    /** Display in the Selector value, it's not same as `value` prop */
    values: vue_types_default.array,
    multiple: {
      type: Boolean,
      default: void 0
    },
    mode: String,
    searchValue: String,
    activeValue: String,
    inputElement: vue_types_default.any,
    autofocus: {
      type: Boolean,
      default: void 0
    },
    activeDescendantId: String,
    tabindex: vue_types_default.oneOfType([vue_types_default.number, vue_types_default.string]),
    disabled: {
      type: Boolean,
      default: void 0
    },
    placeholder: vue_types_default.any,
    removeIcon: vue_types_default.any,
    // Tags
    maxTagCount: vue_types_default.oneOfType([vue_types_default.number, vue_types_default.string]),
    maxTagTextLength: Number,
    maxTagPlaceholder: vue_types_default.any,
    tagRender: Function,
    optionLabelRender: Function,
    /** Check if `tokenSeparators` contains `\n` or `\r\n` */
    tokenWithEnter: {
      type: Boolean,
      default: void 0
    },
    // Motion
    choiceTransitionName: String,
    onToggleOpen: {
      type: Function
    },
    /** `onSearch` returns go next step boolean to check if need do toggle open */
    onSearch: Function,
    onSearchSubmit: Function,
    onRemove: Function,
    onInputKeyDown: {
      type: Function
    },
    /**
     * @private get real dom for trigger align.
     * This may be removed after React provides replacement of `findDOMNode`
     */
    domRef: Function
  },
  setup(props3, _ref) {
    let {
      expose
    } = _ref;
    const inputRef = createRef_default();
    const compositionStatus = ref7(false);
    const [getInputMouseDown, setInputMouseDown] = useLock(0);
    const onInternalInputKeyDown = (event) => {
      const {
        which
      } = event;
      if (which === KeyCode_default.UP || which === KeyCode_default.DOWN) {
        event.preventDefault();
      }
      if (props3.onInputKeyDown) {
        props3.onInputKeyDown(event);
      }
      if (which === KeyCode_default.ENTER && props3.mode === "tags" && !compositionStatus.value && !props3.open) {
        props3.onSearchSubmit(event.target.value);
      }
      if (isValidateOpenKey(which)) {
        props3.onToggleOpen(true);
      }
    };
    const onInternalInputMouseDown = () => {
      setInputMouseDown(true);
    };
    let pastedText = null;
    const triggerOnSearch = (value) => {
      if (props3.onSearch(value, true, compositionStatus.value) !== false) {
        props3.onToggleOpen(true);
      }
    };
    const onInputCompositionStart = () => {
      compositionStatus.value = true;
    };
    const onInputCompositionEnd = (e2) => {
      compositionStatus.value = false;
      if (props3.mode !== "combobox") {
        triggerOnSearch(e2.target.value);
      }
    };
    const onInputChange = (event) => {
      let {
        target: {
          value
        }
      } = event;
      if (props3.tokenWithEnter && pastedText && /[\r\n]/.test(pastedText)) {
        const replacedText = pastedText.replace(/[\r\n]+$/, "").replace(/\r\n/g, " ").replace(/[\r\n]/g, " ");
        value = value.replace(replacedText, pastedText);
      }
      pastedText = null;
      triggerOnSearch(value);
    };
    const onInputPaste = (e2) => {
      const {
        clipboardData
      } = e2;
      const value = clipboardData.getData("text");
      pastedText = value;
    };
    const onClick = (_ref2) => {
      let {
        target
      } = _ref2;
      if (target !== inputRef.current) {
        const isIE = document.body.style.msTouchAction !== void 0;
        if (isIE) {
          setTimeout(() => {
            inputRef.current.focus();
          });
        } else {
          inputRef.current.focus();
        }
      }
    };
    const onMousedown = (event) => {
      const inputMouseDown = getInputMouseDown();
      if (event.target !== inputRef.current && !inputMouseDown) {
        event.preventDefault();
      }
      if (props3.mode !== "combobox" && (!props3.showSearch || !inputMouseDown) || !props3.open) {
        if (props3.open) {
          props3.onSearch("", true, false);
        }
        props3.onToggleOpen();
      }
    };
    expose({
      focus: () => {
        inputRef.current.focus();
      },
      blur: () => {
        inputRef.current.blur();
      }
    });
    return () => {
      const {
        prefixCls,
        domRef,
        mode
      } = props3;
      const sharedProps = {
        inputRef,
        onInputKeyDown: onInternalInputKeyDown,
        onInputMouseDown: onInternalInputMouseDown,
        onInputChange,
        onInputPaste,
        compositionStatus: compositionStatus.value,
        onInputCompositionStart,
        onInputCompositionEnd
      };
      const selectNode = mode === "multiple" || mode === "tags" ? _createVNode18(MultipleSelector_default, _objectSpread2(_objectSpread2({}, props3), sharedProps), null) : _createVNode18(SingleSelector_default, _objectSpread2(_objectSpread2({}, props3), sharedProps), null);
      return _createVNode18("div", {
        "ref": domRef,
        "class": `${prefixCls}-selector`,
        "onClick": onClick,
        "onMousedown": onMousedown
      }, [selectNode]);
    };
  }
});
var Selector_default = Selector;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useSelectTriggerControl.js
import { onBeforeUnmount as onBeforeUnmount4, onMounted as onMounted7 } from "vue";
function useSelectTriggerControl(refs, open2, triggerOpen) {
  function onGlobalMouseDown(event) {
    var _a, _b, _c;
    let target = event.target;
    if (target.shadowRoot && event.composed) {
      target = event.composedPath()[0] || target;
    }
    const elements = [(_a = refs[0]) === null || _a === void 0 ? void 0 : _a.value, (_c = (_b = refs[1]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.getPopupElement()];
    if (open2.value && elements.every((element) => element && !element.contains(target) && element !== target)) {
      triggerOpen(false);
    }
  }
  onMounted7(() => {
    window.addEventListener("mousedown", onGlobalMouseDown);
  });
  onBeforeUnmount4(() => {
    window.removeEventListener("mousedown", onGlobalMouseDown);
  });
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useDelayReset.js
import { onMounted as onMounted8, shallowRef as shallowRef12 } from "vue";
function useDelayReset() {
  let timeout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
  const bool = shallowRef12(false);
  let delay;
  const cancelLatest = () => {
    clearTimeout(delay);
  };
  onMounted8(() => {
    cancelLatest();
  });
  const delaySetBool = (value, callback) => {
    cancelLatest();
    delay = setTimeout(() => {
      bool.value = value;
      if (callback) {
        callback();
      }
    }, timeout);
  };
  return [bool, delaySetBool, cancelLatest];
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useBaseProps.js
import { inject as inject6, provide as provide5 } from "vue";
var BaseSelectContextKey = Symbol("BaseSelectContextKey");
function useProvideBaseSelectProps(props3) {
  return provide5(BaseSelectContextKey, props3);
}
function useBaseProps() {
  return inject6(BaseSelectContextKey, {});
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/BaseSelect.js
import { computed as computed15, defineComponent as defineComponent20, onBeforeUnmount as onBeforeUnmount5, onMounted as onMounted9, provide as provide6, shallowRef as shallowRef13, toRefs, watch as watch12, watchEffect as watchEffect3, ref as ref8 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-util/isMobile.js
var isMobile_default = () => {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  const agent = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent === null || agent === void 0 ? void 0 : agent.substring(0, 4));
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/toReactive.js
import { isRef, reactive as reactive2 } from "vue";
function toReactive(objectRef) {
  if (!isRef(objectRef))
    return reactive2(objectRef);
  const proxy = new Proxy({}, {
    get(_2, p, receiver) {
      return Reflect.get(objectRef.value, p, receiver);
    },
    set(_2, p, value) {
      objectRef.value[p] = value;
      return true;
    },
    deleteProperty(_2, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(_2, p) {
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive2(proxy);
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/BaseSelect.js
var __rest7 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var DEFAULT_OMIT_PROPS = ["value", "onChange", "removeIcon", "placeholder", "autofocus", "maxTagCount", "maxTagTextLength", "maxTagPlaceholder", "choiceTransitionName", "onInputKeyDown", "onPopupScroll", "tabindex", "OptionList", "notFoundContent"];
var baseSelectPrivateProps = () => {
  return {
    prefixCls: String,
    id: String,
    omitDomProps: Array,
    // >>> Value
    displayValues: Array,
    onDisplayValuesChange: Function,
    // >>> Active
    /** Current dropdown list active item string value */
    activeValue: String,
    /** Link search input with target element */
    activeDescendantId: String,
    onActiveValueChange: Function,
    // >>> Search
    searchValue: String,
    /** Trigger onSearch, return false to prevent trigger open event */
    onSearch: Function,
    /** Trigger when search text match the `tokenSeparators`. Will provide split content */
    onSearchSplit: Function,
    maxLength: Number,
    OptionList: vue_types_default.any,
    /** Tell if provided `options` is empty */
    emptyOptions: Boolean
  };
};
var baseSelectPropsWithoutPrivate = () => {
  return {
    showSearch: {
      type: Boolean,
      default: void 0
    },
    tagRender: {
      type: Function
    },
    optionLabelRender: {
      type: Function
    },
    direction: {
      type: String
    },
    // MISC
    tabindex: Number,
    autofocus: Boolean,
    notFoundContent: vue_types_default.any,
    placeholder: vue_types_default.any,
    onClear: Function,
    choiceTransitionName: String,
    // >>> Mode
    mode: String,
    // >>> Status
    disabled: {
      type: Boolean,
      default: void 0
    },
    loading: {
      type: Boolean,
      default: void 0
    },
    // >>> Open
    open: {
      type: Boolean,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      default: void 0
    },
    onDropdownVisibleChange: {
      type: Function
    },
    // >>> Customize Input
    /** @private Internal usage. Do not use in your production. */
    getInputElement: {
      type: Function
    },
    /** @private Internal usage. Do not use in your production. */
    getRawInputElement: {
      type: Function
    },
    // >>> Selector
    maxTagTextLength: Number,
    maxTagCount: {
      type: [String, Number]
    },
    maxTagPlaceholder: vue_types_default.any,
    // >>> Search
    tokenSeparators: {
      type: Array
    },
    // >>> Icons
    allowClear: {
      type: Boolean,
      default: void 0
    },
    showArrow: {
      type: Boolean,
      default: void 0
    },
    inputIcon: vue_types_default.any,
    /** Clear all icon */
    clearIcon: vue_types_default.any,
    /** Selector remove icon */
    removeIcon: vue_types_default.any,
    // >>> Dropdown
    animation: String,
    transitionName: String,
    dropdownStyle: {
      type: Object
    },
    dropdownClassName: String,
    dropdownMatchSelectWidth: {
      type: [Boolean, Number],
      default: void 0
    },
    dropdownRender: {
      type: Function
    },
    dropdownAlign: Object,
    placement: {
      type: String
    },
    getPopupContainer: {
      type: Function
    },
    // >>> Focus
    showAction: {
      type: Array
    },
    onBlur: {
      type: Function
    },
    onFocus: {
      type: Function
    },
    // >>> Rest Events
    onKeyup: Function,
    onKeydown: Function,
    onMousedown: Function,
    onPopupScroll: Function,
    onInputKeyDown: Function,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function
  };
};
var baseSelectProps = () => {
  return _extends(_extends({}, baseSelectPrivateProps()), baseSelectPropsWithoutPrivate());
};
function isMultiple(mode) {
  return mode === "tags" || mode === "multiple";
}
var BaseSelect_default = defineComponent20({
  compatConfig: {
    MODE: 3
  },
  name: "BaseSelect",
  inheritAttrs: false,
  props: initDefaultProps_default(baseSelectProps(), {
    showAction: [],
    notFoundContent: "Not Found"
  }),
  setup(props3, _ref) {
    let {
      attrs,
      expose,
      slots
    } = _ref;
    const multiple = computed15(() => isMultiple(props3.mode));
    const mergedShowSearch = computed15(() => props3.showSearch !== void 0 ? props3.showSearch : multiple.value || props3.mode === "combobox");
    const mobile = shallowRef13(false);
    onMounted9(() => {
      mobile.value = isMobile_default();
    });
    const legacyTreeSelectContext = useInjectLegacySelectContext();
    const containerRef = shallowRef13(null);
    const selectorDomRef = createRef_default();
    const triggerRef = shallowRef13(null);
    const selectorRef = shallowRef13(null);
    const listRef = shallowRef13(null);
    const blurRef = ref8(false);
    const [mockFocused, setMockFocused, cancelSetMockFocused] = useDelayReset();
    const focus = () => {
      var _a;
      (_a = selectorRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = selectorRef.value) === null || _a === void 0 ? void 0 : _a.blur();
    };
    expose({
      focus,
      blur,
      scrollTo: (arg) => {
        var _a;
        return (_a = listRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg);
      }
    });
    const mergedSearchValue = computed15(() => {
      var _a;
      if (props3.mode !== "combobox") {
        return props3.searchValue;
      }
      const val = (_a = props3.displayValues[0]) === null || _a === void 0 ? void 0 : _a.value;
      return typeof val === "string" || typeof val === "number" ? String(val) : "";
    });
    const initOpen = props3.open !== void 0 ? props3.open : props3.defaultOpen;
    const innerOpen = shallowRef13(initOpen);
    const mergedOpen = shallowRef13(initOpen);
    const setInnerOpen = (val) => {
      innerOpen.value = props3.open !== void 0 ? props3.open : val;
      mergedOpen.value = innerOpen.value;
    };
    watch12(() => props3.open, () => {
      setInnerOpen(props3.open);
    });
    const emptyListContent = computed15(() => !props3.notFoundContent && props3.emptyOptions);
    watchEffect3(() => {
      mergedOpen.value = innerOpen.value;
      if (props3.disabled || emptyListContent.value && mergedOpen.value && props3.mode === "combobox") {
        mergedOpen.value = false;
      }
    });
    const triggerOpen = computed15(() => emptyListContent.value ? false : mergedOpen.value);
    const onToggleOpen = (newOpen) => {
      const nextOpen = newOpen !== void 0 ? newOpen : !mergedOpen.value;
      if (mergedOpen.value !== nextOpen && !props3.disabled) {
        setInnerOpen(nextOpen);
        props3.onDropdownVisibleChange && props3.onDropdownVisibleChange(nextOpen);
        if (!nextOpen && popupFocused.value) {
          popupFocused.value = false;
          setMockFocused(false, () => {
            focusRef.value = false;
            blurRef.value = false;
          });
        }
      }
    };
    const tokenWithEnter = computed15(() => (props3.tokenSeparators || []).some((tokenSeparator) => ["\n", "\r\n"].includes(tokenSeparator)));
    const onInternalSearch = (searchText, fromTyping, isCompositing) => {
      var _a, _b;
      let ret = true;
      let newSearchText = searchText;
      (_a = props3.onActiveValueChange) === null || _a === void 0 ? void 0 : _a.call(props3, null);
      const patchLabels = isCompositing ? null : getSeparatedContent(searchText, props3.tokenSeparators);
      if (props3.mode !== "combobox" && patchLabels) {
        newSearchText = "";
        (_b = props3.onSearchSplit) === null || _b === void 0 ? void 0 : _b.call(props3, patchLabels);
        onToggleOpen(false);
        ret = false;
      }
      if (props3.onSearch && mergedSearchValue.value !== newSearchText) {
        props3.onSearch(newSearchText, {
          source: fromTyping ? "typing" : "effect"
        });
      }
      return ret;
    };
    const onInternalSearchSubmit = (searchText) => {
      var _a;
      if (!searchText || !searchText.trim()) {
        return;
      }
      (_a = props3.onSearch) === null || _a === void 0 ? void 0 : _a.call(props3, searchText, {
        source: "submit"
      });
    };
    watch12(mergedOpen, () => {
      if (!mergedOpen.value && !multiple.value && props3.mode !== "combobox") {
        onInternalSearch("", false, false);
      }
    }, {
      immediate: true,
      flush: "post"
    });
    watch12(() => props3.disabled, () => {
      if (innerOpen.value && !!props3.disabled) {
        setInnerOpen(false);
      }
      if (props3.disabled && !blurRef.value) {
        setMockFocused(false);
      }
    }, {
      immediate: true
    });
    const [getClearLock, setClearLock] = useLock();
    const onInternalKeyDown = function(event) {
      var _a;
      const clearLock = getClearLock();
      const {
        which
      } = event;
      if (which === KeyCode_default.ENTER) {
        if (props3.mode !== "combobox") {
          event.preventDefault();
        }
        if (!mergedOpen.value) {
          onToggleOpen(true);
        }
      }
      setClearLock(!!mergedSearchValue.value);
      if (which === KeyCode_default.BACKSPACE && !clearLock && multiple.value && !mergedSearchValue.value && props3.displayValues.length) {
        const cloneDisplayValues = [...props3.displayValues];
        let removedDisplayValue = null;
        for (let i2 = cloneDisplayValues.length - 1; i2 >= 0; i2 -= 1) {
          const current = cloneDisplayValues[i2];
          if (!current.disabled) {
            cloneDisplayValues.splice(i2, 1);
            removedDisplayValue = current;
            break;
          }
        }
        if (removedDisplayValue) {
          props3.onDisplayValuesChange(cloneDisplayValues, {
            type: "remove",
            values: [removedDisplayValue]
          });
        }
      }
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      if (mergedOpen.value && listRef.value) {
        listRef.value.onKeydown(event, ...rest);
      }
      (_a = props3.onKeydown) === null || _a === void 0 ? void 0 : _a.call(props3, event, ...rest);
    };
    const onInternalKeyUp = function(event) {
      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }
      if (mergedOpen.value && listRef.value) {
        listRef.value.onKeyup(event, ...rest);
      }
      if (props3.onKeyup) {
        props3.onKeyup(event, ...rest);
      }
    };
    const onSelectorRemove = (val) => {
      const newValues = props3.displayValues.filter((i2) => i2 !== val);
      props3.onDisplayValuesChange(newValues, {
        type: "remove",
        values: [val]
      });
    };
    const focusRef = shallowRef13(false);
    const onContainerFocus = function() {
      setMockFocused(true);
      if (!props3.disabled) {
        if (props3.onFocus && !focusRef.value) {
          props3.onFocus(...arguments);
        }
        if (props3.showAction && props3.showAction.includes("focus")) {
          onToggleOpen(true);
        }
      }
      focusRef.value = true;
    };
    const popupFocused = ref8(false);
    const onContainerBlur = function() {
      if (popupFocused.value) {
        return;
      }
      blurRef.value = true;
      setMockFocused(false, () => {
        focusRef.value = false;
        blurRef.value = false;
        onToggleOpen(false);
      });
      if (props3.disabled) {
        return;
      }
      const searchVal = mergedSearchValue.value;
      if (searchVal) {
        if (props3.mode === "tags") {
          props3.onSearch(searchVal, {
            source: "submit"
          });
        } else if (props3.mode === "multiple") {
          props3.onSearch("", {
            source: "blur"
          });
        }
      }
      if (props3.onBlur) {
        props3.onBlur(...arguments);
      }
    };
    const onPopupFocusin = () => {
      popupFocused.value = true;
    };
    const onPopupFocusout = () => {
      popupFocused.value = false;
    };
    provide6("VCSelectContainerEvent", {
      focus: onContainerFocus,
      blur: onContainerBlur
    });
    const activeTimeoutIds = [];
    onMounted9(() => {
      activeTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      activeTimeoutIds.splice(0, activeTimeoutIds.length);
    });
    onBeforeUnmount5(() => {
      activeTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      activeTimeoutIds.splice(0, activeTimeoutIds.length);
    });
    const onInternalMouseDown = function(event) {
      var _a, _b;
      const {
        target
      } = event;
      const popupElement = (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.getPopupElement();
      if (popupElement && popupElement.contains(target)) {
        const timeoutId = setTimeout(() => {
          var _a2;
          const index2 = activeTimeoutIds.indexOf(timeoutId);
          if (index2 !== -1) {
            activeTimeoutIds.splice(index2, 1);
          }
          cancelSetMockFocused();
          if (!mobile.value && !popupElement.contains(document.activeElement)) {
            (_a2 = selectorRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus();
          }
        });
        activeTimeoutIds.push(timeoutId);
      }
      for (var _len3 = arguments.length, restArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        restArgs[_key3 - 1] = arguments[_key3];
      }
      (_b = props3.onMousedown) === null || _b === void 0 ? void 0 : _b.call(props3, event, ...restArgs);
    };
    const containerWidth = shallowRef13(null);
    const onPopupMouseEnter = () => {
    };
    onMounted9(() => {
      watch12(triggerOpen, () => {
        var _a;
        if (triggerOpen.value) {
          const newWidth = Math.ceil((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth);
          if (containerWidth.value !== newWidth && !Number.isNaN(newWidth)) {
            containerWidth.value = newWidth;
          }
        }
      }, {
        immediate: true,
        flush: "post"
      });
    });
    useSelectTriggerControl([containerRef, triggerRef], triggerOpen, onToggleOpen);
    useProvideBaseSelectProps(toReactive(_extends(_extends({}, toRefs(props3)), {
      open: mergedOpen,
      triggerOpen,
      showSearch: mergedShowSearch,
      multiple,
      toggleOpen: onToggleOpen
    })));
    return () => {
      const _a = _extends(_extends({}, props3), attrs), {
        prefixCls,
        id,
        open: open2,
        defaultOpen,
        mode,
        // Search related
        showSearch,
        searchValue,
        onSearch,
        // Icons
        allowClear,
        clearIcon,
        showArrow,
        inputIcon,
        // Others
        disabled,
        loading,
        getInputElement,
        getPopupContainer,
        placement,
        // Dropdown
        animation,
        transitionName,
        dropdownStyle,
        dropdownClassName,
        dropdownMatchSelectWidth,
        dropdownRender,
        dropdownAlign,
        showAction,
        direction,
        // Tags
        tokenSeparators,
        tagRender,
        optionLabelRender,
        // Events
        onPopupScroll,
        onDropdownVisibleChange,
        onFocus,
        onBlur,
        onKeyup,
        onKeydown,
        onMousedown,
        onClear,
        omitDomProps,
        getRawInputElement,
        displayValues,
        onDisplayValuesChange,
        emptyOptions,
        activeDescendantId,
        activeValue,
        OptionList: OptionList2
      } = _a, restProps = __rest7(_a, ["prefixCls", "id", "open", "defaultOpen", "mode", "showSearch", "searchValue", "onSearch", "allowClear", "clearIcon", "showArrow", "inputIcon", "disabled", "loading", "getInputElement", "getPopupContainer", "placement", "animation", "transitionName", "dropdownStyle", "dropdownClassName", "dropdownMatchSelectWidth", "dropdownRender", "dropdownAlign", "showAction", "direction", "tokenSeparators", "tagRender", "optionLabelRender", "onPopupScroll", "onDropdownVisibleChange", "onFocus", "onBlur", "onKeyup", "onKeydown", "onMousedown", "onClear", "omitDomProps", "getRawInputElement", "displayValues", "onDisplayValuesChange", "emptyOptions", "activeDescendantId", "activeValue", "OptionList"]);
      const customizeInputElement = mode === "combobox" && getInputElement && getInputElement() || null;
      const customizeRawInputElement = typeof getRawInputElement === "function" && getRawInputElement();
      const domProps = _extends({}, restProps);
      let onTriggerVisibleChange;
      if (customizeRawInputElement) {
        onTriggerVisibleChange = (newOpen) => {
          onToggleOpen(newOpen);
        };
      }
      DEFAULT_OMIT_PROPS.forEach((propName) => {
        delete domProps[propName];
      });
      omitDomProps === null || omitDomProps === void 0 ? void 0 : omitDomProps.forEach((propName) => {
        delete domProps[propName];
      });
      const mergedShowArrow = showArrow !== void 0 ? showArrow : loading || !multiple.value && mode !== "combobox";
      let arrowNode;
      if (mergedShowArrow) {
        arrowNode = _createVNode19(TransBtn_default, {
          "class": classNames_default(`${prefixCls}-arrow`, {
            [`${prefixCls}-arrow-loading`]: loading
          }),
          "customizeIcon": inputIcon,
          "customizeIconProps": {
            loading,
            searchValue: mergedSearchValue.value,
            open: mergedOpen.value,
            focused: mockFocused.value,
            showSearch: mergedShowSearch.value
          }
        }, null);
      }
      let clearNode;
      const onClearMouseDown = () => {
        onClear === null || onClear === void 0 ? void 0 : onClear();
        onDisplayValuesChange([], {
          type: "clear",
          values: displayValues
        });
        onInternalSearch("", false, false);
      };
      if (!disabled && allowClear && (displayValues.length || mergedSearchValue.value)) {
        clearNode = _createVNode19(TransBtn_default, {
          "class": `${prefixCls}-clear`,
          "onMousedown": onClearMouseDown,
          "customizeIcon": clearIcon
        }, {
          default: () => [_createTextVNode2("×")]
        });
      }
      const optionList = _createVNode19(OptionList2, {
        "ref": listRef
      }, _extends(_extends({}, legacyTreeSelectContext.customSlots), {
        option: slots.option
      }));
      const mergedClassName = classNames_default(prefixCls, attrs.class, {
        [`${prefixCls}-focused`]: mockFocused.value,
        [`${prefixCls}-multiple`]: multiple.value,
        [`${prefixCls}-single`]: !multiple.value,
        [`${prefixCls}-allow-clear`]: allowClear,
        [`${prefixCls}-show-arrow`]: mergedShowArrow,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-open`]: mergedOpen.value,
        [`${prefixCls}-customize-input`]: customizeInputElement,
        [`${prefixCls}-show-search`]: mergedShowSearch.value
      });
      const selectorNode = _createVNode19(SelectTrigger_default, {
        "ref": triggerRef,
        "disabled": disabled,
        "prefixCls": prefixCls,
        "visible": triggerOpen.value,
        "popupElement": optionList,
        "containerWidth": containerWidth.value,
        "animation": animation,
        "transitionName": transitionName,
        "dropdownStyle": dropdownStyle,
        "dropdownClassName": dropdownClassName,
        "direction": direction,
        "dropdownMatchSelectWidth": dropdownMatchSelectWidth,
        "dropdownRender": dropdownRender,
        "dropdownAlign": dropdownAlign,
        "placement": placement,
        "getPopupContainer": getPopupContainer,
        "empty": emptyOptions,
        "getTriggerDOMNode": () => selectorDomRef.current,
        "onPopupVisibleChange": onTriggerVisibleChange,
        "onPopupMouseEnter": onPopupMouseEnter,
        "onPopupFocusin": onPopupFocusin,
        "onPopupFocusout": onPopupFocusout
      }, {
        default: () => {
          return customizeRawInputElement ? isValidElement(customizeRawInputElement) && cloneElement(customizeRawInputElement, {
            ref: selectorDomRef
          }, false, true) : _createVNode19(Selector_default, _objectSpread2(_objectSpread2({}, props3), {}, {
            "domRef": selectorDomRef,
            "prefixCls": prefixCls,
            "inputElement": customizeInputElement,
            "ref": selectorRef,
            "id": id,
            "showSearch": mergedShowSearch.value,
            "mode": mode,
            "activeDescendantId": activeDescendantId,
            "tagRender": tagRender,
            "optionLabelRender": optionLabelRender,
            "values": displayValues,
            "open": mergedOpen.value,
            "onToggleOpen": onToggleOpen,
            "activeValue": activeValue,
            "searchValue": mergedSearchValue.value,
            "onSearch": onInternalSearch,
            "onSearchSubmit": onInternalSearchSubmit,
            "onRemove": onSelectorRemove,
            "tokenWithEnter": tokenWithEnter.value
          }), null);
        }
      });
      let renderNode;
      if (customizeRawInputElement) {
        renderNode = selectorNode;
      } else {
        renderNode = _createVNode19("div", _objectSpread2(_objectSpread2({}, domProps), {}, {
          "class": mergedClassName,
          "ref": containerRef,
          "onMousedown": onInternalMouseDown,
          "onKeydown": onInternalKeyDown,
          "onKeyup": onInternalKeyUp
        }), [mockFocused.value && !mergedOpen.value && _createVNode19("span", {
          "style": {
            width: 0,
            height: 0,
            position: "absolute",
            overflow: "hidden",
            opacity: 0
          },
          "aria-live": "polite"
        }, [`${displayValues.map((_ref2) => {
          let {
            label,
            value
          } = _ref2;
          return ["number", "string"].includes(typeof label) ? label : value;
        }).join(", ")}`]), selectorNode, arrowNode, clearNode]);
      }
      return renderNode;
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/OptionList.js
import { resolveDirective as _resolveDirective13, Fragment as _Fragment4, createVNode as _createVNode23 } from "vue";
import { computed as computed17, defineComponent as defineComponent23, nextTick as nextTick7, reactive as reactive5, toRaw as toRaw2, watch as watch17 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/List.js
import { resolveDirective as _resolveDirective12, createVNode as _createVNode22 } from "vue";
import { shallowRef as shallowRef14, toRaw, onMounted as onMounted11, onUpdated as onUpdated5, defineComponent as defineComponent22, watchEffect as watchEffect4, computed as computed16, nextTick as nextTick6, onBeforeUnmount as onBeforeUnmount7, reactive as reactive4, watch as watch15 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/Filler.js
import { createVNode as _createVNode20 } from "vue";
var Filter = (_ref, _ref2) => {
  let {
    height,
    offset: offset2,
    prefixCls,
    onInnerResize
  } = _ref;
  let {
    slots
  } = _ref2;
  var _a;
  let outerStyle = {};
  let innerStyle = {
    display: "flex",
    flexDirection: "column"
  };
  if (offset2 !== void 0) {
    outerStyle = {
      height: `${height}px`,
      position: "relative",
      overflow: "hidden"
    };
    innerStyle = _extends(_extends({}, innerStyle), {
      transform: `translateY(${offset2}px)`,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0
    });
  }
  return _createVNode20("div", {
    "style": outerStyle
  }, [_createVNode20(vc_resize_observer_default, {
    "onResize": (_ref3) => {
      let {
        offsetHeight
      } = _ref3;
      if (offsetHeight && onInnerResize) {
        onInnerResize();
      }
    }
  }, {
    default: () => [_createVNode20("div", {
      "style": innerStyle,
      "class": classNames_default({
        [`${prefixCls}-holder-inner`]: prefixCls
      })
    }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)])]
  })]);
};
Filter.displayName = "Filter";
Filter.inheritAttrs = false;
Filter.props = {
  prefixCls: String,
  /** Virtual filler height. Should be `count * itemMinHeight` */
  height: Number,
  /** Set offset of visible items. Should be the top of start item position */
  offset: Number,
  onInnerResize: Function
};
var Filler_default = Filter;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/Item.js
import { cloneVNode as cloneVNode3 } from "vue";
var Item = (_ref, _ref2) => {
  let {
    setRef
  } = _ref;
  let {
    slots
  } = _ref2;
  var _a;
  const children = flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
  return children && children.length ? cloneVNode3(children[0], {
    ref: setRef
  }) : children;
};
Item.props = {
  setRef: {
    type: Function,
    default: () => {
    }
  }
};
var Item_default2 = Item;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/ScrollBar.js
import { createVNode as _createVNode21 } from "vue";
import { defineComponent as defineComponent21, reactive as reactive3 } from "vue";
var MIN_SIZE = 20;
function getPageY(e2) {
  return "touches" in e2 ? e2.touches[0].pageY : e2.pageY;
}
var ScrollBar_default = defineComponent21({
  compatConfig: {
    MODE: 3
  },
  name: "ScrollBar",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    scrollTop: Number,
    scrollHeight: Number,
    height: Number,
    count: Number,
    onScroll: {
      type: Function
    },
    onStartMove: {
      type: Function
    },
    onStopMove: {
      type: Function
    }
  },
  setup() {
    return {
      moveRaf: null,
      scrollbarRef: createRef_default(),
      thumbRef: createRef_default(),
      visibleTimeout: null,
      state: reactive3({
        dragging: false,
        pageY: null,
        startTop: null,
        visible: false
      })
    };
  },
  watch: {
    scrollTop: {
      handler() {
        this.delayHidden();
      },
      flush: "post"
    }
  },
  mounted() {
    var _a, _b;
    (_a = this.scrollbarRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener("touchstart", this.onScrollbarTouchStart, supportsPassive_default ? {
      passive: false
    } : false);
    (_b = this.thumbRef.current) === null || _b === void 0 ? void 0 : _b.addEventListener("touchstart", this.onMouseDown, supportsPassive_default ? {
      passive: false
    } : false);
  },
  beforeUnmount() {
    this.removeEvents();
    clearTimeout(this.visibleTimeout);
  },
  methods: {
    delayHidden() {
      clearTimeout(this.visibleTimeout);
      this.state.visible = true;
      this.visibleTimeout = setTimeout(() => {
        this.state.visible = false;
      }, 2e3);
    },
    onScrollbarTouchStart(e2) {
      e2.preventDefault();
    },
    onContainerMouseDown(e2) {
      e2.stopPropagation();
      e2.preventDefault();
    },
    // ======================= Clean =======================
    patchEvents() {
      window.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
      this.thumbRef.current.addEventListener("touchmove", this.onMouseMove, supportsPassive_default ? {
        passive: false
      } : false);
      this.thumbRef.current.addEventListener("touchend", this.onMouseUp);
    },
    removeEvents() {
      window.removeEventListener("mousemove", this.onMouseMove);
      window.removeEventListener("mouseup", this.onMouseUp);
      this.scrollbarRef.current.removeEventListener("touchstart", this.onScrollbarTouchStart, supportsPassive_default ? {
        passive: false
      } : false);
      if (this.thumbRef.current) {
        this.thumbRef.current.removeEventListener("touchstart", this.onMouseDown, supportsPassive_default ? {
          passive: false
        } : false);
        this.thumbRef.current.removeEventListener("touchmove", this.onMouseMove, supportsPassive_default ? {
          passive: false
        } : false);
        this.thumbRef.current.removeEventListener("touchend", this.onMouseUp);
      }
      wrapperRaf.cancel(this.moveRaf);
    },
    // ======================= Thumb =======================
    onMouseDown(e2) {
      const {
        onStartMove
      } = this.$props;
      _extends(this.state, {
        dragging: true,
        pageY: getPageY(e2),
        startTop: this.getTop()
      });
      onStartMove();
      this.patchEvents();
      e2.stopPropagation();
      e2.preventDefault();
    },
    onMouseMove(e2) {
      const {
        dragging,
        pageY,
        startTop
      } = this.state;
      const {
        onScroll
      } = this.$props;
      wrapperRaf.cancel(this.moveRaf);
      if (dragging) {
        const offsetY = getPageY(e2) - pageY;
        const newTop = startTop + offsetY;
        const enableScrollRange = this.getEnableScrollRange();
        const enableHeightRange = this.getEnableHeightRange();
        const ptg = enableHeightRange ? newTop / enableHeightRange : 0;
        const newScrollTop = Math.ceil(ptg * enableScrollRange);
        this.moveRaf = wrapperRaf(() => {
          onScroll(newScrollTop);
        });
      }
    },
    onMouseUp() {
      const {
        onStopMove
      } = this.$props;
      this.state.dragging = false;
      onStopMove();
      this.removeEvents();
    },
    // ===================== Calculate =====================
    getSpinHeight() {
      const {
        height,
        scrollHeight
      } = this.$props;
      let baseHeight = height / scrollHeight * 100;
      baseHeight = Math.max(baseHeight, MIN_SIZE);
      baseHeight = Math.min(baseHeight, height / 2);
      return Math.floor(baseHeight);
    },
    getEnableScrollRange() {
      const {
        scrollHeight,
        height
      } = this.$props;
      return scrollHeight - height || 0;
    },
    getEnableHeightRange() {
      const {
        height
      } = this.$props;
      const spinHeight = this.getSpinHeight();
      return height - spinHeight || 0;
    },
    getTop() {
      const {
        scrollTop
      } = this.$props;
      const enableScrollRange = this.getEnableScrollRange();
      const enableHeightRange = this.getEnableHeightRange();
      if (scrollTop === 0 || enableScrollRange === 0) {
        return 0;
      }
      const ptg = scrollTop / enableScrollRange;
      return ptg * enableHeightRange;
    },
    // Not show scrollbar when height is large than scrollHeight
    showScroll() {
      const {
        height,
        scrollHeight
      } = this.$props;
      return scrollHeight > height;
    }
  },
  render() {
    const {
      dragging,
      visible
    } = this.state;
    const {
      prefixCls
    } = this.$props;
    const spinHeight = this.getSpinHeight() + "px";
    const top = this.getTop() + "px";
    const canScroll = this.showScroll();
    const mergedVisible = canScroll && visible;
    return _createVNode21("div", {
      "ref": this.scrollbarRef,
      "class": classNames_default(`${prefixCls}-scrollbar`, {
        [`${prefixCls}-scrollbar-show`]: canScroll
      }),
      "style": {
        width: "8px",
        top: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: mergedVisible ? void 0 : "none"
      },
      "onMousedown": this.onContainerMouseDown,
      "onMousemove": this.delayHidden
    }, [_createVNode21("div", {
      "ref": this.thumbRef,
      "class": classNames_default(`${prefixCls}-scrollbar-thumb`, {
        [`${prefixCls}-scrollbar-thumb-moving`]: dragging
      }),
      "style": {
        width: "100%",
        height: spinHeight,
        top,
        left: 0,
        position: "absolute",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "99px",
        cursor: "pointer",
        userSelect: "none"
      },
      "onMousedown": this.onMouseDown
    }, null)]);
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/hooks/useHeights.js
import { onUnmounted as onUnmounted4, watch as watch13, ref as ref9 } from "vue";
function useHeights(mergedData, getKey2, onItemAdd, onItemRemove) {
  const instance = /* @__PURE__ */ new Map();
  const heights = /* @__PURE__ */ new Map();
  const updatedMark = ref9(Symbol("update"));
  watch13(mergedData, () => {
    updatedMark.value = Symbol("update");
  });
  let collectRaf = void 0;
  function cancelRaf() {
    wrapperRaf.cancel(collectRaf);
  }
  function collectHeight() {
    cancelRaf();
    collectRaf = wrapperRaf(() => {
      instance.forEach((element, key) => {
        if (element && element.offsetParent) {
          const {
            offsetHeight
          } = element;
          if (heights.get(key) !== offsetHeight) {
            updatedMark.value = Symbol("update");
            heights.set(key, element.offsetHeight);
          }
        }
      });
    });
  }
  function setInstance(item, ins) {
    const key = getKey2(item);
    const origin = instance.get(key);
    if (ins) {
      instance.set(key, ins.$el || ins);
      collectHeight();
    } else {
      instance.delete(key);
    }
    if (!origin !== !ins) {
      if (ins) {
        onItemAdd === null || onItemAdd === void 0 ? void 0 : onItemAdd(item);
      } else {
        onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(item);
      }
    }
  }
  onUnmounted4(() => {
    cancelRaf();
  });
  return [setInstance, collectHeight, heights, updatedMark];
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/hooks/useScrollTo.js
function useScrollTo(containerRef, mergedData, heights, props3, getKey2, collectHeight, syncScrollTop, triggerFlash) {
  let scroll;
  return (arg) => {
    if (arg === null || arg === void 0) {
      triggerFlash();
      return;
    }
    wrapperRaf.cancel(scroll);
    const data = mergedData.value;
    const itemHeight = props3.itemHeight;
    if (typeof arg === "number") {
      syncScrollTop(arg);
    } else if (arg && typeof arg === "object") {
      let index2;
      const {
        align
      } = arg;
      if ("index" in arg) {
        ({
          index: index2
        } = arg);
      } else {
        index2 = data.findIndex((item) => getKey2(item) === arg.key);
      }
      const {
        offset: offset2 = 0
      } = arg;
      const syncScroll = (times, targetAlign) => {
        if (times < 0 || !containerRef.value)
          return;
        const height = containerRef.value.clientHeight;
        let needCollectHeight = false;
        let newTargetAlign = targetAlign;
        if (height) {
          const mergedAlign = targetAlign || align;
          let stackTop = 0;
          let itemTop = 0;
          let itemBottom = 0;
          const maxLen = Math.min(data.length, index2);
          for (let i2 = 0; i2 <= maxLen; i2 += 1) {
            const key = getKey2(data[i2]);
            itemTop = stackTop;
            const cacheHeight = heights.get(key);
            itemBottom = itemTop + (cacheHeight === void 0 ? itemHeight : cacheHeight);
            stackTop = itemBottom;
            if (i2 === index2 && cacheHeight === void 0) {
              needCollectHeight = true;
            }
          }
          const scrollTop = containerRef.value.scrollTop;
          let targetTop = null;
          switch (mergedAlign) {
            case "top":
              targetTop = itemTop - offset2;
              break;
            case "bottom":
              targetTop = itemBottom - height + offset2;
              break;
            default: {
              const scrollBottom = scrollTop + height;
              if (itemTop < scrollTop) {
                newTargetAlign = "top";
              } else if (itemBottom > scrollBottom) {
                newTargetAlign = "bottom";
              }
            }
          }
          if (targetTop !== null && targetTop !== scrollTop) {
            syncScrollTop(targetTop);
          }
        }
        scroll = wrapperRaf(() => {
          if (needCollectHeight) {
            collectHeight();
          }
          syncScroll(times - 1, newTargetAlign);
        }, 2);
      };
      syncScroll(5);
    }
  };
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/utils/isFirefox.js
var isFF = typeof navigator === "object" && /Firefox/i.test(navigator.userAgent);
var isFirefox_default = isFF;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/hooks/useOriginScroll.js
var useOriginScroll_default = (isScrollAtTop, isScrollAtBottom) => {
  let lock = false;
  let lockTimeout = null;
  function lockScroll() {
    clearTimeout(lockTimeout);
    lock = true;
    lockTimeout = setTimeout(() => {
      lock = false;
    }, 50);
  }
  return function(deltaY) {
    let smoothOffset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const originScroll = (
      // Pass origin wheel when on the top
      deltaY < 0 && isScrollAtTop.value || // Pass origin wheel when on the bottom
      deltaY > 0 && isScrollAtBottom.value
    );
    if (smoothOffset && originScroll) {
      clearTimeout(lockTimeout);
      lock = false;
    } else if (!originScroll || lock) {
      lockScroll();
    }
    return !lock && originScroll;
  };
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/hooks/useFrameWheel.js
function useFrameWheel(inVirtual, isScrollAtTop, isScrollAtBottom, onWheelDelta) {
  let offsetRef = 0;
  let nextFrame = null;
  let wheelValue = null;
  let isMouseScroll = false;
  const originScroll = useOriginScroll_default(isScrollAtTop, isScrollAtBottom);
  function onWheel(event) {
    if (!inVirtual.value)
      return;
    wrapperRaf.cancel(nextFrame);
    const {
      deltaY
    } = event;
    offsetRef += deltaY;
    wheelValue = deltaY;
    if (originScroll(deltaY))
      return;
    if (!isFirefox_default) {
      event.preventDefault();
    }
    nextFrame = wrapperRaf(() => {
      const patchMultiple = isMouseScroll ? 10 : 1;
      onWheelDelta(offsetRef * patchMultiple);
      offsetRef = 0;
    });
  }
  function onFireFoxScroll(event) {
    if (!inVirtual.value)
      return;
    isMouseScroll = event.detail === wheelValue;
  }
  return [onWheel, onFireFoxScroll];
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/hooks/useMobileTouchMove.js
import { onBeforeUnmount as onBeforeUnmount6, watch as watch14, onMounted as onMounted10 } from "vue";
var SMOOTH_PTG = 14 / 15;
function useMobileTouchMove(inVirtual, listRef, callback) {
  let touched = false;
  let touchY = 0;
  let element = null;
  let interval = null;
  const cleanUpEvents = () => {
    if (element) {
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
    }
  };
  const onTouchMove = (e2) => {
    if (touched) {
      const currentY = Math.ceil(e2.touches[0].pageY);
      let offsetY = touchY - currentY;
      touchY = currentY;
      if (callback(offsetY)) {
        e2.preventDefault();
      }
      clearInterval(interval);
      interval = setInterval(() => {
        offsetY *= SMOOTH_PTG;
        if (!callback(offsetY, true) || Math.abs(offsetY) <= 0.1) {
          clearInterval(interval);
        }
      }, 16);
    }
  };
  const onTouchEnd = () => {
    touched = false;
    cleanUpEvents();
  };
  const onTouchStart = (e2) => {
    cleanUpEvents();
    if (e2.touches.length === 1 && !touched) {
      touched = true;
      touchY = Math.ceil(e2.touches[0].pageY);
      element = e2.target;
      element.addEventListener("touchmove", onTouchMove, {
        passive: false
      });
      element.addEventListener("touchend", onTouchEnd);
    }
  };
  const noop3 = () => {
  };
  onMounted10(() => {
    document.addEventListener("touchmove", noop3, {
      passive: false
    });
    watch14(inVirtual, (val) => {
      listRef.value.removeEventListener("touchstart", onTouchStart);
      cleanUpEvents();
      clearInterval(interval);
      if (val) {
        listRef.value.addEventListener("touchstart", onTouchStart, {
          passive: false
        });
      }
    }, {
      immediate: true
    });
  });
  onBeforeUnmount6(() => {
    document.removeEventListener("touchmove", noop3);
  });
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/List.js
var __rest8 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var EMPTY_DATA = [];
var ScrollStyle = {
  overflowY: "auto",
  overflowAnchor: "none"
};
function renderChildren(list, startIndex, endIndex, setNodeRef, renderFunc, _ref) {
  let {
    getKey: getKey2
  } = _ref;
  return list.slice(startIndex, endIndex + 1).map((item, index2) => {
    const eleIndex = startIndex + index2;
    const node = renderFunc(item, eleIndex, {
      // style: status === 'MEASURE_START' ? { visibility: 'hidden' } : {},
    });
    const key = getKey2(item);
    return _createVNode22(Item_default2, {
      "key": key,
      "setRef": (ele) => setNodeRef(item, ele)
    }, {
      default: () => [node]
    });
  });
}
var List = defineComponent22({
  compatConfig: {
    MODE: 3
  },
  name: "List",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    data: vue_types_default.array,
    height: Number,
    itemHeight: Number,
    /** If not match virtual scroll condition, Set List still use height of container. */
    fullHeight: {
      type: Boolean,
      default: void 0
    },
    itemKey: {
      type: [String, Number, Function],
      required: true
    },
    component: {
      type: [String, Object]
    },
    /** Set `false` will always use real scroll instead of virtual one */
    virtual: {
      type: Boolean,
      default: void 0
    },
    children: Function,
    onScroll: Function,
    onMousedown: Function,
    onMouseenter: Function,
    onVisibleChange: Function
  },
  setup(props3, _ref2) {
    let {
      expose
    } = _ref2;
    const useVirtual = computed16(() => {
      const {
        height,
        itemHeight,
        virtual
      } = props3;
      return !!(virtual !== false && height && itemHeight);
    });
    const inVirtual = computed16(() => {
      const {
        height,
        itemHeight,
        data: data2
      } = props3;
      return useVirtual.value && data2 && itemHeight * data2.length > height;
    });
    const state = reactive4({
      scrollTop: 0,
      scrollMoving: false
    });
    const data = computed16(() => {
      return props3.data || EMPTY_DATA;
    });
    const mergedData = shallowRef14([]);
    watch15(data, () => {
      mergedData.value = toRaw(data.value).slice();
    }, {
      immediate: true
    });
    const itemKey = shallowRef14((_item) => void 0);
    watch15(() => props3.itemKey, (val) => {
      if (typeof val === "function") {
        itemKey.value = val;
      } else {
        itemKey.value = (item) => item === null || item === void 0 ? void 0 : item[val];
      }
    }, {
      immediate: true
    });
    const componentRef = shallowRef14();
    const fillerInnerRef = shallowRef14();
    const scrollBarRef = shallowRef14();
    const getKey2 = (item) => {
      return itemKey.value(item);
    };
    const sharedConfig = {
      getKey: getKey2
    };
    function syncScrollTop(newTop) {
      let value;
      if (typeof newTop === "function") {
        value = newTop(state.scrollTop);
      } else {
        value = newTop;
      }
      const alignedTop = keepInRange(value);
      if (componentRef.value) {
        componentRef.value.scrollTop = alignedTop;
      }
      state.scrollTop = alignedTop;
    }
    const [setInstance, collectHeight, heights, updatedMark] = useHeights(mergedData, getKey2, null, null);
    const calRes = reactive4({
      scrollHeight: void 0,
      start: 0,
      end: 0,
      offset: void 0
    });
    const offsetHeight = shallowRef14(0);
    onMounted11(() => {
      nextTick6(() => {
        var _a;
        offsetHeight.value = ((_a = fillerInnerRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
      });
    });
    onUpdated5(() => {
      nextTick6(() => {
        var _a;
        offsetHeight.value = ((_a = fillerInnerRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
      });
    });
    watch15([useVirtual, mergedData], () => {
      if (!useVirtual.value) {
        _extends(calRes, {
          scrollHeight: void 0,
          start: 0,
          end: mergedData.value.length - 1,
          offset: void 0
        });
      }
    }, {
      immediate: true
    });
    watch15([useVirtual, mergedData, offsetHeight, inVirtual], () => {
      if (useVirtual.value && !inVirtual.value) {
        _extends(calRes, {
          scrollHeight: offsetHeight.value,
          start: 0,
          end: mergedData.value.length - 1,
          offset: void 0
        });
      }
      if (componentRef.value) {
        state.scrollTop = componentRef.value.scrollTop;
      }
    }, {
      immediate: true
    });
    watch15([inVirtual, useVirtual, () => state.scrollTop, mergedData, updatedMark, () => props3.height, offsetHeight], () => {
      if (!useVirtual.value || !inVirtual.value) {
        return;
      }
      let itemTop = 0;
      let startIndex;
      let startOffset;
      let endIndex;
      const dataLen = mergedData.value.length;
      const data2 = mergedData.value;
      const scrollTop = state.scrollTop;
      const {
        itemHeight,
        height
      } = props3;
      const scrollTopHeight = scrollTop + height;
      for (let i2 = 0; i2 < dataLen; i2 += 1) {
        const item = data2[i2];
        const key = getKey2(item);
        let cacheHeight = heights.get(key);
        if (cacheHeight === void 0) {
          cacheHeight = itemHeight;
        }
        const currentItemBottom = itemTop + cacheHeight;
        if (startIndex === void 0 && currentItemBottom >= scrollTop) {
          startIndex = i2;
          startOffset = itemTop;
        }
        if (endIndex === void 0 && currentItemBottom > scrollTopHeight) {
          endIndex = i2;
        }
        itemTop = currentItemBottom;
      }
      if (startIndex === void 0) {
        startIndex = 0;
        startOffset = 0;
        endIndex = Math.ceil(height / itemHeight);
      }
      if (endIndex === void 0) {
        endIndex = dataLen - 1;
      }
      endIndex = Math.min(endIndex + 1, dataLen);
      _extends(calRes, {
        scrollHeight: itemTop,
        start: startIndex,
        end: endIndex,
        offset: startOffset
      });
    }, {
      immediate: true
    });
    const maxScrollHeight = computed16(() => calRes.scrollHeight - props3.height);
    function keepInRange(newScrollTop) {
      let newTop = newScrollTop;
      if (!Number.isNaN(maxScrollHeight.value)) {
        newTop = Math.min(newTop, maxScrollHeight.value);
      }
      newTop = Math.max(newTop, 0);
      return newTop;
    }
    const isScrollAtTop = computed16(() => state.scrollTop <= 0);
    const isScrollAtBottom = computed16(() => state.scrollTop >= maxScrollHeight.value);
    const originScroll = useOriginScroll_default(isScrollAtTop, isScrollAtBottom);
    function onScrollBar(newScrollTop) {
      const newTop = newScrollTop;
      syncScrollTop(newTop);
    }
    function onFallbackScroll(e2) {
      var _a;
      const {
        scrollTop: newScrollTop
      } = e2.currentTarget;
      if (newScrollTop !== state.scrollTop) {
        syncScrollTop(newScrollTop);
      }
      (_a = props3.onScroll) === null || _a === void 0 ? void 0 : _a.call(props3, e2);
    }
    const [onRawWheel, onFireFoxScroll] = useFrameWheel(useVirtual, isScrollAtTop, isScrollAtBottom, (offsetY) => {
      syncScrollTop((top) => {
        const newTop = top + offsetY;
        return newTop;
      });
    });
    useMobileTouchMove(useVirtual, componentRef, (deltaY, smoothOffset) => {
      if (originScroll(deltaY, smoothOffset)) {
        return false;
      }
      onRawWheel({
        preventDefault() {
        },
        deltaY
      });
      return true;
    });
    function onMozMousePixelScroll(e2) {
      if (useVirtual.value) {
        e2.preventDefault();
      }
    }
    const removeEventListener = () => {
      if (componentRef.value) {
        componentRef.value.removeEventListener("wheel", onRawWheel, supportsPassive_default ? {
          passive: false
        } : false);
        componentRef.value.removeEventListener("DOMMouseScroll", onFireFoxScroll);
        componentRef.value.removeEventListener("MozMousePixelScroll", onMozMousePixelScroll);
      }
    };
    watchEffect4(() => {
      nextTick6(() => {
        if (componentRef.value) {
          removeEventListener();
          componentRef.value.addEventListener("wheel", onRawWheel, supportsPassive_default ? {
            passive: false
          } : false);
          componentRef.value.addEventListener("DOMMouseScroll", onFireFoxScroll);
          componentRef.value.addEventListener("MozMousePixelScroll", onMozMousePixelScroll);
        }
      });
    });
    onBeforeUnmount7(() => {
      removeEventListener();
    });
    const scrollTo = useScrollTo(componentRef, mergedData, heights, props3, getKey2, collectHeight, syncScrollTop, () => {
      var _a;
      (_a = scrollBarRef.value) === null || _a === void 0 ? void 0 : _a.delayHidden();
    });
    expose({
      scrollTo
    });
    const componentStyle = computed16(() => {
      let cs = null;
      if (props3.height) {
        cs = _extends({
          [props3.fullHeight ? "height" : "maxHeight"]: props3.height + "px"
        }, ScrollStyle);
        if (useVirtual.value) {
          cs.overflowY = "hidden";
          if (state.scrollMoving) {
            cs.pointerEvents = "none";
          }
        }
      }
      return cs;
    });
    watch15([() => calRes.start, () => calRes.end, mergedData], () => {
      if (props3.onVisibleChange) {
        const renderList = mergedData.value.slice(calRes.start, calRes.end + 1);
        props3.onVisibleChange(renderList, mergedData.value);
      }
    }, {
      flush: "post"
    });
    const delayHideScrollBar = () => {
      var _a;
      (_a = scrollBarRef.value) === null || _a === void 0 ? void 0 : _a.delayHidden();
    };
    return {
      state,
      mergedData,
      componentStyle,
      onFallbackScroll,
      onScrollBar,
      componentRef,
      useVirtual,
      calRes,
      collectHeight,
      setInstance,
      sharedConfig,
      scrollBarRef,
      fillerInnerRef,
      delayHideScrollBar
    };
  },
  render() {
    const _a = _extends(_extends({}, this.$props), this.$attrs), {
      prefixCls = "rc-virtual-list",
      height,
      itemHeight,
      // eslint-disable-next-line no-unused-vars
      fullHeight,
      data,
      itemKey,
      virtual,
      component: Component = "div",
      onScroll,
      children = this.$slots.default,
      style,
      class: className
    } = _a, restProps = __rest8(_a, ["prefixCls", "height", "itemHeight", "fullHeight", "data", "itemKey", "virtual", "component", "onScroll", "children", "style", "class"]);
    const mergedClassName = classNames_default(prefixCls, className);
    const {
      scrollTop
    } = this.state;
    const {
      scrollHeight,
      offset: offset2,
      start,
      end
    } = this.calRes;
    const {
      componentStyle,
      onFallbackScroll,
      onScrollBar,
      useVirtual,
      collectHeight,
      sharedConfig,
      setInstance,
      mergedData,
      delayHideScrollBar
    } = this;
    return _createVNode22("div", _objectSpread2({
      "style": _extends(_extends({}, style), {
        position: "relative"
      }),
      "class": mergedClassName
    }, restProps), [_createVNode22(Component, {
      "class": `${prefixCls}-holder`,
      "style": componentStyle,
      "ref": "componentRef",
      "onScroll": onFallbackScroll,
      "onMouseenter": delayHideScrollBar
    }, {
      default: () => [_createVNode22(Filler_default, {
        "prefixCls": prefixCls,
        "height": scrollHeight,
        "offset": offset2,
        "onInnerResize": collectHeight,
        "ref": "fillerInnerRef"
      }, {
        default: () => renderChildren(mergedData, start, end, setInstance, children, sharedConfig)
      })]
    }), useVirtual && _createVNode22(ScrollBar_default, {
      "ref": "scrollBarRef",
      "prefixCls": prefixCls,
      "scrollTop": scrollTop,
      "height": height,
      "scrollHeight": scrollHeight,
      "count": mergedData.length,
      "onScroll": onScrollBar,
      "onStartMove": () => {
        this.state.scrollMoving = true;
      },
      "onStopMove": () => {
        this.state.scrollMoving = false;
      }
    }, null)]);
  }
});
var List_default = List;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-virtual-list/index.js
var vc_virtual_list_default = List_default;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/hooks/useMemo.js
import { ref as ref10, watch as watch16 } from "vue";
function useMemo(getValue2, condition, shouldUpdate) {
  const cacheRef = ref10(getValue2());
  watch16(condition, (next, pre) => {
    if (shouldUpdate) {
      if (shouldUpdate(next, pre)) {
        cacheRef.value = getValue2();
      }
    } else {
      cacheRef.value = getValue2();
    }
  });
  return cacheRef;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/utils/platformUtil.js
function isPlatformMac() {
  return /(mac\sos|macintosh)/i.test(navigator.appVersion);
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/omit.js
function omit(obj, fields) {
  const shallowCopy = _extends({}, obj);
  for (let i2 = 0; i2 < fields.length; i2 += 1) {
    const key = fields[i2];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
var omit_default = omit;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/SelectContext.js
import { inject as inject7, provide as provide7 } from "vue";
var SelectContextKey = Symbol("SelectContextKey");
function useProvideSelectProps(props3) {
  return provide7(SelectContextKey, props3);
}
function useSelectProps() {
  return inject7(SelectContextKey, {});
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/OptionList.js
var __rest9 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
function isTitleType(content) {
  return typeof content === "string" || typeof content === "number";
}
var OptionList = defineComponent23({
  compatConfig: {
    MODE: 3
  },
  name: "OptionList",
  inheritAttrs: false,
  setup(_2, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const baseProps = useBaseProps();
    const props3 = useSelectProps();
    const itemPrefixCls = computed17(() => `${baseProps.prefixCls}-item`);
    const memoFlattenOptions = useMemo(() => props3.flattenOptions, [() => baseProps.open, () => props3.flattenOptions], (next) => next[0]);
    const listRef = createRef_default();
    const onListMouseDown = (event) => {
      event.preventDefault();
    };
    const scrollIntoView = (args) => {
      if (listRef.current) {
        listRef.current.scrollTo(typeof args === "number" ? {
          index: args
        } : args);
      }
    };
    const getEnabledActiveIndex = function(index2) {
      let offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      const len = memoFlattenOptions.value.length;
      for (let i2 = 0; i2 < len; i2 += 1) {
        const current = (index2 + i2 * offset2 + len) % len;
        const {
          group,
          data
        } = memoFlattenOptions.value[current];
        if (!group && !data.disabled) {
          return current;
        }
      }
      return -1;
    };
    const state = reactive5({
      activeIndex: getEnabledActiveIndex(0)
    });
    const setActive = function(index2) {
      let fromKeyboard = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      state.activeIndex = index2;
      const info = {
        source: fromKeyboard ? "keyboard" : "mouse"
      };
      const flattenItem = memoFlattenOptions.value[index2];
      if (!flattenItem) {
        props3.onActiveValue(null, -1, info);
        return;
      }
      props3.onActiveValue(flattenItem.value, index2, info);
    };
    watch17([() => memoFlattenOptions.value.length, () => baseProps.searchValue], () => {
      setActive(props3.defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
    }, {
      immediate: true
    });
    const isSelected = (value) => props3.rawValues.has(value) && baseProps.mode !== "combobox";
    watch17([() => baseProps.open, () => baseProps.searchValue], () => {
      if (!baseProps.multiple && baseProps.open && props3.rawValues.size === 1) {
        const value = Array.from(props3.rawValues)[0];
        const index2 = toRaw2(memoFlattenOptions.value).findIndex((_ref2) => {
          let {
            data
          } = _ref2;
          return data[props3.fieldNames.value] === value;
        });
        if (index2 !== -1) {
          setActive(index2);
          nextTick7(() => {
            scrollIntoView(index2);
          });
        }
      }
      if (baseProps.open) {
        nextTick7(() => {
          var _a;
          (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo(void 0);
        });
      }
    }, {
      immediate: true,
      flush: "post"
    });
    const onSelectValue = (value) => {
      if (value !== void 0) {
        props3.onSelect(value, {
          selected: !props3.rawValues.has(value)
        });
      }
      if (!baseProps.multiple) {
        baseProps.toggleOpen(false);
      }
    };
    const getLabel = (item) => typeof item.label === "function" ? item.label() : item.label;
    function renderItem(index2) {
      const item = memoFlattenOptions.value[index2];
      if (!item)
        return null;
      const itemData = item.data || {};
      const {
        value
      } = itemData;
      const {
        group
      } = item;
      const attrs = pickAttrs(itemData, true);
      const mergedLabel = getLabel(item);
      return item ? _createVNode23("div", _objectSpread2(_objectSpread2({
        "aria-label": typeof mergedLabel === "string" && !group ? mergedLabel : null
      }, attrs), {}, {
        "key": index2,
        "role": group ? "presentation" : "option",
        "id": `${baseProps.id}_list_${index2}`,
        "aria-selected": isSelected(value)
      }), [value]) : null;
    }
    const onKeydown = (event) => {
      const {
        which,
        ctrlKey
      } = event;
      switch (which) {
        case KeyCode_default.N:
        case KeyCode_default.P:
        case KeyCode_default.UP:
        case KeyCode_default.DOWN: {
          let offset2 = 0;
          if (which === KeyCode_default.UP) {
            offset2 = -1;
          } else if (which === KeyCode_default.DOWN) {
            offset2 = 1;
          } else if (isPlatformMac() && ctrlKey) {
            if (which === KeyCode_default.N) {
              offset2 = 1;
            } else if (which === KeyCode_default.P) {
              offset2 = -1;
            }
          }
          if (offset2 !== 0) {
            const nextActiveIndex = getEnabledActiveIndex(state.activeIndex + offset2, offset2);
            scrollIntoView(nextActiveIndex);
            setActive(nextActiveIndex, true);
          }
          break;
        }
        case KeyCode_default.ENTER: {
          const item = memoFlattenOptions.value[state.activeIndex];
          if (item && !item.data.disabled) {
            onSelectValue(item.value);
          } else {
            onSelectValue(void 0);
          }
          if (baseProps.open) {
            event.preventDefault();
          }
          break;
        }
        case KeyCode_default.ESC: {
          baseProps.toggleOpen(false);
          if (baseProps.open) {
            event.stopPropagation();
          }
        }
      }
    };
    const onKeyup = () => {
    };
    const scrollTo = (index2) => {
      scrollIntoView(index2);
    };
    expose({
      onKeydown,
      onKeyup,
      scrollTo
    });
    return () => {
      const {
        id,
        notFoundContent,
        onPopupScroll
      } = baseProps;
      const {
        menuItemSelectedIcon,
        fieldNames,
        virtual,
        listHeight,
        listItemHeight
      } = props3;
      const renderOption = slots.option;
      const {
        activeIndex
      } = state;
      const omitFieldNameList = Object.keys(fieldNames).map((key) => fieldNames[key]);
      if (memoFlattenOptions.value.length === 0) {
        return _createVNode23("div", {
          "role": "listbox",
          "id": `${id}_list`,
          "class": `${itemPrefixCls.value}-empty`,
          "onMousedown": onListMouseDown
        }, [notFoundContent]);
      }
      return _createVNode23(_Fragment4, null, [_createVNode23("div", {
        "role": "listbox",
        "id": `${id}_list`,
        "style": {
          height: 0,
          width: 0,
          overflow: "hidden"
        }
      }, [renderItem(activeIndex - 1), renderItem(activeIndex), renderItem(activeIndex + 1)]), _createVNode23(vc_virtual_list_default, {
        "itemKey": "key",
        "ref": listRef,
        "data": memoFlattenOptions.value,
        "height": listHeight,
        "itemHeight": listItemHeight,
        "fullHeight": false,
        "onMousedown": onListMouseDown,
        "onScroll": onPopupScroll,
        "virtual": virtual
      }, {
        default: (item, itemIndex) => {
          var _a;
          const {
            group,
            groupOption,
            data,
            value
          } = item;
          const {
            key
          } = data;
          const label = typeof item.label === "function" ? item.label() : item.label;
          if (group) {
            const groupTitle = (_a = data.title) !== null && _a !== void 0 ? _a : isTitleType(label) && label;
            return _createVNode23("div", {
              "class": classNames_default(itemPrefixCls.value, `${itemPrefixCls.value}-group`),
              "title": groupTitle
            }, [renderOption ? renderOption(data) : label !== void 0 ? label : key]);
          }
          const {
            disabled,
            title,
            children,
            style,
            class: cls,
            className
          } = data, otherProps = __rest9(data, ["disabled", "title", "children", "style", "class", "className"]);
          const passedProps = omit_default(otherProps, omitFieldNameList);
          const selected = isSelected(value);
          const optionPrefixCls = `${itemPrefixCls.value}-option`;
          const optionClassName = classNames_default(itemPrefixCls.value, optionPrefixCls, cls, className, {
            [`${optionPrefixCls}-grouped`]: groupOption,
            [`${optionPrefixCls}-active`]: activeIndex === itemIndex && !disabled,
            [`${optionPrefixCls}-disabled`]: disabled,
            [`${optionPrefixCls}-selected`]: selected
          });
          const mergedLabel = getLabel(item);
          const iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === "function" || selected;
          const content = typeof mergedLabel === "number" ? mergedLabel : mergedLabel || value;
          let optionTitle = isTitleType(content) ? content.toString() : void 0;
          if (title !== void 0) {
            optionTitle = title;
          }
          return _createVNode23("div", _objectSpread2(_objectSpread2({}, passedProps), {}, {
            "aria-selected": selected,
            "class": optionClassName,
            "title": optionTitle,
            "onMousemove": (e2) => {
              if (otherProps.onMousemove) {
                otherProps.onMousemove(e2);
              }
              if (activeIndex === itemIndex || disabled) {
                return;
              }
              setActive(itemIndex);
            },
            "onClick": (e2) => {
              if (!disabled) {
                onSelectValue(value);
              }
              if (otherProps.onClick) {
                otherProps.onClick(e2);
              }
            },
            "style": style
          }), [_createVNode23("div", {
            "class": `${optionPrefixCls}-content`
          }, [renderOption ? renderOption(data) : content]), isValidElement(menuItemSelectedIcon) || selected, iconVisible && _createVNode23(TransBtn_default, {
            "class": `${itemPrefixCls.value}-option-state`,
            "customizeIcon": menuItemSelectedIcon,
            "customizeIconProps": {
              isSelected: selected
            }
          }, {
            default: () => [selected ? "✓" : null]
          })]);
        }
      })]);
    };
  }
});
var OptionList_default = OptionList;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useOptions.js
import { toRaw as toRaw3, shallowRef as shallowRef15, watchEffect as watchEffect5, watch as watch18 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/utils/legacyUtil.js
var __rest10 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
function convertNodeToOption(node) {
  const _a = node, {
    key,
    children
  } = _a, _b = _a.props, {
    value,
    disabled
  } = _b, restProps = __rest10(_b, ["value", "disabled"]);
  const child = children === null || children === void 0 ? void 0 : children.default;
  return _extends({
    key,
    value: value !== void 0 ? value : key,
    children: child,
    disabled: disabled || disabled === ""
  }, restProps);
}
function convertChildrenToData(nodes) {
  let optionOnly = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const dd = flattenChildren(nodes).map((node, index2) => {
    var _a;
    if (!isValidElement(node) || !node.type) {
      return null;
    }
    const {
      type: {
        isSelectOptGroup
      },
      key,
      children,
      props: props3
    } = node;
    if (optionOnly || !isSelectOptGroup) {
      return convertNodeToOption(node);
    }
    const child = children && children.default ? children.default() : void 0;
    const label = (props3 === null || props3 === void 0 ? void 0 : props3.label) || ((_a = children.label) === null || _a === void 0 ? void 0 : _a.call(children)) || key;
    return _extends(_extends({
      key: `__RC_SELECT_GRP__${key === null ? index2 : String(key)}__`
    }, props3), {
      label,
      options: convertChildrenToData(child || [])
    });
  }).filter((data) => data);
  return dd;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useOptions.js
function useOptions(options, children, fieldNames) {
  const mergedOptions = shallowRef15();
  const valueOptions = shallowRef15();
  const labelOptions = shallowRef15();
  const tempMergedOptions = shallowRef15([]);
  watch18([options, children], () => {
    if (options.value) {
      tempMergedOptions.value = toRaw3(options.value).slice();
    } else {
      tempMergedOptions.value = convertChildrenToData(children.value);
    }
  }, {
    immediate: true,
    deep: true
  });
  watchEffect5(() => {
    const newOptions = tempMergedOptions.value;
    const newValueOptions = /* @__PURE__ */ new Map();
    const newLabelOptions = /* @__PURE__ */ new Map();
    const fieldNamesValue = fieldNames.value;
    function dig(optionList) {
      let isChildren = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      for (let i2 = 0; i2 < optionList.length; i2 += 1) {
        const option = optionList[i2];
        if (!option[fieldNamesValue.options] || isChildren) {
          newValueOptions.set(option[fieldNamesValue.value], option);
          newLabelOptions.set(option[fieldNamesValue.label], option);
        } else {
          dig(option[fieldNamesValue.options], true);
        }
      }
    }
    dig(newOptions);
    mergedOptions.value = newOptions;
    valueOptions.value = newValueOptions;
    labelOptions.value = newLabelOptions;
  });
  return {
    options: mergedOptions,
    valueOptions,
    labelOptions
  };
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useId.js
import { ref as ref11 } from "vue";
var uuid2 = 0;
var isBrowserClient = canUseDom_default();
function getUUID() {
  let retId;
  if (isBrowserClient) {
    retId = uuid2;
    uuid2 += 1;
  } else {
    retId = "TEST_OR_SSR";
  }
  return retId;
}
function useId() {
  let id = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ref11("");
  const innerId = `rc_select_${getUUID()}`;
  return id.value || innerId;
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/utils/commonUtil.js
function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return value !== void 0 ? [value] : [];
}
var isClient = typeof window !== "undefined" && window.document && window.document.documentElement;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/utils/warningPropsUtil.js
function warningProps(props3) {
  const {
    mode,
    options,
    children,
    backfill,
    allowClear,
    placeholder,
    getInputElement,
    showSearch,
    onSearch,
    defaultOpen,
    autofocus,
    labelInValue,
    value,
    inputValue,
    optionLabelProp
  } = props3;
  const multiple = isMultiple(mode);
  const mergedShowSearch = showSearch !== void 0 ? showSearch : multiple || mode === "combobox";
  const mergedOptions = options || convertChildrenToData(children);
  warning_default(mode !== "tags" || mergedOptions.every((opt) => !opt.disabled), "Please avoid setting option to disabled in tags mode since user can always type text as tag.");
  warning_default(mode !== "combobox" || !optionLabelProp, "`combobox` mode not support `optionLabelProp`. Please set `value` on Option directly.");
  warning_default(mode === "combobox" || !backfill, "`backfill` only works with `combobox` mode.");
  warning_default(mode === "combobox" || !getInputElement, "`getInputElement` only work with `combobox` mode.");
  noteOnce(mode !== "combobox" || !getInputElement || !allowClear || !placeholder, "Customize `getInputElement` should customize clear and placeholder logic instead of configuring `allowClear` and `placeholder`.");
  if (onSearch && !mergedShowSearch && mode !== "combobox" && mode !== "tags") {
    warning_default(false, "`onSearch` should work with `showSearch` instead of use alone.");
  }
  noteOnce(!defaultOpen || autofocus, "`defaultOpen` makes Select open without focus which means it will not close by click outside. You can set `autofocus` if needed.");
  if (value !== void 0 && value !== null) {
    const values = toArray(value);
    warning_default(!labelInValue || values.every((val) => typeof val === "object" && ("key" in val || "value" in val)), "`value` should in shape of `{ value: string | number, label?: any }` when you set `labelInValue` to `true`");
    warning_default(!multiple || Array.isArray(value), "`value` should be array when `mode` is `multiple` or `tags`");
  }
  if (children) {
    let invalidateChildType = null;
    children.some((node) => {
      var _a;
      if (!isValidElement(node) || !node.type) {
        return false;
      }
      const {
        type
      } = node;
      if (type.isSelectOption) {
        return false;
      }
      if (type.isSelectOptGroup) {
        const childs = ((_a = node.children) === null || _a === void 0 ? void 0 : _a.default()) || [];
        const allChildrenValid = childs.every((subNode) => {
          if (!isValidElement(subNode) || !node.type || subNode.type.isSelectOption) {
            return true;
          }
          invalidateChildType = subNode.type;
          return false;
        });
        if (allChildrenValid) {
          return false;
        }
        return true;
      }
      invalidateChildType = type;
      return true;
    });
    if (invalidateChildType) {
      warning_default(false, `\`children\` should be \`Select.Option\` or \`Select.OptGroup\` instead of \`${invalidateChildType.displayName || invalidateChildType.name || invalidateChildType}\`.`);
    }
    warning_default(inputValue === void 0, "`inputValue` is deprecated, please use `searchValue` instead.");
  }
}
var warningPropsUtil_default = warningProps;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useFilterOptions.js
import { computed as computed18 } from "vue";
function includes(test, search) {
  return toArray(test).join("").toUpperCase().includes(search);
}
var useFilterOptions_default = (options, fieldNames, searchValue, filterOption, optionFilterProp) => computed18(() => {
  const searchValueVal = searchValue.value;
  const optionFilterPropValue = optionFilterProp === null || optionFilterProp === void 0 ? void 0 : optionFilterProp.value;
  const filterOptionValue = filterOption === null || filterOption === void 0 ? void 0 : filterOption.value;
  if (!searchValueVal || filterOptionValue === false) {
    return options.value;
  }
  const {
    options: fieldOptions,
    label: fieldLabel,
    value: fieldValue
  } = fieldNames.value;
  const filteredOptions = [];
  const customizeFilter = typeof filterOptionValue === "function";
  const upperSearch = searchValueVal.toUpperCase();
  const filterFunc = customizeFilter ? filterOptionValue : (_2, option) => {
    if (optionFilterPropValue) {
      return includes(option[optionFilterPropValue], upperSearch);
    }
    if (option[fieldOptions]) {
      return includes(option[fieldLabel !== "children" ? fieldLabel : "label"], upperSearch);
    }
    return includes(option[fieldValue], upperSearch);
  };
  const wrapOption = customizeFilter ? (opt) => injectPropsWithOption(opt) : (opt) => opt;
  options.value.forEach((item) => {
    if (item[fieldOptions]) {
      const matchGroup = filterFunc(searchValueVal, wrapOption(item));
      if (matchGroup) {
        filteredOptions.push(item);
      } else {
        const subOptions = item[fieldOptions].filter((subItem) => filterFunc(searchValueVal, wrapOption(subItem)));
        if (subOptions.length) {
          filteredOptions.push(_extends(_extends({}, item), {
            [fieldOptions]: subOptions
          }));
        }
      }
      return;
    }
    if (filterFunc(searchValueVal, wrapOption(item))) {
      filteredOptions.push(item);
    }
  });
  return filteredOptions;
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/hooks/useCache.js
import { shallowRef as shallowRef16, computed as computed19 } from "vue";
var useCache_default = (labeledValues, valueOptions) => {
  const cacheRef = shallowRef16({
    values: /* @__PURE__ */ new Map(),
    options: /* @__PURE__ */ new Map()
  });
  const filledLabeledValues = computed19(() => {
    const {
      values: prevValueCache,
      options: prevOptionCache
    } = cacheRef.value;
    const patchedValues = labeledValues.value.map((item) => {
      var _a;
      if (item.label === void 0) {
        return _extends(_extends({}, item), {
          label: (_a = prevValueCache.get(item.value)) === null || _a === void 0 ? void 0 : _a.label
        });
      }
      return item;
    });
    const valueCache = /* @__PURE__ */ new Map();
    const optionCache = /* @__PURE__ */ new Map();
    patchedValues.forEach((item) => {
      valueCache.set(item.value, item);
      optionCache.set(item.value, valueOptions.value.get(item.value) || prevOptionCache.get(item.value));
    });
    cacheRef.value.values = valueCache;
    cacheRef.value.options = optionCache;
    return patchedValues;
  });
  const getOption = (val) => valueOptions.value.get(val) || cacheRef.value.options.get(val);
  return [filledLabeledValues, getOption];
};

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Select.js
import { computed as computed20, defineComponent as defineComponent24, ref as ref14, shallowRef as shallowRef17, toRef as toRef2, watchEffect as watchEffect7 } from "vue";

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/hooks/useMergedState.js
import { toRaw as toRaw4, watchEffect as watchEffect6, unref, watch as watch19, ref as ref12 } from "vue";
function useMergedState(defaultStateValue, option) {
  const {
    defaultValue,
    value = ref12()
  } = option || {};
  let initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  if (value.value !== void 0) {
    initValue = unref(value);
  }
  if (defaultValue !== void 0) {
    initValue = typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }
  const innerValue = ref12(initValue);
  const mergedValue = ref12(initValue);
  watchEffect6(() => {
    let val = value.value !== void 0 ? value.value : innerValue.value;
    if (option.postState) {
      val = option.postState(val);
    }
    mergedValue.value = val;
  });
  function triggerChange(newValue) {
    const preVal = mergedValue.value;
    innerValue.value = newValue;
    if (toRaw4(mergedValue.value) !== newValue && option.onChange) {
      option.onChange(newValue, preVal);
    }
  }
  watch19(value, () => {
    innerValue.value = value.value;
  });
  return [mergedValue, triggerChange];
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/_util/hooks/useState.js
import { ref as ref13 } from "vue";
function useState(defaultStateValue) {
  const initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  const innerValue = ref13(initValue);
  function triggerChange(newValue) {
    innerValue.value = newValue;
  }
  return [innerValue, triggerChange];
}

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Select.js
var OMIT_DOM_PROPS = ["inputValue"];
function selectProps() {
  return _extends(_extends({}, baseSelectPropsWithoutPrivate()), {
    prefixCls: String,
    id: String,
    backfill: {
      type: Boolean,
      default: void 0
    },
    // >>> Field Names
    fieldNames: Object,
    // >>> Search
    /** @deprecated Use `searchValue` instead */
    inputValue: String,
    searchValue: String,
    onSearch: Function,
    autoClearSearchValue: {
      type: Boolean,
      default: void 0
    },
    // >>> Select
    onSelect: Function,
    onDeselect: Function,
    // >>> Options
    /**
     * In Select, `false` means do nothing.
     * In TreeSelect, `false` will highlight match item.
     * It's by design.
     */
    filterOption: {
      type: [Boolean, Function],
      default: void 0
    },
    filterSort: Function,
    optionFilterProp: String,
    optionLabelProp: String,
    options: Array,
    defaultActiveFirstOption: {
      type: Boolean,
      default: void 0
    },
    virtual: {
      type: Boolean,
      default: void 0
    },
    listHeight: Number,
    listItemHeight: Number,
    // >>> Icon
    menuItemSelectedIcon: vue_types_default.any,
    mode: String,
    labelInValue: {
      type: Boolean,
      default: void 0
    },
    value: vue_types_default.any,
    defaultValue: vue_types_default.any,
    onChange: Function,
    children: Array
  });
}
function isRawValue(value) {
  return !value || typeof value !== "object";
}
var Select_default = defineComponent24({
  compatConfig: {
    MODE: 3
  },
  name: "VcSelect",
  inheritAttrs: false,
  props: initDefaultProps_default(selectProps(), {
    prefixCls: "vc-select",
    autoClearSearchValue: true,
    listHeight: 200,
    listItemHeight: 20,
    dropdownMatchSelectWidth: true
  }),
  setup(props3, _ref) {
    let {
      expose,
      attrs,
      slots
    } = _ref;
    const mergedId = useId(toRef2(props3, "id"));
    const multiple = computed20(() => isMultiple(props3.mode));
    const childrenAsData = computed20(() => !!(!props3.options && props3.children));
    const mergedFilterOption = computed20(() => {
      if (props3.filterOption === void 0 && props3.mode === "combobox") {
        return false;
      }
      return props3.filterOption;
    });
    const mergedFieldNames = computed20(() => fillFieldNames(props3.fieldNames, childrenAsData.value));
    const [mergedSearchValue, setSearchValue] = useMergedState("", {
      value: computed20(() => props3.searchValue !== void 0 ? props3.searchValue : props3.inputValue),
      postState: (search) => search || ""
    });
    const parsedOptions = useOptions(toRef2(props3, "options"), toRef2(props3, "children"), mergedFieldNames);
    const {
      valueOptions,
      labelOptions,
      options: mergedOptions
    } = parsedOptions;
    const convert2LabelValues = (draftValues) => {
      const valueList = toArray(draftValues);
      return valueList.map((val) => {
        var _a, _b;
        let rawValue;
        let rawLabel;
        let rawKey;
        let rawDisabled;
        if (isRawValue(val)) {
          rawValue = val;
        } else {
          rawKey = val.key;
          rawLabel = val.label;
          rawValue = (_a = val.value) !== null && _a !== void 0 ? _a : rawKey;
        }
        const option = valueOptions.value.get(rawValue);
        if (option) {
          if (rawLabel === void 0)
            rawLabel = option === null || option === void 0 ? void 0 : option[props3.optionLabelProp || mergedFieldNames.value.label];
          if (rawKey === void 0)
            rawKey = (_b = option === null || option === void 0 ? void 0 : option.key) !== null && _b !== void 0 ? _b : rawValue;
          rawDisabled = option === null || option === void 0 ? void 0 : option.disabled;
        }
        return {
          label: rawLabel,
          value: rawValue,
          key: rawKey,
          disabled: rawDisabled,
          option
        };
      });
    };
    const [internalValue, setInternalValue] = useMergedState(props3.defaultValue, {
      value: toRef2(props3, "value")
    });
    const rawLabeledValues = computed20(() => {
      var _a;
      const values = convert2LabelValues(internalValue.value);
      if (props3.mode === "combobox" && !((_a = values[0]) === null || _a === void 0 ? void 0 : _a.value)) {
        return [];
      }
      return values;
    });
    const [mergedValues, getMixedOption] = useCache_default(rawLabeledValues, valueOptions);
    const displayValues = computed20(() => {
      if (!props3.mode && mergedValues.value.length === 1) {
        const firstValue = mergedValues.value[0];
        if (firstValue.value === null && (firstValue.label === null || firstValue.label === void 0)) {
          return [];
        }
      }
      return mergedValues.value.map((item) => {
        var _a;
        return _extends(_extends({}, item), {
          label: (_a = typeof item.label === "function" ? item.label() : item.label) !== null && _a !== void 0 ? _a : item.value
        });
      });
    });
    const rawValues = computed20(() => new Set(mergedValues.value.map((val) => val.value)));
    watchEffect7(() => {
      var _a;
      if (props3.mode === "combobox") {
        const strValue = (_a = mergedValues.value[0]) === null || _a === void 0 ? void 0 : _a.value;
        if (strValue !== void 0 && strValue !== null) {
          setSearchValue(String(strValue));
        }
      }
    }, {
      flush: "post"
    });
    const createTagOption = (val, label) => {
      const mergedLabel = label !== null && label !== void 0 ? label : val;
      return {
        [mergedFieldNames.value.value]: val,
        [mergedFieldNames.value.label]: mergedLabel
      };
    };
    const filledTagOptions = shallowRef17();
    watchEffect7(() => {
      if (props3.mode !== "tags") {
        filledTagOptions.value = mergedOptions.value;
        return;
      }
      const cloneOptions = mergedOptions.value.slice();
      const existOptions = (val) => valueOptions.value.has(val);
      [...mergedValues.value].sort((a2, b2) => a2.value < b2.value ? -1 : 1).forEach((item) => {
        const val = item.value;
        if (!existOptions(val)) {
          cloneOptions.push(createTagOption(val, item.label));
        }
      });
      filledTagOptions.value = cloneOptions;
    });
    const filteredOptions = useFilterOptions_default(filledTagOptions, mergedFieldNames, mergedSearchValue, mergedFilterOption, toRef2(props3, "optionFilterProp"));
    const filledSearchOptions = computed20(() => {
      if (props3.mode !== "tags" || !mergedSearchValue.value || filteredOptions.value.some((item) => item[props3.optionFilterProp || "value"] === mergedSearchValue.value)) {
        return filteredOptions.value;
      }
      return [createTagOption(mergedSearchValue.value), ...filteredOptions.value];
    });
    const orderedFilteredOptions = computed20(() => {
      if (!props3.filterSort) {
        return filledSearchOptions.value;
      }
      return [...filledSearchOptions.value].sort((a2, b2) => props3.filterSort(a2, b2));
    });
    const displayOptions = computed20(() => flattenOptions(orderedFilteredOptions.value, {
      fieldNames: mergedFieldNames.value,
      childrenAsData: childrenAsData.value
    }));
    const triggerChange = (values) => {
      const labeledValues = convert2LabelValues(values);
      setInternalValue(labeledValues);
      if (props3.onChange && // Trigger event only when value changed
      (labeledValues.length !== mergedValues.value.length || labeledValues.some((newVal, index2) => {
        var _a;
        return ((_a = mergedValues.value[index2]) === null || _a === void 0 ? void 0 : _a.value) !== (newVal === null || newVal === void 0 ? void 0 : newVal.value);
      }))) {
        const returnValues = props3.labelInValue ? labeledValues.map((v2) => {
          return _extends(_extends({}, v2), {
            originLabel: v2.label,
            label: typeof v2.label === "function" ? v2.label() : v2.label
          });
        }) : labeledValues.map((v2) => v2.value);
        const returnOptions = labeledValues.map((v2) => injectPropsWithOption(getMixedOption(v2.value)));
        props3.onChange(
          // Value
          multiple.value ? returnValues : returnValues[0],
          // Option
          multiple.value ? returnOptions : returnOptions[0]
        );
      }
    };
    const [activeValue, setActiveValue] = useState(null);
    const [accessibilityIndex, setAccessibilityIndex] = useState(0);
    const mergedDefaultActiveFirstOption = computed20(() => props3.defaultActiveFirstOption !== void 0 ? props3.defaultActiveFirstOption : props3.mode !== "combobox");
    const onActiveValue = function(active, index2) {
      let {
        source = "keyboard"
      } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      setAccessibilityIndex(index2);
      if (props3.backfill && props3.mode === "combobox" && active !== null && source === "keyboard") {
        setActiveValue(String(active));
      }
    };
    const triggerSelect = (val, selected) => {
      const getSelectEnt = () => {
        var _a;
        const option = getMixedOption(val);
        const originLabel = option === null || option === void 0 ? void 0 : option[mergedFieldNames.value.label];
        return [props3.labelInValue ? {
          label: typeof originLabel === "function" ? originLabel() : originLabel,
          originLabel,
          value: val,
          key: (_a = option === null || option === void 0 ? void 0 : option.key) !== null && _a !== void 0 ? _a : val
        } : val, injectPropsWithOption(option)];
      };
      if (selected && props3.onSelect) {
        const [wrappedValue, option] = getSelectEnt();
        props3.onSelect(wrappedValue, option);
      } else if (!selected && props3.onDeselect) {
        const [wrappedValue, option] = getSelectEnt();
        props3.onDeselect(wrappedValue, option);
      }
    };
    const onInternalSelect = (val, info) => {
      let cloneValues;
      const mergedSelect = multiple.value ? info.selected : true;
      if (mergedSelect) {
        cloneValues = multiple.value ? [...mergedValues.value, val] : [val];
      } else {
        cloneValues = mergedValues.value.filter((v2) => v2.value !== val);
      }
      triggerChange(cloneValues);
      triggerSelect(val, mergedSelect);
      if (props3.mode === "combobox") {
        setActiveValue("");
      } else if (!multiple.value || props3.autoClearSearchValue) {
        setSearchValue("");
        setActiveValue("");
      }
    };
    const onDisplayValuesChange = (nextValues, info) => {
      triggerChange(nextValues);
      if (info.type === "remove" || info.type === "clear") {
        info.values.forEach((item) => {
          triggerSelect(item.value, false);
        });
      }
    };
    const onInternalSearch = (searchText, info) => {
      var _a;
      setSearchValue(searchText);
      setActiveValue(null);
      if (info.source === "submit") {
        const formatted = (searchText || "").trim();
        if (formatted) {
          const newRawValues = Array.from(/* @__PURE__ */ new Set([...rawValues.value, formatted]));
          triggerChange(newRawValues);
          triggerSelect(formatted, true);
          setSearchValue("");
        }
        return;
      }
      if (info.source !== "blur") {
        if (props3.mode === "combobox") {
          triggerChange(searchText);
        }
        (_a = props3.onSearch) === null || _a === void 0 ? void 0 : _a.call(props3, searchText);
      }
    };
    const onInternalSearchSplit = (words) => {
      let patchValues = words;
      if (props3.mode !== "tags") {
        patchValues = words.map((word) => {
          const opt = labelOptions.value.get(word);
          return opt === null || opt === void 0 ? void 0 : opt.value;
        }).filter((val) => val !== void 0);
      }
      const newRawValues = Array.from(/* @__PURE__ */ new Set([...rawValues.value, ...patchValues]));
      triggerChange(newRawValues);
      newRawValues.forEach((newRawValue) => {
        triggerSelect(newRawValue, true);
      });
    };
    const realVirtual = computed20(() => props3.virtual !== false && props3.dropdownMatchSelectWidth !== false);
    useProvideSelectProps(toReactive(_extends(_extends({}, parsedOptions), {
      flattenOptions: displayOptions,
      onActiveValue,
      defaultActiveFirstOption: mergedDefaultActiveFirstOption,
      onSelect: onInternalSelect,
      menuItemSelectedIcon: toRef2(props3, "menuItemSelectedIcon"),
      rawValues,
      fieldNames: mergedFieldNames,
      virtual: realVirtual,
      listHeight: toRef2(props3, "listHeight"),
      listItemHeight: toRef2(props3, "listItemHeight"),
      childrenAsData
    })));
    if (true) {
      watchEffect7(() => {
        warningPropsUtil_default(props3);
      }, {
        flush: "post"
      });
    }
    const selectRef = ref14();
    expose({
      focus() {
        var _a;
        (_a = selectRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = selectRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      },
      scrollTo(arg) {
        var _a;
        (_a = selectRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg);
      }
    });
    const pickProps = computed20(() => {
      return omit_default(props3, [
        "id",
        "mode",
        "prefixCls",
        "backfill",
        "fieldNames",
        // Search
        "inputValue",
        "searchValue",
        "onSearch",
        "autoClearSearchValue",
        // Select
        "onSelect",
        "onDeselect",
        "dropdownMatchSelectWidth",
        // Options
        "filterOption",
        "filterSort",
        "optionFilterProp",
        "optionLabelProp",
        "options",
        "children",
        "defaultActiveFirstOption",
        "menuItemSelectedIcon",
        "virtual",
        "listHeight",
        "listItemHeight",
        // Value
        "value",
        "defaultValue",
        "labelInValue",
        "onChange"
      ]);
    });
    return () => {
      return _createVNode24(BaseSelect_default, _objectSpread2(_objectSpread2(_objectSpread2({}, pickProps.value), attrs), {}, {
        "id": mergedId,
        "prefixCls": props3.prefixCls,
        "ref": selectRef,
        "omitDomProps": OMIT_DOM_PROPS,
        "mode": props3.mode,
        "displayValues": displayValues.value,
        "onDisplayValuesChange": onDisplayValuesChange,
        "searchValue": mergedSearchValue.value,
        "onSearch": onInternalSearch,
        "onSearchSplit": onInternalSearchSplit,
        "dropdownMatchSelectWidth": props3.dropdownMatchSelectWidth,
        "OptionList": OptionList_default,
        "emptyOptions": !displayOptions.value.length,
        "activeValue": activeValue.value,
        "activeDescendantId": `${mergedId}_list_${accessibilityIndex.value}`
      }), slots);
    };
  }
});

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/Option.js
var Option = () => null;
Option.isSelectOption = true;
Option.displayName = "ASelectOption";
var Option_default = Option;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/OptGroup.js
var OptGroup = () => null;
OptGroup.isSelectOptGroup = true;
OptGroup.displayName = "ASelectOptGroup";
var OptGroup_default = OptGroup;

// ../../../../../../project/记账/demo_front/node_modules/ant-design-vue/es/vc-select/index.js
var vc_select_default = Select_default;

export {
  _objectSpread2,
  _extends,
  warning,
  note,
  noteOnce,
  warning_default,
  withUndefined,
  vue_types_default,
  triggerProps,
  contains,
  wrapperRaf,
  isFunction,
  camelize,
  capitalize,
  getDataAndAriaProps,
  toPx,
  renderHelper,
  wrapPromiseFn,
  classNames_default,
  isValid_default,
  initDefaultProps_default,
  splitAttrs,
  hasProp,
  skipFlattenKey,
  flattenChildren,
  getSlot,
  findDOMNode,
  getOptionProps,
  getComponent,
  getClass,
  getStyle,
  isFragment,
  isEmptyContent,
  isEmptyElement,
  isStringElement,
  filterEmpty,
  filterEmptyWithUndefined,
  isValidElement,
  getPropsSlot,
  supportsPassive_default,
  addEventListenerWrap,
  getMotion,
  warning_default2,
  cloneElement,
  cloneVNodes,
  deepCloneElement,
  triggerVNodeUpdate,
  customRenderSlot,
  isVisible_default,
  ResizeObserver_es_default,
  eq_default,
  root_default,
  Symbol_default,
  baseGetTag_default,
  isObject_default,
  isFunction_default,
  coreJsData_default,
  baseIsNative_default,
  getNative_default,
  MapCache_default,
  Stack_default,
  SetCache_default,
  arraySome_default,
  cacheHas_default,
  Uint8Array_default,
  mapToArray_default,
  setToArray_default,
  arrayPush_default,
  isArray_default,
  baseGetAllKeys_default,
  arrayFilter_default,
  stubArray_default,
  getSymbols_default,
  baseTimes_default,
  isObjectLike_default,
  isArguments_default,
  stubFalse_default,
  isBuffer_default,
  isIndex_default,
  isLength_default,
  baseUnary_default,
  nodeUtil_default,
  isTypedArray_default,
  arrayLikeKeys_default,
  isPrototype_default,
  overArg_default,
  baseKeys_default,
  isArrayLike_default,
  keys_default,
  getAllKeys_default,
  Set_default,
  WeakMap_default,
  getTag_default,
  baseIsEqual_default,
  isEqual_default,
  tuple,
  tupleNum,
  withInstall,
  eventType,
  objectType,
  booleanType,
  functionType,
  anyType,
  vNodeType,
  arrayType,
  stringType,
  someType,
  getTransitionDirection,
  getTransitionProps,
  getTransitionGroupProps,
  getTransitionName2 as getTransitionName,
  BaseMixin_default,
  useProvidePortal,
  Portal_default,
  canUseDom_default,
  removeCSS,
  updateCSS,
  getScrollBarSize,
  getTargetScrollBarSize,
  PortalWrapper_default,
  vc_trigger_default,
  KeyCode_default,
  getClientSize,
  getOffset2 as getOffset,
  styleToString,
  BaseInput_default,
  pickAttrs,
  vc_resize_observer_default,
  vc_overflow_default,
  useProvideLegacySelectContext,
  useInjectLegacySelectContext,
  useBaseProps,
  isMobile_default,
  toReactive,
  baseSelectPropsWithoutPrivate,
  BaseSelect_default,
  vc_virtual_list_default,
  useMemo,
  omit_default,
  useId,
  useMergedState,
  useState,
  selectProps,
  Option_default,
  OptGroup_default,
  vc_select_default
};
//# sourceMappingURL=chunk-6XGXXIL6.js.map
