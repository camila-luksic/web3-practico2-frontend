export function getUserIdFromToken(): number | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        return payload.user_id; // el user_id viene en el token
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

//me deja registrarme
//me deja hacer login
//me deja crear cuentas (el nro de cuenta me lo genero el back)
//me deja ver mis cuentas
//no me dejo crear cuenta sin usuaurio identificado
//me deja crear beneficiarios
//me deja ver beneficiarios
//me deja editar beneficiarios
//me deja eliminar beneficiarios
//me deja crear movimientos
//me deja ver movimientos
//me deja eliminar movimientos
//me deja editar movimientos
//los movimientos aumentan o reducen el saldo


//***FALTA */
//me falta arreglar lo de beneficiarios deberia mostrarme mis cuentas y todas las cuentas 
//me falta hacer transferencias 
//debo arreglar para que sea posible ver mis cuentas y todas
//falta cerrar sesion
//debo  checar las autorizaciones bien
//hacer que luzca mas bonito 

