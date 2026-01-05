
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface UserLocation {
  city: string; // Bairro ou Cidade (Ex: "Moema", "Alphaville", "São Paulo")
  state: string; // Fixo "SP"
  specialty?: string;
  lat?: number;
  lng?: number;
}

export const BRAZIL_STATES = ['SP'];

export const ZONES_SP = {
  'São Paulo (Geral)': ['São Paulo'],
  'Zona Sul (Perto de Mim)': ['Moema', 'Brooklin', 'Vila Mariana', 'Itaim Bibi', 'Campo Belo', 'Morumbi', 'Santo Amaro', 'Saúde', 'Jabaquara', 'Vila Olimpia', 'Interlagos', 'Ipiranga', 'Vila Nova Conceição', 'Campo Limpo'],
  'Zona Oeste (Perto de Mim)': ['Pinheiros', 'Lapa', 'Perdizes', 'Vila Madalena', 'Butantã', 'Barra Funda', 'Jardins', 'Alto de Pinheiros', 'Pompéia', 'Sumaré', 'Jaguaré', 'Vila Leopoldina'],
  'Zona Norte (Perto de Mim)': ['Santana', 'Tucuruvi', 'Casa Verde', 'Vila Maria', 'Limão', 'Freguesia do Ó', 'Parada Inglesa', 'Mandaqui', 'Tremembé', 'Brasilândia', 'Jaçanã'],
  'Zona Leste (Perto de Mim)': ['Tatuapé', 'Mooca', 'Anália Franco', 'Belém', 'Penha', 'Itaquera', 'Vila Prudente', 'Aricanduva', 'Brás', 'Vila Formosa', 'Sapopemba', 'Carrão'],
  'Centro (Perto de Mim)': ['Bela Vista', 'Consolação', 'República', 'Santa Cecília', 'Higienópolis', 'Liberdade', 'Cambuci', 'Bom Retiro', 'Sé'],
  'Grande SP (Cidades Próximas)': ['Alphaville', 'Barueri', 'Osasco', 'Guarulhos', 'Santo André', 'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema', 'Cotia', 'Taboão da Serra', 'Santana de Parnaíba', 'Mogi das Cruzes', 'Suzano']
};

export const CITIES_BY_STATE: Record<string, string[]> = {
  'SP': Object.values(ZONES_SP).flat().sort()
};

export const SPECIALTIES = [
  'Limpeza Pós-Obra',
  'Box de Vidro', // Mapeado do Search Console
  'Montagem de Móveis', // Mapeado do Search Console
  'Pintura Residencial', // Mapeado do Search Console
  'Limpeza de Piscina', // Mapeado do Search Console
  'Dedetização e Controle de Pragas',
  'Transporte de Entulho e Caçambas',
  'Instalador de Box de Vidro',
  'Instalador de Box para Banheiro',
  'Montador de Box em SP',
  'Instalador de Redes de Proteção',
  'Instalador de Persianas e Cortinas',
  'Instalador de Ar Condicionado',
  'Instalador de Varal de Teto',
  'Instalador de Papel de Parede',
  'Instalador de Drywall e Sancas',
  'Limpeza Pré-Mudança',
  'Desinsetização e Controle de Insetos',
  'Descupinização e Desratização',
  'Limpeza Técnica de Vidros e Fachadas',
  'Remoção de Resíduos de Construção',
  'Sanitização Pós-Reforma Profissional',
  'Limpeza Industrial Fina em SP'
];
