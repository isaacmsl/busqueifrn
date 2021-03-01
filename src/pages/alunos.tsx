import type { GetStaticProps } from "next"

import debugDev from "../utils/debugDev"
import { Aluno } from "../types/Aluno"
import getResource from "../utils/getResource"
const debugNamespace = "Alunos"

interface AlunosProps {
  alunos: Aluno[]
}

export default function Alunos({ alunos }: AlunosProps) {
  return (
    <>
      <h1>Alunos</h1>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno._id}>
            <h1>{aluno.nome} ({aluno.matricula})</h1>
            <ul>
              <li>Curso: {aluno.curso}</li>
              <li>Campus: {aluno.campus}</li>
              <li>Cota MEC: {aluno.cota_mec}</li>
              <li>Cota SISTEC: {aluno.cota_sistec}</li>
              <li>Linha de pesquisa: {aluno.linha_pesquisa}</li>
              <li>Matrícula regular: {aluno.matricula_regular}</li>
              <li>Situação geral: {aluno.situacao}</li>
              <li>Situação sistêmica: {aluno.situacao_sistemica}</li>
              <li>Lattes: {aluno.curriculo_lattes}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { 
    ALUNOS_URI_LIMIT_5, 
    ALUNOS_URI_NO_LIMIT, 
    USE_LIMITS 
  } = process.env

  let forceUseLimits: boolean

  let useLimits: boolean = (forceUseLimits !== undefined)
    ? forceUseLimits
    : USE_LIMITS == "true"
  debugDev(debugNamespace, `Usar dados limitados: ${useLimits}`)
  
  const alunosURI = (useLimits)? ALUNOS_URI_LIMIT_5: ALUNOS_URI_NO_LIMIT
  debugDev(debugNamespace, `alunos URI: ${alunosURI}`)

  const alunos: Aluno[] = await getResource(useLimits, alunosURI)
  const qntAlunos = alunos.length;
  debugDev(debugNamespace, `Qnt de alunos capturados: ${qntAlunos}`)

  return {
    props: {
      alunos
    },
    revalidate: 5
  }
}