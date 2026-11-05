// Conteúdo das fichas da simulação (mesmo texto do PDF Fichas_Entrevista_Estagio.pdf)

export const vagas = [
  {
    letra: 'A',
    titulo: 'Estágio em Administração: Processos Administrativos',
    empresa: 'Integra Gestão',
    atividades:
      'organização de documentos, atualização de planilhas, acompanhamento de prazos e apoio às rotinas administrativas.',
    requisitos:
      'organização, atenção aos detalhes, conhecimentos básicos de Excel, responsabilidade e cumprimento de prazos.',
  },
  {
    letra: 'B',
    titulo: 'Estágio em Administração: Gestão Comercial e Relacionamento',
    empresa: 'Conecta Soluções',
    atividades:
      'atendimento a clientes, acompanhamento de indicadores comerciais, apoio à equipe de vendas e organização de informações.',
    requisitos:
      'comunicação clara, relacionamento interpessoal, iniciativa, trabalho em equipe e interesse pela área comercial.',
  },
  {
    letra: 'C',
    titulo: 'Estágio em Ciências Contábeis: Rotinas Contábeis e Fiscais',
    empresa: 'Prime Contabilidade',
    atividades:
      'organização de documentos fiscais, conferência de informações, lançamentos supervisionados e apoio às rotinas contábeis.',
    requisitos:
      'atenção aos detalhes, organização, responsabilidade, conhecimentos básicos de Contabilidade e disposição para aprender.',
  },
  {
    letra: 'D',
    titulo: 'Estágio em Ciências Contábeis: Controladoria e Análise Financeira',
    empresa: 'Nexus Consultoria',
    atividades:
      'atualização de planilhas, organização de dados financeiros, apoio na elaboração de relatórios e acompanhamento de indicadores.',
    requisitos:
      'raciocínio analítico, conhecimentos de Excel, interpretação de dados, organização e interesse por finanças.',
  },
];

export const fichaEntrevistador = {
  id: 'entrevistador',
  numero: 1,
  nome: 'Entrevistador',
  subtitulo: 'Simulação de Entrevista de Estágio',
  perguntas: [
    {
      titulo: 'Fale um pouco sobre você e sua trajetória.',
      observe: [
        'Apresenta sua formação e seus interesses profissionais.',
        'Menciona experiências, atividades acadêmicas ou habilidades relevantes.',
        'Organiza as informações de maneira clara e objetiva.',
      ],
    },
    {
      titulo: 'Por que você se candidatou a essa vaga?',
      observe: [
        'Demonstra que compreendeu as atividades e os requisitos da vaga.',
        'Relaciona seus interesses e objetivos à oportunidade.',
        'Explica o que gostaria de aprender ou desenvolver.',
      ],
    },
    {
      titulo: 'Por que deveríamos contratar você?',
      observe: [
        'Identifica competências relacionadas aos requisitos da vaga.',
        'Apresenta exemplos que demonstrem essas competências.',
        'Reconhece suas possibilidades de contribuição e desenvolvimento.',
      ],
    },
  ],
  postura: [
    'Clareza e organização das respostas.',
    'Linguagem adequada ao contexto profissional.',
    'Coerência entre habilidades mencionadas e exemplos apresentados.',
    'Escuta atenta e respeito ao momento de fala.',
    'Cordialidade e demonstração de interesse.',
  ],
};

export const fichaEntrevistado = {
  id: 'entrevistado',
  numero: 2,
  nome: 'Entrevistado',
  subtitulo: 'Preparação para Entrevista de Estágio',
  perguntas: [
    {
      titulo: 'Fale um pouco sobre você e sua trajetória.',
      pense: 'Pense em três aspectos:',
      dicas: [
        'Qual é sua formação atual?',
        'Quais experiências, projetos ou habilidades já desenvolveu?',
        'Quais áreas despertam seu interesse profissional?',
      ],
      campo: 'Minha formação, experiências e interesses:',
    },
    {
      titulo: 'Por que você se candidatou a essa vaga?',
      pense: 'Pense:',
      dicas: [
        'O que chamou sua atenção nas atividades da vaga?',
        'Quais requisitos se relacionam com suas habilidades ou conhecimentos?',
        'O que você gostaria de aprender nessa oportunidade?',
      ],
      campo: 'O que me conecta a essa vaga:',
    },
    {
      titulo: 'Por que deveríamos contratar você?',
      pense: 'Pense:',
      dicas: [
        'Quais competências você possui que podem contribuir para a função?',
        'Em qual situação você já demonstrou alguma dessas competências?',
        'Como você poderia contribuir e se desenvolver na empresa?',
      ],
      campo: 'Uma habilidade minha e um exemplo que a demonstra:',
    },
  ],
  dicasEntrevista: [
    'Cumprimente o entrevistador com cordialidade.',
    'Escute a pergunta até o final antes de responder.',
    'Fale de maneira clara, organizada e respeitosa.',
    'Relacione suas respostas aos requisitos da vaga.',
    'Utilize exemplos verdadeiros, inclusive de experiências acadêmicas.',
    'Demonstre interesse e disposição para aprender.',
    'Se precisar, faça uma pausa para pensar antes de responder.',
    'Seja honesto sobre seus conhecimentos e experiências.',
  ],
};
