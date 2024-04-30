import { sayHello } from "../helloWorld";

describe('sayHello', () => {
  test('should return "Hello, world!"', () => {
    expect(sayHello()).toBe('Hello, world!');
  });

  test('should log "Hello, world!"', () => {
    const spy = jest.spyOn(console, 'log');
    sayHello();
    expect(spy).toHaveBeenCalledWith('Hello, world!');
  });
});