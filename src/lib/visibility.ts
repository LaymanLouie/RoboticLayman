export interface Hideable {
  hidden?: boolean;
}

export const visible = <T extends Hideable>(items: readonly T[]): T[] =>
  items.filter((item) => !item.hidden);
