import type { Project } from '../types';

export const projects: Project[] = [
    {
        slug: 'John',
        title: 'John (v2)',
        year: '2026',
        summary:
            'A ground-up rebuild of my portfolio, moving away from the Windows 95 desktop concept toward a modern, minimal design. Features an ASCII-art hover effect on a picture of me, a blog section linking out from selected work, and a whole bunch of neat stuff hidden on terminal (hint: press "/"!).',
        stack: ['TypeScript', 'React'],
        image: '/public/projects/john.png',
        postSlug: 'A masterclass on developing unnecessary software',
    },
    {
        slug: 'RWFM-72',
        title: 'Regional Wind Forecasting Model - 72 Hours (Final Year Project)',
        year: '2026',
        summary:
            'A deep learning model for regional short-range wind forecasting (24h → 72h) using multivariate meteorological fusion and spatiotemporal attention, extending MFWPN with temporal upsampling for 3-day forecast horizons. Paired with a full-stack dashboard (FastAPI + React/Mapbox) for visualising forecasts and generating wind farm operational recommendations.',
        stack: ['Python', 'PyTorch', 'Pandas', 'FastAPI', 'React', 'TypeScript'],
        href: 'https://github.com/jhtconner/RWFM-72',
        image: '/public/projects/rwfm-72.png',
    },
    {
        slug: 'vuln-resolver-bot',
        title: 'Vulnerability Resolver Bot (SWE intern @ CTM)',
        year: '2025',
        summary:
            'A bot that automatically detects, analyses, and fixes open\n' +
            'security vulnerabilities in company repositories on GitLab. The bot generates a fix and then prompts a Senior Software Engineer to\n' +
            'review the merge request in a slack channel before it is then merged in.',
        stack: ['Typescript', 'ChatGPT API', 'GitLab', 'Slack'],
        image: '/public/projects/ctm.png',
    },
    {
        slug: 'brightmind',
        title: 'BrightMind — Mental Health Platform (Univeristy Project)',
        year: '2025',
        summary:
            'Led full-stack development of a mental health platform providing curated resources to young people and underrepresented communities. Engineered a structured RESTful API for content management, user authentication, and personalised recommendations, with a relational database schema in H2 for user interactions and account data. Debugged and refactored AI-generated teammate contributions, cutting response times from 500ms to 200ms.',
        stack: ['Javascript', 'React', 'Java', 'Spring Boot', 'Spring H2', 'Maven'],
        image: '/public/projects/brightmind.png',
    },
    {
        slug: 'dotplot-hackathon',
        title: 'DotPlot Hackathon — Breast Cancer Patient Dashboard',
        year: '2024',
        summary:
            'Selected from 83 applicants for a Software & Data Engineering Accelerator with DotPlot, a MedTech company developing early-stage breast cancer detection devices. Built a patient data management and visualisation app with 3D lesion modelling to assist clinicians with detection, leading backend development.',
        stack: ['Python', 'Django', 'SQLite3', 'HTML', 'CSS', 'JavaScript'],
        href: 'https://github.com/jhtconner/DotPlotHackathon',
        image: '/public/projects/dotplot.png',
    },
    {
        slug: 'portfolio95',
        title: 'Portfolio95',
        year: '2024',
        summary:
            'My previous portfolio, a fully working Windows 95 desktop simulation in the browser, complete with draggable windows and a working file system. Retired in favour of a simpler, more accessible design, but kept online as an artefact.',
        stack: ['TypeScript', 'React'],
        href: 'https://github.com/jhtconner/Portfolio95',
        image: '/public/projects/portfolio95.png',
    },
];