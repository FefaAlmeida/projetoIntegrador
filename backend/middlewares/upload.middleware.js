import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastas de destino dentro de backend/uploads/
const uploadPathImagens = path.join(__dirname, '..', 'uploads', 'imagens');
const uploadPathArquivos = path.join(__dirname, '..', 'uploads', 'arquivos');

for (const dir of [uploadPathImagens, uploadPathArquivos]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// timestamp + nome saneado pra evitar colisão e caracteres inválidos.
const generateUniqueName = (originalName) => {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, '_');
  return `${Date.now()}-${base}${ext}`;
};

const buildStorage = (destDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      cb(null, destDir);
    },
    filename: (req, file, cb) => cb(null, generateUniqueName(file.originalname)),
  });

const imageFileFilter = (req, file, cb) => {
  const allowed = process.env.ALLOWED_FILE_TYPES
    ? process.env.ALLOWED_FILE_TYPES.split(',').map((t) => t.trim())
    : ['image/jpeg', 'image/png', 'image/gif'];

  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error(`Tipo de arquivo não permitido. Tipos aceitos: ${allowed.join(', ')}`), false);
};

const maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB

export const uploadImagens = multer({
  storage: buildStorage(uploadPathImagens),
  limits: { fileSize: maxFileSize },
  fileFilter: imageFileFilter,
});

export const uploadArquivos = multer({
  storage: buildStorage(uploadPathArquivos),
  limits: { fileSize: maxFileSize * 2 },
});

// Transforma erros do multer em resposta JSON consistente.
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: `Arquivo muito grande. Máximo: ${maxFileSize / 1024 / 1024}MB`,
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }

  if (error?.message?.includes('Tipo de arquivo não permitido')) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next(error);
};

// Apaga arquivo do disco. Usado quando o produto é deletado ou tem imagem trocada.
export const removerArquivoAntigo = async (filename, type = 'imagem') => {
  if (!filename) return false;
  const filePath = path.join(type === 'imagem' ? uploadPathImagens : uploadPathArquivos, filename);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (err) {
    console.error('Erro ao remover arquivo:', err);
  }
  return false;
};
