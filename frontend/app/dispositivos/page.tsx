import  DispositivoClient  from "./DispositivosClient";
import { Suspense } from "react";

export default function DispositivosPage() {

    return (
        <Suspense fallback={<div className="p-6">Carregando dispositivos...</div>}>
            <DispositivoClient />
        </Suspense>
    );
}