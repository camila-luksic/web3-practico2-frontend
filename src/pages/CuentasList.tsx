import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/card";
import { Table } from "../components/table";
import { Button } from "../components/button";
import { URLS } from "../navigation/constants";
import { Cuenta } from "../models/Cuenta";
import { CuentaService } from "../services/CuentaService";
import { Menu } from "../components/menu";

const CuentasList = () => {
  const navigate = useNavigate();
  const [cuentas, setCuentas] = useState<Array<Cuenta>>([]);

  const getCuentasList = () => {
    new CuentaService()
      .getCuentasDelUsuario()
      .then((response) => {
        setCuentas(response);
      })
      .catch((error) => {
        console.error("Error al obtener las cuentas: ", error);
      });
  };

  useEffect(() => {
    getCuentasList();
  }, []);

  const deleteCuenta = (id: string) => {
    const confirmation = window.confirm("¿Está seguro de que desea eliminar esta cuenta?");
    if (!confirmation) return;
    new CuentaService()
      .deleteCuenta(id)
      .then(() => {
        getCuentasList();
      })
      .catch((error) => {
        console.error("Error al eliminar la cuenta: ", error);
      });
  };

  return (
    <>
    <Menu/>
    <div className="container mx-auto p-4">
      <Card title="Lista de Cuentas" className="shadow-md rounded-md bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-full leading-normal">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-4 px-8 text-left font-semibold border border-gray-300">ID</th>
                <th className="py-4 px-8 text-left font-semibold border border-gray-300">Nombre</th>
                <th className="py-4 px-8 text-left font-semibold border border-gray-300">CI</th>
                <th className="py-4 px-8 text-left font-semibold border border-gray-300">Nro. Cuenta</th>
                <th className="py-4 px-8 text-left font-semibold border border-gray-300">Saldo</th>
                <th className="py-4 px-6 text-center font-semibold border border-gray-300">Editar</th>
                <th className="py-4 px-6 text-center font-semibold border border-gray-300">Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {cuentas.map((cuenta) => (
                <tr key={cuenta.id}>
                  <td className="py-5 px-8 leading-relaxed border border-gray-300">{cuenta.id}</td>
                  <td className="py-5 px-8 leading-relaxed border border-gray-300">{cuenta.nombreCompleto}</td>
                  <td className="py-5 px-8 leading-relaxed border border-gray-300">{cuenta.ci}</td>
                  <td className="py-5 px-8 leading-relaxed border border-gray-300">{cuenta.nroCuenta}</td>
                  <td className="py-5 px-8 leading-relaxed border border-gray-300">{cuenta.saldo}</td>
                  <td className="py-4 px-6 text-center border border-gray-300">
                    <Button
                      onClick={() => navigate(URLS.Cuentas.UPDATE(cuenta.id.toString()))}
                      variant="primary"
                      title="Editar"
                     />
                  </td>
                  <td className="py-4 px-6 text-center border border-gray-300">
                    <Button
                      onClick={() => deleteCuenta(cuenta.id.toString())}
                      variant="danger"
                      title="Eliminar"
                     />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
      <div className="mt-4">
        <Button
          onClick={() => navigate(URLS.Cuentas.CREATE)}
          variant="primary"
          title="Crear Nueva Cuenta"
          />
      </div>
    </div>
    </>
  );
};

export default CuentasList;