const LOCALE = "pt-BR";

export function formatCurrency(value, currency = "BRL") {
 if (value == null || Number.isNaN(value)) return "";
 return new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency,
 }).format(value);
}

export function formatNumber(value, options) {
 if (value == null || Number.isNaN(value)) return "";
 return new Intl.NumberFormat(LOCALE, options).format(value);
}

export function formatDate(value, options = { dateStyle: "short" }) {
 if (!value) return "";
 const date = value instanceof Date ? value : new Date(value);
 if (Number.isNaN(date.getTime())) return "";
 return new Intl.DateTimeFormat(LOCALE, options).format(date);
}

export function formatDateTime(value) {
 return formatDate(value, { dateStyle: "short", timeStyle: "short" });
}
