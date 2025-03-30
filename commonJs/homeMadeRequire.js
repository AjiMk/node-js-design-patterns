
const originalRequire = require;
const fs = originalRequire("fs");

/**
 * Loading the module
 * 
 */
function loadModule(fileName, module, require) {
    const wrapedSrc = `(function (module, exports, require) {
        ${fs.readFileSync(fileName, "utf-8")}
    })(module, module.exports, require)`;

    eval(wrapedSrc);
}

/**
 * The function will return exports
 * 
 */
require = function require (moduleName) {
    const id = require.resolve(moduleName)

    if( require.cache[id] ) {
        return require.cache[id].exports;
    }

    // module metadata
    const module = {
        exports: {},
        id
    }

    // update cache
    require.cache[id] = module

    // load the module
    loadModule(moduleName, module, require)

    return module.exports;
}

require.cache = {}
require.resolve = (moduleName) => {}
  
require(process.argv[2])