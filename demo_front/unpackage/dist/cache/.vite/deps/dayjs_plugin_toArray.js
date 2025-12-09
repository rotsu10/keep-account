import {
  __commonJS
} from "./chunk-ZS7NZCD4.js";

// ../../../../../../project/记账/demo_front/node_modules/dayjs/plugin/toArray.js
var require_toArray = __commonJS({
  "../../../../../../project/记账/demo_front/node_modules/dayjs/plugin/toArray.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_toArray = e();
    }(exports, function() {
      "use strict";
      return function(t, e) {
        e.prototype.toArray = function() {
          return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
        };
      };
    });
  }
});
export default require_toArray();
//# sourceMappingURL=dayjs_plugin_toArray.js.map
