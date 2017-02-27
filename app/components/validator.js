class Validator {
  constructor(data) {
    this.error = null;
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
    return this.fields.filter(key => !this.hasProperty(obj, key));
  }

  countDuplicates(prop) {
    return this.data.reduce((a, b) => Object.assign(a, { [b[prop]]: (a[b[prop]] || 0) + 1 }), {});
  }

  // returns an array of 'unique' duplicate values
  checkDuplicates(prop = 'reference') {
    const duplicates = obj =>
      Object.keys(obj).filter(a => obj[a] > 1);

    const arr = this.countDuplicates(prop);

    return duplicates(arr);
  }

  // checks if start balance +/- mutation equals end balance
  // uses unary operators to convert strings to numbers
  checkBalance(item) {
    return Math.round((+item.startBalance + +item.mutation) * 100) / 100 === +item.endBalance;
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
      const props = this.checkProperties(item);

      if (props.length > 0) {
        this.propsMap[item.reference] = props;
      }
    });
  }

  // implementation that runs all validation
  run() {
    try {
      this.duplicates = this.checkDuplicates();
      this.buildBalanceMap();
      this.buildPropsMap();

      // reset error in case run method
      // is called more than once
      this.error = null;
    } catch (e) {
      this.error = e;
    }
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
