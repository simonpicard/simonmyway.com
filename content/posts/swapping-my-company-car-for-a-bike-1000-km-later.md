# Swapping my company car for a bike, 1000 km later

With a new job, comes a new _package_, and, an important aspect of the said package is mobility. 

In Belgium, for some legacy reasons, offering a company car to its employees is fiscally interesting for the employers. Meaning that, for a given cost, a firm can lease a car for its staff which would be more valuable to the worker than its equivalent in cash. Of course, this depends on individual preferences, but many companies will standardize their package and include a car as part of their typical benefits, presupposing it will matter to the most. Although this car should have a professional motivation, the employee can enjoy it for private use too.

When joining a startup as the first employee, such assumptions were not made, and I had the chance to tailor my package.

## So, do I need a car or not?

As with many decisions I make, I usually start by defining and structuring _the need_, likely a habit from my past as a consultant. In this case it was pretty easy, I just had to look back at what my private automobile use was. It boils down to two main purposes:
1. Traveling for holidays
2. Grocery shopping

Living in a dense city, I am used to moving with soft mobility means for small journeys. Indeed, I personally dislike traveling by car if that means dealing with traffic and frequent start stop. I also often notice that the automobile is slower than free-floating e-bikes or e-scooters when including parking time. Finally, it is always easier to come back with a cab after a couple of drinks when your automobile is waiting for you at home!

It was clear that I could find alternatives for my two remaining car needs. And thankfully, my whole family lives in the same city as I do, so visiting them is feasible with soft mobility too. Many of my friends who moved to Brussels for studies and work will travel back to their relatives, and it's usually way faster by automobile than public transport.

Thus, what's the plan?
- Traveling for work: bike or public transport
- Traveling for leisure: bike or free floating scooter
- Traveling for groceries: bike with some cargo space
- Traveling for holiday: rent a car or go by train
- Anything unforeseen: rent a car

## A bike, but which bike?

Opting for a bike as your main mobility mean is nice, but you still have a couple of details to nail down, after some thought I went for:
- An e-bike, or bike with electric assistance, for speedy movement without sweat
- With front suspension, to cope with Brussels paved roads
- Fenders, so that mud won't splash on my back
- A luggage rack, to carry extra bags e.g., for groceries
- Manual transmission, as I feel smooth automatic transmissions are not there yet
- A removable battery, to allow charging it anywhere
- A frame adjusted to my size

