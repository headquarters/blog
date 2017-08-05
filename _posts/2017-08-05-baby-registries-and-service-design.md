---
layout: post
title: Baby Registries and Service Design 
date: '2017-08-05T04:48:00-05:00'
tags: [ux, design]
---

My day job is programming, but one of my personal interests is design, especially user experience design.  
One form of design is [service design](https://www.nngroup.com/articles/service-design-101/), where
an organization attempts to organize its people and resources in such a way as to improve the experience of employees and customers. 
This post explores the service design of baby registries for two large retails: Babies R' Us and amazon.com. 

In June of this year, my wife gave birth to our 3 beautiful daughters&mdash;yes, triplets. :scream emoji:

It was a pretty risky pregnancy because two of the 3 shared
everything in utero, called [monoamniotic, or MOMO, twins](https://en.wikipedia.org/wiki/Monoamniotic_twins). So, we were somewhat fearful
the whole pregnancy that all three might not make it, but thankfully they did. We never had any baby showers before the kids were born, because it
 would have been a painful reminder to have 3 of something when we only needed one or two in the end. 

In July, we started the process of putting together a registry for an upcoming baby shower. 
We settled on two places to register: Babies R' Us and amazon.com. The shower was going to consist of 
mixed generations of folks, some of which prefer not to shop online, so Babies R' Us made sense for that
part of the guest list. For the remainder of folks, especially those who can't travel to be here in person,
the amazon.com list made a lot of sense. 

The experience registering at Babies R' Us was a pain, all revolving around a single 
form-field input validation issue: you cannot register for a baby shower if the baby has already 
been born (i.e. your expected date is in the past). This is an example of the "backstage" coming to the forefront in the user interface: 
some limitation of technology, some internal process, or some cultural oversight in the Babies R' Us organization enforced a
rule at the lowest level of touchpoints with users, a form field.

<figure>
    <img src="/images/posts/babiesrus/registry-creation-error.png" alt="Screenshot of registry creation error on babiesrus.com">
    <figcaption>The baby registry form on babiesrus.com would not allow a due date in the past.</figcaption>
</figure>

Our original due date was in August, but we didn't want to put that because
they were already born (or "arrived" as the UI states). It seemed disenguous to say they weren't born yet when they were. We decided we'd
try to register in person, hoping that wouldn't be a problem for an associate. 
[screenshot of form field only allowing 2019 when month is June]

amazon.com, on the other hand, allowed registering when the babies had already been born, 
but did provide a warning message in their form indicating that we had picked a date in the past. In the end, it didn't seem to have affected any of the actual registry creation, though. One creepy
thing Amazon did was pre-populate the registry with some "sponsored" items, which
I promptly removed. If they had been "suggestions" and not just plopped into the list from the
beginning, then I think that would have been less creepy. This is a breakdown in speaking the customer's language--as a new
parent, I want "suggestions" for what to purchase, but as a customer I am always on the lookout to avoid overt advertisements. 

Since we weren't able to register at babiesrus.com (which just redirects to toysrus.com...another issue of backstage components influencing frontstage interfaces), we went to the 
nearest Babies R' Us store to register in person. We went to the Baby Registry desk and spoke
with the associates there. They gave us a [paper form](/images/posts/babiesrus/registry-form-large.png) to fill out to create a registry. 

<figure>
    <img src="/images/posts/babiesrus/registry-password.png" alt="Scanned copy of registry paper form password section">
    <figcaption>The Babies R' Us registry creation form had this section for writing your password.</figcaption>
</figure>

A few concerns here: it's a paper form and the associates did not offer to allow us to fill
out the form online&mdash;they were effectively transcribing from written form to online form. This
is an inefficient workflow for the organization and for users (they have to put the information on paper, then
wait for an associate to transcribe it). Also, there is a big red flag for security here: asking 
users to put a password down in plaintext on a paper form is a Bad Thing(tm). Users tend to 
reuse passwords across sites, so this is giving their password to associates on a piece
of paper that may be reused on another site. The assumption is to trust the associates, but 
why put employees and customers in such a situation where they have to be concerned about this?
Just letting customers fill out a form on a computer at the Registry desk would obviate this problem. 

It turned out that the associate was transcribing directly into the same form we tried to fill out online ourselves. 
The associate had no special access to the "backstage" of the organization's systems to do "magical"
things like simply put a due date in the past. Since the babies were technically due in August, we had them use
the original due date for their "arrival date" instead of the date they were born, despite having alread "arrived". 
In hindsight, we should have done the same in the online form, but what if we had waited until the after the due 
date to sign up? We would have run into the same problem. 

We finally got our account and our registry gun and went off to shoot a bunch of barcodes. 

The barcode shooting had a fun, tactile experience to it that simply adding items online can't quite
compete with. Sure, searching for anything imaginable on amazon.com is nice, but sometimes you don't know
what kinds of baby things are even out there that you _might_ need, so how do you search for those things?
This is where being in a store with actual shelves beats online shopping in my opinion. Despite the fun, tactile experience, the 
gun itself had some UX issues--it couldn't scan some barcodes and it required multiple scans to increase
the quantity, which wouldn't have been such a big deal if it scanned successfully every time and didn't have a 10-20 second "cooldown" period before the next scan could happen. The associates suggested scanning as much as possible and removing/editing things later online.  

Later in the day, we tried to log into the registry by going to babiesrus.com. As you can see in the screenshot below
there is a very prominent My Account/Sign In link in the upper right. On the same row of links, less prominent due
to the lower contrast text, is a Baby Registry link. Since we had just gone through the trouble of creating 
what I thought was a Babies R' Us account, I tried logging into my account by going to MyAccount/Sign In. 
Turns out, that was not a Babies R Us account we set up, but truly JUST a baby registry...account. The correct
path is: click Baby Registry and then click the "update" button under "update my registry". 

Not only are they separate "accounts" but they have different password rules as well. The normal account
has a minimum of 8 characters and maximum of 50 characters for the password length, while the registry account
has a minimum of 6 characters and maximum of 10 characters. This is definitely a sign of backstage processes or technology
has come to the frontstage UI in a bad way--one team works on the normal account and the other works on baby registry accounts,
and they never coordinated internally. What if, in the future, some product manager wants a way to create normal accounts by 
"migrating" registry accounts? Many passwords (6 and 7 characters long) would fail the migration and you end up with data migration headaches. 

<figure>
    <img src="/images/posts/babiesrus/registry-login-page.png" alt="Screenshot of babiesrus.com registry login page">
    <figcaption>The registry account requires minimum length of 10 for the password.</figcaption>
</figure>

<figure>
    <img src="/images/posts/babiesrus/account-login-page.png" alt="Screenshot of babiesrus.com account login page">
    <figcaption>The non-registry account requires minimum length of 8 for the password (plus a whole host of other requirements).</figcaption>
</figure>

Creating a baby registry on amazon.com was much easier than going through the process on babiesrus.com. Less of Amazon's backstage
leaks into the frontstage UI in negative ways and the result is a nicer user experience for the whole service. Babies R' Us has some work
to do to improve its user experience for baby registries, but some of it is very low hanging fruit (e.g. the form field validation) that could
ease the frustration of dealing with their service. 

Update: they've undergone a redesign so some screenshots are out of date and they now use babiesrus.com, so they're improving!