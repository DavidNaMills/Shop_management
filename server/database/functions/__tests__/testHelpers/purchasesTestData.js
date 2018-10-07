const moment = require('moment');

const partialPurchase1 = {
    unitPrice: 123232200,
    dateOfPurchase: moment(),
    invoiceNo: '45fds64ffdsad5afd4as5fds',
    quantity: 62,
    totalPrice: 4526
};

const partialPurchase2 = {
    unitPrice: 142200,
    dateOfPurchase: moment(),
    invoiceNo: '45fds64fd5ajkrfgfd4as5fds',
    quantity: 62,
    totalPrice: 45456
};

const partialPurchase3 = {
    unitPrice: 17200,
    dateOfPurchase: moment(),
    invoiceNo: '45fds64d4as5fds',
    quantity: 64,
    totalPrice: 45776
};

const partialPurchase4 = {
    unitPrice: 2200,
    dateOfPurchase: moment(),
    invoiceNo: '45fds64fd5afd4hgfdhfgdhgfdas5fds',
    quantity: 4,
    totalPrice: 4456
};

module.exports = {
    partialPurchase1,
    partialPurchase2,
    partialPurchase3,
    partialPurchase4
}