export interface Transferencia {
    id: string;
    receptor_id: number;
    emisor_id: number;
    monto: number;
    fecha: string;
}