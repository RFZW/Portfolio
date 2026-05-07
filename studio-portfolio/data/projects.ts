export type Project = {
  name: string
  id: string
  type: string
  team: string
  noimages: number
  video: boolean
  overview: string

  tools: {
    [category: string]: string[]
  }

  features: string[]
  contributions: string[]
  challenges: string

  links?: {
    repo?: string
    live?: string
  }

  images: string[]
}

export const projects: Project[] = [
  {
    name: "Into the Bunker",
    id: "fyp",
    type: "Game",
    team: "Group",
    noimages: 6,
    video: true,

    overview: "A Roguelike Dungeon Crawler, where the players need to fight their way through randomly generated dungeons. The game revolves around the player being trapped in a bunker, with nowhere to go but down.",

    tools: {
      programming: ["C#"],
      framework: ["Unity"],
      developerTool: ["GitHub", "Visual Studio Code"],
      creative: ["Procreate"]
    },

    features: ["Randomly Generated Dungeons, from Layout to Enemies Type", "Simple Crafting System", "Various Weapons Type", "Character stat tracking", "Customized Asset Creation"],

    contributions: ["Planned gameplay loop and game mechanics", "Wrote Storyline and Character interactions Script and Dialogue", "In Charge of Documentation and Project Management", "Design Background Assets, Item, Material and Enemy Sprites and UI Elements"],

    challenges: "Had to manage multiple aspects of the project simultaneously, unable to fully implement all desired features.",

    links: {
    },

    images: ["/project1-1.png", "/project1-2.png"]
  },

  {
    name: "SG Election Web Application",
    id: "elec",
    type: "Web App",
    team: "Solo",
    noimages: 6,
    video: false,

    overview: "An online portal for Electoral Management. The application allows users to create and manage polls, track votes in real-time, and view past years election data.",

    tools: {
      programming: ["JavaScript", "TypeScript"],
      frontend: ["React", "Tailwind CSS"],
      backend: ["SQL", "MySQL Workbench"],
      developerTool: ["GitHub", "Postman", "Visual Studio Code"]
    },

    features: ["Create and manage polls", "Vote tracking", "Participate in polls", "Result analytics dashboard", "Historical election data"],

    contributions: ["Implemented backend API routes", "Design readable data layout for past result display", "Designed polling UI components", "Connected frontend to database", "Designed database schema to accommodate multiple polls and voting data while ensuring data integrity"],

    challenges: "Managing multiple databases, while taking consideration of the scalability and longevity of project, as well as ensuring data consistency and integrity during concurrent voting.",

    links: {
      repo: "https://github.com/RFZW/ElectionApp"
    },

    images: ["/project2-1.png", "/project2-2.png"]
  },

  {
    name: "Kanban Board Web Application",
    id: "DA",
    type: "Web App",
    team: "Group",
    noimages: 4,
    video: false,

    overview: "A Kanban Board application for managing tasks and workflows. Able to create cards and commenting, assigning and promoting tasks to team members.",

    tools: {
      programming: ["JavaScript", "TypeScript"],
      frontend: ["React", "Tailwind CSS", "Leaflet"],
      backend: ["SQL", "MySQL Workbench"],
      developerTool: [ "GitHub", "Postman", "Visual Studio Code"]
    },

    features: ["Create and manage Cards", "Commenting System", "Task Assignment", "Task Promotion", "Account Creation and Management", "Email Notification System"],

    contributions: ["Co-designed the Systema and Application Layout", "Implemented backend API routes", "Designed UI components for task management and commenting", "Connected frontend to database", "Implemented user authentication and email notification system"],

    challenges: "Working with a new tech stack and ensuring smooth integration between frontend and backend components, while also managing user authentication and real-time updates.",

    links: {
      repo: "https://github.com/RFZW/KanbanBoard"
    },

    images: ["/project2-1.png", "/project2-2.png"]
  },

  {
    name: "SG GPS Web Application",
    id: "GPS",
    type: "Web App",
    team: "Solo",
    noimages: 5,
    video: false,

    overview: "A GPS application for navigating and exploring locations in Singapore. Able to select desired routes and take road blockage into consideration for route planning.",

    tools: {
      programming: ["JavaScript", "TypeScript"],
      frontend: ["React", "Tailwind CSS", "Leaflet"],
      developerTool: ["GitHub", "Postman"]
    },

    features: ["View the Map of Singapore", "Select locations and type of Routes used in Calculation", "Plan routes between locations", "Add Blockage to the map and have it taken into consideration for route planning"],

    contributions: ["Implemented backend API routes", "Designed UI Layout", "Implemented route planning algorithm", "Connected frontend to backend services"],

    challenges: "Making the UI intuitive and user-friendly, while also ensuring the route planning algorithm is efficient and takes into account various factors such as traffic and road blockages.",

    links: {
      repo: "https://github.com/RFZW/RoutingApp"
    },

    images: ["/project2-1.png", "/project2-2.png"]
  },

  {
    name: "30 Days Web Game",
    id: "30days",
    type: "Game",
    team: "Solo",
    noimages: 3,
    video: false,

    overview: "A game about training to defeat your rival in 30 days. A Simple text-based RPG game, where the player can face different challenges daily to defeat their rival in a final battle at the end of 30 days.",

    tools: {
      programming: ["JavaScript", "TypeScript"],
      frontend: ["React", "Tailwind CSS"],
      developerTool: ["GitHub"],
      creative: ["Procreate"]
    },

    features: ["Random Event Generators", "Stats Tracking", "Multiple Endings", "Simple Battle System"],

    contributions: ["Implemented all aspects of the game, from designing the game mechanics to Asset Creation."],

    challenges: "Focusing on creating a easily maintainable codebase to practice proper coding practices, while also ensuring the game is engaging and enjoyable to play.",

    links: {
      repo: "https://github.com/RFZW/30Days_Game"
    },

    images: ["/project2-1.png", "/project2-2.png"]
  },

  {
    name: "MonTrain Web Game",
    id: "MT",
    type: "Game",
    team: "Solo",
    noimages: 4,
    video: false,

    overview: "A game about raising a monster. Bringing them to different location would raise its stats and evolve, unlocking newer forms if certain conditions are met. The game revolves around the player raising a monster and taking it to different locations to raise its stats and evolve it into newer forms.",

    tools: {
      programming: ["JavaScript", "TypeScript"],
      frontend: ["React", "Tailwind CSS"],
      developerTool: ["GitHub"],
      creative: ["Procreate"]
    },

    features: ["Customized Sprite, Background and Animation", "Stats Tracking", "Multiple Evolution Forms", "Different Locations to Explore"],

    contributions: ["Implemented all aspects of the game, from designing the game mechanics to Asset Creation."],

    challenges: "Managing Stats calculation and event occurrence simultaneously.",

    links: {
      repo: "https://github.com/RFZW/MonTrain_Game"
    },

    images: ["/project2-1.png", "/project2-2.png"]
  },

  {
    name: "Rising To the Top Web Game",
    id: "rttt",
    type: "Game",
    team: "Solo",
    noimages: 6,
    video: false,

    overview: "A game about a bubble growing bigger. A text-based simulation game, where the player can compete with other bubbles to assimilate them, while maintaining their sanity stat after merging",

    tools: {
      frontend: ["HTML"],
      backend: ["SQL", "MySQL Workbench"],
      framework: ["Twine"],
      creative: ["Procreate"]
    },

    features: ["Simple Merging Mechanic", "Stats Tracking", "Multiple Endings"],

    contributions: ["Implemented all aspects of the game, from designing the game mechanics to Asset Creation."],

    challenges: "Working within the time limit of 2 days for the game jam, while also ensuring the game is engaging and enjoyable to play.",

    links: {
    },

    images: ["/project2-1.png", "/project2-2.png"]
  }
]
