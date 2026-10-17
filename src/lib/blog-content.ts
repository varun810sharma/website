/**
 * Blog post HTML content, bundled at build time.
 *
 * We use a static import map instead of fs.readFileSync because Next.js 16
 * with Turbopack runs generateStaticParams page workers in a context where
 * process.cwd() does not reliably resolve to the project root, causing all
 * fs reads to silently fail and fall back to "Content not found."
 *
 * Adding a new post: paste the HTML content as a new key below, matching
 * the slug in blog-posts.ts exactly.
 */

const blogContent: Record<string, string> = {
  "rented-restraint-glp1": `<p>The glass of milk that sat next to the American breakfast plate for most of the last century began as an inventory problem. Farmers had more milk than the country was drinking, and instead of producing less of it, the industry set out to grow the appetite until it matched the supply. That's worth remembering right now, because we've just built the first tool that runs the process the other way, and almost nobody in consumer goods has priced in what that means. This piece is about that tool. It starts with milk because milk is the clearest proof that the hunger you think of as yours was often someone else's idea first.</p>

<h2>Milk was a campaign before it was a habit.</h2>

<p>The American Dairy Association came together in 1940, built by farmers and cooperatives sitting on a surplus that needed somewhere to go. Their answer was demand-creation at national scale. By the early 1960s the ADA was paying to sponsor "The Adventures of Ozzie and Harriet," and the most reassuring family on television would turn to the camera between scenes and tell you to drink a glass of milk with every meal. Schools ran the same ritual, lining kids up in front of steel containers for a daily serving. Doctors told pregnant women to drink more for the baby. None of it happened by accident, and within two generations Americans had inherited a habit that a trade group engineered to empty a warehouse (Sentient Media; Milwaukee Magazine).</p>

<p>India reached a similar place by walking in from the opposite side, and that difference matters later. There was no surplus to unload. There was a shortage, and millions of small farmers getting squeezed by the traders who stood between them and the market. In 1946, in Anand, farmers set up the cooperative that became Amul, and Verghese Kurien, who joined in 1949, turned it into the engine behind Operation Flood, the largest dairy development program the world has ever run, and it turned a milk-deficient country into the biggest milk producer on the planet (World Food Prize; Amul Dairy). Amul didn't have to invent the desire, since dairy was already woven into Indian cooking. What it did was industrialize that desire, put a brand on it, and land packaged milk, butter and curd in hundreds of millions of homes that had never bought them in a carton.</p>

<p>The mechanisms were opposite, and the outcome was the same. One country conjured demand to move a surplus, the other organized demand that already existed until it was everywhere, and in both cases something outside the body decided what belonged on the plate, then held there long enough that it felt like it had always been there. Hold onto that, because for the first time in 100 years we've built a technology that runs the whole machine backward.</p>

<h2>The un-manufacturing.</h2>

<p>GLP-1 drugs (Ozempic, Wegovy, Mounjaro, Zepbound) don't sell you a thing to eat or drink. They sell you the disappearance of wanting it, and the consumer economy has never had to reckon with a product like that. The uptake looks nothing like the slow burn of a trend working its way through one corner of a market. Roughly one in eight American adults is on a GLP-1 today, and about 18% have taken one at some point (KFF, November 2025). By May 2026, PwC's household data had a current user living in one of every five American homes, up from 9% at the start of 2025. When a fifth of the country's households change how much they eat inside 18 months, you're not looking at a niche behavior anymore; you're looking at the demand side of the entire food economy moving at once.</p>

<p>One clarification before this goes further, because these conversations tend to collapse into a fight I don't mean to start. I'm not talking about the medical case, and I want it walled off. If you're managing type 2 diabetes, obesity, or the cardiovascular risk these drugs now carry an indication for, none of my argument is pointed at you. The drug is doing work your body can't do alone and it's worth what it costs. I'm not against medicine and I'm not against people trying something new. What I'm circling is narrower and it's psychological. It's the far larger group reaching for a prescription as a shortcut around the effort, and what they're signing up for when they do.</p>

<h2>Rented restraint and owned restraint.</h2>

<p>The distinction I keep coming back to is ownership. Restraint you build for yourself is holistic, and it belongs to you. You changed what you eat and how you move, the habit rewired itself, and it holds even on the nights you're not thinking about it. Restraint that comes out of a pen is real too, but you're renting it, and it stays only as long as the payments do.</p>

<p>We know it's a rental because the trial data leaves no room to argue. In the STEP 1 extension, published in Diabetes, Obesity and Metabolism in 2022, patients on semaglutide lost 17.3% of their body weight across 68 weeks. Then the researchers took the drug away. A year later, two-thirds of the lost weight had come back (Wilding et al., 2022). Nothing about the body had learned a thing. It had been overruled, and the moment the ruling lifted, the old appetite walked back in and reclaimed the ground.</p>

<p>That's the part I'd want anyone using this for looks or convenience to think about. The drug is a bridge, and I've got no problem with a bridge. But a bridge is only worth building if you plan to cross it and step off on the far side, and what the data describes is a crowd setting up camp in the middle with no intention of reaching the other bank. If the only thing holding the number down is a weekly injection, the result was never yours. You leased it, on terms nobody's reading closely, while the long-run side effects are still being worked out and all of us are early. My honest position is that if you can get there on food and movement, get there on food and movement, because that's the version the body keeps. The drug should be the thing that carries you to the exit, not the thing you stay on for a decade while the science catches up to what a decade of it does.</p>

<p>Now put a fifth of a country on rented restraint at the same moment, and the appetite that dairy and snack companies spent a century constructing doesn't just cool off. It reprices, right across the plate.</p>

<h2>The meal comes apart.</h2>

<p>Structure goes first. Breakfast, lunch, dinner, and the several snacking occasions the industry invented to fill the gaps between them, all of it was built on the assumption that hunger shows up on a timetable. GLP-1 erases the timetable. The reach between meals, the second serving, the thing you told yourself you'd earned by nine at night, those calories go first, because they were never hunger to begin with. They were habit and reward, and quieting reward is the one thing the drug does best.</p>

<p>Watch the restaurant that turned excess into its entire personality. The Cheesecake Factory built a brand on plates that clear 1,500 calories without trying, with a single pasta dish crossing 2,000 before the cheesecake even arrives. Abundance you couldn't finish was the whole promise. In March 2026, J.P. Morgan upgraded the stock, and the reasoning behind the upgrade is the giveaway: analysts figured the chain could keep its GLP-1 customers because of the Skinnylicious menu, the 500-calorie section it has kept quietly parked on the menu for years, which now gives a shrunken appetite a place to land (Fortune; J.P. Morgan). The upbeat case for the most maximalist restaurant in the country now rests on the small-plate section it used to ignore.</p>

<p>The math underneath is unkind even when the customer comes back through the door. A table that once ordered two full entrees, a milkshake, a starter and cheesecake now orders two Skinnylicious salads and a Diet Coke. Same table, same rent, same server, and a check worth a fraction of the old one. When the average spend per table drops, it drops straight to the bottom line, because none of the cost of serving that table went anywhere. Olive Garden and others are shrinking portions for the same reason (Fortune). The basic unit of the restaurant business, the occupied table, is worth less than it used to be, and hospitality can't fix a guest who isn't hungry.</p>

<h2>The macros flip.</h2>

<p>What people do still eat swings hard toward protein and away from refined carbs. Cornell and the market-intelligence firm Numerator tracked this through household purchase data: inside six months of a home starting a GLP-1, savory snack purchases dropped around 11%, while nutrient-dense buys like yogurt and fresh produce edged up (Food Dive; NJBIZ). Better food in the cart, less junk, right at the register.</p>

<p>I wrote about the same protein migration in India last year, where it's being pulled by a rising consumer class that finally has the income to want the good stuff. GLP-1 is the Western cut of the same story, except it arrives through a needle rather than an aspiration. Both roads run in the same direction, which means anyone selling protein, fiber and satiety is catching a tailwind from two unrelated engines at once. That doesn't happen often, and it's worth being long on.</p>

<h2>What it does to a snack company's money.</h2>

<p>When somebody starts one of these drugs, they eat less, and they don't cut across the board. What goes first is the chips, the soda, the cookies, the extra thing grabbed at the register. Those happen to be the most profitable items in the store. A bag of chips is a few cents of potato and oil selling for five dollars, and when it stays on the shelf the company doesn't lose an average sale, it loses its best one, the sale that was quietly paying for all the low-margin staples nobody makes money on.</p>

<p>Then it compounds, and this is the part that decides who makes it through. A snack factory is built to run full. The plant, the lines, the trucks, the payroll, you cover all of it whether the line runs at 100% or 95%. So a 5% drop in volume doesn't take 5% off your costs; it barely touches them, which means it doesn't take 5% off your profit either. It takes far more, because the same fixed cost is now carried by fewer bags. Operating leverage is a beautiful thing on the way up and a wrecking ball on the way down.</p>

<p>Here's the figure that should make a CFO put the coffee down. Cornell and Numerator found the average GLP-1 household trims its grocery bill by about 5.5%, roughly $416 a year, and nearer $690 for households earning over $125,000 (Food Dive). Run it across the map. There are about 132 million American households; put a current user in a fifth of them and call the average cut $500, and you're looking at north of $13 billion a year walking out of the American grocery basket. $13 billion is only about 1% of the $1.10 trillion Americans spend on groceries, but it lands almost entirely on the highest-margin corners of the store, which is why the profit hit runs far ahead of the sales hit. That's also more than the Hershey Company sells in a year, the whole of it, Reese's and Kisses and everything else, gone from the cart annually, and the number climbs with every new prescription written (Hershey FY2024). You can already read it in the incumbents. PepsiCo closed 2025 with organic volume and revenue down about 2% and operating profit off 7%, as North American shoppers pulled back from Frito-Lay, and it's now cutting prices on Lay's and Doritos and closing Frito-Lay plants to defend the business (Newsweek; Food Business News). Some of that is bargain-hunting shoppers. A growing piece of it is shoppers who just aren't hungry for the third bag.</p>

<p>So what do you do with this if you're building or investing? If you're the incumbent, the volume-heavy, high-fixed-cost snack business is the most exposed thing you own, and the honest response is to reformulate toward protein and satiety, take pack sizes down before the market takes them down for you, and stop penciling the last decade's volume growth into the next decade's factories. If you're the startup, the open field is the companion economy: smaller portions built for a muted appetite, high-protein and high-fiber formats, muscle-preservation nutrition, supplements that ride alongside the drug instead of fighting it. And the same warning holds for everyone. Demand chained to a prescription can reverse as fast as it appeared, so build a balance sheet that survives the morning a slice of your growth turns out to have been rented too.</p>

<h2>Alcohol, and the death of the treat.</h2>

<p>Alcohol is getting caught in the same net, partly through a side effect nobody set out to create. In a randomized trial, patients on a GLP-1 were about 29% more likely to cut back on drinking, and broader reviews have found real drops in problem-drinking scores (dulaglutide RCT; Lancet eClinicalMedicine). In the UK, 39% of people on these drugs said they're drinking less (Drinkaware). The drug turns down the reward circuit, and a drink is a reward.</p>

<p>The bigger move is psychological, and it stacks on top of a shift that was already underway. I've argued before that being sober-curious turned into an identity for Gen Z rather than a sacrifice. Now drop a medication that makes the drink itself less appealing on top of a culture that already made skipping it aspirational. The whole "treat yourself" reflex, the emotional machinery that sold indulgence for a hundred years, gets quieter from both directions. When wanting the treat is chemically dialed down and celebrating restraint is the cool posture, the categories that sold themselves as small rewards have a demand problem no marketing budget can outspend.</p>

<h2>Insurance, and the take I'll put my name on.</h2>

<p>My prediction cuts against the room. Over time, GLP-1 makes health insurance cheaper, not more expensive.</p>

<p>Right now, it's doing the opposite, which is why most people stop reading their own logic too early. The drugs run about $766 a month net of rebates, they already eat roughly 20% of employer prescription spend, and that spend jumped about 50% in 2025 alone (Mercer; EBRI). Simulations put the premium hit from covering them at anywhere from 5.3% to 13.8%, which is why only about a quarter of employers cover them for weight loss at all, and some are already backing out (EBRI; Mercer). That pain is real and it's loud. It's also the near term, and the near term is not where this argument lives.</p>

<p>What an insurer is pricing is future medical risk, and this is where the room has the story backward. In the SELECT trial, 17,604 people with heart disease and obesity but no diabetes were put on semaglutide, and their rate of major cardiovascular events, the heart attacks, the strokes, the cardiovascular deaths, fell by 20% (SELECT, NEJM 2023). Those are the claims that break a risk pool. One heart attack, with the stent and the rehab behind it, costs a health plan far more than the years of a drug that made the heart attack less likely in the first place. Now set that against the size of the exposed group: roughly 42% of privately insured adults under 65 already qualify under current FDA labels (Peterson-KFF). This isn't a sliver of the pool getting healthier. It's close to half of it.</p>

<p>Run those two facts together and the arithmetic turns over. Fewer catastrophic claims eventually make for a cheaper pool, and a cheaper pool eventually makes for lower premiums. It takes years because of a timing mismatch: you pay the full drug cost today and collect the avoided heart attacks a decade out, and insurers are slow to re-rate a pool they haven't finished watching. Then the drug cost itself caves. India already sells the same molecule for about ₹1,290 a month now that the patent has fallen; the US branded shield holds until 2031, but when it breaks the biggest line item in this whole equation drops toward the floor, and the near-term premium drag goes with it. Cheaper drug, healthier pool, and lower risk. That's the case, and it's why the second country is about to run the same experiment on fast-forward.</p>

<h2>India is the other lab, and the cheaper one.</h2>

<p>Almost none of what I've described has reached India yet. It tends to run a few years behind the US on shifts like this, and that lag is usually where the smart money gets positioned, because you can watch the American tape and place your bet before the local version shows up. The early signal is already loud, though, and it's moving faster than the usual lag would predict. Eli Lilly launched Mounjaro in India in March 2025. By October it was the single best-selling drug in the country by value, ahead of the antibiotics that normally hold that spot, with about ₹233 crore (roughly $28M) in sales in its first six months (India Briefing; Business Today). India has an estimated 254 million people living with obesity, and its obesity-drug market is projected to grow from around ₹3,500 crore now toward ₹25,000 crore (roughly $3B) by 2030.</p>

<p>Then comes the thing that makes India a different experiment and not just a slower one, which is price. Semaglutide's patent lapsed in India on March 20, 2026, and Sun, Dr. Reddy's, Zydus, Lupin and others put generics on the market almost overnight. Prices are dropping by more than half, in places by as much as 90%, with one brand going for about ₹1,290 a month, close to $15 (Pharmacy Business). In the US the same molecule sits behind roughly $1,000-a-month pricing and an insurance gate, with patent protection stretching to 2031. In India it costs about what a household spends on tea.</p>

<p>That scrambles the usual order of adoption. Income normally decides who gets the new thing first, and in the US it still does, with usage skewing toward higher earners and the coasts. India could leapfrog on access precisely because the branded gate falls apart the second the generics arrive. And it lands at the most loaded moment imaginable. I've argued that India's rising middle class has finally got the money to want the real thing, the protein, the coffee, the branded indulgence its parents couldn't afford. Now a $15 injection shows up to tell that same newly comfortable consumer to want less, right as they earned the means to want more. Amul spent 70 years teaching a country to reach for packaged dairy. We're about to find out what happens when a cheap molecule starts trimming appetite the other way, in the one big market still climbing.</p>

<h2>What stays.</h2>

<p>Take all of it back to the start, and you land on the same split. Milk didn't last because it was true; it lasted because someone built the habit deep enough that it outlived the campaign that created it. The weight people drop on a rented drug doesn't last, because nothing was built underneath it, which is why two-thirds of it comes back inside a year.</p>

<p>A big share of the demand destruction the market is busy pricing as permanent is rented, and rented demand comes back. The companies treating a 5% volume decline as the new floor are going to get surprised twice, first by how fast it dropped and then by how much of it returns when a wave of lifestyle users decides the injection wasn't worth the decade. The durable version of all of this, the healthier population and the lighter cart and the cheaper risk pool, only holds for the people who treated the drug as a bridge and then did the boring work of food and movement once they were across.</p>

<p>You build it with what you eat and how you move, and that's the only version that stays yours. The rest is a lease, and the lease always comes due.</p>

<h2>Sources</h2>

<ul>
<li>GLP-1 adoption (one in eight adults; 18% ever used): KFF Health Tracking Poll, Nov 2025</li>
<li>One in five households with a current user (May 2026): PwC, GLP-1 consumer trends</li>
<li>Grocery spend down 5.5% ($416/yr; $690/yr for higher earners); savory snacks down 11%: Food Dive; NJBIZ (Cornell/Numerator); Numerator GLP-1 Hub</li>
<li>Weight regain (two-thirds regained one year after stopping; 17.3% loss): Wilding et al., STEP 1 extension, Diabetes Obesity &amp; Metabolism 2022</li>
<li>GLP-1 eligibility (~42% of privately insured under-65 adults): Peterson-KFF Health System Tracker</li>
<li>Alcohol reduction (29% more likely to cut; UK 39% drink less): Lancet eClinicalMedicine review; Drinkaware</li>
<li>Cheesecake Factory / Skinnylicious / J.P. Morgan upgrade; Olive Garden portions: Fortune; AlphaPilot (J.P. Morgan)</li>
<li>US food-at-home spending ($1.10T in 2025; $2.51T total food): USDA Economic Research Service</li>
<li>Hershey annual net sales (~$11.2B, FY2024): Hershey Q4/full-year 2024 release (SEC)</li>
<li>PepsiCo/Frito-Lay revenue pressure and price cuts: Newsweek; Food Business News</li>
<li>US milk marketing history (American Dairy Association, 1940; Ozzie &amp; Harriet): Sentient Media; Milwaukee Magazine</li>
<li>Amul / Operation Flood / Verghese Kurien: World Food Prize (1989 Kurien); Amul Dairy</li>
<li>Mounjaro India (launched Mar 2025; top-selling drug by value Oct 2025; ₹233 crore in six months; 254M obese; market to ₹25,000 crore by 2030): India Briefing; Business Today</li>
<li>Semaglutide India patent expiry (Mar 20, 2026; generics; ~₹1,290/month; US patent to 2031): Pharmacy Business</li>
<li>SELECT trial (20% reduction in major cardiovascular events; 17,604 patients with obesity and CVD, no diabetes): Lincoff et al., NEJM 2023</li>
<li>Employer premium impact (5.3%–13.8% from coverage; GLP-1s ~20% of drug spend, up ~50% in 2025; ~$766/month net; ~23% of employers cover): EBRI simulation; Mercer</li>
</ul>`,
  "after-running-on-premium-athletic": `<p>The odds of catching me running on Kite Beach in the morning are about three in seven, and for the last 12 months, I've been paying attention to what's on people's feet. Adidas Adizeros, a lot of them. Nike Vomero, the Asics. The brand I keep expecting to see more of and don't is On, which is odd, because the financials put it among the fastest-growing things in the whole category. Two years of watching the ground tell me one thing while the numbers tell me another, and at some point, you go with the numbers.</p>

<p>On runs a 62.8% gross margin, against 41% at Nike, 51.6% at Adidas, and somewhere between 55% and 59% at Lululemon, which is the brand most people have in mind when they say premium athletic. On beats every one of them. You don't open a 22-point gap on Nike by building a marginally better running shoe; you open it by operating, more or less without anyone noticing, in a different business that happens to share the same shelf. The market has clocked it. On trades at 46x earnings on 30% revenue growth in 2025, a luxury multiple bolted onto an athletic brand, which makes the real question not whether On can keep growing but whether it can keep charging what it charges. The only company in a position to take that away is On.</p>

<p>The growth costs money by design. Sales reached $3.35B in 2025. Gross profit outran the top line, and operating profit rose 78%, but operating expenses climbed 27% right behind it, and net income slipped 15%, most of that due to foreign exchange. Follow the money, and it leads to OPEX, the fastest-growing line in the whole P&L, and I am going there on purpose: On is spending its margin to buy two things it doesn't yet own outright, control of its own retail and awareness beyond the people who already run.</p>

<h2>On built the brand in the right order</h2>

<p>It started in 2010, founded by runners for runners, and went after the hardest audience first. Not the broad market, not awareness, but the marathon community, which isn't forgiving. I've been in enough of those conversations to know. The shoe holds up at the 32-kilometer mark, or it doesn't, and word travels fast either way. The founders spent years earning a reputation in that room before anyone outside it mattered, and recreational runners followed the way recreational runners always do, wanting whatever the serious people train in. They held the performance reputation while the customer base widened. Credibility built among obsessives spreads outward to casuals readily enough; it rarely runs the other way.</p>

<p>Then Roger Federer came in as an investor and partner and pulled the brand sideways, into tennis, into aspiration, into people wearing On to a 9 a.m. He took a stake around 2019 after leaving Nike, two years before the IPO. His investments in On reportedly played a bigger role in him becoming a billionaire than his roughly $130M in career prize money as On's valuation grew from $7B to ~$13.4B in 2025. Iga Świątek, another tennis superstar, followed him in as a partner. On earned the community before it courted the crossover, which is the move most brands get backwards by reaching for the crossover while they still have nothing to cross over from.</p>

<p>Think about who actually buys the shoe. The man who runs twice a week is buying the same model that the man who runs six days a week trains in, and he will never need the carbon plate in the sole. What he's buying is a small stake in the person he half-intends to become. That kind of pull takes a decade to build and about one bad season to spend. On's awareness sits near 30% globally against 90%+ for Nike and Adidas, and I'd argue that's the most underrated number in the story, because it's 60 points of road still in front of a company already doing $3B. Most brands that size have nobody left to convert.</p>

<h2>Nobody else can afford to take the position</h2>

<p>Nike lost more revenue last year than On has earned in any single year of its existence, falling from $51B to $46.3B, a $5B hole, while On was adding $770M. These aren't two companies running the same race at different speeds; they're moving in opposite directions. Nike is also fighting itself at the moment, working through CEO turnover, layoffs, and a reorganization, which leaves every retail relationship it lets slip and every athlete conversation it mishandles sitting on the table for someone else.</p>

<p>Adidas can't reach for the premium spot either, for its own reasons. Its identity is welded to the mass market, to the Samba in every shop window, and Nike has the same problem one size up. Both companies built enormous distribution engines pointed at the broad middle of the market, and you can't push a genuinely premium brand through machinery engineered to move volume. Chasing On up-market would mean breaking the thing that made them, and no public company does that to itself on purpose, unless compelled to.</p>

<h2>The comparison that matters is the Jordan Brand</h2>

<p>Jordan does $7.3B a year off the legend who hasn't played a professional game in more than twenty years, better than twice On's entire revenue. Set that beside what On is sitting on. Federer is still woven through the sport, and through On's identity, in roughly the way Michael Jordan ran through Nike in the early 1990s, before the Jumpman turned into its own balance sheet.</p>

<p>The striking part is that the Federer line barely exists yet. No RF mark, no standalone collection, none of the machinery that turned one retired athlete into a multibillion-dollar annuity. For a company reaching for the luxury position, that's probably the largest unbuilt asset in the category, and the open question is whether the groundwork is going in now or being left for later.</p>

<p>The same engine is already visible in the collaborations, though most people read them as marketing rather than as a price anchor, which I believe is what they are. Stand the shoe next to Loewe often enough, and $350 stops looking like a stretch and starts looking like the going rate. Do that patiently across a few years, and a $200 shoe becomes a $350 shoe without losing the customer, because the customer's sense of what On should cost has shifted underneath them. Adidas can't run that play; the Samba won't let it.</p>

<h2>What's left is mostly one decision about sequence</h2>

<p>On has around 70 of its own stores. Nike has more than 900 as of 2025 but has been closing stores in 2026. On is 15 years old, so the buildout has barely started, which is more luck than judgment, because starting late means it gets to start clean. It's the same reason legacy companies struggle to go digital compared to one starting from scratch.</p>

<p>Both channels are working. Wholesale hit $1.95B last year, up 28% and closing on $2B, and direct-to-consumer is at $1.4B, 42% of sales, growing at the same rate. Footwear wants to be bought in person regardless, since nobody commits to a shoe over a video call, and wholesale puts On on shelves everywhere without the capital of building owned retail city by city. It also keeps acquisition costs down in a way DTC can't touch without enormous overhead. For covering ground quickly, it's the right tool.</p>

<p>The trouble is that the brand pays for the reach. The multiple On trades at assumes control over where the shoe sells and what stands beside it, and you don't have that on a department-store wall sharing space with 40 other logos. The flagship is where the brand is supposed to end up; wholesale is how it gets there, and the mistake would be letting wholesale settle into the permanent plan because it happens to be working, which could hurt the brand in the long term.</p>

<p>APAC is the same decision in sharper relief. On is Swiss, and the Americas and EMEA still account for 83% of the business, while Asia-Pacific is $567M, growing 96% year over year, about 17% of revenue. A 96% growth rate doesn't last, and the window to plant a premium brand in a new market, before cheap distribution drags the price signal down with it, closes faster than most brand teams plan for. International wholesale is the sensible way in: prove the demand, build the community, then claw back margin and control once the market's real, with flagships behind it. That last step costs serious capital, which is exactly why the sequencing has to be settled now, while the wholesale business is still small enough to redirect.</p>

<h2>The real risk is the one On does to itself</h2>

<p>On is worth about $13.4B today. Adidas is worth $30B on 1.2x the revenue. On trades at 4x sales and Adidas at 1x, which tells you the market isn't pricing this year's results so much as the slope they imply.</p>

<p>It's an unusual setup for a $3B brand: credibility with serious athletes, margins on loan from another industry, 60 points of awareness still untapped, and the one giant at scale tangled up in its own problems. People keep holding On up against Nike, and it's the wrong comparison, not because On is smaller but because the two are running different businesses.</p>

<p>Brands rarely lose the premium position to a competitor. They give it away themselves, scaling distribution before the brand can carry the price, chasing the next ten million customers right past the first ten million who made them worth buying. On has handled that pressure well for 15 years, but for most of those years, there wasn't much pressure to handle, because the volume was too small to tempt anyone into a bad call. Adidas didn't dilute the Samba until it couldn't stop printing them. On hasn't yet had to turn down growth at a size where turning it down actually costs something.</p>

<p>That's the test in front of it now, and it shows up with a lot more zeros attached.</p>`,

  "first-90-days-product-manager": `<p>My product role at PMI isn't a typical one. I'm not shipping to end consumers. I'm building tools for ground sales teams who then go out and sell to customers, which makes it B2B2C. Common in retail, but it means my customer is two people at once: the rep in the field and the shopper they're trying to convert. Most PM frameworks don't account for that. I figured it out early, and it changed how I approached everything.</p>

<p>That experience is what this piece is about. Not a generic 90-day playbook. A set of things I wish someone had told me before I started.</p>

<p>Every new PM role starts the same way. You show up, get the Teams or Slack access, meet the team, and immediately feel like you're three months behind on everything. That feeling is normal. It's also a trap.</p>

<p>The instinct is to move fast, show impact, prove you belong. Resist it.</p>

<h2>Find the people who'll tell you the truth</h2>

<p>The first thing I do in any new role is identify two or three people willing to teach me how the organization actually works, not how the org chart says it does. Every company has its own immune system. What's tolerated, what's sacred, what'll get you ignored for six months if you do it wrong. You can't read that in a deck or a strategy paper. Find the mentors early, ask dumb questions, and listen more than you talk.</p>

<h2>Build relationships before you build anything else</h2>

<p>Go deep with the teams you work with, whether that's engineering, design, or something else entirely. If your product touches customers directly, go deep with customer success. Then go one level further: get in front of the actual end user. Everything should flow backward from there. The question I make a point of asking everyone is what they wish the product did differently, what they think has worked, and where they'd take it in two years. You learn more in those conversations than in a month of Jira tickets.</p>

<h2>Study the graveyard</h2>

<p>Every product team has one. Features that got killed, bets that didn't ship, initiatives that died in committee, priorities that got backlogged indefinitely. Most new PMs never look at it. That's a mistake. The graveyard tells you more about the org's real constraints, political fault lines, and what the market actually rejected than any current roadmap will. Ask what got cut in the last two years and why. The answers are rarely "it wasn't a good idea."</p>

<h2>Find the longest-tenured skeptic</h2>

<p>Every team has someone who's been around long enough to watch three or four product owners cycle through with big plans and mixed results. Most people treat them as a blocker. They're actually a map. They carry institutional memory that no onboarding doc has. Buy them coffee. Ask what they've seen fail. They'll tell you things no one else will, because they've already decided they have nothing to prove.</p>

<h2>Don't touch the vision. Not yet.</h2>

<p>This is the one people get wrong most. A product you've inherited was built by people who understood it in ways you don't yet. Don't gut their logic in week three. The authority to change direction has to be earned and agreed on. Changing course without that buy-in doesn't make you visionary; it makes you the person who blew up something that was quietly working.</p>

<h2>Be useful before you're strategic</h2>

<p>In the first few months, your job is to unblock people. Help the teams you work with make tradeoff calls. Help engineering or IT prioritize. The framework I keep coming back to: if it reduces costs or drives revenue, fix it first, prove it with an A/B test, then scale. Not every ecosystem lets you run a clean test, so sometimes it's a focused pilot. Either way, understand the full customer journey before you touch anything. Changes that look clean in isolation can break things downstream.</p>

<h2>Say no to something small, early</h2>

<p>The instinct in a new role is to say yes to everything. Build goodwill, avoid conflict, keep everyone happy. But establishing early that you can hold a line, even on something minor, signals you have a point of view. People follow PMs who have one. Endless accommodation reads as someone who doesn't know what they think yet.</p>

<h2>Use the product like a user</h2>

<p>This sounds obvious. Most PMs skip it anyway. Sit down, open the product, and actually use it the way a customer would. Watch real users do the same. Nine times out of 10, what looks like a product problem is a people problem: a workflow, a missing explanation, a friction point nobody thought to name.</p>

<h2>Not everything needs AI</h2>

<p>If you work on a product used by real people, start with those people. Bring in AI use cases when they solve a specific, observed problem. Not because it's a good story for the roadmap. People first, technology second.</p>

<p>The 90 days pass faster than you expect. The PMs who land well aren't the ones who moved fastest. They're the ones who listened longest and built enough trust that people let them move at all.</p>`,

  "after-the-category-quiet-reorganization-cpg": `<p>I've spent seven years watching consumer brands change, and I don't really trust either of the two stories people tell about CPG. The first is that incumbents are finished. Too slow, too risk-averse, outflanked by some founder with a Shopify store. The second is that incumbents are fine, because distribution and capital still decide who wins on a shelf. Neither's right. What's actually happening sits between them, and it's quieter than either camp wants to admit. The categories that defined this industry for the better part of a century are dissolving into each other. Most of the org charts inside the big CPGs haven't caught up. For scale: global CPG generates roughly $2T in annual revenue, comparable to Apple, Microsoft, Alphabet, Amazon, and Meta combined. A slow-moving giant where the categories underneath are quietly destabilizing.</p>

<p>The CPGs navigating this well have figured out something that sounds obvious in retrospect but is honestly pretty hard to execute. Consumers don't organize their lives around product categories. They organize around identity, moments, and meaning. A Gen Z consumer who reaches for <strong>Olipop</strong> isn't buying soda. They're buying a gut-health-coded ritual that happens to be carbonated. On the same day, they might pick <strong>Celsius</strong> for energy, <strong>Liquid Death</strong> at the bar, <strong>Athletic Brewing</strong> at dinner, and <strong>Poppi</strong> on the way home, substituting freely across what the industry still calls four different categories. Previously, I spent some time in California and kept noticing the same thing at checkout: customers picking up a Poppi and a Liquid Death together, where ten years ago that same basket would've been a Pepsi and a Coke. The label is almost irrelevant to the purchase. Industry data shows functional beverages, a category that didn't even exist as a defined label five years ago, outpacing traditional carbonated soft drinks by three to five times. The labels CPG used to compete on (diet, regular, sparkling, energy) flatten into noise.</p>

<p>The shift is pressuring traditional companies whose organizational logic was built around a fixed category. R&amp;D, the sales force, shelf negotiations, brand architecture - all of it assumes the category is stable. Consumers are quietly proving it isn't. The response across the larger players has taken two distinct forms, with companies either reinventing themselves from the inside or buying their way into relevance, and understanding both, including why one has a much worse track record than the other, is the strategic story worth telling in CPG today.</p>

<h2>Companies Are Reinventing Themselves From the Inside</h2>

<p>The first group has looked at category instability and decided to bet on a new identity from the inside. This kind of organizational conviction is rare in large public companies. Why? Because you have to look at a legacy business generating most of your revenue and decide to move resources away from it, either because market forces demand it or because you expect them to.</p>

<p>Take <strong>Philip Morris International</strong>, where I've been since October 2024. By the early 2010s, cigarettes were a textbook structural decline. Falling volumes, hardening generational stigma, and regulators tightening from every direction. PMI's response, ahead of its peers, was to redefine the business itself, not cigarettes, but nicotine delivery, broadly. That reframe produced IQOS in 2014, a heated tobacco device, which directly cannibalized the company's own cigarette volumes. ZYN came in via PMI's ~$16B acquisition of Swedish Match in 2022, more than Amazon paid for Whole Foods five years earlier, and the largest deal in PMI's history. It was bought specifically to accelerate the smoke-free vision. By FY2024, smoke-free products were ~40% of net revenue, and PMI's public commitment to making them a majority by 2030 still holds.</p>

<p>Take <strong>Mars</strong> next. At first read, Mars is best known for confectionery: Snickers, and M&amp;Ms. In 2017, they spent $7.7B acquiring VCA, the largest veterinary hospital chain in North America. That's about what BC Partners paid to take PetSmart private two years earlier. The entire publicly-traded leader in pet retail, for the same money as one vet-hospital roll-up. Sounds weird, until you remember Mars has been in the pet food space for decades. Petcare is now Mars's largest segment by revenue, bigger than confectionery, a reorganization that happened largely without press coverage because Mars is privately held and doesn't have to perform against a public earnings cycle. The VCA acquisition wasn't diversification; it was vertical integration of an identity Mars had already quietly become.</p>

<p><strong>Nestlé</strong> is doing the same thing, just more slowly. They've divested parts of their confectionery portfolio since 2018, sold US candy brands to Ferrero for ~$2.8B that year, roughly what Microsoft paid for Minecraft, and at the same time doubled down on coffee with Nespresso, Blue Bottle, and a health science division that deliberately sits between food and pharma. They're not becoming a pharma company. They're also not really a chocolate company anymore.</p>

<p>Three companies, three different answers, and that's the point. The synthesis isn't that they all chase the same identity, because they don't. PMI is in nicotine. Mars is in the human-animal bond. Nestlé is somewhere between coffee, food, and pharma. What the three share is the underlying move. Each one named a human need that survives when the category dissolves, then reorganized the rest of the business around that need. The category was always the wrong unit of analysis. The need underneath was the right one.</p>

<h2>Buying Their Way Into Relevance</h2>

<p>Quick clarification, because PMI and Mars both bought their way to this pivot too. PMI with Swedish Match. Mars with VCA. The difference isn't whether the second group acquires. It's why and what. PMI and Mars already knew the business they wanted to be in; the acquisitions accelerated a pre-existing thesis. The second group is doing something different. They're using M&amp;A to figure out what business they should be in, hoping the brand they buy will reveal the answer. Acquisitions for the first group are tools. For the second group, they're the strategy.</p>

<p>The second group decided that the consumer trust they needed was faster to buy than to build. In retrospect, it makes sense. Niche brands spend years building authenticity, community, and cultural relevance in ways large CPG companies just can't replicate by design. That logic produced an entire decade of DTC brands being built and then being acquired by the larger players. One of the earliest I remember is P&amp;G's acquisition of <strong>Native</strong>, an all-natural deodorant brand, in 2017 for ~$100M. CPG powerhouses buy the brand, and they buy the relationship, at least on paper. The larger company brings the distribution and capital. The acquired brand brings the identity the acquirer wants.</p>

<p><strong>PepsiCo</strong> is executing the most disciplined version of this strategy I've seen. They bought SodaStream for $3.2B in 2018. They picked up <strong>Siete Foods</strong>, a grain-free Mexican-American food brand with Gen Z and millennial loyalty, for $1.2B in 2024. Then in 2025, they bought <strong>Poppi</strong>, a COVID-era prebiotic soda brand built almost entirely around gut health and Gen Z aesthetics, for ~$1.95B. Each one targets a consumer segment that Pepsi-Cola and Lays just can't build organically at the same speed. Each is a bet on real demand growth, not a trend.</p>

<p><strong>Unilever</strong> and <strong>P&amp;G</strong> chased the same strategy with mixed outcomes. Unilever bought <strong>Dollar Shave Club</strong> for $1B in 2016. <strong>Tatcha</strong>, <strong>Dermalogica</strong>, and <strong>Paula's Choice</strong> came after. Unilever's legacy brands had been slowly losing share for years. Native, as I mentioned, was bought by P&amp;G. The intent is the same in every case. These brands had built something strong enough that the acquirer couldn't replicate it at the pace the market required, so they bought it instead.</p>

<p>And then something predictable happened.</p>

<h2>Why Distribution Destroys What It Buys</h2>

<p>The conventional wisdom on why CPG acquisitions of niche brands fail is mostly about culture and talent. The founder leaves. The team doesn't fit. Corporate processes slow everything down. Fine, fair, real pain points across M&amp;A as a whole. But there's a deeper problem worth naming. The main advantage that a large CPG company brings to an acquisition is the exact thing that destroys what made the brand worth buying.</p>

<p>Large CPG players bring distribution and capital. Getting a brand into 100,000 doors in 18 months is a real advantage. Having a balance sheet to fund national media and weather bad quarters matters too. But the niche brand's value, the thing that justifies a 10x or 15x revenue multiple, was almost entirely a function of its inaccessibility, its specificity, its feeling of discovery. The person who found Native deodorant through a DTC channel in 2017 bought it partly because it wasn't sitting next to the Gillette. The day P&amp;G pushed it to mass retail at scale, those consumers registered a shift. The product didn't change. The meaning did. And meaning, honestly, is most of what a niche brand ever was. (How niche brands scale without losing that meaning is a separate question, and a conversation for another article.)</p>

<p><strong>Dollar Shave Club</strong> is the textbook example. Unilever paid $1B for what was, frankly, a media company that happened to make razors. Michael Dubin's original viral video wasn't marketing for a product; it was a product. Within about five years of the acquisition, Dubin was gone (often the story with M&amp;A term clauses), the brand content had been sanitized into something indistinguishable from every other CPG campaign, and the subscription had stalled. Unilever sold DSC in 2023 to Nexus Capital Management for a fraction of what they paid. The brand still exists. What made it worth a billion doesn't.</p>

<p>Notice the second-order effect. As private label compresses commodity tiers, the value of a still-inaccessible brand goes up. But the only buyer with the capital to acquire it is also the one whose distribution machine will reliably destroy what made it worth buying. The acquirers who can hold that contradiction in their hands are the only ones who matter.</p>

<h2>Some Acquisitions Have Worked, Not Many, and Not by Accident</h2>

<p>The acquisitions that have worked share a single characteristic. The acquirer kept real operational independence for the brand, even when it felt uncomfortable to do so. <strong>L'Oréal's</strong> 2000 acquisition of <strong>Kiehl's</strong> is a partial example. The pharmacy brand, founded in 1851, has kept its no-mass-advertising philosophy intact (no billboards, no TV spots), and the stores still feel like the thing people sought out in the first place. <strong>Ben &amp; Jerry's</strong> is the more extreme case. When Unilever acquired it in 2000, the deal terms enshrined an independent board of directors. That board has publicly clashed with Unilever on the West Bank settlements dispute and on dairy farming standards, sometimes in ways that created real diplomatic problems for the rest of Unilever's portfolio. That's what operational independence actually costs. It's the cost most acquirers refuse to pay. These are exceptions for a reason. They require organizational restraint that runs directly against the financial and supply-chain logic that justified the acquisition in the first place. Most acquirers can't hold that tension for more than a few quarters.</p>

<h2>Why Non-Alcoholic Beverages Crystallize Everything</h2>

<p>The category that crystallizes every thread of this story (the identity shift, the two strategic paths, the distribution paradox, and a generational consumer change still underappreciated) is non-alcoholic beverages.</p>

<p>Consider what's happened over the last decade. <strong>Athletic Brewing</strong> was founded in 2017 on the premise that people who don't drink alcohol still want the ritual of beer. By 2024, it was a top-ten US craft brewery by volume without selling a single alcoholic drink, and reportedly valued at ~$800M in its most recent round. The detail that matters most here is the pricing. Athletic priced into the same shelf as premium craft alcohol, not below it, and held that pricing as it scaled. The category orthodoxy was that non-alcoholic beer was a discount play, because the alcohol was the value. Athletic proved that the value was the ritual and the identity. The ABV was kind of incidental. Every other player in the segment is now repricing against that finding.</p>

<p><strong>Liquid Death</strong> is the cleaner version of the same insight. The product is water. The valuation, roughly $1.4B as of its 2024 round, is entirely the cultural position. It's a can people can hold at a bar without it announcing they're sober. That's the entire product. The water is just the delivery mechanism. Once you see that, you start seeing how much of the next decade of consumer brand-building is going to look like this. Products engineered around the social shape of an occasion, not the contents of the package.</p>

<p>The lazy pushback is that every generation drinks less in its early twenties. Wait until Gen Z has disposable income and professional stress, and they'll come around. The harder pushback is more interesting and worth taking seriously. The reported drinking decline is strongest in survey environments where social desirability bias rewards the answer, and ground-truth consumption (bar receipts, off-premise volumes, household panel data) may revert closer to historical norms once income and stress arrive in equal measure. That objection deserves an honest answer. And it still misreads what's happening. Two things have changed in a way that isn't cyclical.</p>

<p>Sleep optimization culture (tracking HRV, tracking RHR) has made alcohol's effect on sleep visible to a health-focused young audience in a way it never was before. Mental health awareness has gone up among Gen Z, which has tagged alcohol as a behavioral risk in ways that are fully mainstream now. The signal that matters most isn't behavioral. It's identity. Being sober or sober-curious has become a positive identity marker for Gen Z, not a deprivation. When abstaining from alcohol becomes aspirational, when it's a thing people do because of who they are, not because of what they're avoiding, the change is real, and the change is permanent. The behavioral shift preceded the regulatory pressure. Sugar is seeing it too, with the rise of zero-sugar drinks. The companies building for that reality are already positioned.</p>

<h2>Where Larger CPG Players Go From Here</h2>

<p>Here's the paradox the rest of this argument has been circling. Acquirers are compelled to keep making these deals. The ability gap is real, the category shift is real, the timing is real. And most of them will execute the deals badly, for the exact reasons I just laid out. Both things stay true. The next five years will produce a wave of acquisitions, and most of those acquisitions will quietly destroy the value they paid for. The alpha sits with the small number of acquirers who have figured out that the distribution machine is a choice, not an inevitability. Everyone else will run the Dollar Shave Club playbook, write it off in five years, and tell their boards it was a culture problem. So what should we expect? My narrowest, most confident prediction is this. Acquisition activity will accelerate in health, wellness, and zero alcohol over the next three to five years, and the deals that get made will be driven by two compounding factors.</p>

<p>The first force is structural, but it isn't a talent problem. AB InBev cannot build Athletic Brewing from a standing start because the constraints that make Athletic possible are the constraints a public CPG can't impose on itself. Innovation pipelines inside large CPGs are optimized for line extensions that ride existing distribution. Brand-ladder logic punishes anything that competes with a flagship. Internal IRR thresholds kill projects with under $200M of year-five revenue ambition. And the slow brand-building that creates cultural authority? The refusal of distribution that would dilute the position? The premium pricing held against promotional pressure? The founder's voice surviving a board meeting? All of that is the exact behavior that gets edited out by the second quarterly review. The community trust, the founder story, the way Athletic kept saying no to distributors even when the deal was already on the calendar; that took years, and you can't engineer it backward inside a public earnings cycle. Acquisition isn't the preferred path. It's the only path.</p>

<p>The ability gap matters more now than at any point in the industry's history because of what's happening underneath. Private labels like Amazon Basics, Kirkland, and store-brand organics have been compressing margins in commodity tiers at a pace that most public CPG analysts still underweight. As the bottom of the portfolio commoditizes into a price war that big CPG can't win, the only available margin sits at the top. And the top is identity-coded. They can't build identity-coded brands organically fast enough. Private label and acquisition are the same story told from opposite ends of the shelf.</p>

<p>The second factor is timing, which is the most underappreciated of the two. Category-defining brands compound at premium multiples the moment a board has visibility into the unit economics. The discount window between proven and priced-in is roughly 18 to 36 months. Long enough to be real, short enough that most acquirers miss it because their own internal approval cycles eat six to nine months. After roughly $300M in revenue with mature distribution, the cultural premium has compressed into the multiple, and the deal stops being accretive. The acquirers who'll actually create value here are the ones who can move at founder pace and still write a check at corporate scale. There aren't many of them, and that's the whole point.</p>

<h2>The Acquisitions Worth Watching</h2>

<p>Start with <strong>David</strong>. Peter Rahal co-founded RXBar, sold it to Kellogg's for $600M in 2017, and came back with David. The product itself: 28g of protein in a 150-calorie bar, zero sugar. That macro profile didn't exist at retail before David. The brand went viral on launch in a way almost nothing in shelf-stable food does. Mars is the obvious acquirer for a few reasons. Confectionery is the segment Mars has been quietly de-emphasizing. The Petcare cash flow makes the check writable without forcing a strategic re-rate. And Rahal's RXBar/Kellogg's experience means he will negotiate operational independence into the term sheet on day one, which is the actual unlock. Mars learns from M&amp;A failure faster than its peers because it doesn't have to manage a public earnings cycle.</p>

<p><strong>Magic Spoon</strong> goes to <strong>Kellanova</strong>. Cereal at the volume tier is in real decline. The only available growth is premium-coded, macro-rebuilt cereal aimed at adult Gen Z and millennial buyers. That's exactly what Magic Spoon has spent five years building, and it's a category Kellanova just can't innovate into from a Frosted Flakes starting point. M&amp;A inside cereal is going to look like this. Kellanova buys Magic Spoon to keep General Mills from doing it first, and pays a premium that wouldn't pencil out if you didn't factor in the optionality of not buying it.</p>

<p><strong>LMNT</strong> goes to <strong>PepsiCo</strong>. Gatorade owns the legacy electrolyte category, but every dollar of category growth has migrated to no-sugar, high-sodium, performance-coded formulation. That's LMNT's exact position. The risk PepsiCo can't tolerate is Coca-Cola buying LMNT first and giving BodyArmor an adjacent premium SKU at the high end of the shelf. Defensive timing pressure, plus capability gap, plus founder-led brand authenticity that Gatorade just can't build internally; same playbook as Poppi, 12 months later.</p>

<p><strong>Seed</strong> goes to <strong>Nestlé Health Science</strong>, with <strong>Reckitt</strong> as a likely secondary bidder. Probiotics is the category where the supplement industry's credibility problem is most acute, and Seed has spent its entire existence (clinical trials, peer-reviewed publications, transparent formulation) distinguishing itself from that problem. For Nestlé Health Science, this is the cleanest available entry into a category they've publicly identified as strategic. Buying Seed is buying the science narrative whole, not just the brand. The risk is timing. Seed is small enough right now to be acquirable on terms that still respect the founder's editorial control, and that window closes the moment the next funding round prices in the category leadership Seed has already earned.</p>

<p>Here's the caveat, and it matters because of the distribution paradox I described earlier. The acquirers that generate value from these deals will be the ones who have figured out that getting a brand to 100,000 doors is a choice, not an inevitability. The ones that treat integration as the goal, instead of protecting the brand's cultural integrity, will repeat the Dollar Shave Club playbook. And honestly, there are a lot of them.</p>

<p>The acquirers are trying to buy their way to an answer. The brands worth acquiring (Liquid Death and whatever comes after it) are the ones that answered the question so clearly that a balance sheet was willing to pay billions just to be in proximity to that clarity. Then the acquiring infrastructure does what acquiring infrastructure is built to do, and the brand stops being the brand.</p>

<p>The category is unstable. The human need underneath isn't. The distance between those two facts is where the most interesting consumer business of the next decade is going to get built. And we're nowhere near finished watching it play out.</p>`,

  "take-risks-to-write-a-better-brand-story": `<p>A brand is the end result of the choice it makes. It's not just a banner or a tagline it uses, but rather the key decisions it takes and how those decisions translate to other people. This holds true for both self-branding and corporate branding. In the case of corporate brands, many refer to companies as "brands" but they aren't the same. The difference is that your brand is what communicates value to the audience, so much so that people often conflate brand with everything a company offers. Sales, operations, UX, partnerships &amp; marketing all should show the commitment to a larger belief aligning with the values. Only if others can see the commonality between the actions, a brand has successfully added meaning and spirit to the company. Put differently, a consistent denominator resonates with people, laying a foundation that connects with people, but executing such a vision to life is what many brands and their campaigns get wrong. A good example is Starbucks as it goes a step ahead and taps deeper into our beliefs about ambition, work, networking, and creating connections, and that's the reason why you and I choose Starbucks over other coffee shops, even if the quality of the coffee might be lower than many other authentic coffee shops.</p>

<p>A factor that makes a brand stand out is the risk it takes to differentiate itself at tough times. I love Nike. I believe the company has great advertisements and a beautiful brand story. It's influential in the right essence and has taken steps over time that deepens its brand story and are risky at the same time. Of course, risk brings in a lot of controversy over its practices, but Nike is possibly the best advertiser in modern business history. Over the years, Nike has positioned itself as a brand that isn't selling just athletic shoes and apparel. They inspire people to become better athletes and achieve their personal best, and that's a secret to their differentiation. Back in June 2020, Nike put a twist to its iconic "Just Do It" campaign.</p>

<p>That was a pivotal moment for its brand story and an enormous risk. Racism is a big problem, but brands who just put up a 30-second advertisement don't prove they are serious about it. Nike took a stronger stance for the socially conscious millennial and Gen Z who have been growing as a large target market for the company. Embracing Colin Kaepernick was another risk they had taken. The campaign around him was divisive because it jumped on America's biggest fault lines — race, patriotism, sports, and business. But according to Nike founder Phil Knight, that was kind of the point. "It doesn't matter how many people hate your brand as long as enough people love it." The question here is why did they take both these risks? One because it brings headline attention — something nearly every company seeks — and two because people of color have a <strong>higher representation</strong> in Nike's customer base than the general population. Market research revealed that the campaigns were in sync with the race, age, and political views of a large customer base. Their brand story moved previously from promise to performance and is now transcending from words to actions. Nike took risks that aligned with the company's core principles, and it did bring heat from people outside the target demographics, but it simultaneously strengthened the brand with the people who matter most. Nike's mission is to bring inspiration and innovation to every athlete in the world. Colin Kaepernick, through his advocacy, conviction, and talent, exemplifies those values in the strongest of terms.</p>

<p>Early-stage entrepreneurs feel the risk appetite is much lesser and that's true. You can't end up risking too much early on. This is why they come with different versions of their story — the version they tell and the version they hide. A good brand strategy should take all of it and combine both versions into one meaningful story. At Laumière, we often face the challenge of how to combine the story together: what we are doing, what we are trying to do, and most importantly, why we are doing it. We believe having clear values and a thorough understanding is essential. Once done, getting it translated via the right medium is the next step. When we say we use only all-natural products, we take a minimal risk of losing out on people who shy away from the brand — but at the same time, people reciprocate and give it a try. Own the entire story. Communicate it clearly and your minimum viable audience will love the brand and resonate with its story.</p>

<p>Brands often ignore the level of personalized commitment they show to their customers. Transparency, accountability, and humanity are essential for a business and its brand story. A customer needs to believe that the brand is honest and stands for what it says. If customers find a grey area, they will almost always shy away. Put differently, a brand does well when the leadership signals honesty and accessibility. Customers love the idea of a brand having a face they can resonate with. It's a risk — because depending on the situation, the leadership will be the first person to come for when things go wrong — but as a leader, that's what you signed up for. Own up to your mistakes and it will pay off.</p>

<p>Actions always speak louder than words, and every action you take on behalf of the company is a brand signal. Sending the signal that you, as a leader, are willing to take risks is rewarding and sets the brand identity. It also helps in acquiring loyal customers, getting better people to work with the firm, and fostering long-term partnerships. On the flip side, an organisation is vulnerable to anything that damages the reputation. In terms of market value, <strong>70–80%</strong> of it comes from hard-to-assess intangible assets like brand equity and goodwill. A company is the sum of its actions, not its words. Every interaction a customer has with your brand makes up the tapestry of its story. So create content, brand stories, and interactions that tell people who you are and what you stand for. Better yet, get your audience to help you tell those stories — by taking calculated risks to build your brand story, and watch something get built that truly resonates.</p>`,

  "building-maintainme-privacy-first-calorie-tracker": `<p>I'm excited to share the launch of my latest open-source project, <strong>MaintainMe</strong>. As someone who recently joined Google, I realized how easy it is to gain the infamous <em>&ldquo;Googler 15&rdquo;</em> with all the free food around! I wanted a simple way to track my calories, but I was constantly frustrated by existing apps that are riddled with paywalls, ads, and privacy-invasive tracking.</p>

<h2>The Motivation</h2>

<p>The health and fitness app ecosystem is broken. Users are forced to pay monthly subscriptions just to log their meals or scan a barcode. Worse, their personal health data is often sold to third-party brokers. MaintainMe was born out of a desire for a <strong>free, open-source, and entirely private</strong> alternative.</p>

<p>I built MaintainMe as a Progressive Web App (PWA) so that anyone can use it across iOS, Android, and web without dealing with confusing app store policies or downloads.</p>

<h2>Powered by Google Gemini AI</h2>

<p>To make logging meals frictionless, I integrated the incredible power of the <strong>Gemini AI model</strong>. Instead of manually searching through thousands of food databases and estimating portion sizes, you can simply type what you ate (e.g., &ldquo;A bowl of oatmeal with a sliced banana and a spoonful of peanut butter&rdquo;) or take a quick photo of your plate. Gemini automatically detects the items, estimates the calories, and breaks down the macronutrients instantly.</p>

<p>This has completely transformed how I track my nutrition. The AI handles the hard part, and I stay mindful of my goals. Let me know what you think of the project on GitHub!</p>`,

  "building-scalable-data-models-insights": `<p>Last month, I had the incredible opportunity to visit the <strong>Google London office</strong>. Beyond the amazing food and views, the trip provided profound insights into how world-class engineering teams approach one of the hardest problems in our industry: Data Modeling at scale.</p>

<h2>The Reality of Scale</h2>

<p>When you are dealing with petabytes of data flowing in per second, the naive approaches to database schemas evaporate. &ldquo;Just add an index&rdquo; is no longer a valid architecture strategy. Instead, the focus shifts entirely to <em>how the data is structured at rest</em>.</p>

<p>One of the key takeaways was the absolute necessity of rigorous <strong>Data Validation</strong> early in the pipeline. If bad data makes it into a core entity table at Google scale, cleaning it up isn't just a headache; it's a computational nightmare.</p>

<h2>Translating Business Requirements</h2>

<p>Another crucial lesson was learning how to act as a bridge. As Data Engineers, our jobs aren't just writing pipelines. The hardest part is successfully translating fuzzy, ambiguous business requirements into robust, concrete metrics and dimensions.</p>

<p>If the marketing team wants &ldquo;User Engagement Score,&rdquo; the data model must define precisely what constitutes an interaction, what the decay rate is, and how historical metrics remain consistent if the formula schema changes later. Designing future-proof schemas requires anticipating these shifts before the first table is ever created.</p>`,

  "mastering-sql-optimization-performance-cost": `<p>In the era of cloud data warehouses like BigQuery, Snowflake, and Redshift, it is dangerously easy to write terribly inefficient SQL. Because the infrastructure scales so seamlessly, poorly written queries often hide behind massive compute power—until the monthly cloud invoice arrives. Let's talk about mastering SQL optimization to save both time and money.</p>

<h2>Stop using SELECT *</h2>

<p>This is SQL 101, but it remains the most common error I see in production pipelines. Modern analytical databases are <strong>columnar</strong>. By requesting <code>SELECT *</code>, you force the engine to scan the entire dataset across disk storage, even if your downstream logic only needs two columns. Always specify exactly the columns you need.</p>

<h2>Partitioning and Clustering</h2>

<p>If you are building pipelines that query time-series or sequential data, <strong>partitioning</strong> is not optional. Partitioning divides large tables into smaller, manageable chunks based on a specific column (usually a date). When a query filters by that date, the engine simply ignores all other partitions, radically dropping the bytes billed.</p>

<p>Similarly, understanding and utilizing <strong>Execution Plans</strong> (using <code>EXPLAIN</code>) is the best way to determine if your joins are broadcasting efficiently or if you are accidentally forcing a full nested-loop iteration over billions of rows. Optimize your pipelines today, your CFO will thank you tomorrow!</p>`,

  "understanding-agentic-ai-and-google-adk": `<p>The software engineering landscape is undergoing a monumental shift with the rise of <strong>Agentic AI</strong>. But what exactly does that term mean, and how does it differ from the conversational chatbots we've used for the last few years? Today, I want to talk about how Agentic systems are moving from novel concepts to robust, production-ready engineering blocks.</p>

<h2>What is Agentic AI?</h2>

<p>Unlike a simple prompt-and-response system, Agentic AI refers to systems that are capable of <strong>autonomous reasoning and action</strong>. You don't just ask a question; you provide an objective. The AI then formulates a step-by-step plan, delegates tasks to various sub-agents or tools, interprets the results, and adjusts its approach if it hits a roadblock. Let's think of it as the difference between a textbook (an LLM) and an intern (an Agent).</p>

<p>However, building these systems from scratch requires intense orchestration—managing context windows, handling tool-calling failures, routing queries, and ensuring deterministic fallbacks.</p>

<h2>Enter Google ADK</h2>

<p>This is where the <strong>Google Agent Development Kit (ADK)</strong> comes into play. The ADK is an incredible framework designed to radically simplify how engineers connect their Large Language Models to real-world APIs, vector databases, and enterprise data sources. It provides native abstractions for defining distinct tools (like reading a file, searching a database, or invoking a web hook) alongside specialized agents that know precisely when and how to use them.</p>

<p>The ADK acts as the orchestration layer, taking the heavy lifting out of complex prompt-chaining and state management, allowing us to focus on the business logic instead. If you haven't started exploring agent orchestration yet, I highly recommend checking out the frameworks emerging in this space!</p>`,

  "six-consumer-trends-india": `<p>The cliché about India is that it's a price-sensitive market where global brands have to cut corners to win. That framing is dead.</p>

<p>Over the last few months, I read on startups, moved between cities, visited stores, and talked to founders - spending time as a consumer in one of the world's most interesting markets. What I came back with is a set of observations I can't stop thinking about. A consumer class that wants the real thing, and is increasingly able to afford it. Indian brands building that real thing faster, and with sharper cultural fluency, than most foreign entrants can match. And a broader market moment - consumer class expanding, digital infrastructure finally caught up with aspirations, demand emerging that simply didn't exist five years ago - that I think is still underappreciated.</p>

<p>Six categories prove it. I'm writing them down because I think they matter.</p>

<h2>1. Protein Is India's New Food Religion</h2>

<p>Something has shifted in how Indians think about what they eat. Protein, once associated with bodybuilders and gym culture, has gone fully mainstream. <strong>Amul</strong> is leading the charge from the establishment side, leveraging its unmatched distribution and brand trust to own the protein narrative in traditional FMCG. When <strong>Haldiram's</strong>, a legacy snacking institution, launches a protein namkeen line, it means a category has officially arrived, at least in the early stages.</p>

<p>The more interesting story is in D2C. <strong>Whole Truth</strong> and <strong>Cosmix</strong> have built something rare in any market: brand credibility that rivals international players on quality perception. Their advantage isn't just the product - it's the story. Clean labels, India-specific formulations, no-nonsense positioning. They've demonstrated that the Indian consumer is sophisticated enough to choose a local brand over a global one when the narrative is tight, and the product actually delivers.</p>

<p>Yoga Bar's acquisition by ITC in 2022 validated the category for institutional capital. <strong>Epigamia</strong> continues to push the frontier on protein density per calorie in dairy formats. And QCommerce has been a quiet enabler, making it possible to get a high-protein Greek yogurt or a clean-label bar in 10 minutes, unlocking impulse health purchases that simply didn't exist before. Watch for global protein brands to struggle to hold share as Indian alternatives improve and QCom shelf placement becomes the new battleground.</p>

<h2>2. From Energy to Wellness: A Category Evolution</h2>

<p>The energy drink wave that <strong>Sting</strong> surfed and <strong>Red Bull</strong> established has crested. What's rising in its place is more nuanced: ashwagandha gummies, sleep supplements, adaptogen drinks, gut shots. A particular consumer class has moved from &ldquo;I need instant energy&rdquo; to &ldquo;I want to feel good across the whole day.&rdquo; That's a more complex and significantly higher-margin need. There is still a large category for instant energy where Sting is well-placed, though.</p>

<p>This is the &ldquo;functional beverage&rdquo; shift, and the white space in India is enormous. Calming and recovery as product occasions are dramatically underdeveloped relative to the demand that already exists. The category is expected to grow significantly, and the brands that frame themselves around system-level wellbeing rather than just peak energy are the ones to watch.</p>

<p>There's a broader thesis here: India may have partially skipped the junk-energy phase that defined the West in the 2000s and is landing more directly into the functional wellness era. Whether that holds across income segments or is just true in urban, upper-middle-class households is worth watching - but the early signals are omnipresent.</p>

<h2>3. Men's Grooming Has Earned Its Place</h2>

<p><strong>Bombay Shaving Company</strong> was a pioneer in making men's skincare feel intentional rather than accidental in India, and the category has matured considerably since those early days. What's notable now is the front-and-center placement of men's grooming on e-commerce and QCommerce homepages. That prime digital real estate is a strong proxy for purchase frequency and basket size. The category has earned its shelf.</p>

<p>On the M&amp;A side, the story is already well underway. <strong>Marico</strong> acquired <strong>Beardo</strong> in a two-stage deal, scaling the brand to ₹214 crore in revenue in FY25 - up 24% year-on-year with profit growing 3.6x. That outcome is a proof point that Indian men will build long-term brand loyalty when the product and positioning are right. Marico's broader D2C acquisition strategy (Plix, Beardo, Just Herbs, True Elements) signals that FMCG majors have fully accepted that D2C brands are building consumer trust faster than traditional channels can.</p>

<p>The open question: are there still strong, independent, male-focused Indian D2C brands that haven't yet been acquired as the category grows?</p>

<h2>4. Pet Care Has Gone Mainstream</h2>

<p>Walk into any QCommerce app in a major Indian city, and you'll find a dedicated pet care section stocked with premium kibble, supplements, grooming products, and treats. That wasn't true a few years ago. <strong>Drools</strong>, a homegrown Indian brand, has earned real consumer trust and is performing exceptionally well. The category isn't a niche anymore - it's becoming a core part of how urban Indians spend.</p>

<p>Two layers building on top of this: pet insurance and pet-friendly travel. The pet insurance market in India hit roughly USD 294 million in 2024 and is projected to grow at ~13% CAGR through 2033. But here's the striking part: fewer than 1% of Indian pets are currently insured. Awareness and infrastructure are being built in real time, with brands such as Digit and Bajaj Allianz introducing tailored policies. The headroom is enormous.</p>

<p>The structural driver underneath all of this is a shift in household formation. DINK (Dual-Income, No Kids) households are growing in Indian metros. Fertility rates are declining. Middle-class incomes are rising. In that context, pets move from peripheral to central in the emotional and financial lives of consumers. The Indian pet care market overall is growing at over 20% CAGR. This feels like the early innings, not the peak.</p>

<h2>5. The Coffee Wave Has Arrived - What Comes Next?</h2>

<p><strong>Blue Tokai</strong> cracked the premium specialty coffee segment with genuine product quality and a community-first approach. <strong>Rage Coffee</strong> built brand cachet and youth credibility. <strong>Sleepy Owl</strong> pioneered ready-to-drink cold brew and grew fast. Together, these brands did something real: they normalized paying a premium for origin-forward, well-roasted coffee in India. That wasn't a given a few years ago.</p>

<p>The open category now is <strong>instant coffee</strong>. Nescafé and BRU still dominate a format that the vast majority of Indians use every single day. No one has seriously challenged them on quality, and the other western brands haven't been able to position themselves well - and that feels like an opportunity. There's a real opening for a brand to do to instant what Blue Tokai did to filter: bring specialty credibility and clean ingredients to a format built for convenience. Soluble single-origin, mushroom coffee, and adaptogen-infused instant formats all exist elsewhere. India hasn't fully seen them yet.</p>

<p>Another factor to keep in mind: India is also a tea-drinking nation, as &ldquo;chai&rdquo; has been part of the culture. Coffee, though, is starting to be more relevant. It will be exciting to see how tea and coffee position themselves - which is different from other cultures. An example is the Turkish culture, where Turkish Tea and Turkish Coffee both balance out. India is still figuring this out, and I want to see this.</p>

<h2>6. Fitness Culture Is Real, But Pricing Will Decide Who Wins</h2>

<p>Run clubs are now a genuine social institution in Bangalore, Mumbai, and Delhi. They function simultaneously as fitness communities and professional and dating networks for young, urban Indians. <strong>WHOOP</strong> only recently launched in India. <strong>Hyrox</strong> made its India debut in Mumbai in May 2025, drawing 1,650 participants from 24 countries for its inaugural race - a strong signal for a format that didn't exist in India before. Bangalore Hyrox 2026 just happened last weekend, and Delhi tickets were out the same week. It's a cult following and growing in the country.</p>

<p>The structural tension in this category, though, is price vs. purchasing power parity. A WHOOP membership or Hyrox entry fee priced at global rates is accessible to only a narrow slice of Indian consumers. The instructive analogy is <strong>Spotify and YouTube in India</strong>: both introduced India-specific pricing and saw adoption explode. Fitness brands that localize on price - not just on language or marketing, but structurally on what the product costs - will unlock a far larger addressable market.</p>

<p>The opportunity is an Indian fitness tracker or wearable built for the ₹3,000–8,000 price point that delivers 70% of what Garmin or WHOOP offers. <strong>GOQii and UltraHuman</strong> have played in this space, but haven't fully captured it. The space feels genuinely open. Alternatively, watch for fitness platforms to follow the Spotify playbook and introduce PPP-adjusted pricing - and watch what happens to adoption when they do.</p>

<h2>Why I'm Bullish</h2>

<p>Each of these six observations is interesting on its own. What makes me genuinely excited is what they have in common: they are all being driven by an Indian consumer who is more sophisticated, more brand-aware, more health-conscious, and more willing to pay for quality than the conventional narrative gives credit for.</p>

<p>The cliché about India is that it's a price-sensitive market where global brands have to cut corners to compete. That framing is increasingly obsolete. What I saw was a consumer class that wants the real thing - and is increasingly able to afford it. More importantly, Indian brands are building the real thing, often faster and with better cultural fluency than foreign entrants.</p>

<p>The structural tailwinds are real: rising middle-class incomes, declining fertility and the attendant shift in how discretionary income is spent, QCommerce as a distribution unlock, and a D2C infrastructure that lets good brands reach consumers without the legacy friction of traditional retail. These aren't temporary tailwinds. They compound.</p>

<p>I came away from this with a clear conviction: the brands and founders building for the Indian consumer right now - across multiple verticals - are doing some of the most interesting work in consumer anywhere in the world. And the market is still early enough that the best outcomes haven't been written yet.</p>

<p><em>That's a combination worth paying attention to.</em></p>`,
  "the-safe-bet-music-discovery": `<p>I DJ'd for the better part of a decade. I don't do much of it now. That time went into my health instead, which is an article for another day. Music stayed central to my life, and for a while something has bothered me: almost nothing I listen to is new. I assumed that was me getting older. Then I looked at the numbers.</p>

<p>In 2024, record labels put $8.1 billion into A&amp;R and marketing, the highest figure on record and about 27% of total industry revenue. It bought less listening in the market that matters most. U.S. streams of music released in the previous 18 months fell 3.3% year on year in the first half of 2025, to 168.5 billion. Global streaming grew almost 10% that year, to 5.1 trillion plays. The industry is spending more than ever to find new artists and getting less return on it in the room that counts. This article is about that gap: what's causing it, who profits from it, and what I think happens next to Spotify, which leads this market and increasingly decides both what we hear and how we find it.</p>

<p><strong>Sidebar:</strong> A&amp;R stands for Artists and Repertoire. It's the part of a label that finds new artists, signs them, and shepherds the record. Think of it as the industry's research and development budget.</p>

<h2>First, the story you've probably heard is wrong</h2>

<p>For years the standard line was that streaming killed the music business. It didn't. Recorded music revenue grew 6.4% to $31.7 billion in 2025, the eleventh straight year of growth. Nobody starved this industry. What changed is what the money buys.</p>

<p>For decades a record label worked like a venture fund. Sign ten albums, two take off, and those two pay for the other eight plus the building. It was unfair to the eight who missed, and it was also the only model that reliably produced great new art, because you can't find a rare artist without paying for the misses along the way. That trade has stopped clearing. Two things broke it. Attention got harder to reach, because 253 million tracks are fighting over a fixed amount of listening. And capital started favoring the sure thing over the discovery, because a superfan who already loves an act is safer money than a stranger who might love a new one.</p>

<h2>New music lost plays, not just share</h2>

<p>In the first half of 2025, music older than 18 months took 75.8% of all U.S. streams. Fresh releases got 24.2%. People misread that number constantly, so let's deal with the two fair objections upfront. First, the catalog pool grows on its own. Whatever came out this morning becomes catalog in 18 months, so a rising catalog share is partly just arithmetic. Second, a lot of streaming's subscriber growth is now coming from Latin America, Africa, India and Southeast Asia, where listeners are working through deep local catalogs they couldn't easily reach before. Both points hold. Neither explains the harder number, though. New music didn't only lose share. It lost 3.3% of its actual plays, in the world's largest music market, in a year when global listening rose 10%.</p>

<p>There's also a catch buried in that $8.1 billion figure, and it's worth knowing before someone quotes it. IFPI reports A&amp;R and marketing as a single blended line and publishes no split between them. So the number held up as proof that labels still back unknown artists also includes every dollar spent pushing acts that already work. How has that mix shifted over a decade? Nobody outside the majors knows, and nobody has been made to say.</p>

<h2>There's more music than ever, and half of it isn't human</h2>

<p>The lazy version of this argument is that nobody makes original music anymore. That isn't true. Supply has been exploding. By the end of 2025, streaming platforms held 253 million tracks, up nearly 38 million in a single year. That's roughly 106,000 new uploads every day, and over 96% of them arrive through DIY and independent distributors. Supply grew 18% in twelve months.</p>

<p>Deezer is the only major service publishing a breakdown, and it reports that most of the daily flood is now machine-made. AI-generated tracks hit 44% of daily uploads by April 2026, around 75,000 songs a day, up from 10,000 a day in early 2025. By that summer it crossed 50%. Spotify deleted 75 million AI spam tracks in a single sweep in late 2025. Almost nobody listens to any of it. AI tracks are 1% to 3% of Deezer streams, and 85% of those plays get flagged as bot fraud and demonetized. One number reorganised how I think about this. Of those 253 million tracks, more than 120 million got fewer than ten plays across the entire year. Not ten a day. Ten in total. Eighty-eight percent got under a thousand. Meanwhile roughly 0.2% of all tracks captured nearly half of all listening worldwide. Supply grew 18%. Human attention didn't, because human attention is finite. Uploading a track to Spotify costs about twenty dollars and an afternoon. The streaming industry sold that as democratization, and it was, until the volume broke the system. When distribution costs nothing, distribution is worth nothing. Everything the old industry charged for, pressing vinyl, shipping CDs, retail shelf space, radio promotion, collapsed into a commodity anyone can buy. What stayed scarce was being found. So the whole ecosystem shifted toward selling the one thing left that still has value: discovery.</p>

<h2>Spotify's smartest business is hidden in plain sight</h2>

<p>I use Spotify daily and I like the product. That's why I've spent so long working out how it makes money. If you work in retail or tech, you've seen this playbook before. Amazon sold goods at thin margins for years, then realised the real prize was placement on the search page and started charging its own suppliers for visibility. That sponsored ad business did $68.6 billion in 2025, making Amazon the third biggest digital ad platform behind Google and Meta. The store became the landlord, and landlording turned out to be the better business.</p>

<p>Spotify runs a version of the same play. It's called Discovery Mode. An artist or label opts a track in. Spotify then pushes it harder in algorithmic recommendations, radio and autoplay. In exchange, the artist accepts roughly 30% lower royalties on the plays that promotion generates. And no money changes hands.</p>

<p>Say a track would normally earn $1,000 from a batch of streams. Switch on Discovery Mode, the track gets pushed to more listeners, and it earns more plays. But on those plays the artist is paid about 30% less. Spotify never sends an invoice. It simply keeps more of what it would otherwise have paid out. Economically, that's an advertising fee. On the accounts, it looks like a lower cost. Which is why most takes on Spotify miss it. Look at the advertising line, &euro;1.84 billion out of &euro;17.19 billion in 2025, and you'd fairly conclude Spotify is a subscription company with a small ad business on the side.</p>

<p>But placement income never touches that line. Discovery Mode reportedly brought in over &euro;60 million in its first year, back in 2021, and Spotify hasn't published a figure since. By booking paid placement as a reduction in royalty costs, Spotify grows a high-margin business that never appears on a slide, and a revenue stream nobody has to disclose is one nobody has to defend. By the second quarter of 2026, Spotify's gross margin hit a record 33.4%. I'm not going to claim Discovery Mode explains that number, because on the one figure Spotify ever published it's nowhere near big enough. My claim is narrower: the mechanism can compound for a decade and nobody outside the company will ever be able to check.</p>

<p>This is where the two halves of the industry's spending meet. Labels pay to find and develop an artist. Then, to get that artist heard over 106,000 new uploads a day, many pay Spotify again, not in cash but in royalty points, through Discovery Mode. The same dollar that used to fully fund a record now has to clear two tolls: the label's own bet on the artist, and the platform's fee for surfacing it. That second toll doesn't show up in the $8.1 billion IFPI publishes, because it isn't paid. It's kept.</p>

<h2>The next dollar comes from the ticket, not the stream</h2>

<p>If returns on new music keep compressing and subscription prices have a ceiling, you stop chasing more listeners and start monetising the ones who care most. Spotify says it has helped drive over $1.5 billion in ticket sales through its ticketing integrations. In 2025 alone, nearly 25% more artists used the feature to list tour dates than the year before. In 2026 it expanded in-app buying with SeatGeek and rolled out presales through Live Nation, reserved for an artist's top listeners.</p>

<p>The superfan saga makes the strategy obvious. There were rumours all through 2025 about a $5.99 a month "Music Pro" add-on. It never launched. Instead, DJ tools, lossless audio and presale access all went into standard Premium at no extra cost. Spotify chose to defend $12.99 rather than reach for $19. That only makes sense if the superfan money was never meant to come from the subscription at all. It comes from the ticket, and after that the merchandise.</p>

<h2>This is my prediction: Netflix merges with Spotify</h2>

<p>This belongs to everything above, not beside it. Spotify is the only company at the top of this market that has to earn its cost of capital on music, and that constraint is why Discovery Mode exists at all. So who ends up owning Spotify is a question about discovery, not just about corporate structure. I think Netflix merges with Spotify within three to five years. Let me explain why, and then why it might not happen.</p>

<p>Start with Spotify's position. It reached 300 million paid subscribers and 777 million monthly users, holding roughly 31% of the global paid market, more than Apple Music and Amazon Music combined. But it's alone in a way the others aren't. Apple, Amazon and Google all treat music as a retention feature for a bigger ecosystem. None of them needs music to turn a profit on its own. Spotify does, and it took 17 years from launch to reach about $2.5 billion in annual operating profit. Every aggressive move it makes, Discovery Mode included, comes from competing against three companies that don't need the money.</p>

<p>Netflix has both the appetite and the machinery for a deal this size. Earlier in 2026 it bid $83 billion for Warner Bros Discovery with financing committed. Warner took a superior offer from Paramount Skydance, Netflix declined to raise, and it walked away with a $2.8 billion break fee that Paramount paid on Warner's behalf. So Netflix will attempt something transformative, can fund it, and knows when to stop bidding.</p>

<p>It's already testing music. Netflix has streamed live global concerts, its ad business is scaling fast, and it co-distributes podcasts with Spotify, including jointly funding a nine-figure talent deal. Two companies co-underwriting talent looks less like a partnership and more like a rehearsal. Everyone else is blocked. Apple, Amazon and Google would each be buying a business they already run, straight into an antitrust review none of them wants. Netflix has the subscriber base, the live ambition and the ad engine, and no music service.</p>

<h2>Two things could stop it</h2>

<p>The first is control. Daniel Ek and Martin Lorentzon hold roughly 69% of Spotify's voting power through special shares the public can't buy, as of the end of 2025. There is no hostile bid, no activist campaign, no proxy fight that works here. Spotify can only be sold if Ek decides to sell it. The second is price. At a valuation near $100 billion before any premium, this isn't an acquisition. It's a merger of near-equals, and it would rank among the largest media deals ever attempted.</p>

<p>But the corporate signals point one way. In January 2026, Ek moved to Executive Chairman, handing daily operations to two co-CEOs so he could focus on capital allocation and long-term strategy. That's not the job of someone running a company. It's the job of someone deciding what it becomes. After 17 years of compounding, subscriber growth slows and pricing hits a ceiling, and at some point choosing the right owner is the most valuable thing management can do. Lorentzon has already started, selling roughly $81 million of stock in recent months. The signal to watch is whether Ek follows him.</p>

<h2>The risk got priced out, and nobody had to be a villain</h2>

<p>If the deal happens, the last major platform whose economics depend entirely on music gets absorbed into an entertainment company that treats music as a feature for keeping subscribers.</p>

<p>And none of this required anybody to act badly. Labels are spending record amounts. Spotify is making rational margin decisions. The pension fund buying a catalog bond wants a coupon, not a discovery pipeline. The executive moving next quarter's budget toward the track that's already working is making the right call on the numbers in front of them. Add all those sensible decisions together and you get an industry that has quietly priced the risk out of finding new art. Which brings me back to where I started. I didn't get older. I got accurate. Almost nothing in this system is paid to help me find something new, so almost nothing new finds me.</p>

<p>The demand never went anywhere. There is still nothing quite like watching a room react to a song it has never heard. What's missing is anyone with a commercial reason to go looking for it.</p>

<h2>Sources</h2>

<ul>
<li>Global recorded music revenue ($31.7B in 2025, up 6.4%, eleventh straight year of growth) and A&amp;R and marketing spend ($8.1B in 2024): IFPI Global Music Report 2026; Music Business Worldwide</li>
<li>U.S. and global streaming volumes, catalog vs. new-release share, track catalog size and play distribution (253 million tracks, 120 million tracks with fewer than ten plays, 75.8%/24.2% catalog split): Luminate 2025 Mid-Year Music Report; Luminate 2025 Year-End Music Report</li>
<li>AI-generated track uploads on Deezer (44% of daily uploads by April 2026, over 50% by summer 2026): Deezer Newsroom; TechCrunch</li>
<li>Spotify AI spam track removal (75 million tracks): Music Business Worldwide; Variety</li>
<li>Spotify Discovery Mode mechanics and royalty terms: Spotify for Artists; reporting on Discovery Mode from Music Business Worldwide and trade press</li>
<li>Spotify financial results (subscribers, MAUs, revenue, gross margin, operating profit, ad revenue) for Q4 2025 and Q2 2026: Spotify Newsroom; Music Business Worldwide; TechTimes</li>
<li>Spotify founder voting control and Martin Lorentzon share sales: Music Business Worldwide; LegalClarity</li>
<li>Spotify market capitalization: CompaniesMarketCap</li>
<li>Spotify ticketing ($1.5B in ticket sales) and Premium/Music Pro pricing: Music Business Worldwide; Bloomberg</li>
<li>Amazon advertising revenue (2025): Yahoo Finance</li>
<li>Netflix's bid for Warner Bros. Discovery, Paramount Skydance's winning offer, and the $2.8B break fee: Variety; CNBC; TechCrunch</li>
<li>Daniel Ek's transition to Executive Chairman (effective January 2026): Spotify Newsroom; Music Business Worldwide</li>
</ul>`,
  "after-the-gym-mirror-to-finish-line": `<p>I started lifting in 2017, and for most of the seven years after that, the gym was my entire definition of fitness. On and off, never for competition, but often enough to build a habit I trusted. It carried me through a few cycles of fat loss where training was the one part of the plan I never had to think about, and it gave me a base of strength and, honestly, a confidence I didn't have before. You judged the work by what the gym did to your shape and how you felt walking out, and that was the scoreboard. Fitness mattered to me, but it was one priority among several. Somewhere in the last two years that order flipped. Health now sits above everything else I do. I usually train before sunrise because that's the one slot nothing else can take. When I travel, I plan around where I can run. None of that was true before the summer of 2025.</p>

<p>The shift has a date. In July last year I did my first Hyrox in Abu Dhabi, and I trained for it with my friend Sahitya. We ran intervals I'd never done, practiced stations I'd rarely touched, and did simulations (two of them) to find out where we'd break. Both times, the answer was the same. The stations felt manageable. The running wrecked us, with our heart rates spiking within minutes, because our legs weren't used to moving like that. For anyone who hasn't heard of Hyrox, the race is eight kilometers of running cut into one kilometer pieces, with a station after each (ski erg, sled push, sled pull, burpee broad jumps, row, farmers carry, lunges, wall balls). We finished, and I walked out with a muscle pull and something the mirror hadn't told me in seven years. I was carrying muscle I had little use for on top of an aerobic base I'd never built.</p>

<p>So I did the right thing to do right after - joined a run club. Uncommon Club, nearly every Thursday morning at Kite Beach, 5:15AM, for a year now. I hit my goal pace at my first official half marathon in about 6 months by February 2026, and I'm now training for my first Ironman 70.3 in December 2026 and my first marathon in January 2027. The training takes 12 to 14 hours a week and leaves little time for the gym. I'm smaller than I was in 2024, and my aerobic fitness is the best it's ever been. I traded size for an engine, and I was nowhere near the first. Millions of people made some version of the same trade over the same time, and capitalism followed them.</p>

<p>There are two stories I read about what's happening in fitness right now, and I don't trust either. The first is that gym culture is finished, replaced by run clubs, Pilates and whatever Hyrox is. The second is that this is another trend cycle, the same one that gave us CrossFit and SoulCycle, and it'll burn out the same way. In my opinion, neither holds true in silos. The gym is still growing as a business. What it's losing is the right to decide what being fit means, and that definition has moved somewhere the gym never learned to go: toward community, and toward a finish line. Each of those has been tried individually but now what's working is both of them together. The fitness related ideas winning now sell a version of the both combined.</p>

<h2>A Race Built From Gym Equipment Is Now Priced Like Ironman</h2>

<p>Hyrox started in Hamburg with 650 people. Last season, ~1.5 million raced it. On 8 September 2026 its founders, Christian Toetzke and Moritz Fürste, bought back control in a deal reported at ~$700M. That's roughly what Advance paid for Ironman in 2020 ($730M), a brand that has sold finish lines since 1978 and basically invented the endurance category. The comparison isn't fair though. Wanda sold Ironman under pressure in the first weeks of COVID, and the Hyrox figure is reported rather than filed. Discount both as much as you like and the gap has still closed in under a decade.</p>

<p>The more interesting question is what people are paying for. Think about what Hyrox sells. An experience with sled, a rower, a ski erg and a pile of wall balls. Every decent gym has had that kit for years and rents it to you by the month via subscription. Hyrox puts the same kit in a hall for one morning, and people cross borders to use it. Sounds odd, until you notice the equipment wasn’t the product. People pay for what surrounds it: other people on the floor with them, and a finish line with their time next to it. The gym had the equipment all along and never sold either of those, and that gap is the story of how this category evolved.</p>

<h2>The Gym Is Dying as the Place Fitness Happens</h2>

<p>Quick clarification, because the gym still makes money, and plenty of it. Planet Fitness, a leader in the mass gym category, did $1.3B of revenue last year from 20.8 million members, and global gym memberships grew 6% in 2024. Weight training was the fastest growing activity among women on Strava that year. People haven't stopped lifting. They've stopped treating the gym as the point. The gym is dying as the place that defines fitness, and the reason sits in how the business is built.</p>

<p>The gym sells access and then leaves you alone with it. Your result has no effect on its revenue. The gym that gets you fit and the gym that lets you drift bill the same monthly fee, so neither has much reason to give you a goal. The only scoreboard on offer is the mirror, which moves slowly and rewards one kind of body. And nobody in the room knows your name. You can train somewhere four times a week for a year and leave without a single friend. The model works as a utility, but it can’t give you a reason to show up beyond the fee you’ve already paid and the discipline you’ve built yourself. None of this is a case against lifting. Strength still belongs in any serious plan, and it carries over into everything else you do. It works best as one part of a wider routine, not the whole definition of fit.</p>

<p>The cheap end survives that, because cheap access is a utility, like a mobile data plan. The pressure lands on premium rooms, and SoulCycle is the one case worth studying, because it had the thing the gym never did. It had people. For a few years it was the closest thing fitness had to a cult. It grew to more than 60 studios, closed 20 in 2022, and shut at least six more on a single day in June this year, and its owner is Equinox, which understands premium fitness as well as anyone. The community kept the room full while it was new. What SoulCycle never had was a finish line. Every class ended the same way, and nothing you did in week 40 counted toward anything, so once Peloton put the same class in your living room, there was little reason left to come in. People without a finish line fade. A finish line without people is a gym with a mirror.</p>

<p>Pilates studios are next, for the same reason. Pilates has been the most booked workout on ClassPass for three years running, with bookings up 66% in 2025, so the activity will keep growing. The buildout won't hold. Reformer rooms carry SoulCycle's exact math: heavy capex, a fixed number of attendees per class, rent in the neighborhoods where rent hurts most, and nothing stopping the studio next door from copying it. Expect visible closures in oversupplied cities within two to three years while participation keeps climbing.</p>

<h2>Run Clubs Are a Loneliness Story Before They're a Fitness Story</h2>

<p>A gym is a room full of people in headphones avoiding eye contact. A run club is built the other way around. Fixed time, fixed place, pace groups, and people who notice when you skip. That difference sounds small until you look at what people in their 20s and 30s are dealing with. Gallup's survey across more than 140 countries found about a quarter of adults feel lonely, and the rate is highest among 19 to 29 year olds, not the elderly. In separate US polling, 25% of men aged 15 to 34 said they felt lonely a lot of the previous day, against 18% of adults overall. At the same time, the rooms where people that age used to meet each other are closing.</p>

<p>Run clubs filled that gap. Strava counted a 59% rise in running club participation in 2024. In a survey of 5,068 people, 58% said they'd made new friends through fitness groups, rising to 66% among Gen Z. Gen Z were four times more likely to want to meet people while working out than at a bar, and one in five had dated someone they met exercising. Notice that none of those numbers are about fitness. They're about friendship, dating and belonging, and the run happens to be the venue.</p>

<h2>Every Run Club Points You at a Finish Line</h2>

<p>Nobody at a run club asks what you bench. They ask what you're training for, and there's always an answer, and there's always a next one. The standard path is well worn: a first 5K, then a 10K, a half marathon, a marathon, and an ultra. Mine went sideways into triathlon, which splits the same effort across swimming, cycling and running and asks you to be decent (read as average) at all three at once. The paths look different and end the same way, with a medal and a time. Each step is hard enough to change your week and close enough to believe you can do it. That combination is what brings people back on Thursday mornings long after the novelty of the group wears off.</p>

<p>The finish time is also a better credential than the body ever was. A big physique was a claim about discipline and hours spent, but it was vague, it favored a narrow type, and it said as much about genetics as effort. A finish time makes the same claim with a number attached. It's public, dated and comparable. Strava found Gen Z are 75% more likely than Gen X to train for a specific race or event. Training has a deliverable now, and the deliverable is something you can put in your Instagram bio.</p>

<p>Here's the catch. Credentials inflate. When 650 people finished Hyrox in Hamburg, finishing meant something. At 1.5 million a year, finishing is closer to attendance, and the people who already own the shirt go looking for the next rung. I've been climbing that ladder myself for about 14 months: Hyrox, a run club, a half marathon, and next the 70.3 and the full marathon. The last rung never got boring. It stopped saying anything, and by then the club was already pointing at the next one. That ladder is the product, and the company that understood it best went one step further and built its ladder inside the gym.</p>

<h2>What Comes After the Finish Line</h2>

<p>Step back and the pattern is clear. The mirror was the first definition of fitness. The finish line is the second. The third is already forming, and it's years. This is where my own story started, and income is what spreads it. When people earn more, health stops being one priority among several, which is the same shift I went through. McKinsey's 2025 survey found up to 60% of consumers across major markets rate healthy aging as a top or very important priority, and Gen Z and millennials are 36% of adults but 41% of the spending in a ~$2T wellness market. People spend in a predictable order: diagnostics first, then coaching, then sleep and recovery, then a clinic membership.</p>

<p>Equinox already sells a program called Optimize for $40,000 a year, with lab work across about 100 biomarkers twice a year, and more than 1,000 people are on the waitlist. That's more than 200 years of a basic Planet Fitness membership, paid annually, with a queue. Longevity clinics keep opening across Dubai for people who want the same product without the flight to New York. My narrowest prediction is this. Longevity gets sold the way races are sold now: a baseline, a target, a retest date and a group doing it with you. The blood test becomes the next finish line. Expect the word longevity on gym pricing pages long before the evidence behind it catches up, and expect the operators who wrap it in community to beat the ones who sell it as a private service.</p>

<p>The bigger shift is in how people get reached. The gym model never reached most of them. Only 32% of Americans hit 150 minutes of activity a week, after four decades of gyms on every corner. What reaches people now is a date and a crowd. Strava counted club organized events up 1.5 times in 2025, on top of a near fourfold jump in the number of clubs. The future of the fitness category is community led activations and events, and the brands that want this customer will spend less telling them what to buy and more hosting the morning they show up.</p>

<p>The gym sold a room. The run club sells a morning, and the race sells a reason to come back to it. The equipment barely changed in 40 years. The reason to show up did, and the businesses that understand that are the ones building the next decade of this category.</p>

<p>I'm weaker than I was two years ago and I can cycle for five hours straight. Only one of those used to count in 2017.</p>

<h2>Sources</h2>

<ul>
<li>Hyrox founding, first race in Hamburg and 2025/26 participation: Hyrox; CNBC; SportsPro</li>
<li>Hyrox founders' buyback from Infront Sports &amp; Media (reported ~$700M, September 2026): Inc.; the5krunner</li>
<li>Ironman sale to Advance ($730M, 2020): Bloomberg</li>
<li>Planet Fitness 2025 revenue and membership, and base membership price: Planet Fitness investor relations; Planet Fitness</li>
<li>Global gym membership and revenue growth in 2024: Health &amp; Fitness Association, 2025 Global Report</li>
<li>Run club participation, friendships through fitness groups, Gen Z behavior, weight training among women, and club organized events: Strava Year in Sport 2024 and 2025; Athletech News</li>
<li>SoulCycle studio closures: TheStreet</li>
<li>Pilates bookings: ClassPass 2025 Look Back Report</li>
<li>Loneliness by age and gender: Gallup; Meta Gallup Global State of Social Connections</li>
<li>Healthy aging priorities and wellness spending by generation: McKinsey, Future of Wellness 2025</li>
<li>Equinox Optimize pricing and waitlist: Entrepreneur</li>
<li>Share of Americans meeting 150 minutes of weekly activity: SFIA 2026 Topline Participation Report</li>
</ul>
`,
};

export function getBlogContent(slug: string): string {
  return blogContent[slug] ?? "<p>Content not found.</p>";
}
