// ../../../../../../project/记账/demo_front/node_modules/default-passive-events/dist/index.module.js
var e;
var t = ["scroll", "wheel", "touchstart", "touchmove", "touchenter", "touchend", "touchleave", "mouseout", "mouseleave", "mouseup", "mousedown", "mousemove", "mouseenter", "mousewheel", "mouseover", "pointermove", "pointerenter", "pointerleave", "pointerdown", "pointerup", "animationstart", "animationend", "animationiteration", "transitionstart", "transitionend", "transitionrun", "transitioncancel"];
if (function() {
  var e2 = false;
  try {
    var t2 = Object.defineProperty({}, "passive", { get: function() {
      e2 = true;
    } });
    window.addEventListener("test", null, t2), window.removeEventListener("test", null, t2);
  } catch (e3) {
  }
  return e2;
}()) {
  n = EventTarget.prototype.addEventListener;
  e = n, EventTarget.prototype.addEventListener = function(n2, o, i) {
    var r, s = "object" == typeof i && null !== i, a = s ? i.capture : i;
    (i = s ? function(e2) {
      var t2 = Object.getOwnPropertyDescriptor(e2, "passive");
      return t2 && true !== t2.writable && void 0 === t2.set ? Object.assign({}, e2) : e2;
    }(i) : {}).passive = void 0 !== (r = i.passive) ? r : -1 !== ("undefined" != typeof window && window.defaultPassiveEvents_supportedPassiveEvents ? window.defaultPassiveEvents_supportedPassiveEvents : t).indexOf(n2) && true, i.capture = void 0 !== a && a, e.call(this, n2, o, i);
  }, EventTarget.prototype.addEventListener._original = e;
}
var n;
//# sourceMappingURL=default-passive-events.js.map
