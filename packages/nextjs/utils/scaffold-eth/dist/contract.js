"use strict";
exports.__esModule = true;
exports.ContractCodeStatus = exports.contracts = void 0;
var hardhat_contracts_json_1 = require("~~/generated/hardhat_contracts.json;");
exports.contracts = hardhat_contracts_json_1["default"];
var ContractCodeStatus;
(function (ContractCodeStatus) {
    ContractCodeStatus[ContractCodeStatus["LOADING"] = 0] = "LOADING";
    ContractCodeStatus[ContractCodeStatus["DEPLOYED"] = 1] = "DEPLOYED";
    ContractCodeStatus[ContractCodeStatus["NOT_FOUND"] = 2] = "NOT_FOUND";
})(ContractCodeStatus = exports.ContractCodeStatus || (exports.ContractCodeStatus = {}));
