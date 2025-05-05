
import React, { useEffect, useState } from 'react';
import { Card } from "../components/card";
import { Table } from "../components/table";
import { Button } from "../components/button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/constants";
import { Movimientos } from "../models/Movimientos";
import { MovimientoService } from "../services/MovimientosService";
import { Menu } from '../components/menu';


const MovimientosList = () => {
    const navigate = useNavigate();
    const [movimientos, setMovimientos] = useState<Movimientos[]>([]);
    const [loading, setLoading] = useState(true);

    const getMovimientosList = () => {
        setLoading(true);
        new MovimientoService()
            .getmovimientos()
            .then((movs) => {
                setMovimientos(movs);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los movimientos: ", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getMovimientosList();
    }, []);

    const deleteMovimiento = (id: string) => {
        const confirmation = window.confirm("¿Está seguro de que desea eliminar este movimiento?");
        if (!confirmation) return;
        new MovimientoService()
            .deletemovimiento(id)
            .then(() => {
                getMovimientosList();
            })
            .catch((error) => {
                console.error("Error al eliminar el movimiento: ", error);
            });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
        <Menu/>
        <Card title="Lista de Movimientos">
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movimientos.map((movimiento) => (
                        <tr key={movimiento.id}>
                            <td className="text-center border-t-1 border-gray-300">{movimiento.id}</td>
                            <td className="text-center border-t-1 border-gray-300">{movimiento.tipo}</td>
                            <td className="text-center border-t-1 border-gray-300">{movimiento.monto}</td>
                            <td className="text-center border-t-1 border-gray-300">{movimiento.fecha}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
             <div className="mt-4">
                    <Button
                      onClick={() => navigate(URLS.Movimientos.CREATE)}
                      variant="primary"
                      title="Crear Nueva Movimiento"
                      />
                  </div>
        </Card>
        </>
    );
};

export default MovimientosList;