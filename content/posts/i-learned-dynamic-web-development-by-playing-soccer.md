# I learned Dynamic Web Development by playing Soccer

Sports-wise, I am a late bloomer. Indeed, I started to practice regularly when I was about 16 years old. I use to just not enjoy it, and I cannot blame my parents as they tried to enroll me in many occupations such as soccer, rock-climbing, table tennis and fencing. Anyhow, I now appreciate athletics a lot, I began my journey by getting in shape with weightlifting, then endurance training, i.e., jogging. Retrospectively, I commenced to love physical activity when I acquired a minimal fitness level, which was somewhat awkward to land. As a kid, I did not push my comfort zone too much.

At university, I kept my fitness activity to fundamental exercise, which eventually led me to trail running, [as you may know](/blog/ultralight-trekking-the-gr54-185km-in-5-days). Upon saying goodbye to my student life, I looked into team sports. Soccer specifically, as I had been a fan for several years.

## Starting late

Thus, I looked for soccer games and joined some via via. I realized that ball touch is difficult, and requires practice. I would often contest with folks who had been playing for many years, typically back in high school, and bringing something to the team was… hard. Luckily, I had my cardio and strength to leverage. I also rehearsed some drills alone.

![Practicing a rainbow](/img/posts/soccer-react/rainbow.gif) <!-- {.center} -->

After a while, I wanted to join a club and I learned about a Brussels-based amateur league, named ABSSA, which means _Belgian Association of Saturday Sports_. Eventually, I found a team to play with, and my immediate response was to block all the games’ times in my calendar, so I would make sure to attend and not double book anything else.

## Scraping ABSSA’s website

The league’s schedule is available on its website, so I could have just browsed it to log all my games but why do it manually when you can automate it? Playing a bit with the inspect tool of my navigator, I noticed that the internet site would probably be scrapable, i.e., extracting its information. I also noted that to have all the data about a specific match, I would need to visit several different page of the website, one for the game time, one for the field name, and another one for the field location. Something annoying to do manually but easy to code.

Hence, I opened my favorite editor and made a prototype to:

1. Scrap the info on the website
2. Combine them into an iCal file that I could import in my agenda

