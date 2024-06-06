export function getRandomString(): string {
  return Math.random().toString(32).slice(2);
}

/**
 * 生成id
 */
export function idCreator(prefix?: string): string {
  prefix = prefix || 'el'
  return `${prefix}-${getRandomString()}`;
}