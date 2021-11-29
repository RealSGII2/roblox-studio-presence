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
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = __importDefault(require("child_process"));
var path_1 = __importDefault(require("path"));
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
var space = function () { return console.log(' '); };
var log = function () {
    var s = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        s[_i] = arguments[_i];
    }
    return console.log(s.join(' '));
};
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        process.title = 'Roblox Studio Presence Launcher';
        if (!process.argv.includes('--silent') && !process.argv.includes('-s')) {
            log(chalk_1["default"].bgMagentaBright(chalk_1["default"].black('Roblox Studio Presense v1.0.0')));
            log(chalk_1["default"].magentaBright('By RealSGII2'));
            space();
            log('The application is starting.');
            log("Please install the plugin for Roblox Studio if you haven't already.");
            space();
            log('The presence will not work without it.');
            space();
            log('You may safely close this window, and the presence will continue to run.');
            log('To close it, close the Node.js Javascript Runtime process in your task manager.');
            space();
            log('Run this application with the `--silent` option to skip this prompt.');
            log('silent.bat will do this for you.');
            space();
            log(chalk_1["default"].magentaBright('Press CTRL C or CMD C to close.'));
            space();
            wait();
        }
        child_process_1["default"].fork(path_1["default"].join(__dirname + '/server.asset.js'), {
            detached: true,
            stdio: 'ignore'
        }).unref();
        return [2 /*return*/];
    });
}); };
init();
