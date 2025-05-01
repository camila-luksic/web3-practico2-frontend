import { Beneficiarios } from './../models/Beneficiarios';
import apiClient from "./interceptors"


export class BeneficiarioService { // <-- lo que guardaste

    getbeneficiarios(): Promise<Array<Beneficiarios>> {
        return new Promise<Array<Beneficiarios>>((resolve, reject) => {
            
            apiClient.get("beneficiarios/")
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al obtener las materias: " + error.message))
                })
        })
    }
    getbeneficiario(id: string): Promise<Beneficiarios> {
        return new Promise<Beneficiarios>((resolve, reject) => {
            apiClient.get("beneficiarios/" + id)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al obtener la materia: " + error.message))
                })
        })
    }

    insertbeneficiario(beneficiario: Beneficiarios): Promise<Beneficiarios> {
        return new Promise<Beneficiarios>((resolve, reject) => {
            apiClient.post("beneficiarios/",beneficiario)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la materia: " + error.message))
                })
        })
    }
    updatebeneficiario(beneficiario: Beneficiarios): Promise<Beneficiarios> {
        return new Promise<Beneficiarios>((resolve, reject) => {
            apiClient.put("beneficiarios/" + beneficiario.id + "/", beneficiario)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la materia: " + error.message))
                })
        })
    }
    deletebeneficiario(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            apiClient.delete("beneficiarios/" + id + '/')
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    reject(new Error("Error al eliminar la materia: " + error.message))
                })
        })
    }
}