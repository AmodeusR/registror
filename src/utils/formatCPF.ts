export const formatCPF = (cpf: number) => {
  const StringifiedCpf = String(cpf);
  const parte1 = StringifiedCpf.slice(0, 3);
  const parte2 = StringifiedCpf.slice(3, 6);
  const parte3 = StringifiedCpf.slice(6, 9);
  const final = StringifiedCpf.slice(9, 12);

  const formattedCPF = `${parte1}.${parte2}.${parte3}-${final}`;

  return formattedCPF;
}