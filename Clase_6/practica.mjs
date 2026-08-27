function x(cb) {
    const n = 1;
    cb(n);
}

x((n) => {
    console.log("Se ejecuto el CB con el valor pasado por x :" + n);
});