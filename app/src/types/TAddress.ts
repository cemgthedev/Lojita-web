export type TAddress = {
    name: string; // Nome (obrigatorio)
    uf?: string; // Unidade Federativa (opcional)
    city?: string; // Cidade (opcional)
    street?: string; // Rua (opcional)
    neighborhood?: string; // Bairro (opcional)
    number?: string; // Número (opcional)
    complement?: string; // Complemento (opcional)
    cep?: string; // CEP (opcional)
    linkMap?: string; // Link do mapa (opcional)
    enterpriseId?: number; // ID da empresa associada (opcional)
};