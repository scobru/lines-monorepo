"use strict";
exports.__esModule = true;
exports.getContractNames = void 0;
var scaffold_config_1 = require("~~/scaffold.config");
var contract_1 = require("~~/utils/scaffold-eth/contract");
function getContractNames() {
    var _a, _b;
    var contractsData = (_b = (_a = contract_1.contracts === null || contract_1.contracts === void 0 ? void 0 : contract_1.contracts[scaffold_config_1["default"].targetNetwork.id]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.contracts;
    return contractsData ? Object.keys(contractsData) : [];
}
exports.getContractNames = getContractNames;
