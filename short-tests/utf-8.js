/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */ String.fromCodePoint ||
  (function () {
    var u = (function () {
        try {
          var n = {},
            f = Object.defineProperty,
            r = f(n, n, n) && f;
        } catch (t) {}
        return r;
      })(),
      g = String.fromCharCode,
      i = Math.floor,
      v = function (n) {
        var f = 16384,
          r = [],
          t,
          l,
          a = -1,
          o = arguments.length;
        if (!o) return "";
        for (var h = ""; ++a < o; ) {
          var e = Number(arguments[a]);
          if (!isFinite(e) || e < 0 || e > 1114111 || i(e) != e)
            throw RangeError("Invalid code point: " + e);
          e <= 65535
            ? r.push(e)
            : ((e -= 65536),
              (t = (e >> 10) + 55296),
              (l = (e % 1024) + 56320),
              r.push(t, l)),
            (a + 1 == o || r.length > f) &&
              ((h += g.apply(null, r)), (r.length = 0));
        }
        return h;
      };
    u
      ? u(String, "fromCodePoint", { value: v, configurable: !0, writable: !0 })
      : (String.fromCodePoint = v);
  })();
function generateRandomUtf8(u, g) {
  function iFunc(a, o) {
    return Math.floor(Math.random() * (o - a + 1)) + a;
  }
  function vFunc(a) {
    return a[parseInt(Math.random() * a.length)];
  }
  for (var n = "", f = 0; f < u; f++) {
    var r = vFunc(g);
    if (r == 1) var t = iFunc(32, 126);
    else if (r == 2) var t = iFunc(128, 2047);
    else if (r == 3) var t = iFunc(2048, 65535);
    else if (r == 4) var t = iFunc(65536, 1114111);
    var l = String.fromCodePoint(t);
    n += l;
  }
  return n;
}
