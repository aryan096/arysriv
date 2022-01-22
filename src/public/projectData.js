export const projData = [
    {
        id: 1,
        title: 'Uttar Pradesh Panchayat Elections Data',
        description: 'Scraping UP State Election Commission Website and geolocating villages.',
        card_image: '/up_map.jpg',
        card_image_alt: 'UP SEC',
        content: 
        'To study the impact the political shocks from village level elections have on the patterns of hate speech on ShareChat - a huge Indian social media platform, I collected data about winners and runner-ups in the Uttar Pradesh 2015 and 2021 Panchayat Elections. I also geolocated the villages using Google Maps API. I scraped the data from ' + 
        'the [State Election Commission Website](http://sec.up.nic.in/site/DownloadCandidateFaDebt.aspx). ' + 
        'Each row (a candidate) contains data about the candidates name, income, criminal background, caste group, education, votes earned, votes percentage, and property value, along with the coordinates of the village.' +
        '\n\nI used Selenium for Python to do the scraping.' + 
        'The code for scraping and processing is in this [Github Repo](https://github.com/aryan096/Uttar-Pradesh-2015-2021-Panchayat-Candidates).' + 
        '\n\n[Link to the code](https://docs.google.com/spreadsheets/d/1N0ckOqUFFjrlGK6mWwV6mLplNetOrN03VyTtCFuQu8I/edit?usp=sharing).'
    },
    {
        id: 2,
        title: 'Situation Entity Type Classification Models',
        description: 'State-of-the-art models to classify clauses based on Genericity, Aspect, and Boundedness.',
        card_image: '/model_cover.png',
        card_image_alt: 'SE Type Models',
        content: 
        '## Overview \n' +
        'As part of a research group with Sloman Lab and Brown AI Lab, I created deep learning models to classify clauses by its genericity, aspect, and bounedness.' + 
        '\n\nAll the code for the project is in [this Github repo](https://github.com/BabakHemmatian/Marijuana_Legalization_Corpus_Study).' + 
        '\n\nSpecifically, the code I wrote to create and test the models is in [this Colab document](https://colab.research.google.com/drive/11AIYTZIahSm1uFrbTTGOSHaSKKxNmJ2G?usp=sharing).\n\n' + 
        '## Models \n' +
        '\n\nI trained models for classifying clauses\' **main referent**, **fundamental aspectual class**, and **boundedness**.' +
        '\n\n- Main referent - Is the thing that the clause is about specific, a particular entity, or generic, a class of entities? **(GENERIC or SPECIFIC)**' +
        '\n\n- Fundamental Aspectual Class - in regards to the main verb+modifiers, what category does that verb fall into in terms of how it works? **(DYNAMIC or STATIVE)**' + 
        '\n\n- Boundedness - Is the event being described bounded temporally? Is it described as having a starting point (left-hand boundary), an ending point (right-hand boundary), or both? **(BOUNDED or UNBOUNDED)**' +
        '\n## Results \n' + 
        'All three final models are (as of 30th August 2021) either novel, or state-of-the-art. The trained models are available [here](https://drive.google.com/drive/u/0/folders/17PjV5gPub15kSaHpw9JVP1SNpj1k3vK-).\n' +
        '- Genericity model; trained on Sitent and Reddit data; tested on Reddit data.\n' + 
        '![Genericity Metrics](/setype_models/genericity_metrics.png)\n\n' +
        '- Aspect model; trained on Sitent and Reddit data; tested on Reddit data.\n' + 
        '![Aspect Metrics](/setype_models/aspect_metrics.png)\n\n' +
        '- Boundedness model; trained on Reddit data; tested on Reddit data.\n' + 
        '![Boundedness Metrics](/setype_models/boundedness_metrics.png)' 
    },
    {
        id: 3,
        title: 'The Bird House',
        description: 'Building better community spaces and supporting local artists, creators, and innovators in Lucknow, India.',
        card_image: '/tbh/cover.png',
        card_image_alt: 'The Bird House',
        content:
        '## Coming soon... \n'  
    },
    {
        id: 4,
        title: 'Weenix Operating System',
        description: 'Implementation of the Weenix (wee-unix) OS Kernel.',
        card_image: '/weenix_cover.png',
        card_image_alt: 'Weenix OS',
        content:
        '## Overview \n' + 
        'In **Spring 2020**, my sophomore spring semester, I implemented the majority of an operating system kernel called "Weenix" as part of **CSCI1670: Operating Systems** course (and its optional half-credit lab **CSCI1690: Operating Systems Laboratory**) at Brown University. Because of COVID-19 and college campus closures, it was quite challenging to complete this project. I was able to finish the implementation with a week left! \n\n' +
        ' I worked on the following aspects of the kernel - \n' +
        '- **Procs**: Kernel threads, processes, and mutexes. \n' +
        '- **Drivers**: Device drivers for terminals, disks, and memory devices. \n' +
        '- **VFS (Virtual File System)**: Interface between the OS and file systems (RAMFS, VFS, and S5FS). \n' +
        '- **S5FS (System V File System)**: Implementation of the S5FS File System used on the original Unix FS. \n' +
        '- **VM (Virtual Memory)**: Virtual memory implementation to manage user address space, run user-level code, service system calls, and various other things to put all parts of the kernel together into a functioning operating system. Other functions include virtual memory mapping, handling page faults, memory management via anonymous objects and shadow objects, and the fork system call (along with others). \n' +
        '## Some Screenshots \n' + 
        '![Kshell](/weenix/list.png)' + 
        '*List of shell commands*' + 
        '![Kshell](/weenix/main.png)' + 
        '*Main screen*' + 
        '![Kshell](/weenix/kshell.png)' + 
        '*the kshell program in action*' + 
        '![Kshell](/weenix/tests.png)' + 
        '*Testing results for the file system*' 
    },
    {
        id: 5,
        title: 'Liszt-Comprehension',
        description: 'Generating classical-ish music using transformers.',
        card_image: '/liszt_cover.png',
        card_image_alt: 'Liszt Comprehension',
        content: 
        '## Overview \n' + 
        'As the final project for **Deep Learning (CS1470)**, I, along with three teammates, created a model to generate classical music (although, it sounded more jazzy in the end!). \n\n' +
        'You can find our devpost submission is [here](https://devpost.com/software/liszt-comprehension-r1q2pd)!\n\n' + 
        'You can find the album we dropped using our generated music [here](https://soundcloud.com/herbert-traub/sets/liszt-comprehension)!\n\n' + 
        'The github repo for the project is [here](https://github.com/aryan096/Liszt-Comprehension)!\n\n' + 
        '![Poster](/liszt_cover.png)\n' + 
        '*A poster with an in-depth overview of the project*'
    },
    {
        id: 6,
        title: 'Tracking the trackers',
        description: 'Visualizing tracker presence during browsing sessions using a modified Privacy Badger.',
        card_image: '/tracker_cover.png',
        card_image_alt: 'tracking the trackers',
        content:
        '## Overview \n' + 
        'As the research project for **Privacy Conscious Computer Systems (CS2390)** - a grad-level course in the CS department, I worked on creating a tool to help people better understand how they get tracked on the internet. I created a web-app using **React.JS** that visualized data about trackers collected using a version of **Privacy Badger** - an extension for Firefox and Google - that I modified. The visualizations were made using the **D3.js** library. \n\n' +
        'You can find the github repo [here](https://github.com/aryan096/PrivacyBadgerDataViz)!\n\n' + 
        'You can find the modified Privacy Badger [here](https://github.com/aryan096/privacybadger)!\n\n' + 
        'The final project report paper with more info is [here](/trackerviz/writeup.pdf)!\n\n' + 
        '![Homepage](/tracker_cover.png)\n' + 
        '*The homepage of the web-app*'
    },
    {
        id: 7,
        title: 'My Home That Day',
        description: 'A view of our home planet in the past.',
        card_image: '/myhomethatday.png',
        card_image_alt: 'myhomethatday',
        content:
        '## About this project\n'+ 
        'You can visit the website at [www.myhomethatday.com](http://www.myhomethatday.com/)!\n\n'+
        'I designed and created this website in collaboration with a friend (thanks, Niyo!). We planned out the design in **Figma**, decided on the technologies to use, and developed this website in a total of **~4 hours**!\n\n' + 
        'We used **Django** as our web framework, used the [EPIC API](https://api.nasa.gov/) from NASA, and hosted our website on a [Linode](https://www.linode.com).'
    },
    {
        id: 8,
        title: 'CIT Machine Status Web App',
        description: 'Solving the struggle to find an open machine in the CIT.',
        card_image: '/where2cit_cover.png',
        card_image_alt: 'CIT Machine Status',
        content:
        '# Coming soon...'
    },
];