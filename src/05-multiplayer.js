// Multiplayer (Supabase signaling)
// `T`: WebRTC-over-Supabase-realtime netcode — session codes, connection state, full-state recovery for desyncs, error cooldown. Live-only; offline it just reports no connection.
var T = class i {
    static signalingURL = "https://cqawfcgolofiaudqacrg.supabase.co";
    static signalingKey = "sb_publishable_frZwSlAoGpeiFaZAxODyVw_kTyvDhZU";
    #t;
    #r;
    #e = Math.random().toString(36).substring(2, 9);
    #a;
    #s;
    #h;
    #i = !1;
    #y = new Map;
    #w = [];
    #S = 0;
    static MAX_PING_SAMPLES = 5;
    #l = "NONE";
    static timeoutDuration = 5;
    static errorCooldown = 2;
    constructor(t) {
        if (!(t instanceof g)) throw new Error(`${this.constructor.name} requires a ${g.name} instance.`);
        this.#t = t
    }
    get sessionCode() {
        return this.#r
    }
    get hasConnection() {
        return this.#h || this.#s
    }
    get isConnected() {
        return this.#h && this.#h.connected
    }
    get status() {
        return this.#l
    }
    SendInput(t, s) {
        if (this.isConnected) {
            let e = new ArrayBuffer(5),
                h = new DataView(e);
            h.setUint32(0, t), h.setUint8(4, s), this.#h.send(e)
        }
    }
    RequestFullStateRecovery() {
        if (!this.isConnected) return;
        if (this.#i) {
            this.#n();
            return
        }
        let t = new ArrayBuffer(2),
            s = new DataView(t);
        s.setUint8(0, 252), s.setUint8(1, 0), this.#h.send(t)
    }
    #n() {
        if (!this.isConnected) return;
        let t = this.#t.SerializeState();
        if (this.#h) {
            let s = new TextEncoder().encode(JSON.stringify(t)),
                e = new ArrayBuffer(1 + s.byteLength),
                h = new Uint8Array(e);
            h[0] = 251, h.set(s, 1), this.#h.send(e)
        }
        this.#t.ApplyFullStateRecovery(t)
    }
    #c(t, s) {
        this.#s || (this.#a || (this.#a = window.supabase.createClient(i.signalingURL, i.signalingKey)), this.#s = this.#a.channel(`room:${t}`, {
            config: {
                broadcast: {
                    self: !1
                }
            }
        }), this.#s.on("broadcast", {
            event: "signal"
        }, e => {
            let h = e.payload;
            h.to === this.#e && this.#h && !this.#h.destroyed && this.#h.signal(h.signal)
        }), this.#s.subscribe(e => {
            e === "SUBSCRIBED" && typeof s == "function" && s()
        }))
    }
    #f() {
        this.#s && (this.#a.removeChannel(this.#s), this.#s = null)
    }
    #g(t, s, e) {
        let h = new SimplePeer({
            initiator: t,
            trickle: !1
        });
        return h.on("signal", a => {
            this.#s && this.#s.send({
                type: "broadcast",
                event: "signal",
                payload: {
                    to: s,
                    from: this.#e,
                    signal: a
                }
            })
        }), h.on("connect", () => {
            this.#l = "CONNECTED", this.#f(), this.#o()
        }), h.on("data", a => {
            try {
                let n = ArrayBuffer.isView(a) ? new Uint8Array(a.buffer, a.byteOffset, a.byteLength) : new Uint8Array(a),
                    r = new DataView(n.buffer, n.byteOffset, n.byteLength),
                    o = n.byteLength > 0 ? n[0] : 0;
                if (o === 251) {
                    let u = new TextDecoder().decode(n.subarray(1)),
                        l = JSON.parse(u);
                    this.#t.ApplyFullStateRecovery(l);
                    return
                }
                if (r.byteLength === 2 && o >= 252) {
                    let u = r.getUint8(1);
                    if (o === 255) {
                        let l = new ArrayBuffer(2),
                            d = new DataView(l);
                        d.setUint8(0, 254), d.setUint8(1, u), this.#h.send(l)
                    } else if (o === 254) {
                        if (this.#y.has(u)) {
                            let l = performance.now() - this.#y.get(u);
                            this.#w.push(l), this.#w.length < i.MAX_PING_SAMPLES ? this.#u() : this.#d(e)
                        }
                    } else o === 253 ? (S.delayFrames = u, this.#t.mainMenu.StartGame(e)) : o === 252 && this.#i && this.#n();
                    return
                }
                let c = r.getUint32(0),
                    f = r.getUint8(4);
                this.#t.ctrl1 && this.#t.ctrl1.QueueInput(c, f)
            } catch (n) {
                console.error("Failed to parse network packet", n)
            }
        }), h.on("close", () => {
            this.Disconnect(), this.#t.gameState !== "MENU" && this.#t.mainMenu.StartGame(-1, 0)
        }), h.on("error", a => {
            this.Disconnect(), this.#t.gameState !== "MENU" && this.#t.mainMenu.StartGame(-1, 0)
        }), this.#h = h, h
    }
    async Host() {
        let t = Math.random().toString(36).substring(2, 7).toUpperCase();
        this.#r = t, this.#l = "HOSTING", this.#c(t, () => {
            this.#s.on("broadcast", {
                event: "player-joined"
            }, s => {
                let e = s.payload.id;
                this.#g(!0, e, 2)
            }), this.#i = !0
        })
    }
    async Join(t) {
        t && (this.#l = "JOINING", this.#c(t, () => {
            this.#s.on("broadcast", {
                event: "signal"
            }, s => {
                let e = s.payload;
                e.to === this.#e && !this.#h && this.#g(!1, e.from, 3).signal(e.signal)
            }), this.#s.send({
                type: "broadcast",
                event: "player-joined",
                payload: {
                    id: this.#e
                }
            }), this.#i = !1
        }), setTimeout(() => {
            !this.isConnected && this.#l === "JOINING" && (this.#l = "ERROR", this.#f(), setTimeout(() => {
                this.#l === "ERROR" && (this.#l = "NONE")
            }, i.errorCooldown * 1e3))
        }, i.timeoutDuration * 1e3))
    }
    Disconnect() {
        this.#l = "NONE", this.#h && (this.#h.destroy(), this.#h = null), this.#f(), this.#r = null
    }
    #o() {
        this.#w = [], this.#S = 0, this.#y.clear(), this.#u()
    }
    #u() {
        if (!this.isConnected || this.#S >= i.MAX_PING_SAMPLES) return;
        let t = new ArrayBuffer(2),
            s = new DataView(t);
        s.setUint8(0, 255), s.setUint8(1, this.#S), this.#y.set(this.#S, performance.now()), this.#h.send(t), this.#S++
    }
    #d(t) {
        if (this.#i) {
            let h = this.#w.reduce((c, f) => c + f, 0) / this.#w.length / 2,
                a = 1e3 / 60,
                n = Math.ceil(h / a) + 1;
            n = Math.max(2, Math.min(8, n)), S.delayFrames = n;
            let r = new ArrayBuffer(2),
                o = new DataView(r);
            o.setUint8(0, 253), o.setUint8(1, n), this.#h.send(r), this.#t.SetDelayedGameStart(t, n - 2)
        }
    }
    loadLibs() {
        return new Promise((t, s) => {
            if (window.SimplePeer && window.supabase) return t();
            let e = document.createElement("script");
            e.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
            let h = document.createElement("script");
            h.src = "https://cdnjs.cloudflare.com/ajax/libs/simple-peer/9.11.1/simplepeer.min.js";
            let a = 0,
                n = () => {
                    a++, a === 2 && t()
                };
            e.onload = n, h.onload = n, e.onerror = s, h.onerror = s, document.head.appendChild(e), document.head.appendChild(h)
        })
    }
};
