export interface CuentaPropia {
    id: number | string;
}
export interface Beneficiarios {
    id: string;
    usuario_id?:number
    nombreCompleto: string;
   cuenta_beneficiaria_id:string,
   cuenta_propia_id:string
   cuenta_propia?:CuentaPropia
   
}