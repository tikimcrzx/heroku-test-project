export enum Sizes {
  BIG = 'grande',
  MEDIUM = 'mediano',
  SMALL = 'chico',
}

export function getAllSizes() {
  return [Sizes.BIG, Sizes.MEDIUM, Sizes.SMALL];
}
