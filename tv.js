"use strict";
!function() {
    if (window.TradingView && window.TradingView.host && !window.TradingView.reoloadTvjs)
        return;
    var t = {
        "color-cold-gray-300": "#B2B5BE",
        "color-brand": "#2962FF",
        "color-brand-hover": "#1E53E5",
        "color-brand-active": "#1848CC"
    };
    const e = new RegExp("^http(s)?:(//)?");
    var o, i, r, n, a, s, d = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif", l = {
        host: null == window.location.host.match(/tradingview\.com|pyrrosinvestment\.com/i) ? "https://s.tradingview.com" : "https://www.tradingview.com",
        ideasHost: "https://www.tradingview.com",
        chatHost: "https://www.tradingview.com",
        widgetHost: "https://www.tradingview-widget.com",
        getHost: function(t) {
            return t.useWidgetHost ? l.widgetHost : l.host
        },
        embedStylesForCopyright: function() {
            var e = document.createElement("style");
            return e.innerHTML = ".tradingview-widget-copyright {font-size: 13px !important; line-height: 32px !important; text-align: center !important; vertical-align: middle !important; font-family: " + d + " !important; color: " + t["color-cold-gray-300"] + " !important;} .tradingview-widget-copyright .blue-text {color: " + t["color-brand"] + " !important;} .tradingview-widget-copyright a {text-decoration: none !important; color: " + t["color-cold-gray-300"] + " !important;} .tradingview-widget-copyright a:visited {color: " + t["color-cold-gray-300"] + " !important;} .tradingview-widget-copyright a:hover .blue-text {color: " + t["color-brand-hover"] + " !important;} .tradingview-widget-copyright a:active .blue-text {color: " + t["color-brand-active"] + " !important;} .tradingview-widget-copyright a:visited .blue-text {color: " + t["color-brand"] + " !important;}",
            e
        },
        embedStylesForFullHeight: function(t, e, o) {
            var i = e ? "calc(" + t + " - 32px)" : t
              , r = document.querySelector("#" + o);
            r.parentElement.style.height = i,
            r.style.height = "100%"
        },
        gId: function() {
            return "tradingview_" + (1048576 * (1 + Math.random()) | 0).toString(16).substring(1)
        },
        isPersentHeight: function(t) {
            return "%" === t
        },
        getSuffix: function(t) {
            var e = t.toString().match(/(%|px|em|ex)/);
            return e ? e[0] : "px"
        },
        hasCopyright: function(t) {
            var e = document.getElementById(t)
              , o = e && e.parentElement;
            return !!o && !!o.querySelector(".tradingview-widget-copyright")
        },
        calculateWidgetHeight: function(t, e) {
            var o = parseInt(t)
              , i = this.getSuffix(t)
              , r = this.isPersentHeight(i)
              , n = e && this.hasCopyright(e);
            return r && e && (this.embedStylesForFullHeight(o + i, n, e),
            n) ? 100 + i : n ? "calc(" + o + i + " - 32px)" : o + i
        },
        onready: function(t) {
            window.addEventListener ? window.addEventListener("DOMContentLoaded", t, !1) : window.attachEvent("onload", t)
        },
        bindEvent: function(t, e, o) {
            t.addEventListener ? t.addEventListener(e, o, !1) : t.attachEvent && t.attachEvent("on" + e, o)
        },
        unbindEvent: function(t, e, o) {
            t.removeEventListener ? t.removeEventListener(e, o, !1) : t.detachEvent && t.detachEvent("on" + e, o)
        },
        cloneSimpleObject: function(t) {
            if (null == t || "object" != typeof t)
                return t;
            var e = t.constructor();
            for (var o in t)
                t.hasOwnProperty(o) && (e[o] = t[o]);
            return e
        },
        isArray: function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        generateUtmForUrlParams: function(t) {
            var e = {
                utm_source: window.location.hostname,
                utm_medium: l.hasCopyright(t.container) ? "widget_new" : "widget"
            };
            return t.type && (e.utm_campaign = t.type,
            "chart" === t.type && (e.utm_term = t.symbol)),
            e
        },
        getPageUriString: function() {
            const t = location.href
              , o = this.invalidUrl(t);
            return o || t.replace(e, "")
        },
        invalidUrl: function(t) {
            try {
                const o = new URL(t);
                return e.test(o.protocol) ? null : "__NHTTP__"
            } catch (t) {
                return "__FAIL__"
            }
        },
        getWidgetTitleAttribute: function(t, e) {
            return t || e.replace("-", " ") + " TradingView widget"
        },
        WidgetAbstract: function() {},
        MediumWidget: function(t) {
            this.id = l.gId();
            const e = l.calculateWidgetHeight(t.height || 400, t.container_id);
            let o;
            switch (t.chartType) {
            case "candlesticks":
                {
                    const {chartType: e, upColor: i, downColor: r, borderUpColor: n, borderDownColor: a, wickUpColor: s, wickDownColor: d} = t;
                    o = {
                        chartType: e,
                        upColor: i,
                        downColor: r,
                        borderUpColor: n,
                        borderDownColor: a,
                        wickUpColor: s,
                        wickDownColor: d
                    };
                    break
                }
            case "bars":
                {
                    const {chartType: e, upColor: i, downColor: r} = t;
                    o = {
                        chartType: e,
                        upColor: i,
                        downColor: r
                    };
                    break
                }
            case "line":
                {
                    const {chartType: e, color: i, colorGrowing: r, colorFalling: n, lineWidth: a} = t;
                    o = {
                        chartType: e,
                        color: i,
                        colorGrowing: r,
                        colorFalling: n,
                        lineWidth: a
                    };
                    break
                }
            case "area":
            default:
                {
                    const {chartType: e="area", lineColor: i=t.trendLineColor || "", lineColorGrowing: r, lineColorFalling: n, topColor: a=t.underLineColor || "", bottomColor: s=t.underLineBottomColor || "", lineWidth: d} = t;
                    o = {
                        chartType: e,
                        lineColor: i,
                        lineColorGrowing: r,
                        lineColorFalling: n,
                        topColor: a,
                        bottomColor: s,
                        lineWidth: d
                    };
                    break
                }
            }
            this.options = {
                container: t.container_id || "",
                width: l.WidgetAbstract.prototype.fixSize(t.width) || "",
                height: l.WidgetAbstract.prototype.fixSize(e) || "",
                symbols: t.symbols,
                greyText: t.greyText || "",
                symbols_description: t.symbols_description || "",
                large_chart_url: t.large_chart_url || "",
                customer: t.customer || "",
                backgroundColor: t.backgroundColor || "",
                gridLineColor: t.gridLineColor || "",
                fontColor: t.fontColor || "",
                fontSize: t.fontSize || "",
                widgetFontColor: t.widgetFontColor || "",
                timeAxisBackgroundColor: t.timeAxisBackgroundColor || "",
                chartOnly: !!t.chartOnly,
                locale: t.locale,
                colorTheme: t.colorTheme,
                isTransparent: t.isTransparent,
                useWidgetHost: Boolean(t.useWidgetHost),
                showFloatingTooltip: t.showFloatingTooltip,
                valuesTracking: t.valuesTracking,
                changeMode: t.changeMode,
                dateFormat: t.dateFormat,
                timeHoursFormat: t.timeHoursFormat,
                showVolume: t.showVolume,
                showMA: t.showMA,
                volumeUpColor: t.volumeUpColor,
                volumeDownColor: t.volumeDownColor,
                maLineColor: t.maLineColor,
                maLineWidth: t.maLineWidth,
                maLength: t.maLength,
                hideDateRanges: t.hideDateRanges,
                hideMarketStatus: t.hideMarketStatus,
                hideSymbolLogo: t.hideSymbolLogo,
                scalePosition: t.scalePosition,
                scaleMode: t.scaleMode,
                fontFamily: t.fontFamily,
                noTimeScale: t.noTimeScale,
                ...o
            },
            this.create()
        },
        widget: function(t) {
            this.id = t.id || l.gId();
            var e = l.getUrlParams()
              , o = t.tvwidgetsymbol || e.tvwidgetsymbol || e.symbol || t.symbol || "NASDAQ:AAPL"
              , i = t.logo || "";
            i.src && (i = i.src),
            i && i.replace(".png", "");
            var r = l.calculateWidgetHeight(t.height || 500, t.container_id);
            this.options = {
                width: t.width || 800,
                height: r,
                symbol: o,
                interval: t.interval || "1",
                range: t.range || "",
                timezone: t.timezone || "",
                autosize: t.autosize,
                hide_top_toolbar: t.hide_top_toolbar,
                hide_side_toolbar: t.hide_side_toolbar,
                hide_legend: t.hide_legend,
                hide_volume: t.hide_volume,
                allow_symbol_change: t.allow_symbol_change,
                save_image: void 0 === t.save_image || t.save_image,
                container: t.container_id || "",
                watchlist: t.watchlist || [],
                editablewatchlist: !!t.editablewatchlist,
                studies: t.studies || [],
                theme: t.theme || "",
                style: t.style || "",
                extended_hours: void 0 === t.extended_hours ? void 0 : +t.extended_hours,
                details: !!t.details,
                calendar: !!t.calendar,
                hotlist: !!t.hotlist,
                hideideasbutton: !!t.hideideasbutton,
                widgetbar_width: +t.widgetbar_width || void 0,
                withdateranges: t.withdateranges || "",
                customer: t.customer || i || "",
                venue: t.venue,
                symbology: t.symbology,
                logo: i,
                show_popup_button: !!t.show_popup_button,
                popup_height: t.popup_height || "",
                popup_width: t.popup_width || "",
                studies_overrides: t.studies_overrides,
                overrides: t.overrides,
                enabled_features: t.enabled_features,
                disabled_features: t.disabled_features,
                publish_source: t.publish_source || "",
                enable_publishing: t.enable_publishing,
                whotrades: t.whotrades || void 0,
                locale: t.locale,
                referral_id: t.referral_id,
                no_referral_id: t.no_referral_id,
                fundamental: t.fundamental,
                percentage: t.percentage,
                hidevolume: t.hidevolume,
                padding: t.padding,
                greyText: t.greyText || "",
                horztouchdrag: t.horztouchdrag,
                verttouchdrag: t.verttouchdrag,
                useWidgetHost: Boolean(t.useWidgetHost),
                backgroundColor: t.backgroundColor,
                gridColor: t.gridColor,
                doNotStoreSettings: t.doNotStoreSettings
            },
            t.cme && (this.options.customer = "cme"),
            isFinite(t.widgetbar_width) && t.widgetbar_width > 0 && (this.options.widgetbar_width = t.widgetbar_width),
            this._ready_handlers = [],
            this.create()
        },
        chart: function(t) {
            this.id = l.gId(),
            this.options = {
                width: t.width || 640,
                height: t.height || 500,
                container: t.container_id || "",
                realtime: t.realtime,
                chart: t.chart,
                locale: t.locale,
                type: "chart",
                autosize: t.autosize,
                mobileStatic: t.mobileStatic
            },
            this._ready_handlers = [],
            this.create()
        },
        stream: function(t) {
            this.id = l.gId(),
            this.options = {
                width: t.width || 640,
                height: t.height || 500,
                container: t.container_id || "",
                stream: t.stream,
                locale: t.locale,
                autosize: t.autosize
            },
            this.create()
        },
        EventsWidget: function(t) {
            this.id = l.gId(),
            this.options = {
                container: t.container_id || "",
                width: t.width || 486,
                height: t.height || 670,
                currency: t.currencyFilter || "",
                importance: t.importanceFilter || "",
                type: "economic-calendar"
            },
            this.create(t)
        },
        IdeasStreamWidget: function(t) {
            console.warn("We're sorry, the Ideas Stream widget is discontinued")
        },
        IdeaWidget: function() {
            console.warn("We're sorry, the Idea Preview widget is discontinued")
        },
        ChatWidgetEmbed: function(t) {
            console.warn("We're sorry, the Chat widget is discontinued")
        }
    };
    l.WidgetAbstract.prototype = {
        widgetId: "unknown",
        fixSize: function(t) {
            return /^[0-9]+(\.|,[0-9])*$/.test(t) ? t + "px" : t
        },
        width: function() {
            return this.options.autosize ? "100%" : l.WidgetAbstract.prototype.fixSize(this.options.width)
        },
        height: function() {
            return this.options.autosize ? "100%" : l.WidgetAbstract.prototype.fixSize(this.options.height)
        },
        addWrapperFrame: function(t) {
            const e = document.createElement("div");
            return e.id = this.id + "-wrapper",
            e.style.cssText = "position: relative;box-sizing: content-box;margin: 0 auto !important;padding: 0 !important;font-family: " + d + ";",
            e.style.width = l.WidgetAbstract.prototype.width.call(this),
            e.style.height = l.WidgetAbstract.prototype.height.call(this),
            e.appendChild(t),
            e
        }
    },
    l.EventsWidget.prototype = {
        widgetId: "events",
        create: function() {
            var t = this.render();
            c(t, this.options)
        },
        render: function() {
            var t = new URL(l.getHost(this.options));
            t.pathname = "/eventswidgetembed/",
            l.addUrlParams(t, {
                currency: this.options.currency,
                importance: this.options.importance
            }),
            this.options.type = "events",
            l.addUrlParams(t, l.generateUtmForUrlParams(this.options));
            const e = document.createElement("iframe");
            return e.title = l.getWidgetTitleAttribute(this.options.iframeTitle, this.widgetId),
            e.lang = this.options.iframeLang || "en",
            e.width = this.options.width,
            this.options.height && (e.height = this.options.height),
            e.setAttribute("frameBorder", "0"),
            e.setAttribute("scrolling", "no"),
            e.src = t,
            e
        }
    },
    l.MediumWidget.prototype = {
        widgetId: "symbol-overview",
        create: function() {
            const t = this.render();
            c(t, this.options)
        },
        render: function() {
            const t = Object.create(null);
            for (const e of ["symbols", "width", "height", "colorTheme", "backgroundColor", "gridLineColor", "fontColor", "widgetFontColor", "underLineColor", "underLineBottomColor", "trendLineColor", "activeTickerBackgroundColor", "timeAxisBackgroundColor", "scalePosition", "scaleMode", "chartType", "color", "colorGrowing", "colorFalling", "lineColor", "lineColorGrowing", "lineColorFalling", "topColor", "bottomColor", "upColor", "downColor", "borderUpColor", "borderDownColor", "wickUpColor", "wickDownColor", "fontFamily", "fontSize", "noTimeScale", "valuesTracking", "changeMode", "dateFormat", "timeHoursFormat", "lineWidth", "volumeUpColor", "volumeDownColor", "chartOnly", "isTransparent", "showFloatingTooltip", "showVolume", "showMA", "maLineColor", "maLineWidth", "maLength", "hideDateRanges", "hideMarketStatus", "hideSymbolLogo"])
                this.options[e] && (t[e] = this.options[e]);
            t["page-uri"] = l.getPageUriString(),
            this.options.type = "symbol-overview";
            const e = l.generateUtmForUrlParams(this.options);
            for (var o of Object.keys(e))
                t[o] = e[o];
            const i = new URL("/embed-widget/symbol-overview/",l.getHost(this.options));
            this.options.customer && (i.pathname += this.options.customer + "/"),
            this.options.locale && i.searchParams.append("locale", this.options.locale),
            i.hash = encodeURIComponent(JSON.stringify(t));
            const r = document.createElement("iframe");
            return r.title = l.getWidgetTitleAttribute(this.options.iframeTitle, this.widgetId),
            r.lang = this.options.iframeLang || "en",
            r.id = this.id,
            r.style.cssText = "margin: 0 !important;padding: 0 !important;",
            this.options.width && (r.style.width = this.options.width),
            this.options.height && (r.style.height = this.options.height),
            r.setAttribute("frameBorder", "0"),
            r.setAttribute("allowTransparency", "true"),
            r.setAttribute("scrolling", "no"),
            r.src = i.href,
            r
        },
        remove: function() {
            var t = document.getElementById("tradingview_widget");
            t.parentNode.removeChild(t)
        }
    },
    l.widget.prototype = {
        widgetId: "advanced-chart",
        create: function() {
            this.options.type = this.options.fundamental ? "fundamental" : "chart",
            this.iframe = this.render();
            var t = this;
            let e = this.iframe;
            this.options.noLogoOverlay || (e = l.WidgetAbstract.prototype.addWrapperFrame.call(this, e)),
            c(e, this.options);
            var o = document.getElementById("tradingview-copyright");
            o && o.parentElement && o.parentElement.removeChild(o),
            this.postMessage = l.postMessageWrapper(this.iframe.contentWindow, this.id),
            l.bindEvent(this.iframe, "load", (function() {
                t.postMessage.get("widgetReady", {}, (function() {
                    var e;
                    for (t._ready = !0,
                    e = t._ready_handlers.length; e--; )
                        t._ready_handlers[e].call(t)
                }
                ))
            }
            )),
            t.postMessage.on("openChartInPopup", (function(e) {
                for (var o = l.cloneSimpleObject(t.options), i = ["symbol", "interval"], r = i.length - 1; r >= 0; r--) {
                    var n = i[r]
                      , a = e[n];
                    a && (o[n] = a)
                }
                o.show_popup_button = !1;
                var s = t.options.popup_width || 900
                  , d = t.options.popup_height || 600
                  , c = (screen.width - s) / 2
                  , h = (screen.height - d) / 2
                  , g = window.open(t.generateUrl(o), "_blank", "resizable=yes, top=" + h + ", left=" + c + ", width=" + s + ", height=" + d);
                g && (g.opener = null)
            }
            ))
        },
        ready: function(t) {
            this._ready ? t.call(this) : this._ready_handlers.push(t)
        },
        render: function() {
            const t = document.createElement("iframe");
            return t.title = l.getWidgetTitleAttribute(this.options.iframeTitle, this.widgetId),
            t.lang = this.options.iframeLang || "en",
            t.id = this.id,
            t.style.cssText = "width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;",
            t.setAttribute("frameBorder", "0"),
            t.setAttribute("allowTransparency", "true"),
            t.setAttribute("scrolling", "no"),
            t.setAttribute("allowfullscreen", "true"),
            t.src = this.generateUrl(),
            t
        },
        generateUrl: function(t) {
            var e;
            function o(t, e, o) {
                let i = h(e, o);
                "object" == typeof i && (i = JSON.stringify(i)),
                void 0 !== i && "" !== i && (a[t] = i)
            }
            function i(t, e, i) {
                o(t, void 0 === e ? void 0 : e ? "1" : i)
            }
            e = "cme" === (t = t || this.options).customer ? "/cmewidgetembed/" : t.customer ? "/" + t.customer + "/widgetembed/" : "/widgetembed/";
            var r = t.enable_publishing ? l.ideasHost : l.getHost(t);
            const n = new URL(r + e);
            n.searchParams.append("hideideas", "1"),
            n.searchParams.append("overrides", JSON.stringify(h(t.overrides, {}))),
            n.searchParams.append("enabled_features", JSON.stringify(h(t.enabled_features, []))),
            n.searchParams.append("disabled_features", JSON.stringify(h(t.disabled_features, []))),
            t.locale && n.searchParams.append("locale", t.locale);
            const a = Object.create(null);
            return a.symbol = t.symbol,
            a.frameElementId = this.id,
            a.interval = t.interval,
            o("range", t.range),
            i("hide_top_toolbar", t.hide_top_toolbar),
            i("hide_legend", t.hide_legend),
            i("hide_side_toolbar", t.hide_side_toolbar, "0"),
            i("allow_symbol_change", t.allow_symbol_change, "0"),
            i("save_image", t.save_image, "0"),
            i("doNotStoreSettings", t.doNotStoreSettings),
            o("backgroundColor", t.backgroundColor),
            o("gridColor", t.gridColor),
            t.watchlist && t.watchlist.length && t.watchlist.join && o("watchlist", t.watchlist.join("")),
            i("editablewatchlist", t.editablewatchlist),
            i("details", t.details),
            i("calendar", t.calendar),
            i("hotlist", t.hotlist),
            t.studies && l.isArray(t.studies) && ("string" == typeof t.studies[0] ? o("studies", t.studies.join("")) : o("studies", t.studies)),
            i("horztouchdrag", t.horztouchdrag, "0"),
            i("verttouchdrag", t.verttouchdrag, "0"),
            o("widgetbar_width", t.widgetbar_width),
            o("theme", t.theme),
            o("style", t.style),
            o("extended_hours", t.extended_hours),
            o("timezone", t.timezone),
            i("hideideasbutton", t.hideideasbutton),
            i("withdateranges", t.withdateranges),
            i("hide_volume", t.hide_volume),
            o("padding", t.padding),
            i("show_popup_button", t.show_popup_button),
            o("padding", t.padding),
            o("studies_overrides", t.studies_overrides, {}),
            o("publish_source", t.publish_source),
            i("enable_publishing", t.enable_publishing),
            o("venue", t.venue),
            o("symbology", t.symbology),
            o("whotrades", t.whotrades),
            o("referral_id", t.referral_id),
            i("no_referral_id", t.no_referral_id),
            o("fundamental", t.fundamental),
            o("percentage", t.percentage),
            o("utm_source", window.location.hostname),
            o("utm_medium", l.hasCopyright(t.container) ? "widget_new" : "widget"),
            o("utm_campaign", t.type),
            r !== l.host && o("supportHost", l.host),
            t.type && "chart" === t.type && o("utm_term", t.symbol),
            o("page-uri", l.getPageUriString()),
            `${n}#${encodeURIComponent(JSON.stringify(a))}`
        },
        image: function(t) {
            this.postMessage.get("imageURL", {}, (function(e) {
                var o = l.host + "/x/" + e + "/";
                t(o)
            }
            ))
        },
        subscribeToQuote: function(t) {
            var e = document.getElementById(this.id);
            this.postMessage.post(e.contentWindow, "quoteSubscribe"),
            this.postMessage.on("quoteUpdate", t)
        },
        getSymbolInfo: function(t) {
            this.postMessage.get("symbolInfo", {}, t)
        },
        remove: function() {
            var t = document.getElementById(this.id);
            t.parentNode.removeChild(t)
        },
        reload: function() {
            var t = document.getElementById(this.id);
            t.parentNode.replaceChild(this.render(), t)
        }
    },
    l.chart.prototype = {
        widgetId: "published-chart",
        create: function() {
            const t = this.render()
              , e = l.WidgetAbstract.prototype.addWrapperFrame.call(this, t);
            var o, i = this;
            c(e, this.options),
            o = document.getElementById(this.id),
            l.bindEvent(o, "load", (function() {
                var t;
                for (i._ready = !0,
                t = i._ready_handlers.length; t--; )
                    i._ready_handlers[t].call(i)
            }
            )),
            l.onready((function() {
                var t = !1;
                if (document.querySelector && document.querySelector('a[href$="/v/' + i.options.chart + '/"]') && (t = !0),
                !t)
                    for (var e = document.getElementsByTagName("a"), r = new RegExp("/v/" + i.options.chart + "/$"), n = new RegExp("/chart/([0-9a-zA-Z:+*-/()]+)/" + i.options.chart), a = 0; a < e.length; a++)
                        if (r.test(e[a].href) || n.test(e[a].href)) {
                            t = !0;
                            break
                        }
                t && (o.src += "#nolinks",
                o.name = "nolinks")
            }
            ))
        },
        ready: l.widget.prototype.ready,
        render: function() {
            var t = new URL(`${l.host}/embed/${this.options.chart}`);
            l.addUrlParams(t, {
                method: "script",
                locale: this.options.locale
            }, !0),
            this.options.type = "chart",
            l.addUrlParams(t, l.generateUtmForUrlParams(this.options));
            const e = document.createElement("iframe");
            return e.title = l.getWidgetTitleAttribute(this.options.iframeTitle, this.widgetId),
            e.lang = this.options.iframeLang || "en",
            e.id = this.id,
            e.style.cssText = "width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;",
            e.setAttribute("frameBorder", "0"),
            e.setAttribute("allowTransparency", "true"),
            e.setAttribute("scrolling", "no"),
            e.setAttribute("allowfullscreen", "true"),
            e.src = t.href,
            e
        },
        toggleFullscreen: function(t) {
            var e = document.getElementById(this.id);
            document.fullscreenElement === e ? document.exitFullscreen() : e.requestFullscreen()
        },
        getSymbolInfo: function(t) {
            this.postMessage.get("symbolInfo", {}, t)
        }
    },
    l.stream.prototype = {
        widgetId: "stream",
        create: function() {
            const t = this.render()
              , e = l.WidgetAbstract.prototype.addWrapperFrame.call(this, t);
            c(e, this.options)
        },
        render: function() {
            var t = new URL(l.host + this.options.stream + "/embed/");
            l.addUrlParams(t, {
                locale: this.options.locale
            }, !0),
            this.options.type = "chart",
            l.addUrlParams(t, l.generateUtmForUrlParams(this.options));
            const e = document.createElement("iframe");
            return e.title = l.getWidgetTitleAttribute(this.options.iframeTitle, this.widgetId),
            e.lang = this.options.iframeLang || "en",
            e.id = this.id,
            e.style.cssText = "width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;",
            e.setAttribute("frameBorder", "0"),
            e.setAttribute("allowTransparency", "true"),
            e.setAttribute("scrolling", "no"),
            e.setAttribute("allowfullscreen", "true"),
            e.src = t.href,
            e
        }
    },
    l.postMessageWrapper = (i = {},
    r = {},
    n = {},
    a = 0,
    s = 0,
    window.addEventListener && window.addEventListener("message", (function(t) {
        var e;
        try {
            e = JSON.parse(t.data)
        } catch (t) {
            return
        }
        if (e && e.provider && "TradingView" === e.provider)
            if (e.source = t.source,
            "get" === e.type) {
                if (!r[e.name])
                    return;
                r[e.name].forEach((function(t) {
                    "function" == typeof t && t.call(e, e.data, (function(t) {
                        var i = {
                            id: e.id,
                            type: "on",
                            name: e.name,
                            client_id: e.client_id,
                            data: t,
                            provider: "TradingView"
                        };
                        o.postMessage(JSON.stringify(i), "*")
                    }
                    ))
                }
                ))
            } else if ("on" === e.type)
                i[e.client_id] && i[e.client_id][e.id] && (i[e.client_id][e.id].call(e, e.data),
                delete i[e.client_id][e.id]);
            else if ("post" === e.type) {
                if (!r[e.name])
                    return;
                r[e.name].forEach((function(t) {
                    "function" == typeof t && t.call(e, e.data, (function() {}
                    ))
                }
                ))
            }
    }
    )),
    function(t, e) {
        return i[e] = {},
        n[e] = t,
        o = t,
        {
            on: function(t, e, o) {
                r[t] && o || (r[t] = []),
                r[t].push(e)
            },
            off: function(t, e) {
                if (!r[t])
                    return !1;
                var o = r[t].indexOf(e);
                o > -1 && r[t].splice(o, 1)
            },
            get: function(t, o, r) {
                var s = {
                    id: a++,
                    type: "get",
                    name: t,
                    client_id: e,
                    data: o,
                    provider: "TradingView"
                };
                i[e][s.id] = r,
                n[e].postMessage(JSON.stringify(s), "*")
            },
            post: function(t, e, o) {
                var i = {
                    id: s++,
                    type: "post",
                    name: e,
                    data: o,
                    provider: "TradingView"
                };
                t && "function" == typeof t.postMessage && t.postMessage(JSON.stringify(i), "*")
            }
        }
    }
    ),
    l.getUrlParams = function() {
        for (var t = /\+/g, e = /([^&=]+)=?([^&]*)/g, o = window.location.search.substring(1), i = e.exec(o), r = function(e) {
            return decodeURIComponent(e.replace(t, " "))
        }, n = {}; i; )
            n[r(i[1])] = r(i[2]),
            i = e.exec(o);
        return n
    }
    ,
    l.createUrlParams = function(t) {
        var e = [];
        for (var o in t)
            t.hasOwnProperty(o) && null != t[o] && e.push(encodeURIComponent(o) + "=" + encodeURIComponent(t[o]));
        return e.join("&")
    }
    ,
    l.addUrlParams = function(t, e, o) {
        for (var i in e)
            e.hasOwnProperty(i) && (o ? e[i] : null != e[i]) && t.searchParams.set(i, e[i]);
        return t
    }
    ;
    var c = function(t, e) {
        var o = document.getElementById(e.container);
        if (o) {
            o.innerHTML = "",
            o.appendChild(t);
            var i = o.parentElement && o.parentElement.querySelector(".tradingview-widget-copyright");
            if (i) {
                i.style.width = o.querySelector("iframe").style.width;
                var r = i.querySelector("a");
                if (r) {
                    var n = r.getAttribute("href");
                    if (n)
                        try {
                            const t = new URL(n);
                            l.addUrlParams(t, l.generateUtmForUrlParams(e)),
                            r.setAttribute("href", t.toString())
                        } catch (t) {
                            console.log(`Cannot update link UTM params, href="${n}"`)
                        }
                }
            }
        } else
            document.currentScript.parentNode.insertBefore(t, document.currentScript.nextSibling);
        const a = l.embedStylesForCopyright()
          , s = function() {
            const t = document.querySelector("script[nonce]");
            return t && (t.nonce || t.getAttribute("nonce"))
        }();
        s && a.setAttribute("nonce", s),
        document.body.appendChild(a)
    };
    function h(t, e) {
        return null != t ? t : e
    }
    window.TradingView ? function t(e, o) {
        for (var i in o)
            "object" == typeof o[i] && e.hasOwnProperty(i) ? t(e[i], o[i]) : e[i] = o[i];
        return e
    }(window.TradingView, l) : window.TradingView = l
}();
