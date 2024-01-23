export const removeMask = (value: string) => {
  // expressão regular, primeiro parâmetro vai remover .(ponto) |(ou) -(infem), por ""(vazio)
  return value.replace(/\.|-/gm, "");
};
