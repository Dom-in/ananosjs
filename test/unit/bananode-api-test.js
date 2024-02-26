'use strict';

// libraries
const chai = require('chai');

// modules
const expect = chai.expect;

const testUtil = require('../util/test-util.js');

const getFakeHttps = (retval) => {
  const fakeHttps = {};
  fakeHttps.request = (options, response) => {
    const fakeReq = {};
    fakeReq.statusCode = 200;
    const onFns = {};
    fakeReq.on = (fnName, fn) => {
      onFns[fnName] = fn;
    };
    fakeReq.write = (body) => {
      const fn = onFns['data'];
      fn(retval);
    };
    fakeReq.end = () => {
      // console.log('onFns', onFns);
      const fn = onFns['end'];
      fn();
    };
    response(fakeReq);
    return fakeReq;
  };
  return fakeHttps;
};

const getSoftRateLimitedHttps = (retval) => {
  const fakeHttps = {};
  fakeHttps.request = (options, response) => {
    const fakeReq = {};
    fakeReq.statusCode = 200;
    const onFns = {};
    fakeReq.on = (fnName, fn) => {
      onFns[fnName] = fn;
    };
    fakeReq.write = (body) => {
      const fn = onFns['data'];
      fn(retval);
    };
    fakeReq.end = () => {
      // console.log('onFns', onFns);
      const fn = onFns['end'];
      fn();
    };
    fakeReq.headers = {};
    fakeReq.headers['x-ratelimit-remaining'] = 0;
    fakeReq.headers['x-ratelimit-reset'] = Math.floor(Date.now() / 1000);
    response(fakeReq);
    return fakeReq;
  };
  return fakeHttps;
};

const getRateLimitedHttps = (retval) => {
  const fakeHttps = {};
  fakeHttps.request = (options, response) => {
    const fakeReq = {};
    fakeReq.statusCode = 429;
    const onFns = {};
    fakeReq.on = (fnName, fn) => {
      onFns[fnName] = fn;
    };
    fakeReq.write = (body) => {
      const fn = onFns['data'];
      fn(retval);
    };
    fakeReq.end = () => {
      // console.log('onFns', onFns);
      const fn = onFns['end'];
      fn();
    };
    response(fakeReq);
    return fakeReq;
  };
  return fakeHttps;
};

const getErrorHttps = (retval) => {
  const errorHttps = {};
  errorHttps.request = (options, response) => {
    const fakeReq = {};
    fakeReq.statusCode = 200;
    const onFns = {};
    fakeReq.on = (fnName, fn) => {
      onFns[fnName] = fn;
    };
    fakeReq.write = (body) => {
      const fn = onFns['error'];
      try {
        fn(retval);
      } catch (error) {
        if (error.message == '{}') {
          return;
        }
        // console.trace(error);
      }
    };
    fakeReq.end = () => {
      // console.log('onFns', onFns);
      const fn = onFns['end'];
      fn();
    };
    response(fakeReq);
    return fakeReq;
  };
  return errorHttps;
};

const getFakeAnanodeApi = (retval) => {
  const ananosjs = testUtil.getAnanosjsWithRealApi();
  ananosjs.realAnanodeApi.setUrl('https://localhost');
  ananosjs.realAnanodeApi.setUrl('http://localhost');
  ananosjs.realAnanodeApi.setModuleRef(getFakeHttps(retval));
  ananosjs.realAnanodeApi.setLogRequestErrors(true);
  return ananosjs.realAnanodeApi;
};

const getErrorAnanodeApi = (retval) => {
  const ananosjs = testUtil.getAnanosjsWithRealApi();
  ananosjs.realAnanodeApi.setUrl('http://localhost');
  ananosjs.realAnanodeApi.setModuleRef(getErrorHttps(retval));
  ananosjs.realAnanodeApi.setLogRequestErrors(false);
  return ananosjs.realAnanodeApi;
};

const getRateLimitedAnanodeApi = (retval) => {
  const ananosjs = testUtil.getAnanosjsWithRealApi();
  ananosjs.realAnanodeApi.setUrl('http://localhost');
  ananosjs.realAnanodeApi.setModuleRef(getRateLimitedHttps(retval));
  ananosjs.realAnanodeApi.setLogRequestErrors(false);
  return ananosjs.realAnanodeApi;
};

