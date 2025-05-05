import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { URLS } from '../navigation/constants';
import { Cuenta } from '../models/Cuenta';
import { CuentaService } from '../services/CuentaService';
import { Beneficiarios } from '../models/Beneficiarios';
import { BeneficiarioService } from '../services/BeneficiarioService';
import { Transferencia } from '../models/Transferencia';
import { TransferenciaService } from '../services/TransferenciaService';

interface Inputs {
    emisor: number;
    receptor: number;
    monto: number;
    fecha: string;
}

export const TransferenciaForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [cuentasUsuario, setCuentasUsuario] = useState<Cuenta[]>([]);
    const [beneficiarios, setBeneficiarios] = useState<Beneficiarios[]>([]);
    const [errorTransferencia, setErrorTransferencia] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transferenciaData, setTransferenciaData] = useState<Transferencia | null>(null);
    const [receptorSeleccionado, setReceptorSeleccionado] = useState<number | undefined>(); 

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    const cuentaService = new CuentaService();
    const beneficiarioService = new BeneficiarioService();
    const transferenciaService = new TransferenciaService();


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        setErrorTransferencia(null);

        try {
            const transferencia: Transferencia = {
                id: id ? id : "",
                emisor_id: data.emisor,
                receptor_id: data.receptor,
                monto: data.monto,
                fecha: data.fecha,
            };

            if (id) {
                await transferenciaService.updateTransferencia(transferencia);
            } else {
                await transferenciaService.insertTransferencia(transferencia);
            }
            navigate(URLS.Movimientos.LIST);
        } catch (error: any) {
            console.error("Error al realizar la transferencia: ", error);
            setErrorTransferencia(error instanceof Error ? error.message : "Ocurrió un error al realizar la transferencia.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadCuentasUsuario = async () => {
        setIsLoading(true);
        try {
            const cuentas = await cuentaService.getCuentasDelUsuario();
            setCuentasUsuario(cuentas);
        } catch (error) {
            console.error('Error al cargar las cuentas del usuario:', error);
            setErrorTransferencia(error instanceof Error ? error.message : "No se pudieron cargar sus cuentas.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadBeneficiarios = async () => {
        setIsLoading(true);
        try {
            const beneficiariosData = await beneficiarioService.getbeneficiarios();
            setBeneficiarios(beneficiariosData);
        } catch (error) {
            console.error('Error al cargar los beneficiarios:', error);
            setErrorTransferencia(error instanceof Error ? error.message : "No se pudieron cargar sus beneficiarios.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadTransferencia = async () => {
        if (id) {
            setIsLoading(true);
            try {
                const transferencia = await transferenciaService.getTransferencia(id);
                setTransferenciaData(transferencia);
                setReceptorSeleccionado(transferencia.receptor_id);
                reset({
                    emisor: transferencia.emisor_id,
                    receptor: transferencia.receptor_id,
                    monto: transferencia.monto,
                    fecha: transferencia.fecha,
                });
            } catch (error: any) {
                console.error("Error al cargar la transferencia", error);
                setErrorTransferencia(error instanceof Error ? error.message : "Error al cargar la transferencia.");
            } finally {
                setIsLoading(false);
            }
        }
    };


    useEffect(() => {
        loadCuentasUsuario();
        loadBeneficiarios();
        loadTransferencia();
    }, [id]);

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="w-100 max-w-md shadow-lg bg-white rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Realizar Transferencia</h2>
                <p className="text-gray-600 mb-6">Ingrese los detalles de la transferencia</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="emisor" className="block text-sm font-medium text-gray-700">Desde mi Cuenta:</label>
                        <select
                            id="emisor"
                            {...register('emisor', { required: 'Debe seleccionar una cuenta' })}
                            defaultValue={transferenciaData?.emisor_id ? transferenciaData.emisor_id : ""}
                            className={errors.emisor ? 'border-red-500 block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500' :
                                'block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500'}

                        >
                            <option value="">Seleccione una cuenta</option>
                            {cuentasUsuario.map((cuenta) => (
                                <option key={cuenta.id} value={cuenta.id}>
                                    {cuenta.nroCuenta} - Saldo: {cuenta.saldo}
                                </option>
                            ))}
                        </select>
                        {errors.emisor && <p className="text-sm text-red-500">{errors.emisor.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="receptor" className="block text-sm font-medium text-gray-700">A Beneficiario:</label>
                        <select
                            id="receptor"
                            {...register('receptor', {
                                required: 'Debe seleccionar un beneficiario',
                            })}
                            value={receptorSeleccionado}
                            onChange={(e) => {
                                const selectedValue = parseInt(e.target.value, 10);
                                setReceptorSeleccionado(isNaN(selectedValue) ? undefined : selectedValue);
                            }}
                            defaultValue={transferenciaData?.receptor_id ? transferenciaData.receptor_id : ""}
                            className={errors.receptor ? 'border-red-500 block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500' :
                                'block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                        >
                            {beneficiarios.map((beneficiario) => {
    console.log("Beneficiario:", beneficiario);
    return (
        <option key={beneficiario.id} value={beneficiario.cuenta_propia?.id}>
            {beneficiario.nombreCompleto}
        </option>
    );
})}
                        </select>
                        {errors.receptor && <p className="text-sm text-red-500">{errors.receptor.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="monto" className="block text-sm font-medium text-gray-700">Monto:</label>
                        <input
                            id="monto"
                            type="number"
                            placeholder="Ingrese el monto"
                            {...register('monto', {
                                required: 'El monto es requerido',
                                min: { value: 0.01, message: 'El monto debe ser mayor que cero' },
                            })}
                            className={errors.monto ? 'border-red-500 block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500' :
                                'block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                        />
                        {errors.monto && <p className="text-sm text-red-500">{errors.monto.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha:</label>
                        <input
                            id="fecha"
                            type="date"
                            placeholder="Ingrese la fecha"
                            {...register('fecha', {
                                required: 'La fecha es requerida',
                            })}
                            className={errors.fecha ? 'border-red-500 block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500' :
                                'block w-full px-4 py-2 mt-1 text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                        />
                        {errors.fecha && <p className="text-sm text-red-500">{errors.fecha.message}</p>}
                    </div>

                    {errorTransferencia && <p className="text-sm text-red-500">{errorTransferencia}</p>}
                    <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" disabled={isLoading}>
                        {isLoading ? 'Cargando...' : 'Transferir'}
                    </button>
                </form>
            </div>
        </div>
    );
};

