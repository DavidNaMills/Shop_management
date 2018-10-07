const moment = require('moment');

const inven1={
    productType: "food",
    name: "hamburgers",
    description: "flame grilled",
    costPrice: 25.89,
    retailPrice: 100.89,
    quantity: 10,
    supplierName: "burger king",
    supplierPhone: "123456789"
};

const inven2={
    productType: "drink",
    name: "beer",
    costPrice: 14,
    retailPrice: 140,
    quantity: 0,
    supplierName: "harbin",
    supplierPhone: "9999999999999"
};

const inven3={
    productType: "food",
    name: "baked potatoes",
    description: "with cheese and beans",
    costPrice: 56,
    retailPrice: 156,
    quantity: 10,
    supplierName: "Zax",
    supplierPhone: "2233445566778899"
};


const invenFail={
    productType: "food",
    name: "baked potatoes",
};

module.exports ={
    inven1,
    inven2,
    inven3,
    invenFail
}