if (process.env.NODE_ENV === 'production'){
    console.log('PRODUCTION DB');
    module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'test'){
    console.log('TEST DB');
    module.exports = require('./testing');
} else {
    console.log('DEVELOPMENT DB');
    module.exports = require('./dev');
}