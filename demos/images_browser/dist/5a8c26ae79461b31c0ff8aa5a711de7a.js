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
})({3:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var utils_1 = require("../../src/utils");
var model = new src_1.Sequential();
model.add(src_1.Layers.input([32, 32, 3]));
model.add(src_1.Layers.conv2D(5, { outputDepth: 8, stride: 1, zeroPad: 2 }));
model.add(src_1.Layers.activation('relu'));
model.add(src_1.Layers.maxPooling2D(2, { stride: 2, zeroPad: 0 }));
model.add(src_1.Layers.conv2D(5, { outputDepth: 16, stride: 1, zeroPad: 2 }));
model.add(src_1.Layers.activation('relu'));
model.add(src_1.Layers.maxPooling2D(2, { stride: 2, zeroPad: 0 }));
model.add(src_1.Layers.flatten());
model.add(src_1.Layers.output(2));
model.add(src_1.Layers.activation('softmax'));
var urls = { cats: [], dogs: [] };
var images = [];
var targets = [];
var samples = 500;
console.clear();
console.log("Loading " + samples + " samples each. Please wait...");
for (var i = 0; i < samples; i++) {
    urls.cats.push("train/cat." + i + ".jpg");
    targets.push([1, 0]);
}
for (var i = 0; i < samples; i++) {
    urls.dogs.push("train/dog." + i + ".jpg");
    targets.push([0, 1]);
}
console.log('Loading cats...');
utils_1.Utils.loadImages(urls.cats, [32, 32, 3])
    .then(function (imgs) {
    console.log('Cats OK. Loading dogs...');
    images = imgs;
    return utils_1.Utils.loadImages(urls.dogs, [32, 32, 3]);
})
    .then(function (imgs) {
    images = images.concat(imgs);
    console.log('Dogs OK. Now you can Reset and build model.');
});
var compiled = false;
var trained = false;
window["reset"] = function () {
    model.compile({
        optimizer: src_1.Optimizers.adam(),
        loss: src_1.Losses.softmaxCrossEntropy()
    });
    compiled = true;
    console.log('Model OK, Untrained. You can train now.');
};
window["predict"] = function () {
    if (!trained) {
        console.log('Please train first');
        return;
    }
    console.log('%c\nLoading a cat.', 'color: purple');
    utils_1.Utils.loadImage('train/cat.2000.jpg', [32, 32, 3])
        .then(function (img) {
        console.log('Predicting...');
        return model.predict({ input: img });
    })
        .then(function (res) {
        console.log('Result: ', res);
        console.log("The network thinks it is " + Math.round(res[0] * 100) + "% cat, " + Math.round(res[1] * 100) + "% dog.");
        console.log('%c\nLoading a dog.', 'color: green');
        utils_1.Utils.loadImage('train/dog.2000.jpg', [32, 32, 3])
            .then(function (img) {
            console.log('Predicting...');
            return model.predict({ input: img });
        })
            .then(function (res) {
            console.log('Result: ', res);
            console.log("The network thinks it is " + Math.round(res[0] * 100) + "% cat, " + Math.round(res[1] * 100) + "% dog.\n");
        });
    });
};
window["fit"] = function () {
    if (!compiled) {
        console.log('Please reset and build model first');
        return;
    }
    console.log('Training model, please wait...');
    model.fit({
        input: images,
        target: targets,
        epochs: 400,
        batchSize: 20,
        targetLoss: 0.01
    })
        .then(function () {
        trained = true;
        console.log('Training OK, you can train more or Predict now.');
    });
};
//# sourceMappingURL=img.js.map
},{"../../src":2,"../../src/utils":7}],0:[function(require,module,exports) {
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
},{}]},{},[0,3])