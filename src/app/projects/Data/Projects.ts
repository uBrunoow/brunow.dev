import FirefightersImage from "@/public/firefighters.png";
import EzstartImage from "@/public/ezstart.png";
import CasaAmarelaImage from "@/public/casa-amarela.png";
import EstudoFacilImage from "@/public/estudo-facil.png";
import IngressoGospelImage from "@/public/ingresso-gospel.png";
import SmartsafeImage from "@/public/smartsafe.png";
import SenaiImage from "@/public/senai.png";
import AracajuImage from "@/public/aracaju.png";
import AlvaImage from "@/public/alva.png";
import EleganceImage from "@/public/elegance.png";
import EventsTablePlannerImage from "@/public/events-table-planner.png";
import CrewAiImage from "@/public/crew-ai.png";
import SortingAlgorihmsImage from "@/public/sorting-algorithms.png";
import TaskDoImage from "@/public/task-do.png";
import AskMeAnythingImage from "@/public/ask-me-anything.png";
import AskMeAnythingBackendImage from "@/public/ask-me-anything-backend.png";
import StringsImage from "@/public/strings.png";
import RepetitionStructureImage from "@/public/repetition-structure.png";
import EptranImage from "@/public/eptran.png";
import BoockstockImage from "@/public/bookstock.png";
import ConditionalStructureImage from "@/public/conditional-structure.png";
import NpmImage from "@/public/npm.png";
import ReactQueryImage from "@/public/react-query.png";
import NestJsImage from "@/public/nest-js.png";
import FlaskImage from "@/public/flask.png";
import NlwExpertReactJsImage from "@/public/nlw-expert-react-js.png";
import BunImage from "@/public/bun.png";
import MovieFlixImage from "@/public/movieflix.png";
import WeatherApiImage from "@/public/weather.png";
import TodoListImage from "@/public/todolist.png";
import BancoInterImage from "@/public/banco-inter.png";
import ShoppingCartImage from "@/public/shopping-cart.png";
import PokedexImage from "@/public/pokedex.png";
import NlwSpacetimeImage from "@/public/spacetime.png";
import PlaceholderImage from "@/public/placeholder.png";

import type { StaticImageData } from "next/image";
export interface IProject {
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
  github_link?: string;
  tags: string[];
  has_github?: boolean;
  has_website?: boolean;
}