I quickly got a suitable result with Python and a couple of libraries. This tool started as a _Jupyter Notebook_ then moved to structured class and was just refactored in a data pipeline using _Kedro_. This project is [open sourced on GitHub](https://github.com/simonpicard/abssa-ical).

## Publishing those calendars

The cool thing with automating a process, is that it is scalable. I had developed that calendar maker for my team, yet I could now also generate the schedules for every single team, as the logic was the same. And there is 258 of them. How should I make those calendars available to anyone? I could share a drive folder with all the iCal files but the user experience would not be great and it would limit its reach to minimal tech-savvy players.

What if I build a simple website where a user would search for its team, see all its fixtures and have the option to add the schedule to its agenda? Hmm.. Should I develop it, it would look something like this…

![An early sketch of calabssa](/img/posts/soccer-react/calabssa-sketch.png) <!-- {.center} -->

## Project based learning

As I shared in [my very first blog post](/blog/i-have-been-coding-for-more-than-15-years-but-never-in-javascript), I recently decided to get into web development, to add such new string to my bow. This personal blog is an initial step into this direction, but this internet site is fully static, meaning that its content will always be the same, regardless of the action you do on it. For my calendar sharing app, I would like the search bar to have an autocomplete function. Its suggestions will obviously depend on what the user types in it. Thus, a static website is not preferred, and it’s the occasion for me to learn a new tech!

I am about to create a web app with _client side rendering_ using _JavaScript_. Different frameworks exist for such need, and your first call is to select the one you will apply. I like to make my decisions data driven and, luckily for me, there are large surveys being rolled out on _JavaScript_ technologies by the [State of _JavaScript_](https://stateofjs.com/en-us/). Let’s look at the latest results for front-end frameworks:

![Front-end framework satisfaction ranking](/img/posts/soccer-react/front_end_frameworks_experience_ranking.png) <!-- {.center} -->

For my first front-end development experience, I would like to master a technology which is standard and well appreciated. Filtering out _Solid_ and _Svelte_ which are too recent, in my opinion, _React_ is ranking top.

Hence, I went on and learned _React_. I started by its [tutorial](https://reactjs.org/tutorial/tutorial.html) then dived straight into trying to create my project. A week later, I am happy to share my very first dynamic web app: [calabssa.be](https://calabssa.be/?ref=simonmyway).

![CalABSSA screenshot](/img/posts/soccer-react/calabssa.png) <!-- {.center} -->

Looks pretty much like the original design, right? Check the code on [GitHub](https://github.com/simonpicard/calabssa.be).

## Welcome Twitch!

While embarking on my _React_ apprenticeship, I reckoned that it would be cool to document my learning process. How would I tackle acquiring a new tech skills? To that end I decided to live-stream my desktop while working on the project and think out loud. I have been streaming on [Twitch](https://www.twitch.tv/simonmyway) and it’s fun, feel free to follow [my channel](https://www.twitch.tv/simonmyway) as I intend to keep broadcasting! Family and friends were my main audience but some strangers passed by too, leading to some unexpected exchanges.

I started by sharing my web development effort but it was pretty hard to explain what I am doing while deeply focusing on understanding the new technology. Once I landed a first working prototype for my web app, I went back to the calendar creation to improve it. I fully streamed refactoring it to a _Kedro_ pipeline, and the cool thing with lives is that you get a replay, which I combined and published on YouTube:

[![Sustainable data pipeline development](/img/posts/soccer-react/kedro_min-overlay.png)](https://www.youtube.com/watch?v=uJE9NGaU_pk)<!-- {.center} -->

## Lessons learned

Developing website is exciting as you get a direct feedback. Indeed, as soon as you hit save on your editor, you will see your web page update itself and view its result live. This is very different from data project, my main skill. For those, the outcome of your work at typically less tangible as they are more research oriented. You will get a number, which could have a big impact on your business eventually, but it’s not a live web app where each line turns lead to a specific element on it.

For this project, I employed _React_ with _Tailwind_ to handle the page layout, the former managing the _JavaScript_ and the latter the _CSS_. The development experience was pretty nice become a single contained all the components of a web page, i.e., _HTML_, _CSS_ and _JavaScript_. Thus, it is convenient as you do not need to modify multiple files to rework a page. This is different as the approach I used for this personal site, where I rely on _Express_ and _EJS_ and have to deal with them separately.

A pitfall of such rapid feedback loop and self-contained development is to organically update small bits of code indefinitely. Indeed, it is very tempting to add just one line on your code or fix this tiny element, but if you keep working this way, you will soon end up with spaghetti code. Even for my small app I spent some time refactoring it into several modules, or “components,” for a more sustainable software. The most technical of you may check this out in the code difference in [this commit](https://github.com/simonpicard/calabssa.be/commit/f16f33d2fd3b7c19a27874624868547c03e2acb2).

Should you want to join the web development movement, it is important to be mindful of the various mechanisms happening simultaneously. Indeed, your web page will be the results of different rendering (client, server) and technologies (_HTML_, _CSS_, _JavaScript_). Thus, to stay on top of the dynamics in your website, make sure to know what piece of code is responsible for what. For example, I was surprised that most of the animation in my website where handled by its _CSS_, while the _JavaScript_ would just update some hard-coded like value.

When learning, I also encourage you not to leave stone unturned. If there is something you do not understand, it is easy to just keep moving and avoid it, but I would say that taking the time to grasp it will pay off in the medium run. It will allow you to build a strong knowledge foundation, which will eventually enable exponential learning growth.

All of this because of soccer! It’s a great example of project-based learning, i.e., a teaching method in which students learn by actively engaging in the real world and personally meaningful projects. I believe that such approach is the most effective, find something you want to do, and do it. It will be more efficient than memorizing theoretical concepts or working on irrelevant homework.

Cheers!
