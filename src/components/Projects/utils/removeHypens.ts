const removeHyphens = (name: string) => {
  return name.replace(/-/g, ' ') // Substitui todos os hífens por espaços
}

export default removeHyphens
