(() => {
    var e = {
            780: e => {
                "use strict";

                

                const t = () => {
                        const e = new Error("Delay aborted");
                        return e.name = "AbortError", e
                    },
                    r = ({
                        clearTimeout: e,
                        setTimeout: r,
                        willResolve: n
                    }) => (o, {
                        value: a,
                        signal: s
                    } = {}) => {
                        if (s && s.aborted) return Promise.reject(t());
                        let c, i, u;
                        const l = e || clearTimeout,
                            d = () => {
                                l(c), u(t())
                            },
                            h = new Promise(((e, t) => {
                                i = () => {
                                    s && s.removeEventListener("abort", d), n ? e(a) : t(a)
                                }, u = t, c = (r || setTimeout)(i, o)
                            }));
                        return s && s.addEventListener("abort", d, {
                            once: !0
                        }), h.clear = () => {
                            l(c), c = null, i()
                        }, h
                    },
                    n = e => {
                        const t = r({
                            ...e,
                            willResolve: !0
                        });
                        return t.reject = r({
                            ...e,
                            willResolve: !1
                        }), t.range = (e, r, n) => t(((e, t) => Math.floor(Math.random() * (t - e + 1) + e))(e, r), n), t
                    },
                    o = n();
                o.createWithTimers = n, e.exports = o, e.exports.default = o
            },
            696: () => {}
        },
        t = {};

    function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var a = t[n] = {
            exports: {}
        };
        return e[n](a, a.exports, r), a.exports
    }
    r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t
    }, r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        var e = r(696);
        const t = /\s+at.*[(\s](.*)\)?/,
            n = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/,
            o = void 0 === e.homedir ? "" : e.homedir().replace(/\\/g, "/");
        class a extends Error {
            #errors;
            name = "AggregateError";
            constructor(e) {
                if (!Array.isArray(e)) throw new TypeError("Expected input to be an Array, got " + typeof e);
                let r = (e = e.map((e => e instanceof Error ? e : null !== e && "object" == typeof e ? Object.assign(new Error(e.message), e) : new Error(e)))).map((e => "string" == typeof e.stack && e.stack.length > 0 ? function(e, {
                    pretty: r = !1,
                    basePath: a
                } = {}) {
                    const s = a && new RegExp(`(at | \\()${function(e){if("string"!=typeof e)throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}(a.replace(/\\/g,"/"))}`, "g");
                    if ("string" == typeof e) return e.replace(/\\/g, "/").split("\n").filter((e => {
                        const r = e.match(t);
                        if (null === r || !r[1]) return !0;
                        const o = r[1];
                        return !(o.includes(".app/Contents/Resources/electron.asar") || o.includes(".app/Contents/Resources/default_app.asar") || o.includes("node_modules/electron/dist/resources/electron.asar") || o.includes("node_modules/electron/dist/resources/default_app.asar") || n.test(o))
                    })).filter((e => "" !== e.trim())).map((e => (s && (e = e.replace(s, "$1")), r && (e = e.replace(t, ((e, t) => e.replace(t, t.replace(o, "~"))))), e))).join("\n")
                }(e.stack).replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "") : String(e))).join("\n");
                r = "\n" + function(e, t = 1, r = {}) {
                    const {
                        indent: n = " ",
                        includeEmptyLines: o = !1
                    } = r;
                    if ("string" != typeof e) throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
                    if ("number" != typeof t) throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
                    if (t < 0) throw new RangeError(`Expected \`count\` to be at least 0, got \`${t}\``);
                    if ("string" != typeof n) throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof n}\``);
                    if (0 === t) return e;
                    const a = o ? /^/gm : /^(?!\s*$)/gm;
                    return e.replace(a, n.repeat(t))
                }(r, 4), super(r), this.#errors = e
            }
            get errors() {
                return this.#errors.slice()
            }
        }
        class s extends Error {
            constructor(e) {
                super(), this.name = "AbortError", this.message = e
            }
        }
        const c = e => void 0 === globalThis.DOMException ? new s(e) : new DOMException(e),
            i = e => {
                const t = void 0 === e.reason ? c("This operation was aborted.") : e.reason;
                return t instanceof Error ? t : c(t)
            };
        async function u(e, t, {
            concurrency: r = Number.POSITIVE_INFINITY,
            stopOnError: n = !0,
            signal: o
        } = {}) {
            return new Promise(((s, c) => {
                if (void 0 === e[Symbol.iterator] && void 0 === e[Symbol.asyncIterator]) throw new TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof e})`);
                if ("function" != typeof t) throw new TypeError("Mapper function is required");
                if (!Number.isSafeInteger(r) && r !== Number.POSITIVE_INFINITY || !(r >= 1)) throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${r}\` (${typeof r})`);
                const u = [],
                    d = [],
                    h = new Map;
                let f = !1,
                    p = !1,
                    m = !1,
                    g = 0,
                    v = 0;
                const y = void 0 === e[Symbol.iterator] ? e[Symbol.asyncIterator]() : e[Symbol.iterator](),
                    E = e => {
                        f = !0, p = !0, c(e)
                    };
                o && (o.aborted && E(i(o)), o.addEventListener("abort", (() => {
                    E(i(o))
                })));
                const b = async () => {
                    if (p) return;
                    const e = await y.next(),
                        r = v;
                    if (v++, e.done) {
                        if (m = !0, 0 === g && !p) {
                            if (!n && d.length > 0) return void E(new a(d));
                            if (p = !0, 0 === h.size) return void s(u);
                            const e = [];
                            for (const [t, r] of u.entries()) h.get(t) !== l && e.push(r);
                            s(e)
                        }
                    } else g++, (async () => {
                        try {
                            const n = await e.value;
                            if (p) return;
                            const o = await t(n, r);
                            o === l && h.set(r, o), u[r] = o, g--, await b()
                        } catch (e) {
                            if (n) E(e);
                            else {
                                d.push(e), g--;
                                try {
                                    await b()
                                } catch (e) {
                                    E(e)
                                }
                            }
                        }
                    })()
                };
                (async () => {
                    for (let e = 0; e < r; e++) {
                        try {
                            await b()
                        } catch (e) {
                            E(e);
                            break
                        }
                        if (m || f) break
                    }
                })()
            }))
        }
        const l = Symbol("skip");
        var d = r(780),
            h = r.n(d),
            f = function(e, t, r, n) {
                return new(r || (r = Promise))((function(o, a) {
                    function s(e) {
                        try {
                            i(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function c(e) {
                        try {
                            i(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function i(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function(e) {
                            e(t)
                        }))).then(s, c)
                    }
                    i((n = n.apply(e, t || [])).next())
                }))
            },
            p = function(e, t) {
                var r, n, o, a, s = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0]) throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: c(0),
                    throw: c(1),
                    return: c(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function c(a) {
                    return function(c) {
                        return function(a) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for (; s;) try {
                                if (r = 1, n && (o = 2 & a[0] ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, a[1])).done) return o;
                                switch (n = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        o = a;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: a[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, n = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                            s.label = a[1];
                                            break
                                        }
                                        if (6 === a[0] && s.label < o[1]) {
                                            s.label = o[1], o = a;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2], s.ops.push(a);
                                            break
                                        }
                                        o[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                a = t.call(e, s)
                            } catch (e) {
                                a = [6, e], n = 0
                            } finally {
                                r = o = 0
                            }
                            if (5 & a[0]) throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, c])
                    }
                }
            },
            m = function(e, t) {
                for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
                return e
            },
            g = ["day", "3day", "week", "month", "3month", "6month"],
            apiLists = [{
                    "old_api":"127.0.0.1",
                    "new_api":"127.0.0.2"
                }],
            v = function(e) {
                return f(void 0, void 0, void 0, (function() {
                    var t, r, n;
                    return p(this, (function(o) {
                        switch (o.label) {
                            case 0:
                                return o.trys.push([0, 2, , 3]), [4, y()];
                            case 1:
                                return t = o.sent(), (r = t.findIndex((function(t) {
                                    return t.data.position === e.data.position
                                }))) < t.length ? [2, t[r + 1]] : [2, void 0];
                            case 2:
                                return n = o.sent(), console.error(n), [3, 3];
                            case 3:
                                return [2]
                        }
                    }))
                }))
            },

            y = function() {
                return f(void 0, void 0, void 0, (function() {
                    var e, t;
                    return p(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                console.log("getListOfFilters"), r.label = 1;
                            case 1:
                                return r.trys.push([1, 4, , 5]), [4, fetch("https://uprdamj4c6.execute-api.us-east-1.amazonaws.com/dev-indeed-location-filter/indeed-filter-location-all", {
                                    method: "GET",
                                    headers: {
                                        accept: "application/json"
                                    }
                                })];
                            case 2:
                                return [4, r.sent().json()];
                            case 3:
                                return e = r.sent(),
                                    n = e,
                                    f(void 0, void 0, void 0, (function() {

                                    var e;
                                    return p(this, (function(t) {
                                        return console.log("sendSyncFilterData"),
                                            e = {
                                            type: "SYNC_FILTER_DATA",
                                            data: {
                                                searchParams: n,
                                                dateFilters: g,
                                                apiOptions: apiLists
                                            }
                                        }, chrome.runtime.sendMessage(e), [2]
                                    }))
                                })), [2, e];
                            case 4:
                                return t = r.sent(), console.error(t), [2];
                            case 5:
                                return [2]
                        }
                        var n
                    }))
                }))
            },

            
            E = function(e) {
                var t = e.datesToExclude,
                    r = e.data,
                    n = void 0 === r ? [] : r;
                return f(void 0, void 0, void 0, (function() {
                    var e, r;
                    return p(this, (function(o) {
                        switch (o.label) {
                            case 0:
                                return console.log("processSearchRequests: " + n.length), console.log(t), e = n.filter((function(e) {
                                    var r = e.updatedDate,
                                        n = void 0 === r ? "" : r;
                                    return !t.includes(n)
                                })), r = e.reduce((function(e, t) {
                                    var r = t.updatedDate;
                                    return e[void 0 === r ? "none" : r] = "empty", e
                                }), {}), [4, u(e, (function(e) {
                                    return f(void 0, void 0, void 0, (function() {
                                        var t;
                                        return p(this, (function(r) {
                                            switch (r.label) {
                                                case 0:
                                                console.log("POST Data to MAKE");
                                                console.log(JSON.stringify(e));

                                                    /*UPDATED WEBHOOK: FROM NEW ACCOUNT**/
                                                    //https://hook.us1.make.com/un6kn8n93ts4ehyccybmucsr1q4kj46h

                                                    // return r.trys.push([0, 2, , 3]), [4, fetch("https://hook.us1.make.com/jomnpg9816jfl65wsm6e15rqp0l4ulhb", {
                                                        //indeed applicants webhook 
                                                    //     return r.trys.push([0, 2, , 3]), [4, fetch("https://hook.us1.make.com/aozfjgg8q99pgifnrhvax274yn7lwych", {
                                                    //     method: "POST",
                                                    //     body: JSON.stringify(e),
                                                    //     headers: {
                                                    //         "content-type": "application/json"
                                                    //     }
                                                    // })];
                                                case 1:
                                                    return r.sent(), [3, 3];
                                                case 2:
                                                    return t = r.sent(), console.error(t), [3, 3];
                                                case 3:
                                                    return [2]
                                            }
                                        }))
                                    }))
                                }))];
                            case 1:
                                return o.sent(), [2, Object.keys(r)]
                        }
                    }))
                }))
            },
            b = function(e) {
                return f(void 0, void 0, void 0, (function() {
                    var t;
                    return p(this, (function(r) {
                        switch (r.label) {
                            case 0:

                                // return r.trys.push([0, 2, , 3]), [4, fetch("https://hook.us1.make.com/vi6pvpc12bfxuh8f1hfntrye8qs7j2v8", {
                                    //indeed scrape complete webhook url

                                //     return r.trys.push([0, 2, , 3]), [4, fetch("https://hook.us1.make.com/6d6o8hfqp14yrth3tgr5nldllcjixs5c", {
                                //     method: "POST",
                                //     body: JSON.stringify({
                                //         errorMessage: e
                                //     }),
                                //     headers: {
                                //         "content-type": "application/json"
                                //     }
                                // })];

                            case 1:
                                return r.sent(), [3, 3];
                            case 2:
                                return t = r.sent(), console.error(t), [3, 3];
                            case 3:
                                return [2]
                        }
                    }))
                }))
            },
            
            w = function(e) {
                var t = e.token,
                    r = e.filters,
                    n = e.dateFilter,
                    o = void 0 === n ? "day" : n,
                    a = e.start,
                    s = void 0 === a ? 0 : a,
                    c = e.delayRange,
                    i = e.datesToExclude,
                    u = void 0 === i ? [] : i,
                    l = e.nextDatesToExclude,
                    d = void 0 === l ? [] : l;

                // var radiusValue = function() {  
                //                  chrome.cookies.get({"url": "https://resumes.indeed.com/", "name": "selectedRadius"}, function(cookie) {
                //                         if(callback) {
                //                             callback(cookie.value);
                //                         }
                //                     });
                //         }


                // var radiusValue = chrome.cookies.get({"url": "https://resumes.indeed.com/", "name": "selectedRadius"}, function(cookie) {
                                //     return cookie.value;
                                // });

                                // function getCookies(domain, name, callback) {
                                    // chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
                                    //     if(callback) {
                                    //         callback(cookie.value);
                                    //     }
                                    // });
                                // }

                                // getCookies("https://resumes.indeed.com/", "selectedRadius", function(name) {
                                //        console.log(name);
                                //     });


                // chrome.cookies.get({"url": "https://resumes.indeed.com/", "name": "selectedAPI"}, function(cookie) {
                //     console.log("selected API is: " +cookie.value);
                // })



                return f(void 0, void 0, void 0, (function() {
                    var e, n, a, i, l, f, y, S, x, I, D, R, _, k, F, A, O;
                    
                    return p(this, (async function(p) {

                        switch (p.label) {
                            
                            case 0:

                            // var radiusValue;
                            //
                            // function getCookies(domain, name)
                            // {
                            //      chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
                            //         radiusValue = cookie.value;
                            //         showRadius();
                            //     });
                            //
                            // }
                            //
                            // function showRadius() {
                            //    // console.log("Radius value " + radiusValue);
                            //    return radiusValue;
                            //
                            // }
                            //
                            // getCookies("https://resumes.indeed.com/", "selectedRadius");



                                // const data = await toppings_choice();

                                console.log("request data "),
                                console.log("sendSearchRequest"),
                                    
                                P = 1e3 * c.min, 
                                j = 1e3 * c.max, 
                                e = Math.floor(Math.random() * (j - P + 1)) + P, 
                                n = r.data,
                                a = n.Location,
                                i = n["Search Distance"], 
                                l = n["Search Term"], 
                                f = l.replace(/['"]+/g, ""), 
                                y = new URLSearchParams("q=" + f + "&l=" + a + "&jk=&start=" + s + "&lmd=" + o + "&radius=" + i + "&indeedcsrftoken=" + t), 
                                S = "https://resumes.indeed.com/rpc/search?" + y,
                                console.log(S), p.label = 1;

                            case 1:
                                return p.trys.push([1, 23, , 24]), [4, fetch(S, {
                                    method: "POST",
                                    headers: {
                                        accept: "*/*",
                                        "accept-encoding": "gzip, deflate, br",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "*/*"
                                    },
                                    credentials: "include"
                                })];

                            case 2:
                                return [4, p.sent().json()];

                            case 3:
                                return x = p.sent(), I = x.loggedIn, D = x.results, R = x.totalResultCount, I ? R - s < 0 ? [4, T("shouldIncrementDate")] : [3, 14] : [3, 20];

                            case 4:
                                return 1 != p.sent() ? [3, 8] : (N = o, C = g.findIndex((function(e) {
                                    return e === N
                                })), (_ = C < g.length - 1 ? g[C + 1] : "") ? (console.log("delay nextFilter: " + _ + " - " + e / 1e3), [4, h()(e)]) : [3, 6]);

                            case 5:
                                return p.sent(), d = m(m([], d), u), [2, w({
                                    token: t,
                                    filters: r,
                                    dateFilter: o,
                                    start: 0,
                                    delayRange: c,
                                    datesToExclude: d,
                                    nextDatesToExclude: []
                                })];

                            case 6:
                                return chrome.storage.local.set({
                                    searchStatus: "completed"
                                }), [2];

                            case 7:
                                return [3, 14];
                            case 8:
                                return [4, T("shouldIncrementFilter")];
                            case 9:
                                return !0 !== p.sent() ? [3, 13] : [4, v(r)];
                            case 10:
                                return (k = p.sent()) ? [4, h()(e)] : [3, 13];
                            case 11:
                                return p.sent(), [4, T("currentDateFilter")];
                            case 12:
                                return F = p.sent(), [2, w({
                                    token: t,
                                    filters: k,
                                    dateFilter: F,
                                    delayRange: c,
                                    start: 0,
                                    datesToExclude: [],
                                    nextDatesToExclude: []
                                })];
                            case 13:
                                return chrome.storage.local.set({
                                    searchStatus: "completed"
                                }), [2];
                            case 14:
                                return D.find((function(e) {
                                    return e.contactRecord.disallowContactReason
                                })) ? (console.log("foundDisallowContactReason"), [4, b("foundDisallowContactReason")]) : [3, 16];
                            case 15:
                                return p.sent(), chrome.storage.local.set({
                                    searchStatus: "error"
                                }), [2];
                            case 16:
                                return [4, E({
                                    data: D,
                                    datesToExclude: u
                                })];
                            case 17:
                                return A = p.sent(), console.log("delay: " + e / 1e3), [4, h()(e)];
                            case 18:
                                return p.sent(), [2, w({
                                    token: t,
                                    filters: r,
                                    dateFilter: o,
                                    start: s + 50,
                                    delayRange: c,
                                    datesToExclude: u,
                                    nextDatesToExclude: m(m([], d), A)
                                })];
                            case 19:
                                return [3, 22];
                            case 20:
                                return console.log("loggedOut"), [4, b("loggedOut")];
                            case 21:
                                return p.sent(), chrome.storage.local.set({
                                    searchStatus: "error"
                                }), [2];
                            case 22:
                                return [3, 24];
                            case 23:
                                return O = p.sent(), console.error(O), [2];
                            case 24:
                                return [2]
                        }
                        var N, C, P, j
                    }))
                }))
            },


            T = function(e) {
                return f(void 0, void 0, void 0, (function() {
                    return p(this, (function(t) {
                        return [2, new Promise((function(t, r) {
                            chrome.storage.local.get([e], (function(r) {
                                void 0 === r[e] ? t("") : t(r[e])
                            }))
                        }))]
                    }))
                }))
            };

        // function toppings_choice (){
        //     return new Promise((resolve,reject)=>{
        //         let xpromise;
        //         resolve(xpromise = 12);
        //     })
        // }
        chrome.runtime.onMessage.addListener((function(e) {
                return f(void 0, void 0, void 0, (function() {
                    var t, r, n, o, a, s, c, i;
                    return p(this, (function(u) {
                        switch (u.label) {
                            case 0:
                                switch (console.log(e), e.type) {
                                    case "REQ_SYNC_STATUS":
                                        return [3, 1];
                                    case "INDEED_START_SEARCH":
                                        return [3, 9];
                                    case "INDEED_SET_FILTER":
                                        return [3, 10];
                                    case "INDEED_SET_DATE_FILTER":
                                        return [3, 11];
                                    case "INDEED_SET_START_POSITION":
                                        return [3, 12];
                                    case "INDEED_SET_DELAY_RANGE":
                                        return [3, 13];
                                    case "INDEED_SET_FILTER_WALKUP":
                                        return [3, 14];
                                    case "INDEED_SET_DATE_WALKUP":
                                        return [3, 15];
                                    case "INDEED_FILTER_RADIUS":
                                        console.log("INDEED FILTER RADIUS PASSED DATA:")
                                        console.log(e.data);
                                        chrome.cookies.set({
                                            "name": "selectedRadius",
                                            "url": "https://resumes.indeed.com/",
                                            "value": e.data
                                        }, function (cookie) {
                                            console.log(JSON.stringify(cookie));
                                            console.log(chrome.extension.lastError);
                                            console.log(chrome.runtime.lastError);
                                        });

                                    case "INDEED_FILTER_TARGET_API":
                                        console.log("INDEED FILTER TARGET API PASSED DATA:")
                                        console.log(e.data);
                                        chrome.cookies.set({
                                            "name": "selectedAPI",
                                            "url": "https://resumes.indeed.com/",
                                            "value": e.data
                                        }, function (cookie) {
                                            console.log(JSON.stringify(cookie));
                                            console.log(chrome.extension.lastError);
                                            console.log(chrome.runtime.lastError);
                                        });

                                    case "INDEED_FILTER_KEYWORD":
                                        console.log("INDEED FILTER KEYWORD PASSED DATA:")
                                        console.log(e.data);
                                        chrome.cookies.set({
                                            "name": "selectedKeyword",
                                            "url": "https://resumes.indeed.com/",
                                            "value": e.data
                                        }, function (cookie) {
                                            console.log(JSON.stringify(cookie));
                                            console.log(chrome.extension.lastError);
                                            console.log(chrome.runtime.lastError);
                                        });


                                }//EOF INITIAL SWITCH
                                return [3, 16];
                            case 1:
                                return [4, T("searchStatus")];
                            case 2:
                                return t = u.sent(), [4, T("indeedFilter")];
                            case 3:
                                return r = u.sent(), [4, T("currentDateFilter")];
                            case 4:
                                return n = u.sent(), [4, T("startPosition")];
                            case 5:
                                return o = u.sent(), [4, T("delayRange")];
                            case 6:
                                return a = u.sent(), [4, T("shouldIncrementDate")];
                            case 7:
                                return s = u.sent(), [4, T("shouldIncrementFilter")];
                            case 8:
                                return c = u.sent(), console.log("currentDateFilter: " + n), i = {
                                    type: "SYNC_STATUS",
                                    data: {
                                        searchStatus: t,
                                        currentFilter: r,
                                        currentDateFilter: n,
                                        delayRange: a,
                                        startPosition: o,
                                        shouldIncrementFilter: c,
                                        shouldIncrementDate: s
                                    }
                                }, chrome.runtime.sendMessage(i), y(), [3, 17];
                            case 9:
                                return f(void 0, void 0, void 0, (function() {
                                    var e, t, r, n, o, a;
                                    return p(this, (function(s) {
                                        switch (s.label) {
                                            case 0:
                                                return [4, T("indeedFilter")];
                                            case 1:
                                                return e = s.sent(), [4, T("currentDateFilter")];
                                            case 2:
                                                return t = s.sent(), [4, T("sessionCookieCSRF")];
                                            case 3:
                                                return r = s.sent(), [4, T("startCount")];
                                            case 4:
                                                return n = s.sent(), [4, T("delayRange")];
                                            case 5:
                                                return o = s.sent(), console.log(r + " : " + e + " : " + t), e && r ? (a = JSON.parse(e), o = o ? JSON.parse(o) : {
                                                    min: 100,
                                                    max: 999
                                                }, n = n ? parseInt(n, 10) : 0, chrome.storage.local.set({
                                                    searchStatus: "running"
                                                }), [2, w({
                                                    token: r,
                                                    filters: a,
                                                    dateFilter: t || g[0],
                                                    delayRange: o,
                                                    start: n || 0,
                                                    datesToExclude: [],
                                                    nextDatesToExclude: []
                                                })]) : [2]
                                        }
                                    }))
                                })), [3, 17];
                            case 10:
                                return chrome.storage.local.set({
                                    indeedFilter: e.data
                                }), [3, 17];
                            case 11:
                                return chrome.storage.local.set({
                                    currentDateFilter: e.data
                                }), [3, 17];
                            case 12:
                                return chrome.storage.local.set({
                                    startPosition: e.data
                                }), [3, 17];
                            case 13:
                                return console.log(e.data), chrome.storage.local.set({
                                    delayRange: e.data
                                }), [3, 17];
                            case 14:
                                return console.log(e.data), chrome.storage.local.set({
                                    shouldIncrementFilter: e.data
                                }), [3, 17];
                            case 15:
                                return console.log(e.data), chrome.storage.local.set({
                                    shouldIncrementDate: e.data
                                }), [3, 17];
                            case 16:
                                return [3, 17];
                            case 17:
                                return [2]
                        }
                    }))
                }))
            })), 

            chrome.webRequest.onBeforeSendHeaders.addListener((function(e) {
                var t = !1,
                    r = e.url,
                    n = e.requestHeaders;
                if (n && r.includes("https://resumes.indeed.com/rpc/search")) {
                    for (var o = 0; o < n.length; o++) "Origin" === n[o].name ? (t = !0, n[o].value = "https://resumes.indeed.com") : "Referer" === n[o].name ? n[o].value = "https://resumes.indeed.com" : "Accept" === n[o].name ? n[o].value = "*/*" : "otherRef" === n[o].name || "host" === n[o].name || ("User-Agent" === n[o].name ? n[o].value = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36" : "cookie" === n[o].name && n.splice(o, 1));
                    return t || n.push({
                        name: "Origin",
                        value: "https://resumes.indeed.com"
                    }), n.push({
                        name: "sec-fetch-site",
                        value: "same-origin"
                    }), n.push({
                        name: "sec-ch-ua",
                        value: '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"'
                    }), n.push({
                        name: "sec-ch-ua-mobile",
                        value: "?0"
                    }), n.push({
                        name: "sec-ch-ua-platform",
                        value: '"macOS"'
                    }), n.push({
                        name: "sec-fetch-dest",
                        value: "empty"
                    }), n.push({
                        name: "sec-fetch-mode",
                        value: "cors"
                    }), {
                        requestHeaders: n
                    }
                }
                return {}
            }), {
                urls: ["<all_urls>"]
            }, ["blocking", "requestHeaders", "extraHeaders"]),



            function() {
                console.log("getIndeedAuthCookies");
                var e = ["CSRF"];
                chrome.cookies.getAll({}, (function(t) {
                    var r = e.reduce((function(e, r) {
                        var n = t.find((function(e) {
                            return e.name === r
                        }));
                        return n && (e[r] = n.value), e
                    }), {});
                    chrome.storage.local.set({
                        sessionCookieCSRF: r.CSRF
                    })
                }))
            }()           


    })()
})();