With such requirements, trendy e-bikes such as [_Cowboy_](https://us.cowboy.com/) and [_VanMoof_](https://www.vanmoof.com/) were disqualified as they do not fit half of them. Bye-bye the startuper cliché, credit to [@loule.blou](https://www.instagram.com/loule.blou/).

![A cliché about startuper using a Cowboy bike in the city](/img/posts/startupeur-cowboy-en.jpg) <!-- {.center} -->

I went ahead and investigated the [_Canyon_](https://www.canyon.com/) brand, which I had been eyeing for some time, especially the _Endurace_ model to get into weekend road cycling. For this everyday bike, the [_Pathlite_](https://www.canyon.com/en-be/electric-bikes/electric-touring-bikes/pathlite-on/) was ideal, except for its price which was above budget. Then I discovered an [outlet](https://www.canyon.com/en-be/outlet-bikes/) was available, selling discounted bikes due to minor imperfections. Problem, new bikes were added to the outlet sporadically, without notice...

I started by checking out this outlet occasionally, but soon realized that I should automate this monitoring. And so, I did. I quickly assembled a script which would request all bicycles on the outlet, scrap them, save them in a CSV table and send me a daily email with new bikes matching my search criteria.

![A table containing new bikes in the Canyon's outlet matching my search criteria](/img/posts/canyon-monitor-table.jpg) <!-- {.center} -->

I developed this whole script in _Python_ and deployed on _Google Cloud Platform_ using _Cloud Functions, Storage, Pub Sub_ and _Scheduler_, [the code is open source](https://github.com/simonpicard/canyon-outlet-monitor).

After a couple of weeks, my dream _Canyon_ bicycle was still too expensive, even discounted up to 10%. You can check out all the bikes on sales I scrapped in [this CSV table](https://github.com/simonpicard/canyon-outlet-monitor/blob/main/data/canyon_monitor_bikes.csv) if you want to make some stats. Hence, I changed my tune by looking at other bike brands. I learned about [_Cube_](https://www.cube.eu/), apparently having a strong quality to price ratio, partially due to a low marketing spending, like _OnePlus_ back in the days. Their [_Touring Hybrid One 400_](https://www.cube.eu/2022/e-bikes/city-tour/on-road/touring-hybrid/cube-touring-hybrid-one-400-greynblue/) checked all the boxes, including the cost! 


## 1000 km later

![1000 km on an ebike](/img/posts/ebike-1000-km.jpg) <!-- {.center} -->

I recently passed the 1000 km mark on my new bike and as I have been cycling almost daily for several months, I thought I'd share some of that wisdom with you.

### Gear yourself for bad weather

I biked the whole winter and enjoyed it, you just need to get the equipment. It's the same for resort skiing, you would not appreciate it without feeling warm and dry. So what do you need? First are rain jacket __and pants__. Any kind will do, in Europe you'll find cheap options at [_Decathlon_](https://www.decathlon.com/).

Then I recommend merino gloves and leggings. The gloves will prevent your hands from freezing due to the wind, the leggings will keep your legs warm outside and fresh indoor, thanks to the magic properties of merino. I get my merino from [_IceBreaker_](https://www.icebreaker.com/) because that is what _Mike Horn_ uses and what _Reddit_ suggested. 

You also want to grab a pair of waterproof gloves, on top of your merinos when it's raining. And last but not least, a windshield, because, getting 25 kph droplets in the eyes makes driving difficult. Your windshield can either be a pair of large frame glasses or a cap.

### Get a bike theft insurance

If you are considering commuting by bicycle, then you are probably living in a dense city, which comes with many advantages but also some inconvenience, such as more frequent larcenies. If your bike will be your main means of transportation, you must be able to park it and keep your mind at peace. With the rise of two-wheel commuters, insurance company started to offer bike theft protection. For about €120 a year, your bicycle will be fully reimbursed if stolen. Although losing your ride is still a pain, at least you'll get a new one without repaying it. 

However, make sure to read the conditions which apply for the coverage. I was surprised to learn that my bike would be insured if locked up to any hoop in the street, but not in my private garden when locking the wheel to the frame only. I had to install a specific fixed point in my yard to follow the requirements. I could have attached my bicycle on the road just in front of my place, but I did not want to fill in a theft report every couple days, as grinding a padlock is a matter of minutes nowadays.

### Biking makes micro traveling nicer

Since getting my e-bike, I have been making many more commutes with it. I used to rent free-floating e-bikes for some journeys, but the use cases were limited. Free floating options are pleasant yet will often be slightly unadapted, e.g., with some minor however inconvenient mechanical issues. As I selected just the right bicycle for me, this restriction went away, and boosted my usage.

Today, I confirm it, traveling 25 min by bike is nice, 25 min by car is okayish, 25 min by public transit is annoying. I think I am particularly averse to public transports because I get motion sickness in buses, if I could read a good book while in the metro, I guess it would be another story.

### If you feel unsafe, you are

Road sharing is still a work in progress, at least in Brussels. Some drivers are careful, others are not. Therefore, if you think you're at risk of accident, then you are. To cope with this, make sure to apply the traffic regulations, yes that means yielding priority to cars even if you are going full speed downhill or struggling uphill. On the other hand, do take your priorities and do not be afraid to claim some space on the road. You are not supposed to stick to parked cars, especially if the street is in poor conditions there.

Thankfully, biking infrastructure is improving in major European cities, but never underestimate lack of knowledge, distraction or bad will from automobile drivers. Always be ready to protect yourself, e.g., by braking if a car suddenly turns and cut your path. Although you have the priority, it is better slowing than crashing. Hope for the best, prepare for the worst.

Thanks for reading and see you soon, e.g., at the next [Critical Mass](http://www.critical-mass.be/) 🚴.