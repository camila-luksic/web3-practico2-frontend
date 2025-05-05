import React from 'react';
import { NavLink } from 'react-router-dom';
import { URLS } from '../navigation/constants';

export const Menu = () => {
  const navStyle = {
    backgroundColor: '#333',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'flex-end', 
  };

  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const liStyle = {
    marginRight: '25px',
  };

  const liLastStyle = {
    marginRight: 0,
  };
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    color: isActive ? '#00aaff' : '#f8f8f8',
    fontWeight: 'bold',
    fontSize: '1.1em',
    transition: 'color 0.3s ease',
  });

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <NavLink to={URLS.Cuentas.LIST} style={linkStyle}>
            Cuentas
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink to={URLS.Beneficiarios.LIST} style={linkStyle}>
            Beneficiarios
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink to={URLS.Movimientos.LIST} style={linkStyle}>
            Movimientos
          </NavLink>
        </li>
        <li style={liLastStyle}>
          <NavLink to={URLS.Transferencias.CREATE} style={linkStyle}>
             Realizar Transferencia
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};