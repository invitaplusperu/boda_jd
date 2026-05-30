
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const weddingConfig = {
  siteTitle: 'Janeth & Dante | Nuestra boda',
  names: {
    bride: 'Janeth Pareja Araujo',
    groom: 'Dante David Huayta Mucha',
    display: 'Janeth & Dante',
    initials: 'J & D',
    monogram: 'J \u2665 D',
  },
  event: {
    isoDate: '2026-08-08T10:00:00-05:00',
    dateLabel: '08 de agosto de 2026',
    day: '08',
    month: 'Agosto',
    year: '2026',
    timezone: 'America/Lima',
  },
  intro: {
    kicker: 'Estas invitado a nuestra boda',
    headline: 'Nos Casamos',
    invitationText: 'Tenemos el agrado de invitarlos a nuestra boda',
  },
  cover: {
    eyebrow: 'NOS CASAMOS',
    primaryName: 'Janeth Pareja',
    secondaryName: 'Dante Huayta',
    dateLabel: '08 DE AGOSTO 2026',
  },
  quote: {
    text: 'El amor nunca se da por vencido, jamas pierde la fe, siempre tiene esperanza y se mantiene firme en toda circunstancia.',
    source: '1 Corintios 13:7',
  },
  blessing: {
    title: 'Con la bendicion de Dios y nuestros queridos padres',
    closingText: 'Nos complace invitarte a ser parte de este gran dia',
    brideParents: ['Teodoro Pareja Ayala', 'Gregoria Araujo Espinoza'],
    groomParents: ['Roberto Huaita Medina', 'Luzmila Mucha Curo'],
    godparents: {
      names: ['Armando Taipe Cardenas', 'Dina Morales Perez'],
    },
  },
  ceremonies: [
    {
      title: 'Ceremonia Religiosa y Civil',
      time: '10:00 am',
      place: 'Iglesia San Francisco',
      date: 'Sábado 8 de Agosto',
      address: 'Parque 4 de octubre',
      city: '',
      mapsUrl: 'https://maps.app.goo.gl/2CAn12AoUQqaVQwh9',
      image: asset('assets/img/foto_iglesia_dentro.png'),
      lottie: asset('assets/lottie/forest-church.json'),
    },
    {
      title: 'Luego sírvanse pasar a',
      time: '2:00 pm',
      place: 'Loza Deportiva Cesar Vallejo',
      date: 'Sábado 8 de Agosto',
      address: 'Ex Cuchipampa',
      city: '',
      mapsUrl: 'https://maps.app.goo.gl/2CAn12AoUQqaVQwh9',
      image: asset('assets/img/foto_salondebrindis.png'),
      lottie: asset('assets/lottie/Cheers.json'),
    },
  ],
  dressCode: {
    title: 'Dress Code',
    label: 'Elegante',
    note: 'Preparense para una boda llena de colores, dejen el blanco para la novia.',
    image: asset('assets/img/dress_code.png'),
  },
  timeline: [
    { time: '10:00 am', label: 'Ceremonia Religiosa y Civil' },
    { time: '3:00 pm', label: 'Brindis' },
    { time: '4:00 pm', label: 'Vals' },
    { time: '6:00 pm', label: 'Cena' },
    { time: '7:00 pm', label: 'Apertura de pista de baile' },
  ],
  timelineNote: 'Un instante pensado para disfrutar, compartir y celebrar juntos.',
  gifts: {
    intro: 'Tu presencia es nuestro mejor regalo',
    yapeNumber: '955724551',
    yapeImage: asset('assets/img/janeth_yape.png'),
    envelopeTitle: 'Lluvia de sobres',
    envelopeText:
      'Si deseas acompanarnos con un detalle adicional, recibiremos tu sobre con mucho carino.',
  },
  contact: {
    whatsappNumber: '51955724551',
    confirmText:
      'Hola, confirmo mi asistencia a la boda de Janeth y Dante. Mi nombre es:',
    songText: 'Hola, quiero sugerir esta cancion para la boda:',
  },
  images: {
    cover: asset('assets/img/foto_portada.png'),
    couple: asset('assets/img/foto_dante&janeth.png'),
    church: asset('assets/img/foto_iglesia_dentro.png'),
    venue: asset('assets/img/foto_salondebrindis.png'),
    floralGold: asset('assets/img/flor_color_dorado.png'),
    floralWine: asset('assets/img/flor_color_vino.png'),
    petalGold: asset('assets/img/petalo_color_dorado.png'),
    petalWine: asset('assets/img/petalo_color_vino.png'),
    separatorGold: asset('assets/img/separado_corazon_dorado.png'),
    separatorWine: asset('assets/img/separador_corazon_vino.png'),
  },
  gallery: [
    asset('assets/img/foto_dante&janeth.png'),
    asset('assets/img/foto_salondebrindis.png'),
    asset('assets/img/foto_dante&janeth.png'),
    asset('assets/img/foto_iglesia_dentro.png'),
    asset('assets/img/foto_dante&janeth.png'),
  ],
  music: {
    src: asset('assets/music/musica_vals_de_las_flores.mp3'),
    label: 'Presiona para escuchar nuestra cancion',
  },
  lotties: {
    floralDivider: asset('assets/lottie/flor.json'),
    heartDivider: asset('assets/lottie/heart.json'),
    galleryAccent: asset('assets/lottie/camera-copia-no-loop.json'),
    giftAccent: asset('assets/lottie/gift.json'),
    danceAccent: asset('assets/lottie/disco_ball.json'),
    footerAccent: asset('assets/lottie/separador_inferior_corazon_final.json'),
  },
};
