import { Transferencia } from './../models/Transferencia';
import apiClient from "./interceptors"

export class TransferenciaService {

    insertTransferencia(transferencia: Transferencia): Promise<Transferencia> {
        return new Promise<Transferencia>((resolve, reject) => {
            apiClient.post("transferencias/",transferencia)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la Transferencia: " + error.message))
                })
        })
    }
    updateTransferencia(transferencia: Transferencia): Promise<Transferencia> {
        return new Promise<Transferencia>((resolve, reject) => {
            apiClient.put("transferencias/" + transferencia.id + "/", transferencia)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la Transferencia: " + error.message))
                })
        })
    }

    getTransferencia(id: string): Promise<Transferencia> {
        return new Promise<Transferencia>((resolve, reject) => {
            apiClient.get("transferencias/" + id)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al obtener la materia: " + error.message))
                })
        })
    }
    
}