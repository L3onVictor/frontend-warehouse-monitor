import { Suspense } from "react";
import DispositivosClient from "./DispositivosClient";

export default function DispositivosPage() {

    return (
        <Suspense fallback={<div>Carregando dispositivos...</div>}>
            <DispositivosClient />
        </Suspense>
    );
}