// Portfolio Content Configuration
// Edit this file to update your portfolio content easily

export const portfolioContent = {
    personal: {
        name: "Zaid Al Hamadani",
        title: "Full Stack Developer & 3D Web Enthusiast",
        tagline: "Building immersive digital experiences with modern web technologies"
    },
    
    about: {
        greeting: "Hello, I'm Zaid Al Hamadani! 👋",
        description: `I'm a passionate developer who loves creating innovative digital experiences. This 3D laptop interface is just one example of how I like to push creative boundaries in web development.

My journey in programming started with curiosity and has evolved into a passion for building interactive, user-friendly applications that solve real-world problems.`,
        motivation: "Innovation, creativity, and the endless possibilities of modern web technologies.",
        additionalInfo: `I specialize in creating unique user experiences that combine functionality with visual appeal. Whether it's a complex web application or an interactive 3D portfolio like this one, I believe in making technology both powerful and accessible.`
    },
    
    projects: [
        {
            id: 1,
            title: "🖥️ 3D Laptop Portfolio",
            description: "This interactive portfolio featuring a 3D laptop with a functional OS interface built using Three.js and modern web technologies.",
            technologies: ["Three.js", "JavaScript", "WebGL", "CSS3", "Webpack"],
            status: "Featured Project",
            details: "A unique approach to portfolio presentation combining 3D graphics with traditional UI elements."
        },
        {
            id: 2,
            title: "🚀 E-Commerce Platform",
            description: "A full-stack e-commerce solution with modern UI/UX and robust backend architecture.",
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
            status: "Live Project",
            details: "Complete shopping experience with user authentication, payment processing, and admin dashboard."
        },
        {
            id: 3,
            title: "📱 Task Management App",
            description: "A collaborative task management application with real-time updates and team features.",
            technologies: ["Vue.js", "Socket.io", "PostgreSQL", "Docker"],
            status: "In Development",
            details: "Real-time collaboration features with drag-and-drop interface and advanced filtering."
        },
        {
            id: 4,
            title: "🎮 WebGL Game Engine",
            description: "A lightweight game engine built from scratch using WebGL and modern JavaScript.",
            technologies: ["WebGL", "TypeScript", "Canvas API", "Web Audio API"],
            status: "Open Source",
            details: "Educational project showcasing low-level graphics programming and game development concepts."
        }
    ],
    
    skills: {
        frontend: {
            title: "Frontend Development",
            technologies: [
                "JavaScript (ES6+)",
                "Three.js & WebGL",
                "React & Vue.js",
                "CSS3 & SASS",
                "HTML5",
                "TypeScript",
                "Webpack & Vite"
            ]
        },
        backend: {
            title: "Backend Development",
            technologies: [
                "Node.js & Express",
                "Python & Django",
                "PostgreSQL & MongoDB",
                "RESTful APIs",
                "GraphQL",
                "Docker",
                "AWS & Cloud Services"
            ]
        },
        tools: {
            title: "Tools & Technologies",
            technologies: [
                "Git & GitHub",
                "Linux & Terminal",
                "3D Graphics & Blender",
                "UI/UX Design",
                "Performance Optimization",
                "Testing (Jest, Cypress)",
                "CI/CD Pipelines"
            ]
        }
    },
    
    contact: {
        intro: "Let's connect and create something amazing together!",
        methods: [
            {
                icon: "📧",
                title: "Email",
                value: "zaid.alhamadani@example.com",
                link: "mailto:zaid.alhamadani@example.com"
            },
            {
                icon: "💼",
                title: "LinkedIn",
                value: "linkedin.com/in/zaidalhamadani",
                link: "https://linkedin.com/in/zaidalhamadani"
            },
            {
                icon: "🐙",
                title: "GitHub",
                value: "github.com/zaidalhamadani",
                link: "https://github.com/zaidalhamadani"
            },
            {
                icon: "🐦",
                title: "Twitter",
                value: "@zaidalhamadani",
                link: "https://twitter.com/zaidalhamadani"
            },
            {
                icon: "🌐",
                title: "Portfolio",
                value: "zaidalhamadani.dev",
                link: "https://zaidalhamadani.dev"
            }
        ],
        availability: "Currently available for freelance projects and full-time opportunities."
    }
};
