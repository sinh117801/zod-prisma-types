"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFInputType = void 0;
const regex_1 = require("../constants/regex");
const extendedDMMFSchemaArg_1 = require("./extendedDMMFSchemaArg");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFInputType extends formattedNames_1.FormattedNames {
    constructor(type, model) {
        super(type.name);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "constraints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "meta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fieldMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "linkedModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isJsonField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isBytesField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.linkedModel = model;
        this.name = type.name;
        this.constraints = type.constraints;
        this.meta = type.meta;
        this.fields = this._setFields(type.fields);
        this.fieldMap = type.fieldMap;
        this.isJsonField = this._setIsJsonField();
        this.isBytesField = this._setIsBytesField();
    }
    _setFields(fields) {
        return fields.map((field) => {
            const optionalValidators = this._fieldIsPrismaFunction()
                ? {
                    zodValidatorString: this._getZodValidatorString(field.name),
                    zodCustomErrors: this._getZodCustomErrorsString(field.name),
                }
                : undefined;
            return new extendedDMMFSchemaArg_1.ExtendedDMMFSchemaArg({ ...field, ...optionalValidators });
        });
    }
    _fieldIsPrismaFunction() {
        return this.name.match(regex_1.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS);
    }
    _getZodValidatorString(fieldName) {
        var _a, _b;
        return (_b = (_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => field.name === fieldName)) === null || _b === void 0 ? void 0 : _b.zodValidatorString;
    }
    _getZodCustomErrorsString(fieldName) {
        var _a, _b;
        return (_b = (_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => field.name === fieldName)) === null || _b === void 0 ? void 0 : _b.zodCustomErrors;
    }
    _setIsJsonField() {
        return this.fields.some((field) => field.isJsonType);
    }
    _setIsBytesField() {
        return this.fields.some((field) => field.isBytesType);
    }
}
exports.ExtendedDMMFInputType = ExtendedDMMFInputType;
//# sourceMappingURL=extendedDMMFInputType.js.map