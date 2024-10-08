import { AuthButtonServer } from "../components/auth-button-server";
import {Button} from '@nextui-org/button'; 


export default function Login (){
    return (
        <section className = 'grid place-content-center min-h-screen '>
            <h1>
                Inicia Sesion en UNAHX
                <AuthButtonServer/>
            </h1>
        </section>
    )
}