if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    setup() {
      const title = vue.ref("Hello，欢迎使用");
      const username = vue.ref("");
      const password = vue.ref("");
      const login = async () => {
        if (!username.value) {
          uni.showToast({ title: "请输入用户名", icon: "none" });
          return;
        }
        if (!password.value) {
          uni.showToast({ title: "请输入密码", icon: "none" });
          return;
        }
        try {
          const res = await uni.request({
            url: "http://localhost:8080/user/login",
            method: "POST",
            header: { "Content-Type": "application/json" },
            data: {
              username: username.value,
              password: password.value
            }
          });
          const { requestHeader, responseData } = res;
          if (requestHeader.statusCode !== 200) {
            uni.showToast({ title: `请求失败,${requestHeader.statusCode}`, icon: "none" });
            return;
          }
          if (!responseData || !responseData.data) {
            uni.showToast({
              title: "接口返回空数据",
              icon: "none"
            });
            return;
          }
          const result = requestHeader.data;
          if (result.code === 1) {
            uni.showToast({ title: "登录成功" });
            uni.setStorageSync("token", result.data.token);
            uni.redirectTo({ url: "/pages/home/home" });
          } else {
            uni.showToast({ title: result.message, icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at pages/common/login.vue:76", "登录请求异常", err);
          uni.showToast({ title: "网络错误，请检查跨域和后端服务", icon: "none" });
        }
      };
      return { title, username, password, login };
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_van_field = vue.resolveComponent("van-field");
    const _component_van_cell_group = vue.resolveComponent("van-cell-group");
    const _component_van_button = vue.resolveComponent("van-button");
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode(
          "text",
          { class: "title" },
          vue.toDisplayString($setup.title),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "login" }, [
        vue.createVNode(_component_van_cell_group, { inset: "" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_van_field, {
              modelValue: $setup.username,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.username = $event),
              label: "用户名",
              placeholder: "请输入用户名"
            }, null, 8, ["modelValue"]),
            vue.createVNode(_component_van_field, {
              modelValue: $setup.password,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
              type: "password",
              label: "密码"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { class: "button_login" }, [
        vue.createVNode(_component_van_button, {
          round: "",
          type: "primary",
          size: "normal",
          onClick: $setup.login
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("登录")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["onClick"])
      ])
    ]);
  }
  const PagesCommonLogin = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/project/记账/demo_front/pages/common/login.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {},
    setup() {
      const username = ref("");
      const phone = ref("");
      const password = ref("");
      return { username, phone, password };
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_van_field = vue.resolveComponent("van-field");
    const _component_van_cell_group = vue.resolveComponent("van-cell-group");
    const _component_van_button = vue.resolveComponent("van-button");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_van_cell_group, { inset: "" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_van_field, {
                modelValue: $setup.username,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.username = $event),
                required: "",
                important: "",
                label: "用户名"
              }, null, 8, ["modelValue"]),
              vue.createVNode(_component_van_field, {
                modelValue: $setup.phone,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.phone = $event),
                required: "",
                important: "",
                label: "手机号"
              }, null, 8, ["modelValue"]),
              vue.createVNode(_component_van_field, {
                modelValue: $setup.password,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.password = $event),
                required: "",
                important: "",
                type: "password",
                label: "密码"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "register_button" }, [
          vue.createVNode(_component_van_button, {
            round: "",
            type: "primary",
            size: "normal"
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("注册")
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesCommonRegister = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/project/记账/demo_front/pages/common/register.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 111 ");
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/project/记账/demo_front/pages/home/home.vue"]]);
  __definePage("pages/common/login", PagesCommonLogin);
  __definePage("pages/common/register", PagesCommonRegister);
  __definePage("pages/home/home", PagesHomeHome);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/project/记账/demo_front/App.vue"]]);
  const extend = Object.assign;
  const inBrowser$1 = typeof window !== "undefined";
  const isObject = (val) => val !== null && typeof val === "object";
  const isDef = (val) => val !== void 0 && val !== null;
  const isFunction = (val) => typeof val === "function";
  const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
  const isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
  const isIOS$1 = () => inBrowser$1 ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
  function get(object, path) {
    const keys = path.split(".");
    let result = object;
    keys.forEach((key) => {
      var _a;
      result = isObject(result) ? (_a = result[key]) != null ? _a : "" : "";
    });
    return result;
  }
  const toArray = (item) => Array.isArray(item) ? item : [item];
  const unknownProp = null;
  const numericProp = [Number, String];
  const truthProp = {
    type: Boolean,
    default: true
  };
  const makeNumericProp = (defaultVal) => ({
    type: numericProp,
    default: defaultVal
  });
  const makeStringProp = (defaultVal) => ({
    type: String,
    default: defaultVal
  });
  var inBrowser = typeof window !== "undefined";
  function useParent(key) {
    const parent = vue.inject(key, null);
    if (parent) {
      const instance = vue.getCurrentInstance();
      const { link, unlink, internalChildren } = parent;
      link(instance);
      vue.onUnmounted(() => unlink(instance));
      const index = vue.computed(() => internalChildren.indexOf(instance));
      return {
        parent,
        index
      };
    }
    return {
      parent: null,
      index: vue.ref(-1)
    };
  }
  function onMountedOrActivated(hook) {
    let mounted;
    vue.onMounted(() => {
      hook();
      vue.nextTick(() => {
        mounted = true;
      });
    });
    vue.onActivated(() => {
      if (mounted) {
        hook();
      }
    });
  }
  function useEventListener(type, listener, options = {}) {
    if (!inBrowser) {
      return;
    }
    const { target = window, passive = false, capture = false } = options;
    let cleaned = false;
    let attached;
    const add = (target2) => {
      if (cleaned) {
        return;
      }
      const element = vue.unref(target2);
      if (element && !attached) {
        element.addEventListener(type, listener, {
          capture,
          passive
        });
        attached = true;
      }
    };
    const remove = (target2) => {
      if (cleaned) {
        return;
      }
      const element = vue.unref(target2);
      if (element && attached) {
        element.removeEventListener(type, listener, capture);
        attached = false;
      }
    };
    vue.onUnmounted(() => remove(target));
    vue.onDeactivated(() => remove(target));
    onMountedOrActivated(() => add(target));
    let stopWatch;
    if (vue.isRef(target)) {
      stopWatch = vue.watch(target, (val, oldVal) => {
        remove(oldVal);
        add(val);
      });
    }
    return () => {
      stopWatch == null ? void 0 : stopWatch();
      remove(target);
      cleaned = true;
    };
  }
  var width;
  var height;
  function useWindowSize() {
    if (!width) {
      width = vue.ref(0);
      height = vue.ref(0);
      if (inBrowser) {
        const update = () => {
          width.value = window.innerWidth;
          height.value = window.innerHeight;
        };
        update();
        window.addEventListener("resize", update, { passive: true });
        window.addEventListener("orientationchange", update, { passive: true });
      }
    }
    return { width, height };
  }
  var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
  function setScrollTop(el, value) {
    if ("scrollTop" in el) {
      el.scrollTop = value;
    } else {
      el.scrollTo(el.scrollX, value);
    }
  }
  function getRootScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  function setRootScrollTop(value) {
    setScrollTop(window, value);
    setScrollTop(document.body, value);
  }
  const isIOS = isIOS$1();
  function resetScroll() {
    if (isIOS) {
      setRootScrollTop(getRootScrollTop());
    }
  }
  const stopPropagation = (event) => event.stopPropagation();
  function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== "boolean" || event.cancelable) {
      event.preventDefault();
    }
    if (isStopPropagation) {
      stopPropagation(event);
    }
  }
  useWindowSize();
  function addUnit(value) {
    if (isDef(value)) {
      return isNumeric(value) ? `${value}px` : String(value);
    }
    return void 0;
  }
  function getSizeStyle(originSize) {
    if (isDef(originSize)) {
      if (Array.isArray(originSize)) {
        return {
          width: addUnit(originSize[0]),
          height: addUnit(originSize[1])
        };
      }
      const size = addUnit(originSize);
      return {
        width: size,
        height: size
      };
    }
  }
  const camelizeRE = /-(\w)/g;
  const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
  const kebabCase = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  function trimExtraChar(value, char, regExp) {
    const index = value.indexOf(char);
    if (index === -1) {
      return value;
    }
    if (char === "-" && index !== 0) {
      return value.slice(0, index);
    }
    return value.slice(0, index + 1) + value.slice(index).replace(regExp, "");
  }
  function formatNumber(value, allowDot = true, allowMinus = true) {
    if (allowDot) {
      value = trimExtraChar(value, ".", /\./g);
    } else {
      value = value.split(".")[0];
    }
    if (allowMinus) {
      value = trimExtraChar(value, "-", /-/g);
    } else {
      value = value.replace(/-/, "");
    }
    const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
    return value.replace(regExp, "");
  }
  const { hasOwnProperty } = Object.prototype;
  function assignKey(to, from, key) {
    const val = from[key];
    if (!isDef(val)) {
      return;
    }
    if (!hasOwnProperty.call(to, key) || !isObject(val)) {
      to[key] = val;
    } else {
      to[key] = deepAssign(Object(to[key]), val);
    }
  }
  function deepAssign(to, from) {
    Object.keys(from).forEach((key) => {
      assignKey(to, from, key);
    });
    return to;
  }
  var stdin_default$8 = {
    name: "姓名",
    tel: "电话",
    save: "保存",
    clear: "清空",
    cancel: "取消",
    confirm: "确认",
    delete: "删除",
    loading: "加载中...",
    noCoupon: "暂无优惠券",
    nameEmpty: "请填写姓名",
    addContact: "添加联系人",
    telInvalid: "请填写正确的电话",
    vanCalendar: {
      end: "结束",
      start: "开始",
      title: "日期选择",
      weekdays: ["日", "一", "二", "三", "四", "五", "六"],
      monthTitle: (year, month) => `${year}年${month}月`,
      rangePrompt: (maxRange) => `最多选择 ${maxRange} 天`
    },
    vanCascader: {
      select: "请选择"
    },
    vanPagination: {
      prev: "上一页",
      next: "下一页"
    },
    vanPullRefresh: {
      pulling: "下拉即可刷新...",
      loosing: "释放即可刷新..."
    },
    vanSubmitBar: {
      label: "合计:"
    },
    vanCoupon: {
      unlimited: "无门槛",
      discount: (discount) => `${discount}折`,
      condition: (condition) => `满${condition}元可用`
    },
    vanCouponCell: {
      title: "优惠券",
      count: (count) => `${count}张可用`
    },
    vanCouponList: {
      exchange: "兑换",
      close: "不使用",
      enable: "可用",
      disabled: "不可用",
      placeholder: "输入优惠码"
    },
    vanAddressEdit: {
      area: "地区",
      areaEmpty: "请选择地区",
      addressEmpty: "请填写详细地址",
      addressDetail: "详细地址",
      defaultAddress: "设为默认收货地址"
    },
    vanAddressList: {
      add: "新增地址"
    }
  };
  const lang = vue.ref("zh-CN");
  const messages = vue.reactive({
    "zh-CN": stdin_default$8
  });
  const Locale = {
    messages() {
      return messages[lang.value];
    },
    use(newLang, newMessages) {
      lang.value = newLang;
      this.add({ [newLang]: newMessages });
    },
    add(newMessages = {}) {
      deepAssign(messages, newMessages);
    }
  };
  var stdin_default$7 = Locale;
  function createTranslate(name2) {
    const prefix = camelize(name2) + ".";
    return (path, ...args) => {
      const messages2 = stdin_default$7.messages();
      const message = get(messages2, prefix + path) || get(messages2, path);
      return isFunction(message) ? message(...args) : message;
    };
  }
  function genBem(name2, mods) {
    if (!mods) {
      return "";
    }
    if (typeof mods === "string") {
      return ` ${name2}--${mods}`;
    }
    if (Array.isArray(mods)) {
      return mods.reduce(
        (ret, item) => ret + genBem(name2, item),
        ""
      );
    }
    return Object.keys(mods).reduce(
      (ret, key) => ret + (mods[key] ? genBem(name2, key) : ""),
      ""
    );
  }
  function createBEM(name2) {
    return (el, mods) => {
      if (el && typeof el !== "string") {
        mods = el;
        el = "";
      }
      el = el ? `${name2}__${el}` : name2;
      return `${el}${genBem(el, mods)}`;
    };
  }
  function createNamespace(name2) {
    const prefixedName = `van-${name2}`;
    return [
      prefixedName,
      createBEM(prefixedName),
      createTranslate(prefixedName)
    ];
  }
  const BORDER = "van-hairline";
  const BORDER_SURROUND = `${BORDER}--surround`;
  const BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
  const FORM_KEY = Symbol("van-form");
  function withInstall(options) {
    options.install = (app) => {
      const { name: name2 } = options;
      if (name2) {
        app.component(name2, options);
        app.component(camelize(`-${name2}`), options);
      }
    };
    return options;
  }
  function useExpose(apis) {
    const instance = vue.getCurrentInstance();
    if (instance) {
      extend(instance.proxy, apis);
    }
  }
  const routeProps = {
    to: [String, Object],
    url: String,
    replace: Boolean
  };
  function route({
    to,
    url,
    replace,
    $router: router
  }) {
    if (to && router) {
      router[replace ? "replace" : "push"](to);
    } else if (url) {
      replace ? location.replace(url) : location.href = url;
    }
  }
  function useRoute() {
    const vm = vue.getCurrentInstance().proxy;
    return () => route(vm);
  }
  const [name$7, bem$7] = createNamespace("badge");
  const badgeProps = {
    dot: Boolean,
    max: numericProp,
    tag: makeStringProp("div"),
    color: String,
    offset: Array,
    content: numericProp,
    showZero: truthProp,
    position: makeStringProp("top-right")
  };
  var stdin_default$6 = vue.defineComponent({
    name: name$7,
    props: badgeProps,
    setup(props, {
      slots
    }) {
      const hasContent = () => {
        if (slots.content) {
          return true;
        }
        const {
          content,
          showZero
        } = props;
        return isDef(content) && content !== "" && (showZero || content !== 0 && content !== "0");
      };
      const renderContent = () => {
        const {
          dot,
          max,
          content
        } = props;
        if (!dot && hasContent()) {
          if (slots.content) {
            return slots.content();
          }
          if (isDef(max) && isNumeric(content) && +content > +max) {
            return `${max}+`;
          }
          return content;
        }
      };
      const getOffsetWithMinusString = (val) => val.startsWith("-") ? val.replace("-", "") : `-${val}`;
      const style = vue.computed(() => {
        const style2 = {
          background: props.color
        };
        if (props.offset) {
          const [x, y] = props.offset;
          const {
            position
          } = props;
          const [offsetY, offsetX] = position.split("-");
          if (slots.default) {
            if (typeof y === "number") {
              style2[offsetY] = addUnit(offsetY === "top" ? y : -y);
            } else {
              style2[offsetY] = offsetY === "top" ? addUnit(y) : getOffsetWithMinusString(y);
            }
            if (typeof x === "number") {
              style2[offsetX] = addUnit(offsetX === "left" ? x : -x);
            } else {
              style2[offsetX] = offsetX === "left" ? addUnit(x) : getOffsetWithMinusString(x);
            }
          } else {
            style2.marginTop = addUnit(y);
            style2.marginLeft = addUnit(x);
          }
        }
        return style2;
      });
      const renderBadge = () => {
        if (hasContent() || props.dot) {
          return vue.createVNode("div", {
            "class": bem$7([props.position, {
              dot: props.dot,
              fixed: !!slots.default
            }]),
            "style": style.value
          }, [renderContent()]);
        }
      };
      return () => {
        if (slots.default) {
          const {
            tag
          } = props;
          return vue.createVNode(tag, {
            "class": bem$7("wrapper")
          }, {
            default: () => [slots.default(), renderBadge()]
          });
        }
        return renderBadge();
      };
    }
  });
  const Badge = withInstall(stdin_default$6);
  const setGlobalZIndex = (val) => {
  };
  const [name$6, bem$6] = createNamespace("config-provider");
  const CONFIG_PROVIDER_KEY = Symbol(name$6);
  const configProviderProps = {
    tag: makeStringProp("div"),
    theme: makeStringProp("light"),
    zIndex: Number,
    themeVars: Object,
    themeVarsDark: Object,
    themeVarsLight: Object,
    themeVarsScope: makeStringProp("local"),
    iconPrefix: String
  };
  function insertDash(str) {
    return str.replace(/([a-zA-Z])(\d)/g, "$1-$2");
  }
  function mapThemeVarsToCSSVars(themeVars) {
    const cssVars = {};
    Object.keys(themeVars).forEach((key) => {
      const formattedKey = insertDash(kebabCase(key));
      cssVars[`--van-${formattedKey}`] = themeVars[key];
    });
    return cssVars;
  }
  function syncThemeVarsOnRoot(newStyle = {}, oldStyle = {}) {
    Object.keys(newStyle).forEach((key) => {
      if (newStyle[key] !== oldStyle[key]) {
        document.documentElement.style.setProperty(key, newStyle[key]);
      }
    });
    Object.keys(oldStyle).forEach((key) => {
      if (!newStyle[key]) {
        document.documentElement.style.removeProperty(key);
      }
    });
  }
  vue.defineComponent({
    name: name$6,
    props: configProviderProps,
    setup(props, {
      slots
    }) {
      const style = vue.computed(() => mapThemeVarsToCSSVars(extend({}, props.themeVars, props.theme === "dark" ? props.themeVarsDark : props.themeVarsLight)));
      if (inBrowser$1) {
        const addTheme = () => {
          document.documentElement.classList.add(`van-theme-${props.theme}`);
        };
        const removeTheme = (theme = props.theme) => {
          document.documentElement.classList.remove(`van-theme-${theme}`);
        };
        vue.watch(() => props.theme, (newVal, oldVal) => {
          if (oldVal) {
            removeTheme(oldVal);
          }
          addTheme();
        }, {
          immediate: true
        });
        vue.onActivated(addTheme);
        vue.onDeactivated(removeTheme);
        vue.onBeforeUnmount(removeTheme);
        vue.watch(style, (newStyle, oldStyle) => {
          if (props.themeVarsScope === "global") {
            syncThemeVarsOnRoot(newStyle, oldStyle);
          }
        });
        vue.watch(() => props.themeVarsScope, (newScope, oldScope) => {
          if (oldScope === "global") {
            syncThemeVarsOnRoot({}, style.value);
          }
          if (newScope === "global") {
            syncThemeVarsOnRoot(style.value, {});
          }
        });
        if (props.themeVarsScope === "global") {
          syncThemeVarsOnRoot(style.value, {});
        }
      }
      vue.provide(CONFIG_PROVIDER_KEY, props);
      vue.watchEffect(() => {
        if (props.zIndex !== void 0) {
          setGlobalZIndex(props.zIndex);
        }
      });
      return () => vue.createVNode(props.tag, {
        "class": bem$6(),
        "style": props.themeVarsScope === "local" ? style.value : void 0
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    }
  });
  const [name$5, bem$5] = createNamespace("icon");
  const isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
  const iconProps = {
    dot: Boolean,
    tag: makeStringProp("i"),
    name: String,
    size: numericProp,
    badge: numericProp,
    color: String,
    badgeProps: Object,
    classPrefix: String
  };
  var stdin_default$5 = vue.defineComponent({
    name: name$5,
    props: iconProps,
    setup(props, {
      slots
    }) {
      const config = vue.inject(CONFIG_PROVIDER_KEY, null);
      const classPrefix = vue.computed(() => props.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem$5());
      return () => {
        const {
          tag,
          dot,
          name: name2,
          size,
          badge,
          color
        } = props;
        const isImageIcon = isImage(name2);
        return vue.createVNode(Badge, vue.mergeProps({
          "dot": dot,
          "tag": tag,
          "class": [classPrefix.value, isImageIcon ? "" : `${classPrefix.value}-${name2}`],
          "style": {
            color,
            fontSize: addUnit(size)
          },
          "content": badge
        }, props.badgeProps), {
          default: () => {
            var _a;
            return [(_a = slots.default) == null ? void 0 : _a.call(slots), isImageIcon && vue.createVNode("img", {
              "class": bem$5("image"),
              "src": name2
            }, null)];
          }
        });
      };
    }
  });
  const Icon = withInstall(stdin_default$5);
  const [name$4, bem$4] = createNamespace("loading");
  const SpinIcon = Array(12).fill(null).map((_, index) => vue.createVNode("i", {
    "class": bem$4("line", String(index + 1))
  }, null));
  const CircularIcon = vue.createVNode("svg", {
    "class": bem$4("circular"),
    "viewBox": "25 25 50 50"
  }, [vue.createVNode("circle", {
    "cx": "50",
    "cy": "50",
    "r": "20",
    "fill": "none"
  }, null)]);
  const loadingProps = {
    size: numericProp,
    type: makeStringProp("circular"),
    color: String,
    vertical: Boolean,
    textSize: numericProp,
    textColor: String
  };
  var stdin_default$4 = vue.defineComponent({
    name: name$4,
    props: loadingProps,
    setup(props, {
      slots
    }) {
      const spinnerStyle = vue.computed(() => extend({
        color: props.color
      }, getSizeStyle(props.size)));
      const renderIcon = () => {
        const DefaultIcon = props.type === "spinner" ? SpinIcon : CircularIcon;
        return vue.createVNode("span", {
          "class": bem$4("spinner", props.type),
          "style": spinnerStyle.value
        }, [slots.icon ? slots.icon() : DefaultIcon]);
      };
      const renderText = () => {
        var _a;
        if (slots.default) {
          return vue.createVNode("span", {
            "class": bem$4("text"),
            "style": {
              fontSize: addUnit(props.textSize),
              color: (_a = props.textColor) != null ? _a : props.color
            }
          }, [slots.default()]);
        }
      };
      return () => {
        const {
          type,
          vertical
        } = props;
        return vue.createVNode("div", {
          "class": bem$4([type, {
            vertical
          }]),
          "aria-live": "polite",
          "aria-busy": true
        }, [renderIcon(), renderText()]);
      };
    }
  });
  const Loading = withInstall(stdin_default$4);
  const [name$3, bem$3] = createNamespace("button");
  const buttonProps = extend({}, routeProps, {
    tag: makeStringProp("button"),
    text: String,
    icon: String,
    type: makeStringProp("default"),
    size: makeStringProp("normal"),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: makeStringProp("button"),
    loadingSize: numericProp,
    loadingText: String,
    loadingType: String,
    iconPosition: makeStringProp("left")
  });
  var stdin_default$3 = vue.defineComponent({
    name: name$3,
    props: buttonProps,
    emits: ["click"],
    setup(props, {
      emit,
      slots
    }) {
      const route2 = useRoute();
      const renderLoadingIcon = () => {
        if (slots.loading) {
          return slots.loading();
        }
        return vue.createVNode(Loading, {
          "size": props.loadingSize,
          "type": props.loadingType,
          "class": bem$3("loading")
        }, null);
      };
      const renderIcon = () => {
        if (props.loading) {
          return renderLoadingIcon();
        }
        if (slots.icon) {
          return vue.createVNode("div", {
            "class": bem$3("icon")
          }, [slots.icon()]);
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "name": props.icon,
            "class": bem$3("icon"),
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      const renderText = () => {
        let text;
        if (props.loading) {
          text = props.loadingText;
        } else {
          text = slots.default ? slots.default() : props.text;
        }
        if (text) {
          return vue.createVNode("span", {
            "class": bem$3("text")
          }, [text]);
        }
      };
      const getStyle = () => {
        const {
          color,
          plain
        } = props;
        if (color) {
          const style = {
            color: plain ? color : "white"
          };
          if (!plain) {
            style.background = color;
          }
          if (color.includes("gradient")) {
            style.border = 0;
          } else {
            style.borderColor = color;
          }
          return style;
        }
      };
      const onClick = (event) => {
        if (props.loading) {
          preventDefault(event);
        } else if (!props.disabled) {
          emit("click", event);
          route2();
        }
      };
      return () => {
        const {
          tag,
          type,
          size,
          block,
          round,
          plain,
          square,
          loading,
          disabled,
          hairline,
          nativeType,
          iconPosition
        } = props;
        const classes = [bem$3([type, size, {
          plain,
          block,
          round,
          square,
          loading,
          disabled,
          hairline
        }]), {
          [BORDER_SURROUND]: hairline
        }];
        return vue.createVNode(tag, {
          "type": nativeType,
          "class": classes,
          "style": getStyle(),
          "disabled": disabled,
          "onClick": onClick
        }, {
          default: () => [vue.createVNode("div", {
            "class": bem$3("content")
          }, [iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon()])]
        });
      };
    }
  });
  const Button = withInstall(stdin_default$3);
  const useScopeId = () => {
    var _a;
    const { scopeId } = ((_a = vue.getCurrentInstance()) == null ? void 0 : _a.vnode) || {};
    return scopeId ? { [scopeId]: "" } : null;
  };
  let current = 0;
  function useId() {
    const vm = vue.getCurrentInstance();
    const { name: name2 = "unknown" } = (vm == null ? void 0 : vm.type) || {};
    return `${name2}-${++current}`;
  }
  const [name$2, bem$2] = createNamespace("cell");
  const cellSharedProps = {
    tag: makeStringProp("div"),
    icon: String,
    size: String,
    title: numericProp,
    value: numericProp,
    label: numericProp,
    center: Boolean,
    isLink: Boolean,
    border: truthProp,
    iconPrefix: String,
    valueClass: unknownProp,
    labelClass: unknownProp,
    titleClass: unknownProp,
    titleStyle: null,
    arrowDirection: String,
    required: {
      type: [Boolean, String],
      default: null
    },
    clickable: {
      type: Boolean,
      default: null
    }
  };
  const cellProps = extend({}, cellSharedProps, routeProps);
  var stdin_default$2 = vue.defineComponent({
    name: name$2,
    props: cellProps,
    setup(props, {
      slots
    }) {
      const route2 = useRoute();
      const renderLabel = () => {
        const showLabel = slots.label || isDef(props.label);
        if (showLabel) {
          return vue.createVNode("div", {
            "class": [bem$2("label"), props.labelClass]
          }, [slots.label ? slots.label() : props.label]);
        }
      };
      const renderTitle = () => {
        var _a;
        if (slots.title || isDef(props.title)) {
          const titleSlot = (_a = slots.title) == null ? void 0 : _a.call(slots);
          if (Array.isArray(titleSlot) && titleSlot.length === 0) {
            return;
          }
          return vue.createVNode("div", {
            "class": [bem$2("title"), props.titleClass],
            "style": props.titleStyle
          }, [titleSlot || vue.createVNode("span", null, [props.title]), renderLabel()]);
        }
      };
      const renderValue = () => {
        const slot = slots.value || slots.default;
        const hasValue = slot || isDef(props.value);
        if (hasValue) {
          return vue.createVNode("div", {
            "class": [bem$2("value"), props.valueClass]
          }, [slot ? slot() : vue.createVNode("span", null, [props.value])]);
        }
      };
      const renderLeftIcon = () => {
        if (slots.icon) {
          return slots.icon();
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "name": props.icon,
            "class": bem$2("left-icon"),
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      const renderRightIcon = () => {
        if (slots["right-icon"]) {
          return slots["right-icon"]();
        }
        if (props.isLink) {
          const name2 = props.arrowDirection && props.arrowDirection !== "right" ? `arrow-${props.arrowDirection}` : "arrow";
          return vue.createVNode(Icon, {
            "name": name2,
            "class": bem$2("right-icon")
          }, null);
        }
      };
      return () => {
        var _a;
        const {
          tag,
          size,
          center,
          border,
          isLink,
          required
        } = props;
        const clickable = (_a = props.clickable) != null ? _a : isLink;
        const classes = {
          center,
          required: !!required,
          clickable,
          borderless: !border
        };
        if (size) {
          classes[size] = !!size;
        }
        return vue.createVNode(tag, {
          "class": bem$2(classes),
          "role": clickable ? "button" : void 0,
          "tabindex": clickable ? 0 : void 0,
          "onClick": route2
        }, {
          default: () => {
            var _a2;
            return [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_a2 = slots.extra) == null ? void 0 : _a2.call(slots)];
          }
        });
      };
    }
  });
  const Cell = withInstall(stdin_default$2);
  function isEmptyValue(value) {
    if (Array.isArray(value)) {
      return !value.length;
    }
    if (value === 0) {
      return false;
    }
    return !value;
  }
  function runSyncRule(value, rule) {
    if (isEmptyValue(value)) {
      if (rule.required) {
        return false;
      }
      if (rule.validateEmpty === false) {
        return true;
      }
    }
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return false;
    }
    return true;
  }
  function runRuleValidator(value, rule) {
    return new Promise((resolve) => {
      const returnVal = rule.validator(value, rule);
      if (isPromise(returnVal)) {
        returnVal.then(resolve);
        return;
      }
      resolve(returnVal);
    });
  }
  function getRuleMessage(value, rule) {
    const { message } = rule;
    if (isFunction(message)) {
      return message(value, rule);
    }
    return message || "";
  }
  function startComposing({ target }) {
    target.composing = true;
  }
  function endComposing({ target }) {
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  function resizeTextarea(input, autosize) {
    const scrollTop = getRootScrollTop();
    input.style.height = "auto";
    let height2 = input.scrollHeight;
    if (isObject(autosize)) {
      const { maxHeight, minHeight } = autosize;
      if (maxHeight !== void 0) {
        height2 = Math.min(height2, maxHeight);
      }
      if (minHeight !== void 0) {
        height2 = Math.max(height2, minHeight);
      }
    }
    if (height2) {
      input.style.height = `${height2}px`;
      setRootScrollTop(scrollTop);
    }
  }
  function mapInputType(type, inputmode) {
    if (type === "number") {
      type = "text";
      inputmode != null ? inputmode : inputmode = "decimal";
    }
    if (type === "digit") {
      type = "tel";
      inputmode != null ? inputmode : inputmode = "numeric";
    }
    return { type, inputmode };
  }
  function getStringLength(str) {
    return [...str].length;
  }
  function cutString(str, maxlength) {
    return [...str].slice(0, maxlength).join("");
  }
  const [name$1, bem$1] = createNamespace("field");
  const fieldSharedProps = {
    id: String,
    name: String,
    leftIcon: String,
    rightIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    maxlength: numericProp,
    max: Number,
    min: Number,
    formatter: Function,
    clearIcon: makeStringProp("clear"),
    modelValue: makeNumericProp(""),
    inputAlign: String,
    placeholder: String,
    autocomplete: String,
    autocapitalize: String,
    autocorrect: String,
    errorMessage: String,
    enterkeyhint: String,
    clearTrigger: makeStringProp("focus"),
    formatTrigger: makeStringProp("onChange"),
    spellcheck: {
      type: Boolean,
      default: null
    },
    error: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    readonly: {
      type: Boolean,
      default: null
    },
    inputmode: String
  };
  const fieldProps = extend({}, cellSharedProps, fieldSharedProps, {
    rows: numericProp,
    type: makeStringProp("text"),
    rules: Array,
    autosize: [Boolean, Object],
    labelWidth: numericProp,
    labelClass: unknownProp,
    labelAlign: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    colon: {
      type: Boolean,
      default: null
    }
  });
  var stdin_default$1 = vue.defineComponent({
    name: name$1,
    props: fieldProps,
    emits: ["blur", "focus", "clear", "keypress", "clickInput", "endValidate", "startValidate", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const id = useId();
      const state = vue.reactive({
        status: "unvalidated",
        focused: false,
        validateMessage: ""
      });
      const inputRef = vue.ref();
      const clearIconRef = vue.ref();
      const customValue = vue.ref();
      const {
        parent: form
      } = useParent(FORM_KEY);
      const getModelValue = () => {
        var _a;
        return String((_a = props.modelValue) != null ? _a : "");
      };
      const getProp = (key) => {
        if (isDef(props[key])) {
          return props[key];
        }
        if (form && isDef(form.props[key])) {
          return form.props[key];
        }
      };
      const showClear = vue.computed(() => {
        const readonly = getProp("readonly");
        if (props.clearable && !readonly) {
          const hasValue = getModelValue() !== "";
          const trigger = props.clearTrigger === "always" || props.clearTrigger === "focus" && state.focused;
          return hasValue && trigger;
        }
        return false;
      });
      const formValue = vue.computed(() => {
        if (customValue.value && slots.input) {
          return customValue.value();
        }
        return props.modelValue;
      });
      const showRequiredMark = vue.computed(() => {
        var _a;
        const required = getProp("required");
        if (required === "auto") {
          return (_a = props.rules) == null ? void 0 : _a.some((rule) => rule.required);
        }
        return required;
      });
      const runRules = (rules) => rules.reduce((promise, rule) => promise.then(() => {
        if (state.status === "failed") {
          return;
        }
        let {
          value
        } = formValue;
        if (rule.formatter) {
          value = rule.formatter(value, rule);
        }
        if (!runSyncRule(value, rule)) {
          state.status = "failed";
          state.validateMessage = getRuleMessage(value, rule);
          return;
        }
        if (rule.validator) {
          if (isEmptyValue(value) && rule.validateEmpty === false) {
            return;
          }
          return runRuleValidator(value, rule).then((result) => {
            if (result && typeof result === "string") {
              state.status = "failed";
              state.validateMessage = result;
            } else if (result === false) {
              state.status = "failed";
              state.validateMessage = getRuleMessage(value, rule);
            }
          });
        }
      }), Promise.resolve());
      const resetValidation = () => {
        state.status = "unvalidated";
        state.validateMessage = "";
      };
      const endValidate = () => emit("endValidate", {
        status: state.status,
        message: state.validateMessage
      });
      const validate = (rules = props.rules) => new Promise((resolve) => {
        resetValidation();
        if (rules) {
          emit("startValidate");
          runRules(rules).then(() => {
            if (state.status === "failed") {
              resolve({
                name: props.name,
                message: state.validateMessage
              });
              endValidate();
            } else {
              state.status = "passed";
              resolve();
              endValidate();
            }
          });
        } else {
          resolve();
        }
      });
      const validateWithTrigger = (trigger) => {
        if (form && props.rules) {
          const {
            validateTrigger
          } = form.props;
          const defaultTrigger = toArray(validateTrigger).includes(trigger);
          const rules = props.rules.filter((rule) => {
            if (rule.trigger) {
              return toArray(rule.trigger).includes(trigger);
            }
            return defaultTrigger;
          });
          if (rules.length) {
            validate(rules);
          }
        }
      };
      const limitValueLength = (value) => {
        var _a;
        const {
          maxlength
        } = props;
        if (isDef(maxlength) && getStringLength(value) > +maxlength) {
          const modelValue = getModelValue();
          if (modelValue && getStringLength(modelValue) === +maxlength) {
            return modelValue;
          }
          const selectionEnd = (_a = inputRef.value) == null ? void 0 : _a.selectionEnd;
          if (state.focused && selectionEnd) {
            const valueArr = [...value];
            const exceededLength = valueArr.length - +maxlength;
            valueArr.splice(selectionEnd - exceededLength, exceededLength);
            return valueArr.join("");
          }
          return cutString(value, +maxlength);
        }
        return value;
      };
      const updateValue = (value, trigger = "onChange") => {
        var _a, _b;
        const originalValue = value;
        value = limitValueLength(value);
        const limitDiffLen = getStringLength(originalValue) - getStringLength(value);
        if (props.type === "number" || props.type === "digit") {
          const isNumber = props.type === "number";
          value = formatNumber(value, isNumber, isNumber);
          if (trigger === "onBlur" && value !== "" && (props.min !== void 0 || props.max !== void 0)) {
            const adjustedValue = clamp(+value, (_a = props.min) != null ? _a : -Infinity, (_b = props.max) != null ? _b : Infinity);
            if (+value !== adjustedValue) {
              value = adjustedValue.toString();
            }
          }
        }
        let formatterDiffLen = 0;
        if (props.formatter && trigger === props.formatTrigger) {
          const {
            formatter,
            maxlength
          } = props;
          value = formatter(value);
          if (isDef(maxlength) && getStringLength(value) > +maxlength) {
            value = cutString(value, +maxlength);
          }
          if (inputRef.value && state.focused) {
            const {
              selectionEnd
            } = inputRef.value;
            const bcoVal = cutString(originalValue, selectionEnd);
            formatterDiffLen = getStringLength(formatter(bcoVal)) - getStringLength(bcoVal);
          }
        }
        if (inputRef.value && inputRef.value.value !== value) {
          if (state.focused) {
            let {
              selectionStart,
              selectionEnd
            } = inputRef.value;
            inputRef.value.value = value;
            if (isDef(selectionStart) && isDef(selectionEnd)) {
              const valueLen = getStringLength(value);
              if (limitDiffLen) {
                selectionStart -= limitDiffLen;
                selectionEnd -= limitDiffLen;
              } else if (formatterDiffLen) {
                selectionStart += formatterDiffLen;
                selectionEnd += formatterDiffLen;
              }
              inputRef.value.setSelectionRange(Math.min(selectionStart, valueLen), Math.min(selectionEnd, valueLen));
            }
          } else {
            inputRef.value.value = value;
          }
        }
        if (value !== props.modelValue) {
          emit("update:modelValue", value);
        }
      };
      const onInput = (event) => {
        if (!event.target.composing) {
          updateValue(event.target.value);
        }
      };
      const blur = () => {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.blur();
      };
      const focus = () => {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.focus();
      };
      const adjustTextareaSize = () => {
        const input = inputRef.value;
        if (props.type === "textarea" && props.autosize && input) {
          resizeTextarea(input, props.autosize);
        }
      };
      const onFocus = (event) => {
        state.focused = true;
        emit("focus", event);
        vue.nextTick(adjustTextareaSize);
        if (getProp("readonly")) {
          blur();
        }
      };
      const onBlur = (event) => {
        state.focused = false;
        updateValue(getModelValue(), "onBlur");
        emit("blur", event);
        if (getProp("readonly")) {
          return;
        }
        validateWithTrigger("onBlur");
        vue.nextTick(adjustTextareaSize);
        resetScroll();
      };
      const onClickInput = (event) => emit("clickInput", event);
      const onClickLeftIcon = (event) => emit("clickLeftIcon", event);
      const onClickRightIcon = (event) => emit("clickRightIcon", event);
      const onClear = (event) => {
        preventDefault(event);
        emit("update:modelValue", "");
        emit("clear", event);
      };
      const showError = vue.computed(() => {
        if (typeof props.error === "boolean") {
          return props.error;
        }
        if (form && form.props.showError && state.status === "failed") {
          return true;
        }
      });
      const labelStyle = vue.computed(() => {
        const labelWidth = getProp("labelWidth");
        const labelAlign = getProp("labelAlign");
        if (labelWidth && labelAlign !== "top") {
          return {
            width: addUnit(labelWidth)
          };
        }
      });
      const onKeypress = (event) => {
        const ENTER_CODE = 13;
        if (event.keyCode === ENTER_CODE) {
          const submitOnEnter = form && form.props.submitOnEnter;
          if (!submitOnEnter && props.type !== "textarea") {
            preventDefault(event);
          }
          if (props.type === "search") {
            blur();
          }
        }
        emit("keypress", event);
      };
      const getInputId = () => props.id || `${id}-input`;
      const getValidationStatus = () => state.status;
      const renderInput = () => {
        const controlClass = bem$1("control", [getProp("inputAlign"), {
          error: showError.value,
          custom: !!slots.input,
          "min-height": props.type === "textarea" && !props.autosize
        }]);
        if (slots.input) {
          return vue.createVNode("div", {
            "class": controlClass,
            "onClick": onClickInput
          }, [slots.input()]);
        }
        const inputAttrs = {
          id: getInputId(),
          ref: inputRef,
          name: props.name,
          rows: props.rows !== void 0 ? +props.rows : void 0,
          class: controlClass,
          disabled: getProp("disabled"),
          readonly: getProp("readonly"),
          autofocus: props.autofocus,
          placeholder: props.placeholder,
          autocomplete: props.autocomplete,
          autocapitalize: props.autocapitalize,
          autocorrect: props.autocorrect,
          enterkeyhint: props.enterkeyhint,
          spellcheck: props.spellcheck,
          "aria-labelledby": props.label ? `${id}-label` : void 0,
          "data-allow-mismatch": "attribute",
          onBlur,
          onFocus,
          onInput,
          onClick: onClickInput,
          onChange: endComposing,
          onKeypress,
          onCompositionend: endComposing,
          onCompositionstart: startComposing
        };
        if (props.type === "textarea") {
          return vue.createVNode("textarea", vue.mergeProps(inputAttrs, {
            "inputmode": props.inputmode
          }), null);
        }
        return vue.createVNode("input", vue.mergeProps(mapInputType(props.type, props.inputmode), inputAttrs), null);
      };
      const renderLeftIcon = () => {
        const leftIconSlot = slots["left-icon"];
        if (props.leftIcon || leftIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1("left-icon"),
            "onClick": onClickLeftIcon
          }, [leftIconSlot ? leftIconSlot() : vue.createVNode(Icon, {
            "name": props.leftIcon,
            "classPrefix": props.iconPrefix
          }, null)]);
        }
      };
      const renderRightIcon = () => {
        const rightIconSlot = slots["right-icon"];
        if (props.rightIcon || rightIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1("right-icon"),
            "onClick": onClickRightIcon
          }, [rightIconSlot ? rightIconSlot() : vue.createVNode(Icon, {
            "name": props.rightIcon,
            "classPrefix": props.iconPrefix
          }, null)]);
        }
      };
      const renderWordLimit = () => {
        if (props.showWordLimit && props.maxlength) {
          const count = getStringLength(getModelValue());
          return vue.createVNode("div", {
            "class": bem$1("word-limit")
          }, [vue.createVNode("span", {
            "class": bem$1("word-num")
          }, [count]), vue.createTextVNode("/"), props.maxlength]);
        }
      };
      const renderMessage = () => {
        if (form && form.props.showErrorMessage === false) {
          return;
        }
        const message = props.errorMessage || state.validateMessage;
        if (message) {
          const slot = slots["error-message"];
          const errorMessageAlign = getProp("errorMessageAlign");
          return vue.createVNode("div", {
            "class": bem$1("error-message", errorMessageAlign)
          }, [slot ? slot({
            message
          }) : message]);
        }
      };
      const renderLabel = () => {
        const labelWidth = getProp("labelWidth");
        const labelAlign = getProp("labelAlign");
        const colon = getProp("colon") ? ":" : "";
        if (slots.label) {
          return [slots.label(), colon];
        }
        if (props.label) {
          return vue.createVNode("label", {
            "id": `${id}-label`,
            "for": slots.input ? void 0 : getInputId(),
            "data-allow-mismatch": "attribute",
            "onClick": (event) => {
              preventDefault(event);
              focus();
            },
            "style": labelAlign === "top" && labelWidth ? {
              width: addUnit(labelWidth)
            } : void 0
          }, [props.label + colon]);
        }
      };
      const renderFieldBody = () => [vue.createVNode("div", {
        "class": bem$1("body")
      }, [renderInput(), showClear.value && vue.createVNode(Icon, {
        "ref": clearIconRef,
        "name": props.clearIcon,
        "class": bem$1("clear")
      }, null), renderRightIcon(), slots.button && vue.createVNode("div", {
        "class": bem$1("button")
      }, [slots.button()])]), renderWordLimit(), renderMessage()];
      useExpose({
        blur,
        focus,
        validate,
        formValue,
        resetValidation,
        getValidationStatus
      });
      vue.provide(CUSTOM_FIELD_INJECTION_KEY, {
        customValue,
        resetValidation,
        validateWithTrigger
      });
      vue.watch(() => props.modelValue, () => {
        updateValue(getModelValue());
        resetValidation();
        validateWithTrigger("onChange");
        vue.nextTick(adjustTextareaSize);
      });
      vue.onMounted(() => {
        updateValue(getModelValue(), props.formatTrigger);
        vue.nextTick(adjustTextareaSize);
      });
      useEventListener("touchstart", onClear, {
        target: vue.computed(() => {
          var _a;
          return (_a = clearIconRef.value) == null ? void 0 : _a.$el;
        })
      });
      return () => {
        const disabled = getProp("disabled");
        const labelAlign = getProp("labelAlign");
        const LeftIcon = renderLeftIcon();
        const renderTitle = () => {
          const Label = renderLabel();
          if (labelAlign === "top") {
            return [LeftIcon, Label].filter(Boolean);
          }
          return Label || [];
        };
        return vue.createVNode(Cell, {
          "size": props.size,
          "class": bem$1({
            error: showError.value,
            disabled,
            [`label-${labelAlign}`]: labelAlign
          }),
          "center": props.center,
          "border": props.border,
          "isLink": props.isLink,
          "clickable": props.clickable,
          "titleStyle": labelStyle.value,
          "valueClass": bem$1("value"),
          "titleClass": [bem$1("label", [labelAlign, {
            required: showRequiredMark.value
          }]), props.labelClass],
          "arrowDirection": props.arrowDirection
        }, {
          icon: LeftIcon && labelAlign !== "top" ? () => LeftIcon : null,
          title: renderTitle,
          value: renderFieldBody,
          extra: slots.extra
        });
      };
    }
  });
  const Field = withInstall(stdin_default$1);
  const [name, bem] = createNamespace("cell-group");
  const cellGroupProps = {
    title: String,
    inset: Boolean,
    border: truthProp
  };
  var stdin_default = vue.defineComponent({
    name,
    inheritAttrs: false,
    props: cellGroupProps,
    setup(props, {
      slots,
      attrs
    }) {
      const renderGroup = () => {
        var _a;
        return vue.createVNode("div", vue.mergeProps({
          "class": [bem({
            inset: props.inset
          }), {
            [BORDER_TOP_BOTTOM]: props.border && !props.inset
          }]
        }, attrs, useScopeId()), [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
      const renderTitle = () => vue.createVNode("div", {
        "class": bem("title", {
          inset: props.inset
        })
      }, [slots.title ? slots.title() : props.title]);
      return () => {
        if (props.title || slots.title) {
          return vue.createVNode(vue.Fragment, null, [renderTitle(), renderGroup()]);
        }
        return renderGroup();
      };
    }
  });
  const CellGroup = withInstall(stdin_default);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(Field);
    app.use(CellGroup);
    app.use(Button);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
