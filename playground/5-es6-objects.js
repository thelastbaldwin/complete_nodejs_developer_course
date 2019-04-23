const name = 'Steve';
const userAge = 34;
const user = {name, userAge, location: "Seattle"};

// console.log(user);

// Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

const {
    label,
    price,
    stock,
    salePrice
} = product;

console.log(label, price, stock, salePrice);