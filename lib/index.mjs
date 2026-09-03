var H = /* @__PURE__ */ ((e) => (e.GridString = "gridstring", e.Lisudoku = "lisudoku", e.Fpuzzles = "fpuzzles", e.Penpa = "penpa", e))(H || {}), ki = typeof global == "object" && global && global.Object === Object && global, zo = typeof self == "object" && self && self.Object === Object && self, ne = ki || zo || Function("return this")(), ee = ne.Symbol, Ri = Object.prototype, ko = Ri.hasOwnProperty, Ro = Ri.toString, je = ee ? ee.toStringTag : void 0;
function Oo(e) {
  var n = ko.call(e, je), t = e[je];
  try {
    e[je] = void 0;
    var r = !0;
  } catch {
  }
  var i = Ro.call(e);
  return r && (n ? e[je] = t : delete e[je]), i;
}
var Co = Object.prototype, $o = Co.toString;
function Io(e) {
  return $o.call(e);
}
var Do = "[object Null]", No = "[object Undefined]", ur = ee ? ee.toStringTag : void 0;
function le(e) {
  return e == null ? e === void 0 ? No : Do : ur && ur in Object(e) ? Oo(e) : Io(e);
}
function te(e) {
  return e != null && typeof e == "object";
}
var Lo = "[object Symbol]";
function ve(e) {
  return typeof e == "symbol" || te(e) && le(e) == Lo;
}
function xe(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length, i = Array(r); ++t < r; )
    i[t] = n(e[t], t, e);
  return i;
}
var N = Array.isArray, Mo = 1 / 0, cr = ee ? ee.prototype : void 0, dr = cr ? cr.toString : void 0;
function Oi(e) {
  if (typeof e == "string")
    return e;
  if (N(e))
    return xe(e, Oi) + "";
  if (ve(e))
    return dr ? dr.call(e) : "";
  var n = e + "";
  return n == "0" && 1 / e == -Mo ? "-0" : n;
}
var Uo = /\s/;
function Po(e) {
  for (var n = e.length; n-- && Uo.test(e.charAt(n)); )
    ;
  return n;
}
var Zo = /^\s+/;
function Fo(e) {
  return e && e.slice(0, Po(e) + 1).replace(Zo, "");
}
function K(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var hr = NaN, Bo = /^[-+]0x[0-9a-f]+$/i, Ho = /^0b[01]+$/i, Go = /^0o[0-7]+$/i, jo = parseInt;
function Ci(e) {
  if (typeof e == "number")
    return e;
  if (ve(e))
    return hr;
  if (K(e)) {
    var n = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = K(n) ? n + "" : n;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Fo(e);
  var t = Ho.test(e);
  return t || Go.test(e) ? jo(e.slice(2), t ? 2 : 8) : Bo.test(e) ? hr : +e;
}
var _r = 1 / 0, Ko = 17976931348623157e292;
function Ie(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = Ci(e), e === _r || e === -_r) {
    var n = e < 0 ? -1 : 1;
    return n * Ko;
  }
  return e === e ? e : 0;
}
function Xo(e) {
  var n = Ie(e), t = n % 1;
  return n === n ? t ? n - t : n : 0;
}
function dt(e) {
  return e;
}
var Yo = "[object AsyncFunction]", Wo = "[object Function]", Jo = "[object GeneratorFunction]", qo = "[object Proxy]";
function Gn(e) {
  if (!K(e))
    return !1;
  var n = le(e);
  return n == Wo || n == Jo || n == Yo || n == qo;
}
var en = ne["__core-js_shared__"], pr = function() {
  var e = /[^.]+$/.exec(en && en.keys && en.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Qo(e) {
  return !!pr && pr in e;
}
var Vo = Function.prototype, el = Vo.toString;
function Te(e) {
  if (e != null) {
    try {
      return el.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var tl = /[\\^$.*+?()[\]{}|]/g, nl = /^\[object .+?Constructor\]$/, rl = Function.prototype, il = Object.prototype, al = rl.toString, ol = il.hasOwnProperty, ll = RegExp(
  "^" + al.call(ol).replace(tl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function fl(e) {
  if (!K(e) || Qo(e))
    return !1;
  var n = Gn(e) ? ll : nl;
  return n.test(Te(e));
}
function sl(e, n) {
  return e?.[n];
}
function ze(e, n) {
  var t = sl(e, n);
  return fl(t) ? t : void 0;
}
var Tn = ze(ne, "WeakMap"), gr = Object.create, ul = /* @__PURE__ */ function() {
  function e() {
  }
  return function(n) {
    if (!K(n))
      return {};
    if (gr)
      return gr(n);
    e.prototype = n;
    var t = new e();
    return e.prototype = void 0, t;
  };
}();
function cl(e, n, t) {
  switch (t.length) {
    case 0:
      return e.call(n);
    case 1:
      return e.call(n, t[0]);
    case 2:
      return e.call(n, t[0], t[1]);
    case 3:
      return e.call(n, t[0], t[1], t[2]);
  }
  return e.apply(n, t);
}
function dl() {
}
function hl(e, n) {
  var t = -1, r = e.length;
  for (n || (n = Array(r)); ++t < r; )
    n[t] = e[t];
  return n;
}
var _l = 800, pl = 16, gl = Date.now;
function wl(e) {
  var n = 0, t = 0;
  return function() {
    var r = gl(), i = pl - (r - t);
    if (t = r, i > 0) {
      if (++n >= _l)
        return arguments[0];
    } else
      n = 0;
    return e.apply(void 0, arguments);
  };
}
function bl(e) {
  return function() {
    return e;
  };
}
var $t = function() {
  try {
    var e = ze(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), ml = $t ? function(e, n) {
  return $t(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: bl(n),
    writable: !0
  });
} : dt, $i = wl(ml);
function xl(e, n, t, r) {
  for (var i = e.length, a = t + -1; ++a < i; )
    if (n(e[a], a, e))
      return a;
  return -1;
}
function vl(e) {
  return e !== e;
}
function yl(e, n, t) {
  for (var r = t - 1, i = e.length; ++r < i; )
    if (e[r] === n)
      return r;
  return -1;
}
function El(e, n, t) {
  return n === n ? yl(e, n, t) : xl(e, vl, t);
}
function Sl(e, n) {
  var t = e == null ? 0 : e.length;
  return !!t && El(e, n, 0) > -1;
}
var Al = 9007199254740991, Tl = /^(?:0|[1-9]\d*)$/;
function Pt(e, n) {
  var t = typeof e;
  return n = n ?? Al, !!n && (t == "number" || t != "symbol" && Tl.test(e)) && e > -1 && e % 1 == 0 && e < n;
}
function jn(e, n, t) {
  n == "__proto__" && $t ? $t(e, n, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : e[n] = t;
}
function ht(e, n) {
  return e === n || e !== e && n !== n;
}
var zl = Object.prototype, kl = zl.hasOwnProperty;
function Ii(e, n, t) {
  var r = e[n];
  (!(kl.call(e, n) && ht(r, t)) || t === void 0 && !(n in e)) && jn(e, n, t);
}
function Rl(e, n, t, r) {
  var i = !t;
  t || (t = {});
  for (var a = -1, f = n.length; ++a < f; ) {
    var l = n[a], u = void 0;
    u === void 0 && (u = e[l]), i ? jn(t, l, u) : Ii(t, l, u);
  }
  return t;
}
var wr = Math.max;
function Di(e, n, t) {
  return n = wr(n === void 0 ? e.length - 1 : n, 0), function() {
    for (var r = arguments, i = -1, a = wr(r.length - n, 0), f = Array(a); ++i < a; )
      f[i] = r[n + i];
    i = -1;
    for (var l = Array(n + 1); ++i < n; )
      l[i] = r[i];
    return l[n] = t(f), cl(e, this, l);
  };
}
function Ol(e, n) {
  return $i(Di(e, n, dt), e + "");
}
var Cl = 9007199254740991;
function Kn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Cl;
}
function ke(e) {
  return e != null && Kn(e.length) && !Gn(e);
}
function Ni(e, n, t) {
  if (!K(t))
    return !1;
  var r = typeof n;
  return (r == "number" ? ke(t) && Pt(n, t.length) : r == "string" && n in t) ? ht(t[n], e) : !1;
}
function $l(e) {
  return Ol(function(n, t) {
    var r = -1, i = t.length, a = i > 1 ? t[i - 1] : void 0, f = i > 2 ? t[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (i--, a) : void 0, f && Ni(t[0], t[1], f) && (a = i < 3 ? void 0 : a, i = 1), n = Object(n); ++r < i; ) {
      var l = t[r];
      l && e(n, l, r, a);
    }
    return n;
  });
}
var Il = Object.prototype;
function Zt(e) {
  var n = e && e.constructor, t = typeof n == "function" && n.prototype || Il;
  return e === t;
}
function Li(e, n) {
  for (var t = -1, r = Array(e); ++t < e; )
    r[t] = n(t);
  return r;
}
var Dl = "[object Arguments]";
function br(e) {
  return te(e) && le(e) == Dl;
}
var Mi = Object.prototype, Nl = Mi.hasOwnProperty, Ll = Mi.propertyIsEnumerable, Le = br(/* @__PURE__ */ function() {
  return arguments;
}()) ? br : function(e) {
  return te(e) && Nl.call(e, "callee") && !Ll.call(e, "callee");
};
function Ml() {
  return !1;
}
var Ui = typeof exports == "object" && exports && !exports.nodeType && exports, mr = Ui && typeof module == "object" && module && !module.nodeType && module, Ul = mr && mr.exports === Ui, xr = Ul ? ne.Buffer : void 0, Pl = xr ? xr.isBuffer : void 0, et = Pl || Ml, Zl = "[object Arguments]", Fl = "[object Array]", Bl = "[object Boolean]", Hl = "[object Date]", Gl = "[object Error]", jl = "[object Function]", Kl = "[object Map]", Xl = "[object Number]", Yl = "[object Object]", Wl = "[object RegExp]", Jl = "[object Set]", ql = "[object String]", Ql = "[object WeakMap]", Vl = "[object ArrayBuffer]", ef = "[object DataView]", tf = "[object Float32Array]", nf = "[object Float64Array]", rf = "[object Int8Array]", af = "[object Int16Array]", of = "[object Int32Array]", lf = "[object Uint8Array]", ff = "[object Uint8ClampedArray]", sf = "[object Uint16Array]", uf = "[object Uint32Array]", O = {};
O[tf] = O[nf] = O[rf] = O[af] = O[of] = O[lf] = O[ff] = O[sf] = O[uf] = !0;
O[Zl] = O[Fl] = O[Vl] = O[Bl] = O[ef] = O[Hl] = O[Gl] = O[jl] = O[Kl] = O[Xl] = O[Yl] = O[Wl] = O[Jl] = O[ql] = O[Ql] = !1;
function cf(e) {
  return te(e) && Kn(e.length) && !!O[le(e)];
}
function Pi(e) {
  return function(n) {
    return e(n);
  };
}
var Zi = typeof exports == "object" && exports && !exports.nodeType && exports, Je = Zi && typeof module == "object" && module && !module.nodeType && module, df = Je && Je.exports === Zi, tn = df && ki.process, vr = function() {
  try {
    var e = Je && Je.require && Je.require("util").types;
    return e || tn && tn.binding && tn.binding("util");
  } catch {
  }
}(), yr = vr && vr.isTypedArray, Ft = yr ? Pi(yr) : cf, hf = Object.prototype, _f = hf.hasOwnProperty;
function Fi(e, n) {
  var t = N(e), r = !t && Le(e), i = !t && !r && et(e), a = !t && !r && !i && Ft(e), f = t || r || i || a, l = f ? Li(e.length, String) : [], u = l.length;
  for (var o in e)
    (n || _f.call(e, o)) && !(f && // Safari 9 has enumerable `arguments.length` in strict mode.
    (o == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (o == "offset" || o == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (o == "buffer" || o == "byteLength" || o == "byteOffset") || // Skip index properties.
    Pt(o, u))) && l.push(o);
  return l;
}
function Bi(e, n) {
  return function(t) {
    return e(n(t));
  };
}
var pf = Bi(Object.keys, Object), gf = Object.prototype, wf = gf.hasOwnProperty;
function Hi(e) {
  if (!Zt(e))
    return pf(e);
  var n = [];
  for (var t in Object(e))
    wf.call(e, t) && t != "constructor" && n.push(t);
  return n;
}
function Bt(e) {
  return ke(e) ? Fi(e) : Hi(e);
}
function bf(e) {
  var n = [];
  if (e != null)
    for (var t in Object(e))
      n.push(t);
  return n;
}
var mf = Object.prototype, xf = mf.hasOwnProperty;
function vf(e) {
  if (!K(e))
    return bf(e);
  var n = Zt(e), t = [];
  for (var r in e)
    r == "constructor" && (n || !xf.call(e, r)) || t.push(r);
  return t;
}
function Xn(e) {
  return ke(e) ? Fi(e, !0) : vf(e);
}
var yf = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ef = /^\w*$/;
function Yn(e, n) {
  if (N(e))
    return !1;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || ve(e) ? !0 : Ef.test(e) || !yf.test(e) || n != null && e in Object(n);
}
var tt = ze(Object, "create");
function Sf() {
  this.__data__ = tt ? tt(null) : {}, this.size = 0;
}
function Af(e) {
  var n = this.has(e) && delete this.__data__[e];
  return this.size -= n ? 1 : 0, n;
}
var Tf = "__lodash_hash_undefined__", zf = Object.prototype, kf = zf.hasOwnProperty;
function Rf(e) {
  var n = this.__data__;
  if (tt) {
    var t = n[e];
    return t === Tf ? void 0 : t;
  }
  return kf.call(n, e) ? n[e] : void 0;
}
var Of = Object.prototype, Cf = Of.hasOwnProperty;
function $f(e) {
  var n = this.__data__;
  return tt ? n[e] !== void 0 : Cf.call(n, e);
}
var If = "__lodash_hash_undefined__";
function Df(e, n) {
  var t = this.__data__;
  return this.size += this.has(e) ? 0 : 1, t[e] = tt && n === void 0 ? If : n, this;
}
function ye(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
ye.prototype.clear = Sf;
ye.prototype.delete = Af;
ye.prototype.get = Rf;
ye.prototype.has = $f;
ye.prototype.set = Df;
function Nf() {
  this.__data__ = [], this.size = 0;
}
function Ht(e, n) {
  for (var t = e.length; t--; )
    if (ht(e[t][0], n))
      return t;
  return -1;
}
var Lf = Array.prototype, Mf = Lf.splice;
function Uf(e) {
  var n = this.__data__, t = Ht(n, e);
  if (t < 0)
    return !1;
  var r = n.length - 1;
  return t == r ? n.pop() : Mf.call(n, t, 1), --this.size, !0;
}
function Pf(e) {
  var n = this.__data__, t = Ht(n, e);
  return t < 0 ? void 0 : n[t][1];
}
function Zf(e) {
  return Ht(this.__data__, e) > -1;
}
function Ff(e, n) {
  var t = this.__data__, r = Ht(t, e);
  return r < 0 ? (++this.size, t.push([e, n])) : t[r][1] = n, this;
}
function fe(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
fe.prototype.clear = Nf;
fe.prototype.delete = Uf;
fe.prototype.get = Pf;
fe.prototype.has = Zf;
fe.prototype.set = Ff;
var nt = ze(ne, "Map");
function Bf() {
  this.size = 0, this.__data__ = {
    hash: new ye(),
    map: new (nt || fe)(),
    string: new ye()
  };
}
function Hf(e) {
  var n = typeof e;
  return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
}
function Gt(e, n) {
  var t = e.__data__;
  return Hf(n) ? t[typeof n == "string" ? "string" : "hash"] : t.map;
}
function Gf(e) {
  var n = Gt(this, e).delete(e);
  return this.size -= n ? 1 : 0, n;
}
function jf(e) {
  return Gt(this, e).get(e);
}
function Kf(e) {
  return Gt(this, e).has(e);
}
function Xf(e, n) {
  var t = Gt(this, e), r = t.size;
  return t.set(e, n), this.size += t.size == r ? 0 : 1, this;
}
function se(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
se.prototype.clear = Bf;
se.prototype.delete = Gf;
se.prototype.get = jf;
se.prototype.has = Kf;
se.prototype.set = Xf;
var Yf = "Expected a function";
function Wn(e, n) {
  if (typeof e != "function" || n != null && typeof n != "function")
    throw new TypeError(Yf);
  var t = function() {
    var r = arguments, i = n ? n.apply(this, r) : r[0], a = t.cache;
    if (a.has(i))
      return a.get(i);
    var f = e.apply(this, r);
    return t.cache = a.set(i, f) || a, f;
  };
  return t.cache = new (Wn.Cache || se)(), t;
}
Wn.Cache = se;
var Wf = 500;
function Jf(e) {
  var n = Wn(e, function(r) {
    return t.size === Wf && t.clear(), r;
  }), t = n.cache;
  return n;
}
var qf = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Qf = /\\(\\)?/g, Vf = Jf(function(e) {
  var n = [];
  return e.charCodeAt(0) === 46 && n.push(""), e.replace(qf, function(t, r, i, a) {
    n.push(i ? a.replace(Qf, "$1") : r || t);
  }), n;
});
function _t(e) {
  return e == null ? "" : Oi(e);
}
function jt(e, n) {
  return N(e) ? e : Yn(e, n) ? [e] : Vf(_t(e));
}
var es = 1 / 0;
function pt(e) {
  if (typeof e == "string" || ve(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -es ? "-0" : n;
}
function Kt(e, n) {
  n = jt(n, e);
  for (var t = 0, r = n.length; e != null && t < r; )
    e = e[pt(n[t++])];
  return t && t == r ? e : void 0;
}
function ts(e, n, t) {
  var r = e == null ? void 0 : Kt(e, n);
  return r === void 0 ? t : r;
}
function Jn(e, n) {
  for (var t = -1, r = n.length, i = e.length; ++t < r; )
    e[i + t] = n[t];
  return e;
}
var Er = ee ? ee.isConcatSpreadable : void 0;
function ns(e) {
  return N(e) || Le(e) || !!(Er && e && e[Er]);
}
function Xt(e, n, t, r, i) {
  var a = -1, f = e.length;
  for (t || (t = ns), i || (i = []); ++a < f; ) {
    var l = e[a];
    n > 0 && t(l) ? n > 1 ? Xt(l, n - 1, t, r, i) : Jn(i, l) : i[i.length] = l;
  }
  return i;
}
function Gi(e) {
  var n = e == null ? 0 : e.length;
  return n ? Xt(e, 1) : [];
}
function rs(e) {
  return $i(Di(e, void 0, Gi), e + "");
}
var qn = Bi(Object.getPrototypeOf, Object), is = "[object Object]", as = Function.prototype, os = Object.prototype, ji = as.toString, ls = os.hasOwnProperty, fs = ji.call(Object);
function ss(e) {
  if (!te(e) || le(e) != is)
    return !1;
  var n = qn(e);
  if (n === null)
    return !0;
  var t = ls.call(n, "constructor") && n.constructor;
  return typeof t == "function" && t instanceof t && ji.call(t) == fs;
}
function us(e, n, t) {
  var r = -1, i = e.length;
  n < 0 && (n = -n > i ? 0 : i + n), t = t > i ? i : t, t < 0 && (t += i), i = n > t ? 0 : t - n >>> 0, n >>>= 0;
  for (var a = Array(i); ++r < i; )
    a[r] = e[r + n];
  return a;
}
function cs(e, n, t) {
  var r = e.length;
  return t = t === void 0 ? r : t, !n && t >= r ? e : us(e, n, t);
}
var ds = "\\ud800-\\udfff", hs = "\\u0300-\\u036f", _s = "\\ufe20-\\ufe2f", ps = "\\u20d0-\\u20ff", gs = hs + _s + ps, ws = "\\ufe0e\\ufe0f", bs = "\\u200d", ms = RegExp("[" + bs + ds + gs + ws + "]");
function Ki(e) {
  return ms.test(e);
}
function xs(e) {
  return e.split("");
}
var Xi = "\\ud800-\\udfff", vs = "\\u0300-\\u036f", ys = "\\ufe20-\\ufe2f", Es = "\\u20d0-\\u20ff", Ss = vs + ys + Es, As = "\\ufe0e\\ufe0f", Ts = "[" + Xi + "]", zn = "[" + Ss + "]", kn = "\\ud83c[\\udffb-\\udfff]", zs = "(?:" + zn + "|" + kn + ")", Yi = "[^" + Xi + "]", Wi = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ji = "[\\ud800-\\udbff][\\udc00-\\udfff]", ks = "\\u200d", qi = zs + "?", Qi = "[" + As + "]?", Rs = "(?:" + ks + "(?:" + [Yi, Wi, Ji].join("|") + ")" + Qi + qi + ")*", Os = Qi + qi + Rs, Cs = "(?:" + [Yi + zn + "?", zn, Wi, Ji, Ts].join("|") + ")", $s = RegExp(kn + "(?=" + kn + ")|" + Cs + Os, "g");
function Is(e) {
  return e.match($s) || [];
}
function Ds(e) {
  return Ki(e) ? Is(e) : xs(e);
}
function Ns(e) {
  return function(n) {
    n = _t(n);
    var t = Ki(n) ? Ds(n) : void 0, r = t ? t[0] : n.charAt(0), i = t ? cs(t, 1).join("") : n.slice(1);
    return r[e]() + i;
  };
}
var Ls = Ns("toUpperCase");
function Ms(e) {
  return Ls(_t(e).toLowerCase());
}
function Us(e, n, t, r) {
  for (var i = -1, a = e == null ? 0 : e.length; ++i < a; )
    t = n(t, e[i], i, e);
  return t;
}
function Ps(e) {
  return function(n) {
    return e?.[n];
  };
}
var Zs = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "s"
}, Fs = Ps(Zs), Bs = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Hs = "\\u0300-\\u036f", Gs = "\\ufe20-\\ufe2f", js = "\\u20d0-\\u20ff", Ks = Hs + Gs + js, Xs = "[" + Ks + "]", Ys = RegExp(Xs, "g");
function Ws(e) {
  return e = _t(e), e && e.replace(Bs, Fs).replace(Ys, "");
}
var Js = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function qs(e) {
  return e.match(Js) || [];
}
var Qs = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function Vs(e) {
  return Qs.test(e);
}
var Vi = "\\ud800-\\udfff", eu = "\\u0300-\\u036f", tu = "\\ufe20-\\ufe2f", nu = "\\u20d0-\\u20ff", ru = eu + tu + nu, ea = "\\u2700-\\u27bf", ta = "a-z\\xdf-\\xf6\\xf8-\\xff", iu = "\\xac\\xb1\\xd7\\xf7", au = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ou = "\\u2000-\\u206f", lu = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", na = "A-Z\\xc0-\\xd6\\xd8-\\xde", fu = "\\ufe0e\\ufe0f", ra = iu + au + ou + lu, ia = "['’]", Sr = "[" + ra + "]", su = "[" + ru + "]", aa = "\\d+", uu = "[" + ea + "]", oa = "[" + ta + "]", la = "[^" + Vi + ra + aa + ea + ta + na + "]", cu = "\\ud83c[\\udffb-\\udfff]", du = "(?:" + su + "|" + cu + ")", hu = "[^" + Vi + "]", fa = "(?:\\ud83c[\\udde6-\\uddff]){2}", sa = "[\\ud800-\\udbff][\\udc00-\\udfff]", $e = "[" + na + "]", _u = "\\u200d", Ar = "(?:" + oa + "|" + la + ")", pu = "(?:" + $e + "|" + la + ")", Tr = "(?:" + ia + "(?:d|ll|m|re|s|t|ve))?", zr = "(?:" + ia + "(?:D|LL|M|RE|S|T|VE))?", ua = du + "?", ca = "[" + fu + "]?", gu = "(?:" + _u + "(?:" + [hu, fa, sa].join("|") + ")" + ca + ua + ")*", wu = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", bu = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", mu = ca + ua + gu, xu = "(?:" + [uu, fa, sa].join("|") + ")" + mu, vu = RegExp([
  $e + "?" + oa + "+" + Tr + "(?=" + [Sr, $e, "$"].join("|") + ")",
  pu + "+" + zr + "(?=" + [Sr, $e + Ar, "$"].join("|") + ")",
  $e + "?" + Ar + "+" + Tr,
  $e + "+" + zr,
  bu,
  wu,
  aa,
  xu
].join("|"), "g");
function yu(e) {
  return e.match(vu) || [];
}
function Eu(e, n, t) {
  return e = _t(e), n = n, n === void 0 ? Vs(e) ? yu(e) : qs(e) : e.match(n) || [];
}
var Su = "['’]", Au = RegExp(Su, "g");
function Tu(e) {
  return function(n) {
    return Us(Eu(Ws(n).replace(Au, "")), e, "");
  };
}
var zu = Tu(function(e, n, t) {
  return n = n.toLowerCase(), e + (t ? Ms(n) : n);
});
function ku() {
  this.__data__ = new fe(), this.size = 0;
}
function Ru(e) {
  var n = this.__data__, t = n.delete(e);
  return this.size = n.size, t;
}
function Ou(e) {
  return this.__data__.get(e);
}
function Cu(e) {
  return this.__data__.has(e);
}
var $u = 200;
function Iu(e, n) {
  var t = this.__data__;
  if (t instanceof fe) {
    var r = t.__data__;
    if (!nt || r.length < $u - 1)
      return r.push([e, n]), this.size = ++t.size, this;
    t = this.__data__ = new se(r);
  }
  return t.set(e, n), this.size = t.size, this;
}
function q(e) {
  var n = this.__data__ = new fe(e);
  this.size = n.size;
}
q.prototype.clear = ku;
q.prototype.delete = Ru;
q.prototype.get = Ou;
q.prototype.has = Cu;
q.prototype.set = Iu;
var da = typeof exports == "object" && exports && !exports.nodeType && exports, kr = da && typeof module == "object" && module && !module.nodeType && module, Du = kr && kr.exports === da, Rr = Du ? ne.Buffer : void 0;
Rr && Rr.allocUnsafe;
function Nu(e, n) {
  return e.slice();
}
function Lu(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++t < r; ) {
    var f = e[t];
    n(f, t, e) && (a[i++] = f);
  }
  return a;
}
function ha() {
  return [];
}
var Mu = Object.prototype, Uu = Mu.propertyIsEnumerable, Or = Object.getOwnPropertySymbols, _a = Or ? function(e) {
  return e == null ? [] : (e = Object(e), Lu(Or(e), function(n) {
    return Uu.call(e, n);
  }));
} : ha, Pu = Object.getOwnPropertySymbols, Zu = Pu ? function(e) {
  for (var n = []; e; )
    Jn(n, _a(e)), e = qn(e);
  return n;
} : ha;
function pa(e, n, t) {
  var r = n(e);
  return N(e) ? r : Jn(r, t(e));
}
function Cr(e) {
  return pa(e, Bt, _a);
}
function Fu(e) {
  return pa(e, Xn, Zu);
}
var Rn = ze(ne, "DataView"), On = ze(ne, "Promise"), De = ze(ne, "Set"), $r = "[object Map]", Bu = "[object Object]", Ir = "[object Promise]", Dr = "[object Set]", Nr = "[object WeakMap]", Lr = "[object DataView]", Hu = Te(Rn), Gu = Te(nt), ju = Te(On), Ku = Te(De), Xu = Te(Tn), W = le;
(Rn && W(new Rn(new ArrayBuffer(1))) != Lr || nt && W(new nt()) != $r || On && W(On.resolve()) != Ir || De && W(new De()) != Dr || Tn && W(new Tn()) != Nr) && (W = function(e) {
  var n = le(e), t = n == Bu ? e.constructor : void 0, r = t ? Te(t) : "";
  if (r)
    switch (r) {
      case Hu:
        return Lr;
      case Gu:
        return $r;
      case ju:
        return Ir;
      case Ku:
        return Dr;
      case Xu:
        return Nr;
    }
  return n;
});
var It = ne.Uint8Array;
function Yu(e) {
  var n = new e.constructor(e.byteLength);
  return new It(n).set(new It(e)), n;
}
function Wu(e, n) {
  var t = Yu(e.buffer);
  return new e.constructor(t, e.byteOffset, e.length);
}
function Ju(e) {
  return typeof e.constructor == "function" && !Zt(e) ? ul(qn(e)) : {};
}
function qu(e) {
  for (var n = -1, t = e == null ? 0 : e.length, r = 0, i = []; ++n < t; ) {
    var a = e[n];
    a && (i[r++] = a);
  }
  return i;
}
var Qu = "__lodash_hash_undefined__";
function Vu(e) {
  return this.__data__.set(e, Qu), this;
}
function ec(e) {
  return this.__data__.has(e);
}
function rt(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.__data__ = new se(); ++n < t; )
    this.add(e[n]);
}
rt.prototype.add = rt.prototype.push = Vu;
rt.prototype.has = ec;
function tc(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length; ++t < r; )
    if (n(e[t], t, e))
      return !0;
  return !1;
}
function ga(e, n) {
  return e.has(n);
}
var nc = 1, rc = 2;
function wa(e, n, t, r, i, a) {
  var f = t & nc, l = e.length, u = n.length;
  if (l != u && !(f && u > l))
    return !1;
  var o = a.get(e), s = a.get(n);
  if (o && s)
    return o == n && s == e;
  var d = -1, c = !0, h = t & rc ? new rt() : void 0;
  for (a.set(e, n), a.set(n, e); ++d < l; ) {
    var w = e[d], S = n[d];
    if (r)
      var E = f ? r(S, w, d, n, e, a) : r(w, S, d, e, n, a);
    if (E !== void 0) {
      if (E)
        continue;
      c = !1;
      break;
    }
    if (h) {
      if (!tc(n, function(m, y) {
        if (!ga(h, y) && (w === m || i(w, m, t, r, a)))
          return h.push(y);
      })) {
        c = !1;
        break;
      }
    } else if (!(w === S || i(w, S, t, r, a))) {
      c = !1;
      break;
    }
  }
  return a.delete(e), a.delete(n), c;
}
function ba(e) {
  var n = -1, t = Array(e.size);
  return e.forEach(function(r, i) {
    t[++n] = [i, r];
  }), t;
}
function Qn(e) {
  var n = -1, t = Array(e.size);
  return e.forEach(function(r) {
    t[++n] = r;
  }), t;
}
var ic = 1, ac = 2, oc = "[object Boolean]", lc = "[object Date]", fc = "[object Error]", sc = "[object Map]", uc = "[object Number]", cc = "[object RegExp]", dc = "[object Set]", hc = "[object String]", _c = "[object Symbol]", pc = "[object ArrayBuffer]", gc = "[object DataView]", Mr = ee ? ee.prototype : void 0, nn = Mr ? Mr.valueOf : void 0;
function wc(e, n, t, r, i, a, f) {
  switch (t) {
    case gc:
      if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset)
        return !1;
      e = e.buffer, n = n.buffer;
    case pc:
      return !(e.byteLength != n.byteLength || !a(new It(e), new It(n)));
    case oc:
    case lc:
    case uc:
      return ht(+e, +n);
    case fc:
      return e.name == n.name && e.message == n.message;
    case cc:
    case hc:
      return e == n + "";
    case sc:
      var l = ba;
    case dc:
      var u = r & ic;
      if (l || (l = Qn), e.size != n.size && !u)
        return !1;
      var o = f.get(e);
      if (o)
        return o == n;
      r |= ac, f.set(e, n);
      var s = wa(l(e), l(n), r, i, a, f);
      return f.delete(e), s;
    case _c:
      if (nn)
        return nn.call(e) == nn.call(n);
  }
  return !1;
}
var bc = 1, mc = Object.prototype, xc = mc.hasOwnProperty;
function vc(e, n, t, r, i, a) {
  var f = t & bc, l = Cr(e), u = l.length, o = Cr(n), s = o.length;
  if (u != s && !f)
    return !1;
  for (var d = u; d--; ) {
    var c = l[d];
    if (!(f ? c in n : xc.call(n, c)))
      return !1;
  }
  var h = a.get(e), w = a.get(n);
  if (h && w)
    return h == n && w == e;
  var S = !0;
  a.set(e, n), a.set(n, e);
  for (var E = f; ++d < u; ) {
    c = l[d];
    var m = e[c], y = n[c];
    if (r)
      var x = f ? r(y, m, c, n, e, a) : r(m, y, c, e, n, a);
    if (!(x === void 0 ? m === y || i(m, y, t, r, a) : x)) {
      S = !1;
      break;
    }
    E || (E = c == "constructor");
  }
  if (S && !E) {
    var _ = e.constructor, v = n.constructor;
    _ != v && "constructor" in e && "constructor" in n && !(typeof _ == "function" && _ instanceof _ && typeof v == "function" && v instanceof v) && (S = !1);
  }
  return a.delete(e), a.delete(n), S;
}
var yc = 1, Ur = "[object Arguments]", Pr = "[object Array]", St = "[object Object]", Ec = Object.prototype, Zr = Ec.hasOwnProperty;
function Sc(e, n, t, r, i, a) {
  var f = N(e), l = N(n), u = f ? Pr : W(e), o = l ? Pr : W(n);
  u = u == Ur ? St : u, o = o == Ur ? St : o;
  var s = u == St, d = o == St, c = u == o;
  if (c && et(e)) {
    if (!et(n))
      return !1;
    f = !0, s = !1;
  }
  if (c && !s)
    return a || (a = new q()), f || Ft(e) ? wa(e, n, t, r, i, a) : wc(e, n, u, t, r, i, a);
  if (!(t & yc)) {
    var h = s && Zr.call(e, "__wrapped__"), w = d && Zr.call(n, "__wrapped__");
    if (h || w) {
      var S = h ? e.value() : e, E = w ? n.value() : n;
      return a || (a = new q()), i(S, E, t, r, a);
    }
  }
  return c ? (a || (a = new q()), vc(e, n, t, r, i, a)) : !1;
}
function Yt(e, n, t, r, i) {
  return e === n ? !0 : e == null || n == null || !te(e) && !te(n) ? e !== e && n !== n : Sc(e, n, t, r, Yt, i);
}
var Ac = 1, Tc = 2;
function zc(e, n, t, r) {
  var i = t.length, a = i;
  if (e == null)
    return !a;
  for (e = Object(e); i--; ) {
    var f = t[i];
    if (f[2] ? f[1] !== e[f[0]] : !(f[0] in e))
      return !1;
  }
  for (; ++i < a; ) {
    f = t[i];
    var l = f[0], u = e[l], o = f[1];
    if (f[2]) {
      if (u === void 0 && !(l in e))
        return !1;
    } else {
      var s = new q(), d;
      if (!(d === void 0 ? Yt(o, u, Ac | Tc, r, s) : d))
        return !1;
    }
  }
  return !0;
}
function ma(e) {
  return e === e && !K(e);
}
function kc(e) {
  for (var n = Bt(e), t = n.length; t--; ) {
    var r = n[t], i = e[r];
    n[t] = [r, i, ma(i)];
  }
  return n;
}
function xa(e, n) {
  return function(t) {
    return t == null ? !1 : t[e] === n && (n !== void 0 || e in Object(t));
  };
}
function Rc(e) {
  var n = kc(e);
  return n.length == 1 && n[0][2] ? xa(n[0][0], n[0][1]) : function(t) {
    return t === e || zc(t, e, n);
  };
}
function Oc(e, n) {
  return e != null && n in Object(e);
}
function Cc(e, n, t) {
  n = jt(n, e);
  for (var r = -1, i = n.length, a = !1; ++r < i; ) {
    var f = pt(n[r]);
    if (!(a = e != null && t(e, f)))
      break;
    e = e[f];
  }
  return a || ++r != i ? a : (i = e == null ? 0 : e.length, !!i && Kn(i) && Pt(f, i) && (N(e) || Le(e)));
}
function va(e, n) {
  return e != null && Cc(e, n, Oc);
}
var $c = 1, Ic = 2;
function Dc(e, n) {
  return Yn(e) && ma(n) ? xa(pt(e), n) : function(t) {
    var r = ts(t, e);
    return r === void 0 && r === n ? va(t, e) : Yt(n, r, $c | Ic);
  };
}
function Nc(e) {
  return function(n) {
    return n?.[e];
  };
}
function Lc(e) {
  return function(n) {
    return Kt(n, e);
  };
}
function Mc(e) {
  return Yn(e) ? Nc(pt(e)) : Lc(e);
}
function gt(e) {
  return typeof e == "function" ? e : e == null ? dt : typeof e == "object" ? N(e) ? Dc(e[0], e[1]) : Rc(e) : Mc(e);
}
function Uc(e) {
  return function(n, t, r) {
    for (var i = -1, a = Object(n), f = r(n), l = f.length; l--; ) {
      var u = f[++i];
      if (t(a[u], u, a) === !1)
        break;
    }
    return n;
  };
}
var ya = Uc();
function Pc(e, n) {
  return e && ya(e, n, Bt);
}
function Zc(e, n) {
  return function(t, r) {
    if (t == null)
      return t;
    if (!ke(t))
      return e(t, r);
    for (var i = t.length, a = -1, f = Object(t); ++a < i && r(f[a], a, f) !== !1; )
      ;
    return t;
  };
}
var Fc = Zc(Pc);
function Cn(e, n, t) {
  (t !== void 0 && !ht(e[n], t) || t === void 0 && !(n in e)) && jn(e, n, t);
}
function Bc(e) {
  return te(e) && ke(e);
}
function $n(e, n) {
  if (!(n === "constructor" && typeof e[n] == "function") && n != "__proto__")
    return e[n];
}
function Hc(e) {
  return Rl(e, Xn(e));
}
function Gc(e, n, t, r, i, a, f) {
  var l = $n(e, t), u = $n(n, t), o = f.get(u);
  if (o) {
    Cn(e, t, o);
    return;
  }
  var s = a ? a(l, u, t + "", e, n, f) : void 0, d = s === void 0;
  if (d) {
    var c = N(u), h = !c && et(u), w = !c && !h && Ft(u);
    s = u, c || h || w ? N(l) ? s = l : Bc(l) ? s = hl(l) : h ? (d = !1, s = Nu(u)) : w ? (d = !1, s = Wu(u)) : s = [] : ss(u) || Le(u) ? (s = l, Le(l) ? s = Hc(l) : (!K(l) || Gn(l)) && (s = Ju(u))) : d = !1;
  }
  d && (f.set(u, s), i(s, u, r, a, f), f.delete(u)), Cn(e, t, s);
}
function Ea(e, n, t, r, i) {
  e !== n && ya(n, function(a, f) {
    if (i || (i = new q()), K(a))
      Gc(e, n, f, t, Ea, r, i);
    else {
      var l = r ? r($n(e, f), a, f + "", e, n, i) : void 0;
      l === void 0 && (l = a), Cn(e, f, l);
    }
  }, Xn);
}
function jc(e) {
  return typeof e == "function" ? e : dt;
}
function Kc(e, n) {
  return xe(n, function(t) {
    return [t, e[t]];
  });
}
function Xc(e) {
  var n = -1, t = Array(e.size);
  return e.forEach(function(r) {
    t[++n] = [r, r];
  }), t;
}
var Yc = "[object Map]", Wc = "[object Set]";
function Jc(e) {
  return function(n) {
    var t = W(n);
    return t == Yc ? ba(n) : t == Wc ? Xc(n) : Kc(n, e(n));
  };
}
var rn = Jc(Bt);
function Sa(e, n) {
  var t = -1, r = ke(e) ? Array(e.length) : [];
  return Fc(e, function(i, a, f) {
    r[++t] = n(i, a, f);
  }), r;
}
function qc(e, n) {
  var t = N(e) ? xe : Sa;
  return t(e, gt(n));
}
function an(e, n) {
  return Xt(qc(e, n), 1);
}
var Qc = 1 / 0;
function Vc(e) {
  var n = e == null ? 0 : e.length;
  return n ? Xt(e, Qc) : [];
}
function on(e) {
  for (var n = -1, t = e == null ? 0 : e.length, r = {}; ++n < t; ) {
    var i = e[n];
    r[i[0]] = i[1];
  }
  return r;
}
var ed = Math.max, td = Math.min;
function nd(e, n, t) {
  return e >= td(n, t) && e < ed(n, t);
}
function ln(e, n, t) {
  return n = Ie(n), t === void 0 ? (t = n, n = 0) : t = Ie(t), e = Ci(e), nd(e, n, t);
}
var rd = "[object Boolean]";
function id(e) {
  return e === !0 || e === !1 || te(e) && le(e) == rd;
}
var ad = "[object Map]", od = "[object Set]", ld = Object.prototype, fd = ld.hasOwnProperty;
function B(e) {
  if (e == null)
    return !0;
  if (ke(e) && (N(e) || typeof e == "string" || typeof e.splice == "function" || et(e) || Ft(e) || Le(e)))
    return !e.length;
  var n = W(e);
  if (n == ad || n == od)
    return !e.size;
  if (Zt(e))
    return !Hi(e).length;
  for (var t in e)
    if (fd.call(e, t))
      return !1;
  return !0;
}
function Dt(e, n) {
  return Yt(e, n);
}
var sd = "[object Number]";
function ud(e) {
  return typeof e == "number" || te(e) && le(e) == sd;
}
function cd(e, n) {
  return e < n;
}
function dd(e, n, t) {
  for (var r = -1, i = e.length; ++r < i; ) {
    var a = e[r], f = n(a);
    if (f != null && (l === void 0 ? f === f && !ve(f) : t(f, l)))
      var l = f, u = a;
  }
  return u;
}
var hd = $l(function(e, n, t) {
  Ea(e, n, t);
});
function _d(e, n) {
  return e && e.length ? dd(e, gt(n), cd) : void 0;
}
var pd = "Expected a function";
function gd(e) {
  if (typeof e != "function")
    throw new TypeError(pd);
  return function() {
    var n = arguments;
    switch (n.length) {
      case 0:
        return !e.call(this);
      case 1:
        return !e.call(this, n[0]);
      case 2:
        return !e.call(this, n[0], n[1]);
      case 3:
        return !e.call(this, n[0], n[1], n[2]);
    }
    return !e.apply(this, n);
  };
}
function wd(e, n, t, r) {
  if (!K(e))
    return e;
  n = jt(n, e);
  for (var i = -1, a = n.length, f = a - 1, l = e; l != null && ++i < a; ) {
    var u = pt(n[i]), o = t;
    if (u === "__proto__" || u === "constructor" || u === "prototype")
      return e;
    if (i != f) {
      var s = l[u];
      o = void 0, o === void 0 && (o = K(s) ? s : Pt(n[i + 1]) ? [] : {});
    }
    Ii(l, u, o), l = l[u];
  }
  return e;
}
function Aa(e, n, t) {
  for (var r = -1, i = n.length, a = {}; ++r < i; ) {
    var f = n[r], l = Kt(e, f);
    t(l, f) && wd(a, jt(f, e), l);
  }
  return a;
}
function bd(e, n) {
  if (e == null)
    return {};
  var t = xe(Fu(e), function(r) {
    return [r];
  });
  return n = gt(n), Aa(e, t, function(r, i) {
    return n(r, i[0]);
  });
}
function md(e, n) {
  return bd(e, gd(gt(n)));
}
function xd(e, n) {
  var t = e.length;
  for (e.sort(n); t--; )
    e[t] = e[t].value;
  return e;
}
function vd(e, n) {
  if (e !== n) {
    var t = e !== void 0, r = e === null, i = e === e, a = ve(e), f = n !== void 0, l = n === null, u = n === n, o = ve(n);
    if (!l && !o && !a && e > n || a && f && u && !l && !o || r && f && u || !t && u || !i)
      return 1;
    if (!r && !a && !o && e < n || o && t && i && !r && !a || l && t && i || !f && i || !u)
      return -1;
  }
  return 0;
}
function yd(e, n, t) {
  for (var r = -1, i = e.criteria, a = n.criteria, f = i.length, l = t.length; ++r < f; ) {
    var u = vd(i[r], a[r]);
    if (u) {
      if (r >= l)
        return u;
      var o = t[r];
      return u * (o == "desc" ? -1 : 1);
    }
  }
  return e.index - n.index;
}
function Ed(e, n, t) {
  n.length ? n = xe(n, function(a) {
    return N(a) ? function(f) {
      return Kt(f, a.length === 1 ? a[0] : a);
    } : a;
  }) : n = [dt];
  var r = -1;
  n = xe(n, Pi(gt));
  var i = Sa(e, function(a, f, l) {
    var u = xe(n, function(o) {
      return o(a);
    });
    return { criteria: u, index: ++r, value: a };
  });
  return xd(i, function(a, f) {
    return yd(a, f, t);
  });
}
function Sd(e, n, t, r) {
  return e == null ? [] : (N(n) || (n = n == null ? [] : [n]), t = t, N(t) || (t = t == null ? [] : [t]), Ed(e, n, t));
}
function Ad(e, n) {
  return Aa(e, n, function(t, r) {
    return va(e, r);
  });
}
var Ta = rs(function(e, n) {
  return e == null ? {} : Ad(e, n);
}), Td = Math.ceil, zd = Math.max;
function kd(e, n, t, r) {
  for (var i = -1, a = zd(Td((n - e) / (t || 1)), 0), f = Array(a); a--; )
    f[++i] = e, e += t;
  return f;
}
function Rd(e) {
  return function(n, t, r) {
    return r && typeof r != "number" && Ni(n, t, r) && (t = r = void 0), n = Ie(n), t === void 0 ? (t = n, n = 0) : t = Ie(t), r = r === void 0 ? n < t ? 1 : -1 : Ie(r), kd(n, t, r);
  };
}
var Od = Rd(), Cd = 9007199254740991, fn = 4294967295, $d = Math.min;
function P(e, n) {
  if (e = Xo(e), e < 1 || e > Cd)
    return [];
  var t = fn, r = $d(e, fn);
  n = jc(n), e -= fn;
  for (var i = Li(r, n); ++t < e; )
    n(t);
  return i;
}
var Id = 1 / 0, Dd = De && 1 / Qn(new De([, -0]))[1] == Id ? function(e) {
  return new De(e);
} : dl, Nd = 200;
function Ld(e, n, t) {
  var r = -1, i = Sl, a = e.length, f = !0, l = [], u = l;
  if (a >= Nd) {
    var o = Dd(e);
    if (o)
      return Qn(o);
    f = !1, i = ga, u = new rt();
  } else
    u = l;
  e:
    for (; ++r < a; ) {
      var s = e[r], d = s;
      if (s = s !== 0 ? s : 0, f && d === d) {
        for (var c = u.length; c--; )
          if (u[c] === d)
            continue e;
        l.push(s);
      } else i(u, d, t) || (u !== l && u.push(d), l.push(s));
    }
  return l;
}
function Md(e) {
  return e && e.length ? Ld(e) : [];
}
const Ud = async (e) => {
  if (Md([...e].filter((i) => i < "0" || i > "9")).length > 1)
    return {
      matched: !1
    };
  const n = [...e].map((i) => i < "0" || i > "9" ? "0" : i).join(""), t = Math.sqrt(n.length);
  if (Math.trunc(t) !== t)
    return {
      matched: !0,
      error: `Grid string has unsupported length ${n.length}`,
      dataString: n
    };
  const r = [...n].find((i) => Number(i) > t);
  return r !== void 0 ? {
    matched: !0,
    error: `Grid of size ${t} can't contain digit ${r}`,
    dataString: n
  } : {
    matched: !0,
    constraints: n,
    dataString: n
  };
}, za = {
  format: H.GridString,
  urlPatterns: [],
  run: Ud
};
var $ = /* @__PURE__ */ ((e) => (e.Classic = "classic", e.Thermo = "thermo", e.Killer = "killer", e.Arrow = "arrow", e.Irregular = "irregular", e.Kropki = "kropki", e.TopBottom = "topbot", e.Diagonal = "diagonal", e.Mixed = "mixed", e.AntiKnight = "antiknight", e.AntiKing = "antiking", e.ExtraRegions = "extraregions", e.OddEven = "oddeven", e.Renban = "renban", e.Palindrome = "palindrome", e))($ || {});
const Vn = [4, 6, 9], In = (e, n) => Array.isArray(e) ? e.map((t) => In(t, n)) : e != null && e.constructor === Object ? Object.keys(e).reduce(
  (t, r) => ({
    ...t,
    [n(r)]: In(e[r], n)
  }),
  {}
) : e, ka = (e) => In(e, zu), Pd = (e) => e === 4 ? [2, 2] : e === 6 ? [2, 3] : [3, 3], wt = (e) => {
  const [n, t] = Pd(e);
  return Gi(
    P(e / n, (i) => P(e / t, (a) => Vc(
      P(n, (f) => P(t, (l) => ({
        row: i * n + f,
        col: a * t + l
      })))
    )))
  );
}, Zd = (e) => {
  if (e === null)
    return $.Classic;
  const n = [];
  return B(e.thermos) || n.push($.Thermo), B(e.arrows) || n.push($.Arrow), (e.primaryDiagonal || e.secondaryDiagonal) && n.push($.Diagonal), e.antiKnight && n.push($.AntiKnight), e.antiKing && n.push($.AntiKing), e.regions !== void 0 && !Dt(e.regions, wt(e.gridSize)) && n.push($.Irregular), B(e.killerCages) || n.push($.Killer), B(e.kropkiDots) || n.push($.Kropki), B(e.extraRegions) || n.push($.ExtraRegions), (!B(e.oddCells) || !B(e.evenCells)) && n.push($.OddEven), e.topBottom && n.push($.TopBottom), B(e.renbans) || n.push($.Renban), B(e.palindromes) || n.push($.Palindrome), n.length > 1 ? $.Mixed : n.length === 1 ? n[0] : $.Classic;
}, Dn = (e, n) => {
  const t = Array(e).fill(null).map(() => Array(e).fill(null));
  return n.forEach((r, i) => {
    for (const { row: a, col: f } of r)
      t[a][f] = i + 1;
  }), t;
}, Fd = (e, n) => {
  const t = [];
  return P(e, (r) => {
    P(e, (i) => {
      const a = n[r][i] - 1;
      t[a] ||= [];
      const f = { row: r, col: i };
      t[a].push(f);
    });
  }), t;
}, Wt = (e) => {
  const n = md(
    e,
    (t) => !ud(t) && (t === !1 || !id(t) && B(t))
  );
  return Dt(n.regions, wt(e.gridSize)) && delete n.regions, n;
}, Ra = (e) => ({
  dataString: e,
  url: `https://lisudoku.xyz/solver?import=${e}`
});
var er = { exports: {} };
er.exports;
(function(e) {
  var n = function() {
    var t = String.fromCharCode, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", a = {};
    function f(u, o) {
      if (!a[u]) {
        a[u] = {};
        for (var s = 0; s < u.length; s++)
          a[u][u.charAt(s)] = s;
      }
      return a[u][o];
    }
    var l = {
      compressToBase64: function(u) {
        if (u == null) return "";
        var o = l._compress(u, 6, function(s) {
          return r.charAt(s);
        });
        switch (o.length % 4) {
          default:
          case 0:
            return o;
          case 1:
            return o + "===";
          case 2:
            return o + "==";
          case 3:
            return o + "=";
        }
      },
      decompressFromBase64: function(u) {
        return u == null ? "" : u == "" ? null : l._decompress(u.length, 32, function(o) {
          return f(r, u.charAt(o));
        });
      },
      compressToUTF16: function(u) {
        return u == null ? "" : l._compress(u, 15, function(o) {
          return t(o + 32);
        }) + " ";
      },
      decompressFromUTF16: function(u) {
        return u == null ? "" : u == "" ? null : l._decompress(u.length, 16384, function(o) {
          return u.charCodeAt(o) - 32;
        });
      },
      //compress into uint8array (UCS-2 big endian format)
      compressToUint8Array: function(u) {
        for (var o = l.compress(u), s = new Uint8Array(o.length * 2), d = 0, c = o.length; d < c; d++) {
          var h = o.charCodeAt(d);
          s[d * 2] = h >>> 8, s[d * 2 + 1] = h % 256;
        }
        return s;
      },
      //decompress from uint8array (UCS-2 big endian format)
      decompressFromUint8Array: function(u) {
        if (u == null)
          return l.decompress(u);
        for (var o = new Array(u.length / 2), s = 0, d = o.length; s < d; s++)
          o[s] = u[s * 2] * 256 + u[s * 2 + 1];
        var c = [];
        return o.forEach(function(h) {
          c.push(t(h));
        }), l.decompress(c.join(""));
      },
      //compress into a string that is already URI encoded
      compressToEncodedURIComponent: function(u) {
        return u == null ? "" : l._compress(u, 6, function(o) {
          return i.charAt(o);
        });
      },
      //decompress from an output of compressToEncodedURIComponent
      decompressFromEncodedURIComponent: function(u) {
        return u == null ? "" : u == "" ? null : (u = u.replace(/ /g, "+"), l._decompress(u.length, 32, function(o) {
          return f(i, u.charAt(o));
        }));
      },
      compress: function(u) {
        return l._compress(u, 16, function(o) {
          return t(o);
        });
      },
      _compress: function(u, o, s) {
        if (u == null) return "";
        var d, c, h = {}, w = {}, S = "", E = "", m = "", y = 2, x = 3, _ = 2, v = [], g = 0, p = 0, b;
        for (b = 0; b < u.length; b += 1)
          if (S = u.charAt(b), Object.prototype.hasOwnProperty.call(h, S) || (h[S] = x++, w[S] = !0), E = m + S, Object.prototype.hasOwnProperty.call(h, E))
            m = E;
          else {
            if (Object.prototype.hasOwnProperty.call(w, m)) {
              if (m.charCodeAt(0) < 256) {
                for (d = 0; d < _; d++)
                  g = g << 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++;
                for (c = m.charCodeAt(0), d = 0; d < 8; d++)
                  g = g << 1 | c & 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = c >> 1;
              } else {
                for (c = 1, d = 0; d < _; d++)
                  g = g << 1 | c, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = 0;
                for (c = m.charCodeAt(0), d = 0; d < 16; d++)
                  g = g << 1 | c & 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = c >> 1;
              }
              y--, y == 0 && (y = Math.pow(2, _), _++), delete w[m];
            } else
              for (c = h[m], d = 0; d < _; d++)
                g = g << 1 | c & 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = c >> 1;
            y--, y == 0 && (y = Math.pow(2, _), _++), h[E] = x++, m = String(S);
          }
        if (m !== "") {
          if (Object.prototype.hasOwnProperty.call(w, m)) {
            if (m.charCodeAt(0) < 256) {
              for (d = 0; d < _; d++)
                g = g << 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++;
              for (c = m.charCodeAt(0), d = 0; d < 8; d++)
                g = g << 1 | c & 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = c >> 1;
            } else {
              for (c = 1, d = 0; d < _; d++)
                g = g << 1 | c, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = 0;
              for (c = m.charCodeAt(0), d = 0; d < 16; d++)
                g = g << 1 | c & 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = c >> 1;
            }
            y--, y == 0 && (y = Math.pow(2, _), _++), delete w[m];
          } else
            for (c = h[m], d = 0; d < _; d++)
              g = g << 1 | c & 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = c >> 1;
          y--, y == 0 && (y = Math.pow(2, _), _++);
        }
        for (c = 2, d = 0; d < _; d++)
          g = g << 1 | c & 1, p == o - 1 ? (p = 0, v.push(s(g)), g = 0) : p++, c = c >> 1;
        for (; ; )
          if (g = g << 1, p == o - 1) {
            v.push(s(g));
            break;
          } else p++;
        return v.join("");
      },
      decompress: function(u) {
        return u == null ? "" : u == "" ? null : l._decompress(u.length, 32768, function(o) {
          return u.charCodeAt(o);
        });
      },
      _decompress: function(u, o, s) {
        var d = [], c = 4, h = 4, w = 3, S = "", E = [], m, y, x, _, v, g, p, b = { val: s(0), position: o, index: 1 };
        for (m = 0; m < 3; m += 1)
          d[m] = m;
        for (x = 0, v = Math.pow(2, 2), g = 1; g != v; )
          _ = b.val & b.position, b.position >>= 1, b.position == 0 && (b.position = o, b.val = s(b.index++)), x |= (_ > 0 ? 1 : 0) * g, g <<= 1;
        switch (x) {
          case 0:
            for (x = 0, v = Math.pow(2, 8), g = 1; g != v; )
              _ = b.val & b.position, b.position >>= 1, b.position == 0 && (b.position = o, b.val = s(b.index++)), x |= (_ > 0 ? 1 : 0) * g, g <<= 1;
            p = t(x);
            break;
          case 1:
            for (x = 0, v = Math.pow(2, 16), g = 1; g != v; )
              _ = b.val & b.position, b.position >>= 1, b.position == 0 && (b.position = o, b.val = s(b.index++)), x |= (_ > 0 ? 1 : 0) * g, g <<= 1;
            p = t(x);
            break;
          case 2:
            return "";
        }
        for (d[3] = p, y = p, E.push(p); ; ) {
          if (b.index > u)
            return "";
          for (x = 0, v = Math.pow(2, w), g = 1; g != v; )
            _ = b.val & b.position, b.position >>= 1, b.position == 0 && (b.position = o, b.val = s(b.index++)), x |= (_ > 0 ? 1 : 0) * g, g <<= 1;
          switch (p = x) {
            case 0:
              for (x = 0, v = Math.pow(2, 8), g = 1; g != v; )
                _ = b.val & b.position, b.position >>= 1, b.position == 0 && (b.position = o, b.val = s(b.index++)), x |= (_ > 0 ? 1 : 0) * g, g <<= 1;
              d[h++] = t(x), p = h - 1, c--;
              break;
            case 1:
              for (x = 0, v = Math.pow(2, 16), g = 1; g != v; )
                _ = b.val & b.position, b.position >>= 1, b.position == 0 && (b.position = o, b.val = s(b.index++)), x |= (_ > 0 ? 1 : 0) * g, g <<= 1;
              d[h++] = t(x), p = h - 1, c--;
              break;
            case 2:
              return E.join("");
          }
          if (c == 0 && (c = Math.pow(2, w), w++), d[p])
            S = d[p];
          else if (p === h)
            S = y + y.charAt(0);
          else
            return null;
          E.push(S), d[h++] = y + S.charAt(0), c--, y = S, c == 0 && (c = Math.pow(2, w), w++);
        }
      }
    };
    return l;
  }();
  e != null ? e.exports = n : typeof angular < "u" && angular != null && angular.module("LZString", []).factory("LZString", function() {
    return n;
  });
})(er);
var Jt = er.exports;
const Bd = (e, n) => n instanceof Object && !(n instanceof Array) ? Object.keys(n).sort().reduce((t, r) => (t[r] = n[r], t), {}) : n, Hd = (e) => JSON.stringify(e, Bd), Gd = (e) => {
  const n = tr.transformFromLisudoku(e);
  if (n.error === void 0)
    return n.constraints;
  const t = Wt(e), r = Hd(t);
  return encodeURIComponent(Jt.compressToBase64(r));
}, Ze = (e) => {
  const n = Gd(e);
  return {
    dataString: n,
    url: `https://lisudoku.xyz/solver?import=${n}`
  };
}, Oa = (e) => Math.sqrt(e.length), jd = (e) => Array(e).fill(null).map(() => Array(e).fill(null)), Kd = (e) => {
  const n = Oa(e), t = jd(n);
  for (let r = 0; r < n; r++)
    for (let i = 0; i < n; i++) {
      const a = r * n + i;
      e[a] !== "0" && (t[r][i] = parseInt(e[a]));
    }
  return t;
}, Xd = (e) => {
  const n = [];
  return e.forEach((t, r) => {
    t.forEach((i, a) => {
      i !== null && n.push({
        position: {
          row: r,
          col: a
        },
        value: i
      });
    });
  }), n;
}, Yd = (e) => {
  const n = Kd(e);
  return Xd(n);
}, Wd = (e) => {
  const n = Oa(e);
  if (!Vn.includes(n))
    return {
      error: `Invalid grid size ${n}.`
    };
  const t = Yd(e), i = Wt({
    gridSize: n,
    fixedNumbers: t
  });
  return {
    constraints: i,
    ...Ze(i)
  };
}, Jd = (e) => {
  let n = "";
  return e.forEach((t) => {
    t.forEach((r) => {
      n += r !== null ? r : 0;
    });
  }), n;
}, qd = (e, n) => {
  const t = Qd(e, n);
  return Jd(t);
}, Qd = (e, n) => {
  const t = Array(e).fill(null).map(() => Array(e).fill(null));
  for (const r of n ?? [])
    t[r.position.row][r.position.col] = r.value;
  return t;
}, Vd = (e) => {
  if (Zd(e) !== $.Classic)
    return {
      error: "Can only convert classic sudoku into grid string"
    };
  const t = qd(e.gridSize, e.fixedNumbers);
  return {
    constraints: t,
    ...Ra(t)
  };
}, tr = {
  transformToLisudoku: Wd,
  transformFromLisudoku: Vd
}, e0 = "https://api.lisudoku.xyz/api", Ca = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/e\?import=(.+)$/, $a = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/solver\?import=(.+)$/, Ia = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/p\/(.+)$/, t0 = [
  Ca,
  $a,
  Ia
], Da = async (e) => {
  const n = await za.run(e);
  if (n.matched) {
    if (n.error !== void 0)
      return {
        error: n.error
      };
    const a = tr.transformToLisudoku(n.constraints);
    return a.error !== void 0 ? {
      error: a.error
    } : {
      constraints: a.constraints
    };
  }
  let t;
  try {
    t = Jt.decompressFromBase64(decodeURIComponent(e));
  } finally {
    if (t == null || t === "")
      return {
        error: "Error while parsing inline data"
      };
  }
  let r;
  try {
    r = JSON.parse(t);
  } catch {
    return {
      error: "Error while parsing constraint json"
    };
  }
  const i = ka(r);
  return "gridSize" in i ? {
    constraints: i
  } : {
    error: 'Invalid constraints json schema: "gridSize" not found'
  };
}, n0 = async (e) => {
  let n = e.match(Ca);
  if (n || (n = e.match($a)), !n)
    return {
      matched: !1
    };
  const t = n[1], r = await Da(t);
  return {
    matched: !0,
    dataString: t,
    ...r
  };
}, r0 = async (e) => {
  const n = await Da(e);
  return n.error ? {
    matched: !1
  } : {
    matched: !0,
    dataString: e,
    ...n
  };
}, i0 = async (e) => {
  let n = e.match(Ia);
  if (!n)
    return {
      matched: !1
    };
  const t = n[1], r = await fetch(`${e0}/puzzles/${t}`);
  if (r.status !== 200) {
    let f;
    return r.status === 404 ? f = `[lisudoku] Puzzle with id ${t} not found.` : f = `[lisudoku] Request for puzzle with id ${t} failed.`, {
      matched: !0,
      dataString: "",
      error: f
    };
  }
  const i = await r.json();
  return {
    matched: !0,
    dataString: "",
    // TODO: compute it?
    constraints: ka(i).constraints
  };
}, a0 = async (e) => {
  let n = await n0(e);
  return n.matched || (n = await r0(e), n.matched) ? n : i0(e);
}, o0 = {
  format: H.Lisudoku,
  urlPatterns: t0,
  run: a0
}, l0 = (e) => ({
  constraints: e,
  ...Ze(e)
}), f0 = (e) => ({
  constraints: e,
  ...Ze(e)
}), s0 = {
  transformToLisudoku: l0,
  transformFromLisudoku: f0
}, Na = /^(?:https:\/\/)?(?:www\.)?f-puzzles\.com\/\?load=(.+)$/, u0 = /^(?:https:\/\/)?(?:www\.)?f-puzzles\.com\/\?id=(.+)$/, c0 = [
  Na,
  u0
], La = (e) => {
  let n;
  try {
    n = Jt.decompressFromBase64(e);
  } finally {
    if (n == null || n === "")
      return {
        error: "Error while parsing inline data"
      };
  }
  let t;
  try {
    t = JSON.parse(n);
  } catch {
    return {
      error: "Error while parsing constraint json"
    };
  }
  return "size" in t ? {
    constraints: t
  } : {
    error: 'Invalid constraints json schema: "size" not found'
  };
}, d0 = (e) => {
  const n = e.match(Na);
  if (!n)
    return {
      matched: !1
    };
  const t = n[1], r = La(t);
  return {
    matched: !0,
    dataString: t,
    ...r
  };
}, h0 = (e) => {
  const n = La(e);
  return n.error ? {
    matched: !1
  } : {
    matched: !0,
    dataString: e,
    ...n
  };
}, _0 = async (e) => {
  let n = d0(e);
  return n.matched || (n = h0(e), n.matched) ? n : {
    matched: !1
  };
}, p0 = {
  format: H.Fpuzzles,
  urlPatterns: c0,
  run: _0
}, Ma = (e) => {
  const n = JSON.stringify(e), t = Jt.compressToBase64(n);
  return {
    dataString: t,
    url: `https://f-puzzles.com/?load=${t}`
  };
}, g0 = [
  "disjointgroups",
  "littlekillersum",
  "minimum",
  "maximum",
  "rowindexer",
  "columnindexer",
  "boxindexer",
  "whispers",
  "regionsumline",
  "xv",
  "clone",
  "quadruple",
  "betweenline",
  "sandwichsum",
  "xsum",
  "skyscraper",
  "entropicline",
  "cage",
  "text"
  // Removed 'disabledlogic' and 'truecandidatesoptions' because they seem related to the solver
], ie = (e) => ({
  row: Number.parseInt(e[1]) - 1,
  col: Number.parseInt(e[3]) - 1
}), Ke = (e) => e.map((n) => ie(n)), M = (e) => `R${e.row + 1}C${e.col + 1}`, w0 = (e) => {
  const n = [], t = e.size;
  if (!Vn.includes(t))
    return {
      error: `Invalid grid size ${t}.`
    };
  const r = [];
  P(t, (d) => {
    P(t, (c) => {
      const h = e.grid[d][c];
      if (h.value) {
        const w = {
          position: {
            row: d,
            col: c
          },
          value: h.value
        };
        r.push(w);
      }
    });
  });
  const i = wt(t), a = Dn(t, i);
  P(t, (d) => {
    P(t, (c) => {
      const h = e.grid[d][c].region;
      h !== void 0 && (a[d][c] = h + 1);
    });
  });
  const f = Fd(t, a), l = [];
  for (const { cells: d, value: c } of e.difference ?? []) {
    if (c !== void 0) {
      n.push("difference");
      continue;
    }
    const h = {
      dotType: "Consecutive",
      cell1: ie(d[0]),
      cell2: ie(d[1])
    };
    l.push(h);
  }
  for (const { cells: d, value: c } of e.ratio ?? []) {
    if (c !== void 0) {
      n.push("ratio");
      continue;
    }
    const h = {
      dotType: "Double",
      cell1: ie(d[0]),
      cell2: ie(d[1])
    };
    l.push(h);
  }
  n.push(
    ...g0.filter((d) => e[d] !== void 0)
  );
  const u = {
    gridSize: t,
    fixedNumbers: r,
    regions: f,
    extraRegions: (e.extraregion ?? []).map(({ cells: d }) => Ke(d)),
    thermos: an(e.thermometer ?? [], ({ lines: d }) => d.map((c) => Ke(c))),
    arrows: (e.arrow ?? []).map(({ cells: d, lines: c }) => ({
      circleCells: d.map(ie),
      // TODO: multiple lines not implemented
      arrowCells: c[0].slice(1).map(ie)
    })),
    primaryDiagonal: !!e["diagonal-"],
    secondaryDiagonal: !!e["diagonal+"],
    antiKnight: !!e.antiknight,
    antiKing: !!e.antiking,
    killerCages: (e.killercage ?? []).map(({ cells: d, value: c }) => ({
      sum: c === void 0 ? null : Number.parseInt(c),
      region: Ke(d)
    })),
    kropkiDots: l,
    kropkiNegative: !B(e.negative) && e.negative?.includes("ratio") || !!e.nonconsecutive,
    oddCells: (e.odd ?? []).map(({ cell: d }) => ie(d)),
    evenCells: (e.even ?? []).map(({ cell: d }) => ie(d)),
    topBottom: !1,
    renbans: an(e.renban ?? [], ({ lines: d }) => d.map(Ke)),
    palindromes: an(e.palindrome ?? [], ({ lines: d }) => d.map(Ke))
  }, o = Wt(u), s = {
    constraints: o,
    ...Ze(o)
  };
  return n.length > 0 && (s.warning = "Ignored some constraints: " + n.join(", ")), s;
}, b0 = (e) => {
  const n = e.gridSize, t = Array(n).fill(null).map(() => Array(n).fill(null).map(() => ({}))), r = wt(n), i = Dn(n, e.regions ?? r), a = Dn(n, r);
  P(n, (l) => {
    P(n, (u) => {
      i[l][u] !== a[l][u] && (t[l][u].region = i[l][u] - 1);
    });
  });
  for (const { value: l, position: { row: u, col: o } } of e.fixedNumbers ?? [])
    t[u][o].value = l, t[u][o].given = !0;
  const f = {
    size: n,
    grid: t,
    extraregion: e.extraRegions?.map((l) => ({ cells: l.map(M) })),
    thermometer: e.thermos?.map((l) => ({ lines: [l.map(M)] })),
    arrow: e.arrows?.map((l) => ({
      cells: l.circleCells.map(M),
      lines: [[
        M(_d(l.circleCells, (u) => Math.abs(l.arrowCells[0].row - u.row) + Math.abs(l.arrowCells[0].col - u.col))),
        ...l.arrowCells.map(M)
      ]]
    })),
    "diagonal+": e.primaryDiagonal,
    "diagonal-": e.secondaryDiagonal,
    antiknight: e.antiKnight,
    antiking: e.antiKing,
    difference: e.kropkiDots?.filter(({ dotType: l }) => l === "Consecutive").map(({ cell1: l, cell2: u }) => ({
      cells: [M(l), M(u)]
      // value ignored, not implemented
    })),
    ratio: e.kropkiDots?.filter(({ dotType: l }) => l === "Double").map(({ cell1: l, cell2: u }) => ({
      cells: [M(l), M(u)]
      // value ignored, not implemented
    })),
    odd: e.oddCells?.map((l) => ({ cell: M(l) })),
    even: e.evenCells?.map((l) => ({ cell: M(l) })),
    killercage: e.killerCages?.map((l) => ({
      cells: l.region.map(M),
      value: l.sum === null ? void 0 : l.sum.toString()
    })),
    ...e.kropkiNegative ? { nonconsecutive: !0 } : {},
    // shady
    // negative: [], // probably should include something here
    renban: e.renbans?.map((l) => ({
      lines: [l.map(M)]
    })),
    palindrome: e.palindromes?.map((l) => ({
      lines: [l.map(M)]
    })),
    line: [
      ...(e.renbans ?? []).map((l) => ({
        lines: [l.map(M)],
        outlineC: "gray",
        width: 0.2,
        isNewConstraint: !0
      }))
    ]
  };
  return {
    constraints: f,
    ...Ma(f)
  };
}, m0 = {
  transformToLisudoku: w0,
  transformFromLisudoku: b0
};
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const x0 = 4, Fr = 0, Br = 1, v0 = 2;
function Fe(e) {
  let n = e.length;
  for (; --n >= 0; )
    e[n] = 0;
}
const y0 = 0, Ua = 1, E0 = 2, S0 = 3, A0 = 258, nr = 29, bt = 256, it = bt + 1 + nr, Ne = 30, rr = 19, Pa = 2 * it + 1, we = 15, sn = 16, T0 = 7, ir = 256, Za = 16, Fa = 17, Ba = 18, Nn = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
), Ot = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
), z0 = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
), Ha = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), k0 = 512, ae = new Array((it + 2) * 2);
Fe(ae);
const qe = new Array(Ne * 2);
Fe(qe);
const at = new Array(k0);
Fe(at);
const ot = new Array(A0 - S0 + 1);
Fe(ot);
const ar = new Array(nr);
Fe(ar);
const Nt = new Array(Ne);
Fe(Nt);
function un(e, n, t, r, i) {
  this.static_tree = e, this.extra_bits = n, this.extra_base = t, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
}
let Ga, ja, Ka;
function cn(e, n) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = n;
}
const Xa = (e) => e < 256 ? at[e] : at[256 + (e >>> 7)], lt = (e, n) => {
  e.pending_buf[e.pending++] = n & 255, e.pending_buf[e.pending++] = n >>> 8 & 255;
}, Z = (e, n, t) => {
  e.bi_valid > sn - t ? (e.bi_buf |= n << e.bi_valid & 65535, lt(e, e.bi_buf), e.bi_buf = n >> sn - e.bi_valid, e.bi_valid += t - sn) : (e.bi_buf |= n << e.bi_valid & 65535, e.bi_valid += t);
}, J = (e, n, t) => {
  Z(
    e,
    t[n * 2],
    t[n * 2 + 1]
    /*.Len*/
  );
}, Ya = (e, n) => {
  let t = 0;
  do
    t |= e & 1, e >>>= 1, t <<= 1;
  while (--n > 0);
  return t >>> 1;
}, R0 = (e) => {
  e.bi_valid === 16 ? (lt(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}, O0 = (e, n) => {
  const t = n.dyn_tree, r = n.max_code, i = n.stat_desc.static_tree, a = n.stat_desc.has_stree, f = n.stat_desc.extra_bits, l = n.stat_desc.extra_base, u = n.stat_desc.max_length;
  let o, s, d, c, h, w, S = 0;
  for (c = 0; c <= we; c++)
    e.bl_count[c] = 0;
  for (t[e.heap[e.heap_max] * 2 + 1] = 0, o = e.heap_max + 1; o < Pa; o++)
    s = e.heap[o], c = t[t[s * 2 + 1] * 2 + 1] + 1, c > u && (c = u, S++), t[s * 2 + 1] = c, !(s > r) && (e.bl_count[c]++, h = 0, s >= l && (h = f[s - l]), w = t[s * 2], e.opt_len += w * (c + h), a && (e.static_len += w * (i[s * 2 + 1] + h)));
  if (S !== 0) {
    do {
      for (c = u - 1; e.bl_count[c] === 0; )
        c--;
      e.bl_count[c]--, e.bl_count[c + 1] += 2, e.bl_count[u]--, S -= 2;
    } while (S > 0);
    for (c = u; c !== 0; c--)
      for (s = e.bl_count[c]; s !== 0; )
        d = e.heap[--o], !(d > r) && (t[d * 2 + 1] !== c && (e.opt_len += (c - t[d * 2 + 1]) * t[d * 2], t[d * 2 + 1] = c), s--);
  }
}, Wa = (e, n, t) => {
  const r = new Array(we + 1);
  let i = 0, a, f;
  for (a = 1; a <= we; a++)
    i = i + t[a - 1] << 1, r[a] = i;
  for (f = 0; f <= n; f++) {
    let l = e[f * 2 + 1];
    l !== 0 && (e[f * 2] = Ya(r[l]++, l));
  }
}, C0 = () => {
  let e, n, t, r, i;
  const a = new Array(we + 1);
  for (t = 0, r = 0; r < nr - 1; r++)
    for (ar[r] = t, e = 0; e < 1 << Nn[r]; e++)
      ot[t++] = r;
  for (ot[t - 1] = r, i = 0, r = 0; r < 16; r++)
    for (Nt[r] = i, e = 0; e < 1 << Ot[r]; e++)
      at[i++] = r;
  for (i >>= 7; r < Ne; r++)
    for (Nt[r] = i << 7, e = 0; e < 1 << Ot[r] - 7; e++)
      at[256 + i++] = r;
  for (n = 0; n <= we; n++)
    a[n] = 0;
  for (e = 0; e <= 143; )
    ae[e * 2 + 1] = 8, e++, a[8]++;
  for (; e <= 255; )
    ae[e * 2 + 1] = 9, e++, a[9]++;
  for (; e <= 279; )
    ae[e * 2 + 1] = 7, e++, a[7]++;
  for (; e <= 287; )
    ae[e * 2 + 1] = 8, e++, a[8]++;
  for (Wa(ae, it + 1, a), e = 0; e < Ne; e++)
    qe[e * 2 + 1] = 5, qe[e * 2] = Ya(e, 5);
  Ga = new un(ae, Nn, bt + 1, it, we), ja = new un(qe, Ot, 0, Ne, we), Ka = new un(new Array(0), z0, 0, rr, T0);
}, Ja = (e) => {
  let n;
  for (n = 0; n < it; n++)
    e.dyn_ltree[n * 2] = 0;
  for (n = 0; n < Ne; n++)
    e.dyn_dtree[n * 2] = 0;
  for (n = 0; n < rr; n++)
    e.bl_tree[n * 2] = 0;
  e.dyn_ltree[ir * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
}, qa = (e) => {
  e.bi_valid > 8 ? lt(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}, Hr = (e, n, t, r) => {
  const i = n * 2, a = t * 2;
  return e[i] < e[a] || e[i] === e[a] && r[n] <= r[t];
}, dn = (e, n, t) => {
  const r = e.heap[t];
  let i = t << 1;
  for (; i <= e.heap_len && (i < e.heap_len && Hr(n, e.heap[i + 1], e.heap[i], e.depth) && i++, !Hr(n, r, e.heap[i], e.depth)); )
    e.heap[t] = e.heap[i], t = i, i <<= 1;
  e.heap[t] = r;
}, Gr = (e, n, t) => {
  let r, i, a = 0, f, l;
  if (e.sym_next !== 0)
    do
      r = e.pending_buf[e.sym_buf + a++] & 255, r += (e.pending_buf[e.sym_buf + a++] & 255) << 8, i = e.pending_buf[e.sym_buf + a++], r === 0 ? J(e, i, n) : (f = ot[i], J(e, f + bt + 1, n), l = Nn[f], l !== 0 && (i -= ar[f], Z(e, i, l)), r--, f = Xa(r), J(e, f, t), l = Ot[f], l !== 0 && (r -= Nt[f], Z(e, r, l)));
    while (a < e.sym_next);
  J(e, ir, n);
}, Ln = (e, n) => {
  const t = n.dyn_tree, r = n.stat_desc.static_tree, i = n.stat_desc.has_stree, a = n.stat_desc.elems;
  let f, l, u = -1, o;
  for (e.heap_len = 0, e.heap_max = Pa, f = 0; f < a; f++)
    t[f * 2] !== 0 ? (e.heap[++e.heap_len] = u = f, e.depth[f] = 0) : t[f * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    o = e.heap[++e.heap_len] = u < 2 ? ++u : 0, t[o * 2] = 1, e.depth[o] = 0, e.opt_len--, i && (e.static_len -= r[o * 2 + 1]);
  for (n.max_code = u, f = e.heap_len >> 1; f >= 1; f--)
    dn(e, t, f);
  o = a;
  do
    f = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], dn(
      e,
      t,
      1
      /*SMALLEST*/
    ), l = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[--e.heap_max] = f, e.heap[--e.heap_max] = l, t[o * 2] = t[f * 2] + t[l * 2], e.depth[o] = (e.depth[f] >= e.depth[l] ? e.depth[f] : e.depth[l]) + 1, t[f * 2 + 1] = t[l * 2 + 1] = o, e.heap[
      1
      /*SMALLEST*/
    ] = o++, dn(
      e,
      t,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], O0(e, n), Wa(t, u, e.bl_count);
}, jr = (e, n, t) => {
  let r, i = -1, a, f = n[0 * 2 + 1], l = 0, u = 7, o = 4;
  for (f === 0 && (u = 138, o = 3), n[(t + 1) * 2 + 1] = 65535, r = 0; r <= t; r++)
    a = f, f = n[(r + 1) * 2 + 1], !(++l < u && a === f) && (l < o ? e.bl_tree[a * 2] += l : a !== 0 ? (a !== i && e.bl_tree[a * 2]++, e.bl_tree[Za * 2]++) : l <= 10 ? e.bl_tree[Fa * 2]++ : e.bl_tree[Ba * 2]++, l = 0, i = a, f === 0 ? (u = 138, o = 3) : a === f ? (u = 6, o = 3) : (u = 7, o = 4));
}, Kr = (e, n, t) => {
  let r, i = -1, a, f = n[0 * 2 + 1], l = 0, u = 7, o = 4;
  for (f === 0 && (u = 138, o = 3), r = 0; r <= t; r++)
    if (a = f, f = n[(r + 1) * 2 + 1], !(++l < u && a === f)) {
      if (l < o)
        do
          J(e, a, e.bl_tree);
        while (--l !== 0);
      else a !== 0 ? (a !== i && (J(e, a, e.bl_tree), l--), J(e, Za, e.bl_tree), Z(e, l - 3, 2)) : l <= 10 ? (J(e, Fa, e.bl_tree), Z(e, l - 3, 3)) : (J(e, Ba, e.bl_tree), Z(e, l - 11, 7));
      l = 0, i = a, f === 0 ? (u = 138, o = 3) : a === f ? (u = 6, o = 3) : (u = 7, o = 4);
    }
}, $0 = (e) => {
  let n;
  for (jr(e, e.dyn_ltree, e.l_desc.max_code), jr(e, e.dyn_dtree, e.d_desc.max_code), Ln(e, e.bl_desc), n = rr - 1; n >= 3 && e.bl_tree[Ha[n] * 2 + 1] === 0; n--)
    ;
  return e.opt_len += 3 * (n + 1) + 5 + 5 + 4, n;
}, I0 = (e, n, t, r) => {
  let i;
  for (Z(e, n - 257, 5), Z(e, t - 1, 5), Z(e, r - 4, 4), i = 0; i < r; i++)
    Z(e, e.bl_tree[Ha[i] * 2 + 1], 3);
  Kr(e, e.dyn_ltree, n - 1), Kr(e, e.dyn_dtree, t - 1);
}, D0 = (e) => {
  let n = 4093624447, t;
  for (t = 0; t <= 31; t++, n >>>= 1)
    if (n & 1 && e.dyn_ltree[t * 2] !== 0)
      return Fr;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return Br;
  for (t = 32; t < bt; t++)
    if (e.dyn_ltree[t * 2] !== 0)
      return Br;
  return Fr;
};
let Xr = !1;
const N0 = (e) => {
  Xr || (C0(), Xr = !0), e.l_desc = new cn(e.dyn_ltree, Ga), e.d_desc = new cn(e.dyn_dtree, ja), e.bl_desc = new cn(e.bl_tree, Ka), e.bi_buf = 0, e.bi_valid = 0, Ja(e);
}, Qa = (e, n, t, r) => {
  Z(e, (y0 << 1) + (r ? 1 : 0), 3), qa(e), lt(e, t), lt(e, ~t), t && e.pending_buf.set(e.window.subarray(n, n + t), e.pending), e.pending += t;
}, L0 = (e) => {
  Z(e, Ua << 1, 3), J(e, ir, ae), R0(e);
}, M0 = (e, n, t, r) => {
  let i, a, f = 0;
  e.level > 0 ? (e.strm.data_type === v0 && (e.strm.data_type = D0(e)), Ln(e, e.l_desc), Ln(e, e.d_desc), f = $0(e), i = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = t + 5, t + 4 <= i && n !== -1 ? Qa(e, n, t, r) : e.strategy === x0 || a === i ? (Z(e, (Ua << 1) + (r ? 1 : 0), 3), Gr(e, ae, qe)) : (Z(e, (E0 << 1) + (r ? 1 : 0), 3), I0(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, f + 1), Gr(e, e.dyn_ltree, e.dyn_dtree)), Ja(e), r && qa(e);
}, U0 = (e, n, t) => (e.pending_buf[e.sym_buf + e.sym_next++] = n, e.pending_buf[e.sym_buf + e.sym_next++] = n >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = t, n === 0 ? e.dyn_ltree[t * 2]++ : (e.matches++, n--, e.dyn_ltree[(ot[t] + bt + 1) * 2]++, e.dyn_dtree[Xa(n) * 2]++), e.sym_next === e.sym_end);
var P0 = N0, Z0 = Qa, F0 = M0, B0 = U0, H0 = L0, G0 = {
  _tr_init: P0,
  _tr_stored_block: Z0,
  _tr_flush_block: F0,
  _tr_tally: B0,
  _tr_align: H0
};
const j0 = (e, n, t, r) => {
  let i = e & 65535 | 0, a = e >>> 16 & 65535 | 0, f = 0;
  for (; t !== 0; ) {
    f = t > 2e3 ? 2e3 : t, t -= f;
    do
      i = i + n[r++] | 0, a = a + i | 0;
    while (--f);
    i %= 65521, a %= 65521;
  }
  return i | a << 16 | 0;
};
var ft = j0;
const K0 = () => {
  let e, n = [];
  for (var t = 0; t < 256; t++) {
    e = t;
    for (var r = 0; r < 8; r++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    n[t] = e;
  }
  return n;
}, X0 = new Uint32Array(K0()), Y0 = (e, n, t, r) => {
  const i = X0, a = r + t;
  e ^= -1;
  for (let f = r; f < a; f++)
    e = e >>> 8 ^ i[(e ^ n[f]) & 255];
  return e ^ -1;
};
var I = Y0, Ee = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, Be = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const { _tr_init: W0, _tr_stored_block: Mn, _tr_flush_block: J0, _tr_tally: he, _tr_align: q0 } = G0, {
  Z_NO_FLUSH: _e,
  Z_PARTIAL_FLUSH: Q0,
  Z_FULL_FLUSH: V0,
  Z_FINISH: j,
  Z_BLOCK: Yr,
  Z_OK: D,
  Z_STREAM_END: Wr,
  Z_STREAM_ERROR: Q,
  Z_DATA_ERROR: eh,
  Z_BUF_ERROR: hn,
  Z_DEFAULT_COMPRESSION: th,
  Z_FILTERED: nh,
  Z_HUFFMAN_ONLY: At,
  Z_RLE: rh,
  Z_FIXED: ih,
  Z_DEFAULT_STRATEGY: ah,
  Z_UNKNOWN: oh,
  Z_DEFLATED: qt
} = Be, lh = 9, fh = 15, sh = 8, uh = 29, ch = 256, Un = ch + 1 + uh, dh = 30, hh = 19, _h = 2 * Un + 1, ph = 15, z = 3, de = 258, V = de + z + 1, gh = 32, Me = 42, or = 57, Pn = 69, Zn = 73, Fn = 91, Bn = 103, be = 113, Ye = 666, U = 1, He = 2, Se = 3, Ge = 4, wh = 3, me = (e, n) => (e.msg = Ee[n], n), Jr = (e) => e * 2 - (e > 4 ? 9 : 0), ue = (e) => {
  let n = e.length;
  for (; --n >= 0; )
    e[n] = 0;
}, bh = (e) => {
  let n, t, r, i = e.w_size;
  n = e.hash_size, r = n;
  do
    t = e.head[--r], e.head[r] = t >= i ? t - i : 0;
  while (--n);
  n = i, r = n;
  do
    t = e.prev[--r], e.prev[r] = t >= i ? t - i : 0;
  while (--n);
};
let mh = (e, n, t) => (n << e.hash_shift ^ t) & e.hash_mask, pe = mh;
const F = (e) => {
  const n = e.state;
  let t = n.pending;
  t > e.avail_out && (t = e.avail_out), t !== 0 && (e.output.set(n.pending_buf.subarray(n.pending_out, n.pending_out + t), e.next_out), e.next_out += t, n.pending_out += t, e.total_out += t, e.avail_out -= t, n.pending -= t, n.pending === 0 && (n.pending_out = 0));
}, G = (e, n) => {
  J0(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, n), e.block_start = e.strstart, F(e.strm);
}, R = (e, n) => {
  e.pending_buf[e.pending++] = n;
}, Xe = (e, n) => {
  e.pending_buf[e.pending++] = n >>> 8 & 255, e.pending_buf[e.pending++] = n & 255;
}, Hn = (e, n, t, r) => {
  let i = e.avail_in;
  return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, n.set(e.input.subarray(e.next_in, e.next_in + i), t), e.state.wrap === 1 ? e.adler = ft(e.adler, n, i, t) : e.state.wrap === 2 && (e.adler = I(e.adler, n, i, t)), e.next_in += i, e.total_in += i, i);
}, Va = (e, n) => {
  let t = e.max_chain_length, r = e.strstart, i, a, f = e.prev_length, l = e.nice_match;
  const u = e.strstart > e.w_size - V ? e.strstart - (e.w_size - V) : 0, o = e.window, s = e.w_mask, d = e.prev, c = e.strstart + de;
  let h = o[r + f - 1], w = o[r + f];
  e.prev_length >= e.good_match && (t >>= 2), l > e.lookahead && (l = e.lookahead);
  do
    if (i = n, !(o[i + f] !== w || o[i + f - 1] !== h || o[i] !== o[r] || o[++i] !== o[r + 1])) {
      r += 2, i++;
      do
        ;
      while (o[++r] === o[++i] && o[++r] === o[++i] && o[++r] === o[++i] && o[++r] === o[++i] && o[++r] === o[++i] && o[++r] === o[++i] && o[++r] === o[++i] && o[++r] === o[++i] && r < c);
      if (a = de - (c - r), r = c - de, a > f) {
        if (e.match_start = n, f = a, a >= l)
          break;
        h = o[r + f - 1], w = o[r + f];
      }
    }
  while ((n = d[n & s]) > u && --t !== 0);
  return f <= e.lookahead ? f : e.lookahead;
}, Ue = (e) => {
  const n = e.w_size;
  let t, r, i;
  do {
    if (r = e.window_size - e.lookahead - e.strstart, e.strstart >= n + (n - V) && (e.window.set(e.window.subarray(n, n + n - r), 0), e.match_start -= n, e.strstart -= n, e.block_start -= n, e.insert > e.strstart && (e.insert = e.strstart), bh(e), r += n), e.strm.avail_in === 0)
      break;
    if (t = Hn(e.strm, e.window, e.strstart + e.lookahead, r), e.lookahead += t, e.lookahead + e.insert >= z)
      for (i = e.strstart - e.insert, e.ins_h = e.window[i], e.ins_h = pe(e, e.ins_h, e.window[i + 1]); e.insert && (e.ins_h = pe(e, e.ins_h, e.window[i + z - 1]), e.prev[i & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = i, i++, e.insert--, !(e.lookahead + e.insert < z)); )
        ;
  } while (e.lookahead < V && e.strm.avail_in !== 0);
}, eo = (e, n) => {
  let t = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, r, i, a, f = 0, l = e.strm.avail_in;
  do {
    if (r = 65535, a = e.bi_valid + 42 >> 3, e.strm.avail_out < a || (a = e.strm.avail_out - a, i = e.strstart - e.block_start, r > i + e.strm.avail_in && (r = i + e.strm.avail_in), r > a && (r = a), r < t && (r === 0 && n !== j || n === _e || r !== i + e.strm.avail_in)))
      break;
    f = n === j && r === i + e.strm.avail_in ? 1 : 0, Mn(e, 0, 0, f), e.pending_buf[e.pending - 4] = r, e.pending_buf[e.pending - 3] = r >> 8, e.pending_buf[e.pending - 2] = ~r, e.pending_buf[e.pending - 1] = ~r >> 8, F(e.strm), i && (i > r && (i = r), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + i), e.strm.next_out), e.strm.next_out += i, e.strm.avail_out -= i, e.strm.total_out += i, e.block_start += i, r -= i), r && (Hn(e.strm, e.strm.output, e.strm.next_out, r), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r);
  } while (f === 0);
  return l -= e.strm.avail_in, l && (l >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= l && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - l, e.strm.next_in), e.strstart), e.strstart += l, e.insert += l > e.w_size - e.insert ? e.w_size - e.insert : l), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), f ? Ge : n !== _e && n !== j && e.strm.avail_in === 0 && e.strstart === e.block_start ? He : (a = e.window_size - e.strstart, e.strm.avail_in > a && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, a += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), a > e.strm.avail_in && (a = e.strm.avail_in), a && (Hn(e.strm, e.window, e.strstart, a), e.strstart += a, e.insert += a > e.w_size - e.insert ? e.w_size - e.insert : a), e.high_water < e.strstart && (e.high_water = e.strstart), a = e.bi_valid + 42 >> 3, a = e.pending_buf_size - a > 65535 ? 65535 : e.pending_buf_size - a, t = a > e.w_size ? e.w_size : a, i = e.strstart - e.block_start, (i >= t || (i || n === j) && n !== _e && e.strm.avail_in === 0 && i <= a) && (r = i > a ? a : i, f = n === j && e.strm.avail_in === 0 && r === i ? 1 : 0, Mn(e, e.block_start, r, f), e.block_start += r, F(e.strm)), f ? Se : U);
}, _n = (e, n) => {
  let t, r;
  for (; ; ) {
    if (e.lookahead < V) {
      if (Ue(e), e.lookahead < V && n === _e)
        return U;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= z && (e.ins_h = pe(e, e.ins_h, e.window[e.strstart + z - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), t !== 0 && e.strstart - t <= e.w_size - V && (e.match_length = Va(e, t)), e.match_length >= z)
      if (r = he(e, e.strstart - e.match_start, e.match_length - z), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= z) {
        e.match_length--;
        do
          e.strstart++, e.ins_h = pe(e, e.ins_h, e.window[e.strstart + z - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = pe(e, e.ins_h, e.window[e.strstart + 1]);
    else
      r = he(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (r && (G(e, !1), e.strm.avail_out === 0))
      return U;
  }
  return e.insert = e.strstart < z - 1 ? e.strstart : z - 1, n === j ? (G(e, !0), e.strm.avail_out === 0 ? Se : Ge) : e.sym_next && (G(e, !1), e.strm.avail_out === 0) ? U : He;
}, Oe = (e, n) => {
  let t, r, i;
  for (; ; ) {
    if (e.lookahead < V) {
      if (Ue(e), e.lookahead < V && n === _e)
        return U;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= z && (e.ins_h = pe(e, e.ins_h, e.window[e.strstart + z - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = z - 1, t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - V && (e.match_length = Va(e, t), e.match_length <= 5 && (e.strategy === nh || e.match_length === z && e.strstart - e.match_start > 4096) && (e.match_length = z - 1)), e.prev_length >= z && e.match_length <= e.prev_length) {
      i = e.strstart + e.lookahead - z, r = he(e, e.strstart - 1 - e.prev_match, e.prev_length - z), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= i && (e.ins_h = pe(e, e.ins_h, e.window[e.strstart + z - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = z - 1, e.strstart++, r && (G(e, !1), e.strm.avail_out === 0))
        return U;
    } else if (e.match_available) {
      if (r = he(e, 0, e.window[e.strstart - 1]), r && G(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return U;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (r = he(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < z - 1 ? e.strstart : z - 1, n === j ? (G(e, !0), e.strm.avail_out === 0 ? Se : Ge) : e.sym_next && (G(e, !1), e.strm.avail_out === 0) ? U : He;
}, xh = (e, n) => {
  let t, r, i, a;
  const f = e.window;
  for (; ; ) {
    if (e.lookahead <= de) {
      if (Ue(e), e.lookahead <= de && n === _e)
        return U;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= z && e.strstart > 0 && (i = e.strstart - 1, r = f[i], r === f[++i] && r === f[++i] && r === f[++i])) {
      a = e.strstart + de;
      do
        ;
      while (r === f[++i] && r === f[++i] && r === f[++i] && r === f[++i] && r === f[++i] && r === f[++i] && r === f[++i] && r === f[++i] && i < a);
      e.match_length = de - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= z ? (t = he(e, 1, e.match_length - z), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (t = he(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), t && (G(e, !1), e.strm.avail_out === 0))
      return U;
  }
  return e.insert = 0, n === j ? (G(e, !0), e.strm.avail_out === 0 ? Se : Ge) : e.sym_next && (G(e, !1), e.strm.avail_out === 0) ? U : He;
}, vh = (e, n) => {
  let t;
  for (; ; ) {
    if (e.lookahead === 0 && (Ue(e), e.lookahead === 0)) {
      if (n === _e)
        return U;
      break;
    }
    if (e.match_length = 0, t = he(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, t && (G(e, !1), e.strm.avail_out === 0))
      return U;
  }
  return e.insert = 0, n === j ? (G(e, !0), e.strm.avail_out === 0 ? Se : Ge) : e.sym_next && (G(e, !1), e.strm.avail_out === 0) ? U : He;
};
function Y(e, n, t, r, i) {
  this.good_length = e, this.max_lazy = n, this.nice_length = t, this.max_chain = r, this.func = i;
}
const We = [
  /*      good lazy nice chain */
  new Y(0, 0, 0, 0, eo),
  /* 0 store only */
  new Y(4, 4, 8, 4, _n),
  /* 1 max speed, no lazy matches */
  new Y(4, 5, 16, 8, _n),
  /* 2 */
  new Y(4, 6, 32, 32, _n),
  /* 3 */
  new Y(4, 4, 16, 16, Oe),
  /* 4 lazy matches */
  new Y(8, 16, 32, 32, Oe),
  /* 5 */
  new Y(8, 16, 128, 128, Oe),
  /* 6 */
  new Y(8, 32, 128, 256, Oe),
  /* 7 */
  new Y(32, 128, 258, 1024, Oe),
  /* 8 */
  new Y(32, 258, 258, 4096, Oe)
  /* 9 max compression */
], yh = (e) => {
  e.window_size = 2 * e.w_size, ue(e.head), e.max_lazy_match = We[e.level].max_lazy, e.good_match = We[e.level].good_length, e.nice_match = We[e.level].nice_length, e.max_chain_length = We[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = z - 1, e.match_available = 0, e.ins_h = 0;
};
function Eh() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = qt, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(_h * 2), this.dyn_dtree = new Uint16Array((2 * dh + 1) * 2), this.bl_tree = new Uint16Array((2 * hh + 1) * 2), ue(this.dyn_ltree), ue(this.dyn_dtree), ue(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(ph + 1), this.heap = new Uint16Array(2 * Un + 1), ue(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * Un + 1), ue(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const mt = (e) => {
  if (!e)
    return 1;
  const n = e.state;
  return !n || n.strm !== e || n.status !== Me && //#ifdef GZIP
  n.status !== or && //#endif
  n.status !== Pn && n.status !== Zn && n.status !== Fn && n.status !== Bn && n.status !== be && n.status !== Ye ? 1 : 0;
}, to = (e) => {
  if (mt(e))
    return me(e, Q);
  e.total_in = e.total_out = 0, e.data_type = oh;
  const n = e.state;
  return n.pending = 0, n.pending_out = 0, n.wrap < 0 && (n.wrap = -n.wrap), n.status = //#ifdef GZIP
  n.wrap === 2 ? or : (
    //#endif
    n.wrap ? Me : be
  ), e.adler = n.wrap === 2 ? 0 : 1, n.last_flush = -2, W0(n), D;
}, no = (e) => {
  const n = to(e);
  return n === D && yh(e.state), n;
}, Sh = (e, n) => mt(e) || e.state.wrap !== 2 ? Q : (e.state.gzhead = n, D), ro = (e, n, t, r, i, a) => {
  if (!e)
    return Q;
  let f = 1;
  if (n === th && (n = 6), r < 0 ? (f = 0, r = -r) : r > 15 && (f = 2, r -= 16), i < 1 || i > lh || t !== qt || r < 8 || r > 15 || n < 0 || n > 9 || a < 0 || a > ih || r === 8 && f !== 1)
    return me(e, Q);
  r === 8 && (r = 9);
  const l = new Eh();
  return e.state = l, l.strm = e, l.status = Me, l.wrap = f, l.gzhead = null, l.w_bits = r, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = i + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + z - 1) / z), l.window = new Uint8Array(l.w_size * 2), l.head = new Uint16Array(l.hash_size), l.prev = new Uint16Array(l.w_size), l.lit_bufsize = 1 << i + 6, l.pending_buf_size = l.lit_bufsize * 4, l.pending_buf = new Uint8Array(l.pending_buf_size), l.sym_buf = l.lit_bufsize, l.sym_end = (l.lit_bufsize - 1) * 3, l.level = n, l.strategy = a, l.method = t, no(e);
}, Ah = (e, n) => ro(e, n, qt, fh, sh, ah), Th = (e, n) => {
  if (mt(e) || n > Yr || n < 0)
    return e ? me(e, Q) : Q;
  const t = e.state;
  if (!e.output || e.avail_in !== 0 && !e.input || t.status === Ye && n !== j)
    return me(e, e.avail_out === 0 ? hn : Q);
  const r = t.last_flush;
  if (t.last_flush = n, t.pending !== 0) {
    if (F(e), e.avail_out === 0)
      return t.last_flush = -1, D;
  } else if (e.avail_in === 0 && Jr(n) <= Jr(r) && n !== j)
    return me(e, hn);
  if (t.status === Ye && e.avail_in !== 0)
    return me(e, hn);
  if (t.status === Me && t.wrap === 0 && (t.status = be), t.status === Me) {
    let i = qt + (t.w_bits - 8 << 4) << 8, a = -1;
    if (t.strategy >= At || t.level < 2 ? a = 0 : t.level < 6 ? a = 1 : t.level === 6 ? a = 2 : a = 3, i |= a << 6, t.strstart !== 0 && (i |= gh), i += 31 - i % 31, Xe(t, i), t.strstart !== 0 && (Xe(t, e.adler >>> 16), Xe(t, e.adler & 65535)), e.adler = 1, t.status = be, F(e), t.pending !== 0)
      return t.last_flush = -1, D;
  }
  if (t.status === or) {
    if (e.adler = 0, R(t, 31), R(t, 139), R(t, 8), t.gzhead)
      R(
        t,
        (t.gzhead.text ? 1 : 0) + (t.gzhead.hcrc ? 2 : 0) + (t.gzhead.extra ? 4 : 0) + (t.gzhead.name ? 8 : 0) + (t.gzhead.comment ? 16 : 0)
      ), R(t, t.gzhead.time & 255), R(t, t.gzhead.time >> 8 & 255), R(t, t.gzhead.time >> 16 & 255), R(t, t.gzhead.time >> 24 & 255), R(t, t.level === 9 ? 2 : t.strategy >= At || t.level < 2 ? 4 : 0), R(t, t.gzhead.os & 255), t.gzhead.extra && t.gzhead.extra.length && (R(t, t.gzhead.extra.length & 255), R(t, t.gzhead.extra.length >> 8 & 255)), t.gzhead.hcrc && (e.adler = I(e.adler, t.pending_buf, t.pending, 0)), t.gzindex = 0, t.status = Pn;
    else if (R(t, 0), R(t, 0), R(t, 0), R(t, 0), R(t, 0), R(t, t.level === 9 ? 2 : t.strategy >= At || t.level < 2 ? 4 : 0), R(t, wh), t.status = be, F(e), t.pending !== 0)
      return t.last_flush = -1, D;
  }
  if (t.status === Pn) {
    if (t.gzhead.extra) {
      let i = t.pending, a = (t.gzhead.extra.length & 65535) - t.gzindex;
      for (; t.pending + a > t.pending_buf_size; ) {
        let l = t.pending_buf_size - t.pending;
        if (t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex, t.gzindex + l), t.pending), t.pending = t.pending_buf_size, t.gzhead.hcrc && t.pending > i && (e.adler = I(e.adler, t.pending_buf, t.pending - i, i)), t.gzindex += l, F(e), t.pending !== 0)
          return t.last_flush = -1, D;
        i = 0, a -= l;
      }
      let f = new Uint8Array(t.gzhead.extra);
      t.pending_buf.set(f.subarray(t.gzindex, t.gzindex + a), t.pending), t.pending += a, t.gzhead.hcrc && t.pending > i && (e.adler = I(e.adler, t.pending_buf, t.pending - i, i)), t.gzindex = 0;
    }
    t.status = Zn;
  }
  if (t.status === Zn) {
    if (t.gzhead.name) {
      let i = t.pending, a;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > i && (e.adler = I(e.adler, t.pending_buf, t.pending - i, i)), F(e), t.pending !== 0)
            return t.last_flush = -1, D;
          i = 0;
        }
        t.gzindex < t.gzhead.name.length ? a = t.gzhead.name.charCodeAt(t.gzindex++) & 255 : a = 0, R(t, a);
      } while (a !== 0);
      t.gzhead.hcrc && t.pending > i && (e.adler = I(e.adler, t.pending_buf, t.pending - i, i)), t.gzindex = 0;
    }
    t.status = Fn;
  }
  if (t.status === Fn) {
    if (t.gzhead.comment) {
      let i = t.pending, a;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > i && (e.adler = I(e.adler, t.pending_buf, t.pending - i, i)), F(e), t.pending !== 0)
            return t.last_flush = -1, D;
          i = 0;
        }
        t.gzindex < t.gzhead.comment.length ? a = t.gzhead.comment.charCodeAt(t.gzindex++) & 255 : a = 0, R(t, a);
      } while (a !== 0);
      t.gzhead.hcrc && t.pending > i && (e.adler = I(e.adler, t.pending_buf, t.pending - i, i));
    }
    t.status = Bn;
  }
  if (t.status === Bn) {
    if (t.gzhead.hcrc) {
      if (t.pending + 2 > t.pending_buf_size && (F(e), t.pending !== 0))
        return t.last_flush = -1, D;
      R(t, e.adler & 255), R(t, e.adler >> 8 & 255), e.adler = 0;
    }
    if (t.status = be, F(e), t.pending !== 0)
      return t.last_flush = -1, D;
  }
  if (e.avail_in !== 0 || t.lookahead !== 0 || n !== _e && t.status !== Ye) {
    let i = t.level === 0 ? eo(t, n) : t.strategy === At ? vh(t, n) : t.strategy === rh ? xh(t, n) : We[t.level].func(t, n);
    if ((i === Se || i === Ge) && (t.status = Ye), i === U || i === Se)
      return e.avail_out === 0 && (t.last_flush = -1), D;
    if (i === He && (n === Q0 ? q0(t) : n !== Yr && (Mn(t, 0, 0, !1), n === V0 && (ue(t.head), t.lookahead === 0 && (t.strstart = 0, t.block_start = 0, t.insert = 0))), F(e), e.avail_out === 0))
      return t.last_flush = -1, D;
  }
  return n !== j ? D : t.wrap <= 0 ? Wr : (t.wrap === 2 ? (R(t, e.adler & 255), R(t, e.adler >> 8 & 255), R(t, e.adler >> 16 & 255), R(t, e.adler >> 24 & 255), R(t, e.total_in & 255), R(t, e.total_in >> 8 & 255), R(t, e.total_in >> 16 & 255), R(t, e.total_in >> 24 & 255)) : (Xe(t, e.adler >>> 16), Xe(t, e.adler & 65535)), F(e), t.wrap > 0 && (t.wrap = -t.wrap), t.pending !== 0 ? D : Wr);
}, zh = (e) => {
  if (mt(e))
    return Q;
  const n = e.state.status;
  return e.state = null, n === be ? me(e, eh) : D;
}, kh = (e, n) => {
  let t = n.length;
  if (mt(e))
    return Q;
  const r = e.state, i = r.wrap;
  if (i === 2 || i === 1 && r.status !== Me || r.lookahead)
    return Q;
  if (i === 1 && (e.adler = ft(e.adler, n, t, 0)), r.wrap = 0, t >= r.w_size) {
    i === 0 && (ue(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
    let u = new Uint8Array(r.w_size);
    u.set(n.subarray(t - r.w_size, t), 0), n = u, t = r.w_size;
  }
  const a = e.avail_in, f = e.next_in, l = e.input;
  for (e.avail_in = t, e.next_in = 0, e.input = n, Ue(r); r.lookahead >= z; ) {
    let u = r.strstart, o = r.lookahead - (z - 1);
    do
      r.ins_h = pe(r, r.ins_h, r.window[u + z - 1]), r.prev[u & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = u, u++;
    while (--o);
    r.strstart = u, r.lookahead = z - 1, Ue(r);
  }
  return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = z - 1, r.match_available = 0, e.next_in = f, e.input = l, e.avail_in = a, r.wrap = i, D;
};
var Rh = Ah, Oh = ro, Ch = no, $h = to, Ih = Sh, Dh = Th, Nh = zh, Lh = kh, Mh = "pako deflate (from Nodeca project)", Qe = {
  deflateInit: Rh,
  deflateInit2: Oh,
  deflateReset: Ch,
  deflateResetKeep: $h,
  deflateSetHeader: Ih,
  deflate: Dh,
  deflateEnd: Nh,
  deflateSetDictionary: Lh,
  deflateInfo: Mh
};
const Uh = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
var Ph = function(e) {
  const n = Array.prototype.slice.call(arguments, 1);
  for (; n.length; ) {
    const t = n.shift();
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be non-object");
      for (const r in t)
        Uh(t, r) && (e[r] = t[r]);
    }
  }
  return e;
}, Zh = (e) => {
  let n = 0;
  for (let r = 0, i = e.length; r < i; r++)
    n += e[r].length;
  const t = new Uint8Array(n);
  for (let r = 0, i = 0, a = e.length; r < a; r++) {
    let f = e[r];
    t.set(f, i), i += f.length;
  }
  return t;
}, Qt = {
  assign: Ph,
  flattenChunks: Zh
};
let io = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  io = !1;
}
const st = new Uint8Array(256);
for (let e = 0; e < 256; e++)
  st[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
st[254] = st[254] = 1;
var Fh = (e) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(e);
  let n, t, r, i, a, f = e.length, l = 0;
  for (i = 0; i < f; i++)
    t = e.charCodeAt(i), (t & 64512) === 55296 && i + 1 < f && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (r - 56320), i++)), l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
  for (n = new Uint8Array(l), a = 0, i = 0; a < l; i++)
    t = e.charCodeAt(i), (t & 64512) === 55296 && i + 1 < f && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (r - 56320), i++)), t < 128 ? n[a++] = t : t < 2048 ? (n[a++] = 192 | t >>> 6, n[a++] = 128 | t & 63) : t < 65536 ? (n[a++] = 224 | t >>> 12, n[a++] = 128 | t >>> 6 & 63, n[a++] = 128 | t & 63) : (n[a++] = 240 | t >>> 18, n[a++] = 128 | t >>> 12 & 63, n[a++] = 128 | t >>> 6 & 63, n[a++] = 128 | t & 63);
  return n;
};
const Bh = (e, n) => {
  if (n < 65534 && e.subarray && io)
    return String.fromCharCode.apply(null, e.length === n ? e : e.subarray(0, n));
  let t = "";
  for (let r = 0; r < n; r++)
    t += String.fromCharCode(e[r]);
  return t;
};
var Hh = (e, n) => {
  const t = n || e.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(e.subarray(0, n));
  let r, i;
  const a = new Array(t * 2);
  for (i = 0, r = 0; r < t; ) {
    let f = e[r++];
    if (f < 128) {
      a[i++] = f;
      continue;
    }
    let l = st[f];
    if (l > 4) {
      a[i++] = 65533, r += l - 1;
      continue;
    }
    for (f &= l === 2 ? 31 : l === 3 ? 15 : 7; l > 1 && r < t; )
      f = f << 6 | e[r++] & 63, l--;
    if (l > 1) {
      a[i++] = 65533;
      continue;
    }
    f < 65536 ? a[i++] = f : (f -= 65536, a[i++] = 55296 | f >> 10 & 1023, a[i++] = 56320 | f & 1023);
  }
  return Bh(a, i);
}, Gh = (e, n) => {
  n = n || e.length, n > e.length && (n = e.length);
  let t = n - 1;
  for (; t >= 0 && (e[t] & 192) === 128; )
    t--;
  return t < 0 || t === 0 ? n : t + st[e[t]] > n ? t : n;
}, ut = {
  string2buf: Fh,
  buf2string: Hh,
  utf8border: Gh
};
function jh() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var ao = jh;
const oo = Object.prototype.toString, {
  Z_NO_FLUSH: Kh,
  Z_SYNC_FLUSH: Xh,
  Z_FULL_FLUSH: Yh,
  Z_FINISH: Wh,
  Z_OK: Lt,
  Z_STREAM_END: Jh,
  Z_DEFAULT_COMPRESSION: qh,
  Z_DEFAULT_STRATEGY: Qh,
  Z_DEFLATED: Vh
} = Be;
function xt(e) {
  this.options = Qt.assign({
    level: qh,
    method: Vh,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Qh
  }, e || {});
  let n = this.options;
  n.raw && n.windowBits > 0 ? n.windowBits = -n.windowBits : n.gzip && n.windowBits > 0 && n.windowBits < 16 && (n.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ao(), this.strm.avail_out = 0;
  let t = Qe.deflateInit2(
    this.strm,
    n.level,
    n.method,
    n.windowBits,
    n.memLevel,
    n.strategy
  );
  if (t !== Lt)
    throw new Error(Ee[t]);
  if (n.header && Qe.deflateSetHeader(this.strm, n.header), n.dictionary) {
    let r;
    if (typeof n.dictionary == "string" ? r = ut.string2buf(n.dictionary) : oo.call(n.dictionary) === "[object ArrayBuffer]" ? r = new Uint8Array(n.dictionary) : r = n.dictionary, t = Qe.deflateSetDictionary(this.strm, r), t !== Lt)
      throw new Error(Ee[t]);
    this._dict_set = !0;
  }
}
xt.prototype.push = function(e, n) {
  const t = this.strm, r = this.options.chunkSize;
  let i, a;
  if (this.ended)
    return !1;
  for (n === ~~n ? a = n : a = n === !0 ? Wh : Kh, typeof e == "string" ? t.input = ut.string2buf(e) : oo.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    if (t.avail_out === 0 && (t.output = new Uint8Array(r), t.next_out = 0, t.avail_out = r), (a === Xh || a === Yh) && t.avail_out <= 6) {
      this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
      continue;
    }
    if (i = Qe.deflate(t, a), i === Jh)
      return t.next_out > 0 && this.onData(t.output.subarray(0, t.next_out)), i = Qe.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === Lt;
    if (t.avail_out === 0) {
      this.onData(t.output);
      continue;
    }
    if (a > 0 && t.next_out > 0) {
      this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
      continue;
    }
    if (t.avail_in === 0) break;
  }
  return !0;
};
xt.prototype.onData = function(e) {
  this.chunks.push(e);
};
xt.prototype.onEnd = function(e) {
  e === Lt && (this.result = Qt.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function lr(e, n) {
  const t = new xt(n);
  if (t.push(e, !0), t.err)
    throw t.msg || Ee[t.err];
  return t.result;
}
function e_(e, n) {
  return n = n || {}, n.raw = !0, lr(e, n);
}
function t_(e, n) {
  return n = n || {}, n.gzip = !0, lr(e, n);
}
var n_ = xt, r_ = lr, i_ = e_, a_ = t_, o_ = Be, l_ = {
  Deflate: n_,
  deflate: r_,
  deflateRaw: i_,
  gzip: a_,
  constants: o_
};
const Tt = 16209, f_ = 16191;
var s_ = function(n, t) {
  let r, i, a, f, l, u, o, s, d, c, h, w, S, E, m, y, x, _, v, g, p, b, k, A;
  const T = n.state;
  r = n.next_in, k = n.input, i = r + (n.avail_in - 5), a = n.next_out, A = n.output, f = a - (t - n.avail_out), l = a + (n.avail_out - 257), u = T.dmax, o = T.wsize, s = T.whave, d = T.wnext, c = T.window, h = T.hold, w = T.bits, S = T.lencode, E = T.distcode, m = (1 << T.lenbits) - 1, y = (1 << T.distbits) - 1;
  e:
    do {
      w < 15 && (h += k[r++] << w, w += 8, h += k[r++] << w, w += 8), x = S[h & m];
      t:
        for (; ; ) {
          if (_ = x >>> 24, h >>>= _, w -= _, _ = x >>> 16 & 255, _ === 0)
            A[a++] = x & 65535;
          else if (_ & 16) {
            v = x & 65535, _ &= 15, _ && (w < _ && (h += k[r++] << w, w += 8), v += h & (1 << _) - 1, h >>>= _, w -= _), w < 15 && (h += k[r++] << w, w += 8, h += k[r++] << w, w += 8), x = E[h & y];
            n:
              for (; ; ) {
                if (_ = x >>> 24, h >>>= _, w -= _, _ = x >>> 16 & 255, _ & 16) {
                  if (g = x & 65535, _ &= 15, w < _ && (h += k[r++] << w, w += 8, w < _ && (h += k[r++] << w, w += 8)), g += h & (1 << _) - 1, g > u) {
                    n.msg = "invalid distance too far back", T.mode = Tt;
                    break e;
                  }
                  if (h >>>= _, w -= _, _ = a - f, g > _) {
                    if (_ = g - _, _ > s && T.sane) {
                      n.msg = "invalid distance too far back", T.mode = Tt;
                      break e;
                    }
                    if (p = 0, b = c, d === 0) {
                      if (p += o - _, _ < v) {
                        v -= _;
                        do
                          A[a++] = c[p++];
                        while (--_);
                        p = a - g, b = A;
                      }
                    } else if (d < _) {
                      if (p += o + d - _, _ -= d, _ < v) {
                        v -= _;
                        do
                          A[a++] = c[p++];
                        while (--_);
                        if (p = 0, d < v) {
                          _ = d, v -= _;
                          do
                            A[a++] = c[p++];
                          while (--_);
                          p = a - g, b = A;
                        }
                      }
                    } else if (p += d - _, _ < v) {
                      v -= _;
                      do
                        A[a++] = c[p++];
                      while (--_);
                      p = a - g, b = A;
                    }
                    for (; v > 2; )
                      A[a++] = b[p++], A[a++] = b[p++], A[a++] = b[p++], v -= 3;
                    v && (A[a++] = b[p++], v > 1 && (A[a++] = b[p++]));
                  } else {
                    p = a - g;
                    do
                      A[a++] = A[p++], A[a++] = A[p++], A[a++] = A[p++], v -= 3;
                    while (v > 2);
                    v && (A[a++] = A[p++], v > 1 && (A[a++] = A[p++]));
                  }
                } else if (_ & 64) {
                  n.msg = "invalid distance code", T.mode = Tt;
                  break e;
                } else {
                  x = E[(x & 65535) + (h & (1 << _) - 1)];
                  continue n;
                }
                break;
              }
          } else if (_ & 64)
            if (_ & 32) {
              T.mode = f_;
              break e;
            } else {
              n.msg = "invalid literal/length code", T.mode = Tt;
              break e;
            }
          else {
            x = S[(x & 65535) + (h & (1 << _) - 1)];
            continue t;
          }
          break;
        }
    } while (r < i && a < l);
  v = w >> 3, r -= v, w -= v << 3, h &= (1 << w) - 1, n.next_in = r, n.next_out = a, n.avail_in = r < i ? 5 + (i - r) : 5 - (r - i), n.avail_out = a < l ? 257 + (l - a) : 257 - (a - l), T.hold = h, T.bits = w;
};
const Ce = 15, qr = 852, Qr = 592, Vr = 0, pn = 1, ei = 2, u_ = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), c_ = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), d_ = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), h_ = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), __ = (e, n, t, r, i, a, f, l) => {
  const u = l.bits;
  let o = 0, s = 0, d = 0, c = 0, h = 0, w = 0, S = 0, E = 0, m = 0, y = 0, x, _, v, g, p, b = null, k;
  const A = new Uint16Array(Ce + 1), T = new Uint16Array(Ce + 1);
  let ge = null, sr, yt, Et;
  for (o = 0; o <= Ce; o++)
    A[o] = 0;
  for (s = 0; s < r; s++)
    A[n[t + s]]++;
  for (h = u, c = Ce; c >= 1 && A[c] === 0; c--)
    ;
  if (h > c && (h = c), c === 0)
    return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, l.bits = 1, 0;
  for (d = 1; d < c && A[d] === 0; d++)
    ;
  for (h < d && (h = d), E = 1, o = 1; o <= Ce; o++)
    if (E <<= 1, E -= A[o], E < 0)
      return -1;
  if (E > 0 && (e === Vr || c !== 1))
    return -1;
  for (T[1] = 0, o = 1; o < Ce; o++)
    T[o + 1] = T[o] + A[o];
  for (s = 0; s < r; s++)
    n[t + s] !== 0 && (f[T[n[t + s]]++] = s);
  if (e === Vr ? (b = ge = f, k = 20) : e === pn ? (b = u_, ge = c_, k = 257) : (b = d_, ge = h_, k = 0), y = 0, s = 0, o = d, p = a, w = h, S = 0, v = -1, m = 1 << h, g = m - 1, e === pn && m > qr || e === ei && m > Qr)
    return 1;
  for (; ; ) {
    sr = o - S, f[s] + 1 < k ? (yt = 0, Et = f[s]) : f[s] >= k ? (yt = ge[f[s] - k], Et = b[f[s] - k]) : (yt = 96, Et = 0), x = 1 << o - S, _ = 1 << w, d = _;
    do
      _ -= x, i[p + (y >> S) + _] = sr << 24 | yt << 16 | Et | 0;
    while (_ !== 0);
    for (x = 1 << o - 1; y & x; )
      x >>= 1;
    if (x !== 0 ? (y &= x - 1, y += x) : y = 0, s++, --A[o] === 0) {
      if (o === c)
        break;
      o = n[t + f[s]];
    }
    if (o > h && (y & g) !== v) {
      for (S === 0 && (S = h), p += d, w = o - S, E = 1 << w; w + S < c && (E -= A[w + S], !(E <= 0)); )
        w++, E <<= 1;
      if (m += 1 << w, e === pn && m > qr || e === ei && m > Qr)
        return 1;
      v = y & g, i[v] = h << 24 | w << 16 | p - a | 0;
    }
  }
  return y !== 0 && (i[p + y] = o - S << 24 | 64 << 16 | 0), l.bits = h, 0;
};
var Ve = __;
const p_ = 0, lo = 1, fo = 2, {
  Z_FINISH: ti,
  Z_BLOCK: g_,
  Z_TREES: zt,
  Z_OK: Ae,
  Z_STREAM_END: w_,
  Z_NEED_DICT: b_,
  Z_STREAM_ERROR: X,
  Z_DATA_ERROR: so,
  Z_MEM_ERROR: uo,
  Z_BUF_ERROR: m_,
  Z_DEFLATED: ni
} = Be, Vt = 16180, ri = 16181, ii = 16182, ai = 16183, oi = 16184, li = 16185, fi = 16186, si = 16187, ui = 16188, ci = 16189, Mt = 16190, re = 16191, gn = 16192, di = 16193, wn = 16194, hi = 16195, _i = 16196, pi = 16197, gi = 16198, kt = 16199, Rt = 16200, wi = 16201, bi = 16202, mi = 16203, xi = 16204, vi = 16205, bn = 16206, yi = 16207, Ei = 16208, C = 16209, co = 16210, ho = 16211, x_ = 852, v_ = 592, y_ = 15, E_ = y_, Si = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
function S_() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Re = (e) => {
  if (!e)
    return 1;
  const n = e.state;
  return !n || n.strm !== e || n.mode < Vt || n.mode > ho ? 1 : 0;
}, _o = (e) => {
  if (Re(e))
    return X;
  const n = e.state;
  return e.total_in = e.total_out = n.total = 0, e.msg = "", n.wrap && (e.adler = n.wrap & 1), n.mode = Vt, n.last = 0, n.havedict = 0, n.flags = -1, n.dmax = 32768, n.head = null, n.hold = 0, n.bits = 0, n.lencode = n.lendyn = new Int32Array(x_), n.distcode = n.distdyn = new Int32Array(v_), n.sane = 1, n.back = -1, Ae;
}, po = (e) => {
  if (Re(e))
    return X;
  const n = e.state;
  return n.wsize = 0, n.whave = 0, n.wnext = 0, _o(e);
}, go = (e, n) => {
  let t;
  if (Re(e))
    return X;
  const r = e.state;
  return n < 0 ? (t = 0, n = -n) : (t = (n >> 4) + 5, n < 48 && (n &= 15)), n && (n < 8 || n > 15) ? X : (r.window !== null && r.wbits !== n && (r.window = null), r.wrap = t, r.wbits = n, po(e));
}, wo = (e, n) => {
  if (!e)
    return X;
  const t = new S_();
  e.state = t, t.strm = e, t.window = null, t.mode = Vt;
  const r = go(e, n);
  return r !== Ae && (e.state = null), r;
}, A_ = (e) => wo(e, E_);
let Ai = !0, mn, xn;
const T_ = (e) => {
  if (Ai) {
    mn = new Int32Array(512), xn = new Int32Array(32);
    let n = 0;
    for (; n < 144; )
      e.lens[n++] = 8;
    for (; n < 256; )
      e.lens[n++] = 9;
    for (; n < 280; )
      e.lens[n++] = 7;
    for (; n < 288; )
      e.lens[n++] = 8;
    for (Ve(lo, e.lens, 0, 288, mn, 0, e.work, { bits: 9 }), n = 0; n < 32; )
      e.lens[n++] = 5;
    Ve(fo, e.lens, 0, 32, xn, 0, e.work, { bits: 5 }), Ai = !1;
  }
  e.lencode = mn, e.lenbits = 9, e.distcode = xn, e.distbits = 5;
}, bo = (e, n, t, r) => {
  let i;
  const a = e.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), r >= a.wsize ? (a.window.set(n.subarray(t - a.wsize, t), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(n.subarray(t - r, t - r + i), a.wnext), r -= i, r ? (a.window.set(n.subarray(t - r, t), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}, z_ = (e, n) => {
  let t, r, i, a, f, l, u, o, s, d, c, h, w, S, E = 0, m, y, x, _, v, g, p, b;
  const k = new Uint8Array(4);
  let A, T;
  const ge = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Re(e) || !e.output || !e.input && e.avail_in !== 0)
    return X;
  t = e.state, t.mode === re && (t.mode = gn), f = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, r = e.input, l = e.avail_in, o = t.hold, s = t.bits, d = l, c = u, b = Ae;
  e:
    for (; ; )
      switch (t.mode) {
        case Vt:
          if (t.wrap === 0) {
            t.mode = gn;
            break;
          }
          for (; s < 16; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          if (t.wrap & 2 && o === 35615) {
            t.wbits === 0 && (t.wbits = 15), t.check = 0, k[0] = o & 255, k[1] = o >>> 8 & 255, t.check = I(t.check, k, 2, 0), o = 0, s = 0, t.mode = ri;
            break;
          }
          if (t.head && (t.head.done = !1), !(t.wrap & 1) || /* check if zlib header allowed */
          (((o & 255) << 8) + (o >> 8)) % 31) {
            e.msg = "incorrect header check", t.mode = C;
            break;
          }
          if ((o & 15) !== ni) {
            e.msg = "unknown compression method", t.mode = C;
            break;
          }
          if (o >>>= 4, s -= 4, p = (o & 15) + 8, t.wbits === 0 && (t.wbits = p), p > 15 || p > t.wbits) {
            e.msg = "invalid window size", t.mode = C;
            break;
          }
          t.dmax = 1 << t.wbits, t.flags = 0, e.adler = t.check = 1, t.mode = o & 512 ? ci : re, o = 0, s = 0;
          break;
        case ri:
          for (; s < 16; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          if (t.flags = o, (t.flags & 255) !== ni) {
            e.msg = "unknown compression method", t.mode = C;
            break;
          }
          if (t.flags & 57344) {
            e.msg = "unknown header flags set", t.mode = C;
            break;
          }
          t.head && (t.head.text = o >> 8 & 1), t.flags & 512 && t.wrap & 4 && (k[0] = o & 255, k[1] = o >>> 8 & 255, t.check = I(t.check, k, 2, 0)), o = 0, s = 0, t.mode = ii;
        case ii:
          for (; s < 32; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          t.head && (t.head.time = o), t.flags & 512 && t.wrap & 4 && (k[0] = o & 255, k[1] = o >>> 8 & 255, k[2] = o >>> 16 & 255, k[3] = o >>> 24 & 255, t.check = I(t.check, k, 4, 0)), o = 0, s = 0, t.mode = ai;
        case ai:
          for (; s < 16; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          t.head && (t.head.xflags = o & 255, t.head.os = o >> 8), t.flags & 512 && t.wrap & 4 && (k[0] = o & 255, k[1] = o >>> 8 & 255, t.check = I(t.check, k, 2, 0)), o = 0, s = 0, t.mode = oi;
        case oi:
          if (t.flags & 1024) {
            for (; s < 16; ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            t.length = o, t.head && (t.head.extra_len = o), t.flags & 512 && t.wrap & 4 && (k[0] = o & 255, k[1] = o >>> 8 & 255, t.check = I(t.check, k, 2, 0)), o = 0, s = 0;
          } else t.head && (t.head.extra = null);
          t.mode = li;
        case li:
          if (t.flags & 1024 && (h = t.length, h > l && (h = l), h && (t.head && (p = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Uint8Array(t.head.extra_len)), t.head.extra.set(
            r.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + h
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            p
          )), t.flags & 512 && t.wrap & 4 && (t.check = I(t.check, r, h, a)), l -= h, a += h, t.length -= h), t.length))
            break e;
          t.length = 0, t.mode = fi;
        case fi:
          if (t.flags & 2048) {
            if (l === 0)
              break e;
            h = 0;
            do
              p = r[a + h++], t.head && p && t.length < 65536 && (t.head.name += String.fromCharCode(p));
            while (p && h < l);
            if (t.flags & 512 && t.wrap & 4 && (t.check = I(t.check, r, h, a)), l -= h, a += h, p)
              break e;
          } else t.head && (t.head.name = null);
          t.length = 0, t.mode = si;
        case si:
          if (t.flags & 4096) {
            if (l === 0)
              break e;
            h = 0;
            do
              p = r[a + h++], t.head && p && t.length < 65536 && (t.head.comment += String.fromCharCode(p));
            while (p && h < l);
            if (t.flags & 512 && t.wrap & 4 && (t.check = I(t.check, r, h, a)), l -= h, a += h, p)
              break e;
          } else t.head && (t.head.comment = null);
          t.mode = ui;
        case ui:
          if (t.flags & 512) {
            for (; s < 16; ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            if (t.wrap & 4 && o !== (t.check & 65535)) {
              e.msg = "header crc mismatch", t.mode = C;
              break;
            }
            o = 0, s = 0;
          }
          t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = !0), e.adler = t.check = 0, t.mode = re;
          break;
        case ci:
          for (; s < 32; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          e.adler = t.check = Si(o), o = 0, s = 0, t.mode = Mt;
        case Mt:
          if (t.havedict === 0)
            return e.next_out = f, e.avail_out = u, e.next_in = a, e.avail_in = l, t.hold = o, t.bits = s, b_;
          e.adler = t.check = 1, t.mode = re;
        case re:
          if (n === g_ || n === zt)
            break e;
        case gn:
          if (t.last) {
            o >>>= s & 7, s -= s & 7, t.mode = bn;
            break;
          }
          for (; s < 3; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          switch (t.last = o & 1, o >>>= 1, s -= 1, o & 3) {
            case 0:
              t.mode = di;
              break;
            case 1:
              if (T_(t), t.mode = kt, n === zt) {
                o >>>= 2, s -= 2;
                break e;
              }
              break;
            case 2:
              t.mode = _i;
              break;
            case 3:
              e.msg = "invalid block type", t.mode = C;
          }
          o >>>= 2, s -= 2;
          break;
        case di:
          for (o >>>= s & 7, s -= s & 7; s < 32; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          if ((o & 65535) !== (o >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", t.mode = C;
            break;
          }
          if (t.length = o & 65535, o = 0, s = 0, t.mode = wn, n === zt)
            break e;
        case wn:
          t.mode = hi;
        case hi:
          if (h = t.length, h) {
            if (h > l && (h = l), h > u && (h = u), h === 0)
              break e;
            i.set(r.subarray(a, a + h), f), l -= h, a += h, u -= h, f += h, t.length -= h;
            break;
          }
          t.mode = re;
          break;
        case _i:
          for (; s < 14; ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          if (t.nlen = (o & 31) + 257, o >>>= 5, s -= 5, t.ndist = (o & 31) + 1, o >>>= 5, s -= 5, t.ncode = (o & 15) + 4, o >>>= 4, s -= 4, t.nlen > 286 || t.ndist > 30) {
            e.msg = "too many length or distance symbols", t.mode = C;
            break;
          }
          t.have = 0, t.mode = pi;
        case pi:
          for (; t.have < t.ncode; ) {
            for (; s < 3; ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            t.lens[ge[t.have++]] = o & 7, o >>>= 3, s -= 3;
          }
          for (; t.have < 19; )
            t.lens[ge[t.have++]] = 0;
          if (t.lencode = t.lendyn, t.lenbits = 7, A = { bits: t.lenbits }, b = Ve(p_, t.lens, 0, 19, t.lencode, 0, t.work, A), t.lenbits = A.bits, b) {
            e.msg = "invalid code lengths set", t.mode = C;
            break;
          }
          t.have = 0, t.mode = gi;
        case gi:
          for (; t.have < t.nlen + t.ndist; ) {
            for (; E = t.lencode[o & (1 << t.lenbits) - 1], m = E >>> 24, y = E >>> 16 & 255, x = E & 65535, !(m <= s); ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            if (x < 16)
              o >>>= m, s -= m, t.lens[t.have++] = x;
            else {
              if (x === 16) {
                for (T = m + 2; s < T; ) {
                  if (l === 0)
                    break e;
                  l--, o += r[a++] << s, s += 8;
                }
                if (o >>>= m, s -= m, t.have === 0) {
                  e.msg = "invalid bit length repeat", t.mode = C;
                  break;
                }
                p = t.lens[t.have - 1], h = 3 + (o & 3), o >>>= 2, s -= 2;
              } else if (x === 17) {
                for (T = m + 3; s < T; ) {
                  if (l === 0)
                    break e;
                  l--, o += r[a++] << s, s += 8;
                }
                o >>>= m, s -= m, p = 0, h = 3 + (o & 7), o >>>= 3, s -= 3;
              } else {
                for (T = m + 7; s < T; ) {
                  if (l === 0)
                    break e;
                  l--, o += r[a++] << s, s += 8;
                }
                o >>>= m, s -= m, p = 0, h = 11 + (o & 127), o >>>= 7, s -= 7;
              }
              if (t.have + h > t.nlen + t.ndist) {
                e.msg = "invalid bit length repeat", t.mode = C;
                break;
              }
              for (; h--; )
                t.lens[t.have++] = p;
            }
          }
          if (t.mode === C)
            break;
          if (t.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", t.mode = C;
            break;
          }
          if (t.lenbits = 9, A = { bits: t.lenbits }, b = Ve(lo, t.lens, 0, t.nlen, t.lencode, 0, t.work, A), t.lenbits = A.bits, b) {
            e.msg = "invalid literal/lengths set", t.mode = C;
            break;
          }
          if (t.distbits = 6, t.distcode = t.distdyn, A = { bits: t.distbits }, b = Ve(fo, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, A), t.distbits = A.bits, b) {
            e.msg = "invalid distances set", t.mode = C;
            break;
          }
          if (t.mode = kt, n === zt)
            break e;
        case kt:
          t.mode = Rt;
        case Rt:
          if (l >= 6 && u >= 258) {
            e.next_out = f, e.avail_out = u, e.next_in = a, e.avail_in = l, t.hold = o, t.bits = s, s_(e, c), f = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, r = e.input, l = e.avail_in, o = t.hold, s = t.bits, t.mode === re && (t.back = -1);
            break;
          }
          for (t.back = 0; E = t.lencode[o & (1 << t.lenbits) - 1], m = E >>> 24, y = E >>> 16 & 255, x = E & 65535, !(m <= s); ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          if (y && !(y & 240)) {
            for (_ = m, v = y, g = x; E = t.lencode[g + ((o & (1 << _ + v) - 1) >> _)], m = E >>> 24, y = E >>> 16 & 255, x = E & 65535, !(_ + m <= s); ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            o >>>= _, s -= _, t.back += _;
          }
          if (o >>>= m, s -= m, t.back += m, t.length = x, y === 0) {
            t.mode = vi;
            break;
          }
          if (y & 32) {
            t.back = -1, t.mode = re;
            break;
          }
          if (y & 64) {
            e.msg = "invalid literal/length code", t.mode = C;
            break;
          }
          t.extra = y & 15, t.mode = wi;
        case wi:
          if (t.extra) {
            for (T = t.extra; s < T; ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            t.length += o & (1 << t.extra) - 1, o >>>= t.extra, s -= t.extra, t.back += t.extra;
          }
          t.was = t.length, t.mode = bi;
        case bi:
          for (; E = t.distcode[o & (1 << t.distbits) - 1], m = E >>> 24, y = E >>> 16 & 255, x = E & 65535, !(m <= s); ) {
            if (l === 0)
              break e;
            l--, o += r[a++] << s, s += 8;
          }
          if (!(y & 240)) {
            for (_ = m, v = y, g = x; E = t.distcode[g + ((o & (1 << _ + v) - 1) >> _)], m = E >>> 24, y = E >>> 16 & 255, x = E & 65535, !(_ + m <= s); ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            o >>>= _, s -= _, t.back += _;
          }
          if (o >>>= m, s -= m, t.back += m, y & 64) {
            e.msg = "invalid distance code", t.mode = C;
            break;
          }
          t.offset = x, t.extra = y & 15, t.mode = mi;
        case mi:
          if (t.extra) {
            for (T = t.extra; s < T; ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            t.offset += o & (1 << t.extra) - 1, o >>>= t.extra, s -= t.extra, t.back += t.extra;
          }
          if (t.offset > t.dmax) {
            e.msg = "invalid distance too far back", t.mode = C;
            break;
          }
          t.mode = xi;
        case xi:
          if (u === 0)
            break e;
          if (h = c - u, t.offset > h) {
            if (h = t.offset - h, h > t.whave && t.sane) {
              e.msg = "invalid distance too far back", t.mode = C;
              break;
            }
            h > t.wnext ? (h -= t.wnext, w = t.wsize - h) : w = t.wnext - h, h > t.length && (h = t.length), S = t.window;
          } else
            S = i, w = f - t.offset, h = t.length;
          h > u && (h = u), u -= h, t.length -= h;
          do
            i[f++] = S[w++];
          while (--h);
          t.length === 0 && (t.mode = Rt);
          break;
        case vi:
          if (u === 0)
            break e;
          i[f++] = t.length, u--, t.mode = Rt;
          break;
        case bn:
          if (t.wrap) {
            for (; s < 32; ) {
              if (l === 0)
                break e;
              l--, o |= r[a++] << s, s += 8;
            }
            if (c -= u, e.total_out += c, t.total += c, t.wrap & 4 && c && (e.adler = t.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            t.flags ? I(t.check, i, c, f - c) : ft(t.check, i, c, f - c)), c = u, t.wrap & 4 && (t.flags ? o : Si(o)) !== t.check) {
              e.msg = "incorrect data check", t.mode = C;
              break;
            }
            o = 0, s = 0;
          }
          t.mode = yi;
        case yi:
          if (t.wrap && t.flags) {
            for (; s < 32; ) {
              if (l === 0)
                break e;
              l--, o += r[a++] << s, s += 8;
            }
            if (t.wrap & 4 && o !== (t.total & 4294967295)) {
              e.msg = "incorrect length check", t.mode = C;
              break;
            }
            o = 0, s = 0;
          }
          t.mode = Ei;
        case Ei:
          b = w_;
          break e;
        case C:
          b = so;
          break e;
        case co:
          return uo;
        case ho:
        default:
          return X;
      }
  return e.next_out = f, e.avail_out = u, e.next_in = a, e.avail_in = l, t.hold = o, t.bits = s, (t.wsize || c !== e.avail_out && t.mode < C && (t.mode < bn || n !== ti)) && bo(e, e.output, e.next_out, c - e.avail_out), d -= e.avail_in, c -= e.avail_out, e.total_in += d, e.total_out += c, t.total += c, t.wrap & 4 && c && (e.adler = t.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  t.flags ? I(t.check, i, c, e.next_out - c) : ft(t.check, i, c, e.next_out - c)), e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === re ? 128 : 0) + (t.mode === kt || t.mode === wn ? 256 : 0), (d === 0 && c === 0 || n === ti) && b === Ae && (b = m_), b;
}, k_ = (e) => {
  if (Re(e))
    return X;
  let n = e.state;
  return n.window && (n.window = null), e.state = null, Ae;
}, R_ = (e, n) => {
  if (Re(e))
    return X;
  const t = e.state;
  return t.wrap & 2 ? (t.head = n, n.done = !1, Ae) : X;
}, O_ = (e, n) => {
  const t = n.length;
  let r, i, a;
  return Re(e) || (r = e.state, r.wrap !== 0 && r.mode !== Mt) ? X : r.mode === Mt && (i = 1, i = ft(i, n, t, 0), i !== r.check) ? so : (a = bo(e, n, t, t), a ? (r.mode = co, uo) : (r.havedict = 1, Ae));
};
var C_ = po, $_ = go, I_ = _o, D_ = A_, N_ = wo, L_ = z_, M_ = k_, U_ = R_, P_ = O_, Z_ = "pako inflate (from Nodeca project)", oe = {
  inflateReset: C_,
  inflateReset2: $_,
  inflateResetKeep: I_,
  inflateInit: D_,
  inflateInit2: N_,
  inflate: L_,
  inflateEnd: M_,
  inflateGetHeader: U_,
  inflateSetDictionary: P_,
  inflateInfo: Z_
};
function F_() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var B_ = F_;
const mo = Object.prototype.toString, {
  Z_NO_FLUSH: H_,
  Z_FINISH: G_,
  Z_OK: ct,
  Z_STREAM_END: vn,
  Z_NEED_DICT: yn,
  Z_STREAM_ERROR: j_,
  Z_DATA_ERROR: Ti,
  Z_MEM_ERROR: K_
} = Be;
function vt(e) {
  this.options = Qt.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, e || {});
  const n = this.options;
  n.raw && n.windowBits >= 0 && n.windowBits < 16 && (n.windowBits = -n.windowBits, n.windowBits === 0 && (n.windowBits = -15)), n.windowBits >= 0 && n.windowBits < 16 && !(e && e.windowBits) && (n.windowBits += 32), n.windowBits > 15 && n.windowBits < 48 && (n.windowBits & 15 || (n.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ao(), this.strm.avail_out = 0;
  let t = oe.inflateInit2(
    this.strm,
    n.windowBits
  );
  if (t !== ct)
    throw new Error(Ee[t]);
  if (this.header = new B_(), oe.inflateGetHeader(this.strm, this.header), n.dictionary && (typeof n.dictionary == "string" ? n.dictionary = ut.string2buf(n.dictionary) : mo.call(n.dictionary) === "[object ArrayBuffer]" && (n.dictionary = new Uint8Array(n.dictionary)), n.raw && (t = oe.inflateSetDictionary(this.strm, n.dictionary), t !== ct)))
    throw new Error(Ee[t]);
}
vt.prototype.push = function(e, n) {
  const t = this.strm, r = this.options.chunkSize, i = this.options.dictionary;
  let a, f, l;
  if (this.ended) return !1;
  for (n === ~~n ? f = n : f = n === !0 ? G_ : H_, mo.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    for (t.avail_out === 0 && (t.output = new Uint8Array(r), t.next_out = 0, t.avail_out = r), a = oe.inflate(t, f), a === yn && i && (a = oe.inflateSetDictionary(t, i), a === ct ? a = oe.inflate(t, f) : a === Ti && (a = yn)); t.avail_in > 0 && a === vn && t.state.wrap > 0 && e[t.next_in] !== 0; )
      oe.inflateReset(t), a = oe.inflate(t, f);
    switch (a) {
      case j_:
      case Ti:
      case yn:
      case K_:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (l = t.avail_out, t.next_out && (t.avail_out === 0 || a === vn))
      if (this.options.to === "string") {
        let u = ut.utf8border(t.output, t.next_out), o = t.next_out - u, s = ut.buf2string(t.output, u);
        t.next_out = o, t.avail_out = r - o, o && t.output.set(t.output.subarray(u, u + o), 0), this.onData(s);
      } else
        this.onData(t.output.length === t.next_out ? t.output : t.output.subarray(0, t.next_out));
    if (!(a === ct && l === 0)) {
      if (a === vn)
        return a = oe.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (t.avail_in === 0) break;
    }
  }
  return !0;
};
vt.prototype.onData = function(e) {
  this.chunks.push(e);
};
vt.prototype.onEnd = function(e) {
  e === ct && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Qt.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function fr(e, n) {
  const t = new vt(n);
  if (t.push(e), t.err) throw t.msg || Ee[t.err];
  return t.result;
}
function X_(e, n) {
  return n = n || {}, n.raw = !0, fr(e, n);
}
var Y_ = vt, W_ = fr, J_ = X_, q_ = fr, Q_ = Be, V_ = {
  Inflate: Y_,
  inflate: W_,
  inflateRaw: J_,
  ungzip: q_,
  constants: Q_
};
const { Deflate: S1, deflate: A1, deflateRaw: e1, gzip: T1 } = l_, { Inflate: z1, inflate: k1, inflateRaw: t1, ungzip: R1 } = V_;
var n1 = e1, r1 = t1;
const xo = [
  ['"qa"', "z9"],
  ['"pu_q"', "zQ"],
  ['"pu_a"', "zA"],
  ['"grid"', "zG"],
  ['"edit_mode"', "zM"],
  ['"surface"', "zS"],
  ['"line"', "zL"],
  ['"lineE"', "zE"],
  ['"wall"', "zW"],
  ['"cage"', "zC"],
  ['"number"', "zN"],
  ['"symbol"', "zY"],
  ['"special"', "zP"],
  ['"board"', "zB"],
  ['"command_redo"', "zR"],
  ['"command_undo"', "zU"],
  ['"command_replay"', "z8"],
  ['"numberS"', "z1"],
  ['"freeline"', "zF"],
  ['"freelineE"', "z2"],
  ['"thermo"', "zT"],
  ['"arrows"', "z3"],
  ['"direction"', "zD"],
  ['"squareframe"', "z0"],
  ['"polygon"', "z5"],
  ['"deletelineE"', "z4"],
  ['"killercages"', "z6"],
  ['"nobulbthermo"', "z7"],
  ['"__a"', "z_"],
  ["null", "zO"]
], i1 = { command_redo: { __a: [] }, command_undo: { __a: [] }, command_replay: { __a: [] }, surface: {}, number: {}, numberS: {}, symbol: {}, freeline: {}, freelineE: {}, thermo: [], arrows: [], direction: [], squareframe: [], polygon: [], line: {}, lineE: { "186,199": 2, "199,212": 2, "212,225": 2, "225,238": 2, "238,251": 2, "251,264": 2, "264,277": 2, "277,290": 2, "290,303": 2, "189,202": 2, "202,215": 2, "215,228": 2, "228,241": 2, "241,254": 2, "254,267": 2, "267,280": 2, "280,293": 2, "293,306": 2, "222,223": 2, "223,224": 2, "224,225": 2, "225,226": 2, "226,227": 2, "227,228": 2, "228,229": 2, "229,230": 2, "230,231": 2, "261,262": 2, "262,263": 2, "263,264": 2, "264,265": 2, "265,266": 2, "266,267": 2, "267,268": 2, "268,269": 2, "269,270": 2 }, wall: {}, cage: {}, deletelineE: {}, killercages: [], nobulbthermo: [] }, vo = ["number", "numberS", "thermo", "arrows", "killercages", "symbol", "cage", "lineE"], yo = /^.+:\/\/.+\/penpa-edit\/.+&p=([^&]+)/, a1 = [
  yo
], o1 = (e) => {
  for (const [n, t] of xo)
    e = e.replaceAll(t, n);
  return JSON.parse(e);
}, Eo = (e) => {
  let n;
  try {
    const E = atob(e), m = Uint8Array.from([...E].map((x) => x.charCodeAt(0))), y = r1(m);
    n = new TextDecoder().decode(y);
  } catch {
    return {
      error: "Error while parsing inline data"
    };
  }
  const t = n.split(`
`);
  if (t.length < 19)
    return {
      error: "Invalid constraints schema: not enough lines"
    };
  const r = t[0].split(","), i = r[0];
  if (i !== "sudoku" && i !== "square")
    return {
      error: "Invalid grid type"
    };
  const a = Number(r[1]), f = Number(r[2]), l = Number(r[3]), u = Number(r[7]), o = Number(r[8]), s = Number(r[9]), d = JSON.parse(t[1]), c = o1(t[3]), h = JSON.parse(t[5]), w = [
    Number(r[11]),
    Number(r[12]),
    Number(r[13]),
    Number(r[14])
  ];
  return {
    constraints: {
      colCount: a,
      rowCount: f,
      cellSize: l,
      canvasWidth: u,
      canvasHeight: o,
      centerCellIndex: s,
      space: d,
      sudoku: w,
      centerlist: h,
      ...Ta(c, vo)
    }
  };
}, l1 = (e) => {
  const n = e.match(yo);
  if (!n)
    return {
      matched: !1
    };
  const t = n[1], r = Eo(t);
  return {
    matched: !0,
    dataString: t,
    ...r
  };
}, f1 = (e) => {
  const n = Eo(e);
  return n.error ? {
    matched: !1
  } : {
    matched: !0,
    dataString: e,
    ...n
  };
}, s1 = async (e) => {
  let n = l1(e);
  return n.matched || (n = f1(e), n.matched) ? n : {
    matched: !1
  };
}, u1 = {
  format: H.Penpa,
  urlPatterns: a1,
  run: s1
}, c1 = (e) => {
  let n = JSON.stringify({
    ...i1,
    ...Ta(e, vo)
  });
  for (const [t, r] of xo)
    n = n.replaceAll(t, r);
  return n;
}, d1 = (e) => {
  let n = `sudoku,${e.colCount},${e.rowCount},${e.cellSize},0,1,1,${e.canvasWidth},${e.canvasHeight},${e.centerCellIndex},${e.centerCellIndex},${e.sudoku.join(",")},Title: ,Author: ,,,OFF,false`, t = [];
  return t.push(n), t.push(JSON.stringify(e.space)), t.push('["1","2","1"]~"sudoku"~["1",9]'), t.push(c1(e)), t.push(""), t.push(JSON.stringify(e.centerlist)), t.push(JSON.stringify([])), t.push(JSON.stringify({})), t.push('"x"'), t.push('"x"'), t.push(JSON.stringify([3, 1, 4])), t.push('{z9:zQ,zG:["1","2","1"],zQ:{zM:zS,zS:["",1],zL:["1",2],zE:["1",2],zW:["",2],zC:["1",10],zN:["1",1],zY:["circle_L",1],zP:[zT,""],zB:["",""],"move":["1",""],"combi":["battleship",""],"sudoku":["1",1]},zA:{zM:zS,zS:["",1],zL:["1",3],zE:["1",3],zW:["",3],zC:["1",10],zN:["1",2],zY:["circle_L",1],zP:[zT,""],zB:["",""],"move":["1",""],"combi":["battleship",""],"sudoku":["1",9]}}'), t.push('"x"'), t.push("0"), t.push("{zR:{z_:[]},zU:{z_:[]},z8:{z_:[]},zS:{},zN:{},z1:{},zY:{},zF:{},z2:{},zT:[],z3:[],zD:[],z0:[],z5:[],zL:{},zE:{},zW:{},zC:{},z4:{},z6:[],z7:[]}"), t.push("x"), t.push(JSON.stringify({})), t.push(JSON.stringify([])), t.push("false"), t.join(`
`);
}, So = (e) => {
  const n = d1(e), t = new TextEncoder().encode(n), r = n1(t), i = String.fromCharCode(...r), a = btoa(i);
  return {
    dataString: a,
    url: `https://swaroopg92.github.io/penpa-edit/#m=solve&p=${a}`
  };
}, L = (e, n) => (e.row + 2 + n.space[0]) * (n.colCount + 4) + e.col + 2 + n.space[2], En = (e, n) => e.map((t) => L(t, n)), ce = (e, n) => ({
  row: Math.floor(e / (n.colCount + 4)) - 2 - n.space[0],
  col: e % (n.colCount + 4) - 2 - n.space[2]
}), Sn = (e, n) => e.map((t) => ce(t, n)), Ct = (e, n, t) => 4 * (L(e, t) + (t.rowCount + 4) * (t.colCount + 4)) + n, Ao = (e, n) => Ct(e, 0, n), h1 = (e, n) => {
  const t = Sd([e.cell1, e.cell2], ["row", "col"]), r = t[0];
  return r.row === t[1].row ? 3 * (n.rowCount + 4) * (n.colCount + 4) + L(r, n) : 2 * (n.rowCount + 4) * (n.colCount + 4) + L(r, n);
}, _1 = (e, n, t) => {
  const r = n[0] === 1 || n[0] === 8 ? "Consecutive" : "Double";
  if (e >= 3 * (t.rowCount + 4) * (t.colCount + 4) + L({ row: 0, col: 0 }, t)) {
    const i = e - 3 * (t.rowCount + 4) * (t.colCount + 4), a = ce(i, t);
    return {
      dotType: r,
      cell1: a,
      cell2: {
        row: a.row,
        col: a.col + 1
      }
    };
  } else {
    const i = e - 2 * (t.rowCount + 4) * (t.colCount + 4), a = ce(i, t);
    return {
      dotType: r,
      cell1: a,
      cell2: {
        row: a.row + 1,
        col: a.col
      }
    };
  }
}, Ut = [[-1, 0], [0, 1], [1, 0], [0, -1]], An = [[0, 1], [1, 3], [2, 3], [0, 2]], p1 = (e, n) => {
  const t = {}, r = {};
  for (const i of e)
    Ut.forEach((a, f) => {
      const l = {
        row: i.row + a[0],
        col: i.col + a[1]
      };
      if (!e.some((u) => Dt(l, u))) {
        t[`${L(i, n)},${f}`] = !0;
        const u = An[f].map((o) => Ct(i, o, n)).join(",");
        r[u] = 10;
      }
    });
  for (const i of e)
    Ut.slice(1, 3).forEach((a, f) => {
      f += 1;
      const l = {
        row: i.row + a[0],
        col: i.col + a[1]
      };
      if (e.some((u) => Dt(l, u))) {
        const u = Od(4).filter((o) => o % 2 !== f % 2);
        for (const o of u)
          if (t[`${L(i, n)},${o}`] && t[`${L(l, n)},${o}`]) {
            const s = An[o][1], d = Ct(i, s, n), c = An[o][0], h = Ct(l, c, n), w = `${d},${h}`;
            r[w] = 10;
          }
      }
    });
  return r;
}, Pe = (e, n) => (n.colCount + 4) * (e.row + 1) + (e.col + 1) + (n.colCount + 4) * (n.colCount + 4), g1 = (e, n) => {
  const t = {};
  e.forEach((i, a) => {
    for (const f of i) {
      const l = L(f, n);
      t[l] = a;
    }
  });
  const r = {};
  for (const i of e)
    for (const a of i) {
      const f = L(a, n), l = t[f];
      Ut.slice(1, 3).forEach((u, o) => {
        o += 1;
        const s = {
          row: a.row + u[0],
          col: a.col + u[1]
        }, d = L(s, n), c = t[d];
        if (l !== c && c !== void 0) {
          const w = Ut[o === 1 ? 2 : 1], S = {
            row: s.row + w[0],
            col: s.col + w[1]
          }, E = Pe(s, n), m = Pe(S, n), y = `${E},${m}`;
          r[y] = 2;
        }
      });
    }
  return r;
}, w1 = (e) => {
  const n = {};
  for (let t = 0; t < e.colCount; t++) {
    const r = Pe({ row: t, col: t }, e), i = Pe({ row: t + 1, col: t + 1 }, e), a = `${r},${i}`;
    n[a] = 12;
  }
  return n;
}, b1 = (e) => {
  const n = {};
  for (let t = 0; t < e.colCount; t++) {
    const r = Pe({ row: t, col: e.colCount - t }, e), a = `${Pe({ row: t + 1, col: e.colCount - (t + 1) }, e)},${r}`;
    n[a] = 12;
  }
  return n;
}, m1 = (e) => {
  const n = e.rowCount - e.space[0] - e.space[1], t = e.colCount - e.space[2] - e.space[3];
  if (n !== t)
    return {
      error: "Grid is not square, cannot convert"
    };
  const r = n;
  if (!Vn.includes(r))
    return {
      error: `Invalid grid size ${r}.`
    };
  const i = [];
  for (const [o, s] of Object.entries(e.number)) {
    if (!Array.isArray(s))
      continue;
    const [d] = s, c = Number(d);
    if (!Number.isInteger(c))
      continue;
    const w = {
      position: ce(Number(o), e),
      value: c
    };
    i.push(w);
  }
  const a = {
    gridSize: r,
    fixedNumbers: i,
    thermos: e.thermo.filter((o) => o.length >= 2).map((o) => Sn(o, e)),
    arrows: e.arrows.map(([o, ...s]) => ({
      circleCells: [ce(o, e)],
      arrowCells: Sn(s, e)
    })),
    primaryDiagonal: !!e.sudoku[0],
    secondaryDiagonal: !!e.sudoku[3],
    killerCages: e.killercages.filter((o) => !B(o)).map((o) => {
      const d = o.map((h) => Ao(ce(h, e), e)).find((h) => e.numberS[h] !== void 0);
      let c = null;
      return d !== void 0 && (c = Number(e.numberS[d][0])), {
        sum: c,
        region: Sn(o, e)
      };
    }),
    kropkiDots: rn(e.symbol).filter(([o, s]) => s[1] === "circle_SS").map(([o, s]) => _1(Number(o), s, e)),
    oddCells: rn(e.symbol).filter(([o, s]) => s[1] === "circle_L").map(([o, s]) => ce(Number(o), e)),
    evenCells: rn(e.symbol).filter(([o, s]) => s[1] === "square_L").map(([o, s]) => ce(Number(o), e))
  };
  if (a.fixedNumbers?.some(({ position: { row: o, col: s }, value: d }) => !ln(d, 1, a.gridSize + 1) || !ln(o, 0, a.gridSize) || !ln(s, 0, a.gridSize)))
    return {
      error: "Given digits out of range."
    };
  const l = Wt(a);
  return {
    constraints: a,
    ...Ze(l)
  };
}, x1 = (e) => {
  const n = [];
  let t = 0;
  P(e.gridSize, (o) => {
    P(e.gridSize, (s) => {
      const d = L({ row: o, col: s }, { colCount: e.gridSize, space: [0, 0, 0, 0] });
      n.push(d - t), t = d;
    });
  });
  const r = e.gridSize, i = {
    rowCount: r,
    colCount: r,
    space: [0, 0, 0, 0]
  }, a = {
    ...i,
    cellSize: 38,
    canvasWidth: (r + 1) * 38,
    canvasHeight: (r + 1) * 38,
    centerCellIndex: L({ row: Math.floor(r / 2), col: Math.floor(r / 2) }, i),
    sudoku: [Number(e.primaryDiagonal), 0, 0, Number(e.secondaryDiagonal)],
    thermo: (e.thermos ?? []).map((o) => En(o, i)),
    killercages: (e.killerCages ?? []).map((o) => En(o.region, i)),
    cage: {
      ...hd({}, ...(e.killerCages ?? []).map((o) => p1(o.region, i)))
    },
    arrows: (e.arrows ?? []).filter((o) => o.circleCells.length === 1).map((o) => En([...o.circleCells, ...o.arrowCells], i)),
    number: on(
      (e.fixedNumbers ?? []).map(
        ({ position: o, value: s }) => [
          L(o, i),
          [String(s), 1, "1"]
        ]
      )
    ),
    numberS: on(
      (e.killerCages ?? []).map((o) => [
        Ao(o.region[0], i),
        [` ${o.sum}`, 1]
      ])
    ),
    symbol: on([
      ...(e.kropkiDots ?? []).map((o) => [
        h1(o, i),
        [o.dotType === "Consecutive" ? 8 : 2, "circle_SS", 2]
      ]),
      ...(e.oddCells ?? []).map((o) => [
        L(o, i),
        [3, "circle_L", 2]
      ]),
      ...(e.evenCells ?? []).map((o) => [
        L(o, i),
        [3, "square_L", 2]
      ])
    ]),
    centerlist: n,
    lineE: {
      ...e.primaryDiagonal ? w1(i) : {},
      ...e.secondaryDiagonal ? b1(i) : {},
      ...g1(e.regions ?? wt(r), i)
    }
  }, f = {
    constraints: a,
    ...So(a)
  }, u = [
    ...["renbans", "palindromes", "extraRegions"].filter((o) => !B(e[o]))
  ];
  return u.length > 0 && (f.warning = "Ignored some constraints: " + u.join(", ")), f;
}, v1 = {
  transformToLisudoku: m1,
  transformFromLisudoku: x1
}, To = [
  za,
  o0,
  p0,
  u1
], zi = {
  [H.GridString]: tr,
  [H.Lisudoku]: s0,
  [H.Fpuzzles]: m0,
  [H.Penpa]: v1
}, y1 = {
  [H.GridString]: Ra,
  [H.Lisudoku]: Ze,
  [H.Fpuzzles]: Ma,
  [H.Penpa]: So
}, O1 = To.map(({ format: e, urlPatterns: n }) => ({
  format: e,
  urlPatterns: n
})), E1 = async (e, n = !0) => {
  const t = [...e].filter((a) => a !== " ").join("");
  if (t === "")
    return {
      error: "Input is empty"
    };
  let r, i;
  for (const a of To)
    if (r = await a.run(t), r.matched) {
      i = a.format;
      break;
    }
  if (r === void 0 || r.error !== void 0 || i === void 0) {
    if (n)
      try {
        const a = new URL(t);
        if (a.protocol === "http:" || a.protocol === "https:") {
          const f = await fetch(a);
          if (f.redirected)
            return E1(f.url, !1);
        }
      } catch {
      }
    return {
      error: r?.error || "Format not supported",
      format: i,
      dataString: r?.dataString
    };
  }
  return {
    format: i,
    dataString: r.dataString,
    constraints: r.constraints
  };
}, C1 = ({ constraints: e, fromFormat: n, toFormat: t }) => {
  const i = zi[n].transformToLisudoku(e);
  if (i.error !== void 0)
    return i;
  const f = zi[t].transformFromLisudoku(i.constraints);
  return f.error !== void 0 ? f : {
    ...f,
    warning: qu([i.warning, f.warning]).join(". ") || void 0
  };
}, $1 = ({ format: e, constraints: n }) => {
  const t = y1[e];
  return t(n);
};
export {
  O1 as FORMATS,
  H as SudokuDataFormat,
  E1 as decodeSudoku,
  $1 as encodeSudoku,
  C1 as transformSudoku
};
