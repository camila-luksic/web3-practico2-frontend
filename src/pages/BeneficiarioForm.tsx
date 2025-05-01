// src/components/BeneficiariosForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input";
import { FormField } from "../components/formField";
import { Card } from '../components/card';
import { Button } from "../components/button";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/constants";
import { useEffect, useState } from "react";
import { Beneficiarios } from "../models/Beneficiarios";
import { BeneficiarioService } from "../services/BeneficiarioService";
import { CuentaService } from "../services/CuentaService";
import { Cuenta } from "../models/Cuenta";
import { getUserIdFromToken } from "../utils/AuthUtils";

type Inputs = {
    nombreCompleto: string;
    cuenta_beneficiaria_id: string; // Ahora se usará para la cuenta propia
    cuenta_propia_id: string;      // Ahora se usará para la cuenta del beneficiario
}

export const BeneficiariosForm = () => {
    const navigate = useNavigate();
    const [cuentasUsuario, setCuentasUsuario] = useState<Cuenta[]>([]);
    const [cuentasTodas, setCuentasTodas] = useState<Cuenta[]>([]);

    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
         const userId = getUserIdFromToken(); // 🔥 obtenemos el user_id
        
                if (!userId) {
                    alert('Usuario no autenticado.');
                    return;
                }
        const beneficiario: Beneficiarios = {
            id: id ? id : "",
            nombreCompleto: data.nombreCompleto,
            // Intercambiamos la asignación aquí para que coincida con el backend invertido
            cuenta_beneficiaria_id: data.cuenta_beneficiaria_id,
            cuenta_propia_id: data.cuenta_propia_id,
            usuario_id:userId
        };
        new BeneficiarioService().insertbeneficiario(beneficiario)
        .then(response => {
            console.log('Beneficiario guardado:', response);
            navigate(URLS.Beneficiarios.LIST); // O la ruta que desees
        })
        .catch(error => {
            console.error('Error al guardar el beneficiario:', error);
            // Maneja el error como necesites (mostrar mensaje al usuario, etc.)
        });
    };

    const loadbeneficiario = async () => {
        // ... (tu lógica de cargar beneficiario)
    };

    const loadCuentas = async () => {
        const cuentaService = new CuentaService();
        cuentaService.getCuentasDelUsuario()
            .then((cuentas) => {
                setCuentasUsuario(cuentas);
            })
            .catch((error) => {
                console.error("Error al cargar las cuentas del usuario:", error);
            });

        cuentaService.getAllCuentas()
            .then((todasLasCuentas) => {
                setCuentasTodas(todasLasCuentas);
            })
            .catch((error) => {
                console.error("Error al cargar todas las cuentas:", error);
            });
    };

    useEffect(() => {
        if (id) {
            loadbeneficiario();
        }
        loadCuentas();
    }, [id]);

    return (
        <div>
            <Card title="Formulario beneficiario" className="mx-5 my-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <label htmlFor="nombre">Nombre Completo:</label>
                        <Input id="nombre" {...register("nombreCompleto", { required: true })} />
                        {errors.nombreCompleto && <span>Este campo es requerido</span>}
                    </FormField>

                    <FormField>
                        {/* La etiqueta ahora describe la cuenta propia */}
                        <label htmlFor="cuenta_beneficiaria_id">Mi Cuenta (para asociar al beneficiario):</label>
                        <select
                            id="cuenta_beneficiaria_id"
                            {...register("cuenta_beneficiaria_id", { required: "Debe seleccionar una cuenta propia" })}
                        >
                            <option value="">Seleccione su cuenta</option>
                            {cuentasUsuario.map((cuenta) => (
                                <option key={cuenta.id} value={cuenta.id}>
                                    {cuenta.nroCuenta} - Saldo: {cuenta.saldo}
                                </option>
                            ))}
                        </select>
                        {errors.cuenta_beneficiaria_id && <span>{errors.cuenta_beneficiaria_id.message}</span>}
                    </FormField>

                    <FormField>
                        {/* La etiqueta ahora describe la cuenta del beneficiario */}
                        <label htmlFor="cuenta_propia_id">Cuenta del Beneficiario:</label>
                        <select
                            id="cuenta_propia_id"
                            {...register("cuenta_propia_id", { required: "Debe seleccionar una cuenta del beneficiario" })}
                        >
                            <option value="">Seleccione la cuenta del beneficiario</option>
                            {cuentasTodas.map((cuenta) => (
                                <option key={cuenta.id} value={cuenta.id}>
                                    {cuenta.nroCuenta}-
                                    {cuenta.nombreCompleto}
                                </option>
                            ))}
                        </select>
                        {errors.cuenta_propia_id && <span>{errors.cuenta_propia_id.message}</span>}
                    </FormField>

                    <Button type="submit" title="Guardar" />
                </form>
            </Card>
        </div>
    );
};