require('v8-profiler');
var child_process = require('child_process');

var debugPortIterator = 5283;

function startSocketioProxy(_id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/testAsyncReplRouterClient.js',
        [_id],
        {
            //execArgv: ['--debug']
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}

function startProxyRouter(_id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/testAsyncReplRouterProxy.js',
        [_id],
        {
            //execArgv: ['--debug']
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}


setTimeout(startProxyRouter("1"),500);

//setTimeout(startSocketioProxy("1"),5000);
setTimeout(startSocketioProxy("2"),6000);

/*
setTimeout(startSocketioProxy("3"),6000);
setTimeout(startSocketioProxy("4"),6000);
setTimeout(startSocketioProxy("5"),6000);
setTimeout(startSocketioProxy("6"),6000);
setTimeout(startSocketioProxy("7"),6000);
setTimeout(startSocketioProxy("8"),6000);
setTimeout(startSocketioProxy("9"),6000);
setTimeout(startSocketioProxy("10"),6000);
setTimeout(startSocketioProxy("11"),6000);
setTimeout(startSocketioProxy("12"),6000);
setTimeout(startSocketioProxy("13"),6000);
*/
