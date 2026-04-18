export type DinoResult = 'trex' | 'diplodocus' | 'velociraptor' | 'stegosaurus' | 'pterodactyl';

export interface DinoProfile {
  name: string;
  emoji: string;
  description: string;
  colorClass: string;
  bgElementClass: string;
}

export const dinoProfiles: Record<DinoResult, DinoProfile> = {
  trex: {
    name: 'Тираннозавр',
    emoji: '🦖',
    description: 'Ты настоящий Король парка! Рожденный быть лидером, ты берешь от жизни максимум и ничего не боишься. Твоя кипучая энергия заряжает всех вокруг.',
    colorClass: 'text-red-600',
    bgElementClass: 'bg-red-100',
  },
  diplodocus: {
    name: 'Диплодок',
    emoji: '🦕',
    description: 'Добродушный и спокойный великан. Ты не любишь суету, ценишь домашний уют и вкусно поесть. Рядом с тобой всем спокойно и тепло.',
    colorClass: 'text-emerald-600',
    bgElementClass: 'bg-emerald-100',
  },
  velociraptor: {
    name: 'Велоцираптор',
    emoji: '🦎',
    description: 'Острый ум и быстрая реакция — твои главные фишки. Ты командный игрок, который всегда найдет нестандартное и хитрое решение любой проблемы.',
    colorClass: 'text-amber-500',
    bgElementClass: 'bg-amber-100',
  },
  stegosaurus: {
    name: 'Стегозавр',
    emoji: '🦏',
    description: 'Бронированный философ. Ты знаешь себе цену, крепко стоишь на ногах и способен защитить свои личные границы, если потребуется.',
    colorClass: 'text-cyan-600',
    bgElementClass: 'bg-cyan-100',
  },
  pterodactyl: {
    name: 'Птеродактиль',
    emoji: '🦅',
    description: 'Романтик и любитель свободы! Обожаешь путешествия, новые горизонты и всегда способен оценить ситуацию с высоты птичьего полета.',
    colorClass: 'text-indigo-500',
    bgElementClass: 'bg-indigo-100',
  }
};

export interface AnswerOption {
  text: string;
  points: Partial<Record<DinoResult, number>>;
}

export interface Question {
  question: string;
  options: AnswerOption[];
}

export const questions: Question[] = [
  {
    question: "Твой идеальный выходной — это...?",
    options: [
      { text: "Активный отдых: спорт и движение", points: { trex: 2, velociraptor: 1 } },
      { text: "Поваляться дома вкусно покушать", points: { diplodocus: 2 } },
      { text: "Поездка на природу, новые впечатления", points: { pterodactyl: 2 } },
      { text: "Спокойное время за любимым хобби", points: { stegosaurus: 2 } },
    ]
  },
  {
    question: "Какая еда тебе больше по душе?",
    options: [
      { text: "Обожаю мясные блюда, я хищник!", points: { trex: 2 } },
      { text: "Большой сочный салат или овощи", points: { diplodocus: 2 } },
      { text: "Я всеяден, главное чтобы было вкусно", points: { stegosaurus: 1 } },
      { text: "Что-то легкое на бегу", points: { velociraptor: 2, pterodactyl: 1 } },
    ]
  },
  {
    question: "Твоя роль в компании друзей?",
    options: [
      { text: "Лидер и заводила", points: { trex: 2 } },
      { text: "Генератор безумных идей", points: { velociraptor: 2 } },
      { text: "Спокойный слушатель и психолог", points: { diplodocus: 2 } },
      { text: "Голос разума и реалист", points: { stegosaurus: 2, pterodactyl: 1 } },
    ]
  },
  {
    question: "Если столкнешься с трудностями...",
    options: [
      { text: "Пойду напролом", points: { trex: 2 } },
      { text: "Найду хитрый обходной путь", points: { velociraptor: 2 } },
      { text: "Пережду бурю в стороне", points: { diplodocus: 2 } },
      { text: "Встану в защиту своих дел и интересов", points: { stegosaurus: 2 } },
    ]
  },
  {
    question: "Где бы ты предпочел жить?",
    options: [
      { text: "В самом центре шумного мегаполиса", points: { trex: 2 } },
      { text: "Загородом, ближе к лесу и природе", points: { diplodocus: 2, stegosaurus: 1 } },
      { text: "Высоко в горах или у моря", points: { pterodactyl: 2 } },
      { text: "Там, где классная команда тусовки", points: { velociraptor: 2 } },
    ]
  },
  {
    question: "Какая суперспособность твоя?",
    options: [
      { text: "Невероятная силища", points: { trex: 2 } },
      { text: "Суперскорость и интеллект", points: { velociraptor: 2 } },
      { text: "Способность летать", points: { pterodactyl: 2 } },
      { text: "Полная неуязвимость (как щит)", points: { stegosaurus: 2 } },
    ]
  },
  {
    question: "Что тебя больше всего раздражает?",
    options: [
      { text: "Когда мной пытаются командовать", points: { trex: 2 } },
      { text: "Когда люди медленно соображают", points: { velociraptor: 2 } },
      { text: "Когда заставляют куда-то бежать", points: { diplodocus: 2 } },
      { text: "Когда нарушают личное пространство", points: { stegosaurus: 2, pterodactyl: 1 } },
    ]
  }
];
