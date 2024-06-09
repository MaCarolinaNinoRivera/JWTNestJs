const Person = require('./06-person');

describe('Test for Person', () => {
  let person;
  beforeEach(() => {
    person = new Person('Nicolas', 45, 1.7);
  });
  test('Should return down', () => {
    // AAA
    // Arrange: preparar o alistar el escenario de pruebas / Given --beforeEach
    // Act: ejecutar o actuar el escenario / When
    // Assert: resolver las hipotesis / Then
    // Arrange
    person.weight = 45;
    // Act
    const imc = person.calcIMC();
    // Assert
    expect(imc).toBe('down');
  });
  test('Should return normal', () => {
    person.weight = 59;
    const imc = person.calcIMC();
    expect(imc).toBe('normal');
  });
  test('Should return overweight', () => {
    person.weight = 75;
    const imc = person.calcIMC();
    expect(imc).toBe('overweight');
  });
  test('Should return overweight level 1', () => {
    person.weight = 85;
    const imc = person.calcIMC();
    expect(imc).toBe('overweight level 1');
  });
  test('Should return overweight level 2', () => {
    person.weight = 95;
    const imc = person.calcIMC();
    expect(imc).toBe('overweight level 2');
  });
  test('Should return overweight level 3', () => {
    person.weight = 115;
    const imc = person.calcIMC();
    expect(imc).toBe('overweight level 3');
  });
  test('Should return not found', () => {
    person.weight = -5;
    person.height = 1.5;
    const imc = person.calcIMC();
    expect(imc).toBe('not found');
  });
});
