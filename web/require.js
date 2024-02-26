/* eslint-disable */
const require = (modname) => {
  if (typeof BigInt === 'undefined') {
    return;
  }
  const module = requireRaw(modname);
  if (module) {
    return module;
  } else {
    throw Error(`undefined module:'${modname}'`);
  }
};
const requireRaw = (modname) => {
  if (modname == './ananos-util.js') {
    return window.ananoscoin.ananosjs.AnanosUtil;
  }
  if (modname == './app/scripts/ananos-util.js') {
    return window.ananoscoin.ananosjs.AnanosUtil;
  }
  if (modname == './app/scripts/ananode-api.js') {
    return window.ananoscoin.ananosjs.AnanodeApi;
  }
  if (modname == './app/scripts/camo-util.js') {
    return window.ananoscoin.ananosjs.camoUtil;
  }
  if (modname == './app/scripts/deposit-util.js') {
    return window.ananoscoin.ananosjs.depositUtil;
  }
  if (modname == './app/scripts/withdraw-util.js') {
    return window.ananoscoin.ananosjs.withdrawUtil;
  }
  if (modname == './app/scripts/logging-util.js') {
    return window.ananoscoin.ananosjs.loggingUtil;
  }
  if (modname == '../../libraries/tweetnacl/nacl.js') {
    return window.nacl;
  }
  if (modname == '../../libraries/blake2b/blake2b.js') {
    return window.blakejs;
  }
  if (modname == './blake2b-util.js') {
    return window.blakejsUtil;
  }
  if (window.ananoscoin.ananosjs[modname]) {
    return window.ananoscoin.ananosjs[modname];
  }
  if (window.ananoscoin.other[modname]) {
    return window.ananoscoin.other[modname];
  }
  throw Error(`unknown module:'${modname}'`);
};
if (!window.ananoscoin) {
  window.ananoscoin = {};
}
if (!window.ananoscoin.ananosjs) {
  window.ananoscoin.ananosjs = {};
}
if (!window.ananoscoin.other) {
  window.ananoscoin.other = {};
}
window.ananoscoin.ananosjs.http = {};
window.ananoscoin.ananosjs.http.request = (
  requestOptions,
  requestWriterCallback
) => {
  const LOG_HTTP = false;
  const xmlhttp = new XMLHttpRequest();
  const url = 'https://' + requestOptions.hostname + requestOptions.path;
  xmlhttp.open(requestOptions.method, url, true);
  Object.keys(requestOptions.headers).forEach((headerName) => {
    if (headerName == 'Content-Length') {
      // skip unsafe header warning
    } else {
      const headerValue = requestOptions.headers[headerName];
      xmlhttp.setRequestHeader(headerName, headerValue);
    }
  });
  xmlhttp.timeout = requestOptions.timeout;

  const requestWriter = {};
  requestWriter.listeners = {};
  requestWriter.write = (body) => {
    if (LOG_HTTP) {
      console.log('https send', body);
    }
    xmlhttp.send(body);
  };
  requestWriter.end = () => {};
  requestWriter.listeners['end'] = () => {};
  requestWriter.listeners['data'] = () => {};
  requestWriter.listeners['error'] = () => {};
  requestWriter.on = (key, fn) => {
    requestWriter.listeners[key] = fn;
  };

  requestWriterCallback(requestWriter);

  const end = () => {
    const endFn = requestWriter.listeners['end'];
    endFn();
  };

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (LOG_HTTP) {
        console.log('https end', this.responseText);
      }
      if (this.status == 200) {
        const fn = requestWriter.listeners['data'];
        fn(this.responseText);
        end();
      } else {
        const fn = requestWriter.listeners['error'];
        const error = {};
        error.responseText = this.responseText;
        error.readyState = this.readyState;
        error.status = this.status;
        fn(error);
        end();
      }
    }
  };

  return requestWriter;
};
window.ananoscoin.ananosjs.https = {};
window.ananoscoin.ananosjs.https.request = (
  requestOptions,
  requestWriterCallback
) => {
  const LOG_HTTP = false;
  const xmlhttp = new XMLHttpRequest();
  const url = 'https://' + requestOptions.hostname + requestOptions.path;
  xmlhttp.open(requestOptions.method, url, true);
  Object.keys(requestOptions.headers).forEach((headerName) => {
    if (headerName == 'Content-Length') {
      // skip unsafe header warning
    } else {
      const headerValue = requestOptions.headers[headerName];
      xmlhttp.setRequestHeader(headerName, headerValue);
    }
  });
  xmlhttp.timeout = requestOptions.timeout;

  const requestWriter = {};
  requestWriter.listeners = {};
  requestWriter.write = (body) => {
    if (LOG_HTTP) {
      console.log('https send', body);
    }
    xmlhttp.send(body);
  };
  requestWriter.end = () => {};
  requestWriter.listeners['end'] = () => {};
  requestWriter.listeners['data'] = () => {};
  requestWriter.listeners['error'] = () => {};
  requestWriter.on = (key, fn) => {
    requestWriter.listeners[key] = fn;
  };

  requestWriterCallback(requestWriter);

  const end = () => {
    const endFn = requestWriter.listeners['end'];
    endFn();
  };

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (LOG_HTTP) {
        console.log('https end', this.responseText);
      }
      if (this.status == 200) {
        const fn = requestWriter.listeners['data'];
        fn(this.responseText);
        end();
      } else {
        const fn = requestWriter.listeners['error'];
        const error = {};
        error.responseText = this.responseText;
        error.readyState = this.readyState;
        error.status = this.status;
        fn(error);
        end();
      }
    }
  };

  return requestWriter;
};
