"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoFocusedTestWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-focused-test',
    description: 'Disallows `fit` and `fdescribe` function invocations.',
    rationale: (_a = ["\n            Using 'fit' or 'fdescribe' causes only a subset of tests to run,\n            which can easily go unnoticed and lead to a build passing where\n            it should fail.\n        "], _a.raw = ["\n            Using 'fit' or 'fdescribe' causes only a subset of tests to run,\n            which can easily go unnoticed and lead to a build passing where\n            it should fail.\n        "], Lint.Utils.dedent(_a)),
    optionsDescription: 'Not configurable.',
    options: null,
    optionExamples: ['true'],
    type: 'functionality',
    typescriptOnly: false
};
Rule.FAILURE_STRING = 'Focused tests are not allowed';
exports.Rule = Rule;
var NoFocusedTestWalker = (function (_super) {
    __extends(NoFocusedTestWalker, _super);
    function NoFocusedTestWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoFocusedTestWalker.prototype.visitCallExpression = function (node) {
        var nodeText = node.getText();
        if (nodeText.indexOf('fit') === 0 || nodeText.indexOf('fdescribe') === 0) {
            this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoFocusedTestWalker;
}(Lint.RuleWalker));
var _a;
