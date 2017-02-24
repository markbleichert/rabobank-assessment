class Validator {
  constructor(data) {
    // array of objects
    this.data = data;
    // interface definition
    this.fields = [
      'reference',
      'accountNumber',
      'description',
      'startBalance',
      'endBalance',
      'mutation',
    ];
  }

  // check if object literal contains given property
  hasProperty(obj, key) {
    return Object.keys(obj).some(arrVal => key === arrVal);
  }

  // returns an array of properties that do not match interface
  checkProperties(obj) {
    return this.fields.filter((key, index) => !this.hasProperty(obj, key));
  }

  // returns an array duplicate values
  checkDuplicates(prop='reference') {
    const count = items =>
      items.reduce((a, b) => {
        return Object.assign(a, {[b[prop]]: (a[b[prop]] || 0) + 1})
      }, {});

    const duplicates = obj =>
      Object.keys(obj).filter((a) => obj[a] > 1);

    return duplicates(count(this.data));
  }

  // checks if start balance +/- mutation equals end balance
  // uses unary operators to convert strings to numbers
  checkBalance(item) {
    return Math.round((+item.startBalance + +item.mutation) * 100) /100 === +item.endBalance;
  }

  // creates a map with references and balance (true/false)
  // @todo: map does not work for balance with duplicate items!
  buildBalanceMap() {
    this.balanceMap = {};
    this.data.forEach((item) => {
      this.balanceMap[item.reference] = this.checkBalance(item);
    });
  }

  // creates a map with references and array with invalid props
  buildPropsMap() {
    this.propsMap = {};
    this.data.forEach((item) => {
      const props = this.checkProperties(item)

      if (props.length > 0) {
        this.propsMap[item.reference] = props;
      }
    });
  }

  // implementation that runs all validation
  run() {
    this.duplicates = this.checkDuplicates();
    this.buildBalanceMap();
    this.buildPropsMap();
  }

  isDuplicate(ref) {
    return this.duplicates.includes(ref);
  }

  isBalanced(ref) {
    return this.balanceMap[ref];
  }

  hasInvalidProps(ref) {
    return this.propsMap[ref] && this.propsMap[ref].length > 0;
  }

  getInvalidProps(ref) {
    return this.propsMap[ref];
  }
}

export default Validator;
