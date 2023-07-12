"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var head_1 = require("next/head");
var react_1 = require("react");
var wagmi_1 = require("wagmi");
var utilsContract_1 = require("../components/scaffold-eth/Contract/utilsContract");
var scaffold_eth_1 = require("~~/utils/scaffold-eth");
var solid_1 = require("@heroicons/react/24/solid");
var utils_js_1 = require("ethers/lib/utils.js");
var Address_1 = require("../components/scaffold-eth/Address");
var router_1 = require("next/router");
var LinesTweet = function () {
    var chain = wagmi_1.useNetwork().chain;
    var signer = wagmi_1.useSigner().data;
    var account = wagmi_1.useAccount();
    var provider = wagmi_1.useProvider();
    var router = router_1.useRouter();
    var _a = react_1["default"].useState(0), followPrice = _a[0], setFollowPrice = _a[1];
    var _b = react_1["default"].useState(0), likePrice = _b[0], setLikePrice = _b[1];
    var _c = react_1["default"].useState(0), reTweetPrice = _c[0], setReTweetPrice = _c[1];
    var _d = react_1["default"].useState([]), listTweet = _d[0], setListTweet = _d[1];
    var _e = react_1["default"].useState(""), message = _e[0], setMessage = _e[1];
    var _f = react_1["default"].useState(""), userSearch = _f[0], setUserSearch = _f[1];
    var _g = react_1["default"].useState(0), reportPrice = _g[0], setReportPrice = _g[1];
    var deployedContract = utilsContract_1.getDeployedContract(chain === null || chain === void 0 ? void 0 : chain.id.toString(), "LinesTweet");
    var _h = react_1["default"].useState(0), followerCount = _h[0], setFollowerCount = _h[1];
    var ctxAddress;
    var ctxAbi = [];
    var id = router.query.id;
    if (deployedContract) {
        (ctxAddress = deployedContract.address, ctxAbi = deployedContract.abi);
    }
    var ctx = wagmi_1.useContract({
        address: ctxAddress,
        abi: ctxAbi,
        signerOrProvider: signer ? signer : provider
    });
    // function to get contract data
    var getContractData = function getContractData() {
        return __awaiter(this, void 0, void 0, function () {
            var followPrice_1, likePrice_1, reTweetPrice_1, tweetList, reportPrice_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ctx) return [3 /*break*/, 6];
                        return [4 /*yield*/, ctx.FOLLOW_PRICE()];
                    case 1:
                        followPrice_1 = _a.sent();
                        return [4 /*yield*/, ctx.LIKE_PRICE()];
                    case 2:
                        likePrice_1 = _a.sent();
                        return [4 /*yield*/, ctx.RETWEET_PRICE()];
                    case 3:
                        reTweetPrice_1 = _a.sent();
                        return [4 /*yield*/, (ctx === null || ctx === void 0 ? void 0 : ctx.getTweets())];
                    case 4:
                        tweetList = _a.sent();
                        return [4 /*yield*/, (ctx === null || ctx === void 0 ? void 0 : ctx.REPORT_PRICE())];
                    case 5:
                        reportPrice_1 = _a.sent();
                        setReportPrice(Number(reportPrice_1));
                        setFollowPrice(Number(followPrice_1));
                        setLikePrice(Number(likePrice_1));
                        setReTweetPrice(Number(reTweetPrice_1));
                        setListTweet(tweetList);
                        getFollowerCount();
                        console.log(tweetList);
                        console.log(ctx);
                        console.log("followPrice: ", followPrice_1, "likePrice: ", likePrice_1, "reTweetPrice: ", reTweetPrice_1);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    react_1.useEffect(function () {
        if (id) {
            getAllTweetsForUser(id.toString());
        }
        else {
            getContractData();
        }
    }, [ctx]);
    var getAllTweetsForUser = function getAllTweetsForUser(user) {
        return __awaiter(this, void 0, void 0, function () {
            var tweetList, len, tweetList2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx && account)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (ctx === null || ctx === void 0 ? void 0 : ctx.getTweets())];
                    case 1:
                        tweetList = _a.sent();
                        len = tweetList.length;
                        return [4 /*yield*/, (ctx === null || ctx === void 0 ? void 0 : ctx.getTweetsOf(user, len))];
                    case 2:
                        tweetList2 = _a.sent();
                        // order
                        setListTweet(tweetList2);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // function to tweet new message
    var tweet = function tweet() {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx && message)) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.tweet(message)];
                    case 1:
                        tx = _a.sent();
                        scaffold_eth_1.toast.info("Tweeting...");
                        return [4 /*yield*/, tx.wait()];
                    case 2:
                        _a.sent();
                        scaffold_eth_1.toast.success("Tweeted!");
                        setMessage("");
                        getContractData();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // function to like a tweet
    var like = function like(id) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx && account && likePrice)) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.like(id, { value: likePrice })];
                    case 1:
                        tx = _a.sent();
                        scaffold_eth_1.toast.info("Liking...");
                        return [4 /*yield*/, tx.wait()];
                    case 2:
                        _a.sent();
                        scaffold_eth_1.toast.success("Liked!");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // function to retweet a tweet
    var reTweet = function reTweet(id) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx && account && reTweetPrice)) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.retweet(id, { value: reTweetPrice })];
                    case 1:
                        tx = _a.sent();
                        scaffold_eth_1.toast.info("Retweeting...");
                        return [4 /*yield*/, tx.wait()];
                    case 2:
                        _a.sent();
                        scaffold_eth_1.toast.success("Retweeted!");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var reportTweet = function reportTweet(id) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx && account && reportPrice)) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.reportTweet(id, { value: reportPrice })];
                    case 1:
                        tx = _a.sent();
                        scaffold_eth_1.toast.info("Reporting...");
                        return [4 /*yield*/, tx.wait()];
                    case 2:
                        _a.sent();
                        scaffold_eth_1.toast.success("Reported!");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // function to follow a user
    var follow = function follow(address) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx && account && followPrice)) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.follow(address, { value: followPrice })];
                    case 1:
                        tx = _a.sent();
                        scaffold_eth_1.toast.info("Following...");
                        return [4 /*yield*/, tx.wait()];
                    case 2:
                        _a.sent();
                        scaffold_eth_1.toast.success("Followed!");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var getFollowerCount = function getFollowerCount() {
        return __awaiter(this, void 0, void 0, function () {
            var followerCount_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx && signer)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.getFollowersCount(signer === null || signer === void 0 ? void 0 : signer.getAddress())];
                    case 1:
                        followerCount_1 = _a.sent();
                        setFollowerCount(Number(followerCount_1));
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(head_1["default"], null,
            react_1["default"].createElement("title", null, "L I N E S"),
            react_1["default"].createElement("meta", { name: "description", content: "Lines Open Board" })),
        react_1["default"].createElement("div", { className: "flex justify-around mt-12 flex-col text-center " },
            react_1["default"].createElement("div", { className: "" },
                react_1["default"].createElement("div", { className: "collapse" },
                    react_1["default"].createElement("input", { type: "checkbox" }),
                    react_1["default"].createElement("div", { className: "collapse-title text-xl font-medium text-center mx-auto items-center" },
                        react_1["default"].createElement("div", { className: "text-2xl font-bold   " },
                            react_1["default"].createElement("button", { className: "btn btn-primary text-center " }, "post"))),
                    react_1["default"].createElement("div", { className: "collapse-content items-center mx-auto " },
                        react_1["default"].createElement("div", { className: "card card-compact bg-secondary p-2 text-center w-full " },
                            react_1["default"].createElement("div", { className: "flex flex-col w-full" },
                                react_1["default"].createElement("input", { type: "checkbox", id: "modal", className: "modal-toggle" }),
                                react_1["default"].createElement("div", { className: "modal" },
                                    react_1["default"].createElement("div", { className: "modal-box flex flex-col" },
                                        react_1["default"].createElement("div", { className: "text-2xl font-bold my-5  text-center" }, "Post"),
                                        react_1["default"].createElement("textarea", { className: "textarea border-2 border-gray-300 bg-gray-300 h-60 mx-auto px-5 rounded-lg focus:outline-none w-full text-lg text-black", name: "message", placeholder: "What's happening?", value: message, onChange: function (e) { return setMessage(e.target.value); } }),
                                        react_1["default"].createElement("button", { className: "bg-gray-500 hover:bg-gray-700 text-white font-bold my-5 mx-auto py-2 px-5 rounded w-1/4", onClick: tweet }, "Send"),
                                        react_1["default"].createElement("div", { className: "modal-action" },
                                            react_1["default"].createElement("label", { htmlFor: "modal", className: "btn" }, "Close"))))),
                            react_1["default"].createElement("label", { htmlFor: "modal", className: "btn  btn-primary bg-primary rounded-lg font-bold w-2/4 mx-auto m-5  " }, "create"),
                            react_1["default"].createElement("input", { className: "border-2 border-gray-300 bg-gray-300 h-10 mx-auto px-5 py-2 rounded-lg focus:outline-none text-lg text-black m-2", type: "text", name: "userSearch", placeholder: "Search for a user", onChange: function (e) { return setUserSearch(e.target.value); } }),
                            react_1["default"].createElement("button", { className: "btn btn-sm bg-primary   ", onClick: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, getAllTweetsForUser(userSearch)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); }, disabled: userSearch == "" }, "search"),
                            react_1["default"].createElement("div", { className: "flex flex-row justify-center items-center " },
                                react_1["default"].createElement("div", { className: "text-base font-bold my-2 text-center mx-2" },
                                    "Follow ",
                                    react_1["default"].createElement("div", { className: "font-light" },
                                        " ",
                                        utils_js_1.formatEther(followPrice),
                                        " ")),
                                " ",
                                react_1["default"].createElement("div", { className: "text-base font-bold my-2 text-center mx-2" },
                                    "Like ",
                                    react_1["default"].createElement("div", { className: "font-light" },
                                        " ",
                                        utils_js_1.formatEther(likePrice),
                                        " ")),
                                " ",
                                react_1["default"].createElement("div", { className: "text-base font-bold my-2 text-center mx-2" },
                                    "Repost ",
                                    react_1["default"].createElement("div", { className: "font-light" },
                                        " ",
                                        utils_js_1.formatEther(reTweetPrice),
                                        " ")),
                                " ",
                                react_1["default"].createElement("div", { className: "text-base font-bold my-2 text-center mx-2" },
                                    "Report ",
                                    react_1["default"].createElement("div", { className: "font-light" },
                                        " ",
                                        utils_js_1.formatEther(reportPrice),
                                        " ")),
                                " "))))),
            react_1["default"].createElement("div", { className: "flex flex-col justify-center items-left sm:w-full md:w-3/4 md:mx-auto text-left mt-10 mb-20" },
                react_1["default"].createElement("div", { className: "flex flex-row text-xl font-bold  align-text-top items-start justify-start text-left h-full mt-10 mb-20" },
                    react_1["default"].createElement(solid_1.UsersIcon, { className: "w-5 h-5 " }),
                    "",
                    " ",
                    react_1["default"].createElement("div", { className: "font-base" },
                        " ",
                        followerCount,
                        " "),
                    react_1["default"].createElement("button", { className: "btn btn-sm text-neutral bg-primary mx-5 ", onClick: function () {
                            getContractData();
                            router.push("linetweets");
                        } }, "Reset")),
                " ",
                listTweet.map(function (tweet, index) { return (react_1["default"].createElement("div", { className: "card card-compact sm:w-full md:w-3/4 md:mx-auto", key: index },
                    react_1["default"].createElement("div", { className: "border-1 min-w-fit bg-base-300 rounded-md hover:bg-secondary-focus my-2" },
                        react_1["default"].createElement("div", { className: "flex flex-row" },
                            react_1["default"].createElement("button", { className: "card-title mx-2 text-base-content text-xl hover:font-bold hover:text-gray-500 justify-start  text-left ", onClick: function () {
                                    getAllTweetsForUser(tweet.author);
                                    router.push("linetweets?id=" + tweet.author);
                                } },
                                react_1["default"].createElement(Address_1["default"], { address: tweet.author, minimized: false, format: "short", disableAddressLink: true })),
                            react_1["default"].createElement("div", { className: "card-title text-base-content ml-auto px-2 text-sm  justify-end  text-right" },
                                react_1["default"].createElement("p", null, new Date(Number(tweet.createdAt) * 1000).toLocaleString("en-US", {
                                    timeZone: "Europe/Rome"
                                }))),
                            " "),
                        react_1["default"].createElement("div", { className: "flex flex-col" },
                            react_1["default"].createElement("div", { className: "text-2xl font-semibold mx-4 break-all" },
                                react_1["default"].createElement("p", null, tweet.message))),
                        react_1["default"].createElement("div", { className: "flex flex-row" },
                            react_1["default"].createElement("button", { className: "flex flex-row items-center mx-3", onClick: function () { return like(tweet.id); } },
                                react_1["default"].createElement(solid_1.HeartIcon, { className: "h-5 w-5 text-red-500" }),
                                react_1["default"].createElement("p", { className: "ml-1" },
                                    Number(tweet.likes),
                                    " ")),
                            react_1["default"].createElement("button", { className: "flex flex-row items-center mx-3", onClick: function () { return reTweet(tweet.id); } },
                                react_1["default"].createElement(solid_1.ArrowPathIcon, { className: "h-5 w-5 text-red-500" }),
                                react_1["default"].createElement("p", { className: "ml-1" },
                                    Number(tweet.retweets),
                                    " ")),
                            react_1["default"].createElement("button", { className: "flex flex-row items-center mx-3", onClick: function () { return follow(tweet.author); } },
                                react_1["default"].createElement(solid_1.UserPlusIcon, { className: "h-5 w-5 text-red-500" })),
                            react_1["default"].createElement("button", { className: "flex flex-row items-center mx-3", onClick: function () { return reportTweet(tweet.id); } },
                                react_1["default"].createElement(solid_1.BugAntIcon, { className: "h-5 w-5 text-red-500" }),
                                react_1["default"].createElement("p", { className: "ml-1" },
                                    Number(tweet.report),
                                    " ")))))); })))));
};
exports["default"] = LinesTweet;
