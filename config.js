/**
 * CONFIGURAÇÃO DA RETROSPECTIVA DO CASAL
 * 
 * Você pode alterar as informações abaixo para personalizar o site.
 * As fotos usam links do Unsplash como demonstração. Você pode substituí-los
 * por fotos locais (ex: 'assets/foto1.jpg') ou outros links de imagem.
 */

window.COUPLE_CONFIG = {
  // Nomes do casal
  partner1: "Guilherme",
  partner2: "Thalia",

  // Data de início do relacionamento (Ano, Mês [0-11], Dia, Hora, Minuto)
  // Exemplo: 12 de Junho de 2024 às 20:00 -> new Date(2024, 5, 12, 20, 0)
  // Nota: O mês no JavaScript começa do 0 (Janeiro = 0, Dezembro = 11)
  startDate: new Date(2026, 0, 1, 0, 0, 0), // 1º de Janeiro de 2026

  // Configuração da Tela Inicial (Parte 1 do fluxo)
  intro: {
    title: "Relicário",
    artist: "Nando Reis, Cássia Eller",
    // Substitua pelo caminho da foto que você enviou em anexo
    imageUrl: "assets/1.jpeg" 
  },

  // Configuração da Música de Fundo
  music: {
    title: "Relicário",
    artist: "Nando Reis, Cássia Eller",
    // Trilha sonora (Coloque o arquivo MP3 da música na pasta assets)
    audioUrl: "assets/relicario.mp3",
    // Foto de capa do player de música (foto do casal)
    coverUrl: "1.jpeg"
  },

  // Conquistas mostradas na tela inicial (badges)
  achievements: {
    total: 30,
    unlocked: 3,
    list: [
      { id: "infinity", icon: "∞", label: "Amor Infinito" },
      { id: "photos", icon: "📸", label: "1000+ Fotos" },
      { id: "music", icon: "🎵", label: "Nossa Trilha" }
    ]
  },

  // Removido o bloco landing, movido para slides

  // Conteúdo dos Stories (slides da retrospectiva)
  // Cada slide pode ter tipos diferentes: 'cover', 'counter', 'player', 'lyrics', 'grid', 'letter', 'connection', 'message', 'timeline', 'constellation', 'roulette'
  slides: [
    {
      id: "slide-cover",
      type: "cover",
      title: "Nossa Retrospectiva",
      subtitle: "Prepare-se para reviver os nossos melhores momentos juntos...",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
      gradient: "linear-gradient(135deg, #ff0055, #7a00ff)"
    },
    {
      id: "slide-connection",
      type: "connection",
      title: "Nossa Conexão",
      avatarUrl: "1.jpeg",
      seasonText: "O nosso amor começou no Verão e já durou 20 estações",
      specialDateText: "12 de Fevereiro",
      totalDays: "1843",
      topPercentage: "Top 14% dos casais no mundo",
      gradient: "linear-gradient(135deg, #181818, #121212)"
    },
    {
      id: "slide-counter",
      type: "counter",
      title: "Sobre o casal",
      subtitle: "Cada segundo ao seu lado é especial",
      imageUrl: "https://images.unsplash.com/photo-1533228894174-a74cb35099ac?q=80&w=600&auto=format&fit=crop",
      gradient: "linear-gradient(135deg, #121212, #242424)"
    },
    {
      id: "slide-message",
      type: "message",
      title: "Mensagem especial",
      text: "Você é o amor da minha vida e a pessoa que me faz querer ser melhor a cada novo dia ❤️. Mais do que tudo...",
      gradient: "linear-gradient(135deg, #d32f2f, #9a0007)"
    },
    {
      id: "slide-player",
      type: "player",
      title: "A nossa música",
      subtitle: "A trilha sonora oficial de nós dois",
      gradient: "linear-gradient(135deg, #700b70, #1b021b)"
    },
    {
      id: "slide-lyrics",
      type: "lyrics",
      title: "Nossa Canção",
      lyrics: [
        "Se for pra ser com você",
        "Eu topo qualquer parada",
        "Te amo de janeiro a janeiro",
        "Até o fim da nossa estrada..."
      ],
      imageUrl: "https://images.unsplash.com/photo-1494972308805-463bc619b34e?q=80&w=600&auto=format&fit=crop",
      gradient: "linear-gradient(135deg, #00b4db, #0083b0)"
    },
    {
      id: "slide-timeline",
      type: "timeline",
      title: "Nossa Jornada",
      subtitle: "Cada momento que nos trouxe até aqui.",
      events: [
        {
          date: "Janeiro 2023",
          description: "Nosso primeiro beijo",
          mediaUrl: "1.jpeg", // Pode ser .jpg, .png ou .mp4
          polaroidText: "Eu te amo! 🤍"
        },
        {
          date: "Julho 2023",
          description: "Saindo domingo à tarde, apenas para ficar juntos",
          mediaUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop",
          polaroidText: "Momentos inesquecíveis"
        },
        {
          date: "12/03/2024",
          description: "Nosso dia! 🤍",
          mediaUrl: "video_exemplo.mp4", // Exemplo de vídeo .mp4
          polaroidText: "Aniversário de namoro 🤍🎉"
        }
      ],
      gradient: "linear-gradient(135deg, #242424, #121212)"
    },
    {
      id: "slide-constellation",
      type: "constellation",
      title: "O céu quando nossos mundos colidiram 🌌🤍",
      location: "SÃO PAULO, SP, BRASIL",
      date: "01 DE JANEIRO DE 2026 - 20:00",
      coordinates: "23.5505°S 46.6333°W",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
      gradient: "linear-gradient(135deg, #050510, #1a1a2e)"
    },
    {
      id: "slide-grid",
      type: "grid",
      title: "Algumas Memórias",
      subtitle: "De muitos e muitos momentos incríveis que já vivemos",
      images: [
        "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop"
      ],
      gradient: "linear-gradient(135deg, #11998e, #38ef7d)"
    },
    {
      id: "slide-roulette",
      type: "roulette",
      title: "Para onde vamos sair Hoje?",
      options: [
        "Restaurante",
        "Motel",
        "Parque",
        "Cinema",
        "Sushi",
        "Shopping"
      ],
      gradient: "linear-gradient(135deg, #181818, #000000)"
    },
    {
      id: "slide-playlist",
      type: "playlist",
      title: "Nossa Playlist",
      subtitle: "A trilha sonora da nossa história",
      playlistUrl: "https://open.spotify.com/playlist/1VRGtmlgSjqCywzK4XTRXX?si=0d80e1032f8347c9",
      imageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop",
      gradient: "linear-gradient(135deg, #1DB954, #191414)"
    },
    {
      id: "slide-letter",
      type: "letter",
      title: "Para você, com amor",
      letter: "Feliz Dia dos Namorados! Minha vida ficou muito mais colorida e cheia de amor desde que você chegou. Cada sorriso compartilhado, cada conversa boba e cada momento de apoio mútuo me faz ter certeza de que quero passar o resto dos meus dias ao seu lado. Obrigado por ser minha parceira de vida, minha melhor amiga e meu grande amor. Eu te amo muito!",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
      gradient: "linear-gradient(135deg, #ff0844, #ffb199)"
    }
  ]
};
