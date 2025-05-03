# Anderlecht is the slowest while Boitsfort is the fastest, permit delivery wise

During last spring, I had the incredible opportunity to attend the London based Startup incubator, Entrepreneur First. The experience was quite extraordinary, allowing me to meet many brilliant minds, and also amplifying my understanding of innovation. For anyone curious to sample the atmosphere of this unique entrepreneurial environment, I recommend the article – [Inside Entrepreneur First: a survival guide for the world’s most exclusive talent accelerator](https://highleverage.substack.com/p/inside-entrepreneur-first-a-survival).

![Simon at EF](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/ef_simon.png)

After spending three months in the incubator, I found myself on an unexpected path. Despite my exhaustive attempts, I couldn't match with the right co-founder to share a common vision. Hence, I made the choice to return to Brussels. Following intensive customer development, brainstorming and idea-discussions, I wanted to feel pragmatic productivity and build something tangible.

I directed my energy to a subject that had intrigued me for a long time: the Brussels' real estate landscape, primarily due to my involvement in multiple related projects. Dealing with property in Brussels introduces one to the intricacies of urban planning. If you were to renovate a building, you'd have to secure an urbanism permit by presenting the project to the respective municipality for approval. It is fundamental to note that construction cannot commence without possessing this permit.

To facilitate this process, Brussels launched a permit exploration portal, [OpenPermits.brussels](https://openpermits.brussels/), powered by a [public API](https://openpermits.brussels/fr/about). But it fell short of offering some elements I was searching for. That's how [Urbanex](https://urbanex.be/) was born – to supplement the public permit portal with some enhance features, thereby enriching the user's interaction.

## An overview of permits' lead times

The process of permit application involves a specific timeframe within which the managing authority should convey their decision – referred to as lead time. Having recently applied for a renovation permit myself, I was interested in finding out if these time limits were adhered to.

A helpful metric to gauge this is the 'lead time deviation' – the difference between the expected and actual duration. The graph below shows the permits' yearly rolling average lead time deviation.

![Permits' yearly rolling average lead time deviation](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/permit_count_and_lt_deviation_over_time.svg)

What a journey it has been! Brussels used to have almost a year of delays but is now delivering permits even before their deadline. The total volume of permits submitted has remained quite stable, except during the COVID period. However, it looks like a step change happened at the end of 2020 as seen in the graph. While the municipalities have probably improved their processes, another way to avoid missing deadlines is by extending them. Let's explore their evolution.

![Permits' lead time propotions](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/permit_count_expected_lt.svg)

While the main lead times were 45, 75, 90, and 120 days until 2019, they have increased to 75, 90, 160, and 190 days since 2021. The transition occurred in 2020, at the same time as the step change in the mean lead time deviation. The government likely extended the permit deadlines. Permits that used to be 45 days long now take 75 days, and those that were originally 120 days have been extended to 160 or 190 days.

To appreciate the efficiency of each municipality, I conducted a comparison of how many days prior to their deadline they managed to deliver the decision. Indeed, each of the 19 Brussels municipalities handles its own permits. For this analysis, we will focus on the data from the last year.

![Permits' average pre-deadline decision period per municipalities](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/mean_pre_notice_muni.svg)

It's impressive to see that all municipalities are delivering permits ahead of their deadlines. Boitsfort, the most efficient municipality, has an average pre-deadline decision period of 70 days, meaning that, on average, it will send its permit decision more than two months ahead of the deadline. However, it's essential to consider that different permits have different expected lead times. Let's break it down based on the planned time limits.

![Permits' average pre-deadline decision period per municipalities and expected lead time](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/mean_lt_dev_muni_expected_ld.svg)

So, if you are introducing a 160 days permit in Saint-Gilles, you can expect your answer almost three months before the deadline. On the other hand, if it's a 90 days permit in Uccle, you're looking at 3 days of delay.

## My personal experience: the inspiration behind Urbanex

So why did I build [Urbanex](https://urbanex.be), when [OpenPermits](https://openpermits.brussels/) is available? It's all based on personal experience.

### Urbanex is an online archive of urban planning permits

A few years ago, I bought a newly-built studio in Brussels. Upon moving in, I noticed that the facade lacked planned vegetation. To confirm what was supposed to be on the facade, I decided to refer back to the building's plan. To locate these plans, I had to:

- Schedule an appointment with the municipality, which could take up to 2–3 weeks.
- Visit to the town hall to meet the official who had access to the paper archive of the permit, including its original designs.
- Check the archive, identify relevant document and scan them

The entire process cost me 10€ for the initial consultation and then an additional 15€ per scan. I ended up getting two plans, putting the total expense at 40€. This effort confirmed my suspicion - the facade was meant to be adorned with vegetation.

![Plan of the facade](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/plan_facade.png)

Although the traditional route eventually provided the information I needed, it was time-consuming and somewhat antiquated, especially given that permit documents are usually submitted electronically these days. Moreover, when a permit is first submitted, the associated documents go through a period of public consultation, allowing anyone to view them and voice their opinions.

However, once this review period is over, access to these documents becomes limited, with archives typically solely existing in paper form at the local municipality. Had I retained the required plans at the time my own flat underwent this consultation process, the taxing visit to my municipality would have been needless.

This made me realize that documents submitted electronically should remain easily accessible even after the public consultation period.

![A list of documents on Urbanex](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/urbanex_documents.png)

To fill this gap, [Urbanex](https://urbanex.be) now ensures these documents are readily available, digitally archived, and can be conveniently accessed at any time, from any location, with no appointments. Navigating urban planning in Brussels just got a lot easier.

### When AI meets urban planning

Then, I embarked into a journey to renovate my grandmother's house, I intended to convert the attic into a liveable space, creating a duplex on the top floor. However, my architects cautioned me about the potential repercussions this kind of transformation could have. Such changes significantly increase the building volume and neighbourhood density, raising potential concerns from the municipality, especially if not executed thoughtfully. The dilemma I faced was whether to abandon my duplex dream or risk potential permit denial.

At that moment, I wished I could review past permits approved by the municipality, specifically for similar projects about raising the roof. With access to this information, I could have better understood the local authority's stance on such transformations. Each permit application typically includes a brief description of its purpose. If there were a way to filter and search these descriptions, it would be ideal...

That's exactly what I built.

![A project based search Urbanex](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/urbanex_project_ref.png)

By harnessing the power of Artificial Intelligence, I have made it possible for users to enter descriptions into [Urbanex](https://urbanex.be) and filter results based on their particular needs. Let's say you plan to construct a swimming pool in your backyard; with Urbanex, you can check how many similar projects have been accepted or rejected close to your place. This feature provides a better understanding of the feasibility of your project, potentially saving time and effort during your permit application process.

## An ocean of opportunities

The journey of creating [Urbanex](https://urbanex.be) has been a thrilling one. For me, it is again the opportunity to practice web development, using Next.js this time! Eventually, allowing me to create the interface between AI tools and the user. I have many more ideas about how else AI can bring value to this permit planning, I even aspire to, some day, craft a tool that can forecast permit approval outcomes.

My hope is that Urbanex proves as beneficial to you as it would have been for me. I appreciate all feedback.
