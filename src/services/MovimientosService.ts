import { Movimientos } from './../models/Movimientos';
import apiClient from "./interceptors"

export class MovimientoService {
    getmovimientos(): Promise<Array<Movimientos>> {
        return new Promise<Array<Movimientos>>((resolve, reject) => {
            apiClient.get("movimientos/")
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al obtener las movimientos: " + error.message))
                })
        })
    }
    getmovimiento(id: string): Promise<Movimientos> {
        return new Promise<Movimientos>((resolve, reject) => {
            apiClient.get("movimientos/" + id)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al obtener la movimiento: " + error.message))
                })
        })
    }
    getmovimientosByUserId(userId:number): Promise<Array<Movimientos>> {
        return new Promise<Array<Movimientos>>((resolve, reject) => {
            apiClient.get(`movimientos/usuario/${userId}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(new Error("Error al obtener las movimientos: " + error.message));
                });
        });
    }
    insertmovimiento(movimiento: Movimientos): Promise<Movimientos> {
        return new Promise<Movimientos>((resolve, reject) => {
            apiClient.post("movimientos/",movimiento)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la movimiento: " + error.message))
                })
        })
    }
    updatemovimiento(movimiento: Movimientos): Promise<Movimientos> {
        return new Promise<Movimientos>((resolve, reject) => {
            apiClient.put("movimientos/" + movimiento.id + "/", movimiento)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(new Error("Error al insertar la movimiento: " + error.message))
                })
        })
    }
    deletemovimiento(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            apiClient.delete("movimientos/" + id + '/')
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    reject(new Error("Error al eliminar la movimiento: " + error.message))
                })
        })
    }
}