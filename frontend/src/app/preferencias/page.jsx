'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PreferenciasPage() {
  const router = useRouter();

  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [salvandoDados, setSalvandoDados] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [salvandoSenha, setSalvandoSenha] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem('@luminar:user');
    const rawToken = localStorage.getItem('@luminar:token');
    if (!rawUser || !rawToken) {
      toast.error('Faça login para acessar suas preferências');
      router.push('/login');
      return;
    }
    try {
      const u = JSON.parse(rawUser);
      setUsuario(u);
      setToken(rawToken);
      setNome(u.nome || '');
      setEmail(u.email || '');
    } catch {
      router.push('/login');
      return;
    }
    setCarregandoInicial(false);
  }, [router]);

  const salvarDados = async (e) => {
    e.preventDefault();
    const nomeTrim = nome.trim();
    const emailTrim = email.trim();

    if (nomeTrim.length < 2) return toast.error('O nome deve ter pelo menos 2 caracteres');
    if (!EMAIL_REGEX.test(emailTrim)) return toast.error('Formato de e-mail inválido');

    if (nomeTrim === usuario.nome && emailTrim.toLowerCase() === usuario.email) {
      return toast('Nada para salvar', { icon: 'ℹ️' });
    }

    setSalvandoDados(true);
    const loadingId = toast.loading('Salvando alterações...');

    try {
      const resposta = await fetch('http://localhost:3001/api/auth/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome: nomeTrim, email: emailTrim }),
      });

      const ct = resposta.headers.get('content-type') || '';
      const resultado = ct.includes('application/json') ? await resposta.json() : {};

      if (!resposta.ok) throw new Error(resultado.mensagem || 'Falha ao atualizar perfil');

      const atualizado = { ...usuario, ...resultado.dados };
      localStorage.setItem('@luminar:user', JSON.stringify(atualizado));
      window.dispatchEvent(new Event('auth-changed'));
      setUsuario(atualizado);

      toast.success('Perfil atualizado!', { id: loadingId });
    } catch (err) {
      const msg = err.message.includes('Failed to fetch')
        ? 'Não foi possível conectar ao servidor.'
        : err.message;
      toast.error(msg, { id: loadingId });
    } finally {
      setSalvandoDados(false);
    }
  };

  const salvarSenha = async (e) => {
    e.preventDefault();

    if (!senhaAtual) return toast.error('Informe sua senha atual');
    if (novaSenha.length < 6) return toast.error('A nova senha deve ter pelo menos 6 caracteres');
    if (novaSenha !== confirmarSenha) return toast.error('As senhas não coincidem');
    if (senhaAtual === novaSenha) return toast.error('A nova senha precisa ser diferente da atual');

    setSalvandoSenha(true);
    const loadingId = toast.loading('Alterando senha...');

    try {
      const resposta = await fetch('http://localhost:3001/api/auth/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });

      const ct = resposta.headers.get('content-type') || '';
      const resultado = ct.includes('application/json') ? await resposta.json() : {};

      if (!resposta.ok) throw new Error(resultado.mensagem || 'Falha ao trocar senha');

      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
      toast.success('Senha alterada com sucesso!', { id: loadingId });
    } catch (err) {
      const msg = err.message.includes('Failed to fetch')
        ? 'Não foi possível conectar ao servidor.'
        : err.message;
      toast.error(msg, { id: loadingId });
    } finally {
      setSalvandoSenha(false);
    }
  };

  const sair = () => {
    localStorage.removeItem('@luminar:token');
    localStorage.removeItem('@luminar:user');
    window.dispatchEvent(new Event('auth-changed'));
    toast.success('Sessão encerrada');
    router.push('/');
  };

  if (carregandoInicial) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" role="status" style={{ color: '#febd17' }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  const inicial = (usuario?.nome || usuario?.email || '?').charAt(0).toUpperCase();

  return (
    <div
      className="position-relative overflow-hidden"
      style={{ backgroundColor: '#f6f6f6', fontFamily: "'Poppins', sans-serif" }}
    >
        {/* FAIXA SUPERIOR */}
        <div
          style={{
            background: 'linear-gradient(135deg, #221f20 0%, #2f2b2c 100%)',
            paddingTop: '70px',
            paddingBottom: '150px',
          }}
        >
          <div className="container">
            <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
              <div
                className="d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  backgroundColor: '#febd17',
                  color: '#221f20',
                  fontSize: '2.4rem',
                  boxShadow: '0 12px 30px rgba(254,189,23,0.35)',
                  flexShrink: 0,
                }}
              >
                {inicial}
              </div>
              <div>
                <span className="badge mb-2" style={{ backgroundColor: '#febd17', color: '#221f20' }}>
                  {usuario?.tipo || 'CLIENTE'}
                </span>
                <h1 className="fw-bold text-white mb-1" style={{ fontSize: '2.6rem', lineHeight: 1.1 }}>
                  Suas <span style={{ color: '#febd17' }}>preferências</span>
                </h1>
                <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Atualize seus dados pessoais e mantenha sua conta segura.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CARDS DE FORMULÁRIO */}
        <div className="container" style={{ marginTop: '-100px', paddingBottom: '90px', position: 'relative', zIndex: 2 }}>
          <div className="row g-4">

            {/* DADOS PESSOAIS */}
            <div className="col-lg-7">
              <div
                className="bg-white p-5 rounded-4 h-100"
                style={{ boxShadow: '0 25px 50px rgba(34,31,32,0.12)', border: '1px solid #ececec' }}
              >
                <div className="d-flex align-items-center gap-2 mb-4">
                  <i className="bi bi-person-vcard-fill fs-4" style={{ color: '#febd17' }}></i>
                  <h2 className="fs-4 fw-bold m-0" style={{ color: '#221f20' }}>Dados pessoais</h2>
                </div>

                <form onSubmit={salvarDados} noValidate>
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary mb-2">Nome completo</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: '#221f20',
                        borderBottomWidth: '2px',
                        fontSize: '1.05rem',
                        paddingBottom: '12px',
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary mb-2">E-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: '#221f20',
                        borderBottomWidth: '2px',
                        fontSize: '1.05rem',
                        paddingBottom: '12px',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={salvandoDados}
                    className="btn fw-bold px-4 py-2 rounded-pill"
                    style={{
                      backgroundColor: '#febd17',
                      color: '#221f20',
                      border: 'none',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {salvandoDados ? 'Salvando...' : 'Salvar alterações'}
                  </button>
                </form>
              </div>
            </div>

            {/* SEGURANÇA */}
            <div className="col-lg-5">
              <div
                className="bg-white p-5 rounded-4 h-100"
                style={{ boxShadow: '0 25px 50px rgba(34,31,32,0.12)', border: '1px solid #ececec' }}
              >
                <div className="d-flex align-items-center gap-2 mb-4">
                  <i className="bi bi-shield-lock-fill fs-4" style={{ color: '#febd17' }}></i>
                  <h2 className="fs-4 fw-bold m-0" style={{ color: '#221f20' }}>Segurança</h2>
                </div>

                <form onSubmit={salvarSenha} noValidate>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary mb-2">Senha atual</label>
                    <input
                      type="password"
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: '#221f20',
                        borderBottomWidth: '2px',
                        fontSize: '1.05rem',
                        paddingBottom: '12px',
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary mb-2">Nova senha</label>
                    <input
                      type="password"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: '#221f20',
                        borderBottomWidth: '2px',
                        fontSize: '1.05rem',
                        paddingBottom: '12px',
                      }}
                    />
                    <small className="text-muted">Mínimo 6 caracteres</small>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary mb-2">Confirmar nova senha</label>
                    <input
                      type="password"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: '#221f20',
                        borderBottomWidth: '2px',
                        fontSize: '1.05rem',
                        paddingBottom: '12px',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={salvandoSenha}
                    className="btn fw-bold px-4 py-2 rounded-pill w-100"
                    style={{
                      backgroundColor: '#221f20',
                      color: '#febd17',
                      border: 'none',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {salvandoSenha ? 'Alterando...' : 'Alterar senha'}
                  </button>
                </form>
              </div>
            </div>

            {/* ZONA PERIGOSA */}
            <div className="col-12">
              <div
                className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-4 rounded-4"
                style={{
                  backgroundColor: '#fff',
                  border: '1px dashed #dc3545',
                }}
              >
                <div>
                  <h3 className="fs-5 fw-bold mb-1" style={{ color: '#221f20' }}>
                    Encerrar sessão
                  </h3>
                  <p className="small text-secondary m-0">
                    Você precisará entrar novamente para acessar sua conta neste dispositivo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={sair}
                  className="btn fw-bold px-4 py-2 rounded-pill"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#dc3545',
                    border: '2px solid #dc3545',
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sair da conta
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}
