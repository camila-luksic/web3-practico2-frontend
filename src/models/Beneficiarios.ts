export interface CuentaPropia {
    id: number | string; // El ID podría ser número o string, ajusta según tu backend
    // ... otras propiedades de la cuenta propia si las necesitas en la interfaz
}
export interface Beneficiarios {
    id: string;
    usuario_id?:number
    nombreCompleto: string;
   cuenta_beneficiaria_id:string,
   cuenta_propia_id:string
   cuenta_propia?:CuentaPropia
   
}