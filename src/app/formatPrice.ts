// Adds a blank space between every thousand. Example, 1 000 instead of 1000.
export function formatPrice(price: number): string {
  return price.toLocaleString('sv-SE');
}
