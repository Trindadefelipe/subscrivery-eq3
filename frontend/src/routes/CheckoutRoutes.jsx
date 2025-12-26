import {Routes, Route, Navigate} from "react-router-dom";
import { ConfirmarDados } from "../pages/checkout/ConfirmarDados/ConfirmarDados";
import { EnderecoEntrega } from "../pages/checkout/EnderecoEntrega/EnderecoEntrega";
import { ResumoPedido } from "../pages/checkout/ResumoPedido/ResumoPedido";

export function CheckoutRoutes() {
    return (
        <Routes>
            <Route path="confirmar-dados" element={< ConfirmarDados/>}/>
            <Route path="endereco" element={< EnderecoEntrega/>}/>
            <Route path="pagamento" element={< ResumoPedido/>}/>

            <Route path="*" element={<Navigate to="/checkout/confirmar-dados"/>}/>
        </Routes>
    )
}