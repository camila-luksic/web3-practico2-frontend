import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { Table } from "../components/table";
import { Button } from "../components/button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/constants";
import { Cuenta } from "../models/Cuenta";
import { CuentaService } from "../services/CuentaService";

const CuentasList = () => {
    const navigate = useNavigate()

    const [cuentas, setCuentas] = useState<Array<Cuenta>>([]);
    const getCuentasList = () => {
        new CuentaService().getCuentasDelUsuario()
            .then((response) => {
                setCuentas(response);
            })
            .catch((error) => {
                console.error("Error al obtener las materias: ", error);
            });
    }
    useEffect(() => {
        getCuentasList()
    }, [])
    const deleteCuenta = (id: string) => {
        const confirmation = window.confirm("¿Está seguro de que desea eliminar esta materia?");
        if (!confirmation) return;
        new CuentaService().deleteCuenta(id)
            .then(() => {
                getCuentasList()
            })
            .catch((error) => {
                console.error("Error al eliminar la materia: ", error);
            });
    }
    return (
        <Card title="Lista de Cuentas">
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Ci</th>
                        <th>Nro Cuenta</th>
                        <th>Saldo</th>
                        
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cuentas.map((cuenta) => (
                        <tr key={cuenta.id}>
                            <td className="text-center border-t-1 border-gray-300">{cuenta.id}</td>
                            <td className="text-center border-t-1 border-gray-300">{cuenta.nombreCompleto}</td>
                            <td className="text-center border-t-1 border-gray-300">{cuenta.ci}</td>
                            <td className="text-center border-t-1 border-gray-300">{cuenta.nroCuenta}</td>
                            <td className="text-center border-t-1 border-gray-300">{cuenta.saldo}</td>
                            <td className="text-center border-t-1 border-gray-300"><Button onClick={() => {
                                navigate(URLS.Cuentas.UPDATE(cuenta.id.toString()))
                            }} variant="primary" title="Editar"></Button></td>
                            <td className="px-3 py-3 text-center border-t-1 border-gray-300"><Button onClick={
                                () => {
                                    deleteCuenta(cuenta.id.toString())
                                }
                            } variant="danger" title="Eliminar"></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
}

export default CuentasList;