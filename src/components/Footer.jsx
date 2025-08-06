import React from 'react';


function Footer({ onShowFavoritos }) {
  return (
    <footer className="footer-app" style={{ padding: '1rem 0', background: '#181c24', color: '#fff', display: 'block' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button
          style={{
            background: '#c1121f',
            color: '#fff',
            border: '1px solid #c1121f',
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
            marginBottom: 10,
            marginTop: 0,
            display: 'block',
            width: 'fit-content'
          }}
          onClick={onShowFavoritos}
        >
          Lista de favoritos
        </button>
        <span style={{ textAlign: 'center', display: 'block' }}>© {new Date().getFullYear()} App de Películas. Proyecto para el Curso Front-End de Software Libre</span>
      </div>
    </footer>
  );
}

export default Footer;
