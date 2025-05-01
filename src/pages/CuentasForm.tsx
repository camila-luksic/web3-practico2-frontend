import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../components/input"
import { FormField } from "../components/formField"
import { Card } from '../components/card';
import { Button } from "../components/button";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/constants";
import { useEffect } from "react";
import { Cuenta } from "../models/Cuenta";
import { CuentaService } from "../services/CuentaService";
import { getUserIdFromToken } from "../utils/AuthUtils"; // la ruta depende de tu estructura


type Inputs = {
    nombre: string
    ci: string
    saldo: number
}
export const CuentasForm = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const userId = getUserIdFromToken(); // 🔥 obtenemos el user_id

        if (!userId) {
            alert('Usuario no autenticado.');
            return;
        }

        console.log(data)
        const cuenta: Cuenta= {
            id: id ? id : "",
            nombreCompleto: data.nombre,
            usuario_id: userId, 
            ci: data.ci,
            saldo:data.saldo

        }
        if (id) {
            updateCuenta(cuenta)
        } else {
            insertCuenta(cuenta)
        }

    }
    const updateCuenta = (cuenta: Cuenta) => {
        new CuentaService()
            .updateCuenta(cuenta)
            .then(() => {
                navigate(URLS.Cuentas.LIST)
            })
            .catch((error) => {
                console.error("Error al actualizar la cuenta: ", error)
                alert("Error al actualizar cuenta, intente nuevamente");
            });
    }

    const insertCuenta = (cuenta: Cuenta) => {
        new CuentaService()
            .insertCuenta(cuenta)
            .then(() => {
                navigate(URLS.Cuentas.LIST)
            })
            .catch((error) => {
                console.error("Error al insertar la cuenta: ", error)
                alert("Error al insertar cuenta, intente nuevamente");
            });
    }

    const loadCuenta = async () => {
        new CuentaService()
            .getCuenta(id!)
            .then((response) => {
                reset({
                    nombre: response.nombreCompleto,
                    ci: response.ci,
                    saldo: response.saldo
                })
            });
    }
    useEffect(() => {
        if (!id) {
            return;
        }
        loadCuenta();

    }, [id])

    return (
        <div>
            <Card title="Formulario Cuenta" className="mx-5 my-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <label htmlFor="nombre">Nombre Completo:</label>
                        <Input id="nombre" {...register("nombre", { required: true })} />
                        {errors.nombre && <span>Este campo es requerido</span>}
                    </FormField>
                    <FormField>
                        <label htmlFor="ci">Ci:</label>
                        <Input id="ci" {...register("ci", { required: true })} />
                        {errors.ci && <span>Este campo es requerido</span>}
                    </FormField>
                    <FormField>
                        <label htmlFor="saldo">Saldo:</label>
                        <Input id="saldo" type="number" {...register("saldo", { required: true })} />
                        {errors.saldo && <span>Este campo es requerido</span>}
                    </FormField>
                    <Button type="submit" title="Guardar" />
                </form>
            </Card>
        </div>
    );
}