const getSoftRateLimitedAnanodeApi = (retval) => {
  const ananosjs = testUtil.getAnanosjsWithRealApi();
  ananosjs.realAnanodeApi.setUrl('http://localhost');
  ananosjs.realAnanodeApi.setModuleRef(getSoftRateLimitedHttps(retval));
  ananosjs.realAnanodeApi.setLogRequestErrors(false);
  return ananosjs.realAnanodeApi;
};

const callRateLimited = async (retval, fn, arg1, arg2, arg3, arg4) => {
  if (retval === undefined) {
    retval = '{}';
  }
  const api = getRateLimitedAnanodeApi(retval);
  // console.log('started api call', fn, arg1, arg2);
  try {
    const retval = await api[fn](arg1, arg2, arg3, arg4);
    // console.log('success api call', fn, arg1, arg2);
    return retval;
  } catch (error) {
    const errorJson = JSON.parse(error.message);
    if (errorJson.statusCode == 429) {
      return;
    }
    console.trace('callRateLimited', error.message);
  }
};

const callFake = async (retval, fn, arg1, arg2, arg3, arg4) => {
  if (retval === undefined) {
    retval = '{}';
  }
  const api = getFakeAnanodeApi(retval);
  // console.log('started api call', fn, arg1, arg2);
  try {
    const retval = await api[fn](arg1, arg2, arg3, arg4);
    // console.log('success api call', fn, arg1, arg2);
    return retval;
  } catch (error) {
    console.trace(error);
  }
};

const callRequestError = async (retval, fn, arg1, arg2, arg3, arg4) => {
  if (retval === undefined) {
    retval = '{}';
  }
  const api = getErrorAnanodeApi(retval);
  // console.log('started api call', fn, arg1, arg2);
  try {
    const retval = await api[fn](arg1, arg2, arg3, arg4);
    // console.log('success api call', fn, arg1, arg2);
    return retval;
  } catch (error) {
    // console.log('callRequestError', error);
    if (error.message == '{}') {
      return;
    }
    if (error.message == retval) {
      return;
    }
    console.trace('callRequestError', error.message);
  }
};

const callResponseError = async (retval, fn, arg1, arg2, arg3, arg4) => {
  if (retval === undefined) {
    retval = '<html/>';
  }
  const api = getFakeAnanodeApi(retval);
  // console.log('started api call', fn, arg1, arg2);
  try {
    const retval = await api[fn](arg1, arg2, arg3, arg4);
    // console.log('success api call', fn, arg1, arg2);
    return retval;
  } catch (error) {
    if (error.message == 'Unexpected token < in JSON at position 0') {
      return;
    }
    if (error.message == `Unexpected token '<', "<html/>" is not valid JSON`) {
      return;
    }
    if (error.message == '{}') {
      return;
    }
    if (error.message == 'fake error') {
      return;
    }
    if (error.message == '{"fake":"error"}') {
      return;
    }
    console.trace(error);
  }
  throw Error(`expected '${retval}' to throw error, but it didn't`);
};

const call = async (retval, fn, arg1, arg2, arg3, arg4) => {
  await callFake(retval.fake, fn, arg1, arg2, arg3, arg4);
  await callRateLimited(retval.fake, fn, arg1, arg2, arg3, arg4);
  await callRequestError(retval.fake, fn, arg1, arg2, arg3, arg4);
  await callResponseError(retval.error, fn, arg1, arg2, arg3, arg4);
};

