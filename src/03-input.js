// Input & input replay
// `InputSource`: keyboard mapping (MoveLeft…), input-sequence history (maxInputsSequence) used for netcode state recovery and replays.
var InputSource = class i {
    #t = null;
    #r = null;
    #e = 0;
    #a = !1;
    #s = {};
    #h = -1;
    #i = {
        MoveLeft: {
            pressed: !1,
            released: !0,
            flag: 1,
            action: null
        },
        MoveRight: {
            pressed: !1,
            released: !0,
            flag: 2,
            action: null
        },
        Jump: {
            pressed: !1,
            released: !0,
            flag: 4,
            action: () => this.#r.Jump()
        },
        Crouch: {
            pressed: !1,
            released: !0,
            flag: 8,
            action: null
        },
        Punch: {
            pressed: !1,
            released: !0,
            flag: 16,
            action: () => this.#r.Punch()
        },
        Kick: {
            pressed: !1,
            released: !0,
            flag: 32,
            action: () => this.#r.Kick()
        },
        Block: {
            pressed: !1,
            released: !0,
            flag: 64,
            action: null
        },
        Pause: {
            pressed: !1,
            released: !0,
            flag: -1,
            action: null
        }
    };
    static maxInputsSequence = 10;
    #y = [];
    #Fighter = [{
        sequence: ["Jump", "Jump", "MoveLeft", "MoveLeft", "MoveRight", "MoveRight"],
        action: () => {
            this.#r.bodyImg != Fighter.bodyImg2 && (this.#r.ChangeBodyImg(Fighter.bodyImg2), this.#t.PlaySound(0, 2, 1.5))
        }
    }];
    static delayFrames = 3;
    #InputSource = new Map;
    constructor(t, s, e = 0, h = -1, a = !1) {
        if (!(t instanceof FighterEngine)) throw new Error(`${this.constructor.name} requires a ${FighterEngine.name} instance.`);
        if (!(s instanceof Fighter)) throw new Error(`${this.constructor.name} requires a ${Fighter.name} instance.`);
        this.#t = t, this.#r = s, this.#e = e, this.#h = h, this.#a = a
    }
    get pawn() {
        return this.#r
    }
    get isRemote() {
        return this.#a
    }
    Begin() {
        this.#a || (window.addEventListener("keydown", t => this.#s[t.code] = !0), window.addEventListener("keyup", t => this.#s[t.code] = !1))
    }
    #l() {
        if (this.#h === -1) return;
        let t = navigator.getGamepads()[this.#h];
        if (!t) return;
        let s = t.buttons,
            e = t.axes,
            h = .5,
            a = e[0];
        this.#i.MoveLeft.pressed ||= a < -h || s[14]?.pressed, this.#i.MoveRight.pressed ||= a > h || s[15]?.pressed, this.#i.Jump.pressed ||= s[0].pressed || s[12]?.pressed || e[1] < -h, this.#i.Crouch.pressed ||= s[13]?.pressed || leftStickY > h, this.#i.Punch.pressed ||= s[2].pressed, this.#i.Kick.pressed ||= s[3].pressed, this.#i.Block.pressed ||= s[4].pressed || s[5].pressed || s[6].pressed || s[7].pressed, this.#i.Pause.pressed ||= s[9].pressed
    }
    ReadInputs() {
        if (!this.#a) {
            switch (this.#e) {
                case 0:
                    this.#i.MoveLeft.pressed = this.#s.KeyA, this.#i.MoveRight.pressed = this.#s.KeyD, this.#i.Jump.pressed = this.#s.KeyW, this.#i.Crouch.pressed = this.#s.KeyS, this.#i.Punch.pressed = this.#s.KeyR, this.#i.Kick.pressed = this.#s.KeyT, this.#i.Block.pressed = this.#s.KeyY;
                    break;
                case 1:
                    this.#i.MoveLeft.pressed = this.#s.ArrowLeft, this.#i.MoveRight.pressed = this.#s.ArrowRight, this.#i.Jump.pressed = this.#s.ArrowUp, this.#i.Crouch.pressed = this.#s.ArrowDown, this.#i.Punch.pressed = this.#s.KeyJ, this.#i.Kick.pressed = this.#s.KeyK, this.#i.Block.pressed = this.#s.KeyL;
                    break;
                case 2:
                    this.#i.MoveLeft.pressed = this.#s.KeyA || this.#s.ArrowLeft, this.#i.MoveRight.pressed = this.#s.KeyD || this.#s.ArrowRight, this.#i.Jump.pressed = this.#s.KeyW || this.#s.ArrowUp, this.#i.Crouch.pressed = this.#s.KeyS || this.#s.ArrowDown, this.#i.Punch.pressed = this.#s.KeyR || this.#s.KeyJ, this.#i.Kick.pressed = this.#s.KeyT || this.#s.KeyK, this.#i.Block.pressed = this.#s.KeyY || this.#s.KeyL;
                    break
            }
            this.#i.Pause.pressed = this.#s.Escape, this.#l(), this.#i.Pause.pressed && this.#i.Pause.released ? (this.#i.Pause.released = !1, this.#t.gameMode === "VERSUS_LOCAL" && this.#e == 1 || (this.#t.gamePaused ? this.#t.Resume() : this.#t.Pause())) : this.#i.Pause.pressed || (this.#i.Pause.released = !0)
        }
    }
    GetInputMask() {
        let t = 0;
        for (let [s, e] of Object.entries(this.#i)) e.flag <= 0 || e.pressed && (t |= e.flag);
        return t
    }
    ApplyMask(t) {
        let s = 0;
        (t & this.#i.MoveLeft.flag) !== 0 && (s -= 1), (t & this.#i.MoveRight.flag) !== 0 && (s += 1), this.#r.moveInput = s;
        let e = !1;
        for (let [h, a] of Object.entries(this.#i)) {
            if (a.flag <= 0) continue;
            let n = (t & a.flag) !== 0;
            n && a.released ? (a.released = !1, this.#n(h), e = !0, a.action && a.action()) : n || (a.released = !0)
        }
        if (this.#r.SetCrouching((t & this.#i.Crouch.flag) !== 0), this.#r.SetBlocking((t & this.#i.Block.flag) !== 0), e)
            for (let h of this.#Fighter) {
                let a = h.sequence.length;
                if (this.#y.length < a) continue;
                let n = this.#y.slice(-a);
                if (h.sequence.every((o, c) => o === n[c])) {
                    h.action && h.action(), this.ClearSequence();
                    break
                }
            }
    }
    QueueInput(t, s) {
        this.#InputSource.set(t, s)
    }
    GetInputForFrame(t) {
        return this.#InputSource.get(t)
    }
    ClearInput(t) {
        this.#InputSource.delete(t)
    }
    ClearAllInputs() {
        this.#InputSource.clear()
    }
    ClearSequence() {
        this.#y = []
    }
    #n(t) {
        this.#y.push(t), this.#y.length > i.maxInputsSequence && this.#y.shift()
    }
    Tick(t) {
        if (!this.#a) {
            if (this.ReadInputs(), !(this.#t.gameState === "FIGHTING" || this.#t.gamePaused && this.#t.isOnline && this.#a)) {
                this.#r.moveInput = 0, this.#r.SetBlocking(!1);
                return
            }
            this.ApplyMask(this.GetInputMask())
        }
    }
    Reset() {
        this.#s = {};
        for (let [t, s] of Object.entries(this.#i)) s.released = !0;
        this.#y = [], this.#r.moveInput = 0
    }
};
