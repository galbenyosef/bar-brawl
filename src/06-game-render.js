// Game renderer & audio director
// `g`: match drawing (bar, intro sheets), gravity/friction constants, frame-accurate SFX triggers (frameSfx/frameStamp), camera zoom-out, win/lose flow.
var g = class i {
    static gravity = 980;
    static friction = .98;
    #t = 2;
    #r = 0;
    #e = 1;
    #a = 0;
    #s = {
        w: 120,
        h: 80
    };
    #h = null;
    #i = null;
    static barImage = Object.assign(new Image, {
        src: "assets/bar.png"
    });
    static barImageSize = {
        w: 128,
        h: 80
    };
    #y = 0;
    static defaultBarAnimTimer = 35 / 60;
    static maxBarAnimState = 2;
    #w = 0;
    #S = i.defaultBarAnimTimer;
    #l = null;
    #n = null;
    #c = null;
    #f = null;
    #g = null;
    #o;
    #u;
    #d = !1;
    static maxRounds = 3;
    #I = 0;
    #p = 0;
    #C = 0;
    static maxRoundTime = 99;
    #L = 0;
    static IntroSheet = Object.assign(new Image, {
        src: "assets/intro.png"
    });
    static frameStamp = [1, 1.15, 1.3, 1.45, 1.6, 3.5, 3.55, 3.6, 3.65, 3.7, 3.75, 5.75, 8.2, 8.35, 8.5, 8.65, 8.8, 9.3];
    static frameSfx = [null, null, null, null, null, [22, 1, 1],
        [25, 1.2, .4], null, null, null, null, [23, 1, 1],
        [24, 1, 1], null, null, null, [26, 1, 1], null
    ];
    #D = 0;
    static maxIntroFramesLine = 6;
    static maxIntroState = 18;
    #x = 0;
    #O = new T(this);
    #P = 0;
    #R = {
        state: null,
        frames: -1
    };
    #Y = !1;
    #q = 0;
    #U = 0;
    #F = 0;
    static lockRecoveryTimeout = 1.5;
    static lockRecoveryCooldown = 1.5;
    static maxLockRecoveryAttempts = 4;
    static uiSheet = Object.assign(new Image, {
        src: "assets/ui_sheet.png"
    });
    #X = null;
    #K = null;
    static tCanvas = document.createElement("canvas");
    static tCtx = i.tCanvas.getContext("2d");
    static defaultUiGameOverTimer = .25;
    #A = 0;
    #H = "";
    static defaultUiCreditsTimer = 8;
    #G = 0;
    static uiCreditsSize = 12;
    #B = 0;
    #M = "";
    static defaultUiRoundTimer = .75;
    #E = 0;
    #m = {
        x: .5,
        y: .4
    };
    static uiRoundSize = 16;
    static defaultUiRoundAfterTimer = .25;
    #v = 0;
    #b = {
        x: .5,
        y: 11
    };
    static uiRoundAfterSize = 8;
    static uiRoundFillColor = "#feffff";
    static uiRoundOutlineColor = "#545454";
    static defaultUiFightTimer = .75;
    #k = 0;
    #$ = !1;
    static uiFightFillColor = "#e66257";
    static uiFightOutlineColor = "#331505";
    #T = "";
    static defaultUiWinnerTimer = 1.3;
    #W = 0;
    static uiWinnerFillColor = "#feffff";
    static uiWinnerOutlineColor = "#545454";
    #z = 0;
    #Q = 0;
    #st = 0;
    #V = {
        x: 0,
        y: 0
    };
    #j = "#000";
    #J = 0;
    #et = 0;
    #ht = 0;
    #Z = 0;
    #_ = [];
    #N = null;
    #tt = [];
    static soundFix = ["assets/", ".ogg"];
    static sounds = [{
        name: "ui",
        bus: 1
    }, {
        name: "punch_1",
        bus: 0
    }, {
        name: "punch_2",
        bus: 0
    }, {
        name: "hit_1",
        bus: 0
    }, {
        name: "hit_2",
        bus: 0
    }, {
        name: "groan_1",
        bus: 0
    }, {
        name: "groan_2",
        bus: 0
    }, {
        name: "huh_1",
        bus: 0
    }, {
        name: "huh_2",
        bus: 0
    }, {
        name: "step_1",
        bus: 0
    }, {
        name: "step_2",
        bus: 0
    }, {
        name: "idle",
        bus: 0
    }, {
        name: "round1",
        bus: 0
    }, {
        name: "round2",
        bus: 0
    }, {
        name: "round3",
        bus: 0
    }, {
        name: "fight",
        bus: 0
    }, {
        name: "you_won",
        bus: 0
    }, {
        name: "you_lost",
        bus: 0
    }, {
        name: "p1_wins",
        bus: 0
    }, {
        name: "p2_wins",
        bus: 0
    }, {
        name: "draw",
        bus: 0
    }, {
        name: "gameover",
        bus: 0
    }, {
        name: "dialogue1",
        bus: 0
    }, {
        name: "dialogue2",
        bus: 0
    }, {
        name: "dialogue3",
        bus: 0
    }, {
        name: "zoomout",
        bus: 0
    }, {
        name: "bottle_breaking",
        bus: 0
    }, {
        name: "intro_bg",
        bus: 0
    }, {
        name: "music_menu",
        bus: 2
    }, {
        name: "music_round",
        bus: 2
    }];
    #at = [];
    #ot = .5;
    #it = null;
    constructor() {}
    get gameState() {
        return this.#o
    }
    get gameMode() {
        return this.#u
    }
    get gamePaused() {
        return this.#d
    }
    get gravity() {
        return i.gravity
    }
    get friction() {
        return i.friction
    }
    get groundY() {
        return this.#t
    }
    get worldWidth() {
        return this.#r
    }
    get canvasSize() {
        return this.#s
    }
    get canvas() {
        return this.#h
    }
    get isHost() {
        return this.#u === "VERSUS_HOST"
    }
    get isOnline() {
        return this.isHost || this.#u === "VERSUS_CLIENT"
    }
    isFighterLocal(t) {
        return this.#f.pawn === t
    }
    get networkStatus() {
        return this.#O.status
    }
    get isGameLocked() {
        return this.#Y
    }
    get fighter0() {
        return this.#n
    }
    get fighter1() {
        return this.#c
    }
    getOpponent(t) {
        return this.fighter0 === t ? this.fighter1 : this.fighter0
    }
    get ctrl0() {
        return this.#f
    }
    get ctrl1() {
        return this.#g
    }
    get mainMenu() {
        return this.#l
    }
    get musicSfx() {
        return this.#it
    }
    getScore(t) {
        return t === this.#n ? this.#p : this.#C
    }
    async Begin() {
        this.#h = document.getElementById("game-canvas"), this.#h.width = this.#s.w * 2, this.#h.height = this.#s.h * 2, this.#i = this.#h.getContext("2d"), this.#i.imageSmoothingEnabled = !1, this.#l = new C(this), this.#l.Begin(), this.#t = this.#s.h - this.#t, this.#r = this.#s.w, this.#n = new w(this, 0), this.#c = new w(this, 1), this.#n.Begin(), this.#c.Begin(), this.#m.x *= this.#h.width, this.#m.y *= this.#h.height, this.#b.x *= this.#h.width, i.uiSheet.onload = () => {
            this.#X = i.#nt(i.uiSheet, "r"), this.#K = i.#nt(i.uiSheet, "g")
        }, window.onbeforeunload = () => {
            this.Disconnect()
        };
        let t = async () => {
            if (!this.isOnline && !this.#d && this.#o !== "MENU") this.Pause();
            else return;
            await this.Wait(50), t()
        };
        window.addEventListener("blur", t), document.addEventListener("visibilitychange", () => {
            document.hidden && t()
        }), this.SetGameState(0), await this.#rt()
    }
    Tick(t) {
        for (let e = this.#_.length - 1; e >= 0; e--) this.#_[e].time -= t, this.#_[e].time <= 0 && (this.#_[e].resolve(), this.#_.splice(e, 1));
        (this.#o === "MENU" || this.#d) && this.#l.Tick(t), this.#R.frames >= 0 && this.#R.state != null && (this.#R.frames--, this.#R.frames <= 0 && (this.#l.StartGame(this.#R.state), this.#R.state = null, this.#R.frames = -1));
        let s = !1;
        if (this.isOnline) {
            this.#f.ReadInputs();
            let e = this.#f.GetInputMask();
            (this.#o !== "FIGHTING" || this.#d) && (e = 0);
            let h = this.#P + S.delayFrames >>> 0;
            this.#f.QueueInput(h, e), this.#O.SendInput(h, e);
            let a = this.#f.GetInputForFrame(this.#P),
                n = this.#g.GetInputForFrame(this.#P);
            a === void 0 || n === void 0 ? s = !0 : (this.#f.ApplyMask(a), this.#g.ApplyMask(n), this.#f.ClearInput(this.#P), this.#g.ClearInput(this.#P)), this.#Y = s, s ? (this.#q += t, this.#U > 0 && (this.#U -= t), this.#q >= i.lockRecoveryTimeout && this.#U <= 0 && (this.#q = 0, this.#U = i.lockRecoveryCooldown, this.#F++, this.#F > i.maxLockRecoveryAttempts ? this.Disconnect() : this.#O.RequestFullStateRecovery())) : (this.#q = 0, this.#F = 0)
        } else this.#o === "FIGHTING" && !this.#d ? (this.#f?.Tick(t), this.#g?.Tick(t)) : (this.#f?.ReadInputs(), this.#g instanceof S && this.#g.ReadInputs());
        if (!s) {
            this.#a >= 0 && this.#a != null && (this.#a -= t, this.#a <= 0 && (this.#e = 1));
            let e = t * (this.#d && !this.isOnline ? 0 : this.#e);
            this.#n.Tick(e), this.#c.Tick(e), this.#n.ResolvePendingDamage(), this.#c.ResolvePendingDamage(), this.gameState === "FIGHTING" && (this.#n.zeroHealth && this.#c.zeroHealth ? this.RoundOver(null, !0) : this.#n.zeroHealth ? this.RoundOver(this.#n) : this.#c.zeroHealth && this.RoundOver(this.#c)), (this.isOnline || this.#o === "FIGHTING" && !this.#d) && (this.#P = this.#P + 1 >>> 0, this.#L > 0 && (this.#L -= t, this.#L <= 0 && (this.#L = 0, Math.abs(this.#n.health - this.#c.health) <= 1 ? this.RoundOver(null, !0) : this.RoundOver(this.#n.health > this.#c.health ? this.#c : this.#n))))
        }
        if (this.#Z !== 0) {
            this.#ht += t;
            let e = this.#Z,
                h = this.#ht / this.#et;
            h >= 1 && (h = 1, this.#Z = 0), e === 1 ? this.#J = h : e === -1 && (this.#J = 1 - h)
        }
        if (!(this.#d && !this.isOnline)) {
            if (this.#S -= t, this.#S <= 0 && (this.#w = this.#w == i.maxBarAnimState - 1 && Math.random() > .6 ? 2 : (this.#w + 1) % i.maxBarAnimState, this.#S += i.defaultBarAnimTimer), this.#o === "INTRO") {
                this.#D += t;
                let e = i.frameStamp[this.#x];
                if (this.#D >= e) {
                    if (this.#x === i.maxIntroState - 1) this.Fade("#000", 500), this.#x++;
                    else if (this.#x < i.maxIntroState - 1) {
                        this.#x++;
                        let h = i.frameSfx[this.#x];
                        h && this.PlaySound(h[0], h[1], h[2])
                    }
                }
                this.#x == 16 && this.CameraShake(5, 150), this.#x >= i.maxIntroState && this.#ht >= this.#et && (this.#it && this.#it.StopSound(500), this.Fade("#000", 500, -1), this.SetGameState(2))
            }
            if (this.#A > 0 && this.#o === "GAME_OVER" && (this.#A -= t), this.#G > 0 && (this.#G -= t, this.#G <= 0 && (this.SetGameState(0), this.Fade("#000", 500, -1))), this.#E > 0 && (this.#E -= t, this.#E <= 0 && (this.#v = i.defaultUiRoundAfterTimer)), this.#v > 0 && (this.#v -= t, this.#v <= 0 && (this.#k = i.defaultUiFightTimer, this.#$ = !1)), this.#k > 0 && (this.#k -= t, this.#k <= i.defaultUiFightTimer / 3 && !this.#$ && (this.#$ = !0, this.SetGameState(3))), this.#W > 0 && this.#o === "POS_ROUND" && (this.#W -= t), this.#z > 0)
                if (this.#z -= t, this.#z <= 0) this.#z = 0, this.#V.x = 0, this.#V.y = 0;
                else {
                    let e = this.#z / this.#Q,
                        h = this.#st * e;
                    this.#V.x = (Math.random() * 2 - 1) * h, this.#V.y = (Math.random() * 2 - 1) * h
                }
        }
    }
    Draw() {
        this.#i.clearRect(0, 0, this.#h.width, this.#h.height), this.#i.save(), this.#i.scale(2, 2), this.#z > 0 && this.#i.translate(this.#V.x, this.#V.y);
        let t = 0;
        if (this.#o === "INTRO") {
            let s = i.maxIntroFramesLine,
                e = Math.ceil(i.maxIntroState / s),
                h = i.IntroSheet.width / s,
                a = i.IntroSheet.height / e,
                n = this.#x % s,
                r = Math.floor(this.#x / s),
                o = {
                    x: n * h,
                    y: r * a
                };
            this.#i.drawImage(i.IntroSheet, o.x | 0, o.y | 0, h | 0, this.#s.h | 0, 0, 0, this.#s.w | 0, this.#s.h | 0)
        } else if (this.#o === "CREDITS") this.#i.fillStyle = "#000000", this.#i.fillRect(0, 0, this.#h.width, this.#h.height);
        else if (this.#o === "GAME_OVER") {
            this.#i.fillStyle = "#000000", this.#i.fillRect(0, 0, this.#h.width, this.#h.height);
            let s = (this.#n.loc.x + this.#c.loc.x) / 2 + this.#n.size.w / 2;
            t = this.#h.width / 4 - s
        } else if (i.barImage && i.barImage.complete) {
            let s = this.#s.h / i.barImageSize.h;
            this.#r = i.barImageSize.w * s;
            let e = (this.fighter0.loc.x + this.fighter1.loc.x) / 2 + this.fighter0.size.w / 2,
                h = Math.max(0, Math.min(1, e / this.#s.w));
            t = -((this.#r - this.#s.w) * h);
            let n = {
                x: 0,
                y: i.barImageSize.h * this.#y
            };
            switch (this.#w) {
                case 0:
                    n.x = 0;
                    break;
                case 1:
                    n.x = i.barImageSize.w;
                    break;
                case 2:
                    n.x = i.barImageSize.w * 2;
                    break
            }
            this.#i.drawImage(i.barImage, n.x, n.y, i.barImageSize.w, i.barImageSize.h, t | 0, 0, this.#r | 0, this.#s.h | 0)
        }
        if (this.#i.save(), this.#i.translate(t | 0, 0), this.#o !== "GAME_OVER" && this.#o !== "CREDITS" && this.#o !== "INTRO" && (this.#n.Draw(this.#i), this.#c.Draw(this.#i)), this.#i.restore(), this.#o !== "GAME_OVER" && this.#o !== "CREDITS" && this.#o !== "INTRO" && i.barImage && i.barImage.complete && this.#i.drawImage(i.barImage, i.barImageSize.w * 3, this.#y * i.barImageSize.h, i.barImageSize.w, i.barImageSize.h, t | 0, 0, this.#r | 0, this.#s.h | 0), this.#n.DrawUI(this.#i), this.#c.DrawUI(this.#i), this.#i.restore(), this.#i.save(), this.#o === "CREDITS") {
            let s = i.uiCreditsSize,
                e = i.uiRoundAfterSize,
                h = 1 - this.#G / i.defaultUiCreditsTimer,
                a = this.#B + (this.#B * -2 - this.#B) * h,
                n = Math.min(1, h / (1 / 4 / 2 / 2 / 2));
            s *= n, e *= n, this.DrawPixelText(this.#i, "Game by", this.#m.x | 0, a | 0, e | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "dig0w", this.#m.x | 0, a + 15 | 0, s | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "Logo by", this.#m.x | 0, a + 75 | 0, e | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "Rift", this.#m.x | 0, a + 90 | 0, s | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "Sound Effects", this.#m.x | 0, a + 150 | 0, e | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, '"Bottles Breaking.wav" by', this.#m.x | 0, a + 165 | 0, e | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "Tim_Verberne", this.#m.x | 0, a + 180 | 0, s | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, '"Sound of an Irish Pub" by', this.#m.x | 0, a + 210 | 0, e | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "jonnymccullagh", this.#m.x | 0, a + 225 | 0, s | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "Special Thanks to", this.#m.x | 0, a + 285 | 0, e | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "Dogo, Mewy", this.#m.x | 0, a + 300 | 0, s | 0, i.uiRoundFillColor, "#00000000")
        } else if (this.#o === "GAME_OVER") {
            let s = i.uiRoundSize;
            if (this.#A > 0) {
                let e = this.#A / i.defaultUiGameOverTimer;
                s *= 1 - e
            }
            this.DrawPixelText(this.#i, this.#H, this.#m.x | 0, this.#m.y - 17 | 0, s | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, `${this.#p} - ${this.#C}`, this.#m.x | 0, this.#m.y | 0, s * .75 | 0, i.uiRoundFillColor, "#00000000"), this.DrawPixelText(this.#i, "Game Over", this.#m.x | 0, this.#m.y + 17 | 0, s | 0, i.uiRoundFillColor, "#00000000"), this.#i.save(), this.#i.scale(2, 2), this.#n.Draw(this.#i), this.#c.Draw(this.#i), this.#i.restore()
        }
        if (this.#E > 0) this.DrawPixelText(this.#i, this.#M, this.#m.x | 0, this.#m.y | 0, i.uiRoundSize | 0, i.uiRoundFillColor, i.uiRoundOutlineColor);
        else if (this.#v > 0) {
            let s = this.#v / i.defaultUiRoundAfterTimer,
                e = this.#b.x + (this.#m.x - this.#b.x) * s,
                h = this.#b.y + (this.#m.y - this.#b.y) * s,
                a = i.uiRoundAfterSize + (i.uiRoundSize - i.uiRoundAfterSize) * s;
            this.DrawPixelText(this.#i, this.#M, e | 0, h | 0, a | 0, i.uiRoundFillColor, i.uiRoundOutlineColor)
        } else this.#M != "" && this.DrawPixelText(this.#i, this.#M, this.#b.x | 0, this.#b.y | 0, i.uiRoundAfterSize | 0, i.uiRoundFillColor, i.uiRoundOutlineColor);
        if ((this.#E > 0 || this.#v > 0 || this.#M != "") && this.DrawPixelText(this.#i, `${Math.min(this.#L+1|0,i.maxRoundTime)}`, this.#b.x | 0, this.#b.y + i.uiRoundAfterSize + 2 | 0, i.uiRoundAfterSize | 0, i.uiRoundFillColor, i.uiRoundOutlineColor), this.#k > 0) {
            let s = i.defaultUiFightTimer - this.#k,
                e = i.defaultUiFightTimer / 3,
                h = 0;
            if (s <= e) {
                let a = s / e;
                h = i.uiRoundSize * a
            } else if (s <= 2 * e) h = i.uiRoundSize;
            else {
                let a = (s - 2 * e) / e;
                h = i.uiRoundSize * (1 - a)
            }
            this.DrawPixelText(this.#i, "Fight!", this.#m.x | 0, this.#m.y | 0, h | 0, i.uiFightFillColor, i.uiFightOutlineColor)
        } else if (this.#W > 0 && this.#o === "POS_ROUND") {
            let s = i.defaultUiWinnerTimer - this.#W,
                e = i.defaultUiWinnerTimer / 2,
                h = 0;
            if (s <= e) {
                let a = s / e;
                h = i.uiRoundSize * a
            } else h = i.uiRoundSize;
            this.DrawPixelText(this.#i, this.#T, this.#m.x | 0, this.#m.y | 0, h | 0, i.uiWinnerFillColor, i.uiWinnerOutlineColor)
        }
        this.isOnline && this.#Y && this.#o === "FIGHTING" && this.DrawPixelText(this.#i, "Syncing...", this.#m.x | 0, this.#h.height - 16 | 0, i.uiRoundAfterSize, i.uiRoundFillColor, "#00000000"), (this.#o === "MENU" || this.#d) && this.#l.Draw(this.#i), this.#J > 0 && (this.#i.save(), this.#i.globalAlpha = this.#J, this.#i.fillStyle = this.#j, this.#i.fillRect(0, 0, this.#h.width, this.#h.height), this.#i.restore()), this.#i.restore()
    }
    SetGameState(t, s = -1) {
        switch (t) {
            case 0:
            case "MENU":
                this.#o = "MENU", this.#d = !1, s = 0, this.#O.hasConnection && this.Disconnect(), this.#l.Reset(), this.#n.Reset(!0), this.#c.Reset(!0), this.#I = 0, this.#p = 0, this.#C = 0, this.#S = i.defaultBarAnimTimer, this.#D = 0, this.#x = 0, this.#A = 0, this.#G = 0, this.#E = 0, this.#v = 0, this.#k = 0, this.#W = 0, this.#M = "", this.isOnline || this.#tt[0]?.gain.setValueAtTime(1, this.#N.currentTime);
                break;
            case 1:
            case "INTRO":
                this.#o = "INTRO", this.#h.style.cursor = "none", this.#D = 0, this.#x = 0, this.#it = this.PlaySound(27, 1, .25, !0, 500);
                break;
            case 2:
            case "PRE_ROUND":
                this.#o = "PRE_ROUND", this.StartRound(), this.#h.style.cursor = "none";
                break;
            case 3:
            case "FIGHTING":
                this.#o = "FIGHTING", this.#h.style.cursor = "none";
                break;
            case 4:
            case "POS_ROUND":
                this.#o = "POS_ROUND", this.#h.style.cursor = "none";
                break;
            case 5:
            case "GAME_OVER":
                this.#o = "GAME_OVER", this.#h.style.cursor = "none";
                break;
            case 6:
            case "CREDITS":
                this.#o = "CREDITS", this.#h.style.cursor = "none", this.#G = i.defaultUiCreditsTimer, this.#B = this.#h.height;
                break
        }
        if (s >= 0) {
            switch (this.#f = null, this.#g = null, s) {
                case 0:
                case "MAIN":
                    this.#u = "MAIN", this.#f = new S(this, this.#n, 2, 0), this.#g = new A(this, this.#c, .8);
                    break;
                case 1:
                case "VERSUS_LOCAL":
                    this.#u = "VERSUS_LOCAL", this.#f = new S(this, this.#n, 0, 0), this.#g = new S(this, this.#c, 1, 1);
                    break;
                case 2:
                case "VERSUS_HOST":
                    this.#u = "VERSUS_HOST", this.#f = new S(this, this.#n, 2, 0), this.#g = new S(this, this.#c, 0, 1, !0);
                    break;
                case 3:
                case "VERSUS_CLIENT":
                    this.#u = "VERSUS_CLIENT", this.#f = new S(this, this.#c, 2, 0), this.#g = new S(this, this.#n, 0, 1, !0);
                    break
            }
            this.#f?.Begin(), this.#g?.Begin()
        }
    }
    SlowTime(t = .1, s = 50) {
        this.#e = t, this.#a = s / 1e3
    }
    async StartRound() {
        if (this.#p == i.maxRounds - 1 || this.#C == i.maxRounds - 1 || this.#I == i.maxRounds) return this.GameOver();
        if (this.#n.Reset(), this.#c.Reset(), this.#E = i.defaultUiRoundTimer, this.#M = `Round ${this.#I+1}`, this.#u === "MAIN" && (this.#y = this.#I), this.#f?.ClearAllInputs(), this.#g instanceof S && this.#g.ClearAllInputs(), this.#P = 0, this.isOnline)
            for (let t = 0; t < S.delayFrames; t++) this.#f.QueueInput(t, 0), this.#g.QueueInput(t, 0);
        this.#I++, this.#L = i.maxRoundTime, await this.Wait(50), this.PlaySound(11 + this.#I), await this.Wait(950), this.PlaySound(15, 1, 1, !1, 175)
    }
    async RoundOver(t, s = !1) {
        if (t != null ^ s && !(t && t != this.#n && t != this.#c) && this.#o === "FIGHTING" && (this.#f.Reset(), this.#g?.Reset(), this.SetGameState(4), this.#M = "", await this.Wait(50), this.#o === "POS_ROUND" && (this.#W = i.defaultUiWinnerTimer, s ? this.#T = "Draw!" : t == this.#n ? (this.#T = this.#u === "MAIN" ? "You Lost!" : "P2 Wins!", this.#c.Celebrate(), this.#C++) : (this.#T = this.#u === "MAIN" ? "You Won!" : "P1 Wins!", this.#n.Celebrate(), this.#p++), await this.Wait(400), s ? this.PlaySound(20) : this.#u === "MAIN" ? t == this.#n ? this.PlaySound(17) : this.PlaySound(16) : t == this.#n ? this.PlaySound(19) : this.PlaySound(18), this.#o === "POS_ROUND"))) {
            if (this.#e = .1, this.#it && this.#it.StopSound(1e3), await this.Wait(400), this.#o !== "POS_ROUND") {
                this.#e = 1;
                return
            }
            if (this.Fade("#000", 500), await this.Wait(1200), this.#o !== "POS_ROUND") {
                this.Fade("#000", 500, -1);
                return
            }
            this.SetGameState(2), this.#e = 1, this.Fade("#000", 500, -1)
        }
    }
    async GameOver() {
        if (this.SetGameState(5), this.#A = i.defaultUiGameOverTimer, this.#p != this.#C ? this.#p < this.#C ? (this.#H = this.#u === "MAIN" ? "You Lost" : "P2 Wins", this.#n.EndState(0), this.#c.EndState(1)) : (this.#H = this.#u === "MAIN" ? "You Won" : "P1 Wins", this.#n.EndState(1), this.#c.EndState(0)) : (this.#H = "Double Loss", this.#n.EndState(0), this.#c.EndState(0)), await this.Wait(500), this.PlaySound(21), await this.Wait(3500), this.#o === "GAME_OVER") {
            if (this.Fade("#000", 500), await this.Wait(1200), this.#o !== "GAME_OVER") {
                this.Fade("#000", 500, -1);
                return
            }
            this.#u !== "MAIN" ? this.SetGameState(0) : this.SetGameState(6), this.isOnline && this.Disconnect(), this.Fade("#000", 500, -1)
        }
    }
    Pause() {
        this.#Z !== 0 || this.#J !== 0 || this.#o === "MENU" || this.#o === "GAME_OVER" || this.#o === "CREDITS" || (this.#l.fadeTimer = C.defaultFadeTimer, this.#l.fadeDirection = -1, this.#d = !0, this.#l.Reset(), this.#l.ToMenu(6), this.isOnline || this.#tt[0].gain.setValueAtTime(0, this.#N.currentTime))
    }
    async Resume() {
        this.#Z !== 0 || this.#J !== 0 || (this.#l.fadeTimer = C.defaultFadeTimer, this.#l.fadeDirection = 1, await this.Wait(C.defaultFadeTimer * 1e3), this.#d = !1, this.#h.style.cursor = "none", this.isOnline || this.#tt[0].gain.setValueAtTime(1, this.#N.currentTime))
    }
    async #rt() {
        this.#N = new(window.AudioContext || window.webkitAudioContext);
        let t = 0;
        for (let s = 0; s < i.sounds.length; s++) {
            let e = i.sounds[s];
            e.bus > t && (t = e.bus);
            try {
                let a = await (await fetch(i.soundFix[0] + e.name + i.soundFix[1])).arrayBuffer();
                this.#at[s] = await this.#N.decodeAudioData(a)
            } catch (h) {
                console.error(`Failed to load sound: ${e.name}`, h)
            }
        }
        for (let s = 0; s <= t; s++) {
            let e = this.#N.createGain();
            this.#tt.push(e), e.connect(this.#N.destination)
        }
    }
    PlaySound(t, s = 1, e = 1, h = !1, a = 0) {
        let n = this.#at[t];
        if (!n) return;
        this.#N.state === "suspended" && this.#N.resume();
        let r = this.#N.createBufferSource();
        r.buffer = n, r.playbackRate.value = s, r.loop = h;
        let o = this.#N.createGain(),
            c = this.#ot * e,
            f = this.#N.currentTime;
        a > 0 ? (o.gain.setValueAtTime(0, f), o.gain.linearRampToValueAtTime(c, f + a / 1e3)) : o.gain.setValueAtTime(c, f), r.connect(o);
        let u = i.sounds[t].bus;
        return this.#tt[u] || (u = 0), o.connect(this.#tt[u]), r.start(0), {
            source: r,
            gainNode: o,
            StopSound: async (l = 0) => {
                let d = this.#N.currentTime;
                if (l > 0) {
                    o.gain.cancelScheduledValues(d), o.gain.setValueAtTime(o.gain.value, d), o.gain.linearRampToValueAtTime(0, d + l / 1e3), r.stop(d + l / 1e3), await this.Wait(l);
                    try {
                        r.disconnect()
                    } catch {}
                } else try {
                    r.stop(), r.disconnect()
                } catch {}
            }
        }
    }
    get sessionCode() {
        return this.#O.sessionCode
    }
    Host() {
        this.#O.Host()
    }
    Join(t) {
        this.#O.Join(t)
    }
    Disconnect() {
        this.#O.Disconnect()
    }
    SetDelayedGameStart(t, s) {
        this.#R.state = t, this.#R.frames = s
    }
    loadLibs() {
        return this.#O.loadLibs()
    }
    SerializeState() {
        return {
            frame: this.#P,
            gameState: this.#o,
            rounds: this.#I,
            scoreF0: this.#p,
            scoreF1: this.#C,
            delayFrames: S.delayFrames,
            fighter0: this.#n.SerializeState(),
            fighter1: this.#c.SerializeState()
        }
    }
    ApplyFullStateRecovery(t) {
        if (!(!t || !this.isOnline || !this.#f || !this.#g)) {
            this.#n.ApplyState(t.fighter0), this.#c.ApplyState(t.fighter1), this.#P = t.frame >>> 0, this.#I = t.rounds, this.#p = t.scoreF0, this.#C = t.scoreF1, S.delayFrames = t.delayFrames, t.gameState && (this.#o = t.gameState), this.#f.ClearAllInputs(), this.#g.ClearAllInputs();
            for (let s = 0; s < S.delayFrames; s++) {
                let e = this.#P + s >>> 0;
                this.#f.QueueInput(e, 0), this.#g.QueueInput(e, 0)
            }
            this.#Y = !1, this.#q = 0, this.#U = 0, this.#F = 0
        }
    }
    DrawPixelText(t, s, e, h, a = 5, n = "#fff", r = "#000") {
        if (!this.#X || !this.#K || a <= 0) return;
        let o = {
                w: 8,
                h: 8
            },
            c = {
                w: a * (o.w / o.h) | 0,
                h: a
            },
            f = 0,
            u = c.w / 3 | 0,
            l = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", '0123456789.!?_,-"'],
            d = 0;
        for (let m = 0; m < s.length; m++) {
            let y = s[m].toUpperCase();
            d += y === " " ? u : c.w, m < s.length - 1 && (d += f)
        }
        let x = e - d / 2 | 0;
        i.tCanvas.width = c.w, i.tCanvas.height = c.h, i.tCtx.imageSmoothingEnabled = !1, t.imageSmoothingEnabled = !1;
        for (let m = 0; m < s.length; m++) {
            m != 0 && (x += f);
            let y = s[m].toUpperCase();
            if (y === " ") {
                x += u;
                continue
            }
            let p = -1,
                k = -1;
            do k++, p = l[k].indexOf(y); while (p === -1 && k != l.length - 1);
            if (p === -1) continue;
            let R = {
                    x: p * o.w,
                    y: k * o.h
                },
                M = (B, z) => {
                    i.tCtx.clearRect(0, 0, c.w, c.h), i.tCtx.globalCompositeOperation = "source-over", i.tCtx.drawImage(B, R.x, R.y, o.w, o.h, 0, 0, c.w, c.h), i.tCtx.globalCompositeOperation = "source-in", i.tCtx.fillStyle = z, i.tCtx.fillRect(0, 0, c.w, c.h), t.drawImage(i.tCanvas, x | 0, h | 0)
                };
            M(this.#K, n), M(this.#X, r), x += c.w
        }
    }
    CameraShake(t = 5, s = 300) {
        this.#st = t, this.#Q = s / 1e3, this.#z = this.#Q
    }
    Fade(t = "#000", s = 500, e = 1) {
        this.#j = t, this.#et = s / 1e3, this.#ht = 0, this.#Z = e
    }
    static #nt(t, s = "r") {
        let e = document.createElement("canvas"),
            h = e.getContext("2d");
        e.width = t.width, e.height = t.height, h.drawImage(t, 0, 0);
        let a = h.getImageData(0, 0, e.width, e.height),
            n = a.data,
            r = s === "r" ? 0 : s === "g" ? 1 : s === "b" ? 2 : 0;
        for (let o = 0; o < n.length; o += 4) n[o + r] > 127 ? (n[o] = 255, n[o + 1] = 255, n[o + 2] = 255, n[o + 3] = 255) : n[o + 3] = 0;
        return h.putImageData(a, 0, 0), e
    }
    Wait(t) {
        return new Promise(s => {
            this.#_.push({
                time: t / 1e3,
                resolve: s
            })
        })
    }
};
export {
    g as FighterEngine
