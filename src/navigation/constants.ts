import { Beneficiarios } from '../models/Beneficiarios';
import { Movimientos } from '../models/Movimientos';
import { Transferencia } from '../models/Transferencia';
export const URLS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    Cuentas: {
        LIST: '/cuentas',  
        CREATE: '/cuentas/create',
        EDIT: "/cuentas/:id",
        UPDATE: (id: string) => {
            return `/cuentas/${id}`
        }
    },
    Beneficiarios: {
        LIST: '/beneficiarios',
        CREATE: '/beneficiarios/create',
        EDIT: "/beneficiarios/:id",
        UPDATE: (id: string) => {
            return `/beneficiarios/${id}`
        }
    },
    Movimientos: {
        LIST: '/movimientos',
        CREATE: '/movimientos/create',
        EDIT: "/movimientos/:id",
        UPDATE: (id: string) => {
            return `/movimientos/${id}`
        }
    },
    Transferencias: {
        LIST: '/tranferencias',
        CREATE: '/trasnferencias/create',
        EDIT: "/transferencias/:id",
        UPDATE: (id: string) => {
            return `/transferencias/${id}`
        }
    }

}