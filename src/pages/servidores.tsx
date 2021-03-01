import type { GetStaticProps } from "next"
import { Servidor } from "../types/Servidor"

import debugDev from "../utils/debugDev"
import getResource from "../utils/getResource"
const debugNamespace = "Servidores"

interface ServidoresProps {
  servidores: Servidor[]
}

export default function Servidores({ servidores }: ServidoresProps) {
  return (
    <>
      <h1>Servidores</h1>
      <ul>
        {servidores.map(servidor => (
          <li key={servidor._id}>
            <img 
              src={`https://suap.ifrn.edu.br${servidor.url_foto_75x100}`} 
              alt={`Foto de ${servidor.nome}`} 
            />
            <h1>{servidor.nome} ({servidor.matricula})</h1>
            <ul>
              <li>Campus: {servidor.campus}</li>
              <li>Cargo: {servidor.cargo}</li>
              <li>Categoria: {servidor.categoria}</li>
              <li>Lattes: {servidor.curriculo_lattes}</li>
              <li>Disciplina: {servidor.disciplina_ingresso}</li>
              <li>Email: {servidor.email}</li>
              <li>Função: {servidor.funcao}</li>
              <li>Jornada: {servidor.jornada_trabalho}</li>
              <li>Setor SIAPE: {servidor.setor_siape}</li>
              <li>Setor SUAP: {servidor.setor_suap}</li>
              <li>Telefones: {servidor.telefones_institucionais}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { 
    SERVIDORES_URI_LIMIT_5, 
    SERVIDORES_URI_NO_LIMIT, 
    USE_LIMITS 
  } = process.env

  let forceUseLimits: boolean

  let useLimits: boolean = (forceUseLimits !== undefined)
    ? forceUseLimits
    : USE_LIMITS == "true"
  debugDev(debugNamespace, `Usar dados limitados: ${useLimits}`)
  
  const servidoresURI = (useLimits)? SERVIDORES_URI_LIMIT_5: SERVIDORES_URI_NO_LIMIT
  debugDev(debugNamespace, `servidores URI: ${servidoresURI}`)

  const servidores: Servidor[] = await getResource(useLimits, servidoresURI)
  const qntServidores = servidores.length;
  debugDev(debugNamespace, `Qnt de servidores capturados: ${qntServidores}`)

  return {
    props: {
      servidores
    },
    revalidate: 5
  }
}