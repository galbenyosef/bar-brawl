// Fighter
// Fighter entity: sprite-sheet body animations (idle/walk/punch/kick/crouch), per-move timers and cooldowns (static defaults), hit boxes, health.
var Fighter = class i {
    #t = null;
    #r = -1;
    #e = {
        Fighter: 32,
        h: 39
    };
    #a = {
        x: 0,
        y: 0
    };
    #s = {
        x: 0,
        y: 0
    };
    #h = !0;
    #i = 0;
    #y = 250;
    #Fighter = !1;
    static bodyImg0 = Object.assign(new Image, {
        src: "assets/bald_sheet.png"
    });
    static bodyImg1 = Object.assign(new Image, {
        src: "assets/biker_sheet.png"
    });
    static bodyImg2 = Object.assign(new Image, {
        src: "assets/spidey_sheet.png"
    });
    #InputSource = null;
    static defaultBodyAnimTimer = 20 / 60;
    static maxBodyAnimState = 2;
    #l = 0;
    #n = i.defaultBodyAnimTimer;
    moveInput = 0;
    static defaultWalkingAnimTimer = 8 / 60;
    static maxWalkingAnimState = 3;
    #c = 0;
    #f = i.defaultWalkingAnimTimer;
    #FighterEngine = !1;
    static defaultCrouchCooldown = 18 / 60;
    #o = 0;
    static defaultPunchAnimTimer = 6 / 60;
    static maxPunchAnimState = 3;
    #u = -1;
    #d = 0;
    #Circle = !1;
    #p = 0;
    #MenuScreen = i.defaultPunchAnimTimer / 2;
    #L = i.defaultPunchAnimTimer + i.defaultPunchAnimTimer / 2;
    static defaultPunchCooldown = 18 / 60;
    #D = 0;
    static defaultKickAnimTimer = 8 / 60;
    static maxKickAnimState = 3;
    #x = -1;
    #O = 0;
    #P = !1;
    #R = 0;
    #Y = i.defaultKickAnimTimer / 2;
    #q = i.defaultKickAnimTimer + i.defaultKickAnimTimer / 2;
    static defaultKickCooldown = 38 / 60;
    #U = 0;
    #F = !1;
    static defaultBlockCooldown = 18 / 60;
    #X = 0;
    #K = !1;
    #FighterController = !1;
    static defaultHurtAnimTimer = 14 / 60;
    #H = 0;
    static defaultHurtCooldown = 22 / 60;
    #G = 0;
    static defaultDieAnimTimer = 10 / 60;
    static maxDieAnimState = 3;
    #B = 0;
    #M = 0;
    static bloodImg = Object.assign(new Image, {
        src: "assets/blood_sheet.png"
    });
    static bloodSize = {
        Fighter: 16,
        h: 16
    };
    static defaultBloodAnimTimer = 8 / 60;
    static maxBloodAnimState = 3;
    #E = 0;
    #m = -1;
    #v = {
        x: 0,
        y: 0
    };
    static shadowSize = {
        Fighter: 12,
        h: 2
    };
    static shadowOpacity = .2;
    static shadowJump = 25;
    static hurtboxValues = [{
        size: {
            Fighter: 6,
            h: 6
        },
        damage: 7.5
    }, {
        size: {
            Fighter: 8,
            h: 12
        },
        damage: 5
    }, {
        size: {
            Fighter: 4,
            h: 10
        },
        damage: 3.5
    }, {
        size: {
            Fighter: 4,
            h: 10
        },
        damage: 3.5
    }, {
        size: {
            Fighter: 4,
            h: 12
        },
        damage: 2.5
    }, {
        size: {
            Fighter: 4,
            h: 12
        },
        damage: 2.5
    }];
    static hurtboxOffsets = {
        idle: [{
            loc: {
                x: 16,
                y: 12
            },
            rot: 0
        }, {
            loc: {
                x: 10,
                y: 16
            },
            rot: 0
        }, {
            loc: {
                x: 7,
                y: 17
            },
            rot: 0
        }, {
            loc: {
                x: 17,
                y: 17
            },
            rot: 0
        }, {
            loc: {
                x: 7,
                y: 26
            },
            rot: .7
        }, {
            loc: {
                x: 15,
                y: 26
            },
            rot: -.5
        }],
        crouch: [{
            loc: {
                x: 17,
                y: 18
            },
            rot: 0
        }, {
            loc: {
                x: 11,
                y: 22
            },
            rot: 0
        }, {
            loc: {
                x: 6,
                y: 22
            },
            rot: 0
        }, {
            loc: {
                x: 18,
                y: 24
            },
            rot: 0
        }, {
            loc: {
                x: 7,
                y: 28
            },
            rot: .9
        }, {
            loc: {
                x: 15,
                y: 26
            },
            rot: -.4
        }],
        crouch_punch: [{
            loc: {
                x: 17,
                y: 18
            },
            rot: 0
        }, {
            loc: {
                x: 11,
                y: 22
            },
            rot: 0
        }, {
            loc: {
                x: 6,
                y: 22
            },
            rot: 10
        }, {
            loc: {
                x: 24,
                y: 20
            },
            rot: 30
        }, {
            loc: {
                x: 7,
                y: 28
            },
            rot: .9
        }, {
            loc: {
                x: 15,
                y: 26
            },
            rot: -.4
        }],
        crouch_kick: [{
            loc: {
                x: 12,
                y: 18
            },
            rot: 0
        }, {
            loc: {
                x: 8,
                y: 20
            },
            rot: -.2
        }, {
            loc: {
                x: 4,
                y: 21
            },
            rot: 10
        }, {
            loc: {
                x: 20,
                y: 19
            },
            rot: 1.9
        }, {
            loc: {
                x: 7,
                y: 28
            },
            rot: .9
        }, {
            loc: {
                x: 19,
                y: 25
            },
            rot: -1.4
        }],
        crouch_block: [{
            loc: {
                x: 17,
                y: 18
            },
            rot: 0
        }, {
            loc: {
                x: 11,
                y: 22
            },
            rot: 0
        }, {
            loc: {
                x: 14,
                y: 22
            },
            rot: 1
        }, {
            loc: {
                x: 22,
                y: 20
            },
            rot: 60
        }, {
            loc: {
                x: 7,
                y: 28
            },
            rot: .9
        }, {
            loc: {
                x: 15,
                y: 26
            },
            rot: -.4
        }],
        jump: [{
            loc: {
                x: 17,
                y: 8
            },
            rot: 0
        }, {
            loc: {
                x: 11,
                y: 12
            },
            rot: 0
        }, {
            loc: {
                x: 8,
                y: 13
            },
            rot: 0
        }, {
            loc: {
                x: 18,
                y: 14
            },
            rot: 0
        }, {
            loc: {
                x: 10,
                y: 24
            },
            rot: .5
        }, {
            loc: {
                x: 18,
                y: 24
            },
            rot: 0
        }],
        jump_punch: [{
            loc: {
                x: 17,
                y: 8
            },
            rot: 0
        }, {
            loc: {
                x: 11,
                y: 12
            },
            rot: 0
        }, {
            loc: {
                x: 6,
                y: 12
            },
            rot: 10
        }, {
            loc: {
                x: 22,
                y: 10
            },
            rot: 30
        }, {
            loc: {
                x: 10,
                y: 24
            },
            rot: .5
        }, {
            loc: {
                x: 18,
                y: 24
            },
            rot: 0
        }],
        jump_block: [{
            loc: {
                x: 17,
                y: 8
            },
            rot: 0
        }, {
            loc: {
                x: 11,
                y: 12
            },
            rot: 0
        }, {
            loc: {
                x: 15,
                y: 10
            },
            rot: 1
        }, {
            loc: {
                x: 23,
                y: 10
            },
            rot: 60
        }, {
            loc: {
                x: 10,
                y: 24
            },
            rot: .5
        }, {
            loc: {
                x: 18,
                y: 24
            },
            rot: 0
        }],
        jump_kick: [{
            loc: {
                x: 12,
                y: 8
            },
            rot: 0
        }, {
            loc: {
                x: 8,
                y: 12
            },
            rot: -.2
        }, {
            loc: {
                x: 4,
                y: 13
            },
            rot: 10
        }, {
            loc: {
                x: 20,
                y: 11
            },
            rot: 1.9
        }, {
            loc: {
                x: 9,
                y: 23
            },
            rot: .2
        }, {
            loc: {
                x: 21,
                y: 18
            },
            rot: -1.4
        }],
        punch: [{
            loc: {
                x: 16,
                y: 12
            },
            rot: 0
        }, {
            loc: {
                x: 10,
                y: 16
            },
            rot: 0
        }, {
            loc: {
                x: 6,
                y: 16
            },
            rot: 10
        }, {
            loc: {
                x: 22,
                y: 14
            },
            rot: 30
        }, {
            loc: {
                x: 7,
                y: 26
            },
            rot: .7
        }, {
            loc: {
                x: 15,
                y: 26
            },
            rot: -.5
        }],
        kick: [{
            loc: {
                x: 10,
                y: 11
            },
            rot: 0
        }, {
            loc: {
                x: 6,
                y: 15
            },
            rot: -.2
        }, {
            loc: {
                x: 2,
                y: 16
            },
            rot: 10
        }, {
            loc: {
                x: 18,
                y: 14
            },
            rot: 1.9
        }, {
            loc: {
                x: 7,
                y: 26
            },
            rot: .2
        }, {
            loc: {
                x: 19,
                y: 22
            },
            rot: -1.4
        }],
        block: [{
            loc: {
                x: 16,
                y: 12
            },
            rot: 0
        }, {
            loc: {
                x: 10,
                y: 16
            },
            rot: 0
        }, {
            loc: {
                x: 14,
                y: 14
            },
            rot: 1
        }, {
            loc: {
                x: 22,
                y: 14
            },
            rot: 60
        }, {
            loc: {
                x: 7,
                y: 26
            },
            rot: .7
        }, {
            loc: {
                x: 15,
                y: 26
            },
            rot: -.5
        }],
        die: [{
            loc: {
                x: 6,
                y: 32
            },
            rot: 0
        }, {
            loc: {
                x: 12,
                y: 27
            },
            rot: 1.57
        }, {
            loc: {
                x: 14,
                y: 32
            },
            rot: 1.57
        }, {
            loc: {
                x: 14,
                y: 32
            },
            rot: 1.57
        }, {
            loc: {
                x: 24,
                y: 28
            },
            rot: -1.4
        }, {
            loc: {
                x: 24,
                y: 26
            },
            rot: -1.4
        }]
    };
    #RotatedRect = [];
    static hitboxValues = [{
        Fighter: 4,
        h: 4
    }, {
        Fighter: 4,
        h: 4
    }];
    static hitboxOffsets = [{
        start: {
            x: 21,
            y: 22
        },
        end: {
            x: 29,
            y: 19
        }
    }, {
        start: {
            x: 16,
            y: 30
        },
        end: {
            x: 29,
            y: 27
        }
    }];
    static crouchHitboxOffset = {
        x: 0,
        y: 5
    };
    #k = [];
    #$ = null;
    static showHitboxes = !1;
    static maxHealth = 100;
    #NetConnection = i.maxHealth;
    #W = !1;
    static defaultGhostTimer = 4 / 60;
    #z = 100;
    #Q = 0;
    static healthBarSize = {
        Fighter: 41,
        h: 5
    };
    static healthBarStartPos = {
        x: 0,
        y: 16
    };
    static healthBarLoc = {
        x: 3,
        y: 5
    };
    static winsBarSize = {
        Fighter: 11,
        h: 2
    };
    static winsBarStartPos = {
        x: 0,
        y: 21
    };
    static winsBarLoc = {
        x: 5,
        y: 10
    };
    #st = {
        x: 5,
        y: 5
    };
    static iconStartSize = {
        Fighter: 21,
        h: 21
    };
    static iconSize = {
        Fighter: 9,
        h: 9
    };
    static defaultIdleTimer = 2;
    #V = 0;
    #j = null;
    constructor(t = null, s = 0) {
        if (!(t instanceof FighterEngine)) throw new Error(`${this.constructor.name} requires a ${FighterEngine.name} instance.`);
        switch (this.#t = t, this.#r = s, s) {
            case 0:
                this.ChangeBodyImg(i.bodyImg0), this.#a.x = 10;
                break;
            case 1:
                this.ChangeBodyImg(i.bodyImg1), this.#l++, this.#a.x = this.#t.canvasSize.Fighter - this.#e.Fighter - 1, this.#h = !1;
                break
        }
    }
    get loc() {
        return this.#a
    }
    get vel() {
        return this.#s
    }
    get size() {
        return this.#e
    }
    get isGrounded() {
        return this.#a.y >= this.#i
    }
    get isCrouching() {
        return this.#FighterEngine
    }
    get isPunching() {
        return this.#u >= 0
    }
    get isKicking() {
        return this.#x >= 0
    }
    get isBlocking() {
        return this.#F
    }
    get isStunned() {
        return this.#G > 0 || this.#FighterController
    }
    get zeroHealth() {
        return this.#NetConnection <= 0
    }
    get hitboxes() {
        return this.#RotatedRect
    }
    get health() {
        return this.#NetConnection
    }
    get bodyImg() {
        return this.#InputSource
    }
    ChangeBodyImg(t) {
        t && (this.#InputSource = t)
    }
    Begin() {
        this.#i = this.#t.groundY - this.#e.h, this.#a.y = this.#i;
        for (let t of i.hurtboxValues) this.#RotatedRect.push(new RotatedRect(0, 0, t.size.Fighter, t.size.h));
        this.#RotatedRect[0] = new Circle(0, 0, i.hurtboxValues[0].size.Fighter), this.#k.push(new Circle(0, 0, i.hitboxValues[0].Fighter)), this.#k.push(new RotatedRect(0, 0, i.hitboxValues[1].Fighter, i.hitboxValues[1].h)), this.#J()
    }
    Tick(t) {
        !this.isCrouching && !this.isPunching && !this.isKicking && !this.isBlocking && !this.isStunned && (this.#s.x += this.moveInput * 100 * t);
        let e = 1;
        this.isGrounded || (Math.abs(this.#s.y) < 50 ? e = .7 : this.#s.y > 0 && (e = 1.8)), this.#s.y += this.#t.gravity * e * t;
        let h = Math.pow(this.#t.friction, t * 60);
        this.#s.x *= h * (this.moveInput == 0 ? .8 : 1), this.#s.y *= h, this.#a.y += this.#s.y * t, this.#a.x += this.#s.x * t;
        let a = this.#t.worldWidth - this.#e.Fighter;
        this.#a.x > a && (this.#a.x = a, this.#s.x = 0), this.#a.x < 0 && (this.#a.x = 0, this.#s.x = 0), this.#a.y > this.#i && (this.#a.y = this.#i, this.#s.y = 0), this.#a.y < 0 && (this.#a.y = 0, this.#s.y = 0);
        let n = this.#t.getOpponent(this);
        this.#h = this.#a.x < n.loc.x, this.#J(), this.#n -= t, this.#n <= 0 && (this.#l = this.#l == i.maxBodyAnimState - 1 && Math.random() > .9 ? 2 : (this.#l + 1) % i.maxBodyAnimState, this.#n += i.defaultBodyAnimTimer);
        let r = Math.abs(this.#s.x) / 100;
        if (this.#f -= t * (1 + r * 1), this.#f <= 0 && (this.#c = (this.#c + 1) % i.maxWalkingAnimState, this.#f += i.defaultWalkingAnimTimer, this.#c > 0 && (this.#s.x | 0) != 0 && this.#t.PlaySound(9 + (Math.random() >= .75 ? 1 : 0), .95 + Math.random() * .1, .1)), this.#o > 0 && (this.#o -= t), this.isPunching) {
            if (this.#d -= t, this.#d <= 0 && (this.#u++, this.#u == i.maxPunchAnimState ? this.#u = -1 : this.#d += i.defaultPunchAnimTimer), !this.#Circle && (this.#p += t, this.#p >= this.#MenuScreen && this.#p <= this.#L)) {
                let o = (this.#p - this.#MenuScreen) / (this.#L - this.#MenuScreen),
                    c = i.hitboxOffsets[0].end.x - i.hitboxOffsets[0].start.x + (this.isCrouching ? i.crouchHitboxOffset.x : 0),
                    f = i.hitboxOffsets[0].end.y - i.hitboxOffsets[0].start.y + (this.isCrouching ? i.crouchHitboxOffset.y : 0),
                    u = i.hitboxOffsets[0].start.x + c * o,
                    l = i.hitboxOffsets[0].start.y + f * o;
                this.#h || (u = this.#e.Fighter - u), this.#k[0].loc.x = this.#a.x + u | 0, this.#k[0].loc.y = this.#a.y + l | 0;
                for (let d = 0; d < n.hitboxes.length; d++) {
                    let x = n.hitboxes[d],
                        {
                            intersected: m,
                            hitPoint: y
                        } = P(this.#k[0], x);
                    if (m) {
                        this.#Circle = !0, this.#t.PlaySound(3 + Math.round(Math.random()), .9 + Math.random() * .2), n.QueueDamage(d, {
                            x: y.x | 0,
                            y: y.y | 0
                        }, Number(this.#s.x.toFixed(2)), 0);
                        break
                    }
                }
            }
        } else this.#D > 0 && (this.#D -= t);
        if (this.isKicking) {
            if (this.#O -= t, this.#O <= 0 && (this.#x++, this.#x == i.maxKickAnimState ? this.#x = -1 : this.#O += i.defaultKickAnimTimer), !this.#P && (this.#R += t, this.#R >= this.#Y && this.#R <= this.#q)) {
                let o = (this.#R - this.#Y) / (this.#q - this.#Y),
                    c = i.hitboxOffsets[1].end.x - i.hitboxOffsets[1].start.x + (this.isCrouching ? i.crouchHitboxOffset.x : 0),
                    f = i.hitboxOffsets[1].end.y - i.hitboxOffsets[1].start.y + (this.isCrouching ? i.crouchHitboxOffset.y : 0),
                    u = i.hitboxOffsets[1].start.x + c * o,
                    l = i.hitboxOffsets[1].start.y + f * o;
                this.#h || (u = this.#e.Fighter - u), this.#k[1].loc.x = this.#a.x + u | 0, this.#k[1].loc.y = this.#a.y + l | 0;
                for (let d = 0; d < n.hitboxes.length; d++) {
                    let x = n.hitboxes[d],
                        {
                            intersected: m,
                            hitPoint: y
                        } = P(this.#k[1], x);
                    if (m) {
                        this.#P = !0, this.#t.PlaySound(3 + Math.round(Math.random()), .9 + Math.random() * .2), n.QueueDamage(d, {
                            x: y.x | 0,
                            y: y.y | 0
                        }, Number(this.#s.x.toFixed(2)), this.isCrouching ? 2 : 1);
                        break
                    }
                }
            }
        } else this.#U > 0 && (this.#U -= t);
        if (this.#X > 0 && (this.#X -= t), this.#H >= 0 && (this.#H -= t), this.#G >= 0 && (this.#G -= t), this.#M >= 0 && (this.zeroHealth || this.#FighterController) && (this.#M -= t, this.#M <= 0 && (this.#B != i.maxDieAnimState - 1 ? (this.#B++, this.#M = this.#FighterController && this.#B === i.maxDieAnimState - 1 ? .5 : i.defaultDieAnimTimer) : this.#FighterController && (this.#FighterController = !1, this.#B = 0))), this.#E >= 0 && this.#m >= 0 && (this.#E -= t, this.#E <= 0 && (this.#m = this.#m == i.maxBloodAnimState - 1 ? -1 : (this.#m + 1) % i.maxBloodAnimState, this.#E += i.defaultBloodAnimTimer)), this.#Q > 0 ? this.#Q -= t : this.#z > this.#NetConnection && (this.#z -= 20 * t, this.#z < this.#NetConnection && (this.#z = this.#NetConnection)), this.#Fighter && this.isGrounded && !this.#K && (this.#t.PlaySound(9, .7 + Math.random() * .2, .8), this.#Fighter = !1), this.#V > 0 && this.#t.gameState === "FIGHTING" && (this.#V -= t, this.#V <= 0)) {
            let o = this.#NetConnection <= i.maxHealth / 4,
                c = o ? 1.2 + Math.random() * .2 : .9 + Math.random() * .2,
                f = o ? .8 : .4;
            this.#j = this.#t.PlaySound(11, c, f, !0, 3e3)
        }
        this.#j && this.#t.gameState !== "FIGHTING" && this.#j.StopSound(1e3)
    }
    Draw(t) {
        t.save();
        let s = this.#t.groundY,
            e = this.#a.x + this.#e.Fighter / 2 + (i.shadowSize.Fighter / 2 - 2) * (this.#h ? -1 : 1),
            h = Math.max(0, 1 + (this.#a.y - s + 39) / (i.shadowJump * -1.75)),
            a = i.shadowSize.Fighter * h,
            n = i.shadowSize.h * h,
            r = s - i.shadowSize.h / 2,
            o = 1 / (a * a),
            c = 1 / (n * n),
            f = Math.ceil(n),
            u = Math.ceil(a);
        t.save(), t.fillStyle = `rgba(0, 0, 0, ${Math.max(i.shadowOpacity,i.shadowOpacity*h*.75)})`;
        for (let d = -f; d <= f; d++) {
            let x = (d + .5) * (d + .5) * c,
                m = Math.floor(r + d);
            for (let y = -u; y <= u; y++)(y + .5) * (y + .5) * o + x <= 1 && t.fillRect(Math.floor(e + y), m, 1, 1)
        }
        t.restore(), this.#h || (t.translate(this.#a.x + this.#e.Fighter / 2, 0), t.scale(-1, 1), t.translate(-(this.#a.x + this.#e.Fighter / 2), 0));
        let l = {
            x: 0,
            y: 0
        };
        if (this.zeroHealth || this.#FighterController) switch (this.#B) {
                case 0:
                    l = {
                        x: 0,
                        y: this.#e.h * 4
                    };
                    break;
                case 1:
                    l = {
                        x: this.#e.Fighter,
                        y: this.#e.h * 4
                    };
                    break;
                case 2:
                    l = {
                        x: this.#e.Fighter * 2,
                        y: this.#e.h * 4
                    };
                    break
            } else if (this.#H > 0) l = {
                x: 0,
                y: this.#e.h * 4
            };
            else if (this.#K) l = {
            x: this.#e.Fighter * 2,
            y: this.#e.h * 2
        };
        else if (this.isCrouching)
            if (this.isPunching) switch (this.#u) {
                    case 0:
                    case 2:
                        l = {
                            x: this.#e.Fighter * 3,
                            y: 0
                        };
                        break;
                    case 1:
                        l = {
                            x: this.#e.Fighter * 3,
                            y: this.#e.h
                        };
                        break
                } else if (this.isKicking) switch (this.#x) {
                    case 0:
                    case 2:
                        l = {
                            x: this.#e.Fighter * 3,
                            y: this.#e.h * 3
                        };
                        break;
                    case 1:
                        l = {
                            x: this.#e.Fighter * 3,
                            y: this.#e.h * 4
                        };
                        break
                } else this.isBlocking ? l = {
                    x: this.#e.Fighter * 3,
                    y: this.#e.h * 2
                } : l = {
                    x: this.#e.Fighter * 3,
                    y: 0
                };
                else if (this.isGrounded)
            if (this.isPunching) switch (this.#u) {
                case 0:
                case 2:
                    l = {
                        x: 0,
                        y: 0
                    };
                    break;
                case 1:
                    l = {
                        x: 0,
                        y: this.#e.h * 2
                    };
                    break
            } else if (this.isKicking) switch (this.#x) {
                    case 0:
                    case 2:
                        l = {
                            x: 0,
                            y: this.#e.h * 5
                        };
                        break;
                    case 1:
                        l = {
                            x: this.#e.Fighter,
                            y: this.#e.h * 5
                        };
                        break
                } else if (this.isBlocking) l = {
                    x: this.#e.Fighter,
                    y: this.#e.h * 2
                };
                else if ((this.#s.x | 0) != 0) switch (this.#c) {
            case 0:
                l = {
                    x: 0,
                    y: this.#e.h
                };
                break;
            case 1:
                l = {
                    x: this.#e.Fighter,
                    y: this.#e.h
                };
                break;
            case 2:
                l = {
                    x: this.#e.Fighter * 2,
                    y: this.#e.h
                };
                break
        } else switch (this.#l) {
            case 0:
                l = {
                    x: 0,
                    y: 0
                };
                break;
            case 1:
                l = {
                    x: this.#e.Fighter,
                    y: 0
                };
                break;
            case 2:
                l = {
                    x: this.#e.Fighter * 2,
                    y: 0
                };
                break
        } else if (this.isPunching) switch (this.#u) {
            case 0:
            case 2:
                l = {
                    x: 0,
                    y: this.#e.h * 3
                };
                break;
            case 1:
                l = {
                    x: this.#e.Fighter,
                    y: this.#e.h * 3
                };
                break
        } else if (this.isKicking) switch (this.#x) {
            case 0:
            case 2:
                l = {
                    x: this.#e.Fighter * 2,
                    y: this.#e.h * 5
                };
                break;
            case 1:
                l = {
                    x: this.#e.Fighter * 3,
                    y: this.#e.h * 5
                };
                break
        } else this.isBlocking ? l = {
            x: this.#e.Fighter * 2,
            y: this.#e.h * 3
        } : l = {
            x: 0,
            y: this.#e.h * 3
        };
        if (t.drawImage(this.#InputSource, l.x | 0, l.y | 0, this.#e.Fighter | 0, this.#e.h | 0, this.#a.x | 0, this.#a.y | 0, this.#e.Fighter | 0, this.#e.h | 0), t.restore(), this.#m >= 0) {
            switch (this.#m) {
                case 0:
                    l = {
                        x: 0,
                        y: 0
                    };
                    break;
                case 1:
                    l = {
                        x: i.bloodSize.Fighter,
                        y: 0
                    };
                    break;
                case 2:
                    l = {
                        x: i.bloodSize.Fighter * 2,
                        y: 0
                    };
                    break
            }
            t.drawImage(i.bloodImg, l.x | 0, l.y | 0, i.bloodSize.Fighter | 0, i.bloodSize.h | 0, this.#v.x - i.bloodSize.Fighter / 2 | 0, this.#v.y - i.bloodSize.h / 2 | 0, i.bloodSize.Fighter | 0, i.bloodSize.h | 0)
        }
        i.showHitboxes && this.#et(t)
    }
    DrawUI(t) {
        if (this.#t.gameState != "PRE_ROUND" && this.#t.gameState != "FIGHTING" && this.#t.gameState != "POS_ROUND") return;
        let s = this.#r == 0,
            e = this.#NetConnection / i.maxHealth,
            h = this.#z / i.maxHealth,
            a = s ? i.healthBarLoc.x : this.#t.canvasSize.Fighter - i.healthBarSize.Fighter - i.healthBarLoc.x;
        t.save(), s || (t.translate(a + i.healthBarSize.Fighter / 2, 0), t.scale(-1, 1), t.translate(-(a + i.healthBarSize.Fighter / 2), 0)), t.drawImage(FighterEngine.uiSheet, i.healthBarStartPos.x | 0, i.healthBarStartPos.y | 0, i.healthBarSize.Fighter | 0, i.healthBarSize.h | 0, a | 0, i.healthBarLoc.y | 0, i.healthBarSize.Fighter | 0, i.healthBarSize.h | 0);
        let n = i.healthBarSize.Fighter * h | 0;
        t.save(), t.beginPath();
        for (let u = 0; u < i.healthBarSize.h; u++) t.rect(a | 0, i.healthBarLoc.y + u | 0, n - u | 0, 1);
        t.closePath(), t.clip(), t.drawImage(FighterEngine.uiSheet, i.healthBarSize.Fighter * 2 + i.healthBarStartPos.x | 0, i.healthBarStartPos.y | 0, n | 0, i.healthBarSize.h | 0, a | 0, i.healthBarLoc.y | 0, n | 0, i.healthBarSize.h | 0), t.restore();
        let r = i.healthBarSize.Fighter * e | 0;
        t.save(), t.beginPath();
        for (let u = 0; u < i.healthBarSize.h; u++) t.rect(a | 0, i.healthBarLoc.y + u | 0, r - u | 0, 1);
        t.closePath(), t.clip(), t.drawImage(FighterEngine.uiSheet, i.healthBarSize.Fighter + i.healthBarStartPos.x, i.healthBarStartPos.y | 0, r | 0, i.healthBarSize.h | 0, a | 0, i.healthBarLoc.y | 0, r | 0, i.healthBarSize.h | 0), t.restore();
        let o = this.#t.getScore(this) / (FighterEngine.maxRounds - 1),
            c = s ? i.winsBarLoc.x : this.#t.canvasSize.Fighter - i.healthBarSize.Fighter - 1;
        t.drawImage(FighterEngine.uiSheet, i.winsBarStartPos.x | 0, i.winsBarStartPos.y | 0, i.winsBarSize.Fighter | 0, i.winsBarSize.h | 0, c | 0, i.winsBarLoc.y | 0, i.winsBarSize.Fighter | 0, i.winsBarSize.h | 0);
        let f = i.winsBarSize.Fighter * o | 0;
        t.drawImage(FighterEngine.uiSheet, i.winsBarSize.Fighter + i.winsBarStartPos.x | 0, i.winsBarStartPos.y | 0, f | 0, i.winsBarSize.h | 0, c | 0, i.winsBarLoc.y | 0, f | 0, i.winsBarSize.h | 0), t.imageSmoothingEnabled = !0, t.drawImage(this.#InputSource, this.#st.x | 0, this.#st.y | 0, i.iconStartSize.Fighter, i.iconStartSize.h, a + 1 | 0, 0, i.iconSize.Fighter, i.iconSize.h), t.imageSmoothingEnabled = !1, t.restore()
    }
    Jump() {
        !this.isCrouching && !this.isPunching && !this.isKicking && !this.isBlocking && this.isGrounded && !this.isStunned && (this.#s.y -= this.#y, this.#Fighter = !0, this.Idle(), this.#t.PlaySound(7 + (Math.random() >= .95 ? 1 : 0), .9 + Math.random() * .2))
    }
    SetCrouching(t) {
        !t && this.#FighterEngine != t ? (this.#FighterEngine = t, this.#o = i.defaultCrouchCooldown, this.Idle(), this.#t.PlaySound(7, .85 + Math.random() * .1, .2)) : t && !this.isCrouching && !this.isPunching && !this.isKicking && this.isGrounded && this.#o <= 0 && !this.isStunned && (this.#FighterEngine = t, this.#s.x = 0, this.Idle(), this.#t.PlaySound(7, .85 + Math.random() * .1, .3))
    }
    Punch() {
        !this.isPunching && !this.isKicking && !this.isBlocking && this.#D <= 0 && !this.isStunned && (this.#u = 0, this.#d = i.defaultPunchAnimTimer, this.isCrouching || (this.#s.x += this.moveInput * 60), this.#p = 0, this.#Circle = !1, this.#D = i.defaultPunchCooldown, this.Idle(), this.#t.PlaySound(1 + (Math.random() >= .55 ? 1 : 0), .9 + Math.random() * .2))
    }
    Kick() {
        !this.isPunching && !this.isKicking && !this.isBlocking && this.#U <= 0 && !this.isStunned && (this.#x = 0, this.#O = i.defaultKickAnimTimer, this.isCrouching || (this.#s.x += this.moveInput * 60), this.#R = 0, this.#P = !1, this.#U = i.defaultKickCooldown, this.Idle(), this.#t.PlaySound(1 + (Math.random() >= .55 ? 1 : 0), .9 + Math.random() * .2))
    }
    SetBlocking(t) {
        !t && this.#F != t ? (this.#F = t, this.#X = i.defaultBlockCooldown, this.Idle(), this.#t.PlaySound(7, .85 + Math.random() * .1, .2)) : t && !this.isPunching && !this.isKicking && !this.isBlocking && this.#X <= 0 && !this.isStunned && (this.#F = t, this.#s.x = 0, this.Idle(), this.#t.PlaySound(7, .85 + Math.random() * .1, .3))
    }
    #J() {
        let t = "idle";
        this.zeroHealth || this.#FighterController ? t = "die" : this.isCrouching ? this.isPunching && this.#u == 1 ? t = "crouch_punch" : this.isBlocking ? t = "crouch_block" : this.isKicking ? t = "crouch_kick" : t = "crouch" : this.isGrounded ? this.isPunching && this.#u == 1 ? t = "punch" : this.isKicking ? t = "kick" : this.isBlocking && (t = "block") : this.isPunching && this.#u == 1 ? t = "jump_punch" : this.isBlocking ? t = "jump_block" : this.isKicking ? t = "jump_kick" : t = "jump";
        let s = i.hurtboxOffsets[t];
        for (let e = 0; e < this.#RotatedRect.length; e++) {
            let h = s[e].loc,
                a = this.#RotatedRect[e],
                n = h.x;
            if (!this.#h) {
                let r = a instanceof RotatedRect ? a.size.Fighter : 0;
                n = this.#e.Fighter - n - r
            }
            a.loc.x = this.#a.x + n | 0, a.loc.y = this.#a.y + h.y | 0, a.rotation = this.#h ? s[e].rot : -s[e].rot
        }
    }
    TakeDamage(t, s, e, h) {
        let a = (e - this.#s.x) * (this.#h ? -1 : 1),
            n = Math.max(.4, Math.min(1.8, 1 + a / 150)),
            r = i.hurtboxValues[t].damage * n;
        switch (h) {
            default:
            case 0:
                r *= 1;
                break;
            case 1:
            case 2:
                r *= 1.25;
                break
        }
        let o = (u, l, d) => {
                let x = Math.max(0, Math.min(1, (u - l.x) / (d.x - l.x))),
                    m = x * x * (3 - 2 * x);
                return l.y + (d.y - l.y) * m
            },
            c = 800;
        a < -20 ? c = o(a, {
            x: -74,
            y: 30
        }, {
            x: -20,
            y: 135
        }) : a < 0 ? c = o(a, {
            x: -20,
            y: 135
        }, {
            x: 0,
            y: 800
        }) : a < 20 ? c = o(a, {
            x: 0,
            y: 800
        }, {
            x: 20,
            y: 255
        }) : c = o(a, {
            x: 20,
            y: 255
        }, {
            x: 74,
            y: 150
        }), this.isBlocking == 1 ? (c *= .6, this.#t.PlaySound(5 + (Math.random() >= .5 ? 1 : 0), 1.2 + Math.random() * .2, .5)) : (this.#t.PlaySound(5 + (Math.random() >= .5 ? 1 : 0), .9 + Math.random() * .2), h === 2 && !this.isCrouching ? (this.#FighterController = !0, this.#B = 0, this.#M = i.defaultDieAnimTimer) : (this.#H = i.defaultHurtAnimTimer, this.#G = i.defaultHurtCooldown), this.#E = i.defaultBloodAnimTimer, this.#m = 0, this.#v.x = s.x, this.#v.y = s.y), this.#NetConnection -= r, this.#Q = i.defaultGhostTimer, this.#u = -1, this.#x = -1, this.#s.x += this.#h ? -c : c, this.Idle();
        let f = 1;
        this.zeroHealth && !this.#W && (this.#NetConnection = 0, this.Die(), this.#W = !0, f = 3), this.#t.CameraShake(f, 300), this.#t.SlowTime(0, 100)
    }
    QueueDamage(t, s, e, h) {
        this.#$ = {
            hitboxIndex: t,
            hitPoint: s,
            hitSpeed: e,
            hitSource: h
        }
    }
    ResolvePendingDamage() {
        if (this.#$) {
            let {
                hitboxIndex: t,
                hitPoint: s,
                hitSpeed: e,
                hitSource: h
            } = this.#$;
            this.#$ = null, this.TakeDamage(t, s, e, h)
        }
    }
    Die() {
        this.#FighterEngine = !1, this.#u = -1, this.#x = -1, this.#F = !1, this.#FighterController = !1, this.#M = i.defaultDieAnimTimer, this.#B = 0
    }
    async Celebrate() {
        this.#FighterEngine = !1, this.#u = -1, this.#x = -1, this.#F = !1, this.#FighterController = !1, this.#s.x = 0, this.#s.y = 0, await this.#t.Wait(150), this.#s.y -= this.#y, await this.#t.Wait(50), this.#K = !0
    }
    EndState(t) {
        switch (this.#FighterEngine = !1, this.#u = -1, this.#x = -1, this.#F = !1, this.#FighterController = !1, t) {
            case 0:
                this.#NetConnection = 0, this.#B = 2;
                break;
            case 1:
                this.#K = !0;
                break
        }
    }
    Idle() {
        this.#j && this.#j.StopSound(1e3), this.#V = i.defaultIdleTimer
    }
    Reset(t = !1) {
        if (this.#r == 0 ? this.#a.x = 10 : this.#a.x = this.#t.canvasSize.Fighter - this.#e.Fighter - 1, this.#a.y = this.#i, this.#s.x = 0, this.#s.y = 0, this.#h = this.#r == 0, this.#NetConnection = i.maxHealth, this.#W = !1, this.#z = this.#NetConnection, this.moveInput = 0, this.#Fighter = !1, this.#FighterEngine = !1, this.#u = -1, this.#D = 0, this.#x = -1, this.#U = 0, this.#F = !1, this.#K = !1, this.#FighterController = !1, this.#G = 0, this.#B = -1, this.#m = -1, t) switch (this.#r) {
            case 0:
                this.ChangeBodyImg(i.bodyImg0);
                break;
            case 1:
                this.ChangeBodyImg(i.bodyImg1);
                break
        }
    }
    SerializeState() {
        return {
            loc: {
                x: this.#a.x,
                y: this.#a.y
            },
            vel: {
                x: this.#s.x,
                y: this.#s.y
            },
            facingRight: this.#h,
            moveInput: this.moveInput,
            bodyAnimState: this.#l,
            bodyAnimTimer: this.#n,
            walkingAnimState: this.#c,
            walkingAnimTimer: this.#f,
            isCrouching: this.#FighterEngine,
            punchAnimState: this.#u,
            punchAnimTimer: this.#d,
            punchHasHit: this.#Circle,
            punchTimer: this.#p,
            punchCooldown: this.#D,
            kickAnimState: this.#x,
            kickAnimTimer: this.#O,
            kickHasHit: this.#P,
            kickTimer: this.#R,
            kickCooldown: this.#U,
            isBlocking: this.#F,
            isCelebrating: this.#K,
            hurtAnimTimer: this.#H,
            hurtCooldown: this.#G,
            dieAnimState: this.#B,
            dieAnimTimer: this.#M,
            bloodAnimTimer: this.#E,
            bloodAnimState: this.#m,
            bloodLoc: {
                x: this.#v.x,
                y: this.#v.y
            },
            health: this.#NetConnection,
            isDead: this.#W,
            ghostHealth: this.#z
        }
    }
    ApplyState(t) {
        t && (this.#a.x = t.loc.x, this.#a.y = t.loc.y, this.#s.x = t.vel.x, this.#s.y = t.vel.y, this.#h = t.facingRight, this.moveInput = t.moveInput, this.#l = t.bodyAnimState, this.#n = t.bodyAnimTimer, this.#c = t.walkingAnimState, this.#f = t.walkingAnimTimer, this.#FighterEngine = t.isCrouching, this.#u = t.punchAnimState, this.#d = t.punchAnimTimer, this.#Circle = t.punchHasHit, this.#p = t.punchTimer, this.#D = t.punchCooldown, this.#x = t.kickAnimState, this.#O = t.kickAnimTimer, this.#P = t.kickHasHit, this.#R = t.kickTimer, this.#U = t.kickCooldown, this.#F = t.isBlocking, this.#K = t.isCelebrating, this.#H = t.hurtAnimTimer, this.#G = t.hurtCooldown, this.#B = t.dieAnimState, this.#M = t.dieAnimTimer, this.#E = t.bloodAnimTimer, this.#m = t.bloodAnimState, this.#v.x = t.bloodLoc.x, this.#v.y = t.bloodLoc.y, this.#NetConnection = t.health, this.#W = t.isDead, this.#z = t.ghostHealth, this.#J())
    }
    #et(t) {
        t.save(), t.lineWidth = .5, t.strokeStyle = "rgba(0, 255, 0, 0.7)";
        let s = [this.#RotatedRect[1], this.#RotatedRect[2], this.#RotatedRect[3], this.#RotatedRect[4], this.#RotatedRect[5]];
        for (let e of s) {
            t.save();
            let h = e.loc.x + e.size.Fighter / 2,
                a = e.loc.y + e.size.h / 2;
            t.translate(h, a), t.rotate(e.rotation || 0), t.beginPath(), t.rect(-e.size.Fighter / 2, -e.size.h / 2, e.size.Fighter, e.size.h), t.stroke(), t.restore()
        }
        t.beginPath(), t.arc(this.#RotatedRect[0].loc.x, this.#RotatedRect[0].loc.y, this.#RotatedRect[0].radius, 0, Math.PI * 2), t.stroke(), this.#p >= this.#MenuScreen && this.#p <= this.#L && (t.strokeStyle = "rgba(255, 0, 0, 0.7)", t.beginPath(), t.arc(this.#k[0].loc.x, this.#k[0].loc.y, this.#k[0].radius, 0, Math.PI * 2), t.stroke()), this.#R >= this.#Y && this.#R <= this.#q && (t.strokeStyle = "rgba(255, 0, 0, 0.7)", t.beginPath(), t.rect(this.#k[1].loc.x, this.#k[1].loc.y, this.#k[1].size.Fighter, this.#k[1].size.h), t.stroke()), t.restore()
    }
};
