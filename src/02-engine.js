// FighterEngine core
// `FighterController`: engine orchestration — Begin/Reset loops, round management, attack-range and wall-margin rules for the two fighters.
var FighterController = class i {
    #t = null;
    #r = null;
    #e = null;
    static attackRange = 20;
    static wallMargin = 15;
    #a;
    #s = !1;
    #h = 0;
    #i = 0;
    #y = 1;
    constructor(t, s, e = .5) {
        if (!(t instanceof FighterEngine)) throw new Error(`${this.constructor.name} requires a ${FighterEngine.name} instance.`);
        if (!(s instanceof w)) throw new Error(`${this.constructor.name} requires a ${w.name} instance.`);
        this.#t = t, this.#r = s, this.#y = Math.max(0, Math.min(1, e))
    }
    get #w() {
        return .4 - this.#y * .4
    }
    get #InputSource() {
        return .2 + this.#y * .8
    }
    get #l() {
        return .1 + this.#y * .6
    }
    get #n() {
        return .5 - this.#y * .5
    }
    Begin() {
        this.#e = this.#t.getOpponent(this.#r), this.#a = Math.abs(this.#e.loc.x - this.#r.loc.x)
    }
    Tick(t) {
        if (this.#t.gameState !== "FIGHTING" || !this.#r || !this.#e) return;
        let s = 0,
            e = !1,
            h = !1,
            a = this.#r.loc.x,
            n = a + this.#r.size.w,
            r = this.#e.loc.x,
            o = Math.abs(r - a),
            c = o - this.#a,
            f = this.#t.worldWidth,
            u = a < i.wallMargin,
            l = n > f - i.wallMargin,
            d = u ? 1 : l ? -1 : 0,
            x = c < -.1 && (r < a && this.#e.vel.x > .1 || r > a && this.#e.vel.x < -.1),
            m = o < i.attackRange,
            y = this.#e.isPunching || this.#e.isKicking;
        y && !this.#s && (this.#h = this.#w, this.#i = w.defaultPunchAnimTimer * 2), this.#s = y, this.#h > 0 && (this.#h -= t), this.#i > 0 && this.#h <= 0 && (this.#i -= t);
        let p = x && !y && o < i.attackRange + 20 && (this.#y === 1 || Math.random() < this.#l);
        d !== 0 ? s = d : this.#i > 0 && this.#h <= 0 ? (e = m && (this.#y === 1 || Math.random() < this.#InputSource), e && this.#e.isCrouching && (h = !0)) : p ? s = r < a ? 1 : -1 : (this.#y === 1 || Math.random() >= this.#n) && (s = r < a ? -1 : 1, m && (m && Math.random() > .6 ? (h = !0, this.#r.Kick()) : m && Math.random() > .5 ? this.#r.Punch() : this.#r.Kick()));
        let k = this.#e.loc.y + this.#e.size.h * .2 - this.#r.loc.y;
        m && k < -10 && this.#r.isGrounded && this.#r.Jump(), this.#r.moveInput = s, this.#r.SetCrouching(h), this.#r.SetBlocking(e), this.#a = o
    }
    Reset() {
        this.#r.moveInput = 0
    }
};
