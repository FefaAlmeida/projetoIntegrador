'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const ROTAS_SEM_BOTAO_AUTH = ['/login', '/cadastro'];

export default function Header() {
  const [usuario, setUsuario] = useState(null);
  const [pronto, setPronto] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const esconderBotaoAuth = ROTAS_SEM_BOTAO_AUTH.includes(pathname);

  useEffect(() => {
    const carregar = () => {
      try {
        const raw = localStorage.getItem('@luminar:user');
        setUsuario(raw ? JSON.parse(raw) : null);
      } catch {
        setUsuario(null);
      }
      setPronto(true);
    };

    carregar();
    window.addEventListener('auth-changed', carregar);
    window.addEventListener('storage', carregar);
    return () => {
      window.removeEventListener('auth-changed', carregar);
      window.removeEventListener('storage', carregar);
    };
  }, []);

  const sair = () => {
    localStorage.removeItem('@luminar:token');
    localStorage.removeItem('@luminar:user');
    window.dispatchEvent(new Event('auth-changed'));
    toast.success('Sessão encerrada');
    router.push('/');
  };

  const primeiroNome = usuario?.nome?.split(' ')[0] || 'Conta';
  const inicial = (usuario?.nome || usuario?.email || '?').charAt(0).toUpperCase();

  return (
    <header
      className="border-bottom"
      style={{
        background: 'linear-gradient(90deg,#221f20,#221f20)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
      }}
    >
      <div className="container-fluid px-5 d-flex flex-wrap justify-content-between align-items-center py-3">

        {/* LOGO */}
        <a href="/" className="d-flex align-items-center text-decoration-none">
          <img
            src="/logo-semEscrita.png"
            alt="Luminar Logo"
            width="55"
            height="55"
            className="me-2"
            style={{ objectFit: 'contain' }}
          />
          <span className="fs-4 fw-bold" style={{ color: '#febd17' }}>
            Luminar
          </span>
        </a>

        {/* MENU */}
        <ul className="nav nav-pills align-items-center gap-3">
          <li className="nav-item">
            <a href="/" className="nav-link text-white">
              Início
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Serviços
            </a>
            <ul className="dropdown-menu" style={{ backgroundColor: '#221f20' }}>
              <li><a className="dropdown-item text-white" href="#">Instalação de painéis solares</a></li>
              <li><a className="dropdown-item text-white" href="#">Monitoramento energético</a></li>
              <li><a className="dropdown-item text-white" href="#">Manutenção</a></li>
              <li><a className="dropdown-item text-white" href="#">Investimento energético empresarial</a></li>
            </ul>
          </li>

          <li className="nav-item">
            <a href="/orcamento" className="nav-link text-white">Orçamento</a>
          </li>

          <li className="nav-item">
            <a href="/faleConosco" className="nav-link text-white">Fale conosco</a>
          </li>

          {/* SLOT DINÂMICO: login/cadastro vs perfil */}
          {!pronto ? (
            <li className="nav-item" style={{ minWidth: 160, height: 42 }} />
          ) : usuario ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center gap-2 px-3 py-2"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                style={{
                  backgroundColor: '#febd17',
                  borderRadius: '12px',
                  color: '#221f20',
                  fontWeight: 700,
                }}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: '#221f20',
                    color: '#febd17',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                  }}
                >
                  {inicial}
                </span>
                {primeiroNome}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2"
                style={{
                  backgroundColor: '#221f20',
                  borderRadius: '14px',
                  minWidth: 220,
                  overflow: 'hidden',
                }}
              >
                <li className="px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="small text-white-50">Logado como</div>
                  <div className="text-white fw-bold text-truncate" style={{ maxWidth: 200 }}>
                    {usuario.email}
                  </div>
                </li>
                <li>
                  <a className="dropdown-item text-white py-2" href="/preferencias">
                    <i className="bi bi-gear-fill me-2" style={{ color: '#febd17' }}></i>
                    Preferências
                  </a>
                </li>
                {usuario.tipo === 'ADMIN' && (
                  <li>
                    <a className="dropdown-item text-white py-2" href="/admin">
                      <i className="bi bi-shield-lock-fill me-2" style={{ color: '#febd17' }}></i>
                      Painel admin
                    </a>
                  </li>
                )}
                <li><hr className="dropdown-divider my-1" style={{ borderColor: 'rgba(255,255,255,0.1)' }} /></li>
                <li>
                  <button
                    type="button"
                    onClick={sair}
                    className="dropdown-item text-white py-2"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <i className="bi bi-box-arrow-right me-2" style={{ color: '#febd17' }}></i>
                    Sair
                  </button>
                </li>
              </ul>
            </li>
          ) : esconderBotaoAuth ? null : (
            <li className="nav-item">
              <a
                href="/login"
                className="btn fw-bold px-4 py-2"
                style={{
                  backgroundColor: '#febd17',
                  borderRadius: '12px',
                  color: '#221f20',
                }}
              >
                Login/Cadastro
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
