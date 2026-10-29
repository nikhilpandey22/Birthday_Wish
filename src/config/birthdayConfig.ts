/**
 * Central Configuration for the Birthday Application
 * 
 * You can customize names, dates, messages, and photos right here!
 * Everything updates automatically across all pages.
 */

export interface RoseMessage {
  id: number;
  title: string;
  subtitle: string;
  message: string;
  icon?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isPreferred: boolean;
    feedback: string;
  }[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  alt: string;
}

export const BIRTHDAY_CONFIG = {
  // Personal Identifiers
  FRIEND_NAME: "Deepanshi",
  CREATOR_NAME: "Your Friend",
  BIRTHDAY_DATE: "30 October 2026",
  ALT_BIRTHDAY_NOTE: "30 September / 30 October",
  
  // App Branding
  APP_TITLE: "A White Rose for You",
  APP_SUBTITLE: "A little world created just to celebrate you.",

  // Opening Screen
  OPENING: {
    line1: "Some people make ordinary days feel a little more special.",
    line2: "So, I made a little something for you.",
    buttonText: "Open Your Little Surprise ✨",
  },

  // Celebration Screen
  CELEBRATION: {
    heading: "Happy Birthday! 🤍",
    subtitle: "May your life always have reasons to smile, dreams to chase, and beautiful moments to remember.",
    candleInstruction: "Tap the candle flame to make a wish & blow it out! 🎂🕯️",
    candleBlownMessage: "May every single wish you made today quietly come true. ✨🤍",
    nextButtonText: "There's More for You 🌹",
  },

  // Interactive White Rose Garden (8 Roses)
  ROSES: [
    {
      id: 1,
      title: "HAPPINESS",
      subtitle: "The First Rose",
      message: "I hope this new year of your life brings you countless reasons to smile. You deserve beautiful days and peaceful moments.",
    },
    {
      id: 2,
      title: "FRIENDSHIP",
      subtitle: "The Second Rose",
      message: "Some friendships become special without needing a label. I'm genuinely glad that we got to know each other.",
    },
    {
      id: 3,
      title: "TRUST",
      subtitle: "The Third Rose",
      message: "Good friendships are built on honesty, respect, and understanding. I hope we always keep these things between us.",
    },
    {
      id: 4,
      title: "LOYALTY",
      subtitle: "The Fourth Rose",
      message: "I don't know how long life's journeys last, but I believe in being genuine and loyal for as long as someone is part of my life.",
    },
    {
      id: 5,
      title: "LITTLE MOMENTS",
      subtitle: "The Fifth Rose",
      message: "Sometimes, it's the smallest conversations, random jokes, and ordinary moments that make a friendship memorable.",
    },
    {
      id: 6,
      title: "WISHES",
      subtitle: "The Sixth Rose",
      message: "May you achieve the things you dream about, find happiness in unexpected places, and always have the courage to be yourself.",
    },
    {
      id: 7,
      title: "A LITTLE REMINDER",
      subtitle: "The Seventh Rose",
      message: "Never forget that your happiness matters. Keep smiling, keep growing, and never stop being the person you want to become.",
    },
    {
      id: 8,
      title: "A FINAL WHITE ROSE",
      subtitle: "The Eighth Rose",
      message: "This rose has no expectations attached to it. It's simply a little reminder that someone is happy to have you in their life.",
    },
  ] as RoseMessage[],

  // Personal Letter
  LETTER: {
    salutation: "Hey, Birthday Girl! 🤍",
    paragraphs: [
      "Happy Birthday!",
      "I wanted to make something a little different for your birthday instead of sending just an ordinary message.",
      "Honestly, I'm really glad that we got to know each other. Life has its own unexpected ways of introducing people, and I'm happy that our paths crossed.",
      "I know that we're friends, and I genuinely respect that. Not every special connection needs a name or a promise. Sometimes, having someone to talk to, laugh with, share random things with, and make ordinary days a little better is special enough.",
      "I don't know how long our journey will last or what life has planned for us. But as long as we are part of each other's lives, I want to keep this friendship genuine, honest, and full of respect.",
      "No pressure, no expectations, and no complicated promises. Just a sincere wish that we continue to understand each other, support each other, and create some beautiful memories along the way.",
      "And yes, you should smile more, take care of yourself, follow your dreams, and never forget how much your happiness matters.",
      "May this year bring you peace, success, good health, lots of laughter, and countless beautiful surprises.",
      "This little white rose is just a small birthday gift from me to you.",
      "Happy Birthday once again!",
      "Stay happy, stay blessed, and always keep smiling.",
    ],
    signature: "— From a friend who is genuinely glad to have you in his life. 🤍🌹",
  },

  // Personal Photo Gallery
  GALLERY: {
    heading: "Little Moments, Happy Memories",
    subtitle: "Some moments are simple, but they still bring a smile.",
    photos: [
      {
        id: "photo-1",
        url: "/assets/aistudio/image_258b6a10.png",
        caption: "Shared smiles & lovely memories — keep that bright warmth shining always.",
        date: "Special Memory",
        alt: "Deepanshi and friend smiling together with playful butterfly filters",
      },
      {
        id: "photo-2",
        url: "/assets/aistudio/image_e73c4c34.png",
        caption: "Grateful for every gentle conversation and cheerful laugh.",
        date: "Cherished Moment",
        alt: "Deepanshi and friend smiling warmly in a gentle night light",
      },
    ] as GalleryPhoto[],
  },

  // Friendship Quiz
  QUIZ: {
    heading: "One Tiny Birthday Game 🎁",
    subtitle: "Three quick, playful questions — no pressure, just smiles!",
    questions: [
      {
        id: 1,
        question: "What makes a friendship special?",
        options: [
          {
            text: "Trust and respect.",
            isPreferred: true,
            feedback: "Spot on! Respect, honesty, and mutual trust are what truly last. 🤍",
          },
          {
            text: "Expensive gifts.",
            isPreferred: false,
            feedback: "Nice try, but true care and loyalty beat any gift in the world! ✨",
          },
          {
            text: "Talking only when needed.",
            isPreferred: false,
            feedback: "Checking in just because someone popped into your mind is much sweeter! 🌿",
          },
        ],
      },
      {
        id: 2,
        question: "What should you do on your birthday?",
        options: [
          {
            text: "Forget to smile.",
            isPreferred: false,
            feedback: "Definitely not allowed today! A smile is strictly mandatory today. 😊",
          },
          {
            text: "Enjoy your day and treat yourself kindly.",
            isPreferred: true,
            feedback: "Exactly right! Eat your favorite food, relax, and cherish yourself. 🎂",
          },
          {
            text: "Worry about everything.",
            isPreferred: false,
            feedback: "Put all worries on pause today — you deserve total peace. 🌸",
          },
        ],
      },
      {
        id: 3,
        question: "What does this white rose represent?",
        options: [
          {
            text: "Expectations.",
            isPreferred: false,
            feedback: "Zero expectations here, ever. Just pure genuine goodwill! 🤍",
          },
          {
            text: "A promise you must make.",
            isPreferred: false,
            feedback: "No conditions or promises required at all. Just friendship. 🕊️",
          },
          {
            text: "A sincere wish for happiness and a meaningful friendship.",
            isPreferred: true,
            feedback: "100% yes! Pure, honest wishes with genuine respect and gratitude. 🌹",
          },
        ],
      },
    ] as QuizQuestion[],
    completionHeading: "Birthday Game Completed! 🎉",
    completionMessage: "Your prize: one more reason to smile today.",
  },

  // Final Scene
  FINAL: {
    prompt: "One last little surprise?",
    buttonText: "Let the Rose Bloom 🌹",
    paragraphs: [
      "Some gifts are small, but the feelings behind them are genuine.",
      "I hope this little corner of the internet makes you smile today.",
      "Thank you for being a part of my journey, for the conversations, the laughter, and the little moments that make friendship special.",
      "No matter how busy life gets, I hope we always remember to be kind, honest, and respectful toward each other.",
      "This white rose is simply a birthday wish, a little happiness, and a reminder that I'm glad our paths crossed.",
    ],
    closing1: "Happy Birthday! 🤍🌹",
    closing2: "Keep smiling, birthday girl.",
  },
};
