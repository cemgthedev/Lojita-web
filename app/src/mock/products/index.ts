import { TProduct } from '@/types/TProduct';
import { variantsMock } from '../variants';
import { colorsMock } from '../variants/colors';
import { sizesMock } from '../variants/sizes';

export const productsMock: TProduct[] = [
  {
    id: 'p1',
    coverUrl: '/images/products/camisa-basica-vermelha.jpg',
    name: 'Camiseta Básica Vermelha',
    description:
      'Esta camiseta básica vermelha foi criada para quem busca estilo sem abrir mão do conforto no dia a dia. Confeccionada em 100% algodão, ela oferece toque macio, respirabilidade natural e durabilidade mesmo após diversas lavagens. Seu caimento levemente ajustado valoriza a silhueta de forma equilibrada, sem ser apertado ou desconfortável. O vermelho acrescenta personalidade ao visual, funcionando tanto como peça principal quanto como um detalhe vibrante em combinações com jaquetas, sobreposições ou camisas abertas. Ideal para rotinas casuais, trabalho informal, encontros, passeios, viagens e até treinos leves. Uma peça direta e essencial para quem gosta de simplicidade com impacto.',
    category: 'Vestuário',
    options: {
      colors: [colorsMock[0], colorsMock[3], colorsMock[4]],
      sizes: [sizesMock[0], sizesMock[1], sizesMock[2]],
    },
    variants: [variantsMock[0], variantsMock[1], variantsMock[2]],
    totalStock: 100,
    sellerId: 's1',
  },
  {
    id: 'p2',
    coverUrl: '/images/products/tenis-esportivo-roxo.jpg',
    name: 'Tênis Esportivo Roxo',
    description:
      'Este tênis esportivo roxo foi criado para entregar leveza, conforto e alta performance em qualquer atividade física. Seu design é arejado e pensado para reduzir o peso por passada, evitando desconfortos em treinos mais longos. A sola emborrachada foi projetada para oferecer boa aderência em diferentes tipos de piso, trazendo segurança tanto em academia quanto ao ar livre. A cor roxa traz personalidade ao visual esportivo sem exagero, sendo ideal para quem quer se destacar com estilo. Apesar de ser voltado para esportes, ele é confortável o suficiente para uso diário, caminhadas pela cidade, trabalho e tarefas do dia a dia. Um tênis prático e marcante para quem vive em movimento.',
    category: 'Calçados',
    options: { colors: [colorsMock[6]], sizes: [sizesMock[9]] },
    variants: [variantsMock[3]],
    totalStock: 10,
    sellerId: 's1',
  },
  {
    id: 'p3',
    coverUrl: '/images/products/camisa-basica-azul.jpg',
    name: 'Camiseta Azul Básica',
    description:
      'A Camiseta Azul Básica é uma peça que combina versatilidade com praticidade, perfeita para quem quer simplicidade e estilo ao mesmo tempo. Produzida em algodão leve, oferece alto nível de conforto térmico, sendo ótima para dias quentes ou ambientes de uso contínuo. O azul transmite equilíbrio, tranquilidade e elegância discreta, e combina facilmente com jeans, calças escuras, tons neutros e até cores mais vivas. Funciona sozinha ou como base para sobreposições, tornando-se um item bem flexível no guarda-roupa. Perfeita para ir à faculdade, trabalhar em ambiente casual, passear, viajar ou usar em compromissos informais. Uma peça funcional que não enjoa e não sai de moda.',
    category: 'Vestuário',
    options: { colors: [colorsMock[1]], sizes: [sizesMock[1]] },
    variants: [variantsMock[4]],
    totalStock: 20,
    sellerId: 's1',
  },
  {
    id: 'p4',
    coverUrl: '/images/products/camisa-basica-verde.jpg',
    name: 'Camiseta Verde Básica',
    description:
      'A Camiseta Verde Básica é ideal para quem quer fugir do óbvio com elegância. A tonalidade verde traz frescor, personalidade e uma estética moderna sem exageros. Seu tecido confortável permite uso prolongado durante o dia, mantendo toque agradável na pele. É uma alternativa perfeita para quem ainda quer um look clássico, mas deseja uma opção diferente do preto, branco ou cinza. Versátil para compor visuais casuais, minimalistas, urbanos e até mais sofisticados dependendo dos acessórios. Combina bem com tons terrosos, jeans claro, marrom, bege e calçados neutros. Perfeita para passeios, encontros, trabalho informal e rotina geral. Uma peça que adiciona charme sem esforço.',
    category: 'Vestuário',
    options: { colors: [colorsMock[2]], sizes: [sizesMock[2]] },
    variants: [variantsMock[5]],
    totalStock: 122,
    sellerId: 's1',
  },
  {
    id: 'p5',
    coverUrl: '/images/products/camisa-basica-preta.jpg',
    name: 'Camiseta Preta Clássica',
    description:
      'A Camiseta Preta Clássica é um dos itens mais versáteis e indispensáveis do guarda-roupa moderno. O preto combina com tudo, funciona em praticamente qualquer ambiente casual e nunca perde o estilo. Sua trama macia oferece conforto e boa durabilidade, sendo ótima para uso frequente. É perfeita para compor looks monocromáticos, combinações sofisticadas ou visuais mais urbanos e descontraídos. Pode ser usada com jeans, alfaiataria, tênis, botas, acessórios metálicos, jaquetas, sobretudos e camisas abertas. Uma camiseta preta de boa qualidade é como uma ferramenta curinga: resolve quase qualquer combinação de roupa com facilidade. Se existe uma peça realmente necessária e atemporal, é esta.',
    category: 'Vestuário',
    options: { colors: [colorsMock[3]], sizes: [sizesMock[0]] },
    variants: [variantsMock[6]],
    totalStock: 100,
    sellerId: 's1',
  },
  {
    id: 'p6',
    coverUrl: 'https://example.com/camiseta-branca.jpg',
    name: 'Camiseta Branca Clássica',
    description:
      'A Camiseta Branca Clássica é sinônimo de leveza e simplicidade refinada. Uma básica branca é uma das peças mais funcionais que existem: combina com qualquer cor, serve para qualquer ocasião informal e sempre cria um visual limpo e atual. Seu tecido confortável garante respirabilidade e frescor, sendo ideal para dias quentes ou para quem trabalha se movimentando bastante. É perfeita como base para sobreposições, permitindo usar com camisas abertas, jaquetas jeans, blazer casual, colete e até casacos mais pesados. A peça branca tem a vantagem de realçar cores em volta e trazer sensação de ordem e modernidade. Essencial, prática e sempre útil.',
    category: 'Vestuário',
    options: { colors: [colorsMock[4]], sizes: [sizesMock[1]] },
    variants: [variantsMock[7]],
    totalStock: 100,
    sellerId: 's1',
  },
];
