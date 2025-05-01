import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input";
import { FormField } from "../components/formField";
import { Card } from '../components/card';
import { Button } from "../components/button";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/constants";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/AuthUtils";
import { MovimientoService } from "../services/MovimientosService";
import { Movimientos } from "../models/Movimientos";
import { CuentaService } from "../services/CuentaService";
import { Cuenta } from '../models/Cuenta';

type Inputs = {
    tipo: string;
    monto: number;
    fecha: string;
    nroCuenta: string;
};

export const MovimientosForm = () => {
    const navigate = useNavigate();
    const [cuentas, setCuentas] = useState<Cuenta[]>([]);
      const [movimientos, setMovimientos] = useState<Movimientos[]>([]);
    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const userId = getUserIdFromToken();

        if (!userId) {
            alert('Usuario no autenticado.');
            return;
        }

        console.log(data);
        const movimiento: Movimientos = {
            id: id ? id : "",
            tipo: data.tipo,
            monto: data.monto,
            fecha: data.fecha,
            nroCuenta: data.nroCuenta,
        };
        if (id) {
            updateMovimiento(movimiento);
        } else {
            insertMovimiento(movimiento);
        }
    };

    const updateMovimiento = (movimiento: Movimientos) => {
        new MovimientoService()
            .updatemovimiento(movimiento)
            .then(() => {
                navigate(URLS.Movimientos.LIST);
            })
            .catch((error) => {
                console.error("Error al actualizar el movimiento: ", error);
                alert("Error al actualizar el movimiento, intente nuevamente");
            });
    };

    const insertMovimiento = (movimiento: Movimientos) => {
        new MovimientoService()
            .insertmovimiento(movimiento)
            .then(() => {
                navigate(URLS.Movimientos.LIST);
            })
            .catch((error) => {
                console.error("Error al insertar el movimiento: ", error);
                alert("Error al insertar el movimiento, intente nuevamente");
            });
    };

    const loadMovimiento = async () => {
         if (!id) return;
        new MovimientoService()
            .getmovimiento(id)
            .then((response) => {
                reset({
                    tipo: response.tipo,
                    monto: response.monto,
                    fecha: response.fecha,
                    nroCuenta: response.nroCuenta,
                });
            })
            .catch((error) => {
                console.error("Error al cargar el movimiento: ", error);
                alert("Error al cargar el movimiento, intente nuevamente");
            });
    };
      const loadMovimientos = async () => {
        const userId = getUserIdFromToken();
        if (!userId) return;

        new MovimientoService()
            .getmovimientos() // Corregido el nombre del método del servicio
            .then((response) => {
                setMovimientos(response); // Corregido el nombre del estado
            })
            .catch((error) => {
                console.error("Error al cargar los movimientos:", error); // Corregido el mensaje de error
                alert("Error al cargar los movimientos, intente nuevamente"); // Corregido el mensaje al usuario
            });
    };

    const loadCuentas = async () => {
        try {
            const cuentasData = await new CuentaService().getCuentasDelUsuario();
            setCuentas(cuentasData);
        } catch (error) {
            console.error("Error al cargar las cuentas:", error);
            alert("Error al cargar las cuentas, intente nuevamente");
        }
    };

    useEffect(() => {
        loadMovimientos();
        loadCuentas();
        if (id) {
            loadMovimiento();
        }
    }, [id]);

    return (
        <div>
            <Card title="Formulario Movimiento" className="mx-5 my-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <label htmlFor="tipo">Tipo:</label>
                        <select id="tipo" {...register("tipo", { required: "Este campo es requerido" })}>
                            <option value="">Seleccione un tipo</option>
                            <option value="ingreso">Ingreso</option>
                            <option value="egreso">Egreso</option>
                        </select>
                        {errors.tipo && <span>{errors.tipo.message}</span>}
                    </FormField>
                    <FormField>
                        <label htmlFor="monto">Monto:</label>
                        <Input
                            id="monto"
                            type="number"
                            {...register("monto", {
                                required: "Este campo es requerido",
                                min: { value: 0, message: "El monto debe ser mayor o igual a 0" },
                            })}
                        />
                        {errors.monto && <span>{errors.monto.message}</span>}
                    </FormField>
                    <FormField>
                        <label htmlFor="fecha">Fecha:</label>
                        <Input
                            id="fecha"
                            type="date"
                            {...register("fecha", { required: "Este campo es requerido" })}
                        />
                        {errors.fecha && <span>{errors.fecha.message}</span>}
                    </FormField>
                    <FormField>
                        <label htmlFor="cuenta">Cuenta:</label>
                        <select id="cuenta" {...register("nroCuenta", { required: "Debe seleccionar una cuenta" })}>
                            <option value="">Seleccione una cuenta</option>
                            {cuentas.map((cuenta) => (
                                <option key={cuenta.id} value={cuenta.id}>
                                    {cuenta.nroCuenta}
                                </option>
                            ))}
                        </select>
                        {errors.nroCuenta && <span>{errors.nroCuenta.message}</span>}
                    </FormField>
                    <Button type="submit" title="Guardar" />
                </form>
            </Card>
        </div>
    );
};

