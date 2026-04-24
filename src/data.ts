export type DinoResult = 'trex' | 'diplodocus' | 'velociraptor' | 'stegosaurus' | 'pterodactyl';

export interface DinoProfile {
  name: string;
  emoji: string;
  description: string;
  colorClass: string;
  bgElementClass: string;
  imageUrl?: string; // Поле для вашей картинки
}

export const dinoProfiles: Record<DinoResult, DinoProfile> = {
  trex: {
    name: 'Тираннозавр',
    emoji: '🦖',
    description: 'Ты настоящий Король парка! Рожденный быть лидером, ты берешь от жизни максимум и ничего не боишься. Твоя кипучая энергия заряжает всех вокруг.',
    colorClass: 'text-red-600',
    bgElementClass: 'bg-red-100',
    imageUrl: 'https://i.ibb.co/RkZBTZND/trex-leader.png',
  },
  diplodocus: {
    name: 'Диплодок',
    emoji: '🦕',
    description: 'Добродушный и спокойный великан. Ты не любишь суету, ценишь домашний уют и вкусно поесть. Рядом с тобой всем спокойно и тепло.',
    colorClass: 'text-emerald-600',
    bgElementClass: 'bg-emerald-100',
    imageUrl: 'https://i.ibb.co/NgJPCwwr/diplodocus-homebody.png',
  },
  velociraptor: {
    name: 'Велоцираптор',
    emoji: '🦎',
    description: 'Острый ум и быстрая реакция — твои главные фишки. Ты командный игрок, который всегда найдет нестандартное и хитрое решение любой проблемы.',
    colorClass: 'text-amber-500',
    bgElementClass: 'bg-amber-100',
    imageUrl: 'https://i.ibb.co/cXCkNt7Z/velociraptor-clever.png',
  },
  stegosaurus: {
    name: 'Стегозавр',
    emoji: '🦏',
    description: 'Бронированный философ. Ты знаешь себе цену, крепко стоишь на ногах и способен защитить свои личные границы, если потребуется.',
    colorClass: 'text-cyan-600',
    bgElementClass: 'bg-cyan-100',
    imageUrl: 'https://i.ibb.co/LzZcGfT8/stegosaurus-guardian.png',
  },
  pterodactyl: {
    name: 'Птеродактиль',
    emoji: '🦅',
    description: 'Романтик и любитель свободы! Обожаешь путешествия, новые горизонты и всегда способен оценить ситуацию с высоты птичьего полета.',
    colorClass: 'text-indigo-500',
    bgElementClass: 'bg-indigo-100',
    imageUrl: 'https://i.ibb.co/4CH7sdQ/pterodactyl-free-spirit.png',
  }
};

export interface AnswerOption {
  text: string;
  points: Partial<Record<DinoResult, number>>;
}

export interface Question {
  question: string;
  options: AnswerOption[];
  imageUrl?: string; // Поле для картинки вопроса
}

export const questions: Question[] = [
  {
    question: "Твой идеальный выходной — это...?",
    imageUrl: 'https://i.ibb.co/ksw2mnfH/q1-ideal-weekend.png',
    options: [
      { text: "Активный отдых: спорт и движение", points: { trex: 2, velociraptor: 1 } },
      { text: "Поваляться дома вкусно покушать", points: { diplodocus: 2 } },
      { text: "Поездка на природу, новые впечатления", points: { pterodactyl: 2 } },
      { text: "Спокойное время за любимым хобби", points: { stegosaurus: 2 } },
    ]
  },
  {
    question: "Какая еда тебе больше по душе?",
    imageUrl: 'https://i.ibb.co/rKskvbbQ/q2-favorite-food.png',
    options: [
      { text: "Обожаю мясные блюда, я хищник!", points: { trex: 2 } },
      { text: "Большой сочный салат или овощи", points: { diplodocus: 2 } },
      { text: "Я всеяден, главное чтобы было вкусно", points: { stegosaurus: 1 } },
      { text: "Что-то легкое на бегу", points: { velociraptor: 2, pterodactyl: 1 } },
    ]
  },
  {
    question: "Твоя роль в компании друзей?",
    imageUrl: 'https://i.ibb.co/6SgM10S/q3-role-in-group.png',
    options: [
      { text: "Лидер и заводила", points: { trex: 2 } },
      { text: "Генератор безумных идей", points: { velociraptor: 2 } },
      { text: "Спокойный слушатель и психолог", points: { diplodocus: 2 } },
      { text: "Голос разума и реалист", points: { stegosaurus: 2, pterodactyl: 1 } },
    ]
  },
  {
    question: "Если столкнешься с трудностями...",
    imageUrl: 'https://i.ibb.co/Kcvgdg99/q4-dealing-with-difficulties.png',
    options: [
      { text: "Пойду напролом", points: { trex: 2 } },
      { text: "Найду хитрый обходной путь", points: { velociraptor: 2 } },
      { text: "Пережду бурю в стороне", points: { diplodocus: 2 } },
      { text: "Встану в защиту своих дел и интересов", points: { stegosaurus: 2 } },
    ]
  },
  {
    question: "Где бы ты предпочел жить?",
    imageUrl: 'https://i.ibb.co/5hxj8dmZ/q5-where-to-live.png',
    options: [
      { text: "В самом центре шумного мегаполиса", points: { trex: 2 } },
      { text: "Загородом, ближе к лесу и природе", points: { diplodocus: 2, stegosaurus: 1 } },
      { text: "Высоко в горах или у моря", points: { pterodactyl: 2 } },
      { text: "Там, где классная команда тусовки", points: { velociraptor: 2 } },
    ]
  },
  {
    question: "Какая суперспособность твоя?",
    imageUrl: 'https://i.ibb.co/9FMbpzB/q6-superpower.png',
    options: [
      { text: "Невероятная силища", points: { trex: 2 } },
      { text: "Суперскорость и интеллект", points: { velociraptor: 2 } },
      { text: "Способность летать", points: { pterodactyl: 2 } },
      { text: "Полная неуязвимость (как щит)", points: { stegosaurus: 2 } },
    ]
  },
  {
    question: "Что тебя больше всего раздражает?",
    imageUrl: 'https://i.ibb.co/YBJ5qJFk/q7-what-annoys.png',
    options: [
      { text: "Когда мной пытаются командовать", points: { trex: 2 } },
      { text: "Когда люди медленно соображают", points: { velociraptor: 2 } },
      { text: "Когда заставляют куда-то бежать", points: { diplodocus: 2 } },
      { text: "Когда нарушают личное пространство", points: { stegosaurus: 2, pterodactyl: 1 } },
    ]
  }
];
