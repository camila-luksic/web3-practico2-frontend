export interface Cuenta {
    id: string;
    usuario_id?:number,
    nombreCompleto: string;
    ci: string;
    nroCuenta?: string;
    saldo: number;
}