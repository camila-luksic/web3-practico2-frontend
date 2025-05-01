import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { Table } from "../components/table";
import { Button } from "../components/button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/constants";
import { Beneficiarios } from "../models/Beneficiarios";
import { BeneficiarioService } from "../services/BeneficiarioService";


const BeneficiariosList = () => {
  const navigate = useNavigate();
  const [beneficiarios, setbeneficiarios] = useState<Beneficiarios[]>([]);
  const [loading, setLoading] = useState(true);

  const getbeneficiariosList = () => {
    setLoading(true);
    new BeneficiarioService()
      .getbeneficiarios()
      .then((beneficiariosConCuenta) => {
        setbeneficiarios(beneficiariosConCuenta);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los beneficiarios: ", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getbeneficiariosList();
  }, []);

  const deletebeneficiario = (id: string) => {
    const confirmation = window.confirm("¿Está seguro de que desea eliminar este beneficiario?");
    if (!confirmation) return;
    new BeneficiarioService()
      .deletebeneficiario(id)
      .then(() => {
        getbeneficiariosList();
      })
      .catch((error) => {
        console.error("Error al eliminar el beneficiario: ", error);
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card title="Lista de beneficiarios">
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {beneficiarios.map((beneficiario) => (
            <tr key={beneficiario.id}>
              <td className="text-center border-t-1 border-gray-300">{beneficiario.id}</td>
              <td className="text-center border-t-1 border-gray-300">{beneficiario.nombreCompleto}</td>
              <td className="text-center border-t-1 border-gray-300">
                <Button
                  onClick={() => {
                    navigate(URLS.Beneficiarios.UPDATE(beneficiario.id.toString()));
                  }}
                  variant="primary"
                  title="Editar"
                ></Button>
              </td>
              <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                <Button
                  onClick={() => {
                    deletebeneficiario(beneficiario.id.toString());
                  }}
                  variant="danger"
                  title="Eliminar"
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default BeneficiariosList;