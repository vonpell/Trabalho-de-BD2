export default class TransactionManager {
  constructor() {
    this.isCommit = false;
  }

  commit(newValue) {
    this.isCommit = newValue === true;
    return this.isCommit;
  }
}
