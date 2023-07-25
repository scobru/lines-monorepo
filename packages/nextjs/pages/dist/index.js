"use strict";
exports.__esModule = true;
var head_1 = require("next/head");
var banner_png_1 = require("../public/assets/banner.png");
var image_1 = require("next/image");
var Home = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Lines"),
            React.createElement("meta", { name: "description", content: "Lines Open Board" }),
            React.createElement("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }),
            React.createElement("link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }),
            React.createElement("link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }),
            React.createElement("link", { rel: "manifest", href: "/site.webmanifest" }),
            React.createElement("link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" }),
            React.createElement("meta", { name: "msapplication-TileColor", content: "#da532c" }),
            React.createElement("meta", { name: "theme-color", content: "#ffffff" })),
        React.createElement("div", { className: "max-w-3xl text-center items-center my-10 mx-auto" },
            React.createElement("div", { className: "max-w-2xl px-6 py-2 text-center" },
                React.createElement(image_1["default"], { src: banner_png_1["default"], alt: "Tiers Banner", className: "mx-auto mb-10 justify-start" }),
                React.createElement("p", { className: "mt-8 text-3xl font-medium" }, "Free, uncensored, and forever."),
                React.createElement("p", { className: "mt-4 text-xl font-regular" }, "Record your thoughts, ideas, and feelings on the blockchain."),
                " "))));
};
exports["default"] = Home;
