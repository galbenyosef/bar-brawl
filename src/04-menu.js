// Menu & UI screens
// `MenuScreen`: intro/logo screens, menu options list, fade/copy timers, pixel-text UI drawing.
var MenuScreen = class i {
    #t = null;
    #r = {};
    #e = {};
    #a = {
        x: 0,
        y: 0
    };
    #s = !1;
    #h = {};
    #i = {};
    #y = .5;
    #Fighter = 0;
    static logoImage = Object.assign(new Image, {
        src: "assets/logo.png"
    });
    static menusOptions = [
        ["START", "VERSUS"],
        ["LOCAL", "ONLINE", "BACK"],
        ["HOST", "JOIN", "BACK"],
        ["cCODE", "BACK"],
        ["iCODE", "BACK"],
        ["AAA", "BBB", "CCC", "BACK"],
        ["RESUME", "QUIT"]
    ];
    #InputSource = 0;
    #l = ["START", "VERSUS"];
    #n = 0;
    #c = !1;
    #f = !0;
    static optionsSize = 8;
    static optionsMargin = 4;
    static optionsWidth = 32;
    #FighterEngine;
    #o;
    static defaultCopyTimer = .3;
    #u = 0;
    #d = "";
    #Circle = !1;
    static defaultFadeTimer = .1;
    #p = 1;
    fadeTimer = 0;
    fadeDirection = 0;
    constructor(t) {
        if (!(t instanceof FighterEngine)) throw new Error(`${this.constructor.name} requires a ${FighterEngine.name} instance.`);
        this.#t = t, this.#FighterEngine = this.#t.canvas.height / 1.7, this.#o = this.#t.canvas.width / 2
    }
    Begin() {
        window.addEventListener("keydown", t => this.#r[t.code] = !0), window.addEventListener("keyup", t => this.#r[t.code] = !1), this.#t.canvas.addEventListener("mousemove", t => {
            let s = this.#t.canvas.getBoundingClientRect();
            this.#a.x = (t.clientX - s.left) / (s.width / this.#t.canvas.width), this.#a.y = (t.clientY - s.top) / (s.height / this.#t.canvas.height)
        }), this.#t.canvas.addEventListener("mousedown", () => {
            this.#s && this.#D()
        }), window.addEventListener("keydown", t => {
            this.#Circle && (t.key === "Enter" ? (this.#Circle = !1, this.#d.length === 5 && this.#t.Join(this.#d)) : t.key === "Backspace" ? this.#d = this.#d.slice(0, -1) : t.key.length === 1 && this.#d.length < 5 && /[a-zA-Z0-9]/.test(t.key) && (this.#d += t.key.toUpperCase()))
        }), window.addEventListener("paste", t => {
            if (!this.#Circle) return;
            let s = (t.clipboardData || window.clipboardData).getData("text");
            this.#d = this.#d.slice(0, -1);
            let e = s.replace(/[^a-zA-Z0-9]/FighterEngine, "").toUpperCase(),
                h = 5 - this.#d.length;
            h > 0 && (this.#d += e.substring(0, h)), t.preventDefault()
        })
    }
    #MenuScreen(t, s) {
        return this.#r[t] && !this.#e[t] || this.#h[s] && !this.#i[s]
    }
    #L() {
        let t = navigator.getGamepads()[0];
        t && (this.#h = {}, t.buttons[12].pressed && (this.#h.UP = !0), t.buttons[13].pressed && (this.#h.DOWN = !0), t.buttons[0].pressed && (this.#h.CONFIRM = !0), t.buttons[1].pressed && (this.#h.BACK = !0), t.buttons[9].pressed && (this.#h.BACK = !0), this.#Fighter <= 0 ? t.axes[1] < -this.#y ? (this.#h.UP = !0, this.#Fighter = .2) : t.axes[1] > this.#y && (this.#h.DOWN = !0, this.#Fighter = .2) : this.#Fighter -= .016)
    }
    Tick(t) {
        if (this.fadeTimer > 0 && (this.fadeTimer -= t, this.fadeTimer < 0 && (this.fadeTimer = 0)), this.#t.gameState !== "MENU" && !this.#t.gamePaused || !this.#f) return;
        this.#L();
        let s = this.#n;
        this.#MenuScreen("ArrowUp", "UP") && (this.#n = (this.#n - 1 + this.#l.length) % this.#l.length), this.#MenuScreen("ArrowDown", "DOWN") && (this.#n = (this.#n + 1) % this.#l.length), (this.#MenuScreen("Enter", "CONFIRM") || this.#MenuScreen("Space", "CONFIRM")) && this.#D(), this.#MenuScreen("Escape", "BACK") && this.Back(), this.#e = {
            ...this.#r
        }, this.#i = {
            ...this.#h
        }, this.#s = !1, this.#l.forEach((e, h) => {
            let a = this.#FighterEngine + h * (i.optionsSize + i.optionsMargin) + 3;
            this.#a.x > this.#o - i.optionsWidth && this.#a.x < this.#o + i.optionsWidth && this.#a.y > a - 6 && this.#a.y < a + 6 && (this.#n = h, this.#s = !0)
        }), this.#s ? (this.#t.canvas.style.cursor = "pointer", this.#l[this.#n].startsWith("i") && (this.#t.canvas.style.cursor = "text")) : this.#t.canvas.style.cursor = "default", s != this.#n && (this.#c || this.#t.PlaySound(0, .95 + Math.random() * .1, .5), this.#c = !1), this.#u > 0 && (this.#u -= t)
    }
    #D() {
        if (this.#t.gameState !== "MENU" && !this.#t.gamePaused || !this.#f) return;
        let t = this.#l[this.#n];
        switch (this.#t.PlaySound(0, 1.2 + Math.random() * .2, 1.2), this.#c = !0, t) {
            case "START":
                this.StartGame(0, 1);
                break;
            case "VERSUS":
                this.ToMenu(1);
                break;
            case "LOCAL":
                this.StartGame(1);
                break;
            case "ONLINE":
                this.ToMenu(2), this.#t.loadLibs();
                break;
            case "HOST":
                this.#t.Host(), this.ToMenu(3);
                break;
            case "cCODE":
                let s = document.createElement("textarea");
                s.value = this.#t.sessionCode, s.style.position = "fixed", s.style.left = "-999999px", s.style.top = "-999999px", document.body.appendChild(s), s.focus(), s.select();
                try {
                    document.execCommand("copy") || console.error("Copy failed.")
                } catch (e) {
                    console.error("Copy failed:", e)
                }
                document.body.removeChild(s), this.#u = i.defaultCopyTimer;
                break;
            case "JOIN":
                this.ToMenu(4), this.#d = "";
                break;
            case "iCODE":
                this.#Circle = !0, this.#d.length === 5 && (this.#t.Join(this.#d), this.#d = "");
                break;
            case "BACK":
            case "RESUME":
                this.Back();
                break;
            case "QUIT":
                this.StartGame(-1, 0);
                break
        }
    }
    Draw(t) {
        if (this.fadeTimer > 0) {
            let s = 1 - this.fadeTimer / i.defaultFadeTimer;
            this.#p = this.fadeDirection === -1 ? s : 1 - s
        } else this.#p = this.fadeDirection === -1 || this.fadeDirection === 0 ? 1 : 0;
        t.globalAlpha = this.#p, t.fillStyle = "#00000055", t.fillRect(0, 0, this.#t.canvas.width, this.#t.canvas.height), this.#t.gameState === "MENU" && t.drawImage(i.logoImage, this.#o - i.logoImage.width / 2, this.#t.canvas.height / 4 - i.logoImage.height / 2), this.#t.gamePaused && !this.#t.isOnline && this.#t.DrawPixelText(t, "Paused", this.#o, this.#t.canvas.height / 4, 16, FighterEngine.uiRoundFillColor, FighterEngine.uiRoundOutlineColor), this.#l.forEach((s, e) => {
            let h = e === this.#n,
                a = this.#FighterEngine + e * (i.optionsSize + i.optionsMargin),
                n = s,
                r = !1;
            if (s.startsWith("c")) r = !0, n = this.#u > 0 ? "COPIED!" : this.#t.sessionCode || "NO CODE";
            else if (s.startsWith("i")) {
                r = !0;
                let o = this.#t.networkStatus;
                o === "JOINING" ? n = "JOINING" : o === "ERROR" || this.#u > 0 && this.#d.length < 5 ? n = "ERROR" : n = this.#d + (this.#Circle && Date.now() % 1e3 < 500 && this.#d.length < 5 ? "_" : "")
            }
            if (r) {
                t.fillStyle = h ? "#222222" : "#111111";
                let o = i.optionsWidth * 2;
                t.fillRect(this.#o - i.optionsWidth, a - 1, o, i.optionsSize + 2)
            }
            this.#t.DrawPixelText(t, n, this.#o, a, i.optionsSize, h ? "#ffffff" : "#666666", "#00000000")
        }), t.globalAlpha = 1
    }
    Reset() {
        this.#r = {}, this.#e = {}, this.#f = !0, this.ToMenu(0)
    }
    ToMenu(t) {
        this.#InputSource = t, this.#n = 0, this.#l = i.menusOptions[this.#InputSource], this.#InputSource === 4 ? (this.#Circle = !0, this.#d = "") : this.#Circle = !1
    }
    Back() {
        let t;
        switch (this.#InputSource) {
            case 2:
                t = 1;
                break;
            case 3:
            case 4:
                t = 2, this.#t.Disconnect();
                break;
            case 6:
                this.#f = !1, this.#t.Resume();
                return;
            default:
                this.#t.gamePaused ? t = 6 : t = 0;
                break
        }
        this.ToMenu(t)
    }
    async StartGame(t, s = 2) {
        if (this.#f = !1, this.#t.musicSfx && this.#t.musicSfx.StopSound(1e3), await this.#t.Wait(400), !this.#f) {
            if (this.#t.Fade("#000", 500), await this.#t.Wait(1200), this.#f) {
                this.#t.Fade("#000", 500, -1);
                return
            }
            this.#t.SetGameState(s, t), this.#t.Fade("#000", 500, -1)
        }
    }
};
