export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export enum Campus {
  "Optimal Campus",
  "Familiar Campus",
  "Impressive Campus",
}

export function numberToGradeOrEmpty(n: number) {
  return n < 13 && n > 0 ? (n as Grade) : "";
}
