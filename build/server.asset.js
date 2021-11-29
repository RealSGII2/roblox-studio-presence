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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_config_1 = require("./app.config");
var chalk_1 = __importDefault(require("chalk"));
var express_1 = __importDefault(require("express"));
var discord_rpc_1 = __importDefault(require("discord-rpc"));
var axios_1 = __importDefault(require("axios"));
var types_1 = require("./types");
if (app_config_1.cookie) {
    axios_1["default"].defaults.headers.common = {
        Cookie: ".ROBLOSECURITY=".concat(app_config_1.cookie)
    };
}
else {
    console.warn('No cookie set');
}
var space = function () { return console.log(' '); };
var log = function () {
    var s = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        s[_i] = arguments[_i];
    }
    return console.log(s.join(' '));
};
var info = function (text) {
    console.log(chalk_1["default"].bgCyanBright(chalk_1["default"].black('INFO')), chalk_1["default"].cyanBright(text));
};
var success = function (text) {
    console.log(chalk_1["default"].bgGreenBright(chalk_1["default"].black('SUCCESS')), chalk_1["default"].greenBright(text));
};
var error = function (text, customName) {
    if (customName === void 0) { customName = 'ERR'; }
    if (customName == false) {
        console.log(chalk_1["default"].redBright(text));
    }
    else {
        console.log(chalk_1["default"].bgRedBright(chalk_1["default"].black(customName)), chalk_1["default"].redBright(text));
    }
};
var client = new discord_rpc_1["default"].Client({
    transport: 'ipc'
});
var savedActivity;
var updateActivity = function (_activity) { return __awaiter(void 0, void 0, void 0, function () {
    var activity, placeId, startTime, isIdle, rpcActivity, place;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                savedActivity = __assign(__assign({}, savedActivity), _activity);
                if (_activity.startTime == 'now') {
                    savedActivity.startTime = new Date(Date.now());
                }
                activity = savedActivity.activity, placeId = savedActivity.placeId, startTime = savedActivity.startTime, isIdle = savedActivity.isIdle;
                rpcActivity = {
                    largeImageText: 'Roblox Studio'
                };
                if (isIdle) {
                    rpcActivity.details = 'No experience open';
                }
                if (activity) {
                    switch (activity.token) {
                        case types_1.ActivityToken.Place:
                            rpcActivity.state = 'Building World';
                            rpcActivity.smallImageKey = 'build_icon_test1';
                            rpcActivity.smallImageText = 'Editing the world';
                            break;
                        case types_1.ActivityToken.Script:
                            rpcActivity.state = "Editing ".concat(activity.state, ".lua");
                            rpcActivity.smallImageKey = 'script_icon_test3';
                            rpcActivity.smallImageText = 'Editing a script';
                            break;
                    }
                }
                if (!placeId) return [3 /*break*/, 2];
                return [4 /*yield*/, axios_1["default"].get("https://games.roblox.com/v1/games/multiget-place-details?placeIds=".concat(placeId))];
            case 1:
                place = (_a.sent()).data[0];
                console.log();
                rpcActivity.details = place.name;
                rpcActivity.largeImageKey = 'studio_icon';
                if (!rpcActivity.buttons)
                    rpcActivity.buttons = new Array();
                rpcActivity.buttons.push({
                    label: 'View Game',
                    url: place.url
                });
                _a.label = 2;
            case 2:
                if (startTime) {
                    rpcActivity.startTimestamp = startTime;
                }
                client.setActivity(rpcActivity);
                return [2 /*return*/];
        }
    });
}); };
var wait = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        process.stdin.setRawMode(true);
        return [2 /*return*/, new Promise(function (resolve) {
                return process.stdin.once('data', function (data) {
                    var byteArray = __spreadArray([], __read(data), false);
                    if (byteArray.length > 0 && byteArray[0] === 3) {
                        console.log('^C');
                        process.exit(1);
                    }
                    process.stdin.setRawMode(false);
                    resolve();
                });
            })];
    });
}); };
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                process.title = 'Roblox Studio Presence Runtime';
                info('Starting RPC Client...');
                // Log in with the RPC Client
                return [4 /*yield*/, client
                        .login({
                        clientId: app_config_1.clientId
                    })
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    success('RPC Client started!');
                                    space();
                                    success('Starting Server...');
                                    // Start the server
                                    return [4 /*yield*/, initServer()
                                            .then(function () {
                                            success('Server started!');
                                            space();
                                            log('Please install the plug-in linked on the GitHub page if you haven\'t.');
                                            log('Also, be sure to report any bugs on GitHub.');
                                            space();
                                            success('Press any key to exit.');
                                        })];
                                case 1:
                                    // Start the server
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })["catch"](function (e) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); })];
            case 1:
                // Log in with the RPC Client
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var initServer = function () {
    process.title = 'Roblox Studio Presence Runtime';
    return new Promise(function (resolve, reject) {
        try {
            var app = (0, express_1["default"])();
            app.use(express_1["default"].json());
            app.put('/', function (req, res) {
                var _a;
                if (Object.keys((_a = req.body) !== null && _a !== void 0 ? _a : {}).length == 0) {
                    return res.sendStatus(400);
                }
                try {
                    updateActivity(req.body);
                    res.sendStatus(200);
                }
                catch (e) {
                    res.sendStatus(500);
                }
            });
            app["delete"]('/', function (req, res) {
                client.clearActivity();
            });
            app.listen(app_config_1.port, function () {
                resolve();
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
init();