export const DataProjects: IProject[] = [
  {
    title: "Firefighters App",
    description:
      "A full-stack website and app for NOAR firefighters (Nucleus of Air Operations and Rescue.) in order to automate its activities when carrying out a rescue.",
    link: "https://github.com/uBrunoow/sa-senai-bombeiros",
    github_link: "https://github.com/uBrunoow/sa-senai-bombeiros",
    image: FirefightersImage,
    has_github: true,
    has_website: false,
    tags: ["React", "React Native", "NextJS", "TypeScript"],
  },
  {
    title: "Ezstart",
    description:
      "EzStart is a platform designed for developers who want to quickly get started in the Linux environment.",
    link: "https://ezstart.vercel.app/",
    github_link: "https://github.com/uBrunoow/ezstart",
    image: EzstartImage,
    has_github: true,
    has_website: true,
    tags: ["React", "NextJS", "TypeScript"],
  },
  {
    title: "Estudo Fácil",
    description:
      "Estudo facil is a platform educational platform aiming to make learning fun and engaging.",
    link: "https://app.estudofacil.com.br/",
    image: EstudoFacilImage,
    has_github: false,
    has_website: true,
    tags: ["React", "NextJS", "TypeScript", "Python"],
  },
  {
    title: "Casa Amarela",
    description:
      "Casa Amarela is a fullstack website that involves the creation of services such as bathing and grooming, in addition to the veterinary office.",
    link: "https://homolog.casaamarela.top/",
    image: CasaAmarelaImage,
    has_github: false,
    has_website: true,
    tags: ["React", "NextJS", "TypeScript", "Python"],
  },
  {
    title: "Ingresso Gospel",
    description:
      "Ingressos Gospel is an online platform for ticket sales and event management focused on the gospel audience, connecting organizers and attendees with convenience and security.",
    link: "https://www.ingressogospel.com.br/",
    image: IngressoGospelImage,
    has_github: false,
    has_website: true,
    tags: ["React", "NextJS", "TypeScript", "Python"],
  },
  {
    title: "Smartsafe",
    description:
      "Smartsafe is a platform that offers security plans for mobile phones and screen protectors, allowing sellers to offer these services alongside device sales.",
    link: "https://assinatura.smartsafetech.com.br",
    image: SmartsafeImage,
    has_github: false,
    has_website: true,
    tags: ["React Native", "Expo", "TypeScript", "Python"],
  },
  {
    title: "Instituto Senai Dashboards",
    description:
      "The Instituto SENAI Dashboards is a platform that displays data graphs such as humidity and temperature, collected from an MQTT and stored in Django.",
    link: "https://dashfer.aupi.com.br/",
    image: SenaiImage,
    has_github: false,
    has_website: true,
    tags: ["React", "NextJS", "TypeScript", "Python"],
  },
  {
    title: "Aracaju",
    description:
      "Aracaju is a platform that allows users to register product application points in specific areas, with support for background use to track and record the user's route.",
    link: "#",
    image: AracajuImage,
    has_github: false,
    has_website: false,
    tags: ["React Native", "Expo", "TypeScript", "Python"],
  },
  {
    title: "Moveon",
    description:
      "Moveon is a platform where users can watch exercise videos and earn points as they participate in activities, encouraging a healthy lifestyle.",
    link: "#",
    image: PlaceholderImage,
    has_github: false,
    has_website: true,
    tags: ["React", "NextJS", "TypeScript", "Adonis"],
  },
  {
    title: "Alva Personal Care",
    description:
      "Alva Personal Care is an e-commerce company specializing in the sale of beauty products and natural cosmetics, promoting healthy and sustainable skincare.",
    link: "https://alvapersonalcare.com.br/",
    image: AlvaImage,
    has_github: false,
    has_website: true,
    tags: ["Shopify", "Liquid"],
  },
  {
    title: "Elegance",
    description:
      "Elegance All Curves is an e-commerce platform specializing in plus-size fashion, offering stylish and comfortable clothing for curvy individuals, promoting confidence and authenticity.",
    link: "https://www.eleganceallcurves.com.br/",
    image: EleganceImage,
    has_github: false,
    has_website: true,
    tags: ["Tray"],
  },
  {
    title: "Events Table Planner",
    description:
      "Events Table Planner is a project developed in C to manage events for a volleyball championship, allowing the CRUD operations of events, all done dynamically using real-time allocated memory.",
    link: "#",
    image: EventsTablePlannerImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/table-events",
    tags: ["C", "Dynamic Memory"],
  },
  {
    title: "Crew AI for Questions App",
    description:
      "This project was developed in Python using CREW AI, which allows you to create a question and define the correct answer. Based on this, the agents automatically generate false answers based on the question and the correct answer.",
    link: "#",
    image: CrewAiImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/crew-ai-for-questions-app",
    tags: ["Django", "Python", "Crew AI"],
  },
  {
    title: "Sorting Algorithm Visualizer",
    description:
      "Sorting Algorithms Visualizer is a C project that allows you to visualize and compare different types of sorting algorithms, making it easier to understand their functionality and performance through graphical representations.",
    link: "#",
    image: SortingAlgorihmsImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/sorting-algorithms",
    tags: ["C", "Sorting Algorithms"],
  },
  {
    title: "Task Do",
    description:
      "Task Do is a project developed in Rust using Diesel and Rocket, allowing the creation of a to-do list with features for managing users, tasks, and other operations.",
    link: "#",
    image: TaskDoImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/task-do",
    tags: ["Rust", "Task-do", "Diesel", "Rocket"],
  },
  {
    title: "NLW Ask me anything Frontend",
    description:
      "NLW Ask Me Anything is a project that allows the creation of interactive rooms where multiple people can participate, ask questions, and provide answers.",
    link: "#",
    image: AskMeAnythingImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/nlw-ask-me-anything-frontend",
    tags: ["React", "Vite", "TypeScript"],
  },
  {
    title: "NLW Ask me anything Backend",
    description:
      "NLW Ask Me Anything BACKEND is a project developed in Go using WebSockets, which allows the creation of interactive rooms where multiple people can participate in real-time.",
    link: "#",
    image: AskMeAnythingBackendImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/nlw-ask-me-anything-backend",
    tags: ["Go"],
  },
  {
    title: "Strings in C",
    description:
      "The objective of this work is to implement a program in C language to check if the string contains a valid CPF. The validation should be done according to the following rules.",
    link: "#",
    image: StringsImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/vectros-strings",
    tags: ["C", "Strings", "CPF"],
  },
  {
    title: "Repetition Structures in C Language",
    description:
      "Using the C language, write a program that calculates the LCM (Least Common Multiple) and GCD (Greatest Common Divisor) of a pair of positive integer values a and b.",
    link: "#",
    image: RepetitionStructureImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/repetition-structure-work-2",
    tags: ["C", "Repetition Structures", "LCM", "GCD"],
  },
  {
    title: "Eptran - Traffic Education Platform for Children and Adolescents",
    description:
      "Eptran is an educational platform aimed at children and adolescents, designed to teach traffic concepts in an interactive and playful way, promoting traffic safety from an early age.",
    link: "#",
    image: EptranImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/eptran-back-end",
    tags: ["React", "NextJS", "TypeScript", "Python"],
  },
  {
    title: "Bookstock - Bookstore Management System in Python Language",
    description:
      "Bookstock is a bookstore management system developed in Python, allowing efficient control of book inventory, sales registration, and customer information management.",
    link: "#",
    image: BoockstockImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/bookstock-back",
    tags: ["Django", "Python"],
  },
  {
    title: "Conditional Structures in C Language",
    description:
      "Algorithm that determines the day of the week based on the entered day, month, and year.",
    link: "#",
    image: ConditionalStructureImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/conditional-structure-work-1",
    tags: ["C", "Conditional Structures"],
  },
  {
    title: "Github actions NPM registery",
    description:
      "This is a repo that teachs how you can create your own npm package and publish in the npm for other users use your package.",
    link: "#",
    image: NpmImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/github-actions-for-npm-registery",
    tags: ["Github", "Javascript", "NPM", "Github-actions"],
  },
  {
    title: "React query to fetch data from an API in NextJS",
    description:
      "React Query to fetch data from an API in Next.js simplifies data fetching, caching, and synchronization, improving performance and developer experience in React applications.",
    link: "https://react-query-github-repos.vercel.app/",
    image: ReactQueryImage,
    has_github: true,
    has_website: true,
    github_link: "https://github.com/uBrunoow/react-query-github-repos",
    tags: ["React Query", "NextJS", "TypeScript", "React"],
  },
  {
    title:
      "NestJS with Prisma and PostgresSQL for API development in NodeJS and TypeScript language.",
    description:
      "NestJS with Prisma and PostgreSQL is a project for API development in Node.js and TypeScript, providing an efficient and scalable backend solution with seamless database integration.",
    link: "#",
    image: NestJsImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/nest-js-api",
    tags: ["NestJS", "Prisma", "TypeScript", "PostgreSQL"],
  },
  {
    title: "NLW Expert ReactJS",
    description:
      "NLW Expert ReactJS is a project for note creation, allowing users to record information both by text and voice command, offering convenience and flexibility.",
    link: "#",
    image: NlwExpertReactJsImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/nlw-expert-reactjs",
    tags: ["React", "NextJS", "TypeScript", "Python"],
  },
  {
    title: "NLW Expert Python",
    description:
      "NLW Expert Python is a project for barcode creation, using Python to generate and customize different barcode formats in a simple and efficient way.",
    link: "#",
    image: FlaskImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/nlw-expert-python",
    tags: ["React", "NextJS", "TypeScript", "Python"],
  },
  {
    title: "Bun API",
    description:
      "Bun API is a user login and registration management API, using JWT for authentication and security on the platform.",
    link: "#",
    image: BunImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/bunapi",
    tags: ["Bun", "JWT", "TypeScript"],
  },
  {
    title: "Movieflix API",
    description:
      "Movieflix API is a platform that allows access to descriptions of recent movies, using the IMDB API to get updated movie information.",
    link: "#",
    image: MovieFlixImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/movieflix-api",
    tags: ["React", "JavaScript", "NodeJS"],
  },
  {
    title: "Crud API",
    description:
      "It is a powerful CRUD (Create, Read, Update, Delete) application that allows users to perform basic data management operations. ",
    link: "#",
    image: PlaceholderImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/crud-api",
    tags: ["React", "NodeJS", "JavaScript", "CRUD"],
  },
  {
    title: "Weather API",
    description:
      " A weather-api using OpenWeatherApi and OpenCageData to make a Complete Weather App made with NextJS , Tailwindcss , TypeScript , React and a lot more ",
    link: "https://weather-api-ubrunoow.vercel.app/",
    image: WeatherApiImage,
    has_github: true,
    has_website: true,
    github_link: "https://github.com/uBrunoow/weather-api",
    tags: ["React", "Tailwdincss", "TypeScript", "Weather"],
  },
  {
    title: "Todo list",
    description: " A simple to-do list application to put in my portifolio ",
    link: "https://to-do-list-ebon-omega.vercel.app/",
    image: TodoListImage,
    has_github: true,
    has_website: true,
    github_link: "https://github.com/uBrunoow/To-Do-List",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Banco Inter replica",
    description:
      " A replica of the inter bank website to improve my skills with NextJS, Tailwind and a lot more ",
    link: "#",
    image: BancoInterImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/Banco-Inter",
    tags: ["React", "NextJS", "TypeScript", "Tailwindcss"],
  },
  {
    title: "Shopping Cart Mercado Livre Api",
    description:
      "  A site inspired by Mercado Livre made with React JSX, JavaScript and CSS ",
    link: "https://shopping-cart-ruby-three.vercel.app/",
    image: ShoppingCartImage,
    has_github: true,
    has_website: true,
    github_link: "https://github.com/uBrunoow/shopping-cart",
    tags: ["React", "Shopping Cart", "JavaScript"],
  },
  {
    title: "Pokedex API",
    description:
      " A Pokedex made with NextJs, Typescript ,Tailwindcss and React ",
    link: "https://pokedex-api-red.vercel.app/",
    image: PokedexImage,
    has_github: true,
    has_website: true,
    github_link: "https://github.com/uBrunoow/Pokedex-API",
    tags: ["React", "NextJS", "TypeScript", "Tailwindcss"],
  },
  {
    title: "NLW Spacetime",
    description:
      " A project done in a week of nlw-space-time, where it was made a spacetime capsule to store messages and send them to the future ",
    link: "#",
    image: NlwSpacetimeImage,
    has_github: true,
    has_website: false,
    github_link: "https://github.com/uBrunoow/nlw-spacetime",
    tags: ["React", "Nodejs", "React Native", "Fastify"],
  },
];
