import { Pat } from "./pat"
import { Patpim } from "./patpim"
import { Pim } from "./pim"
import { Croq } from "./croq"

export interface Pedido {
    nombre: string,
    fecha: string,
    hora: string,
    pollo: number,
    medio: boolean,
    muslo: number,
    pat: Pat,
    patpim: Patpim,
    pim: Pim,
    croq: Croq,
    pagado: boolean,
    total: number
}
