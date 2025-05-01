import { Cuenta } from './../models/Cuenta';
import apiClient from "./interceptors"

export class CuentaService {
    getAllCuentas(): Promise<Array<Cuenta>> {
        return new Promise<Array<Cuenta>>((resolve, reject) => {
            apiClient.get("cuentas/all_accounts/")
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al obtener las cuentas: " + error.message))
                })
        })
    }
    // Obtiene solo las cuentas del usuario logueado (endpoint por defecto del ViewSet)
    getCuentasDelUsuario(): Promise<Array<Cuenta>> {
        return new Promise<Array<Cuenta>>((resolve, reject) => {
            apiClient.get("cuentas/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(new Error("Error al obtener las cuentas del usuario: " + error.message));
                });
        });
    }
    getCuenta(id: string): Promise<Cuenta> {
        return new Promise<Cuenta>((resolve, reject) => {
            apiClient.get("cuentas/" + id)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al obtener la cuenta: " + error.message))
                })
        })
    }
    getCuentasByUserId(userId:number): Promise<Array<Cuenta>> {
        return new Promise<Array<Cuenta>>((resolve, reject) => {
            apiClient.get(`cuentas/usuario/${userId}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(new Error("Error al obtener las cuentas: " + error.message));
                });
        });
    }
    insertCuenta(cuenta: Cuenta): Promise<Cuenta> {
        return new Promise<Cuenta>((resolve, reject) => {
            apiClient.post("cuentas/",cuenta)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la cuenta: " + error.message))
                })
        })
    }
    updateCuenta(cuenta: Cuenta): Promise<Cuenta> {
        return new Promise<Cuenta>((resolve, reject) => {
            apiClient.put("cuentas/" + cuenta.id + "/", cuenta)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la cuenta: " + error.message))
                })
        })
    }
    deleteCuenta(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            apiClient.delete("cuentas/" + id + '/')
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    reject(new Error("Error al eliminar la cuenta: " + error.message))
                })
        })
    }
}