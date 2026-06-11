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
  startDate: new Date(2025, 7, 31, 0, 0, 0), // 31 de Agosto de 2025

  // Configuração da Tela Inicial (Parte 1 do fluxo)
  intro: {
    title: "Relicário",
    artist: "Nando Reis, Cássia Eller",
    // Substitua pelo caminho da foto que você enviou em anexo
    imageUrl: "assets/1.webp" 
  },

  // Configuração da Música de Fundo
  music: {
    title: "Relicário",
    artist: "Nando Reis, Cássia Eller",
    // Trilha sonora (Coloque o arquivo MP3 da música na pasta assets)
    audioUrl: "assets/relicario.mp3",
    // Foto de capa do player de música (foto do casal)
    coverUrl: "assets/1.webp"
  },

  // Conquistas mostradas na tela inicial (badges)
  achievements: {
    total: 30,
    unlocked: 3,
    list: [
      { id: "infinity", icon: "✨", label: "Nossa Vibe" },
      { id: "photos", icon: "📸", label: "Boas Lembranças" },
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
      imageUrl: "assets/beijo.webp",
      gradient: "linear-gradient(135deg, #ff0055, #7a00ff)"
    },
    {
      id: "slide-connection",
      type: "connection",
      title: "Nossa Conexão",
      avatarUrl: "assets/1.webp",
      seasonText: "A nossa história começou num dia de inverno",
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
      imageUrl: "assets/new3.webp",
      gradient: "linear-gradient(135deg, #121212, #242424)"
    },
    {
      id: "slide-message",
      type: "message",
      title: "Mensagem especial",
      text: "Tudo ainda é muito novo, mas você já trouxe uma cor muito especial pros meus dias ❤️. E o melhor de tudo é que...",
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
        "É uma índia com colar",
        "A tarde linda que não quer se pôr",
        "Dançam as ilhas sobre o mar",
        "Sua cartilha tem o A de que cor?"
      ],
      imageUrl: "assets/estilo1.webp",
      gradient: "linear-gradient(135deg, #00b4db, #0083b0)"
    },
    {
      id: "slide-timeline",
      type: "timeline",
      title: "Nossa Jornada",
      subtitle: "Cada momento que nos trouxe até aqui.",
      events: [
        {
          date: "O Início de Tudo",
          description: "Onde nos conhecemos e o dia do nosso primeiro beijo",
          mediaUrl: "assets/onde-se-conhecemos.mp4",
          polaroidText: "Nosso primeiro beijo 🤍"
        },
        {
          date: "Nosso Primeiro Encontro",
          description: "O friozinho na barriga...",
          mediaUrl: "assets/primeiro-encontro1.webp",
          polaroidText: "Inesquecível"
        },
        {
          date: "Ainda no Primeiro Encontro",
          description: "Conversas e mais conexões",
          mediaUrl: "assets/primeiro-encontro2.webp",
          polaroidText: "Lindo dia"
        },
        {
          date: "Fim do Primeiro Encontro",
          description: "Já querendo o próximo",
          mediaUrl: "assets/primeiro-encontro3.webp",
          polaroidText: "🤍"
        }
      ],
      gradient: "linear-gradient(135deg, #242424, #121212)"
    },
    {
      id: "slide-album",
      type: "album",
      title: "Nosso Álbum",
      subtitle: "Toque na foto para folhear as nossas memórias",
      images: [
        "assets/new.webp",
        "assets/new2.webp",
        "assets/1.webp",
        "assets/beijo.webp",
        "assets/estilo1.webp",
        "assets/primeira-barraca.webp",
        "assets/primeira-rave.webp",
        "assets/primeira-rave2.webp",
        "assets/primeiro-carnaval.webp",
        "assets/primeiro-forro.webp",
        "assets/rave2.1.webp",
        "assets/rave2.3.webp",
        "assets/rave2.4.webp",
        "assets/IMG-20251103-WA0051.webp"
      ],
      gradient: "linear-gradient(135deg, #8A2387, #E94057, #F27121)"
    },
    {
      id: "slide-video-1",
      type: "video",
      title: "Aquele momento especial...",
      videoUrl: "assets/primeiro-encontro1.mp4",
      gradient: "linear-gradient(135deg, #111, #333)"
    },
    {
      id: "slide-video-2",
      type: "video",
      title: "A gente na rave",
      videoUrl: "assets/rave2.mp4",
      gradient: "linear-gradient(135deg, #1f4037, #99f2c8)"
    },
    {
      id: "slide-constellation",
      type: "constellation",
      title: "O céu quando nossos mundos colidiram 🌌🤍",
      location: "SÃO PAULO, SP, BRASIL",
      date: "01 DE JANEIRO DE 2026 - 20:00",
      coordinates: "23.5505°S 46.6333°W",
      imageUrl: "assets/halloween1.webp",
      gradient: "linear-gradient(135deg, #050510, #1a1a2e)"
    },
    {
      id: "slide-grid",
      type: "grid",
      title: "Algumas Memórias",
      subtitle: "De muitos e muitos momentos incríveis que já vivemos",
      images: [
        "assets/new4.webp",
        "assets/new5.webp",
        "assets/halloween2.webp",
        "assets/halloween3.webp",
        "assets/halloween1 (1).webp",
        "assets/primeira-rave.webp"
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
      imageUrl: "assets/primeiro-carnaval.webp",
      gradient: "linear-gradient(135deg, #1DB954, #191414)"
    },
    {
      id: "slide-letter",
      type: "letter",
      title: "Para você",
      letter: "Feliz Dia dos Namorados! A nossa história ainda está bem no começo, mas já tem me feito sorrir de um jeito muito diferente. Adoro as nossas conversas, as nossas risadas e a nossa vibe. Muito obrigado por ser essa companhia tão incrível e especial. Que venham mais momentos bons pra gente curtir juntos!",
      imageUrl: "assets/primeiro-forro.webp",
      gradient: "linear-gradient(135deg, #ff0844, #ffb199)"
    }
  ]
};
