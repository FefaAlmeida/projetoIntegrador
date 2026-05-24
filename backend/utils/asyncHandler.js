// Envolve um handler async de Express e captura qualquer erro lançado
// dentro dele, passando pro errorMiddleware. Sem isso, todo controller
// precisaria de um try/catch só pra chamar `next(error)`.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
