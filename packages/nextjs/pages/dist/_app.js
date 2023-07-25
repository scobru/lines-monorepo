"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
require("~~/styles/globals.css");
var rainbowkit_1 = require("@rainbow-me/rainbowkit");
var wagmi_1 = require("wagmi");
var react_hot_toast_1 = require("react-hot-toast");
require("@rainbow-me/rainbowkit/styles.css");
var wagmiConnectors_1 = require("~~/services/web3/wagmiConnectors");
var wagmiClient_1 = require("~~/services/web3/wagmiClient");
var Header_1 = require("~~/components/Header");
var Footer_1 = require("~~/components/Footer");
var react_1 = require("react");
var store_1 = require("~~/services/store/store");
var scaffold_eth_1 = require("~~/hooks/scaffold-eth");
var nextjs_progressbar_1 = require("nextjs-progressbar");
var ScaffoldEthApp = function (_a) {
    var Component = _a.Component, pageProps = __rest(_a.pageProps, []);
    var price = scaffold_eth_1.useEthPrice();
    var setEthPrice = store_1.useAppStore(function (state) { return state.ethPriceSlice.setEthPrice; });
    react_1.useEffect(function () {
        if (price > 0) {
            setEthPrice(price);
        }
    }, [setEthPrice, price]);
    return (React.createElement(wagmi_1.WagmiConfig, { client: wagmiClient_1.wagmiClient },
        React.createElement(nextjs_progressbar_1["default"], null),
        React.createElement(rainbowkit_1.RainbowKitProvider, { chains: wagmiConnectors_1.appChains.chains },
            React.createElement("div", { className: "flex flex-col min-h-screen" },
                React.createElement(Header_1["default"], null),
                React.createElement("main", { className: "flex flex-col flex-1 bg-base-100 " },
                    React.createElement(Component, __assign({}, pageProps))),
                React.createElement(Footer_1["default"], null)),
            React.createElement(react_hot_toast_1.Toaster, null))));
};
exports["default"] = ScaffoldEthApp;
