"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testHelper_1 = require("./testHelper");
describe('no-skipped-test', function () {
    describe('invalid function call', function () {
        it('should fail when we skip an individual test', function () {
            var source = "xit('this is a test', function() {\n                expect(1).toBe(2);\n            });";
            testHelper_1.assertFailure('no-skipped-test', source, {
                message: 'Skipped tests are not allowed',
                startPosition: {
                    line: 0,
                    character: 0
                },
                endPosition: {
                    line: 0,
                    character: 1
                }
            });
        });
        it('should fail when we skip an individual describe', function () {
            var source = "xdescribe('here are some tests', function() {\n                it('this is a test', function() {\n                    expect(1).toBe(2);\n                });\n            });";
            testHelper_1.assertFailure('no-skipped-test', source, {
                message: 'Skipped tests are not allowed',
                startPosition: {
                    line: 0,
                    character: 0
                },
                endPosition: {
                    line: 0,
                    character: 1
                }
            });
        });
    });
    describe('valid function call', function () {
        it('should succeed, when we are not using a skipped test', function () {
            var source = "\n              it('this is a test', function() {\n                  expect(1).toBe(2);\n              })";
            testHelper_1.assertSuccess('no-focused-test', source);
        });
    });
});
