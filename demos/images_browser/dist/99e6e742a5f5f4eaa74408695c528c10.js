// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({18:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(array) {
    var counter = array.length;
    var temp = 0;
    var index = 0;
    while (counter > 0) {
        index = (Math.random() * counter) | 0;
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}
exports.shuffle = shuffle;
function clamp(min, x, max) {
    return Math.max(min, Math.min(x, max));
}
exports.clamp = clamp;
function randUniform(a, b) {
    return Math.random() * (b - a) + a;
}
exports.randUniform = randUniform;
function distSquared(a, b) {
    var result = 0;
    for (var i = 0; i < a.length; i++) {
        var diff = Number(a[i]) - Number(b[i]);
        result += diff * diff;
    }
    return result;
}
exports.distSquared = distSquared;
function assert(expr, msg) {
    if (!expr) {
        throw new Error(msg);
    }
}
exports.assert = assert;
function assertShapesMatch(shapeA, shapeB, errorMessagePrefix) {
    if (errorMessagePrefix === void 0) { errorMessagePrefix = ''; }
    assert(arraysEqual(shapeA, shapeB), errorMessagePrefix + ("Shapes " + shapeA + " and " + shapeB + " must match"));
}
exports.assertShapesMatch = assertShapesMatch;
function flatten(arr, ret) {
    if (ret === void 0) { ret = []; }
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; ++i) {
            flatten(arr[i], ret);
        }
    }
    else {
        ret.push(arr);
    }
    return ret;
}
exports.flatten = flatten;
function inferShape(arr) {
    var shape = [];
    while (arr instanceof Array) {
        shape.push(arr.length);
        arr = arr[0];
    }
    return shape;
}
exports.inferShape = inferShape;
function sizeFromShape(shape) {
    if (shape.length === 0) {
        return 1;
    }
    var size = shape[0];
    for (var i = 1; i < shape.length; i++) {
        size *= shape[i];
    }
    return size;
}
exports.sizeFromShape = sizeFromShape;
function isScalarShape(shape) {
    return shape.length === 0;
}
exports.isScalarShape = isScalarShape;
function arraysEqual(n1, n2) {
    if (n1.length !== n2.length) {
        return false;
    }
    for (var i = 0; i < n1.length; i++) {
        if (n1[i] !== n2[i]) {
            return false;
        }
    }
    return true;
}
exports.arraysEqual = arraysEqual;
function isInt(a) {
    return a % 1 === 0;
}
exports.isInt = isInt;
function tanh(x) {
    if (Math.tanh != null) {
        return Math.tanh(x);
    }
    if (x === Infinity) {
        return 1;
    }
    else if (x === -Infinity) {
        return -1;
    }
    else {
        var e2x = Math.exp(2 * x);
        return (e2x - 1) / (e2x + 1);
    }
}
exports.tanh = tanh;
function sizeToSquarishShape(size) {
    for (var a = Math.floor(Math.sqrt(size)); a > 1; --a) {
        if (size % a === 0) {
            return [a, size / a];
        }
    }
    return [1, size];
}
exports.sizeToSquarishShape = sizeToSquarishShape;
function createShuffledIndices(n) {
    var shuffledIndices = new Uint32Array(n);
    for (var i = 0; i < n; ++i) {
        shuffledIndices[i] = i;
    }
    shuffle(shuffledIndices);
    return shuffledIndices;
}
exports.createShuffledIndices = createShuffledIndices;
function rightPad(a, size) {
    if (size <= a.length) {
        return a;
    }
    return a + ' '.repeat(size - a.length);
}
exports.rightPad = rightPad;
function repeatedTry(checkFn, delayFn, maxCounter) {
    if (delayFn === void 0) { delayFn = function (counter) { return 0; }; }
    return new Promise(function (resolve, reject) {
        var tryCount = 0;
        var tryFn = function () {
            if (checkFn()) {
                resolve();
                return;
            }
            tryCount++;
            var nextBackoff = delayFn(tryCount);
            if (maxCounter != null && tryCount >= maxCounter) {
                reject();
                return;
            }
            setTimeout(tryFn, nextBackoff);
        };
        setTimeout(tryFn, 0);
    });
}
exports.repeatedTry = repeatedTry;
function getQueryParams(queryString) {
    var params = {};
    queryString.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g, function (s) {
        var t = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            t[_i - 1] = arguments[_i];
        }
        decodeParam(params, t[0], t[1]);
        return t.join('=');
    });
    return params;
}
exports.getQueryParams = getQueryParams;
function decodeParam(params, name, value) {
    params[decodeURIComponent(name)] = decodeURIComponent(value || '');
}
function inferFromImplicitShape(shape, size) {
    var shapeProd = 1;
    var implicitIdx = -1;
    for (var i = 0; i < shape.length; ++i) {
        if (shape[i] > 0) {
            shapeProd *= shape[i];
        }
        else if (shape[i] === -1) {
            if (implicitIdx !== -1) {
                throw Error("Shapes can only have 1 implicit size. " +
                    ("Found -1 at dim " + implicitIdx + " and dim " + i));
            }
            implicitIdx = i;
        }
        else if (shape[i] <= 0) {
            throw Error("Shapes can not be <= 0. Found " + shape[i] + " at dim " + i);
        }
    }
    if (implicitIdx === -1) {
        if (size > 0 && size !== shapeProd) {
            throw Error("Size (" + size + ") must match the product of shape " + shape);
        }
        return shape;
    }
    if (size % shapeProd !== 0) {
        throw Error("The implicit shape can't be a fractional number. " +
            ("Got " + size + " / " + shapeProd));
    }
    var newShape = shape.slice();
    newShape[implicitIdx] = size / shapeProd;
    return newShape;
}
exports.inferFromImplicitShape = inferFromImplicitShape;
exports.NAN_INT32 = 1 << 31;
exports.NAN_BOOL = 255;
exports.NAN_FLOAT32 = NaN;
function getNaN(dtype) {
    if (dtype === 'float32') {
        return exports.NAN_FLOAT32;
    }
    else if (dtype === 'int32') {
        return exports.NAN_INT32;
    }
    else if (dtype === 'bool') {
        return exports.NAN_BOOL;
    }
    else {
        throw new Error("Unknown dtype " + dtype);
    }
}
exports.getNaN = getNaN;
function isValNaN(val, dtype) {
    if (isNaN(val)) {
        return true;
    }
    if (dtype === 'float32') {
        return false;
    }
    else if (dtype === 'int32') {
        return val === exports.NAN_INT32;
    }
    else if (dtype === 'bool') {
        return val === exports.NAN_BOOL;
    }
    else {
        throw new Error("Unknown dtype " + dtype);
    }
}
exports.isValNaN = isValNaN;
function squeezeShape(shape) {
    var newShape = [];
    var keptDims = [];
    for (var i = 0; i < shape.length; ++i) {
        if (shape[i] > 1) {
            newShape.push(shape[i]);
            keptDims.push(i);
        }
    }
    return { newShape: newShape, keptDims: keptDims };
}
exports.squeezeShape = squeezeShape;
function getTypedArrayFromDType(dtype, size) {
    var values = null;
    if (dtype == null || dtype === 'float32') {
        values = new Float32Array(size);
    }
    else if (dtype === 'int32') {
        values = new Int32Array(size);
    }
    else if (dtype === 'bool') {
        values = new Uint8Array(size);
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
    return values;
}
exports.getTypedArrayFromDType = getTypedArrayFromDType;

},{}],52:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function axesAreInnerMostDims(axes, rank) {
    for (var i = 0; i < axes.length; ++i) {
        if (axes[axes.length - i - 1] !== rank - 1 - i) {
            return false;
        }
    }
    return true;
}
exports.axesAreInnerMostDims = axesAreInnerMostDims;
function combineLocations(outputLoc, reduceLoc, axes) {
    var rank = outputLoc.length + reduceLoc.length;
    var loc = [];
    var outIdx = 0;
    var reduceIdx = 0;
    for (var dim = 0; dim < rank; dim++) {
        if (axes.indexOf(dim) === -1) {
            loc.push(outputLoc[outIdx++]);
        }
        else {
            loc.push(reduceLoc[reduceIdx++]);
        }
    }
    return loc;
}
exports.combineLocations = combineLocations;
function computeOutAndReduceShapes(aShape, axes) {
    var outShape = [];
    var rank = aShape.length;
    for (var dim = 0; dim < rank; dim++) {
        if (axes.indexOf(dim) === -1) {
            outShape.push(aShape[dim]);
        }
    }
    var reduceShape = axes.map(function (dim) { return aShape[dim]; });
    return [outShape, reduceShape];
}
exports.computeOutAndReduceShapes = computeOutAndReduceShapes;
function expandShapeToKeepDim(shape, axes) {
    var reduceSubShape = axes.map(function (x) { return 1; });
    return combineLocations(shape, reduceSubShape, axes);
}
exports.expandShapeToKeepDim = expandShapeToKeepDim;
function parseAxisParam(axis, shape) {
    if (axis == null) {
        axis = shape.map(function (s, i) { return i; });
    }
    else if (typeof (axis) === 'number') {
        axis = [axis];
    }
    return axis;
}
exports.parseAxisParam = parseAxisParam;
function assertAxesAreInnerMostDims(msg, axes, rank) {
    if (!axesAreInnerMostDims(axes, rank)) {
        throw new Error(msg + " supports only inner-most axes for now. " +
            ("Got axes " + axes + " and rank-" + rank + " input."));
    }
}
exports.assertAxesAreInnerMostDims = assertAxesAreInnerMostDims;
function getPermutedAxes(axes, rank) {
    if (axesAreInnerMostDims(axes, rank)) {
        return null;
    }
    var result = [];
    for (var i = 0; i < rank; ++i) {
        if (axes.indexOf(i) === -1) {
            result.push(i);
        }
    }
    axes.forEach(function (axis) { return result.push(axis); });
    return result;
}
exports.getPermutedAxes = getPermutedAxes;
function getInnerMostAxes(numAxes, rank) {
    var res = [];
    for (var i = rank - numAxes; i < rank; ++i) {
        res.push(i);
    }
    return res;
}
exports.getInnerMostAxes = getInnerMostAxes;

},{}],53:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBroadcastDims(inShape, outShape) {
    var inRank = inShape.length;
    var dims = [];
    for (var i = 0; i < inRank; i++) {
        var dim = inRank - 1 - i;
        var a = inShape[dim] || 1;
        var b = outShape[outShape.length - 1 - i] || 1;
        if (b > 1 && a === 1) {
            dims.unshift(dim);
        }
    }
    return dims;
}
exports.getBroadcastDims = getBroadcastDims;
function broadcastDimsAreOuter(dims) {
    for (var i = 0; i < dims.length; i++) {
        if (dims[i] !== i) {
            return false;
        }
    }
    return true;
}
exports.broadcastDimsAreOuter = broadcastDimsAreOuter;
function assertAndGetBroadcastShape(shapeA, shapeB) {
    var result = [];
    var errMsg = "Operands could not be broadcast together with shapes " +
        (shapeA + " and " + shapeB + ".");
    var l = Math.max(shapeA.length, shapeB.length);
    for (var i = 0; i < l; i++) {
        var a = shapeA[shapeA.length - i - 1] || 1;
        var b = shapeB[shapeB.length - i - 1] || 1;
        if (a > 1 && b > 1 && a !== b) {
            throw Error(errMsg);
        }
        result.unshift(Math.max(a, b));
    }
    return result;
}
exports.assertAndGetBroadcastShape = assertAndGetBroadcastShape;

},{}],47:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
function assertParams(aShape, bShape, axis) {
    var aRank = aShape.length;
    var bRank = bShape.length;
    util.assert(aShape.length === bShape.length, "Error in concat" + aRank + "D: rank of x1 (" + aRank + ") and x2 (" + bRank + ") " +
        "must be the same.");
    util.assert(axis >= 0 && axis < aRank, "Error in concat" + aRank + "D: axis must be " +
        ("between 0 and " + (aRank - 1) + "."));
    for (var i = 0; i < aRank; i++) {
        util.assert((i === axis) || (aShape[i] === bShape[i]), "Error in concat" + aRank + "D: Shape (" + aShape + ") does not match " +
            ("(" + bShape + ") along the non-concatenated axis " + i + "."));
    }
}
exports.assertParams = assertParams;
function computeOutShape(x1Shape, x2Shape, axis) {
    util.assert(x1Shape.length === x2Shape.length, 'x1 and x2 should have the same rank.');
    var outputShape = x1Shape.slice();
    outputShape[axis] += x2Shape[axis];
    return outputShape;
}
exports.computeOutShape = computeOutShape;

},{"../util":18}],23:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
function computePool2DInfo(inShape, filterSize, strides, pad, dataFormat) {
    if (dataFormat === void 0) { dataFormat = 'channelsLast'; }
    var _a = parseTupleParam(filterSize), filterHeight = _a[0], filterWidth = _a[1];
    var filterShape;
    if (dataFormat === 'channelsLast') {
        filterShape = [filterHeight, filterWidth, inShape[3], inShape[3]];
    }
    else if (dataFormat === 'channelsFirst') {
        filterShape = [filterHeight, filterWidth, inShape[1], inShape[1]];
    }
    else {
        throw new Error("Unknown dataFormat " + dataFormat);
    }
    return computeConv2DInfo(inShape, filterShape, strides, pad, false, dataFormat);
}
exports.computePool2DInfo = computePool2DInfo;
function computeConv2DInfo(inShape, filterShape, strides, pad, depthwise, dataFormat) {
    if (depthwise === void 0) { depthwise = false; }
    if (dataFormat === void 0) { dataFormat = 'channelsLast'; }
    var _a = [-1, -1, -1, -1], batchSize = _a[0], inHeight = _a[1], inWidth = _a[2], inChannels = _a[3];
    if (dataFormat === 'channelsLast') {
        batchSize = inShape[0], inHeight = inShape[1], inWidth = inShape[2], inChannels = inShape[3];
    }
    else if (dataFormat === 'channelsFirst') {
        batchSize = inShape[0], inChannels = inShape[1], inHeight = inShape[2], inWidth = inShape[3];
    }
    else {
        throw new Error("Unknown dataFormat " + dataFormat);
    }
    var filterHeight = filterShape[0], filterWidth = filterShape[1], filterChannels = filterShape[3];
    var _b = parseTupleParam(strides), strideHeight = _b[0], strideWidth = _b[1];
    var _c = getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, filterHeight, filterWidth), padInfo = _c.padInfo, outHeight = _c.outHeight, outWidth = _c.outWidth;
    var outChannels = depthwise ? filterChannels * inChannels : filterChannels;
    var outShape;
    if (dataFormat === 'channelsFirst') {
        outShape = [batchSize, outChannels, outHeight, outWidth];
    }
    else if (dataFormat === 'channelsLast') {
        outShape = [batchSize, outHeight, outWidth, outChannels];
    }
    return {
        batchSize: batchSize,
        dataFormat: dataFormat,
        inHeight: inHeight,
        inWidth: inWidth,
        inChannels: inChannels,
        outHeight: outHeight,
        outWidth: outWidth,
        outChannels: outChannels,
        padInfo: padInfo,
        strideHeight: strideHeight,
        strideWidth: strideWidth,
        filterHeight: filterHeight,
        filterWidth: filterWidth,
        inShape: inShape,
        outShape: outShape,
        filterShape: filterShape
    };
}
exports.computeConv2DInfo = computeConv2DInfo;
function computeOutputShape3D(inShape, fieldSize, outDepth, stride, zeroPad) {
    if (zeroPad == null) {
        zeroPad = computeDefaultPad(inShape, fieldSize, stride);
    }
    var inputRows = inShape[0];
    var inputCols = inShape[1];
    var outputRows = (inputRows - fieldSize + 2 * zeroPad) / stride + 1;
    util.assert(util.isInt(outputRows), "The output # of rows (" + outputRows + ") must be an integer. Change the " +
        "stride and/or zero pad parameters");
    var outputCols = (inputCols - fieldSize + 2 * zeroPad) / stride + 1;
    util.assert(util.isInt(outputCols), "The output # of columns (" + outputCols + ") must be an integer. Change " +
        "the stride and/or zero pad parameters");
    return [outputRows, outputCols, outDepth];
}
exports.computeOutputShape3D = computeOutputShape3D;
function computeDefaultPad(inputShape, fieldSize, stride) {
    return Math.floor((inputShape[0] * (stride - 1) - stride + fieldSize) / 2);
}
exports.computeDefaultPad = computeDefaultPad;
function computeWeightsShape4D(inputDepth, outputDepth, filterHeight, filterWidth) {
    return [filterHeight, filterWidth, inputDepth, outputDepth];
}
exports.computeWeightsShape4D = computeWeightsShape4D;
function computeDilatedRC(rc, origStride) {
    var rowsDilated = (rc[0] - 1) * origStride + 1;
    var colsDilated = (rc[1] - 1) * origStride + 1;
    return [rowsDilated, colsDilated];
}
exports.computeDilatedRC = computeDilatedRC;
function parseTupleParam(param) {
    return typeof param === 'number' ? [param, param] : param;
}
function getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, filterHeight, filterWidth) {
    var padInfo;
    var outHeight;
    var outWidth;
    if (typeof pad === 'number') {
        padInfo = { top: pad, bottom: pad, left: pad, right: pad };
        var outShape = computeOutputShape3D([inHeight, inWidth, 1], filterHeight, 1, strideHeight, pad);
        outHeight = outShape[0];
        outWidth = outShape[1];
    }
    else if (pad === 'same') {
        outHeight = Math.ceil(inHeight / strideHeight);
        outWidth = Math.ceil(inWidth / strideWidth);
        var padAlongHeight = (outHeight - 1) * strideHeight + filterHeight - inHeight;
        var padAlongWidth = (outWidth - 1) * strideWidth + filterWidth - inWidth;
        var top_1 = Math.floor(padAlongHeight / 2);
        var bottom = padAlongHeight - top_1;
        var left = Math.floor(padAlongWidth / 2);
        var right = padAlongWidth - left;
        padInfo = { top: top_1, bottom: bottom, left: left, right: right };
    }
    else if (pad === 'valid') {
        padInfo = { top: 0, bottom: 0, left: 0, right: 0 };
        outHeight = Math.ceil((inHeight - filterHeight + 1) / strideHeight);
        outWidth = Math.ceil((inWidth - filterWidth + 1) / strideWidth);
    }
    else {
        throw Error("Unknown padding parameter: " + pad);
    }
    return { padInfo: padInfo, outHeight: outHeight, outWidth: outWidth };
}

},{"../util":18}],54:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
function assertParamsValid(input, begin, size) {
    util.assert(input.rank === begin.length, "Error in slice" + input.rank + "D: Length of begin " + begin + " must " +
        ("match the rank of the array (" + input.rank + ")."));
    util.assert(input.rank === size.length, "Error in slice" + input.rank + "D: Length of size " + size + " must " +
        ("match the rank of the array (" + input.rank + ")."));
    for (var i = 0; i < input.rank; ++i) {
        util.assert(begin[i] + size[i] <= input.shape[i], "Error in slice" + input.rank + "D: begin[" + i + "] + size[" + i + "] " +
            ("(" + (begin[i] + size[i]) + ") would overflow input.shape[" + i + "] (" + input.shape[i] + ")"));
    }
}
exports.assertParamsValid = assertParamsValid;

},{"../util":18}],100:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KERNEL_METHODS = {
    MatMul: function (backend, config) {
        return backend.matMul(config.inputs.a, config.inputs.b, config.args.aOrientation, config.args.bOrientation);
    },
    Clone: function (backend, config) {
        return backend.clone(config.inputs.x);
    },
    Slice1D: function (backend, config) {
        return backend.slice1D(config.inputs.x, config.args.begin, config.args.size);
    },
    Slice2D: function (backend, config) {
        return backend.slice2D(config.inputs.x, config.args.begin, config.args.size);
    },
    Slice3D: function (backend, config) {
        return backend.slice3D(config.inputs.x, config.args.begin, config.args.size);
    },
    Slice4D: function (backend, config) {
        return backend.slice4D(config.inputs.x, config.args.begin, config.args.size);
    },
    Concat1D: function (backend, config) {
        return backend.concat1D(config.inputs.a, config.inputs.b);
    },
    Concat2D: function (backend, config) {
        return backend.concat2D(config.inputs.a, config.inputs.b, config.args.axis);
    },
    Concat3D: function (backend, config) {
        return backend.concat3D(config.inputs.a, config.inputs.b, config.args.axis);
    },
    Concat4D: function (backend, config) {
        return backend.concat4D(config.inputs.a, config.inputs.b, config.args.axis);
    },
    Neg: function (backend, config) {
        return backend.neg(config.inputs.x);
    },
    Add: function (backend, config) {
        return backend.add(config.inputs.a, config.inputs.b);
    },
    Sub: function (backend, config) {
        return backend.subtract(config.inputs.a, config.inputs.b);
    },
    Mul: function (backend, config) {
        return backend.multiply(config.inputs.a, config.inputs.b);
    },
    Div: function (backend, config) {
        return backend.divide(config.inputs.a, config.inputs.b);
    },
    Sum: function (backend, config) {
        return backend.sum(config.inputs.x, config.args.axes);
    },
    ArgMax: function (backend, config) {
        return backend.argMax(config.inputs.x, config.args.axes);
    },
    ArgMin: function (backend, config) {
        return backend.argMin(config.inputs.x, config.args.axes);
    },
    Equal: function (backend, config) {
        return backend.equal(config.inputs.a, config.inputs.b);
    },
    TopKValues: function (backend, config) {
        return backend.topKValues(config.inputs.x, config.args.k);
    },
    TopKIndices: function (backend, config) {
        return backend.topKIndices(config.inputs.x, config.args.k);
    },
    Min: function (backend, config) {
        return backend.min(config.inputs.x, config.args.axes);
    },
    Max: function (backend, config) {
        return backend.max(config.inputs.x, config.args.axes);
    },
    Ceil: function (backend, config) {
        return backend.ceil(config.inputs.x);
    },
    Floor: function (backend, config) {
        return backend.floor(config.inputs.x);
    },
    Pow: function (backend, config) {
        return backend.pow(config.inputs.a, config.inputs.b);
    },
    Exp: function (backend, config) {
        return backend.exp(config.inputs.x);
    },
    Log: function (backend, config) {
        return backend.log(config.inputs.x);
    },
    Sqrt: function (backend, config) {
        return backend.sqrt(config.inputs.x);
    },
    Square: function (backend, config) {
        return backend.square(config.inputs.x);
    },
    Relu: function (backend, config) {
        return backend.relu(config.inputs.x);
    },
    LeakyRelu: function (backend, config) {
        return backend.leakyRelu(config.inputs.x, config.args.alpha);
    },
    PReLU: function (backend, config) {
        return backend.prelu(config.inputs.x, config.inputs.alpha);
    },
    PReLUDer: function (backend, config) {
        return backend.preluDer(config.inputs.x, config.inputs.alpha);
    },
    Elu: function (backend, config) {
        return backend.elu(config.inputs.x);
    },
    EluDer: function (backend, config) {
        return backend.eluDer(config.inputs.x);
    },
    Selu: function (backend, config) {
        return backend.selu(config.inputs.x);
    },
    Abs: function (backend, config) {
        return backend.abs(config.inputs.x);
    },
    Sigmoid: function (backend, config) {
        return backend.sigmoid(config.inputs.x);
    },
    Step: function (backend, config) {
        return backend.step(config.inputs.x, config.args.alpha);
    },
    Sin: function (backend, config) {
        return backend.sin(config.inputs.x);
    },
    Cos: function (backend, config) {
        return backend.cos(config.inputs.x);
    },
    Tan: function (backend, config) {
        return backend.tan(config.inputs.x);
    },
    Asin: function (backend, config) {
        return backend.asin(config.inputs.x);
    },
    Acos: function (backend, config) {
        return backend.acos(config.inputs.x);
    },
    Atan: function (backend, config) {
        return backend.atan(config.inputs.x);
    },
    Sinh: function (backend, config) {
        return backend.sinh(config.inputs.x);
    },
    Cosh: function (backend, config) {
        return backend.cosh(config.inputs.x);
    },
    Tanh: function (backend, config) {
        return backend.tanh(config.inputs.x);
    },
    Clip: function (backend, config) {
        return backend.clip(config.inputs.x, config.args.min, config.args.max);
    },
    Transpose: function (backend, config) {
        return backend.transpose(config.inputs.x, config.args.perm);
    },
    Tile: function (backend, config) {
        return backend.tile(config.inputs.x, config.args.reps);
    },
    Conv2D: function (backend, config) {
        return backend.conv2d(config.inputs.x, config.inputs.filter, config.inputs.bias, config.args.convInfo);
    },
    Conv2DDerInput: function (backend, config) {
        return backend.conv2dDerInput(config.inputs.dy, config.inputs.filter, config.args.convInfo);
    },
    Conv2DDerFilter: function (backend, config) {
        return backend.conv2dDerFilter(config.inputs.x, config.inputs.dy, config.args.convInfo);
    },
    Conv2DDerBias: function (backend, config) {
        return backend.conv2dDerBias(config.inputs.dy);
    },
    DepthwiseConv2D: function (backend, config) {
        return backend.depthwiseConv2D(config.inputs.x, config.inputs.filter, config.args.convInfo);
    },
    MaxPool: function (backend, config) {
        return backend.maxPool(config.inputs.x, config.args.convInfo);
    },
    MaxPoolBackprop: function (backend, config) {
        return backend.maxPoolBackprop(config.inputs.dy, config.inputs.x, config.args.convInfo);
    },
    AvgPool: function (backend, config) {
        return backend.avgPool(config.inputs.x, config.args.convInfo);
    },
    MinPool: function (backend, config) {
        return backend.minPool(config.inputs.x, config.args.convInfo);
    },
    ResizeBilinear3D: function (backend, config) {
        return backend.resizeBilinear3D(config.inputs.x, config.args.newShape2D, config.args.alignCorners);
    },
    BatchNorm3D: function (backend, config) {
        return backend.batchNormalization3D(config.inputs.x, config.inputs.mean, config.inputs.variance, config.args.varianceEpsilon, config.inputs.scale, config.inputs.offset);
    },
    BatchNorm2D: function (backend, config) {
        return backend.batchNormalization2D(config.inputs.x, config.inputs.mean, config.inputs.variance, config.args.varianceEpsilon, config.inputs.scale, config.inputs.offset);
    },
    Multinomial: function (backend, config) {
        return backend.multinomial(config.inputs.probs, config.args.numSamples, config.args.seed);
    },
    OneHot: function (backend, config) {
        return backend.oneHot(config.inputs.indices, config.args.depth, config.args.onValue, config.args.offValue);
    }
};
function executeKernel(backend, kernelName, config) {
    return KERNEL_METHODS[kernelName](backend, config);
}
exports.executeKernel = executeKernel;

},{}],107:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFilteredNodesXToY(tapeNodes, xs, y) {
    var arraysFromX = {};
    for (var i = 0; i < xs.length; i++) {
        arraysFromX[xs[i].id] = true;
    }
    for (var i = 0; i < tapeNodes.length; i++) {
        var node = tapeNodes[i];
        var nodeInputs = node.inputAndArgs.inputs;
        for (var inputName in nodeInputs) {
            var input = nodeInputs[inputName];
            for (var j = 0; j < xs.length; j++) {
                if (arraysFromX[input.id]) {
                    arraysFromX[node.output.id] = true;
                    break;
                }
            }
            if (arraysFromX[node.output.id]) {
                break;
            }
        }
    }
    var arraysLeadToY = {};
    arraysLeadToY[y.id] = true;
    for (var i = tapeNodes.length - 1; i >= 0; i--) {
        var node = tapeNodes[i];
        var nodeInputs = node.inputAndArgs.inputs;
        if (arraysLeadToY[node.output.id]) {
            for (var inputName in nodeInputs) {
                arraysLeadToY[nodeInputs[inputName].id] = true;
            }
        }
    }
    var filteredTapeNodes = [];
    for (var i = 0; i < tapeNodes.length; i++) {
        var node = tapeNodes[i];
        if (arraysFromX[node.output.id] && arraysLeadToY[node.output.id]) {
            var prunedInputs = {};
            for (var inputName in node.inputAndArgs.inputs) {
                var nodeInput = node.inputAndArgs.inputs[inputName];
                if (arraysFromX[nodeInput.id]) {
                    prunedInputs[inputName] = nodeInput;
                }
            }
            var prunedNode = Object.assign({}, node);
            prunedNode.inputAndArgs = { inputs: prunedInputs };
            filteredTapeNodes.push(prunedNode);
        }
    }
    return filteredTapeNodes;
}
exports.getFilteredNodesXToY = getFilteredNodesXToY;
function backpropagateGradients(backend, arrayAccumulatedGradientMap, filteredNodes) {
    for (var i = filteredNodes.length - 1; i >= 0; i--) {
        var node = filteredNodes[i];
        var dy = arrayAccumulatedGradientMap[node.output.id];
        if (node.gradient == null) {
            throw new Error("Cannot compute gradient: gradient function not found for\n              " + node.name + ".");
        }
        var inputGradients = node.gradient(dy, node.output);
        for (var inputName in node.inputAndArgs.inputs) {
            if (!(inputName in inputGradients)) {
                throw new Error("Cannot backprop through input " +
                    (node.name + "." + inputName + ". Gradients found: ") +
                    (Object.keys(inputGradients) + "."));
            }
            var grad = inputGradients[inputName]();
            var activation = node.inputAndArgs.inputs[inputName];
            if (arrayAccumulatedGradientMap[activation.id] == null) {
                arrayAccumulatedGradientMap[activation.id] = grad;
            }
            else {
                var curGradient = arrayAccumulatedGradientMap[activation.id];
                arrayAccumulatedGradientMap[activation.id] =
                    backend.add(curGradient, grad);
                curGradient.dispose();
            }
        }
    }
}
exports.backpropagateGradients = backpropagateGradients;

},{}],101:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("../ndarray");
var tape_util = require("./tape_util");
var Tape = (function () {
    function Tape(backend) {
        this.backend = backend;
        this.evaluatedTapeNodes = [];
        this.outputNodeMap = {};
    }
    Tape.prototype.addEvaluatedKernelNode = function (node) {
        this.outputNodeMap[node.output.id] = node;
        this.evaluatedTapeNodes.push(node);
    };
    Tape.prototype.gradientWrt = function (y, xs) {
        if (this.outputNodeMap[y.id] == null) {
            throw new Error("Cannot compute gradient: y is not part of this tape.");
        }
        var filteredNodes = tape_util.getFilteredNodesXToY(this.evaluatedTapeNodes, xs, y);
        var arrayAccumulatedGradientMap = {};
        arrayAccumulatedGradientMap[y.id] = ndarray_1.Scalar.new(1);
        tape_util.backpropagateGradients(this.backend, arrayAccumulatedGradientMap, filteredNodes);
        var gradients = [];
        for (var i = 0; i < xs.length; i++) {
            gradients.push(arrayAccumulatedGradientMap[xs[i].id]);
        }
        return gradients;
    };
    return Tape;
}());
exports.Tape = Tape;

},{"../ndarray":30,"./tape_util":107}],55:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../../util");
var kernel_registry = require("./kernel_registry");
var tape_1 = require("./tape");
var BackendEngine = (function () {
    function BackendEngine(backend) {
        this.backend = backend;
        this.debugMode = false;
        this.masterTape = new tape_1.Tape(backend);
    }
    BackendEngine.prototype.enableDebugMode = function () {
        this.debugMode = true;
    };
    BackendEngine.prototype.executeKernel = function (kernelName, config, grad) {
        var _this = this;
        var kernelFn = function () {
            return kernel_registry.executeKernel(_this.backend, kernelName, config);
        };
        var start;
        if (this.debugMode) {
            start = performance.now();
        }
        var result = kernelFn();
        if (this.debugMode) {
            var vals = result.getValues();
            var time = util.rightPad(performance.now() - start + "ms", 9);
            var paddedName = util.rightPad(name, 25);
            var rank = result.rank;
            var size = result.size;
            var shape = util.rightPad(result.shape.toString(), 14);
            console.log("%c" + paddedName + "\t%c" + time + "\t%c" + rank + "D " + shape + "\t%c" + size, 'font-weight:bold', 'color:red', 'color:blue', 'color: orange');
            this.checkForNaN(vals, result.dtype, name);
        }
        var evaluatedNode = {
            name: "kernel: " + kernelName,
            kernel: kernelName,
            inputAndArgs: config,
            output: result,
            gradient: grad
        };
        this.masterTape.addEvaluatedKernelNode(evaluatedNode);
        return result;
    };
    BackendEngine.prototype.gradientWrt = function (y, xs) {
        return this.masterTape.gradientWrt(y, xs);
    };
    BackendEngine.prototype.checkForNaN = function (vals, dtype, name) {
        for (var i = 0; i < vals.length; i++) {
            if (util.isValNaN(vals[i], dtype)) {
                throw Error("The result of the last math." + name + " has NaNs.");
            }
        }
    };
    BackendEngine.prototype.getBackend = function () {
        return this.backend;
    };
    return BackendEngine;
}());
exports.BackendEngine = BackendEngine;

},{"../../util":18,"./kernel_registry":100,"./tape":101}],44:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatrixOrientation;
(function (MatrixOrientation) {
    MatrixOrientation[MatrixOrientation["REGULAR"] = 0] = "REGULAR";
    MatrixOrientation[MatrixOrientation["TRANSPOSED"] = 1] = "TRANSPOSED";
})(MatrixOrientation = exports.MatrixOrientation || (exports.MatrixOrientation = {}));

},{}],29:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var util = require("../util");
var axis_util = require("./axis_util");
var backend_engine_1 = require("./backends/backend_engine");
var matmul_1 = require("./backends/types/matmul");
var broadcast_util = require("./broadcast_util");
var concat_util = require("./concat_util");
var conv_util = require("./conv_util");
var ndarray_1 = require("./ndarray");
var slice_util = require("./slice_util");
var NDArrayMath = (function () {
    function NDArrayMath(backend, safeMode) {
        this.safeMode = safeMode;
        this.numArrays = 0;
        this.customBackend = false;
        this.ndarrayScopes = [];
        this.ndarraysToKeep = [];
        this.activeScopeNDArraysToKeep = [];
        if (typeof backend === 'string') {
            this.backend = environment_1.ENV.getBackend(backend);
        }
        else {
            this.customBackend = true;
            this.backend = backend;
        }
        this.backendEngine = new backend_engine_1.BackendEngine(this.backend);
    }
    NDArrayMath.prototype.time = function (query) {
        return this.backend.time(query);
    };
    NDArrayMath.prototype.getNumArrays = function () {
        return this.numArrays;
    };
    NDArrayMath.prototype.register = function (a) {
        this.track(a);
        this.numArrays++;
    };
    NDArrayMath.prototype.writePixels = function (id, pixels, numChannels) {
        this.backend.writePixels(id, pixels, numChannels);
    };
    NDArrayMath.prototype.write = function (id, values, dtype, shape) {
        this.backend.write(id, values, dtype, shape);
    };
    NDArrayMath.prototype.readSync = function (id) {
        return this.backend.readSync(id);
    };
    NDArrayMath.prototype.read = function (id) {
        return this.backend.read(id);
    };
    NDArrayMath.prototype.scope = function (scopeFn) {
        var _this = this;
        this.startScope();
        var keepFn = function (ndarray) { return _this.keep(ndarray); };
        var trackFn = function (ndarray) { return ndarray; };
        var result = scopeFn(keepFn, trackFn);
        if (result instanceof Promise) {
            result.then(function (r) { return _this.endScope(r); });
            return result;
        }
        else {
            this.endScope(result);
            return result;
        }
    };
    NDArrayMath.prototype.enableDebugMode = function () {
        this.backendEngine.enableDebugMode();
        console.warn('Debugging mode is ON. The output of every math call will ' +
            'be downloaded to CPU and checked for NaNs. ' +
            'This significantly impacts performance.');
    };
    NDArrayMath.prototype.startScope = function () {
        var newScope = [];
        this.ndarrayScopes.push(newScope);
        this.activeScope = newScope;
        var newNDArraysToKeep = [];
        this.ndarraysToKeep.push(newNDArraysToKeep);
        this.activeScopeNDArraysToKeep = newNDArraysToKeep;
    };
    NDArrayMath.prototype.extractNDArraysFromScopeResult = function (result) {
        if (result == null) {
            return [];
        }
        if (result instanceof ndarray_1.NDArray) {
            return [result];
        }
        var list = [];
        var resultObj = result;
        for (var k in resultObj) {
            var val = resultObj[k];
            if (val instanceof ndarray_1.NDArray) {
                list.push(val);
            }
        }
        return list;
    };
    NDArrayMath.prototype.endScope = function (result) {
        var _this = this;
        var arraysToKeep = this.activeScopeNDArraysToKeep;
        var resultArrays = this.extractNDArraysFromScopeResult(result);
        arraysToKeep = arraysToKeep.concat(resultArrays);
        for (var i = 0; i < this.activeScope.length; i++) {
            var ndarray = this.activeScope[i];
            if (this.isNDArrayDataInList(ndarray, arraysToKeep)) {
                continue;
            }
            ndarray.dispose();
        }
        this.ndarrayScopes.pop();
        this.activeScope = this.ndarrayScopes.length === 0 ?
            null :
            this.ndarrayScopes[this.ndarrayScopes.length - 1];
        resultArrays.forEach(function (val) {
            if (!_this.isNDArrayDataInList(val, _this.activeScopeNDArraysToKeep)) {
                _this.track(val);
            }
        });
        this.ndarraysToKeep.pop();
        this.activeScopeNDArraysToKeep = this.ndarraysToKeep.length === 0 ?
            null :
            this.ndarraysToKeep[this.ndarraysToKeep.length - 1];
    };
    NDArrayMath.prototype.isNDArrayDataInList = function (ndarray, ndarrayList) {
        for (var i = 0; i < ndarrayList.length; i++) {
            if (ndarrayList[i].id === ndarray.id) {
                return true;
            }
        }
        return false;
    };
    NDArrayMath.prototype.keep = function (result) {
        if (this.activeScope == null) {
            if (this.safeMode) {
                throw new Error('You are using math in safe mode. Enclose all ' +
                    'math.method() calls inside a scope: ' +
                    'math.scope(() => {math.method();...}) to avoid memory ' +
                    'leaks.');
            }
            return result;
        }
        this.activeScopeNDArraysToKeep.push(result);
        return result;
    };
    NDArrayMath.prototype.track = function (result) {
        if (this.activeScope == null) {
            if (this.safeMode) {
                throw new Error('You are using math in safe mode. Enclose all ' +
                    'math.method() calls inside a scope: ' +
                    'math.scope(() => {math.method();...}) to avoid memory ' +
                    'leaks.');
            }
            return result;
        }
        this.activeScope.push(result);
        return result;
    };
    NDArrayMath.prototype.dispose = function () {
        if (this.customBackend) {
            this.backend.dispose();
        }
    };
    NDArrayMath.prototype.matMul = function (a, b, aOrientation, bOrientation) {
        var _this = this;
        if (aOrientation === void 0) { aOrientation = matmul_1.MatrixOrientation.REGULAR; }
        if (bOrientation === void 0) { bOrientation = matmul_1.MatrixOrientation.REGULAR; }
        var innerShapeA = (aOrientation === matmul_1.MatrixOrientation.REGULAR) ? a.shape[1] : a.shape[0];
        var innerShapeB = (bOrientation === matmul_1.MatrixOrientation.REGULAR) ? b.shape[0] : b.shape[1];
        util.assert(a.rank === 2 && b.rank === 2, "Error in matMul: inputs must be rank 2, got ranks " + a.rank +
            (" and " + b.rank + "."));
        util.assert(innerShapeA === innerShapeB, "Error in matMul: inner shapes (" + innerShapeA + ") and (" +
            (innerShapeB + ") of NDArrays with shapes " + a.shape + " and ") +
            (b.shape + " and orientations " + matmul_1.MatrixOrientation[aOrientation]) +
            (" and " + matmul_1.MatrixOrientation[bOrientation] + " must match."));
        return this.backendEngine.executeKernel('MatMul', { inputs: { a: a, b: b }, args: { aOrientation: aOrientation, bOrientation: bOrientation } }, function (dy, y) {
            return {
                a: function () { return _this.matMul(dy, b, matmul_1.MatrixOrientation.REGULAR, matmul_1.MatrixOrientation.TRANSPOSED); },
                b: function () { return _this.matMul(a, dy, matmul_1.MatrixOrientation.TRANSPOSED, matmul_1.MatrixOrientation.REGULAR); }
            };
        });
    };
    NDArrayMath.prototype.executeOp = function (name, f) {
        return f();
    };
    NDArrayMath.prototype.vectorTimesMatrix = function (v, matrix) {
        util.assert(v.rank === 1, "Error in vectorTimesMatrix: first input must be rank 1, but got " +
            ("rank " + v.rank + "."));
        util.assert(matrix.rank === 2, "Error in vectorTimesMatrix: second input must be rank 2, but got " +
            ("rank " + matrix.rank + "."));
        util.assert(v.size === matrix.shape[0], "Error in vectorTimesMatrix: size of vector (" + v.size + ") " +
            ("must match first dimension of matrix (" + matrix.shape[0] + ")"));
        return this.matMul(v.as2D(1, -1), matrix).as1D();
    };
    NDArrayMath.prototype.matrixTimesVector = function (matrix, v) {
        util.assert(v.rank === 1, "Error in matrixTimesVector: second input must rank 1, but got " +
            ("rank " + v.rank + "."));
        util.assert(matrix.rank === 2, "Error in matrixTimesVector: first input must be a rank 2, but got " +
            ("rank " + matrix.rank + "."));
        util.assert(v.size === matrix.shape[1], "Error in matrixTimesVector: size of first rank 1 input " + v.size + " " +
            "must match inner dimension of second rank 2 input, but got " +
            ("shape " + matrix.shape + "."));
        return this.matMul(matrix, v.as2D(-1, 1)).as1D();
    };
    NDArrayMath.prototype.dotProduct = function (v1, v2) {
        util.assert(v1.rank === 1 && v2.rank === 1, "Error in dotProduct: inputs must be rank 1, but got ranks " +
            (v1.rank + " and " + v2.rank + "."));
        util.assert(v1.size === v2.size, "Error in dotProduct: size of inputs (" + v1.size + ") and (" +
            (v2.size + ") must match."));
        return this.matMul(v1.as2D(1, -1), v2.as2D(-1, 1)).asScalar();
    };
    NDArrayMath.prototype.outerProduct = function (v1, v2) {
        util.assert(v1.rank === 1 && v2.rank === 1, "Error in outerProduct: inputs must be rank 1, but got ranks " +
            (v1.rank + " and " + v2.rank + "."));
        return this.matMul(v1.as2D(-1, 1), v2.as2D(1, -1));
    };
    NDArrayMath.prototype.clone = function (x) {
        return this.backendEngine.executeKernel('Clone', { inputs: { x: x } });
    };
    NDArrayMath.prototype.reshape = function (ndarray, newShape) {
        console.warn('math.reshape() is deprecated. Please call reshape() ' +
            'directly on the ndarray object');
        return ndarray.reshape(newShape);
    };
    NDArrayMath.prototype.slice1D = function (x, begin, size) {
        slice_util.assertParamsValid(x, [begin], [size]);
        return this.backendEngine.executeKernel('Slice1D', { inputs: { x: x }, args: { begin: begin, size: size } });
    };
    NDArrayMath.prototype.slice2D = function (x, begin, size) {
        slice_util.assertParamsValid(x, begin, size);
        return this.backendEngine.executeKernel('Slice2D', { inputs: { x: x }, args: { begin: begin, size: size } });
    };
    NDArrayMath.prototype.slice3D = function (x, begin, size) {
        slice_util.assertParamsValid(x, begin, size);
        return this.backendEngine.executeKernel('Slice3D', { inputs: { x: x }, args: { begin: begin, size: size } });
    };
    NDArrayMath.prototype.slice4D = function (x, begin, size) {
        slice_util.assertParamsValid(x, begin, size);
        return this.backendEngine.executeKernel('Slice4D', { inputs: { x: x }, args: { begin: begin, size: size } });
    };
    NDArrayMath.prototype.concat1D = function (a, b) {
        concat_util.assertParams(a.shape, b.shape, 0);
        return this.backendEngine.executeKernel('Concat1D', { inputs: { a: a, b: b } });
    };
    NDArrayMath.prototype.concat2D = function (a, b, axis) {
        concat_util.assertParams(a.shape, b.shape, axis);
        return this.backendEngine.executeKernel('Concat2D', { inputs: { a: a, b: b }, args: { axis: axis } });
    };
    NDArrayMath.prototype.concat3D = function (a, b, axis) {
        concat_util.assertParams(a.shape, b.shape, axis);
        return this.backendEngine.executeKernel('Concat3D', { inputs: { a: a, b: b }, args: { axis: axis } });
    };
    NDArrayMath.prototype.concat4D = function (a, b, axis) {
        concat_util.assertParams(a.shape, b.shape, axis);
        return this.backendEngine.executeKernel('Concat4D', { inputs: { a: a, b: b }, args: { axis: axis } });
    };
    NDArrayMath.prototype.logSumExp = function (input, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var axes = axis_util.parseAxisParam(axis, input.shape);
        return this.executeOp('logSumExp', function () {
            var xMax = _this.max(input, axes, true);
            var a = _this.subtract(input, xMax);
            var b = _this.exp(a);
            var c = _this.sum(b, axes);
            var d = _this.log(c);
            var res = _this.add(xMax.reshape(d.shape), d);
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, axes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.sum = function (x, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var origAxes = axis_util.parseAxisParam(axis, x.shape);
        var axes = origAxes;
        var permutedAxes = axis_util.getPermutedAxes(axes, x.rank);
        return this.executeOp('sum', function () {
            if (permutedAxes != null) {
                x = _this.transpose(x, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, x.rank);
            }
            var res = _this.backendEngine.executeKernel('Sum', { inputs: { x: x }, args: { axes: axes } }, function (dy, y) {
                return {
                    x: function () {
                        if (axis != null) {
                            throw new Error("Gradients for sum with axis reduction not yet " +
                                "supported.");
                        }
                        return _this.multiply(dy, ndarray_1.NDArray.onesLike(x));
                    }
                };
            });
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.mean = function (x, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var axes = axis_util.parseAxisParam(axis, x.shape);
        var shapes = axis_util.computeOutAndReduceShapes(x.shape, axes);
        var reduceShape = shapes[1];
        var reduceSize = util.sizeFromShape(reduceShape);
        return this.executeOp('mean', function () {
            return _this.scope(function (keep) {
                var res = _this.divide(x, ndarray_1.Scalar.new(reduceSize));
                return _this.sum(res, axis, keepDims);
            });
        });
    };
    NDArrayMath.prototype.argMin = function (x, axis) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        var axes = axis_util.parseAxisParam(axis, x.shape);
        var permutedAxes = axis_util.getPermutedAxes(axes, x.rank);
        return this.executeOp('argMin', function () {
            if (permutedAxes != null) {
                x = _this.transpose(x, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, x.rank);
            }
            return _this.backendEngine.executeKernel('ArgMin', { inputs: { x: x }, args: { axes: axes } });
        });
    };
    NDArrayMath.prototype.argMax = function (x, axis) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        var axes = axis_util.parseAxisParam(axis, x.shape);
        var permutedAxes = axis_util.getPermutedAxes(axes, x.rank);
        return this.executeOp('argMax', function () {
            if (permutedAxes != null) {
                x = _this.transpose(x, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, x.rank);
            }
            return _this.backendEngine.executeKernel('ArgMax', { inputs: { x: x }, args: { axes: axes } });
        });
    };
    NDArrayMath.prototype.argMaxEquals = function (x1, x2) {
        var _this = this;
        util.assertShapesMatch(x1.shape, x2.shape, 'Error in argMaxEquals: ');
        return this.executeOp('argMaxEquals', function () { return _this.scope(function () {
            return _this.equal(_this.argMax(x1), _this.argMax(x2));
        }); });
    };
    NDArrayMath.prototype.equal = function (a, b) {
        return this.backendEngine.executeKernel('Equal', { inputs: { a: a, b: b } });
    };
    NDArrayMath.prototype.equalStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in equalStrict: ');
        return this.equal(a, b);
    };
    NDArrayMath.prototype.topK = function (x, k) {
        var _this = this;
        util.assert(k <= x.size, "Error in topK: k value (" + k + ") must be less than size of input " +
            ("ndarray, got shape " + x.shape + "."));
        var values;
        var indices;
        this.executeOp('topK', function () {
            values = _this.backendEngine.executeKernel('TopKValues', { inputs: { x: x }, args: { k: k } });
            indices = _this.backendEngine.executeKernel('TopKIndices', { inputs: { x: x }, args: { k: k } });
            return values;
        });
        var result = { values: values, indices: indices };
        return result;
    };
    NDArrayMath.prototype.min = function (x, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var origAxes = axis_util.parseAxisParam(axis, x.shape);
        var axes = origAxes;
        var permutedAxes = axis_util.getPermutedAxes(axes, x.rank);
        return this.executeOp('min', function () {
            if (permutedAxes != null) {
                x = _this.transpose(x, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, x.rank);
            }
            var res = _this.backendEngine.executeKernel('Min', { inputs: { x: x }, args: { axes: axes } });
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.max = function (x, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var origAxes = axis_util.parseAxisParam(axis, x.shape);
        var axes = origAxes;
        var permutedAxes = axis_util.getPermutedAxes(axes, x.rank);
        return this.executeOp('max', function () {
            if (permutedAxes != null) {
                x = _this.transpose(x, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, x.rank);
            }
            var res = _this.backendEngine.executeKernel('Max', { inputs: { x: x }, args: { axes: axes } });
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.softmax = function (logits, dim) {
        var _this = this;
        if (dim === void 0) { dim = -1; }
        if (dim === -1) {
            dim = logits.rank - 1;
        }
        if (dim !== logits.rank - 1) {
            throw Error('Softmax along a non-last dimension is not yet supported. ' +
                ("Logits was rank " + logits.rank + " and dim was " + dim));
        }
        return this.executeOp('softmax', function () {
            return _this.scope(function () {
                var lse = _this.logSumExp(logits, [dim], true);
                var logResult = _this.subtract(logits, lse);
                return _this.exp(logResult);
            });
        });
    };
    NDArrayMath.prototype.switchDim = function (a, newDim) {
        return this.transpose(a, newDim);
    };
    NDArrayMath.prototype.tile = function (x, reps) {
        util.assert(x.rank === reps.length, "Error in transpose: rank of input " + x.rank + " " +
            ("must match length of reps " + reps + "."));
        return this.backendEngine.executeKernel('Tile', { inputs: { x: x }, args: { reps: reps } });
    };
    NDArrayMath.prototype.transpose = function (x, perm) {
        if (perm == null) {
            perm = x.shape.map(function (s, i) { return i; }).reverse();
        }
        util.assert(x.rank === perm.length, "Error in transpose: rank of input " + x.rank + " " +
            ("must match length of perm " + perm + "."));
        return this.backendEngine.executeKernel('Transpose', { inputs: { x: x }, args: { perm: perm } });
    };
    NDArrayMath.prototype.scalarPlusArray = function (c, a) {
        util.assert(c.size === 1, "Error in scalarPlusArray: first argument must be rank 0, but got " +
            ("rank " + c.rank + "."));
        return this.add(c, a);
    };
    NDArrayMath.prototype.scalarMinusArray = function (c, a) {
        util.assert(c.size === 1, "Error in scalarMinusArray: first argument must be rank 0, but got " +
            ("rank " + c.rank + "."));
        return this.subtract(c, a);
    };
    NDArrayMath.prototype.arrayMinusScalar = function (a, c) {
        util.assert(c.size === 1, "Error in arrayMinusScalar: second argument must be rank 0, but " +
            ("got rank " + c.rank + "."));
        return this.subtract(a, c);
    };
    NDArrayMath.prototype.neg = function (x) {
        return this.backendEngine.executeKernel('Neg', { inputs: { x: x } });
    };
    NDArrayMath.prototype.add = function (a, b) {
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.backendEngine.executeKernel('Add', { inputs: { a: a, b: b } });
    };
    NDArrayMath.prototype.addStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in addStrict: ');
        return this.add(a, b);
    };
    NDArrayMath.prototype.subtract = function (a, b) {
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.backendEngine.executeKernel('Sub', { inputs: { a: a, b: b } });
    };
    NDArrayMath.prototype.pow = function (a, b) {
        util.assert(b.dtype === 'int32', 'only supports int32 data type for the exponent parameter.');
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.backendEngine.executeKernel('Pow', { inputs: { a: a, b: b } });
    };
    NDArrayMath.prototype.powStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in powStrict: ');
        return this.pow(a, b);
    };
    NDArrayMath.prototype.sub = function (a, b) {
        return this.subtract(a, b);
    };
    NDArrayMath.prototype.subStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in subStrict: ');
        return this.subtract(a, b);
    };
    NDArrayMath.prototype.multiply = function (a, b) {
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.backendEngine.executeKernel('Mul', { inputs: { a: a, b: b } });
    };
    NDArrayMath.prototype.elementWiseMul = function (a, b) {
        return this.multiplyStrict(a, b);
    };
    NDArrayMath.prototype.multiplyStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in multiplyStrict: ');
        return this.multiply(a, b);
    };
    NDArrayMath.prototype.divide = function (a, b) {
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.backendEngine.executeKernel('Div', { inputs: { a: a, b: b } });
    };
    NDArrayMath.prototype.divideStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in divideStrict: ');
        return this.divide(a, b);
    };
    NDArrayMath.prototype.scalarDividedByArray = function (c, a) {
        util.assert(c.size === 1, "Error in scalarDividedByArray: first argument must be rank 0, but " +
            ("got NDArray of rank " + c.rank + "."));
        return this.divide(c, a);
    };
    NDArrayMath.prototype.arrayDividedByScalar = function (a, c) {
        util.assert(c.size === 1, "Error in arrayDividedByScalar: second argument must be rank 0, " +
            ("but got NDArray of rank " + c.rank + "."));
        return this.divide(a, c);
    };
    NDArrayMath.prototype.ceil = function (x) {
        return this.backendEngine.executeKernel('Ceil', { inputs: { x: x } });
    };
    NDArrayMath.prototype.floor = function (x) {
        return this.backendEngine.executeKernel('Floor', { inputs: { x: x } });
    };
    NDArrayMath.prototype.exp = function (x) {
        return this.backendEngine.executeKernel('Exp', { inputs: { x: x } });
    };
    NDArrayMath.prototype.log = function (x) {
        return this.backendEngine.executeKernel('Log', { inputs: { x: x } });
    };
    NDArrayMath.prototype.sqrt = function (x) {
        return this.backendEngine.executeKernel('Sqrt', { inputs: { x: x } });
    };
    NDArrayMath.prototype.square = function (x) {
        return this.backendEngine.executeKernel('Square', { inputs: { x: x } });
    };
    NDArrayMath.prototype.abs = function (x) {
        return this.backendEngine.executeKernel('Abs', { inputs: { x: x } });
    };
    NDArrayMath.prototype.clip = function (x, min, max) {
        util.assert((min <= max), "Error in clip: min (" + min + ") must be" +
            ("less than or equal to max (" + max + ")."));
        return this.backendEngine.executeKernel('Clip', { inputs: { x: x }, args: { min: min, max: max } });
    };
    NDArrayMath.prototype.relu = function (x) {
        var _this = this;
        return this.backendEngine.executeKernel('Relu', { inputs: { x: x } }, function (dy, y) {
            return { x: function () { return _this.step(x); } };
        });
    };
    NDArrayMath.prototype.elu = function (x) {
        return this.backendEngine.executeKernel('Elu', { inputs: { x: x } });
    };
    NDArrayMath.prototype.eluDer = function (x) {
        return this.backendEngine.executeKernel('EluDer', { inputs: { x: x } });
    };
    NDArrayMath.prototype.selu = function (x) {
        return this.backendEngine.executeKernel('Selu', { inputs: { x: x } });
    };
    NDArrayMath.prototype.leakyRelu = function (x, alpha) {
        if (alpha === void 0) { alpha = 0.2; }
        return this.backendEngine.executeKernel('LeakyRelu', { inputs: { x: x }, args: { alpha: alpha } });
    };
    NDArrayMath.prototype.prelu = function (x, alpha) {
        return this.backendEngine.executeKernel('PReLU', { inputs: { x: x, alpha: alpha } });
    };
    NDArrayMath.prototype.preluDer = function (x, alpha) {
        return this.backendEngine.executeKernel('PReLUDer', { inputs: { x: x, alpha: alpha } });
    };
    NDArrayMath.prototype.sigmoid = function (x) {
        return this.backendEngine.executeKernel('Sigmoid', { inputs: { x: x } });
    };
    NDArrayMath.prototype.sin = function (x) {
        return this.backendEngine.executeKernel('Sin', { inputs: { x: x } });
    };
    NDArrayMath.prototype.cos = function (x) {
        return this.backendEngine.executeKernel('Cos', { inputs: { x: x } });
    };
    NDArrayMath.prototype.tan = function (x) {
        return this.backendEngine.executeKernel('Tan', { inputs: { x: x } });
    };
    NDArrayMath.prototype.asin = function (x) {
        return this.backendEngine.executeKernel('Asin', { inputs: { x: x } });
    };
    NDArrayMath.prototype.acos = function (x) {
        return this.backendEngine.executeKernel('Acos', { inputs: { x: x } });
    };
    NDArrayMath.prototype.atan = function (x) {
        return this.backendEngine.executeKernel('Atan', { inputs: { x: x } });
    };
    NDArrayMath.prototype.sinh = function (x) {
        return this.backendEngine.executeKernel('Sinh', { inputs: { x: x } });
    };
    NDArrayMath.prototype.cosh = function (x) {
        return this.backendEngine.executeKernel('Cosh', { inputs: { x: x } });
    };
    NDArrayMath.prototype.tanh = function (x) {
        return this.backendEngine.executeKernel('Tanh', { inputs: { x: x } });
    };
    NDArrayMath.prototype.step = function (x, alpha) {
        if (alpha === void 0) { alpha = 0.0; }
        return this.backendEngine.executeKernel('Step', { inputs: { x: x }, args: { alpha: alpha } });
    };
    NDArrayMath.prototype.scaledArrayAdd = function (c1, a, c2, b) {
        var _this = this;
        util.assert(c1.size === 1, "Error in scaledArrayAdd: first argument must rank 0, but got " +
            (" rank " + c1.rank + "."));
        util.assert(c2.size === 1, "Error in scaledArrayAdd: third argument must be rank 0, but got " +
            ("NDArray of rank " + c2.rank + "."));
        util.assertShapesMatch(a.shape, b.shape, 'Error in scaledArrayAdd: ');
        return this.executeOp('scaledArrayAdd', function () {
            return _this.scope(function () {
                return _this.add(_this.multiply(c1, a), _this.multiply(c2, b));
            });
        });
    };
    NDArrayMath.prototype.scalarTimesArray = function (c, a) {
        util.assert(c.size === 1, "Error in arrayDividedByScalar: first argument must be rank 0, but " +
            ("got rank " + c.rank + "."));
        return this.multiply(c, a);
    };
    NDArrayMath.prototype.elementWiseMulBroadcast = function (a, b) {
        util.assert(a.rank === 2, "Error in elementWiseMulBroadcast: first argument must be " +
            ("rank 2, but got rank " + a.rank + "."));
        util.assert(b.rank === 2, "Error in elementWiseMulBroadcast: second argument must be " +
            ("rank 2, but got rank " + b.rank + "."));
        return this.multiply(a, b);
    };
    NDArrayMath.prototype.conv1d = function (input, filter, bias, stride, pad) {
        var _this = this;
        var input3D = input;
        var reshapedTo3D = false;
        if (input.rank === 2) {
            reshapedTo3D = true;
            input3D = input.as3D(1, input.shape[0], input.shape[1]);
        }
        util.assert(input3D.rank === 3, "Error in conv1d: input must be rank 3, but got rank " + input3D.rank + ".");
        util.assert(filter.rank === 3, "Error in conv1d: filter must be rank 3, but got rank " +
            (filter.rank + "."));
        if (bias != null) {
            util.assert(bias.rank === 1, "Error in conv1d: bias must be rank 1, but got rank " +
                (bias.rank + "."));
        }
        util.assert(input3D.shape[2] === filter.shape[1], "Error in conv1d: depth of input (" + input3D.shape[2] + ") must match  " +
            ("input depth for filter " + filter.shape[1] + "."));
        var filter4D = filter.as4D(1, filter.shape[0], filter.shape[1], filter.shape[2]);
        var input4D = input3D.as4D(input3D.shape[0], 1, input3D.shape[1], input3D.shape[2]);
        var strides = [1, stride];
        return this.executeOp('Conv1D', function () {
            var res = _this.conv2d(input4D, filter4D, bias, strides, pad);
            if (reshapedTo3D) {
                return res.as2D(res.shape[2], res.shape[3]);
            }
            return res.as3D(res.shape[0], res.shape[2], res.shape[3]);
        });
    };
    NDArrayMath.prototype.conv2d = function (input, filter, bias, strides, pad) {
        var _this = this;
        var input4D = input;
        var reshapedTo4D = false;
        if (input.rank === 3) {
            reshapedTo4D = true;
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
        }
        util.assert(input4D.rank === 4, "Error in conv2d: input must be rank 4, but got rank " + input4D.rank + ".");
        util.assert(filter.rank === 4, "Error in conv2d: filter must be rank 4, but got rank " +
            (filter.rank + "."));
        if (bias != null) {
            util.assert(bias.rank === 1, "Error in conv2d: bias must be rank 1, but got rank " +
                (bias.rank + "."));
        }
        util.assert(input4D.shape[3] === filter.shape[2], "Error in conv2d: depth of input (" + input4D.shape[3] + ") must match  " +
            ("input depth for filter " + filter.shape[2] + "."));
        var convInfo = conv_util.computeConv2DInfo(input4D.shape, filter.shape, strides, pad);
        return this.executeOp('Conv2D', function () {
            var res = _this.backendEngine.executeKernel('Conv2D', { inputs: { x: input4D, filter: filter, bias: bias }, args: { convInfo: convInfo } });
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.conv2dDerInput = function (inShape, dy, filter, strides, pad) {
        var _this = this;
        util.assert(inShape.length === dy.rank, "Length of inShape " +
            ("(" + inShape.length + ") and rank of dy (" + dy.rank + ") must match"));
        var inShape4D = inShape;
        var dy4D = dy;
        var reshapedTo4D = false;
        if (dy.rank === 3) {
            reshapedTo4D = true;
            dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
            inShape4D = [1, inShape[0], inShape[1], inShape[2]];
        }
        var inDepth = inShape4D[3];
        var outDepth = dy4D.shape[3];
        util.assert(inShape4D.length === 4, "Error in conv2dDerInput: inShape must be length 4, but got length " +
            (inShape4D.length + "."));
        util.assert(dy4D.rank === 4, "Error in conv2dDerInput: dy must be rank 4, but got " +
            ("rank " + dy4D.rank));
        util.assert(filter.rank === 4, "Error in conv2dDerInput: filter must be rank 4, but got " +
            ("rank " + filter.rank));
        util.assert(inDepth === filter.shape[2], "Error in conv2dDerInput: depth of input (" + inDepth + ") must " +
            ("match input depth for filter " + filter.shape[2] + "."));
        util.assert(outDepth === filter.shape[3], "Error in conv2dDerInput: depth of output (" + outDepth + ") must" +
            ("match output depth for filter " + filter.shape[3] + "."));
        var convInfo = conv_util.computeConv2DInfo(inShape4D, filter.shape, strides, pad);
        return this.executeOp('conv2dDerInput', function () {
            var res = _this.backendEngine.executeKernel('Conv2DDerInput', { inputs: { dy: dy4D, filter: filter }, args: { convInfo: convInfo } });
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.conv2dDerBias = function (dy) {
        var dy4D = dy;
        if (dy.rank === 3) {
            dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
        }
        return this.backendEngine.executeKernel('Conv2DDerBias', { inputs: { dy: dy4D } });
    };
    NDArrayMath.prototype.conv2dDerFilter = function (input, dy, filterShape, strides, pad) {
        var input4D = input;
        if (input.rank === 3) {
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
        }
        var dy4D = dy;
        if (dy4D.rank === 3) {
            dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
        }
        util.assert(input4D.rank === 4, "Error in conv2dDerFilter: input must be rank 4, but got shape " +
            (input4D.shape + "."));
        util.assert(dy4D.rank === 4, "Error in conv2dDerFilter: dy must be rank 4, but got shape " +
            (dy4D.shape + "."));
        util.assert(filterShape.length === 4, "Error in conv2dDerFilter: filterShape must be length 4, but got " +
            (filterShape + "."));
        util.assert(input4D.shape[3] === filterShape[2], "Error in conv2dDerFilter: depth of input " + input4D.shape[3] + ") must " +
            ("match input depth in filter (" + filterShape[2] + "."));
        util.assert(dy4D.shape[3] === filterShape[3], "Error in conv2dDerFilter: depth of dy (" + dy4D.shape[3] + ") must " +
            ("match output depth for filter (" + filterShape[3] + ")."));
        var convInfo = conv_util.computeConv2DInfo(input4D.shape, filterShape, strides, pad);
        return this.backendEngine.executeKernel('Conv2DDerFilter', { inputs: { x: input4D, dy: dy4D }, args: { convInfo: convInfo } });
    };
    NDArrayMath.prototype.conv2dTranspose = function (x, filter, outputShape, strides, pad) {
        return this.conv2dDerInput(outputShape, x, filter, strides, pad);
    };
    NDArrayMath.prototype.depthwiseConv2D = function (input, filter, strides, pad, rates) {
        var _this = this;
        if (rates === void 0) { rates = [1, 1]; }
        var input4D = input;
        var reshapedTo4D = false;
        if (input.rank === 3) {
            reshapedTo4D = true;
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
        }
        util.assert(input4D.rank === 4, "Error in depthwiseConv2D: input must be rank 4, but got " +
            ("rank " + input4D.rank + "."));
        util.assert(filter.rank === 4, "Error in depthwiseConv2D: filter must be rank 4, but got rank " +
            (filter.rank + "."));
        util.assert(input4D.shape[3] === filter.shape[2], "Error in depthwiseConv2D: number of input channels " +
            ("(" + input4D.shape[3] + ") must match the inChannels dimension in ") +
            ("filter " + filter.shape[2] + "."));
        rates = rates || [1, 1];
        var _a = parseTupleParam(rates), rateHeight = _a[0], rateWidth = _a[1];
        util.assert(rateHeight === 1 && rateWidth === 1, 'Error in depthwiseConv2D: rates greater than 1 are not yet ' +
            ("supported. Got rates '" + rates + "'"));
        var convInfo = conv_util.computeConv2DInfo(input4D.shape, filter.shape, strides, pad, true);
        return this.executeOp('depthwiseConv2D', function () {
            var res = _this.backendEngine.executeKernel('DepthwiseConv2D', { inputs: { x: input4D, filter: filter }, args: { convInfo: convInfo } });
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.maxPool = function (input, filterSize, strides, pad) {
        var _this = this;
        var input4D = input;
        var reshapedTo4D = false;
        if (input.rank === 3) {
            reshapedTo4D = true;
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
        }
        util.assert(input4D.rank === 4, "Error in maxPool: input must be rank 4 but got rank " + input4D.rank + ".");
        var convInfo = conv_util.computePool2DInfo(input4D.shape, filterSize, strides, pad);
        return this.executeOp('maxPool', function () {
            var res = _this.backendEngine.executeKernel('MaxPool', { inputs: { x: input4D }, args: { convInfo: convInfo } });
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.maxPoolBackprop = function (dy, input, filterSize, strides, pad) {
        var _this = this;
        util.assert(input.rank === dy.rank, "Rank of input (" + input.rank + ") does not match rank of dy (" + dy.rank + ")");
        var input4D = input;
        var dy4D = dy;
        var reshapedTo4D = false;
        if (input.rank === 3) {
            reshapedTo4D = true;
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
            dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
        }
        util.assert(dy4D.rank === 4, "Error in maxPoolBackprop: dy must be rank 4 but got rank " +
            (dy4D.rank + "."));
        util.assert(input4D.rank === 4, "Error in maxPoolBackprop: input must be rank 4 but got rank " +
            (input4D.rank + "."));
        var convInfo = conv_util.computePool2DInfo(input4D.shape, filterSize, strides, pad);
        return this.executeOp('maxPoolBackprop', function () {
            var res = _this.backendEngine.executeKernel('MaxPoolBackprop', { inputs: { dy: dy4D, x: input4D }, args: { convInfo: convInfo } });
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.minPool = function (input, filterSize, strides, pad) {
        var _this = this;
        var input4D = input;
        var reshapedTo4D = false;
        if (input.rank === 3) {
            reshapedTo4D = true;
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
        }
        util.assert(input4D.rank === 4, "Error in minPool: x must be rank 4 but got rank " + input4D.rank + ".");
        var convInfo = conv_util.computePool2DInfo(input4D.shape, filterSize, strides, pad);
        return this.executeOp('minPool', function () {
            var res = _this.backendEngine.executeKernel('MinPool', { inputs: { x: input4D }, args: { convInfo: convInfo } });
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.avgPool = function (input, filterSize, strides, pad) {
        var _this = this;
        var input4D = input;
        var reshapedTo4D = false;
        if (input.rank === 3) {
            reshapedTo4D = true;
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
        }
        util.assert(input4D.rank === 4, "Error in avgPool: x must be rank 4 but got rank " + input4D.rank + ".");
        var convInfo = conv_util.computePool2DInfo(input4D.shape, filterSize, strides, pad);
        return this.executeOp('avgPool', function () {
            var res = _this.backendEngine.executeKernel('AvgPool', { inputs: { x: input4D }, args: { convInfo: convInfo } });
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.resizeBilinear3D = function (x, newShape2D, alignCorners) {
        if (alignCorners === void 0) { alignCorners = false; }
        util.assert(x.rank === 3, "Error in resizeBilinear3D: x must be rank 3 but got rank " + x.rank + ".");
        util.assert(newShape2D.length === 2, "Error in resizeBilinear3D: new shape must 2D, but got shape " +
            (newShape2D + "."));
        return this.backendEngine.executeKernel('ResizeBilinear3D', { inputs: { x: x }, args: { newShape2D: newShape2D, alignCorners: alignCorners } });
    };
    NDArrayMath.prototype.batchNormalization2D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
        util.assert(x.rank === 2, "Error in batchNormalization3D: x must be rank 3 but got rank " +
            (x.rank + "."));
        util.assert(mean.rank === 2 || mean.rank === 1, "Error in batchNormalization2D: mean must be rank 2 or rank 1 but " +
            ("got rank " + mean.rank + "."));
        util.assert(variance.rank === 2 || variance.rank === 1, "Error in batchNormalization2D: variance must be rank 2 or rank 1 " +
            ("but got rank " + variance.rank + "."));
        if (scale != null) {
            util.assert(scale.rank === 2 || scale.rank === 1, "Error in batchNormalization2D: scale must be rank 2 or rank 1 " +
                ("but got rank " + scale.rank + "."));
        }
        if (offset != null) {
            util.assert(offset.rank === 2 || offset.rank === 1, "Error in batchNormalization2D: offset must be rank 2 or rank 1 " +
                ("but got rank " + offset.rank + "."));
        }
        return this.backendEngine.executeKernel('BatchNorm2D', { inputs: { x: x, mean: mean, variance: variance, scale: scale, offset: offset }, args: { varianceEpsilon: varianceEpsilon } });
    };
    NDArrayMath.prototype.batchNormalization3D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
        util.assert(x.rank === 3, "Error in batchNormalization3D: x must be rank 3 but got rank " +
            (x.rank + "."));
        util.assert(mean.rank === 3 || mean.rank === 1, "Error in batchNormalization3D: mean must be rank 3 or rank 1 but " +
            ("got rank " + mean.rank + "."));
        util.assert(variance.rank === 3 || variance.rank === 1, "Error in batchNormalization3D: variance must be rank 3 or rank 1 " +
            ("but got rank " + variance.rank + "."));
        if (scale != null) {
            util.assert(scale.rank === 3 || scale.rank === 1, "Error in batchNormalization3D: scale must be rank 3 or rank 1 " +
                ("but got rank " + scale.rank + "."));
        }
        if (offset != null) {
            util.assert(offset.rank === 3 || offset.rank === 1, "Error in batchNormalization3D: offset must be rank 3 or rank 1 " +
                ("but got rank " + offset.rank + "."));
        }
        return this.backendEngine.executeKernel('BatchNorm3D', { inputs: { x: x, mean: mean, variance: variance, scale: scale, offset: offset }, args: { varianceEpsilon: varianceEpsilon } });
    };
    NDArrayMath.prototype.multiRNNCell = function (lstmCells, data, c, h) {
        var res = this.scope(function () {
            var input = data;
            var newStates = [];
            for (var i = 0; i < lstmCells.length; i++) {
                var output = lstmCells[i](input, c[i], h[i]);
                newStates.push(output[0]);
                newStates.push(output[1]);
                input = output[1];
            }
            return newStates;
        });
        var newC = [];
        var newH = [];
        for (var i = 0; i < res.length; i += 2) {
            newC.push(res[i]);
            newH.push(res[i + 1]);
        }
        return [newC, newH];
    };
    NDArrayMath.prototype.basicLSTMCell = function (forgetBias, lstmKernel, lstmBias, data, c, h) {
        var _this = this;
        var res = this.scope(function () {
            var combined = _this.concat2D(data, h, 1);
            var weighted = _this.matMul(combined, lstmKernel);
            var res = _this.add(weighted, lstmBias);
            var batchSize = res.shape[0];
            var sliceCols = res.shape[1] / 4;
            var sliceSize = [batchSize, sliceCols];
            var i = _this.slice2D(res, [0, 0], sliceSize);
            var j = _this.slice2D(res, [0, sliceCols], sliceSize);
            var f = _this.slice2D(res, [0, sliceCols * 2], sliceSize);
            var o = _this.slice2D(res, [0, sliceCols * 3], sliceSize);
            var newC = _this.addStrict(_this.multiplyStrict(c, _this.sigmoid(_this.scalarPlusArray(forgetBias, f))), _this.multiplyStrict(_this.sigmoid(i), _this.tanh(j)));
            var newH = _this.multiplyStrict(_this.tanh(newC), _this.sigmoid(o));
            return [newC, newH];
        });
        return [res[0], res[1]];
    };
    NDArrayMath.prototype.multinomial = function (probabilities, numSamples, seed) {
        var _this = this;
        var numOutcomes = probabilities.size;
        if (numOutcomes < 2) {
            throw new Error("Error in multinomial: you need at least 2 outcomes, but got " +
                (numOutcomes + "."));
        }
        if (probabilities.rank > 2) {
            throw new Error("Rank of probabilities must be 1 or 2, but is " + probabilities.rank);
        }
        seed = seed || Math.random();
        var origRank = probabilities.rank;
        if (probabilities.rank === 1) {
            probabilities = probabilities.as2D(1, -1);
        }
        return this.executeOp('multinomial', function () {
            var res = _this.backendEngine.executeKernel('Multinomial', {
                inputs: { probs: probabilities },
                args: { numSamples: numSamples, seed: seed }
            });
            if (origRank === 1) {
                return res.as1D();
            }
            return res;
        });
    };
    NDArrayMath.prototype.oneHot = function (indices, depth, onValue, offValue) {
        if (onValue === void 0) { onValue = 1; }
        if (offValue === void 0) { offValue = 0; }
        if (depth < 2) {
            throw new Error("Error in oneHot: depth must be >=2, but it is " + depth);
        }
        return this.backendEngine.executeKernel('OneHot', { inputs: { indices: indices }, args: { depth: depth, onValue: onValue, offValue: offValue } });
    };
    NDArrayMath.prototype.moments = function (x, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var axes = axis_util.parseAxisParam(axis, x.shape);
        var result = this.scope(function () {
            var mean = _this.mean(x, axes, keepDims);
            var keepDimsShape = mean.shape;
            if (!keepDims) {
                keepDimsShape = axis_util.expandShapeToKeepDim(mean.shape, axes);
            }
            var devSquared = _this.square(_this.subtract(x, mean.reshape(keepDimsShape)));
            var variance = _this.mean(devSquared, axes, keepDims);
            return { mean: mean, variance: variance };
        });
        return result;
    };
    NDArrayMath.prototype.norm = function (x, ord, axis, keepDims) {
        var _this = this;
        if (ord === void 0) { ord = 'euclidean'; }
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        return this.scope(function () {
            var norm = _this.normInternal(x, ord, axis);
            var keepDimsShape = norm.shape;
            if (keepDims) {
                var axes = axis_util.parseAxisParam(axis, x.shape);
                keepDimsShape = axis_util.expandShapeToKeepDim(norm.shape, axes);
            }
            return norm.reshape(keepDimsShape);
        });
    };
    NDArrayMath.prototype.normInternal = function (x, p, axis) {
        if (axis === void 0) { axis = null; }
        if (x.rank === 0) {
            return this.abs(x);
        }
        if (x.rank !== 1 && axis === null) {
            return this.normInternal(x.reshape([-1]), p, axis);
        }
        if (x.rank === 1 || typeof axis === 'number' ||
            axis instanceof Array && axis.length === 1) {
            if (p === 1) {
                return this.sum(this.abs(x), axis);
            }
            if (p === Infinity) {
                return this.max(this.abs(x), axis);
            }
            if (p === -Infinity) {
                return this.min(this.abs(x), axis);
            }
            if (p === 'euclidean' || p === 2) {
                return this.sqrt(this.sum(this.pow(this.abs(x), ndarray_1.Scalar.new(2, 'int32')), axis));
            }
            throw new Error("Error in norm: invalid ord value: " + p);
        }
        if (axis instanceof Array && axis.length === 2) {
            if (p === 1) {
                return this.max(this.sum(this.abs(x), axis[0]), axis[1] - 1);
            }
            if (p === Infinity) {
                return this.max(this.sum(this.abs(x), axis[1]), axis[0]);
            }
            if (p === -Infinity) {
                return this.min(this.sum(this.abs(x), axis[1]), axis[0]);
            }
            if (p === 'fro' || p === 'euclidean') {
                return this.sqrt(this.sum(this.pow(x, ndarray_1.Scalar.new(2, 'int32')), axis));
            }
            throw new Error("Error in norm: invalid ord value: " + p);
        }
        throw new Error("Error in norm: invalid axis: " + axis);
    };
    NDArrayMath.prototype.gradientWrt = function (y, x) {
        var xIsArray = x instanceof ndarray_1.NDArray;
        var xs = [];
        var xKeys;
        if (xIsArray) {
            xs.push(x);
        }
        else {
            var xMap = x;
            xKeys = Object.keys(xMap);
            for (var i = 0; i < xKeys.length; i++) {
                xs.push(xMap[xKeys[i]]);
            }
        }
        var gradients = this.backendEngine.gradientWrt(y, xs);
        if (xIsArray) {
            return gradients[0];
        }
        else {
            var result = {};
            for (var i = 0; i < xKeys.length; i++) {
                result[xKeys[i]] = gradients[i];
            }
            return result;
        }
    };
    NDArrayMath.prototype.disposeData = function (id) {
        this.backend.disposeData(id);
        this.numArrays--;
    };
    return NDArrayMath;
}());
exports.NDArrayMath = NDArrayMath;
function parseTupleParam(param) {
    return typeof param === 'number' ? [param, param] : param;
}

},{"../environment":16,"../util":18,"./axis_util":52,"./broadcast_util":53,"./concat_util":47,"./conv_util":23,"./ndarray":30,"./slice_util":54,"./backends/backend_engine":55,"./backends/types/matmul":44}],46:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMobile() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
        .test(a) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
            .test(a.substr(0, 4));
}
exports.isMobile = isMobile;

},{}],16:[function(require,module,exports) {
var global = (1,eval)("this");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var device_util = require("./device_util");
var math_1 = require("./math/math");
var util = require("./util");
var Type;
(function (Type) {
    Type[Type["NUMBER"] = 0] = "NUMBER";
    Type[Type["BOOLEAN"] = 1] = "BOOLEAN";
})(Type = exports.Type || (exports.Type = {}));
exports.URL_PROPERTIES = [
    { name: 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED', type: Type.BOOLEAN },
    { name: 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE', type: Type.BOOLEAN },
    { name: 'WEBGL_VERSION', type: Type.NUMBER },
    { name: 'WEBGL_FLOAT_TEXTURE_ENABLED', type: Type.BOOLEAN }, {
        name: 'WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED',
        type: Type.BOOLEAN
    }
];
function getWebGLRenderingContext(webGLVersion) {
    if (webGLVersion === 0) {
        throw new Error('Cannot get WebGL rendering context, WebGL is disabled.');
    }
    var tempCanvas = document.createElement('canvas');
    if (webGLVersion === 1) {
        return (tempCanvas.getContext('webgl') ||
            tempCanvas.getContext('experimental-webgl'));
    }
    return tempCanvas.getContext('webgl2');
}
function loseContext(gl) {
    if (gl != null) {
        var loseContextExtension = gl.getExtension('WEBGL_lose_context');
        if (loseContextExtension == null) {
            throw new Error('Extension WEBGL_lose_context not supported on this browser.');
        }
        loseContextExtension.loseContext();
    }
}
function isWebGLVersionEnabled(webGLVersion) {
    var gl = getWebGLRenderingContext(webGLVersion);
    if (gl != null) {
        loseContext(gl);
        return true;
    }
    return false;
}
function isWebGLDisjointQueryTimerEnabled(webGLVersion) {
    var gl = getWebGLRenderingContext(webGLVersion);
    var extensionName = webGLVersion === 1 ? 'EXT_disjoint_timer_query' :
        'EXT_disjoint_timer_query_webgl2';
    var ext = gl.getExtension(extensionName);
    var isExtEnabled = ext != null;
    if (gl != null) {
        loseContext(gl);
    }
    return isExtEnabled;
}
function isFloatTextureReadPixelsEnabled(webGLVersion) {
    if (webGLVersion === 0) {
        return false;
    }
    var gl = getWebGLRenderingContext(webGLVersion);
    if (webGLVersion === 1) {
        if (gl.getExtension('OES_texture_float') == null) {
            return false;
        }
    }
    else {
        if (gl.getExtension('EXT_color_buffer_float') == null) {
            return false;
        }
    }
    var frameBuffer = gl.createFramebuffer();
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var internalFormat = webGLVersion === 2 ? gl.RGBA32F : gl.RGBA;
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 1, 1, 0, gl.RGBA, gl.FLOAT, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    var frameBufferComplete = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, new Float32Array(4));
    var readPixelsNoError = gl.getError() === gl.NO_ERROR;
    loseContext(gl);
    return frameBufferComplete && readPixelsNoError;
}
function isWebGLGetBufferSubDataAsyncExtensionEnabled(webGLVersion) {
    if (webGLVersion !== 2) {
        return false;
    }
    var gl = getWebGLRenderingContext(webGLVersion);
    var ext = gl.getExtension('WEBGL_get_buffer_sub_data_async');
    var isEnabled = ext != null;
    loseContext(gl);
    return isEnabled;
}
var Environment = (function () {
    function Environment(features) {
        this.features = {};
        this.globalMath = null;
        this.backendRegistry = {};
        this.prevBackendRegistry = this.backendRegistry;
        if (features != null) {
            this.features = features;
        }
    }
    Environment.prototype.get = function (feature) {
        if (feature in this.features) {
            return this.features[feature];
        }
        this.features[feature] = this.evaluateFeature(feature);
        return this.features[feature];
    };
    Environment.prototype.getBestBackend = function () {
        var orderedBackends = ['webgl', 'cpu'];
        for (var i = 0; i < orderedBackends.length; ++i) {
            var backendId = orderedBackends[i];
            if (backendId in this.backendRegistry) {
                return this.backendRegistry[backendId];
            }
        }
        throw new Error('No backend found in registry.');
    };
    Environment.prototype.evaluateFeature = function (feature) {
        if (feature === 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED') {
            var webGLVersion = this.get('WEBGL_VERSION');
            if (webGLVersion === 0) {
                return false;
            }
            return isWebGLDisjointQueryTimerEnabled(webGLVersion);
        }
        else if (feature === 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE') {
            return this.get('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED') &&
                !device_util.isMobile();
        }
        else if (feature === 'WEBGL_VERSION') {
            if (isWebGLVersionEnabled(2)) {
                return 2;
            }
            else if (isWebGLVersionEnabled(1)) {
                return 1;
            }
            return 0;
        }
        else if (feature === 'WEBGL_FLOAT_TEXTURE_ENABLED') {
            return isFloatTextureReadPixelsEnabled(this.get('WEBGL_VERSION'));
        }
        else if (feature === 'WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED') {
            return isWebGLGetBufferSubDataAsyncExtensionEnabled(this.get('WEBGL_VERSION'));
        }
        throw new Error("Unknown feature " + feature + ".");
    };
    Environment.prototype.setFeatures = function (features) {
        this.empty();
        this.features = features;
    };
    Environment.prototype.reset = function () {
        this.globalMath = null;
        this.backendRegistry = this.prevBackendRegistry;
        this.features = getFeaturesFromURL();
    };
    Environment.prototype.setMath = function (math) {
        this.globalMath = math;
    };
    Environment.prototype.getBackend = function (name) {
        return this.backendRegistry[name];
    };
    Environment.prototype.registerBackend = function (name, factory) {
        if (name in this.backendRegistry) {
            throw new Error(name + " backend was already registered");
        }
        try {
            var backend = factory();
            this.backendRegistry[name] = backend;
            return true;
        }
        catch (err) {
            return false;
        }
    };
    Object.defineProperty(Environment.prototype, "math", {
        get: function () {
            if (this.globalMath == null) {
                var bestBackend = this.getBestBackend();
                var safeMode = false;
                this.globalMath = new math_1.NDArrayMath(bestBackend, safeMode);
            }
            return this.globalMath;
        },
        enumerable: true,
        configurable: true
    });
    Environment.prototype.empty = function () {
        this.globalMath = null;
        this.prevBackendRegistry = this.backendRegistry;
        this.backendRegistry = {};
        this.features = null;
    };
    return Environment;
}());
exports.Environment = Environment;
var DEEPLEARNJS_FLAGS_PREFIX = 'dljsflags';
function getFeaturesFromURL() {
    var features = {};
    if (typeof window === 'undefined') {
        return features;
    }
    var urlParams = util.getQueryParams(window.location.search);
    if (DEEPLEARNJS_FLAGS_PREFIX in urlParams) {
        var urlFlags_1 = {};
        var keyValues = urlParams[DEEPLEARNJS_FLAGS_PREFIX].split(',');
        keyValues.forEach(function (keyValue) {
            var _a = keyValue.split(':'), key = _a[0], value = _a[1];
            urlFlags_1[key] = value;
        });
        exports.URL_PROPERTIES.forEach(function (urlProperty) {
            if (urlProperty.name in urlFlags_1) {
                console.log("Setting feature override from URL " + urlProperty.name + ": " +
                    ("" + urlFlags_1[urlProperty.name]));
                if (urlProperty.type === Type.NUMBER) {
                    features[urlProperty.name] = +urlFlags_1[urlProperty.name];
                }
                else if (urlProperty.type === Type.BOOLEAN) {
                    features[urlProperty.name] = urlFlags_1[urlProperty.name] === 'true';
                }
                else {
                    console.warn("Unknown URL param: " + urlProperty.name + ".");
                }
            }
        });
    }
    return features;
}
function getGlobalNamespace() {
    var ns;
    if (typeof (window) !== 'undefined') {
        ns = window;
    }
    else if (typeof (global) !== 'undefined') {
        ns = global;
    }
    else {
        throw new Error('Could not find a global object');
    }
    return ns;
}
function getOrMakeEnvironment() {
    var ns = getGlobalNamespace();
    ns.ENV = ns.ENV || new Environment(getFeaturesFromURL());
    return ns.ENV;
}
exports.ENV = getOrMakeEnvironment();

},{"./math/math":29,"./util":18,"./device_util":46}],118:[function(require,module,exports) {

},{}],111:[function(require,module,exports) {
var global = (1,eval)("this");
/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

},{"crypto":118}],112:[function(require,module,exports) {
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.alea = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],113:[function(require,module,exports) {
// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],114:[function(require,module,exports) {
// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorwow = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],115:[function(require,module,exports) {
// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorshift7 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);


},{}],116:[function(require,module,exports) {
// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);

},{}],117:[function(require,module,exports) {
// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.tychei = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],110:[function(require,module,exports) {
// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = require('./lib/alea');

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = require('./lib/xor128');

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = require('./lib/xorwow');

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = require('./lib/xorshift7');

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = require('./lib/xor4096');

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = require('./lib/tychei');

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = require('./seedrandom');

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;

},{"./seedrandom":111,"./lib/alea":112,"./lib/xor128":113,"./lib/xorwow":114,"./lib/xorshift7":115,"./lib/xor4096":116,"./lib/tychei":117}],51:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seedrandom = require("seedrandom");
var MPRandGauss = (function () {
    function MPRandGauss(mean, stdDeviation, dtype, truncated, seed) {
        this.mean = mean;
        this.stdDev = stdDeviation;
        this.dtype = dtype;
        this.nextVal = NaN;
        this.truncated = truncated;
        if (this.truncated) {
            this.upper = this.mean + this.stdDev * 2;
            this.lower = this.mean - this.stdDev * 2;
        }
        var seedValue = seed ? seed : Math.random();
        this.random = seedrandom.alea(seedValue.toString());
    }
    MPRandGauss.prototype.nextValue = function () {
        if (!isNaN(this.nextVal)) {
            var value = this.nextVal;
            this.nextVal = NaN;
            return value;
        }
        var resultX, resultY;
        var isValid = false;
        while (!isValid) {
            var v1 = void 0, v2 = void 0, s = void 0;
            do {
                v1 = 2 * this.random() - 1;
                v2 = 2 * this.random() - 1;
                s = v1 * v1 + v2 * v2;
            } while (s >= 1 || s === 0);
            var mul = Math.sqrt(-2.0 * Math.log(s) / s);
            resultX = this.mean + this.stdDev * v1 * mul;
            resultY = this.mean + this.stdDev * v2 * mul;
            if (!this.truncated || this.isValidTruncated(resultX)) {
                isValid = true;
            }
        }
        if (!this.truncated || this.isValidTruncated(resultY)) {
            this.nextVal = this.convertValue(resultY);
        }
        return this.convertValue(resultX);
    };
    MPRandGauss.prototype.convertValue = function (value) {
        if (this.dtype == null || this.dtype === 'float32') {
            return value;
        }
        return Math.round(value);
    };
    MPRandGauss.prototype.isValidTruncated = function (value) {
        return value <= this.upper && value >= this.lower;
    };
    return MPRandGauss;
}());
exports.MPRandGauss = MPRandGauss;

},{"seedrandom":110}],30:[function(require,module,exports) {
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var util = require("../util");
var rand_1 = require("./rand");
var DType;
(function (DType) {
    DType["float32"] = "float32";
    DType["int32"] = "int32";
    DType["bool"] = "bool";
})(DType = exports.DType || (exports.DType = {}));
var NDArray = (function () {
    function NDArray(shape, dtype, values, id, math) {
        this.isDisposed = false;
        this.math = math || environment_1.ENV.math;
        this.size = util.sizeFromShape(shape);
        if (values != null) {
            util.assert(this.size === values.length, "Constructing ndarray of shape (" + this.size + ") should match the " +
                ("length of values (" + values.length + ")"));
        }
        this.shape = shape;
        this.dtype = dtype || 'float32';
        var dim = this.shape.length;
        if (dim < 2) {
            this.strides = [];
        }
        else {
            this.strides = new Array(dim - 1);
            this.strides[dim - 2] = this.shape[dim - 1];
            for (var i = dim - 3; i >= 0; --i) {
                this.strides[i] = this.strides[i + 1] * this.shape[i + 1];
            }
        }
        this.id = id;
        if (this.id == null) {
            this.id = NDArray.nextId++;
            this.math.register(this);
            this.math.write(this.id, values, this.dtype, this.shape);
        }
    }
    NDArray.ones = function (shape, dtype) {
        var values = makeOnesTypedArray(util.sizeFromShape(shape), dtype);
        return NDArray.make(shape, { values: values }, dtype);
    };
    NDArray.zeros = function (shape, dtype) {
        var values = makeZerosTypedArray(util.sizeFromShape(shape), dtype);
        return NDArray.make(shape, { values: values }, dtype);
    };
    NDArray.onesLike = function (another) {
        return NDArray.ones(another.shape, another.dtype);
    };
    NDArray.zerosLike = function (another) {
        return NDArray.zeros(another.shape, another.dtype);
    };
    NDArray.like = function (another) {
        var newValues = copyTypedArray(another.getValues(), another.dtype);
        return NDArray.make(another.shape, { values: newValues }, another.dtype);
    };
    NDArray.make = function (shape, data, dtype, math) {
        switch (shape.length) {
            case 0:
                return new Scalar(shape, dtype, data.values, data.id, math);
            case 1:
                return new Array1D(shape, dtype, data.values, data.id, math);
            case 2:
                return new Array2D(shape, dtype, data.values, data.id, math);
            case 3:
                return new Array3D(shape, dtype, data.values, data.id, math);
            case 4:
                return new Array4D(shape, dtype, data.values, data.id, math);
            default:
                return new NDArray(shape, dtype, data.values, data.id, math);
        }
    };
    NDArray.fromPixels = function (pixels, numChannels, math) {
        if (numChannels === void 0) { numChannels = 3; }
        if (numChannels > 4) {
            throw new Error('Cannot construct NDArray with more than 4 channels from pixels.');
        }
        var ndarrayData = {};
        var shape = [pixels.height, pixels.width, numChannels];
        var res = NDArray.make(shape, ndarrayData, 'int32');
        math = math || environment_1.ENV.math;
        math.writePixels(res.id, pixels, numChannels);
        return res;
    };
    NDArray.prototype.reshape = function (newShape) {
        this.throwIfDisposed();
        newShape = util.inferFromImplicitShape(newShape, this.size);
        if (util.arraysEqual(this.shape, newShape)) {
            return this;
        }
        var data = { id: this.id };
        util.assert(this.size === util.sizeFromShape(newShape), 'new shape and old shape must have the same number of elements.');
        return NDArray.make(newShape, data, this.dtype);
    };
    NDArray.prototype.flatten = function () {
        this.throwIfDisposed();
        if (this instanceof Array1D) {
            return this;
        }
        return this.as1D();
    };
    NDArray.prototype.asScalar = function () {
        this.throwIfDisposed();
        util.assert(this.size === 1, 'The array must have only 1 element.');
        return this.reshape([]);
    };
    NDArray.prototype.as1D = function () {
        this.throwIfDisposed();
        return this.reshape([this.size]);
    };
    NDArray.prototype.as2D = function (rows, columns) {
        this.throwIfDisposed();
        return this.reshape([rows, columns]);
    };
    NDArray.prototype.as3D = function (rows, columns, depth) {
        this.throwIfDisposed();
        return this.reshape([rows, columns, depth]);
    };
    NDArray.prototype.as4D = function (rows, columns, depth, depth2) {
        this.throwIfDisposed();
        return this.reshape([rows, columns, depth, depth2]);
    };
    NDArray.prototype.asType = function (dtype) {
        this.throwIfDisposed();
        if (this.dtype === dtype) {
            return this;
        }
        var vals = this.dataSync();
        var newVals = toTypedArray(vals, dtype);
        return NDArray.make(this.shape, { values: newVals }, dtype);
    };
    Object.defineProperty(NDArray.prototype, "rank", {
        get: function () {
            return this.shape.length;
        },
        enumerable: true,
        configurable: true
    });
    NDArray.prototype.get = function () {
        var locs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            locs[_i] = arguments[_i];
        }
        var index = locs[locs.length - 1];
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        return this.getValues()[index];
    };
    NDArray.prototype.add = function (value) {
        var locs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            locs[_i - 1] = arguments[_i];
        }
        this.set.apply(this, [this.get.apply(this, locs) + value].concat(locs));
    };
    NDArray.prototype.set = function (value) {
        var locs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            locs[_i - 1] = arguments[_i];
        }
        this.throwIfDisposed();
        util.assert(locs.length === this.rank, "The number of provided coordinates (" + locs.length + ") must " +
            ("match the rank (" + this.rank + ")"));
        var index = locs.length > 0 ? locs[locs.length - 1] : 0;
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        var vals = this.getValues();
        vals[index] = value;
        this.math.disposeData(this.id);
        this.math.write(this.id, vals, this.dtype, this.shape);
    };
    NDArray.prototype.val = function () {
        var locs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            locs[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfDisposed();
                        return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get.apply(this, locs)];
                }
            });
        });
    };
    NDArray.prototype.locToIndex = function (locs) {
        this.throwIfDisposed();
        var index = locs[locs.length - 1];
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        return index;
    };
    NDArray.prototype.indexToLoc = function (index) {
        this.throwIfDisposed();
        var locs = new Array(this.shape.length);
        for (var i = 0; i < locs.length - 1; ++i) {
            locs[i] = Math.floor(index / this.strides[i]);
            index -= locs[i] * this.strides[i];
        }
        locs[locs.length - 1] = index;
        return locs;
    };
    NDArray.prototype.fill = function (value) {
        this.throwIfDisposed();
        var vals = this.getValues();
        vals.fill(value);
        this.math.disposeData(this.id);
        this.math.write(this.id, vals, this.dtype, this.shape);
    };
    NDArray.prototype.getValues = function () {
        return this.dataSync();
    };
    NDArray.prototype.getValuesAsync = function () {
        return this.data();
    };
    NDArray.prototype.data = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.throwIfDisposed();
                return [2, this.math.read(this.id)];
            });
        });
    };
    NDArray.prototype.dataSync = function () {
        this.throwIfDisposed();
        return this.math.readSync(this.id);
    };
    NDArray.prototype.dispose = function () {
        this.isDisposed = true;
        this.math.disposeData(this.id);
    };
    NDArray.prototype.equals = function (t) {
        this.throwIfDisposed();
        return this.dtype === t.dtype && util.arraysEqual(this.shape, t.shape) &&
            util.arraysEqual(this.getValues(), t.getValues());
    };
    NDArray.rand = function (shape, randFunction, dtype) {
        var size = util.sizeFromShape(shape);
        var values = null;
        if (dtype == null || dtype === 'float32') {
            values = new Float32Array(size);
        }
        else if (dtype === 'int32') {
            values = new Int32Array(size);
        }
        else if (dtype === 'bool') {
            values = new Uint8Array(size);
        }
        else {
            throw new Error("Unknown data type " + dtype);
        }
        for (var i = 0; i < size; i++) {
            values[i] = randFunction();
        }
        return NDArray.make(shape, { values: values }, dtype);
    };
    NDArray.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    NDArray.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    NDArray.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    NDArray.prototype.throwIfDisposed = function () {
        if (this.isDisposed) {
            throw new Error("NDArray is disposed.");
        }
    };
    NDArray.nextId = 0;
    return NDArray;
}());
exports.NDArray = NDArray;
var Scalar = (function (_super) {
    __extends(Scalar, _super);
    function Scalar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scalar.new = function (value, dtype) {
        var values = [value];
        return new Scalar([], dtype, toTypedArray(values, dtype));
    };
    Scalar.prototype.get = function () {
        return this.getValues()[0];
    };
    Scalar.prototype.val = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get()];
                }
            });
        });
    };
    Scalar.prototype.add = function (value) {
        this.getValues()[0] += value;
    };
    Scalar.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Scalar.prototype.locToIndex = function (loc) {
        return 0;
    };
    Scalar.prototype.indexToLoc = function (index) {
        return [];
    };
    return Scalar;
}(NDArray));
exports.Scalar = Scalar;
var Array1D = (function (_super) {
    __extends(Array1D, _super);
    function Array1D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Array1D.new = function (values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            util.assert(inferredShape.length === 1, "Error constructing Array1D. Shape of values " + inferredShape + " is " +
                "not 1 dimensional.");
        }
        return new Array1D([values.length], dtype, toTypedArray(values, dtype));
    };
    Array1D.prototype.get = function (i) {
        return this.getValues()[i];
    };
    Array1D.prototype.val = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i)];
                }
            });
        });
    };
    Array1D.prototype.add = function (value, i) {
        this.getValues()[i] += value;
    };
    Array1D.prototype.locToIndex = function (loc) {
        return loc[0];
    };
    Array1D.prototype.indexToLoc = function (index) {
        return [index];
    };
    Array1D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array1D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array1D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array1D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array1D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array1D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array1D;
}(NDArray));
exports.Array1D = Array1D;
var Array2D = (function (_super) {
    __extends(Array2D, _super);
    function Array2D(shape, dtype, values, id, math) {
        var _this = this;
        util.assert(shape.length === 2, 'Shape should be of length 2');
        _this = _super.call(this, shape, dtype, values, id, math) || this;
        _this.stride0 = _this.strides[0];
        return _this;
    }
    Array2D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array2D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array2D(shape, dtype, toTypedArray(values, dtype));
    };
    Array2D.prototype.get = function (i, j) {
        return this.getValues()[this.stride0 * i + j];
    };
    Array2D.prototype.add = function (value, i, j) {
        this.getValues()[this.stride0 * i + j] += value;
    };
    Array2D.prototype.val = function (i, j) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j)];
                }
            });
        });
    };
    Array2D.prototype.locToIndex = function (locs) {
        return this.stride0 * locs[0] + locs[1];
    };
    Array2D.prototype.indexToLoc = function (index) {
        return [Math.floor(index / this.stride0), index % this.stride0];
    };
    Array2D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array2D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array2D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array2D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array2D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array2D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array2D;
}(NDArray));
exports.Array2D = Array2D;
var Array3D = (function (_super) {
    __extends(Array3D, _super);
    function Array3D(shape, dtype, values, id, math) {
        var _this = this;
        util.assert(shape.length === 3, 'Shape should be of length 3');
        _this = _super.call(this, shape, dtype, values, id, math) || this;
        _this.stride0 = _this.strides[0];
        _this.stride1 = _this.strides[1];
        return _this;
    }
    Array3D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array3D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array3D(shape, dtype, toTypedArray(values, dtype));
    };
    Array3D.prototype.get = function (i, j, k) {
        return this.getValues()[this.stride0 * i + this.stride1 * j + k];
    };
    Array3D.prototype.val = function (i, j, k) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j, k)];
                }
            });
        });
    };
    Array3D.prototype.add = function (value, i, j, k) {
        this.getValues()[this.stride0 * i + this.stride1 * j + k] += value;
    };
    Array3D.prototype.locToIndex = function (locs) {
        return this.stride0 * locs[0] + this.stride1 * locs[1] + locs[2];
    };
    Array3D.prototype.indexToLoc = function (index) {
        var i = Math.floor(index / this.stride0);
        index -= i * this.stride0;
        return [i, Math.floor(index / this.stride1), index % this.stride1];
    };
    Array3D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array3D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array3D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array3D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array3D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array3D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array3D;
}(NDArray));
exports.Array3D = Array3D;
var Array4D = (function (_super) {
    __extends(Array4D, _super);
    function Array4D(shape, dtype, values, id, math) {
        var _this = this;
        util.assert(shape.length === 4, 'Shape should be of length 4');
        _this = _super.call(this, shape, dtype, values, id, math) || this;
        _this.stride0 = _this.strides[0];
        _this.stride1 = _this.strides[1];
        _this.stride2 = _this.strides[2];
        return _this;
    }
    Array4D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array4D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array4D(shape, dtype, toTypedArray(values, dtype));
    };
    Array4D.prototype.get = function (i, j, k, l) {
        return this.getValues()[this.stride0 * i + this.stride1 * j + this.stride2 * k + l];
    };
    Array4D.prototype.val = function (i, j, k, l) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j, k, l)];
                }
            });
        });
    };
    Array4D.prototype.add = function (value, i, j, k, l) {
        this.getValues()[this.stride0 * i + this.stride1 * j + this.stride2 * k + l] += value;
    };
    Array4D.prototype.locToIndex = function (locs) {
        return this.stride0 * locs[0] + this.stride1 * locs[1] +
            this.stride2 * locs[2] + locs[3];
    };
    Array4D.prototype.indexToLoc = function (index) {
        var i = Math.floor(index / this.stride0);
        index -= i * this.stride0;
        var j = Math.floor(index / this.stride1);
        index -= j * this.stride1;
        return [i, j, Math.floor(index / this.stride2), index % this.stride2];
    };
    Array4D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array4D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array4D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array4D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array4D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array4D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array4D;
}(NDArray));
exports.Array4D = Array4D;
function copyTypedArray(array, dtype) {
    if (dtype == null || dtype === 'float32') {
        return new Float32Array(array);
    }
    else if (dtype === 'int32') {
        var vals = new Int32Array(array.length);
        for (var i = 0; i < vals.length; ++i) {
            var val = array[i];
            if (util.isValNaN(val, 'int32')) {
                vals[i] = util.getNaN('int32');
            }
            else {
                vals[i] = val;
            }
        }
        return vals;
    }
    else if (dtype === 'bool') {
        var bool = new Uint8Array(array.length);
        for (var i = 0; i < bool.length; ++i) {
            var val = array[i];
            if (util.isValNaN(val, 'bool')) {
                bool[i] = util.getNaN('bool');
            }
            else if (Math.round(val) !== 0) {
                bool[i] = 1;
            }
        }
        return bool;
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
}
function instanceofTypedArray(a) {
    return a instanceof Float32Array || a instanceof Int32Array ||
        a instanceof Uint8Array;
}
function noConversionNeeded(a, dtype) {
    return (a instanceof Float32Array && dtype === 'float32') ||
        (a instanceof Int32Array && dtype === 'int32') ||
        (a instanceof Uint8Array && dtype === 'bool');
}
function toTypedArray(a, dtype) {
    if (noConversionNeeded(a, dtype)) {
        return a;
    }
    if (Array.isArray(a)) {
        a = util.flatten(a);
    }
    return copyTypedArray(a, dtype);
}
function makeZerosTypedArray(size, dtype) {
    if (dtype == null || dtype === 'float32') {
        return new Float32Array(size);
    }
    else if (dtype === 'int32') {
        return new Int32Array(size);
    }
    else if (dtype === 'bool') {
        return new Uint8Array(size);
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
}
function makeOnesTypedArray(size, dtype) {
    var array = makeZerosTypedArray(size, dtype);
    for (var i = 0; i < array.length; i++) {
        array[i] = 1;
    }
    return array;
}

},{"../environment":16,"../util":18,"./rand":51}],50:[function(require,module,exports) {
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
var TensorArrayMapBase = (function () {
    function TensorArrayMapBase() {
        this.dict = {};
    }
    TensorArrayMapBase.prototype.get = function (tensor, skipChecks) {
        if (skipChecks === void 0) { skipChecks = false; }
        if (!skipChecks && this.dict[tensor.id] === undefined) {
            throw new Error("tensor " + tensor.id + " not in array map.");
        }
        var nda = this.dict[tensor.id];
        if (!skipChecks && nda === null) {
            throw new Error("tensor " + tensor.id + " has null array.");
        }
        return nda;
    };
    TensorArrayMapBase.prototype.delete = function (tensor) {
        delete this.dict[tensor.id];
    };
    TensorArrayMapBase.prototype.nullify = function (tensor) {
        this.dict[tensor.id] = null;
    };
    TensorArrayMapBase.prototype.disposeArray = function (tensor) {
        if (this.dict[tensor.id] === undefined) {
            return;
        }
        var nda = this.dict[tensor.id];
        if (nda === null) {
            return;
        }
        nda.dispose();
        this.dict[tensor.id] = null;
    };
    TensorArrayMapBase.prototype.size = function () {
        return Object.keys(this.dict).length;
    };
    TensorArrayMapBase.prototype.dispose = function () {
        var _this = this;
        Object.keys(this.dict).forEach(function (tensorID) {
            var nda = _this.dict[+tensorID];
            if (nda) {
                nda.dispose();
            }
        });
        this.dict = {};
    };
    TensorArrayMapBase.prototype.hasNullArray = function (tensor) {
        if (this.dict[tensor.id] === undefined) {
            throw new Error("tensor " + tensor.id + " not in array map.");
        }
        return this.dict[tensor.id] === null;
    };
    return TensorArrayMapBase;
}());
exports.TensorArrayMapBase = TensorArrayMapBase;
var TensorArrayMap = (function (_super) {
    __extends(TensorArrayMap, _super);
    function TensorArrayMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TensorArrayMap.prototype.set = function (tensor, array) {
        this.dict[tensor.id] = array;
    };
    return TensorArrayMap;
}(TensorArrayMapBase));
exports.TensorArrayMap = TensorArrayMap;
var SummedTensorArrayMap = (function (_super) {
    __extends(SummedTensorArrayMap, _super);
    function SummedTensorArrayMap(math) {
        var _this = _super.call(this) || this;
        _this.math = math;
        return _this;
    }
    SummedTensorArrayMap.prototype.add = function (tensor, array) {
        if (this.dict[tensor.id] == null) {
            this.dict[tensor.id] = this.math.keep(array);
        }
        else {
            var oldValue = this.get(tensor);
            var newValue = this.math.keep(this.math.addStrict(oldValue, array));
            this.dict[tensor.id] = newValue;
            oldValue.dispose();
        }
    };
    return SummedTensorArrayMap;
}(TensorArrayMapBase));
exports.SummedTensorArrayMap = SummedTensorArrayMap;

},{}],21:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("./math/ndarray");
var VarianceScalingInitializer = (function () {
    function VarianceScalingInitializer(scale, mode, distribution) {
        if (scale === void 0) { scale = 1.0; }
        if (mode === void 0) { mode = 'fan_in'; }
        if (distribution === void 0) { distribution = 'normal'; }
        this.scale = scale;
        this.mode = mode;
        this.distribution = distribution;
    }
    VarianceScalingInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        var n = 0;
        if (this.mode === 'fan_in') {
            n = inputUnits;
        }
        else if (this.mode === 'fan_out') {
            n = outputUnits;
        }
        else if (this.mode === 'fan_avg') {
            n = (inputUnits + outputUnits) / 2;
        }
        else {
            throw new Error("Unexpected mode for variance scaling initializer: " + this.mode);
        }
        if (this.distribution === 'normal') {
            return ndarray_1.NDArray.randTruncatedNormal(weightsShape, 0.0, Math.sqrt(this.scale / n));
        }
        else if (this.distribution === 'uniform') {
            return ndarray_1.NDArray.randUniform(weightsShape, 0.0, Math.sqrt(3 * this.scale / n));
        }
        else {
            throw new Error("Unexpected distribution for variance scaling initializer: " +
                ("" + this.distribution));
        }
    };
    return VarianceScalingInitializer;
}());
exports.VarianceScalingInitializer = VarianceScalingInitializer;
var ZerosInitializer = (function () {
    function ZerosInitializer() {
    }
    ZerosInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.zeros(weightsShape);
    };
    return ZerosInitializer;
}());
exports.ZerosInitializer = ZerosInitializer;
var OnesInitializer = (function () {
    function OnesInitializer() {
    }
    OnesInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        var values = ndarray_1.NDArray.zeros(weightsShape);
        values.fill(1);
        return values;
    };
    return OnesInitializer;
}());
exports.OnesInitializer = OnesInitializer;
var ConstantInitializer = (function () {
    function ConstantInitializer(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
    }
    ConstantInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        var values = ndarray_1.NDArray.zeros(weightsShape);
        values.fill(this.value);
        return values;
    };
    return ConstantInitializer;
}());
exports.ConstantInitializer = ConstantInitializer;
var NDArrayInitializer = (function () {
    function NDArrayInitializer(ndarray) {
        this.ndarray = ndarray;
    }
    NDArrayInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return this.ndarray;
    };
    return NDArrayInitializer;
}());
exports.NDArrayInitializer = NDArrayInitializer;
var RandomNormalInitializer = (function () {
    function RandomNormalInitializer(mean, stdev) {
        if (mean === void 0) { mean = 0; }
        if (stdev === void 0) { stdev = .05; }
        this.mean = mean;
        this.stdev = stdev;
    }
    RandomNormalInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.randNormal(weightsShape, this.mean, this.stdev);
    };
    return RandomNormalInitializer;
}());
exports.RandomNormalInitializer = RandomNormalInitializer;
var RandomTruncatedNormalInitializer = (function () {
    function RandomTruncatedNormalInitializer(mean, stdev) {
        if (mean === void 0) { mean = 0; }
        if (stdev === void 0) { stdev = .05; }
        this.mean = mean;
        this.stdev = stdev;
    }
    RandomTruncatedNormalInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.randTruncatedNormal(weightsShape, this.mean, this.stdev);
    };
    return RandomTruncatedNormalInitializer;
}());
exports.RandomTruncatedNormalInitializer = RandomTruncatedNormalInitializer;
var RandomUniformInitializer = (function () {
    function RandomUniformInitializer(minval, maxval) {
        if (minval === void 0) { minval = -.05; }
        if (maxval === void 0) { maxval = .05; }
        this.minval = minval;
        this.maxval = maxval;
    }
    RandomUniformInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.randUniform(weightsShape, this.minval, this.maxval);
    };
    return RandomUniformInitializer;
}());
exports.RandomUniformInitializer = RandomUniformInitializer;

},{"./math/ndarray":30}],27:[function(require,module,exports) {
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
var initializers_1 = require("../initializers");
var concat_util = require("../math/concat_util");
var conv_util = require("../math/conv_util");
var ndarray_1 = require("../math/ndarray");
var util = require("../util");
var GraphLayers = (function () {
    function GraphLayers(g) {
        this.g = g;
    }
    GraphLayers.prototype.dense = function (name, x, units, activation, useBias, kernelInitializer, biasInitializer) {
        if (activation === void 0) { activation = null; }
        if (useBias === void 0) { useBias = true; }
        if (kernelInitializer === void 0) { kernelInitializer = new initializers_1.VarianceScalingInitializer(); }
        if (biasInitializer === void 0) { biasInitializer = new initializers_1.ZerosInitializer(); }
        var weights = this.g.variable(name + '-weights', kernelInitializer.initialize([x.shape[0], units], x.shape[0], units));
        var out = this.g.matmul(x, weights);
        if (useBias) {
            var bias = this.g.variable(name + '-bias', biasInitializer.initialize([units], x.shape[0], units));
            out = this.g.add(out, bias);
        }
        if (activation != null) {
            out = activation(out);
        }
        return out;
    };
    return GraphLayers;
}());
exports.GraphLayers = GraphLayers;
var Graph = (function () {
    function Graph() {
        this.nodes = [];
        this.layers = new GraphLayers(this);
    }
    Graph.prototype.variable = function (name, data) {
        return this.addNodeAndReturnOutput(new VariableNode(this, name, data));
    };
    Graph.prototype.placeholder = function (name, shape) {
        return this.addNodeAndReturnOutput(new PlaceholderNode(this, name, shape));
    };
    Graph.prototype.constant = function (value) {
        var finalValue;
        if (typeof value === 'number') {
            finalValue = ndarray_1.Scalar.new(value);
        }
        else if (value instanceof ndarray_1.NDArray) {
            finalValue = value;
        }
        else if (value instanceof Array) {
            var flatValues = util.flatten(value);
            var vals = new Float32Array(flatValues);
            finalValue = ndarray_1.NDArray.make(util.inferShape(value), { values: vals });
        }
        else {
            throw new Error('unimplemented constant type.');
        }
        return this.addNodeAndReturnOutput(new ConstantNode(this, finalValue));
    };
    Graph.prototype.reshape = function (x, shape) {
        return this.addNodeAndReturnOutput(new ReshapeNode(this, 'Reshape', x, shape));
    };
    Graph.prototype.fusedLinearCombination = function (x1, x2, c1, c2) {
        return this.addNodeAndReturnOutput(new FusedLinearCombinationNode(this, x1, x2, c1, c2));
    };
    Graph.prototype.add = function (x1, x2) {
        return this.addNodeAndReturnOutput(new AddNode(this, x1, x2));
    };
    Graph.prototype.subtract = function (x1, x2) {
        return this.addNodeAndReturnOutput(new SubtractNode(this, x1, x2));
    };
    Graph.prototype.multiply = function (x1, x2) {
        return this.addNodeAndReturnOutput(new MultiplyNode(this, x1, x2));
    };
    Graph.prototype.divide = function (x1, x2) {
        return this.addNodeAndReturnOutput(new DivideNode(this, x1, x2));
    };
    Graph.prototype.reduceSum = function (x) {
        return this.addNodeAndReturnOutput(new ReduceSumNode(this, x));
    };
    Graph.prototype.concat3d = function (x1, x2, axis) {
        return this.addNodeAndReturnOutput(new Concat3DNode(this, x1, x2, axis));
    };
    Graph.prototype.matmul = function (x1, x2) {
        return this.addNodeAndReturnOutput(new MatMulNode(this, x1, x2));
    };
    Graph.prototype.conv2d = function (x, w, b, fieldSize, outputDepth, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        return this.addNodeAndReturnOutput(new Convolution2DNode(this, x, w, b, fieldSize, outputDepth, stride, zeroPad));
    };
    Graph.prototype.maxPool = function (x, fieldSize, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        return this.addNodeAndReturnOutput(new MaxPoolNode(this, x, fieldSize, stride, zeroPad));
    };
    Graph.prototype.exp = function (x) {
        return this.addNodeAndReturnOutput(new ExpNode(this, x));
    };
    Graph.prototype.log = function (x) {
        return this.addNodeAndReturnOutput(new LogNode(this, x));
    };
    Graph.prototype.relu = function (x) {
        return this.addNodeAndReturnOutput(new ReLUNode(this, x));
    };
    Graph.prototype.leakyRelu = function (x, alpha) {
        return this.addNodeAndReturnOutput(new LeakyReLUNode(this, x, alpha));
    };
    Graph.prototype.prelu = function (x, alpha) {
        return this.addNodeAndReturnOutput(new PReLUNode(this, x, alpha));
    };
    Graph.prototype.elu = function (x) {
        return this.addNodeAndReturnOutput(new EluNode(this, x));
    };
    Graph.prototype.tanh = function (x) {
        return this.addNodeAndReturnOutput(new TanHNode(this, x));
    };
    Graph.prototype.sigmoid = function (x) {
        return this.addNodeAndReturnOutput(new SigmoidNode(this, x));
    };
    Graph.prototype.square = function (x) {
        return this.addNodeAndReturnOutput(new SquareNode(this, x));
    };
    Graph.prototype.softmax = function (x) {
        return this.addNodeAndReturnOutput(new SoftmaxNode(this, x));
    };
    Graph.prototype.softmaxCrossEntropyCost = function (x, target) {
        return this.addNodeAndReturnOutput(new SoftmaxCrossEntropyCostNode(this, x, target));
    };
    Graph.prototype.meanSquaredCost = function (label, prediction) {
        return this.addNodeAndReturnOutput(new MeanSquaredCostNode(this, label, prediction));
    };
    Graph.prototype.argmax = function (x) {
        return this.addNodeAndReturnOutput(new ArgMaxNode(this, x));
    };
    Graph.prototype.argmaxEquals = function (x1, x2) {
        return this.addNodeAndReturnOutput(new ArgMaxEqualsNode(this, x1, x2));
    };
    Graph.prototype.addNodeAndReturnOutput = function (node) {
        this.nodes.push(node);
        node.validate();
        return node.output;
    };
    Graph.prototype.getNodes = function () {
        return this.nodes;
    };
    return Graph;
}());
exports.Graph = Graph;
var Tensor = (function () {
    function Tensor(shape) {
        this.shape = shape;
        this.id = Tensor.nextID++;
    }
    Tensor.nextID = 0;
    return Tensor;
}());
exports.Tensor = Tensor;
var Node = (function () {
    function Node(graph, name, inputs, output) {
        this.graph = graph;
        this.name = name;
        this.inputs = inputs;
        this.output = output;
        this.id = Node.nextID++;
        output.node = this;
    }
    Node.nextID = 0;
    return Node;
}());
exports.Node = Node;
var VariableNode = (function (_super) {
    __extends(VariableNode, _super);
    function VariableNode(graph, name, data) {
        var _this = _super.call(this, graph, name, {}, new Tensor(data.shape)) || this;
        _this.data = data;
        return _this;
    }
    VariableNode.prototype.validate = function () {
        util.assert(this.data != null, 'Error adding variable op: Data for variable \'' + this.name +
            '\' is null or undefined');
    };
    return VariableNode;
}(Node));
exports.VariableNode = VariableNode;
var PlaceholderNode = (function (_super) {
    __extends(PlaceholderNode, _super);
    function PlaceholderNode(graph, name, shape) {
        return _super.call(this, graph, name, {}, new Tensor(shape)) || this;
    }
    PlaceholderNode.prototype.validate = function () { };
    return PlaceholderNode;
}(Node));
exports.PlaceholderNode = PlaceholderNode;
var ConstantNode = (function (_super) {
    __extends(ConstantNode, _super);
    function ConstantNode(graph, data) {
        var _this = _super.call(this, graph, 'Constant', {}, new Tensor(data.shape)) || this;
        _this.data = data;
        return _this;
    }
    ConstantNode.prototype.validate = function () {
        util.assert(this.data != null, 'Error adding constant: data for placeholder \'' + this.name +
            '\' is null or undefined');
    };
    return ConstantNode;
}(Node));
exports.ConstantNode = ConstantNode;
var ReshapeNode = (function (_super) {
    __extends(ReshapeNode, _super);
    function ReshapeNode(graph, name, x, shape) {
        var _this = _super.call(this, graph, name, { x: x }, new Tensor(shape)) || this;
        _this.name = name;
        _this.x = x;
        _this.shape = shape;
        return _this;
    }
    ReshapeNode.prototype.validate = function () {
        var xSize = util.sizeFromShape(this.x.shape);
        var shapeSize = util.sizeFromShape(this.shape);
        util.assert(xSize === shapeSize, "Error making reshape operation: input to reshape '" + this.name + "'" +
            (" of shape (" + this.x.shape + ") does not match size of ") +
            ("requested shape " + this.shape + "."));
    };
    ReshapeNode.X = 'x';
    return ReshapeNode;
}(Node));
exports.ReshapeNode = ReshapeNode;
var FusedLinearCombinationNode = (function (_super) {
    __extends(FusedLinearCombinationNode, _super);
    function FusedLinearCombinationNode(graph, t1, t2, c1, c2) {
        var _this = _super.call(this, graph, 'Linear Combination', { t1: t1, t2: t2, c1: c1, c2: c2 }, new Tensor(t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        _this.c1 = c1;
        _this.c2 = c2;
        return _this;
    }
    FusedLinearCombinationNode.prototype.validate = function () {
        util.assertShapesMatch(this.t1.shape, this.t2.shape);
        if (!util.isScalarShape(this.c1.shape)) {
            throw new Error('Error adding fusedLinearCombination: c1 is not a scalar, got ' +
                ("shape: " + this.c1.shape));
        }
        if (!util.isScalarShape(this.c2.shape)) {
            throw new Error('Error adding fusedLinearCombination: c2 is not a scalar, got ' +
                ("shape: " + this.c2.shape));
        }
    };
    FusedLinearCombinationNode.T1 = 't1';
    FusedLinearCombinationNode.T2 = 't2';
    FusedLinearCombinationNode.C1 = 'c1';
    FusedLinearCombinationNode.C2 = 'c2';
    return FusedLinearCombinationNode;
}(Node));
exports.FusedLinearCombinationNode = FusedLinearCombinationNode;
var AddNode = (function (_super) {
    __extends(AddNode, _super);
    function AddNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Add', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1
            ? t2.shape
            : (t1.shape.length < t2.shape.length ? t2.shape : t1.shape))) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    AddNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape) ||
            (this.t1.shape.length === 2 && this.t2.shape.length === 1 &&
                this.t1.shape[1] === this.t2.shape[0]) ||
            (this.t1.shape.length === 1 && this.t2.shape.length === 2 &&
                this.t1.shape[0] === this.t2.shape[1]), 'Error adding add operation op: one of inputs must be scalar, ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match,") +
            'or one of them can be broadcasted (2D and 1D).');
    };
    AddNode.T1 = 't1';
    AddNode.T2 = 't2';
    return AddNode;
}(Node));
exports.AddNode = AddNode;
var SubtractNode = (function (_super) {
    __extends(SubtractNode, _super);
    function SubtractNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Subtract', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1 ? t2.shape : t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    SubtractNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape), 'Error adding subtract op: one of inputs must be scalar or the ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match."));
    };
    SubtractNode.T1 = 't1';
    SubtractNode.T2 = 't2';
    return SubtractNode;
}(Node));
exports.SubtractNode = SubtractNode;
var MultiplyNode = (function (_super) {
    __extends(MultiplyNode, _super);
    function MultiplyNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Multiply', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1 ? t2.shape : t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    MultiplyNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape), 'Error adding multiply op: one of inputs must be scalar or the ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match."));
    };
    MultiplyNode.T1 = 't1';
    MultiplyNode.T2 = 't2';
    return MultiplyNode;
}(Node));
exports.MultiplyNode = MultiplyNode;
var DivideNode = (function (_super) {
    __extends(DivideNode, _super);
    function DivideNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Divide', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1 ? t2.shape : t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    DivideNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape), 'Error adding divide op: one of inputs must be scalar or the ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match."));
    };
    DivideNode.T1 = 't1';
    DivideNode.T2 = 't2';
    return DivideNode;
}(Node));
exports.DivideNode = DivideNode;
var ReduceSumNode = (function (_super) {
    __extends(ReduceSumNode, _super);
    function ReduceSumNode(graph, x) {
        return _super.call(this, graph, 'ReduceSum', { x: x }, new Tensor([])) || this;
    }
    ReduceSumNode.prototype.validate = function () { };
    ReduceSumNode.X = 'x';
    return ReduceSumNode;
}(Node));
exports.ReduceSumNode = ReduceSumNode;
var Concat3DNode = (function (_super) {
    __extends(Concat3DNode, _super);
    function Concat3DNode(graph, x1, x2, axis) {
        var _this = _super.call(this, graph, 'Concat3D', { x1: x1, x2: x2 }, new Tensor(concat_util.computeOutShape(x1.shape, x2.shape, axis))) || this;
        _this.x1 = x1;
        _this.x2 = x2;
        _this.axis = axis;
        return _this;
    }
    Concat3DNode.prototype.validate = function () {
        concat_util.assertParams(this.x1.shape, this.x2.shape, this.axis);
    };
    Concat3DNode.X1 = 'x1';
    Concat3DNode.X2 = 'x2';
    Concat3DNode.AXIS = 'axis';
    return Concat3DNode;
}(Node));
exports.Concat3DNode = Concat3DNode;
function getMatMulOutputShape(x1Shape, x2Shape) {
    if (x1Shape.length === 1 && x2Shape.length === 1) {
        return [1];
    }
    else if (x1Shape.length === 1 && x2Shape.length === 2) {
        return [x2Shape[1]];
    }
    else if (x1Shape.length === 2 && x2Shape.length === 1) {
        return [x1Shape[0]];
    }
    return [x1Shape[0], x2Shape[1]];
}
var MatMulNode = (function (_super) {
    __extends(MatMulNode, _super);
    function MatMulNode(graph, x1, x2) {
        var _this = _super.call(this, graph, 'MatMul', { x1: x1, x2: x2 }, new Tensor(getMatMulOutputShape(x1.shape, x2.shape))) || this;
        _this.x1 = x1;
        _this.x2 = x2;
        return _this;
    }
    MatMulNode.prototype.validate = function () {
        if (this.x1.shape.length === 2 && this.x2.shape.length === 2) {
            util.assert(this.x1.shape[1] === this.x2.shape[0], 'Error adding matmul op: inner shapes of matrices with shapes ' +
                (this.x1.shape + " and " + this.x2.shape + " must match."));
        }
        else if (this.x1.shape.length === 2 && this.x2.shape.length === 1) {
            util.assert(this.x1.shape[1] === this.x2.shape[0], 'Error adding matmul op: second dimension of matrix with shape ' +
                this.x1.shape.toString() +
                (" must match size of vector with shape " + this.x2.shape + "."));
        }
        else if (this.x1.shape.length === 1 && this.x2.shape.length === 2) {
            util.assert(this.x1.shape[0] === this.x2.shape[0], "Error adding matmul op: size of vector with shape " + this.x1.shape +
                " must match first dimension of matrix with " +
                ("shape " + this.x2.shape + "."));
        }
        else {
            throw new Error('Error adding matmul op: inputs must be vectors or matrices.');
        }
    };
    MatMulNode.X1 = 'x1';
    MatMulNode.X2 = 'x2';
    return MatMulNode;
}(Node));
exports.MatMulNode = MatMulNode;
var Convolution2DNode = (function (_super) {
    __extends(Convolution2DNode, _super);
    function Convolution2DNode(graph, x, w, b, fieldSize, outputDepth, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this, graph, 'Convolution 2D', { x: x, w: w, b: b }, new Tensor(conv_util.computeOutputShape3D(x.shape, fieldSize, outputDepth, stride, zeroPad))) || this;
        _this.x = x;
        _this.w = w;
        _this.b = b;
        _this.fieldSize = fieldSize;
        _this.outputDepth = outputDepth;
        _this.stride = stride;
        _this.zeroPad = zeroPad;
        return _this;
    }
    Convolution2DNode.prototype.validate = function () {
        util.assert(this.x.shape.length === 3, 'Error adding conv2d op: input must be of rank 3, but got shape: ' +
            (this.x.shape + "."));
        util.assert(this.w.shape.length === 4, 'Error adding conv2d op: weights must be of rank 4, but got shape: ' +
            (this.w.shape + "."));
        util.assert(this.b.shape.length === 1, 'Error adding conv2d op: biases must be of rank 1, but got shape: ' +
            (this.b.shape + "."));
        util.assert(this.x.shape[2] === this.w.shape[2], "Error adding conv2d op: depth of input (" + this.x.shape[2] + ") " +
            ("must match input depth for weights (" + this.w.shape[2] + ")."));
    };
    Convolution2DNode.X = 'x';
    Convolution2DNode.W = 'w';
    Convolution2DNode.B = 'b';
    return Convolution2DNode;
}(Node));
exports.Convolution2DNode = Convolution2DNode;
var MaxPoolNode = (function (_super) {
    __extends(MaxPoolNode, _super);
    function MaxPoolNode(graph, x, fieldSize, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this, graph, 'Max pool', { x: x }, new Tensor(conv_util.computeOutputShape3D(x.shape, fieldSize, x.shape[2], stride, zeroPad))) || this;
        _this.x = x;
        _this.fieldSize = fieldSize;
        _this.stride = stride;
        _this.zeroPad = zeroPad;
        return _this;
    }
    MaxPoolNode.prototype.validate = function () {
        util.assert(this.x.shape.length === 3, 'Error adding maxPool op: input must be of rank 3, but got shape: ' +
            (this.x.shape + "."));
    };
    MaxPoolNode.X = 'x';
    return MaxPoolNode;
}(Node));
exports.MaxPoolNode = MaxPoolNode;
var ReLUNode = (function (_super) {
    __extends(ReLUNode, _super);
    function ReLUNode(graph, x) {
        return _super.call(this, graph, 'ReLU', { x: x }, new Tensor(x.shape)) || this;
    }
    ReLUNode.prototype.validate = function () { };
    ReLUNode.X = 'x';
    return ReLUNode;
}(Node));
exports.ReLUNode = ReLUNode;
var LeakyReLUNode = (function (_super) {
    __extends(LeakyReLUNode, _super);
    function LeakyReLUNode(graph, x, alpha) {
        var _this = _super.call(this, graph, 'LeakyReLU', { x: x }, new Tensor(x.shape)) || this;
        _this.alpha = alpha;
        return _this;
    }
    LeakyReLUNode.prototype.validate = function () { };
    LeakyReLUNode.X = 'x';
    return LeakyReLUNode;
}(Node));
exports.LeakyReLUNode = LeakyReLUNode;
var PReLUNode = (function (_super) {
    __extends(PReLUNode, _super);
    function PReLUNode(graph, x, alpha) {
        var _this = _super.call(this, graph, 'PReLU', { x: x, alpha: alpha }, new Tensor(x.shape)) || this;
        _this.x = x;
        _this.alpha = alpha;
        return _this;
    }
    PReLUNode.prototype.validate = function () {
        util.assert(util.arraysEqual(this.x.shape, this.alpha.shape), 'Error adding pRelu op: the ' +
            ("shapes x: " + this.x.shape + " and alpha: " + this.alpha.shape + " must match."));
    };
    PReLUNode.X = 'x';
    PReLUNode.ALPHA = 'alpha';
    return PReLUNode;
}(Node));
exports.PReLUNode = PReLUNode;
var EluNode = (function (_super) {
    __extends(EluNode, _super);
    function EluNode(graph, x) {
        return _super.call(this, graph, 'Elu', { x: x }, new Tensor(x.shape)) || this;
    }
    EluNode.prototype.validate = function () { };
    EluNode.X = 'x';
    return EluNode;
}(Node));
exports.EluNode = EluNode;
var ExpNode = (function (_super) {
    __extends(ExpNode, _super);
    function ExpNode(graph, x) {
        return _super.call(this, graph, 'Exp', { x: x }, new Tensor(x.shape)) || this;
    }
    ExpNode.prototype.validate = function () { };
    ExpNode.X = 'x';
    return ExpNode;
}(Node));
exports.ExpNode = ExpNode;
var LogNode = (function (_super) {
    __extends(LogNode, _super);
    function LogNode(graph, x) {
        return _super.call(this, graph, 'Log', { x: x }, new Tensor(x.shape)) || this;
    }
    LogNode.prototype.validate = function () { };
    LogNode.X = 'x';
    return LogNode;
}(Node));
exports.LogNode = LogNode;
var TanHNode = (function (_super) {
    __extends(TanHNode, _super);
    function TanHNode(graph, x) {
        return _super.call(this, graph, 'TanH', { x: x }, new Tensor(x.shape)) || this;
    }
    TanHNode.prototype.validate = function () { };
    TanHNode.X = 'x';
    return TanHNode;
}(Node));
exports.TanHNode = TanHNode;
var SigmoidNode = (function (_super) {
    __extends(SigmoidNode, _super);
    function SigmoidNode(graph, x) {
        return _super.call(this, graph, 'Sigmoid', { x: x }, new Tensor(x.shape)) || this;
    }
    SigmoidNode.prototype.validate = function () { };
    SigmoidNode.X = 'x';
    return SigmoidNode;
}(Node));
exports.SigmoidNode = SigmoidNode;
var SquareNode = (function (_super) {
    __extends(SquareNode, _super);
    function SquareNode(graph, x) {
        return _super.call(this, graph, 'Square', { x: x }, new Tensor(x.shape)) || this;
    }
    SquareNode.prototype.validate = function () { };
    SquareNode.X = 'x';
    return SquareNode;
}(Node));
exports.SquareNode = SquareNode;
var SoftmaxCrossEntropyCostNode = (function (_super) {
    __extends(SoftmaxCrossEntropyCostNode, _super);
    function SoftmaxCrossEntropyCostNode(graph, x, target) {
        var _this = _super.call(this, graph, 'SoftmaxCrossEntropyCost', { x: x, target: target }, new Tensor([])) || this;
        _this.x = x;
        _this.target = target;
        return _this;
    }
    SoftmaxCrossEntropyCostNode.prototype.validate = function () {
        util.assert(util.arraysEqual(this.x.shape, this.target.shape), "Error adding softmaxCrossEntropyCost op: x shape (" + this.x.shape + ") " +
            ("must match target shape (" + this.target.shape + ")."));
    };
    SoftmaxCrossEntropyCostNode.X = 'x';
    SoftmaxCrossEntropyCostNode.TARGET = 'target';
    return SoftmaxCrossEntropyCostNode;
}(Node));
exports.SoftmaxCrossEntropyCostNode = SoftmaxCrossEntropyCostNode;
var SoftmaxNode = (function (_super) {
    __extends(SoftmaxNode, _super);
    function SoftmaxNode(graph, x) {
        var _this = _super.call(this, graph, 'Softmax', { x: x }, new Tensor(x.shape)) || this;
        _this.x = x;
        return _this;
    }
    SoftmaxNode.prototype.validate = function () {
        util.assert(this.x.shape.length === 1, 'The input to a softmax must be a 1-D tensor');
        util.assert(this.x.shape[0] >= 2, 'The input to a softmax must have at least 2 values');
    };
    SoftmaxNode.X = 'x';
    return SoftmaxNode;
}(Node));
exports.SoftmaxNode = SoftmaxNode;
var MeanSquaredCostNode = (function (_super) {
    __extends(MeanSquaredCostNode, _super);
    function MeanSquaredCostNode(graph, label, prediction) {
        var _this = _super.call(this, graph, 'Mean Squared Cost', { label: label, prediction: prediction }, new Tensor([])) || this;
        _this.label = label;
        _this.prediction = prediction;
        return _this;
    }
    MeanSquaredCostNode.prototype.validate = function () {
        util.assert(util.arraysEqual(this.label.shape, this.prediction.shape), "Error adding meanSquaredCost op: label shape (" + this.label.shape + ") " +
            ("must match prediction shape (" + this.prediction.shape + ")."));
    };
    MeanSquaredCostNode.LABEL = 'label';
    MeanSquaredCostNode.PREDICTION = 'prediction';
    return MeanSquaredCostNode;
}(Node));
exports.MeanSquaredCostNode = MeanSquaredCostNode;
var ArgMaxNode = (function (_super) {
    __extends(ArgMaxNode, _super);
    function ArgMaxNode(graph, x) {
        var _this = _super.call(this, graph, 'ArgMax', { x: x }, new Tensor([1])) || this;
        _this.x = x;
        return _this;
    }
    ArgMaxNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.x.shape) > 0, 'Error adding argmax op: input tensor must have at least one entry.');
    };
    ArgMaxNode.X = 'x';
    return ArgMaxNode;
}(Node));
exports.ArgMaxNode = ArgMaxNode;
var ArgMaxEqualsNode = (function (_super) {
    __extends(ArgMaxEqualsNode, _super);
    function ArgMaxEqualsNode(graph, x1, x2) {
        var _this = _super.call(this, graph, 'ArgMaxEquals', { x1: x1, x2: x2 }, new Tensor([1])) || this;
        _this.x1 = x1;
        _this.x2 = x2;
        return _this;
    }
    ArgMaxEqualsNode.prototype.validate = function () {
        util.assert(util.arraysEqual(this.x1.shape, this.x2.shape), "Error adding ArgMaxEquals op: x1 shape (" + this.x1.shape + ") " +
            ("must match x2 shape (" + this.x2.shape + ")."));
    };
    ArgMaxEqualsNode.X1 = 'x1';
    ArgMaxEqualsNode.X2 = 'x2';
    return ArgMaxEqualsNode;
}(Node));
exports.ArgMaxEqualsNode = ArgMaxEqualsNode;

},{"../initializers":21,"../util":18,"../math/concat_util":47,"../math/conv_util":23,"../math/ndarray":30}],103:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    else if (a < b) {
        return -1;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
var PriorityQueue = (function () {
    function PriorityQueue(comparator, indexObserver) {
        this.comparator = comparator;
        this.indexObserver = indexObserver;
        this.heap = [];
    }
    PriorityQueue.prototype.enqueue = function (t) {
        this.heap.push(t);
        this.onIndexChanged(t, this.heap.length - 1);
        this.siftUp(this.heap.length - 1);
    };
    PriorityQueue.prototype.dequeue = function () {
        if (this.empty()) {
            throw new Error('dequeue called on empty priority queue.');
        }
        var t = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.siftDown(0);
        return t;
    };
    PriorityQueue.prototype.update = function (newT, index) {
        var last = (index === this.heap.length - 1);
        if (!last) {
            this.swap(index, this.heap.length - 1);
        }
        this.heap.pop();
        if (!last) {
            if (this.siftUpIndex(index) !== -1) {
                this.siftUp(index);
            }
            else if (this.siftDownIndex(index) !== -1) {
                this.siftDown(index);
            }
        }
        this.enqueue(newT);
    };
    PriorityQueue.prototype.empty = function () {
        return this.heap.length === 0;
    };
    PriorityQueue.prototype.onIndexChanged = function (t, newIndex) {
        if (this.indexObserver) {
            this.indexObserver(t, newIndex);
        }
    };
    PriorityQueue.prototype.getParentIndex = function (index) {
        if (index === 0) {
            return -1;
        }
        return Math.floor((index - 1) / 2);
    };
    PriorityQueue.prototype.getLeftChildIndex = function (index) {
        var candidate = index * 2 + 1;
        return candidate < this.heap.length ? candidate : -1;
    };
    PriorityQueue.prototype.getRightChildIndex = function (index) {
        var candidate = index * 2 + 2;
        return candidate < this.heap.length ? candidate : -1;
    };
    PriorityQueue.prototype.siftUpIndex = function (index) {
        var parentIndex = this.getParentIndex(index);
        if (parentIndex === -1) {
            return -1;
        }
        if (this.compare(parentIndex, index) > 0) {
            return parentIndex;
        }
        return -1;
    };
    PriorityQueue.prototype.siftUp = function (index) {
        var siftIndex = this.siftUpIndex(index);
        while (siftIndex !== -1) {
            this.swap(index, siftIndex);
            index = siftIndex;
            siftIndex = this.siftUpIndex(index);
        }
    };
    PriorityQueue.prototype.siftDownIndex = function (index) {
        if (index >= this.heap.length) {
            return -1;
        }
        var largestChildIndex = index;
        var leftChildIndex = this.getLeftChildIndex(index);
        if ((leftChildIndex !== -1) &&
            (this.compare(leftChildIndex, largestChildIndex) < 0)) {
            largestChildIndex = leftChildIndex;
        }
        var rightChildIndex = this.getRightChildIndex(index);
        if ((rightChildIndex !== -1) &&
            (this.compare(rightChildIndex, largestChildIndex) < 0)) {
            largestChildIndex = rightChildIndex;
        }
        return (largestChildIndex === index) ? -1 : largestChildIndex;
    };
    PriorityQueue.prototype.siftDown = function (index) {
        var siftIndex = this.siftDownIndex(index);
        while (siftIndex !== -1) {
            this.swap(index, siftIndex);
            index = siftIndex;
            siftIndex = this.siftDownIndex(index);
        }
    };
    PriorityQueue.prototype.compare = function (aIndex, bIndex) {
        return this.comparator(this.heap[aIndex], this.heap[bIndex]);
    };
    PriorityQueue.prototype.swap = function (a, b) {
        var temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
        this.onIndexChanged(this.heap[a], a);
        this.onIndexChanged(this.heap[b], b);
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;

},{}],81:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = require("./graph");
var priority_queue = require("./priority_queue");
var priority_queue_1 = require("./priority_queue");
function getUnorderedEvaluationSet(nodes, terminatingNodes) {
    var terminatingNodeMap = {};
    var seen = {};
    var set = [];
    var visit = nodes.slice();
    terminatingNodes.forEach(function (node) { return terminatingNodeMap[node.id] = node; });
    var _loop_1 = function () {
        var cur = visit.pop();
        if (seen[cur.id] == null) {
            if (terminatingNodeMap[cur.id] == null) {
                Object.keys(cur.inputs)
                    .map(function (inputName) { return cur.inputs[inputName]; })
                    .forEach(function (input) { return visit.push(input.node); });
            }
            set.push(cur);
            seen[cur.id] = cur;
        }
    };
    while (visit.length !== 0) {
        _loop_1();
    }
    return set;
}
exports.getUnorderedEvaluationSet = getUnorderedEvaluationSet;
function getOrderedEvaluationSet(unorderedEvaluationSet) {
    var set = [];
    var nodeIndices = {};
    var pendingDependencies = {};
    var nodeQueue = new priority_queue_1.PriorityQueue(function (a, b) { return priority_queue.defaultCompare(pendingDependencies[a.id], pendingDependencies[b.id]); }, function (node, newIndex) { return nodeIndices[node.id] = newIndex; });
    unorderedEvaluationSet.forEach(function (node) { return pendingDependencies[node.id] = 0; });
    unorderedEvaluationSet.forEach(function (node) { return Object.keys(node.inputs)
        .map(function (key) { return node.inputs[key]; })
        .forEach(function (input) {
        if (unorderedEvaluationSet.indexOf(input.node) !== -1) {
            pendingDependencies[input.node.id]++;
        }
    }); });
    unorderedEvaluationSet.forEach(function (node) { return nodeQueue.enqueue(node); });
    while (!nodeQueue.empty()) {
        set.unshift(nodeQueue.dequeue());
        Object.keys(set[0].inputs).map(function (key) { return set[0].inputs[key]; }).forEach(function (input) {
            if (unorderedEvaluationSet.indexOf(input.node) === -1) {
                return;
            }
            pendingDependencies[input.node.id]--;
            nodeQueue.update(input.node, nodeIndices[input.node.id]);
        });
    }
    return set;
}
exports.getOrderedEvaluationSet = getOrderedEvaluationSet;
function isInputNode(node) {
    return Object.keys(node.inputs).length === 0;
}
exports.isInputNode = isInputNode;
function shouldBackProp(t) {
    return !(t.node instanceof graph_1.ConstantNode);
}
exports.shouldBackProp = shouldBackProp;
function isPassthroughNode(node, map) {
    var keys = Object.keys(node.inputs);
    for (var i = 0; i < keys.length; i++) {
        var input = node.inputs[keys[i]];
        if (map.get(input, true) === map.get(node.output, true)) {
            return true;
        }
    }
    return false;
}
exports.isPassthroughNode = isPassthroughNode;

},{"./graph":27,"./priority_queue":103}],49:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("../math/ndarray");
var util = require("../util");
var graph_1 = require("./graph");
var graph_util = require("./graph_util");
function getTerminatingNodesFromFeedDictionary(feedDictionary) {
    return Object.keys(feedDictionary.dict)
        .map(function (tensorID) { return feedDictionary.dict[+tensorID].tensor.node; });
}
exports.getTerminatingNodesFromFeedDictionary = getTerminatingNodesFromFeedDictionary;
function getOrderedEvaluationSetFromEvalTensor(evalTensors, feedDictionary) {
    var terminatingNodes = getTerminatingNodesFromFeedDictionary(feedDictionary);
    var evalNodes = evalTensors.map(function (x) { return x.node; });
    var unorderedEvaluationSet = graph_util.getUnorderedEvaluationSet(evalNodes, terminatingNodes);
    var orderedEvaluationSet = graph_util.getOrderedEvaluationSet(unorderedEvaluationSet);
    return orderedEvaluationSet;
}
exports.getOrderedEvaluationSetFromEvalTensor = getOrderedEvaluationSetFromEvalTensor;
function addPersistentArraysToTensorArrayMap(evaluationSet, tensorArrayMap) {
    evaluationSet.forEach(function (node) {
        if (node instanceof graph_1.VariableNode || node instanceof graph_1.ConstantNode) {
            tensorArrayMap.set(node.output, node.data);
        }
    });
}
exports.addPersistentArraysToTensorArrayMap = addPersistentArraysToTensorArrayMap;
function getVariableNodesFromEvaluationSet(evaluationSet) {
    var nodes = [];
    evaluationSet.forEach(function (node) {
        if (node instanceof graph_1.VariableNode) {
            nodes.push(node);
        }
    });
    return nodes;
}
exports.getVariableNodesFromEvaluationSet = getVariableNodesFromEvaluationSet;
function throwIfFeedDictionaryContainsNDArrays(feedDictionary) {
    Object.keys(feedDictionary.dict).forEach(function (tensorID) {
        if (feedDictionary.dict[+tensorID].data instanceof ndarray_1.NDArray) {
            throw new Error('training requires FeedDictionary entries to be InputProviders' +
                'and not NDArrays.');
        }
    });
}
exports.throwIfFeedDictionaryContainsNDArrays = throwIfFeedDictionaryContainsNDArrays;
function loadInputsFromFeedDictionaryToTensorArrayMap(batchFeed, activations, math) {
    Object.keys(batchFeed.dict).forEach(function (tensorID) {
        var feedEntry = batchFeed.dict[+tensorID];
        var data;
        if (feedEntry.data instanceof ndarray_1.NDArray) {
            data = feedEntry.data;
        }
        else {
            var provider = feedEntry.data;
            data = provider.getNextCopy(math);
        }
        util.assert(util.arraysEqual(feedEntry.tensor.shape, data.shape), "Error loading FeedEntry: feeding NDArray of shape " + data.shape + " " +
            ("does not match Tensor (id: " + feedEntry.tensor.id + ") shape: ") +
            (feedEntry.tensor.shape + "."));
        activations.set(feedEntry.tensor, data);
    });
}
exports.loadInputsFromFeedDictionaryToTensorArrayMap = loadInputsFromFeedDictionaryToTensorArrayMap;
function releaseFeedDictionaryInputsFromTensorArrayMap(batchFeed, activations, math) {
    Object.keys(batchFeed.dict).forEach(function (tensorID) {
        var feedEntry = batchFeed.dict[+tensorID];
        if (!(feedEntry.data instanceof ndarray_1.NDArray)) {
            var provider = feedEntry.data;
            var feedEntryArray = activations.get(feedEntry.tensor);
            provider.disposeCopy(math, feedEntryArray);
        }
        activations.delete(feedEntry.tensor);
    });
}
exports.releaseFeedDictionaryInputsFromTensorArrayMap = releaseFeedDictionaryInputsFromTensorArrayMap;
function removeFeedDictionaryNodesFromEvaluationSet(feedDictionary, evaluationSet) {
    var i = 0;
    while (i < evaluationSet.length) {
        var node = evaluationSet[i];
        if (feedDictionary.dict[node.output.id] != null) {
            evaluationSet.splice(i, 1);
        }
        else {
            ++i;
        }
    }
}
exports.removeFeedDictionaryNodesFromEvaluationSet = removeFeedDictionaryNodesFromEvaluationSet;
function disposeAndInitializeOperationOutputs(evaluationSet, tensorArrayMap) {
    evaluationSet.forEach(function (node) {
        if (!graph_util.isInputNode(node)) {
            if (!graph_util.isPassthroughNode(node, tensorArrayMap)) {
                tensorArrayMap.disposeArray(node.output);
            }
            tensorArrayMap.set(node.output, null);
        }
    });
}
exports.disposeAndInitializeOperationOutputs = disposeAndInitializeOperationOutputs;
function disposeAndInitializeOperationInputGradients(evaluationSet, gradients) {
    evaluationSet.forEach(function (node) {
        Object.keys(node.inputs).forEach(function (inputName) {
            var input = node.inputs[inputName];
            if (gradients.get(input, true) !== gradients.get(node.output, true)) {
                gradients.disposeArray(input);
            }
            gradients.nullify(input);
        });
    });
}
exports.disposeAndInitializeOperationInputGradients = disposeAndInitializeOperationInputGradients;
function disposeTransientOperationArrays(operations, activations, gradients) {
    operations.forEach(function (op) { return op.disposeTransientArrays(activations, gradients); });
}
exports.disposeTransientOperationArrays = disposeTransientOperationArrays;
function throwErrorIfEvaluationSetContainsPlaceholderNodes(evaluationSet) {
    evaluationSet.forEach(function (node) {
        if (node instanceof graph_1.PlaceholderNode) {
            var shape = '[' + node.output.shape.join(', ') + ']';
            throw new Error('Placeholder node "' + node.name + '" ' + shape +
                ' not present in feed dictionary.');
        }
    });
}
exports.throwErrorIfEvaluationSetContainsPlaceholderNodes = throwErrorIfEvaluationSetContainsPlaceholderNodes;

},{"../math/ndarray":30,"../util":18,"./graph":27,"./graph_util":81}],36:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../environment");
var ndarray_1 = require("../../math/ndarray");
var session_util = require("../session_util");
var tensor_array_map_1 = require("../tensor_array_map");
var Optimizer = (function () {
    function Optimizer(learningRate, specifiedVariableList) {
        this.learningRate = learningRate;
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
        if (specifiedVariableList != null) {
            this.specifiedVariableNodes = specifiedVariableList;
        }
        this.one = environment_1.ENV.math.keep(ndarray_1.Scalar.new(1));
    }
    Optimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        this.variableNodes = this.specifiedVariableNodes == null ?
            session_util.getVariableNodesFromEvaluationSet(runtime.nodes) :
            this.specifiedVariableNodes;
        if (batchSize !== this.prevBatchSize) {
            if (this.c != null) {
                this.c.dispose();
            }
            this.prevBatchSize = batchSize;
            this.c = math.keep(ndarray_1.Scalar.new(-this.learningRate / batchSize));
        }
        this.variableNodes.forEach(function (node) { return _this.variableGradients.set(node.output, math.keep(ndarray_1.NDArray.zeros(node.output.shape))); });
    };
    Optimizer.prototype.afterExample = function (math, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var gradient = gradientArrayMap.get(node.output);
                var accumulatedGradient = _this.variableGradients.get(node.output);
                _this.variableGradients.set(node.output, keep(math.add(gradient, accumulatedGradient)));
                accumulatedGradient.dispose();
            });
        });
    };
    Optimizer.prototype.dispose = function () {
        if (this.c != null) {
            this.c.dispose();
        }
        this.one.dispose();
        this.variableNodes.forEach(function (node) {
            node.data.dispose();
        });
        this.specifiedVariableNodes.forEach(function (node) {
            node.data.dispose();
        });
    };
    return Optimizer;
}());
exports.Optimizer = Optimizer;

},{"../../environment":16,"../../math/ndarray":30,"../session_util":49,"../tensor_array_map":50}],38:[function(require,module,exports) {
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
var tensor_array_map_1 = require("../tensor_array_map");
var optimizer_1 = require("./optimizer");
var SGDOptimizer = (function (_super) {
    __extends(SGDOptimizer, _super);
    function SGDOptimizer(learningRate, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        return _this;
    }
    SGDOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var variable = math.scaledArrayAdd(_this.c, gradient, _this.one, oldVariable);
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    SGDOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    SGDOptimizer.prototype.setLearningRate = function (learningRate) {
        this.learningRate = learningRate;
    };
    return SGDOptimizer;
}(optimizer_1.Optimizer));
exports.SGDOptimizer = SGDOptimizer;

},{"../tensor_array_map":50,"./optimizer":36}],33:[function(require,module,exports) {
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
var ndarray_1 = require("../../math/ndarray");
var tensor_array_map_1 = require("../tensor_array_map");
var optimizer_1 = require("./optimizer");
var AdamOptimizer = (function (_super) {
    __extends(AdamOptimizer, _super);
    function AdamOptimizer(learningRate, beta1, beta2, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.beta1 = beta1;
        _this.beta2 = beta2;
        _this.firstMoment = new tensor_array_map_1.TensorArrayMap();
        _this.secondMoment = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-8);
        _this.b1 = ndarray_1.Scalar.new(_this.beta1);
        _this.b2 = ndarray_1.Scalar.new(_this.beta2);
        _this.accB1 = ndarray_1.Scalar.new(_this.beta1);
        _this.accB2 = ndarray_1.Scalar.new(_this.beta2);
        return _this;
    }
    AdamOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.firstMoment.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.firstMoment.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
        if (this.secondMoment.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.secondMoment.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdamOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldFirstMoment = _this.firstMoment.get(node.output);
                var oldSecondMoment = _this.secondMoment.get(node.output);
                var newFirstMoment = math.scaledArrayAdd(_this.b1, oldFirstMoment, math.subtract(_this.one, _this.b1), gradient);
                var gradientSquare = math.multiply(gradient, gradient);
                var newSecondMoment = math.scaledArrayAdd(_this.b2, oldSecondMoment, math.subtract(_this.one, _this.b2), gradientSquare);
                var biasCorrectedFirstMoment = math.divide(newFirstMoment, math.subtract(_this.one, _this.accB1));
                var biasCorrectedSecondMoment = math.divide(newSecondMoment, math.subtract(_this.one, _this.accB2));
                var variable = math.scaledArrayAdd(_this.c, math.divide(biasCorrectedFirstMoment, math.add(math.sqrt(biasCorrectedSecondMoment), _this.eps)), _this.one, oldVariable);
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                _this.firstMoment.set(node.output, keep(newFirstMoment));
                _this.secondMoment.set(node.output, keep(newSecondMoment));
                oldVariable.dispose();
                gradient.dispose();
                oldFirstMoment.dispose();
                oldSecondMoment.dispose();
            });
            var oldAccB1 = _this.accB1;
            var oldAccB2 = _this.accB2;
            _this.accB1 = keep(math.multiply(_this.accB1, _this.b1));
            _this.accB2 = keep(math.multiply(_this.accB2, _this.b2));
            oldAccB1.dispose();
            oldAccB2.dispose();
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdamOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.firstMoment.dispose();
        this.secondMoment.dispose();
        this.eps.dispose();
        this.b1.dispose();
        this.b2.dispose();
        this.accB1.dispose();
        this.accB2.dispose();
    };
    return AdamOptimizer;
}(optimizer_1.Optimizer));
exports.AdamOptimizer = AdamOptimizer;

},{"../../math/ndarray":30,"../tensor_array_map":50,"./optimizer":36}],34:[function(require,module,exports) {
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
var ndarray_1 = require("../../math/ndarray");
var tensor_array_map_1 = require("../tensor_array_map");
var optimizer_1 = require("./optimizer");
var AdamaxOptimizer = (function (_super) {
    __extends(AdamaxOptimizer, _super);
    function AdamaxOptimizer(learningRate, beta1, beta2, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.beta1 = beta1;
        _this.beta2 = beta2;
        _this.firstMoment = new tensor_array_map_1.TensorArrayMap();
        _this.weightedInfNorm = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-8);
        _this.b1 = ndarray_1.Scalar.new(_this.beta1);
        _this.b2 = ndarray_1.Scalar.new(_this.beta2);
        _this.accB1 = ndarray_1.Scalar.new(_this.beta1);
        return _this;
    }
    AdamaxOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.firstMoment.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.firstMoment.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
        if (this.weightedInfNorm.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.weightedInfNorm.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdamaxOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldFirstMoment = _this.firstMoment.get(node.output);
                var oldWeightedInfNorm = _this.weightedInfNorm.get(node.output);
                var newFirstMoment = math.scaledArrayAdd(_this.b1, oldFirstMoment, math.subtract(_this.one, _this.b1), gradient);
                var ut0 = math.multiply(_this.b2, oldWeightedInfNorm);
                var ut1 = math.abs(gradient);
                var newWeightedInfNorm = math.add(math.relu(math.subtract(ut0, ut1)), ut1);
                var variable = math.scaledArrayAdd(_this.one, oldVariable, math.divide(_this.c, math.subtract(_this.one, _this.accB1)), math.divide(newFirstMoment, math.add(_this.eps, newWeightedInfNorm)));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                _this.firstMoment.set(node.output, keep(newFirstMoment));
                _this.weightedInfNorm.set(node.output, keep(newWeightedInfNorm));
                oldVariable.dispose();
                gradient.dispose();
                oldFirstMoment.dispose();
                oldWeightedInfNorm.dispose();
            });
            var oldAccB1 = _this.accB1;
            _this.accB1 = keep(math.multiply(_this.accB1, _this.b1));
            oldAccB1.dispose();
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdamaxOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.firstMoment.dispose();
        this.weightedInfNorm.dispose();
        this.eps.dispose();
        this.accB1.dispose();
        this.b1.dispose();
        this.b2.dispose();
    };
    return AdamaxOptimizer;
}(optimizer_1.Optimizer));
exports.AdamaxOptimizer = AdamaxOptimizer;

},{"../../math/ndarray":30,"../tensor_array_map":50,"./optimizer":36}],31:[function(require,module,exports) {
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
var ndarray_1 = require("../../math/ndarray");
var tensor_array_map_1 = require("../tensor_array_map");
var optimizer_1 = require("./optimizer");
var AdadeltaOptimizer = (function (_super) {
    __extends(AdadeltaOptimizer, _super);
    function AdadeltaOptimizer(learningRate, gamma, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.gamma = gamma;
        _this.accumulatedSquaredGradients = new tensor_array_map_1.TensorArrayMap();
        _this.accumulatedUpdates = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-6);
        _this.g = ndarray_1.Scalar.new(_this.gamma);
        return _this;
    }
    AdadeltaOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.accumulatedSquaredGradients.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.accumulatedSquaredGradients.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
                _this.accumulatedUpdates.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdadeltaOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldCache = _this.accumulatedSquaredGradients.get(node.output);
                var oldUpdates = _this.accumulatedUpdates.get(node.output);
                var gradientSquare = math.multiply(gradient, gradient);
                var cache = math.scaledArrayAdd(_this.g, oldCache, math.subtract(_this.one, _this.g), gradientSquare);
                var updates = math.multiply(math.divide(math.sqrt(math.add(oldUpdates, _this.eps)), math.sqrt(math.add(oldCache, _this.eps))), gradient);
                var variable = math.scaledArrayAdd(_this.c, updates, _this.one, oldVariable);
                var updateSquare = math.multiply(updates, updates);
                var newUpdates = math.scaledArrayAdd(_this.g, oldUpdates, math.subtract(_this.one, _this.g), updateSquare);
                _this.accumulatedSquaredGradients.set(node.output, keep(cache));
                _this.accumulatedUpdates.set(node.output, keep(newUpdates));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldCache.dispose();
                oldUpdates.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdadeltaOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.eps.dispose();
        this.g.dispose();
        this.accumulatedSquaredGradients.dispose();
        this.accumulatedUpdates.dispose();
    };
    return AdadeltaOptimizer;
}(optimizer_1.Optimizer));
exports.AdadeltaOptimizer = AdadeltaOptimizer;

},{"../../math/ndarray":30,"../tensor_array_map":50,"./optimizer":36}],32:[function(require,module,exports) {
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
var ndarray_1 = require("../../math/ndarray");
var tensor_array_map_1 = require("../tensor_array_map");
var optimizer_1 = require("./optimizer");
var AdagradOptimizer = (function (_super) {
    __extends(AdagradOptimizer, _super);
    function AdagradOptimizer(learningRate, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.accumulatedSquaredGradients = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-6);
        return _this;
    }
    AdagradOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.accumulatedSquaredGradients.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.accumulatedSquaredGradients.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdagradOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldCache = _this.accumulatedSquaredGradients.get(node.output);
                var gradientSquare = math.multiply(gradient, gradient);
                var cache = math.add(oldCache, gradientSquare);
                var variable = math.scaledArrayAdd(_this.c, math.divide(gradient, math.add(math.sqrt(cache), _this.eps)), _this.one, oldVariable);
                _this.accumulatedSquaredGradients.set(node.output, keep(cache));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldCache.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdagradOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.eps.dispose();
        this.accumulatedSquaredGradients.dispose();
    };
    return AdagradOptimizer;
}(optimizer_1.Optimizer));
exports.AdagradOptimizer = AdagradOptimizer;

},{"../../math/ndarray":30,"../tensor_array_map":50,"./optimizer":36}],35:[function(require,module,exports) {
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
var ndarray_1 = require("../../math/ndarray");
var tensor_array_map_1 = require("../tensor_array_map");
var sgd_optimizer_1 = require("./sgd_optimizer");
var MomentumOptimizer = (function (_super) {
    __extends(MomentumOptimizer, _super);
    function MomentumOptimizer(learningRate, momentum, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.momentum = momentum;
        _this.variableVelocities = new tensor_array_map_1.TensorArrayMap();
        _this.m = ndarray_1.Scalar.new(_this.momentum);
        return _this;
    }
    MomentumOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.variableVelocities.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.variableVelocities.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    MomentumOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldVelocity = _this.variableVelocities.get(node.output);
                var velocity = math.scaledArrayAdd(_this.m, oldVelocity, _this.one, gradient);
                var variable = math.scaledArrayAdd(_this.c, velocity, _this.one, oldVariable);
                _this.variableVelocities.set(node.output, keep(velocity));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldVelocity.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    MomentumOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.m.dispose();
        this.variableVelocities.dispose();
    };
    MomentumOptimizer.prototype.setMomentum = function (momentum) {
        this.momentum = momentum;
    };
    return MomentumOptimizer;
}(sgd_optimizer_1.SGDOptimizer));
exports.MomentumOptimizer = MomentumOptimizer;

},{"../../math/ndarray":30,"../tensor_array_map":50,"./sgd_optimizer":38}],14:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("deeplearn/dist/math/ndarray");
var sgd_optimizer_1 = require("deeplearn/dist/graph/optimizers/sgd_optimizer");
var adam_optimizer_1 = require("deeplearn/dist/graph/optimizers/adam_optimizer");
var adamax_optimizer_1 = require("deeplearn/dist/graph/optimizers/adamax_optimizer");
var adadelta_optimizer_1 = require("deeplearn/dist/graph/optimizers/adadelta_optimizer");
var adagrad_optimizer_1 = require("deeplearn/dist/graph/optimizers/adagrad_optimizer");
var momentum_optimizer_1 = require("deeplearn/dist/graph/optimizers/momentum_optimizer");
var DeeplearnConverter = (function () {
    function DeeplearnConverter() {
    }
    DeeplearnConverter.convertToDeeplearnArray = function (shape, arr) {
        var dlArray;
        switch (shape.length) {
            case 1:
                dlArray = ndarray_1.Array1D.new(arr);
                break;
            case 2:
                dlArray = ndarray_1.Array2D.new(shape, arr);
                break;
            case 3:
                dlArray = ndarray_1.Array3D.new(shape, arr);
                break;
            case 4:
                dlArray = ndarray_1.Array4D.new(shape, arr);
                break;
            default:
                throw ("Unknown dimensionality for array: " + arr);
        }
        return dlArray;
    };
    DeeplearnConverter.createCostFunction = function (deeplearn, loss) {
        switch (loss.type.toUpperCase()) {
            case 'MEANSQUARED':
                return deeplearn.graph.meanSquaredCost(deeplearn.targetTensor, deeplearn.predictionTensor);
            case 'SOFTMAXCROSSENTROPY':
                return deeplearn.graph.softmaxCrossEntropyCost(deeplearn.predictionTensor, deeplearn.targetTensor);
            default:
                throw ('Unknown Cost function: ' + loss.type);
        }
    };
    DeeplearnConverter.createOptimizer = function (optimizer) {
        switch (optimizer.type.toUpperCase()) {
            case 'SGD':
                return new sgd_optimizer_1.SGDOptimizer(optimizer.options.learningRate);
            case 'ADAGRAD':
                return new adagrad_optimizer_1.AdagradOptimizer(optimizer.options.learningRate);
            case 'ADADELTA':
                return new adadelta_optimizer_1.AdadeltaOptimizer(optimizer.options.learningRate, optimizer.options.gamma);
            case 'ADAM':
                return new adam_optimizer_1.AdamOptimizer(optimizer.options.learningRate, optimizer.options.beta1, optimizer.options.beta2);
            case 'ADAMAX':
                return new adamax_optimizer_1.AdamaxOptimizer(optimizer.options.learningRate, optimizer.options.beta1, optimizer.options.beta2);
            case 'MOMENTUM':
                return new momentum_optimizer_1.MomentumOptimizer(optimizer.options.learningRate, optimizer.options.momentum);
            default:
                throw ('Unknown Optimizer: ' + optimizer.type);
        }
    };
    DeeplearnConverter.convertToDeeplearnActivation = function (deeplearn, x, activationLayer) {
        switch (activationLayer.activation.toUpperCase()) {
            case 'SOFTMAX':
                return (deeplearn.graph.softmax(x));
            case 'ELU':
                return (deeplearn.graph.elu(x));
            case 'RELU':
                return (deeplearn.graph.relu(x));
            case 'TANH':
                return (deeplearn.graph.tanh(x));
            case 'SIGMOID':
                return (deeplearn.graph.sigmoid(x));
            case 'LEAKYRELU':
                return deeplearn.graph.leakyRelu(x, activationLayer.options.alpha);
            case 'LINEAR':
                return (null);
            case 'SOFTPLUS':
            case 'SOFTSIGN':
            case 'SELU':
                throw ('Unsupported Activation type: ' + activationLayer.activation);
            default:
                throw ('Unknown Activation type: ' + activationLayer.activation);
        }
    };
    DeeplearnConverter.convertToDeeplearnConv2D = function (deeplearn, prevLayer, fieldSize, stride, zeroPad, outputDepth, inputShape, index) {
        var wShape = [fieldSize, fieldSize, inputShape[2], outputDepth];
        var w;
        var b;
        w = ndarray_1.Array4D.randTruncatedNormal(wShape, 0, 0.1);
        b = ndarray_1.Array1D.zeros([outputDepth]);
        var wTensor = deeplearn.graph.variable("conv2d-" + index + "-w", w);
        var bTensor = deeplearn.graph.variable("conv2d-" + index + "-b", b);
        return deeplearn.graph.conv2d(prevLayer, wTensor, bTensor, fieldSize, outputDepth, stride, zeroPad);
    };
    DeeplearnConverter.getDims = function (arr) {
        return arr instanceof Array ? [arr.length].concat(this.getDims(arr[0])) : [];
    };
    DeeplearnConverter.isEqual = function (arr1, arr2) {
        return (JSON.stringify(arr1) == JSON.stringify(arr2));
    };
    return DeeplearnConverter;
}());
exports.DeeplearnConverter = DeeplearnConverter;
//# sourceMappingURL=deeplearn-converter.js.map
},{"deeplearn/dist/math/ndarray":30,"deeplearn/dist/graph/optimizers/sgd_optimizer":38,"deeplearn/dist/graph/optimizers/adam_optimizer":33,"deeplearn/dist/graph/optimizers/adamax_optimizer":34,"deeplearn/dist/graph/optimizers/adadelta_optimizer":31,"deeplearn/dist/graph/optimizers/adagrad_optimizer":32,"deeplearn/dist/graph/optimizers/momentum_optimizer":35}],56:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SumTypesMap;
(function (SumTypesMap) {
    SumTypesMap["float32"] = "float32";
    SumTypesMap["int32"] = "int32";
    SumTypesMap["bool"] = "int32";
})(SumTypesMap = exports.SumTypesMap || (exports.SumTypesMap = {}));
var UpcastInt32AndMap;
(function (UpcastInt32AndMap) {
    UpcastInt32AndMap["float32"] = "float32";
    UpcastInt32AndMap["int32"] = "int32";
    UpcastInt32AndMap["bool"] = "int32";
})(UpcastInt32AndMap = exports.UpcastInt32AndMap || (exports.UpcastInt32AndMap = {}));
var UpcastBoolAndMap;
(function (UpcastBoolAndMap) {
    UpcastBoolAndMap["float32"] = "float32";
    UpcastBoolAndMap["int32"] = "int32";
    UpcastBoolAndMap["bool"] = "bool";
})(UpcastBoolAndMap = exports.UpcastBoolAndMap || (exports.UpcastBoolAndMap = {}));
var UpcastFloat32AndMap;
(function (UpcastFloat32AndMap) {
    UpcastFloat32AndMap["float32"] = "float32";
    UpcastFloat32AndMap["int32"] = "float32";
    UpcastFloat32AndMap["bool"] = "float32";
})(UpcastFloat32AndMap = exports.UpcastFloat32AndMap || (exports.UpcastFloat32AndMap = {}));
var upcastTypeMap = {
    float32: UpcastFloat32AndMap,
    int32: UpcastInt32AndMap,
    bool: UpcastBoolAndMap
};
function upcastType(typeA, typeB) {
    return upcastTypeMap[typeA][typeB];
}
exports.upcastType = upcastType;

},{}],39:[function(require,module,exports) {
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var seedrandom = require("seedrandom");
var environment_1 = require("../../environment");
var util = require("../../util");
var broadcast_util = require("../broadcast_util");
var concat_util = require("../concat_util");
var math_1 = require("../math");
var ndarray_1 = require("../ndarray");
var types = require("../types");
var types_1 = require("../types");
var axis_util = require("./../axis_util");
var matmul_1 = require("./types/matmul");
var MathBackendCPU = (function () {
    function MathBackendCPU() {
        this.data = {};
    }
    MathBackendCPU.prototype.dispose = function () { };
    MathBackendCPU.prototype.write = function (id, values, dtype, shape) {
        this.data[id] = values;
    };
    MathBackendCPU.prototype.writePixels = function (id, pixels, numChannels) {
        var vals;
        if (pixels instanceof ImageData) {
            vals = pixels.data;
        }
        else if (pixels instanceof HTMLCanvasElement) {
            vals = pixels.getContext('2d')
                .getImageData(0, 0, pixels.width, pixels.height)
                .data;
        }
        else if (pixels instanceof HTMLImageElement ||
            pixels instanceof HTMLVideoElement) {
            var canvas = document.createElement('canvas');
            canvas.width = pixels.width;
            canvas.height = pixels.height;
            canvas.getContext('2d').drawImage(pixels, 0, 0, canvas.width, canvas.height);
            vals = canvas.getContext('2d')
                .getImageData(0, 0, canvas.width, canvas.height)
                .data;
        }
        else {
            throw new Error("pixels is of unknown type: " + pixels.constructor.name);
        }
        var values;
        if (numChannels === 4) {
            values = new Int32Array(vals);
        }
        else {
            var numPixels = pixels.width * pixels.height;
            values = new Int32Array(numPixels * numChannels);
            for (var i = 0; i < numPixels; i++) {
                for (var channel = 0; channel < numChannels; ++channel) {
                    values[i * numChannels + channel] = vals[i * 4 + channel];
                }
            }
        }
        this.data[id] = values;
    };
    MathBackendCPU.prototype.read = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.throwIfNoData(id);
                return [2, this.data[id]];
            });
        });
    };
    MathBackendCPU.prototype.readSync = function (id) {
        this.throwIfNoData(id);
        return this.data[id];
    };
    MathBackendCPU.prototype.disposeData = function (id) {
        delete this.data[id];
    };
    MathBackendCPU.prototype.time = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var start;
            return __generator(this, function (_a) {
                start = performance.now();
                query();
                return [2, performance.now() - start];
            });
        });
    };
    MathBackendCPU.prototype.throwIfNoData = function (id) {
        if (!(id in this.data)) {
            throw new Error("No data found for NDArray with id " + id + ". " +
                "Use dl.ENV.math instead of constructing your own NDArrayMath. " +
                "If you need to construct your own math, make sure this array is " +
                "allocated after the math construction");
        }
    };
    MathBackendCPU.prototype.clone = function (x) {
        return ndarray_1.NDArray.make(x.shape, { values: new Float32Array(x.getValues()) });
    };
    MathBackendCPU.prototype.slice1D = function (x, begin, size) {
        var newVals = x.getValues().slice(begin, begin + size);
        return ndarray_1.Array1D.new(newVals);
    };
    MathBackendCPU.prototype.slice2D = function (x, begin, size) {
        var result = ndarray_1.Array2D.zeros(size);
        var startI = begin[0], startJ = begin[1];
        for (var i = 0; i < size[0]; ++i) {
            for (var j = 0; j < size[1]; ++j) {
                var val = x.get(i + startI, j + startJ);
                result.set(val, i, j);
            }
        }
        return result;
    };
    MathBackendCPU.prototype.slice3D = function (x, begin, size) {
        var result = ndarray_1.Array3D.zeros(size);
        var startI = begin[0], startJ = begin[1], startK = begin[2];
        for (var i = 0; i < size[0]; ++i) {
            for (var j = 0; j < size[1]; ++j) {
                for (var k = 0; k < size[2]; ++k) {
                    var val = x.get(i + startI, j + startJ, k + startK);
                    result.set(val, i, j, k);
                }
            }
        }
        return result;
    };
    MathBackendCPU.prototype.slice4D = function (x, begin, size) {
        var result = ndarray_1.Array4D.zeros(size);
        var startI = begin[0], startJ = begin[1], startK = begin[2], startL = begin[3];
        for (var i = 0; i < size[0]; ++i) {
            for (var j = 0; j < size[1]; ++j) {
                for (var k = 0; k < size[2]; ++k) {
                    for (var l = 0; l < size[3]; ++l) {
                        var val = x.get(i + startI, j + startJ, k + startK, l + startL);
                        result.set(val, i, j, k, l);
                    }
                }
            }
        }
        return result;
    };
    MathBackendCPU.prototype.concat1D = function (a, b) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, 0);
        var result = ndarray_1.Array1D.zeros(outShape);
        var aVals = a.getValues();
        var bVals = b.getValues();
        var vals = result.getValues();
        vals.set(aVals, 0);
        vals.set(bVals, a.size);
        return result;
    };
    MathBackendCPU.prototype.concat2D = function (a, b, axis) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, axis);
        var result = ndarray_1.Array2D.zeros(outShape);
        if (axis === 0) {
            var aVals = a.getValues();
            var bVals = b.getValues();
            var vals = result.getValues();
            vals.set(aVals, 0);
            vals.set(bVals, a.size);
            return result;
        }
        for (var i = 0; i < outShape[0]; ++i) {
            for (var j = 0; j < outShape[1]; ++j) {
                var index = [i, j];
                var value = void 0;
                if (index[axis] < a.shape[axis]) {
                    value = a.get(i, j);
                }
                else {
                    index[axis] -= a.shape[axis];
                    var i2 = index[0], j2 = index[1];
                    value = b.get(i2, j2);
                }
                result.set(value, i, j);
            }
        }
        return result;
    };
    MathBackendCPU.prototype.concat3D = function (a, b, axis) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, axis);
        var result = ndarray_1.Array3D.zeros(outShape);
        if (axis === 0) {
            var aVals = a.getValues();
            var bVals = b.getValues();
            var vals = result.getValues();
            vals.set(aVals, 0);
            vals.set(bVals, a.size);
            return result;
        }
        for (var i = 0; i < outShape[0]; ++i) {
            for (var j = 0; j < outShape[1]; ++j) {
                for (var k = 0; k < outShape[2]; ++k) {
                    var index = [i, j, k];
                    var value = void 0;
                    if (index[axis] < a.shape[axis]) {
                        value = a.get(i, j, k);
                    }
                    else {
                        index[axis] -= a.shape[axis];
                        var i2 = index[0], j2 = index[1], k2 = index[2];
                        value = b.get(i2, j2, k2);
                    }
                    result.set(value, i, j, k);
                }
            }
        }
        return result;
    };
    MathBackendCPU.prototype.concat4D = function (a, b, axis) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, axis);
        var result = ndarray_1.Array4D.zeros(outShape);
        if (axis === 0) {
            var aVals = a.getValues();
            var bVals = b.getValues();
            var vals = result.getValues();
            vals.set(aVals, 0);
            vals.set(bVals, a.size);
            return result;
        }
        for (var i = 0; i < outShape[0]; ++i) {
            for (var j = 0; j < outShape[1]; ++j) {
                for (var k = 0; k < outShape[2]; ++k) {
                    for (var l = 0; l < outShape[3]; ++l) {
                        var index = [i, j, k, l];
                        var value = void 0;
                        if (index[axis] < a.shape[axis]) {
                            value = a.get(i, j, k, l);
                        }
                        else {
                            index[axis] -= a.shape[axis];
                            var i2 = index[0], j2 = index[1], k2 = index[2], l2 = index[3];
                            value = b.get(i2, j2, k2, l2);
                        }
                        result.set(value, i, j, k, l);
                    }
                }
            }
        }
        return result;
    };
    MathBackendCPU.prototype.neg = function (x) {
        return this.multiply(ndarray_1.Scalar.new(-1), x);
    };
    MathBackendCPU.prototype.add = function (a, b) {
        return this.broadcastedBinaryOp(a, b, types.upcastType(a.dtype, b.dtype), function (aValue, bValue) { return aValue + bValue; });
    };
    MathBackendCPU.prototype.subtract = function (a, b) {
        return this.broadcastedBinaryOp(a, b, types.upcastType(a.dtype, b.dtype), function (aValue, bValue) { return aValue - bValue; });
    };
    MathBackendCPU.prototype.pow = function (a, b) {
        return this.broadcastedBinaryOp(a, b, a.dtype, function (aValue, bValue) { return Math.pow(aValue, bValue); });
    };
    MathBackendCPU.prototype.matMul = function (a, b, aOrientation, bOrientation) {
        if (aOrientation === void 0) { aOrientation = matmul_1.MatrixOrientation.REGULAR; }
        if (bOrientation === void 0) { bOrientation = matmul_1.MatrixOrientation.REGULAR; }
        var sharedDim = (aOrientation === matmul_1.MatrixOrientation.REGULAR) ? a.shape[1] : a.shape[0];
        var leftDim = (aOrientation === matmul_1.MatrixOrientation.REGULAR) ? a.shape[0] : a.shape[1];
        var rightDim = (bOrientation === matmul_1.MatrixOrientation.REGULAR) ? b.shape[1] : b.shape[0];
        var normalGetter = function (matrix, i, j) {
            return matrix.get(i, j);
        };
        var transposedGetter = function (matrix, i, j) {
            return matrix.get(j, i);
        };
        var aGetter = (aOrientation === matmul_1.MatrixOrientation.REGULAR) ?
            normalGetter :
            transposedGetter;
        var bGetter = (bOrientation === matmul_1.MatrixOrientation.REGULAR) ?
            normalGetter :
            transposedGetter;
        var values = new Float32Array(leftDim * rightDim);
        var index = 0;
        for (var i = 0; i < leftDim; ++i) {
            for (var j = 0; j < rightDim; ++j) {
                var sum = 0;
                for (var k = 0; k < sharedDim; ++k) {
                    sum += aGetter(a, i, k) * bGetter(b, k, j);
                }
                values[index++] = sum;
            }
        }
        return ndarray_1.Array2D.new([leftDim, rightDim], values);
    };
    MathBackendCPU.prototype.multiply = function (a, b) {
        return this.broadcastedBinaryOp(a, b, a.dtype, function (aValue, bValue) { return aValue * bValue; });
    };
    MathBackendCPU.prototype.divide = function (a, b) {
        return this.broadcastedBinaryOp(a, b, 'float32', function (aValue, bValue) { return aValue / bValue; });
    };
    MathBackendCPU.prototype.sum = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('sum', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var resultDtype = types_1.SumTypesMap[x.dtype];
        var result = ndarray_1.NDArray.zeros(outShape, resultDtype);
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = x.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var sum = 0;
            for (var j = 0; j < reduceSize; ++j) {
                sum += aVals[offset + j];
            }
            vals[i] = sum;
        }
        return result;
    };
    MathBackendCPU.prototype.argMin = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('argMin', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, 'int32');
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = x.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var min = aVals[offset];
            var minIndex = 0;
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    minIndex = util.NAN_INT32;
                    break;
                }
                if (value < min) {
                    min = value;
                    minIndex = j;
                }
            }
            vals[i] = minIndex;
        }
        return result;
    };
    MathBackendCPU.prototype.argMax = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('argMax', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, 'int32');
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = x.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var max = aVals[offset];
            var maxIndex = 0;
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    maxIndex = util.NAN_INT32;
                    break;
                }
                if (value > max) {
                    max = value;
                    maxIndex = j;
                }
            }
            vals[i] = maxIndex;
        }
        return result;
    };
    MathBackendCPU.prototype.equal = function (a, b) {
        return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
            if (util.isValNaN(aVal, a.dtype) || util.isValNaN(bVal, b.dtype)) {
                return util.getNaN('bool');
            }
            else {
                return (aVal === bVal) ? 1 : 0;
            }
        });
    };
    MathBackendCPU.prototype.topKValues = function (x, k) {
        return this.topK(x, k).values;
    };
    MathBackendCPU.prototype.topKIndices = function (x, k) {
        return this.topK(x, k).indices;
    };
    MathBackendCPU.prototype.topK = function (x, k) {
        var values = x.getValues();
        var valuesAndIndices = [];
        for (var i = 0; i < values.length; i++) {
            valuesAndIndices.push({ value: values[i], index: i });
        }
        valuesAndIndices.sort(function (a, b) {
            return b.value - a.value;
        });
        var topkValues = util.getTypedArrayFromDType(x.dtype, k);
        var topkIndices = new Int32Array(k);
        for (var i = 0; i < k; i++) {
            topkValues[i] = valuesAndIndices[i].value;
            topkIndices[i] = valuesAndIndices[i].index;
        }
        return {
            values: ndarray_1.Array1D.new(topkValues),
            indices: ndarray_1.Array1D.new(topkIndices)
        };
    };
    MathBackendCPU.prototype.min = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('min', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, x.dtype);
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = x.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var min = aVals[0];
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    min = Number.NaN;
                    break;
                }
                if (value < min) {
                    min = value;
                }
            }
            vals[i] = min;
        }
        return result;
    };
    MathBackendCPU.prototype.max = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('max', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, x.dtype);
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = x.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var max = aVals[offset];
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    max = Number.NaN;
                    break;
                }
                if (value > max) {
                    max = value;
                }
            }
            vals[i] = max;
        }
        return result;
    };
    MathBackendCPU.prototype.ceil = function (x) {
        var values = x.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            newValues[i] = Math.ceil(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: newValues });
    };
    MathBackendCPU.prototype.floor = function (x) {
        var values = x.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            newValues[i] = Math.floor(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: newValues });
    };
    MathBackendCPU.prototype.exp = function (x) {
        var values = x.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            newValues[i] = Math.exp(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: newValues });
    };
    MathBackendCPU.prototype.log = function (x) {
        var values = x.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            newValues[i] = Math.log(value);
        }
        return ndarray_1.NDArray.make(x.shape, { values: newValues });
    };
    MathBackendCPU.prototype.sqrt = function (x) {
        var values = x.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            newValues[i] = Math.sqrt(value);
        }
        return ndarray_1.NDArray.make(x.shape, { values: newValues });
    };
    MathBackendCPU.prototype.square = function (x) {
        var values = x.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            newValues[i] = value * value;
        }
        return ndarray_1.NDArray.make(x.shape, { values: newValues });
    };
    MathBackendCPU.prototype.relu = function (x) {
        var res = ndarray_1.NDArray.zeros(x.shape, x.dtype);
        var resVals = res.getValues();
        var inVals = x.getValues();
        for (var i = 0; i < inVals.length; ++i) {
            var val = inVals[i];
            if (util.isValNaN(val, x.dtype)) {
                resVals[i] = util.getNaN(res.dtype);
            }
            else {
                resVals[i] = Math.max(0, inVals[i]);
            }
        }
        return res;
    };
    MathBackendCPU.prototype.elu = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.dataSync();
        for (var i = 0; i < values.length; ++i) {
            var v = values[i];
            if (v >= 0) {
                resultValues[i] = v;
            }
            else {
                resultValues[i] = (Math.exp(v) - 1);
            }
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.eluDer = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.dataSync();
        for (var i = 0; i < values.length; ++i) {
            var v = values[i];
            if (v >= 0) {
                resultValues[i] = 1;
            }
            else {
                resultValues[i] = Math.exp(v);
            }
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.selu = function (x) {
        var scaleAlpha = 1.7580993408473768599402175208123;
        var scale = 1.0507009873554804934193349852946;
        var resultValues = new Float32Array(x.size);
        var values = x.dataSync();
        for (var i = 0; i < values.length; ++i) {
            var v = values[i];
            if (v >= 0) {
                resultValues[i] = scale * v;
            }
            else {
                resultValues[i] = scaleAlpha * (Math.exp(v) - 1);
            }
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.leakyRelu = function (x, alpha) {
        var resultValues = new Float32Array(x.size);
        var values = x.dataSync();
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            if (v >= 0) {
                resultValues[i] = v;
            }
            else {
                resultValues[i] = alpha * v;
            }
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.prelu = function (x, alpha) {
        var resultValues = new Float32Array(x.size);
        var values = x.dataSync();
        var alphas = alpha.dataSync();
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            if (v >= 0) {
                resultValues[i] = v;
            }
            else {
                resultValues[i] = alphas[i] * v;
            }
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.preluDer = function (x, alpha) {
        var resultValues = new Float32Array(x.size);
        var values = x.dataSync();
        var alphas = alpha.dataSync();
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            if (v > 0) {
                resultValues[i] = 1;
            }
            else if (v < 0) {
                resultValues[i] = alphas[i];
            }
            else {
                resultValues[i] = v;
            }
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.clip = function (x, min, max) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.min(max, Math.max(min, values[i]));
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.abs = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.abs(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.sigmoid = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = 1 / (1 + Math.exp(-values[i]));
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.sin = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.sin(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.cos = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.cos(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.tan = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.tan(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.asin = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.asin(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.acos = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.acos(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.atan = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.atan(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.sinh = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.sinh(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.cosh = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.cosh(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.tanh = function (x) {
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = util.tanh(values[i]);
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.step = function (x, alpha) {
        if (alpha === void 0) { alpha = 0; }
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            if (util.isValNaN(value, x.dtype)) {
                resultValues[i] = util.getNaN(x.dtype);
            }
            else {
                resultValues[i] = value > 0 ? 1 : alpha;
            }
        }
        return ndarray_1.NDArray.make(x.shape, { values: resultValues });
    };
    MathBackendCPU.prototype.conv2d = function (x, filter, bias, convInfo) {
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var padLeft = convInfo.padInfo.left;
        var padTop = convInfo.padInfo.top;
        var y = ndarray_1.Array4D.zeros(convInfo.outShape);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                    var xRCorner = yR * convInfo.strideHeight - padLeft;
                    var xRMin = Math.max(0, xRCorner);
                    var xRMax = Math.min(convInfo.inHeight, filterHeight + xRCorner);
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var xCCorner = yC * convInfo.strideWidth - padTop;
                        var xCMin = Math.max(0, xCCorner);
                        var xCMax = Math.min(convInfo.inWidth, filterWidth + xCCorner);
                        var dotProd = 0;
                        for (var xR = xRMin; xR < xRMax; ++xR) {
                            var wR = xR - xRCorner;
                            for (var xC = xCMin; xC < xCMax; ++xC) {
                                var wC = xC - xCCorner;
                                for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                                    var pixel = x.get(b, xR, xC, d1);
                                    var weight = filter.get(wR, wC, d1, d2);
                                    dotProd += pixel * weight;
                                }
                            }
                        }
                        var biasVal = (bias != null) ? bias.get(d2) : 0;
                        y.set(dotProd + biasVal, b, yR, yC, d2);
                    }
                }
            }
        }
        return y;
    };
    MathBackendCPU.prototype.conv2dDerInput = function (dy, filter, convInfo) {
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var topPad = filterHeight - 1 - convInfo.padInfo.top;
        var leftPad = filterWidth - 1 - convInfo.padInfo.left;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dx = ndarray_1.Array4D.zeros(convInfo.inShape);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                for (var xR = 0; xR < convInfo.inHeight; ++xR) {
                    var xRCorner = xR - leftPad;
                    var xRMin = Math.max(0, Math.ceil(xRCorner / strideHeight));
                    var yRMax = Math.min(convInfo.outHeight, (filterHeight + xRCorner) / strideHeight);
                    for (var xC = 0; xC < convInfo.inWidth; ++xC) {
                        var xCCorner = xC - topPad;
                        var xCMin = Math.max(0, Math.ceil(xCCorner / strideWidth));
                        var yCMax = Math.min(convInfo.outWidth, (filterWidth + xCCorner) / strideWidth);
                        var dotProd = 0;
                        for (var yR = xRMin; yR < yRMax; ++yR) {
                            var wR = yR * strideHeight - xRCorner;
                            for (var yC = xCMin; yC < yCMax; ++yC) {
                                var wC = yC * strideWidth - xCCorner;
                                for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                                    var pixel = dy.get(b, yR, yC, d2);
                                    var weight = filter.get(filterHeight - 1 - wR, filterWidth - 1 - wC, d1, d2);
                                    dotProd += pixel * weight;
                                }
                            }
                        }
                        dx.set(dotProd, b, xR, xC, d1);
                    }
                }
            }
        }
        return dx;
    };
    MathBackendCPU.prototype.conv2dDerFilter = function (x, dy, convInfo) {
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var dW = ndarray_1.Array4D.zeros(convInfo.filterShape);
        var leftPad = convInfo.padInfo.left;
        var topPad = convInfo.padInfo.top;
        for (var wR = 0; wR < filterHeight; ++wR) {
            var yRMin = Math.max(0, Math.ceil((topPad - wR) / strideHeight));
            var yRMax = Math.min(convInfo.outHeight, (convInfo.inHeight + topPad - wR) / strideHeight);
            for (var wC = 0; wC < filterWidth; ++wC) {
                var yCMin = Math.max(0, Math.ceil((leftPad - wC) / strideWidth));
                var yCMax = Math.min(convInfo.outWidth, (convInfo.inWidth + leftPad - wC) / strideWidth);
                for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                    for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                        var dotProd = 0;
                        for (var b = 0; b < convInfo.batchSize; ++b) {
                            for (var yR = yRMin; yR < yRMax; ++yR) {
                                var xR = wR + yR * strideHeight - topPad;
                                for (var yC = yCMin; yC < yCMax; ++yC) {
                                    var xC = wC + yC * strideWidth - leftPad;
                                    dotProd += x.get(b, xR, xC, d1) * dy.get(b, yR, yC, d2);
                                }
                            }
                        }
                        dW.set(dotProd, wR, wC, d1, d2);
                    }
                }
            }
        }
        return dW;
    };
    MathBackendCPU.prototype.conv2dDerBias = function (dy) {
        var _a = dy.shape, batchSize = _a[0], numRows = _a[1], numCols = _a[2], outDepth = _a[3];
        var values = new Float32Array(outDepth);
        for (var d2 = 0; d2 < outDepth; ++d2) {
            var sum = 0;
            for (var b = 0; b < batchSize; ++b) {
                for (var r = 0; r < numRows; ++r) {
                    for (var c = 0; c < numCols; ++c) {
                        sum += dy.get(b, r, c, d2);
                    }
                }
            }
            values[d2] = sum;
        }
        return ndarray_1.Array1D.new(values);
    };
    MathBackendCPU.prototype.depthwiseConv2D = function (x, filter, convInfo) {
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var padLeft = convInfo.padInfo.left;
        var padTop = convInfo.padInfo.top;
        var chMul = convInfo.outChannels / convInfo.inChannels;
        var y = ndarray_1.Array4D.zeros(convInfo.outShape);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                    var xRCorner = yR * convInfo.strideHeight - padLeft;
                    var xRMin = Math.max(0, xRCorner);
                    var xRMax = Math.min(convInfo.inHeight, filterHeight + xRCorner);
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var xCCorner = yC * convInfo.strideWidth - padTop;
                        var xCMin = Math.max(0, xCCorner);
                        var xCMax = Math.min(convInfo.inWidth, filterWidth + xCCorner);
                        for (var q = 0; q < chMul; ++q) {
                            var dotProd = 0;
                            for (var xR = xRMin; xR < xRMax; ++xR) {
                                var wR = xR - xRCorner;
                                for (var xC = xCMin; xC < xCMax; ++xC) {
                                    var wC = xC - xCCorner;
                                    var pixel = x.get(b, xR, xC, d1);
                                    var weight = filter.get(wR, wC, d1, q);
                                    dotProd += pixel * weight;
                                }
                            }
                            y.set(dotProd, b, yR, yC, d1 * chMul + q);
                        }
                    }
                }
            }
        }
        return y;
    };
    MathBackendCPU.prototype.tile = function (x, reps) {
        var newShape = new Array(x.rank);
        for (var i = 0; i < newShape.length; i++) {
            newShape[i] = x.shape[i] * reps[i];
        }
        var dtype;
        if (x.dtype === 'float32') {
            dtype = Float32Array;
        }
        else if (x.dtype === 'int32') {
            dtype = Int32Array;
        }
        else if (x.dtype === 'bool') {
            dtype = Uint8Array;
        }
        else {
            throw new Error("Dtype " + x.dtype + " not supported for tile");
        }
        var resultValues = new dtype(util.sizeFromShape(newShape));
        var result = ndarray_1.NDArray.make(newShape, { values: resultValues }, x.dtype);
        var values = x.getValues();
        for (var i = 0; i < result.size; ++i) {
            var newLoc = result.indexToLoc(i);
            var originalLoc = new Array(x.rank);
            for (var i_1 = 0; i_1 < originalLoc.length; i_1++) {
                originalLoc[i_1] = newLoc[i_1] % x.shape[i_1];
            }
            var originalIndex = x.locToIndex(originalLoc);
            resultValues[i] = values[originalIndex];
        }
        return result;
    };
    MathBackendCPU.prototype.transpose = function (x, perm) {
        var newShape = new Array(x.rank);
        for (var i = 0; i < newShape.length; i++) {
            newShape[i] = x.shape[perm[i]];
        }
        var resultValues = new Float32Array(x.size);
        var values = x.getValues();
        var result = ndarray_1.NDArray.make(newShape, { values: resultValues });
        for (var i = 0; i < x.size; ++i) {
            var loc = x.indexToLoc(i);
            var newLoc = new Array(loc.length);
            for (var i_2 = 0; i_2 < newLoc.length; i_2++) {
                newLoc[i_2] = loc[perm[i_2]];
            }
            var newIndex = result.locToIndex(newLoc);
            resultValues[newIndex] = values[i];
        }
        return result;
    };
    MathBackendCPU.prototype.pool = function (x, convInfo, poolType) {
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var y = ndarray_1.Array4D.zeros(convInfo.outShape);
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d = 0; d < convInfo.inChannels; ++d) {
                for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                    var xRCorner = yR * strideHeight - padTop;
                    var xRMin = Math.max(0, xRCorner);
                    var xRMax = Math.min(convInfo.inHeight, filterHeight + xRCorner);
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var xCCorner = yC * strideWidth - padLeft;
                        var xCMin = Math.max(0, xCCorner);
                        var xCMax = Math.min(convInfo.inWidth, filterWidth + xCCorner);
                        var minMaxValue = (poolType === 'max' ? Number.NEGATIVE_INFINITY :
                            Number.POSITIVE_INFINITY);
                        var avgValue = 0;
                        for (var xR = xRMin; xR < xRMax; ++xR) {
                            for (var xC = xCMin; xC < xCMax; ++xC) {
                                var pixel = x.get(b, xR, xC, d);
                                if (isNaN(pixel)) {
                                    minMaxValue = NaN;
                                    avgValue = NaN;
                                    break;
                                }
                                if ((poolType === 'max' && pixel > minMaxValue) ||
                                    (poolType === 'min' && pixel < minMaxValue)) {
                                    minMaxValue = pixel;
                                }
                                else if (poolType === 'avg') {
                                    avgValue += pixel / (filterHeight * filterWidth);
                                }
                            }
                            if (isNaN(minMaxValue)) {
                                break;
                            }
                        }
                        y.set(poolType === 'avg' ? avgValue : minMaxValue, b, yR, yC, d);
                    }
                }
            }
        }
        return y;
    };
    MathBackendCPU.prototype.maxPool = function (x, convInfo) {
        return this.pool(x, convInfo, 'max');
    };
    MathBackendCPU.prototype.maxPoolPositions = function (x, convInfo) {
        var maxPositions = ndarray_1.Array4D.zeros(convInfo.outShape);
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d = 0; d < convInfo.inChannels; ++d) {
                for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                    var xRCorner = yR * strideHeight - padTop;
                    var xRMin = Math.max(0, xRCorner);
                    var xRMax = Math.min(convInfo.inHeight, filterHeight + xRCorner);
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var xCCorner = yC * strideWidth - padLeft;
                        var xCMin = Math.max(0, xCCorner);
                        var xCMax = Math.min(convInfo.inWidth, filterWidth + xCCorner);
                        var maxValue = Number.NEGATIVE_INFINITY;
                        var maxPosition = -1;
                        for (var xR = xRMin; xR < xRMax; ++xR) {
                            var wR = xR - xRCorner;
                            for (var xC = xCMin; xC < xCMax; ++xC) {
                                var wC = xC - xCCorner;
                                var pixel = x.get(b, xR, xC, d);
                                if (pixel > maxValue) {
                                    maxValue = pixel;
                                    maxPosition = wR * filterWidth + wC;
                                }
                            }
                        }
                        maxPositions.set(maxPosition, b, yR, yC, d);
                    }
                }
            }
        }
        return maxPositions;
    };
    MathBackendCPU.prototype.maxPoolBackprop = function (dy, x, convInfo) {
        var maxPositions = this.maxPoolPositions(x, convInfo);
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var dx = ndarray_1.Array4D.zeros(x.shape);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d = 0; d < convInfo.inChannels; ++d) {
                for (var dxR = 0; dxR < convInfo.inHeight; ++dxR) {
                    for (var dxC = 0; dxC < convInfo.inWidth; ++dxC) {
                        var dyRCorner = dxR - padTop;
                        var dyCCorner = dxC - padLeft;
                        var dotProd = 0;
                        for (var wR = 0; wR < filterHeight; ++wR) {
                            var dyR = (dyRCorner + wR) / strideHeight;
                            if (dyR < 0 || dyR >= convInfo.outHeight ||
                                Math.floor(dyR) !== dyR) {
                                continue;
                            }
                            for (var wC = 0; wC < filterWidth; ++wC) {
                                var dyC = (dyCCorner + wC) / strideWidth;
                                if (dyC < 0 || dyC >= convInfo.outWidth ||
                                    Math.floor(dyC) !== dyC) {
                                    continue;
                                }
                                var maxPos = filterHeight * filterWidth - 1 -
                                    maxPositions.get(b, dyR, dyC, d);
                                var curPos = wR * filterWidth + wC;
                                var mask = maxPos === curPos ? 1 : 0;
                                if (mask === 0) {
                                    continue;
                                }
                                var pixel = dy.get(b, dyR, dyC, d);
                                dotProd += pixel * mask;
                            }
                        }
                        dx.set(dotProd, b, dxR, dxC, d);
                    }
                }
            }
        }
        return dx;
    };
    MathBackendCPU.prototype.minPool = function (x, convInfo) {
        return this.pool(x, convInfo, 'min');
    };
    MathBackendCPU.prototype.avgPool = function (x, convInfo) {
        return this.pool(x, convInfo, 'avg');
    };
    MathBackendCPU.prototype.resizeBilinear3D = function (x, newShape2D, alignCorners) {
        var output = ndarray_1.Array3D.zeros([newShape2D[0], newShape2D[1], x.shape[2]]);
        var effectiveInputSize = alignCorners ? [x.shape[0] - 1, x.shape[1] - 1, x.shape[2]] : x.shape;
        var effectiveOutputSize = alignCorners ?
            [output.shape[0] - 1, output.shape[1] - 1, output.shape[2]] :
            output.shape;
        for (var r = 0; r < output.shape[0]; r++) {
            for (var c = 0; c < output.shape[1]; c++) {
                for (var d = 0; d < output.shape[2]; d++) {
                    var sourceFracRow = (effectiveInputSize[0]) * r / (effectiveOutputSize[0]);
                    var sourceFracCol = (effectiveInputSize[1]) * c / (effectiveOutputSize[1]);
                    var sourceRowFloor = Math.floor(sourceFracRow);
                    var sourceRowCeil = Math.min(x.shape[0] - 1, Math.ceil(sourceFracRow));
                    var sourceColFloor = Math.floor(sourceFracCol);
                    var sourceColCeil = Math.min(x.shape[1] - 1, Math.ceil(sourceFracCol));
                    var topLeft = x.get(sourceRowFloor, sourceColFloor, d);
                    var bottomLeft = x.get(sourceRowCeil, sourceColFloor, d);
                    var topRight = x.get(sourceRowFloor, sourceColCeil, d);
                    var bottomRight = x.get(sourceRowCeil, sourceColCeil, d);
                    var rowFrac = sourceFracRow - sourceRowFloor;
                    var colFrac = sourceFracCol - sourceColFloor;
                    var top_1 = topLeft + (topRight - topLeft) * colFrac;
                    var bottom = bottomLeft + (bottomRight - bottomLeft) * colFrac;
                    var newValue = top_1 + (bottom - top_1) * rowFrac;
                    output.set(newValue, r, c, d);
                }
            }
        }
        return output;
    };
    MathBackendCPU.prototype.batchNormalization2D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var xValues = x.getValues();
        var meanValues = mean.getValues();
        var varianceValues = variance.getValues();
        var scaleValues = scale ? scale.getValues() : new Float32Array([1]);
        var offsetValues = offset ? offset.getValues() : new Float32Array([0]);
        var outValues = new Float32Array(xValues.length);
        for (var i = 0; i < xValues.length; i++) {
            outValues[i] = offsetValues[i % offsetValues.length] +
                (xValues[i] - meanValues[i % meanValues.length]) *
                    scaleValues[i % scaleValues.length] /
                    Math.sqrt(varianceValues[i % varianceValues.length] + varianceEpsilon);
        }
        return ndarray_1.Array2D.new(x.shape, outValues);
    };
    MathBackendCPU.prototype.batchNormalization3D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var xValues = x.getValues();
        var meanValues = mean.getValues();
        var varianceValues = variance.getValues();
        var scaleValues = scale ? scale.getValues() : new Float32Array([1]);
        var offsetValues = offset ? offset.getValues() : new Float32Array([0]);
        var outValues = new Float32Array(xValues.length);
        for (var i = 0; i < xValues.length; i++) {
            outValues[i] = offsetValues[i % offsetValues.length] +
                (xValues[i] - meanValues[i % meanValues.length]) *
                    scaleValues[i % scaleValues.length] /
                    Math.sqrt(varianceValues[i % varianceValues.length] + varianceEpsilon);
        }
        return ndarray_1.Array3D.new(x.shape, outValues);
    };
    MathBackendCPU.prototype.multinomial = function (probabilities, numSamples, seed) {
        var batchSize = probabilities.shape[0];
        var numEvents = probabilities.shape[1];
        var res = ndarray_1.Array2D.zeros([batchSize, numSamples], 'int32');
        var resVals = res.getValues();
        var probVals = probabilities.getValues();
        for (var b = 0; b < batchSize; ++b) {
            var offset = b * numEvents;
            var cdf = new Float32Array(numEvents - 1);
            cdf[0] = probVals[offset];
            for (var event_1 = 1; event_1 < cdf.length; ++event_1) {
                cdf[event_1] = cdf[event_1 - 1] + probVals[offset + event_1];
            }
            var random = seedrandom.alea(seed.toString());
            var outOffset = b * numSamples;
            for (var sampleId = 0; sampleId < numSamples; ++sampleId) {
                var r = random();
                resVals[outOffset + sampleId] = cdf.length;
                for (var event_2 = 0; event_2 < cdf.length; event_2++) {
                    if (r < cdf[event_2]) {
                        resVals[outOffset + sampleId] = event_2;
                        break;
                    }
                }
            }
        }
        return res;
    };
    MathBackendCPU.prototype.oneHot = function (indices, depth, onValue, offValue) {
        var res = new Float32Array(indices.size * depth);
        res.fill(offValue);
        for (var event_3 = 0; event_3 < indices.size; ++event_3) {
            res[event_3 * depth + indices.get(event_3)] = onValue;
        }
        return ndarray_1.Array2D.new([indices.size, depth], res);
    };
    MathBackendCPU.prototype.broadcastedBinaryOp = function (a, b, dtype, op) {
        var newShape = broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        var result = ndarray_1.NDArray.zeros(newShape, dtype);
        var newValues = result.getValues();
        var aValues = a.getValues();
        var bValues = b.getValues();
        var aBroadcastDims = broadcast_util.getBroadcastDims(a.shape, newShape);
        var bBroadcastDims = broadcast_util.getBroadcastDims(b.shape, newShape);
        var _loop_1 = function (i) {
            var loc = result.indexToLoc(i);
            var aLoc = loc.slice(-a.rank);
            aBroadcastDims.forEach(function (d) { return aLoc[d] = 0; });
            var aIndex = a.locToIndex(aLoc);
            var bLoc = loc.slice(-b.rank);
            bBroadcastDims.forEach(function (d) { return bLoc[d] = 0; });
            var bIndex = b.locToIndex(bLoc);
            newValues[i] = op(aValues[aIndex], bValues[bIndex]);
        };
        for (var i = 0; i < newValues.length; ++i) {
            _loop_1(i);
        }
        return result;
    };
    return MathBackendCPU;
}());
exports.MathBackendCPU = MathBackendCPU;
environment_1.ENV.registerBackend('cpu', function () { return new MathBackendCPU(); });
var NDArrayMathCPU = (function (_super) {
    __extends(NDArrayMathCPU, _super);
    function NDArrayMathCPU(safeMode) {
        if (safeMode === void 0) { safeMode = false; }
        var _this = this;
        console.warn('new NDArrayMathCPU() is deprecated. Please use the global ' +
            'dl.ENV.math. In rare cases, to construct your own NDArrayMath ' +
            'that runs on CPU, use math = new NDArrayMath(\'cpu\', safeMode); ' +
            'and make sure to set it as global: dl.ENV.setMath(math);');
        _this = _super.call(this, 'cpu', safeMode) || this;
        environment_1.ENV.setMath(_this);
        return _this;
    }
    return NDArrayMathCPU;
}(math_1.NDArrayMath));
exports.NDArrayMathCPU = NDArrayMathCPU;

},{"../../environment":16,"../../util":18,"../broadcast_util":53,"../concat_util":47,"../math":29,"../ndarray":30,"../types":56,"./../axis_util":52,"./types/matmul":44,"seedrandom":110}],57:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARALLELIZE_THRESHOLD = 30;
function computeOptimalWindowSize(inSize) {
    if (inSize <= exports.PARALLELIZE_THRESHOLD) {
        return inSize;
    }
    return nearestDivisor(inSize, Math.floor(Math.sqrt(inSize)));
}
exports.computeOptimalWindowSize = computeOptimalWindowSize;
function nearestDivisor(size, start) {
    for (var i = start; i < size; ++i) {
        if (size % i === 0) {
            return i;
        }
    }
    return size;
}

},{}],58:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArgMinMaxProgram = (function () {
    function ArgMinMaxProgram(reduceInfo, op, firstPass) {
        this.variableNames = ['A'];
        var windowSize = reduceInfo.windowSize;
        var batchSize = reduceInfo.batchSize;
        var inSize = reduceInfo.inSize;
        var outSize = Math.ceil(inSize / windowSize);
        if (!firstPass) {
            this.variableNames.push('bestIndicesA');
        }
        this.outputShape = [batchSize, outSize];
        var compOp = (op === 'max') ? '>' : '<';
        var indexSnippet = firstPass ?
            'inOffset + i;' :
            'round(getBestIndicesA(batch, inOffset + i));';
        this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + windowSize + ";\n\n        int bestIndex = 0;\n        float bestValue = getA(batch, inOffset);\n\n        for (int i = 0; i < " + windowSize + "; i++) {\n          int inIdx = " + indexSnippet + ";\n          float candidate = getA(batch, inIdx);\n          if (isNaN(candidate)) {\n            setOutput(candidate);\n            return;\n          }\n          if (candidate " + compOp + " bestValue) {\n            bestValue = candidate;\n            bestIndex = inIdx;\n          }\n        }\n        setOutput(float(bestIndex));\n      }\n    ";
    }
    return ArgMinMaxProgram;
}());
exports.ArgMinMaxProgram = ArgMinMaxProgram;

},{}],59:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var broadcast_util = require("../../broadcast_util");
var BatchNormProgram = (function () {
    function BatchNormProgram(xShape, meanShape, varianceShape, offsetShape, scaleShape, varianceEpsilon) {
        this.outputShape = [];
        this.supportsBroadcasting = true;
        this.variableNames = ['x', 'mean', 'variance'];
        broadcast_util.assertAndGetBroadcastShape(xShape, meanShape);
        broadcast_util.assertAndGetBroadcastShape(xShape, varianceShape);
        var offsetSnippet = '0.0';
        if (offsetShape != null) {
            broadcast_util.assertAndGetBroadcastShape(xShape, offsetShape);
            this.variableNames.push('offset');
            offsetSnippet = 'getOffsetAtOutCoords()';
        }
        var scaleSnippet = '1.0';
        if (scaleShape != null) {
            broadcast_util.assertAndGetBroadcastShape(xShape, scaleShape);
            this.variableNames.push('scale');
            scaleSnippet = 'getScaleAtOutCoords()';
        }
        this.outputShape = xShape;
        this.userCode = "\n      void main() {\n        float x = getXAtOutCoords();\n        float mean = getMeanAtOutCoords();\n        float variance = getVarianceAtOutCoords();\n        float offset = " + offsetSnippet + ";\n        float scale = " + scaleSnippet + ";\n        float inv = scale / sqrt(variance + float(" + varianceEpsilon + "));\n        setOutput((x - mean) * inv + offset);\n      }\n    ";
    }
    return BatchNormProgram;
}());
exports.BatchNormProgram = BatchNormProgram;

},{"../../broadcast_util":53}],60:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var broadcast_util = require("../../broadcast_util");
exports.ADD = 'return a + b;';
exports.SUB = 'return a - b;';
exports.MUL = 'return a * b;';
exports.DIV = 'return a / b;';
exports.POW = "\n  return (round(mod(b, 2.0)) == 0 || round(mod(b, 2.0)) == 2) ?\n      pow(abs(a), b) : sign(a) * pow(abs(a), b);\n";
exports.EQUAL = "\n  if (isNaN(a)) return a;\n  if (isNaN(b)) return b;\n  return float(a == b);\n";
exports.PRELU = "\n  return (a >= 0.0) ? a : b * a;\n";
exports.PRELU_DER = "\n  return (a > 0.0) ? 1.0 : ((a < 0.0) ? b : a);\n";
var BinaryOpProgram = (function () {
    function BinaryOpProgram(op, aShape, bShape) {
        this.variableNames = ['A', 'B'];
        this.supportsBroadcasting = true;
        this.outputShape =
            broadcast_util.assertAndGetBroadcastShape(aShape, bShape);
        this.userCode = "\n      float binaryOperation(float a, float b) {\n        " + op + "\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    ";
    }
    return BinaryOpProgram;
}());
exports.BinaryOpProgram = BinaryOpProgram;

},{"../../broadcast_util":53}],61:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClipProgram = (function () {
    function ClipProgram(aShape, min, max) {
        this.variableNames = ['A'];
        this.outputShape = aShape;
        var minFixed = min.toFixed(20);
        var maxFixed = max.toFixed(20);
        this.userCode = "\n      void main() {\n        float value = getAAtOutCoords();\n        if (isNaN(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, " + minFixed + ", " + maxFixed + "));\n      }\n    ";
    }
    return ClipProgram;
}());
exports.ClipProgram = ClipProgram;

},{}],76:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureType;
(function (TextureType) {
    TextureType[TextureType["DEFAULT"] = 0] = "DEFAULT";
    TextureType[TextureType["RGBA_COLOR"] = 1] = "RGBA_COLOR";
})(TextureType = exports.TextureType || (exports.TextureType = {}));
function getUnpackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns, rows];
}
exports.getUnpackedMatrixTextureShapeWidthHeight = getUnpackedMatrixTextureShapeWidthHeight;
function getUnpackedArraySizeFromMatrixSize(matrixSize, channelsPerTexture) {
    return matrixSize * channelsPerTexture;
}
exports.getUnpackedArraySizeFromMatrixSize = getUnpackedArraySizeFromMatrixSize;
function getColorMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns * 4, rows];
}
exports.getColorMatrixTextureShapeWidthHeight = getColorMatrixTextureShapeWidthHeight;
function getMatrixSizeFromUnpackedArraySize(unpackedSize, channelsPerTexture) {
    if (unpackedSize % channelsPerTexture !== 0) {
        throw new Error("unpackedSize (" + unpackedSize + ") must be a multiple of " +
            ("" + channelsPerTexture));
    }
    return unpackedSize / channelsPerTexture;
}
exports.getMatrixSizeFromUnpackedArraySize = getMatrixSizeFromUnpackedArraySize;
function encodeMatrixToUnpackedArray(matrix, unpackedArray, channelsPerTexture) {
    var requiredSize = getUnpackedArraySizeFromMatrixSize(matrix.length, channelsPerTexture);
    if (unpackedArray.length < requiredSize) {
        throw new Error("unpackedArray length (" + unpackedArray.length + ") must be >= " +
            ("" + requiredSize));
    }
    var dst = 0;
    for (var src = 0; src < matrix.length; ++src) {
        unpackedArray[dst] = matrix[src];
        dst += channelsPerTexture;
    }
}
exports.encodeMatrixToUnpackedArray = encodeMatrixToUnpackedArray;
exports.FLOAT_MAX = 20000;
exports.FLOAT_MIN = -exports.FLOAT_MAX;
var FLOAT_RANGE = (exports.FLOAT_MAX - exports.FLOAT_MIN) / 255;
var FLOAT_DELTAS = [1, 1 / 255, 1 / (255 * 255), 1 / (255 * 255 * 255)];
var FLOAT_POWERS = [1, 255, 255 * 255];
exports.BYTE_NAN_VALUE = 0;
function encodeFloatArray(floatArray) {
    var uintArray = new Uint8Array(floatArray.length * 4);
    var _loop_1 = function (i) {
        var value = floatArray[i / 4];
        if (isNaN(value)) {
            uintArray[i] = exports.BYTE_NAN_VALUE;
            uintArray[i + 1] = exports.BYTE_NAN_VALUE;
            uintArray[i + 2] = exports.BYTE_NAN_VALUE;
            uintArray[i + 3] = exports.BYTE_NAN_VALUE;
            return "continue";
        }
        var normalizedValue = (value - exports.FLOAT_MIN) / FLOAT_RANGE;
        var enc = FLOAT_POWERS.map(function (pow) { return pow * normalizedValue; });
        var buckets = enc.map(function (value) { return Math.floor((value % 1) * 255); });
        uintArray[i] = Math.floor(normalizedValue);
        uintArray[i + 1] = buckets[0];
        uintArray[i + 2] = buckets[1];
        uintArray[i + 3] = buckets[2];
    };
    for (var i = 0; i < uintArray.length; i += 4) {
        _loop_1(i);
    }
    return uintArray;
}
exports.encodeFloatArray = encodeFloatArray;
function decodeToFloatArray(uintArray) {
    var floatArray = new Float32Array(uintArray.length / 4);
    var _loop_2 = function (i) {
        if (uintArray[i] === exports.BYTE_NAN_VALUE &&
            uintArray[i + 1] === exports.BYTE_NAN_VALUE &&
            uintArray[i + 2] === exports.BYTE_NAN_VALUE &&
            uintArray[i + 3] === exports.BYTE_NAN_VALUE) {
            floatArray[i / 4] = NaN;
            return "continue";
        }
        var dot = 0;
        FLOAT_DELTAS.forEach(function (delta, j) {
            dot += delta * uintArray[i + j];
        });
        var value = dot * FLOAT_RANGE + exports.FLOAT_MIN;
        floatArray[i / 4] = value;
    };
    for (var i = 0; i < uintArray.length; i += 4) {
        _loop_2(i);
    }
    return floatArray;
}
exports.decodeToFloatArray = decodeToFloatArray;
function decodeMatrixFromUnpackedArray(unpackedArray, matrix, channelsPerTexture) {
    var requiredSize = getMatrixSizeFromUnpackedArraySize(unpackedArray.length, channelsPerTexture);
    if (matrix.length < requiredSize) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var dst = 0;
    for (var src = 0; src < unpackedArray.length; src += channelsPerTexture) {
        matrix[dst++] = unpackedArray[src];
    }
}
exports.decodeMatrixFromUnpackedArray = decodeMatrixFromUnpackedArray;
function decodeMatrixFromUnpackedColorRGBAArray(unpackedArray, matrix, channels) {
    var requiredSize = unpackedArray.length * channels / 4;
    if (matrix.length < requiredSize) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var dst = 0;
    for (var src = 0; src < unpackedArray.length; src += 4) {
        for (var c = 0; c < channels; c++) {
            matrix[dst++] = unpackedArray[src + c];
        }
    }
}
exports.decodeMatrixFromUnpackedColorRGBAArray = decodeMatrixFromUnpackedColorRGBAArray;
function getPackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [Math.ceil(columns / 2), Math.ceil(rows / 2)];
}
exports.getPackedMatrixTextureShapeWidthHeight = getPackedMatrixTextureShapeWidthHeight;
function getPackedRGBAArraySizeFromMatrixShape(rows, columns) {
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    return w * h * 4;
}
exports.getPackedRGBAArraySizeFromMatrixShape = getPackedRGBAArraySizeFromMatrixShape;
function encodeMatrixToPackedRGBA(matrix, rows, columns, packedRGBA) {
    var requiredSize = getPackedRGBAArraySizeFromMatrixShape(rows, columns);
    if (packedRGBA.length < requiredSize) {
        throw new Error("packedRGBA length (" + packedRGBA.length + ") must be >= " + requiredSize);
    }
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), textureWidth = _a[0], textureHeight = _a[1];
    var oddWidth = (columns % 2) === 1;
    var oddHeight = (rows % 2) === 1;
    var widthInFullBlocks = Math.floor(columns / 2);
    var heightInFullBlocks = Math.floor(rows / 2);
    {
        var dstStride = (oddWidth ? 4 : 0);
        var oneRow = columns;
        var dst = 0;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            var matrixSrcRow = (blockY * 2 * columns);
            for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
                var matrixSrcCol = blockX * 2;
                var src = matrixSrcRow + matrixSrcCol;
                packedRGBA[dst] = matrix[src];
                packedRGBA[dst + 1] = matrix[src + 1];
                packedRGBA[dst + 2] = matrix[src + oneRow];
                packedRGBA[dst + 3] = matrix[src + oneRow + 1];
                dst += 4;
            }
            dst += dstStride;
        }
    }
    if (oddWidth) {
        var src = columns - 1;
        var dst = (textureWidth - 1) * 4;
        var srcStride = 2 * columns;
        var dstStride = textureWidth * 4;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            packedRGBA[dst] = matrix[src];
            packedRGBA[dst + 2] = matrix[src + columns];
            src += srcStride;
            dst += dstStride;
        }
    }
    if (oddHeight) {
        var src = (rows - 1) * columns;
        var dst = (textureHeight - 1) * textureWidth * 4;
        for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
            packedRGBA[dst++] = matrix[src++];
            packedRGBA[dst++] = matrix[src++];
            dst += 2;
        }
    }
    if (oddWidth && oddHeight) {
        packedRGBA[packedRGBA.length - 4] = matrix[matrix.length - 1];
    }
    return packedRGBA;
}
exports.encodeMatrixToPackedRGBA = encodeMatrixToPackedRGBA;
function decodeMatrixFromPackedRGBA(packedRGBA, rows, columns, matrix) {
    var requiredSize = rows * columns;
    if (requiredSize < matrix.length) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var oddWidth = (columns % 2) === 1;
    var oddHeight = (rows % 2) === 1;
    var widthInFullBlocks = Math.floor(columns / 2);
    var heightInFullBlocks = Math.floor(rows / 2);
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), textureWidth = _a[0], textureHeight = _a[1];
    {
        var srcStride = oddWidth ? 4 : 0;
        var dstStride = columns + (oddWidth ? 1 : 0);
        var src = 0;
        var dstRow1 = 0;
        var dstRow2 = columns;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
                matrix[dstRow1++] = packedRGBA[src++];
                matrix[dstRow1++] = packedRGBA[src++];
                matrix[dstRow2++] = packedRGBA[src++];
                matrix[dstRow2++] = packedRGBA[src++];
            }
            src += srcStride;
            dstRow1 += dstStride;
            dstRow2 += dstStride;
        }
    }
    if (oddWidth) {
        var src = (textureWidth - 1) * 4;
        var dst = columns - 1;
        var srcStride = textureWidth * 4;
        var dstStride = 2 * columns;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            matrix[dst] = packedRGBA[src];
            matrix[dst + columns] = packedRGBA[src + 2];
            src += srcStride;
            dst += dstStride;
        }
    }
    if (oddHeight) {
        var src = (textureHeight - 1) * textureWidth * 4;
        var dst = (rows - 1) * columns;
        for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
            matrix[dst++] = packedRGBA[src++];
            matrix[dst++] = packedRGBA[src++];
            src += 2;
        }
    }
    if (oddWidth && oddHeight) {
        matrix[matrix.length - 1] = packedRGBA[packedRGBA.length - 4];
    }
    return matrix;
}
exports.decodeMatrixFromPackedRGBA = decodeMatrixFromPackedRGBA;

},{}],102:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../../environment");
var util = require("../../../util");
var broadcast_util = require("../../broadcast_util");
var tex_util = require("./tex_util");
var tex_util_1 = require("./tex_util");
function makeShader(inputsInfo, outputShape, userCode, broadcast) {
    var sampleSnippet = getSampleSnippet();
    var setOutputSnippet = getSetOutputSnippet();
    var inputPrefixSnippet = inputsInfo.map(function (x) { return "uniform sampler2D " + x.name + ";"; }).join('\n');
    var inputSamplingSnippet = inputsInfo.map(function (x) { return getInputSamplingSnippet(x, outputShape, broadcast); })
        .join('\n');
    var outTexShape = outputShape.texShape;
    var outputSamplingSnippet = getOutputSamplingSnippet(outputShape.logicalShape, outTexShape);
    var source = [
        SHADER_PREFIX, sampleSnippet, setOutputSnippet, inputPrefixSnippet,
        outputSamplingSnippet, inputSamplingSnippet, userCode
    ].join('\n');
    return source;
}
exports.makeShader = makeShader;
function getSampleSnippet() {
    return environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED') ?
        FLOAT_TEXTURE_SAMPLE_SNIPPET :
        UNSIGNED_BYTE_TEXTURE_SAMPLE_SNIPPET;
}
function getSetOutputSnippet() {
    return environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED') ?
        FLOAT_TEXTURE_SETOUTPUT_SNIPPET :
        UNSIGNED_BYTE_TEXTURE_SETOUTPUT_SNIPPET;
}
function getSamplerFromInInfo(inInfo) {
    var shape = inInfo.shapeInfo.logicalShape;
    switch (shape.length) {
        case 0:
            return getSamplerScalar(inInfo);
        case 1:
            return getSampler1D(inInfo);
        case 2:
            return getSampler2D(inInfo);
        case 3:
            return getSampler3D(inInfo);
        case 4:
            return getSampler4D(inInfo);
        default:
            throw new Error(shape.length + "-D input sampling" +
                " is not yet supported");
    }
}
function getInputSamplingSnippet(inInfo, outShapeInfo, broadcast) {
    var res = getSamplerFlat(inInfo);
    res += getSamplerFromInInfo(inInfo);
    if (broadcast ||
        util.arraysEqual(inInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape)) {
        res += getSamplerAtOutputCoords(inInfo, outShapeInfo, broadcast);
    }
    return res;
}
function getOutputSamplingSnippet(outShape, outTexShape) {
    switch (outShape.length) {
        case 0:
            return getOutputScalarCoords();
        case 1:
            return getOutput1DCoords(outShape, outTexShape);
        case 2:
            return getOutput2DCoords(outShape, outTexShape);
        case 3:
            return getOutput3DCoords(outShape, outTexShape);
        case 4:
            return getOutput4DCoords(outShape, outTexShape);
        default:
            throw new Error(outShape.length + "-D output sampling is not yet supported");
    }
}
var SAMPLE_1D_SNIPPET = "\nvec2 UVfrom1D(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_2D_SNIPPET = "\nvec2 UVfrom2D(int texNumR, int texNumC, int numC, int row, int col) {\n  int index = row * numC + col;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_3D_SNIPPET = "\nvec2 UVfrom3D(int texNumR, int texNumC, int stride0,\n    int stride1, int row, int col, int depth) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_4D_SNIPPET = "\nvec2 UVfrom4D(int texNumR, int texNumC, int stride0,\n    int stride1, int stride2, int row, int col, int depth,\n    int depth2) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth * stride2 + depth2;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var UNSIGNED_BYTE_TEXTURE_SAMPLE_SNIPPET = "\n  uniform float NaN;\n\n  const vec4 floatDeltas = vec4(\n      1.0,\n      1.0 / 255.0,\n      1.0 / (255.0 * 255.0),\n      1.0 / (255.0 * 255.0 * 255.0)\n  );\n  const float minValue = " + tex_util.FLOAT_MIN + ".0;\n  const float maxValue = " + tex_util.FLOAT_MAX + ".0;\n  const float range = (maxValue - minValue) / 255.0;\n  const vec2 dotRange = vec2(1.0, range);\n\n  float sample(sampler2D texture, vec2 uv) {\n    vec4 sampleValue = texture2D(texture, uv);\n    if (all(equal(sampleValue, vec4(" + tex_util.BYTE_NAN_VALUE + ")))) {\n      return NaN;\n    }\n\n    vec4 encValue = floor(sampleValue * 255.0 + 0.5);\n    float decodedValue = dot(encValue, floatDeltas);\n    return dot(vec2(minValue, decodedValue), dotRange);\n  }\n";
var UNSIGNED_BYTE_TEXTURE_SETOUTPUT_SNIPPET = "\n  const vec4 floatPowers = vec4(\n    1.0,\n    255.0,\n    255.0 * 255.0,\n    255.0 * 255.0 * 255.0\n  );\n  const vec2 recipRange = vec2(1.0/range);\n  const vec2 recipRange255 = vec2(1.0/(maxValue - minValue));\n\n  void setOutput(float decodedValue) {\n    if (isNaN(decodedValue)) {\n      gl_FragColor = vec4(" + tex_util.BYTE_NAN_VALUE + ");\n      return;\n    }\n\n    float a = dot(vec2(decodedValue, -minValue), recipRange);\n    float b = fract(a) * 255.0;\n    float c = fract(b) * 255.0;\n    float d = fract(c) * 255.0;\n    gl_FragColor = floor(vec4(a, b, c, d)) / 255.0;\n\n    // TODO(dsmilkov): Version above gets better accuracy but probably slower\n    // than the version below. Benchmark to determine if the accuracy is worth\n    // the cost.\n\n    // float normValue = dot(vec2(decodedValue, -minValue), recipRange255);\n    // vec4 f = normValue * floatPowers;\n    // gl_FragColor = floor(fract(f) * 255.0) / 255.0;\n  }\n";
var FLOAT_TEXTURE_SAMPLE_SNIPPET = "\n  float sample(sampler2D texture, vec2 uv) {\n    return texture2D(texture, uv).r;\n  }\n";
var FLOAT_TEXTURE_SETOUTPUT_SNIPPET = "\n  void setOutput(float val) {\n    gl_FragColor = vec4(val, 0, 0, 0);\n  }\n";
var SHADER_PREFIX = "\n  precision highp float;\n  precision highp int;\n  varying vec2 resultUV;\n  const vec2 halfCR = vec2(0.5, 0.5);\n\n  bool isNaN(float val) {\n    float v1 = val * val;\n    float v2 = val * val;\n    return v1 == v2 ? false : true;\n  }\n\n  bool hasNaN(vec4 values) {\n    vec4 v1 = values * values;\n    vec4 v2 = values * values;\n    return any(notEqual(v1, v2));\n  }\n\n  float getNaN(vec4 values) {\n    return dot(vec4(1), values);\n  }\n\n  int round(float value) {\n    return int(floor(value + 0.5));\n  }\n\n  int imod(int x, int y) {\n    return x - y * (x / y);\n  }\n\n  const vec2 randomConst = vec2(\n    23.14069263277926, // e^pi (Gelfond's constant)\n     2.665144142690225 // 2^sqrt(2) (Gelfond\u2013Schneider constant)\n  );\n\n  float random(float seed) {\n      return fract(cos(dot(resultUV * seed, randomConst)) * 12345.6789);\n  }\n\n  float sampleUVAndDepth(sampler2D texture, vec2 uv, int depth) {\n    float value;\n    if (depth == 0) {\n      value = texture2D(texture, uv).r;\n    } else if (depth == 1) {\n      value = texture2D(texture, uv).g;\n    } else if (depth == 2) {\n      value = texture2D(texture, uv).b;\n    } else if (depth == 3) {\n      value = texture2D(texture, uv).a;\n    }\n    return floor(value * 255.0 + 0.5);\n  }\n\n  " + SAMPLE_1D_SNIPPET + "\n  " + SAMPLE_2D_SNIPPET + "\n  " + SAMPLE_3D_SNIPPET + "\n  " + SAMPLE_4D_SNIPPET + "\n";
function getOutputScalarCoords() {
    return "\n    int getOutputCoords() {\n      return 0;\n    }\n  ";
}
function getOutput1DCoords(shape, texShape) {
    if (texShape[0] === 1) {
        return "\n      int getOutputCoords() {\n        return int(resultUV.x * " + texShape[1] + ".0);\n      }\n    ";
    }
    if (texShape[1] === 1) {
        return "\n      int getOutputCoords() {\n        return int(resultUV.y * " + texShape[0] + ".0);\n      }\n    ";
    }
    return "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      return resTexRC.x * " + texShape[1] + " + resTexRC.y;\n    }\n  ";
}
function getOutput3DCoords(shape, texShape) {
    var stride0 = shape[1] * shape[2];
    var stride1 = shape[2];
    return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      int r = index / " + stride0 + ";\n      index -= r * " + stride0 + ";\n      int c = index / " + stride1 + ";\n      int d = index - c * " + stride1 + ";\n      return ivec3(r, c, d);\n    }\n  ";
}
function getOutput4DCoords(shape, texShape) {
    var stride2 = shape[3];
    var stride1 = shape[2] * stride2;
    var stride0 = shape[1] * stride1;
    return "\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n\n      int r = index / " + stride0 + ";\n      index -= r * " + stride0 + ";\n\n      int c = index / " + stride1 + ";\n      index -= c * " + stride1 + ";\n\n      int d = index / " + stride2 + ";\n      int d2 = index - d * " + stride2 + ";\n\n      return ivec4(r, c, d, d2);\n    }\n  ";
}
function getOutput2DCoords(shape, texShape) {
    if (util.arraysEqual(shape, texShape)) {
        return "\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(" + texShape[0] + ", " + texShape[1] + "));\n      }\n    ";
    }
    if (shape[1] === 1) {
        return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + texShape[0] + ", " + texShape[1] + "));\n        int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    ";
    }
    if (shape[0] === 1) {
        return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + texShape[0] + ", " + texShape[1] + "));\n        int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n        return ivec2(0, index);\n      }\n    ";
    }
    return "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      int r = index / " + shape[1] + ";\n      int c = index - r * " + shape[1] + ";\n      return ivec2(r, c);\n    }\n  ";
}
function getSamplerScalar(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    return "\n    float " + funcName + "() {\n      return sample(" + texName + ", halfCR);\n    }\n  ";
}
function getSampler1D(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    return "\n    float " + funcName + "(int index) {\n      return " + funcName + "Flat(index);\n    }\n  ";
}
function getSampler2D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texShape = inputInfo.shapeInfo.texShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    if (util.arraysEqual(shape, texShape)) {
        return "\n    float " + funcName + "(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    var squeezedShape = newShape;
    if (squeezedShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
        var params = ['row', 'col'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    if (texNumC === 1) {
        return "\n    float " + funcName + "(int row, int col) {\n      int index = row * " + shape[1] + " + col;\n      vec2 uv = vec2(0.5, (float(index) + 0.5) / " + texNumR + ".0);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    if (texNumR === 1) {
        return "\n    float " + funcName + "(int row, int col) {\n      int index = row * " + shape[1] + " + col;\n      vec2 uv = vec2((float(index) + 0.5) / " + texNumC + ".0, 0.5);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    return "\n  float " + funcName + "(int row, int col) {\n    vec2 uv = UVfrom2D(" + texNumR + ", " + texNumC + ", " + shape[1] + ", row, col);\n    return sample(" + texName + ", uv);\n  }\n";
}
function getSampler3D(inputInfo) {
    var texShape = inputInfo.shapeInfo.texShape;
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    var stride0 = shape[1] * shape[2];
    var stride1 = shape[2];
    var texType = inputInfo.shapeInfo.textureType;
    if (texType === tex_util_1.TextureType.DEFAULT) {
        var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
        var squeezedShape = newShape;
        if (squeezedShape.length < shape.length) {
            var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
            var params = ['row', 'col', 'depth'];
            return "\n        " + getSamplerFromInInfo(newInputInfo) + "\n        float " + funcName + "(int row, int col, int depth) {\n          return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n        }\n      ";
        }
    }
    if (texNumC === stride0) {
        if (texType === tex_util_1.TextureType.DEFAULT) {
            return "\n        float " + funcName + "(int row, int col, int depth) {\n          int texR = row;\n          int texC = col * " + stride1 + " + depth;\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(" + texNumC + ".0, " + texNumR + ".0);\n          return sample(" + texName + ", uv);\n        }\n      ";
        }
        else if (texType === tex_util_1.TextureType.RGBA_COLOR) {
            return "\n        float " + funcName + "(int row, int col, int depth) {\n          vec2 uv = (vec2(col, row) + halfCR) /\n                     vec2(" + texNumC + ".0, " + texNumR + ".0);\n          return sampleUVAndDepth(" + texName + ", uv, depth);\n        }\n      ";
        }
        else {
            throw new Error("Unknown TextureType " + texType + ".");
        }
    }
    if (texNumC === stride1 && texType === tex_util_1.TextureType.DEFAULT) {
        return "\n    float " + funcName + "(int row, int col, int depth) {\n      int texR = row * " + shape[1] + " + col;\n      int texC = depth;\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    if (texType === tex_util_1.TextureType.DEFAULT) {
        return "\n      float " + funcName + "(int row, int col, int depth) {\n        vec2 uv = UVfrom3D(\n            " + texNumR + ", " + texNumC + ", " + stride0 + ", " + stride1 + ", row, col, depth);\n        return sample(" + texName + ", uv);\n      }\n  ";
    }
    else if (texType === tex_util_1.TextureType.RGBA_COLOR) {
        return "\n      float " + funcName + "(int row, int col, int depth) {\n        vec2 uv = UVfrom2D(" + texNumR + ", " + texNumC + ", " + shape[1] + ", row, col);\n        return sampleUVAndDepth(" + texName + ", uv, depth);\n      }\n    ";
    }
    else {
        throw new Error("Unknown TextureType " + texType + ".");
    }
}
function getSampler4D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texShape = inputInfo.shapeInfo.texShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    var stride2 = shape[3];
    var stride1 = shape[2] * stride2;
    var stride0 = shape[1] * stride1;
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    if (newShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, newShape);
        var params = ['row', 'col', 'depth', 'depth2'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    if (texNumC === stride0) {
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        int texR = row;\n        int texC = col * " + stride1 + " + depth * " + stride2 + " + depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    if (texNumC === stride2) {
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        int texR = row * " + shape[1] * shape[2] + " + col * " + shape[2] + " + depth;\n        int texC = depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    return "\n    float " + funcName + "(int row, int col, int depth, int depth2) {\n      vec2 uv = UVfrom4D(" + texNumR + ", " + texNumC + ", " + stride0 + ", " + stride1 + ",\n          " + stride2 + ", row, col, depth, depth2);\n      return sample(" + texName + ", uv);\n    }\n  ";
}
function getSamplerFlat(inputInfo) {
    var texName = inputInfo.name;
    var texShape = inputInfo.shapeInfo.texShape;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1) + 'Flat';
    var tNumR = texShape[0];
    var tNumC = texShape[1];
    if (tNumC === 1 && tNumR === 1) {
        return "\n      float " + funcName + "(int index) {\n        return sample(" + texName + ", halfCR);\n      }\n    ";
    }
    if (tNumC === 1) {
        return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2(0.5, (float(index) + 0.5) / " + tNumR + ".0);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    if (tNumR === 1) {
        return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2((float(index) + 0.5) / " + tNumC + ".0, 0.5);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    return "\n    float " + funcName + "(int index) {\n      vec2 uv = UVfrom1D(" + tNumR + ", " + tNumC + ", index);\n      return sample(" + texName + ", uv);\n    }\n  ";
}
function getBroadcastOutputCoordsSampler(inputInfo, outShapeInfo, texFuncSnippet, funcName) {
    var inRank = inputInfo.shapeInfo.logicalShape.length;
    var outRank = outShapeInfo.logicalShape.length;
    var type = 'int';
    if (outRank === 2) {
        type = 'ivec2';
    }
    else if (outRank === 3) {
        type = 'ivec3';
    }
    else if (outRank === 4) {
        type = 'ivec4';
    }
    var broadcastDims = broadcast_util.getBroadcastDims(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
    var rankDiff = outRank - inRank;
    var coordsSnippet;
    if (inRank === 0) {
        coordsSnippet = '';
    }
    else if (outRank < 2 && broadcastDims.length >= 1) {
        coordsSnippet = 'coords = 0;';
    }
    else {
        coordsSnippet =
            broadcastDims.map(function (d) { return "coords[" + (d + rankDiff) + "] = 0;"; }).join('\n');
    }
    var unpackedCoordsSnippet = '';
    if (outRank < 2 && inRank > 0) {
        unpackedCoordsSnippet = 'coords';
    }
    else {
        unpackedCoordsSnippet = inputInfo.shapeInfo.logicalShape
            .map(function (s, i) { return "coords[" + (i + rankDiff) + "]"; })
            .join(', ');
    }
    return "\n    float " + funcName + "() {\n      " + type + " coords = getOutputCoords();\n      " + coordsSnippet + "\n      return get" + texFuncSnippet + "(" + unpackedCoordsSnippet + ");\n    }\n  ";
}
function getSamplerAtOutputCoords(inputInfo, outShapeInfo, supportsBroadcasting) {
    var inTexShape = inputInfo.shapeInfo.texShape;
    var texName = inputInfo.name;
    var isRGBAColorTexture = inputInfo.shapeInfo.textureType === tex_util_1.TextureType.RGBA_COLOR;
    var texFuncSnippet = texName.charAt(0).toUpperCase() + texName.slice(1);
    var funcName = 'get' + texFuncSnippet + 'AtOutCoords';
    var broadcastDims = broadcast_util.getBroadcastDims(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
    var inRank = inputInfo.shapeInfo.logicalShape.length;
    var outRank = outShapeInfo.logicalShape.length;
    var doBroadcast = supportsBroadcasting && ((outRank > inRank) || broadcastDims.length > 0);
    var broadcastOverOuter = broadcast_util.broadcastDimsAreOuter(broadcastDims);
    if (doBroadcast && !broadcastOverOuter) {
        return getBroadcastOutputCoordsSampler(inputInfo, outShapeInfo, texFuncSnippet, funcName);
    }
    var outTexShape = outShapeInfo.texShape;
    if (util.arraysEqual(inTexShape, outTexShape) && !isRGBAColorTexture) {
        return "\n      float " + funcName + "() {\n        return sample(" + texName + ", resultUV);\n      }\n    ";
    }
    var inTexExpandedShape = isRGBAColorTexture ?
        [inTexShape[0], inTexShape[1] * inputInfo.shapeInfo.logicalShape[2]] :
        inTexShape;
    var sampleSnippet = "return sample(" + texName + ", uv);";
    var rgbaColorSnippet = '';
    if (isRGBAColorTexture) {
        rgbaColorSnippet = "\n      int col = texC / " + inputInfo.shapeInfo.logicalShape[2] + ";\n      int texD = texC - col * " + inputInfo.shapeInfo.logicalShape[2] + ";\n      texC = col;\n    ";
        sampleSnippet = "return sampleUVAndDepth(" + texName + ", uv, texD);";
    }
    var inSize = util.sizeFromShape(inTexExpandedShape);
    var broadcastSnippet = '';
    if (doBroadcast && broadcastOverOuter) {
        broadcastSnippet = "\n        int mainPart = index / " + inSize + ";\n        index -= mainPart * " + inSize + ";\n      ";
    }
    return "\n    float " + funcName + "() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + outTexShape[0] + ", " + outTexShape[1] + "));\n      int index = resTexRC.x * " + outTexShape[1] + " + resTexRC.y;\n      " + broadcastSnippet + "\n      int texR = index / " + inTexExpandedShape[1] + ";\n      int texC = index - texR * " + inTexExpandedShape[1] + ";\n\n      " + rgbaColorSnippet + "\n\n      vec2 uv = (vec2(texC, texR) + halfCR) /\n                 vec2(" + inTexShape[1] + ".0, " + inTexShape[0] + ".0);\n\n      " + sampleSnippet + "\n    }\n  ";
}
function getCoordsDataType(rank) {
    if (rank === 1) {
        return 'int';
    }
    else if (rank === 2) {
        return 'ivec2';
    }
    else if (rank === 3) {
        return 'ivec3';
    }
    else if (rank === 4) {
        return 'ivec4';
    }
    else {
        throw Error("GPU for rank " + rank + " is not yet supported");
    }
}
exports.getCoordsDataType = getCoordsDataType;
function squeezeInputInfo(inInfo, squeezedShape) {
    var newInputInfo = JSON.parse(JSON.stringify(inInfo));
    newInputInfo.shapeInfo.logicalShape = squeezedShape;
    return newInputInfo;
}
function getSqueezedParams(params, keptDims) {
    return keptDims.map(function (d) { return params[d]; }).join(', ');
}

},{"../../../environment":16,"../../../util":18,"../../broadcast_util":53,"./tex_util":76}],62:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var concat_util = require("../../concat_util");
var shader_compiler_1 = require("./shader_compiler");
var ConcatProgram = (function () {
    function ConcatProgram(aShape, bShape, axis) {
        this.variableNames = ['A', 'B'];
        this.outputShape = [];
        var yAxes = ['yR', 'yC', 'yD', 'yW'];
        var concatAxis = yAxes[axis];
        this.outputShape = concat_util.computeOutShape(aShape, bShape, axis);
        var dType = shader_compiler_1.getCoordsDataType(aShape.length);
        var unpackSnippet = getUnpack(aShape.length);
        var sampleCoords = getSampleCoords(aShape.length);
        this.userCode = "\n      void main() {\n        " + dType + " coords = getOutputCoords();\n        " + unpackSnippet + "\n\n        float value = 0.0;\n        if (" + concatAxis + " < " + aShape[axis] + ") {\n          value = getA(" + sampleCoords + ");\n        } else {\n          " + concatAxis + " -= " + aShape[axis] + ";\n          value = getB(" + sampleCoords + ");\n        }\n\n        setOutput(value);\n      }\n    ";
    }
    return ConcatProgram;
}());
exports.ConcatProgram = ConcatProgram;
function getSampleCoords(rank) {
    if (rank === 1) {
        return 'yR';
    }
    else if (rank === 2) {
        return 'yR, yC';
    }
    else if (rank === 3) {
        return 'yR, yC, yD';
    }
    else if (rank === 4) {
        return 'yR, yC, yD, yW';
    }
    else {
        throw Error("Concat for rank " + rank + " is not yet supported");
    }
}
function getUnpack(rank) {
    var res = rank === 1 ? 'int yR = coords;' : 'int yR = coords.x;';
    if (rank > 1) {
        res += '\nint yC = coords.y;';
    }
    if (rank > 2) {
        res += '\nint yD = coords.z;';
    }
    if (rank > 3) {
        res += '\nint yW = coords.w;';
    }
    if (rank > 4) {
        throw Error("Concat for rank " + rank + " is not yet supported");
    }
    return res;
}

},{"../../concat_util":47,"./shader_compiler":102}],63:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Conv2DDerFilterProgram = (function () {
    function Conv2DDerFilterProgram(convInfo) {
        this.variableNames = ['x', 'dy'];
        this.outputShape = convInfo.filterShape;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int b = 0; b < " + convInfo.batchSize + "; b++) {\n          for (int yR = 0; yR < " + convInfo.outHeight + "; yR++) {\n            int xR = wR + yR * " + strideHeight + " - " + padTop + ";\n\n            if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n              continue;\n            }\n\n            for (int yC = 0; yC < " + convInfo.outWidth + "; yC++) {\n              int xC = wC + yC * " + strideWidth + " - " + padLeft + ";\n\n              if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DDerFilterProgram;
}());
exports.Conv2DDerFilterProgram = Conv2DDerFilterProgram;
var Conv2DDerInputProgram = (function () {
    function Conv2DDerInputProgram(convInfo) {
        this.variableNames = ['dy', 'W'];
        this.outputShape = convInfo.inShape;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        this.userCode = "\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n          if (dyR < 0.0 || dyR >= " + convInfo.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = " + filterHeight + " - 1 - wR;\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n            if (dyC < 0.0 || dyC >= " + convInfo.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = " + filterWidth + " - 1 - wC;\n\n            for (int d2 = 0; d2 < " + convInfo.outChannels + "; d2++) {\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, d2);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DDerInputProgram;
}());
exports.Conv2DDerInputProgram = Conv2DDerInputProgram;
var Conv2DDerBiasProgram = (function () {
    function Conv2DDerBiasProgram(yShape) {
        this.variableNames = ['dy'];
        var batchSize = yShape[0], yNumRows = yShape[1], yNumCols = yShape[2], outputDepth = yShape[3];
        this.outputShape = [outputDepth];
        this.userCode = "\n      void main() {\n        int d2 = getOutputCoords();\n\n        float derBias = 0.0;\n        for (int b = 0; b < " + batchSize + "; b++) {\n          for (int yR = 0; yR < " + yNumRows + "; yR++) {\n            for (int yC = 0; yC < " + yNumCols + "; yC++) {\n              derBias += getDy(b, yR, yC, d2);\n            }\n          }\n        }\n        setOutput(derBias);\n      }\n    ";
    }
    return Conv2DDerBiasProgram;
}());
exports.Conv2DDerBiasProgram = Conv2DDerBiasProgram;

},{}],64:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Conv2DProgram = (function () {
    function Conv2DProgram(convInfo, hasBias) {
        this.variableNames = ['x', 'W'];
        if (hasBias) {
            this.variableNames.push('bias');
        }
        this.outputShape = convInfo.outShape;
        var biasSnippet = hasBias ? 'dotProd += getBias(d2);' : '';
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var inputDepthNearestVec4 = Math.floor(convInfo.inChannels / 4) * 4;
        var inputDepthVec4Remainder = convInfo.inChannels % 4;
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d2 = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            int xC = xCCorner + wC;\n\n            if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n              continue;\n            }\n\n            for (int d1 = 0; d1 < " + inputDepthNearestVec4 + "; d1 += 4) {\n              vec4 xValues = vec4(\n                getX(batch, xR, xC, d1),\n                getX(batch, xR, xC, d1 + 1),\n                getX(batch, xR, xC, d1 + 2),\n                getX(batch, xR, xC, d1 + 3)\n              );\n              vec4 wValues = vec4(\n                getW(wR, wC, d1, d2),\n                getW(wR, wC, d1 + 1, d2),\n                getW(wR, wC, d1 + 2, d2),\n                getW(wR, wC, d1 + 3, d2)\n              );\n\n              dotProd += dot(xValues, wValues);\n            }\n\n            if (" + (inputDepthVec4Remainder === 1) + ") {\n              dotProd +=\n                getX(batch, xR, xC, " + inputDepthNearestVec4 + ") *\n                getW(wR, wC, " + inputDepthNearestVec4 + ", d2);\n            } else if (" + (inputDepthVec4Remainder === 2) + ") {\n              vec2 xValues = vec2(\n                getX(batch, xR, xC, " + inputDepthNearestVec4 + "),\n                getX(batch, xR, xC, " + inputDepthNearestVec4 + " + 1)\n              );\n              vec2 wValues = vec2(\n                getW(wR, wC, " + inputDepthNearestVec4 + ", d2),\n                getW(wR, wC, " + inputDepthNearestVec4 + " + 1, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            } else if (" + (inputDepthVec4Remainder === 3) + ") {\n              vec3 xValues = vec3(\n                getX(batch, xR, xC, " + inputDepthNearestVec4 + "),\n                getX(batch, xR, xC, " + inputDepthNearestVec4 + " + 1),\n                getX(batch, xR, xC, " + inputDepthNearestVec4 + " + 2)\n              );\n              vec3 wValues = vec3(\n                getW(wR, wC, " + inputDepthNearestVec4 + ", d2),\n                getW(wR, wC, " + inputDepthNearestVec4 + " + 1, d2),\n                getW(wR, wC, " + inputDepthNearestVec4 + " + 2, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            }\n          }\n        }\n        " + biasSnippet + "\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DProgram;
}());
exports.Conv2DProgram = Conv2DProgram;

},{}],65:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DepthwiseConv2DProgram = (function () {
    function DepthwiseConv2DProgram(convInfo) {
        this.variableNames = ['x', 'W'];
        this.outputShape = convInfo.outShape;
        var xNumRows = convInfo.inHeight;
        var xNumCols = convInfo.inWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var channelMul = convInfo.outChannels / convInfo.inChannels;
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / " + channelMul + ";\n        int q = d2 - d1 * " + channelMul + ";\n\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        // TODO(dsmilkov): Flatten the two for loops and vec4 the operations.\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + xNumRows + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            int xC = xCCorner + wC;\n\n            if (xC < 0 || xC >= " + xNumCols + ") {\n              continue;\n            }\n\n            float xVal = getX(batch, xR, xC, d1);\n            float wVal = getW(wR, wC, d1, q);\n            dotProd += xVal * wVal;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return DepthwiseConv2DProgram;
}());
exports.DepthwiseConv2DProgram = DepthwiseConv2DProgram;

},{}],66:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Copy2DProgram = (function () {
    function Copy2DProgram(srcNumCols, destNumCols) {
        this.variableNames = ['source'];
        this.outputShape = null;
        this.userCode = "\n      uniform ivec2 sourceStart;\n      uniform ivec2 destStart;\n\n      void main() {\n        ivec2 destCoords = getOutputCoords() - destStart;\n        int index = destCoords.x * " + destNumCols + " + destCoords.y;\n        int r = index / " + srcNumCols + ";\n        ivec2 sourceCoords = sourceStart + ivec2(r, index - r * " + srcNumCols + ");\n        setOutput(getSource(sourceCoords.x, sourceCoords.y));\n      }\n    ";
    }
    Copy2DProgram.prototype.getCustomSetupFunc = function (sourceStart, destStart, destSize) {
        return function (gpgpu, webGLProgram) {
            gpgpu.setOutputMatrixWriteRegion(destStart[0], destSize[0], destStart[1], destSize[1]);
            var sourceStartCRLoc = gpgpu.getUniformLocation(webGLProgram, 'sourceStart');
            gpgpu.gl.uniform2i(sourceStartCRLoc, sourceStart[0], sourceStart[1]);
            var destStartCRLoc = gpgpu.getUniformLocation(webGLProgram, 'destStart');
            gpgpu.gl.uniform2i(destStartCRLoc, destStart[0], destStart[1]);
        };
    };
    return Copy2DProgram;
}());
exports.Copy2DProgram = Copy2DProgram;

},{}],43:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_TEXTURE_SIZE = null;
var util = require("../../../util");
var environment_1 = require("../../../environment");
function createWebGLRenderingContext(attributes) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return createWebGLRenderingContextFromCanvas(canvas, attributes);
}
exports.createWebGLRenderingContext = createWebGLRenderingContext;
function createWebGLRenderingContextFromCanvas(canvas, attributes) {
    var gl;
    var webglVersion = environment_1.ENV.get('WEBGL_VERSION');
    if (webglVersion === 2) {
        gl = canvas.getContext('webgl2', attributes);
    }
    else if (webglVersion === 1) {
        gl = (canvas.getContext('webgl', attributes) ||
            canvas.getContext('experimental-webgl', attributes));
    }
    if (webglVersion === 0 || gl == null) {
        throw new Error('This browser does not support WebGL.');
    }
    return gl;
}
exports.createWebGLRenderingContextFromCanvas = createWebGLRenderingContextFromCanvas;
function callAndCheck(gl, func) {
    var returnValue = func();
    checkWebGLError(gl);
    return returnValue;
}
exports.callAndCheck = callAndCheck;
var webGLDebugErrorCheckingEnabled = false;
function enableDebugWebGLErrorChecking(enabled) {
    webGLDebugErrorCheckingEnabled = enabled;
}
exports.enableDebugWebGLErrorChecking = enableDebugWebGLErrorChecking;
function checkWebGLError(gl) {
    if (webGLDebugErrorCheckingEnabled) {
        var error = gl.getError();
        if (error !== gl.NO_ERROR) {
            throw new Error('WebGL Error: ' + getWebGLErrorMessage(gl, error));
        }
    }
}
exports.checkWebGLError = checkWebGLError;
function getWebGLErrorMessage(gl, status) {
    switch (status) {
        case gl.NO_ERROR:
            return 'NO_ERROR';
        case gl.INVALID_ENUM:
            return 'INVALID_ENUM';
        case gl.INVALID_VALUE:
            return 'INVALID_VALUE';
        case gl.INVALID_OPERATION:
            return 'INVALID_OPERATION';
        case gl.INVALID_FRAMEBUFFER_OPERATION:
            return 'INVALID_FRAMEBUFFER_OPERATION';
        case gl.OUT_OF_MEMORY:
            return 'OUT_OF_MEMORY';
        case gl.CONTEXT_LOST_WEBGL:
            return 'CONTEXT_LOST_WEBGL';
        default:
            return "Unknown error code " + status;
    }
}
exports.getWebGLErrorMessage = getWebGLErrorMessage;
function getExtensionOrThrow(gl, extensionName) {
    return throwIfNull(gl, function () { return gl.getExtension(extensionName); }, 'Extension "' + extensionName + '" not supported on this browser.');
}
exports.getExtensionOrThrow = getExtensionOrThrow;
function createVertexShader(gl, vertexShaderSource) {
    var vertexShader = throwIfNull(gl, function () { return gl.createShader(gl.VERTEX_SHADER); }, 'Unable to create vertex WebGLShader.');
    callAndCheck(gl, function () { return gl.shaderSource(vertexShader, vertexShaderSource); });
    callAndCheck(gl, function () { return gl.compileShader(vertexShader); });
    if (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) === false) {
        console.log(gl.getShaderInfoLog(vertexShader));
        throw new Error('Failed to compile vertex shader.');
    }
    return vertexShader;
}
exports.createVertexShader = createVertexShader;
function createFragmentShader(gl, fragmentShaderSource) {
    var fragmentShader = throwIfNull(gl, function () { return gl.createShader(gl.FRAGMENT_SHADER); }, 'Unable to create fragment WebGLShader.');
    callAndCheck(gl, function () { return gl.shaderSource(fragmentShader, fragmentShaderSource); });
    callAndCheck(gl, function () { return gl.compileShader(fragmentShader); });
    if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) === false) {
        logShaderSourceAndInfoLog(fragmentShaderSource, gl.getShaderInfoLog(fragmentShader));
        throw new Error('Failed to compile fragment shader.');
    }
    return fragmentShader;
}
exports.createFragmentShader = createFragmentShader;
var lineNumberRegex = /ERROR: [0-9]+:([0-9]+):/g;
function logShaderSourceAndInfoLog(shaderSource, shaderInfoLog) {
    var lineNumberRegexResult = lineNumberRegex.exec(shaderInfoLog);
    if (lineNumberRegexResult == null) {
        console.log("Couldn't parse line number in error: " + shaderInfoLog);
        console.log(shaderSource);
        return;
    }
    var lineNumber = +lineNumberRegexResult[1];
    var shaderLines = shaderSource.split('\n');
    var pad = shaderLines.length.toString().length + 2;
    var linesWithLineNumbers = shaderLines.map(function (line, lineNumber) {
        return util.rightPad((lineNumber + 1).toString(), pad) + line;
    });
    var maxLineLength = 0;
    for (var i = 0; i < linesWithLineNumbers.length; i++) {
        maxLineLength = Math.max(linesWithLineNumbers[i].length, maxLineLength);
    }
    var beforeErrorLines = linesWithLineNumbers.slice(0, lineNumber - 1);
    var errorLine = linesWithLineNumbers.slice(lineNumber - 1, lineNumber);
    var afterErrorLines = linesWithLineNumbers.slice(lineNumber);
    console.log(beforeErrorLines.join('\n'));
    console.log(shaderInfoLog.split('\n')[0]);
    console.log("%c " + util.rightPad(errorLine[0], maxLineLength), 'border:1px solid red; background-color:#e3d2d2; color:#a61717');
    console.log(afterErrorLines.join('\n'));
}
function createProgram(gl) {
    return throwIfNull(gl, function () { return gl.createProgram(); }, 'Unable to create WebGLProgram.');
}
exports.createProgram = createProgram;
function linkProgram(gl, program) {
    callAndCheck(gl, function () { return gl.linkProgram(program); });
    if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
        console.log(gl.getProgramInfoLog(program));
        throw new Error('Failed to link vertex and fragment shaders.');
    }
}
exports.linkProgram = linkProgram;
function validateProgram(gl, program) {
    callAndCheck(gl, function () { return gl.validateProgram(program); });
    if (gl.getProgramParameter(program, gl.VALIDATE_STATUS) === false) {
        console.log(gl.getProgramInfoLog(program));
        throw new Error('Shader program validation failed.');
    }
}
exports.validateProgram = validateProgram;
function createStaticVertexBuffer(gl, data) {
    var buffer = throwIfNull(gl, function () { return gl.createBuffer(); }, 'Unable to create WebGLBuffer');
    callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, buffer); });
    callAndCheck(gl, function () { return gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); });
    return buffer;
}
exports.createStaticVertexBuffer = createStaticVertexBuffer;
function createStaticIndexBuffer(gl, data) {
    var buffer = throwIfNull(gl, function () { return gl.createBuffer(); }, 'Unable to create WebGLBuffer');
    callAndCheck(gl, function () { return gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer); });
    callAndCheck(gl, function () { return gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW); });
    return buffer;
}
exports.createStaticIndexBuffer = createStaticIndexBuffer;
function queryMaxTextureSize(gl) {
    if (MAX_TEXTURE_SIZE != null) {
        return MAX_TEXTURE_SIZE;
    }
    MAX_TEXTURE_SIZE =
        callAndCheck(gl, function () { return gl.getParameter(gl.MAX_TEXTURE_SIZE); });
    return MAX_TEXTURE_SIZE;
}
exports.queryMaxTextureSize = queryMaxTextureSize;
function getChannelsPerTexture() {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return 4;
    }
    if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
        return 1;
    }
    return 4;
}
exports.getChannelsPerTexture = getChannelsPerTexture;
function createTexture(gl) {
    return throwIfNull(gl, function () { return gl.createTexture(); }, 'Unable to create WebGLTexture.');
}
exports.createTexture = createTexture;
function validateTextureSize(gl, width, height) {
    var maxTextureSize = queryMaxTextureSize(gl);
    if ((width <= 0) || (height <= 0)) {
        var requested = "[" + width + "x" + height + "]";
        throw new Error('Requested texture size ' + requested + ' is invalid.');
    }
    if ((width > maxTextureSize) || (height > maxTextureSize)) {
        var requested = "[" + width + "x" + height + "]";
        var max = "[" + maxTextureSize + "x" + maxTextureSize + "]";
        throw new Error('Requested texture size ' + requested +
            ' greater than WebGL maximum on this browser / GPU ' + max + '.');
    }
}
exports.validateTextureSize = validateTextureSize;
function createFramebuffer(gl) {
    return throwIfNull(gl, function () { return gl.createFramebuffer(); }, 'Unable to create WebGLFramebuffer.');
}
exports.createFramebuffer = createFramebuffer;
function bindVertexBufferToProgramAttribute(gl, program, attribute, buffer, arrayEntriesPerItem, itemStrideInBytes, itemOffsetInBytes, attribLocations) {
    var loc = -1;
    if ((attribLocations != null) && (attribute in attribLocations)) {
        loc = attribLocations[attribute];
    }
    else {
        loc = gl.getAttribLocation(program, attribute);
    }
    if (loc === -1) {
        return;
    }
    callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, buffer); });
    callAndCheck(gl, function () { return gl.vertexAttribPointer(loc, arrayEntriesPerItem, gl.FLOAT, false, itemStrideInBytes, itemOffsetInBytes); });
    callAndCheck(gl, function () { return gl.enableVertexAttribArray(loc); });
}
exports.bindVertexBufferToProgramAttribute = bindVertexBufferToProgramAttribute;
function bindTextureUnit(gl, texture, textureUnit) {
    validateTextureUnit(gl, textureUnit);
    callAndCheck(gl, function () { return gl.activeTexture(gl.TEXTURE0 + textureUnit); });
    callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
}
exports.bindTextureUnit = bindTextureUnit;
function unbindTextureUnit(gl, textureUnit) {
    validateTextureUnit(gl, textureUnit);
    callAndCheck(gl, function () { return gl.activeTexture(gl.TEXTURE0 + textureUnit); });
    callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
exports.unbindTextureUnit = unbindTextureUnit;
function getProgramUniformLocationOrThrow(gl, program, uniformName) {
    return throwIfNull(gl, function () { return gl.getUniformLocation(program, uniformName); }, 'uniform "' + uniformName + '" not present in program.');
}
exports.getProgramUniformLocationOrThrow = getProgramUniformLocationOrThrow;
function bindTextureToProgramUniformSampler(gl, program, texture, uniformSamplerLocation, textureUnit) {
    callAndCheck(gl, function () { return bindTextureUnit(gl, texture, textureUnit); });
    callAndCheck(gl, function () { return gl.uniform1i(uniformSamplerLocation, textureUnit); });
}
exports.bindTextureToProgramUniformSampler = bindTextureToProgramUniformSampler;
function bindCanvasToFramebuffer(gl) {
    callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, null); });
    callAndCheck(gl, function () { return gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); });
    callAndCheck(gl, function () { return gl.scissor(0, 0, gl.canvas.width, gl.canvas.height); });
}
exports.bindCanvasToFramebuffer = bindCanvasToFramebuffer;
function bindColorTextureToFramebuffer(gl, texture, framebuffer) {
    callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); });
    callAndCheck(gl, function () { return gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0); });
}
exports.bindColorTextureToFramebuffer = bindColorTextureToFramebuffer;
function unbindColorTextureFromFramebuffer(gl, framebuffer) {
    callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); });
    callAndCheck(gl, function () { return gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0); });
}
exports.unbindColorTextureFromFramebuffer = unbindColorTextureFromFramebuffer;
function validateFramebuffer(gl) {
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error('Error binding framebuffer: ' + getFramebufferErrorMessage(gl, status));
    }
}
exports.validateFramebuffer = validateFramebuffer;
function getFramebufferErrorMessage(gl, status) {
    switch (status) {
        case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            return 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT';
        case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            return 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT';
        case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            return 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS';
        case gl.FRAMEBUFFER_UNSUPPORTED:
            return 'FRAMEBUFFER_UNSUPPORTED';
        default:
            return "unknown error " + status;
    }
}
exports.getFramebufferErrorMessage = getFramebufferErrorMessage;
function throwIfNull(gl, returnTOrNull, failureMessage) {
    var tOrNull = callAndCheck(gl, function () { return returnTOrNull(); });
    if (tOrNull == null) {
        throw new Error(failureMessage);
    }
    return tOrNull;
}
function validateTextureUnit(gl, textureUnit) {
    var maxTextureUnit = gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1;
    var glTextureUnit = textureUnit + gl.TEXTURE0;
    if (glTextureUnit < gl.TEXTURE0 || glTextureUnit > maxTextureUnit) {
        var textureUnitRange = "[gl.TEXTURE0, gl.TEXTURE" + maxTextureUnit + "]";
        throw new Error("textureUnit must be in " + textureUnitRange + ".");
    }
}
function getTextureShapeFromLogicalShape(gl, logShape) {
    if (logShape.length !== 2) {
        var squeezeResult = util.squeezeShape(logShape);
        logShape = squeezeResult.newShape;
    }
    var maxTexSize = queryMaxTextureSize(gl);
    var size = util.sizeFromShape(logShape);
    if (logShape.length <= 1 && size <= maxTexSize) {
        return [size, 1];
    }
    else if (logShape.length === 2 && logShape[0] <= maxTexSize &&
        logShape[1] <= maxTexSize) {
        return logShape;
    }
    else if (logShape.length === 3 && logShape[0] <= maxTexSize &&
        logShape[1] * logShape[2] <= maxTexSize) {
        return [logShape[0], logShape[1] * logShape[2]];
    }
    else if (logShape.length === 4 && logShape[0] <= maxTexSize &&
        logShape[1] * logShape[2] * logShape[3] <= maxTexSize) {
        return [logShape[0], logShape[1] * logShape[2] * logShape[3]];
    }
    else {
        return util.sizeToSquarishShape(size);
    }
}
exports.getTextureShapeFromLogicalShape = getTextureShapeFromLogicalShape;

},{"../../../environment":16,"../../../util":18}],41:[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../../environment");
var tex_util = require("./tex_util");
var webgl_util = require("./webgl_util");
function getWebGLContextAttributes() {
    return {
        alpha: false,
        antialias: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        depth: false,
        stencil: false,
        failIfMajorPerformanceCaveat: true
    };
}
exports.getWebGLContextAttributes = getWebGLContextAttributes;
function createWebGLContext(canvas) {
    var attributes = getWebGLContextAttributes();
    var gl;
    if (canvas != null) {
        gl = webgl_util.createWebGLRenderingContextFromCanvas(canvas, attributes);
    }
    else {
        gl = webgl_util.createWebGLRenderingContext(attributes);
    }
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.DEPTH_TEST); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.STENCIL_TEST); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.BLEND); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.DITHER); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.POLYGON_OFFSET_FILL); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.SAMPLE_COVERAGE); });
    webgl_util.callAndCheck(gl, function () { return gl.enable(gl.SCISSOR_TEST); });
    webgl_util.callAndCheck(gl, function () { return gl.enable(gl.CULL_FACE); });
    webgl_util.callAndCheck(gl, function () { return gl.cullFace(gl.BACK); });
    return gl;
}
exports.createWebGLContext = createWebGLContext;
function createVertexShader(gl) {
    var vertexShaderSource = "\n    precision highp float;\n    attribute vec3 clipSpacePos;\n    attribute vec2 uv;\n    varying vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }";
    return webgl_util.createVertexShader(gl, vertexShaderSource);
}
exports.createVertexShader = createVertexShader;
function createVertexBuffer(gl) {
    var vertexArray = new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]);
    return webgl_util.createStaticVertexBuffer(gl, vertexArray);
}
exports.createVertexBuffer = createVertexBuffer;
function createIndexBuffer(gl) {
    var triangleVertexIndices = new Uint16Array([0, 1, 2, 2, 1, 3]);
    return webgl_util.createStaticIndexBuffer(gl, triangleVertexIndices);
}
exports.createIndexBuffer = createIndexBuffer;
function getTextureInternalFormat(gl, numChannels) {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return gl.RGBA;
    }
    if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
        if (numChannels === 4) {
            return gl.RGBA32F;
        }
        return gl.R32F;
    }
    return gl.RGBA;
}
function getTextureFormat(gl, numChannels) {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return gl.RGBA;
    }
    if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
        if (numChannels === 4) {
            return gl.RGBA;
        }
        return gl.RED;
    }
    return gl.RGBA;
}
function getTextureType(gl) {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return gl.UNSIGNED_BYTE;
    }
    return gl.FLOAT;
}
function createAndConfigureTexture(gl, width, height, numChannels) {
    webgl_util.validateTextureSize(gl, width, height);
    var texture = webgl_util.createTexture(gl);
    var tex2d = gl.TEXTURE_2D;
    var internalFormat = getTextureInternalFormat(gl, numChannels);
    var format = getTextureFormat(gl, numChannels);
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(tex2d, texture); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_MIN_FILTER, gl.NEAREST); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_MAG_FILTER, gl.NEAREST); });
    webgl_util.callAndCheck(gl, function () { return gl.texImage2D(tex2d, 0, internalFormat, width, height, 0, format, getTextureType(gl), null); });
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
    return texture;
}
function createMatrixTexture(gl, rows, columns) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    var numChannels = 1;
    return createAndConfigureTexture(gl, width, height, numChannels);
}
exports.createMatrixTexture = createMatrixTexture;
function createColorMatrixTexture(gl, rows, columns) {
    var _a = tex_util.getColorMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    var numChannels = 4;
    return createAndConfigureTexture(gl, width, height, numChannels);
}
exports.createColorMatrixTexture = createColorMatrixTexture;
function createPackedMatrixTexture(gl, rows, columns) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    var numChannels = 4;
    return createAndConfigureTexture(gl, width, height, numChannels);
}
exports.createPackedMatrixTexture = createPackedMatrixTexture;
function bindVertexProgramAttributeStreams(gl, program, vertexBuffer, attribLocations) {
    var posOffset = 0;
    var uvOffset = 3 * 4;
    var stride = (3 * 4) + (2 * 4);
    webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); });
    webgl_util.bindVertexBufferToProgramAttribute(gl, program, 'clipSpacePos', vertexBuffer, 3, stride, posOffset, attribLocations);
    webgl_util.bindVertexBufferToProgramAttribute(gl, program, 'uv', vertexBuffer, 2, stride, uvOffset, attribLocations);
}
exports.bindVertexProgramAttributeStreams = bindVertexProgramAttributeStreams;
function uploadPixelDataToTexture(gl, texture, pixels) {
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
    webgl_util.callAndCheck(gl, function () { return gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels); });
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
exports.uploadPixelDataToTexture = uploadPixelDataToTexture;
function uploadDataToTexture(gl, texture, width, height, data, numChannels) {
    var textureFormat = getTextureFormat(gl, numChannels);
    webgl_util.validateTextureSize(gl, width, height);
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
    webgl_util.callAndCheck(gl, function () { return gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, textureFormat, getTextureType(gl), data); });
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
function uploadMatrixToTexture(gl, texture, rows, columns, matrix, numChannels) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var unpackedArray;
    if (environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        var channelsPerTexture = numChannels === 1 ? webgl_util.getChannelsPerTexture() : numChannels;
        if (channelsPerTexture === 1) {
            unpackedArray = matrix;
        }
        else {
            unpackedArray =
                new Float32Array(tex_util.getUnpackedArraySizeFromMatrixSize(matrix.length, channelsPerTexture));
            tex_util.encodeMatrixToUnpackedArray(matrix, unpackedArray, channelsPerTexture);
        }
    }
    else {
        unpackedArray = tex_util.encodeFloatArray(matrix);
    }
    uploadDataToTexture(gl, texture, w, h, unpackedArray, numChannels);
}
exports.uploadMatrixToTexture = uploadMatrixToTexture;
function uploadMatrixToPackedTexture(gl, texture, rows, columns, matrix) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var packedRGBA = new Float32Array(tex_util.getPackedRGBAArraySizeFromMatrixShape(rows, columns));
    tex_util.encodeMatrixToPackedRGBA(matrix, rows, columns, packedRGBA);
    var numChannels = 4;
    uploadDataToTexture(gl, texture, w, h, packedRGBA, numChannels);
}
exports.uploadMatrixToPackedTexture = uploadMatrixToPackedTexture;
function getDownloadTargetArrayBuffer(rows, columns, channelsPerTexture) {
    var isFloatTexture = environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED');
    var downloadTarget;
    if (isFloatTexture) {
        downloadTarget =
            new Float32Array(tex_util.getUnpackedArraySizeFromMatrixSize(rows * columns, channelsPerTexture));
    }
    else {
        downloadTarget = new Uint8Array(rows * columns * channelsPerTexture);
    }
    return downloadTarget;
}
function decodeDownloadTargetArrayBuffer(downloadTarget, rows, columns, channelsPerPixel) {
    var isFloatTexture = environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED');
    if (isFloatTexture) {
        var matrix = new Float32Array(rows * columns);
        tex_util.decodeMatrixFromUnpackedArray(downloadTarget, matrix, channelsPerPixel);
        return matrix;
    }
    else {
        return tex_util.decodeToFloatArray(downloadTarget);
    }
}
function downloadMatrixFromOutputTextureAsync(gl, getBufferSubDataAsyncExtension, rows, columns) {
    return __awaiter(this, void 0, void 0, function () {
        var gl2, channelsPerPixel, downloadTarget, bufferSizeBytes, buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gl2 = gl;
                    channelsPerPixel = 4;
                    downloadTarget = getDownloadTargetArrayBuffer(rows, columns, channelsPerPixel);
                    bufferSizeBytes = downloadTarget instanceof Float32Array ?
                        downloadTarget.length * 4 :
                        downloadTarget;
                    buffer = gl.createBuffer();
                    webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer); });
                    webgl_util.callAndCheck(gl, function () { return gl.bufferData(gl2.PIXEL_PACK_BUFFER, bufferSizeBytes, gl.STATIC_DRAW); });
                    webgl_util.callAndCheck(gl, function () {
                        return gl2.readPixels(0, 0, columns, rows, gl.RGBA, getTextureType(gl), 0);
                    });
                    return [4, getBufferSubDataAsyncExtension.getBufferSubDataAsync(gl2.PIXEL_PACK_BUFFER, 0, downloadTarget)];
                case 1:
                    _a.sent();
                    return [2, decodeDownloadTargetArrayBuffer(downloadTarget, rows, columns, channelsPerPixel)];
            }
        });
    });
}
exports.downloadMatrixFromOutputTextureAsync = downloadMatrixFromOutputTextureAsync;
function downloadMatrixFromOutputTexture(gl, rows, columns) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var channelsPerPixel = 4;
    var downloadTarget = getDownloadTargetArrayBuffer(rows, columns, channelsPerPixel);
    webgl_util.callAndCheck(gl, function () { return gl.readPixels(0, 0, w, h, gl.RGBA, getTextureType(gl), downloadTarget); });
    return decodeDownloadTargetArrayBuffer(downloadTarget, rows, columns, channelsPerPixel);
}
exports.downloadMatrixFromOutputTexture = downloadMatrixFromOutputTexture;
function downloadMatrixFromRGBAColorTexture(gl, rows, columns, channels) {
    var size = rows * columns * 4;
    var downloadTarget = new Uint8Array(size);
    webgl_util.callAndCheck(gl, function () { return gl.readPixels(0, 0, columns, rows, gl.RGBA, gl.UNSIGNED_BYTE, downloadTarget); });
    var packedRGBA = new Float32Array(size);
    for (var i = 0; i < downloadTarget.length; i++) {
        packedRGBA[i] = downloadTarget[i];
    }
    var matrix = new Float32Array(rows * columns * channels);
    tex_util.decodeMatrixFromUnpackedColorRGBAArray(packedRGBA, matrix, channels);
    return matrix;
}
exports.downloadMatrixFromRGBAColorTexture = downloadMatrixFromRGBAColorTexture;
function downloadMatrixFromPackedOutputTexture(gl, rows, columns) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var packedRGBA = new Float32Array(tex_util.getPackedRGBAArraySizeFromMatrixShape(rows, columns));
    webgl_util.callAndCheck(gl, function () { return gl.readPixels(0, 0, w, h, gl.RGBA, getTextureType(gl), packedRGBA); });
    var matrix = new Float32Array(rows * columns);
    return tex_util.decodeMatrixFromPackedRGBA(packedRGBA, rows, columns, matrix);
}
exports.downloadMatrixFromPackedOutputTexture = downloadMatrixFromPackedOutputTexture;

},{"../../../environment":16,"./tex_util":76,"./webgl_util":43}],45:[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../../environment");
var util = require("../../../util");
var gpgpu_util = require("./gpgpu_util");
var tex_util = require("./tex_util");
var webgl_util = require("./webgl_util");
var GPGPUContext = (function () {
    function GPGPUContext(gl) {
        this.outputTexture = null;
        this.program = null;
        this.disposed = false;
        this.autoDebugValidate = false;
        if (gl != null) {
            this.gl = gl;
        }
        else {
            this.gl = gpgpu_util.createWebGLContext();
        }
        if (environment_1.ENV.get('WEBGL_VERSION') === 1) {
            this.textureFloatExtension =
                webgl_util.getExtensionOrThrow(this.gl, 'OES_texture_float');
            this.colorBufferFloatExtension =
                this.gl.getExtension('WEBGL_color_buffer_float');
        }
        else {
            this.colorBufferFloatExtension =
                webgl_util.getExtensionOrThrow(this.gl, 'EXT_color_buffer_float');
        }
        this.loseContextExtension =
            webgl_util.getExtensionOrThrow(this.gl, 'WEBGL_lose_context');
        if (environment_1.ENV.get('WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED')) {
            this.getBufferSubDataAsyncExtension =
                this.gl.getExtension('WEBGL_get_buffer_sub_data_async');
        }
        this.vertexBuffer = gpgpu_util.createVertexBuffer(this.gl);
        this.indexBuffer = gpgpu_util.createIndexBuffer(this.gl);
        this.framebuffer = webgl_util.createFramebuffer(this.gl);
    }
    GPGPUContext.prototype.dispose = function () {
        var _this = this;
        this.throwIfDisposed();
        if (this.program != null) {
            console.warn('Disposing a GPGPUContext that still has a bound WebGLProgram.' +
                ' This is probably a resource leak, delete the program with ' +
                'GPGPUContext.deleteProgram before disposing.');
        }
        if (this.outputTexture != null) {
            console.warn('Disposing a GPGPUContext that still has a bound output matrix ' +
                'texture.  This is probably a resource leak, delete the output ' +
                'matrix texture with GPGPUContext.deleteMatrixTexture before ' +
                'disposing.');
        }
        var gl = this.gl;
        webgl_util.callAndCheck(gl, function () { return gl.finish(); });
        webgl_util.callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, null); });
        webgl_util.callAndCheck(gl, function () { return gl.deleteFramebuffer(_this.framebuffer); });
        webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, null); });
        webgl_util.callAndCheck(gl, function () { return gl.deleteBuffer(_this.vertexBuffer); });
        webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); });
        webgl_util.callAndCheck(gl, function () { return gl.deleteBuffer(_this.indexBuffer); });
        this.loseContextExtension.loseContext();
        this.disposed = true;
    };
    GPGPUContext.prototype.enableAutomaticDebugValidation = function (enabled) {
        this.autoDebugValidate = enabled;
        webgl_util.enableDebugWebGLErrorChecking(enabled);
    };
    GPGPUContext.prototype.createMatrixTexture = function (rows, columns) {
        this.throwIfDisposed();
        return gpgpu_util.createMatrixTexture(this.gl, rows, columns);
    };
    GPGPUContext.prototype.uploadPixelDataToTexture = function (texture, pixels) {
        this.throwIfDisposed();
        gpgpu_util.uploadPixelDataToTexture(this.gl, texture, pixels);
    };
    GPGPUContext.prototype.createPackedMatrixTexture = function (rows, columns) {
        this.throwIfDisposed();
        return gpgpu_util.createPackedMatrixTexture(this.gl, rows, columns);
    };
    GPGPUContext.prototype.deleteMatrixTexture = function (texture) {
        var _this = this;
        this.throwIfDisposed();
        if (this.outputTexture === texture) {
            webgl_util.unbindColorTextureFromFramebuffer(this.gl, this.framebuffer);
            this.outputTexture = null;
        }
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.deleteTexture(texture); });
    };
    GPGPUContext.prototype.uploadMatrixToTexture = function (texture, rows, columns, matrix) {
        this.throwIfDisposed();
        var numChannels = 1;
        return gpgpu_util.uploadMatrixToTexture(this.gl, texture, rows, columns, matrix, numChannels);
    };
    GPGPUContext.prototype.uploadMatrixToPackedTexture = function (texture, rows, columns, matrix) {
        this.throwIfDisposed();
        return gpgpu_util.uploadMatrixToPackedTexture(this.gl, texture, rows, columns, matrix);
    };
    GPGPUContext.prototype.downloadMatrixFromTexture = function (texture, rows, columns) {
        var _this = this;
        return this.downloadMatrixDriver(texture, function () {
            return gpgpu_util.downloadMatrixFromOutputTexture(_this.gl, rows, columns);
        });
    };
    GPGPUContext.prototype.downloadMatrixFromTextureAsync = function (texture, rows, columns) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.getBufferSubDataAsyncExtension == null) {
                    throw new Error("Cannot download matrix from output texture asynchronously, " +
                        "WEBGL_get_buffer_sub_data_async is not enabled.");
                }
                return [2, this.downloadMatrixDriverAsync(texture, function () { return gpgpu_util.downloadMatrixFromOutputTextureAsync(_this.gl, _this.getBufferSubDataAsyncExtension, rows, columns); })];
            });
        });
    };
    GPGPUContext.prototype.downloadMatrixFromRGBAColorTexture = function (texture, rows, columns, channels) {
        var _this = this;
        return this.downloadMatrixDriver(texture, function () { return gpgpu_util.downloadMatrixFromRGBAColorTexture(_this.gl, rows, columns, channels); });
    };
    GPGPUContext.prototype.downloadMatrixFromPackedTexture = function (texture, rows, columns) {
        var _this = this;
        return this.downloadMatrixDriver(texture, function () { return gpgpu_util.downloadMatrixFromPackedOutputTexture(_this.gl, rows, columns); });
    };
    GPGPUContext.prototype.createProgram = function (fragmentShaderSource) {
        this.throwIfDisposed();
        var gl = this.gl;
        var fragmentShader = webgl_util.createFragmentShader(gl, fragmentShaderSource);
        var vertexShader = gpgpu_util.createVertexShader(gl);
        var program = webgl_util.createProgram(gl);
        webgl_util.callAndCheck(gl, function () { return gl.attachShader(program, vertexShader); });
        webgl_util.callAndCheck(gl, function () { return gl.attachShader(program, fragmentShader); });
        webgl_util.linkProgram(gl, program);
        if (this.autoDebugValidate) {
            webgl_util.validateProgram(gl, program);
        }
        return program;
    };
    GPGPUContext.prototype.deleteProgram = function (program) {
        var _this = this;
        this.throwIfDisposed();
        if (program === this.program) {
            this.program = null;
        }
        if (program != null) {
            webgl_util.callAndCheck(this.gl, function () { return _this.gl.deleteProgram(program); });
        }
    };
    GPGPUContext.prototype.setProgram = function (program) {
        var _this = this;
        this.throwIfDisposed();
        this.program = program;
        if ((this.program != null) && this.autoDebugValidate) {
            webgl_util.validateProgram(this.gl, this.program);
        }
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.useProgram(program); });
    };
    GPGPUContext.prototype.getUniformLocation = function (program, uniformName) {
        this.throwIfDisposed();
        return webgl_util.getProgramUniformLocationOrThrow(this.gl, program, uniformName);
    };
    GPGPUContext.prototype.getAttributeLocation = function (program, attribute) {
        var _this = this;
        this.throwIfDisposed();
        return webgl_util.callAndCheck(this.gl, function () { return _this.gl.getAttribLocation(program, attribute); });
    };
    GPGPUContext.prototype.getUniformLocationNoThrow = function (program, uniformName) {
        this.throwIfDisposed();
        return this.gl.getUniformLocation(program, uniformName);
    };
    GPGPUContext.prototype.setInputMatrixTexture = function (inputMatrixTexture, uniformLocation, textureUnit) {
        this.throwIfDisposed();
        this.throwIfNoProgram();
        webgl_util.bindTextureToProgramUniformSampler(this.gl, this.program, inputMatrixTexture, uniformLocation, textureUnit);
    };
    GPGPUContext.prototype.setOutputMatrixTexture = function (outputMatrixTexture, rows, columns) {
        this.setOutputMatrixTextureDriver(outputMatrixTexture, columns, rows);
    };
    GPGPUContext.prototype.setOutputPackedMatrixTexture = function (outputPackedMatrixTexture, rows, columns) {
        this.throwIfDisposed();
        var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
        this.setOutputMatrixTextureDriver(outputPackedMatrixTexture, width, height);
    };
    GPGPUContext.prototype.setOutputMatrixWriteRegion = function (startRow, numRows, startColumn, numColumns) {
        this.setOutputMatrixWriteRegionDriver(startColumn, startRow, numColumns, numRows);
    };
    GPGPUContext.prototype.setOutputPackedMatrixWriteRegion = function (startRow, numRows, startColumn, numColumns) {
        throw new Error('setOutputPackedMatrixWriteRegion not implemented.');
    };
    GPGPUContext.prototype.debugValidate = function () {
        if (this.program != null) {
            webgl_util.validateProgram(this.gl, this.program);
        }
        webgl_util.validateFramebuffer(this.gl);
    };
    GPGPUContext.prototype.executeProgram = function (attribLocations) {
        this.throwIfDisposed();
        this.throwIfNoProgram();
        var gl = this.gl;
        gpgpu_util.bindVertexProgramAttributeStreams(gl, this.program, this.vertexBuffer, attribLocations);
        if (this.autoDebugValidate) {
            this.debugValidate();
        }
        webgl_util.callAndCheck(gl, function () { return gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0); });
    };
    GPGPUContext.prototype.blockUntilAllProgramsCompleted = function () {
        var _this = this;
        this.throwIfDisposed();
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.finish(); });
    };
    GPGPUContext.prototype.runQuery = function (queryFn) {
        if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
            return this.runQueryWebGL2(queryFn);
        }
        return this.runQueryWebGL1(queryFn);
    };
    GPGPUContext.prototype.runQueryWebGL2 = function (benchmark) {
        var _this = this;
        var ext = webgl_util.getExtensionOrThrow(this.gl, 'EXT_disjoint_timer_query_webgl2');
        var query = this.gl.createQuery();
        this.gl.beginQuery(ext.TIME_ELAPSED_EXT, query);
        benchmark();
        this.gl.endQuery(ext.TIME_ELAPSED_EXT);
        return new Promise(function (resolve, reject) {
            var queryGPU = function () {
                var available = _this.gl
                    .getQueryParameter(query, _this.gl.QUERY_RESULT_AVAILABLE);
                var disjoint = _this.gl.getParameter(ext.GPU_DISJOINT_EXT);
                return available && !disjoint;
            };
            var getTimeElapsed = function () {
                var timeElapsedNanos = _this.gl
                    .getQueryParameter(query, _this.gl.QUERY_RESULT);
                resolve(timeElapsedNanos / 1000000);
            };
            var resolveWithWarning = function () {
                console.warn('Disjoint query timer never available.');
                resolve(-1);
            };
            util.repeatedTry(queryGPU).then(getTimeElapsed).catch(resolveWithWarning);
        });
    };
    GPGPUContext.prototype.runQueryWebGL1 = function (benchmark) {
        var _this = this;
        var ext = webgl_util.getExtensionOrThrow(this.gl, 'EXT_disjoint_timer_query');
        var query = ext.createQueryEXT();
        ext.beginQueryEXT(ext.TIME_ELAPSED_EXT, query);
        benchmark();
        ext.endQueryEXT(ext.TIME_ELAPSED_EXT);
        return new Promise(function (resolve, reject) {
            var queryGPU = function () {
                var available = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_AVAILABLE_EXT);
                var disjoint = _this.gl.getParameter(ext.GPU_DISJOINT_EXT);
                return available && !disjoint;
            };
            var getTimeElapsed = function () {
                var timeElapsedNanos = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_EXT);
                resolve(timeElapsedNanos / 1000000);
            };
            var resolveWithWarning = function () {
                console.warn('Disjoint query timer never available.');
                resolve(-1);
            };
            util.repeatedTry(queryGPU).then(getTimeElapsed).catch(resolveWithWarning);
        });
    };
    GPGPUContext.prototype.downloadMatrixDriverSetup = function (texture) {
        this.throwIfDisposed();
        webgl_util.bindColorTextureToFramebuffer(this.gl, texture, this.framebuffer);
        if (this.autoDebugValidate) {
            webgl_util.validateFramebuffer(this.gl);
        }
    };
    GPGPUContext.prototype.downloadMatrixDriverTeardown = function () {
        if (this.outputTexture != null) {
            webgl_util.bindColorTextureToFramebuffer(this.gl, this.outputTexture, this.framebuffer);
            if (this.autoDebugValidate) {
                webgl_util.validateFramebuffer(this.gl);
            }
        }
        else {
            webgl_util.unbindColorTextureFromFramebuffer(this.gl, this.framebuffer);
        }
    };
    GPGPUContext.prototype.downloadMatrixDriver = function (texture, downloadAndDecode) {
        this.downloadMatrixDriverSetup(texture);
        var result = downloadAndDecode();
        this.downloadMatrixDriverTeardown();
        return result;
    };
    GPGPUContext.prototype.downloadMatrixDriverAsync = function (texture, downloadAndDecode) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.downloadMatrixDriverSetup(texture);
                        return [4, downloadAndDecode()];
                    case 1:
                        result = _a.sent();
                        this.downloadMatrixDriverTeardown();
                        return [2, result];
                }
            });
        });
    };
    GPGPUContext.prototype.setOutputMatrixTextureDriver = function (outputMatrixTextureMaybePacked, width, height) {
        this.throwIfDisposed();
        var gl = this.gl;
        webgl_util.bindColorTextureToFramebuffer(gl, outputMatrixTextureMaybePacked, this.framebuffer);
        if (this.autoDebugValidate) {
            webgl_util.validateFramebuffer(gl);
        }
        this.outputTexture = outputMatrixTextureMaybePacked;
        webgl_util.callAndCheck(gl, function () { return gl.viewport(0, 0, width, height); });
        webgl_util.callAndCheck(gl, function () { return gl.scissor(0, 0, width, height); });
    };
    GPGPUContext.prototype.setOutputMatrixWriteRegionDriver = function (x, y, width, height) {
        var _this = this;
        this.throwIfDisposed();
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.scissor(x, y, width, height); });
    };
    GPGPUContext.prototype.throwIfDisposed = function () {
        if (this.disposed) {
            throw new Error('Attempted to use disposed GPGPUContext.');
        }
    };
    GPGPUContext.prototype.throwIfNoProgram = function () {
        if (this.program == null) {
            throw new Error('No GPU program is currently set.');
        }
    };
    return GPGPUContext;
}());
exports.GPGPUContext = GPGPUContext;

},{"../../../environment":16,"../../../util":18,"./gpgpu_util":41,"./tex_util":76,"./webgl_util":43}],67:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../../environment");
var util = require("../../../util");
var shader_compiler = require("./shader_compiler");
var ATTRIBUTE_NAMES = ['uv', 'clipSpacePos'];
var NAN_UNIFORM_NAME = 'NaN';
function shouldUploadNaNUniform() {
    return !environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED');
}
function compileProgram(gpgpu, program, inputs, output) {
    var userCode = program.userCode;
    var inputInfos = inputs.map(function (input, i) {
        var shapeInfo = {
            logicalShape: input.array.shape,
            texShape: input.texData.texShape,
            textureType: input.texData.textureType
        };
        return { name: program.variableNames[i], shapeInfo: shapeInfo };
    });
    var inShapeInfos = inputInfos.map(function (x) { return x.shapeInfo; });
    var outShapeInfo = {
        logicalShape: output.array.shape,
        texShape: output.texData.texShape,
        textureType: output.texData.textureType
    };
    var source = shader_compiler.makeShader(inputInfos, outShapeInfo, userCode, program.supportsBroadcasting === true);
    var webGLProgram = gpgpu.createProgram(source);
    var uniformLocations = {};
    for (var i = 0; i < program.variableNames.length; i++) {
        var uniformName = program.variableNames[i];
        uniformLocations[uniformName] =
            gpgpu.getUniformLocation(webGLProgram, uniformName);
    }
    var attributeLocations = {};
    ATTRIBUTE_NAMES.forEach(function (attribute) {
        attributeLocations[attribute] =
            gpgpu.getAttributeLocation(webGLProgram, attribute);
    });
    if (shouldUploadNaNUniform()) {
        uniformLocations[NAN_UNIFORM_NAME] =
            gpgpu.getUniformLocation(webGLProgram, NAN_UNIFORM_NAME);
    }
    return {
        program: program,
        source: source,
        webGLProgram: webGLProgram,
        uniformLocations: uniformLocations,
        attributeLocations: attributeLocations,
        gpgpu: gpgpu,
        inShapeInfos: inShapeInfos,
        outShapeInfo: outShapeInfo
    };
}
exports.compileProgram = compileProgram;
function validateBinaryAndProgram(shapeInfos, inputs) {
    if (shapeInfos.length !== inputs.length) {
        throw Error("Binary was compiled with " + shapeInfos.length + " inputs, but " +
            ("was executed with " + inputs.length + " inputs"));
    }
    shapeInfos.forEach(function (s, i) {
        var shapeA = s.logicalShape;
        var texShapeA = s.texShape;
        var shapeB = inputs[i].array.shape;
        var texShapeB = inputs[i].texData.texShape;
        if (!util.arraysEqual(shapeA, shapeB)) {
            throw Error("Binary was compiled with different shapes than " +
                ("the current args. Shapes " + shapeA + " and " + shapeB + " must match"));
        }
        if (!util.arraysEqual(texShapeA, texShapeB)) {
            throw Error("Binary was compiled with different texture shapes than the" +
                (" current args. Shape " + texShapeA + " and " + texShapeB + " must match"));
        }
    });
}
function runProgram(binary, inputs, output, customSetup) {
    validateBinaryAndProgram(binary.inShapeInfos, inputs);
    validateBinaryAndProgram([binary.outShapeInfo], [output]);
    var outTex = output.texData.texture;
    var outTexShape = output.texData.texShape;
    var gpgpu = binary.gpgpu;
    gpgpu.setOutputMatrixTexture(outTex, outTexShape[0], outTexShape[1]);
    gpgpu.setProgram(binary.webGLProgram);
    inputs.forEach(function (input, i) {
        var tex = input.texData.texture;
        var variableName = binary.program.variableNames[i];
        var variableUniformLocation = binary.uniformLocations[variableName];
        gpgpu.setInputMatrixTexture(tex, variableUniformLocation, i);
    });
    if (shouldUploadNaNUniform()) {
        gpgpu.gl.uniform1f(binary.uniformLocations[NAN_UNIFORM_NAME], NaN);
    }
    if (customSetup != null) {
        customSetup(gpgpu, binary.webGLProgram);
    }
    gpgpu.executeProgram(binary.attributeLocations);
}
exports.runProgram = runProgram;
function makeShaderKey(program, inputs, output) {
    var keyInputs = '';
    inputs.concat(output).forEach(function (x) {
        keyInputs += x.array.shape + "_" + x.texData.texShape;
    });
    var keyUserCode = program.userCode;
    var keyBroadcast = (program.supportsBroadcasting === true).toString();
    var key = program.constructor.name;
    key += '_' + keyBroadcast + '_' + keyInputs + '_' + keyUserCode;
    return key;
}
exports.makeShaderKey = makeShaderKey;

},{"../../../environment":16,"../../../util":18,"./shader_compiler":102}],68:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaxPool2DBackpropProgram = (function () {
    function MaxPool2DBackpropProgram(convInfo) {
        this.variableNames = ['dy', 'maxPos'];
        this.outputShape = convInfo.inShape;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        var lastIndex = filterHeight * filterWidth - 1;
        this.userCode = "\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n          if (dyR < 0.0 || dyR >= " + convInfo.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n            if (dyC < 0.0 || dyC >= " + convInfo.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n            int maxPosValue = " + lastIndex + " - int(getMaxPos(b, idyR, idyC, d));\n\n            // Get the current value, check it against the value from the\n            // position matrix.\n            int curPosValue = wR * " + filterWidth + " + wC;\n            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n            dotProd += dyValue * mask;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return MaxPool2DBackpropProgram;
}());
exports.MaxPool2DBackpropProgram = MaxPool2DBackpropProgram;

},{}],69:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matmul_1 = require("../types/matmul");
var MatMulProgram = (function () {
    function MatMulProgram(aShape, bShape, aOrient, bOrient) {
        if (aOrient === void 0) { aOrient = matmul_1.MatrixOrientation.REGULAR; }
        if (bOrient === void 0) { bOrient = matmul_1.MatrixOrientation.REGULAR; }
        this.variableNames = ['matrixA', 'matrixB'];
        var outerShapeA = (aOrient === matmul_1.MatrixOrientation.REGULAR) ? aShape[0] : aShape[1];
        var outerShapeB = (bOrient === matmul_1.MatrixOrientation.REGULAR) ? bShape[1] : bShape[0];
        this.outputShape = [outerShapeA, outerShapeB];
        var sharedDim = (aOrient === matmul_1.MatrixOrientation.REGULAR ? aShape[1] : aShape[0]);
        var aSnippetFromOffset = function (vec4Offset, indexVar) {
            return (aOrient === matmul_1.MatrixOrientation.REGULAR) ?
                "aRow, " + indexVar + " + " + vec4Offset :
                indexVar + " + " + vec4Offset + ", aRow";
        };
        var bSnippetFromOffset = function (vec4Offset, indexVar) {
            return (bOrient === matmul_1.MatrixOrientation.REGULAR) ?
                indexVar + " + " + vec4Offset + ", bCol" :
                "bCol, " + indexVar + " + " + vec4Offset;
        };
        var sharedDimNearestVec4 = Math.floor(sharedDim / 4) * 4;
        var sharedDimVec4Remainder = sharedDim % 4;
        this.userCode = " float dotARowBCol(int aRow, int bCol) {\n      float result = 0.0;\n      for (int i = 0; i < " + sharedDimNearestVec4 + "; i += 4) {\n        vec4 a = vec4(\n          getMatrixA(" + aSnippetFromOffset(0, 'i') + "),\n          getMatrixA(" + aSnippetFromOffset(1, 'i') + "),\n          getMatrixA(" + aSnippetFromOffset(2, 'i') + "),\n          getMatrixA(" + aSnippetFromOffset(3, 'i') + ")\n        );\n        vec4 b = vec4(\n          getMatrixB(" + bSnippetFromOffset(0, 'i') + "),\n          getMatrixB(" + bSnippetFromOffset(1, 'i') + "),\n          getMatrixB(" + bSnippetFromOffset(2, 'i') + "),\n          getMatrixB(" + bSnippetFromOffset(3, 'i') + ")\n        );\n\n        result += dot(a, b);\n      }\n\n      if (" + (sharedDimVec4Remainder === 1) + ") {\n        result += getMatrixA(" + aSnippetFromOffset(0, sharedDimNearestVec4) + ") *\n          getMatrixB(" + bSnippetFromOffset(0, sharedDimNearestVec4) + ");\n      } else if (" + (sharedDimVec4Remainder === 2) + ") {\n        vec2 a = vec2(\n          getMatrixA(" + aSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixA(" + aSnippetFromOffset(1, sharedDimNearestVec4) + ")\n        );\n        vec2 b = vec2(\n          getMatrixB(" + bSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixB(" + bSnippetFromOffset(1, sharedDimNearestVec4) + ")\n        );\n        result += dot(a, b);\n      } else if (" + (sharedDimVec4Remainder === 3) + ") {\n        vec3 a = vec3(\n          getMatrixA(" + aSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixA(" + aSnippetFromOffset(1, sharedDimNearestVec4) + "),\n          getMatrixA(" + aSnippetFromOffset(2, sharedDimNearestVec4) + ")\n        );\n        vec3 b = vec3(\n          getMatrixB(" + bSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixB(" + bSnippetFromOffset(1, sharedDimNearestVec4) + "),\n          getMatrixB(" + bSnippetFromOffset(2, sharedDimNearestVec4) + ")\n        );\n        result += dot(a, b);\n      }\n\n      return result;\n    }\n\n    void main() {\n      ivec2 resRC = getOutputCoords();\n      setOutput(dotARowBCol(resRC.x, resRC.y));\n    }\n    ";
    }
    return MatMulProgram;
}());
exports.MatMulProgram = MatMulProgram;

},{"../types/matmul":44}],70:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultinomialProgram = (function () {
    function MultinomialProgram(batchSize, numOutcomes, numSamples) {
        this.variableNames = ['probs'];
        this.outputShape = [batchSize, numSamples];
        this.userCode = "\n      uniform float seed;\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n\n        float r = random(seed);\n        float cdf = 0.0;\n\n        for (int i = 0; i < " + (numOutcomes - 1) + "; i++) {\n          cdf += getProbs(batch, i);\n\n          if (r < cdf) {\n            setOutput(float(i));\n            return;\n          }\n        }\n\n        // If no other event happened, last event happened.\n        setOutput(float(" + (numOutcomes - 1) + "));\n      }\n    ";
    }
    MultinomialProgram.prototype.getCustomSetupFunc = function (seed) {
        var _this = this;
        return function (gpgpu, webGLProgram) {
            if (_this.seedLoc == null) {
                _this.seedLoc = gpgpu.getUniformLocation(webGLProgram, 'seed');
            }
            gpgpu.gl.uniform1f(_this.seedLoc, seed);
        };
    };
    return MultinomialProgram;
}());
exports.MultinomialProgram = MultinomialProgram;

},{}],71:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OneHotProgram = (function () {
    function OneHotProgram(numIndices, depth, onValue, offValue) {
        this.variableNames = ['indices'];
        this.outputShape = [numIndices, depth];
        this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int index = round(getIndices(coords.x));\n        setOutput(mix(float(" + offValue + "), float(" + onValue + "),\n                      float(index == coords.y)));\n      }\n    ";
    }
    OneHotProgram.prototype.getCustomSetupFunc = function (seed) {
        var _this = this;
        return function (gpgpu, webGLProgram) {
            if (_this.seedLoc == null) {
                _this.seedLoc = gpgpu.getUniformLocation(webGLProgram, 'seed');
            }
            gpgpu.gl.uniform1f(_this.seedLoc, seed);
        };
    };
    return OneHotProgram;
}());
exports.OneHotProgram = OneHotProgram;

},{}],72:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pool2DProgram = (function () {
    function Pool2DProgram(convInfo, poolType, computePositions) {
        this.variableNames = ['x'];
        if (poolType === 'avg' && computePositions) {
            throw new Error('Cannot compute positions for average pool.');
        }
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.outputShape = convInfo.outShape;
        var isAvgPool = poolType === 'avg';
        var initializationValue = '0.0';
        if (!isAvgPool) {
            if (poolType === 'min') {
                initializationValue = '1.0 / 0.0';
            }
            else {
                initializationValue = '-1.0 / 0.0';
            }
        }
        if (computePositions) {
            var compareOp_1 = poolType === 'min' ? '<=' : '>=';
            this.userCode = "\n        const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n        const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int batch = coords[0];\n          int d = coords[3];\n\n          ivec2 xRCCorner = coords.yz * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < " + filterHeight + "; wR++) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n              continue;\n            }\n\n            for (int wC = 0; wC < " + filterWidth + "; wC++) {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n                continue;\n              }\n\n              float value = getX(batch, xR, xC, d);\n\n              if (isNaN(value)) {\n                setOutput(value);\n                return;\n              }\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value " + compareOp_1 + " currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = wR * " + filterWidth + " + wC;\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";
            return;
        }
        var compareOp = poolType === 'min' ? 'min' : 'max';
        var returnValue = poolType + "(" + poolType + "(" + poolType + "(" +
            'minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])';
        if (poolType === 'avg') {
            returnValue = "avgValue / " + filterHeight * filterWidth + ".0";
        }
        var filterWidthNearestVec4 = Math.floor(filterWidth / 4) * 4;
        var filterWidthVec4Remainder = filterWidth % 4;
        var updateSnippet = "\n      if (hasNaN(values)) {\n        setOutput(getNaN(values));\n        return;\n      }\n      if (" + isAvgPool + ") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = " + compareOp + "(values, minMaxValue);\n      }\n    ";
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n      const float initializationValue = " + initializationValue + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int xR, int xC, int d) {\n        if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n          return initializationValue;\n        }\n        return getX(batch, xR, xC, d);\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(" + initializationValue + ");\n        float avgValue = 0.0;\n\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + filterWidthNearestVec4 + "; wC += 4) {\n            int xC = xCCorner + wC;\n\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              getValue(batch, xR, xC + 2, d),\n              getValue(batch, xR, xC + 3, d)\n            );\n\n            " + updateSnippet + "\n          }\n\n          int xC = xCCorner + " + filterWidthNearestVec4 + ";\n          if (" + (filterWidthVec4Remainder === 1) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n            " + updateSnippet + "\n          } else if (" + (filterWidthVec4Remainder === 2) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              initializationValue,\n              initializationValue\n            );\n\n            " + updateSnippet + "\n          } else if (" + (filterWidthVec4Remainder === 3) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              getValue(batch, xR, xC + 2, d),\n              initializationValue\n            );\n\n            " + updateSnippet + "\n          }\n        }\n        setOutput(" + returnValue + ");\n      }\n    ";
    }
    return Pool2DProgram;
}());
exports.Pool2DProgram = Pool2DProgram;

},{}],73:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReduceProgram = (function () {
    function ReduceProgram(reduceInfo, reduceType) {
        this.variableNames = ['x'];
        var windowSize = reduceInfo.windowSize;
        var batchSize = reduceInfo.batchSize;
        var inSize = reduceInfo.inSize;
        var outSize = Math.ceil(inSize / windowSize);
        this.outputShape = [batchSize, outSize];
        var isReduceSum = reduceType === 'sum';
        var initializationValue = '0.0';
        if (!isReduceSum) {
            if (reduceType === 'min') {
                initializationValue = '1.0 / 0.0';
            }
            else {
                initializationValue = '-1.0 / 0.0';
            }
        }
        var compareOp = reduceType === 'min' ? 'min' : 'max';
        var returnValue = reduceType + "(" + reduceType + "(" + reduceType + "(" +
            'minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])';
        if (reduceType === 'sum') {
            returnValue = "sumValue";
        }
        var windowSizeNearestVec4 = Math.floor(windowSize / 4) * 4;
        var windowSizeVec4Remainder = windowSize % 4;
        var updateSnippet = "\n      if (" + isReduceSum + ") {\n        sumValue += dot(values, ones);\n      } else {\n        if (hasNaN(values)) {\n          setOutput(getNaN(values));\n          return;\n        }\n        minMaxValue = " + compareOp + "(values, minMaxValue);\n      }\n    ";
        var checkOutOfBounds = '';
        if (inSize % windowSize > 0) {
            checkOutOfBounds = "\n        if (inIdx < 0 || inIdx >= " + inSize + ") {\n          return initializationValue;\n        }\n      ";
        }
        this.userCode = "\n      const float initializationValue = " + initializationValue + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        " + checkOutOfBounds + "\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + windowSize + ";\n\n        vec4 minMaxValue = vec4(" + initializationValue + ");\n        float sumValue = 0.0;\n\n        for (int i = 0; i < " + windowSizeNearestVec4 + "; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          " + updateSnippet + "\n        }\n\n        int inIdx = inOffset + " + windowSizeNearestVec4 + ";\n        if (" + (windowSizeVec4Remainder === 1) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n          " + updateSnippet + "\n        } else if (" + (windowSizeVec4Remainder === 2) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n          " + updateSnippet + "\n        } else if (" + (windowSizeVec4Remainder === 3) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n          " + updateSnippet + "\n        }\n        setOutput(" + returnValue + ");\n      }\n    ";
    }
    return ReduceProgram;
}());
exports.ReduceProgram = ReduceProgram;

},{}],74:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResizeBilinear3DProgram = (function () {
    function ResizeBilinear3DProgram(inputShape, outputDimensionsRowCol, alignCorners) {
        this.variableNames = ['A'];
        this.outputShape = [];
        var depth = inputShape[2];
        this.outputShape =
            [outputDimensionsRowCol[0], outputDimensionsRowCol[1], depth];
        var effectiveInputShape = alignCorners ?
            [inputShape[0] - 1, inputShape[1] - 1, depth] :
            inputShape;
        var effectiveOutputShape = alignCorners ?
            [this.outputShape[0] - 1, this.outputShape[1] - 1, depth] :
            this.outputShape;
        this.userCode = "\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          " + effectiveInputShape[0] / effectiveOutputShape[0] + ",\n          " + effectiveInputShape[1] / effectiveOutputShape[1] + ");\n      const vec2 inputShapeRC = vec2(" + inputShape[0] + ".0, " + inputShape[1] + ".0);\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        ivec2 yRC = coords.xy;\n        int d = coords.z;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);\n        ivec2 sourceCeilRC = ivec2(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        float topLeft = getA(sourceFloorRC.x, sourceFloorRC.y, d);\n        float bottomLeft = getA(sourceCeilRC.x, sourceFloorRC.y, d);\n        float topRight = getA(sourceFloorRC.x, sourceCeilRC.y, d);\n        float bottomRight = getA(sourceCeilRC.x, sourceCeilRC.y, d);\n\n        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);\n\n        float top = topLeft + (topRight - topLeft) * fracRC.y;\n        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;\n        float newValue = top + (bottom - top) * fracRC.x;\n\n        setOutput(newValue);\n      }\n    ";
    }
    return ResizeBilinear3DProgram;
}());
exports.ResizeBilinear3DProgram = ResizeBilinear3DProgram;

},{}],75:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shader_compiler_1 = require("./shader_compiler");
var SliceProgram = (function () {
    function SliceProgram(destSize) {
        this.variableNames = ['source'];
        this.outputShape = destSize;
        this.rank = destSize.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var sourceCoords = getCoords(this.rank);
        this.userCode = "\n      uniform " + dtype + " start;\n\n      void main() {\n        " + dtype + " sourceLoc = start + getOutputCoords();\n        setOutput(getSource(" + sourceCoords + "));\n      }\n    ";
    }
    SliceProgram.prototype.getCustomSetupFunc = function (start) {
        var _this = this;
        if (start.length !== this.rank) {
            throw Error("The rank (" + this.rank + ") of the program must match the " +
                ("length of start (" + start.length + ")"));
        }
        return function (gpgpu, webGLProgram) {
            if (_this.startLoc == null) {
                _this.startLoc = gpgpu.getUniformLocationNoThrow(webGLProgram, 'start');
                if (_this.startLoc == null) {
                    return;
                }
            }
            if (_this.rank === 1) {
                gpgpu.gl.uniform1i(_this.startLoc, start[0]);
            }
            else if (_this.rank === 2) {
                gpgpu.gl.uniform2i(_this.startLoc, start[0], start[1]);
            }
            else if (_this.rank === 3) {
                gpgpu.gl.uniform3i(_this.startLoc, start[0], start[1], start[2]);
            }
            else if (_this.rank === 4) {
                gpgpu.gl.uniform4i(_this.startLoc, start[0], start[1], start[2], start[3]);
            }
            else {
                throw Error("Slicing for rank " + _this.rank + " is not yet supported");
            }
        };
    };
    return SliceProgram;
}());
exports.SliceProgram = SliceProgram;
function getCoords(rank) {
    if (rank === 1) {
        return 'sourceLoc';
    }
    else if (rank === 2) {
        return 'sourceLoc.x, sourceLoc.y';
    }
    else if (rank === 3) {
        return 'sourceLoc.x, sourceLoc.y, sourceLoc.z';
    }
    else if (rank === 4) {
        return 'sourceLoc.x, sourceLoc.y, sourceLoc.z, sourceLoc.w';
    }
    else {
        throw Error("Slicing for rank " + rank + " is not yet supported");
    }
}

},{"./shader_compiler":102}],77:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureManager = (function () {
    function TextureManager(gpgpu) {
        this.gpgpu = gpgpu;
        this.numUsedTextures = 0;
        this.numFreeTextures = 0;
        this.freeTextures = {};
        this.logEnabled = false;
        this.usedTextureCount = {};
    }
    TextureManager.prototype.acquireTexture = function (shapeRC) {
        var shapeKey = getKeyFromTextureShape(shapeRC);
        if (!(shapeKey in this.freeTextures)) {
            this.freeTextures[shapeKey] = [];
        }
        if (!(shapeKey in this.usedTextureCount)) {
            this.usedTextureCount[shapeKey] = 0;
        }
        this.usedTextureCount[shapeKey]++;
        if (this.freeTextures[shapeKey].length > 0) {
            this.numFreeTextures--;
            this.numUsedTextures++;
            this.log();
            return this.freeTextures[shapeKey].shift();
        }
        this.numUsedTextures++;
        this.log();
        return this.gpgpu.createMatrixTexture(shapeRC[0], shapeRC[1]);
    };
    TextureManager.prototype.releaseTexture = function (texture, shape) {
        var shapeKey = getKeyFromTextureShape(shape);
        if (!(shapeKey in this.freeTextures)) {
            this.freeTextures[shapeKey] = [];
        }
        this.freeTextures[shapeKey].push(texture);
        this.numFreeTextures++;
        this.numUsedTextures--;
        this.usedTextureCount[shapeKey]--;
        this.log();
    };
    TextureManager.prototype.log = function () {
        if (!this.logEnabled) {
            return;
        }
        var total = this.numFreeTextures + this.numUsedTextures;
        console.log('Free/Used', this.numFreeTextures + " / " + this.numUsedTextures, "(" + total + ")");
    };
    TextureManager.prototype.getNumUsedTextures = function () {
        return this.numUsedTextures;
    };
    TextureManager.prototype.getNumFreeTextures = function () {
        return this.numFreeTextures;
    };
    TextureManager.prototype.dispose = function () {
        for (var shape in this.freeTextures) {
            if (this.freeTextures.hasOwnProperty(shape)) {
                for (var i = 0; i < this.freeTextures[shape].length; i++) {
                    this.gpgpu.deleteMatrixTexture(this.freeTextures[shape][i]);
                }
            }
        }
    };
    return TextureManager;
}());
exports.TextureManager = TextureManager;
function getKeyFromTextureShape(shapeRowsCol) {
    return shapeRowsCol[0] + "_" + shapeRowsCol[1];
}

},{}],78:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shader_compiler_1 = require("./shader_compiler");
var TileProgram = (function () {
    function TileProgram(aShape, reps) {
        this.variableNames = ['A'];
        var outputShape = new Array(aShape.length);
        for (var i = 0; i < outputShape.length; i++) {
            outputShape[i] = aShape[i] * reps[i];
        }
        this.outputShape = outputShape;
        this.rank = outputShape.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var sourceCoords = getSourceCoords(aShape);
        this.userCode = "\n      void main() {\n        " + dtype + " resRC = getOutputCoords();\n        setOutput(getA(" + sourceCoords + "));\n      }\n    ";
    }
    return TileProgram;
}());
exports.TileProgram = TileProgram;
function getSourceCoords(aShape) {
    var rank = aShape.length;
    if (rank > 4) {
        throw Error("Tile for rank " + rank + " is not yet supported");
    }
    if (rank === 1) {
        return "imod(resRC, " + aShape[0] + ")";
    }
    var currentCoords = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w'];
    var sourceCoords = [];
    for (var i = 0; i < aShape.length; i++) {
        sourceCoords.push("imod(" + currentCoords[i] + ", " + aShape[i] + ")");
    }
    return sourceCoords.join();
}

},{"./shader_compiler":102}],79:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shader_compiler_1 = require("./shader_compiler");
var TransposeProgram = (function () {
    function TransposeProgram(aShape, newDim) {
        this.variableNames = ['A'];
        var outputShape = new Array(aShape.length);
        for (var i = 0; i < outputShape.length; i++) {
            outputShape[i] = aShape[newDim[i]];
        }
        this.outputShape = outputShape;
        this.rank = outputShape.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var switched = getSwitchedCoords(newDim);
        this.userCode = "\n    void main() {\n      " + dtype + " resRC = getOutputCoords();\n      setOutput(getA(" + switched + "));\n    }\n    ";
    }
    return TransposeProgram;
}());
exports.TransposeProgram = TransposeProgram;
function getSwitchedCoords(newDim) {
    var rank = newDim.length;
    if (rank > 4) {
        throw Error("Transpose for rank " + rank + " is not yet supported");
    }
    var originalOrder = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w'];
    var switchedCoords = new Array(rank);
    for (var i = 0; i < newDim.length; i++) {
        switchedCoords[newDim[i]] = originalOrder[i];
    }
    return switchedCoords.join();
}

},{"./shader_compiler":102}],80:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnaryOpProgram = (function () {
    function UnaryOpProgram(aShape, opSnippet) {
        this.variableNames = ['A'];
        this.outputShape = aShape;
        this.userCode = "\n      float unaryOperation(float x) {\n        " + opSnippet + "\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    ";
    }
    return UnaryOpProgram;
}());
exports.UnaryOpProgram = UnaryOpProgram;
exports.CHECK_NAN_SNIPPET = "\n  if (isNaN(x)) {\n    return x;\n  }\n";
exports.ABS = "\n  return abs(x);\n";
exports.RELU = exports.CHECK_NAN_SNIPPET + "\n  return (x < 0.0) ? 0.0 : x;\n";
exports.ELU = "\n  return (x >= 0.0) ? x : (exp(x) - 1.0);\n";
exports.ELU_DER = "\n  return (x >= 0.0) ? 1.0 : exp(x);\n";
exports.SELU = "\n  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.\n  // see: https://arxiv.org/abs/1706.02515\n  float scaleAlpha = 1.7580993408473768599402175208123;\n  float scale = 1.0507009873554804934193349852946;\n  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);\n";
function LEAKY_RELU(alpha) {
    return "\n    return (x >= 0.0) ? x : " + alpha + " * x;\n  ";
}
exports.LEAKY_RELU = LEAKY_RELU;
function STEP(alpha) {
    if (alpha === void 0) { alpha = 0.0; }
    return exports.CHECK_NAN_SNIPPET + ("\n    return x > 0.0 ? 1.0 : float(" + alpha + ");\n  ");
}
exports.STEP = STEP;
exports.NEG = "\n  return -x;\n";
exports.CEIL = "\n  return ceil(x);\n";
exports.FLOOR = "\n  return floor(x);\n";
exports.EXP = "\n  return exp(x);\n";
exports.LOG = "\n  return log(x);\n";
exports.SQRT = exports.CHECK_NAN_SNIPPET + "\n  return sqrt(x);\n";
exports.SIGMOID = "\n  return 1.0 / (1.0 + exp(-1.0 * x));\n";
exports.SIN = exports.CHECK_NAN_SNIPPET + "\n  return sin(x);\n";
exports.COS = exports.CHECK_NAN_SNIPPET + "\n  return cos(x);\n";
exports.TAN = "\n  return tan(x);\n";
exports.ASIN = exports.CHECK_NAN_SNIPPET + "\n  return asin(x);\n";
exports.ACOS = exports.CHECK_NAN_SNIPPET + "\n  return acos(x);\n";
exports.ATAN = exports.CHECK_NAN_SNIPPET + "\n  return atan(x);\n";
exports.SINH = "\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n";
exports.COSH = "\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n";
exports.TANH = "\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n";
exports.SQUARE = "\n  return x * x;\n";

},{}],40:[function(require,module,exports) {
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../environment");
var util = require("../../util");
var axis_util = require("../axis_util");
var math_1 = require("../math");
var ndarray_1 = require("../ndarray");
var reduce_util = require("../reduce_util");
var types_1 = require("../types");
var argminmax_gpu_1 = require("./webgl/argminmax_gpu");
var batchnorm_gpu_1 = require("./webgl/batchnorm_gpu");
var binaryop_gpu = require("./webgl/binaryop_gpu");
var binaryop_gpu_1 = require("./webgl/binaryop_gpu");
var clip_gpu_1 = require("./webgl/clip_gpu");
var concat_gpu_1 = require("./webgl/concat_gpu");
var conv_backprop_gpu_1 = require("./webgl/conv_backprop_gpu");
var conv_gpu_1 = require("./webgl/conv_gpu");
var conv_gpu_depthwise_1 = require("./webgl/conv_gpu_depthwise");
var copy_gpu_1 = require("./webgl/copy_gpu");
var gpgpu_context_1 = require("./webgl/gpgpu_context");
var gpgpu_math = require("./webgl/gpgpu_math");
var gpgpu_util = require("./webgl/gpgpu_util");
var max_pool_backprop_gpu_1 = require("./webgl/max_pool_backprop_gpu");
var mulmat_gpu_1 = require("./webgl/mulmat_gpu");
var multinomial_gpu_1 = require("./webgl/multinomial_gpu");
var onehot_gpu_1 = require("./webgl/onehot_gpu");
var pool_gpu_1 = require("./webgl/pool_gpu");
var reduce_gpu_1 = require("./webgl/reduce_gpu");
var resize_bilinear_gpu_1 = require("./webgl/resize_bilinear_gpu");
var slice_gpu_1 = require("./webgl/slice_gpu");
var tex_util_1 = require("./webgl/tex_util");
var texture_manager_1 = require("./webgl/texture_manager");
var tile_gpu_1 = require("./webgl/tile_gpu");
var transpose_gpu_1 = require("./webgl/transpose_gpu");
var unary_op = require("./webgl/unaryop_gpu");
var unaryop_gpu_1 = require("./webgl/unaryop_gpu");
var webgl_util = require("./webgl/webgl_util");
var MathBackendWebGL = (function () {
    function MathBackendWebGL(gpgpu) {
        this.texData = {};
        this.binaryCache = {};
        if (environment_1.ENV.get('WEBGL_VERSION') < 1) {
            throw new Error('WebGL is not supported on this device');
        }
        if (gpgpu == null) {
            var gl = gpgpu_util.createWebGLContext();
            this.gpgpu = new gpgpu_context_1.GPGPUContext(gl);
            this.gpgpuCreatedLocally = true;
        }
        else {
            this.gpgpu = gpgpu;
            this.gpgpuCreatedLocally = false;
        }
        this.textureManager = new texture_manager_1.TextureManager(this.gpgpu);
    }
    MathBackendWebGL.prototype.writePixels = function (id, pixels, numChannels) {
        var shape = [pixels.height, pixels.width, numChannels];
        var texShape = [shape[0], shape[1]];
        var texture = this.textureManager.acquireTexture(texShape);
        this.gpgpu.uploadPixelDataToTexture(texture, pixels);
        this.texData[id] = {
            texture: texture,
            textureType: tex_util_1.TextureType.RGBA_COLOR,
            texShape: texShape,
            numChannels: numChannels,
            dtype: 'int32'
        };
    };
    MathBackendWebGL.prototype.write = function (id, values, dtype, shape) {
        var texShape = webgl_util.getTextureShapeFromLogicalShape(this.gpgpu.gl, shape);
        var texture = this.textureManager.acquireTexture(texShape);
        var textureType = tex_util_1.TextureType.DEFAULT;
        this.texData[id] = { texture: texture, textureType: textureType, texShape: texShape, dtype: dtype };
        if (values != null) {
            this.gpgpu.uploadMatrixToTexture(texture, texShape[0], texShape[1], typedArrayToFloat32(values, dtype));
        }
    };
    MathBackendWebGL.prototype.readSync = function (id) {
        this.throwIfNoData(id);
        var values;
        var _a = this.texData[id], texture = _a.texture, textureType = _a.textureType, texShape = _a.texShape, numChannels = _a.numChannels, dtype = _a.dtype;
        if (textureType === tex_util_1.TextureType.DEFAULT) {
            values = this.gpgpu.downloadMatrixFromTexture(texture, texShape[0], texShape[1]);
        }
        else {
            values = this.gpgpu.downloadMatrixFromRGBAColorTexture(texture, texShape[0], texShape[1], numChannels);
        }
        return float32ToTypedArray(values, dtype);
    };
    MathBackendWebGL.prototype.read = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, texture, textureType, texShape;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.throwIfNoData(id);
                        _a = this.texData[id], texture = _a.texture, textureType = _a.textureType, texShape = _a.texShape;
                        if (environment_1.ENV.get('WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED') &&
                            textureType === tex_util_1.TextureType.DEFAULT) {
                            return [2, this.gpgpu.downloadMatrixFromTextureAsync(texture, texShape[0], texShape[1])];
                        }
                        if (!environment_1.ENV.get('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED')) {
                            return [2, this.readSync(id)];
                        }
                        return [4, this.gpgpu.runQuery(function () { })];
                    case 1:
                        _b.sent();
                        return [2, this.readSync(id)];
                }
            });
        });
    };
    MathBackendWebGL.prototype.time = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var start, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!environment_1.ENV.get('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED')) return [3, 2];
                        start = performance.now();
                        a = query();
                        return [4, a.data()];
                    case 1:
                        _a.sent();
                        return [2, performance.now() - start];
                    case 2: return [2, this.gpgpu.runQuery(query)];
                }
            });
        });
    };
    MathBackendWebGL.prototype.disposeData = function (id) {
        if (id in this.texData) {
            var _a = this.texData[id], texture = _a.texture, texShape = _a.texShape;
            this.textureManager.releaseTexture(texture, texShape);
            delete this.texData[id];
        }
    };
    MathBackendWebGL.prototype.getTexture = function (id) {
        this.throwIfNoData(id);
        return this.texData[id].texture;
    };
    MathBackendWebGL.prototype.getTextureData = function (id) {
        this.throwIfNoData(id);
        return this.texData[id];
    };
    MathBackendWebGL.prototype.getGPGPUContext = function () {
        return this.gpgpu;
    };
    MathBackendWebGL.prototype.clone = function (x) {
        this.throwIfNoData(x.id);
        var texShape = this.texData[x.id].texShape;
        var source = x.as2D(texShape[0], texShape[1]);
        var output = this.makeOutputArray(texShape, x.dtype);
        this.copy2D(source, [0, 0], texShape, output, [0, 0], texShape);
        return output.reshape(x.shape);
    };
    MathBackendWebGL.prototype.slice1D = function (x, begin, size) {
        var program = new slice_gpu_1.SliceProgram([size]);
        var customSetup = program.getCustomSetupFunc([begin]);
        return this.compileAndRun(program, [x], null, customSetup);
    };
    MathBackendWebGL.prototype.slice2D = function (x, begin, size) {
        var program = new slice_gpu_1.SliceProgram(size);
        var customSetup = program.getCustomSetupFunc(begin);
        return this.compileAndRun(program, [x], null, customSetup);
    };
    MathBackendWebGL.prototype.slice3D = function (x, begin, size) {
        var program = new slice_gpu_1.SliceProgram(size);
        var customSetup = program.getCustomSetupFunc(begin);
        return this.compileAndRun(program, [x], null, customSetup);
    };
    MathBackendWebGL.prototype.slice4D = function (x, begin, size) {
        var program = new slice_gpu_1.SliceProgram(size);
        var customSetup = program.getCustomSetupFunc(begin);
        return this.compileAndRun(program, [x], null, customSetup);
    };
    MathBackendWebGL.prototype.copy2D = function (source, sourceBeginRowCol, sourceSizeRowCol, dest, destBeginRowCol, destSizeRowCol) {
        var program = new copy_gpu_1.Copy2DProgram(sourceSizeRowCol[1], destSizeRowCol[1]);
        var customSetup = program.getCustomSetupFunc(sourceBeginRowCol, destBeginRowCol, destSizeRowCol);
        this.compileAndRun(program, [source], dest, customSetup);
    };
    MathBackendWebGL.prototype.concat1D = function (a, b) {
        var program = new concat_gpu_1.ConcatProgram(a.shape, b.shape, 0);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.concat2D = function (a, b, axis) {
        var program = new concat_gpu_1.ConcatProgram(a.shape, b.shape, axis);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.concat3D = function (a, b, axis) {
        var program = new concat_gpu_1.ConcatProgram(a.shape, b.shape, axis);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.concat4D = function (a, b, axis) {
        var program = new concat_gpu_1.ConcatProgram(a.shape, b.shape, axis);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.neg = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.NEG);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.matMul = function (a, b, aOrientation, bOrientation) {
        var program = new mulmat_gpu_1.MatMulProgram(a.shape, b.shape, aOrientation, bOrientation);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.multiply = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.MUL, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.batchNormalization2D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var inputs = [x, mean, variance];
        var offsetShape = null;
        if (offset != null) {
            offsetShape = offset.shape;
            inputs.push(offset);
        }
        var scaleShape = null;
        if (scale != null) {
            scaleShape = scale.shape;
            inputs.push(scale);
        }
        var program = new batchnorm_gpu_1.BatchNormProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon);
        return this.compileAndRun(program, inputs);
    };
    MathBackendWebGL.prototype.batchNormalization3D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var inputs = [x, mean, variance];
        var offsetShape = null;
        if (offset != null) {
            offsetShape = offset.shape;
            inputs.push(offset);
        }
        var scaleShape = null;
        if (scale != null) {
            scaleShape = scale.shape;
            inputs.push(scale);
        }
        var program = new batchnorm_gpu_1.BatchNormProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon);
        return this.compileAndRun(program, inputs);
    };
    MathBackendWebGL.prototype.tile = function (x, reps) {
        var program = new tile_gpu_1.TileProgram(x.shape, reps);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.transpose = function (x, perm) {
        var program = new transpose_gpu_1.TransposeProgram(x.shape, perm);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.reduce = function (x, reduceType, dtype) {
        var batchSize = x.shape[0];
        var inSize = x.shape[1];
        var windowSize = reduce_util.computeOptimalWindowSize(inSize);
        var reduceInfo = { windowSize: windowSize, inSize: inSize, batchSize: batchSize };
        var program = new reduce_gpu_1.ReduceProgram(reduceInfo, reduceType);
        var _a = program.outputShape, rows = _a[0], cols = _a[1];
        var output = this.makeOutputArray(program.outputShape, dtype).as2D(rows, cols);
        this.compileAndRun(program, [x], output);
        if (output.shape[1] === 1) {
            return output;
        }
        return this.reduce(output, reduceType, dtype);
    };
    MathBackendWebGL.prototype.argReduce = function (x, reduceType, bestIndicesA) {
        if (bestIndicesA === void 0) { bestIndicesA = null; }
        var batchSize = x.shape[0];
        var inSize = x.shape[1];
        if (bestIndicesA != null) {
            batchSize = bestIndicesA.shape[0];
            inSize = bestIndicesA.shape[1];
        }
        var windowSize = reduce_util.computeOptimalWindowSize(inSize);
        var reduceInfo = { windowSize: windowSize, inSize: inSize, batchSize: batchSize };
        var program = new argminmax_gpu_1.ArgMinMaxProgram(reduceInfo, reduceType, bestIndicesA == null);
        var _a = program.outputShape, rows = _a[0], cols = _a[1];
        var output = this.makeOutputArray(program.outputShape, 'int32').as2D(rows, cols);
        var inputs = [x];
        if (bestIndicesA != null) {
            inputs.push(bestIndicesA);
        }
        this.compileAndRun(program, inputs, output);
        if (output.shape[1] === 1) {
            return output;
        }
        return this.argReduce(x, reduceType, output);
    };
    MathBackendWebGL.prototype.sum = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('sum', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        var outputDType = types_1.SumTypesMap[x.dtype];
        return this.reduce(a2D, 'sum', outputDType).reshape(outShape);
    };
    MathBackendWebGL.prototype.argMin = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('argMin', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.argReduce(a2D, 'min').reshape(outShape);
    };
    MathBackendWebGL.prototype.argMax = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('argMax', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.argReduce(a2D, 'max').reshape(outShape);
    };
    MathBackendWebGL.prototype.equal = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.EQUAL, a.shape, b.shape);
        var output = this.makeOutputArray(program.outputShape, 'bool');
        return this.compileAndRun(program, [a, b], output);
    };
    MathBackendWebGL.prototype.topKValues = function (x, k) {
        throw new Error('topKValues GPU not yet implemented!');
    };
    MathBackendWebGL.prototype.topKIndices = function (x, k) {
        throw new Error('topKIndices GPU not yet implemented!');
    };
    MathBackendWebGL.prototype.min = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('min', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.reduce(a2D, 'min', a2D.dtype).reshape(outShape);
    };
    MathBackendWebGL.prototype.max = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('max', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.reduce(a2D, 'max', a2D.dtype).reshape(outShape);
    };
    MathBackendWebGL.prototype.divide = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.DIV, a.shape, b.shape);
        var output = this.makeOutputArray(program.outputShape, 'float32');
        return this.compileAndRun(program, [a, b], output);
    };
    MathBackendWebGL.prototype.add = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.ADD, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.subtract = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.SUB, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.pow = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.POW, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.ceil = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.CEIL);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.floor = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.FLOOR);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.exp = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.EXP);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.log = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.LOG);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.sqrt = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SQRT);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.square = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SQUARE);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.relu = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.RELU);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.elu = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ELU);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.eluDer = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ELU_DER);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.selu = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SELU);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.leakyRelu = function (x, alpha) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.LEAKY_RELU(alpha));
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.prelu = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.PRELU, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.preluDer = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.PRELU_DER, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.clip = function (x, min, max) {
        var program = new clip_gpu_1.ClipProgram(x.shape, min, max);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.abs = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ABS);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.sigmoid = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SIGMOID);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.sin = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SIN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.cos = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.COS);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.tan = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.TAN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.asin = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ASIN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.acos = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ACOS);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.atan = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ATAN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.sinh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SINH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.cosh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.COSH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.tanh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.TANH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.step = function (x, alpha) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.STEP(alpha));
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.conv2d = function (x, filter, bias, convInfo) {
        var program = new conv_gpu_1.Conv2DProgram(convInfo, bias != null);
        var inputs = bias != null ? [x, filter, bias] : [x, filter];
        return this.compileAndRun(program, inputs);
    };
    MathBackendWebGL.prototype.conv2dDerInput = function (dy, filter, convInfo) {
        var program = new conv_backprop_gpu_1.Conv2DDerInputProgram(convInfo);
        return this.compileAndRun(program, [dy, filter]);
    };
    MathBackendWebGL.prototype.conv2dDerFilter = function (x, dy, convInfo) {
        var program = new conv_backprop_gpu_1.Conv2DDerFilterProgram(convInfo);
        return this.compileAndRun(program, [x, dy]);
    };
    MathBackendWebGL.prototype.conv2dDerBias = function (dy) {
        var program = new conv_backprop_gpu_1.Conv2DDerBiasProgram(dy.shape);
        return this.compileAndRun(program, [dy]);
    };
    MathBackendWebGL.prototype.depthwiseConv2D = function (x, filter, convInfo) {
        var program = new conv_gpu_depthwise_1.DepthwiseConv2DProgram(convInfo);
        return this.compileAndRun(program, [x, filter]);
    };
    MathBackendWebGL.prototype.maxPool = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'max', false);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.minPool = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'min', false);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.avgPool = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'avg', false);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.maxPoolBackprop = function (dy, x, convInfo) {
        var getPositions = true;
        var maxPoolPositionsProgram = new pool_gpu_1.Pool2DProgram(convInfo, 'max', getPositions);
        var maxPoolPositions = this.compileAndRun(maxPoolPositionsProgram, [x]);
        var maxPoolBackPropProgram = new max_pool_backprop_gpu_1.MaxPool2DBackpropProgram(convInfo);
        var result = this.compileAndRun(maxPoolBackPropProgram, [dy, maxPoolPositions]);
        maxPoolPositions.dispose();
        return result;
    };
    MathBackendWebGL.prototype.resizeBilinear3D = function (x, newShape2D, alignCorners) {
        var program = new resize_bilinear_gpu_1.ResizeBilinear3DProgram(x.shape, newShape2D, alignCorners);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.multinomial = function (probs, numSamples, seed) {
        var batchSize = probs.shape[0];
        var numOutcomes = probs.shape[1];
        var program = new multinomial_gpu_1.MultinomialProgram(batchSize, numOutcomes, numSamples);
        var output = this.makeOutputArray(program.outputShape, 'int32');
        var customSetup = program.getCustomSetupFunc(seed);
        return this.compileAndRun(program, [probs], output, customSetup);
    };
    MathBackendWebGL.prototype.oneHot = function (indices, depth, onValue, offValue) {
        var program = new onehot_gpu_1.OneHotProgram(indices.size, depth, onValue, offValue);
        return this.compileAndRun(program, [indices]);
    };
    MathBackendWebGL.prototype.makeOutputArray = function (shape, dtype) {
        return ndarray_1.NDArray.make(shape, {}, dtype);
    };
    MathBackendWebGL.prototype.compileAndRun = function (program, inputs, output, customSetup) {
        var _this = this;
        if (output == null) {
            output = this.makeOutputArray(program.outputShape, inputs[0].dtype);
        }
        var inputsData = inputs.map(function (input) {
            _this.throwIfNoData(input.id);
            return { array: input, texData: _this.texData[input.id] };
        });
        this.throwIfNoData(output.id);
        var outputData = { array: output, texData: this.texData[output.id] };
        var key = gpgpu_math.makeShaderKey(program, inputsData, outputData);
        var binary = this.getAndSaveBinary(key, function () {
            return gpgpu_math.compileProgram(_this.gpgpu, program, inputsData, outputData);
        });
        gpgpu_math.runProgram(binary, inputsData, outputData, customSetup);
        return output;
    };
    MathBackendWebGL.prototype.getAndSaveBinary = function (key, getBinary) {
        if (!(key in this.binaryCache)) {
            this.binaryCache[key] = getBinary();
        }
        return this.binaryCache[key];
    };
    MathBackendWebGL.prototype.getTextureManager = function () {
        return this.textureManager;
    };
    MathBackendWebGL.prototype.dispose = function () {
        for (var key in this.binaryCache) {
            this.gpgpu.deleteProgram(this.binaryCache[key].webGLProgram);
        }
        this.textureManager.dispose();
        if (this.gpgpuCreatedLocally) {
            this.gpgpu.dispose();
        }
    };
    MathBackendWebGL.prototype.throwIfNoData = function (id) {
        if (!(id in this.texData)) {
            throw new Error("No data found for NDArray with id " + id + ". " +
                "Use dl.ENV.math instead of constructing your own NDArrayMath. " +
                "If you need to construct your own math, make sure this array is " +
                "allocated after the math construction");
        }
    };
    return MathBackendWebGL;
}());
exports.MathBackendWebGL = MathBackendWebGL;
environment_1.ENV.registerBackend('webgl', function () { return new MathBackendWebGL(); });
var NDArrayMathGPU = (function (_super) {
    __extends(NDArrayMathGPU, _super);
    function NDArrayMathGPU(gpgpu, safeMode) {
        if (safeMode === void 0) { safeMode = false; }
        var _this = this;
        console.warn('new NDArrayMathGPU() is deprecated. Please use the global ' +
            'dl.ENV.math. In rare cases, to construct your own NDArrayMath ' +
            'that runs on GPU, use math = new NDArrayMath(\'webgl\', safeMode); ' +
            'and make sure to set it as global: dl.ENV.setMath(math);');
        _this = _super.call(this, new MathBackendWebGL(gpgpu), safeMode) || this;
        environment_1.ENV.setMath(_this);
        return _this;
    }
    NDArrayMathGPU.prototype.getGPGPUContext = function () {
        return this.backendEngine.getBackend()
            .getGPGPUContext();
    };
    NDArrayMathGPU.prototype.getTextureManager = function () {
        return this.backendEngine.getBackend()
            .getTextureManager();
    };
    return NDArrayMathGPU;
}(math_1.NDArrayMath));
exports.NDArrayMathGPU = NDArrayMathGPU;
function float32ToTypedArray(a, dtype) {
    if (dtype === 'float32') {
        return a;
    }
    else if (dtype === 'int32' || dtype === 'bool') {
        var result = (dtype === 'int32') ? new Int32Array(a.length) :
            new Uint8Array(a.length);
        for (var i = 0; i < result.length; ++i) {
            var val = a[i];
            val = isNaN(val) ? util.getNaN(dtype) : Math.round(val);
            result[i] = val;
        }
        return result;
    }
    else {
        throw new Error("Unknown dtype " + dtype);
    }
}
function typedArrayToFloat32(a, dtype) {
    if (a instanceof Float32Array) {
        return a;
    }
    else {
        var res = new Float32Array(a.length);
        for (var i = 0; i < res.length; i++) {
            var val = a[i];
            res[i] = util.isValNaN(val, dtype) ? NaN : val;
        }
        return res;
    }
}

},{"../../environment":16,"../../util":18,"../axis_util":52,"../math":29,"../ndarray":30,"../reduce_util":57,"../types":56,"./webgl/argminmax_gpu":58,"./webgl/batchnorm_gpu":59,"./webgl/binaryop_gpu":60,"./webgl/clip_gpu":61,"./webgl/concat_gpu":62,"./webgl/conv_backprop_gpu":63,"./webgl/conv_gpu":64,"./webgl/conv_gpu_depthwise":65,"./webgl/copy_gpu":66,"./webgl/gpgpu_context":45,"./webgl/gpgpu_math":67,"./webgl/gpgpu_util":41,"./webgl/max_pool_backprop_gpu":68,"./webgl/mulmat_gpu":69,"./webgl/multinomial_gpu":70,"./webgl/onehot_gpu":71,"./webgl/pool_gpu":72,"./webgl/reduce_gpu":73,"./webgl/resize_bilinear_gpu":74,"./webgl/slice_gpu":75,"./webgl/tex_util":76,"./webgl/texture_manager":77,"./webgl/tile_gpu":78,"./webgl/transpose_gpu":79,"./webgl/unaryop_gpu":80,"./webgl/webgl_util":43}],17:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
var backend_cpu_1 = require("./math/backends/backend_cpu");
var backend_webgl_1 = require("./math/backends/backend_webgl");
var math_1 = require("./math/math");
var util = require("./util");
exports.TEST_EPSILON = 1e-2;
function mean(values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        sum += values[i];
    }
    return sum / values.length;
}
exports.mean = mean;
function standardDeviation(values, mean) {
    var squareDiffSum = 0;
    for (var i = 0; i < values.length; i++) {
        var diff = values[i] - mean;
        squareDiffSum += diff * diff;
    }
    return Math.sqrt(squareDiffSum / values.length);
}
exports.standardDeviation = standardDeviation;
function kurtosis(values) {
    var valuesMean = mean(values);
    var n = values.length;
    var sum2 = 0;
    var sum4 = 0;
    for (var i = 0; i < n; i++) {
        var v = values[i] - valuesMean;
        sum2 += Math.pow(v, 2);
        sum4 += Math.pow(v, 4);
    }
    return (1 / n) * sum4 / Math.pow((1 / n) * sum2, 2);
}
exports.kurtosis = kurtosis;
function skewness(values) {
    var valuesMean = mean(values);
    var n = values.length;
    var sum2 = 0;
    var sum3 = 0;
    for (var i = 0; i < n; i++) {
        var v = values[i] - valuesMean;
        sum2 += Math.pow(v, 2);
        sum3 += Math.pow(v, 3);
    }
    return (1 / n) * sum3 / Math.pow((1 / (n - 1)) * sum2, 3 / 2);
}
exports.skewness = skewness;
function jarqueBeraNormalityTest(values) {
    var n = values.length;
    var s = skewness(values);
    var k = kurtosis(values);
    var jb = n / 6 * (Math.pow(s, 2) + 0.25 * Math.pow(k - 3, 2));
    var CHI_SQUARE_2DEG = 5.991;
    if (jb > CHI_SQUARE_2DEG) {
        throw new Error("Invalid p-value for JB: " + jb);
    }
}
exports.jarqueBeraNormalityTest = jarqueBeraNormalityTest;
function expectArrayInMeanStdRange(actual, expectedMean, expectedStdDev, epsilon) {
    if (epsilon === void 0) { epsilon = exports.TEST_EPSILON; }
    var actualMean = mean(actual);
    expectNumbersClose(actualMean, expectedMean, epsilon);
    expectNumbersClose(standardDeviation(actual, actualMean), expectedStdDev, epsilon);
}
exports.expectArrayInMeanStdRange = expectArrayInMeanStdRange;
function expectArraysClose(actual, expected, epsilon) {
    if (epsilon === void 0) { epsilon = exports.TEST_EPSILON; }
    var aType = actual.constructor.name;
    var bType = expected.constructor.name;
    if (aType !== bType) {
        throw new Error("Arrays are of different type " + aType + " vs " + bType);
    }
    if (actual.length !== expected.length) {
        throw new Error("Matrices have different lengths (" + actual.length + " vs " +
            (expected.length + ")."));
    }
    for (var i = 0; i < expected.length; ++i) {
        var a = actual[i];
        var e = expected[i];
        if (!areClose(a, e, epsilon)) {
            var actualStr = "actual[" + i + "] === " + a;
            var expectedStr = "expected[" + i + "] === " + e;
            throw new Error('Arrays differ: ' + actualStr + ', ' + expectedStr);
        }
    }
}
exports.expectArraysClose = expectArraysClose;
function expectNumbersClose(a, e, epsilon) {
    if (epsilon === void 0) { epsilon = exports.TEST_EPSILON; }
    if (!areClose(a, e, epsilon)) {
        throw new Error("Numbers differ: actual === " + a + ", expected === " + e);
    }
}
exports.expectNumbersClose = expectNumbersClose;
function areClose(a, e, epsilon) {
    if (isNaN(a) && isNaN(e)) {
        return true;
    }
    if (isNaN(a) || isNaN(e) || Math.abs(a - e) > epsilon) {
        return false;
    }
    return true;
}
function expectValuesInRange(actual, low, high) {
    for (var i = 0; i < actual.length; i++) {
        if (actual[i] < low || actual[i] > high) {
            throw new Error("Value out of range:" + actual[i] + " low: " + low + ", high: " + high);
        }
    }
}
exports.expectValuesInRange = expectValuesInRange;
function randomArrayInRange(n, minValue, maxValue) {
    var v = new Float32Array(n);
    var range = maxValue - minValue;
    for (var i = 0; i < n; ++i) {
        v[i] = (Math.random() * range) + minValue;
    }
    return v;
}
exports.randomArrayInRange = randomArrayInRange;
function makeIdentity(n) {
    var i = new Float32Array(n * n);
    for (var j = 0; j < n; ++j) {
        i[(j * n) + j] = 1;
    }
    return i;
}
exports.makeIdentity = makeIdentity;
function cpuMultiplyMatrix(a, aRow, aCol, b, bRow, bCol) {
    var result = new Float32Array(aRow * bCol);
    for (var r = 0; r < aRow; ++r) {
        var aOffset = (r * aCol);
        var cOffset = (r * bCol);
        for (var c = 0; c < bCol; ++c) {
            var d = 0;
            for (var k = 0; k < aCol; ++k) {
                d += a[aOffset + k] * b[(k * bCol) + c];
            }
            result[cOffset + c] = d;
        }
    }
    return result;
}
exports.cpuMultiplyMatrix = cpuMultiplyMatrix;
function cpuDotProduct(a, b) {
    if (a.length !== b.length) {
        throw new Error('cpuDotProduct: incompatible vectors.');
    }
    var d = 0;
    for (var i = 0; i < a.length; ++i) {
        d += a[i] * b[i];
    }
    return d;
}
exports.cpuDotProduct = cpuDotProduct;
function describeMathCPU(name, tests, featuresList) {
    var testNameBase = 'CPU: math.' + name;
    describeWithFeaturesAndExecutor(testNameBase, tests, function (testName, tests, features) { return executeMathTests(testName, tests, function () {
        var safeMode = true;
        return new math_1.NDArrayMath(new backend_cpu_1.MathBackendCPU(), safeMode);
    }, features); }, featuresList);
}
exports.describeMathCPU = describeMathCPU;
function describeMathGPU(name, tests, featuresList) {
    var testNameBase = 'WebGL: math.' + name;
    describeWithFeaturesAndExecutor(testNameBase, tests, function (testName, tests, features) { return executeMathTests(testName, tests, function () {
        var safeMode = true;
        return new math_1.NDArrayMath(new backend_webgl_1.MathBackendWebGL(), safeMode);
    }, features); }, featuresList);
}
exports.describeMathGPU = describeMathGPU;
function describeCustom(name, tests, featuresList, customBeforeEach, customAfterEach) {
    describeWithFeaturesAndExecutor(name, [tests], function (testName, tests, features) { return executeTests(testName, tests, features, customBeforeEach, customAfterEach); }, featuresList);
}
exports.describeCustom = describeCustom;
function describeWithFeaturesAndExecutor(testNameBase, tests, executor, featuresList) {
    if (featuresList != null) {
        featuresList.forEach(function (features) {
            var testName = testNameBase + ' ' + JSON.stringify(features);
            executor(testName, tests, features);
        });
    }
    else {
        executor(testNameBase, tests);
    }
}
var PROMISE_IT = function (name, testFunc) {
    it(name, function (done) {
        var result = testFunc();
        if (result instanceof Promise) {
            result.then(done, function (e) {
                fail(e);
                done();
            });
        }
        else {
            done();
        }
    });
};
function executeMathTests(testName, tests, mathFactory, features) {
    var math;
    var customBeforeEach = function () {
        math = mathFactory();
        environment_1.ENV.setMath(math);
        math.startScope();
    };
    var customAfterEach = function () {
        math.endScope(null);
        math.dispose();
    };
    var customIt = function (name, testFunc) {
        PROMISE_IT(name, function () { return testFunc(math); });
    };
    executeTests(testName, tests, features, customBeforeEach, customAfterEach, customIt);
}
exports.executeMathTests = executeMathTests;
function executeTests(testName, tests, features, customBeforeEach, customAfterEach, customIt) {
    if (customIt === void 0) { customIt = PROMISE_IT; }
    describe(testName, function () {
        beforeEach(function () {
            if (features != null) {
                environment_1.ENV.setFeatures(features);
                environment_1.ENV.registerBackend('webgl', function () { return new backend_webgl_1.MathBackendWebGL(); });
                environment_1.ENV.registerBackend('cpu', function () { return new backend_cpu_1.MathBackendCPU(); });
            }
            if (customBeforeEach != null) {
                customBeforeEach();
            }
        });
        afterEach(function () {
            if (customAfterEach != null) {
                customAfterEach();
            }
            if (features != null) {
                environment_1.ENV.reset();
            }
        });
        tests.forEach(function (test) { return test(customIt); });
    });
}
exports.executeTests = executeTests;
function assertIsNan(val, dtype) {
    if (!util.isValNaN(val, dtype)) {
        throw new Error("Value " + val + " does not represent NaN for dtype " + dtype);
    }
}
exports.assertIsNan = assertIsNan;

},{"./environment":16,"./math/backends/backend_cpu":39,"./math/backends/backend_webgl":40,"./math/math":29,"./util":18}],19:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var version = '0.3.15';
exports.version = version;

},{}],106:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operation = (function () {
    function Operation() {
    }
    Operation.prototype.disposeTransientArrays = function (inferenceArrays, gradientArrays) { };
    Operation.prototype.dispose = function () { };
    return Operation;
}());
exports.Operation = Operation;

},{}],82:[function(require,module,exports) {
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
var util = require("../../util");
var graph_util = require("../graph_util");
var op_1 = require("./op");
var Add = (function (_super) {
    __extends(Add, _super);
    function Add(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        util.assert(util.sizeFromShape(x1Tensor.shape) === 1 ||
            util.sizeFromShape(x2Tensor.shape) === 1 ||
            util.arraysEqual(x1Tensor.shape, x2Tensor.shape) ||
            (x1Tensor.shape.length === 2 && x2Tensor.shape.length === 1 &&
                x1Tensor.shape[1] === x2Tensor.shape[0]) ||
            (x1Tensor.shape.length === 1 && x2Tensor.shape.length === 2 &&
                x1Tensor.shape[0] === x2Tensor.shape[1]), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape, ' +
            'or one of them can be broadcasted (2D and 1D).');
        return _this;
    }
    Add.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(x1.shape)) {
                result = math.scalarPlusArray(x1, x2);
            }
            else if (util.isScalarShape(x2.shape)) {
                result = math.scalarPlusArray(x2, x1);
            }
            else {
                result = math.add(x1, x2);
            }
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    Add.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                if (_this.x1Tensor.shape.length === 1 &&
                    _this.x2Tensor.shape.length === 2 &&
                    _this.x1Tensor.shape[0] === _this.x2Tensor.shape[1]) {
                    var sum = math.sum(dy, 0);
                    gradientArrays.add(_this.x1Tensor, sum);
                }
                else if (util.isScalarShape(_this.x1Tensor.shape)) {
                    var sum = math.sum(dy);
                    gradientArrays.add(_this.x1Tensor, sum);
                }
                else {
                    gradientArrays.add(_this.x1Tensor, math.clone(dy));
                }
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                if (_this.x1Tensor.shape.length === 2 &&
                    _this.x2Tensor.shape.length === 1 &&
                    _this.x1Tensor.shape[1] === _this.x2Tensor.shape[0]) {
                    var sum = math.sum(dy, 0);
                    gradientArrays.add(_this.x2Tensor, sum);
                }
                else if (util.isScalarShape(_this.x2Tensor.shape)) {
                    var sum = math.sum(dy);
                    gradientArrays.add(_this.x2Tensor, sum);
                }
                else {
                    gradientArrays.add(_this.x2Tensor, math.clone(dy));
                }
            }
        });
    };
    Add.prototype.dispose = function () {
        if (this.dySizeScalar != null) {
            this.dySizeScalar.dispose();
        }
    };
    return Add;
}(op_1.Operation));
exports.Add = Add;

},{"../../util":18,"../graph_util":81,"./op":106}],83:[function(require,module,exports) {
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
var op_1 = require("./op");
var ArgMax = (function (_super) {
    __extends(ArgMax, _super);
    function ArgMax(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        return _this;
    }
    ArgMax.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.argMax(x)));
        });
    };
    ArgMax.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        throw new Error('ArgMax backprop unimplemented');
    };
    return ArgMax;
}(op_1.Operation));
exports.ArgMax = ArgMax;

},{"./op":106}],84:[function(require,module,exports) {
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
var op_1 = require("./op");
var ArgMaxEquals = (function (_super) {
    __extends(ArgMaxEquals, _super);
    function ArgMaxEquals(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        return _this;
    }
    ArgMaxEquals.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.argMaxEquals(x1, x2)));
        });
    };
    ArgMaxEquals.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        throw new Error('ArgMaxEquals backprop unimplemented');
    };
    return ArgMaxEquals;
}(op_1.Operation));
exports.ArgMaxEquals = ArgMaxEquals;

},{"./op":106}],85:[function(require,module,exports) {
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
var concat_util = require("../../math/concat_util");
var op_1 = require("./op");
var Concat3D = (function (_super) {
    __extends(Concat3D, _super);
    function Concat3D(x1Tensor, x2Tensor, axis, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.axis = axis;
        _this.yTensor = yTensor;
        concat_util.assertParams(x1Tensor.shape, x2Tensor.shape, axis);
        return _this;
    }
    Concat3D.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var concatResult = math.concat3D(x1, x2, _this.axis);
            inferenceArrays.set(_this.yTensor, keep(concatResult));
        });
    };
    Concat3D.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        throw new Error('Concat3D backprop not implemented.');
    };
    return Concat3D;
}(op_1.Operation));
exports.Concat3D = Concat3D;

},{"../../math/concat_util":47,"./op":106}],86:[function(require,module,exports) {
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
var conv_util = require("../../math/conv_util");
var util = require("../../util");
var op_1 = require("./op");
var Convolution2D = (function (_super) {
    __extends(Convolution2D, _super);
    function Convolution2D(wTensor, xTensor, bTensor, yTensor, fieldSize, outputDepth, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this) || this;
        _this.wTensor = wTensor;
        _this.xTensor = xTensor;
        _this.bTensor = bTensor;
        _this.yTensor = yTensor;
        _this.fieldSize = fieldSize;
        _this.outputDepth = outputDepth;
        _this.stride = stride;
        _this.assertWeightsShape(wTensor.shape);
        _this.zeroPad = zeroPad != null ?
            zeroPad :
            conv_util.computeDefaultPad(_this.xTensor.shape, _this.fieldSize, _this.stride);
        util.assert(util.isInt(_this.zeroPad), "The zero padding (" + _this.zeroPad + ") must be an integer. Change the " +
            "stride and/or zero pad parameters");
        return _this;
    }
    Convolution2D.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var weights = inferenceArrays.get(this.wTensor);
        var biases = inferenceArrays.get(this.bTensor);
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.conv2d(x, weights, biases, _this.stride, _this.zeroPad)));
        });
    };
    Convolution2D.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var filter = inferenceArrays.get(this.wTensor);
        var x = inferenceArrays.get(this.xTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            var dw = math.conv2dDerFilter(x, dy, filter.shape, _this.stride, _this.zeroPad);
            var db = math.conv2dDerBias(dy);
            var dx = math.conv2dDerInput(x.shape, dy, filter, _this.stride, _this.zeroPad);
            gradientArrays.add(_this.wTensor, dw);
            gradientArrays.add(_this.bTensor, db);
            gradientArrays.add(_this.xTensor, dx);
        });
    };
    Convolution2D.prototype.assertWeightsShape = function (weightsShape) {
        util.assert(weightsShape[0] === this.fieldSize &&
            weightsShape[1] === this.fieldSize &&
            weightsShape[2] === this.xTensor.shape[2] &&
            weightsShape[3] === this.outputDepth, "weights must be of shape [" + this.fieldSize + "," + this.fieldSize + "," +
            (this.xTensor.shape[2] + "," + this.outputDepth + "] but they are of") +
            ("shape [" + weightsShape + "]"));
    };
    return Convolution2D;
}(op_1.Operation));
exports.Convolution2D = Convolution2D;

},{"../../util":18,"../../math/conv_util":23,"./op":106}],87:[function(require,module,exports) {
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
var util = require("../../util");
var graph_util = require("../graph_util");
var op_1 = require("./op");
var Divide = (function (_super) {
    __extends(Divide, _super);
    function Divide(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        util.assert(util.sizeFromShape(x1Tensor.shape) === 1 ||
            util.sizeFromShape(x2Tensor.shape) === 1 ||
            util.arraysEqual(x1Tensor.shape, x2Tensor.shape), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape');
        return _this;
    }
    Divide.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var t1 = inferenceArrays.get(this.x1Tensor);
        var t2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(t1.shape)) {
                result = math.scalarDividedByArray(t1, t2);
            }
            else if (util.isScalarShape(t2.shape)) {
                result = math.arrayDividedByScalar(t1, t2);
            }
            else {
                result = math.divide(t1, t2);
            }
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    Divide.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var dy = gradientArrays.get(this.yTensor);
        var x1IsScalar = util.isScalarShape(x1.shape);
        var x2IsScalar = util.isScalarShape(x2.shape);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                if (x1IsScalar) {
                    var div = math.divide(dy, x2);
                    gradientArrays.add(_this.x1Tensor, math.sum(div));
                    div.dispose();
                }
                else if (x2IsScalar) {
                    gradientArrays.add(_this.x1Tensor, math.arrayDividedByScalar(dy, x2));
                }
                else {
                    gradientArrays.add(_this.x1Tensor, math.divide(dy, x2));
                }
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                var x2Squared = math.elementWiseMul(x2, x2);
                var x1OverX2Squared = void 0;
                if (x2IsScalar) {
                    x1OverX2Squared = math.arrayDividedByScalar(x1, x2Squared);
                }
                else if (x1IsScalar) {
                    x1OverX2Squared = math.scalarDividedByArray(x1, x2Squared);
                }
                else {
                    x1OverX2Squared = math.divide(x1, x2Squared);
                }
                var dx2 = math.neg(x1OverX2Squared);
                var dyTimesDerivative = math.elementWiseMul(dy, dx2);
                if (x2IsScalar) {
                    gradientArrays.add(_this.x2Tensor, math.sum(dyTimesDerivative));
                }
                else {
                    gradientArrays.add(_this.x2Tensor, dyTimesDerivative);
                }
            }
        });
    };
    return Divide;
}(op_1.Operation));
exports.Divide = Divide;

},{"../../util":18,"../graph_util":81,"./op":106}],105:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("./ndarray");
var TanHFunc = (function () {
    function TanHFunc() {
        this.one = ndarray_1.Scalar.new(1);
    }
    TanHFunc.prototype.output = function (math, x) {
        return math.tanh(x);
    };
    TanHFunc.prototype.der = function (math, x, y) {
        var _this = this;
        return math.scope(function () {
            var ySquared = math.elementWiseMul(y, y);
            return math.scalarMinusArray(_this.one, ySquared);
        });
    };
    TanHFunc.prototype.dispose = function () {
        this.one.dispose();
    };
    return TanHFunc;
}());
exports.TanHFunc = TanHFunc;
var ReLUFunc = (function () {
    function ReLUFunc() {
    }
    ReLUFunc.prototype.output = function (math, x) {
        return math.relu(x);
    };
    ReLUFunc.prototype.der = function (math, x, y) {
        return math.step(x);
    };
    ReLUFunc.prototype.dispose = function () { };
    return ReLUFunc;
}());
exports.ReLUFunc = ReLUFunc;
var LeakyReluFunc = (function () {
    function LeakyReluFunc(alpha) {
        this.alpha = alpha;
    }
    LeakyReluFunc.prototype.output = function (math, x) {
        return math.leakyRelu(x, this.alpha);
    };
    LeakyReluFunc.prototype.der = function (math, x, y) {
        return math.step(x, this.alpha);
    };
    LeakyReluFunc.prototype.dispose = function () { };
    return LeakyReluFunc;
}());
exports.LeakyReluFunc = LeakyReluFunc;
var SigmoidFunc = (function () {
    function SigmoidFunc() {
    }
    SigmoidFunc.prototype.output = function (math, x) {
        return math.sigmoid(x);
    };
    SigmoidFunc.prototype.der = function (math, x, y) {
        return math.scope(function () {
            var ySquared = math.elementWiseMul(y, y);
            return math.subStrict(y, ySquared);
        });
    };
    SigmoidFunc.prototype.dispose = function () { };
    return SigmoidFunc;
}());
exports.SigmoidFunc = SigmoidFunc;
var SquareFunc = (function () {
    function SquareFunc() {
        this.two = ndarray_1.Scalar.new(2);
    }
    SquareFunc.prototype.output = function (math, x) {
        return math.elementWiseMul(x, x);
    };
    SquareFunc.prototype.der = function (math, x, y) {
        return math.scalarTimesArray(this.two, x);
    };
    SquareFunc.prototype.dispose = function () {
        this.two.dispose();
    };
    return SquareFunc;
}());
exports.SquareFunc = SquareFunc;
var EluFunc = (function () {
    function EluFunc() {
    }
    EluFunc.prototype.output = function (math, x) {
        return math.elu(x);
    };
    EluFunc.prototype.der = function (math, x, y) {
        return math.eluDer(x);
    };
    EluFunc.prototype.dispose = function () { };
    return EluFunc;
}());
exports.EluFunc = EluFunc;

},{"./ndarray":30}],88:[function(require,module,exports) {
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
var activation_functions_1 = require("../../math/activation_functions");
var op_1 = require("./op");
var ElementWiseActivation = (function (_super) {
    __extends(ElementWiseActivation, _super);
    function ElementWiseActivation(xTensor, yTensor, func) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        _this.func = func;
        return _this;
    }
    ElementWiseActivation.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(_this.func.output(math, x)));
        });
    };
    ElementWiseActivation.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var y = inferenceArrays.get(this.yTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            var dydx = _this.func.der(math, x, y);
            gradientArrays.add(_this.xTensor, math.elementWiseMul(dy, dydx));
            dydx.dispose();
        });
    };
    ElementWiseActivation.prototype.dispose = function () {
        this.func.dispose();
    };
    return ElementWiseActivation;
}(op_1.Operation));
exports.ElementWiseActivation = ElementWiseActivation;
var ReLU = (function (_super) {
    __extends(ReLU, _super);
    function ReLU(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.ReLUFunc()) || this;
    }
    return ReLU;
}(ElementWiseActivation));
exports.ReLU = ReLU;
var LeakyReLU = (function (_super) {
    __extends(LeakyReLU, _super);
    function LeakyReLU(xTensor, yTensor, alpha) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.LeakyReluFunc(alpha)) || this;
    }
    return LeakyReLU;
}(ElementWiseActivation));
exports.LeakyReLU = LeakyReLU;
var TanH = (function (_super) {
    __extends(TanH, _super);
    function TanH(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.TanHFunc()) || this;
    }
    return TanH;
}(ElementWiseActivation));
exports.TanH = TanH;
var Sigmoid = (function (_super) {
    __extends(Sigmoid, _super);
    function Sigmoid(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.SigmoidFunc()) || this;
    }
    return Sigmoid;
}(ElementWiseActivation));
exports.Sigmoid = Sigmoid;
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.SquareFunc()) || this;
    }
    return Square;
}(ElementWiseActivation));
exports.Square = Square;
var Elu = (function (_super) {
    __extends(Elu, _super);
    function Elu(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.EluFunc()) || this;
    }
    return Elu;
}(ElementWiseActivation));
exports.Elu = Elu;
var PReLU = (function (_super) {
    __extends(PReLU, _super);
    function PReLU(xTensor, alphaTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.alphaTensor = alphaTensor;
        _this.yTensor = yTensor;
        return _this;
    }
    PReLU.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var alpha = inferenceArrays.get(this.alphaTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.prelu(x, alpha)));
        });
    };
    PReLU.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var alpha = inferenceArrays.get(this.alphaTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            var dydx = math.preluDer(x, alpha);
            gradientArrays.add(_this.xTensor, math.elementWiseMul(dy, dydx));
        });
    };
    return PReLU;
}(op_1.Operation));
exports.PReLU = PReLU;

},{"../../math/activation_functions":105,"./op":106}],104:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var ndarray_1 = require("./ndarray");
var SquareCostFunc = (function () {
    function SquareCostFunc() {
        this.halfOne = environment_1.ENV.math.keep(ndarray_1.Scalar.new(0.5));
    }
    SquareCostFunc.prototype.cost = function (math, x1, x2) {
        var diff = math.subStrict(x1, x2);
        var diffSquared = math.elementWiseMul(diff, diff);
        var result = math.scalarTimesArray(this.halfOne, diffSquared);
        diff.dispose();
        diffSquared.dispose();
        return result;
    };
    SquareCostFunc.prototype.der = function (math, x1, x2) {
        return math.subStrict(x1, x2);
    };
    SquareCostFunc.prototype.dispose = function () {
        this.halfOne.dispose();
    };
    return SquareCostFunc;
}());
exports.SquareCostFunc = SquareCostFunc;

},{"../environment":16,"./ndarray":30}],89:[function(require,module,exports) {
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
var environment_1 = require("../../environment");
var cost_functions_1 = require("../../math/cost_functions");
var ndarray_1 = require("../../math/ndarray");
var util = require("../../util");
var graph_util = require("../graph_util");
var op_1 = require("./op");
var ElementWiseCost = (function (_super) {
    __extends(ElementWiseCost, _super);
    function ElementWiseCost(x1Tensor, x2Tensor, yTensor, func) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        _this.func = func;
        _this.oneOverNScalar =
            environment_1.ENV.math.keep(ndarray_1.Scalar.new(1 / util.sizeFromShape(x1Tensor.shape)));
        return _this;
    }
    ElementWiseCost.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var elementWiseCost = _this.func.cost(math, x1, x2);
            var sum = math.sum(elementWiseCost);
            var result = math.scalarTimesArray(_this.oneOverNScalar, sum);
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    ElementWiseCost.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                gradientArrays.add(_this.x1Tensor, _this.func.der(math, x1, x2));
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                gradientArrays.add(_this.x2Tensor, _this.func.der(math, x2, x1));
            }
        });
    };
    ElementWiseCost.prototype.dispose = function () {
        this.func.dispose();
        this.oneOverNScalar.dispose();
    };
    return ElementWiseCost;
}(op_1.Operation));
exports.ElementWiseCost = ElementWiseCost;
var MeanSquaredCost = (function (_super) {
    __extends(MeanSquaredCost, _super);
    function MeanSquaredCost(x1Tensor, x2Tensor, yTensor) {
        return _super.call(this, x1Tensor, x2Tensor, yTensor, new cost_functions_1.SquareCostFunc()) || this;
    }
    return MeanSquaredCost;
}(ElementWiseCost));
exports.MeanSquaredCost = MeanSquaredCost;

},{"../../environment":16,"../../util":18,"../../math/cost_functions":104,"../../math/ndarray":30,"../graph_util":81,"./op":106}],90:[function(require,module,exports) {
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
var graph_util = require("../graph_util");
var op_1 = require("./op");
var Exp = (function (_super) {
    __extends(Exp, _super);
    function Exp(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        return _this;
    }
    Exp.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.exp(x)));
        });
    };
    Exp.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var y = inferenceArrays.get(this.yTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.xTensor)) {
                gradientArrays.add(_this.xTensor, math.elementWiseMul(y, dy));
            }
        });
    };
    return Exp;
}(op_1.Operation));
exports.Exp = Exp;

},{"../graph_util":81,"./op":106}],91:[function(require,module,exports) {
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
var graph_util = require("../graph_util");
var op_1 = require("./op");
var LinearCombination = (function (_super) {
    __extends(LinearCombination, _super);
    function LinearCombination(x1Tensor, x2Tensor, c1Tensor, c2Tensor, outTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.c1Tensor = c1Tensor;
        _this.c2Tensor = c2Tensor;
        _this.outTensor = outTensor;
        return _this;
    }
    LinearCombination.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var c1 = inferenceArrays.get(this.c1Tensor).asScalar();
        var c2 = inferenceArrays.get(this.c2Tensor).asScalar();
        math.scope(function (keep) {
            inferenceArrays.set(_this.outTensor, keep(math.scaledArrayAdd(c1, x1, c2, x2)));
        });
    };
    LinearCombination.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var c1 = inferenceArrays.get(this.c1Tensor);
        var c2 = inferenceArrays.get(this.c2Tensor);
        var dy = gradientArrays.get(this.outTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                gradientArrays.add(_this.x1Tensor, math.scalarTimesArray(c1, dy));
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                gradientArrays.add(_this.x2Tensor, math.scalarTimesArray(c2, dy));
            }
            if (graph_util.shouldBackProp(_this.c1Tensor)) {
                var dotProduct1 = math.elementWiseMul(x1, dy);
                gradientArrays.add(_this.c1Tensor, math.sum(dotProduct1));
            }
            if (graph_util.shouldBackProp(_this.c2Tensor)) {
                var dotProduct2 = math.elementWiseMul(x2, dy);
                gradientArrays.add(_this.c2Tensor, math.sum(dotProduct2));
            }
        });
    };
    return LinearCombination;
}(op_1.Operation));
exports.LinearCombination = LinearCombination;

},{"../graph_util":81,"./op":106}],92:[function(require,module,exports) {
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
var graph_util = require("../graph_util");
var op_1 = require("./op");
var Log = (function (_super) {
    __extends(Log, _super);
    function Log(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        return _this;
    }
    Log.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.log(x)));
        });
    };
    Log.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.xTensor)) {
                gradientArrays.add(_this.xTensor, math.divide(dy, x));
            }
        });
    };
    return Log;
}(op_1.Operation));
exports.Log = Log;

},{"../graph_util":81,"./op":106}],93:[function(require,module,exports) {
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
var matmul_1 = require("../../math/backends/types/matmul");
var graph_util = require("../graph_util");
var op_1 = require("./op");
var MatMul = (function (_super) {
    __extends(MatMul, _super);
    function MatMul(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        return _this;
    }
    MatMul.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            if (x1.shape.length === 2 && x2.shape.length === 2) {
                inferenceArrays.set(_this.yTensor, keep(math.matMul(x1, x2)));
            }
            else if (x1.shape.length === 2 && x2.shape.length === 1) {
                inferenceArrays.set(_this.yTensor, keep(math.matrixTimesVector(x1, x2)));
            }
            else if (x1.shape.length === 1 && x2.shape.length === 2) {
                inferenceArrays.set(_this.yTensor, keep(math.vectorTimesMatrix(x1, x2)));
            }
        });
    };
    MatMul.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var dy = gradientArrays.get(this.yTensor);
        if (x1.shape.length === 1) {
            x1 = x1.reshape([1, x1.size]);
            dy = dy.reshape([1, dy.size]);
        }
        if (x2.shape.length === 1) {
            x2 = x2.reshape([x2.size, 1]);
            dy = dy.reshape([dy.size, 1]);
        }
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                var dx1 = math.matMul(dy, x2, matmul_1.MatrixOrientation.REGULAR, matmul_1.MatrixOrientation.TRANSPOSED);
                gradientArrays.add(_this.x1Tensor, _this.x1Tensor.shape.length === 1 ? dx1.as1D() : dx1);
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                var dx2 = math.matMul(x1, dy, matmul_1.MatrixOrientation.TRANSPOSED, matmul_1.MatrixOrientation.REGULAR);
                gradientArrays.add(_this.x2Tensor, _this.x2Tensor.shape.length === 1 ? dx2.as1D() : dx2);
            }
        });
    };
    return MatMul;
}(op_1.Operation));
exports.MatMul = MatMul;

},{"../graph_util":81,"./op":106,"../../math/backends/types/matmul":44}],94:[function(require,module,exports) {
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
var conv_util = require("../../math/conv_util");
var util = require("../../util");
var op_1 = require("./op");
var MaxPool = (function (_super) {
    __extends(MaxPool, _super);
    function MaxPool(xTensor, yTensor, fieldSize, stride, pad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        _this.fieldSize = fieldSize;
        _this.stride = stride;
        if (pad != null) {
            _this.pad = pad;
        }
        else {
            _this.pad = conv_util.computeDefaultPad(xTensor.shape, _this.fieldSize, _this.stride);
        }
        util.assert(util.isInt(_this.pad), "The zero padding (" + _this.pad + ") must be an integer. Change the " +
            "stride and/or zero pad parameters");
        return _this;
    }
    MaxPool.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.maxPool(x, _this.fieldSize, _this.stride, _this.pad)));
        });
    };
    MaxPool.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            gradientArrays.add(_this.xTensor, math.maxPoolBackprop(dy, x, _this.fieldSize, _this.stride, _this.pad));
        });
    };
    return MaxPool;
}(op_1.Operation));
exports.MaxPool = MaxPool;

},{"../../util":18,"../../math/conv_util":23,"./op":106}],95:[function(require,module,exports) {
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
var util = require("../../util");
var graph_util = require("../graph_util");
var op_1 = require("./op");
var Multiply = (function (_super) {
    __extends(Multiply, _super);
    function Multiply(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        util.assert(util.sizeFromShape(x1Tensor.shape) === 1 ||
            util.sizeFromShape(x2Tensor.shape) === 1 ||
            util.arraysEqual(x1Tensor.shape, x2Tensor.shape), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape');
        return _this;
    }
    Multiply.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var t1 = inferenceArrays.get(this.x1Tensor);
        var t2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(t1.shape)) {
                result = math.scalarTimesArray(t1, t2);
            }
            else if (util.isScalarShape(t2.shape)) {
                result = math.scalarTimesArray(t2, t1);
            }
            else {
                result = math.elementWiseMul(t1, t2);
            }
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    Multiply.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                if (util.isScalarShape(_this.x1Tensor.shape)) {
                    var mul = math.elementWiseMul(dy, x2);
                    gradientArrays.add(_this.x1Tensor, math.sum(mul));
                }
                else if (util.isScalarShape(x2.shape)) {
                    gradientArrays.add(_this.x1Tensor, math.scalarTimesArray(x2, dy));
                }
                else {
                    gradientArrays.add(_this.x1Tensor, math.elementWiseMul(x2, dy));
                }
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                if (util.isScalarShape(_this.x2Tensor.shape)) {
                    var mul = math.elementWiseMul(dy, x1);
                    gradientArrays.add(_this.x2Tensor, math.sum(mul));
                }
                else if (util.isScalarShape(x1.shape)) {
                    gradientArrays.add(_this.x2Tensor, math.scalarTimesArray(x1, dy));
                }
                else {
                    gradientArrays.add(_this.x2Tensor, math.elementWiseMul(x1, dy));
                }
            }
        });
    };
    return Multiply;
}(op_1.Operation));
exports.Multiply = Multiply;

},{"../../util":18,"../graph_util":81,"./op":106}],96:[function(require,module,exports) {
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
var environment_1 = require("../../environment");
var ndarray_1 = require("../../math/ndarray");
var util = require("../../util");
var graph_util = require("../graph_util");
var op_1 = require("./op");
var ReduceSum = (function (_super) {
    __extends(ReduceSum, _super);
    function ReduceSum(x, outTensor) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.outTensor = outTensor;
        util.assertShapesMatch(outTensor.shape, []);
        _this.ones = environment_1.ENV.math.keep(ndarray_1.NDArray.ones(x.shape));
        return _this;
    }
    ReduceSum.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.x);
        math.scope(function (keep) {
            inferenceArrays.set(_this.outTensor, keep(math.sum(x)));
        });
    };
    ReduceSum.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        if (!graph_util.shouldBackProp(this.x)) {
            return;
        }
        math.scope(function () {
            var dy = gradientArrays.get(_this.outTensor);
            gradientArrays.add(_this.x, math.scalarTimesArray(dy, _this.ones));
        });
    };
    ReduceSum.prototype.dispose = function () {
        this.ones.dispose();
    };
    return ReduceSum;
}(op_1.Operation));
exports.ReduceSum = ReduceSum;

},{"../../environment":16,"../../util":18,"../../math/ndarray":30,"../graph_util":81,"./op":106}],97:[function(require,module,exports) {
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
var util = require("../../util");
var op_1 = require("./op");
var Reshape = (function (_super) {
    __extends(Reshape, _super);
    function Reshape(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        var xSize = util.sizeFromShape(xTensor.shape);
        var ySize = util.sizeFromShape(yTensor.shape);
        util.assert(xSize === ySize, "The input size (" + xSize + ") and output size (" + ySize + ") must match");
        return _this;
    }
    Reshape.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var clone = math.clone(x);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(clone.reshape(_this.yTensor.shape)));
        });
    };
    Reshape.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var dy = gradientArrays.get(this.yTensor);
        var clone = math.clone(dy);
        math.scope(function () {
            gradientArrays.add(_this.xTensor, clone.reshape(_this.xTensor.shape));
        });
    };
    return Reshape;
}(op_1.Operation));
exports.Reshape = Reshape;

},{"../../util":18,"./op":106}],98:[function(require,module,exports) {
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
var environment_1 = require("../../environment");
var ndarray_1 = require("../../math/ndarray");
var util = require("../../util");
var graph_1 = require("../graph");
var op_1 = require("./op");
var Softmax = (function (_super) {
    __extends(Softmax, _super);
    function Softmax(logitsTensor, output) {
        var _this = _super.call(this) || this;
        _this.logitsTensor = logitsTensor;
        _this.output = output;
        return _this;
    }
    Softmax.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var logits = inferenceArrays.get(this.logitsTensor);
        return math.scope(function (keep) {
            inferenceArrays.set(_this.output, keep(math.softmax(logits)));
        });
    };
    Softmax.prototype.backProp = function () {
        throw Error('Softmax backprop is not yet implemented');
    };
    return Softmax;
}(op_1.Operation));
exports.Softmax = Softmax;
var SoftmaxCrossEntropyCost = (function (_super) {
    __extends(SoftmaxCrossEntropyCost, _super);
    function SoftmaxCrossEntropyCost(logitsTensor, labelTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.logitsTensor = logitsTensor;
        _this.labelTensor = labelTensor;
        _this.yTensor = yTensor;
        _this.softmaxTensor = new graph_1.Tensor(logitsTensor.shape);
        _this.epsilon = environment_1.ENV.math.keep(ndarray_1.Scalar.new(1e-5));
        return _this;
    }
    SoftmaxCrossEntropyCost.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var logits = inferenceArrays.get(this.logitsTensor);
        var label = inferenceArrays.get(this.labelTensor);
        math.scope(function (keep) {
            var softmaxResult = math.softmax(logits);
            inferenceArrays.set(_this.softmaxTensor, keep(softmaxResult));
            inferenceArrays.set(_this.yTensor, keep(crossEntropyCost(math, softmaxResult, label, _this.epsilon)));
        });
    };
    SoftmaxCrossEntropyCost.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var softmax = inferenceArrays.get(this.softmaxTensor);
        var label = inferenceArrays.get(this.labelTensor);
        math.scope(function () {
            gradientArrays.add(_this.logitsTensor, math.subtract(softmax, label));
        });
    };
    SoftmaxCrossEntropyCost.prototype.disposeTransientArrays = function (inferenceArrays, gradientArrays) {
        inferenceArrays.disposeArray(this.softmaxTensor);
    };
    SoftmaxCrossEntropyCost.prototype.dispose = function () {
        this.epsilon.dispose();
    };
    return SoftmaxCrossEntropyCost;
}(op_1.Operation));
exports.SoftmaxCrossEntropyCost = SoftmaxCrossEntropyCost;
function crossEntropyCost(math, y, target, epsilon) {
    util.assert(y.size === target.size, 'The output and target must be the same size');
    return math.scope(function () {
        var yPlusEps = math.scalarPlusArray(epsilon, y);
        var logOutput = math.log(yPlusEps);
        var tarLogOutput = math.elementWiseMul(target, logOutput);
        var costVector = math.neg(tarLogOutput);
        return math.sum(costVector);
    });
}
exports.crossEntropyCost = crossEntropyCost;

},{"../../environment":16,"../../util":18,"../../math/ndarray":30,"../graph":27,"./op":106}],99:[function(require,module,exports) {
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
var util = require("../../util");
var graph_util = require("../graph_util");
var op_1 = require("./op");
var Subtract = (function (_super) {
    __extends(Subtract, _super);
    function Subtract(t1, t2, outTensor) {
        var _this = _super.call(this) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        _this.outTensor = outTensor;
        util.assert(util.sizeFromShape(t1.shape) === 1 ||
            util.sizeFromShape(t2.shape) === 1 ||
            util.arraysEqual(t1.shape, t2.shape), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape');
        return _this;
    }
    Subtract.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var t1 = inferenceArrays.get(this.t1);
        var t2 = inferenceArrays.get(this.t2);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(t1.shape)) {
                result = math.scalarMinusArray(t1, t2);
            }
            else if (util.isScalarShape(t2.shape)) {
                result = math.arrayMinusScalar(t1, t2);
            }
            else {
                result = math.subtract(t1, t2);
            }
            inferenceArrays.set(_this.outTensor, keep(result));
        });
    };
    Subtract.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var dy = gradientArrays.get(this.outTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.t1)) {
                if (util.isScalarShape(_this.t1.shape)) {
                    var sum = math.sum(dy);
                    gradientArrays.add(_this.t1, sum);
                }
                else {
                    gradientArrays.add(_this.t1, math.clone(dy));
                }
            }
            if (graph_util.shouldBackProp(_this.t2)) {
                if (util.isScalarShape(_this.t2.shape)) {
                    var sum = math.sum(dy);
                    var negSum = math.neg(sum);
                    gradientArrays.add(_this.t2, negSum);
                }
                else {
                    gradientArrays.add(_this.t2, math.neg(dy));
                }
            }
        });
    };
    Subtract.prototype.dispose = function () {
        if (this.dySizeScalar != null) {
            this.dySizeScalar.dispose();
        }
    };
    return Subtract;
}(op_1.Operation));
exports.Subtract = Subtract;

},{"../../util":18,"../graph_util":81,"./op":106}],48:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = require("./graph");
var graph_util = require("./graph_util");
var add_1 = require("./ops/add");
var argmax_1 = require("./ops/argmax");
var argmaxequals_1 = require("./ops/argmaxequals");
var concat3d_1 = require("./ops/concat3d");
var convolution_1 = require("./ops/convolution");
var divide_1 = require("./ops/divide");
var element_wise_activation_1 = require("./ops/element_wise_activation");
var element_wise_cost_1 = require("./ops/element_wise_cost");
var exp_1 = require("./ops/exp");
var linear_combination_1 = require("./ops/linear_combination");
var log_1 = require("./ops/log");
var matmul_1 = require("./ops/matmul");
var max_pool_1 = require("./ops/max_pool");
var multiply_1 = require("./ops/multiply");
var reduce_sum_1 = require("./ops/reduce_sum");
var reshape_1 = require("./ops/reshape");
var softmax_1 = require("./ops/softmax");
var subtract_1 = require("./ops/subtract");
function emitFromGraphNodes(nodes) {
    var ops = [];
    nodes.forEach(function (node) { return Array.prototype.push.apply(ops, emitOpFromNode(node)); });
    return ops;
}
exports.emitFromGraphNodes = emitFromGraphNodes;
function emitOpFromNode(node) {
    if (node instanceof graph_1.ReshapeNode) {
        return [new reshape_1.Reshape(node.inputs[graph_1.ReshapeNode.X], node.output)];
    }
    else if (node instanceof graph_1.MatMulNode) {
        var x1 = node.inputs[graph_1.MatMulNode.X1];
        var x2 = node.inputs[graph_1.MatMulNode.X2];
        return [new matmul_1.MatMul(x1, x2, node.output)];
    }
    else if (node instanceof graph_1.Convolution2DNode) {
        var w = node.inputs[graph_1.Convolution2DNode.W];
        var x = node.inputs[graph_1.Convolution2DNode.X];
        var b = node.inputs[graph_1.Convolution2DNode.B];
        return [new convolution_1.Convolution2D(w, x, b, node.output, node.fieldSize, node.outputDepth, node.stride, node.zeroPad)];
    }
    else if (node instanceof graph_1.MaxPoolNode) {
        var x = node.inputs[graph_1.MaxPoolNode.X];
        return [new max_pool_1.MaxPool(x, node.output, node.fieldSize, node.stride, node.zeroPad)];
    }
    else if (node instanceof graph_1.ExpNode) {
        return [new exp_1.Exp(node.inputs[graph_1.ExpNode.X], node.output)];
    }
    else if (node instanceof graph_1.LogNode) {
        return [new log_1.Log(node.inputs[graph_1.LogNode.X], node.output)];
    }
    else if (node instanceof graph_1.ReLUNode) {
        return [new element_wise_activation_1.ReLU(node.inputs[graph_1.ReLUNode.X], node.output)];
    }
    else if (node instanceof graph_1.LeakyReLUNode) {
        return [new element_wise_activation_1.LeakyReLU(node.inputs[graph_1.LeakyReLUNode.X], node.output, node.alpha)];
    }
    else if (node instanceof graph_1.PReLUNode) {
        return [new element_wise_activation_1.PReLU(node.inputs[graph_1.PReLUNode.X], node.inputs[graph_1.PReLUNode.ALPHA], node.output)];
    }
    else if (node instanceof graph_1.EluNode) {
        return [new element_wise_activation_1.Elu(node.inputs[graph_1.EluNode.X], node.output)];
    }
    else if (node instanceof graph_1.TanHNode) {
        return [new element_wise_activation_1.TanH(node.inputs[graph_1.TanHNode.X], node.output)];
    }
    else if (node instanceof graph_1.SigmoidNode) {
        return [new element_wise_activation_1.Sigmoid(node.inputs[graph_1.SigmoidNode.X], node.output)];
    }
    else if (node instanceof graph_1.SoftmaxCrossEntropyCostNode) {
        var x = node.inputs[graph_1.SoftmaxCrossEntropyCostNode.X];
        var target = node.inputs[graph_1.SoftmaxCrossEntropyCostNode.TARGET];
        return [new softmax_1.SoftmaxCrossEntropyCost(x, target, node.output)];
    }
    else if (node instanceof graph_1.SoftmaxNode) {
        return [new softmax_1.Softmax(node.inputs[graph_1.SoftmaxNode.X], node.output)];
    }
    else if (node instanceof graph_1.MeanSquaredCostNode) {
        var label = node.inputs[graph_1.MeanSquaredCostNode.LABEL];
        var prediction = node.inputs[graph_1.MeanSquaredCostNode.PREDICTION];
        return [new element_wise_cost_1.MeanSquaredCost(label, prediction, node.output)];
    }
    else if (node instanceof graph_1.ArgMaxEqualsNode) {
        return [new argmaxequals_1.ArgMaxEquals(node.inputs[graph_1.ArgMaxEqualsNode.X1], node.inputs[graph_1.ArgMaxEqualsNode.X2], node.output)];
    }
    else if (node instanceof graph_1.ArgMaxNode) {
        return [new argmax_1.ArgMax(node.x, node.output)];
    }
    else if (node instanceof graph_1.FusedLinearCombinationNode) {
        return [new linear_combination_1.LinearCombination(node.inputs[graph_1.FusedLinearCombinationNode.T1], node.inputs[graph_1.FusedLinearCombinationNode.T2], node.inputs[graph_1.FusedLinearCombinationNode.C1], node.inputs[graph_1.FusedLinearCombinationNode.C2], node.output)];
    }
    else if (node instanceof graph_1.Concat3DNode) {
        return [new concat3d_1.Concat3D(node.inputs[graph_1.Concat3DNode.X1], node.inputs[graph_1.Concat3DNode.X2], node.axis, node.output)];
    }
    else if (node instanceof graph_1.SquareNode) {
        return [new element_wise_activation_1.Square(node.inputs[graph_1.SquareNode.X], node.output)];
    }
    else if (node instanceof graph_1.AddNode) {
        return [new add_1.Add(node.inputs[graph_1.AddNode.T1], node.inputs[graph_1.AddNode.T2], node.output)];
    }
    else if (node instanceof graph_1.SubtractNode) {
        return [new subtract_1.Subtract(node.inputs[graph_1.SubtractNode.T1], node.inputs[graph_1.SubtractNode.T2], node.output)];
    }
    else if (node instanceof graph_1.MultiplyNode) {
        return [new multiply_1.Multiply(node.inputs[graph_1.MultiplyNode.T1], node.inputs[graph_1.MultiplyNode.T2], node.output)];
    }
    else if (node instanceof graph_1.DivideNode) {
        return [new divide_1.Divide(node.inputs[graph_1.DivideNode.T1], node.inputs[graph_1.DivideNode.T2], node.output)];
    }
    else if (node instanceof graph_1.ReduceSumNode) {
        return [new reduce_sum_1.ReduceSum(node.inputs[graph_1.ReduceSumNode.X], node.output)];
    }
    else if (graph_util.isInputNode(node)) {
        return [];
    }
    else {
        throw Error("Unsupported node type: " + node.constructor.name);
    }
}

},{"./graph":27,"./graph_util":81,"./ops/add":82,"./ops/argmax":83,"./ops/argmaxequals":84,"./ops/concat3d":85,"./ops/convolution":86,"./ops/divide":87,"./ops/element_wise_activation":88,"./ops/element_wise_cost":89,"./ops/exp":90,"./ops/linear_combination":91,"./ops/log":92,"./ops/matmul":93,"./ops/max_pool":94,"./ops/multiply":95,"./ops/reduce_sum":96,"./ops/reshape":97,"./ops/softmax":98,"./ops/subtract":99}],28:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("../math/ndarray");
var util = require("../util");
var operation_emitter = require("./operation_emitter");
var session_util = require("./session_util");
var tensor_array_map_1 = require("./tensor_array_map");
var FeedDictionary = (function () {
    function FeedDictionary(feedEntries) {
        var _this = this;
        this.dict = {};
        if (feedEntries) {
            feedEntries.forEach(function (entry) { return _this.dict[entry.tensor.id] = entry; });
        }
    }
    return FeedDictionary;
}());
exports.FeedDictionary = FeedDictionary;
var CostReduction;
(function (CostReduction) {
    CostReduction[CostReduction["NONE"] = 0] = "NONE";
    CostReduction[CostReduction["SUM"] = 1] = "SUM";
    CostReduction[CostReduction["MEAN"] = 2] = "MEAN";
})(CostReduction = exports.CostReduction || (exports.CostReduction = {}));
var Session = (function () {
    function Session(graph, math) {
        this.math = math;
        this.activationArrayMap = new tensor_array_map_1.TensorArrayMap();
        this.runtimeCache = {};
        this.oneScalar = ndarray_1.Scalar.new(1);
        this.gradientArrayMap = new tensor_array_map_1.SummedTensorArrayMap(this.math);
    }
    Session.prototype.dispose = function () {
        var _this = this;
        this.activationArrayMap.dispose();
        Object.keys(this.runtimeCache).forEach(function (key) {
            var runtime = _this.runtimeCache[key];
            if (runtime.operations) {
                runtime.operations.forEach(function (op) { return op.dispose(); });
            }
        });
        this.runtimeCache = {};
        if (this.batchSizeScalar != null) {
            this.batchSizeScalar.dispose();
        }
        this.oneScalar.dispose();
    };
    Session.prototype.evalAll = function (tensors, feedEntries) {
        var _this = this;
        return this.math.scope(function () {
            var feed = new FeedDictionary(feedEntries);
            var runtime = _this.getOrCreateRuntime(tensors, feed);
            var activations = _this.activationArrayMap;
            session_util.disposeAndInitializeOperationOutputs(runtime.nodes, activations);
            session_util.disposeTransientOperationArrays(runtime.operations, _this.activationArrayMap, _this.gradientArrayMap);
            session_util.addPersistentArraysToTensorArrayMap(runtime.nodes, activations);
            session_util.loadInputsFromFeedDictionaryToTensorArrayMap(feed, activations, _this.math);
            runtime.operations.forEach(function (op) { return op.feedForward(_this.math, activations); });
            var results = tensors.map(function (x) { return activations.get(x); });
            tensors.forEach(function (x) { return activations.delete(x); });
            session_util.releaseFeedDictionaryInputsFromTensorArrayMap(feed, activations, _this.math);
            return results;
        });
    };
    Session.prototype.eval = function (tensor, feedEntries) {
        return this.evalAll([tensor], feedEntries)[0];
    };
    Session.prototype.train = function (costTensor, feedEntries, batchSize, optimizer, costReduction) {
        var _this = this;
        if (costReduction === void 0) { costReduction = CostReduction.NONE; }
        util.assert(util.isScalarShape(costTensor.shape), 'Cost tensor for training must be a scalar value.');
        if (this.prevBatchSize !== batchSize) {
            this.prevBatchSize = batchSize;
            if (this.batchSizeScalar != null) {
                this.batchSizeScalar.dispose();
            }
            this.batchSizeScalar = this.math.keep(ndarray_1.Scalar.new(batchSize));
        }
        var feed = new FeedDictionary(feedEntries);
        session_util.throwIfFeedDictionaryContainsNDArrays(feed);
        var runtime = this.getOrCreateRuntime([costTensor], feed);
        var inferenceOperations = runtime.operations;
        var backPropOperations = runtime.operations.slice().reverse();
        var activations = this.activationArrayMap;
        var gradients = this.gradientArrayMap;
        gradients.nullify(costTensor);
        gradients.add(costTensor, this.oneScalar);
        session_util.addPersistentArraysToTensorArrayMap(runtime.nodes, activations);
        optimizer.beforeBatch(this.math, batchSize, runtime, activations, gradients);
        return this.math.scope(function () {
            var cost = ndarray_1.Scalar.new(0);
            for (var i = 0; i < batchSize; ++i) {
                session_util.disposeAndInitializeOperationOutputs(runtime.nodes, activations);
                session_util.disposeAndInitializeOperationInputGradients(runtime.nodes, gradients);
                session_util.disposeTransientOperationArrays(runtime.operations, activations, gradients);
                session_util.loadInputsFromFeedDictionaryToTensorArrayMap(feed, activations, _this.math);
                inferenceOperations.forEach(function (op) { return op.feedForward(_this.math, activations); });
                backPropOperations.forEach(function (op) { return op.backProp(_this.math, activations, gradients); });
                optimizer.afterExample(_this.math, runtime, activations, gradients);
                session_util.releaseFeedDictionaryInputsFromTensorArrayMap(feed, activations, _this.math);
                cost = _this.updateCostForExample(cost, activations.get(costTensor), costReduction);
            }
            optimizer.afterBatch(_this.math, batchSize, runtime, activations, gradients);
            return _this.updateCostForBatch(cost, costReduction);
        });
    };
    Session.prototype.updateCostForExample = function (totalCost, currCost, costReduction) {
        if (costReduction === CostReduction.MEAN ||
            costReduction === CostReduction.SUM) {
            return this.math.add(totalCost, currCost);
        }
        return totalCost;
    };
    Session.prototype.updateCostForBatch = function (totalCost, costReduction) {
        if (costReduction === CostReduction.MEAN) {
            return this.math.divide(totalCost, this.batchSizeScalar);
        }
        return totalCost;
    };
    Session.prototype.getOrCreateRuntime = function (tensors, feed) {
        var key = this.makeRuntimeCacheKey(tensors, feed);
        var runtime = this.runtimeCache[key];
        if (runtime === undefined) {
            var nodes = session_util.getOrderedEvaluationSetFromEvalTensor(tensors, feed);
            session_util.removeFeedDictionaryNodesFromEvaluationSet(feed, nodes);
            session_util.throwErrorIfEvaluationSetContainsPlaceholderNodes(nodes);
            var operations = operation_emitter.emitFromGraphNodes(nodes);
            runtime = { nodes: nodes, operations: operations };
            this.runtimeCache[key] = runtime;
        }
        return runtime;
    };
    Session.prototype.makeRuntimeCacheKey = function (tensors, feed) {
        return tensors.map(function (x) { return x.id; }).sort().join('_') + '__' +
            Object.keys(feed.dict).sort().join('_');
    };
    return Session;
}());
exports.Session = Session;

},{"../util":18,"../math/ndarray":30,"./operation_emitter":48,"./session_util":49,"./tensor_array_map":50}],20:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session_1 = require("./graph/session");
var ndarray_1 = require("./math/ndarray");
var DEFAULT_EVAL_INTERVAL_MS = 1500;
var DEFAULT_COST_INTERVAL_MS = 500;
var DEFAULT_INFERENCE_EXAMPLE_INTERVAL_MS = 3000;
var MetricReduction;
(function (MetricReduction) {
    MetricReduction[MetricReduction["SUM"] = 0] = "SUM";
    MetricReduction[MetricReduction["MEAN"] = 1] = "MEAN";
})(MetricReduction = exports.MetricReduction || (exports.MetricReduction = {}));
var GraphRunner = (function () {
    function GraphRunner(math, session, eventObserver) {
        this.math = math;
        this.session = session;
        this.eventObserver = eventObserver;
        this.lastCostTimestamp = 0;
        this.lastEvalTimestamp = 0;
        this.resetStatistics();
        this.zeroScalar = ndarray_1.Scalar.new(0);
    }
    GraphRunner.prototype.resetStatistics = function () {
        this.totalBatchesTrained = 0;
    };
    GraphRunner.prototype.train = function (costTensor, trainFeedEntries, batchSize, optimizer, numBatches, metricTensor, metricFeedEntries, metricBatchSize, metricReduction, evalIntervalMs, costIntervalMs) {
        if (metricReduction === void 0) { metricReduction = MetricReduction.MEAN; }
        if (evalIntervalMs === void 0) { evalIntervalMs = DEFAULT_EVAL_INTERVAL_MS; }
        if (costIntervalMs === void 0) { costIntervalMs = DEFAULT_COST_INTERVAL_MS; }
        this.costTensor = costTensor;
        this.trainFeedEntries = trainFeedEntries;
        this.metricTensor = metricTensor;
        this.metricFeedEntries = metricFeedEntries;
        if (metricBatchSize != null && this.metricBatchSize !== metricBatchSize) {
            if (this.metricBatchSizeScalar != null) {
                this.metricBatchSizeScalar.dispose();
            }
            this.metricBatchSizeScalar = ndarray_1.Scalar.new(metricBatchSize);
        }
        this.metricBatchSize = metricBatchSize;
        this.metricReduction = metricReduction;
        this.batchSize = batchSize;
        this.optimizer = optimizer;
        this.metricIntervalMs = evalIntervalMs;
        this.costIntervalMs = costIntervalMs;
        this.currentTrainLoopNumBatches = numBatches;
        this.batchesTrainedThisRun = 0;
        this.isTraining = true;
        this.trainStartTimestamp = performance.now();
        this.trainNetwork();
    };
    GraphRunner.prototype.stopTraining = function () {
        this.isTraining = false;
    };
    GraphRunner.prototype.resumeTraining = function () {
        this.isTraining = true;
        this.trainNetwork();
    };
    GraphRunner.prototype.trainNetwork = function () {
        var _this = this;
        if (this.batchesTrainedThisRun === this.currentTrainLoopNumBatches) {
            this.stopTraining();
        }
        if (!this.isTraining) {
            if (this.eventObserver.doneTrainingCallback != null) {
                this.eventObserver.doneTrainingCallback();
            }
            return;
        }
        var start = performance.now();
        var shouldComputeCost = this.eventObserver.avgCostCallback != null &&
            (start - this.lastCostTimestamp > this.costIntervalMs);
        if (shouldComputeCost) {
            this.lastCostTimestamp = start;
        }
        var costReduction = shouldComputeCost ? session_1.CostReduction.MEAN : session_1.CostReduction.NONE;
        this.math.scope(function (keep) {
            var avgCost = _this.session.train(_this.costTensor, _this.trainFeedEntries, _this.batchSize, _this.optimizer, costReduction);
            if (shouldComputeCost) {
                var trainTime = performance.now() - start;
                _this.eventObserver.avgCostCallback(avgCost);
                if (_this.eventObserver.trainExamplesPerSecCallback != null) {
                    var examplesPerSec = (_this.batchSize * 1000 / trainTime);
                    _this.eventObserver.trainExamplesPerSecCallback(examplesPerSec);
                }
            }
            if (_this.eventObserver.metricCallback != null &&
                _this.metricFeedEntries != null &&
                start - _this.lastEvalTimestamp > _this.metricIntervalMs) {
                _this.lastEvalTimestamp = start;
                if (_this.lastComputedMetric != null) {
                    _this.lastComputedMetric.dispose();
                }
                _this.lastComputedMetric = _this.computeMetric();
                _this.eventObserver.metricCallback(_this.lastComputedMetric);
            }
            if (_this.eventObserver.totalTimeCallback != null) {
                _this.eventObserver.totalTimeCallback((start - _this.trainStartTimestamp) / 1000);
            }
            _this.batchesTrainedThisRun++;
            _this.totalBatchesTrained++;
            if (_this.eventObserver.batchesTrainedCallback != null) {
                _this.eventObserver.batchesTrainedCallback(_this.totalBatchesTrained);
            }
        });
        requestAnimationFrame(function () { return _this.trainNetwork(); });
    };
    GraphRunner.prototype.infer = function (inferenceTensor, inferenceFeedEntries, inferenceExampleIntervalMs, inferenceExampleCount, numPasses) {
        var _this = this;
        if (inferenceExampleIntervalMs === void 0) { inferenceExampleIntervalMs = DEFAULT_INFERENCE_EXAMPLE_INTERVAL_MS; }
        if (inferenceExampleCount === void 0) { inferenceExampleCount = 5; }
        if (this.eventObserver.inferenceExamplesCallback == null &&
            this.eventObserver.inferenceExamplesPerSecCallback == null) {
            throw new Error('Cannot start inference loop, no inference example or ' +
                'examples/sec observer provided.');
        }
        for (var i = 0; i < inferenceFeedEntries.length; i++) {
            var feedEntry = inferenceFeedEntries[i];
            if (feedEntry.data instanceof ndarray_1.NDArray) {
                throw new Error('Cannot start inference on the model runner with feed entries of ' +
                    'type NDArray. Please use InputProviders.');
            }
        }
        this.inferenceExampleIntervalMs = inferenceExampleIntervalMs;
        this.inferenceTensor = inferenceTensor;
        this.inferenceFeedEntries = inferenceFeedEntries;
        this.inferenceExampleCount = inferenceExampleCount;
        this.currentInferenceLoopNumPasses = numPasses;
        if (!this.isInferring) {
            this.inferencePassesThisRun = 0;
            requestAnimationFrame(function () { return _this.inferNetwork(); });
        }
        this.isInferring = true;
    };
    GraphRunner.prototype.inferNetwork = function () {
        var _this = this;
        if (!this.isInferring ||
            this.inferencePassesThisRun === this.currentInferenceLoopNumPasses) {
            return;
        }
        this.math.scope(function (keep) {
            var feeds = [];
            var inferenceValues = [];
            var start = performance.now();
            for (var i = 0; i < _this.inferenceExampleCount; i++) {
                var ndarrayFeedEntries = [];
                for (var j = 0; j < _this.inferenceFeedEntries.length; j++) {
                    var feedEntry = _this.inferenceFeedEntries[j];
                    var nextCopy = feedEntry.data.getNextCopy(_this.math);
                    ndarrayFeedEntries.push({ tensor: feedEntry.tensor, data: nextCopy });
                }
                feeds.push(ndarrayFeedEntries);
                inferenceValues.push(_this.session.eval(_this.inferenceTensor, ndarrayFeedEntries));
            }
            if (_this.eventObserver.inferenceExamplesPerSecCallback != null) {
                inferenceValues[inferenceValues.length - 1].getValues();
                var inferenceExamplesPerSecTime = performance.now() - start;
                var examplesPerSec = (_this.inferenceExampleCount * 1000 / inferenceExamplesPerSecTime);
                _this.eventObserver.inferenceExamplesPerSecCallback(examplesPerSec);
            }
            if (_this.eventObserver.inferenceExamplesCallback != null) {
                _this.eventObserver.inferenceExamplesCallback(feeds, inferenceValues);
            }
            _this.inferencePassesThisRun++;
        });
        this.lastInferTimeoutID = window.setTimeout(function () { return _this.inferNetwork(); }, this.inferenceExampleIntervalMs);
    };
    GraphRunner.prototype.stopInferring = function () {
        this.isInferring = false;
        window.clearTimeout(this.lastInferTimeoutID);
    };
    GraphRunner.prototype.isInferenceRunning = function () {
        return this.isInferring;
    };
    GraphRunner.prototype.computeMetric = function () {
        var _this = this;
        if (this.metricFeedEntries == null) {
            throw new Error('Cannot compute metric, no metric FeedEntries provided.');
        }
        var metric = this.zeroScalar;
        return this.math.scope(function (keep) {
            for (var i = 0; i < _this.metricBatchSize; i++) {
                var metricValue = _this.session.eval(_this.metricTensor, _this.metricFeedEntries);
                metric = _this.math.add(metric, metricValue);
            }
            if (_this.metricReduction === MetricReduction.MEAN) {
                metric = _this.math.divide(metric, _this.metricBatchSizeScalar);
            }
            return metric;
        });
    };
    GraphRunner.prototype.getTotalBatchesTrained = function () {
        return this.totalBatchesTrained;
    };
    GraphRunner.prototype.getLastComputedMetric = function () {
        return this.lastComputedMetric;
    };
    GraphRunner.prototype.setMath = function (math) {
        this.math = math;
    };
    GraphRunner.prototype.setSession = function (session) {
        this.session = session;
    };
    GraphRunner.prototype.setInferenceTensor = function (inferenceTensor) {
        this.inferenceTensor = inferenceTensor;
    };
    GraphRunner.prototype.setInferenceExampleCount = function (inferenceExampleCount) {
        this.inferenceExampleCount = inferenceExampleCount;
    };
    return GraphRunner;
}());
exports.GraphRunner = GraphRunner;

},{"./graph/session":28,"./math/ndarray":30}],25:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("../math/ndarray");
var util = require("../util");
var STATS_SAMPLE_PERCENTAGE = 0.1;
var InMemoryDataset = (function () {
    function InMemoryDataset(dataShapes, math) {
        this.dataShapes = dataShapes;
        this.math = math;
        this.normalizationInfo = {};
    }
    InMemoryDataset.prototype.getDataShape = function (dataIndex) {
        return this.dataShapes[dataIndex];
    };
    InMemoryDataset.prototype.getData = function () {
        return this.dataset;
    };
    InMemoryDataset.prototype.getStats = function () {
        var _this = this;
        if (this.dataset == null) {
            throw new Error('Data is null.');
        }
        return this.dataset.map(function (d) { return _this.getStatsForData(d); });
    };
    InMemoryDataset.prototype.getStatsForData = function (data) {
        var inputMin = Number.POSITIVE_INFINITY;
        var inputMax = Number.NEGATIVE_INFINITY;
        var exampleIndices = data.map(function (example, i) { return i; });
        util.shuffle(exampleIndices);
        exampleIndices =
            exampleIndices.slice(exampleIndices.length * STATS_SAMPLE_PERCENTAGE);
        for (var i = 0; i < exampleIndices.length; i++) {
            var inputValues = data[exampleIndices[i]].getValues();
            for (var j = 0; j < inputValues.length; j++) {
                inputMin = Math.min(inputMin, inputValues[j]);
                inputMax = Math.max(inputMax, inputValues[j]);
            }
        }
        return {
            inputMin: inputMin,
            inputMax: inputMax,
            exampleCount: data.length,
            shape: data[0].shape,
        };
    };
    InMemoryDataset.prototype.normalizeExamplesToRange = function (examples, curLowerBounds, curUpperBounds, newLowerBounds, newUpperBounds) {
        var _this = this;
        var curBoundsIsPerDimension = (curUpperBounds instanceof Float32Array &&
            curLowerBounds instanceof Float32Array);
        var newBoundsIsPerDimension = (newLowerBounds instanceof Float32Array &&
            newUpperBounds instanceof Float32Array);
        var inputSize = util.sizeFromShape(examples[0].shape);
        var newExamples = [];
        examples.forEach(function (example) {
            var inputValues = example.getValues();
            var normalizedValues = new Float32Array(inputSize);
            for (var j = 0; j < inputSize; j++) {
                var curLowerBound = curBoundsIsPerDimension ?
                    curLowerBounds[j] :
                    curLowerBounds;
                var curUpperBound = curBoundsIsPerDimension ?
                    curUpperBounds[j] :
                    curUpperBounds;
                var curRange = curUpperBound - curLowerBound;
                var newLowerBound = newBoundsIsPerDimension ?
                    newLowerBounds[j] :
                    newLowerBounds;
                var newUpperBound = newBoundsIsPerDimension ?
                    newUpperBounds[j] :
                    newUpperBounds;
                var newRange = newUpperBound - newLowerBound;
                if (curRange === 0) {
                    normalizedValues[j] = newLowerBound;
                }
                else {
                    normalizedValues[j] = newLowerBound +
                        newRange * (inputValues[j] - curLowerBound) / curRange;
                }
            }
            newExamples.push(ndarray_1.NDArray.make(example.shape, { values: normalizedValues }, 'float32', _this.math));
        });
        return newExamples;
    };
    InMemoryDataset.prototype.computeBounds = function (dataIndex) {
        var _this = this;
        if (this.dataset == null) {
            throw new Error('Data is null.');
        }
        var size = util.sizeFromShape(this.dataset[dataIndex][0].shape);
        this.normalizationInfo[dataIndex] = {
            isNormalized: false,
            minValues: new Float32Array(size),
            maxValues: new Float32Array(size)
        };
        for (var i = 0; i < size; i++) {
            this.normalizationInfo[dataIndex].minValues[i] = Number.POSITIVE_INFINITY;
            this.normalizationInfo[dataIndex].maxValues[i] = Number.NEGATIVE_INFINITY;
        }
        this.dataset[dataIndex].forEach(function (example) {
            var inputValues = example.getValues();
            for (var k = 0; k < size; k++) {
                _this.normalizationInfo[dataIndex].minValues[k] = Math.min(_this.normalizationInfo[dataIndex].minValues[k], inputValues[k]);
                _this.normalizationInfo[dataIndex].maxValues[k] = Math.max(_this.normalizationInfo[dataIndex].maxValues[k], inputValues[k]);
            }
        });
    };
    InMemoryDataset.prototype.normalizeWithinBounds = function (dataIndex, lowerBound, upperBound) {
        if (this.dataset == null) {
            throw new Error('Data is null.');
        }
        if (dataIndex >= this.dataset.length) {
            throw new Error('dataIndex out of bounds.');
        }
        if (this.normalizationInfo[dataIndex] == null) {
            this.computeBounds(dataIndex);
        }
        var curLowerBounds;
        var curUpperBounds;
        if (this.normalizationInfo[dataIndex].isNormalized) {
            curLowerBounds = this.normalizationInfo[dataIndex].lowerBound;
            curUpperBounds = this.normalizationInfo[dataIndex].upperBound;
        }
        else {
            curLowerBounds = this.normalizationInfo[dataIndex].minValues;
            curUpperBounds = this.normalizationInfo[dataIndex].maxValues;
        }
        this.dataset[dataIndex] = this.normalizeExamplesToRange(this.dataset[dataIndex], curLowerBounds, curUpperBounds, lowerBound, upperBound);
        this.normalizationInfo[dataIndex].isNormalized = true;
        this.normalizationInfo[dataIndex].lowerBound = lowerBound;
        this.normalizationInfo[dataIndex].upperBound = upperBound;
    };
    InMemoryDataset.prototype.isNormalized = function (dataIndex) {
        return this.normalizationInfo != null &&
            this.normalizationInfo[dataIndex].isNormalized;
    };
    InMemoryDataset.prototype.removeNormalization = function (dataIndex) {
        if (this.dataset == null) {
            throw new Error('Training or test data is null.');
        }
        if (!this.isNormalized(dataIndex)) {
            return;
        }
        this.dataset[dataIndex] = this.normalizeExamplesToRange(this.dataset[dataIndex], this.normalizationInfo[dataIndex].lowerBound, this.normalizationInfo[dataIndex].upperBound, this.normalizationInfo[dataIndex].minValues, this.normalizationInfo[dataIndex].maxValues);
        this.normalizationInfo[dataIndex].isNormalized = false;
    };
    InMemoryDataset.prototype.unnormalizeExamples = function (examples, dataIndex) {
        if (!this.isNormalized(dataIndex)) {
            return examples;
        }
        return this.normalizeExamplesToRange(examples, this.normalizationInfo[dataIndex].lowerBound, this.normalizationInfo[dataIndex].upperBound, this.normalizationInfo[dataIndex].minValues, this.normalizationInfo[dataIndex].maxValues);
    };
    InMemoryDataset.prototype.dispose = function () {
        if (this.dataset == null) {
            return;
        }
        for (var i = 0; i < this.dataset.length; i++) {
            for (var j = 0; j < this.dataset[i].length; j++) {
                this.dataset[i][j].dispose();
            }
        }
        this.dataset = [];
    };
    return InMemoryDataset;
}());
exports.InMemoryDataset = InMemoryDataset;

},{"../util":18,"../math/ndarray":30}],22:[function(require,module,exports) {
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
var math_1 = require("../math/math");
var ndarray_1 = require("../math/ndarray");
var util = require("../util");
var dataset_1 = require("./dataset");
var PARSING_IMAGE_CANVAS_HEIGHT_PX = 1000;
function getXhrDatasetConfig(jsonConfigPath) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', jsonConfigPath);
        xhr.onload = function () {
            resolve(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function (error) {
            reject(error);
        };
        xhr.send();
    });
}
exports.getXhrDatasetConfig = getXhrDatasetConfig;
var XhrDataset = (function (_super) {
    __extends(XhrDataset, _super);
    function XhrDataset(xhrDatasetConfig) {
        var _this = this;
        var safeMode = false;
        _this = _super.call(this, xhrDatasetConfig.data.map(function (x) { return x.shape; }), new math_1.NDArrayMath('cpu', safeMode)) || this;
        _this.xhrDatasetConfig = xhrDatasetConfig;
        return _this;
    }
    XhrDataset.prototype.getNDArray = function (info) {
        var _this = this;
        var dataPromise = info.dataType === 'png' ?
            parseTypedArrayFromPng(info, info.shape) :
            parseTypedArrayFromBinary(info);
        var inputSize = util.sizeFromShape(info.shape);
        return dataPromise.then(function (data) {
            var ndarrays = [];
            for (var i = 0; i < data.length / inputSize; i++) {
                var values = data.subarray(i * inputSize, (i + 1) * inputSize);
                var ndarray = ndarray_1.NDArray.make(info.shape, { values: new Float32Array(values) }, 'float32', _this.math);
                ndarrays.push(ndarray);
            }
            return ndarrays;
        });
    };
    XhrDataset.prototype.fetchData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = _this.xhrDatasetConfig.data.map(function (x) { return _this.getNDArray(x); });
            Promise.all(promises).then(function (data) {
                _this.dataset = data;
                resolve();
            });
        });
    };
    return XhrDataset;
}(dataset_1.InMemoryDataset));
exports.XhrDataset = XhrDataset;
function parseTypedArrayFromBinary(info) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', info.path);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (event) {
            var data = (info.dataType === 'float32') ?
                new Float32Array(xhr.response) :
                new Uint8Array(xhr.response);
            resolve(data);
        };
        xhr.onerror = function (err) { return reject(err); };
        xhr.send();
    });
}
function parseGrayscaleImageData(data, result, resultOffset) {
    var idx = resultOffset;
    for (var i = 0; i < data.length; i += 4) {
        result[idx++] = data[i];
    }
}
function parseRGBImageData(data, result, resultOffset) {
    var idx = resultOffset;
    for (var i = 0; i < data.length; i += 4) {
        result[idx] = data[i];
        result[idx + 1] = data[i + 1];
        result[idx + 2] = data[i + 2];
        idx += 3;
    }
}
function parseImage(img, shape) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var N = img.height;
    var inputSize = util.sizeFromShape(shape);
    var result = new Uint8Array(N * inputSize);
    if (img.width !== shape[0] * shape[1]) {
        throw new Error("Image width (" + img.width + ") must be multiple of " +
            ("rows*columns (" + shape[0] + "*" + shape[1] + ") of the ndarray"));
    }
    canvas.width = img.width;
    canvas.height = PARSING_IMAGE_CANVAS_HEIGHT_PX;
    var sx = 0;
    var sWidth = canvas.width;
    var sHeight = canvas.height;
    var dx = 0;
    var dy = 0;
    var dWidth = sWidth;
    var dHeight = sHeight;
    var depth = shape[2];
    var offset = 0;
    var numPasses = Math.ceil(N / canvas.height);
    for (var pass = 0; pass < numPasses; ++pass) {
        var sy = pass * canvas.height;
        if ((pass === numPasses - 1) && (N % canvas.height > 0)) {
            canvas.height = N % canvas.height;
            sHeight = canvas.height;
            dHeight = sHeight;
        }
        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        (depth === 1) ? parseGrayscaleImageData(data, result, offset) :
            parseRGBImageData(data, result, offset);
        offset += canvas.height * inputSize;
    }
    return result;
}
function parseTypedArrayFromPng(info, shape) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.setAttribute('crossOrigin', '');
        img.onload = function () {
            var result = parseImage(img, shape);
            img.src = '';
            img = null;
            resolve(result);
        };
        img.src = info.path;
    });
}

},{"../util":18,"../math/math":29,"../math/ndarray":30,"./dataset":25}],24:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = require("../math/ndarray");
var MANIFEST_FILE = 'manifest.json';
var CheckpointLoader = (function () {
    function CheckpointLoader(urlPath) {
        this.urlPath = urlPath;
        if (this.urlPath.charAt(this.urlPath.length - 1) !== '/') {
            this.urlPath += '/';
        }
    }
    CheckpointLoader.prototype.loadManifest = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', _this.urlPath + MANIFEST_FILE);
            xhr.onload = function () {
                _this.checkpointManifest = JSON.parse(xhr.responseText);
                resolve();
            };
            xhr.onerror = function (error) {
                throw new Error(MANIFEST_FILE + " not found at " + _this.urlPath + ". " + error);
            };
            xhr.send();
        });
    };
    CheckpointLoader.prototype.getCheckpointManifest = function () {
        var _this = this;
        if (this.checkpointManifest == null) {
            return new Promise(function (resolve, reject) {
                _this.loadManifest().then(function () {
                    resolve(_this.checkpointManifest);
                });
            });
        }
        return new Promise(function (resolve, reject) {
            resolve(_this.checkpointManifest);
        });
    };
    CheckpointLoader.prototype.getAllVariables = function () {
        var _this = this;
        if (this.variables != null) {
            return new Promise(function (resolve, reject) {
                resolve(_this.variables);
            });
        }
        return new Promise(function (resolve, reject) {
            _this.getCheckpointManifest().then(function (checkpointDefinition) {
                var variableNames = Object.keys(_this.checkpointManifest);
                var variablePromises = [];
                for (var i = 0; i < variableNames.length; i++) {
                    variablePromises.push(_this.getVariable(variableNames[i]));
                }
                Promise.all(variablePromises).then(function (variables) {
                    _this.variables = {};
                    for (var i = 0; i < variables.length; i++) {
                        _this.variables[variableNames[i]] = variables[i];
                    }
                    resolve(_this.variables);
                });
            });
        });
    };
    CheckpointLoader.prototype.getVariable = function (varName) {
        var _this = this;
        if (!(varName in this.checkpointManifest)) {
            throw new Error('Cannot load non-existant variable ' + varName);
        }
        var variableRequestPromiseMethod = function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            var fname = _this.checkpointManifest[varName].filename;
            xhr.open('GET', _this.urlPath + fname);
            xhr.onload = function () {
                if (xhr.status === 404) {
                    throw new Error("Not found variable " + varName);
                }
                var values = new Float32Array(xhr.response);
                var ndarray = ndarray_1.NDArray.make(_this.checkpointManifest[varName].shape, { values: values });
                resolve(ndarray);
            };
            xhr.onerror = function (error) {
                throw new Error("Could not fetch variable " + varName + ": " + error);
            };
            xhr.send();
        };
        if (this.checkpointManifest == null) {
            return new Promise(function (resolve, reject) {
                _this.loadManifest().then(function () {
                    new Promise(variableRequestPromiseMethod).then(resolve);
                });
            });
        }
        return new Promise(variableRequestPromiseMethod);
    };
    return CheckpointLoader;
}());
exports.CheckpointLoader = CheckpointLoader;

},{"../math/ndarray":30}],26:[function(require,module,exports) {
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
var ndarray_1 = require("../math/ndarray");
var util = require("../util");
var InMemoryShuffledInputProviderBuilder = (function () {
    function InMemoryShuffledInputProviderBuilder(inputs) {
        this.inputs = inputs;
        this.idx = 0;
        this.inputCounter = 0;
        this.epoch = 0;
        this.shuffledIndices = util.createShuffledIndices(inputs[0].length);
        this.numInputs = inputs.length;
        var numExamples = this.inputs[0].length;
        for (var i = 0; i < this.numInputs; i++) {
            util.assert(this.inputs[i].length === numExamples, 'Number of examples must match across different inputs.');
        }
        for (var i = 0; i < this.numInputs; i++) {
            var inputShape = this.inputs[i][0].shape;
            for (var j = 0; j < this.inputs[i].length; j++) {
                util.assertShapesMatch(inputShape, this.inputs[i][j].shape);
            }
        }
    }
    InMemoryShuffledInputProviderBuilder.prototype.getCurrentExampleIndex = function () {
        var returnIdx = this.idx;
        this.inputCounter++;
        if (this.inputCounter >= this.numInputs) {
            this.idx++;
            this.inputCounter = 0;
            if (this.idx >= this.inputs[0].length) {
                this.idx = 0;
                this.epoch++;
            }
        }
        return returnIdx;
    };
    InMemoryShuffledInputProviderBuilder.prototype.getNextInput = function (inputId) {
        var currentExampleIndex = this.getCurrentExampleIndex();
        return this.inputs[inputId][this.shuffledIndices[currentExampleIndex]];
    };
    InMemoryShuffledInputProviderBuilder.prototype.getEpoch = function () {
        return this.epoch;
    };
    InMemoryShuffledInputProviderBuilder.prototype.getInputProviders = function () {
        var inputProviders = [];
        for (var i = 0; i < this.numInputs; i++) {
            inputProviders.push(this.getInputProvider(i));
        }
        return inputProviders;
    };
    return InMemoryShuffledInputProviderBuilder;
}());
exports.InMemoryShuffledInputProviderBuilder = InMemoryShuffledInputProviderBuilder;
var InCPUMemoryShuffledInputProviderBuilder = (function (_super) {
    __extends(InCPUMemoryShuffledInputProviderBuilder, _super);
    function InCPUMemoryShuffledInputProviderBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InCPUMemoryShuffledInputProviderBuilder.prototype.getInputProvider = function (inputId) {
        var shuffledInputProvider = this;
        return {
            getNextCopy: function (math) {
                return ndarray_1.NDArray.like(shuffledInputProvider.getNextInput(inputId));
            },
            disposeCopy: function (math, copy) {
                copy.dispose();
            }
        };
    };
    return InCPUMemoryShuffledInputProviderBuilder;
}(InMemoryShuffledInputProviderBuilder));
exports.InCPUMemoryShuffledInputProviderBuilder = InCPUMemoryShuffledInputProviderBuilder;
var InGPUMemoryShuffledInputProviderBuilder = (function (_super) {
    __extends(InGPUMemoryShuffledInputProviderBuilder, _super);
    function InGPUMemoryShuffledInputProviderBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InGPUMemoryShuffledInputProviderBuilder.prototype.getInputProvider = function (inputId) {
        var shuffledInputProvider = this;
        return {
            getNextCopy: function (math) {
                return math.clone(shuffledInputProvider.getNextInput(inputId));
            },
            disposeCopy: function (math, copy) {
                copy.dispose();
            }
        };
    };
    return InGPUMemoryShuffledInputProviderBuilder;
}(InMemoryShuffledInputProviderBuilder));
exports.InGPUMemoryShuffledInputProviderBuilder = InGPUMemoryShuffledInputProviderBuilder;

},{"../util":18,"../math/ndarray":30}],37:[function(require,module,exports) {
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
var ndarray_1 = require("../../math/ndarray");
var tensor_array_map_1 = require("../tensor_array_map");
var optimizer_1 = require("./optimizer");
var RMSPropOptimizer = (function (_super) {
    __extends(RMSPropOptimizer, _super);
    function RMSPropOptimizer(learningRate, gamma, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.gamma = gamma;
        _this.accumulatedSquaredGradients = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-6);
        _this.g = ndarray_1.Scalar.new(_this.gamma);
        return _this;
    }
    RMSPropOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.accumulatedSquaredGradients.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.accumulatedSquaredGradients.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    RMSPropOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldCache = _this.accumulatedSquaredGradients.get(node.output);
                var gradientSquare = math.multiply(gradient, gradient);
                var cache = math.scaledArrayAdd(_this.g, oldCache, math.subtract(_this.one, _this.g), gradientSquare);
                var variable = math.scaledArrayAdd(_this.c, math.divide(gradient, math.add(math.sqrt(cache), _this.eps)), _this.one, oldVariable);
                _this.accumulatedSquaredGradients.set(node.output, keep(cache));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldCache.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    RMSPropOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.eps.dispose();
        this.g.dispose();
        this.accumulatedSquaredGradients.dispose();
    };
    return RMSPropOptimizer;
}(optimizer_1.Optimizer));
exports.RMSPropOptimizer = RMSPropOptimizer;

},{"../../math/ndarray":30,"../tensor_array_map":50,"./optimizer":36}],42:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webgl_util = require("./webgl_util");
function getRenderRGBShader(gpgpu, destinationWidth) {
    var fragmentShaderSource = "\n    precision highp float;\n    uniform sampler2D source;\n    varying vec2 resultUV;\n\n    const float destinationWidth = " + destinationWidth + ".0;\n    const float a = 1.0;\n\n    void main() {\n      float xr = floor(resultUV.s * destinationWidth) * 3.0;\n      vec3 x = xr + vec3(0, 1, 2);\n\n      float sourceWidth = destinationWidth * 3.0;\n      vec3 u = (x + 0.5) / sourceWidth;\n      float v = 1.0 - resultUV.t;\n\n      float r = texture2D(source, vec2(u[0], v)).r;\n      float g = texture2D(source, vec2(u[1], v)).r;\n      float b = texture2D(source, vec2(u[2], v)).r;\n\n      gl_FragColor = vec4(r, g, b, a);\n    }";
    return gpgpu.createProgram(fragmentShaderSource);
}
exports.getRenderRGBShader = getRenderRGBShader;
function renderToCanvas(gpgpu, renderShader, sourceTex) {
    webgl_util.bindCanvasToFramebuffer(gpgpu.gl);
    renderToFramebuffer(gpgpu, renderShader, sourceTex);
}
exports.renderToCanvas = renderToCanvas;
function renderToFramebuffer(gpgpu, renderShader, sourceTex) {
    gpgpu.setProgram(renderShader);
    var sourceSamplerLocation = webgl_util.getProgramUniformLocationOrThrow(gpgpu.gl, renderShader, 'source');
    gpgpu.setInputMatrixTexture(sourceTex, sourceSamplerLocation, 0);
    gpgpu.executeProgram();
}
exports.renderToFramebuffer = renderToFramebuffer;

},{"./webgl_util":43}],15:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_dataset = require("./data/xhr-dataset");
exports.xhr_dataset = xhr_dataset;
var environment = require("./environment");
exports.environment = environment;
var gpgpu_util = require("./math/backends/webgl/gpgpu_util");
exports.gpgpu_util = gpgpu_util;
var render_ndarray_gpu_util = require("./math/backends/webgl/render_ndarray_gpu_util");
exports.render_ndarray_gpu_util = render_ndarray_gpu_util;
var webgl_util = require("./math/backends/webgl/webgl_util");
exports.webgl_util = webgl_util;
var conv_util = require("./math/conv_util");
exports.conv_util = conv_util;
var test_util = require("./test_util");
exports.test_util = test_util;
var util = require("./util");
exports.util = util;
var version_1 = require("./version");
exports.version = version_1.version;
var checkpoint_loader_1 = require("./data/checkpoint_loader");
exports.CheckpointLoader = checkpoint_loader_1.CheckpointLoader;
var dataset_1 = require("./data/dataset");
exports.InMemoryDataset = dataset_1.InMemoryDataset;
var input_provider_1 = require("./data/input_provider");
exports.InCPUMemoryShuffledInputProviderBuilder = input_provider_1.InCPUMemoryShuffledInputProviderBuilder;
exports.InGPUMemoryShuffledInputProviderBuilder = input_provider_1.InGPUMemoryShuffledInputProviderBuilder;
var xhr_dataset_1 = require("./data/xhr-dataset");
exports.XhrDataset = xhr_dataset_1.XhrDataset;
var environment_1 = require("./environment");
exports.ENV = environment_1.ENV;
exports.Environment = environment_1.Environment;
var graph_1 = require("./graph/graph");
exports.Graph = graph_1.Graph;
exports.Tensor = graph_1.Tensor;
var adadelta_optimizer_1 = require("./graph/optimizers/adadelta_optimizer");
exports.AdadeltaOptimizer = adadelta_optimizer_1.AdadeltaOptimizer;
var adagrad_optimizer_1 = require("./graph/optimizers/adagrad_optimizer");
exports.AdagradOptimizer = adagrad_optimizer_1.AdagradOptimizer;
var adam_optimizer_1 = require("./graph/optimizers/adam_optimizer");
exports.AdamOptimizer = adam_optimizer_1.AdamOptimizer;
var adamax_optimizer_1 = require("./graph/optimizers/adamax_optimizer");
exports.AdamaxOptimizer = adamax_optimizer_1.AdamaxOptimizer;
var momentum_optimizer_1 = require("./graph/optimizers/momentum_optimizer");
exports.MomentumOptimizer = momentum_optimizer_1.MomentumOptimizer;
var optimizer_1 = require("./graph/optimizers/optimizer");
exports.Optimizer = optimizer_1.Optimizer;
var rmsprop_optimizer_1 = require("./graph/optimizers/rmsprop_optimizer");
exports.RMSPropOptimizer = rmsprop_optimizer_1.RMSPropOptimizer;
var sgd_optimizer_1 = require("./graph/optimizers/sgd_optimizer");
exports.SGDOptimizer = sgd_optimizer_1.SGDOptimizer;
var session_1 = require("./graph/session");
exports.CostReduction = session_1.CostReduction;
exports.Session = session_1.Session;
var graph_runner_1 = require("./graph_runner");
exports.GraphRunner = graph_runner_1.GraphRunner;
exports.MetricReduction = graph_runner_1.MetricReduction;
var initializers_1 = require("./initializers");
exports.ConstantInitializer = initializers_1.ConstantInitializer;
exports.NDArrayInitializer = initializers_1.NDArrayInitializer;
exports.OnesInitializer = initializers_1.OnesInitializer;
exports.RandomNormalInitializer = initializers_1.RandomNormalInitializer;
exports.RandomTruncatedNormalInitializer = initializers_1.RandomTruncatedNormalInitializer;
exports.RandomUniformInitializer = initializers_1.RandomUniformInitializer;
exports.VarianceScalingInitializer = initializers_1.VarianceScalingInitializer;
exports.ZerosInitializer = initializers_1.ZerosInitializer;
var backend_cpu_1 = require("./math/backends/backend_cpu");
exports.MathBackendCPU = backend_cpu_1.MathBackendCPU;
exports.NDArrayMathCPU = backend_cpu_1.NDArrayMathCPU;
var backend_webgl_1 = require("./math/backends/backend_webgl");
exports.MathBackendWebGL = backend_webgl_1.MathBackendWebGL;
exports.NDArrayMathGPU = backend_webgl_1.NDArrayMathGPU;
var matmul_1 = require("./math/backends/types/matmul");
exports.MatrixOrientation = matmul_1.MatrixOrientation;
var gpgpu_context_1 = require("./math/backends/webgl/gpgpu_context");
exports.GPGPUContext = gpgpu_context_1.GPGPUContext;
var math_1 = require("./math/math");
exports.NDArrayMath = math_1.NDArrayMath;
var ndarray_1 = require("./math/ndarray");
exports.Array1D = ndarray_1.Array1D;
exports.Array2D = ndarray_1.Array2D;
exports.Array3D = ndarray_1.Array3D;
exports.Array4D = ndarray_1.Array4D;
exports.NDArray = ndarray_1.NDArray;
exports.Scalar = ndarray_1.Scalar;

},{"./environment":16,"./test_util":17,"./util":18,"./version":19,"./graph_runner":20,"./initializers":21,"./data/xhr-dataset":22,"./math/conv_util":23,"./data/checkpoint_loader":24,"./data/dataset":25,"./data/input_provider":26,"./graph/graph":27,"./graph/session":28,"./math/math":29,"./math/ndarray":30,"./graph/optimizers/adadelta_optimizer":31,"./graph/optimizers/adagrad_optimizer":32,"./graph/optimizers/adam_optimizer":33,"./graph/optimizers/adamax_optimizer":34,"./graph/optimizers/momentum_optimizer":35,"./graph/optimizers/optimizer":36,"./graph/optimizers/rmsprop_optimizer":37,"./graph/optimizers/sgd_optimizer":38,"./math/backends/backend_cpu":39,"./math/backends/backend_webgl":40,"./math/backends/webgl/gpgpu_util":41,"./math/backends/webgl/render_ndarray_gpu_util":42,"./math/backends/webgl/webgl_util":43,"./math/backends/types/matmul":44,"./math/backends/webgl/gpgpu_context":45}],9:[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var _2 = require("../");
var deeplearn_1 = require("deeplearn");
var deeplearn_converter_1 = require("./deeplearn-converter");
var Sequential = (function () {
    function Sequential(model) {
        var _this = this;
        this.stats = {
            compiled: false,
            cost: null,
            loss: 1,
            epochsRun: 0
        };
        this.model = [];
        this.deeplearn = {};
        this.stats.compiled = false;
        if (model)
            model.forEach(function (layer) { return _this.add(layer); });
    }
    Sequential.prototype.toJSON = function () {
        return JSON.stringify(this.model);
    };
    Sequential.fromJSON = function (model) {
        return new Sequential(JSON.parse(model));
    };
    Sequential.prototype.add = function (layer) {
        this.stats.compiled = false;
        this.model.push(layer);
    };
    Sequential.prototype.compile = function (options) {
        options = options || {};
        options.optimizer = options.optimizer || _1.Optimizers.sgd();
        options.loss = options.loss || _2.Losses.meanSquared();
        var dl = this.deeplearn;
        dl.math = deeplearn_1.ENV.math;
        dl.graph = new deeplearn_1.Graph();
        if (this.model[0].type !== 'input')
            throw ('First layer must be an Input layer.');
        var inputDims = this.model[0].units;
        dl.inputTensor = dl.graph.placeholder('input', inputDims);
        var output = this.model.filter(function (layer) { return layer.type == 'output'; });
        if (output.length !== 1)
            throw ('Exactly one layer must be an Output layer.');
        var outputDims = output[0].units;
        dl.targetTensor = dl.graph.placeholder('output', outputDims);
        var prevLayer = dl.inputTensor;
        for (var i = 1; i < (this.model.length); i++) {
            var layer = this.model[i];
            switch (layer.type) {
                case 'output':
                    prevLayer = dl.predictionTensor = dl.graph.layers.dense('prediction', prevLayer, outputDims[0]);
                    break;
                case 'dense':
                    prevLayer = dl.graph.layers.dense("layer-" + i, prevLayer, layer.units);
                    if (layer.options.activation) {
                        var activation_1 = deeplearn_converter_1.DeeplearnConverter.convertToDeeplearnActivation(this.deeplearn, prevLayer, layer.options.activation);
                        if (activation_1)
                            prevLayer = activation_1;
                    }
                    break;
                case 'activation':
                    var activation = deeplearn_converter_1.DeeplearnConverter.convertToDeeplearnActivation(this.deeplearn, prevLayer, layer);
                    if (activation)
                        prevLayer = activation;
                    break;
                case 'maxPooling2D':
                    prevLayer = dl.graph.maxPool(prevLayer, layer.units, layer.options.stride, layer.options.zeroPad);
                    break;
                case 'conv2D':
                    prevLayer = deeplearn_converter_1.DeeplearnConverter.convertToDeeplearnConv2D(this.deeplearn, prevLayer, layer.units, layer.options.stride, layer.options.zeroPad, layer.options.outputDepth, prevLayer.shape, i);
                    if (layer.options.activation) {
                        var activation_2 = deeplearn_converter_1.DeeplearnConverter.convertToDeeplearnActivation(this.deeplearn, prevLayer, layer.options.activation);
                        if (activation_2)
                            prevLayer = activation_2;
                    }
                    break;
                case 'flatten':
                    prevLayer = dl.graph.reshape(prevLayer, [deeplearn_1.util.sizeFromShape(prevLayer.shape)]);
                    break;
                case 'reshape':
                    prevLayer = dl.graph.reshape(prevLayer, layer.units);
                    break;
                default:
                    throw ('Unknown layer type: ' + layer.type);
            }
            dl.finalTensor = prevLayer;
        }
        dl.costTensor = deeplearn_converter_1.DeeplearnConverter.createCostFunction(dl, options.loss);
        dl.optimizer = deeplearn_converter_1.DeeplearnConverter.createOptimizer(options.optimizer);
        dl.session = new deeplearn_1.Session(dl.graph, dl.math);
        this.stats.compiled = true;
    };
    Sequential.prototype.fit = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var timeStart, inputArray, targetArray, shuffledInputProviderBuilder, _a, inputProvider, targetProvider, feedEntries, timeEnd, time;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.log('Start fit');
                        if (!options.input.length || !options.target.length)
                            throw ('Missing input/target Arrays.');
                        options.batchSize = options.batchSize || 32;
                        options.epochs = options.epochs || 1;
                        if (typeof (options.log) == 'undefined')
                            options.log = 10;
                        options.validationSplit = options.validationSplit || 0.0;
                        if (typeof (options.shuffle) == 'undefined')
                            options.shuffle = true;
                        timeStart = new Date().valueOf();
                        inputArray = options.input.map(function (el) { return deeplearn_converter_1.DeeplearnConverter.convertToDeeplearnArray(_this.deeplearn.inputTensor.shape, el); });
                        targetArray = options.target.map(function (el) { return deeplearn_1.Array1D.new(el); });
                        shuffledInputProviderBuilder = new deeplearn_1.InGPUMemoryShuffledInputProviderBuilder([inputArray, targetArray]);
                        _a = shuffledInputProviderBuilder.getInputProviders(), inputProvider = _a[0], targetProvider = _a[1];
                        feedEntries = [
                            { tensor: this.deeplearn.inputTensor, data: inputProvider },
                            { tensor: this.deeplearn.targetTensor, data: targetProvider }
                        ];
                        return [4, this.deeplearn.math.scope(function () { return __awaiter(_this, void 0, void 0, function () {
                                var i, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            i = 0;
                                            _c.label = 1;
                                        case 1:
                                            if (!(i < options.epochs)) return [3, 4];
                                            this.stats.epochsRun = i;
                                            this.stats.cost = this.deeplearn.session.train(this.deeplearn.costTensor, feedEntries, options.batchSize, this.deeplearn.optimizer, deeplearn_1.CostReduction.MEAN);
                                            if (!((options.log > 0 && i % options.log) === 0)) return [3, 3];
                                            _a = this.stats;
                                            return [4, this.stats.cost.val()];
                                        case 2:
                                            _a.loss = _c.sent();
                                            this.log("Epoch: " + i + "/" + options.epochs + ", Loss: " + this.stats.loss + ".");
                                            if (options.targetLoss && this.stats.loss < options.targetLoss)
                                                return [3, 4];
                                            _c.label = 3;
                                        case 3:
                                            i++;
                                            return [3, 1];
                                        case 4:
                                            _b = this.stats;
                                            return [4, this.stats.cost.val()];
                                        case 5:
                                            _b.loss = _c.sent();
                                            return [2];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        timeEnd = new Date().valueOf();
                        time = timeEnd - timeStart;
                        this.log("Epoch: " + this.stats.epochsRun + "/" + options.epochs + ", Loss: " + this.stats.loss + ".");
                        this.log("Took " + time + "ms.");
                        return [2, true];
                }
            });
        });
    };
    Sequential.prototype.predict = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var inputArray, val;
            return __generator(this, function (_a) {
                options.batchSize = options.batchSize || 32;
                options.verbose = options.verbose || 1;
                inputArray = deeplearn_converter_1.DeeplearnConverter.convertToDeeplearnArray(this.deeplearn.inputTensor.shape, options.input);
                val = this.deeplearn.session.eval(this.deeplearn.finalTensor, [{ tensor: this.deeplearn.inputTensor, data: inputArray }]);
                return [2, val.data()];
            });
        });
    };
    Sequential.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        console.log(msg);
    };
    return Sequential;
}());
exports.Sequential = Sequential;
//# sourceMappingURL=sequential.js.map
},{"./deeplearn-converter":14,"../":2,"deeplearn":15}],4:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequential_1 = require("./sequential");
exports.Sequential = sequential_1.Sequential;
//# sourceMappingURL=index.js.map
},{"./sequential":9}],10:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Losses = (function () {
    function Losses() {
    }
    Losses.meanSquared = function () {
        var loss = {
            type: 'meanSquared'
        };
        return loss;
    };
    Losses.softmaxCrossEntropy = function () {
        var loss = {
            type: 'softmaxCrossEntropy'
        };
        return loss;
    };
    Losses.types = ['meanSquared', 'softmaxCrossEntropy'];
    return Losses;
}());
exports.Losses = Losses;
//# sourceMappingURL=losses.js.map
},{}],5:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var losses_1 = require("./losses");
exports.Loss = losses_1.Loss;
exports.Losses = losses_1.Losses;
//# sourceMappingURL=index.js.map
},{"./losses":10}],13:[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Optimizers = (function () {
    function Optimizers() {
    }
    Optimizers.adadelta = function (options) {
        var optimizer = { type: 'adadelta', options: { learningRate: 0.1, gamma: 0.1 } };
        optimizer.options = __assign({}, optimizer.options, options);
        return optimizer;
    };
    Optimizers.adagrad = function (options) {
        var optimizer = { type: 'adagrad', options: { learningRate: 0.1 } };
        optimizer.options = __assign({}, optimizer.options, options);
        return optimizer;
    };
    Optimizers.adam = function (options) {
        var optimizer = { type: 'adam', options: { learningRate: 0.1, beta1: 0.9, beta2: 0.999 } };
        optimizer.options = __assign({}, optimizer.options, options);
        return optimizer;
    };
    Optimizers.adamax = function (options) {
        var optimizer = { type: 'adamax', options: { learningRate: 0.1, beta1: 0.9, beta2: 0.999 } };
        optimizer.options = __assign({}, optimizer.options, options);
        return optimizer;
    };
    Optimizers.momentum = function (options) {
        var optimizer = { type: 'momentum', options: { learningRate: 0.1, momentum: 0.1 } };
        optimizer.options = __assign({}, optimizer.options, options);
        return optimizer;
    };
    Optimizers.sgd = function (options) {
        var optimizer = { type: 'sgd', options: { learningRate: 0.1, momentum: 0.1 } };
        optimizer.options = __assign({}, optimizer.options, options);
        return optimizer;
    };
    Optimizers.types = ['sgd', 'adagrad', 'adadelta', 'adam', 'adamax', 'momentum'];
    return Optimizers;
}());
exports.Optimizers = Optimizers;
//# sourceMappingURL=optimizers.js.map
},{}],6:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var optimizers_1 = require("./optimizers");
exports.Optimizer = optimizers_1.Optimizer;
exports.Optimizers = optimizers_1.Optimizers;
//# sourceMappingURL=index.js.map
},{"./optimizers":13}],119:[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],120:[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],121:[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],109:[function(require,module,exports) {

var global = (1,eval)("this");
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"buffer":109,"isarray":119,"base64-js":120,"ieee754":121}],108:[function(require,module,exports) {
var global = (1,eval)("this");
var Buffer = require("buffer").Buffer;
/*
Jimp v 0.2.24
https://github.com/oliver-moran/jimp
Ported for the Web by Phil Seaton

The MIT License (MIT)

Copyright (c) 2014 Oliver Moran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var window = window || self;
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};if(function t(e,i,n){function r(o,s){if(!i[o]){if(!e[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(a)return a(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var f=i[o]={exports:{}};e[o][0].call(f.exports,function(t){var i=e[o][1][t];return r(i?i:t)},f,f.exports,t,e,i,n)}return i[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(t,e,i){(function(i,n,r,a,o,s,l,h){function f(t){u(),i.stdout.write(t),Z=t.length}function u(){for(;Z-- >0;)i.stdout.write("\b")}function p(){}function d(t){if("undefined"==typeof t)return!1;if("function"!=typeof t)throw new Error("Callback must be a function");return!0}function m(t,e){if("string"==typeof t&&(t=new Error(t)),"function"==typeof e)return e.call(this,t);throw t}function g(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1],i=arguments[2];if("number"==typeof arguments[2]){this._background=arguments[2];var i=arguments[3]}if("undefined"==typeof i&&(i=p),"function"!=typeof i)return m.call(this,"cb must be a function",i);this.bitmap={data:new r(t*e*4),width:t,height:e};for(var n=0;n<this.bitmap.data.length;n+=4)this.bitmap.data.writeUInt32BE(this._background,n);i.call(this,null,this)}else if("object"==_typeof(arguments[0])&&arguments[0].constructor==g){var a=arguments[0],i=arguments[1];if("undefined"==typeof i&&(i=p),"function"!=typeof i)return m.call(this,"cb must be a function",i);var o=new r(a.bitmap.data.length);a.scan(0,0,a.bitmap.width,a.bitmap.height,function(t,e,i){var n=a.bitmap.data.readUInt32BE(i,!0);o.writeUInt32BE(n,i,!0)}),this.bitmap={data:o,width:a.bitmap.width,height:a.bitmap.height},this._quality=a._quality,this._deflateLevel=a._deflateLevel,this._filterType=a._filterType,this._rgba=a._rgba,this._background=a._background,i.call(this,null,this)}else if(H({exact:!0}).test(arguments[0])){var s=arguments[0],i=arguments[1];if("undefined"==typeof i&&(i=p),"function"!=typeof i)return m.call(this,"cb must be a function",i);var l=this;A(s,function(t,e,n){if(t)return m.call(l,t,i);if("object"!=("undefined"==typeof n?"undefined":_typeof(n))||!r.isBuffer(n))return m.call(l,"Could not load Buffer from URL <"+s+"> (HTTP: "+e.statusCode+")",i);var a=b(n);return"string"!=typeof a?m.call(l,"Could not find MIME for Buffer <"+s+"> (HTTP: "+e.statusCode+")",i):void w.call(l,n,a,i)})}else if("string"==typeof arguments[0]){var h=arguments[0],i=arguments[1];if("undefined"==typeof i&&(i=p),"function"!=typeof i)return m.call(this,"cb must be a function",i);var l=this;v(h,function(t,e){M.readFile(h,function(t,n){return t?m.call(l,t,i):void w.call(l,n,e,i)})})}else{if("object"!=_typeof(arguments[0]))return m.call(this,"No matching constructor overloading was found. Please see the docs for how to call the Jimp constructor.",i);var f=arguments[0],c=b(f),i=arguments[1];if(!r.isBuffer(f))return m.call(this,"data must be a Buffer",i);if("string"!=typeof c)return m.call(this,"mime must be a string",i);if("function"!=typeof i)return m.call(this,"cb must be a function",i);w.call(this,f,c,i)}}function b(t){return D(t)?D(t).mime:""}function v(t,e){O(t,0,262,function(t,i){t&&e(null,"");var n=D(i);return e&&e(null,n&&n.mime||"")})}function w(t,e,i){var n=this;switch(this._originalMime=e,e.toLowerCase()){case g.MIME_PNG:var a=new R;a.parse(t,function(t,e){return t?m.call(n,t,i):(n.bitmap={data:new r(e.data),width:e.width,height:e.height},i.call(n,null,n))});break;case g.MIME_JPEG:try{return this.bitmap=T.decode(t),_(this,t),i.call(this,null,this)}catch(o){return i.call(this,o,this)}case g.MIME_BMP:return this.bitmap=P.decode(t),i.call(this,null,this);default:return m.call(this,"Unsupported MIME type: "+e,i)}}function _(t,e){var i=N.create(e).parse();if(i&&i.tags&&i.tags.Orientation)switch(i.tags.Orientation){case 1:break;case 2:t.mirror(!0,!1);break;case 3:t.rotate(180);break;case 4:t.mirror(!1,!0);break;case 5:t.mirror(!0,!1).rotate(270);break;case 6:t.rotate(90);break;case 7:t.mirror(!0,!1).rotate(90);break;case 8:t.rotate(270)}}function y(){var t={r:new Array(256).fill(0),g:new Array(256).fill(0),b:new Array(256).fill(0)};return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(e,i,n){t.r[this.bitmap.data[n+0]]++,t.g[this.bitmap.data[n+1]]++,t.b[this.bitmap.data[n+2]]++}),t}function x(t){for(var e=Math.round(t/90)%4;0>e;)e+=4;for(;e>0;){for(var i=new r(this.bitmap.data.length),n=0,a=0;a<this.bitmap.width;a++)for(var o=this.bitmap.height-1;o>=0;o--){var s=this.bitmap.width*o+a<<2,l=this.bitmap.data.readUInt32BE(s,!0);i.writeUInt32BE(l,n,!0),n+=4}this.bitmap.data=new r(i);var h=this.bitmap.width;this.bitmap.width=this.bitmap.height,this.bitmap.height=h,e--}}function k(t,e){function i(t,e){return function(i,n){return{x:i+t,y:n+e}}}var n,a,o=t%360*Math.PI/180,s=Math.cos(o),l=Math.sin(o);if(1==e||"string"==typeof e){n=Math.round(Math.abs(this.bitmap.width*s)+Math.abs(this.bitmap.height*l)),a=Math.round(Math.abs(this.bitmap.width*l)+Math.abs(this.bitmap.height*s));var h=this.clone();this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,i){this.bitmap.data.writeUInt32BE(this._background,i)});var f=Math.max(n,a,this.bitmap.width,this.bitmap.height);this.resize(f,f,e),this.blit(h,this.bitmap.width/2-h.bitmap.width/2,this.bitmap.height/2-h.bitmap.height/2)}for(var c=new r(this.bitmap.data.length),u=i(-(this.bitmap.width/2),-(this.bitmap.height/2)),p=i(this.bitmap.width/2,this.bitmap.height/2),d=0;d<this.bitmap.height;d++)for(var m=0;m<this.bitmap.width;m++){var g=u(m,this.bitmap.height-d),b=p(s*g.x-l*g.y,s*g.y+l*g.x);if(b.x>=0&&b.x<this.bitmap.width&&b.y>=0&&b.y<this.bitmap.height){var v=(this.bitmap.width*(this.bitmap.height-b.y|0)+b.x|0)<<2,w=this.bitmap.data.readUInt32BE(v,!0),_=this.bitmap.width*d+m<<2;c.writeUInt32BE(w,_)}else{var _=this.bitmap.width*d+m<<2;c.writeUInt32BE(this._background,_)}}if(this.bitmap.data=c,1==e||"string"==typeof e){var m=this.bitmap.width/2-n/2,d=this.bitmap.height/2-a/2;this.crop(m,d,n,a)}}function E(t){return new g(t.bitmap.width,t.bitmap.height,t._background).composite(t,0,0).bitmap}function S(t,e){var i=e.map(function(e){return g.read(t+"/"+e)});return q.all(i)}function I(t,e,i,n,r){if(r.width>0&&r.height>0){var a=e.pages[r.page].clone().crop(r.x,r.y,r.width,r.height);return t.composite(a,i+r.xoffset,n+r.yoffset)}return t}var M,A,R=t("pngjs").PNG,T=t("jpeg-js"),P=t("bmp-js"),L=(t("mime"),t("tinycolor2")),C=t("./resize.js"),B=t("./resize2.js"),z=t("stream-to-buffer"),O=t("read-chunk"),D=t("file-type"),U=t("pixelmatch"),N=t("exif-parser"),F=t("./phash.js"),j=t("bignumber.js"),H=t("url-regex"),W=t("load-bmfont"),G=t("path"),q=n.Promise||t("es6-promise").Promise,Z=0;i.on("exit",u),g.read=function(t,e){var i=new q(function(i,n){return e=e||function(t,e){t?n(t):i(e)},"string"==typeof t||"object"==("undefined"==typeof t?"undefined":_typeof(t))&&r.isBuffer(t)?void new g(t,e):m.call(this,"src must be a string or a Buffer",e)});return i},g.AUTO=-1,g.MIME_PNG="image/png",g.MIME_JPEG="image/jpeg",g.MIME_BMP="image/bmp",g.PNG_FILTER_AUTO=-1,g.PNG_FILTER_NONE=0,g.PNG_FILTER_SUB=1,g.PNG_FILTER_UP=2,g.PNG_FILTER_AVERAGE=3,g.PNG_FILTER_PAETH=4,g.RESIZE_NEAREST_NEIGHBOR="nearestNeighbor",g.RESIZE_BILINEAR="bilinearInterpolation",g.RESIZE_BICUBIC="bicubicInterpolation",g.RESIZE_HERMITE="hermiteInterpolation",g.RESIZE_BEZIER="bezierInterpolation",g.FONT_SANS_8_BLACK=G.join(h,"fonts/open-sans/open-sans-8-black/open-sans-8-black.fnt"),g.FONT_SANS_16_BLACK=G.join(h,"fonts/open-sans/open-sans-16-black/open-sans-16-black.fnt"),g.FONT_SANS_32_BLACK=G.join(h,"fonts/open-sans/open-sans-32-black/open-sans-32-black.fnt"),g.FONT_SANS_64_BLACK=G.join(h,"fonts/open-sans/open-sans-64-black/open-sans-64-black.fnt"),g.FONT_SANS_128_BLACK=G.join(h,"fonts/open-sans/open-sans-128-black/open-sans-128-black.fnt"),g.FONT_SANS_8_WHITE=G.join(h,"fonts/open-sans/open-sans-8-white/open-sans-8-white.fnt"),g.FONT_SANS_16_WHITE=G.join(h,"fonts/open-sans/open-sans-16-white/open-sans-16-white.fnt"),g.FONT_SANS_32_WHITE=G.join(h,"fonts/open-sans/open-sans-32-white/open-sans-32-white.fnt"),g.FONT_SANS_64_WHITE=G.join(h,"fonts/open-sans/open-sans-64-white/open-sans-64-white.fnt"),g.FONT_SANS_128_WHITE=G.join(h,"fonts/open-sans/open-sans-128-white/open-sans-128-white.fnt"),g.rgbaToInt=function(t,e,i,n,r){if("number"!=typeof t||"number"!=typeof e||"number"!=typeof i||"number"!=typeof n)return m.call(this,"r, g, b and a must be numbers",r);if(0>t||t>255)return m.call(this,"r must be between 0 and 255",r);if((0>e||e>255)&&m.call(this,"g must be between 0 and 255",r),0>i||i>255)return m.call(this,"b must be between 0 and 255",r);if(0>n||n>255)return m.call(this,"a must be between 0 and 255",r);var a=t*Math.pow(256,3)+e*Math.pow(256,2)+i*Math.pow(256,1)+n*Math.pow(256,0);return d(r)?r.call(this,null,a):a},g.intToRGBA=function(t,e){if("number"!=typeof t)return m.call(this,"i must be a number",e);var i={};return i.r=Math.floor(t/Math.pow(256,3)),i.g=Math.floor((t-i.r*Math.pow(256,3))/Math.pow(256,2)),i.b=Math.floor((t-i.r*Math.pow(256,3)-i.g*Math.pow(256,2))/Math.pow(256,1)),i.a=Math.floor((t-i.r*Math.pow(256,3)-i.g*Math.pow(256,2)-i.b*Math.pow(256,1))/Math.pow(256,0)),d(e)?e.call(this,null,i):i},g.limit255=function(t){return t=Math.max(t,0),t=Math.min(t,255)},g.diff=function(t,e,i){if("object"!=("undefined"==typeof t?"undefined":_typeof(t))||t.constructor!=g||"object"!=("undefined"==typeof e?"undefined":_typeof(e))||e.constructor!=g)return m.call(this,"img1 and img2 must be an Jimp images");if(t.bitmap.width!=e.bitmap.width||t.bitmap.height!=e.bitmap.height)switch(t.bitmap.width*t.bitmap.height>e.bitmap.width*e.bitmap.height){case!0:t=t.clone().resize(e.bitmap.width,e.bitmap.height);break;default:e=e.clone().resize(t.bitmap.width,t.bitmap.height)}if(i=i||.1,"number"!=typeof i||0>i||i>1)return m.call(this,"threshold must be a number between 0 and 1");var n=new g(t.bitmap.width,t.bitmap.height,4294967295),r=U(t.bitmap.data,e.bitmap.data,n.bitmap.data,n.bitmap.width,n.bitmap.height,{threshold:i});return{percent:r/(n.bitmap.width*n.bitmap.height),image:n}},g.distance=function(t,e){var i=new F,n=i.getHash(t),r=i.getHash(e);return i.distance(n,r)},g.prototype.bitmap={data:null,width:null,height:null},g.prototype._quality=100,g.prototype._deflateLevel=9,g.prototype._filterType=g.PNG_FILTER_AUTO,g.prototype._rgba=!0,g.prototype._background=0,g.prototype.clone=function(t){var e=new g(this);return d(t)?t.call(e,null,e):e},g.prototype.quality=function(t,e){return"number"!=typeof t?m.call(this,"n must be a number",e):0>t||t>100?m.call(this,"n must be a number 0 - 100",e):(this._quality=Math.round(t),d(e)?e.call(this,null,this):this)},g.prototype.deflateLevel=function(t,e){return"number"!=typeof t?m.call(this,"l must be a number",e):0>t||t>9?m.call(this,"l must be a number 0 - 9",e):(this._deflateLevel=Math.round(t),d(e)?e.call(this,null,this):this)},g.prototype.filterType=function(t,e){return"number"!=typeof t?m.call(this,"n must be a number",e):-1>t||t>4?m.call(this,"n must be -1 (auto) or a number 0 - 4",e):(this._filterType=Math.round(t),d(e)?e.call(this,null,this):this)},g.prototype.rgba=function(t,e){return"boolean"!=typeof t?m.call(this,"bool must be a boolean, true for RGBA or false for RGB",e):(this._rgba=t,d(e)?e.call(this,null,this):this)},g.prototype.background=function(t,e){return"number"!=typeof t?m.call(this,"hex must be a hexadecimal rgba value",e):(this._background=t,d(e)?e.call(this,null,this):this)},g.prototype.scan=function(t,e,i,n,r,a){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"x and y must be numbers",a);if("number"!=typeof i||"number"!=typeof n)return m.call(this,"w and h must be numbers",a);if("function"!=typeof r)return m.call(this,"f must be a function",a);t=Math.round(t),e=Math.round(e),i=Math.round(i),n=Math.round(n);for(var o=e;e+n>o;o++)for(var s=t;t+i>s;s++){var l=this.bitmap.width*o+s<<2;r.call(this,s,o,l)}return d(a)?a.call(this,null,this):this},g.prototype.getPixelIndex=function(t,e,i){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"x and y must be numbers",i);t=Math.round(t),e=Math.round(e);var n=this.bitmap.width*e+t<<2;return(0>t||t>this.bitmap.width)&&(n=-1),(0>e||e>this.bitmap.height)&&(n=-1),d(i)?i.call(this,null,n):n},g.prototype.getPixelColor=g.prototype.getPixelColour=function(t,e,i){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"x and y must be numbers",i);t=Math.round(t),e=Math.round(e);var n=this.getPixelIndex(t,e),r=this.bitmap.data.readUInt32BE(n);return d(i)?i.call(this,null,r):r},g.prototype.setPixelColor=g.prototype.setPixelColour=function(t,e,i,n){if("number"!=typeof t||"number"!=typeof e||"number"!=typeof i)return m.call(this,"hex, x and y must be numbers",n);e=Math.round(e),i=Math.round(i);var r=this.getPixelIndex(e,i);return this.bitmap.data.writeUInt32BE(t,r,!0),d(n)?n.call(this,null,this):this};for(var Y=[],X=0;65>X;X++){var V=X>1?new j(Array(65).join("1"),2).toString(X):NaN;Y.push(V.length)}g.prototype.hash=function(t,e){if(t=t||64,"function"==typeof t&&(e=t,t=64),"number"!=typeof t)return m.call(this,"base must be a number",e);if(2>t||t>64)return m.call(this,"base must be a number between 2 and 64",e);var i=(new F).getHash(this);for(i=new j(i,2).toString(t);i.length<Y[t];)i="0"+i;return d(e)?e.call(this,null,i):i},g.prototype.crop=function(t,e,i,n,a){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"x and y must be numbers",a);if("number"!=typeof i||"number"!=typeof n)return m.call(this,"w and h must be numbers",a);t=Math.round(t),e=Math.round(e),i=Math.round(i),n=Math.round(n);var o=new r(this.bitmap.data.length),s=0;return this.scan(t,e,i,n,function(t,e,i){var n=this.bitmap.data.readUInt32BE(i,!0);o.writeUInt32BE(n,s,!0),s+=4}),this.bitmap.data=new r(o),this.bitmap.width=i,this.bitmap.height=n,d(a)?a.call(this,null,this):this},g.prototype.autocrop=function(){for(var t,e=this.bitmap.width,i=this.bitmap.height,n=1,r=2e-4,a=!0,o=0,s=arguments.length;s>o;o++)"number"==typeof arguments[o]&&(r=arguments[o]),"boolean"==typeof arguments[o]&&(a=arguments[o]),"function"==typeof arguments[o]&&(t=arguments[o]);var l=this.getPixelColor(0,0),h=0,f=0,c=0,u=0,p=g.intToRGBA(l);t:for(var m=0;i-n>m;m++){for(var b=0;e>b;b++){var v=this.getPixelColor(b,m),w=g.intToRGBA(v),_=Math.abs(Math.max(p.r-w.r^2,p.r-w.r-p.a+w.a^2)+Math.max(p.g-w.g^2,p.g-w.g-p.a+w.a^2)+Math.max(p.b-w.b^2,p.b-w.b-p.a+w.a^2))/196608;if(_>r)break t}h++}t:for(var b=0;e-n>b;b++){for(var m=0+h;i>m;m++){var v=this.getPixelColor(b,m),w=g.intToRGBA(v),_=Math.abs(Math.max(p.r-w.r^2,p.r-w.r-p.a+w.a^2)+Math.max(p.g-w.g^2,p.g-w.g-p.a+w.a^2)+Math.max(p.b-w.b^2,p.b-w.b-p.a+w.a^2))/196608;if(_>r)break t}f++}l=this.getPixelColor(e-1,i-1);t:for(var m=i-1;m>=0+h+n;m--){for(var b=e-f-1;b>=0;b--){var v=this.getPixelColor(b,m),w=g.intToRGBA(v),_=Math.abs(Math.max(p.r-w.r^2,p.r-w.r-p.a+w.a^2)+Math.max(p.g-w.g^2,p.g-w.g-p.a+w.a^2)+Math.max(p.b-w.b^2,p.b-w.b-p.a+w.a^2))/196608;if(_>r)break t}c++}t:for(var b=e-1;b>=0+f+n;b--){for(var m=i-1;m>=0+h;m--){var v=this.getPixelColor(b,m),w=g.intToRGBA(v),_=Math.abs(Math.max(p.r-w.r^2,p.r-w.r-p.a+w.a^2)+Math.max(p.g-w.g^2,p.g-w.g-p.a+w.a^2)+Math.max(p.b-w.b^2,p.b-w.b-p.a+w.a^2))/196608;if(_>r)break t}u++}var y=e-(u+f),x=i-(c+h),k=!1;return k=a?0!==f&&0!==h&&0!==u&&0!==c:0!==f||0!==h||0!==u||0!==c,k&&this.crop(f,h,y,x),d(t)?t.call(this,null,this):this},g.prototype.blit=function(t,e,i,n,r,a,o,s){if("object"!=("undefined"==typeof t?"undefined":_typeof(t))||t.constructor!=g)return m.call(this,"The source must be a Jimp image",s);if("number"!=typeof e||"number"!=typeof i)return m.call(this,"x and y must be numbers",s);if("function"==typeof n)s=n,n=0,r=0,a=t.bitmap.width,o=t.bitmap.height;else{if(("undefined"==typeof n?"undefined":_typeof(n))!=("undefined"==typeof r?"undefined":_typeof(r))||("undefined"==typeof r?"undefined":_typeof(r))!=("undefined"==typeof a?"undefined":_typeof(a))||("undefined"==typeof a?"undefined":_typeof(a))!=("undefined"==typeof o?"undefined":_typeof(o)))return m.call(this,"srcx, srcy, srcw, srch must be numbers",s);n=n||0,r=r||0,a=a||t.bitmap.width,o=o||t.bitmap.height}e=Math.round(e),i=Math.round(i),n=Math.round(n),r=Math.round(r),a=Math.round(a),o=Math.round(o);var l=this;return t.scan(n,r,a,o,function(t,a,o){var s=l.getPixelIndex(e+t-n,i+a-r);l.bitmap.data[s]=this.bitmap.data[o],l.bitmap.data[s+1]=this.bitmap.data[o+1],l.bitmap.data[s+2]=this.bitmap.data[o+2],l.bitmap.data[s+3]=this.bitmap.data[o+3]}),d(s)?s.call(this,null,this):this},g.prototype.mask=function(t,e,i,n){if("object"!=("undefined"==typeof t?"undefined":_typeof(t))||t.constructor!=g)return m.call(this,"The source must be a Jimp image",n);if("number"!=typeof e||"number"!=typeof i)return m.call(this,"x and y must be numbers",n);e=Math.round(e),i=Math.round(i);var r=this;return t.scan(0,0,t.bitmap.width,t.bitmap.height,function(t,n,a){var o=r.getPixelIndex(e+t,i+n),s=(this.bitmap.data[a+0]+this.bitmap.data[a+1]+this.bitmap.data[a+2])/3;r.bitmap.data[o+3]*=s/255}),d(n)?n.call(this,null,this):this},g.prototype.composite=function(t,e,i,n){if("object"!=("undefined"==typeof t?"undefined":_typeof(t))||t.constructor!=g)return m.call(this,"The source must be a Jimp image",n);if("number"!=typeof e||"number"!=typeof i)return m.call(this,"x and y must be numbers",n);e=Math.round(e),i=Math.round(i);var r=this;return t.scan(0,0,t.bitmap.width,t.bitmap.height,function(t,n,a){var o=r.getPixelIndex(e+t,i+n),s={r:this.bitmap.data[a+0]/255,g:this.bitmap.data[a+1]/255,b:this.bitmap.data[a+2]/255,a:this.bitmap.data[a+3]/255},l={r:r.bitmap.data[o+0]/255,g:r.bitmap.data[o+1]/255,b:r.bitmap.data[o+2]/255,a:r.bitmap.data[o+3]/255},h=l.a+s.a-l.a*s.a,f=(s.r*s.a+l.r*l.a*(1-s.a))/h,c=(s.g*s.a+l.g*l.a*(1-s.a))/h,u=(s.b*s.a+l.b*l.a*(1-s.a))/h;r.bitmap.data[o+0]=g.limit255(255*f),r.bitmap.data[o+1]=g.limit255(255*c),r.bitmap.data[o+2]=g.limit255(255*u),r.bitmap.data[o+3]=g.limit255(255*h)}),d(n)?n.call(this,null,this):this},g.prototype.brightness=function(t,e){return"number"!=typeof t?m.call(this,"val must be numbers",e):-1>t||t>1?m.call(this,"val must be a number between -1 and +1",e):(this.scan(0,0,this.bitmap.width,this.bitmap.height,function(e,i,n){0>t?(this.bitmap.data[n]=this.bitmap.data[n]*(1+t),this.bitmap.data[n+1]=this.bitmap.data[n+1]*(1+t),this.bitmap.data[n+2]=this.bitmap.data[n+2]*(1+t)):(this.bitmap.data[n]=this.bitmap.data[n]+(255-this.bitmap.data[n])*t,this.bitmap.data[n+1]=this.bitmap.data[n+1]+(255-this.bitmap.data[n+1])*t,this.bitmap.data[n+2]=this.bitmap.data[n+2]+(255-this.bitmap.data[n+2])*t)}),d(e)?e.call(this,null,this):this)},g.prototype.contrast=function(t,e){function i(e){if(0>t){var i=e>127?1-e/255:e/255;return 0>i&&(i=0),i=.5*Math.pow(2*i,1+t),e>127?255*(1-i):255*i}var i=e>127?1-e/255:e/255;return 0>i&&(i=0),i=.5*Math.pow(2*i,1==t?127:1/(1-t)),e>127?255*(1-i):255*i}return"number"!=typeof t?m.call(this,"val must be numbers",e):-1>t||t>1?m.call(this,"val must be a number between -1 and +1",e):(this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,n){this.bitmap.data[n]=i(this.bitmap.data[n]),this.bitmap.data[n+1]=i(this.bitmap.data[n+1]),this.bitmap.data[n+2]=i(this.bitmap.data[n+2])}),d(e)?e.call(this,null,this):this)},g.prototype.posterize=function(t,e){return"number"!=typeof t?m.call(this,"n must be numbers",e):(2>t&&(t=2),this.scan(0,0,this.bitmap.width,this.bitmap.height,function(e,i,n){this.bitmap.data[n]=Math.floor(this.bitmap.data[n]/255*(t-1))/(t-1)*255,this.bitmap.data[n+1]=Math.floor(this.bitmap.data[n+1]/255*(t-1))/(t-1)*255,this.bitmap.data[n+2]=Math.floor(this.bitmap.data[n+2]/255*(t-1))/(t-1)*255}),d(e)?e.call(this,null,this):this)},g.prototype.normalize=function(t){var e=y.call(this),i=function(t,e,i){return 255*(t-e)/(i-e)},n=function(t){return[t.findIndex(function(t){return t>0}),255-t.slice().reverse().findIndex(function(t){return t>0})]},r={r:n(e.r),g:n(e.g),b:n(e.b)};return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,n){var a=this.bitmap.data[n+0],o=this.bitmap.data[n+1],s=this.bitmap.data[n+2];this.bitmap.data[n+0]=i(a,r.r[0],r.r[1]),this.bitmap.data[n+1]=i(o,r.g[0],r.g[1]),this.bitmap.data[n+2]=i(s,r.b[0],r.b[1])}),d(t)?t.call(this,null,this):this},g.prototype.invert=function(t){return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,i){this.bitmap.data[i]=255-this.bitmap.data[i],this.bitmap.data[i+1]=255-this.bitmap.data[i+1],this.bitmap.data[i+2]=255-this.bitmap.data[i+2]}),d(t)?t.call(this,null,this):this},g.prototype.mirror=g.prototype.flip=function(t,e,i){if("boolean"!=typeof t||"boolean"!=typeof e)return m.call(this,"horizontal and vertical must be Booleans",i);var n=new r(this.bitmap.data.length);return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(i,r,a){var o=t?this.bitmap.width-1-i:i,s=e?this.bitmap.height-1-r:r,l=this.bitmap.width*s+o<<2,h=this.bitmap.data.readUInt32BE(a,!0);n.writeUInt32BE(h,l,!0)}),this.bitmap.data=new r(n),d(i)?i.call(this,null,this):this},g.prototype.gaussian=function(t,e){if("number"!=typeof t)return m.call(this,"r must be a number",e);if(1>t)return m.call(this,"r must be greater than 0",e);for(var i=Math.ceil(2.57*t),n=0;n<this.bitmap.height;n++){f("Gaussian: "+Math.round(n/this.bitmap.height*100)+"%");for(var r=0;r<this.bitmap.width;r++)for(var a=0,o=0,s=0,l=0,h=0,c=n-i;n+i+1>c;c++){for(var p=r-i;r+i+1>p;p++){var g=Math.min(this.bitmap.width-1,Math.max(0,p)),b=Math.min(this.bitmap.height-1,Math.max(0,c)),v=(p-r)*(p-r)+(c-n)*(c-n),w=Math.exp(-v/(2*t*t))/(2*Math.PI*t*t),_=b*this.bitmap.width+g<<2;a+=this.bitmap.data[_]*w,o+=this.bitmap.data[_+1]*w,s+=this.bitmap.data[_+2]*w,l+=this.bitmap.data[_+3]*w,h+=w}var _=n*this.bitmap.width+r<<2;this.bitmap.data[_]=Math.round(a/h),this.bitmap.data[_+1]=Math.round(o/h),this.bitmap.data[_+2]=Math.round(s/h),this.bitmap.data[_+3]=Math.round(l/h)}}return u(),d(e)?e.call(this,null,this):this};var J=[1,57,41,21,203,34,97,73,227,91,149,62,105,45,39,137,241,107,3,173,39,71,65,238,219,101,187,87,81,151,141,133,249,117,221,209,197,187,177,169,5,153,73,139,133,127,243,233,223,107,103,99,191,23,177,171,165,159,77,149,9,139,135,131,253,245,119,231,224,109,211,103,25,195,189,23,45,175,171,83,81,79,155,151,147,9,141,137,67,131,129,251,123,30,235,115,113,221,217,53,13,51,50,49,193,189,185,91,179,175,43,169,83,163,5,79,155,19,75,147,145,143,35,69,17,67,33,65,255,251,247,243,239,59,29,229,113,111,219,27,213,105,207,51,201,199,49,193,191,47,93,183,181,179,11,87,43,85,167,165,163,161,159,157,155,77,19,75,37,73,145,143,141,35,138,137,135,67,33,131,129,255,63,250,247,61,121,239,237,117,29,229,227,225,111,55,109,216,213,211,209,207,205,203,201,199,197,195,193,48,190,47,93,185,183,181,179,178,176,175,173,171,85,21,167,165,41,163,161,5,79,157,78,154,153,19,75,149,74,147,73,144,143,71,141,140,139,137,17,135,134,133,66,131,65,129,1],$=[0,9,10,10,14,12,14,14,16,15,16,15,16,15,15,17,18,17,12,18,16,17,17,19,19,18,19,18,18,19,19,19,20,19,20,20,20,20,20,20,15,20,19,20,20,20,21,21,21,20,20,20,21,18,21,21,21,21,20,21,17,21,21,21,22,22,21,22,22,21,22,21,19,22,22,19,20,22,22,21,21,21,22,22,22,18,22,22,21,22,22,23,22,20,23,22,22,23,23,21,19,21,21,21,23,23,23,22,23,23,21,23,22,23,18,22,23,20,22,23,23,23,21,22,20,22,21,22,24,24,24,24,24,22,21,24,23,23,24,21,24,23,24,22,24,24,22,24,24,22,23,24,24,24,20,23,22,23,24,24,24,24,24,24,24,23,21,23,22,23,24,24,24,22,24,24,24,23,22,24,24,25,23,25,25,23,24,25,25,24,22,25,25,25,24,23,24,25,25,25,25,25,25,25,25,25,25,25,25,23,25,23,24,25,25,25,25,25,25,25,25,25,24,22,25,25,23,25,25,20,24,25,24,25,25,22,24,25,24,25,24,25,25,24,25,25,25,25,22,25,25,25,24,25,24,25,18];g.prototype.blur=function(t,e){if("number"!=typeof t)return m.call(this,"r must be a number",e);if(1>t)return m.call(this,"r must be greater than 0",e);for(var i,n,r,a,o,s,l,h,f,c,u,p,g,b,v=this.bitmap.width-1,w=this.bitmap.height-1,_=(this.bitmap.width*this.bitmap.height,t+1),y=J[t],x=$[t],k=[],E=[],S=[],I=[],M=[],A=[],R=2;R-- >0;){for(g=p=0,s=0;s<this.bitmap.height;s++){for(i=this.bitmap.data[g]*_,n=this.bitmap.data[g+1]*_,r=this.bitmap.data[g+2]*_,a=this.bitmap.data[g+3]*_,l=1;t>=l;l++)h=g+((l>v?v:l)<<2),i+=this.bitmap.data[h++],n+=this.bitmap.data[h++],r+=this.bitmap.data[h++],a+=this.bitmap.data[h];for(o=0;o<this.bitmap.width;o++)k[p]=i,E[p]=n,S[p]=r,I[p]=a,0==s&&(M[o]=((h=o+_)<v?h:v)<<2,A[o]=(h=o-t)>0?h<<2:0),f=g+M[o],c=g+A[o],i+=this.bitmap.data[f++]-this.bitmap.data[c++],n+=this.bitmap.data[f++]-this.bitmap.data[c++],r+=this.bitmap.data[f++]-this.bitmap.data[c++],a+=this.bitmap.data[f]-this.bitmap.data[c],p++;g+=this.bitmap.width<<2}for(o=0;o<this.bitmap.width;o++){for(u=o,i=k[u]*_,n=E[u]*_,r=S[u]*_,a=I[u]*_,l=1;t>=l;l++)u+=l>w?0:this.bitmap.width,i+=k[u],n+=E[u],r+=S[u],a+=I[u];for(p=o<<2,s=0;s<this.bitmap.height;s++)this.bitmap.data[p+3]=b=a*y>>>x,b>255&&(this.bitmap.data[p+3]=255),b>0?(b=255/b,this.bitmap.data[p]=(i*y>>>x)*b,this.bitmap.data[p+1]=(n*y>>>x)*b,this.bitmap.data[p+2]=(r*y>>>x)*b):this.bitmap.data[p]=this.bitmap.data[p+1]=this.bitmap.data[p+2]=0,0==o&&(M[s]=((h=s+_)<w?h:w)*this.bitmap.width,A[s]=(h=s-t)>0?h*this.bitmap.width:0),f=o+M[s],c=o+A[s],i+=k[f]-k[c],n+=E[f]-E[c],r+=S[f]-S[c],a+=I[f]-I[c],p+=this.bitmap.width<<2}}return d(e)?e.call(this,null,this):this},g.prototype.greyscale=function(t){return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,i){var n=parseInt(.2126*this.bitmap.data[i]+.7152*this.bitmap.data[i+1]+.0722*this.bitmap.data[i+2],10);this.bitmap.data[i]=n,this.bitmap.data[i+1]=n,this.bitmap.data[i+2]=n}),d(t)?t.call(this,null,this):this},g.prototype.grayscale=g.prototype.greyscale,g.prototype.sepia=function(t){return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,i){var n=this.bitmap.data[i],r=this.bitmap.data[i+1],a=this.bitmap.data[i+2];n=.393*n+.769*r+.189*a,r=.349*n+.686*r+.168*a,a=.272*n+.534*r+.131*a,this.bitmap.data[i]=255>n?n:255,this.bitmap.data[i+1]=255>r?r:255,this.bitmap.data[i+2]=255>a?a:255}),d(t)?t.call(this,null,this):this},g.prototype.opacity=function(t,e){return"number"!=typeof t?m.call(this,"f must be a number",e):0>t||t>1?m.call(this,"f must be a number from 0 to 1",e):(this.scan(0,0,this.bitmap.width,this.bitmap.height,function(e,i,n){var r=this.bitmap.data[n+3]*t;this.bitmap.data[n+3]=r}),d(e)?e.call(this,null,this):this)},g.prototype.fade=function(t,e){return"number"!=typeof t?m.call(this,"f must be a number",e):0>t||t>1?m.call(this,"f must be a number from 0 to 1",e):(this.opacity(1-t),d(e)?e.call(this,null,this):this)},g.prototype.opaque=function(t){return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,i){this.bitmap.data[i+3]=255}),d(t)?t.call(this,null,this):this},g.prototype.resize=function(t,e,i,n){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"w and h must be numbers",n);if("function"==typeof i&&"undefined"==typeof n&&(n=i,i=null),t==g.AUTO&&e==g.AUTO)return m.call(this,"w and h cannot both the set to auto",n);if(t==g.AUTO&&(t=this.bitmap.width*(e/this.bitmap.height)),e==g.AUTO&&(e=this.bitmap.height*(t/this.bitmap.width)),t=Math.round(t),e=Math.round(e),"function"==typeof B[i]){var a={data:new r(t*e*4),width:t,height:e};B[i](this.bitmap,a),this.bitmap=a}else{var o=this,s=new C(this.bitmap.width,this.bitmap.height,t,e,!0,!0,function(i){o.bitmap.data=new r(i),o.bitmap.width=t,o.bitmap.height=e});s.resize(this.bitmap.data)}return d(n)?n.call(this,null,this):this},g.prototype.cover=function(t,e,i,n){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"w and h must be numbers",n);"function"==typeof i&&"undefined"==typeof n&&(n=i,i=null);var r=t/e>this.bitmap.width/this.bitmap.height?t/this.bitmap.width:e/this.bitmap.height;return this.scale(r,i),this.crop(this.bitmap.width/2-t/2,this.bitmap.height/2-e/2,t,e),d(n)?n.call(this,null,this):this},g.prototype.contain=function(t,e,i,n){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"w and h must be numbers",n);"function"==typeof i&&"undefined"==typeof n&&(n=i,i=null);var r=t/e>this.bitmap.width/this.bitmap.height?e/this.bitmap.height:t/this.bitmap.width,a=this.clone().scale(r,i);return this.resize(t,e,i),this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,e,i){this.bitmap.data.writeUInt32BE(this._background,i)}),this.blit(a,this.bitmap.width/2-a.bitmap.width/2,this.bitmap.height/2-a.bitmap.height/2),d(n)?n.call(this,null,this):this},g.prototype.scale=function(t,e,i){if("number"!=typeof t)return m.call(this,"f must be a number",i);if(0>t)return m.call(this,"f must be a positive number",i);"function"==typeof e&&"undefined"==typeof i&&(i=e,e=null);var n=this.bitmap.width*t,r=this.bitmap.height*t;return this.resize(n,r,e),d(i)?i.call(this,null,this):this},g.prototype.scaleToFit=function(t,e,i,n){if("number"!=typeof t||"number"!=typeof e)return m.call(this,"w and h must be numbers",n);"function"==typeof i&&"undefined"==typeof n&&(n=i,i=null);var r=t/e>this.bitmap.width/this.bitmap.height?e/this.bitmap.height:t/this.bitmap.width;return this.scale(r,i),d(n)?n.call(this,null,this):this},g.prototype.rotate=function(t,e,i){return"undefined"!=typeof e&&null!==e||(e=!0),"function"==typeof e&&"undefined"==typeof i&&(i=e,e=!0),"number"!=typeof t?m.call(this,"deg must be a number",i):"boolean"!=typeof e&&"string"!=typeof e?m.call(this,"mode must be a boolean or a string",i):(t%90==0&&e!==!1?x.call(this,t,i):k.call(this,t,e,i),d(i)?i.call(this,null,this):this)},g.prototype.getBuffer=function(t,e){if("string"!=typeof t)return m.call(this,"mime must be a string",e);if("function"!=typeof e)return m.call(this,"cb must be a function",e);switch(t.toLowerCase()){case g.MIME_PNG:var i=this,n=new R({width:this.bitmap.width,height:this.bitmap.height,bitDepth:8,deflateLevel:this._deflateLevel,filterType:this._filterType,colorType:this._rgba?6:2,inputHasAlpha:!0});this._rgba?n.data=new r(this.bitmap.data):n.data=E(this).data,z(n.pack(),function(t,n){return e.call(i,null,n)});break;case g.MIME_JPEG:var a=T.encode(E(this),this._quality);return e.call(this,null,a.data);case g.MIME_BMP:var o=P.encode(E(this));return e.call(this,null,o.data);default:return e.call(this,"Unsupported MIME type: "+t)}return this},g.prototype.dither565=function(t){var e=[0,4,1,5,0,4,1,5,6,2,7,3,6,2,7,3,1,5,0,4,1,5,0,4,7,3,6,2,7,3,6,2,0,4,1,5,0,4,1,5,6,2,7,3,6,2,7,3,1,5,0,4,1,5,0,4,7,3,6,2,7,3,6,2];return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(t,i,n){var r=i%4*8+t%4,a=e[r];this.bitmap.data[n]=248&Math.min(this.bitmap.data[n]+a,255),this.bitmap.data[n+1]=252&Math.min(this.bitmap.data[n+1]+a,255),this.bitmap.data[n+2]=248&Math.min(this.bitmap.data[n+2]+a,255)}),d(t)?t.call(this,null,this):this},g.prototype.dither16=g.prototype.dither565,g.prototype.color=g.prototype.colour=function(t,e){if(!t||!Array.isArray(t))return m.call(this,"actions must be an array",e);var i=this;return this.scan(0,0,this.bitmap.width,this.bitmap.height,function(n,r,a){var o=L({r:this.bitmap.data[a],g:this.bitmap.data[a+1],b:this.bitmap.data[a+2]}),s=function(t,e){return c=o.toRgb(),c[t]=Math.max(0,Math.min(c[t]+e,255)),L(c)};t.forEach(function(t){if("mix"===t.apply)o=L.mix(o,t.params[0],t.params[1]);else if("tint"===t.apply)o=L.mix(o,"white",t.params[0]);else if("shade"===t.apply)o=L.mix(o,"black",t.params[0]);else if("xor"===t.apply){var n=L(t.params[0]).toRgb();o=o.toRgb(),o=L({r:o.r^n.r,g:o.g^n.g,b:o.b^n.b})}else if("red"===t.apply)o=s("r",t.params[0]);else if("green"===t.apply)o=s("g",t.params[0]);else if("blue"===t.apply)o=s("b",t.params[0]);else{"hue"===t.apply&&(t.apply="spin");var r=o[t.apply];if(!r)return m.call(i,"action "+t.apply+" not supported",e);o=r.apply(o,t.params)}}),o=o.toRgb(),this.bitmap.data[a]=o.r,this.bitmap.data[a+1]=o.g,this.bitmap.data[a+2]=o.b}),d(e)?e.call(this,null,this):this},g.loadFont=function(t,e){if("string"!=typeof t)return m.call(this,"file must be a string",e);var i=this;return new q(function(n,r){
e=e||function(t,e){t?r(t):n(e)},W(t,function(n,r){var a={},o={};if(n)return m.call(i,n,e);for(var s=0;s<r.chars.length;s++)a[String.fromCharCode(r.chars[s].id)]=r.chars[s];for(var s=0;s<r.kernings.length;s++){var l=String.fromCharCode(r.kernings[s].first);o[l]=o[l]||{},o[l][String.fromCharCode(r.kernings[s].second)]=r.kernings[s].amount}S(G.dirname(t),r.pages).then(function(t){e(null,{chars:a,kernings:o,pages:t,common:r.common,info:r.info})})})})},g.prototype.print=function(t,e,i,n,r){if("object"!=("undefined"==typeof t?"undefined":_typeof(t)))return m.call(this,"font must be a Jimp loadFont",r);if("number"!=typeof e||"number"!=typeof i)return m.call(this,"x and y must be numbers",r);if("string"!=typeof n)return m.call(this,"text must be a string",r);for(var a=this,o=0;o<n.length;o++)t.chars[n[o]]&&(a=I(a,t,e,i,t.chars[n[o]]),e+=(t.kernings[n[o]]&&t.kernings[n[o]][n[o+1]]?t.kernings[n[o]][n[o+1]]:0)+(t.chars[n[o]].xadvance||0));return d(r)?r.call(this,null,a):a};var K;"object"==("undefined"==typeof window?"undefined":_typeof(window))&&(K=window),"object"==("undefined"==typeof self?"undefined":_typeof(self))&&(K=self),K.Jimp=g,K.Buffer=r,e.exports=g}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},t("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..")},{"./phash.js":108,"./resize.js":109,"./resize2.js":110,_process:12,"bignumber.js":4,"bmp-js":5,buffer:14,"es6-promise":16,"exif-parser":18,"file-type":27,"jpeg-js":36,"load-bmfont":39,mime:41,path:60,pixelmatch:61,pngjs:81,"read-chunk":84,"stream-to-buffer":96,tinycolor2:99,"url-regex":101}],2:[function(t,e,i){function n(t,e){return p.isUndefined(e)?""+e:p.isNumber(e)&&!isFinite(e)?e.toString():p.isFunction(e)||p.isRegExp(e)?e.toString():e}function r(t,e){return p.isString(t)?t.length<e?t:t.slice(0,e):t}function a(t){return r(JSON.stringify(t.actual,n),128)+" "+t.operator+" "+r(JSON.stringify(t.expected,n),128)}function o(t,e,i,n,r){throw new g.AssertionError({message:i,actual:t,expected:e,operator:n,stackStartFunction:r})}function s(t,e){t||o(t,!0,e,"==",g.ok)}function l(t,e){if(t===e)return!0;if(p.isBuffer(t)&&p.isBuffer(e)){if(t.length!=e.length)return!1;for(var i=0;i<t.length;i++)if(t[i]!==e[i])return!1;return!0}return p.isDate(t)&&p.isDate(e)?t.getTime()===e.getTime():p.isRegExp(t)&&p.isRegExp(e)?t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase:p.isObject(t)||p.isObject(e)?f(t,e):t==e}function h(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function f(t,e){if(p.isNullOrUndefined(t)||p.isNullOrUndefined(e))return!1;if(t.prototype!==e.prototype)return!1;if(p.isPrimitive(t)||p.isPrimitive(e))return t===e;var i=h(t),n=h(e);if(i&&!n||!i&&n)return!1;if(i)return t=d.call(t),e=d.call(e),l(t,e);var r,a,o=b(t),s=b(e);if(o.length!=s.length)return!1;for(o.sort(),s.sort(),a=o.length-1;a>=0;a--)if(o[a]!=s[a])return!1;for(a=o.length-1;a>=0;a--)if(r=o[a],!l(t[r],e[r]))return!1;return!0}function c(t,e){return t&&e?"[object RegExp]"==Object.prototype.toString.call(e)?e.test(t):t instanceof e?!0:e.call({},t)===!0:!1}function u(t,e,i,n){var r;p.isString(i)&&(n=i,i=null);try{e()}catch(a){r=a}if(n=(i&&i.name?" ("+i.name+").":".")+(n?" "+n:"."),t&&!r&&o(r,i,"Missing expected exception"+n),!t&&c(r,i)&&o(r,i,"Got unwanted exception"+n),t&&r&&i&&!c(r,i)||!t&&r)throw r}var p=t("util/"),d=Array.prototype.slice,m=Object.prototype.hasOwnProperty,g=e.exports=s;g.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=a(this),this.generatedMessage=!0);var e=t.stackStartFunction||o;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var i=new Error;if(i.stack){var n=i.stack,r=e.name,s=n.indexOf("\n"+r);if(s>=0){var l=n.indexOf("\n",s+1);n=n.substring(l+1)}this.stack=n}}},p.inherits(g.AssertionError,Error),g.fail=o,g.ok=s,g.equal=function(t,e,i){t!=e&&o(t,e,i,"==",g.equal)},g.notEqual=function(t,e,i){t==e&&o(t,e,i,"!=",g.notEqual)},g.deepEqual=function(t,e,i){l(t,e)||o(t,e,i,"deepEqual",g.deepEqual)},g.notDeepEqual=function(t,e,i){l(t,e)&&o(t,e,i,"notDeepEqual",g.notDeepEqual)},g.strictEqual=function(t,e,i){t!==e&&o(t,e,i,"===",g.strictEqual)},g.notStrictEqual=function(t,e,i){t===e&&o(t,e,i,"!==",g.notStrictEqual)},g["throws"]=function(t,e,i){u.apply(this,[!0].concat(d.call(arguments)))},g.doesNotThrow=function(t,e){u.apply(this,[!1].concat(d.call(arguments)))},g.ifError=function(t){if(t)throw t};var b=Object.keys||function(t){var e=[];for(var i in t)m.call(t,i)&&e.push(i);return e}},{"util/":104}],3:[function(t,e,i){"use strict";function n(){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e=0,i=t.length;i>e;++e)l[e]=t[e],h[t.charCodeAt(e)]=e;h["-".charCodeAt(0)]=62,h["_".charCodeAt(0)]=63}function r(t){var e,i,n,r,a,o,s=t.length;if(s%4>0)throw new Error("Invalid string. Length must be a multiple of 4");a="="===t[s-2]?2:"="===t[s-1]?1:0,o=new f(3*s/4-a),n=a>0?s-4:s;var l=0;for(e=0,i=0;n>e;e+=4,i+=3)r=h[t.charCodeAt(e)]<<18|h[t.charCodeAt(e+1)]<<12|h[t.charCodeAt(e+2)]<<6|h[t.charCodeAt(e+3)],o[l++]=r>>16&255,o[l++]=r>>8&255,o[l++]=255&r;return 2===a?(r=h[t.charCodeAt(e)]<<2|h[t.charCodeAt(e+1)]>>4,o[l++]=255&r):1===a&&(r=h[t.charCodeAt(e)]<<10|h[t.charCodeAt(e+1)]<<4|h[t.charCodeAt(e+2)]>>2,o[l++]=r>>8&255,o[l++]=255&r),o}function a(t){return l[t>>18&63]+l[t>>12&63]+l[t>>6&63]+l[63&t]}function o(t,e,i){for(var n,r=[],o=e;i>o;o+=3)n=(t[o]<<16)+(t[o+1]<<8)+t[o+2],r.push(a(n));return r.join("")}function s(t){for(var e,i=t.length,n=i%3,r="",a=[],s=16383,h=0,f=i-n;f>h;h+=s)a.push(o(t,h,h+s>f?f:h+s));return 1===n?(e=t[i-1],r+=l[e>>2],r+=l[e<<4&63],r+="=="):2===n&&(e=(t[i-2]<<8)+t[i-1],r+=l[e>>10],r+=l[e>>4&63],r+=l[e<<2&63],r+="="),a.push(r),a.join("")}i.toByteArray=r,i.fromByteArray=s;var l=[],h=[],f="undefined"!=typeof Uint8Array?Uint8Array:Array;n()},{}],4:[function(t,e,i){!function(i){"use strict";function n(t){function e(t,n){var r,a,o,s,l,h,f=this;if(!(f instanceof e))return G&&L(26,"constructor call without new",t),new e(t,n);if(null!=n&&q(n,2,64,z,"base")){if(n=0|n,h=t+"",10==n)return f=new e(t instanceof e?t:h),C(f,U+f.e+1,N);if((s="number"==typeof t)&&0*t!=0||!new RegExp("^-?"+(r="["+y.slice(0,n)+"]+")+"(?:\\."+r+")?$",37>n?"i":"").test(h))return d(f,h,s,n);s?(f.s=0>1/t?(h=h.slice(1),-1):1,G&&h.replace(/^0\.0*|\./,"").length>15&&L(z,_,t),s=!1):f.s=45===h.charCodeAt(0)?(h=h.slice(1),-1):1,h=i(h,10,n,f.s)}else{if(t instanceof e)return f.s=t.s,f.e=t.e,f.c=(t=t.c)?t.slice():t,void(z=0);if((s="number"==typeof t)&&0*t==0){if(f.s=0>1/t?(t=-t,-1):1,t===~~t){for(a=0,o=t;o>=10;o/=10,a++);return f.e=a,f.c=[t],void(z=0)}h=t+""}else{if(!m.test(h=t+""))return d(f,h,s);f.s=45===h.charCodeAt(0)?(h=h.slice(1),-1):1}}for((a=h.indexOf("."))>-1&&(h=h.replace(".","")),(o=h.search(/e/i))>0?(0>a&&(a=o),a+=+h.slice(o+1),h=h.substring(0,o)):0>a&&(a=h.length),o=0;48===h.charCodeAt(o);o++);for(l=h.length;48===h.charCodeAt(--l););if(h=h.slice(o,l+1))if(l=h.length,s&&G&&l>15&&(t>E||t!==b(t))&&L(z,_,f.s*t),a=a-o-1,a>W)f.c=f.e=null;else if(H>a)f.c=[f.e=0];else{if(f.e=a,f.c=[],o=(a+1)%k,0>a&&(o+=k),l>o){for(o&&f.c.push(+h.slice(0,o)),l-=k;l>o;)f.c.push(+h.slice(o,o+=k));h=h.slice(o),o=k-h.length}else o-=l;for(;o--;h+="0");f.c.push(+h)}else f.c=[f.e=0];z=0}function i(t,i,n,r){var o,s,l,f,u,p,d,m=t.indexOf("."),g=U,b=N;for(37>n&&(t=t.toLowerCase()),m>=0&&(l=X,X=0,t=t.replace(".",""),d=new e(n),u=d.pow(t.length-m),X=l,d.c=h(c(a(u.c),u.e),10,i),d.e=d.c.length),p=h(t,n,i),s=l=p.length;0==p[--l];p.pop());if(!p[0])return"0";if(0>m?--s:(u.c=p,u.e=s,u.s=r,u=B(u,d,g,b,i),p=u.c,f=u.r,s=u.e),o=s+g+1,m=p[o],l=i/2,f=f||0>o||null!=p[o+1],f=4>b?(null!=m||f)&&(0==b||b==(u.s<0?3:2)):m>l||m==l&&(4==b||f||6==b&&1&p[o-1]||b==(u.s<0?8:7)),1>o||!p[0])t=f?c("1",-g):"0";else{if(p.length=o,f)for(--i;++p[--o]>i;)p[o]=0,o||(++s,p.unshift(1));for(l=p.length;!p[--l];);for(m=0,t="";l>=m;t+=y.charAt(p[m++]));t=c(t,s)}return t}function A(t,i,n,r){var o,s,l,h,u;if(n=null!=n&&q(n,0,8,r,w)?0|n:N,!t.c)return t.toString();if(o=t.c[0],l=t.e,null==i)u=a(t.c),u=19==r||24==r&&F>=l?f(u,l):c(u,l);else if(t=C(new e(t),i,n),s=t.e,u=a(t.c),h=u.length,19==r||24==r&&(s>=i||F>=s)){for(;i>h;u+="0",h++);u=f(u,s)}else if(i-=l,u=c(u,s),s+1>h){if(--i>0)for(u+=".";i--;u+="0");}else if(i+=s-h,i>0)for(s+1==h&&(u+=".");i--;u+="0");return t.s<0&&o?"-"+u:u}function R(t,i){var n,r,a=0;for(l(t[0])&&(t=t[0]),n=new e(t[0]);++a<t.length;){if(r=new e(t[a]),!r.s){n=r;break}i.call(n,r)&&(n=r)}return n}function T(t,e,i,n,r){return(e>t||t>i||t!=u(t))&&L(n,(r||"decimal places")+(e>t||t>i?" out of range":" not an integer"),t),!0}function P(t,e,i){for(var n=1,r=e.length;!e[--r];e.pop());for(r=e[0];r>=10;r/=10,n++);return(i=n+i*k-1)>W?t.c=t.e=null:H>i?t.c=[t.e=0]:(t.e=i,t.c=e),t}function L(t,e,i){var n=new Error(["new BigNumber","cmp","config","div","divToInt","eq","gt","gte","lt","lte","minus","mod","plus","precision","random","round","shift","times","toDigits","toExponential","toFixed","toFormat","toFraction","pow","toPrecision","toString","BigNumber"][t]+"() "+e+": "+i);throw n.name="BigNumber Error",z=0,n}function C(t,e,i,n){var r,a,o,s,l,h,f,c=t.c,u=S;if(c){t:{for(r=1,s=c[0];s>=10;s/=10,r++);if(a=e-r,0>a)a+=k,o=e,l=c[h=0],f=l/u[r-o-1]%10|0;else if(h=g((a+1)/k),h>=c.length){if(!n)break t;for(;c.length<=h;c.push(0));l=f=0,r=1,a%=k,o=a-k+1}else{for(l=s=c[h],r=1;s>=10;s/=10,r++);a%=k,o=a-k+r,f=0>o?0:l/u[r-o-1]%10|0}if(n=n||0>e||null!=c[h+1]||(0>o?l:l%u[r-o-1]),n=4>i?(f||n)&&(0==i||i==(t.s<0?3:2)):f>5||5==f&&(4==i||n||6==i&&(a>0?o>0?l/u[r-o]:0:c[h-1])%10&1||i==(t.s<0?8:7)),1>e||!c[0])return c.length=0,n?(e-=t.e+1,c[0]=u[(k-e%k)%k],t.e=-e||0):c[0]=t.e=0,t;if(0==a?(c.length=h,s=1,h--):(c.length=h+1,s=u[k-a],c[h]=o>0?b(l/u[r-o]%u[o])*s:0),n)for(;;){if(0==h){for(a=1,o=c[0];o>=10;o/=10,a++);for(o=c[0]+=s,s=1;o>=10;o/=10,s++);a!=s&&(t.e++,c[0]==x&&(c[0]=1));break}if(c[h]+=s,c[h]!=x)break;c[h--]=0,s=1}for(a=c.length;0===c[--a];c.pop());}t.e>W?t.c=t.e=null:t.e<H&&(t.c=[t.e=0])}return t}var B,z=0,O=e.prototype,D=new e(1),U=20,N=4,F=-7,j=21,H=-1e7,W=1e7,G=!0,q=T,Z=!1,Y=1,X=100,V={decimalSeparator:".",groupSeparator:",",groupSize:3,secondaryGroupSize:0,fractionGroupSeparator:" ",fractionGroupSize:0};return e.another=n,e.ROUND_UP=0,e.ROUND_DOWN=1,e.ROUND_CEIL=2,e.ROUND_FLOOR=3,e.ROUND_HALF_UP=4,e.ROUND_HALF_DOWN=5,e.ROUND_HALF_EVEN=6,e.ROUND_HALF_CEIL=7,e.ROUND_HALF_FLOOR=8,e.EUCLID=9,e.config=function(){var t,e,i=0,n={},r=arguments,a=r[0],o=a&&"object"==("undefined"==typeof a?"undefined":_typeof(a))?function(){return a.hasOwnProperty(e)?null!=(t=a[e]):void 0}:function(){return r.length>i?null!=(t=r[i++]):void 0};return o(e="DECIMAL_PLACES")&&q(t,0,M,2,e)&&(U=0|t),n[e]=U,o(e="ROUNDING_MODE")&&q(t,0,8,2,e)&&(N=0|t),n[e]=N,o(e="EXPONENTIAL_AT")&&(l(t)?q(t[0],-M,0,2,e)&&q(t[1],0,M,2,e)&&(F=0|t[0],j=0|t[1]):q(t,-M,M,2,e)&&(F=-(j=0|(0>t?-t:t)))),n[e]=[F,j],o(e="RANGE")&&(l(t)?q(t[0],-M,-1,2,e)&&q(t[1],1,M,2,e)&&(H=0|t[0],W=0|t[1]):q(t,-M,M,2,e)&&(0|t?H=-(W=0|(0>t?-t:t)):G&&L(2,e+" cannot be zero",t))),n[e]=[H,W],o(e="ERRORS")&&(t===!!t||1===t||0===t?(z=0,q=(G=!!t)?T:s):G&&L(2,e+v,t)),n[e]=G,o(e="CRYPTO")&&(t===!!t||1===t||0===t?(Z=!(!t||!p),t&&!Z&&G&&L(2,"crypto unavailable",p)):G&&L(2,e+v,t)),n[e]=Z,o(e="MODULO_MODE")&&q(t,0,9,2,e)&&(Y=0|t),n[e]=Y,o(e="POW_PRECISION")&&q(t,0,M,2,e)&&(X=0|t),n[e]=X,o(e="FORMAT")&&("object"==("undefined"==typeof t?"undefined":_typeof(t))?V=t:G&&L(2,e+" not an object",t)),n[e]=V,n},e.max=function(){return R(arguments,O.lt)},e.min=function(){return R(arguments,O.gt)},e.random=function(){var t=9007199254740992,i=Math.random()*t&2097151?function(){return b(Math.random()*t)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)};return function(t){var n,r,a,o,s,l=0,h=[],f=new e(D);if(t=null!=t&&q(t,0,M,14)?0|t:U,o=g(t/k),Z)if(p&&p.getRandomValues){for(n=p.getRandomValues(new Uint32Array(o*=2));o>l;)s=131072*n[l]+(n[l+1]>>>11),s>=9e15?(r=p.getRandomValues(new Uint32Array(2)),n[l]=r[0],n[l+1]=r[1]):(h.push(s%1e14),l+=2);l=o/2}else if(p&&p.randomBytes){for(n=p.randomBytes(o*=7);o>l;)s=281474976710656*(31&n[l])+1099511627776*n[l+1]+4294967296*n[l+2]+16777216*n[l+3]+(n[l+4]<<16)+(n[l+5]<<8)+n[l+6],s>=9e15?p.randomBytes(7).copy(n,l):(h.push(s%1e14),l+=7);l=o/7}else G&&L(14,"crypto unavailable",p);if(!l)for(;o>l;)s=i(),9e15>s&&(h[l++]=s%1e14);for(o=h[--l],t%=k,o&&t&&(s=S[k-t],h[l]=b(o/s)*s);0===h[l];h.pop(),l--);if(0>l)h=[a=0];else{for(a=-1;0===h[0];h.shift(),a-=k);for(l=1,s=h[0];s>=10;s/=10,l++);k>l&&(a-=k-l)}return f.e=a,f.c=h,f}}(),B=function(){function t(t,e,i){var n,r,a,o,s=0,l=t.length,h=e%I,f=e/I|0;for(t=t.slice();l--;)a=t[l]%I,o=t[l]/I|0,n=f*a+o*h,r=h*a+n%I*I+s,s=(r/i|0)+(n/I|0)+f*o,t[l]=r%i;return s&&t.unshift(s),t}function i(t,e,i,n){var r,a;if(i!=n)a=i>n?1:-1;else for(r=a=0;i>r;r++)if(t[r]!=e[r]){a=t[r]>e[r]?1:-1;break}return a}function n(t,e,i,n){for(var r=0;i--;)t[i]-=r,r=t[i]<e[i]?1:0,t[i]=r*n+t[i]-e[i];for(;!t[0]&&t.length>1;t.shift());}return function(a,o,s,l,h){var f,c,u,p,d,m,g,v,w,_,y,E,S,I,M,A,R,T=a.s==o.s?1:-1,P=a.c,L=o.c;if(!(P&&P[0]&&L&&L[0]))return new e(a.s&&o.s&&(P?!L||P[0]!=L[0]:L)?P&&0==P[0]||!L?0*T:T/0:NaN);for(v=new e(T),w=v.c=[],c=a.e-o.e,T=s+c+1,h||(h=x,c=r(a.e/k)-r(o.e/k),T=T/k|0),u=0;L[u]==(P[u]||0);u++);if(L[u]>(P[u]||0)&&c--,0>T)w.push(1),p=!0;else{for(I=P.length,A=L.length,u=0,T+=2,d=b(h/(L[0]+1)),d>1&&(L=t(L,d,h),P=t(P,d,h),A=L.length,I=P.length),S=A,_=P.slice(0,A),y=_.length;A>y;_[y++]=0);R=L.slice(),R.unshift(0),M=L[0],L[1]>=h/2&&M++;do{if(d=0,f=i(L,_,A,y),0>f){if(E=_[0],A!=y&&(E=E*h+(_[1]||0)),d=b(E/M),d>1)for(d>=h&&(d=h-1),m=t(L,d,h),g=m.length,y=_.length;1==i(m,_,g,y);)d--,n(m,g>A?R:L,g,h),g=m.length,f=1;else 0==d&&(f=d=1),m=L.slice(),g=m.length;if(y>g&&m.unshift(0),n(_,m,y,h),y=_.length,-1==f)for(;i(L,_,A,y)<1;)d++,n(_,y>A?R:L,y,h),y=_.length}else 0===f&&(d++,_=[0]);w[u++]=d,_[0]?_[y++]=P[S]||0:(_=[P[S]],y=1)}while((S++<I||null!=_[0])&&T--);p=null!=_[0],w[0]||w.shift()}if(h==x){for(u=1,T=w[0];T>=10;T/=10,u++);C(v,s+(v.e=u+c*k-1)+1,l,p)}else v.e=c,v.r=+p;return v}}(),d=function(){var t=/^(-?)0([xbo])(?=\w[\w.]*$)/i,i=/^([^.]+)\.$/,n=/^\.([^.]+)$/,r=/^-?(Infinity|NaN)$/,a=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(o,s,l,h){var f,c=l?s:s.replace(a,"");if(r.test(c))o.s=isNaN(c)?null:0>c?-1:1;else{if(!l&&(c=c.replace(t,function(t,e,i){return f="x"==(i=i.toLowerCase())?16:"b"==i?2:8,h&&h!=f?t:e}),h&&(f=h,c=c.replace(i,"$1").replace(n,"0.$1")),s!=c))return new e(c,f);G&&L(z,"not a"+(h?" base "+h:"")+" number",s),o.s=null}o.c=o.e=null,z=0}}(),O.absoluteValue=O.abs=function(){var t=new e(this);return t.s<0&&(t.s=1),t},O.ceil=function(){return C(new e(this),this.e+1,2)},O.comparedTo=O.cmp=function(t,i){return z=1,o(this,new e(t,i))},O.decimalPlaces=O.dp=function(){var t,e,i=this.c;if(!i)return null;if(t=((e=i.length-1)-r(this.e/k))*k,e=i[e])for(;e%10==0;e/=10,t--);return 0>t&&(t=0),t},O.dividedBy=O.div=function(t,i){return z=3,B(this,new e(t,i),U,N)},O.dividedToIntegerBy=O.divToInt=function(t,i){return z=4,B(this,new e(t,i),0,1)},O.equals=O.eq=function(t,i){return z=5,0===o(this,new e(t,i))},O.floor=function(){return C(new e(this),this.e+1,3)},O.greaterThan=O.gt=function(t,i){return z=6,o(this,new e(t,i))>0},O.greaterThanOrEqualTo=O.gte=function(t,i){return z=7,1===(i=o(this,new e(t,i)))||0===i},O.isFinite=function(){return!!this.c},O.isInteger=O.isInt=function(){return!!this.c&&r(this.e/k)>this.c.length-2},O.isNaN=function(){return!this.s},O.isNegative=O.isNeg=function(){return this.s<0},O.isZero=function(){return!!this.c&&0==this.c[0]},O.lessThan=O.lt=function(t,i){return z=8,o(this,new e(t,i))<0},O.lessThanOrEqualTo=O.lte=function(t,i){return z=9,-1===(i=o(this,new e(t,i)))||0===i},O.minus=O.sub=function(t,i){var n,a,o,s,l=this,h=l.s;if(z=10,t=new e(t,i),i=t.s,!h||!i)return new e(NaN);if(h!=i)return t.s=-i,l.plus(t);var f=l.e/k,c=t.e/k,u=l.c,p=t.c;if(!f||!c){if(!u||!p)return u?(t.s=-i,t):new e(p?l:NaN);if(!u[0]||!p[0])return p[0]?(t.s=-i,t):new e(u[0]?l:3==N?-0:0)}if(f=r(f),c=r(c),u=u.slice(),h=f-c){for((s=0>h)?(h=-h,o=u):(c=f,o=p),o.reverse(),i=h;i--;o.push(0));o.reverse()}else for(a=(s=(h=u.length)<(i=p.length))?h:i,h=i=0;a>i;i++)if(u[i]!=p[i]){s=u[i]<p[i];break}if(s&&(o=u,u=p,p=o,t.s=-t.s),i=(a=p.length)-(n=u.length),i>0)for(;i--;u[n++]=0);for(i=x-1;a>h;){if(u[--a]<p[a]){for(n=a;n&&!u[--n];u[n]=i);--u[n],u[a]+=x}u[a]-=p[a]}for(;0==u[0];u.shift(),--c);return u[0]?P(t,u,c):(t.s=3==N?-1:1,t.c=[t.e=0],t)},O.modulo=O.mod=function(t,i){var n,r,a=this;return z=11,t=new e(t,i),!a.c||!t.s||t.c&&!t.c[0]?new e(NaN):!t.c||a.c&&!a.c[0]?new e(a):(9==Y?(r=t.s,t.s=1,n=B(a,t,0,3),t.s=r,n.s*=r):n=B(a,t,0,Y),a.minus(n.times(t)))},O.negated=O.neg=function(){var t=new e(this);return t.s=-t.s||null,t},O.plus=O.add=function(t,i){var n,a=this,o=a.s;if(z=12,t=new e(t,i),i=t.s,!o||!i)return new e(NaN);if(o!=i)return t.s=-i,a.minus(t);var s=a.e/k,l=t.e/k,h=a.c,f=t.c;if(!s||!l){if(!h||!f)return new e(o/0);if(!h[0]||!f[0])return f[0]?t:new e(h[0]?a:0*o)}if(s=r(s),l=r(l),h=h.slice(),o=s-l){for(o>0?(l=s,n=f):(o=-o,n=h),n.reverse();o--;n.push(0));n.reverse()}for(o=h.length,i=f.length,0>o-i&&(n=f,f=h,h=n,i=o),o=0;i;)o=(h[--i]=h[i]+f[i]+o)/x|0,h[i]%=x;return o&&(h.unshift(o),++l),P(t,h,l)},O.precision=O.sd=function(t){var e,i,n=this,r=n.c;if(null!=t&&t!==!!t&&1!==t&&0!==t&&(G&&L(13,"argument"+v,t),t!=!!t&&(t=null)),!r)return null;if(i=r.length-1,e=i*k+1,i=r[i]){for(;i%10==0;i/=10,e--);for(i=r[0];i>=10;i/=10,e++);}return t&&n.e+1>e&&(e=n.e+1),e},O.round=function(t,i){var n=new e(this);return(null==t||q(t,0,M,15))&&C(n,~~t+this.e+1,null!=i&&q(i,0,8,15,w)?0|i:N),n},O.shift=function(t){var i=this;return q(t,-E,E,16,"argument")?i.times("1e"+u(t)):new e(i.c&&i.c[0]&&(-E>t||t>E)?i.s*(0>t?0:1/0):i)},O.squareRoot=O.sqrt=function(){var t,i,n,o,s,l=this,h=l.c,f=l.s,c=l.e,u=U+4,p=new e("0.5");if(1!==f||!h||!h[0])return new e(!f||0>f&&(!h||h[0])?NaN:h?l:1/0);if(f=Math.sqrt(+l),0==f||f==1/0?(i=a(h),(i.length+c)%2==0&&(i+="0"),f=Math.sqrt(i),c=r((c+1)/2)-(0>c||c%2),f==1/0?i="1e"+c:(i=f.toExponential(),i=i.slice(0,i.indexOf("e")+1)+c),n=new e(i)):n=new e(f+""),n.c[0])for(c=n.e,f=c+u,3>f&&(f=0);;)if(s=n,n=p.times(s.plus(B(l,s,u,1))),a(s.c).slice(0,f)===(i=a(n.c)).slice(0,f)){if(n.e<c&&--f,i=i.slice(f-3,f+1),"9999"!=i&&(o||"4999"!=i)){+i&&(+i.slice(1)||"5"!=i.charAt(0))||(C(n,n.e+U+2,1),t=!n.times(n).eq(l));break}if(!o&&(C(s,s.e+U+2,0),s.times(s).eq(l))){n=s;break}u+=4,f+=4,o=1}return C(n,n.e+U+1,N,t)},O.times=O.mul=function(t,i){var n,a,o,s,l,h,f,c,u,p,d,m,g,b,v,w=this,_=w.c,y=(z=17,t=new e(t,i)).c;if(!(_&&y&&_[0]&&y[0]))return!w.s||!t.s||_&&!_[0]&&!y||y&&!y[0]&&!_?t.c=t.e=t.s=null:(t.s*=w.s,_&&y?(t.c=[0],t.e=0):t.c=t.e=null),t;for(a=r(w.e/k)+r(t.e/k),t.s*=w.s,f=_.length,p=y.length,p>f&&(g=_,_=y,y=g,o=f,f=p,p=o),o=f+p,g=[];o--;g.push(0));for(b=x,v=I,o=p;--o>=0;){for(n=0,d=y[o]%v,m=y[o]/v|0,l=f,s=o+l;s>o;)c=_[--l]%v,u=_[l]/v|0,h=m*c+u*d,c=d*c+h%v*v+g[s]+n,n=(c/b|0)+(h/v|0)+m*u,g[s--]=c%b;g[s]=n}return n?++a:g.shift(),P(t,g,a)},O.toDigits=function(t,i){var n=new e(this);return t=null!=t&&q(t,1,M,18,"precision")?0|t:null,i=null!=i&&q(i,0,8,18,w)?0|i:N,t?C(n,t,i):n},O.toExponential=function(t,e){return A(this,null!=t&&q(t,0,M,19)?~~t+1:null,e,19)},O.toFixed=function(t,e){return A(this,null!=t&&q(t,0,M,20)?~~t+this.e+1:null,e,20)},O.toFormat=function(t,e){var i=A(this,null!=t&&q(t,0,M,21)?~~t+this.e+1:null,e,21);if(this.c){var n,r=i.split("."),a=+V.groupSize,o=+V.secondaryGroupSize,s=V.groupSeparator,l=r[0],h=r[1],f=this.s<0,c=f?l.slice(1):l,u=c.length;if(o&&(n=a,a=o,o=n,u-=n),a>0&&u>0){for(n=u%a||a,l=c.substr(0,n);u>n;n+=a)l+=s+c.substr(n,a);o>0&&(l+=s+c.slice(n)),f&&(l="-"+l)}i=h?l+V.decimalSeparator+((o=+V.fractionGroupSize)?h.replace(new RegExp("\\d{"+o+"}\\B","g"),"$&"+V.fractionGroupSeparator):h):l}return i},O.toFraction=function(t){var i,n,r,o,s,l,h,f,c,u=G,p=this,d=p.c,m=new e(D),g=n=new e(D),b=h=new e(D);if(null!=t&&(G=!1,l=new e(t),G=u,(u=l.isInt())&&!l.lt(D)||(G&&L(22,"max denominator "+(u?"out of range":"not an integer"),t),t=!u&&l.c&&C(l,l.e+1,1).gte(D)?l:null)),!d)return p.toString();for(c=a(d),o=m.e=c.length-p.e-1,m.c[0]=S[(s=o%k)<0?k+s:s],t=!t||l.cmp(m)>0?o>0?m:g:l,s=W,W=1/0,l=new e(c),h.c[0]=0;f=B(l,m,0,1),r=n.plus(f.times(b)),1!=r.cmp(t);)n=b,b=r,g=h.plus(f.times(r=g)),h=r,m=l.minus(f.times(r=m)),l=r;return r=B(t.minus(n),b,0,1),h=h.plus(r.times(g)),n=n.plus(r.times(b)),h.s=g.s=p.s,o*=2,i=B(g,b,o,N).minus(p).abs().cmp(B(h,n,o,N).minus(p).abs())<1?[g.toString(),b.toString()]:[h.toString(),n.toString()],W=s,i},O.toNumber=function(){return+this},O.toPower=O.pow=function(t,i){var n,r,a,o=b(0>t?-t:+t),s=this;if(null!=i&&(z=23,i=new e(i)),!q(t,-E,E,23,"exponent")&&(!isFinite(t)||o>E&&(t/=0)||parseFloat(t)!=t&&!(t=NaN))||0==t)return n=Math.pow(+s,t),new e(i?n%i:n);for(i?t>1&&s.gt(D)&&s.isInt()&&i.gt(D)&&i.isInt()?s=s.mod(i):(a=i,i=null):X&&(n=g(X/k+2)),r=new e(D);;){if(o%2){if(r=r.times(s),!r.c)break;n?r.c.length>n&&(r.c.length=n):i&&(r=r.mod(i))}if(o=b(o/2),!o)break;s=s.times(s),n?s.c&&s.c.length>n&&(s.c.length=n):i&&(s=s.mod(i))}return i?r:(0>t&&(r=D.div(r)),a?r.mod(a):n?C(r,X,N):r)},O.toPrecision=function(t,e){return A(this,null!=t&&q(t,1,M,24,"precision")?0|t:null,e,24)},O.toString=function(t){var e,n=this,r=n.s,o=n.e;return null===o?r?(e="Infinity",0>r&&(e="-"+e)):e="NaN":(e=a(n.c),e=null!=t&&q(t,2,64,25,"base")?i(c(e,o),0|t,10,r):F>=o||o>=j?f(e,o):c(e,o),0>r&&n.c[0]&&(e="-"+e)),e},O.truncated=O.trunc=function(){return C(new e(this),this.e+1,1)},O.valueOf=O.toJSON=function(){var t,e=this,i=e.e;return null===i?e.toString():(t=a(e.c),t=F>=i||i>=j?f(t,i):c(t,i),e.s<0?"-"+t:t)},null!=t&&e.config(t),e}function r(t){var e=0|t;return t>0||t===e?e:e-1}function a(t){for(var e,i,n=1,r=t.length,a=t[0]+"";r>n;){for(e=t[n++]+"",i=k-e.length;i--;e="0"+e);a+=e}for(r=a.length;48===a.charCodeAt(--r););return a.slice(0,r+1||1)}function o(t,e){var i,n,r=t.c,a=e.c,o=t.s,s=e.s,l=t.e,h=e.e;if(!o||!s)return null;if(i=r&&!r[0],n=a&&!a[0],i||n)return i?n?0:-s:o;if(o!=s)return o;if(i=0>o,n=l==h,!r||!a)return n?0:!r^i?1:-1;if(!n)return l>h^i?1:-1;for(s=(l=r.length)<(h=a.length)?l:h,o=0;s>o;o++)if(r[o]!=a[o])return r[o]>a[o]^i?1:-1;return l==h?0:l>h^i?1:-1}function s(t,e,i){return(t=u(t))>=e&&i>=t}function l(t){return"[object Array]"==Object.prototype.toString.call(t)}function h(t,e,i){for(var n,r,a=[0],o=0,s=t.length;s>o;){for(r=a.length;r--;a[r]*=e);for(a[n=0]+=y.indexOf(t.charAt(o++));n<a.length;n++)a[n]>i-1&&(null==a[n+1]&&(a[n+1]=0),a[n+1]+=a[n]/i|0,a[n]%=i)}return a.reverse()}function f(t,e){return(t.length>1?t.charAt(0)+"."+t.slice(1):t)+(0>e?"e":"e+")+e}function c(t,e){var i,n;if(0>e){for(n="0.";++e;n+="0");t=n+t}else if(i=t.length,++e>i){for(n="0",e-=i;--e;n+="0");t+=n}else i>e&&(t=t.slice(0,e)+"."+t.slice(e));return t}function u(t){return t=parseFloat(t),0>t?g(t):b(t)}var p,d,m=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,g=Math.ceil,b=Math.floor,v=" not a boolean or binary digit",w="rounding mode",_="number type has more than 15 significant digits",y="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",x=1e14,k=14,E=9007199254740991,S=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],I=1e7,M=1e9;if("undefined"!=typeof crypto&&(p=crypto),"function"==typeof define&&define.amd)define(function(){return n()});else if("undefined"!=typeof e&&e.exports){if(e.exports=n(),!p)try{p=t("crypto")}catch(A){}}else i||(i="undefined"!=typeof self?self:Function("return this")()),i.BigNumber=n()}(this)},{}],5:[function(t,e,i){var n=t("./lib/encoder"),r=t("./lib/decoder");e.exports={encode:n,decode:r}},{"./lib/decoder":6,"./lib/encoder":7}],6:[function(t,e,i){(function(t){function i(t){if(this.pos=0,this.buffer=t,this.flag=this.buffer.toString("utf-8",0,this.pos+=2),"BM"!=this.flag)throw new Error("Invalid BMP File");this.parseHeader(),this.parseBGR()}i.prototype.parseHeader=function(){if(this.fileSize=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.reserved=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.offset=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.headerSize=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.width=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.height=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.planes=this.buffer.readUInt16LE(this.pos),this.pos+=2,this.bitPP=this.buffer.readUInt16LE(this.pos),this.pos+=2,this.compress=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.rawSize=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.hr=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.vr=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.colors=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.importantColors=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.bitPP<24){var t=1<<this.bitPP;this.palette=new Array(t);for(var e=0;t>e;e++){var i=this.buffer.readUInt8(this.pos++),n=this.buffer.readUInt8(this.pos++),r=this.buffer.readUInt8(this.pos++),a=this.buffer.readUInt8(this.pos++);this.palette[e]={red:r,green:n,blue:i,quad:a}}}},i.prototype.parseBGR=function(){this.pos=this.offset;try{var e="bit"+this.bitPP,i=this.width*this.height*4;this.data=new t(i),this[e]()}catch(n){console.log("bit decode error:"+n)}},i.prototype.bit1=function(){for(var t=Math.ceil(this.width/8),e=t%4,i=this.height-1;i>=0;i--){for(var n=0;t>n;n++)for(var r=this.buffer.readUInt8(this.pos++),a=i*this.width*4+8*n*4,o=0;8>o&&8*n+o<this.width;o++){var s=this.palette[r>>7-o&1];this.data[a+4*o]=s.blue,this.data[a+4*o+1]=s.green,this.data[a+4*o+2]=s.red,this.data[a+4*o+3]=255}0!=e&&(this.pos+=4-e)}},i.prototype.bit4=function(){for(var t=Math.ceil(this.width/2),e=t%4,i=this.height-1;i>=0;i--){for(var n=0;t>n;n++){var r=this.buffer.readUInt8(this.pos++),a=i*this.width*4+2*n*4,o=r>>4,s=15&r,l=this.palette[o];if(this.data[a]=l.blue,this.data[a+1]=l.green,this.data[a+2]=l.red,this.data[a+3]=255,2*n+1>=this.width)break;l=this.palette[s],this.data[a+4]=l.blue,this.data[a+4+1]=l.green,this.data[a+4+2]=l.red,this.data[a+4+3]=255}0!=e&&(this.pos+=4-e)}},i.prototype.bit8=function(){for(var t=this.width%4,e=this.height-1;e>=0;e--){for(var i=0;i<this.width;i++){var n=this.buffer.readUInt8(this.pos++),r=e*this.width*4+4*i,a=this.palette[n];this.data[r]=a.blue,this.data[r+1]=a.green,this.data[r+2]=a.red,this.data[r+3]=255}0!=t&&(this.pos+=4-t)}},i.prototype.bit24=function(){for(var t=this.height-1;t>=0;t--){for(var e=0;e<this.width;e++){var i=this.buffer.readUInt8(this.pos++),n=this.buffer.readUInt8(this.pos++),r=this.buffer.readUInt8(this.pos++),a=t*this.width*4+4*e;this.data[a]=r,this.data[a+1]=n,this.data[a+2]=i,this.data[a+3]=255}this.pos+=this.width%4}},i.prototype.getData=function(){return this.data},e.exports=decode=function(t){var e=new i(t);return{data:e.getData(),width:e.width,height:e.height}}}).call(this,t("buffer").Buffer)},{buffer:14}],7:[function(t,e,i){(function(t){function i(t){this.buffer=t.data,this.width=t.width,this.height=t.height,this.extraBytes=this.width%4,this.rgbSize=this.height*(3*this.width+this.extraBytes),this.headerInfoSize=40,this.data=[],this.flag="BM",this.reserved=0,this.offset=54,this.fileSize=this.rgbSize+this.offset,this.planes=1,this.bitPP=24,this.compress=0,this.hr=0,this.vr=0,this.colors=0,this.importantColors=0}i.prototype.encode=function(){var e=new t(this.offset+this.rgbSize);this.pos=0,e.write(this.flag,this.pos,2),this.pos+=2,e.writeUInt32LE(this.fileSize,this.pos),this.pos+=4,e.writeUInt32LE(this.reserved,this.pos),this.pos+=4,e.writeUInt32LE(this.offset,this.pos),this.pos+=4,e.writeUInt32LE(this.headerInfoSize,this.pos),this.pos+=4,e.writeUInt32LE(this.width,this.pos),this.pos+=4,e.writeUInt32LE(this.height,this.pos),this.pos+=4,e.writeUInt16LE(this.planes,this.pos),this.pos+=2,e.writeUInt16LE(this.bitPP,this.pos),this.pos+=2,e.writeUInt32LE(this.compress,this.pos),this.pos+=4,e.writeUInt32LE(this.rgbSize,this.pos),this.pos+=4,e.writeUInt32LE(this.hr,this.pos),this.pos+=4,e.writeUInt32LE(this.vr,this.pos),this.pos+=4,e.writeUInt32LE(this.colors,this.pos),this.pos+=4,e.writeUInt32LE(this.importantColors,this.pos),this.pos+=4;for(var i=0,n=3*this.width+this.extraBytes,r=this.height-1;r>=0;r--){for(var a=0;a<this.width;a++){var o=this.pos+r*n+3*a;e[o+2]=this.buffer[i++],e[o+1]=this.buffer[i++],e[o]=this.buffer[i++],i++}if(this.extraBytes>0){var s=this.pos+r*n+3*this.width;e.fill(0,s,s+this.extraBytes)}}return e},e.exports=encode=function(t,e){"undefined"==typeof e&&(e=100);var n=new i(t),r=n.encode();return{data:r,width:t.width,height:t.height}}}).call(this,t("buffer").Buffer)},{buffer:14}],8:[function(t,e,i){},{}],9:[function(t,e,i){(function(e,n){function r(t){if(t<i.DEFLATE||t>i.UNZIP)throw new TypeError("Bad argument");this.mode=t,this.init_done=!1,this.write_in_progress=!1,this.pending_close=!1,this.windowBits=0,this.level=0,this.memLevel=0,this.strategy=0,this.dictionary=null}function a(t,e){for(var i=0;i<t.length;i++)this[e+i]=t[i]}var o=t("pako/lib/zlib/messages"),s=t("pako/lib/zlib/zstream"),l=t("pako/lib/zlib/deflate.js"),h=t("pako/lib/zlib/inflate.js"),f=t("pako/lib/zlib/constants");for(var c in f)i[c]=f[c];i.NONE=0,i.DEFLATE=1,i.INFLATE=2,i.GZIP=3,i.GUNZIP=4,i.DEFLATERAW=5,i.INFLATERAW=6,i.UNZIP=7,r.prototype.init=function(t,e,n,r,a){switch(this.windowBits=t,this.level=e,this.memLevel=n,this.strategy=r,this.mode!==i.GZIP&&this.mode!==i.GUNZIP||(this.windowBits+=16),this.mode===i.UNZIP&&(this.windowBits+=32),this.mode!==i.DEFLATERAW&&this.mode!==i.INFLATERAW||(this.windowBits=-this.windowBits),this.strm=new s,this.mode){case i.DEFLATE:case i.GZIP:case i.DEFLATERAW:var o=l.deflateInit2(this.strm,this.level,i.Z_DEFLATED,this.windowBits,this.memLevel,this.strategy);break;case i.INFLATE:case i.GUNZIP:case i.INFLATERAW:case i.UNZIP:var o=h.inflateInit2(this.strm,this.windowBits);break;default:throw new Error("Unknown mode "+this.mode)}return o!==i.Z_OK?void this._error(o):(this.write_in_progress=!1,void(this.init_done=!0))},r.prototype.params=function(){throw new Error("deflateParams Not supported")},r.prototype._writeCheck=function(){if(!this.init_done)throw new Error("write before init");if(this.mode===i.NONE)throw new Error("already finalized");if(this.write_in_progress)throw new Error("write already in progress");if(this.pending_close)throw new Error("close is pending")},r.prototype.write=function(t,i,n,r,a,o,s){this._writeCheck(),this.write_in_progress=!0;var l=this;return e.nextTick(function(){l.write_in_progress=!1;var e=l._write(t,i,n,r,a,o,s);l.callback(e[0],e[1]),l.pending_close&&l.close()}),this},r.prototype.writeSync=function(t,e,i,n,r,a,o){return this._writeCheck(),this._write(t,e,i,n,r,a,o)},r.prototype._write=function(t,e,r,o,s,f,c){if(this.write_in_progress=!0,t!==i.Z_NO_FLUSH&&t!==i.Z_PARTIAL_FLUSH&&t!==i.Z_SYNC_FLUSH&&t!==i.Z_FULL_FLUSH&&t!==i.Z_FINISH&&t!==i.Z_BLOCK)throw new Error("Invalid flush value");null==e&&(e=new n(0),o=0,r=0),s._set?s.set=s._set:s.set=a;var u=this.strm;switch(u.avail_in=o,u.input=e,u.next_in=r,u.avail_out=c,u.output=s,u.next_out=f,this.mode){case i.DEFLATE:case i.GZIP:case i.DEFLATERAW:var p=l.deflate(u,t);break;case i.UNZIP:case i.INFLATE:case i.GUNZIP:case i.INFLATERAW:var p=h.inflate(u,t);break;default:throw new Error("Unknown mode "+this.mode)}return p!==i.Z_STREAM_END&&p!==i.Z_OK&&this._error(p),this.write_in_progress=!1,[u.avail_in,u.avail_out]},r.prototype.close=function(){return this.write_in_progress?void(this.pending_close=!0):(this.pending_close=!1,this.mode===i.DEFLATE||this.mode===i.GZIP||this.mode===i.DEFLATERAW?l.deflateEnd(this.strm):h.inflateEnd(this.strm),void(this.mode=i.NONE))},r.prototype.reset=function(){switch(this.mode){case i.DEFLATE:case i.DEFLATERAW:var t=l.deflateReset(this.strm);break;case i.INFLATE:case i.INFLATERAW:var t=h.inflateReset(this.strm)}t!==i.Z_OK&&this._error(t)},r.prototype._error=function(t){this.onerror(o[t]+": "+this.strm.msg,t),this.write_in_progress=!1,this.pending_close&&this.close()},i.Zlib=r}).call(this,t("_process"),t("buffer").Buffer);
},{_process:12,buffer:14,"pako/lib/zlib/constants":46,"pako/lib/zlib/deflate.js":48,"pako/lib/zlib/inflate.js":50,"pako/lib/zlib/messages":52,"pako/lib/zlib/zstream":54}],10:[function(t,e,i){(function(e,n){function r(t,e,i){function r(){for(var e;null!==(e=t.read());)s.push(e),l+=e.length;t.once("readable",r)}function a(e){t.removeListener("end",o),t.removeListener("readable",r),i(e)}function o(){var e=n.concat(s,l);s=[],i(null,e),t.close()}var s=[],l=0;t.on("error",a),t.on("end",o),t.end(e),r()}function a(t,e){if("string"==typeof e&&(e=new n(e)),!n.isBuffer(e))throw new TypeError("Not a string or buffer");var i=m.Z_FINISH;return t._processChunk(e,i)}function o(t){return this instanceof o?void p.call(this,t,m.DEFLATE):new o(t)}function s(t){return this instanceof s?void p.call(this,t,m.INFLATE):new s(t)}function l(t){return this instanceof l?void p.call(this,t,m.GZIP):new l(t)}function h(t){return this instanceof h?void p.call(this,t,m.GUNZIP):new h(t)}function f(t){return this instanceof f?void p.call(this,t,m.DEFLATERAW):new f(t)}function c(t){return this instanceof c?void p.call(this,t,m.INFLATERAW):new c(t)}function u(t){return this instanceof u?void p.call(this,t,m.UNZIP):new u(t)}function p(t,e){if(this._opts=t=t||{},this._chunkSize=t.chunkSize||i.Z_DEFAULT_CHUNK,d.call(this,t),t.flush&&t.flush!==m.Z_NO_FLUSH&&t.flush!==m.Z_PARTIAL_FLUSH&&t.flush!==m.Z_SYNC_FLUSH&&t.flush!==m.Z_FULL_FLUSH&&t.flush!==m.Z_FINISH&&t.flush!==m.Z_BLOCK)throw new Error("Invalid flush flag: "+t.flush);if(this._flushFlag=t.flush||m.Z_NO_FLUSH,t.chunkSize&&(t.chunkSize<i.Z_MIN_CHUNK||t.chunkSize>i.Z_MAX_CHUNK))throw new Error("Invalid chunk size: "+t.chunkSize);if(t.windowBits&&(t.windowBits<i.Z_MIN_WINDOWBITS||t.windowBits>i.Z_MAX_WINDOWBITS))throw new Error("Invalid windowBits: "+t.windowBits);if(t.level&&(t.level<i.Z_MIN_LEVEL||t.level>i.Z_MAX_LEVEL))throw new Error("Invalid compression level: "+t.level);if(t.memLevel&&(t.memLevel<i.Z_MIN_MEMLEVEL||t.memLevel>i.Z_MAX_MEMLEVEL))throw new Error("Invalid memLevel: "+t.memLevel);if(t.strategy&&t.strategy!=i.Z_FILTERED&&t.strategy!=i.Z_HUFFMAN_ONLY&&t.strategy!=i.Z_RLE&&t.strategy!=i.Z_FIXED&&t.strategy!=i.Z_DEFAULT_STRATEGY)throw new Error("Invalid strategy: "+t.strategy);if(t.dictionary&&!n.isBuffer(t.dictionary))throw new Error("Invalid dictionary: it should be a Buffer instance");this._binding=new m.Zlib(e);var r=this;this._hadError=!1,this._binding.onerror=function(t,e){r._binding=null,r._hadError=!0;var n=new Error(t);n.errno=e,n.code=i.codes[e],r.emit("error",n)};var a=i.Z_DEFAULT_COMPRESSION;"number"==typeof t.level&&(a=t.level);var o=i.Z_DEFAULT_STRATEGY;"number"==typeof t.strategy&&(o=t.strategy),this._binding.init(t.windowBits||i.Z_DEFAULT_WINDOWBITS,a,t.memLevel||i.Z_DEFAULT_MEMLEVEL,o,t.dictionary),this._buffer=new n(this._chunkSize),this._offset=0,this._closed=!1,this._level=a,this._strategy=o,this.once("end",this.close)}var d=t("_stream_transform"),m=t("./binding"),g=t("util"),b=t("assert").ok;m.Z_MIN_WINDOWBITS=8,m.Z_MAX_WINDOWBITS=15,m.Z_DEFAULT_WINDOWBITS=15,m.Z_MIN_CHUNK=64,m.Z_MAX_CHUNK=1/0,m.Z_DEFAULT_CHUNK=16384,m.Z_MIN_MEMLEVEL=1,m.Z_MAX_MEMLEVEL=9,m.Z_DEFAULT_MEMLEVEL=8,m.Z_MIN_LEVEL=-1,m.Z_MAX_LEVEL=9,m.Z_DEFAULT_LEVEL=m.Z_DEFAULT_COMPRESSION,Object.keys(m).forEach(function(t){t.match(/^Z/)&&(i[t]=m[t])}),i.codes={Z_OK:m.Z_OK,Z_STREAM_END:m.Z_STREAM_END,Z_NEED_DICT:m.Z_NEED_DICT,Z_ERRNO:m.Z_ERRNO,Z_STREAM_ERROR:m.Z_STREAM_ERROR,Z_DATA_ERROR:m.Z_DATA_ERROR,Z_MEM_ERROR:m.Z_MEM_ERROR,Z_BUF_ERROR:m.Z_BUF_ERROR,Z_VERSION_ERROR:m.Z_VERSION_ERROR},Object.keys(i.codes).forEach(function(t){i.codes[i.codes[t]]=t}),i.Deflate=o,i.Inflate=s,i.Gzip=l,i.Gunzip=h,i.DeflateRaw=f,i.InflateRaw=c,i.Unzip=u,i.createDeflate=function(t){return new o(t)},i.createInflate=function(t){return new s(t)},i.createDeflateRaw=function(t){return new f(t)},i.createInflateRaw=function(t){return new c(t)},i.createGzip=function(t){return new l(t)},i.createGunzip=function(t){return new h(t)},i.createUnzip=function(t){return new u(t)},i.deflate=function(t,e,i){return"function"==typeof e&&(i=e,e={}),r(new o(e),t,i)},i.deflateSync=function(t,e){return a(new o(e),t)},i.gzip=function(t,e,i){return"function"==typeof e&&(i=e,e={}),r(new l(e),t,i)},i.gzipSync=function(t,e){return a(new l(e),t)},i.deflateRaw=function(t,e,i){return"function"==typeof e&&(i=e,e={}),r(new f(e),t,i)},i.deflateRawSync=function(t,e){return a(new f(e),t)},i.unzip=function(t,e,i){return"function"==typeof e&&(i=e,e={}),r(new u(e),t,i)},i.unzipSync=function(t,e){return a(new u(e),t)},i.inflate=function(t,e,i){return"function"==typeof e&&(i=e,e={}),r(new s(e),t,i)},i.inflateSync=function(t,e){return a(new s(e),t)},i.gunzip=function(t,e,i){return"function"==typeof e&&(i=e,e={}),r(new h(e),t,i)},i.gunzipSync=function(t,e){return a(new h(e),t)},i.inflateRaw=function(t,e,i){return"function"==typeof e&&(i=e,e={}),r(new c(e),t,i)},i.inflateRawSync=function(t,e){return a(new c(e),t)},g.inherits(p,d),p.prototype.params=function(t,n,r){if(t<i.Z_MIN_LEVEL||t>i.Z_MAX_LEVEL)throw new RangeError("Invalid compression level: "+t);if(n!=i.Z_FILTERED&&n!=i.Z_HUFFMAN_ONLY&&n!=i.Z_RLE&&n!=i.Z_FIXED&&n!=i.Z_DEFAULT_STRATEGY)throw new TypeError("Invalid strategy: "+n);if(this._level!==t||this._strategy!==n){var a=this;this.flush(m.Z_SYNC_FLUSH,function(){a._binding.params(t,n),a._hadError||(a._level=t,a._strategy=n,r&&r())})}else e.nextTick(r)},p.prototype.reset=function(){return this._binding.reset()},p.prototype._flush=function(t){this._transform(new n(0),"",t)},p.prototype.flush=function(t,i){var r=this._writableState;if(("function"==typeof t||void 0===t&&!i)&&(i=t,t=m.Z_FULL_FLUSH),r.ended)i&&e.nextTick(i);else if(r.ending)i&&this.once("end",i);else if(r.needDrain){var a=this;this.once("drain",function(){a.flush(i)})}else this._flushFlag=t,this.write(new n(0),"",i)},p.prototype.close=function(t){if(t&&e.nextTick(t),!this._closed){this._closed=!0,this._binding.close();var i=this;e.nextTick(function(){i.emit("close")})}},p.prototype._transform=function(t,e,i){var r,a=this._writableState,o=a.ending||a.ended,s=o&&(!t||a.length===t.length);if(null===!t&&!n.isBuffer(t))return i(new Error("invalid input"));s?r=m.Z_FINISH:(r=this._flushFlag,t.length>=a.length&&(this._flushFlag=this._opts.flush||m.Z_NO_FLUSH));this._processChunk(t,r,i)},p.prototype._processChunk=function(t,e,i){function r(f,p){if(!l._hadError){var d=o-p;if(b(d>=0,"have should not go down"),d>0){var m=l._buffer.slice(l._offset,l._offset+d);l._offset+=d,h?l.push(m):(c.push(m),u+=m.length)}if((0===p||l._offset>=l._chunkSize)&&(o=l._chunkSize,l._offset=0,l._buffer=new n(l._chunkSize)),0===p){if(s+=a-f,a=f,!h)return!0;var g=l._binding.write(e,t,s,a,l._buffer,l._offset,l._chunkSize);return g.callback=r,void(g.buffer=t)}return h?void i():!1}}var a=t&&t.length,o=this._chunkSize-this._offset,s=0,l=this,h="function"==typeof i;if(!h){var f,c=[],u=0;this.on("error",function(t){f=t});do var p=this._binding.writeSync(e,t,s,a,this._buffer,this._offset,o);while(!this._hadError&&r(p[0],p[1]));if(this._hadError)throw f;var d=n.concat(c,u);return this.close(),d}var m=this._binding.write(e,t,s,a,this._buffer,this._offset,o);m.buffer=t,m.callback=r},g.inherits(o,p),g.inherits(s,p),g.inherits(l,p),g.inherits(h,p),g.inherits(f,p),g.inherits(c,p),g.inherits(u,p)}).call(this,t("_process"),t("buffer").Buffer)},{"./binding":9,_process:12,_stream_transform:93,assert:2,buffer:14,util:104}],11:[function(t,e,i){arguments[4][8][0].apply(i,arguments)},{dup:8}],12:[function(t,e,i){function n(){f=!1,s.length?h=s.concat(h):c=-1,h.length&&r()}function r(){if(!f){var t=setTimeout(n);f=!0;for(var e=h.length;e;){for(s=h,h=[];++c<e;)s&&s[c].run();c=-1,e=h.length}s=null,f=!1,clearTimeout(t)}}function a(t,e){this.fun=t,this.array=e}function o(){}var s,l=e.exports={},h=[],f=!1,c=-1;l.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];h.push(new a(t,e)),1!==h.length||f||setTimeout(r,0)},a.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=o,l.addListener=o,l.once=o,l.off=o,l.removeListener=o,l.removeAllListeners=o,l.emit=o,l.binding=function(t){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(t){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},{}],13:[function(t,e,i){var n=t("buffer").Buffer;e.exports=function(t,e){if(n.isBuffer(t)&&n.isBuffer(e)){if("function"==typeof t.equals)return t.equals(e);if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(t[i]!==e[i])return!1;return!0}}},{buffer:14}],14:[function(t,e,i){(function(e){"use strict";function n(){try{var t=new Uint8Array(1);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(e){return!1}}function r(){return o.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t,e){if(r()<e)throw new RangeError("Invalid typed array length");return o.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=o.prototype):(null===t&&(t=new o(e)),t.length=e),t}function o(t,e,i){if(!(o.TYPED_ARRAY_SUPPORT||this instanceof o))return new o(t,e,i);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return f(this,t)}return s(this,t,e,i)}function s(t,e,i,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?p(t,e,i,n):"string"==typeof e?c(t,e,i):d(t,e)}function l(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number')}function h(t,e,i,n){return l(e),0>=e?a(t,e):void 0!==i?"string"==typeof n?a(t,e).fill(i,n):a(t,e).fill(i):a(t,e)}function f(t,e){if(l(e),t=a(t,0>e?0:0|m(e)),!o.TYPED_ARRAY_SUPPORT)for(var i=0;e>i;i++)t[i]=0;return t}function c(t,e,i){if("string"==typeof i&&""!==i||(i="utf8"),!o.isEncoding(i))throw new TypeError('"encoding" must be a valid string encoding');var n=0|b(e,i);return t=a(t,n),t.write(e,i),t}function u(t,e){var i=0|m(e.length);t=a(t,i);for(var n=0;i>n;n+=1)t[n]=255&e[n];return t}function p(t,e,i,n){if(e.byteLength,0>i||e.byteLength<i)throw new RangeError("'offset' is out of bounds");if(e.byteLength<i+(n||0))throw new RangeError("'length' is out of bounds");return e=void 0===n?new Uint8Array(e,i):new Uint8Array(e,i,n),o.TYPED_ARRAY_SUPPORT?(t=e,t.__proto__=o.prototype):t=u(t,e),t}function d(t,e){if(o.isBuffer(e)){var i=0|m(e.length);return t=a(t,i),0===t.length?t:(e.copy(t,0,0,i),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||V(e.length)?a(t,0):u(t,e);if("Buffer"===e.type&&K(e.data))return u(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function m(t){if(t>=r())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+r().toString(16)+" bytes");return 0|t}function g(t){return+t!=t&&(t=0),o.alloc(+t)}function b(t,e){if(o.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var i=t.length;if(0===i)return 0;for(var n=!1;;)switch(e){case"ascii":case"binary":case"raw":case"raws":return i;case"utf8":case"utf-8":case void 0:return G(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*i;case"hex":return i>>>1;case"base64":return Y(t).length;default:if(n)return G(t).length;e=(""+e).toLowerCase(),n=!0}}function v(t,e,i){var n=!1;if((void 0===e||0>e)&&(e=0),e>this.length)return"";if((void 0===i||i>this.length)&&(i=this.length),0>=i)return"";if(i>>>=0,e>>>=0,e>=i)return"";for(t||(t="utf8");;)switch(t){case"hex":return L(this,e,i);case"utf8":case"utf-8":return A(this,e,i);case"ascii":return T(this,e,i);case"binary":return P(this,e,i);case"base64":return M(this,e,i);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return C(this,e,i);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function w(t,e,i){var n=t[e];t[e]=t[i],t[i]=n}function _(t,e,i,n){function r(t,e){return 1===a?t[e]:t.readUInt16BE(e*a)}var a=1,o=t.length,s=e.length;if(void 0!==n&&(n=String(n).toLowerCase(),"ucs2"===n||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;a=2,o/=2,s/=2,i/=2}for(var l=-1,h=0;o>i+h;h++)if(r(t,i+h)===r(e,-1===l?0:h-l)){if(-1===l&&(l=h),h-l+1===s)return(i+l)*a}else-1!==l&&(h-=h-l),l=-1;return-1}function y(t,e,i,n){i=Number(i)||0;var r=t.length-i;n?(n=Number(n),n>r&&(n=r)):n=r;var a=e.length;if(a%2!==0)throw new Error("Invalid hex string");n>a/2&&(n=a/2);for(var o=0;n>o;o++){var s=parseInt(e.substr(2*o,2),16);if(isNaN(s))return o;t[i+o]=s}return o}function x(t,e,i,n){return X(G(e,t.length-i),t,i,n)}function k(t,e,i,n){return X(q(e),t,i,n)}function E(t,e,i,n){return k(t,e,i,n)}function S(t,e,i,n){return X(Y(e),t,i,n)}function I(t,e,i,n){return X(Z(e,t.length-i),t,i,n)}function M(t,e,i){return 0===e&&i===t.length?J.fromByteArray(t):J.fromByteArray(t.slice(e,i))}function A(t,e,i){i=Math.min(t.length,i);for(var n=[],r=e;i>r;){var a=t[r],o=null,s=a>239?4:a>223?3:a>191?2:1;if(i>=r+s){var l,h,f,c;switch(s){case 1:128>a&&(o=a);break;case 2:l=t[r+1],128===(192&l)&&(c=(31&a)<<6|63&l,c>127&&(o=c));break;case 3:l=t[r+1],h=t[r+2],128===(192&l)&&128===(192&h)&&(c=(15&a)<<12|(63&l)<<6|63&h,c>2047&&(55296>c||c>57343)&&(o=c));break;case 4:l=t[r+1],h=t[r+2],f=t[r+3],128===(192&l)&&128===(192&h)&&128===(192&f)&&(c=(15&a)<<18|(63&l)<<12|(63&h)<<6|63&f,c>65535&&1114112>c&&(o=c))}}null===o?(o=65533,s=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),r+=s}return R(n)}function R(t){var e=t.length;if(Q>=e)return String.fromCharCode.apply(String,t);for(var i="",n=0;e>n;)i+=String.fromCharCode.apply(String,t.slice(n,n+=Q));return i}function T(t,e,i){var n="";i=Math.min(t.length,i);for(var r=e;i>r;r++)n+=String.fromCharCode(127&t[r]);return n}function P(t,e,i){var n="";i=Math.min(t.length,i);for(var r=e;i>r;r++)n+=String.fromCharCode(t[r]);return n}function L(t,e,i){var n=t.length;(!e||0>e)&&(e=0),(!i||0>i||i>n)&&(i=n);for(var r="",a=e;i>a;a++)r+=W(t[a]);return r}function C(t,e,i){for(var n=t.slice(e,i),r="",a=0;a<n.length;a+=2)r+=String.fromCharCode(n[a]+256*n[a+1]);return r}function B(t,e,i){if(t%1!==0||0>t)throw new RangeError("offset is not uint");if(t+e>i)throw new RangeError("Trying to access beyond buffer length")}function z(t,e,i,n,r,a){if(!o.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>r||a>e)throw new RangeError('"value" argument is out of bounds');if(i+n>t.length)throw new RangeError("Index out of range")}function O(t,e,i,n){0>e&&(e=65535+e+1);for(var r=0,a=Math.min(t.length-i,2);a>r;r++)t[i+r]=(e&255<<8*(n?r:1-r))>>>8*(n?r:1-r)}function D(t,e,i,n){0>e&&(e=4294967295+e+1);for(var r=0,a=Math.min(t.length-i,4);a>r;r++)t[i+r]=e>>>8*(n?r:3-r)&255}function U(t,e,i,n,r,a){if(i+n>t.length)throw new RangeError("Index out of range");if(0>i)throw new RangeError("Index out of range")}function N(t,e,i,n,r){return r||U(t,e,i,4,3.4028234663852886e38,-3.4028234663852886e38),$.write(t,e,i,n,23,4),i+4}function F(t,e,i,n,r){return r||U(t,e,i,8,1.7976931348623157e308,-1.7976931348623157e308),$.write(t,e,i,n,52,8),i+8}function j(t){if(t=H(t).replace(tt,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function H(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function W(t){return 16>t?"0"+t.toString(16):t.toString(16)}function G(t,e){e=e||1/0;for(var i,n=t.length,r=null,a=[],o=0;n>o;o++){if(i=t.charCodeAt(o),i>55295&&57344>i){if(!r){if(i>56319){(e-=3)>-1&&a.push(239,191,189);continue}if(o+1===n){(e-=3)>-1&&a.push(239,191,189);continue}r=i;continue}if(56320>i){(e-=3)>-1&&a.push(239,191,189),r=i;continue}i=(r-55296<<10|i-56320)+65536}else r&&(e-=3)>-1&&a.push(239,191,189);if(r=null,128>i){if((e-=1)<0)break;a.push(i)}else if(2048>i){if((e-=2)<0)break;a.push(i>>6|192,63&i|128)}else if(65536>i){if((e-=3)<0)break;a.push(i>>12|224,i>>6&63|128,63&i|128)}else{if(!(1114112>i))throw new Error("Invalid code point");if((e-=4)<0)break;a.push(i>>18|240,i>>12&63|128,i>>6&63|128,63&i|128)}}return a}function q(t){for(var e=[],i=0;i<t.length;i++)e.push(255&t.charCodeAt(i));return e}function Z(t,e){for(var i,n,r,a=[],o=0;o<t.length&&!((e-=2)<0);o++)i=t.charCodeAt(o),n=i>>8,r=i%256,a.push(r),a.push(n);return a}function Y(t){return J.toByteArray(j(t))}function X(t,e,i,n){for(var r=0;n>r&&!(r+i>=e.length||r>=t.length);r++)e[r+i]=t[r];return r}function V(t){return t!==t}var J=t("base64-js"),$=t("ieee754"),K=t("isarray");i.Buffer=o,i.SlowBuffer=g,i.INSPECT_MAX_BYTES=50,o.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:n(),i.kMaxLength=r(),o.poolSize=8192,o._augment=function(t){return t.__proto__=o.prototype,t},o.from=function(t,e,i){return s(null,t,e,i)},o.TYPED_ARRAY_SUPPORT&&(o.prototype.__proto__=Uint8Array.prototype,o.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&o[Symbol.species]===o&&Object.defineProperty(o,Symbol.species,{value:null,configurable:!0})),o.alloc=function(t,e,i){return h(null,t,e,i)},o.allocUnsafe=function(t){return f(null,t)},o.allocUnsafeSlow=function(t){return f(null,t)},o.isBuffer=function(t){return!(null==t||!t._isBuffer)},o.compare=function(t,e){if(!o.isBuffer(t)||!o.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var i=t.length,n=e.length,r=0,a=Math.min(i,n);a>r;++r)if(t[r]!==e[r]){i=t[r],n=e[r];break}return n>i?-1:i>n?1:0},o.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(t,e){if(!K(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return o.alloc(0);var i;if(void 0===e)for(e=0,i=0;i<t.length;i++)e+=t[i].length;var n=o.allocUnsafe(e),r=0;for(i=0;i<t.length;i++){var a=t[i];if(!o.isBuffer(a))throw new TypeError('"list" argument must be an Array of Buffers');a.copy(n,r),r+=a.length}return n},o.byteLength=b,o.prototype._isBuffer=!0,o.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;t>e;e+=2)w(this,e,e+1);return this},o.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;t>e;e+=4)w(this,e,e+3),w(this,e+1,e+2);return this},o.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?A(this,0,t):v.apply(this,arguments)},o.prototype.equals=function(t){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:0===o.compare(this,t)},o.prototype.inspect=function(){var t="",e=i.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},o.prototype.compare=function(t,e,i,n,r){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===i&&(i=t?t.length:0),void 0===n&&(n=0),void 0===r&&(r=this.length),0>e||i>t.length||0>n||r>this.length)throw new RangeError("out of range index");if(n>=r&&e>=i)return 0;if(n>=r)return-1;if(e>=i)return 1;if(e>>>=0,i>>>=0,n>>>=0,r>>>=0,this===t)return 0;for(var a=r-n,s=i-e,l=Math.min(a,s),h=this.slice(n,r),f=t.slice(e,i),c=0;l>c;++c)if(h[c]!==f[c]){a=h[c],s=f[c];break}return s>a?-1:a>s?1:0},o.prototype.indexOf=function(t,e,i){if("string"==typeof e?(i=e,e=0):e>2147483647?e=2147483647:-2147483648>e&&(e=-2147483648),e>>=0,0===this.length)return-1;if(e>=this.length)return-1;if(0>e&&(e=Math.max(this.length+e,0)),"string"==typeof t&&(t=o.from(t,i)),o.isBuffer(t))return 0===t.length?-1:_(this,t,e,i);if("number"==typeof t)return o.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,t,e):_(this,[t],e,i);throw new TypeError("val must be string, number or Buffer")},o.prototype.includes=function(t,e,i){return-1!==this.indexOf(t,e,i)},o.prototype.write=function(t,e,i,n){if(void 0===e)n="utf8",i=this.length,e=0;else if(void 0===i&&"string"==typeof e)n=e,i=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e=0|e,isFinite(i)?(i=0|i,void 0===n&&(n="utf8")):(n=i,i=void 0)}var r=this.length-e;if((void 0===i||i>r)&&(i=r),t.length>0&&(0>i||0>e)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var a=!1;;)switch(n){case"hex":return y(this,t,e,i);case"utf8":case"utf-8":return x(this,t,e,i);case"ascii":return k(this,t,e,i);case"binary":return E(this,t,e,i);case"base64":return S(this,t,e,i);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,t,e,i);default:if(a)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),a=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var Q=4096;o.prototype.slice=function(t,e){var i=this.length;t=~~t,e=void 0===e?i:~~e,0>t?(t+=i,0>t&&(t=0)):t>i&&(t=i),0>e?(e+=i,0>e&&(e=0)):e>i&&(e=i),t>e&&(e=t);var n;if(o.TYPED_ARRAY_SUPPORT)n=this.subarray(t,e),n.__proto__=o.prototype;else{var r=e-t;n=new o(r,void 0);for(var a=0;r>a;a++)n[a]=this[a+t]}return n},o.prototype.readUIntLE=function(t,e,i){t=0|t,e=0|e,i||B(t,e,this.length);for(var n=this[t],r=1,a=0;++a<e&&(r*=256);)n+=this[t+a]*r;return n},o.prototype.readUIntBE=function(t,e,i){t=0|t,e=0|e,i||B(t,e,this.length);for(var n=this[t+--e],r=1;e>0&&(r*=256);)n+=this[t+--e]*r;return n},o.prototype.readUInt8=function(t,e){return e||B(t,1,this.length),this[t]},o.prototype.readUInt16LE=function(t,e){return e||B(t,2,this.length),this[t]|this[t+1]<<8},o.prototype.readUInt16BE=function(t,e){return e||B(t,2,this.length),this[t]<<8|this[t+1]},o.prototype.readUInt32LE=function(t,e){return e||B(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},o.prototype.readUInt32BE=function(t,e){return e||B(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},o.prototype.readIntLE=function(t,e,i){t=0|t,e=0|e,i||B(t,e,this.length);for(var n=this[t],r=1,a=0;++a<e&&(r*=256);)n+=this[t+a]*r;return r*=128,n>=r&&(n-=Math.pow(2,8*e)),n},o.prototype.readIntBE=function(t,e,i){t=0|t,e=0|e,i||B(t,e,this.length);for(var n=e,r=1,a=this[t+--n];n>0&&(r*=256);)a+=this[t+--n]*r;return r*=128,a>=r&&(a-=Math.pow(2,8*e)),a},o.prototype.readInt8=function(t,e){return e||B(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},o.prototype.readInt16LE=function(t,e){e||B(t,2,this.length);var i=this[t]|this[t+1]<<8;return 32768&i?4294901760|i:i},o.prototype.readInt16BE=function(t,e){e||B(t,2,this.length);var i=this[t+1]|this[t]<<8;return 32768&i?4294901760|i:i},o.prototype.readInt32LE=function(t,e){return e||B(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},o.prototype.readInt32BE=function(t,e){return e||B(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},o.prototype.readFloatLE=function(t,e){return e||B(t,4,this.length),$.read(this,t,!0,23,4)},o.prototype.readFloatBE=function(t,e){return e||B(t,4,this.length),$.read(this,t,!1,23,4)},o.prototype.readDoubleLE=function(t,e){return e||B(t,8,this.length),$.read(this,t,!0,52,8)},o.prototype.readDoubleBE=function(t,e){return e||B(t,8,this.length),$.read(this,t,!1,52,8)},o.prototype.writeUIntLE=function(t,e,i,n){if(t=+t,e=0|e,i=0|i,!n){var r=Math.pow(2,8*i)-1;z(this,t,e,i,r,0)}var a=1,o=0;for(this[e]=255&t;++o<i&&(a*=256);)this[e+o]=t/a&255;return e+i},o.prototype.writeUIntBE=function(t,e,i,n){if(t=+t,e=0|e,i=0|i,!n){var r=Math.pow(2,8*i)-1;z(this,t,e,i,r,0)}var a=i-1,o=1;for(this[e+a]=255&t;--a>=0&&(o*=256);)this[e+a]=t/o&255;return e+i},o.prototype.writeUInt8=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,1,255,0),o.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},o.prototype.writeUInt16LE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):O(this,t,e,!0),e+2},o.prototype.writeUInt16BE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):O(this,t,e,!1),e+2},o.prototype.writeUInt32LE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):D(this,t,e,!0),e+4},o.prototype.writeUInt32BE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):D(this,t,e,!1),e+4},o.prototype.writeIntLE=function(t,e,i,n){if(t=+t,e=0|e,!n){var r=Math.pow(2,8*i-1);z(this,t,e,i,r-1,-r)}var a=0,o=1,s=0;for(this[e]=255&t;++a<i&&(o*=256);)0>t&&0===s&&0!==this[e+a-1]&&(s=1),this[e+a]=(t/o>>0)-s&255;return e+i},o.prototype.writeIntBE=function(t,e,i,n){if(t=+t,e=0|e,!n){var r=Math.pow(2,8*i-1);z(this,t,e,i,r-1,-r)}var a=i-1,o=1,s=0;for(this[e+a]=255&t;--a>=0&&(o*=256);)0>t&&0===s&&0!==this[e+a+1]&&(s=1),this[e+a]=(t/o>>0)-s&255;return e+i},o.prototype.writeInt8=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,1,127,-128),o.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),0>t&&(t=255+t+1),this[e]=255&t,e+1},o.prototype.writeInt16LE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):O(this,t,e,!0),e+2},o.prototype.writeInt16BE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):O(this,t,e,!1),e+2},o.prototype.writeInt32LE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,4,2147483647,-2147483648),o.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):D(this,t,e,!0),e+4},o.prototype.writeInt32BE=function(t,e,i){return t=+t,e=0|e,i||z(this,t,e,4,2147483647,-2147483648),0>t&&(t=4294967295+t+1),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):D(this,t,e,!1),e+4},o.prototype.writeFloatLE=function(t,e,i){return N(this,t,e,!0,i)},o.prototype.writeFloatBE=function(t,e,i){return N(this,t,e,!1,i)},o.prototype.writeDoubleLE=function(t,e,i){return F(this,t,e,!0,i)},o.prototype.writeDoubleBE=function(t,e,i){return F(this,t,e,!1,i)},o.prototype.copy=function(t,e,i,n){if(i||(i=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&i>n&&(n=i),n===i)return 0;if(0===t.length||0===this.length)return 0;if(0>e)throw new RangeError("targetStart out of bounds");if(0>i||i>=this.length)throw new RangeError("sourceStart out of bounds");if(0>n)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-i&&(n=t.length-e+i);var r,a=n-i;if(this===t&&e>i&&n>e)for(r=a-1;r>=0;r--)t[r+e]=this[r+i];else if(1e3>a||!o.TYPED_ARRAY_SUPPORT)for(r=0;a>r;r++)t[r+e]=this[r+i];else Uint8Array.prototype.set.call(t,this.subarray(i,i+a),e);return a},o.prototype.fill=function(t,e,i,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,i=this.length):"string"==typeof i&&(n=i,i=this.length),1===t.length){var r=t.charCodeAt(0);256>r&&(t=r)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!o.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t=255&t);if(0>e||this.length<e||this.length<i)throw new RangeError("Out of range index");if(e>=i)return this;e>>>=0,i=void 0===i?this.length:i>>>0,t||(t=0);var a;if("number"==typeof t)for(a=e;i>a;a++)this[a]=t;else{var s=o.isBuffer(t)?t:G(new o(t,n).toString()),l=s.length;for(a=0;i-e>a;a++)this[a+e]=s[a%l]}return this};var tt=/[^+\/0-9A-Za-z-_]/g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"base64-js":3,ieee754:30,isarray:35}],15:[function(t,e,i){(function(t){function e(t){return Array.isArray?Array.isArray(t):"[object Array]"===g(t)}function n(t){return"boolean"==typeof t}function r(t){return null===t}function a(t){return null==t}function o(t){return"number"==typeof t}function s(t){return"string"==typeof t}function l(t){return"symbol"===("undefined"==typeof t?"undefined":_typeof(t))}function h(t){return void 0===t}function f(t){return"[object RegExp]"===g(t)}function c(t){return"object"===("undefined"==typeof t?"undefined":_typeof(t))&&null!==t}function u(t){return"[object Date]"===g(t)}function p(t){return"[object Error]"===g(t)||t instanceof Error}function d(t){return"function"==typeof t}function m(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"===("undefined"==typeof t?"undefined":_typeof(t))||"undefined"==typeof t}function g(t){return Object.prototype.toString.call(t)}i.isArray=e,i.isBoolean=n,i.isNull=r,i.isNullOrUndefined=a,i.isNumber=o,i.isString=s,i.isSymbol=l,i.isUndefined=h,i.isRegExp=f,i.isObject=c,i.isDate=u,i.isError=p,i.isFunction=d,i.isPrimitive=m,i.isBuffer=t.isBuffer}).call(this,{isBuffer:t("../../is-buffer/index.js")})},{"../../is-buffer/index.js":33}],16:[function(t,e,i){(function(i,n){(function(){"use strict";function r(t){return"function"==typeof t||"object"===("undefined"==typeof t?"undefined":_typeof(t))&&null!==t}function a(t){return"function"==typeof t}function o(t){q=t}function s(t){V=t}function l(){return function(){i.nextTick(p)}}function h(){return function(){G(p)}}function f(){var t=0,e=new K(p),i=document.createTextNode("");return e.observe(i,{characterData:!0}),function(){i.data=t=++t%2}}function c(){var t=new MessageChannel;return t.port1.onmessage=p,function(){t.port2.postMessage(0)}}function u(){return function(){setTimeout(p,1)}}function p(){for(var t=0;X>t;t+=2){var e=et[t],i=et[t+1];e(i),et[t]=void 0,et[t+1]=void 0}X=0}function d(){try{var e=t,i=e("vertx");return G=i.runOnLoop||i.runOnContext,h()}catch(n){return u()}}function m(t,e){var i=this,n=i._state;if(n===at&&!t||n===ot&&!e)return this;var r=new this.constructor(b),a=i._result;if(n){var o=arguments[n-1];V(function(){C(n,r,o,a)})}else R(i,r,t,e);return r}function g(t){var e=this;if(t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))&&t.constructor===e)return t;var i=new e(b);return S(i,t),i}function b(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function w(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return st.error=e,st}}function y(t,e,i,n){try{t.call(e,i,n)}catch(r){return r}}function x(t,e,i){V(function(t){var n=!1,r=y(i,e,function(i){n||(n=!0,e!==i?S(t,i):M(t,i))},function(e){n||(n=!0,A(t,e))},"Settle: "+(t._label||" unknown promise"));!n&&r&&(n=!0,A(t,r))},t)}function k(t,e){e._state===at?M(t,e._result):e._state===ot?A(t,e._result):R(e,void 0,function(e){S(t,e)},function(e){A(t,e)})}function E(t,e,i){e.constructor===t.constructor&&i===it&&constructor.resolve===nt?k(t,e):i===st?A(t,st.error):void 0===i?M(t,e):a(i)?x(t,e,i):M(t,e)}function S(t,e){t===e?A(t,v()):r(e)?E(t,e,_(e)):M(t,e)}function I(t){t._onerror&&t._onerror(t._result),T(t)}function M(t,e){t._state===rt&&(t._result=e,t._state=at,0!==t._subscribers.length&&V(T,t))}function A(t,e){t._state===rt&&(t._state=ot,t._result=e,V(I,t))}function R(t,e,i,n){var r=t._subscribers,a=r.length;t._onerror=null,r[a]=e,r[a+at]=i,r[a+ot]=n,0===a&&t._state&&V(T,t)}function T(t){var e=t._subscribers,i=t._state;if(0!==e.length){for(var n,r,a=t._result,o=0;o<e.length;o+=3)n=e[o],r=e[o+i],n?C(i,n,r,a):r(a);t._subscribers.length=0}}function P(){this.error=null}function L(t,e){try{return t(e)}catch(i){return lt.error=i,lt}}function C(t,e,i,n){var r,o,s,l,h=a(i);if(h){if(r=L(i,n),r===lt?(l=!0,o=r.error,r=null):s=!0,e===r)return void A(e,w())}else r=n,s=!0;e._state!==rt||(h&&s?S(e,r):l?A(e,o):t===at?M(e,r):t===ot&&A(e,r))}function B(t,e){try{e(function(e){S(t,e);
},function(e){A(t,e)})}catch(i){A(t,i)}}function z(t){return new dt(this,t).promise}function O(t){function e(t){S(r,t)}function i(t){A(r,t)}var n=this,r=new n(b);if(!Y(t))return A(r,new TypeError("You must pass an array to race.")),r;for(var a=t.length,o=0;r._state===rt&&a>o;o++)R(n.resolve(t[o]),void 0,e,i);return r}function D(t){var e=this,i=new e(b);return A(i,t),i}function U(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function F(t){this._id=ut++,this._state=void 0,this._result=void 0,this._subscribers=[],b!==t&&("function"!=typeof t&&U(),this instanceof F?B(this,t):N())}function j(t,e){this._instanceConstructor=t,this.promise=new t(b),Array.isArray(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?M(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&M(this.promise,this._result))):A(this.promise,this._validationError())}function H(){var t;if("undefined"!=typeof n)t=n;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var i=t.Promise;i&&"[object Promise]"===Object.prototype.toString.call(i.resolve())&&!i.cast||(t.Promise=pt)}var W;W=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var G,q,Z,Y=W,X=0,V=function(t,e){et[X]=t,et[X+1]=e,X+=2,2===X&&(q?q(p):Z())},J="undefined"!=typeof window?window:void 0,$=J||{},K=$.MutationObserver||$.WebKitMutationObserver,Q="undefined"!=typeof i&&"[object process]"==={}.toString.call(i),tt="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,et=new Array(1e3);Z=Q?l():K?f():tt?c():void 0===J&&"function"==typeof t?d():u();var it=m,nt=g,rt=void 0,at=1,ot=2,st=new P,lt=new P,ht=z,ft=O,ct=D,ut=0,pt=F;F.all=ht,F.race=ft,F.resolve=nt,F.reject=ct,F._setScheduler=o,F._setAsap=s,F._asap=V,F.prototype={constructor:F,then:it,"catch":function(t){return this.then(null,t)}};var dt=j;j.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},j.prototype._enumerate=function(){for(var t=this.length,e=this._input,i=0;this._state===rt&&t>i;i++)this._eachEntry(e[i],i)},j.prototype._eachEntry=function(t,e){var i=this._instanceConstructor,n=i.resolve;if(n===nt){var r=_(t);if(r===it&&t._state!==rt)this._settledAt(t._state,e,t._result);else if("function"!=typeof r)this._remaining--,this._result[e]=t;else if(i===pt){var a=new i(b);E(a,t,r),this._willSettleAt(a,e)}else this._willSettleAt(new i(function(e){e(t)}),e)}else this._willSettleAt(n(t),e)},j.prototype._settledAt=function(t,e,i){var n=this.promise;n._state===rt&&(this._remaining--,t===ot?A(n,i):this._result[e]=i),0===this._remaining&&M(n,this._result)},j.prototype._willSettleAt=function(t,e){var i=this;R(t,void 0,function(t){i._settledAt(at,e,t)},function(t){i._settledAt(ot,e,t)})};var mt=H,gt={Promise:pt,polyfill:mt};"function"==typeof define&&define.amd?define(function(){return gt}):"undefined"!=typeof e&&e.exports?e.exports=gt:"undefined"!=typeof this&&(this.ES6Promise=gt),mt()}).call(this)}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:12}],17:[function(t,e,i){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(t){return"function"==typeof t}function a(t){return"number"==typeof t}function o(t){return"object"===("undefined"==typeof t?"undefined":_typeof(t))&&null!==t}function s(t){return void 0===t}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!a(t)||0>t||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,i,n,a,l,h;if(this._events||(this._events={}),"error"===t&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;throw TypeError('Uncaught, unspecified "error" event.')}if(i=this._events[t],s(i))return!1;if(r(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),i.apply(this,a)}else if(o(i))for(a=Array.prototype.slice.call(arguments,1),h=i.slice(),n=h.length,l=0;n>l;l++)h[l].apply(this,a);return!0},n.prototype.addListener=function(t,e){var i;if(!r(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,r(e.listener)?e.listener:e),this._events[t]?o(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,o(this._events[t])&&!this._events[t].warned&&(i=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[t].length>i&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){function i(){this.removeListener(t,i),n||(n=!0,e.apply(this,arguments))}if(!r(e))throw TypeError("listener must be a function");var n=!1;return i.listener=e,this.on(t,i),this},n.prototype.removeListener=function(t,e){var i,n,a,s;if(!r(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(i=this._events[t],a=i.length,n=-1,i===e||r(i.listener)&&i.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(o(i)){for(s=a;s-- >0;)if(i[s]===e||i[s].listener&&i[s].listener===e){n=s;break}if(0>n)return this;1===i.length?(i.length=0,delete this._events[t]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[t],r(i))this.removeListener(t,i);else if(i)for(;i.length;)this.removeListener(t,i[i.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?r(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(r(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},{}],18:[function(t,e,i){function n(){return this}var r=t("./lib/parser");e.exports={create:function(e,i){if(i=i||n(),e instanceof i.ArrayBuffer){var a=t("./lib/dom-bufferstream");return new r(new a(e,0,e.byteLength,!0,i))}var o=t("./lib/bufferstream");return new r(new o(e,0,e.length,!0))}}},{"./lib/bufferstream":19,"./lib/dom-bufferstream":21,"./lib/parser":25}],19:[function(t,e,i){function n(t,e,i,n){this.buffer=t,this.offset=e||0,i="number"==typeof i?i:t.length,this.endPosition=this.offset+i,this.setBigEndian(n)}n.prototype={setBigEndian:function(t){this.bigEndian=!!t},nextUInt8:function(){var t=this.buffer.readUInt8(this.offset);return this.offset+=1,t},nextInt8:function(){var t=this.buffer.readInt8(this.offset);return this.offset+=1,t},nextUInt16:function(){var t=this.bigEndian?this.buffer.readUInt16BE(this.offset):this.buffer.readUInt16LE(this.offset);return this.offset+=2,t},nextUInt32:function(){var t=this.bigEndian?this.buffer.readUInt32BE(this.offset):this.buffer.readUInt32LE(this.offset);return this.offset+=4,t},nextInt16:function(){var t=this.bigEndian?this.buffer.readInt16BE(this.offset):this.buffer.readInt16LE(this.offset);return this.offset+=2,t},nextInt32:function(){var t=this.bigEndian?this.buffer.readInt32BE(this.offset):this.buffer.readInt32LE(this.offset);return this.offset+=4,t},nextFloat:function(){var t=this.bigEndian?this.buffer.readFloatBE(this.offset):this.buffer.readFloatLE(this.offset);return this.offset+=4,t},nextDouble:function(){var t=this.bigEndian?this.buffer.readDoubleBE(this.offset):this.buffer.readDoubleLE(this.offset);return this.offset+=8,t},nextBuffer:function(t){var e=this.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e},remainingLength:function(){return this.endPosition-this.offset},nextString:function(t){var e=this.buffer.toString("ascii",this.offset,this.offset+t);return this.offset+=t,e},mark:function(){var t=this;return{openWithOffset:function(e){return e=(e||0)+this.offset,new n(t.buffer,e,t.endPosition-e,t.bigEndian)},offset:this.offset}},offsetFrom:function(t){return this.offset-t.offset},skip:function(t){this.offset+=t},branch:function(t,e){return e="number"==typeof e?e:this.endPosition-(this.offset+t),new n(this.buffer,this.offset+t,e,this.bigEndian)}},e.exports=n},{}],20:[function(t,e,i){function n(t){return parseInt(t,10)}function r(t,e){t=t.map(n),e=e.map(n);var i=new Date;i.setUTCFullYear(t[0]),i.setUTCMonth(t[1]-1),i.setUTCDate(t[2]),i.setUTCHours(e[0]),i.setUTCMinutes(e[1]),i.setUTCSeconds(e[2]),i.setUTCMilliseconds(0);var r=i.getTime()/1e3;return r}function a(t){var e=t.substr(0,10).split("-"),i=t.substr(11,8).split(":"),a=t.substr(19,6),o=a.split(":").map(n),s=o[0]*l+o[1]*h,f=r(e,i);return f-=s,"number"!=typeof f||isNaN(f)?void 0:f}function o(t){var e=t.split(" "),i=e[0].split(":"),n=e[1].split(":"),a=r(i,n);return"number"!=typeof a||isNaN(a)?void 0:a}function s(t){var e=19===t.length&&":"===t.charAt(4),i=25===t.length&&"T"===t.charAt(10);return i?a(t):e?o(t):void 0}var l=3600,h=60;e.exports={parseDateWithSpecFormat:o,parseDateWithTimezoneFormat:a,parseExifDate:s}},{}],21:[function(t,e,i){function n(t,e,i,n,r,a){this.global=r,e=e||0,i=i||t.byteLength-e,this.arrayBuffer=t.slice(e,e+i),this.view=new r.DataView(this.arrayBuffer,0,this.arrayBuffer.byteLength),this.setBigEndian(n),this.offset=0,this.parentOffset=(a||0)+e}n.prototype={setBigEndian:function(t){this.littleEndian=!t},nextUInt8:function(){var t=this.view.getUint8(this.offset);return this.offset+=1,t},nextInt8:function(){var t=this.view.getInt8(this.offset);return this.offset+=1,t},nextUInt16:function(){var t=this.view.getUint16(this.offset,this.littleEndian);return this.offset+=2,t},nextUInt32:function(){var t=this.view.getUint32(this.offset,this.littleEndian);return this.offset+=4,t},nextInt16:function(){var t=this.view.getInt16(this.offset,this.littleEndian);return this.offset+=2,t},nextInt32:function(){var t=this.view.getInt32(this.offset,this.littleEndian);return this.offset+=4,t},nextFloat:function(){var t=this.view.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t},nextDouble:function(){var t=this.view.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t},nextBuffer:function(t){var e=this.arrayBuffer.slice(this.offset,this.offset+t);return this.offset+=t,e},remainingLength:function(){return this.arrayBuffer.byteLength-this.offset},nextString:function(t){var e=this.arrayBuffer.slice(this.offset,this.offset+t);return e=String.fromCharCode.apply(null,new this.global.Uint8Array(e)),this.offset+=t,e},mark:function(){var t=this;return{openWithOffset:function(e){return e=(e||0)+this.offset,new n(t.arrayBuffer,e,t.arrayBuffer.byteLength-e,!t.littleEndian,t.global,t.parentOffset)},offset:this.offset,getParentOffset:function(){return t.parentOffset}}},offsetFrom:function(t){return this.parentOffset+this.offset-(t.offset+t.getParentOffset())},skip:function(t){this.offset+=t},branch:function(t,e){return e="number"==typeof e?e:this.arrayBuffer.byteLength-(this.offset+t),new n(this.arrayBuffer,this.offset+t,e,!this.littleEndian,this.global,this.parentOffset)}},e.exports=n},{}],22:[function(t,e,i){e.exports={exif:{1:"InteropIndex",2:"InteropVersion",11:"ProcessingSoftware",254:"SubfileType",255:"OldSubfileType",256:"ImageWidth",257:"ImageHeight",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",263:"Thresholding",264:"CellWidth",265:"CellLength",266:"FillOrder",269:"DocumentName",270:"ImageDescription",271:"Make",272:"Model",273:"StripOffsets",274:"Orientation",277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",280:"MinSampleValue",281:"MaxSampleValue",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",285:"PageName",286:"XPosition",287:"YPosition",288:"FreeOffsets",289:"FreeByteCounts",290:"GrayResponseUnit",291:"GrayResponseCurve",292:"T4Options",293:"T6Options",296:"ResolutionUnit",297:"PageNumber",300:"ColorResponseUnit",301:"TransferFunction",305:"Software",306:"ModifyDate",315:"Artist",316:"HostComputer",317:"Predictor",318:"WhitePoint",319:"PrimaryChromaticities",320:"ColorMap",321:"HalftoneHints",322:"TileWidth",323:"TileLength",324:"TileOffsets",325:"TileByteCounts",326:"BadFaxLines",327:"CleanFaxData",328:"ConsecutiveBadFaxLines",330:"SubIFD",332:"InkSet",333:"InkNames",334:"NumberofInks",336:"DotRange",337:"TargetPrinter",338:"ExtraSamples",339:"SampleFormat",340:"SMinSampleValue",341:"SMaxSampleValue",342:"TransferRange",343:"ClipPath",344:"XClipPathUnits",345:"YClipPathUnits",346:"Indexed",347:"JPEGTables",351:"OPIProxy",400:"GlobalParametersIFD",401:"ProfileType",402:"FaxProfile",403:"CodingMethods",404:"VersionYear",405:"ModeNumber",433:"Decode",434:"DefaultImageColor",435:"T82Options",437:"JPEGTables",512:"JPEGProc",513:"ThumbnailOffset",514:"ThumbnailLength",515:"JPEGRestartInterval",517:"JPEGLosslessPredictors",518:"JPEGPointTransforms",519:"JPEGQTables",520:"JPEGDCTables",521:"JPEGACTables",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:"YCbCrPositioning",532:"ReferenceBlackWhite",559:"StripRowCounts",700:"ApplicationNotes",999:"USPTOMiscellaneous",4096:"RelatedImageFileFormat",4097:"RelatedImageWidth",4098:"RelatedImageHeight",18246:"Rating",18247:"XP_DIP_XML",18248:"StitchInfo",18249:"RatingPercent",32781:"ImageID",32931:"WangTag1",32932:"WangAnnotation",32933:"WangTag3",32934:"WangTag4",32995:"Matteing",32996:"DataType",32997:"ImageDepth",32998:"TileDepth",33405:"Model2",33421:"CFARepeatPatternDim",33422:"CFAPattern2",33423:"BatteryLevel",33424:"KodakIFD",33432:"Copyright",33434:"ExposureTime",33437:"FNumber",33445:"MDFileTag",33446:"MDScalePixel",33447:"MDColorTable",33448:"MDLabName",33449:"MDSampleInfo",33450:"MDPrepDate",33451:"MDPrepTime",33452:"MDFileUnits",33550:"PixelScale",33589:"AdventScale",33590:"AdventRevision",33628:"UIC1Tag",33629:"UIC2Tag",33630:"UIC3Tag",33631:"UIC4Tag",33723:"IPTC-NAA",33918:"IntergraphPacketData",33919:"IntergraphFlagRegisters",33920:"IntergraphMatrix",33921:"INGRReserved",33922:"ModelTiePoint",34016:"Site",34017:"ColorSequence",34018:"IT8Header",34019:"RasterPadding",34020:"BitsPerRunLength",34021:"BitsPerExtendedRunLength",34022:"ColorTable",34023:"ImageColorIndicator",34024:"BackgroundColorIndicator",34025:"ImageColorValue",34026:"BackgroundColorValue",34027:"PixelIntensityRange",34028:"TransparencyIndicator",34029:"ColorCharacterization",34030:"HCUsage",34031:"TrapIndicator",34032:"CMYKEquivalent",34118:"SEMInfo",34152:"AFCP_IPTC",34232:"PixelMagicJBIGOptions",34264:"ModelTransform",34306:"WB_GRGBLevels",34310:"LeafData",34377:"PhotoshopSettings",34665:"ExifOffset",34675:"ICC_Profile",34687:"TIFF_FXExtensions",34688:"MultiProfiles",34689:"SharedData",34690:"T88Options",34732:"ImageLayer",34735:"GeoTiffDirectory",34736:"GeoTiffDoubleParams",34737:"GeoTiffAsciiParams",34850:"ExposureProgram",34852:"SpectralSensitivity",34853:"GPSInfo",34855:"ISO",34856:"Opto-ElectricConvFactor",34857:"Interlace",34858:"TimeZoneOffset",34859:"SelfTimerMode",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",34908:"FaxRecvParams",34909:"FaxSubAddress",34910:"FaxRecvTime",34954:"LeafSubIFD",36864:"ExifVersion",36867:"DateTimeOriginal",36868:"CreateDate",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureCompensation",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37386:"FocalLength",37387:"FlashEnergy",37388:"SpatialFrequencyResponse",37389:"Noise",37390:"FocalPlaneXResolution",37391:"FocalPlaneYResolution",37392:"FocalPlaneResolutionUnit",37393:"ImageNumber",37394:"SecurityClassification",37395:"ImageHistory",37396:"SubjectArea",37397:"ExposureIndex",37398:"TIFF-EPStandardID",37399:"SensingMethod",37434:"CIP3DataFile",37435:"CIP3Sheet",37436:"CIP3Side",37439:"StoNits",37500:"MakerNote",37510:"UserComment",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",37679:"MSDocumentText",37680:"MSPropertySetStorage",37681:"MSDocumentTextPosition",37724:"ImageSourceData",40091:"XPTitle",40092:"XPComment",40093:"XPAuthor",40094:"XPKeywords",40095:"XPSubject",40960:"FlashpixVersion",40961:"ColorSpace",40962:"ExifImageWidth",40963:"ExifImageHeight",40964:"RelatedSoundFile",40965:"InteropOffset",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41485:"Noise",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41489:"ImageNumber",41490:"SecurityClassification",41491:"ImageHistory",41492:"SubjectLocation",41493:"ExposureIndex",41494:"TIFF-EPStandardID",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFormat",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"OwnerName",42033:"SerialNumber",42034:"LensInfo",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",42112:"GDALMetadata",42113:"GDALNoData",42240:"Gamma",44992:"ExpandSoftware",44993:"ExpandLens",44994:"ExpandFilm",44995:"ExpandFilterLens",44996:"ExpandScanner",44997:"ExpandFlashLamp",48129:"PixelFormat",48130:"Transformation",48131:"Uncompressed",48132:"ImageType",48256:"ImageWidth",48257:"ImageHeight",48258:"WidthResolution",48259:"HeightResolution",48320:"ImageOffset",48321:"ImageByteCount",48322:"AlphaOffset",48323:"AlphaByteCount",48324:"ImageDataDiscard",48325:"AlphaDataDiscard",50215:"OceScanjobDesc",50216:"OceApplicationSelector",50217:"OceIDNumber",50218:"OceImageLogic",50255:"Annotations",50341:"PrintIM",50560:"USPTOOriginalContentType",50706:"DNGVersion",50707:"DNGBackwardVersion",50708:"UniqueCameraModel",50709:"LocalizedCameraModel",50710:"CFAPlaneColor",50711:"CFALayout",50712:"LinearizationTable",50713:"BlackLevelRepeatDim",50714:"BlackLevel",50715:"BlackLevelDeltaH",50716:"BlackLevelDeltaV",50717:"WhiteLevel",50718:"DefaultScale",50719:"DefaultCropOrigin",50720:"DefaultCropSize",50721:"ColorMatrix1",50722:"ColorMatrix2",50723:"CameraCalibration1",50724:"CameraCalibration2",50725:"ReductionMatrix1",50726:"ReductionMatrix2",50727:"AnalogBalance",50728:"AsShotNeutral",50729:"AsShotWhiteXY",50730:"BaselineExposure",50731:"BaselineNoise",50732:"BaselineSharpness",50733:"BayerGreenSplit",50734:"LinearResponseLimit",50735:"CameraSerialNumber",50736:"DNGLensInfo",50737:"ChromaBlurRadius",50738:"AntiAliasStrength",50739:"ShadowScale",50740:"DNGPrivateData",50741:"MakerNoteSafety",50752:"RawImageSegmentation",50778:"CalibrationIlluminant1",50779:"CalibrationIlluminant2",50780:"BestQualityScale",50781:"RawDataUniqueID",50784:"AliasLayerMetadata",50827:"OriginalRawFileName",50828:"OriginalRawFileData",50829:"ActiveArea",50830:"MaskedAreas",50831:"AsShotICCProfile",50832:"AsShotPreProfileMatrix",50833:"CurrentICCProfile",50834:"CurrentPreProfileMatrix",50879:"ColorimetricReference",50898:"PanasonicTitle",50899:"PanasonicTitle2",50931:"CameraCalibrationSig",50932:"ProfileCalibrationSig",50933:"ProfileIFD",50934:"AsShotProfileName",50935:"NoiseReductionApplied",50936:"ProfileName",50937:"ProfileHueSatMapDims",50938:"ProfileHueSatMapData1",50939:"ProfileHueSatMapData2",50940:"ProfileToneCurve",50941:"ProfileEmbedPolicy",50942:"ProfileCopyright",50964:"ForwardMatrix1",50965:"ForwardMatrix2",50966:"PreviewApplicationName",50967:"PreviewApplicationVersion",50968:"PreviewSettingsName",50969:"PreviewSettingsDigest",50970:"PreviewColorSpace",50971:"PreviewDateTime",50972:"RawImageDigest",50973:"OriginalRawFileDigest",50974:"SubTileBlockSize",50975:"RowInterleaveFactor",50981:"ProfileLookTableDims",50982:"ProfileLookTableData",51008:"OpcodeList1",51009:"OpcodeList2",51022:"OpcodeList3",51041:"NoiseProfile",51043:"TimeCodes",51044:"FrameRate",51058:"TStop",51081:"ReelName",51089:"OriginalDefaultFinalSize",51090:"OriginalBestQualitySize",51091:"OriginalDefaultCropSize",51105:"CameraLabel",51107:"ProfileHueSatMapEncoding",51108:"ProfileLookTableEncoding",51109:"BaselineExposureOffset",51110:"DefaultBlackRender",51111:"NewRawImageDigest",51112:"RawToPreviewGain",51125:"DefaultUserCrop",59932:"Padding",59933:"OffsetSchema",65e3:"OwnerName",65001:"SerialNumber",65002:"Lens",65024:"KDC_IFD",65100:"RawFile",65101:"Converter",65102:"WhiteBalance",65105:"Exposure",65106:"Shadows",65107:"Brightness",65108:"Contrast",65109:"Saturation",65110:"Sharpness",65111:"Smoothness",65112:"MoireFilter"},gps:{0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"}}},{}],23:[function(t,e,i){function n(t,e){switch(t){case 1:return e.nextUInt8();case 3:return e.nextUInt16();case 4:return e.nextUInt32();case 5:return[e.nextUInt32(),e.nextUInt32()];case 6:return e.nextInt8();case 8:return e.nextUInt16();case 9:return e.nextUInt32();case 10:return[e.nextInt32(),e.nextInt32()];case 11:return e.nextFloat();case 12:return e.nextDouble();default:throw new Error("Invalid format while decoding: "+t)}}function r(t){switch(t){case 1:case 2:case 6:case 7:return 1;case 3:case 8:return 2;case 4:case 9:case 11:return 4;case 5:case 10:case 12:return 8;default:throw new Error("Invalid format: "+t)}}function a(t,e){var i,a,o=e.nextUInt16(),s=e.nextUInt16(),l=r(s),h=e.nextUInt32(),f=l*h;if(f>4&&(e=t.openWithOffset(e.nextUInt32())),2===s){i=e.nextString(h);var c=i.indexOf("\x00");-1!==c&&(i=i.substr(0,c))}else if(7===s)i=e.nextBuffer(h);else for(i=[],a=0;h>a;++a)i.push(n(s,e));return 4>f&&e.skip(4-f),[o,i,s]}function o(t,e,i){var n,r,o=e.nextUInt16();for(r=0;o>r;++r)n=a(t,e),i(n[0],n[1],n[2])}function s(t){var e=t.nextString(6);if("Exif\x00\x00"!==e)throw new Error("Invalid EXIF header");var i=t.mark(),n=t.nextUInt16();if(18761===n)t.setBigEndian(!1);else{if(19789!==n)throw new Error("Invalid TIFF header");t.setBigEndian(!0)}if(42!==t.nextUInt16())throw new Error("Invalid TIFF data");return i}e.exports={IFD0:1,IFD1:2,GPSIFD:3,SubIFD:4,InteropIFD:5,parseTags:function(t,e){var i;try{i=s(t)}catch(n){return!1}var r,a,l,h=i.openWithOffset(t.nextUInt32()),f=this.IFD0;o(i,h,function(t,i,n){switch(t){case 34853:a=i[0];break;case 34665:r=i[0];break;default:e(f,t,i,n)}});var c=h.nextUInt32();if(0!==c){var u=i.openWithOffset(c);o(i,u,e.bind(null,this.IFD1))}if(a){var p=i.openWithOffset(a);o(i,p,e.bind(null,this.GPSIFD))}if(r){var d=i.openWithOffset(r),m=this.InteropIFD;o(i,d,function(t,i,n){40965===t?l=i[0]:e(m,t,i,n)})}if(l){var g=i.openWithOffset(l);o(i,g,e.bind(null,this.InteropIFD))}return!0}}},{}],24:[function(t,e,i){e.exports={parseSections:function(t,e){var i,n;for(t.setBigEndian(!0);t.remainingLength()>0&&218!==n;){if(255!==t.nextUInt8())throw new Error("Invalid JPEG section offset");n=t.nextUInt8(),i=n>=208&&217>=n||218===n?0:t.nextUInt16()-2,e(n,t.branch(0,i)),t.skip(i)}},getSizeFromSOFSection:function(t){return t.skip(1),{height:t.nextUInt16(),width:t.nextUInt16()}},getSectionName:function(t){var e,i;switch(t){case 216:e="SOI";break;case 196:e="DHT";break;case 219:e="DQT";break;case 221:e="DRI";break;case 218:e="SOS";break;case 254:e="COM";break;case 217:e="EOI";break;default:t>=224&&239>=t?(e="APP",i=t-224):t>=192&&207>=t&&196!==t&&200!==t&&204!==t?(e="SOF",i=t-192):t>=208&&215>=t&&(e="RST",i=t-208)}var n={name:e};return"number"==typeof i&&(n.index=i),n}}},{}],25:[function(t,e,i){function n(t,e,i,n,r,a,o){this.startMarker=t,this.tags=e,this.imageSize=i,this.thumbnailOffset=n,this.thumbnailLength=r,this.thumbnailType=a,this.app1Offset=o}function r(t){this.stream=t,this.flags={readBinaryTags:!1,resolveTagNames:!0,simplifyValues:!0,imageSize:!0,hidePointers:!0,returnTags:!0}}var a=t("./jpeg"),o=t("./exif"),s=t("./simplify");n.prototype={hasThumbnail:function(t){return this.thumbnailOffset&&this.thumbnailLength?"string"!=typeof t?!0:"image/jpeg"===t.toLowerCase().trim()?6===this.thumbnailType:"image/tiff"===t.toLowerCase().trim()?1===this.thumbnailType:!1:!1},getThumbnailOffset:function(){return this.app1Offset+6+this.thumbnailOffset},getThumbnailLength:function(){return this.thumbnailLength},getThumbnailBuffer:function(){return this._getThumbnailStream().nextBuffer(this.thumbnailLength)},_getThumbnailStream:function(){return this.startMarker.openWithOffset(this.getThumbnailOffset())},getImageSize:function(){return this.imageSize},getThumbnailSize:function(){var t,e=this._getThumbnailStream();return a.parseSections(e,function(e,i){"SOF"===a.getSectionName(e).name&&(t=a.getSizeFromSOFSection(i))}),t}},r.prototype={enableBinaryFields:function(t){return this.flags.readBinaryTags=!!t,this},enablePointers:function(t){return this.flags.hidePointers=!t,this},enableTagNames:function(t){return this.flags.resolveTagNames=!!t,this},enableImageSize:function(t){return this.flags.imageSize=!!t,this},enableReturnTags:function(t){return this.flags.returnTags=!!t,this},enableSimpleValues:function(t){return this.flags.simplifyValues=!!t,this},parse:function(){var e,i,r,l,h,f,c,u,p,d=this.stream.mark(),m=d.openWithOffset(0),g=this.flags;return g.resolveTagNames&&(c=t("./exif-tags")),g.resolveTagNames?(e={},u=function(t){return e[t.name]},p=function(t,i){e[t.name]=i}):(e=[],u=function(t){var i;for(i=0;i<e.length;++i)if(e[i].type===t.type&&e[i].section===t.section)return e.value},p=function(t,i){var n;for(n=0;n<e.length;++n)if(e[n].type===t.type&&e[n].section===t.section)return void(e.value=i)}),a.parseSections(m,function(t,n){var u,p=n.offsetFrom(d);225===t?(u=o.parseTags(n,function(t,i,n,a){if(g.readBinaryTags||7!==a){if(513===i){if(r=n[0],g.hidePointers)return}else if(514===i){if(l=n[0],g.hidePointers)return}else if(259===i&&(h=n[0],g.hidePointers))return;if(g.returnTags)if(g.simplifyValues&&(n=s.simplifyValue(n,a)),g.resolveTagNames){var f=t===o.GPSIFD?c.gps:c.exif,u=f[i];u||(u=c.exif[i]),e[u]=n}else e.push({section:t,type:i,value:n})}}),u&&(f=p)):g.imageSize&&"SOF"===a.getSectionName(t).name&&(i=a.getSizeFromSOFSection(n))}),g.simplifyValues&&(s.castDegreeValues(u,p),s.castDateValues(u,p)),new n(d,e,i,r,l,h,f)}},e.exports=r},{"./exif":23,"./exif-tags":22,"./jpeg":24,"./simplify":26}],26:[function(t,e,i){var n=t("./exif"),r=t("./date"),a=[{section:n.GPSIFD,type:2,name:"GPSLatitude",refType:1,refName:"GPSLatitudeRef",posVal:"N"},{section:n.GPSIFD,type:4,name:"GPSLongitude",refType:3,refName:"GPSLongitudeRef",posVal:"E"}],o=[{section:n.SubIFD,type:36867,name:"DateTimeOriginal"},{section:n.SubIFD,type:36868,name:"CreateDate"}];e.exports={castDegreeValues:function(t,e){a.forEach(function(i){var n=t(i);if(n){var r=t({section:i.section,type:i.refType,name:i.refName}),a=r===i.posVal?1:-1,o=(n[0]+n[1]/60+n[2]/3600)*a;e(i,o)}})},castDateValues:function(t,e){o.forEach(function(i){var n=t(i);if(n){var a=r.parseExifDate(n);"undefined"!=typeof a&&e(i,a)}})},simplifyValue:function(t,e){return Array.isArray(t)&&(t=t.map(function(t){return 10===e||5===e?t[0]/t[1]:t}),1===t.length&&(t=t[0])),t}}},{"./date":20,"./exif":23}],27:[function(t,e,i){"use strict";e.exports=function(t){return t&&t.length>1?255===t[0]&&216===t[1]&&255===t[2]?{ext:"jpg",mime:"image/jpeg"}:137===t[0]&&80===t[1]&&78===t[2]&&71===t[3]?{ext:"png",mime:"image/png"}:71===t[0]&&73===t[1]&&70===t[2]?{ext:"gif",mime:"image/gif"}:87===t[8]&&69===t[9]&&66===t[10]&&80===t[11]?{ext:"webp",mime:"image/webp"}:(73===t[0]&&73===t[1]&&42===t[2]&&0===t[3]||77===t[0]&&77===t[1]&&0===t[2]&&42===t[3])&&67===t[8]&&82===t[9]?{ext:"cr2",mime:"image/x-canon-cr2"}:73===t[0]&&73===t[1]&&42===t[2]&&0===t[3]||77===t[0]&&77===t[1]&&0===t[2]&&42===t[3]?{ext:"tif",mime:"image/tiff"}:66===t[0]&&77===t[1]?{ext:"bmp",mime:"image/bmp"}:73===t[0]&&73===t[1]&&188===t[2]?{ext:"jxr",mime:"image/vnd.ms-photo"}:56===t[0]&&66===t[1]&&80===t[2]&&83===t[3]?{ext:"psd",mime:"image/vnd.adobe.photoshop"}:80===t[0]&&75===t[1]&&3===t[2]&&4===t[3]&&109===t[30]&&105===t[31]&&109===t[32]&&101===t[33]&&116===t[34]&&121===t[35]&&112===t[36]&&101===t[37]&&97===t[38]&&112===t[39]&&112===t[40]&&108===t[41]&&105===t[42]&&99===t[43]&&97===t[44]&&116===t[45]&&105===t[46]&&111===t[47]&&110===t[48]&&47===t[49]&&101===t[50]&&112===t[51]&&117===t[52]&&98===t[53]&&43===t[54]&&122===t[55]&&105===t[56]&&112===t[57]?{ext:"epub",mime:"application/epub+zip"}:80===t[0]&&75===t[1]&&3===t[2]&&4===t[3]&&77===t[30]&&69===t[31]&&84===t[32]&&65===t[33]&&45===t[34]&&73===t[35]&&78===t[36]&&70===t[37]&&47===t[38]&&109===t[39]&&111===t[40]&&122===t[41]&&105===t[42]&&108===t[43]&&108===t[44]&&97===t[45]&&46===t[46]&&114===t[47]&&115===t[48]&&97===t[49]?{ext:"xpi",mime:"application/x-xpinstall"}:80!==t[0]||75!==t[1]||3!==t[2]&&5!==t[2]&&7!==t[2]||4!==t[3]&&6!==t[3]&&8!==t[3]?117===t[257]&&115===t[258]&&116===t[259]&&97===t[260]&&114===t[261]?{ext:"tar",mime:"application/x-tar"}:82!==t[0]||97!==t[1]||114!==t[2]||33!==t[3]||26!==t[4]||7!==t[5]||0!==t[6]&&1!==t[6]?31===t[0]&&139===t[1]&&8===t[2]?{ext:"gz",mime:"application/gzip"}:66===t[0]&&90===t[1]&&104===t[2]?{ext:"bz2",mime:"application/x-bzip2"}:55===t[0]&&122===t[1]&&188===t[2]&&175===t[3]&&39===t[4]&&28===t[5]?{ext:"7z",mime:"application/x-7z-compressed"}:120===t[0]&&1===t[1]?{ext:"dmg",mime:"application/x-apple-diskimage"}:0===t[0]&&0===t[1]&&0===t[2]&&(24===t[3]||32===t[3])&&102===t[4]&&116===t[5]&&121===t[6]&&112===t[7]||51===t[0]&&103===t[1]&&112===t[2]&&53===t[3]||0===t[0]&&0===t[1]&&0===t[2]&&28===t[3]&&102===t[4]&&116===t[5]&&121===t[6]&&112===t[7]&&109===t[8]&&112===t[9]&&52===t[10]&&50===t[11]&&109===t[16]&&112===t[17]&&52===t[18]&&49===t[19]&&109===t[20]&&112===t[21]&&52===t[22]&&50===t[23]&&105===t[24]&&115===t[25]&&111===t[26]&&109===t[27]||0===t[0]&&0===t[1]&&0===t[2]&&28===t[3]&&102===t[4]&&116===t[5]&&121===t[6]&&112===t[7]&&105===t[8]&&115===t[9]&&111===t[10]&&109===t[11]||0===t[0]&&0===t[1]&&0===t[2]&&28===t[3]&&102===t[4]&&116===t[5]&&121===t[6]&&112===t[7]&&109===t[8]&&112===t[9]&&52===t[10]&&50===t[11]&&0===t[12]&&0===t[13]&&0===t[14]&&0===t[15]?{ext:"mp4",mime:"video/mp4"}:0===t[0]&&0===t[1]&&0===t[2]&&28===t[3]&&102===t[4]&&116===t[5]&&121===t[6]&&112===t[7]&&77===t[8]&&52===t[9]&&86===t[10]?{ext:"m4v",mime:"video/x-m4v"}:77===t[0]&&84===t[1]&&104===t[2]&&100===t[3]?{ext:"mid",mime:"audio/midi"}:109===t[31]&&97===t[32]&&116===t[33]&&114===t[34]&&111===t[35]&&115===t[36]&&107===t[37]&&97===t[38]?{
ext:"mkv",mime:"video/x-matroska"}:26===t[0]&&69===t[1]&&223===t[2]&&163===t[3]?{ext:"webm",mime:"video/webm"}:0===t[0]&&0===t[1]&&0===t[2]&&20===t[3]&&102===t[4]&&116===t[5]&&121===t[6]&&112===t[7]?{ext:"mov",mime:"video/quicktime"}:82===t[0]&&73===t[1]&&70===t[2]&&70===t[3]&&65===t[8]&&86===t[9]&&73===t[10]?{ext:"avi",mime:"video/x-msvideo"}:48===t[0]&&38===t[1]&&178===t[2]&&117===t[3]&&142===t[4]&&102===t[5]&&207===t[6]&&17===t[7]&&166===t[8]&&217===t[9]?{ext:"wmv",mime:"video/x-ms-wmv"}:0===t[0]&&0===t[1]&&1===t[2]&&"b"===t[3].toString(16)[0]?{ext:"mpg",mime:"video/mpeg"}:73===t[0]&&68===t[1]&&51===t[2]||255===t[0]&&251===t[1]?{ext:"mp3",mime:"audio/mpeg"}:102===t[4]&&116===t[5]&&121===t[6]&&112===t[7]&&77===t[8]&&52===t[9]&&65===t[10]||77===t[0]&&52===t[1]&&65===t[2]&&32===t[3]?{ext:"m4a",mime:"audio/m4a"}:79===t[28]&&112===t[29]&&117===t[30]&&115===t[31]&&72===t[32]&&101===t[33]&&97===t[34]&&100===t[35]?{ext:"opus",mime:"audio/opus"}:79===t[0]&&103===t[1]&&103===t[2]&&83===t[3]?{ext:"ogg",mime:"audio/ogg"}:102===t[0]&&76===t[1]&&97===t[2]&&67===t[3]?{ext:"flac",mime:"audio/x-flac"}:82===t[0]&&73===t[1]&&70===t[2]&&70===t[3]&&87===t[8]&&65===t[9]&&86===t[10]&&69===t[11]?{ext:"wav",mime:"audio/x-wav"}:35===t[0]&&33===t[1]&&65===t[2]&&77===t[3]&&82===t[4]&&10===t[5]?{ext:"amr",mime:"audio/amr"}:37===t[0]&&80===t[1]&&68===t[2]&&70===t[3]?{ext:"pdf",mime:"application/pdf"}:77===t[0]&&90===t[1]?{ext:"exe",mime:"application/x-msdownload"}:67!==t[0]&&70!==t[0]||87!==t[1]||83!==t[2]?123===t[0]&&92===t[1]&&114===t[2]&&116===t[3]&&102===t[4]?{ext:"rtf",mime:"application/rtf"}:119===t[0]&&79===t[1]&&70===t[2]&&70===t[3]&&(0===t[4]&&1===t[5]&&0===t[6]&&0===t[7]||79===t[4]&&84===t[5]&&84===t[6]&&79===t[7])?{ext:"woff",mime:"application/font-woff"}:119===t[0]&&79===t[1]&&70===t[2]&&50===t[3]&&(0===t[4]&&1===t[5]&&0===t[6]&&0===t[7]||79===t[4]&&84===t[5]&&84===t[6]&&79===t[7])?{ext:"woff2",mime:"application/font-woff"}:76===t[34]&&80===t[35]&&(0===t[8]&&0===t[9]&&1===t[10]||1===t[8]&&0===t[9]&&2===t[10]||2===t[8]&&0===t[9]&&2===t[10])?{ext:"eot",mime:"application/octet-stream"}:0===t[0]&&1===t[1]&&0===t[2]&&0===t[3]&&0===t[4]?{ext:"ttf",mime:"application/font-sfnt"}:79===t[0]&&84===t[1]&&84===t[2]&&79===t[3]&&0===t[4]?{ext:"otf",mime:"application/font-sfnt"}:0===t[0]&&0===t[1]&&1===t[2]&&0===t[3]?{ext:"ico",mime:"image/x-icon"}:70===t[0]&&76===t[1]&&86===t[2]&&1===t[3]?{ext:"flv",mime:"video/x-flv"}:37===t[0]&&33===t[1]?{ext:"ps",mime:"application/postscript"}:253===t[0]&&55===t[1]&&122===t[2]&&88===t[3]&&90===t[4]&&0===t[5]?{ext:"xz",mime:"application/x-xz"}:83===t[0]&&81===t[1]&&76===t[2]&&105===t[3]?{ext:"sqlite",mime:"application/x-sqlite3"}:78===t[0]&&69===t[1]&&83===t[2]&&26===t[3]?{ext:"nes",mime:"application/x-nintendo-nes-rom"}:67===t[0]&&114===t[1]&&50===t[2]&&52===t[3]?{ext:"crx",mime:"application/x-google-chrome-extension"}:77===t[0]&&83===t[1]&&67===t[2]&&70===t[3]||73===t[0]&&83===t[1]&&99===t[2]&&40===t[3]?{ext:"cab",mime:"application/vnd.ms-cab-compressed"}:33===t[0]&&60===t[1]&&97===t[2]&&114===t[3]&&99===t[4]&&104===t[5]&&62===t[6]&&10===t[7]&&100===t[8]&&101===t[9]&&98===t[10]&&105===t[11]&&97===t[12]&&110===t[13]&&45===t[14]&&98===t[15]&&105===t[16]&&110===t[17]&&97===t[18]&&114===t[19]&&121===t[20]?{ext:"deb",mime:"application/x-deb"}:33===t[0]&&60===t[1]&&97===t[2]&&114===t[3]&&99===t[4]&&104===t[5]&&62===t[6]?{ext:"ar",mime:"application/x-unix-archive"}:237===t[0]&&171===t[1]&&238===t[2]&&219===t[3]?{ext:"rpm",mime:"application/x-rpm"}:31===t[0]&&160===t[1]||31===t[0]&&157===t[1]?{ext:"Z",mime:"application/x-compress"}:76===t[0]&&90===t[1]&&73===t[2]&&80===t[3]?{ext:"lz",mime:"application/x-lzip"}:208===t[0]&&207===t[1]&&17===t[2]&&224===t[3]&&161===t[4]&&177===t[5]&&26===t[6]&&225===t[7]?{ext:"msi",mime:"application/x-msi"}:null:{ext:"swf",mime:"application/x-shockwave-flash"}:{ext:"rar",mime:"application/x-rar-compressed"}:{ext:"zip",mime:"application/zip"}:null}},{}],28:[function(t,e,i){function n(t,e,i){if(!s(e))throw new TypeError("iterator must be a function");arguments.length<3&&(i=this),"[object Array]"===l.call(t)?r(t,e,i):"string"==typeof t?a(t,e,i):o(t,e,i)}function r(t,e,i){for(var n=0,r=t.length;r>n;n++)h.call(t,n)&&e.call(i,t[n],n,t)}function a(t,e,i){for(var n=0,r=t.length;r>n;n++)e.call(i,t.charAt(n),n,t)}function o(t,e,i){for(var n in t)h.call(t,n)&&e.call(i,t[n],n,t)}var s=t("is-function");e.exports=n;var l=Object.prototype.toString,h=Object.prototype.hasOwnProperty},{"is-function":34}],29:[function(t,e,i){(function(t){"undefined"!=typeof window?e.exports=window:"undefined"!=typeof t?e.exports=t:"undefined"!=typeof self?e.exports=self:e.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],30:[function(t,e,i){i.read=function(t,e,i,n,r){var a,o,s=8*r-n-1,l=(1<<s)-1,h=l>>1,f=-7,c=i?r-1:0,u=i?-1:1,p=t[e+c];for(c+=u,a=p&(1<<-f)-1,p>>=-f,f+=s;f>0;a=256*a+t[e+c],c+=u,f-=8);for(o=a&(1<<-f)-1,a>>=-f,f+=n;f>0;o=256*o+t[e+c],c+=u,f-=8);if(0===a)a=1-h;else{if(a===l)return o?NaN:(p?-1:1)*(1/0);o+=Math.pow(2,n),a-=h}return(p?-1:1)*o*Math.pow(2,a-n)},i.write=function(t,e,i,n,r,a){var o,s,l,h=8*a-r-1,f=(1<<h)-1,c=f>>1,u=23===r?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:a-1,d=n?1:-1,m=0>e||0===e&&0>1/e?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,o=f):(o=Math.floor(Math.log(e)/Math.LN2),e*(l=Math.pow(2,-o))<1&&(o--,l*=2),e+=o+c>=1?u/l:u*Math.pow(2,1-c),e*l>=2&&(o++,l/=2),o+c>=f?(s=0,o=f):o+c>=1?(s=(e*l-1)*Math.pow(2,r),o+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,r),o=0));r>=8;t[i+p]=255&s,p+=d,s/=256,r-=8);for(o=o<<r|s,h+=r;h>0;t[i+p]=255&o,p+=d,o/=256,h-=8);t[i+p-d]|=128*m}},{}],31:[function(t,e,i){"function"==typeof Object.create?e.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(t,e){t.super_=e;var i=function(){};i.prototype=e.prototype,t.prototype=new i,t.prototype.constructor=t}},{}],32:[function(t,e,i){"use strict";var n="(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}",r="(?:(?:[0-9a-fA-F:]){1,4}(?:(?::(?:[0-9a-fA-F]){1,4}|:)){2,7})+",a=e.exports=function(t){return t=t||{},t.exact?new RegExp("(?:^"+n+"$)|(?:^"+r+"$)"):new RegExp("(?:"+n+")|(?:"+r+")","g")};a.v4=function(t){return t=t||{},t.exact?new RegExp("^"+n+"$"):new RegExp(n,"g")},a.v6=function(t){return t=t||{},t.exact?new RegExp("^"+r+"$"):new RegExp(r,"g")}},{}],33:[function(t,e,i){e.exports=function(t){return!(null==t||!(t._isBuffer||t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)))}},{}],34:[function(t,e,i){function n(t){var e=r.call(t);return"[object Function]"===e||"function"==typeof t&&"[object RegExp]"!==e||"undefined"!=typeof window&&(t===window.setTimeout||t===window.alert||t===window.confirm||t===window.prompt)}e.exports=n;var r=Object.prototype.toString},{}],35:[function(t,e,i){var n={}.toString;e.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},{}],36:[function(t,e,i){var n=t("./lib/encoder"),r=t("./lib/decoder");e.exports={encode:n,decode:r}},{"./lib/decoder":37,"./lib/encoder":38}],37:[function(t,e,i){(function(t){function i(e){var i=new Uint8Array(e),r=new n;r.parse(i);var a={width:r.width,height:r.height,data:new t(r.width*r.height*4)};return r.copyToImageData(a),a}var n=function(){"use strict";function t(){}function e(t,e){for(var i,n,r=0,a=[],o=16;o>0&&!t[o-1];)o--;a.push({children:[],index:0});var s,l=a[0];for(i=0;o>i;i++){for(n=0;n<t[i];n++){for(l=a.pop(),l.children[l.index]=e[r];l.index>0;)l=a.pop();for(l.index++,a.push(l);a.length<=i;)a.push(s={children:[],index:0}),l.children[l.index]=s.children,l=s;r++}o>i+1&&(a.push(s={children:[],index:0}),l.children[l.index]=s.children,l=s)}return a[0].children}function i(t,e,i,n,r,o,s,l,h){function f(){if(L>0)return L--,P>>L&1;if(P=t[e++],255==P){var i=t[e++];if(i)throw"unexpected marker: "+(P<<8|i).toString(16)}return L=7,P>>>7}function c(t){for(var e,i=t;null!==(e=f());){if(i=i[e],"number"==typeof i)return i;if("object"!==("undefined"==typeof i?"undefined":_typeof(i)))throw"invalid huffman sequence"}return null}function u(t){for(var e=0;t>0;){var i=f();if(null===i)return;e=e<<1|i,t--}return e}function p(t){var e=u(t);return e>=1<<t-1?e:e+(-1<<t)+1}function d(t,e){var i=c(t.huffmanTableDC),n=0===i?0:p(i);e[0]=t.pred+=n;for(var r=1;64>r;){var o=c(t.huffmanTableAC),s=15&o,l=o>>4;if(0!==s){r+=l;var h=a[r];e[h]=p(s),r++}else{if(15>l)break;r+=16}}}function m(t,e){var i=c(t.huffmanTableDC),n=0===i?0:p(i)<<h;e[0]=t.pred+=n}function g(t,e){e[0]|=f()<<h}function b(t,e){if(C>0)return void C--;for(var i=o,n=s;n>=i;){var r=c(t.huffmanTableAC),l=15&r,f=r>>4;if(0!==l){i+=f;var d=a[i];e[d]=p(l)*(1<<h),i++}else{if(15>f){C=u(f)+(1<<f)-1;break}i+=16}}}function v(t,e){for(var i=o,n=s,r=0;n>=i;){var l=a[i];switch(B){case 0:var d=c(t.huffmanTableAC),m=15&d,r=d>>4;if(0===m)15>r?(C=u(r)+(1<<r),B=4):(r=16,B=1);else{if(1!==m)throw"invalid ACn encoding";y=p(m),B=r?2:3}continue;case 1:case 2:e[l]?e[l]+=f()<<h:(r--,0===r&&(B=2==B?3:0));break;case 3:e[l]?e[l]+=f()<<h:(e[l]=y<<h,B=0);break;case 4:e[l]&&(e[l]+=f()<<h)}i++}4===B&&(C--,0===C&&(B=0))}function w(t,e,i,n,r){var a=i/A|0,o=i%A,s=a*t.v+n,l=o*t.h+r;e(t,t.blocks[s][l])}function _(t,e,i){var n=i/t.blocksPerLine|0,r=i%t.blocksPerLine;e(t,t.blocks[n][r])}var y,x,k,E,S,I,M,A=(i.precision,i.samplesPerLine,i.scanLines,i.mcusPerLine),R=i.progressive,T=(i.maxH,i.maxV,e),P=0,L=0,C=0,B=0,z=n.length;M=R?0===o?0===l?m:g:0===l?b:v:d;var O,D,U=0;D=1==z?n[0].blocksPerLine*n[0].blocksPerColumn:A*i.mcusPerColumn,r||(r=D);for(var N,F;D>U;){for(k=0;z>k;k++)n[k].pred=0;if(C=0,1==z)for(x=n[0],I=0;r>I;I++)_(x,M,U),U++;else for(I=0;r>I;I++){for(k=0;z>k;k++)for(x=n[k],N=x.h,F=x.v,E=0;F>E;E++)for(S=0;N>S;S++)w(x,M,U,E,S);if(U++,U===D)break}if(L=0,O=t[e]<<8|t[e+1],65280>O)throw"marker was not found";if(!(O>=65488&&65495>=O))break;e+=2}return e-T}function n(t,e){function i(t,i,n){var r,a,d,m,g,b,v,w,_,y,x=e.quantizationTable,k=n;for(y=0;64>y;y++)k[y]=t[y]*x[y];for(y=0;8>y;++y){var E=8*y;0!=k[1+E]||0!=k[2+E]||0!=k[3+E]||0!=k[4+E]||0!=k[5+E]||0!=k[6+E]||0!=k[7+E]?(r=u*k[0+E]+128>>8,a=u*k[4+E]+128>>8,d=k[2+E],m=k[6+E],g=p*(k[1+E]-k[7+E])+128>>8,w=p*(k[1+E]+k[7+E])+128>>8,b=k[3+E]<<4,v=k[5+E]<<4,_=r-a+1>>1,r=r+a+1>>1,a=_,_=d*c+m*f+128>>8,d=d*f-m*c+128>>8,m=_,_=g-v+1>>1,g=g+v+1>>1,v=_,_=w+b+1>>1,b=w-b+1>>1,w=_,_=r-m+1>>1,r=r+m+1>>1,m=_,_=a-d+1>>1,a=a+d+1>>1,d=_,_=g*h+w*l+2048>>12,g=g*l-w*h+2048>>12,w=_,_=b*s+v*o+2048>>12,b=b*o-v*s+2048>>12,v=_,k[0+E]=r+w,k[7+E]=r-w,k[1+E]=a+v,k[6+E]=a-v,k[2+E]=d+b,k[5+E]=d-b,k[3+E]=m+g,k[4+E]=m-g):(_=u*k[0+E]+512>>10,k[0+E]=_,k[1+E]=_,k[2+E]=_,k[3+E]=_,k[4+E]=_,k[5+E]=_,k[6+E]=_,k[7+E]=_)}for(y=0;8>y;++y){var S=y;0!=k[8+S]||0!=k[16+S]||0!=k[24+S]||0!=k[32+S]||0!=k[40+S]||0!=k[48+S]||0!=k[56+S]?(r=u*k[0+S]+2048>>12,a=u*k[32+S]+2048>>12,d=k[16+S],m=k[48+S],g=p*(k[8+S]-k[56+S])+2048>>12,w=p*(k[8+S]+k[56+S])+2048>>12,b=k[24+S],v=k[40+S],_=r-a+1>>1,r=r+a+1>>1,a=_,_=d*c+m*f+2048>>12,d=d*f-m*c+2048>>12,m=_,_=g-v+1>>1,g=g+v+1>>1,v=_,_=w+b+1>>1,b=w-b+1>>1,w=_,_=r-m+1>>1,r=r+m+1>>1,m=_,_=a-d+1>>1,a=a+d+1>>1,d=_,_=g*h+w*l+2048>>12,g=g*l-w*h+2048>>12,w=_,_=b*s+v*o+2048>>12,b=b*o-v*s+2048>>12,v=_,k[0+S]=r+w,k[56+S]=r-w,k[8+S]=a+v,k[48+S]=a-v,k[16+S]=d+b,k[40+S]=d-b,k[24+S]=m+g,k[32+S]=m-g):(_=u*n[y+0]+8192>>14,k[0+S]=_,k[8+S]=_,k[16+S]=_,k[24+S]=_,k[32+S]=_,k[40+S]=_,k[48+S]=_,k[56+S]=_)}for(y=0;64>y;++y){var I=128+(k[y]+8>>4);i[y]=0>I?0:I>255?255:I}}for(var n,r,a=[],d=e.blocksPerLine,m=e.blocksPerColumn,g=d<<3,b=new Int32Array(64),v=new Uint8Array(64),w=0;m>w;w++){var _=w<<3;for(n=0;8>n;n++)a.push(new Uint8Array(g));for(var y=0;d>y;y++){i(e.blocks[w][y],v,b);var x=0,k=y<<3;for(r=0;8>r;r++){var E=a[_+r];for(n=0;8>n;n++)E[k+n]=v[x++]}}}return a}function r(t){return 0>t?0:t>255?255:t}var a=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),o=4017,s=799,l=3406,h=2276,f=1567,c=3784,u=5793,p=2896;return t.prototype={load:function(t){var e=new XMLHttpRequest;e.open("GET",t,!0),e.responseType="arraybuffer",e.onload=function(){var t=new Uint8Array(e.response||e.mozResponseArrayBuffer);this.parse(t),this.onload&&this.onload()}.bind(this),e.send(null)},parse:function(t){function r(){var e=t[f]<<8|t[f+1];return f+=2,e}function o(){var e=r(),i=t.subarray(f,f+e-2);return f+=i.length,i}function s(t){var e,i,n=0,r=0;for(i in t.components)t.components.hasOwnProperty(i)&&(e=t.components[i],n<e.h&&(n=e.h),r<e.v&&(r=e.v));var a=Math.ceil(t.samplesPerLine/8/n),o=Math.ceil(t.scanLines/8/r);for(i in t.components)if(t.components.hasOwnProperty(i)){e=t.components[i];for(var s=Math.ceil(Math.ceil(t.samplesPerLine/8)*e.h/n),l=Math.ceil(Math.ceil(t.scanLines/8)*e.v/r),h=a*e.h,f=o*e.v,c=[],u=0;f>u;u++){for(var p=[],d=0;h>d;d++)p.push(new Int32Array(64));c.push(p)}e.blocksPerLine=s,e.blocksPerColumn=l,e.blocks=c}t.maxH=n,t.maxV=r,t.mcusPerLine=a,t.mcusPerColumn=o}var l,h,f=0,c=(t.length,null),u=null,p=[],d=[],m=[],g=[],b=r();if(65496!=b)throw"SOI not found";for(b=r();65497!=b;){var v,w;switch(b){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var _=o();65504===b&&74===_[0]&&70===_[1]&&73===_[2]&&70===_[3]&&0===_[4]&&(c={version:{major:_[5],minor:_[6]},densityUnits:_[7],xDensity:_[8]<<8|_[9],yDensity:_[10]<<8|_[11],thumbWidth:_[12],thumbHeight:_[13],thumbData:_.subarray(14,14+3*_[12]*_[13])}),65518===b&&65===_[0]&&100===_[1]&&111===_[2]&&98===_[3]&&101===_[4]&&0===_[5]&&(u={version:_[6],flags0:_[7]<<8|_[8],flags1:_[9]<<8|_[10],transformCode:_[11]});break;case 65499:for(var y=r(),x=y+f-2;x>f;){var k=t[f++],E=new Int32Array(64);if(k>>4===0)for(w=0;64>w;w++){var S=a[w];E[S]=t[f++]}else{if(k>>4!==1)throw"DQT: invalid table spec";for(w=0;64>w;w++){var S=a[w];E[S]=r()}}p[15&k]=E}break;case 65472:case 65473:case 65474:r(),l={},l.extended=65473===b,l.progressive=65474===b,l.precision=t[f++],l.scanLines=r(),l.samplesPerLine=r(),l.components={},l.componentsOrder=[];var I,M=t[f++];for(v=0;M>v;v++){I=t[f];var A=t[f+1]>>4,R=15&t[f+1],T=t[f+2];l.componentsOrder.push(I),l.components[I]={h:A,v:R,quantizationIdx:T},f+=3}s(l),d.push(l);break;case 65476:var P=r();for(v=2;P>v;){var L=t[f++],C=new Uint8Array(16),B=0;for(w=0;16>w;w++,f++)B+=C[w]=t[f];var z=new Uint8Array(B);for(w=0;B>w;w++,f++)z[w]=t[f];v+=17+B,(L>>4===0?g:m)[15&L]=e(C,z)}break;case 65501:r(),h=r();break;case 65498:var O,D=(r(),t[f++]),U=[];for(v=0;D>v;v++){O=l.components[t[f++]];var N=t[f++];O.huffmanTableDC=g[N>>4],O.huffmanTableAC=m[15&N],U.push(O)}var F=t[f++],j=t[f++],H=t[f++],W=i(t,f,l,U,h,F,j,H>>4,15&H);f+=W;break;default:if(255==t[f-3]&&t[f-2]>=192&&t[f-2]<=254){f-=3;break}throw"unknown JPEG marker "+b.toString(16)}b=r()}if(1!=d.length)throw"only single frame JPEGs supported";for(var v=0;v<d.length;v++){var G=d[v].components;for(var w in G)G[w].quantizationTable=p[G[w].quantizationIdx],delete G[w].quantizationIdx}this.width=l.samplesPerLine,this.height=l.scanLines,this.jfif=c,this.adobe=u,this.components=[];for(var v=0;v<l.componentsOrder.length;v++){var O=l.components[l.componentsOrder[v]];this.components.push({lines:n(l,O),scaleX:O.h/l.maxH,scaleY:O.v/l.maxV})}},getData:function(t,e){var i,n,a,o,s,l,h,f,c,u,p,d,m,g,b,v,w,_,y,x,k,E=this.width/t,S=this.height/e,I=0,M=t*e*this.components.length,A=new Uint8Array(M);switch(this.components.length){case 1:for(i=this.components[0],u=0;e>u;u++)for(s=i.lines[0|u*i.scaleY*S],c=0;t>c;c++)p=s[0|c*i.scaleX*E],A[I++]=p;break;case 2:for(i=this.components[0],n=this.components[1],u=0;e>u;u++)for(s=i.lines[0|u*i.scaleY*S],l=n.lines[0|u*n.scaleY*S],c=0;t>c;c++)p=s[0|c*i.scaleX*E],A[I++]=p,p=l[0|c*n.scaleX*E],A[I++]=p;break;case 3:for(k=!0,this.adobe&&this.adobe.transformCode?k=!0:"undefined"!=typeof this.colorTransform&&(k=!!this.colorTransform),i=this.components[0],n=this.components[1],a=this.components[2],u=0;e>u;u++)for(s=i.lines[0|u*i.scaleY*S],l=n.lines[0|u*n.scaleY*S],h=a.lines[0|u*a.scaleY*S],c=0;t>c;c++)k?(p=s[0|c*i.scaleX*E],d=l[0|c*n.scaleX*E],m=h[0|c*a.scaleX*E],_=r(p+1.402*(m-128)),y=r(p-.3441363*(d-128)-.71413636*(m-128)),x=r(p+1.772*(d-128))):(_=s[0|c*i.scaleX*E],y=l[0|c*n.scaleX*E],x=h[0|c*a.scaleX*E]),A[I++]=_,A[I++]=y,A[I++]=x;break;case 4:if(!this.adobe)throw"Unsupported color mode (4 components)";for(k=!1,this.adobe&&this.adobe.transformCode?k=!0:"undefined"!=typeof this.colorTransform&&(k=!!this.colorTransform),i=this.components[0],n=this.components[1],a=this.components[2],o=this.components[3],u=0;e>u;u++)for(s=i.lines[0|u*i.scaleY*S],l=n.lines[0|u*n.scaleY*S],h=a.lines[0|u*a.scaleY*S],f=o.lines[0|u*o.scaleY*S],c=0;t>c;c++)k?(p=s[0|c*i.scaleX*E],d=l[0|c*n.scaleX*E],m=h[0|c*a.scaleX*E],g=f[0|c*o.scaleX*E],b=255-r(p+1.402*(m-128)),v=255-r(p-.3441363*(d-128)-.71413636*(m-128)),w=255-r(p+1.772*(d-128))):(b=s[0|c*i.scaleX*E],v=l[0|c*n.scaleX*E],w=h[0|c*a.scaleX*E],g=f[0|c*o.scaleX*E]),A[I++]=255-b,A[I++]=255-v,A[I++]=255-w,A[I++]=255-g;break;default:throw"Unsupported color mode"}return A},copyToImageData:function(t){var e,i,n,a,o,s,l,h,f,c=t.width,u=t.height,p=t.data,d=this.getData(c,u),m=0,g=0;switch(this.components.length){case 1:for(i=0;u>i;i++)for(e=0;c>e;e++)n=d[m++],p[g++]=n,p[g++]=n,p[g++]=n,p[g++]=255;break;case 3:for(i=0;u>i;i++)for(e=0;c>e;e++)l=d[m++],h=d[m++],f=d[m++],p[g++]=l,p[g++]=h,p[g++]=f,p[g++]=255;break;case 4:for(i=0;u>i;i++)for(e=0;c>e;e++)o=d[m++],s=d[m++],n=d[m++],a=d[m++],l=255-r(o*(1-a/255)+a),h=255-r(s*(1-a/255)+a),f=255-r(n*(1-a/255)+a),p[g++]=l,p[g++]=h,p[g++]=f,p[g++]=255;break;default:throw"Unsupported color mode"}}},t}();e.exports=i}).call(this,t("buffer").Buffer)},{buffer:14}],38:[function(t,e,i){(function(t){function i(e){function i(t){for(var e=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],i=0;64>i;i++){var n=S((e[i]*t+50)/100);1>n?n=1:n>255&&(n=255),I[H[i]]=n}for(var r=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],a=0;64>a;a++){var o=S((r[a]*t+50)/100);1>o?o=1:o>255&&(o=255),M[H[a]]=o}for(var s=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],l=0,h=0;8>h;h++)for(var f=0;8>f;f++)A[l]=1/(I[H[l]]*s[h]*s[f]*8),R[l]=1/(M[H[l]]*s[h]*s[f]*8),l++}function n(t,e){for(var i=0,n=0,r=new Array,a=1;16>=a;a++){for(var o=1;o<=t[a];o++)r[e[n]]=[],r[e[n]][0]=i,r[e[n]][1]=a,n++,i++;i*=2}return r}function r(){_=n(W,G),y=n(Y,X),x=n(q,Z),k=n(V,J)}function a(){for(var t=1,e=2,i=1;15>=i;i++){for(var n=t;e>n;n++)P[32767+n]=i,T[32767+n]=[],T[32767+n][1]=i,T[32767+n][0]=n;for(var r=-(e-1);-t>=r;r++)P[32767+r]=i,T[32767+r]=[],T[32767+r][1]=i,T[32767+r][0]=e-1+r;t<<=1,e<<=1}}function o(){for(var t=0;256>t;t++)j[t]=19595*t,j[t+256>>0]=38470*t,j[t+512>>0]=7471*t+32768,j[t+768>>0]=-11059*t,j[t+1024>>0]=-21709*t,j[t+1280>>0]=32768*t+8421375,j[t+1536>>0]=-27439*t,j[t+1792>>0]=-5329*t}function s(t){for(var e=t[0],i=t[1]-1;i>=0;)e&1<<i&&(z|=1<<O),i--,O--,0>O&&(255==z?(l(255),l(0)):l(z),O=7,z=0)}function l(t){B.push(t)}function h(t){l(t>>8&255),l(255&t)}function f(t,e){var i,n,r,a,o,s,l,h,f,c=0,u=8,p=64;for(f=0;u>f;++f){i=t[c],n=t[c+1],r=t[c+2],a=t[c+3],o=t[c+4],s=t[c+5],l=t[c+6],h=t[c+7];var d=i+h,m=i-h,g=n+l,b=n-l,v=r+s,w=r-s,_=a+o,y=a-o,x=d+_,k=d-_,E=g+v,S=g-v;t[c]=x+E,t[c+4]=x-E;var I=.707106781*(S+k);t[c+2]=k+I,t[c+6]=k-I,x=y+w,E=w+b,S=b+m;var M=.382683433*(x-S),A=.5411961*x+M,R=1.306562965*S+M,T=.707106781*E,P=m+T,C=m-T;t[c+5]=C+A,t[c+3]=C-A,t[c+1]=P+R,t[c+7]=P-R,c+=8}for(c=0,f=0;u>f;++f){i=t[c],n=t[c+8],r=t[c+16],a=t[c+24],o=t[c+32],s=t[c+40],l=t[c+48],h=t[c+56];var B=i+h,z=i-h,O=n+l,D=n-l,U=r+s,N=r-s,F=a+o,j=a-o,H=B+F,W=B-F,G=O+U,q=O-U;t[c]=H+G,t[c+32]=H-G;var Z=.707106781*(q+W);t[c+16]=W+Z,t[c+48]=W-Z,H=j+N,G=N+D,q=D+z;var Y=.382683433*(H-q),X=.5411961*H+Y,V=1.306562965*q+Y,J=.707106781*G,$=z+J,K=z-J;t[c+40]=K+X,t[c+24]=K-X,t[c+8]=$+V,t[c+56]=$-V,c++}var Q;for(f=0;p>f;++f)Q=t[f]*e[f],L[f]=Q>0?Q+.5|0:Q-.5|0;return L}function c(){h(65504),h(16),l(74),l(70),l(73),l(70),l(0),l(1),l(1),l(0),h(1),h(1),l(0),l(0)}function u(t,e){h(65472),h(17),l(8),h(e),h(t),l(3),l(1),l(17),l(0),l(2),l(17),l(1),l(3),l(17),l(1)}function p(){h(65499),h(132),l(0);for(var t=0;64>t;t++)l(I[t]);l(1);for(var e=0;64>e;e++)l(M[e])}function d(){h(65476),h(418),l(0);for(var t=0;16>t;t++)l(W[t+1]);for(var e=0;11>=e;e++)l(G[e]);l(16);for(var i=0;16>i;i++)l(q[i+1]);for(var n=0;161>=n;n++)l(Z[n]);l(1);for(var r=0;16>r;r++)l(Y[r+1]);for(var a=0;11>=a;a++)l(X[a]);l(17);for(var o=0;16>o;o++)l(V[o+1]);for(var s=0;161>=s;s++)l(J[s])}function m(){h(65498),h(12),l(3),l(1),l(0),l(2),l(17),l(3),l(17),l(0),l(63),l(0)}function g(t,e,i,n,r){for(var a,o=r[0],l=r[240],h=16,c=63,u=64,p=f(t,e),d=0;u>d;++d)C[H[d]]=p[d];var m=C[0]-i;i=C[0],0==m?s(n[0]):(a=32767+m,s(n[P[a]]),s(T[a]));for(var g=63;g>0&&0==C[g];g--);if(0==g)return s(o),i;for(var b,v=1;g>=v;){for(var w=v;0==C[v]&&g>=v;++v);var _=v-w;if(_>=h){b=_>>4;for(var y=1;b>=y;++y)s(l);_=15&_}a=32767+C[v],s(r[(_<<4)+P[a]]),s(T[a]),v++}return g!=c&&s(o),i}function b(){for(var t=String.fromCharCode,e=0;256>e;e++)F[e]=t(e)}function v(t){if(0>=t&&(t=1),t>100&&(t=100),E!=t){var e=0;e=50>t?Math.floor(5e3/t):Math.floor(200-2*t),i(e),E=t}}function w(){var t=(new Date).getTime();e||(e=50),b(),r(),a(),o(),v(e);(new Date).getTime()-t}var _,y,x,k,E,S=(Math.round,Math.floor),I=new Array(64),M=new Array(64),A=new Array(64),R=new Array(64),T=new Array(65535),P=new Array(65535),L=new Array(64),C=new Array(64),B=[],z=0,O=7,D=new Array(64),U=new Array(64),N=new Array(64),F=new Array(256),j=new Array(2048),H=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],W=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],G=[0,1,2,3,4,5,6,7,8,9,10,11],q=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],Z=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],Y=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],X=[0,1,2,3,4,5,6,7,8,9,10,11],V=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],J=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];this.encode=function(e,i){(new Date).getTime();i&&v(i),B=new Array,z=0,O=7,h(65496),c(),p(),u(e.width,e.height),d(),m();var n=0,r=0,a=0;z=0,O=7,this.encode.displayName="_encode_";for(var o,l,f,b,w,E,S,I,M,T=e.data,P=e.width,L=e.height,C=4*P,F=0;L>F;){for(o=0;C>o;){for(w=C*F+o,E=w,S=-1,I=0,M=0;64>M;M++)I=M>>3,S=4*(7&M),E=w+I*C+S,F+I>=L&&(E-=C*(F+1+I-L)),o+S>=C&&(E-=o+S-C+4),l=T[E++],f=T[E++],b=T[E++],D[M]=(j[l]+j[f+256>>0]+j[b+512>>0]>>16)-128,U[M]=(j[l+768>>0]+j[f+1024>>0]+j[b+1280>>0]>>16)-128,N[M]=(j[l+1280>>0]+j[f+1536>>0]+j[b+1792>>0]>>16)-128;n=g(D,A,n,_,x),r=g(U,R,r,y,k),a=g(N,R,a,y,k),o+=32}F+=8}if(O>=0){var H=[];H[1]=O+1,H[0]=(1<<O+1)-1,s(H)}return h(65497),new t(B)},w()}function n(t,e){"undefined"==typeof e&&(e=50);var n=new i(e),r=n.encode(t,e);return{data:r,width:t.width,height:t.height}}e.exports=n}).call(this,t("buffer").Buffer)},{buffer:14}],39:[function(t,e,i){(function(i){function n(t){var e=Object.prototype.toString;return"[object ArrayBuffer]"===e.call(t)}function r(t){if(u)return c(t,{responseType:"arraybuffer"});if("undefined"==typeof window.XMLHttpRequest)throw new Error("your browser does not support XHR loading");var e=new window.XMLHttpRequest;return e.overrideMimeType("text/plain; charset=x-user-defined"),c({xhr:e},t)}var a=t("xhr"),o=function(){},s=t("parse-bmfont-ascii"),l=t("parse-bmfont-xml"),h=t("parse-bmfont-binary"),f=t("./lib/is-binary"),c=t("xtend"),u=function(){return window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}();e.exports=function(t,e){e="function"==typeof e?e:o,"string"==typeof t?t={uri:t}:t||(t={});var c=t.binary;c&&(t=r(t)),a(t,function(r,a,c){if(r)return e(r);if(!/^2/.test(a.statusCode))return e(new Error("http status code: "+a.statusCode));if(!c)return e(new Error("no body result"));var u=!1;if(n(c)){var p=new Uint8Array(c);c=new i(p,"binary")}f(c)&&(u=!0,"string"==typeof c&&(c=new i(c,"binary"))),u||(i.isBuffer(c)&&(c=c.toString(t.encoding)),c=c.trim());var d;try{var m=a.headers["content-type"];d=u?h(c):/json/.test(m)||"{"===c.charAt(0)?JSON.parse(c):/xml/.test(m)||"<"===c.charAt(0)?l(c):s(c)}catch(g){e(new Error("error parsing font "+g.message)),e=o}e(null,d)})}}).call(this,t("buffer").Buffer)},{"./lib/is-binary":40,buffer:14,"parse-bmfont-ascii":55,"parse-bmfont-binary":56,"parse-bmfont-xml":57,xhr:105,xtend:107}],40:[function(t,e,i){(function(i){var n=t("buffer-equal"),r=new i([66,77,70,3]);e.exports=function(t){return"string"==typeof t?"BMF"===t.substring(0,3):t.length>4&&n(t.slice(0,4),r)}}).call(this,t("buffer").Buffer)},{buffer:14,"buffer-equal":13}],41:[function(t,e,i){(function(i){function n(){this.types=Object.create(null),this.extensions=Object.create(null)}var r=(t("path"),t("fs"));n.prototype.define=function(t){for(var e in t){for(var n=t[e],r=0;r<n.length;r++)i.env.DEBUG_MIME&&this.types[n]&&console.warn(this._loading.replace(/.*\//,""),'changes "'+n[r]+'" extension type from '+this.types[n]+" to "+e),this.types[n[r]]=e;this.extensions[e]||(this.extensions[e]=n[0])}},n.prototype.load=function(t){this._loading=t;var e={},i=r.readFileSync(t,"ascii"),n=i.split(/[\r\n]+/);n.forEach(function(t){var i=t.replace(/\s*#.*|^\s*|\s*$/g,"").split(/\s+/);e[i.shift()]=i}),this.define(e),this._loading=null},n.prototype.lookup=function(t,e){var i=t.replace(/.*[\.\/\\]/,"").toLowerCase();return this.types[i]||e||this.default_type},n.prototype.extension=function(t){var e=t.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();return this.extensions[e]};var a=new n;a.define(t("./types.json")),a.default_type=a.lookup("bin"),a.Mime=n,a.charsets={lookup:function(t,e){return/^text\//.test(t)?"UTF-8":e}},e.exports=a}).call(this,t("_process"))},{"./types.json":42,_process:12,fs:11,path:60}],42:[function(t,e,i){e.exports={"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mdp"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/font-woff":["woff"],"application/font-woff2":["woff2"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/prs.cww":["cww"],"application/pskc+xml":["pskcxml"],"application/rdf+xml":["rdf"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],
"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/voicexml+xml":["vxml"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["dmg"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-otf":["otf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-ttf":["ttf","ttc"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["iso"],"application/x-java-jnlp-file":["jnlp"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdownload":["exe","dll","com","bat","msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["wmf","wmz","emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-nzb":["nzb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["rar"],"application/x-research-info-systems":["ris"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["obj"],"application/x-ustar":["ustar"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt"],"application/x-xfig":["fig"],"application/x-xliff+xml":["xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp4":["mp4a","m4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/webm":["weba"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-wav":["wav"],"audio/xm":["xm"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"font/opentype":["otf"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/g3fax":["g3"],"image/gif":["gif"],"image/ief":["ief"],"image/jpeg":["jpeg","jpg","jpe"],"image/ktx":["ktx"],"image/png":["png"],"image/prs.btif":["btif"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/tiff":["tiff","tif"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/webp":["webp"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["ico"],"image/x-mrsid-image":["sid"],"image/x-pcx":["pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/rfc822":["eml","mime"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.vtu":["vtu"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["x3db","x3dbz"],"model/x3d+vrml":["x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee"],"text/css":["css"],"text/csv":["csv"],"text/hjson":["hjson"],"text/html":["html","htm"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/prs.lines.tag":["dsc"],"text/richtext":["rtx"],"text/sgml":["sgml","sgm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/vtt":["vtt"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["markdown","md","mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-pascal":["p","pas"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/webm":["webm"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]}},{}],43:[function(t,e,i){function n(t){var e=!1;return function(){return e?void 0:(e=!0,t.apply(this,arguments))}}e.exports=n,n.proto=n(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return n(this)},configurable:!0})})},{}],44:[function(t,e,i){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;i.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var i=e.shift();if(i){if("object"!==("undefined"==typeof i?"undefined":_typeof(i)))throw new TypeError(i+"must be non-object");for(var n in i)i.hasOwnProperty(n)&&(t[n]=i[n])}}return t},i.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var r={arraySet:function(t,e,i,n,r){if(e.subarray&&t.subarray)return void t.set(e.subarray(i,i+n),r);for(var a=0;n>a;a++)t[r+a]=e[i+a]},flattenChunks:function(t){var e,i,n,r,a,o;for(n=0,e=0,i=t.length;i>e;e++)n+=t[e].length;for(o=new Uint8Array(n),r=0,e=0,i=t.length;i>e;e++)a=t[e],o.set(a,r),r+=a.length;return o}},a={arraySet:function(t,e,i,n,r){for(var a=0;n>a;a++)t[r+a]=e[i+a]},flattenChunks:function(t){return[].concat.apply([],t)}};i.setTyped=function(t){t?(i.Buf8=Uint8Array,i.Buf16=Uint16Array,i.Buf32=Int32Array,i.assign(i,r)):(i.Buf8=Array,i.Buf16=Array,i.Buf32=Array,i.assign(i,a))},i.setTyped(n)},{}],45:[function(t,e,i){"use strict";function n(t,e,i,n){for(var r=65535&t|0,a=t>>>16&65535|0,o=0;0!==i;){o=i>2e3?2e3:i,i-=o;do r=r+e[n++]|0,a=a+r|0;while(--o);r%=65521,a%=65521}return r|a<<16|0}e.exports=n},{}],46:[function(t,e,i){e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],47:[function(t,e,i){"use strict";function n(){for(var t,e=[],i=0;256>i;i++){t=i;for(var n=0;8>n;n++)t=1&t?3988292384^t>>>1:t>>>1;e[i]=t}return e}function r(t,e,i,n){var r=a,o=n+i;t=-1^t;for(var s=n;o>s;s++)t=t>>>8^r[255&(t^e[s])];return-1^t}var a=n();e.exports=r},{}],48:[function(t,e,i){"use strict";function n(t,e){return t.msg=L[e],e}function r(t){return(t<<1)-(t>4?9:0)}function a(t){for(var e=t.length;--e>=0;)t[e]=0}function o(t){var e=t.state,i=e.pending;i>t.avail_out&&(i=t.avail_out),0!==i&&(A.arraySet(t.output,e.pending_buf,e.pending_out,i,t.next_out),t.next_out+=i,e.pending_out+=i,t.total_out+=i,t.avail_out-=i,e.pending-=i,0===e.pending&&(e.pending_out=0))}function s(t,e){R._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,o(t.strm)}function l(t,e){t.pending_buf[t.pending++]=e}function h(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function f(t,e,i,n){var r=t.avail_in;return r>n&&(r=n),0===r?0:(t.avail_in-=r,A.arraySet(e,t.input,t.next_in,r,i),1===t.state.wrap?t.adler=T(t.adler,e,r,i):2===t.state.wrap&&(t.adler=P(t.adler,e,r,i)),t.next_in+=r,t.total_in+=r,r)}function c(t,e){var i,n,r=t.max_chain_length,a=t.strstart,o=t.prev_length,s=t.nice_match,l=t.strstart>t.w_size-ht?t.strstart-(t.w_size-ht):0,h=t.window,f=t.w_mask,c=t.prev,u=t.strstart+lt,p=h[a+o-1],d=h[a+o];t.prev_length>=t.good_match&&(r>>=2),s>t.lookahead&&(s=t.lookahead);do if(i=e,h[i+o]===d&&h[i+o-1]===p&&h[i]===h[a]&&h[++i]===h[a+1]){a+=2,i++;do;while(h[++a]===h[++i]&&h[++a]===h[++i]&&h[++a]===h[++i]&&h[++a]===h[++i]&&h[++a]===h[++i]&&h[++a]===h[++i]&&h[++a]===h[++i]&&h[++a]===h[++i]&&u>a);if(n=lt-(u-a),a=u-lt,n>o){if(t.match_start=e,o=n,n>=s)break;p=h[a+o-1],d=h[a+o]}}while((e=c[e&f])>l&&0!==--r);return o<=t.lookahead?o:t.lookahead}function u(t){var e,i,n,r,a,o=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=o+(o-ht)){A.arraySet(t.window,t.window,o,o,0),t.match_start-=o,t.strstart-=o,t.block_start-=o,i=t.hash_size,e=i;do n=t.head[--e],t.head[e]=n>=o?n-o:0;while(--i);i=o,e=i;do n=t.prev[--e],t.prev[e]=n>=o?n-o:0;while(--i);r+=o}if(0===t.strm.avail_in)break;if(i=f(t.strm,t.window,t.strstart+t.lookahead,r),t.lookahead+=i,t.lookahead+t.insert>=st)for(a=t.strstart-t.insert,t.ins_h=t.window[a],t.ins_h=(t.ins_h<<t.hash_shift^t.window[a+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[a+st-1])&t.hash_mask,t.prev[a&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=a,a++,t.insert--,!(t.lookahead+t.insert<st)););}while(t.lookahead<ht&&0!==t.strm.avail_in)}function p(t,e){var i=65535;for(i>t.pending_buf_size-5&&(i=t.pending_buf_size-5);;){if(t.lookahead<=1){if(u(t),0===t.lookahead&&e===C)return vt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+i;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,s(t,!1),0===t.strm.avail_out))return vt;if(t.strstart-t.block_start>=t.w_size-ht&&(s(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===O?(s(t,!0),0===t.strm.avail_out?_t:yt):t.strstart>t.block_start&&(s(t,!1),0===t.strm.avail_out)?vt:vt}function d(t,e){for(var i,n;;){if(t.lookahead<ht){if(u(t),t.lookahead<ht&&e===C)return vt;if(0===t.lookahead)break}if(i=0,t.lookahead>=st&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==i&&t.strstart-i<=t.w_size-ht&&(t.match_length=c(t,i)),t.match_length>=st)if(n=R._tr_tally(t,t.strstart-t.match_start,t.match_length-st),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=st){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else n=R._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(s(t,!1),0===t.strm.avail_out))return vt}return t.insert=t.strstart<st-1?t.strstart:st-1,e===O?(s(t,!0),0===t.strm.avail_out?_t:yt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?vt:wt}function m(t,e){for(var i,n,r;;){if(t.lookahead<ht){if(u(t),t.lookahead<ht&&e===C)return vt;if(0===t.lookahead)break}if(i=0,t.lookahead>=st&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=st-1,0!==i&&t.prev_length<t.max_lazy_match&&t.strstart-i<=t.w_size-ht&&(t.match_length=c(t,i),t.match_length<=5&&(t.strategy===G||t.match_length===st&&t.strstart-t.match_start>4096)&&(t.match_length=st-1)),t.prev_length>=st&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-st,n=R._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-st),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=r&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,i=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],
t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=st-1,t.strstart++,n&&(s(t,!1),0===t.strm.avail_out))return vt}else if(t.match_available){if(n=R._tr_tally(t,0,t.window[t.strstart-1]),n&&s(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return vt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=R._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<st-1?t.strstart:st-1,e===O?(s(t,!0),0===t.strm.avail_out?_t:yt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?vt:wt}function g(t,e){for(var i,n,r,a,o=t.window;;){if(t.lookahead<=lt){if(u(t),t.lookahead<=lt&&e===C)return vt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=st&&t.strstart>0&&(r=t.strstart-1,n=o[r],n===o[++r]&&n===o[++r]&&n===o[++r])){a=t.strstart+lt;do;while(n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&a>r);t.match_length=lt-(a-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=st?(i=R._tr_tally(t,1,t.match_length-st),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(i=R._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),i&&(s(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===O?(s(t,!0),0===t.strm.avail_out?_t:yt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?vt:wt}function b(t,e){for(var i;;){if(0===t.lookahead&&(u(t),0===t.lookahead)){if(e===C)return vt;break}if(t.match_length=0,i=R._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,i&&(s(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===O?(s(t,!0),0===t.strm.avail_out?_t:yt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?vt:wt}function v(t){t.window_size=2*t.w_size,a(t.head),t.max_lazy_match=M[t.level].max_lazy,t.good_match=M[t.level].good_length,t.nice_match=M[t.level].nice_length,t.max_chain_length=M[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=st-1,t.match_available=0,t.ins_h=0}function w(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=J,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new A.Buf16(2*at),this.dyn_dtree=new A.Buf16(2*(2*nt+1)),this.bl_tree=new A.Buf16(2*(2*rt+1)),a(this.dyn_ltree),a(this.dyn_dtree),a(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new A.Buf16(ot+1),this.heap=new A.Buf16(2*it+1),a(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new A.Buf16(2*it+1),a(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function _(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=V,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?ct:gt,t.adler=2===e.wrap?0:1,e.last_flush=C,R._tr_init(e),U):n(t,F)}function y(t){var e=_(t);return e===U&&v(t.state),e}function x(t,e){return t&&t.state?2!==t.state.wrap?F:(t.state.gzhead=e,U):F}function k(t,e,i,r,a,o){if(!t)return F;var s=1;if(e===W&&(e=6),0>r?(s=0,r=-r):r>15&&(s=2,r-=16),1>a||a>$||i!==J||8>r||r>15||0>e||e>9||0>o||o>Y)return n(t,F);8===r&&(r=9);var l=new w;return t.state=l,l.strm=t,l.wrap=s,l.gzhead=null,l.w_bits=r,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=a+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+st-1)/st),l.window=new A.Buf8(2*l.w_size),l.head=new A.Buf16(l.hash_size),l.prev=new A.Buf16(l.w_size),l.lit_bufsize=1<<a+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new A.Buf8(l.pending_buf_size),l.d_buf=l.lit_bufsize>>1,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=o,l.method=i,y(t)}function E(t,e){return k(t,e,J,K,Q,X)}function S(t,e){var i,s,f,c;if(!t||!t.state||e>D||0>e)return t?n(t,F):F;if(s=t.state,!t.output||!t.input&&0!==t.avail_in||s.status===bt&&e!==O)return n(t,0===t.avail_out?H:F);if(s.strm=t,i=s.last_flush,s.last_flush=e,s.status===ct)if(2===s.wrap)t.adler=0,l(s,31),l(s,139),l(s,8),s.gzhead?(l(s,(s.gzhead.text?1:0)+(s.gzhead.hcrc?2:0)+(s.gzhead.extra?4:0)+(s.gzhead.name?8:0)+(s.gzhead.comment?16:0)),l(s,255&s.gzhead.time),l(s,s.gzhead.time>>8&255),l(s,s.gzhead.time>>16&255),l(s,s.gzhead.time>>24&255),l(s,9===s.level?2:s.strategy>=q||s.level<2?4:0),l(s,255&s.gzhead.os),s.gzhead.extra&&s.gzhead.extra.length&&(l(s,255&s.gzhead.extra.length),l(s,s.gzhead.extra.length>>8&255)),s.gzhead.hcrc&&(t.adler=P(t.adler,s.pending_buf,s.pending,0)),s.gzindex=0,s.status=ut):(l(s,0),l(s,0),l(s,0),l(s,0),l(s,0),l(s,9===s.level?2:s.strategy>=q||s.level<2?4:0),l(s,xt),s.status=gt);else{var u=J+(s.w_bits-8<<4)<<8,p=-1;p=s.strategy>=q||s.level<2?0:s.level<6?1:6===s.level?2:3,u|=p<<6,0!==s.strstart&&(u|=ft),u+=31-u%31,s.status=gt,h(s,u),0!==s.strstart&&(h(s,t.adler>>>16),h(s,65535&t.adler)),t.adler=1}if(s.status===ut)if(s.gzhead.extra){for(f=s.pending;s.gzindex<(65535&s.gzhead.extra.length)&&(s.pending!==s.pending_buf_size||(s.gzhead.hcrc&&s.pending>f&&(t.adler=P(t.adler,s.pending_buf,s.pending-f,f)),o(t),f=s.pending,s.pending!==s.pending_buf_size));)l(s,255&s.gzhead.extra[s.gzindex]),s.gzindex++;s.gzhead.hcrc&&s.pending>f&&(t.adler=P(t.adler,s.pending_buf,s.pending-f,f)),s.gzindex===s.gzhead.extra.length&&(s.gzindex=0,s.status=pt)}else s.status=pt;if(s.status===pt)if(s.gzhead.name){f=s.pending;do{if(s.pending===s.pending_buf_size&&(s.gzhead.hcrc&&s.pending>f&&(t.adler=P(t.adler,s.pending_buf,s.pending-f,f)),o(t),f=s.pending,s.pending===s.pending_buf_size)){c=1;break}c=s.gzindex<s.gzhead.name.length?255&s.gzhead.name.charCodeAt(s.gzindex++):0,l(s,c)}while(0!==c);s.gzhead.hcrc&&s.pending>f&&(t.adler=P(t.adler,s.pending_buf,s.pending-f,f)),0===c&&(s.gzindex=0,s.status=dt)}else s.status=dt;if(s.status===dt)if(s.gzhead.comment){f=s.pending;do{if(s.pending===s.pending_buf_size&&(s.gzhead.hcrc&&s.pending>f&&(t.adler=P(t.adler,s.pending_buf,s.pending-f,f)),o(t),f=s.pending,s.pending===s.pending_buf_size)){c=1;break}c=s.gzindex<s.gzhead.comment.length?255&s.gzhead.comment.charCodeAt(s.gzindex++):0,l(s,c)}while(0!==c);s.gzhead.hcrc&&s.pending>f&&(t.adler=P(t.adler,s.pending_buf,s.pending-f,f)),0===c&&(s.status=mt)}else s.status=mt;if(s.status===mt&&(s.gzhead.hcrc?(s.pending+2>s.pending_buf_size&&o(t),s.pending+2<=s.pending_buf_size&&(l(s,255&t.adler),l(s,t.adler>>8&255),t.adler=0,s.status=gt)):s.status=gt),0!==s.pending){if(o(t),0===t.avail_out)return s.last_flush=-1,U}else if(0===t.avail_in&&r(e)<=r(i)&&e!==O)return n(t,H);if(s.status===bt&&0!==t.avail_in)return n(t,H);if(0!==t.avail_in||0!==s.lookahead||e!==C&&s.status!==bt){var d=s.strategy===q?b(s,e):s.strategy===Z?g(s,e):M[s.level].func(s,e);if(d!==_t&&d!==yt||(s.status=bt),d===vt||d===_t)return 0===t.avail_out&&(s.last_flush=-1),U;if(d===wt&&(e===B?R._tr_align(s):e!==D&&(R._tr_stored_block(s,0,0,!1),e===z&&(a(s.head),0===s.lookahead&&(s.strstart=0,s.block_start=0,s.insert=0))),o(t),0===t.avail_out))return s.last_flush=-1,U}return e!==O?U:s.wrap<=0?N:(2===s.wrap?(l(s,255&t.adler),l(s,t.adler>>8&255),l(s,t.adler>>16&255),l(s,t.adler>>24&255),l(s,255&t.total_in),l(s,t.total_in>>8&255),l(s,t.total_in>>16&255),l(s,t.total_in>>24&255)):(h(s,t.adler>>>16),h(s,65535&t.adler)),o(t),s.wrap>0&&(s.wrap=-s.wrap),0!==s.pending?U:N)}function I(t){var e;return t&&t.state?(e=t.state.status,e!==ct&&e!==ut&&e!==pt&&e!==dt&&e!==mt&&e!==gt&&e!==bt?n(t,F):(t.state=null,e===gt?n(t,j):U)):F}var M,A=t("../utils/common"),R=t("./trees"),T=t("./adler32"),P=t("./crc32"),L=t("./messages"),C=0,B=1,z=3,O=4,D=5,U=0,N=1,F=-2,j=-3,H=-5,W=-1,G=1,q=2,Z=3,Y=4,X=0,V=2,J=8,$=9,K=15,Q=8,tt=29,et=256,it=et+1+tt,nt=30,rt=19,at=2*it+1,ot=15,st=3,lt=258,ht=lt+st+1,ft=32,ct=42,ut=69,pt=73,dt=91,mt=103,gt=113,bt=666,vt=1,wt=2,_t=3,yt=4,xt=3,kt=function(t,e,i,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=i,this.max_chain=n,this.func=r};M=[new kt(0,0,0,0,p),new kt(4,4,8,4,d),new kt(4,5,16,8,d),new kt(4,6,32,32,d),new kt(4,4,16,16,m),new kt(8,16,32,32,m),new kt(8,16,128,128,m),new kt(8,32,128,256,m),new kt(32,128,258,1024,m),new kt(32,258,258,4096,m)],i.deflateInit=E,i.deflateInit2=k,i.deflateReset=y,i.deflateResetKeep=_,i.deflateSetHeader=x,i.deflate=S,i.deflateEnd=I,i.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":44,"./adler32":45,"./crc32":47,"./messages":52,"./trees":53}],49:[function(t,e,i){"use strict";var n=30,r=12;e.exports=function(t,e){var i,a,o,s,l,h,f,c,u,p,d,m,g,b,v,w,_,y,x,k,E,S,I,M,A;i=t.state,a=t.next_in,M=t.input,o=a+(t.avail_in-5),s=t.next_out,A=t.output,l=s-(e-t.avail_out),h=s+(t.avail_out-257),f=i.dmax,c=i.wsize,u=i.whave,p=i.wnext,d=i.window,m=i.hold,g=i.bits,b=i.lencode,v=i.distcode,w=(1<<i.lenbits)-1,_=(1<<i.distbits)-1;t:do{15>g&&(m+=M[a++]<<g,g+=8,m+=M[a++]<<g,g+=8),y=b[m&w];e:for(;;){if(x=y>>>24,m>>>=x,g-=x,x=y>>>16&255,0===x)A[s++]=65535&y;else{if(!(16&x)){if(0===(64&x)){y=b[(65535&y)+(m&(1<<x)-1)];continue e}if(32&x){i.mode=r;break t}t.msg="invalid literal/length code",i.mode=n;break t}k=65535&y,x&=15,x&&(x>g&&(m+=M[a++]<<g,g+=8),k+=m&(1<<x)-1,m>>>=x,g-=x),15>g&&(m+=M[a++]<<g,g+=8,m+=M[a++]<<g,g+=8),y=v[m&_];i:for(;;){if(x=y>>>24,m>>>=x,g-=x,x=y>>>16&255,!(16&x)){if(0===(64&x)){y=v[(65535&y)+(m&(1<<x)-1)];continue i}t.msg="invalid distance code",i.mode=n;break t}if(E=65535&y,x&=15,x>g&&(m+=M[a++]<<g,g+=8,x>g&&(m+=M[a++]<<g,g+=8)),E+=m&(1<<x)-1,E>f){t.msg="invalid distance too far back",i.mode=n;break t}if(m>>>=x,g-=x,x=s-l,E>x){if(x=E-x,x>u&&i.sane){t.msg="invalid distance too far back",i.mode=n;break t}if(S=0,I=d,0===p){if(S+=c-x,k>x){k-=x;do A[s++]=d[S++];while(--x);S=s-E,I=A}}else if(x>p){if(S+=c+p-x,x-=p,k>x){k-=x;do A[s++]=d[S++];while(--x);if(S=0,k>p){x=p,k-=x;do A[s++]=d[S++];while(--x);S=s-E,I=A}}}else if(S+=p-x,k>x){k-=x;do A[s++]=d[S++];while(--x);S=s-E,I=A}for(;k>2;)A[s++]=I[S++],A[s++]=I[S++],A[s++]=I[S++],k-=3;k&&(A[s++]=I[S++],k>1&&(A[s++]=I[S++]))}else{S=s-E;do A[s++]=A[S++],A[s++]=A[S++],A[s++]=A[S++],k-=3;while(k>2);k&&(A[s++]=A[S++],k>1&&(A[s++]=A[S++]))}break}}break}}while(o>a&&h>s);k=g>>3,a-=k,g-=k<<3,m&=(1<<g)-1,t.next_in=a,t.next_out=s,t.avail_in=o>a?5+(o-a):5-(a-o),t.avail_out=h>s?257+(h-s):257-(s-h),i.hold=m,i.bits=g}},{}],50:[function(t,e,i){"use strict";function n(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function r(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new b.Buf16(320),this.work=new b.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=z,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new b.Buf32(pt),e.distcode=e.distdyn=new b.Buf32(dt),e.sane=1,e.back=-1,A):P}function o(t){var e;return t&&t.state?(e=t.state,e.wsize=0,e.whave=0,e.wnext=0,a(t)):P}function s(t,e){var i,n;return t&&t.state?(n=t.state,0>e?(i=0,e=-e):(i=(e>>4)+1,48>e&&(e&=15)),e&&(8>e||e>15)?P:(null!==n.window&&n.wbits!==e&&(n.window=null),n.wrap=i,n.wbits=e,o(t))):P}function l(t,e){var i,n;return t?(n=new r,t.state=n,n.window=null,i=s(t,e),i!==A&&(t.state=null),i):P}function h(t){return l(t,gt)}function f(t){if(bt){var e;for(m=new b.Buf32(512),g=new b.Buf32(32),e=0;144>e;)t.lens[e++]=8;for(;256>e;)t.lens[e++]=9;for(;280>e;)t.lens[e++]=7;for(;288>e;)t.lens[e++]=8;for(y(k,t.lens,0,288,m,0,t.work,{bits:9}),e=0;32>e;)t.lens[e++]=5;y(E,t.lens,0,32,g,0,t.work,{bits:5}),bt=!1}t.lencode=m,t.lenbits=9,t.distcode=g,t.distbits=5}function c(t,e,i,n){var r,a=t.state;return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new b.Buf8(a.wsize)),n>=a.wsize?(b.arraySet(a.window,e,i-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(r=a.wsize-a.wnext,r>n&&(r=n),b.arraySet(a.window,e,i-n,r,a.wnext),n-=r,n?(b.arraySet(a.window,e,i-n,n,0),a.wnext=n,a.whave=a.wsize):(a.wnext+=r,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=r))),0}function u(t,e){var i,r,a,o,s,l,h,u,p,d,m,g,pt,dt,mt,gt,bt,vt,wt,_t,yt,xt,kt,Et,St=0,It=new b.Buf8(4),Mt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return P;i=t.state,i.mode===Z&&(i.mode=Y),s=t.next_out,a=t.output,h=t.avail_out,o=t.next_in,r=t.input,l=t.avail_in,u=i.hold,p=i.bits,d=l,m=h,xt=A;t:for(;;)switch(i.mode){case z:if(0===i.wrap){i.mode=Y;break}for(;16>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(2&i.wrap&&35615===u){i.check=0,It[0]=255&u,It[1]=u>>>8&255,i.check=w(i.check,It,2,0),u=0,p=0,i.mode=O;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&u)<<8)+(u>>8))%31){t.msg="incorrect header check",i.mode=ft;break}if((15&u)!==B){t.msg="unknown compression method",i.mode=ft;break}if(u>>>=4,p-=4,yt=(15&u)+8,0===i.wbits)i.wbits=yt;else if(yt>i.wbits){t.msg="invalid window size",i.mode=ft;break}i.dmax=1<<yt,t.adler=i.check=1,i.mode=512&u?G:Z,u=0,p=0;break;case O:for(;16>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(i.flags=u,(255&i.flags)!==B){t.msg="unknown compression method",i.mode=ft;break}if(57344&i.flags){t.msg="unknown header flags set",i.mode=ft;break}i.head&&(i.head.text=u>>8&1),512&i.flags&&(It[0]=255&u,It[1]=u>>>8&255,i.check=w(i.check,It,2,0)),u=0,p=0,i.mode=D;case D:for(;32>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}i.head&&(i.head.time=u),512&i.flags&&(It[0]=255&u,It[1]=u>>>8&255,It[2]=u>>>16&255,It[3]=u>>>24&255,i.check=w(i.check,It,4,0)),u=0,p=0,i.mode=U;case U:for(;16>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}i.head&&(i.head.xflags=255&u,i.head.os=u>>8),512&i.flags&&(It[0]=255&u,It[1]=u>>>8&255,i.check=w(i.check,It,2,0)),u=0,p=0,i.mode=N;case N:if(1024&i.flags){for(;16>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}i.length=u,i.head&&(i.head.extra_len=u),512&i.flags&&(It[0]=255&u,It[1]=u>>>8&255,i.check=w(i.check,It,2,0)),u=0,p=0}else i.head&&(i.head.extra=null);i.mode=F;case F:if(1024&i.flags&&(g=i.length,g>l&&(g=l),g&&(i.head&&(yt=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Array(i.head.extra_len)),b.arraySet(i.head.extra,r,o,g,yt)),512&i.flags&&(i.check=w(i.check,r,g,o)),l-=g,o+=g,i.length-=g),i.length))break t;i.length=0,i.mode=j;case j:if(2048&i.flags){if(0===l)break t;g=0;do yt=r[o+g++],i.head&&yt&&i.length<65536&&(i.head.name+=String.fromCharCode(yt));while(yt&&l>g);if(512&i.flags&&(i.check=w(i.check,r,g,o)),l-=g,o+=g,yt)break t}else i.head&&(i.head.name=null);i.length=0,i.mode=H;case H:if(4096&i.flags){if(0===l)break t;g=0;do yt=r[o+g++],i.head&&yt&&i.length<65536&&(i.head.comment+=String.fromCharCode(yt));while(yt&&l>g);if(512&i.flags&&(i.check=w(i.check,r,g,o)),l-=g,o+=g,yt)break t}else i.head&&(i.head.comment=null);i.mode=W;case W:if(512&i.flags){for(;16>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(u!==(65535&i.check)){t.msg="header crc mismatch",i.mode=ft;break}u=0,p=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),t.adler=i.check=0,i.mode=Z;break;case G:for(;32>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}t.adler=i.check=n(u),u=0,p=0,i.mode=q;case q:if(0===i.havedict)return t.next_out=s,t.avail_out=h,t.next_in=o,t.avail_in=l,i.hold=u,i.bits=p,T;t.adler=i.check=1,i.mode=Z;case Z:if(e===I||e===M)break t;case Y:if(i.last){u>>>=7&p,p-=7&p,i.mode=st;break}for(;3>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}switch(i.last=1&u,u>>>=1,p-=1,3&u){case 0:i.mode=X;break;case 1:if(f(i),i.mode=tt,e===M){u>>>=2,p-=2;break t}break;case 2:i.mode=$;break;case 3:t.msg="invalid block type",i.mode=ft}u>>>=2,p-=2;break;case X:for(u>>>=7&p,p-=7&p;32>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if((65535&u)!==(u>>>16^65535)){t.msg="invalid stored block lengths",i.mode=ft;break}if(i.length=65535&u,u=0,p=0,i.mode=V,e===M)break t;case V:i.mode=J;case J:if(g=i.length){if(g>l&&(g=l),g>h&&(g=h),0===g)break t;b.arraySet(a,r,o,g,s),l-=g,o+=g,h-=g,s+=g,i.length-=g;break}i.mode=Z;break;case $:for(;14>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(i.nlen=(31&u)+257,u>>>=5,p-=5,i.ndist=(31&u)+1,u>>>=5,p-=5,i.ncode=(15&u)+4,u>>>=4,p-=4,i.nlen>286||i.ndist>30){t.msg="too many length or distance symbols",i.mode=ft;break}i.have=0,i.mode=K;case K:for(;i.have<i.ncode;){for(;3>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}i.lens[Mt[i.have++]]=7&u,u>>>=3,p-=3}for(;i.have<19;)i.lens[Mt[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,kt={bits:i.lenbits},xt=y(x,i.lens,0,19,i.lencode,0,i.work,kt),i.lenbits=kt.bits,xt){t.msg="invalid code lengths set",i.mode=ft;break}i.have=0,i.mode=Q;case Q:for(;i.have<i.nlen+i.ndist;){for(;St=i.lencode[u&(1<<i.lenbits)-1],mt=St>>>24,gt=St>>>16&255,bt=65535&St,!(p>=mt);){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(16>bt)u>>>=mt,p-=mt,i.lens[i.have++]=bt;else{if(16===bt){for(Et=mt+2;Et>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(u>>>=mt,p-=mt,0===i.have){t.msg="invalid bit length repeat",i.mode=ft;break}yt=i.lens[i.have-1],g=3+(3&u),u>>>=2,p-=2}else if(17===bt){for(Et=mt+3;Et>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}u>>>=mt,p-=mt,yt=0,g=3+(7&u),u>>>=3,p-=3}else{for(Et=mt+7;Et>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}u>>>=mt,p-=mt,yt=0,g=11+(127&u),u>>>=7,p-=7}if(i.have+g>i.nlen+i.ndist){t.msg="invalid bit length repeat",i.mode=ft;break}for(;g--;)i.lens[i.have++]=yt}}if(i.mode===ft)break;if(0===i.lens[256]){t.msg="invalid code -- missing end-of-block",i.mode=ft;break}if(i.lenbits=9,kt={bits:i.lenbits},xt=y(k,i.lens,0,i.nlen,i.lencode,0,i.work,kt),i.lenbits=kt.bits,xt){t.msg="invalid literal/lengths set",i.mode=ft;break}if(i.distbits=6,i.distcode=i.distdyn,kt={bits:i.distbits},xt=y(E,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,kt),i.distbits=kt.bits,xt){t.msg="invalid distances set",i.mode=ft;break}if(i.mode=tt,e===M)break t;case tt:i.mode=et;case et:if(l>=6&&h>=258){t.next_out=s,t.avail_out=h,t.next_in=o,t.avail_in=l,i.hold=u,i.bits=p,_(t,m),s=t.next_out,a=t.output,h=t.avail_out,o=t.next_in,r=t.input,l=t.avail_in,u=i.hold,p=i.bits,i.mode===Z&&(i.back=-1);break}for(i.back=0;St=i.lencode[u&(1<<i.lenbits)-1],mt=St>>>24,gt=St>>>16&255,bt=65535&St,!(p>=mt);){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(gt&&0===(240&gt)){for(vt=mt,wt=gt,_t=bt;St=i.lencode[_t+((u&(1<<vt+wt)-1)>>vt)],mt=St>>>24,gt=St>>>16&255,bt=65535&St,!(p>=vt+mt);){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}u>>>=vt,p-=vt,i.back+=vt}if(u>>>=mt,p-=mt,i.back+=mt,i.length=bt,0===gt){i.mode=ot;break}if(32&gt){i.back=-1,i.mode=Z;break}if(64&gt){t.msg="invalid literal/length code",i.mode=ft;break}i.extra=15&gt,i.mode=it;case it:if(i.extra){for(Et=i.extra;Et>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}i.length+=u&(1<<i.extra)-1,u>>>=i.extra,p-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=nt;case nt:for(;St=i.distcode[u&(1<<i.distbits)-1],mt=St>>>24,gt=St>>>16&255,bt=65535&St,!(p>=mt);){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(0===(240&gt)){for(vt=mt,wt=gt,_t=bt;St=i.distcode[_t+((u&(1<<vt+wt)-1)>>vt)],mt=St>>>24,gt=St>>>16&255,bt=65535&St,!(p>=vt+mt);){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}u>>>=vt,p-=vt,i.back+=vt}if(u>>>=mt,p-=mt,i.back+=mt,64&gt){t.msg="invalid distance code",i.mode=ft;break}i.offset=bt,i.extra=15&gt,i.mode=rt;case rt:if(i.extra){for(Et=i.extra;Et>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}i.offset+=u&(1<<i.extra)-1,u>>>=i.extra,p-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){t.msg="invalid distance too far back",i.mode=ft;break}i.mode=at;case at:if(0===h)break t;if(g=m-h,i.offset>g){if(g=i.offset-g,g>i.whave&&i.sane){t.msg="invalid distance too far back",i.mode=ft;break}g>i.wnext?(g-=i.wnext,pt=i.wsize-g):pt=i.wnext-g,g>i.length&&(g=i.length),dt=i.window}else dt=a,pt=s-i.offset,g=i.length;g>h&&(g=h),h-=g,i.length-=g;do a[s++]=dt[pt++];while(--g);0===i.length&&(i.mode=et);break;case ot:if(0===h)break t;a[s++]=i.length,h--,i.mode=et;break;case st:if(i.wrap){for(;32>p;){if(0===l)break t;l--,u|=r[o++]<<p,p+=8}if(m-=h,t.total_out+=m,i.total+=m,m&&(t.adler=i.check=i.flags?w(i.check,a,m,s-m):v(i.check,a,m,s-m)),m=h,(i.flags?u:n(u))!==i.check){t.msg="incorrect data check",i.mode=ft;break}u=0,p=0}i.mode=lt;case lt:if(i.wrap&&i.flags){for(;32>p;){if(0===l)break t;l--,u+=r[o++]<<p,p+=8}if(u!==(4294967295&i.total)){t.msg="incorrect length check",i.mode=ft;break}u=0,p=0}i.mode=ht;case ht:xt=R;break t;case ft:xt=L;break t;case ct:return C;case ut:default:return P}return t.next_out=s,t.avail_out=h,t.next_in=o,t.avail_in=l,i.hold=u,i.bits=p,(i.wsize||m!==t.avail_out&&i.mode<ft&&(i.mode<st||e!==S))&&c(t,t.output,t.next_out,m-t.avail_out)?(i.mode=ct,C):(d-=t.avail_in,m-=t.avail_out,t.total_in+=d,t.total_out+=m,i.total+=m,i.wrap&&m&&(t.adler=i.check=i.flags?w(i.check,a,m,t.next_out-m):v(i.check,a,m,t.next_out-m)),t.data_type=i.bits+(i.last?64:0)+(i.mode===Z?128:0)+(i.mode===tt||i.mode===V?256:0),xt)}function p(t){if(!t||!t.state)return P;var e=t.state;return e.window&&(e.window=null),t.state=null,A}function d(t,e){var i;return t&&t.state?(i=t.state,0===(2&i.wrap)?P:(i.head=e,e.done=!1,A)):P}var m,g,b=t("../utils/common"),v=t("./adler32"),w=t("./crc32"),_=t("./inffast"),y=t("./inftrees"),x=0,k=1,E=2,S=4,I=5,M=6,A=0,R=1,T=2,P=-2,L=-3,C=-4,B=8,z=1,O=2,D=3,U=4,N=5,F=6,j=7,H=8,W=9,G=10,q=11,Z=12,Y=13,X=14,V=15,J=16,$=17,K=18,Q=19,tt=20,et=21,it=22,nt=23,rt=24,at=25,ot=26,st=27,lt=28,ht=29,ft=30,ct=31,ut=32,pt=852,dt=592,mt=15,gt=mt,bt=!0;i.inflateReset=o,i.inflateReset2=s,i.inflateResetKeep=a,i.inflateInit=h,i.inflateInit2=l,i.inflate=u,i.inflateEnd=p,i.inflateGetHeader=d,i.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":44,"./adler32":45,"./crc32":47,"./inffast":49,"./inftrees":51}],51:[function(t,e,i){"use strict";var n=t("../utils/common"),r=15,a=852,o=592,s=0,l=1,h=2,f=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],p=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,i,d,m,g,b,v){var w,_,y,x,k,E,S,I,M,A=v.bits,R=0,T=0,P=0,L=0,C=0,B=0,z=0,O=0,D=0,U=0,N=null,F=0,j=new n.Buf16(r+1),H=new n.Buf16(r+1),W=null,G=0;for(R=0;r>=R;R++)j[R]=0;for(T=0;d>T;T++)j[e[i+T]]++;for(C=A,L=r;L>=1&&0===j[L];L--);if(C>L&&(C=L),0===L)return m[g++]=20971520,m[g++]=20971520,v.bits=1,0;for(P=1;L>P&&0===j[P];P++);for(P>C&&(C=P),O=1,R=1;r>=R;R++)if(O<<=1,O-=j[R],0>O)return-1;if(O>0&&(t===s||1!==L))return-1;for(H[1]=0,R=1;r>R;R++)H[R+1]=H[R]+j[R];for(T=0;d>T;T++)0!==e[i+T]&&(b[H[e[i+T]]++]=T);if(t===s?(N=W=b,E=19):t===l?(N=f,F-=257,W=c,G-=257,E=256):(N=u,W=p,E=-1),U=0,T=0,R=P,k=g,B=C,z=0,y=-1,D=1<<C,x=D-1,t===l&&D>a||t===h&&D>o)return 1;for(var q=0;;){q++,S=R-z,b[T]<E?(I=0,M=b[T]):b[T]>E?(I=W[G+b[T]],M=N[F+b[T]]):(I=96,M=0),w=1<<R-z,_=1<<B,P=_;do _-=w,m[k+(U>>z)+_]=S<<24|I<<16|M|0;while(0!==_);for(w=1<<R-1;U&w;)w>>=1;if(0!==w?(U&=w-1,U+=w):U=0,T++,0===--j[R]){if(R===L)break;R=e[i+b[T]]}if(R>C&&(U&x)!==y){for(0===z&&(z=C),k+=P,B=R-z,O=1<<B;L>B+z&&(O-=j[B+z],!(0>=O));)B++,O<<=1;if(D+=1<<B,t===l&&D>a||t===h&&D>o)return 1;y=U&x,m[y]=C<<24|B<<16|k-g|0}}return 0!==U&&(m[k+U]=R-z<<24|64<<16|0),v.bits=C,0}},{"../utils/common":44}],52:[function(t,e,i){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],53:[function(t,e,i){"use strict";function n(t){for(var e=t.length;--e>=0;)t[e]=0}function r(t){return 256>t?ot[t]:ot[256+(t>>>7)]}function a(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function o(t,e,i){t.bi_valid>Y-i?(t.bi_buf|=e<<t.bi_valid&65535,a(t,t.bi_buf),t.bi_buf=e>>Y-t.bi_valid,t.bi_valid+=i-Y):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=i)}function s(t,e,i){o(t,i[2*e],i[2*e+1])}function l(t,e){var i=0;do i|=1&t,t>>>=1,i<<=1;while(--e>0);return i>>>1}function h(t){16===t.bi_valid?(a(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function f(t,e){var i,n,r,a,o,s,l=e.dyn_tree,h=e.max_code,f=e.stat_desc.static_tree,c=e.stat_desc.has_stree,u=e.stat_desc.extra_bits,p=e.stat_desc.extra_base,d=e.stat_desc.max_length,m=0;for(a=0;Z>=a;a++)t.bl_count[a]=0;for(l[2*t.heap[t.heap_max]+1]=0,i=t.heap_max+1;q>i;i++)n=t.heap[i],a=l[2*l[2*n+1]+1]+1,a>d&&(a=d,m++),l[2*n+1]=a,n>h||(t.bl_count[a]++,o=0,n>=p&&(o=u[n-p]),s=l[2*n],t.opt_len+=s*(a+o),c&&(t.static_len+=s*(f[2*n+1]+o)));if(0!==m){do{for(a=d-1;0===t.bl_count[a];)a--;t.bl_count[a]--,t.bl_count[a+1]+=2,t.bl_count[d]--,m-=2}while(m>0);for(a=d;0!==a;a--)for(n=t.bl_count[a];0!==n;)r=t.heap[--i],r>h||(l[2*r+1]!==a&&(t.opt_len+=(a-l[2*r+1])*l[2*r],l[2*r+1]=a),n--)}}function c(t,e,i){var n,r,a=new Array(Z+1),o=0;for(n=1;Z>=n;n++)a[n]=o=o+i[n-1]<<1;for(r=0;e>=r;r++){var s=t[2*r+1];0!==s&&(t[2*r]=l(a[s]++,s))}}function u(){var t,e,i,n,r,a=new Array(Z+1);for(i=0,n=0;F-1>n;n++)for(lt[n]=i,t=0;t<1<<Q[n];t++)st[i++]=n;for(st[i-1]=n,r=0,n=0;16>n;n++)for(ht[n]=r,t=0;t<1<<tt[n];t++)ot[r++]=n;for(r>>=7;W>n;n++)for(ht[n]=r<<7,t=0;t<1<<tt[n]-7;t++)ot[256+r++]=n;for(e=0;Z>=e;e++)a[e]=0;for(t=0;143>=t;)rt[2*t+1]=8,t++,a[8]++;for(;255>=t;)rt[2*t+1]=9,t++,a[9]++;for(;279>=t;)rt[2*t+1]=7,t++,a[7]++;for(;287>=t;)rt[2*t+1]=8,t++,a[8]++;for(c(rt,H+1,a),t=0;W>t;t++)at[2*t+1]=5,at[2*t]=l(t,5);ft=new pt(rt,Q,j+1,H,Z),ct=new pt(at,tt,0,W,Z),ut=new pt(new Array(0),et,0,G,X)}function p(t){var e;for(e=0;H>e;e++)t.dyn_ltree[2*e]=0;for(e=0;W>e;e++)t.dyn_dtree[2*e]=0;for(e=0;G>e;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*V]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function d(t){t.bi_valid>8?a(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function m(t,e,i,n){d(t),n&&(a(t,i),a(t,~i)),T.arraySet(t.pending_buf,t.window,e,i,t.pending),t.pending+=i}function g(t,e,i,n){var r=2*e,a=2*i;return t[r]<t[a]||t[r]===t[a]&&n[e]<=n[i]}function b(t,e,i){for(var n=t.heap[i],r=i<<1;r<=t.heap_len&&(r<t.heap_len&&g(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!g(e,n,t.heap[r],t.depth));)t.heap[i]=t.heap[r],i=r,r<<=1;t.heap[i]=n}function v(t,e,i){var n,a,l,h,f=0;if(0!==t.last_lit)do n=t.pending_buf[t.d_buf+2*f]<<8|t.pending_buf[t.d_buf+2*f+1],a=t.pending_buf[t.l_buf+f],f++,0===n?s(t,a,e):(l=st[a],s(t,l+j+1,e),h=Q[l],0!==h&&(a-=lt[l],o(t,a,h)),n--,l=r(n),s(t,l,i),h=tt[l],0!==h&&(n-=ht[l],o(t,n,h)));while(f<t.last_lit);s(t,V,e)}function w(t,e){var i,n,r,a=e.dyn_tree,o=e.stat_desc.static_tree,s=e.stat_desc.has_stree,l=e.stat_desc.elems,h=-1;for(t.heap_len=0,t.heap_max=q,i=0;l>i;i++)0!==a[2*i]?(t.heap[++t.heap_len]=h=i,t.depth[i]=0):a[2*i+1]=0;for(;t.heap_len<2;)r=t.heap[++t.heap_len]=2>h?++h:0,a[2*r]=1,t.depth[r]=0,t.opt_len--,s&&(t.static_len-=o[2*r+1]);for(e.max_code=h,i=t.heap_len>>1;i>=1;i--)b(t,a,i);r=l;do i=t.heap[1],t.heap[1]=t.heap[t.heap_len--],b(t,a,1),n=t.heap[1],t.heap[--t.heap_max]=i,t.heap[--t.heap_max]=n,a[2*r]=a[2*i]+a[2*n],t.depth[r]=(t.depth[i]>=t.depth[n]?t.depth[i]:t.depth[n])+1,a[2*i+1]=a[2*n+1]=r,t.heap[1]=r++,b(t,a,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],f(t,e),c(a,h,t.bl_count)}function _(t,e,i){var n,r,a=-1,o=e[1],s=0,l=7,h=4;for(0===o&&(l=138,h=3),e[2*(i+1)+1]=65535,n=0;i>=n;n++)r=o,o=e[2*(n+1)+1],++s<l&&r===o||(h>s?t.bl_tree[2*r]+=s:0!==r?(r!==a&&t.bl_tree[2*r]++,t.bl_tree[2*J]++):10>=s?t.bl_tree[2*$]++:t.bl_tree[2*K]++,s=0,a=r,0===o?(l=138,h=3):r===o?(l=6,h=3):(l=7,h=4))}function y(t,e,i){var n,r,a=-1,l=e[1],h=0,f=7,c=4;for(0===l&&(f=138,c=3),n=0;i>=n;n++)if(r=l,l=e[2*(n+1)+1],!(++h<f&&r===l)){if(c>h){do s(t,r,t.bl_tree);while(0!==--h)}else 0!==r?(r!==a&&(s(t,r,t.bl_tree),h--),s(t,J,t.bl_tree),o(t,h-3,2)):10>=h?(s(t,$,t.bl_tree),o(t,h-3,3)):(s(t,K,t.bl_tree),o(t,h-11,7));h=0,a=r,0===l?(f=138,c=3):r===l?(f=6,c=3):(f=7,c=4)}}function x(t){var e;for(_(t,t.dyn_ltree,t.l_desc.max_code),_(t,t.dyn_dtree,t.d_desc.max_code),w(t,t.bl_desc),e=G-1;e>=3&&0===t.bl_tree[2*it[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function k(t,e,i,n){var r;for(o(t,e-257,5),o(t,i-1,5),o(t,n-4,4),r=0;n>r;r++)o(t,t.bl_tree[2*it[r]+1],3);y(t,t.dyn_ltree,e-1),y(t,t.dyn_dtree,i-1)}function E(t){var e,i=4093624447;for(e=0;31>=e;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return L;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return C;for(e=32;j>e;e++)if(0!==t.dyn_ltree[2*e])return C;return L}function S(t){mt||(u(),mt=!0),t.l_desc=new dt(t.dyn_ltree,ft),t.d_desc=new dt(t.dyn_dtree,ct),t.bl_desc=new dt(t.bl_tree,ut),t.bi_buf=0,t.bi_valid=0,p(t)}function I(t,e,i,n){o(t,(z<<1)+(n?1:0),3),m(t,e,i,!0)}function M(t){o(t,O<<1,3),s(t,V,rt),h(t)}function A(t,e,i,n){var r,a,s=0;t.level>0?(t.strm.data_type===B&&(t.strm.data_type=E(t)),w(t,t.l_desc),w(t,t.d_desc),s=x(t),r=t.opt_len+3+7>>>3,a=t.static_len+3+7>>>3,r>=a&&(r=a)):r=a=i+5,r>=i+4&&-1!==e?I(t,e,i,n):t.strategy===P||a===r?(o(t,(O<<1)+(n?1:0),3),v(t,rt,at)):(o(t,(D<<1)+(n?1:0),3),k(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),v(t,t.dyn_ltree,t.dyn_dtree)),p(t),n&&d(t)}function R(t,e,i){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&i,t.last_lit++,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(st[i]+j+1)]++,t.dyn_dtree[2*r(e)]++),t.last_lit===t.lit_bufsize-1}var T=t("../utils/common"),P=4,L=0,C=1,B=2,z=0,O=1,D=2,U=3,N=258,F=29,j=256,H=j+1+F,W=30,G=19,q=2*H+1,Z=15,Y=16,X=7,V=256,J=16,$=17,K=18,Q=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],tt=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],et=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],it=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],nt=512,rt=new Array(2*(H+2));n(rt);var at=new Array(2*W);n(at);var ot=new Array(nt);n(ot);var st=new Array(N-U+1);n(st);var lt=new Array(F);n(lt);var ht=new Array(W);n(ht);var ft,ct,ut,pt=function(t,e,i,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=i,this.elems=n,this.max_length=r,this.has_stree=t&&t.length},dt=function(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e},mt=!1;i._tr_init=S,i._tr_stored_block=I,i._tr_flush_block=A,i._tr_tally=R,i._tr_align=M},{"../utils/common":44}],54:[function(t,e,i){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}e.exports=n},{}],55:[function(t,e,i){function n(t,e){if(t=t.replace(/\t+/g," ").trim(),!t)return null;var i=t.indexOf(" ");if(-1===i)throw new Error("no named row at line "+e);var n=t.substring(0,i);t=t.substring(i+1),t=t.replace(/letter=[\'\"]\S+[\'\"]/gi,""),t=t.split("="),t=t.map(function(t){return t.trim().match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)});for(var a=[],o=0;o<t.length;o++){var s=t[o];0===o?a.push({key:s[0],data:""}):o===t.length-1?a[a.length-1].data=r(s[0]):(a[a.length-1].data=r(s[0]),a.push({key:s[1],data:""}))}var l={key:n,data:{}};return a.forEach(function(t){l.data[t.key]=t.data}),l}function r(t){return t&&0!==t.length?0===t.indexOf('"')||0===t.indexOf("'")?t.substring(1,t.length-1):-1!==t.indexOf(",")?a(t):parseInt(t,10):""}function a(t){return t.split(",").map(function(t){return parseInt(t,10)})}e.exports=function(t){if(!t)throw new Error("no data provided");t=t.toString().trim();var e={pages:[],chars:[],kernings:[]},i=t.split(/\r\n?|\n/g);if(0===i.length)throw new Error("no data in BMFont file");
for(var r=0;r<i.length;r++){var a=n(i[r],r);if(a)if("page"===a.key){if("number"!=typeof a.data.id)throw new Error("malformed file at line "+r+" -- needs page id=N");if("string"!=typeof a.data.file)throw new Error("malformed file at line "+r+' -- needs page file="path"');e.pages[a.data.id]=a.data.file}else"chars"===a.key||"kernings"===a.key||("char"===a.key?e.chars.push(a.data):"kerning"===a.key?e.kernings.push(a.data):e[a.key]=a.data)}return e}},{}],56:[function(t,e,i){function n(t,e,i){if(i>e.length-1)return 0;var n=e.readUInt8(i++),h=e.readInt32LE(i);switch(i+=4,n){case 1:t.info=r(e,i);break;case 2:t.common=a(e,i);break;case 3:t.pages=o(e,i,h);break;case 4:t.chars=s(e,i,h);break;case 5:t.kernings=l(e,i,h)}return 5+h}function r(t,e){var i={};i.size=t.readInt16LE(e);var n=t.readUInt8(e+2);return i.smooth=n>>7&1,i.unicode=n>>6&1,i.italic=n>>5&1,i.bold=n>>4&1,n>>3&1&&(i.fixedHeight=1),i.charset=t.readUInt8(e+3)||"",i.stretchH=t.readUInt16LE(e+4),i.aa=t.readUInt8(e+6),i.padding=[t.readInt8(e+7),t.readInt8(e+8),t.readInt8(e+9),t.readInt8(e+10)],i.spacing=[t.readInt8(e+11),t.readInt8(e+12)],i.outline=t.readUInt8(e+13),i.face=f(t,e+14),i}function a(t,e){var i={};i.lineHeight=t.readUInt16LE(e),i.base=t.readUInt16LE(e+2),i.scaleW=t.readUInt16LE(e+4),i.scaleH=t.readUInt16LE(e+6),i.pages=t.readUInt16LE(e+8);t.readUInt8(e+10);return i.packed=0,i.alphaChnl=t.readUInt8(e+11),i.redChnl=t.readUInt8(e+12),i.greenChnl=t.readUInt8(e+13),i.blueChnl=t.readUInt8(e+14),i}function o(t,e,i){for(var n=[],r=h(t,e),a=r.length+1,o=i/a,s=0;o>s;s++)n[s]=t.slice(e,e+r.length).toString("utf8"),e+=a;return n}function s(t,e,i){for(var n=[],r=i/20,a=0;r>a;a++){var o={},s=20*a;o.id=t.readUInt32LE(e+0+s),o.x=t.readUInt16LE(e+4+s),o.y=t.readUInt16LE(e+6+s),o.width=t.readUInt16LE(e+8+s),o.height=t.readUInt16LE(e+10+s),o.xoffset=t.readInt16LE(e+12+s),o.yoffset=t.readInt16LE(e+14+s),o.xadvance=t.readInt16LE(e+16+s),o.page=t.readUInt8(e+18+s),o.chnl=t.readUInt8(e+19+s),n[a]=o}return n}function l(t,e,i){for(var n=[],r=i/10,a=0;r>a;a++){var o={},s=10*a;o.first=t.readUInt32LE(e+0+s),o.second=t.readUInt32LE(e+4+s),o.amount=t.readInt16LE(e+8+s),n[a]=o}return n}function h(t,e){for(var i=e;i<t.length&&0!==t[i];i++);return t.slice(e,i)}function f(t,e){return h(t,e).toString("utf8")}var c=[66,77,70];e.exports=function(t){if(t.length<6)throw new Error("invalid buffer length for BMFont");var e=c.every(function(e,i){return t.readUInt8(i)===e});if(!e)throw new Error("BMFont missing BMF byte header");var i=3,r=t.readUInt8(i++);if(r>3)throw new Error("Only supports BMFont Binary v3 (BMFont App v1.10)");for(var a={kernings:[],chars:[]},o=0;5>o;o++)i+=n(a,t,i);return a}},{}],57:[function(t,e,i){function n(t){var e=r(t);return e.reduce(function(t,e){var i=a(e.nodeName);return t[i]=e.nodeValue,t},{})}function r(t){for(var e=[],i=0;i<t.attributes.length;i++)e.push(t.attributes[i]);return e}function a(t){return l[t.toLowerCase()]||t}var o=t("./parse-attribs"),s=t("xml-parse-from-string"),l={scaleh:"scaleH",scalew:"scaleW",stretchh:"stretchH",lineheight:"lineHeight",alphachnl:"alphaChnl",redchnl:"redChnl",greenchnl:"greenChnl",bluechnl:"blueChnl"};e.exports=function(t){t=t.toString();var e=s(t),i={pages:[],chars:[],kernings:[]};["info","common"].forEach(function(t){var r=e.getElementsByTagName(t)[0];r&&(i[t]=o(n(r)))});var r=e.getElementsByTagName("pages")[0];if(!r)throw new Error("malformed file -- no <pages> element");for(var a=r.getElementsByTagName("page"),l=0;l<a.length;l++){var h=a[l],f=parseInt(h.getAttribute("id"),10),c=h.getAttribute("file");if(isNaN(f))throw new Error('malformed file -- page "id" attribute is NaN');if(!c)throw new Error('malformed file -- needs page "file" attribute');i.pages[parseInt(f,10)]=c}return["chars","kernings"].forEach(function(t){var r=e.getElementsByTagName(t)[0];if(r)for(var a=t.substring(0,t.length-1),s=r.getElementsByTagName(a),l=0;l<s.length;l++){var h=s[l];i[t].push(o(n(h)))}}),i}},{"./parse-attribs":58,"xml-parse-from-string":106}],58:[function(t,e,i){function n(t){return t.split(",").map(function(t){return parseInt(t,10)})}var r="chasrset";e.exports=function(t){r in t&&(t.charset=t[r],delete t[r]);for(var e in t)"face"!==e&&"charset"!==e&&("padding"===e||"spacing"===e?t[e]=n(t[e]):t[e]=parseInt(t[e],10));return t}},{}],59:[function(t,e,i){var n=t("trim"),r=t("for-each"),a=function(t){return"[object Array]"===Object.prototype.toString.call(t)};e.exports=function(t){if(!t)return{};var e={};return r(n(t).split("\n"),function(t){var i=t.indexOf(":"),r=n(t.slice(0,i)).toLowerCase(),o=n(t.slice(i+1));"undefined"==typeof e[r]?e[r]=o:a(e[r])?e[r].push(o):e[r]=[e[r],o]}),e}},{"for-each":28,trim:100}],60:[function(t,e,i){(function(t){function e(t,e){for(var i=0,n=t.length-1;n>=0;n--){var r=t[n];"."===r?t.splice(n,1):".."===r?(t.splice(n,1),i++):i&&(t.splice(n,1),i--)}if(e)for(;i--;i)t.unshift("..");return t}function n(t,e){if(t.filter)return t.filter(e);for(var i=[],n=0;n<t.length;n++)e(t[n],n,t)&&i.push(t[n]);return i}var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,a=function(t){return r.exec(t).slice(1)};i.resolve=function(){for(var i="",r=!1,a=arguments.length-1;a>=-1&&!r;a--){var o=a>=0?arguments[a]:t.cwd();if("string"!=typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(i=o+"/"+i,r="/"===o.charAt(0))}return i=e(n(i.split("/"),function(t){return!!t}),!r).join("/"),(r?"/":"")+i||"."},i.normalize=function(t){var r=i.isAbsolute(t),a="/"===o(t,-1);return t=e(n(t.split("/"),function(t){return!!t}),!r).join("/"),t||r||(t="."),t&&a&&(t+="/"),(r?"/":"")+t},i.isAbsolute=function(t){return"/"===t.charAt(0)},i.join=function(){var t=Array.prototype.slice.call(arguments,0);return i.normalize(n(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},i.relative=function(t,e){function n(t){for(var e=0;e<t.length&&""===t[e];e++);for(var i=t.length-1;i>=0&&""===t[i];i--);return e>i?[]:t.slice(e,i-e+1)}t=i.resolve(t).substr(1),e=i.resolve(e).substr(1);for(var r=n(t.split("/")),a=n(e.split("/")),o=Math.min(r.length,a.length),s=o,l=0;o>l;l++)if(r[l]!==a[l]){s=l;break}for(var h=[],l=s;l<r.length;l++)h.push("..");return h=h.concat(a.slice(s)),h.join("/")},i.sep="/",i.delimiter=":",i.dirname=function(t){var e=a(t),i=e[0],n=e[1];return i||n?(n&&(n=n.substr(0,n.length-1)),i+n):"."},i.basename=function(t,e){var i=a(t)[2];return e&&i.substr(-1*e.length)===e&&(i=i.substr(0,i.length-e.length)),i},i.extname=function(t){return a(t)[3]};var o="b"==="ab".substr(-1)?function(t,e,i){return t.substr(e,i)}:function(t,e,i){return 0>e&&(e=t.length+e),t.substr(e,i)}}).call(this,t("_process"))},{_process:12}],61:[function(t,e,i){"use strict";function n(t,e,i,n,o,s){s||(s={});for(var l=void 0===s.threshold?.1:s.threshold,u=35215*l*l,p=0,d=0;o>d;d++)for(var m=0;n>m;m++){var g=4*(d*n+m),b=a(t,e,g,g);if(b>u)s.includeAA||!r(t,m,d,n,o,e)&&!r(e,m,d,n,o,t)?(i&&f(i,g,255,0,0),p++):i&&f(i,g,255,255,0);else if(i){var v=h(c(t,g),.1);f(i,g,v,v,v)}}return p}function r(t,e,i,n,o,s){for(var l,h,f,c,u=Math.max(e-1,0),p=Math.max(i-1,0),d=Math.min(e+1,n-1),m=Math.min(i+1,o-1),g=4*(i*n+e),b=0,v=0,w=0,_=0,y=0,x=u;d>=x;x++)for(var k=p;m>=k;k++)if(x!==e||k!==i){var E=a(t,t,g,4*(k*n+x),!0);if(0===E?b++:0>E?w++:E>0&&v++,b>2)return!1;s&&(_>E&&(_=E,l=x,h=k),E>y&&(y=E,f=x,c=k))}return s?0===w||0===v?!1:!r(t,l,h,n,o)&&!r(s,l,h,n,o)||!r(t,f,c,n,o)&&!r(s,f,c,n,o):!0}function a(t,e,i,n,r){var a=t[i+3]/255,f=e[n+3]/255,c=h(t[i+0],a),u=h(t[i+1],a),p=h(t[i+2],a),d=h(e[n+0],f),m=h(e[n+1],f),g=h(e[n+2],f),b=o(c,u,p)-o(d,m,g);if(r)return b;var v=s(c,u,p)-s(d,m,g),w=l(c,u,p)-l(d,m,g);return.5053*b*b+.299*v*v+.1957*w*w}function o(t,e,i){return.29889531*t+.58662247*e+.11448223*i}function s(t,e,i){return.59597799*t-.2741761*e-.32180189*i}function l(t,e,i){return.21147017*t-.52261711*e+.31114694*i}function h(t,e){return 255+(t-255)*e}function f(t,e,i,n,r){t[e+0]=i,t[e+1]=n,t[e+2]=r,t[e+3]=255}function c(t,e){var i=t[e+3]/255,n=h(t[e+0],i),r=h(t[e+1],i),a=h(t[e+2],i);return o(n,r,a)}e.exports=n},{}],62:[function(t,e,i){(function(e){"use strict";function n(t,e){function i(){if(r===t.length)throw new Error("Ran out of data");var i=t[r];r++;var a,o,s,l,h,f,c,u;switch(e){default:throw new Error("unrecognised depth");case 16:c=t[r],r++,n.push((i<<8)+c);break;case 4:c=15&i,u=i>>4,n.push(u,c);break;case 2:h=3&i,f=i>>2&3,c=i>>4&3,u=i>>6&3,n.push(u,c,f,h);break;case 1:a=1&i,o=i>>1&1,s=i>>2&1,l=i>>3&1,h=i>>4&1,f=i>>5&1,c=i>>6&1,u=i>>7&1,n.push(u,c,f,h,l,s,o,a)}}var n=[],r=0;return{get:function(t){for(;n.length<t;)i();var e=n.slice(0,t);return n=n.slice(t),e},resetAfterLine:function(){n.length=0},end:function(){if(r!==t.length)throw new Error("extra data found")}}}function r(t,e,i,n,r,a){for(var o=t.width,l=t.height,h=t.index,f=0;l>f;f++)for(var c=0;o>c;c++){for(var u=i(c,f,h),p=0;4>p;p++){var d=s[n][p];if(p===r.length)throw new Error("Ran out of data");e[u+p]=255!==d?r[d+a]:255}a+=n}return a}function a(t,e,i,n,r,a){for(var o=t.width,l=t.height,h=t.index,f=0;l>f;f++){for(var c=0;o>c;c++)for(var u=r.get(n),p=i(c,f,h),d=0;4>d;d++){var m=s[n][d];e[p+d]=255!==m?u[m]:a}r.resetAfterLine()}}var o=t("./interlace"),s={1:{0:0,1:0,2:0,3:255},2:{0:0,1:0,2:0,3:1},3:{0:0,1:1,2:2,3:255},4:{0:0,1:1,2:2,3:3}};i.dataToBitMap=function(t,i){var s=i.width,l=i.height,h=i.depth,f=i.bpp,c=i.interlace;if(8!==h)var u=n(t,h);var p;p=8>=h?new e(s*l*4):new Uint16Array(s*l*4);var d,m,g=Math.pow(2,h)-1,b=0;if(c)d=o.getImagePasses(s,l),m=o.getInterlaceIterator(s,l);else{var v=0;m=function(){var t=v;return v+=4,t},d=[{width:s,height:l}]}for(var w=0;w<d.length;w++)8===h?b=r(d[w],p,m,f,t,b):a(d[w],p,m,f,u,g);if(8===h){if(b!==t.length)throw new Error("extra data found")}else u.end();return p}}).call(this,t("buffer").Buffer)},{"./interlace":72,buffer:14}],63:[function(t,e,i){(function(i){"use strict";var n=t("./constants");e.exports=function(t,e,r,a){var o=a.colorType===n.COLORTYPE_COLOR_ALPHA;if(a.inputHasAlpha&&o)return t;if(!a.inputHasAlpha&&!o)return t;var s=o?4:3,l=new i(e*r*s),h=a.inputHasAlpha?4:3,f=0,c=0,u=a.bgColor||{};void 0===u.red&&(u.red=255),void 0===u.green&&(u.green=255),void 0===u.blue&&(u.blue=255);for(var p=0;r>p;p++)for(var d=0;e>d;d++){var m,g=t[f],b=t[f+1],v=t[f+2];a.inputHasAlpha?(m=t[f+3],o||(m/=255,g=Math.min(Math.max(Math.round((1-m)*u.red+m*g),0),255),b=Math.min(Math.max(Math.round((1-m)*u.green+m*b),0),255),v=Math.min(Math.max(Math.round((1-m)*u.blue+m*v),0),255))):m=255,l[c]=g,l[c+1]=b,l[c+2]=v,o&&(l[c+3]=m),f+=h,c+=s}return l}}).call(this,t("buffer").Buffer)},{"./constants":65,buffer:14}],64:[function(t,e,i){(function(i,n){"use strict";var r=t("util"),a=t("stream"),o=e.exports=function(){a.call(this),this._buffers=[],this._buffered=0,this._reads=[],this._paused=!1,this._encoding="utf8",this.writable=!0};r.inherits(o,a),o.prototype.read=function(t,e){this._reads.push({length:Math.abs(t),allowLess:0>t,func:e}),i.nextTick(function(){this._process(),this._paused&&this._reads.length>0&&(this._paused=!1,this.emit("drain"))}.bind(this))},o.prototype.write=function(t,e){if(!this.writable)return this.emit("error",new Error("Stream not writable")),!1;var i;return i=n.isBuffer(t)?t:new n(t,e||this._encoding),this._buffers.push(i),this._buffered+=i.length,this._process(),this._reads&&0===this._reads.length&&(this._paused=!0),this.writable&&!this._paused},o.prototype.end=function(t,e){t&&this.write(t,e),this.writable=!1,this._buffers&&(0===this._buffers.length?this._end():(this._buffers.push(null),this._process()))},o.prototype.destroySoon=o.prototype.end,o.prototype._end=function(){this._reads.length>0&&this.emit("error",new Error("There are some read requests waitng on finished stream")),this.destroy()},o.prototype.destroy=function(){this._buffers&&(this.writable=!1,this._reads=null,this._buffers=null,this.emit("close"))},o.prototype._processReadAllowingLess=function(t){this._reads.shift();var e=this._buffers[0];e.length>t.length?(this._buffered-=t.length,this._buffers[0]=e.slice(t.length),t.func.call(this,e.slice(0,t.length))):(this._buffered-=e.length,this._buffers.shift(),t.func.call(this,e))},o.prototype._processRead=function(t){this._reads.shift();for(var e=0,i=0,r=new n(t.length);e<t.length;){var a=this._buffers[i++],o=Math.min(a.length,t.length-e);a.copy(r,e,0,o),e+=o,o!==a.length&&(this._buffers[--i]=a.slice(o))}i>0&&this._buffers.splice(0,i),this._buffered-=t.length,t.func.call(this,r)},o.prototype._process=function(){try{for(;this._buffered>0&&this._reads&&this._reads.length>0;){var t=this._reads[0];if(t.allowLess)this._processReadAllowingLess(t);else{if(!(this._buffered>=t.length))break;this._processRead(t)}}this._buffers&&this._buffers.length>0&&null===this._buffers[0]&&this._end()}catch(e){this.emit("error",e)}}}).call(this,t("_process"),t("buffer").Buffer)},{_process:12,buffer:14,stream:95,util:104}],65:[function(t,e,i){"use strict";e.exports={PNG_SIGNATURE:[137,80,78,71,13,10,26,10],TYPE_IHDR:1229472850,TYPE_IEND:1229278788,TYPE_IDAT:1229209940,TYPE_PLTE:1347179589,TYPE_tRNS:1951551059,TYPE_gAMA:1732332865,COLORTYPE_GRAYSCALE:0,COLORTYPE_PALETTE:1,COLORTYPE_COLOR:2,COLORTYPE_ALPHA:4,COLORTYPE_PALETTE_COLOR:3,COLORTYPE_COLOR_ALPHA:6,COLORTYPE_TO_BPP_MAP:{0:1,2:3,3:1,4:2,6:4},GAMMA_DIVISION:1e5}},{}],66:[function(t,e,i){"use strict";var n=[];!function(){for(var t=0;256>t;t++){for(var e=t,i=0;8>i;i++)1&e?e=3988292384^e>>>1:e>>>=1;n[t]=e}}();var r=e.exports=function(){this._crc=-1};r.prototype.write=function(t){for(var e=0;e<t.length;e++)this._crc=n[255&(this._crc^t[e])]^this._crc>>>8;return!0},r.prototype.crc32=function(){return-1^this._crc},r.crc32=function(t){for(var e=-1,i=0;i<t.length;i++)e=n[255&(e^t[i])]^e>>>8;return-1^e}},{}],67:[function(t,e,i){(function(i){"use strict";function n(t,e,i,n,r){t.copy(n,r,e,e+i)}function r(t,e,i){for(var n=0,r=e+i,a=e;r>a;a++)n+=Math.abs(t[a]);return n}function a(t,e,i,n,r,a){for(var o=0;i>o;o++){var s=o>=a?t[e+o-a]:0,l=t[e+o]-s;n[r+o]=l}}function o(t,e,i,n){for(var r=0,a=0;i>a;a++){var o=a>=n?t[e+a-n]:0,s=t[e+a]-o;r+=Math.abs(s)}return r}function s(t,e,i,n,r){for(var a=0;i>a;a++){var o=e>0?t[e+a-i]:0,s=t[e+a]-o;n[r+a]=s}}function l(t,e,i){for(var n=0,r=e+i,a=e;r>a;a++){var o=e>0?t[a-i]:0,s=t[a]-o;n+=Math.abs(s)}return n}function h(t,e,i,n,r,a){for(var o=0;i>o;o++){var s=o>=a?t[e+o-a]:0,l=e>0?t[e+o-i]:0,h=t[e+o]-(s+l>>1);n[r+o]=h}}function f(t,e,i,n){for(var r=0,a=0;i>a;a++){var o=a>=n?t[e+a-n]:0,s=e>0?t[e+a-i]:0,l=t[e+a]-(o+s>>1);r+=Math.abs(l)}return r}function c(t,e,i,n,r,a){for(var o=0;i>o;o++){var s=o>=a?t[e+o-a]:0,l=e>0?t[e+o-i]:0,h=e>0&&o>=a?t[e+o-(i+a)]:0,f=t[e+o]-p(s,l,h);n[r+o]=f}}function u(t,e,i,n){for(var r=0,a=0;i>a;a++){var o=a>=n?t[e+a-n]:0,s=e>0?t[e+a-i]:0,l=e>0&&a>=n?t[e+a-(i+n)]:0,h=t[e+a]-p(o,s,l);r+=Math.abs(h)}return r}var p=t("./paeth-predictor"),d={0:n,1:a,2:s,3:h,4:c},m={0:r,1:o,2:l,3:f,4:u};e.exports=function(t,e,n,r,a){var o;if("filterType"in r&&-1!==r.filterType){if("number"!=typeof r.filterType)throw new Error("unrecognised filter types");o=[r.filterType]}else o=[0,1,2,3,4];for(var s=e*a,l=0,h=0,f=new i((s+1)*n),c=o[0],u=0;n>u;u++){if(o.length>1)for(var p=1/0,g=0;g<o.length;g++){var b=m[o[g]](t,h,s,a);p>b&&(c=o[g],p=b)}f[l]=c,l++,d[c](t,h,s,f,l,a),l+=s,h+=s}return f}}).call(this,t("buffer").Buffer)},{"./paeth-predictor":76,buffer:14}],68:[function(t,e,i){(function(i){"use strict";var n=t("util"),r=t("./chunkstream"),a=t("./filter-parse"),o=e.exports=function(t){r.call(this);var e=[],n=this;this._filter=new a(t,{read:this.read.bind(this),write:function(t){e.push(t)},complete:function(){n.emit("complete",i.concat(e))}}),this._filter.start()};n.inherits(o,r)}).call(this,t("buffer").Buffer)},{"./chunkstream":64,"./filter-parse":70,buffer:14,util:104}],69:[function(t,e,i){(function(e){"use strict";var n=t("./sync-reader"),r=t("./filter-parse");i.process=function(t,i){var a=[],o=new n(t),s=new r(i,{read:o.read.bind(o),write:function(t){a.push(t)},complete:function(){}});return s.start(),o.process(),e.concat(a)}}).call(this,t("buffer").Buffer)},{"./filter-parse":70,"./sync-reader":82,buffer:14}],70:[function(t,e,i){(function(i){"use strict";function n(t,e,i){var n=t*e;return 8!==i&&(n=Math.ceil(n/(8/i))),n}var r=t("./interlace"),a=t("./paeth-predictor"),o=e.exports=function(t,e){var i=t.width,a=t.height,o=t.interlace,s=t.bpp,l=t.depth;if(this.read=e.read,this.write=e.write,this.complete=e.complete,this._imageIndex=0,this._images=[],o)for(var h=r.getImagePasses(i,a),f=0;f<h.length;f++)this._images.push({byteWidth:n(h[f].width,s,l),height:h[f].height,lineIndex:0});else this._images.push({byteWidth:n(i,s,l),height:a,lineIndex:0});8===l?this._xComparison=s:16===l?this._xComparison=2*s:this._xComparison=1};o.prototype.start=function(){this.read(this._images[this._imageIndex].byteWidth+1,this._reverseFilterLine.bind(this))},o.prototype._unFilterType1=function(t,e,i){for(var n=this._xComparison,r=n-1,a=0;i>a;a++){var o=t[1+a],s=a>r?e[a-n]:0;e[a]=o+s}},o.prototype._unFilterType2=function(t,e,i){for(var n=this._lastLine,r=0;i>r;r++){var a=t[1+r],o=n?n[r]:0;e[r]=a+o}},o.prototype._unFilterType3=function(t,e,i){for(var n=this._xComparison,r=n-1,a=this._lastLine,o=0;i>o;o++){var s=t[1+o],l=a?a[o]:0,h=o>r?e[o-n]:0,f=Math.floor((h+l)/2);e[o]=s+f}},o.prototype._unFilterType4=function(t,e,i){for(var n=this._xComparison,r=n-1,o=this._lastLine,s=0;i>s;s++){var l=t[1+s],h=o?o[s]:0,f=s>r?e[s-n]:0,c=s>r&&o?o[s-n]:0,u=a(f,h,c);e[s]=l+u}},o.prototype._reverseFilterLine=function(t){var e,n=t[0],r=this._images[this._imageIndex],a=r.byteWidth;if(0===n)e=t.slice(1,a+1);else switch(e=new i(a),n){case 1:this._unFilterType1(t,e,a);break;case 2:this._unFilterType2(t,e,a);break;case 3:this._unFilterType3(t,e,a);break;case 4:this._unFilterType4(t,e,a);break;default:throw new Error("Unrecognised filter type - "+n)}this.write(e),r.lineIndex++,r.lineIndex>=r.height?(this._lastLine=null,this._imageIndex++,r=this._images[this._imageIndex]):this._lastLine=e,r?this.read(r.byteWidth+1,this._reverseFilterLine.bind(this)):(this._lastLine=null,this.complete())}}).call(this,t("buffer").Buffer)},{"./interlace":72,"./paeth-predictor":76,buffer:14}],71:[function(t,e,i){(function(t){"use strict";function i(t,e,i,n,r){for(var a=0,o=0;n>o;o++)for(var s=0;i>s;s++){var l=r[t[a]];if(!l)throw new Error("index "+t[a]+" not in palette");for(var h=0;4>h;h++)e[a+h]=l[h];a+=4}}function n(t,e,i,n,r){for(var a=0,o=0;n>o;o++)for(var s=0;i>s;s++){var l=!1;if(1===r.length?r[0]===t[a]&&(l=!0):r[0]===t[a]&&r[1]===t[a+1]&&r[2]===t[a+2]&&(l=!0),l)for(var h=0;4>h;h++)e[a+h]=0;a+=4}}function r(t,e,i,n,r){for(var a=255,o=Math.pow(2,r)-1,s=0,l=0;n>l;l++)for(var h=0;i>h;h++){for(var f=0;4>f;f++)e[s+f]=Math.floor(t[s+f]*a/o+.5);s+=4}}e.exports=function(e,a){var o=a.depth,s=a.width,l=a.height,h=a.colorType,f=a.transColor,c=a.palette,u=e;return 3===h?i(e,u,s,l,c):(f&&n(e,u,s,l,f),8!==o&&(16===o&&(u=new t(s*l*4)),r(e,u,s,l,o))),u}}).call(this,t("buffer").Buffer)},{buffer:14}],72:[function(t,e,i){"use strict";var n=[{x:[0],y:[0]},{x:[4],y:[0]},{x:[0,4],y:[4]},{x:[2,6],y:[0,4]},{x:[0,2,4,6],y:[2,6]},{x:[1,3,5,7],y:[0,2,4,6]},{x:[0,1,2,3,4,5,6,7],y:[1,3,5,7]}];i.getImagePasses=function(t,e){for(var i=[],r=t%8,a=e%8,o=(t-r)/8,s=(e-a)/8,l=0;l<n.length;l++){for(var h=n[l],f=o*h.x.length,c=s*h.y.length,u=0;u<h.x.length&&h.x[u]<r;u++)f++;for(u=0;u<h.y.length&&h.y[u]<a;u++)c++;f>0&&c>0&&i.push({width:f,height:c,index:l})}return i},i.getInterlaceIterator=function(t){return function(e,i,r){var a=e%n[r].x.length,o=(e-a)/n[r].x.length*8+n[r].x[a],s=i%n[r].y.length,l=(i-s)/n[r].y.length*8+n[r].y[s];return 4*o+l*t*4}}},{}],73:[function(t,e,i){(function(i){"use strict";var n=t("util"),r=t("stream"),a=t("./constants"),o=t("./packer"),s=e.exports=function(t){r.call(this);var e=t||{};this._packer=new o(e),this._deflate=this._packer.createDeflate(),this.readable=!0};n.inherits(s,r),s.prototype.pack=function(t,e,n,r){this.emit("data",new i(a.PNG_SIGNATURE)),this.emit("data",this._packer.packIHDR(e,n)),r&&this.emit("data",this._packer.packGAMA(r));var o=this._packer.filterData(t,e,n);this._deflate.on("error",this.emit.bind(this,"error")),this._deflate.on("data",function(t){this.emit("data",this._packer.packIDAT(t))}.bind(this)),this._deflate.on("end",function(){this.emit("data",this._packer.packIEND()),this.emit("end")}.bind(this)),this._deflate.end(o)}}).call(this,t("buffer").Buffer)},{"./constants":65,"./packer":75,buffer:14,stream:95,util:104}],74:[function(t,e,i){(function(i){"use strict";var n=t("zlib"),r=t("./constants"),a=t("./packer");e.exports=function(t,e){var o=e||{},s=new a(o),l=[];l.push(new i(r.PNG_SIGNATURE)),l.push(s.packIHDR(t.width,t.height)),t.gamma&&l.push(s.packGAMA(t.gamma));var h=s.filterData(t.data,t.width,t.height),f=n.deflateSync(h,s.getDeflateOptions());if(h=null,!f||!f.length)throw new Error("bad png - invalid compressed data response");return l.push(s.packIDAT(f)),l.push(s.packIEND()),i.concat(l)}}).call(this,t("buffer").Buffer)},{"./constants":65,"./packer":75,buffer:14,zlib:10}],75:[function(t,e,i){(function(i){"use strict";var n=t("./constants"),r=t("./crc"),a=t("./bitpacker"),o=t("./filter-pack"),s=t("zlib"),l=e.exports=function(t){if(this._options=t,t.deflateChunkSize=t.deflateChunkSize||32768,t.deflateLevel=null!=t.deflateLevel?t.deflateLevel:9,t.deflateStrategy=null!=t.deflateStrategy?t.deflateStrategy:3,t.inputHasAlpha=null!=t.inputHasAlpha?t.inputHasAlpha:!0,t.deflateFactory=t.deflateFactory||s.createDeflate,t.bitDepth=t.bitDepth||8,t.colorType="number"==typeof t.colorType?t.colorType:n.COLORTYPE_COLOR_ALPHA,t.colorType!==n.COLORTYPE_COLOR&&t.colorType!==n.COLORTYPE_COLOR_ALPHA)throw new Error("option color type:"+t.colorType+" is not supported at present");if(8!==t.bitDepth)throw new Error("option bit depth:"+t.bitDepth+" is not supported at present")};l.prototype.getDeflateOptions=function(){return{chunkSize:this._options.deflateChunkSize,level:this._options.deflateLevel,strategy:this._options.deflateStrategy}},l.prototype.createDeflate=function(){return this._options.deflateFactory(this.getDeflateOptions())},l.prototype.filterData=function(t,e,i){var r=a(t,e,i,this._options),s=n.COLORTYPE_TO_BPP_MAP[this._options.colorType],l=o(r,e,i,this._options,s);return l},l.prototype._packChunk=function(t,e){var n=e?e.length:0,a=new i(n+12);return a.writeUInt32BE(n,0),a.writeUInt32BE(t,4),e&&e.copy(a,8),a.writeInt32BE(r.crc32(a.slice(4,a.length-4)),a.length-4),a},l.prototype.packGAMA=function(t){var e=new i(4);return e.writeUInt32BE(Math.floor(t*n.GAMMA_DIVISION),0),this._packChunk(n.TYPE_gAMA,e)},l.prototype.packIHDR=function(t,e){var r=new i(13);return r.writeUInt32BE(t,0),r.writeUInt32BE(e,4),r[8]=this._options.bitDepth,r[9]=this._options.colorType,r[10]=0,r[11]=0,r[12]=0,this._packChunk(n.TYPE_IHDR,r)},l.prototype.packIDAT=function(t){return this._packChunk(n.TYPE_IDAT,t)},l.prototype.packIEND=function(){return this._packChunk(n.TYPE_IEND,null)}}).call(this,t("buffer").Buffer)},{"./bitpacker":63,"./constants":65,"./crc":66,"./filter-pack":67,buffer:14,zlib:10}],76:[function(t,e,i){"use strict";e.exports=function(t,e,i){var n=t+e-i,r=Math.abs(n-t),a=Math.abs(n-e),o=Math.abs(n-i);return a>=r&&o>=r?t:o>=a?e:i}},{}],77:[function(t,e,i){"use strict";var n=t("util"),r=t("zlib"),a=t("./chunkstream"),o=t("./filter-parse-async"),s=t("./parser"),l=t("./bitmapper"),h=t("./format-normaliser"),f=e.exports=function(t){a.call(this),this._parser=new s(t,{read:this.read.bind(this),error:this._handleError.bind(this),metadata:this._handleMetaData.bind(this),gamma:this.emit.bind(this,"gamma"),palette:this._handlePalette.bind(this),transColor:this._handleTransColor.bind(this),finished:this._finished.bind(this),inflateData:this._inflateData.bind(this)}),this._options=t,this.writable=!0,this._parser.start()};n.inherits(f,a),f.prototype._handleError=function(t){this.emit("error",t),this.writable=!1,this.destroy(),this._inflate&&this._inflate.destroy&&this._inflate.destroy(),this.errord=!0},f.prototype._inflateData=function(t){this._inflate||(this._inflate=r.createInflate(),this._inflate.on("error",this.emit.bind(this,"error")),this._filter.on("complete",this._complete.bind(this)),this._inflate.pipe(this._filter)),this._inflate.write(t)},f.prototype._handleMetaData=function(t){this.emit("metadata",t),this._bitmapInfo=Object.create(t),this._filter=new o(this._bitmapInfo)},f.prototype._handleTransColor=function(t){this._bitmapInfo.transColor=t},f.prototype._handlePalette=function(t){this._bitmapInfo.palette=t},f.prototype._finished=function(){this.errord||(this._inflate?this._inflate.end():this.emit("error","No Inflate block"),this.destroySoon())},f.prototype._complete=function(t){if(!this.errord){try{var e=l.dataToBitMap(t,this._bitmapInfo),i=h(e,this._bitmapInfo);e=null}catch(n){return void this._handleError(n)}this.emit("parsed",i)}}},{"./bitmapper":62,"./chunkstream":64,"./filter-parse-async":68,"./format-normaliser":71,"./parser":79,util:104,zlib:10}],78:[function(t,e,i){(function(i){"use strict";var n=t("zlib"),r=t("./sync-reader"),a=t("./filter-parse-sync"),o=t("./parser"),s=t("./bitmapper"),l=t("./format-normaliser");e.exports=function(t,e){function h(t){m=t}function f(t){g=t}function c(t){g.transColor=t}function u(t){g.palette=t}function p(t){b=t}function d(t){v.push(t)}var m,g,b,v=[],w=new r(t),_=new o(e,{read:w.read.bind(w),error:h,metadata:f,gamma:p,palette:u,transColor:c,inflateData:d});if(_.start(),w.process(),m)throw m;var y=i.concat(v);v.length=0;var x=n.inflateSync(y);if(y=null,!x||!x.length)throw new Error("bad png - invalid inflate data response");var k=a.process(x,g);y=null;var E=s.dataToBitMap(k,g);k=null;var S=l(E,g);return g.data=S,g.gamma=b||0,g}}).call(this,t("buffer").Buffer)},{"./bitmapper":62,"./filter-parse-sync":69,"./format-normaliser":71,"./parser":79,"./sync-reader":82,buffer:14,zlib:10}],79:[function(t,e,i){(function(i){"use strict";var n=t("./constants"),r=t("./crc"),a=e.exports=function(t,e){this._options=t,t.checkCRC=t.checkCRC!==!1,this._hasIHDR=!1,this._hasIEND=!1,this._palette=[],this._colorType=0,this._chunks={},this._chunks[n.TYPE_IHDR]=this._handleIHDR.bind(this),this._chunks[n.TYPE_IEND]=this._handleIEND.bind(this),this._chunks[n.TYPE_IDAT]=this._handleIDAT.bind(this),this._chunks[n.TYPE_PLTE]=this._handlePLTE.bind(this),this._chunks[n.TYPE_tRNS]=this._handleTRNS.bind(this),this._chunks[n.TYPE_gAMA]=this._handleGAMA.bind(this),this.read=e.read,this.error=e.error,this.metadata=e.metadata,this.gamma=e.gamma,this.transColor=e.transColor,this.palette=e.palette,this.parsed=e.parsed,this.inflateData=e.inflateData,this.inflateData=e.inflateData,this.finished=e.finished};a.prototype.start=function(){this.read(n.PNG_SIGNATURE.length,this._parseSignature.bind(this))},a.prototype._parseSignature=function(t){for(var e=n.PNG_SIGNATURE,i=0;i<e.length;i++)if(t[i]!==e[i])return void this.error(new Error("Invalid file signature"));this.read(8,this._parseChunkBegin.bind(this))},a.prototype._parseChunkBegin=function(t){for(var e=t.readUInt32BE(0),a=t.readUInt32BE(4),o="",s=4;8>s;s++)o+=String.fromCharCode(t[s]);var l=Boolean(32&t[4]);return this._hasIHDR||a===n.TYPE_IHDR?(this._crc=new r,this._crc.write(new i(o)),this._chunks[a]?this._chunks[a](e):l?void this.read(e+4,this._skipChunk.bind(this)):void this.error(new Error("Unsupported critical chunk type "+o))):void this.error(new Error("Expected IHDR on beggining"))},a.prototype._skipChunk=function(){this.read(8,this._parseChunkBegin.bind(this))},a.prototype._handleChunkEnd=function(){this.read(4,this._parseChunkEnd.bind(this))},a.prototype._parseChunkEnd=function(t){var e=t.readInt32BE(0),i=this._crc.crc32();return this._options.checkCRC&&i!==e?void this.error(new Error("Crc error - "+e+" - "+i)):void(this._hasIEND||this.read(8,this._parseChunkBegin.bind(this)))},a.prototype._handleIHDR=function(t){this.read(t,this._parseIHDR.bind(this))},a.prototype._parseIHDR=function(t){this._crc.write(t);var e=t.readUInt32BE(0),i=t.readUInt32BE(4),r=t[8],a=t[9],o=t[10],s=t[11],l=t[12];if(8!==r&&4!==r&&2!==r&&1!==r&&16!==r)return void this.error(new Error("Unsupported bit depth "+r));if(!(a in n.COLORTYPE_TO_BPP_MAP))return void this.error(new Error("Unsupported color type"));if(0!==o)return void this.error(new Error("Unsupported compression method"));if(0!==s)return void this.error(new Error("Unsupported filter method"));if(0!==l&&1!==l)return void this.error(new Error("Unsupported interlace method"));this._colorType=a;var h=n.COLORTYPE_TO_BPP_MAP[this._colorType];this._hasIHDR=!0,this.metadata({width:e,height:i,depth:r,interlace:Boolean(l),palette:Boolean(a&n.COLORTYPE_PALETTE),color:Boolean(a&n.COLORTYPE_COLOR),alpha:Boolean(a&n.COLORTYPE_ALPHA),bpp:h,colorType:a}),this._handleChunkEnd()},a.prototype._handlePLTE=function(t){this.read(t,this._parsePLTE.bind(this))},a.prototype._parsePLTE=function(t){this._crc.write(t);for(var e=Math.floor(t.length/3),i=0;e>i;i++)this._palette.push([t[3*i],t[3*i+1],t[3*i+2],255]);this.palette(this._palette),this._handleChunkEnd()},a.prototype._handleTRNS=function(t){this.read(t,this._parseTRNS.bind(this))},a.prototype._parseTRNS=function(t){if(this._crc.write(t),this._colorType===n.COLORTYPE_PALETTE_COLOR){if(0===this._palette.length)return void this.error(new Error("Transparency chunk must be after palette"));if(t.length>this._palette.length)return void this.error(new Error("More transparent colors than palette size"));for(var e=0;e<t.length;e++)this._palette[e][3]=t[e];this.palette(this._palette)}this._colorType===n.COLORTYPE_GRAYSCALE&&this.transColor([t.readUInt16BE(0)]),this._colorType===n.COLORTYPE_COLOR&&this.transColor([t.readUInt16BE(0),t.readUInt16BE(2),t.readUInt16BE(4)]),this._handleChunkEnd()},a.prototype._handleGAMA=function(t){this.read(t,this._parseGAMA.bind(this))},a.prototype._parseGAMA=function(t){this._crc.write(t),this.gamma(t.readUInt32BE(0)/n.GAMMA_DIVISION),this._handleChunkEnd()},a.prototype._handleIDAT=function(t){this.read(-t,this._parseIDAT.bind(this,t))},a.prototype._parseIDAT=function(t,e){if(this._crc.write(e),this._colorType===n.COLORTYPE_PALETTE_COLOR&&0===this._palette.length)throw new Error("Expected palette not found");this.inflateData(e);var i=t-e.length;i>0?this._handleIDAT(i):this._handleChunkEnd()},a.prototype._handleIEND=function(t){this.read(t,this._parseIEND.bind(this))},a.prototype._parseIEND=function(t){this._crc.write(t),this._hasIEND=!0,this._handleChunkEnd(),this.finished&&this.finished()}}).call(this,t("buffer").Buffer)},{"./constants":65,"./crc":66,buffer:14}],80:[function(t,e,i){"use strict";var n=t("./parser-sync"),r=t("./packer-sync");i.read=function(t,e){return n(t,e||{})},i.write=function(t){return r(t)}},{"./packer-sync":74,"./parser-sync":78}],81:[function(t,e,i){(function(e,n){"use strict";var r=t("util"),a=t("stream"),o=t("./parser-async"),s=t("./packer-async"),l=t("./png-sync"),h=i.PNG=function(t){a.call(this),t=t||{},this.width=t.width||0,this.height=t.height||0,this.data=this.width>0&&this.height>0?new n(4*this.width*this.height):null,t.fill&&this.data&&this.data.fill(0),this.gamma=0,this.readable=this.writable=!0,this._parser=new o(t),this._parser.on("error",this.emit.bind(this,"error")),this._parser.on("close",this._handleClose.bind(this)),this._parser.on("metadata",this._metadata.bind(this)),this._parser.on("gamma",this._gamma.bind(this)),this._parser.on("parsed",function(t){this.data=t,this.emit("parsed",t)}.bind(this)),this._packer=new s(t),this._packer.on("data",this.emit.bind(this,"data")),this._packer.on("end",this.emit.bind(this,"end")),this._parser.on("close",this._handleClose.bind(this)),this._packer.on("error",this.emit.bind(this,"error"))};r.inherits(h,a),h.sync=l,h.prototype.pack=function(){return this.data&&this.data.length?(e.nextTick(function(){this._packer.pack(this.data,this.width,this.height,this.gamma)}.bind(this)),this):(this.emit("error","No data provided"),this)},h.prototype.parse=function(t,e){if(e){var i,n;i=function(t){this.removeListener("error",n),this.data=t,e(null,this)}.bind(this),n=function(t){this.removeListener("parsed",i),e(t,null);
}.bind(this),this.once("parsed",i),this.once("error",n)}return this.end(t),this},h.prototype.write=function(t){return this._parser.write(t),!0},h.prototype.end=function(t){this._parser.end(t)},h.prototype._metadata=function(t){this.width=t.width,this.height=t.height,this.emit("metadata",t)},h.prototype._gamma=function(t){this.gamma=t},h.prototype._handleClose=function(){this._parser.writable||this._packer.readable||this.emit("close")},h.bitblt=function(t,e,i,n,r,a,o,s){if(i>t.width||n>t.height||i+r>t.width||n+a>t.height)throw new Error("bitblt reading outside image");if(o>e.width||s>e.height||o+r>e.width||s+a>e.height)throw new Error("bitblt writing outside image");for(var l=0;a>l;l++)t.data.copy(e.data,(s+l)*e.width+o<<2,(n+l)*t.width+i<<2,(n+l)*t.width+i+r<<2)},h.prototype.bitblt=function(t,e,i,n,r,a,o){return h.bitblt(this,t,e,i,n,r,a,o),this},h.adjustGamma=function(t){if(t.gamma){for(var e=0;e<t.height;e++)for(var i=0;i<t.width;i++)for(var n=t.width*e+i<<2,r=0;3>r;r++){var a=t.data[n+r]/255;a=Math.pow(a,1/2.2/t.gamma),t.data[n+r]=Math.round(255*a)}t.gamma=0}},h.prototype.adjustGamma=function(){h.adjustGamma(this)}}).call(this,t("_process"),t("buffer").Buffer)},{"./packer-async":73,"./parser-async":77,"./png-sync":80,_process:12,buffer:14,stream:95,util:104}],82:[function(t,e,i){"use strict";var n=e.exports=function(t){this._buffer=t,this._reads=[]};n.prototype.read=function(t,e){this._reads.push({length:Math.abs(t),allowLess:0>t,func:e})},n.prototype.process=function(){for(;this._reads.length>0&&this._buffer.length;){var t=this._reads[0];if(!this._buffer.length||!(this._buffer.length>=t.length||t.allowLess))break;this._reads.shift();var e=this._buffer;this._buffer=e.slice(t.length),t.func.call(this,e.slice(0,t.length))}return this._reads.length>0?new Error("There are some read requests waitng on finished stream"):this._buffer.length>0?new Error("unrecognised content at end of stream"):void 0}},{}],83:[function(t,e,i){(function(t){"use strict";function i(e){for(var i=new Array(arguments.length-1),n=0;n<i.length;)i[n++]=arguments[n];t.nextTick(function(){e.apply(null,i)})}!t.version||0===t.version.indexOf("v0.")||0===t.version.indexOf("v1.")&&0!==t.version.indexOf("v1.8.")?e.exports=i:e.exports=t.nextTick}).call(this,t("_process"))},{_process:12}],84:[function(t,e,i){(function(i){"use strict";var n=t("fs");e.exports=function(t,e,r,a){var o=new i(r);n.open(t,"r",function(t,i){return t?a(t):void n.read(i,o,0,r,e,function(t,e,o){return t?a(t):void n.close(i,function(t){return t?a(t):(r>e&&(o=o.slice(0,e)),void a(null,o))})})})},e.exports.sync=function(t,e,r){var a=new i(r),o=n.openSync(t,"r"),s=n.readSync(o,a,0,r,e);return n.closeSync(o),r>s&&(a=a.slice(0,s)),a}}).call(this,t("buffer").Buffer)},{buffer:14,fs:11}],85:[function(t,e,i){e.exports=t("./lib/_stream_duplex.js")},{"./lib/_stream_duplex.js":86}],86:[function(t,e,i){"use strict";function n(t){return this instanceof n?(h.call(this,t),f.call(this,t),t&&t.readable===!1&&(this.readable=!1),t&&t.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,t&&t.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",r)):new n(t)}function r(){this.allowHalfOpen||this._writableState.ended||s(a,this)}function a(t){t.end()}var o=Object.keys||function(t){var e=[];for(var i in t)e.push(i);return e};e.exports=n;var s=t("process-nextick-args"),l=t("core-util-is");l.inherits=t("inherits");var h=t("./_stream_readable"),f=t("./_stream_writable");l.inherits(n,h);for(var c=o(f.prototype),u=0;u<c.length;u++){var p=c[u];n.prototype[p]||(n.prototype[p]=f.prototype[p])}},{"./_stream_readable":88,"./_stream_writable":90,"core-util-is":15,inherits:31,"process-nextick-args":83}],87:[function(t,e,i){"use strict";function n(t){return this instanceof n?void r.call(this,t):new n(t)}e.exports=n;var r=t("./_stream_transform"),a=t("core-util-is");a.inherits=t("inherits"),a.inherits(n,r),n.prototype._transform=function(t,e,i){i(null,t)}},{"./_stream_transform":89,"core-util-is":15,inherits:31}],88:[function(t,e,i){(function(i){"use strict";function n(e,i){B=B||t("./_stream_duplex"),e=e||{},this.objectMode=!!e.objectMode,i instanceof B&&(this.objectMode=this.objectMode||!!e.readableObjectMode);var n=e.highWaterMark,r=this.objectMode?16:16384;this.highWaterMark=n||0===n?n:r,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(C||(C=t("string_decoder/").StringDecoder),this.decoder=new C(e.encoding),this.encoding=e.encoding)}function r(e){return B=B||t("./_stream_duplex"),this instanceof r?(this._readableState=new n(e,this),this.readable=!0,e&&"function"==typeof e.read&&(this._read=e.read),void A.call(this)):new r(e)}function a(t,e,i,n,r){var a=h(e,i);if(a)t.emit("error",a);else if(null===i)e.reading=!1,f(t,e);else if(e.objectMode||i&&i.length>0)if(e.ended&&!r){var s=new Error("stream.push() after EOF");t.emit("error",s)}else if(e.endEmitted&&r){var s=new Error("stream.unshift() after end event");t.emit("error",s)}else{var l;!e.decoder||r||n||(i=e.decoder.write(i),l=!e.objectMode&&0===i.length),r||(e.reading=!1),l||(e.flowing&&0===e.length&&!e.sync?(t.emit("data",i),t.read(0)):(e.length+=e.objectMode?1:i.length,r?e.buffer.unshift(i):e.buffer.push(i),e.needReadable&&c(t))),p(t,e)}else r||(e.reading=!1);return o(e)}function o(t){return!t.ended&&(t.needReadable||t.length<t.highWaterMark||0===t.length)}function s(t){return t>=z?t=z:(t--,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t++),t}function l(t,e){return 0===e.length&&e.ended?0:e.objectMode?0===t?0:1:null===t||isNaN(t)?e.flowing&&e.buffer.length?e.buffer[0].length:e.length:0>=t?0:(t>e.highWaterMark&&(e.highWaterMark=s(t)),t>e.length?e.ended?e.length:(e.needReadable=!0,0):t)}function h(t,e){var i=null;return M.isBuffer(e)||"string"==typeof e||null===e||void 0===e||t.objectMode||(i=new TypeError("Invalid non-string/buffer chunk")),i}function f(t,e){if(!e.ended){if(e.decoder){var i=e.decoder.end();i&&i.length&&(e.buffer.push(i),e.length+=e.objectMode?1:i.length)}e.ended=!0,c(t)}}function c(t){var e=t._readableState;e.needReadable=!1,e.emittedReadable||(L("emitReadable",e.flowing),e.emittedReadable=!0,e.sync?S(u,t):u(t))}function u(t){L("emit readable"),t.emit("readable"),w(t)}function p(t,e){e.readingMore||(e.readingMore=!0,S(d,t,e))}function d(t,e){for(var i=e.length;!e.reading&&!e.flowing&&!e.ended&&e.length<e.highWaterMark&&(L("maybeReadMore read 0"),t.read(0),i!==e.length);)i=e.length;e.readingMore=!1}function m(t){return function(){var e=t._readableState;L("pipeOnDrain",e.awaitDrain),e.awaitDrain&&e.awaitDrain--,0===e.awaitDrain&&R(t,"data")&&(e.flowing=!0,w(t))}}function g(t){L("readable nexttick read 0"),t.read(0)}function b(t,e){e.resumeScheduled||(e.resumeScheduled=!0,S(v,t,e))}function v(t,e){e.reading||(L("resume read 0"),t.read(0)),e.resumeScheduled=!1,t.emit("resume"),w(t),e.flowing&&!e.reading&&t.read(0)}function w(t){var e=t._readableState;if(L("flow",e.flowing),e.flowing)do var i=t.read();while(null!==i&&e.flowing)}function _(t,e){var i,n=e.buffer,r=e.length,a=!!e.decoder,o=!!e.objectMode;if(0===n.length)return null;if(0===r)i=null;else if(o)i=n.shift();else if(!t||t>=r)i=a?n.join(""):1===n.length?n[0]:M.concat(n,r),n.length=0;else if(t<n[0].length){var s=n[0];i=s.slice(0,t),n[0]=s.slice(t)}else if(t===n[0].length)i=n.shift();else{i=a?"":new M(t);for(var l=0,h=0,f=n.length;f>h&&t>l;h++){var s=n[0],c=Math.min(t-l,s.length);a?i+=s.slice(0,c):s.copy(i,l,0,c),c<s.length?n[0]=s.slice(c):n.shift(),l+=c}}return i}function y(t){var e=t._readableState;if(e.length>0)throw new Error("endReadable called on non-empty stream");e.endEmitted||(e.ended=!0,S(x,e,t))}function x(t,e){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}function k(t,e){for(var i=0,n=t.length;n>i;i++)e(t[i],i)}function E(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1}e.exports=r;var S=t("process-nextick-args"),I=t("isarray"),M=t("buffer").Buffer;r.ReadableState=n;var A,R=(t("events"),function(t,e){return t.listeners(e).length});!function(){try{A=t("stream")}catch(e){}finally{A||(A=t("events").EventEmitter)}}();var M=t("buffer").Buffer,T=t("core-util-is");T.inherits=t("inherits");var P=t("util"),L=void 0;L=P&&P.debuglog?P.debuglog("stream"):function(){};var C;T.inherits(r,A);var B,B;r.prototype.push=function(t,e){var i=this._readableState;return i.objectMode||"string"!=typeof t||(e=e||i.defaultEncoding,e!==i.encoding&&(t=new M(t,e),e="")),a(this,i,t,e,!1)},r.prototype.unshift=function(t){var e=this._readableState;return a(this,e,t,"",!0)},r.prototype.isPaused=function(){return this._readableState.flowing===!1},r.prototype.setEncoding=function(e){return C||(C=t("string_decoder/").StringDecoder),this._readableState.decoder=new C(e),this._readableState.encoding=e,this};var z=8388608;r.prototype.read=function(t){L("read",t);var e=this._readableState,i=t;if(("number"!=typeof t||t>0)&&(e.emittedReadable=!1),0===t&&e.needReadable&&(e.length>=e.highWaterMark||e.ended))return L("read: emitReadable",e.length,e.ended),0===e.length&&e.ended?y(this):c(this),null;if(t=l(t,e),0===t&&e.ended)return 0===e.length&&y(this),null;var n=e.needReadable;L("need readable",n),(0===e.length||e.length-t<e.highWaterMark)&&(n=!0,L("length less than watermark",n)),(e.ended||e.reading)&&(n=!1,L("reading or ended",n)),n&&(L("do read"),e.reading=!0,e.sync=!0,0===e.length&&(e.needReadable=!0),this._read(e.highWaterMark),e.sync=!1),n&&!e.reading&&(t=l(i,e));var r;return r=t>0?_(t,e):null,null===r&&(e.needReadable=!0,t=0),e.length-=t,0!==e.length||e.ended||(e.needReadable=!0),i!==t&&e.ended&&0===e.length&&y(this),null!==r&&this.emit("data",r),r},r.prototype._read=function(t){this.emit("error",new Error("not implemented"))},r.prototype.pipe=function(t,e){function n(t){L("onunpipe"),t===c&&a()}function r(){L("onend"),t.end()}function a(){L("cleanup"),t.removeListener("close",l),t.removeListener("finish",h),t.removeListener("drain",g),t.removeListener("error",s),t.removeListener("unpipe",n),c.removeListener("end",r),c.removeListener("end",a),c.removeListener("data",o),b=!0,!u.awaitDrain||t._writableState&&!t._writableState.needDrain||g()}function o(e){L("ondata");var i=t.write(e);!1===i&&(1!==u.pipesCount||u.pipes[0]!==t||1!==c.listenerCount("data")||b||(L("false write response, pause",c._readableState.awaitDrain),c._readableState.awaitDrain++),c.pause())}function s(e){L("onerror",e),f(),t.removeListener("error",s),0===R(t,"error")&&t.emit("error",e)}function l(){t.removeListener("finish",h),f()}function h(){L("onfinish"),t.removeListener("close",l),f()}function f(){L("unpipe"),c.unpipe(t)}var c=this,u=this._readableState;switch(u.pipesCount){case 0:u.pipes=t;break;case 1:u.pipes=[u.pipes,t];break;default:u.pipes.push(t)}u.pipesCount+=1,L("pipe count=%d opts=%j",u.pipesCount,e);var p=(!e||e.end!==!1)&&t!==i.stdout&&t!==i.stderr,d=p?r:a;u.endEmitted?S(d):c.once("end",d),t.on("unpipe",n);var g=m(c);t.on("drain",g);var b=!1;return c.on("data",o),t._events&&t._events.error?I(t._events.error)?t._events.error.unshift(s):t._events.error=[s,t._events.error]:t.on("error",s),t.once("close",l),t.once("finish",h),t.emit("pipe",c),u.flowing||(L("pipe resume"),c.resume()),t},r.prototype.unpipe=function(t){var e=this._readableState;if(0===e.pipesCount)return this;if(1===e.pipesCount)return t&&t!==e.pipes?this:(t||(t=e.pipes),e.pipes=null,e.pipesCount=0,e.flowing=!1,t&&t.emit("unpipe",this),this);if(!t){var i=e.pipes,n=e.pipesCount;e.pipes=null,e.pipesCount=0,e.flowing=!1;for(var r=0;n>r;r++)i[r].emit("unpipe",this);return this}var a=E(e.pipes,t);return-1===a?this:(e.pipes.splice(a,1),e.pipesCount-=1,1===e.pipesCount&&(e.pipes=e.pipes[0]),t.emit("unpipe",this),this)},r.prototype.on=function(t,e){var i=A.prototype.on.call(this,t,e);if("data"===t&&!1!==this._readableState.flowing&&this.resume(),"readable"===t&&!this._readableState.endEmitted){var n=this._readableState;n.readableListening||(n.readableListening=!0,n.emittedReadable=!1,n.needReadable=!0,n.reading?n.length&&c(this,n):S(g,this))}return i},r.prototype.addListener=r.prototype.on,r.prototype.resume=function(){var t=this._readableState;return t.flowing||(L("resume"),t.flowing=!0,b(this,t)),this},r.prototype.pause=function(){return L("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(L("pause"),this._readableState.flowing=!1,this.emit("pause")),this},r.prototype.wrap=function(t){var e=this._readableState,i=!1,n=this;t.on("end",function(){if(L("wrapped end"),e.decoder&&!e.ended){var t=e.decoder.end();t&&t.length&&n.push(t)}n.push(null)}),t.on("data",function(r){if(L("wrapped data"),e.decoder&&(r=e.decoder.write(r)),(!e.objectMode||null!==r&&void 0!==r)&&(e.objectMode||r&&r.length)){var a=n.push(r);a||(i=!0,t.pause())}});for(var r in t)void 0===this[r]&&"function"==typeof t[r]&&(this[r]=function(e){return function(){return t[e].apply(t,arguments)}}(r));var a=["error","close","destroy","pause","resume"];return k(a,function(e){t.on(e,n.emit.bind(n,e))}),n._read=function(e){L("wrapped _read",e),i&&(i=!1,t.resume())},n},r._fromList=_}).call(this,t("_process"))},{"./_stream_duplex":86,_process:12,buffer:14,"core-util-is":15,events:17,inherits:31,isarray:35,"process-nextick-args":83,"string_decoder/":98,util:8}],89:[function(t,e,i){"use strict";function n(t){this.afterTransform=function(e,i){return r(t,e,i)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function r(t,e,i){var n=t._transformState;n.transforming=!1;var r=n.writecb;if(!r)return t.emit("error",new Error("no writecb in Transform class"));n.writechunk=null,n.writecb=null,null!==i&&void 0!==i&&t.push(i),r(e);var a=t._readableState;a.reading=!1,(a.needReadable||a.length<a.highWaterMark)&&t._read(a.highWaterMark)}function a(t){if(!(this instanceof a))return new a(t);s.call(this,t),this._transformState=new n(this);var e=this;this._readableState.needReadable=!0,this._readableState.sync=!1,t&&("function"==typeof t.transform&&(this._transform=t.transform),"function"==typeof t.flush&&(this._flush=t.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(t){o(e,t)}):o(e)})}function o(t,e){if(e)return t.emit("error",e);var i=t._writableState,n=t._transformState;if(i.length)throw new Error("calling transform done when ws.length != 0");if(n.transforming)throw new Error("calling transform done when still transforming");return t.push(null)}e.exports=a;var s=t("./_stream_duplex"),l=t("core-util-is");l.inherits=t("inherits"),l.inherits(a,s),a.prototype.push=function(t,e){return this._transformState.needTransform=!1,s.prototype.push.call(this,t,e)},a.prototype._transform=function(t,e,i){throw new Error("not implemented")},a.prototype._write=function(t,e,i){var n=this._transformState;if(n.writecb=i,n.writechunk=t,n.writeencoding=e,!n.transforming){var r=this._readableState;(n.needTransform||r.needReadable||r.length<r.highWaterMark)&&this._read(r.highWaterMark)}},a.prototype._read=function(t){var e=this._transformState;null!==e.writechunk&&e.writecb&&!e.transforming?(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform)):e.needTransform=!0}},{"./_stream_duplex":86,"core-util-is":15,inherits:31}],90:[function(t,e,i){(function(i){"use strict";function n(){}function r(t,e,i){this.chunk=t,this.encoding=e,this.callback=i,this.next=null}function a(e,i){R=R||t("./_stream_duplex"),e=e||{},this.objectMode=!!e.objectMode,i instanceof R&&(this.objectMode=this.objectMode||!!e.writableObjectMode);var n=e.highWaterMark,r=this.objectMode?16:16384;this.highWaterMark=n||0===n?n:r,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var a=e.decodeStrings===!1;this.decodeStrings=!a,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(t){d(i,t)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new x(this),this.corkedRequestsFree.next=new x(this)}function o(e){return R=R||t("./_stream_duplex"),this instanceof o||this instanceof R?(this._writableState=new a(e,this),this.writable=!0,e&&("function"==typeof e.write&&(this._write=e.write),"function"==typeof e.writev&&(this._writev=e.writev)),void M.call(this)):new o(e)}function s(t,e){var i=new Error("write after end");t.emit("error",i),k(e,i)}function l(t,e,i,n){var r=!0;if(!S.isBuffer(i)&&"string"!=typeof i&&null!==i&&void 0!==i&&!e.objectMode){var a=new TypeError("Invalid non-string/buffer chunk");t.emit("error",a),k(n,a),r=!1}return r}function h(t,e,i){return t.objectMode||t.decodeStrings===!1||"string"!=typeof e||(e=new S(e,i)),e}function f(t,e,i,n,a){i=h(e,i,n),S.isBuffer(i)&&(n="buffer");var o=e.objectMode?1:i.length;e.length+=o;var s=e.length<e.highWaterMark;if(s||(e.needDrain=!0),e.writing||e.corked){var l=e.lastBufferedRequest;e.lastBufferedRequest=new r(i,n,a),l?l.next=e.lastBufferedRequest:e.bufferedRequest=e.lastBufferedRequest,e.bufferedRequestCount+=1}else c(t,e,!1,o,i,n,a);return s}function c(t,e,i,n,r,a,o){e.writelen=n,e.writecb=o,e.writing=!0,e.sync=!0,i?t._writev(r,e.onwrite):t._write(r,a,e.onwrite),e.sync=!1}function u(t,e,i,n,r){--e.pendingcb,i?k(r,n):r(n),t._writableState.errorEmitted=!0,t.emit("error",n)}function p(t){t.writing=!1,t.writecb=null,t.length-=t.writelen,t.writelen=0}function d(t,e){var i=t._writableState,n=i.sync,r=i.writecb;if(p(i),e)u(t,i,n,e,r);else{var a=v(i);a||i.corked||i.bufferProcessing||!i.bufferedRequest||b(t,i),n?E(m,t,i,a,r):m(t,i,a,r)}}function m(t,e,i,n){i||g(t,e),e.pendingcb--,n(),_(t,e)}function g(t,e){0===e.length&&e.needDrain&&(e.needDrain=!1,t.emit("drain"))}function b(t,e){e.bufferProcessing=!0;var i=e.bufferedRequest;if(t._writev&&i&&i.next){var n=e.bufferedRequestCount,r=new Array(n),a=e.corkedRequestsFree;a.entry=i;for(var o=0;i;)r[o]=i,i=i.next,o+=1;c(t,e,!0,e.length,r,"",a.finish),e.pendingcb++,e.lastBufferedRequest=null,e.corkedRequestsFree=a.next,a.next=null}else{for(;i;){var s=i.chunk,l=i.encoding,h=i.callback,f=e.objectMode?1:s.length;if(c(t,e,!1,f,s,l,h),i=i.next,e.writing)break}null===i&&(e.lastBufferedRequest=null)}e.bufferedRequestCount=0,e.bufferedRequest=i,e.bufferProcessing=!1}function v(t){return t.ending&&0===t.length&&null===t.bufferedRequest&&!t.finished&&!t.writing}function w(t,e){e.prefinished||(e.prefinished=!0,t.emit("prefinish"))}function _(t,e){var i=v(e);return i&&(0===e.pendingcb?(w(t,e),e.finished=!0,t.emit("finish")):w(t,e)),i}function y(t,e,i){e.ending=!0,_(t,e),i&&(e.finished?k(i):t.once("finish",i)),e.ended=!0,t.writable=!1}function x(t){var e=this;this.next=null,this.entry=null,this.finish=function(i){var n=e.entry;for(e.entry=null;n;){var r=n.callback;t.pendingcb--,r(i),n=n.next}t.corkedRequestsFree?t.corkedRequestsFree.next=e:t.corkedRequestsFree=e}}e.exports=o;var k=t("process-nextick-args"),E=!i.browser&&["v0.10","v0.9."].indexOf(i.version.slice(0,5))>-1?setImmediate:k,S=t("buffer").Buffer;o.WritableState=a;var I=t("core-util-is");I.inherits=t("inherits");var M,A={deprecate:t("util-deprecate")};!function(){try{M=t("stream")}catch(e){}finally{M||(M=t("events").EventEmitter)}}();var S=t("buffer").Buffer;I.inherits(o,M);var R;a.prototype.getBuffer=function(){for(var t=this.bufferedRequest,e=[];t;)e.push(t),t=t.next;return e},function(){try{Object.defineProperty(a.prototype,"buffer",{get:A.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")})}catch(t){}}();var R;o.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},o.prototype.write=function(t,e,i){var r=this._writableState,a=!1;return"function"==typeof e&&(i=e,e=null),S.isBuffer(t)?e="buffer":e||(e=r.defaultEncoding),"function"!=typeof i&&(i=n),r.ended?s(this,i):l(this,r,t,i)&&(r.pendingcb++,a=f(this,r,t,e,i)),a},o.prototype.cork=function(){var t=this._writableState;t.corked++},o.prototype.uncork=function(){var t=this._writableState;t.corked&&(t.corked--,t.writing||t.corked||t.finished||t.bufferProcessing||!t.bufferedRequest||b(this,t))},o.prototype.setDefaultEncoding=function(t){if("string"==typeof t&&(t=t.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((t+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+t);this._writableState.defaultEncoding=t},o.prototype._write=function(t,e,i){i(new Error("not implemented"))},o.prototype._writev=null,o.prototype.end=function(t,e,i){var n=this._writableState;"function"==typeof t?(i=t,t=null,e=null):"function"==typeof e&&(i=e,e=null),null!==t&&void 0!==t&&this.write(t,e),n.corked&&(n.corked=1,this.uncork()),n.ending||n.finished||y(this,n,i)}}).call(this,t("_process"))},{"./_stream_duplex":86,_process:12,buffer:14,"core-util-is":15,events:17,inherits:31,"process-nextick-args":83,"util-deprecate":102}],91:[function(t,e,i){e.exports=t("./lib/_stream_passthrough.js")},{"./lib/_stream_passthrough.js":87}],92:[function(t,e,i){var n=function(){try{return t("stream")}catch(e){}}();i=e.exports=t("./lib/_stream_readable.js"),i.Stream=n||i,i.Readable=i,i.Writable=t("./lib/_stream_writable.js"),i.Duplex=t("./lib/_stream_duplex.js"),i.Transform=t("./lib/_stream_transform.js"),i.PassThrough=t("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":86,"./lib/_stream_passthrough.js":87,"./lib/_stream_readable.js":88,"./lib/_stream_transform.js":89,"./lib/_stream_writable.js":90}],93:[function(t,e,i){e.exports=t("./lib/_stream_transform.js")},{"./lib/_stream_transform.js":89}],94:[function(t,e,i){e.exports=t("./lib/_stream_writable.js")},{"./lib/_stream_writable.js":90}],95:[function(t,e,i){function n(){r.call(this)}e.exports=n;var r=t("events").EventEmitter,a=t("inherits");a(n,r),n.Readable=t("readable-stream/readable.js"),n.Writable=t("readable-stream/writable.js"),n.Duplex=t("readable-stream/duplex.js"),n.Transform=t("readable-stream/transform.js"),n.PassThrough=t("readable-stream/passthrough.js"),n.Stream=n,n.prototype.pipe=function(t,e){function i(e){t.writable&&!1===t.write(e)&&h.pause&&h.pause()}function n(){h.readable&&h.resume&&h.resume()}function a(){f||(f=!0,t.end())}function o(){f||(f=!0,"function"==typeof t.destroy&&t.destroy())}function s(t){if(l(),0===r.listenerCount(this,"error"))throw t}function l(){h.removeListener("data",i),t.removeListener("drain",n),h.removeListener("end",a),h.removeListener("close",o),h.removeListener("error",s),t.removeListener("error",s),h.removeListener("end",l),h.removeListener("close",l),t.removeListener("close",l)}var h=this;h.on("data",i),t.on("drain",n),t._isStdio||e&&e.end===!1||(h.on("end",a),h.on("close",o));var f=!1;return h.on("error",s),t.on("error",s),h.on("end",l),h.on("close",l),t.on("close",l),t.emit("pipe",h),t}},{events:17,inherits:31,"readable-stream/duplex.js":85,"readable-stream/passthrough.js":91,"readable-stream/readable.js":92,"readable-stream/transform.js":93,"readable-stream/writable.js":94}],96:[function(t,e,i){e.exports=t("stream-to").buffer},{"stream-to":97}],97:[function(t,e,i){(function(t){function e(t,e){function i(t){a.push(t)}function n(){e(null,a),r()}function r(){a=null,t.removeListener("data",i),t.removeListener("end",n),t.removeListener("error",e),t.removeListener("error",r),t.removeListener("close",r)}var a=[];return t.on("data",i),t.once("end",n),t.once("error",e),t.once("error",r),t.once("close",r),t}function n(i,n){return e(i,function(e,i){e||!i?n(e):n(null,t.concat(i))}),i}i.array=e,i.buffer=n}).call(this,t("buffer").Buffer)},{buffer:14}],98:[function(t,e,i){function n(t){if(t&&!l(t))throw new Error("Unknown encoding: "+t)}function r(t){return t.toString(this.encoding)}function a(t){this.charReceived=t.length%2,this.charLength=this.charReceived?2:0}function o(t){this.charReceived=t.length%3,this.charLength=this.charReceived?3:0}var s=t("buffer").Buffer,l=s.isEncoding||function(t){switch(t&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},h=i.StringDecoder=function(t){switch(this.encoding=(t||"utf8").toLowerCase().replace(/[-_]/,""),n(t),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=a;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=o;break;default:return void(this.write=r)}this.charBuffer=new s(6),this.charReceived=0,this.charLength=0};h.prototype.write=function(t){for(var e="";this.charLength;){var i=t.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:t.length;if(t.copy(this.charBuffer,this.charReceived,0,i),this.charReceived+=i,this.charReceived<this.charLength)return"";t=t.slice(i,t.length),e=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var n=e.charCodeAt(e.length-1);if(!(n>=55296&&56319>=n)){if(this.charReceived=this.charLength=0,0===t.length)return e;break}this.charLength+=this.surrogateSize,e=""}this.detectIncompleteChar(t);var r=t.length;this.charLength&&(t.copy(this.charBuffer,0,t.length-this.charReceived,r),r-=this.charReceived),e+=t.toString(this.encoding,0,r);var r=e.length-1,n=e.charCodeAt(r);if(n>=55296&&56319>=n){var a=this.surrogateSize;return this.charLength+=a,this.charReceived+=a,this.charBuffer.copy(this.charBuffer,a,0,a),t.copy(this.charBuffer,0,0,a),e.substring(0,r)}return e},h.prototype.detectIncompleteChar=function(t){for(var e=t.length>=3?3:t.length;e>0;e--){var i=t[t.length-e];if(1==e&&i>>5==6){this.charLength=2;break}if(2>=e&&i>>4==14){this.charLength=3;break}if(3>=e&&i>>3==30){this.charLength=4;break}}this.charReceived=e},h.prototype.end=function(t){var e="";if(t&&t.length&&(e=this.write(t)),this.charReceived){var i=this.charReceived,n=this.charBuffer,r=this.encoding;e+=n.slice(0,i).toString(r)}return e}},{buffer:14}],99:[function(t,e,i){!function(){function t(e,n){if(e=e?e:"",n=n||{},e instanceof t)return e;if(!(this instanceof t))return new t(e,n);var r=i(e);this._originalInput=e,this._r=r.r,this._g=r.g,this._b=r.b,this._a=r.a,this._roundA=F(100*this._a)/100,this._format=n.format||r.format,this._gradientType=n.gradientType,this._r<1&&(this._r=F(this._r)),this._g<1&&(this._g=F(this._g)),this._b<1&&(this._b=F(this._b)),this._ok=r.ok,this._tc_id=U++}function i(t){var e={r:0,g:0,b:0},i=1,r=!1,o=!1;return"string"==typeof t&&(t=B(t)),"object"==("undefined"==typeof t?"undefined":_typeof(t))&&(t.hasOwnProperty("r")&&t.hasOwnProperty("g")&&t.hasOwnProperty("b")?(e=n(t.r,t.g,t.b),r=!0,o="%"===String(t.r).substr(-1)?"prgb":"rgb"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("v")?(t.s=P(t.s),t.v=P(t.v),e=s(t.h,t.s,t.v),r=!0,o="hsv"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("l")&&(t.s=P(t.s),t.l=P(t.l),e=a(t.h,t.s,t.l),r=!0,o="hsl"),t.hasOwnProperty("a")&&(i=t.a)),i=E(i),{ok:r,format:t.format||o,r:j(255,H(e.r,0)),g:j(255,H(e.g,0)),b:j(255,H(e.b,0)),a:i}}function n(t,e,i){return{r:255*S(t,255),g:255*S(e,255),b:255*S(i,255)}}function r(t,e,i){t=S(t,255),e=S(e,255),i=S(i,255);var n,r,a=H(t,e,i),o=j(t,e,i),s=(a+o)/2;if(a==o)n=r=0;else{var l=a-o;switch(r=s>.5?l/(2-a-o):l/(a+o),a){case t:n=(e-i)/l+(i>e?6:0);break;case e:n=(i-t)/l+2;break;case i:n=(t-e)/l+4}n/=6}return{h:n,s:r,l:s}}function a(t,e,i){function n(t,e,i){return 0>i&&(i+=1),i>1&&(i-=1),1/6>i?t+6*(e-t)*i:.5>i?e:2/3>i?t+(e-t)*(2/3-i)*6:t}var r,a,o;if(t=S(t,360),e=S(e,100),i=S(i,100),0===e)r=a=o=i;else{var s=.5>i?i*(1+e):i+e-i*e,l=2*i-s;r=n(l,s,t+1/3),a=n(l,s,t),o=n(l,s,t-1/3)}return{r:255*r,g:255*a,b:255*o}}function o(t,e,i){t=S(t,255),e=S(e,255),i=S(i,255);var n,r,a=H(t,e,i),o=j(t,e,i),s=a,l=a-o;if(r=0===a?0:l/a,a==o)n=0;else{switch(a){case t:n=(e-i)/l+(i>e?6:0);break;case e:n=(i-t)/l+2;break;case i:n=(t-e)/l+4}n/=6}return{h:n,s:r,v:s}}function s(t,e,i){t=6*S(t,360),e=S(e,100),i=S(i,100);var n=N.floor(t),r=t-n,a=i*(1-e),o=i*(1-r*e),s=i*(1-(1-r)*e),l=n%6,h=[i,o,a,a,s,i][l],f=[s,i,i,o,a,a][l],c=[a,a,s,i,i,o][l];return{r:255*h,g:255*f,b:255*c}}function l(t,e,i,n){var r=[T(F(t).toString(16)),T(F(e).toString(16)),T(F(i).toString(16))];return n&&r[0].charAt(0)==r[0].charAt(1)&&r[1].charAt(0)==r[1].charAt(1)&&r[2].charAt(0)==r[2].charAt(1)?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function h(t,e,i,n){var r=[T(L(n)),T(F(t).toString(16)),T(F(e).toString(16)),T(F(i).toString(16))];return r.join("")}function f(e,i){i=0===i?0:i||10;var n=t(e).toHsl();return n.s-=i/100,n.s=I(n.s),t(n)}function c(e,i){i=0===i?0:i||10;var n=t(e).toHsl();return n.s+=i/100,n.s=I(n.s),t(n)}function u(e){return t(e).desaturate(100)}function p(e,i){i=0===i?0:i||10;var n=t(e).toHsl();return n.l+=i/100,n.l=I(n.l),t(n)}function d(e,i){i=0===i?0:i||10;var n=t(e).toRgb();return n.r=H(0,j(255,n.r-F(255*-(i/100)))),n.g=H(0,j(255,n.g-F(255*-(i/100)))),n.b=H(0,j(255,n.b-F(255*-(i/100)))),t(n)}function m(e,i){i=0===i?0:i||10;var n=t(e).toHsl();return n.l-=i/100,n.l=I(n.l),t(n)}function g(e,i){var n=t(e).toHsl(),r=(F(n.h)+i)%360;return n.h=0>r?360+r:r,t(n)}function b(e){var i=t(e).toHsl();return i.h=(i.h+180)%360,t(i)}function v(e){var i=t(e).toHsl(),n=i.h;return[t(e),t({h:(n+120)%360,s:i.s,l:i.l}),t({h:(n+240)%360,s:i.s,l:i.l})]}function w(e){var i=t(e).toHsl(),n=i.h;return[t(e),t({h:(n+90)%360,s:i.s,l:i.l}),t({h:(n+180)%360,s:i.s,l:i.l}),t({h:(n+270)%360,s:i.s,l:i.l})]}function _(e){var i=t(e).toHsl(),n=i.h;return[t(e),t({h:(n+72)%360,s:i.s,l:i.l}),t({h:(n+216)%360,s:i.s,l:i.l})]}function y(e,i,n){i=i||6,n=n||30;var r=t(e).toHsl(),a=360/n,o=[t(e)];for(r.h=(r.h-(a*i>>1)+720)%360;--i;)r.h=(r.h+a)%360,o.push(t(r));return o}function x(e,i){i=i||6;for(var n=t(e).toHsv(),r=n.h,a=n.s,o=n.v,s=[],l=1/i;i--;)s.push(t({h:r,s:a,v:o})),o=(o+l)%1;return s}function k(t){var e={};for(var i in t)t.hasOwnProperty(i)&&(e[t[i]]=i);return e}function E(t){return t=parseFloat(t),(isNaN(t)||0>t||t>1)&&(t=1),t}function S(t,e){A(t)&&(t="100%");var i=R(t);return t=j(e,H(0,parseFloat(t))),i&&(t=parseInt(t*e,10)/100),N.abs(t-e)<1e-6?1:t%e/parseFloat(e)}function I(t){return j(1,H(0,t))}function M(t){return parseInt(t,16)}function A(t){return"string"==typeof t&&-1!=t.indexOf(".")&&1===parseFloat(t)}function R(t){return"string"==typeof t&&-1!=t.indexOf("%")}function T(t){return 1==t.length?"0"+t:""+t}function P(t){return 1>=t&&(t=100*t+"%"),t}function L(t){return Math.round(255*parseFloat(t)).toString(16)}function C(t){return M(t)/255}function B(t){t=t.replace(O,"").replace(D,"").toLowerCase();var e=!1;if(G[t])t=G[t],e=!0;else if("transparent"==t)return{r:0,g:0,b:0,a:0,format:"name"};var i;return(i=Z.rgb.exec(t))?{r:i[1],g:i[2],b:i[3]}:(i=Z.rgba.exec(t))?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=Z.hsl.exec(t))?{h:i[1],s:i[2],l:i[3]}:(i=Z.hsla.exec(t))?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=Z.hsv.exec(t))?{h:i[1],s:i[2],v:i[3]}:(i=Z.hsva.exec(t))?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=Z.hex8.exec(t))?{a:C(i[1]),r:M(i[2]),g:M(i[3]),b:M(i[4]),format:e?"name":"hex8"}:(i=Z.hex6.exec(t))?{r:M(i[1]),g:M(i[2]),b:M(i[3]),format:e?"name":"hex"}:(i=Z.hex3.exec(t))?{r:M(i[1]+""+i[1]),g:M(i[2]+""+i[2]),b:M(i[3]+""+i[3]),format:e?"name":"hex"}:!1}function z(t){var e,i;return t=t||{level:"AA",size:"small"},e=(t.level||"AA").toUpperCase(),i=(t.size||"small").toLowerCase(),"AA"!==e&&"AAA"!==e&&(e="AA"),"small"!==i&&"large"!==i&&(i="small"),{level:e,size:i}}var O=/^\s+/,D=/\s+$/,U=0,N=Math,F=N.round,j=N.min,H=N.max,W=N.random;t.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput;
},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},getLuminance:function(){var t,e,i,n,r,a,o=this.toRgb();return t=o.r/255,e=o.g/255,i=o.b/255,n=.03928>=t?t/12.92:Math.pow((t+.055)/1.055,2.4),r=.03928>=e?e/12.92:Math.pow((e+.055)/1.055,2.4),a=.03928>=i?i/12.92:Math.pow((i+.055)/1.055,2.4),.2126*n+.7152*r+.0722*a},setAlpha:function(t){return this._a=E(t),this._roundA=F(100*this._a)/100,this},toHsv:function(){var t=o(this._r,this._g,this._b);return{h:360*t.h,s:t.s,v:t.v,a:this._a}},toHsvString:function(){var t=o(this._r,this._g,this._b),e=F(360*t.h),i=F(100*t.s),n=F(100*t.v);return 1==this._a?"hsv("+e+", "+i+"%, "+n+"%)":"hsva("+e+", "+i+"%, "+n+"%, "+this._roundA+")"},toHsl:function(){var t=r(this._r,this._g,this._b);return{h:360*t.h,s:t.s,l:t.l,a:this._a}},toHslString:function(){var t=r(this._r,this._g,this._b),e=F(360*t.h),i=F(100*t.s),n=F(100*t.l);return 1==this._a?"hsl("+e+", "+i+"%, "+n+"%)":"hsla("+e+", "+i+"%, "+n+"%, "+this._roundA+")"},toHex:function(t){return l(this._r,this._g,this._b,t)},toHexString:function(t){return"#"+this.toHex(t)},toHex8:function(){return h(this._r,this._g,this._b,this._a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:F(this._r),g:F(this._g),b:F(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+F(this._r)+", "+F(this._g)+", "+F(this._b)+")":"rgba("+F(this._r)+", "+F(this._g)+", "+F(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:F(100*S(this._r,255))+"%",g:F(100*S(this._g,255))+"%",b:F(100*S(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+F(100*S(this._r,255))+"%, "+F(100*S(this._g,255))+"%, "+F(100*S(this._b,255))+"%)":"rgba("+F(100*S(this._r,255))+"%, "+F(100*S(this._g,255))+"%, "+F(100*S(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:q[l(this._r,this._g,this._b,!0)]||!1},toFilter:function(e){var i="#"+h(this._r,this._g,this._b,this._a),n=i,r=this._gradientType?"GradientType = 1, ":"";if(e){var a=t(e);n=a.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+i+",endColorstr="+n+")"},toString:function(t){var e=!!t;t=t||this._format;var i=!1,n=this._a<1&&this._a>=0,r=!e&&n&&("hex"===t||"hex6"===t||"hex3"===t||"name"===t);return r?"name"===t&&0===this._a?this.toName():this.toRgbString():("rgb"===t&&(i=this.toRgbString()),"prgb"===t&&(i=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(i=this.toHexString()),"hex3"===t&&(i=this.toHexString(!0)),"hex8"===t&&(i=this.toHex8String()),"name"===t&&(i=this.toName()),"hsl"===t&&(i=this.toHslString()),"hsv"===t&&(i=this.toHsvString()),i||this.toHexString())},clone:function(){return t(this.toString())},_applyModification:function(t,e){var i=t.apply(null,[this].concat([].slice.call(e)));return this._r=i._r,this._g=i._g,this._b=i._b,this.setAlpha(i._a),this},lighten:function(){return this._applyModification(p,arguments)},brighten:function(){return this._applyModification(d,arguments)},darken:function(){return this._applyModification(m,arguments)},desaturate:function(){return this._applyModification(f,arguments)},saturate:function(){return this._applyModification(c,arguments)},greyscale:function(){return this._applyModification(u,arguments)},spin:function(){return this._applyModification(g,arguments)},_applyCombination:function(t,e){return t.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(y,arguments)},complement:function(){return this._applyCombination(b,arguments)},monochromatic:function(){return this._applyCombination(x,arguments)},splitcomplement:function(){return this._applyCombination(_,arguments)},triad:function(){return this._applyCombination(v,arguments)},tetrad:function(){return this._applyCombination(w,arguments)}},t.fromRatio=function(e,i){if("object"==("undefined"==typeof e?"undefined":_typeof(e))){var n={};for(var r in e)e.hasOwnProperty(r)&&("a"===r?n[r]=e[r]:n[r]=P(e[r]));e=n}return t(e,i)},t.equals=function(e,i){return e&&i?t(e).toRgbString()==t(i).toRgbString():!1},t.random=function(){return t.fromRatio({r:W(),g:W(),b:W()})},t.mix=function(e,i,n){n=0===n?0:n||50;var r,a=t(e).toRgb(),o=t(i).toRgb(),s=n/100,l=2*s-1,h=o.a-a.a;r=l*h==-1?l:(l+h)/(1+l*h),r=(r+1)/2;var f=1-r,c={r:o.r*r+a.r*f,g:o.g*r+a.g*f,b:o.b*r+a.b*f,a:o.a*s+a.a*(1-s)};return t(c)},t.readability=function(e,i){var n=t(e),r=t(i);return(Math.max(n.getLuminance(),r.getLuminance())+.05)/(Math.min(n.getLuminance(),r.getLuminance())+.05)},t.isReadable=function(e,i,n){var r,a,o=t.readability(e,i);switch(a=!1,r=z(n),r.level+r.size){case"AAsmall":case"AAAlarge":a=o>=4.5;break;case"AAlarge":a=o>=3;break;case"AAAsmall":a=o>=7}return a},t.mostReadable=function(e,i,n){var r,a,o,s,l=null,h=0;n=n||{},a=n.includeFallbackColors,o=n.level,s=n.size;for(var f=0;f<i.length;f++)r=t.readability(e,i[f]),r>h&&(h=r,l=t(i[f]));return t.isReadable(e,l,{level:o,size:s})||!a?l:(n.includeFallbackColors=!1,t.mostReadable(e,["#fff","#000"],n))};var G=t.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},q=t.hexNames=k(G),Z=function(){var t="[-\\+]?\\d+%?",e="[-\\+]?\\d*\\.\\d+%?",i="(?:"+e+")|(?:"+t+")",n="[\\s|\\(]+("+i+")[,|\\s]+("+i+")[,|\\s]+("+i+")\\s*\\)?",r="[\\s|\\(]+("+i+")[,|\\s]+("+i+")[,|\\s]+("+i+")[,|\\s]+("+i+")\\s*\\)?";return{rgb:new RegExp("rgb"+n),rgba:new RegExp("rgba"+r),hsl:new RegExp("hsl"+n),hsla:new RegExp("hsla"+r),hsv:new RegExp("hsv"+n),hsva:new RegExp("hsva"+r),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();"undefined"!=typeof e&&e.exports?e.exports=t:"function"==typeof define&&define.amd?define(function(){return t}):window.tinycolor=t}()},{}],100:[function(t,e,i){function n(t){return t.replace(/^\s*|\s*$/g,"")}i=e.exports=n,i.left=function(t){return t.replace(/^\s*/,"")},i.right=function(t){return t.replace(/\s*$/,"")}},{}],101:[function(t,e,i){"use strict";var n=t("ip-regex");e.exports=function(t){t=t||{};var e="(?:(?:[a-z]+:)?//)",i="(?:\\S+(?::\\S*)?@)?",r=n.v4().source,a="(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)",o="(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*",s="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))",l="(?::\\d{2,5})?",h='(?:[/?#][^\\s"]*)?',f=[e,i,"(?:localhost|"+r+"|"+a+o+s+")",l,h].join("");return t.exact?new RegExp("(?:^"+f+"$)","i"):new RegExp(f,"ig")}},{"ip-regex":32}],102:[function(t,e,i){(function(t){function i(t,e){function i(){if(!r){if(n("throwDeprecation"))throw new Error(e);n("traceDeprecation")?console.trace(e):console.warn(e),r=!0}return t.apply(this,arguments)}if(n("noDeprecation"))return t;var r=!1;return i}function n(e){try{if(!t.localStorage)return!1}catch(i){return!1}var n=t.localStorage[e];return null==n?!1:"true"===String(n).toLowerCase()}e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],103:[function(t,e,i){e.exports=function(t){return t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},{}],104:[function(t,e,i){(function(e,n){function r(t,e){var n={seen:[],stylize:o};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),m(e)?n.showHidden=e:e&&i._extend(n,e),y(n.showHidden)&&(n.showHidden=!1),y(n.depth)&&(n.depth=2),y(n.colors)&&(n.colors=!1),y(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=a),l(n,t,n.depth)}function a(t,e){var i=r.styles[e];return i?"["+r.colors[i][0]+"m"+t+"["+r.colors[i][1]+"m":t}function o(t,e){return t}function s(t){var e={};return t.forEach(function(t,i){e[t]=!0}),e}function l(t,e,n){if(t.customInspect&&e&&I(e.inspect)&&e.inspect!==i.inspect&&(!e.constructor||e.constructor.prototype!==e)){var r=e.inspect(n,t);return w(r)||(r=l(t,r,n)),r}var a=h(t,e);if(a)return a;var o=Object.keys(e),m=s(o);if(t.showHidden&&(o=Object.getOwnPropertyNames(e)),S(e)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return f(e);if(0===o.length){if(I(e)){var g=e.name?": "+e.name:"";return t.stylize("[Function"+g+"]","special")}if(x(e))return t.stylize(RegExp.prototype.toString.call(e),"regexp");if(E(e))return t.stylize(Date.prototype.toString.call(e),"date");if(S(e))return f(e)}var b="",v=!1,_=["{","}"];if(d(e)&&(v=!0,_=["[","]"]),I(e)){var y=e.name?": "+e.name:"";b=" [Function"+y+"]"}if(x(e)&&(b=" "+RegExp.prototype.toString.call(e)),E(e)&&(b=" "+Date.prototype.toUTCString.call(e)),S(e)&&(b=" "+f(e)),0===o.length&&(!v||0==e.length))return _[0]+b+_[1];if(0>n)return x(e)?t.stylize(RegExp.prototype.toString.call(e),"regexp"):t.stylize("[Object]","special");t.seen.push(e);var k;return k=v?c(t,e,n,m,o):o.map(function(i){return u(t,e,n,m,i,v)}),t.seen.pop(),p(k,b,_)}function h(t,e){if(y(e))return t.stylize("undefined","undefined");if(w(e)){var i="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(i,"string")}return v(e)?t.stylize(""+e,"number"):m(e)?t.stylize(""+e,"boolean"):g(e)?t.stylize("null","null"):void 0}function f(t){return"["+Error.prototype.toString.call(t)+"]"}function c(t,e,i,n,r){for(var a=[],o=0,s=e.length;s>o;++o)P(e,String(o))?a.push(u(t,e,i,n,String(o),!0)):a.push("");return r.forEach(function(r){r.match(/^\d+$/)||a.push(u(t,e,i,n,r,!0))}),a}function u(t,e,i,n,r,a){var o,s,h;if(h=Object.getOwnPropertyDescriptor(e,r)||{value:e[r]},h.get?s=h.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):h.set&&(s=t.stylize("[Setter]","special")),P(n,r)||(o="["+r+"]"),s||(t.seen.indexOf(h.value)<0?(s=g(i)?l(t,h.value,null):l(t,h.value,i-1),s.indexOf("\n")>-1&&(s=a?s.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+s.split("\n").map(function(t){return"   "+t}).join("\n"))):s=t.stylize("[Circular]","special")),y(o)){if(a&&r.match(/^\d+$/))return s;o=JSON.stringify(""+r),o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=t.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=t.stylize(o,"string"))}return o+": "+s}function p(t,e,i){var n=0,r=t.reduce(function(t,e){return n++,e.indexOf("\n")>=0&&n++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return r>60?i[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+i[1]:i[0]+e+" "+t.join(", ")+" "+i[1]}function d(t){return Array.isArray(t)}function m(t){return"boolean"==typeof t}function g(t){return null===t}function b(t){return null==t}function v(t){return"number"==typeof t}function w(t){return"string"==typeof t}function _(t){return"symbol"===("undefined"==typeof t?"undefined":_typeof(t))}function y(t){return void 0===t}function x(t){return k(t)&&"[object RegExp]"===A(t)}function k(t){return"object"===("undefined"==typeof t?"undefined":_typeof(t))&&null!==t}function E(t){return k(t)&&"[object Date]"===A(t)}function S(t){return k(t)&&("[object Error]"===A(t)||t instanceof Error)}function I(t){return"function"==typeof t}function M(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"===("undefined"==typeof t?"undefined":_typeof(t))||"undefined"==typeof t}function A(t){return Object.prototype.toString.call(t)}function R(t){return 10>t?"0"+t.toString(10):t.toString(10)}function T(){var t=new Date,e=[R(t.getHours()),R(t.getMinutes()),R(t.getSeconds())].join(":");return[t.getDate(),z[t.getMonth()],e].join(" ")}function P(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var L=/%[sdj%]/g;i.format=function(t){if(!w(t)){for(var e=[],i=0;i<arguments.length;i++)e.push(r(arguments[i]));return e.join(" ")}for(var i=1,n=arguments,a=n.length,o=String(t).replace(L,function(t){if("%%"===t)return"%";if(i>=a)return t;switch(t){case"%s":return String(n[i++]);case"%d":return Number(n[i++]);case"%j":try{return JSON.stringify(n[i++])}catch(e){return"[Circular]"}default:return t}}),s=n[i];a>i;s=n[++i])o+=g(s)||!k(s)?" "+s:" "+r(s);return o},i.deprecate=function(t,r){function a(){if(!o){if(e.throwDeprecation)throw new Error(r);e.traceDeprecation?console.trace(r):console.error(r),o=!0}return t.apply(this,arguments)}if(y(n.process))return function(){return i.deprecate(t,r).apply(this,arguments)};if(e.noDeprecation===!0)return t;var o=!1;return a};var C,B={};i.debuglog=function(t){if(y(C)&&(C=e.env.NODE_DEBUG||""),t=t.toUpperCase(),!B[t])if(new RegExp("\\b"+t+"\\b","i").test(C)){var n=e.pid;B[t]=function(){var e=i.format.apply(i,arguments);console.error("%s %d: %s",t,n,e)}}else B[t]=function(){};return B[t]},i.inspect=r,r.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},r.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},i.isArray=d,i.isBoolean=m,i.isNull=g,i.isNullOrUndefined=b,i.isNumber=v,i.isString=w,i.isSymbol=_,i.isUndefined=y,i.isRegExp=x,i.isObject=k,i.isDate=E,i.isError=S,i.isFunction=I,i.isPrimitive=M,i.isBuffer=t("./support/isBuffer");var z=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];i.log=function(){console.log("%s - %s",T(),i.format.apply(i,arguments))},i.inherits=t("inherits"),i._extend=function(t,e){if(!e||!k(e))return t;for(var i=Object.keys(e),n=i.length;n--;)t[i[n]]=e[i[n]];return t}}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":103,_process:12,inherits:31}],105:[function(t,e,i){"use strict";function n(t,e){for(var i=0;i<t.length;i++)e(t[i])}function r(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}function a(t,e,i){var n=t;return c(e)?(i=e,"string"==typeof t&&(n={uri:t})):n=p(e,{uri:t}),n.callback=i,n}function o(t,e,i){return e=a(t,e,i),s(e)}function s(t){function e(){4===h.readyState&&a()}function i(){var t=void 0;if(h.response?t=h.response:"text"!==h.responseType&&h.responseType||(t=h.responseText||h.responseXML),_)try{t=JSON.parse(t)}catch(e){}return t}function n(t){clearTimeout(d),t instanceof Error||(t=new Error(""+(t||"Unknown XMLHttpRequest Error"))),t.statusCode=0,s(t,l)}function a(){if(!p){var e;clearTimeout(d),e=t.useXDR&&void 0===h.status?200:1223===h.status?204:h.status;var n=l,r=null;0!==e?(n={body:i(),statusCode:e,method:g,headers:{},url:m,rawRequest:h},h.getAllResponseHeaders&&(n.headers=u(h.getAllResponseHeaders()))):r=new Error("Internal XMLHttpRequest Error"),s(r,n,n.body)}}var s=t.callback;if("undefined"==typeof s)throw new Error("callback argument missing");s=f(s);var l={body:void 0,headers:{},statusCode:0,method:g,url:m,rawRequest:h},h=t.xhr||null;h||(h=t.cors||t.useXDR?new o.XDomainRequest:new o.XMLHttpRequest);var c,p,d,m=h.url=t.uri||t.url,g=h.method=t.method||"GET",b=t.body||t.data||null,v=h.headers=t.headers||{},w=!!t.sync,_=!1;if("json"in t&&(_=!0,v.accept||v.Accept||(v.Accept="application/json"),"GET"!==g&&"HEAD"!==g&&(v["content-type"]||v["Content-Type"]||(v["Content-Type"]="application/json"),b=JSON.stringify(t.json))),h.onreadystatechange=e,h.onload=a,h.onerror=n,h.onprogress=function(){},h.ontimeout=n,h.open(g,m,!w,t.username,t.password),w||(h.withCredentials=!!t.withCredentials),!w&&t.timeout>0&&(d=setTimeout(function(){p=!0,h.abort("timeout");var t=new Error("XMLHttpRequest timeout");t.code="ETIMEDOUT",n(t)},t.timeout)),h.setRequestHeader)for(c in v)v.hasOwnProperty(c)&&h.setRequestHeader(c,v[c]);else if(t.headers&&!r(t.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in t&&(h.responseType=t.responseType),"beforeSend"in t&&"function"==typeof t.beforeSend&&t.beforeSend(h),h.send(b),h}function l(){}var h=t("global/window"),f=t("once"),c=t("is-function"),u=t("parse-headers"),p=t("xtend");e.exports=o,o.XMLHttpRequest=h.XMLHttpRequest||l,o.XDomainRequest="withCredentials"in new o.XMLHttpRequest?o.XMLHttpRequest:h.XDomainRequest,n(["get","put","post","patch","head","delete"],function(t){o["delete"===t?"del":t]=function(e,i,n){return i=a(e,i,n),i.method=t.toUpperCase(),s(i)}})},{"global/window":29,"is-function":34,once:43,"parse-headers":59,xtend:107}],106:[function(t,e,i){e.exports=function(){return"undefined"!=typeof window.DOMParser?function(t){var e=new window.DOMParser;return e.parseFromString(t,"application/xml")}:"undefined"!=typeof window.ActiveXObject&&new window.ActiveXObject("Microsoft.XMLDOM")?function(t){var e=new window.ActiveXObject("Microsoft.XMLDOM");return e.async="false",e.loadXML(t),e}:function(t){var e=document.createElement("div");return e.innerHTML=t,e}}()},{}],107:[function(t,e,i){function n(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e];for(var n in i)r.call(i,n)&&(t[n]=i[n])}return t}e.exports=n;var r=Object.prototype.hasOwnProperty},{}],108:[function(t,e,i){function n(t,e){this.size=this.size||t,this.smallerSize=this.smallerSize||e,a(this.size)}function r(t){var e={};return e.r=Math.floor(t/Math.pow(256,3)),e.g=Math.floor((t-e.r*Math.pow(256,3))/Math.pow(256,2)),e.b=Math.floor((t-e.r*Math.pow(256,3)-e.g*Math.pow(256,2))/Math.pow(256,1)),e.a=Math.floor((t-e.r*Math.pow(256,3)-e.g*Math.pow(256,2)-e.b*Math.pow(256,1))/Math.pow(256,0)),e}function a(t){for(var e=1;t>e;e++)s[e]=1;s[0]=1/Math.sqrt(2)}function o(t,e){for(var i=e,n=[],r=0;i>r;r++){n[r]=[];for(var a=0;i>a;a++){for(var o=0,l=0;i>l;l++)for(var h=0;i>h;h++)o+=Math.cos((2*l+1)/(2*i)*r*Math.PI)*Math.cos((2*h+1)/(2*i)*a*Math.PI)*t[l][h];o*=s[r]*s[a]/4,n[r][a]=o}}return n}n.prototype.size=32,n.prototype.smallerSize=8,n.prototype.distance=function(t,e){for(var i=0,n=0;n<t.length;n++)t[n]!=e[n]&&i++;return i/t.length},n.prototype.getHash=function(t){t=t.clone().resize(this.size,this.size),t.grayscale();for(var e=[],i=0;i<t.bitmap.width;i++){e[i]=[];for(var n=0;n<t.bitmap.height;n++)e[i][n]=r(t.getPixelColor(i,n)).b}for(var a=o(e,this.size),s=0,i=0;i<this.smallerSize;i++)for(var n=0;n<this.smallerSize;n++)s+=a[i][n];for(var l=s/(this.smallerSize*this.smallerSize),h="",i=0;i<this.smallerSize;i++)for(var n=0;n<this.smallerSize;n++)h+=a[i][n]>l?"1":"0";return h};var s=[];e.exports=n},{}],109:[function(t,e,i){function n(t,e,i,n,r,a,o){this.widthOriginal=Math.abs(parseInt(t)||0),this.heightOriginal=Math.abs(parseInt(e)||0),this.targetWidth=Math.abs(parseInt(i)||0),this.targetHeight=Math.abs(parseInt(n)||0),this.colorChannels=r?4:3,this.interpolationPass=!!a,this.resizeCallback="function"==typeof o?o:function(t){},this.targetWidthMultipliedByChannels=this.targetWidth*this.colorChannels,this.originalWidthMultipliedByChannels=this.widthOriginal*this.colorChannels,this.originalHeightMultipliedByChannels=this.heightOriginal*this.colorChannels,this.widthPassResultSize=this.targetWidthMultipliedByChannels*this.heightOriginal,this.finalResultSize=this.targetWidthMultipliedByChannels*this.targetHeight,this.initialize()}n.prototype.initialize=function(){if(!(this.widthOriginal>0&&this.heightOriginal>0&&this.targetWidth>0&&this.targetHeight>0))throw new Error("Invalid settings specified for the resizer.");this.configurePasses()},n.prototype.configurePasses=function(){this.widthOriginal==this.targetWidth?this.resizeWidth=this.bypassResizer:(this.ratioWeightWidthPass=this.widthOriginal/this.targetWidth,this.ratioWeightWidthPass<1&&this.interpolationPass?(this.initializeFirstPassBuffers(!0),this.resizeWidth=4==this.colorChannels?this.resizeWidthInterpolatedRGBA:this.resizeWidthInterpolatedRGB):(this.initializeFirstPassBuffers(!1),this.resizeWidth=4==this.colorChannels?this.resizeWidthRGBA:this.resizeWidthRGB)),this.heightOriginal==this.targetHeight?this.resizeHeight=this.bypassResizer:(this.ratioWeightHeightPass=this.heightOriginal/this.targetHeight,this.ratioWeightHeightPass<1&&this.interpolationPass?(this.initializeSecondPassBuffers(!0),this.resizeHeight=this.resizeHeightInterpolated):(this.initializeSecondPassBuffers(!1),this.resizeHeight=4==this.colorChannels?this.resizeHeightRGBA:this.resizeHeightRGB))},n.prototype.resizeWidthRGB=function(t){var e=this.ratioWeightWidthPass,i=1/e,n=0,r=0,a=0,o=0,s=0,l=0,h=0,f=this.originalWidthMultipliedByChannels-2,c=this.targetWidthMultipliedByChannels-2,u=this.outputWidthWorkBench,p=this.widthBuffer;do{for(s=0;s<this.originalHeightMultipliedByChannels;)u[s++]=0,u[s++]=0,u[s++]=0;n=e;do{if(r=1+a-o,!(n>=r)){for(s=0,l=a;s<this.originalHeightMultipliedByChannels;l+=f)u[s++]+=t[l++]*n,u[s++]+=t[l++]*n,u[s++]+=t[l]*n;o+=n;break}for(s=0,l=a;s<this.originalHeightMultipliedByChannels;l+=f)u[s++]+=t[l++]*r,u[s++]+=t[l++]*r,u[s++]+=t[l]*r;o=a+=3,n-=r}while(n>0&&a<this.originalWidthMultipliedByChannels);for(s=0,l=h;s<this.originalHeightMultipliedByChannels;l+=c)p[l++]=u[s++]*i,p[l++]=u[s++]*i,p[l]=u[s++]*i;h+=3}while(h<this.targetWidthMultipliedByChannels);return p},n.prototype.resizeWidthInterpolatedRGB=function(t){for(var e=this.ratioWeightWidthPass,i=0,n=0,r=0,a=0,o=0,s=this.widthBuffer,l=0;1/3>i;l+=3,i+=e)for(n=l,r=0;n<this.widthPassResultSize;r+=this.originalWidthMultipliedByChannels,n+=this.targetWidthMultipliedByChannels)s[n]=t[r],s[n+1]=t[r+1],s[n+2]=t[r+2];i-=1/3;for(var h=this.widthOriginal-1;h>i;l+=3,i+=e)for(o=i%1,a=1-o,n=l,r=3*Math.floor(i);n<this.widthPassResultSize;r+=this.originalWidthMultipliedByChannels,n+=this.targetWidthMultipliedByChannels)s[n]=t[r]*a+t[r+3]*o,s[n+1]=t[r+1]*a+t[r+4]*o,s[n+2]=t[r+2]*a+t[r+5]*o;for(h=this.originalWidthMultipliedByChannels-3;l<this.targetWidthMultipliedByChannels;l+=3)for(n=l,r=h;n<this.widthPassResultSize;r+=this.originalWidthMultipliedByChannels,n+=this.targetWidthMultipliedByChannels)s[n]=t[r],s[n+1]=t[r+1],s[n+2]=t[r+2];return s},n.prototype.resizeWidthRGBA=function(t){var e=this.ratioWeightWidthPass,i=1/e,n=0,r=0,a=0,o=0,s=0,l=0,h=0,f=this.originalWidthMultipliedByChannels-3,c=this.targetWidthMultipliedByChannels-3,u=this.outputWidthWorkBench,p=this.widthBuffer;do{for(s=0;s<this.originalHeightMultipliedByChannels;)u[s++]=0,u[s++]=0,u[s++]=0,u[s++]=0;n=e;do{if(r=1+a-o,!(n>=r)){for(s=0,l=a;s<this.originalHeightMultipliedByChannels;l+=f)u[s++]+=t[l++]*n,u[s++]+=t[l++]*n,u[s++]+=t[l++]*n,u[s++]+=t[l]*n;o+=n;break}for(s=0,l=a;s<this.originalHeightMultipliedByChannels;l+=f)u[s++]+=t[l++]*r,u[s++]+=t[l++]*r,u[s++]+=t[l++]*r,u[s++]+=t[l]*r;o=a+=4,n-=r}while(n>0&&a<this.originalWidthMultipliedByChannels);for(s=0,l=h;s<this.originalHeightMultipliedByChannels;l+=c)p[l++]=u[s++]*i,p[l++]=u[s++]*i,p[l++]=u[s++]*i,p[l]=u[s++]*i;h+=4}while(h<this.targetWidthMultipliedByChannels);return p},n.prototype.resizeWidthInterpolatedRGBA=function(t){for(var e=this.ratioWeightWidthPass,i=0,n=0,r=0,a=0,o=0,s=this.widthBuffer,l=0;1/3>i;l+=4,i+=e)for(n=l,r=0;n<this.widthPassResultSize;r+=this.originalWidthMultipliedByChannels,n+=this.targetWidthMultipliedByChannels)s[n]=t[r],s[n+1]=t[r+1],s[n+2]=t[r+2],s[n+3]=t[r+3];i-=1/3;for(var h=this.widthOriginal-1;h>i;l+=4,i+=e)for(o=i%1,a=1-o,n=l,r=4*Math.floor(i);n<this.widthPassResultSize;r+=this.originalWidthMultipliedByChannels,n+=this.targetWidthMultipliedByChannels)s[n]=t[r]*a+t[r+4]*o,s[n+1]=t[r+1]*a+t[r+5]*o,s[n+2]=t[r+2]*a+t[r+6]*o,s[n+3]=t[r+3]*a+t[r+7]*o;for(h=this.originalWidthMultipliedByChannels-4;l<this.targetWidthMultipliedByChannels;l+=4)for(n=l,r=h;n<this.widthPassResultSize;r+=this.originalWidthMultipliedByChannels,n+=this.targetWidthMultipliedByChannels)s[n]=t[r],s[n+1]=t[r+1],s[n+2]=t[r+2],s[n+3]=t[r+3];return s},n.prototype.resizeHeightRGB=function(t){var e=this.ratioWeightHeightPass,i=1/e,n=0,r=0,a=0,o=0,s=0,l=0,h=this.outputHeightWorkBench,f=this.heightBuffer;do{for(s=0;s<this.targetWidthMultipliedByChannels;)h[s++]=0,h[s++]=0,h[s++]=0;n=e;do{if(r=1+a-o,!(n>=r)){for(s=0,r=a;s<this.targetWidthMultipliedByChannels;)h[s++]+=t[r++]*n,h[s++]+=t[r++]*n,h[s++]+=t[r++]*n;o+=n;break}for(s=0;s<this.targetWidthMultipliedByChannels;)h[s++]+=t[a++]*r,h[s++]+=t[a++]*r,h[s++]+=t[a++]*r;o=a,n-=r}while(n>0&&a<this.widthPassResultSize);for(s=0;s<this.targetWidthMultipliedByChannels;)f[l++]=Math.round(h[s++]*i),f[l++]=Math.round(h[s++]*i),f[l++]=Math.round(h[s++]*i)}while(l<this.finalResultSize);return f},n.prototype.resizeHeightInterpolated=function(t){for(var e=this.ratioWeightHeightPass,i=0,n=0,r=0,a=0,o=0,s=0,l=0,h=this.heightBuffer;1/3>i;i+=e)for(r=0;r<this.targetWidthMultipliedByChannels;)h[n++]=Math.round(t[r++]);i-=1/3;for(var f=this.heightOriginal-1;f>i;i+=e)for(l=i%1,s=1-l,a=Math.floor(i)*this.targetWidthMultipliedByChannels,o=a+this.targetWidthMultipliedByChannels,r=0;r<this.targetWidthMultipliedByChannels;++r)h[n++]=Math.round(t[a++]*s+t[o++]*l);for(;n<this.finalResultSize;)for(r=0,a=f*this.targetWidthMultipliedByChannels;r<this.targetWidthMultipliedByChannels;++r)h[n++]=Math.round(t[a++]);return h},n.prototype.resizeHeightRGBA=function(t){var e=this.ratioWeightHeightPass,i=1/e,n=0,r=0,a=0,o=0,s=0,l=0,h=this.outputHeightWorkBench,f=this.heightBuffer;do{for(s=0;s<this.targetWidthMultipliedByChannels;)h[s++]=0,h[s++]=0,h[s++]=0,h[s++]=0;n=e;do{if(r=1+a-o,!(n>=r)){for(s=0,r=a;s<this.targetWidthMultipliedByChannels;)h[s++]+=t[r++]*n,h[s++]+=t[r++]*n,h[s++]+=t[r++]*n,h[s++]+=t[r++]*n;o+=n;break}for(s=0;s<this.targetWidthMultipliedByChannels;)h[s++]+=t[a++]*r,h[s++]+=t[a++]*r,h[s++]+=t[a++]*r,h[s++]+=t[a++]*r;o=a,n-=r}while(n>0&&a<this.widthPassResultSize);for(s=0;s<this.targetWidthMultipliedByChannels;)f[l++]=Math.round(h[s++]*i),f[l++]=Math.round(h[s++]*i),f[l++]=Math.round(h[s++]*i),f[l++]=Math.round(h[s++]*i)}while(l<this.finalResultSize);return f},n.prototype.resize=function(t){this.resizeCallback(this.resizeHeight(this.resizeWidth(t)))},n.prototype.bypassResizer=function(t){return t},n.prototype.initializeFirstPassBuffers=function(t){this.widthBuffer=this.generateFloatBuffer(this.widthPassResultSize),t||(this.outputWidthWorkBench=this.generateFloatBuffer(this.originalHeightMultipliedByChannels))},n.prototype.initializeSecondPassBuffers=function(t){this.heightBuffer=this.generateUint8Buffer(this.finalResultSize),t||(this.outputHeightWorkBench=this.generateFloatBuffer(this.targetWidthMultipliedByChannels))},n.prototype.generateFloatBuffer=function(t){try{return new Float32Array(t)}catch(e){return[]}},n.prototype.generateUint8Buffer=function(t){try{return new Uint8Array(t)}catch(e){return[]}},e.exports=n},{}],110:[function(t,e,i){(function(t){"use strict";e.exports={nearestNeighbor:function(t,e,i){for(var n=t.width,r=t.height,a=e.width,o=e.height,s=t.data,l=e.data,h=0;o>h;h++)for(var f=0;a>f;f++){var c=4*(h*a+f),u=Math.round(h*r/o),p=Math.round(f*n/a),d=4*(u*n+p);l[c++]=s[d++],l[c++]=s[d++],l[c++]=s[d++],l[c++]=s[d++]}},bilinearInterpolation:function(t,e,i){for(var n=t.width,r=t.height,a=e.width,o=e.height,s=t.data,l=e.data,h=function(t,e,i,n,r){return e===n?i:Math.round((t-e)*r+(n-t)*i)},f=function(t,e,i,r,a,o,f,c){var u=4*(f*n+r)+e,p=4*(f*n+a)+e,d=h(i,r,s[u],a,s[p]);if(c===f)l[t+e]=d;else{u=4*(c*n+r)+e,p=4*(c*n+a)+e;var m=h(i,r,s[u],a,s[p]);l[t+e]=h(o,f,d,c,m)}},c=0;o>c;c++)for(var u=0;a>u;u++){var p=4*(c*a+u),d=u*n/a,m=Math.floor(d),g=Math.min(Math.ceil(d),n-1),b=c*r/o,v=Math.floor(b),w=Math.min(Math.ceil(b),r-1);f(p,0,d,m,g,b,v,w),f(p,1,d,m,g,b,v,w),f(p,2,d,m,g,b,v,w),f(p,3,d,m,g,b,v,w)}},_interpolate2D:function(e,i,n,r){for(var a=e.data,o=i.data,s=e.width,l=e.height,h=i.width,f=i.height,c=Math.max(1,Math.floor(s/h)),u=h*c,p=Math.max(1,Math.floor(l/f)),d=f*p,m=new t(u*l*4),g=0;l>g;g++)for(var b=0;u>b;b++)for(var v=b*(s-1)/u,w=Math.floor(v),_=v-w,y=4*(g*s+w),x=4*(g*u+b),k=0;4>k;k++){var E=y+k,S=w>0?a[E-4]:2*a[E]-a[E+4],I=a[E],M=a[E+4],A=s-2>w?a[E+8]:2*a[E+4]-a[E];m[x+k]=r(S,I,M,A,_)}for(var R=new t(u*d*4),g=0;d>g;g++)for(var b=0;u>b;b++)for(var T=g*(l-1)/d,P=Math.floor(T),_=T-P,x=4*(P*u+b),L=4*(g*u+b),k=0;4>k;k++){var E=x+k,C=P>0?m[E-4*u]:2*m[E]-m[E+4*u],B=m[E],z=m[E+4*u],O=l-2>P?m[E+8*u]:2*m[E+4*u]-m[E];R[L+k]=r(C,B,z,O,_)}var D=c*p;if(D>1)for(var g=0;f>g;g++)for(var b=0;h>b;b++){for(var U=0,N=0,F=0,j=0,T=0;p>T;T++)for(var P=g*p+T,v=0;c>v;v++){var w=b*c+v,H=4*(P*u+w);U+=R[H],N+=R[H+1],F+=R[H+2],j+=R[H+3]}var W=4*(g*h+b);o[W]=Math.round(U/D),o[W+1]=Math.round(N/D),o[W+2]=Math.round(F/D),o[W+3]=Math.round(j/D)}else i.data=R},bicubicInterpolation:function(t,e,i){var n=function(t,e,i,n,r){var a=n-i-t+e,o=t-e-a,s=i-t,l=e;return Math.max(0,Math.min(255,a*(r*r*r)+o*(r*r)+s*r+l))};return this._interpolate2D(t,e,i,n)},hermiteInterpolation:function(t,e,i){var n=function(t,e,i,n,r){var a=e,o=.5*(i-t),s=t-2.5*e+2*i-.5*n,l=.5*(n-t)+1.5*(e-i);return Math.max(0,Math.min(255,Math.round(((l*r+s)*r+o)*r+a)))};return this._interpolate2D(t,e,i,n)},bezierInterpolation:function(t,e,i){var n=function(t,e,i,n,r){var a=e+(i-t)/4,o=i-(n-e)/4,s=1-r,l=e*s*s*s,h=3*a*s*s*r,f=3*o*s*r*r,c=i*r*r*r;return Math.max(0,Math.min(255,Math.round(l+h+f+c)))};return this._interpolate2D(t,e,i,n)}}}).call(this,t("buffer").Buffer)},{buffer:14}]},{},[1]),!self.Buffer&&!window.Buffer)throw new Error("Node's Buffer() not available in jimp-worker.js");if(!self.Jimp&&!window.Jimp)throw new Error("Could not load jimp.min.js in jimp-worker.js");Jimp.WebWorkerUtils={fetchImageDataFromUrl:function(t,e){var i=new XMLHttpRequest;i.open("GET",t,!0),i.responseType="arraybuffer",
i.onload=function(){i.status<400?e(this.response,null):e(null,"HTTP Status "+i.status+" for url "+t)},i.onerror=function(t){e(null,t)},i.send()},bufferFromArrayBuffer:function(t){for(var e=new Buffer(t.byteLength),i=new Uint8Array(t),n=0;n<e.length;++n)e[n]=i[n];return e},isArrayBuffer:function(t){return Object.prototype.toString.call(t).toLowerCase().indexOf("arraybuffer")>-1}},delete Jimp.read,Jimp.read=function(t,e){var i=Jimp.WebWorkerUtils;return new Promise(function(n,r){e=e||function(t,e){t?r(t):n(e)},"string"==typeof t?i.fetchImageDataFromUrl(t,function(n,r){n?i.isArrayBuffer(n)?new Jimp(i.bufferFromArrayBuffer(n),e):e(new Error("Unrecognized data received for "+t)):r&&e(r)}):i.isArrayBuffer(t)?new Jimp(i.bufferFromArrayBuffer(t),e):e(new Error("Jimp expects a single ArrayBuffer or image URL"))})};
},{"buffer":109}],12:[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
require("jimp/browser/lib/jimp.min");
var Utils = (function () {
    function Utils() {
    }
    Utils.loadImage = function (url, shape) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, Jimp.read(url)
                        .then(function (img) {
                        return img.contain(shape[0], shape[1]);
                    })
                        .then(function (img) {
                        var data = new Float32Array(img.bitmap.data).map(function (el) { return el / 255; });
                        if (shape[2] > 3)
                            return data;
                        var i = -1;
                        return data.filter(function (el) {
                            i++;
                            return (i > 0 && i % 4 !== 0);
                        });
                    })];
            });
        });
    };
    Utils.loadImages = function (urls, shape) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, Promise.all(urls.map(function (url) { return Utils.loadImage(url, shape); }))];
            });
        });
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map
},{"jimp/browser/lib/jimp.min":108}],7:[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./utils"));
//# sourceMappingURL=index.js.map
},{"./utils":12}],11:[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Layers = (function () {
    function Layers() {
    }
    Layers.activation = function (activation, options) {
        if (!!activation && Layers.activations.map(function (o) { return o.toUpperCase(); }).indexOf(activation.toUpperCase()) === -1)
            throw ("Unknown activation '" + activation + "'");
        var layer = {
            units: undefined,
            type: 'activation',
            activation: activation,
            options: { alpha: 0.3 }
        };
        layer.options = __assign({}, layer.options, options);
        return layer;
    };
    Layers.conv2D = function (fieldSize, options) {
        var layer = {
            units: fieldSize,
            type: 'conv2D',
            options: { outputDepth: 1, stride: 1, zeroPad: 0 }
        };
        layer.options = __assign({}, layer.options, options);
        return layer;
    };
    Layers.dense = function (units, options) {
        var layer = {
            units: units, type: 'dense',
            options: { activation: 'linear' }
        };
        layer.options = __assign({}, layer.options, options);
        layer.options.activation = (typeof (layer.options.activation) == 'string') ? Layers.activation(layer.options.activation) : layer.options.activation;
        return layer;
    };
    Layers.flatten = function () {
        var layer = { units: undefined, type: 'flatten' };
        return layer;
    };
    Layers.input = function (units) {
        var layer = { units: units, type: 'input' };
        if (!Array.isArray(layer.units))
            layer.units = [layer.units];
        return layer;
    };
    Layers.maxPooling2D = function (fieldSize, options) {
        var layer = {
            units: fieldSize,
            type: 'maxPooling2D',
            options: { stride: 1, zeroPad: 0 }
        };
        layer.options = __assign({}, layer.options, options);
        return layer;
    };
    Layers.output = function (units) {
        var layer = { units: units, type: 'output' };
        if (!Array.isArray(layer.units))
            layer.units = [layer.units];
        return layer;
    };
    Layers.reshape = function (outputShape) {
        var layer = {
            units: outputShape,
            type: 'reshape',
        };
        return layer;
    };
    Layers.types = ['activation', 'conv2D', 'dense', 'flatten', 'input', 'maxPooling2D', 'output', 'reshape'];
    Layers.activations = ['Linear', 'Softmax', 'ReLU', 'LeakyReLU', 'ELU', 'Tanh', 'Sigmoid'];
    return Layers;
}());
exports.Layers = Layers;
//# sourceMappingURL=layers.js.map
},{}],8:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layers_1 = require("./layers");
exports.Layer = layers_1.Layer;
exports.Layers = layers_1.Layers;
//# sourceMappingURL=index.js.map
},{"./layers":11}],2:[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
exports.Sequential = models_1.Sequential;
var layers_1 = require("./layers");
exports.Layer = layers_1.Layer;
exports.Layers = layers_1.Layers;
var losses_1 = require("./losses");
exports.Loss = losses_1.Loss;
exports.Losses = losses_1.Losses;
var optimizers_1 = require("./optimizers");
exports.Optimizer = optimizers_1.Optimizer;
exports.Optimizers = optimizers_1.Optimizers;
__export(require("./utils"));
//# sourceMappingURL=index.js.map
},{"./models":4,"./losses":5,"./optimizers":6,"./utils":7,"./layers":8}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:62914/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = () => {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,2])