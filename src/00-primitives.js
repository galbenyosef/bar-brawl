// Math & shape primitives
// Circle (`Circle`) and rotated-rect (`RotatedRect`) collision primitives with location/size/rotation accessors.
var Circle = class {
        loc = {
            x: 0,
            y: 0
        };
        #t = 0;
        constructor(t, s, e) {
            this.loc.x = t, this.loc.y = s, this.#t = e
        }
        get radius() {
            return this.#t
        }
    },
    RotatedRect = class {
        loc = {
            x: 0,
            y: 0
        };
        #t = {
            Fighter: 0,
            h: 0
        };
        rotation = 0;
        constructor(t, s, e, h, a = 0) {
            this.loc.x = t, this.loc.y = s, this.#t.Fighter = e, this.#t.h = h, this.rotation = a
        }
        get size() {
            return this.#t
        }
    };

function P(i, t) {
    if (!i || !t) return !1;
    if (i instanceof Circle && t instanceof Circle) return D(i, t);
    if (i instanceof RotatedRect && t instanceof RotatedRect) return F(i, t);
    if (i instanceof Circle && t instanceof RotatedRect) return v(t, i);
    if (i instanceof RotatedRect && t instanceof Circle) return v(i, t)
}

function D(i, t) {
    let s = t.loc.x - i.loc.x,
        e = t.loc.y - i.loc.y,
        h = s * s + e * e,
        a = i.radius + t.radius,
        n = h < a * a,
        r = null;
    if (n) {
        let o = Math.sqrt(h);
        r = {
            x: i.loc.x + s / o * i.radius,
            y: i.loc.y + e / o * i.radius
        }
    }
    return {
        intersected: n,
        hitPoint: r
    }
}

function F(i, t) {
    let s = O(i),
        e = O(t),
        h = [{
            x: Math.cos(i.rotation),
            y: Math.sin(i.rotation)
        }, {
            x: -Math.sin(i.rotation),
            y: Math.cos(i.rotation)
        }, {
            x: Math.cos(t.rotation),
            y: Math.sin(t.rotation)
        }, {
            x: -Math.sin(t.rotation),
            y: Math.cos(t.rotation)
        }];
    for (let a of h) {
        let n = 1 / 0,
            r = -1 / 0,
            o = 1 / 0,
            c = -1 / 0;
        for (let f of s) {
            let u = f.x * a.x + f.y * a.y;
            n = Math.min(n, u), r = Math.max(r, u)
        }
        for (let f of e) {
            let u = f.x * a.x + f.y * a.y;
            o = Math.min(o, u), c = Math.max(c, u)
        }
        if (r < o || c < n) return {
            intersected: !1,
            hitPoint: null
        }
    }
    return {
        intersected: !0,
        hitPoint: {
            x: (i.loc.x + i.size.Fighter / 2 + (t.loc.x + t.size.Fighter / 2)) / 2,
            y: (i.loc.y + i.size.h / 2 + (t.loc.y + t.size.h / 2)) / 2
        }
    }
}

function v(i, t) {
    let s = i.loc.x + i.size.Fighter / 2,
        e = i.loc.y + i.size.h / 2,
        h = t.loc.x - s,
        a = t.loc.y - e,
        n = Math.cos(-i.rotation),
        r = Math.sin(-i.rotation),
        o = s + h * n - a * r,
        c = e + h * r + a * n,
        f = Math.max(i.loc.x, Math.min(o, i.loc.x + i.size.Fighter)),
        u = Math.max(i.loc.y, Math.min(c, i.loc.y + i.size.h)),
        l = o - f,
        d = c - u,
        x = l * l + d * d < t.radius * t.radius,
        m = null;
    if (x) {
        let y = f - s,
            p = u - e,
            k = Math.cos(i.rotation),
            R = Math.sin(i.rotation);
        m = {
            x: s + y * k - p * R,
            y: e + y * R + p * k
        }
    }
    return {
        intersected: x,
        hitPoint: m
    }
}

function O(i) {
    let t = i.loc.x + i.size.Fighter / 2,
        s = i.loc.y + i.size.h / 2,
        e = i.size.Fighter / 2,
        h = i.size.h / 2,
        a = Math.cos(i.rotation),
        n = Math.sin(i.rotation);
    return [{
        x: -e,
        y: -h
    }, {
        x: e,
        y: -h
    }, {
        x: e,
        y: h
    }, {
        x: -e,
        y: h
    }].map(r => ({
        x: t + r.x * a - r.y * n,
        y: s + r.x * n + r.y * a
    }))
}
