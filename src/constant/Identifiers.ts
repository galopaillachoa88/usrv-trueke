/**
 * Injection identifiers
 */

export type containerSymbol = {
  TestService: symbol;
};

const IDENTIFIERS: containerSymbol = {
  TestService: Symbol.for("TestService"),
};

export { IDENTIFIERS };
