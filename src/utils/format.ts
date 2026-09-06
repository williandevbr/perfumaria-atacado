export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function calculateProfit(wholesale: number, retail: number): {
  marginReais: number;
  percentage: number;
} {
  const marginReais = Math.max(0, retail - wholesale);
  const percentage = wholesale > 0 ? Math.round((marginReais / wholesale) * 100) : 0;
  return { marginReais, percentage };
}
