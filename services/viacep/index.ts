import { viaCepApi } from '../viacep.api'
import { ViaCep } from './types'

interface GetCepRequest {
  cep: string
}
export async function GetCep({ cep }: GetCepRequest) {
  const { data } = await viaCepApi.get<ViaCep>(`/ws/${cep}/json`)

  return data
}
