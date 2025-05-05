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
    cuenta_beneficiaria_id: string;
    cuenta_propia_id: string;
}

export const BeneficiariosForm = () => {
    const navigate = useNavigate();
    const [cuentasUsuario, setCuentasUsuario] = useState<Cuenta[]>([]);

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
        const beneficiario: Beneficiarios = {
            id: id ? id : "",
            nombreCompleto: data.nombreCompleto,
            cuenta_beneficiaria_id: data.cuenta_beneficiaria_id,
            cuenta_propia_id: data.cuenta_propia_id,
            usuario_id: userId
        };

        if (id) {
            updateBeneficiario(beneficiario);
        } else {
            insertBeneficiario(beneficiario);
        }
    };

    const insertBeneficiario = (beneficiario: Beneficiarios) => {
        new BeneficiarioService().insertbeneficiario(beneficiario)
            .then(response => {
                console.log('Beneficiario guardado:', response);
                navigate(URLS.Beneficiarios.LIST);
            })
            .catch(error => {
                console.error('Error al guardar el beneficiario:', error);
            });
    };

    const updateBeneficiario = (beneficiario: Beneficiarios) => {
        new BeneficiarioService().updatebeneficiario(beneficiario)
            .then(() => {
                console.log('Beneficiario actualizado:', beneficiario);
                navigate(URLS.Beneficiarios.LIST);
            })
            .catch(error => {
                console.error('Error al actualizar el beneficiario:', error);
            });
    };

    const loadbeneficiario = async () => {
        if (id) {
            try {
                const beneficiarioService = new BeneficiarioService();
                const beneficiarioData = await beneficiarioService.getbeneficiario(id);
                if (beneficiarioData) {
                    reset({
                        nombreCompleto: beneficiarioData.nombreCompleto,
                        cuenta_beneficiaria_id: beneficiarioData.cuenta_beneficiaria_id,
                        cuenta_propia_id: beneficiarioData.cuenta_propia_id,
                    });
                } else {
                    console.warn(`No se encontró el beneficiario con ID: ${id}`);

                }
            } catch (error) {
                console.error("Error al cargar los datos del beneficiario:", error);

            }
        }
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
    };

    useEffect(() => {
        loadCuentas();
        if (id) {
            loadbeneficiario();
        }
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
                        <label htmlFor="cuenta_propia_id">Número de Cuenta del Beneficiario:</label>
                        <Input
                            id="cuenta_propia_id"
                            {...register("cuenta_propia_id", { required: "Debe ingresar el número de cuenta del beneficiario" })}
                        />
                        {errors.cuenta_propia_id && <span>{errors.cuenta_propia_id.message}</span>}
                    </FormField>

                    <Button type="submit" title="Guardar" />
                </form>
            </Card>
        </div>
    );
};