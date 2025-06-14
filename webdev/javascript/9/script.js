let user = {
  name: "Nosora",
  age: 20,

  [Symbol.toPrimitive](hint) {
    console.log(hint);
    return hint === "string" ? this.name : this.age;
  },
};

console.log(`${user}`);
console.log(+user);
console.log(user + 5);