describe('ananosde-api', () => {
  it('setUrl', async () => {
    await call({}, 'setUrl', '');
  });
  it('setUrl', async () => {
    await call({}, 'setUrl', undefined);
  });
  it('getModuleRef', async () => {
    await call({}, 'getModuleRef', '');
  });
  describe('setAuth', () => {
    it('setAuth blank', async () => {
      await call({}, 'setAuth', '');
    });
    it('setAuth fake', async () => {
      await call({}, 'setAuth', 'fakeAuth');
    });
  });
  it('getBlockCount', async () => {
    await call({}, 'getBlockCount');
  });
  it('getFrontiers', async () => {
    await call({}, 'getFrontiers', '', -1);
  });
  it('getBlockAccount', async () => {
    await call({}, 'getBlockAccount', '');
  });
  describe('getAccountsPending', () => {
    it('getAccountsPending', async () => {
      await call({}, 'getAccountsPending', '', -1, '');
    });
    it('getAccountsPending', async () => {
      await call({}, 'getAccountsPending', '', -1, true);
    });
    it('getAccountsPending', async () => {
      await call({}, 'getAccountsPending', '', -1);
    });
  });
  it('getGeneratedWork', async () => {
    await call({}, 'getGeneratedWork', '');
  });
  describe('process', () => {
    const fakeReq = '{"hash":"fake hash"}';
    it('process', async () => {
      await call({fake: fakeReq}, 'process', '', '');
    });
    it('process', async () => {
      await call(
          {fake: fakeReq, error: '{"error":"fake error"}'},
          'process',
          '',
          '',
      );
    });
    it('process', async () => {
      await call(
          {fake: fakeReq, error: '{"fake":"error"}'},
          'process',
          '',
          '',
      );
    });
    it('process', async () => {
      await call({fake: fakeReq}, 'process', {work: true}, '');
    });
  });
  describe('getBlocks', () => {
    it('getBlocks', async () => {
      await call({}, 'getBlocks', '', '');
    });
    it('getBlocks', async () => {
      await call({}, 'getBlocks', '');
    });
  });
  describe('getAccountInfo', () => {
    it('getAccountInfo', async () => {
      await call({}, 'getAccountInfo', '');
    });
    it('getAccountInfo', async () => {
      await call({}, 'getAccountInfo', '', '');
    });
    it('getAccountInfo', async () => {
      await call({}, 'getAccountInfo', '', true);
    });
  });
  describe('getAccountHistory', () => {
    it('getAccountHistory', async () => {
      await call({}, 'getAccountHistory', '', -1, '', true);
    });
    it('getAccountHistory', async () => {
      await call({}, 'getAccountHistory', '', -1);
    });
  });

  describe('getPrevious', () => {
    it('getPrevious', async () => {
      await call({}, 'getPrevious', '');
    });
    it('getPrevious', async () => {
      await call({fake: '{"frontiers":""}'}, 'getPrevious', '');
    });
    it('getPrevious', async () => {
      await call({fake: '{"frontiers":{"":""}}'}, 'getPrevious', '');
    });
  });
  it('getAccountRepresentative', async () => {
    await call({}, 'getAccountRepresentative', '');
  });
  describe('getAccountBalanceRaw', () => {
    it('getAccountBalanceRaw', async () => {
      await call({}, 'getAccountBalanceRaw', '');
    });
    it('getAccountBalanceRaw', async () => {
      const fakeResp = {};
      fakeResp.balances = {};
      fakeResp.balances[''] = '';
      await call(
          {fake: JSON.stringify(fakeResp)},
          'getAccountBalanceRaw',
          '',
      );
    });
  });
  describe('getAccountsBalances', () => {
    it('getAccountsBalances', async () => {
      await call({}, 'getAccountsBalances', ['']);
    });
    it('getAccountsBalances', async () => {
      const fakeResp = {};
      fakeResp.balances = {};
      fakeResp.balances[''] = '';
      await call({fake: JSON.stringify(fakeResp)}, 'getAccountsBalances', [
        '',
      ]);
    });
  });

  describe('delay', () => {
    it('delay undefined', async () => {
      const ananosjs = testUtil.getAnanosjsWithRealApi();
      ananosjs.realAnanodeApi.delay(undefined);
    });
    it('delay undefined', async () => {
      const ananosjs = testUtil.getAnanosjsWithRealApi();
      ananosjs.realAnanodeApi.delay(Infinity);
    });
  });
  describe('setUseRateLimit', () => {
    it('setUseRateLimit', async () => {
      const retval = {count: '1000', unchecked: '10'};
      const ananosjs = getSoftRateLimitedAnanodeApi(JSON.stringify(retval));
      ananosjs.setUseRateLimit(true);
      const expected = retval;
      const actual = await ananosjs.getBlockCount();
      // console.log('expected', expected);
      // console.log('actual', actual);
      expect(expected).to.deep.equal(actual);
    });
    it('setUseRateLimit no headers', async () => {
      const retval = {count: '1000', unchecked: '10'};
      const ananosjs = getFakeAnanodeApi(JSON.stringify(retval));
      ananosjs.setUseRateLimit(true);
      const expected = retval;
      const actual = await ananosjs.getBlockCount();
      // console.log('expected', expected);
      // console.log('actual', actual);
      expect(expected).to.deep.equal(actual);
    });
    it('setUseRateLimit index', async () => {
      const ananosjs = testUtil.getAnanosjsWithRealApi();
      ananosjs.setUseRateLimit(true);
    });
  });
  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
