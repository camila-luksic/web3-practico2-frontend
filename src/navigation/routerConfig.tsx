import { Routes, Route } from "react-router-dom";

import { URLS } from "./constants";
import { LoginForm } from "../pages/LoginForm";
import { RegisterForm } from "../pages/RegisterForm";
import CuentasList from "../pages/CuentasList";
import { CuentasForm } from "../pages/CuentasForm";
import { BeneficiariosForm } from "../pages/BeneficiarioForm";
import BeneficiariosList from "../pages/BeneficiarioList";
import { MovimientosForm } from "../pages/MovimientoForm";
import MovimientosList from "../pages/MovimientoList";
import { TransferenciaForm } from "../pages/TransferenciaForm";

const RouterConfig = () => {
    return (
        <Routes>
           
            <Route path={URLS.LOGIN} element={< LoginForm />} />
            <Route path={URLS.REGISTER} element={< RegisterForm />} />
            <Route path={URLS.HOME} element={< LoginForm />} />
            <Route path={URLS.Cuentas.CREATE} element={< CuentasForm />} />
            <Route path={URLS.Cuentas.EDIT} element={< CuentasForm />} />
            <Route path={URLS.Cuentas.LIST} element={< CuentasList />} />
            
            <Route path={URLS.Beneficiarios.LIST} element={< BeneficiariosList />} />
            <Route path={URLS.Beneficiarios.CREATE} element={< BeneficiariosForm />} />
            <Route path={URLS.Beneficiarios.EDIT} element={< BeneficiariosForm />} />
            <Route path={URLS.Movimientos.CREATE} element={< MovimientosForm />} />
            <Route path={URLS.Movimientos.LIST} element={< MovimientosList />} />
            <Route path={URLS.Movimientos.EDIT} element={< MovimientosForm />} />
            <Route path={URLS.Transferencias.CREATE} element={< TransferenciaForm />} />
           
           
        </Routes>
    );
}
export default RouterConfig;
