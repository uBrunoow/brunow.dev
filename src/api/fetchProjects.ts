import { api } from '@/lib/api'

const fetchProjects = async () => {
  try {
    const response = await api.get(`/users/uBrunoow/repos`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os projetos:', error)
    return []
  }
}

export default fetchProjects
