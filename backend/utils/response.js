// Padroniza o formato JSON de respostas de sucesso.
// Toda resposta da API tem a forma { success, message, data }.

export const ok = (res, data, message = 'OK') =>
  res.status(200).json({ success: true, message, data });

export const created = (res, data, message = 'Criado com sucesso') =>
  res.status(201).json({ success: true, message, data });

export const paginated = (res, data, pagination, message = 'OK') =>
  res.status(200).json({ success: true, message, data, pagination });
