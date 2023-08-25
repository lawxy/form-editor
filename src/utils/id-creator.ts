export function getRandomString(): string {
  return Math.random().toString(32).slice(2);
}

/**
 * 生成id
 */
export function idCreator(): string {
  return `bst${getRandomString()}`;
}