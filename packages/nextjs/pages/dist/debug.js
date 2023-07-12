"use strict";
exports.__esModule = true;
var scaffold_eth_1 = require("~~/components/scaffold-eth");
var Debug = function () {
    return (React.createElement("div", { className: "flex justify-center" },
        React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-6 py-12 px-10 lg:gap-12 w-full 2xl:max-w-7xl my-0" },
            React.createElement("div", null,
                React.createElement("h1", { className: "text-4xl my-0" }, "Debug Contract"),
                React.createElement("p", { className: "font-medium" }, "This is a placeholder text for the introduction to Debug Contracts page. In this page you can...")),
            React.createElement(scaffold_eth_1.ContractUI, { contractName: "Lines" }),
            React.createElement(scaffold_eth_1.ContractUI, { contractName: "LinesTweet" }))));
};
exports["default"] = Debug;
