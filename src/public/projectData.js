export const projData = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
        title: 'Tracking the trackers',
        description: 'Visualizing tracker presence during browsing sessions using a modified Privacy Badger.',
        card_image: '/tracker_cover.png',
        card_image_alt: 'tracking the trackers',
        content:
        '# Coming soon...'
    },
    {
        id: 4,
        title: 'My Home That Day',
        description: 'A view of our home planet in the past.',
        card_image: '/myhomethatday.png',
        card_image_alt: 'myhomethatday',
        content:
        '# Coming soon...'
    },
    {
        id: 5,
        title: 'CIT Machine Status Web App',
        description: 'Solving the struggle to find an open machine in the CIT.',
        card_image: '/where2cit_cover.png',
        card_image_alt: 'CIT Machine Status',
        content:
        '# Coming soon...'
    },
];