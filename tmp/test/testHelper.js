"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslint = require("tslint");
var chai = require("chai");
function lint(ruleName, source, options) {
    var configuration = {
        rules: {}
    };
    if (options !== null && options.length >= 0) {
        configuration.rules[ruleName] = [true].concat(options);
    }
    else {
        configuration.rules[ruleName] = true;
    }
    var linterOptions = {
        fix: false,
        formatter: 'json',
        rulesDirectory: './tmp/src',
        formattersDirectory: null
    };
    var linter = new tslint.Linter(linterOptions, undefined);
    linter.lint('file.ts', source, configuration);
    return linter.getResult();
}
function assertFailure(ruleName, source, fail, options) {
    if (options === void 0) { options = null; }
    var result;
    try {
        result = lint(ruleName, source, options);
    }
    catch (e) {
        console.log(e.stack);
    }
    chai.assert(result.failureCount > 0, 'no failures');
    result.failures.forEach(function (ruleFail) {
        chai.assert.equal(fail.message, ruleFail.getFailure(), 'error messages dont\'t match');
        chai.assert.deepEqual(fail.startPosition, ruleFail.getStartPosition().getLineAndCharacter(), 'start char doesn\'t match');
        chai.assert.deepEqual(fail.endPosition, ruleFail.getEndPosition().getLineAndCharacter(), 'end char doesn\'t match');
    });
}
exports.assertFailure = assertFailure;
;
function assertFailures(ruleName, source, fails, options) {
    if (options === void 0) { options = null; }
    var result;
    try {
        result = lint(ruleName, source, options);
    }
    catch (e) {
        console.log(e.stack);
    }
    chai.assert(result.failureCount > 0, 'no failures');
    result.failures.forEach(function (ruleFail, index) {
        chai.assert.equal(fails[index].message, ruleFail.getFailure(), 'error messages dont\'t match');
        chai.assert.deepEqual(fails[index].startPosition, ruleFail.getStartPosition().getLineAndCharacter(), 'start char doesn\'t match');
        chai.assert.deepEqual(fails[index].endPosition, ruleFail.getEndPosition().getLineAndCharacter(), 'end char doesn\'t match');
    });
}
exports.assertFailures = assertFailures;
;
function assertSuccess(ruleName, source, options) {
    if (options === void 0) { options = null; }
    chai.assert.equal(lint(ruleName, source, options).failureCount, 0);
}
exports.assertSuccess = assertSuccess;
;
