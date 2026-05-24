// Log simples no console pra acompanhar o tráfego em dev.
export const simpleLogMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const user = req.usuario ? `[${req.usuario.email}]` : '[Anônimo]';
  console.log(`${timestamp} ${req.method} ${req.originalUrl} ${user}`);
  next();
};
