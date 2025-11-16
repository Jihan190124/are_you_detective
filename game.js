// Global state variables
let currentCase = null;
let hintsUsed = 0;
let maxHints = 2;
let score = 0; // Initialize global score

// Full story-driven case data - now an array of 20 cases with categories
const cases = [
  {
    id: 0,
    title: "The Missing ₹850 Sandwich",
    description: "The CEO's gourmet lunch vanishes in a corporate heist.",
    story: "You are Detective Rohan Malik, a man who lives in the gray areas. Your current assignment: the crime is too stupid for the metropolitan police, yet the stakes are corporate-level chaos. Someone stole the CEO's ₹850 handcrafted turkey sandwich. The office is a powder keg of passive aggression. The CEO is threatening mass firings. Find the culprint and restore the fragile peace.",
    suspects: [
      { id: "bob", name: "Bob 'The Enraged'", role: "Angry Coworker", clue: "Ranting about underpaid employees.", backstory: "Known for his temper and complaints.", icon: "😠" },
      { id: "sarah", name: "Sarah 'The Scared'", role: "Intern (Terrified of HR)", clue: "Cited 'lactose intolerance' excuse.", backstory: "A nervous wreck, terrified of HR.", icon: "👩‍💼" },
      { id: "mike", name: "Mike 'The Sneak'", role: "HR Guy (Always Hungry)", clue: "Seen near the fridge 3 minutes before the sandwich vanished.", backstory: "Documented history of petty food thefts.", icon: "👨‍💼" },
      { id: "alice", name: "Alice 'The Organizer'", role: "Office Manager (Stressed)", clue: "Was nervously organizing the pantry.", backstory: "Meticulous and stressed.", icon: "👩‍💻" }
    ],
    culprit: "mike",
    category: "etc",
    evidence: {
      cctv: "📹 Kitchen CCTV reveals Mike entering at 12:45 PM. He leaves 2 minutes later with a **suspicious bulge** under his jacket.",
      eyewitness: "👀 The Night Janitor reported seeing Mike 'organizing' the fridge and looking 'hungry and determined'.",
      clues: ["Empty gourmet sandwich wrapper found tightly wadded in **Mike's desk drawer**.", "Mike's unique fingerprint smudge found on the CEO's fridge shelf.", "Security log shows Mike was the last non-CEO employee to access the kitchen's smart lock."]
    }
  },
  {
    id: 1,
    title: "The Midnight Murder at Blackwood Corp",
    description: "A colleague was found fatally stabbed in the office after hours.",
    story: "A cold November night. The scene: the high-rise office of Blackwood Corp. The victim: John Doe, the ambitious Sales Manager. He was found stabbed in his cubicle. Jealousy, revenge, and corporate secrets are the only currency here.",
    suspects: [
      { id: "emma", name: "Emma 'The Rival'", role: "Rival Salesperson", clue: "Had a heated, documented argument with John about a multi-million dollar deal hours before the murder.", backstory: "Passed over for promotion, a post John now holds. Clear motive for revenge.", icon: "👩‍💼" },
      { id: "david", name: "David 'The Ghost'", role: "IT Specialist (Access All)", clue: "Has unlogged access to all security footage archives and door logs.", backstory: "Can erase evidence and bypass security.", icon: "👨‍💻" },
      { id: "lisa", name: "Lisa 'The Accountant'", role: "Forensic Accountant", clue: "Discovered major financial discrepancies in John's reports and confronted him via a tense email.", backstory: "Confronted John about embezzlement.", icon: "👩‍💼" },
      { id: "tom", name: "Tom 'The Watcher'", role: "Night Security Guard", clue: "Was on duty all night but claims he 'didn't see anything out of the ordinary.'", backstory: "Controls access and patrols. Highly suspicious denial.", icon: "👮‍♂️" }
    ],
    culprit: "emma",
    category: "medium",
    evidence: {
      cctv: "📹 Office hallway camera, briefly restored by a backup server, shows **Emma** entering John's cubicle at 10:15 PM. She was seen leaving 5 minutes later, wiping her hands and looking highly agitated.",
      eyewitness: "👀 The late-working Receptionist heard **loud, frantic arguing** from John's office around 9:45 PM. She confirmed recognizing Emma's voice shouting, 'You won't ruin my life anymore!'",
      clues: ["A bloody utility knife, the presumed murder weapon, found hidden in **Emma's desk waste bin**.", "**Emma's fingerprints** found on the door handle of John's cubicle.", "A recently deleted (but recovered) email from John to HR titled: 'Termination Request: Emma Thompson's Underperformance.'"]
    }
  },
  {
    id: 2,
    title: "The Falcon Protocol Heist",
    description: "A revolutionary AI prototype vanishes from the secure R&D lab.",
    story: "The company's lifeblood—a revolutionary AI device code-named 'The Falcon Protocol'—is gone. Stolen from the hyper-secure R&D lab. This prototype is worth millions. Is it an insider job? Corporate espionage?",
    suspects: [
      { id: "alex", name: "Alex 'The Genius'", role: "Lead Engineer/Architect", clue: "Had the original security codes. Was publicly denied the lead credit.", backstory: "Bitter and brilliant, he has the ultimate *Means* and *Motive*.", icon: "👨‍🔬" },
      { id: "sophia", name: "Sophia 'The Promoter'", role: "Marketing Director", clue: "Pushed aggressively for an early release demo, dismissing security concerns.", backstory: "Ruthlessly ambitious. Rumors suggest ties to shady corporate data brokers.", icon: "👩‍💼" },
      { id: "kevin", name: "Kevin 'The Shadow'", role: "Night Janitor", clue: "Possesses master keys to every room and was cleaning the lab area that night.", backstory: "Could a janitor be a highly paid corporate spy?", icon: "👨‍🔧" },
      { id: "nina", name: "Nina 'The Eager'", role: "Research Assistant", clue: "Assisted Alex and has continuous lab access. She's new but eager to impress the wrong people.", backstory: "New and desperate to climb the corporate ladder.", icon: "👩‍🔬" }
    ],
    culprit: "alex",
    category: "medium",
    evidence: {
      cctv: "📹 Lab security camera shows **Alex** entering the lab at 11:30 PM with a large, empty duffel bag. He disabled the secondary alarm for 4 minutes.",
      eyewitness: "👀 The Night Security Guard saw Alex leaving the building at 12:05 AM, carrying the duffel bag, which now appeared **straining and heavy**.",
      clues: ["Alex's main access card was used to bypass two initial security doors.", "A recent wire transfer of **$50,000 USD** was deposited into Alex's private offshore account, labeled 'Consulting Fee'.", "Prototype schematics were found attached to an encrypted email draft in Alex's personal computer."]
    }
  },
  {
    id: 3,
    title: "The Ghost of the Gallery",
    description: "The priceless 'Midnight Lotus' painting has been replaced by a forgery.",
    story: "The city's most secure gallery has been hit. The 'Midnight Lotus' is gone, swapped for a meticulous but flawed fake. This is a precision job by someone who knows art and security. Find the masterpiece and expose the phantom thief.",
    suspects: [
      { id: "victor", name: "Victor 'The Collector'", role: "Rival Art Collector", clue: "Stands to gain millions if the painting is proven fake. History of questionable acquisitions.", backstory: "Bitter rival of the gallery owner.", icon: "🎩" },
      { id: "nina", name: "Nina 'The Critic'", role: "Disgraced Art Critic", clue: "Her career was ruined by the gallery owner's public attack. She publicly vowed revenge.", backstory: "Possesses the intimate knowledge of the painting's style necessary for forgery.", icon: "📝" },
      { id: "leo", name: "Leo 'The Key'", role: "Gallery Security Chief", clue: "Only person with access to the vault's secondary manual override. Claims he was sleeping.", backstory: "Inside involvement or incompetence?", icon: "🔒" },
      { id: "elena", name: "Elena 'The Artist'", role: "Art Restorer", clue: "Had extended access to the painting for 'minor touch-ups' a week before the theft. Highly skilled in reproduction.", backstory: "Masterful painter. Has the *Means* to create the forgery.", icon: "🎨" }
    ],
    culprit: "nina",
    category: "medium",
    evidence: {
      cctv: "📹 Vault CCTV shows a figure in a guard uniform using a *critics' penlight* to examine the painting just before the swap. Nina is known for using a rare-earth penlight.",
      eyewitness: "👀 An anonymous tip-off reported seeing **Nina** meeting with a known black-market fence outside the gallery a day before the theft, carrying a large, rolled-up canvas.",
      clues: ["Microscopic analysis of the forgery reveals a rare **Venetian pigment** only known to be used by a few restorers and critics, including Nina.", "A key-card log confirms Nina's key was used for 'late-night access' under a false maintenance claim weeks prior.", "A note was left in the vault: 'A flawed masterpiece is better than a ruined reputation.'"]
    }
  },
  {
    id: 4,
    title: "The Senator's Secret",
    description: "Senator Sterling's campaign funds are stolen, and a crucial digital ledger is wiped clean.",
    story: "Senator Sterling had his entire digital campaign fund ledger and physical contingency cash stolen. This isn't about money; it's about power. The thief is leveraging the ledger's contents, threatening to expose years of political corruption.",
    suspects: [
      { id: "david", name: "David 'The Guard'", role: "Head of Senator's Security", clue: "Responsible for all physical security and digital access codes. Knew the safe combinations.", backstory: "Had absolute *Opportunity* and *Means* to pull off the theft.", icon: "🛡️" },
      { id: "chloe", name: "Chloe 'The Treasurer'", role: "Campaign Treasurer", clue: "Publicly expressed concern about the legality of some of the ledger's transactions.", backstory: "Holds the financial secrets. Driven by a sense of justice or greed?", icon: "💰" },
      { id: "mark", name: "Mark 'The Analyst'", role: "Political Analyst (Opponent)", clue: "Desperate for leverage against the Senator. Seen near the campaign office the night of the theft.", backstory: "An outsider with a clear *Motive* to sabotage the campaign.", icon: "📰" },
      { id: "sarah_s", name: "Sarah 'The Runner'", role: "Junior Campaign Staffer", clue: "Asked to run multiple 'personal errands' late at night, giving her unchecked access to secure areas.", backstory: "Ambitious young staffer with unexpected *Opportunity*.", icon: "👩‍💼" }
    ],
    culprit: "david",
    category: "medium",
    evidence: {
      cctv: "📹 The Senator's private parking garage camera shows **David** loading two large, unmarked boxes into his personal vehicle at 3:00 AM.",
      eyewitness: "👀 A maid reported overhearing **David** on a highly stressed phone call, saying, 'The ledger is safe. Now pay up, or the truth hits the front page.'",
      clues: ["A highly encrypted black satchel, matching the description of the stolen cash bag, was found hidden in **David's apartment storage unit**.", "A security audit showed David logged into the financial server with his admin credentials 10 minutes before the ledger was wiped.", "David recently paid off significant gambling debts with a large, untraceable cash deposit."]
    }
  },
  // --- HARD Cases (5-9) ---
  { 
    id: 5, 
    title: "The Silent Auction", 
    description: "A renowned jeweler is found poisoned after a high-stakes sale. The poisoner is not the chemist.", 
    story: "A venomous plot in a ballroom. A rare diamond changes hands, and the seller dies shortly after a celebratory toast. The police are looking for a chemist, but your gut tells you the means was provided, not executed, by the most obvious suspect.", 
    suspects: [
      { id: "a", name: "The Assistant", role: "Rival's Spy (Inside Man)", clue: "Served the drink, but insists it was pre-poured. Looks stressed.", backstory: "Had direct, final access to the victim's glass. Works for a rival jeweler.", icon: "🤵" }, 
      { id: "b", name: "The Widow", role: "Sole Beneficiary", clue: "Stood to inherit everything. Very public display of grief.", backstory: "Motive is strong, but opportunity is limited to a brief toast.", icon: "💍" }, 
      { id: "c", name: "The Chemist", role: "Disgraced Scientist", clue: "Expert in undetectable toxins. Was seen arguing about an old debt.", backstory: "Has the *Means* to create the perfect poison, making him the obvious patsy.", icon: "🔬" }
    ], 
    culprit: "a", 
    category: "hard", 
    evidence: { 
      cctv: "📹 Ballroom camera shows The Chemist only briefly speaking with The Assistant near the service station, passing a napkin. The Assistant then immediately served the victim's champagne.", 
      eyewitness: "👀 A waiter saw The Assistant discreetly dropping a **small, crystalline object** into the victim's glass while shielding it with the service tray.", 
      clues: ["A highly toxic, custom synthetic poison was found on the interior rim of the service tray used only by The Assistant.", "The Assistant's phone records show three blocked calls from The Chemist immediately after the event.", "A cryptic note from the rival jeweler to The Assistant was found: 'Finish the job, or the debt is yours.'"] 
    } 
  },
  { 
    id: 6, 
    title: "The Vanishing Vows", 
    description: "A historical marriage certificate disappears just before a property dispute trial. The security guard is the mole.", 
    story: "A faded piece of paper is the key to millions in real estate. The certificate, locked in a courthouse safe, vanished overnight. The Lawyer is desperate to win and the Archivist looks guilty, but the break-in required physical access and stealth that only one person truly possessed.", 
    suspects: [
      { id: "a", name: "The Archivist", role: "Custodian of Records", clue: "Admitted to having the safe's combination 'in his head'. Looks like the insider.", backstory: "Trusted with the building's most sensitive documents and key holder.", icon: "📜" }, 
      { id: "b", name: "The Lawyer", role: "Opposing Counsel", clue: "Had a clear motive to destroy the evidence. Tried to bribe the Archivist.", backstory: "Desperate to win the multi-million dollar case.", icon: "⚖️" }, 
      { id: "c", name: "The Security", role: "Night Watchman", clue: "Admitted to turning off the security camera 'for maintenance' during the theft window.", backstory: "Controls the building access and surveillance, providing the perfect cover.", icon: "👮" }
    ], 
    culprit: "c", 
    category: "hard", 
    evidence: { 
      cctv: "📹 The camera's log shows The Security accessing the feed and manually skipping 15 minutes of recording right after The Archivist left for the night.", 
      eyewitness: "👀 A homeless man near the courthouse entrance saw The Security loading a **small, flat box** into his personal, unmarked vehicle late that night.", 
      clues: ["The 'shredded' document found was a high-quality photocopy planted to frame the Archivist.", "A unique, greasy smudge (matching The Security's work gloves) was found on the hidden back latch of the safe.", "The original marriage certificate, rolled tightly, was found in a false bottom compartment of The Security's personal locker at the station."] 
    } 
  },
  { 
    id: 7, 
    title: "The Suburban Nightmare", 
    description: "The seemingly perfect family man is found dead in his garage. The death was a crime of passion, not money.", 
    story: "Behind the white picket fence lies a dark secret. The victim, a pillar of the community, was strangled. The wife has a big policy and the neighbor has rage, but the details of the kill point to someone who knew the victim's schedule and the house's routine intimately, a crime of passion not staged for money.", 
    suspects: [
      { id: "a", name: "The Wife", role: "Grieving Widow", clue: "Claims she was asleep, but her alibi is unverified. Strong financial motive.", backstory: "Discovered the victim, but her reaction seems manufactured.", icon: "👰" }, 
      { id: "b", name: "The Gardener", role: "Secret Confidant", clue: "Was arguing with the victim about a secret loan. Known to have keys to the shed.", backstory: "Was privy to the victim's dark financial dealings and had access to the property's tools.", icon: "🌿" }, 
      { id: "c", name: "The Neighbor", role: "Unstable Rival", clue: "Recently had a violent argument with the victim over a property line dispute.", backstory: "Rage motive, and access to the home's exterior.", icon: "🏡" }
    ], 
    culprit: "b", 
    category: "hard", 
    evidence: { 
      cctv: "📹 The home's security camera shows The Wife entering the garage shortly before the murder, but immediately leaving (red herring). A minute later, a figure wearing The Gardener's distinctive wide-brimmed hat is seen entering.", 
      eyewitness: "👀 A cleaning crew member saw The Gardener and The Wife in a prolonged, private, and emotional embrace by the tool shed the day *after* the murder.", 
      clues: ["The rope used to strangle the victim was cut from a brand new spool of garden rope found in The Gardener's tool shed.", "Footprints in the damp soil leading to the back door match The Gardener's unique work boots.", "The victim's phone records show a blocked text message from The Gardener: 'She's mine now. You have to go.'"] 
    } 
  },
  { 
    id: 8, 
    title: "The Corporate Spy Leak", 
    description: "Top secret R&D plans are leaked to a foreign competitor. The broke executive is the decoy.", 
    story: "Billions are at stake. A massive data breach has cost the company its future. The obvious suspect is the broke executive who needs the money, or the fired co-founder who wants revenge. But the access log points to a third party who was brought in to 'secure' the system.", 
    suspects: [
      { id: "a", name: "The Consultant", role: "Freelance Hacker", clue: "Had temporary system access, but claims to be innocent. Hired for a 'security audit'.", backstory: "Hired specifically for a security audit; was it a front? Has the *Means*.", icon: "💻" }, 
      { id: "b", name: "The Executive", role: "CFO (In Debt)", clue: "Known to have severe gambling debts. Clear financial motive.", backstory: "Needs a massive amount of cash quickly, giving him a strong *Motive* (but limited *Means*).", icon: "💸" }, 
      { id: "c", name: "The Rival", role: "Disgruntled Co-founder", clue: "Recently fired and given a significant severance package. Motive for revenge.", backstory: "Has the knowledge and the *Motive* for revenge, but his physical access was revoked.", icon: "😡" }
    ], 
    culprit: "a", 
    category: "hard", 
    evidence: { 
      cctv: "📹 None. All security footage for the server room was professionally deleted by the intruder's code.", 
      eyewitness: "👀 A cleaner saw The Consultant plugging an unmarked external hard drive into the main server rack late on a Friday night, claiming he was 'running diagnostics'.", 
      clues: ["The leaked files were transferred using a unique, complex compression algorithm **only The Consultant used** in previous unrelated projects.", "The IP address used for the exfiltration was routed through The Consultant's home VPN server.", "The Consultant's contract included a massive, unexplained bonus payment from a shell company located in the rival competitor's country."] 
    } 
  },
  { 
    id: 9, 
    title: "The Celebrity's Jewels", 
    description: "A famous actress's prized diamond necklace is stolen from a locked hotel suite. The theft required the perfect inside knowledge.", 
    story: "Diamonds, glamour, and deceit. The necklace, worth ten million, disappeared during a charity gala. The suite was locked, the balcony sealed. The key was a simple act of negligence—or rather, a planned 'negligence' by the one person who could guarantee a flawless entry.", 
    suspects: [
      { id: "a", name: "The Manager", role: "Personal Assistant", clue: "Had the master key to the suite. Claims she was with the actress all night.", backstory: "Knows the schedule and the security weaknesses. Looks like the obvious inside job.", icon: "🎬" }, 
      { id: "b", name: "The Thief", role: "Known Cat Burglar", clue: "Fingerprints matching a known thief were found near the window lock.", backstory: "Has the *Means* and history, but the lock was intact (a deliberate misdirection).", icon: "🥷" }, 
      { id: "c", name: "The Waiter", role: "Hotel Staff", clue: "Was the only non-security staff to enter the room prior to the gala. Claims he merely restocked the mini-bar.", backstory: "Could have planted a device or cloned a key, or simply provided the access point.", icon: "🍽️" }
    ], 
    culprit: "c", 
    category: "hard", 
    evidence: { 
      cctv: "📹 The service elevator camera shows The Waiter carrying an unusually large tool bag (for restocking) and wearing a **small, professional earring** matching the one found near the balcony railing.", 
      eyewitness: "👀 A neighboring suite guest reported seeing The Waiter spend an excessive amount of time 'adjusting the drapes' on the balcony, and noticed the glass door was not fully secured after he left.", 
      clues: ["The sophisticated window lock fingerprints (Suspect B's) were professionally planted using transfer gel, a clear red herring.", "Analysis of the suite's climate control log shows the temperature dropped slightly right at the time of the theft, indicating the **balcony door was left ajar** by The Waiter.", "A deposit for a luxury vehicle, paid entirely in cash, was recently made to The Waiter's bank account."] 
    } 
  },
  // --- MASTERMIND Cases (10-14) ---
  { 
    id: 10, 
    title: "The University Scandal", 
    description: "A star professor collapses after drinking coffee. The killer is a low-profile mole with an old grudge.", 
    story: "Poison in a public forum. The brilliant but controversial professor is dead. The Department Head has the clear motive, but the method of delivery required access that bypassed all security and was completely ignored by everyone. Find the ghost from the past.", 
    suspects: [
      { id: "a", name: "The Student", role: "Failing Protégé", clue: "Was publicly humiliated by the victim earlier that day.", backstory: "Motive is simple rage and desperation.", icon: "🎓" }, 
      { id: "b", name: "The Rival", role: "Department Head", clue: "Stood to gain the victim's tenure and research grant.", backstory: "Clear *Motive* and institutional *Opportunity* (the obvious choice).", icon: "👨‍🏫" }, 
      { id: "c", name: "The Cleaner", role: "Custodial Staff", clue: "The coffee was prepared in a room she accessed immediately before the lecture.", backstory: "Had deep access. Her identity is a complete facade.", icon: "🧹" }
    ], 
    culprit: "c", 
    category: "mastermind", 
    evidence: { 
      cctv: "📹 Hallway CCTV shows The Rival quickly placing a small *empty* packet into the professor's lecture bag (a failed attempt or misdirection). The Cleaner is later seen lingering by the coffee machine.", 
      eyewitness: "👀 A former colleague recognized The Cleaner's face as **Dr. Evelyn Reed**, a professor who lost her tenure years ago due to the victim's damning review.", 
      clues: ["The poison found in the cup was a **slow-acting, micro-dosed venom** that had been added to the coffee machine reservoir over several days by The Cleaner.", "Fingerprints on the coffee machine's internal parts match The Cleaner's, but not her employee file, only the old university records of Dr. Reed.", "The Cleaner's locker contained documents outlining Dr. Reed's tenure revenge plan."] 
    } 
  },
  { 
    id: 11, 
    title: "The Blackmailers List", 
    description: "A journalist's private, encrypted list of powerful contacts is stolen. The theft was physical, not digital.", 
    story: "A journalist known for digging up dirt has been hit. Her 'Blackmailers List' is gone. The list was supposedly encrypted, but the thief managed to take the original storage device itself. The hacker is a decoy; the theft required a trusted hand who could walk out with the evidence.", 
    suspects: [
      { id: "a", name: "The Editor", role: "Victim's Boss", clue: "Worried the list contained information that could ruin the paper.", backstory: "Motive to contain the damage and protect the paper. Has final say over office security.", icon: "📰" }, 
      { id: "b", name: "The Hacker", role: "Tech Assistant", clue: "The only person besides the journalist who knew the encryption key.", backstory: "Has the *Means* to decrypt and steal the list (the obvious choice).", icon: "⌨️" }, 
      { id: "c", name: "The Politician", role: "High-Profile Target", clue: "Was reportedly the first person on the list.", backstory: "Clear *Motive* to secure the list and destroy the evidence.", icon: "🏛️" }
    ], 
    culprit: "a", 
    category: "mastermind", 
    evidence: { 
      cctv: "📹 The main office camera shows The Editor entering the journalist's locked office with his master key. He leaves 5 minutes later carrying a **discreet, black laptop bag**.", 
      eyewitness: "👀 A cleaning crew member saw The Editor shredding several official-looking key access logs near his office trash bin the next morning.", 
      clues: ["The theft was not a hack; the entire hard drive containing the list was physically removed from the journalist's computer. The Hacker's access was irrelevant.", "A large, untraceable 'donation' was made to the newspaper's general fund by a shell corporation linked to The Politician days after the theft.", "The Editor's desk contained a note: 'The paper is more important than one person's crusade. List contained.'"] 
    } 
  },
  { 
    id: 12, 
    title: "The Fake Antique", 
    description: "A rare 17th-century clock is swapped with a cheap modern replica. The intern was the operative.", 
    story: "The museum's prized clock is a fake. The Curator is in debt and the Patron wants the clock, making them obvious suspects. But the swap required someone with low scrutiny, who could move quickly and secretly during a public viewing. The thief was underestimated.", 
    suspects: [
      { id: "a", name: "The Curator", role: "Art Expert", clue: "Was the only one to handle the clock before the viewing. Was in debt.", backstory: "Deep *Means* and *Opportunity* due to access and financial stress (the obvious choice).", icon: "🖼️" }, 
      { id: "b", name: "The Student", role: "Intern", clue: "Had access to the main display case keys after hours, but claims he only cleaned.", backstory: "Low-level access, but perhaps used by a mastermind.", icon: "📚" }, 
      { id: "c", name: "The Patron", role: "Wealthy Collector", clue: "Publicly offered a massive sum for the clock, which was rejected.", backstory: "Motive to acquire the clock by any means necessary.", icon: "💰" }
    ], 
    culprit: "b", 
    category: "mastermind", 
    evidence: { 
      cctv: "📹 Security footage shows the Curator placing a small velvet cloth over the clock (red herring). Minutes later, The Student *trips* and falls against the case, momentarily blocking the view of the clock with his body.", 
      eyewitness: "👀 A cleaner reported seeing The Student practicing a complex knot-tying technique on a rope in the back room days before the viewing.", 
      clues: ["The lock on the case shows microscopic damage that could only be caused by a small, thin wire, matching a wire found in The Student's backpack.", "The replica clock was identified as being purchased by The Student online using a gift card from **The Patron**.", "The Student was not paid cash, but received a guarantee of a prestigious job with The Patron's private collection."] 
    } 
  },
  { 
    id: 13, 
    title: "The Lighthouse Killer", 
    description: "A recluse fisherman is shot dead in his remote lighthouse home. The Ex-Wife was the orchestrator.", 
    story: "Isolated and cold. The victim was a paranoid recluse who lived alone. The Coast Guard has the boat and gun access. But the raw emotion and precision of the kill suggest a different kind of motive—a personal one—using the Coast Guard as the means of transport and disposal.", 
    suspects: [
      { id: "a", name: "The Ex-Wife", role: "Sole Heir", clue: "Hated the victim but stood to inherit a large sum. Claims she was miles away.", backstory: "Motive is financial and emotional, but her physical access is limited.", icon: "💔" }, 
      { id: "b", name: "The Coast Guard", role: "Maintenance Crew", clue: "The only person known to routinely visit the lighthouse. Has access to the weapon.", backstory: "Has the perfect *Opportunity* and a plausible alibi (the obvious choice).", icon: "⚓" }, 
      { id: "c", name: "The Rival", role: "Fishing Competitor", clue: "Accused the victim of poaching and had a violent dispute.", backstory: "Motive of simple professional rage.", icon: "🎣" }
    ], 
    culprit: "a", 
    category: "mastermind", 
    evidence: { 
      cctv: "📹 None available on the remote island, but mainland security shows The Coast Guard picking up The Ex-Wife at a remote dock on the night of the murder.", 
      eyewitness: "👀 A passing fisherman heard two distinct voices arguing loudly on the island before the gunshot: one male (victim) and one high-pitched female voice (Ex-Wife).", 
      clues: ["The shell casing found at the scene matches a small, ornamental pistol **registered to The Ex-Wife**, not the Coast Guard sidearm.", "The Coast Guard later confessed that The Ex-Wife forced him to transport her and threatened to expose his illegal activities if he didn't help cover up the murder.", "The Ex-Wife's travel log shows a recent purchase of industrial-grade solvent, which she used to clean her boat."] 
    } 
  },
  { 
    id: 14, 
    title: "The False Identity", 
    description: "A man running a sophisticated online scam has his true identity documents stolen. The true threat was the one pulling the strings.", 
    story: "A thief steals from a thief. The victim's life is in a digital vault. The Partner has the motive for revenge, but The Fence is the one with the network and the ultimate power. This was a statement: a powerful warning from the top of the food chain.", 
    suspects: [
      { id: "a", name: "The Fence", role: "Information Broker", clue: "Knew the victim's vault location and access protocols. The ultimate buyer.", backstory: "Motivated by profit, has the network to sell the IDs. Was the victim's secret superior.", icon: "🕵️" }, 
      { id: "b", name: "The Victim's Partner", role: "Ex-Associate", clue: "Recently cut out of a major deal by the victim. Strong revenge motive.", backstory: "Motive of revenge and financial retribution (the obvious choice).", icon: "🤝" }, 
      { id: "c", name: "The Landlord", role: "Nosy Neighbor", clue: "Admitted to watching the victim's door for weeks.", backstory: "Unexpected *Opportunity* and a habit of snooping.", icon: "🏠" }
    ], 
    culprit: "a", 
    category: "mastermind", 
    evidence: { 
      cctv: "📹 Lobby security shows The Victim's Partner accessing the victim's apartment (a red herring). However, 20 minutes before, a delivery person matching The Fence's known associate profile dropped off a large, unmarked 'gift' box.", 
      eyewitness: "👀 A neighbor heard a conversation between the victim and an unseen person inside the apartment: 'You think you can quit? I own you, and I own that vault.' (Voice ID: The Fence).", 
      clues: ["The physical vault's internal security was not breached by brute force or a key, but by a retinal scan that matched The Fence's unique eye pattern.", "The Partner's revenge motive was real, but The Fence intercepted the Partner's plans and acted first, using the Partner's actions as a distraction.", "The stolen ID documents were found immediately available for sale on a dark-web forum **controlled by The Fence**."] 
    } 
  },
  // --- IMPOSSIBLE Cases (15-19) ---
  { 
    id: 15, 
    title: "The Political Foe", 
    description: "A high-ranking politician is found dead in a hotel room, ruled an overdose. The motive is familial betrayal.", 
    story: "The police say accident, you smell a rat. The politician, known for his anti-corruption efforts, died suddenly. The Rival Boss and his Aide are the financial suspects. But the overdose was an act of personal, raw betrayal, masked by political intrigue.", 
    suspects: [
      { id: "a", name: "The Aide", role: "Close Assistant", clue: "Was the last to see the victim alive. Changed her story twice. Found to be the politician's secret, illegitimate daughter.", backstory: "Holds the key to the victim's last hours. Her motive is deeply personal.", icon: "👩‍💼" }, 
      { id: "b", name: "The Rival", role: "Corrupt Business Leader", clue: "Was the target of the victim's latest investigation. Obvious motive to silence.", backstory: "Clear *Motive* to silence the victim (the intended patsy).", icon: "🤵" }, 
      { id: "c", name: "The Doctor", role: "Victim's Physician", clue: "Provided the victim with the medication that caused the 'overdose.'", backstory: "The source of the poison. Was he coerced?", icon: "👨‍⚕️" }
    ], 
    culprit: "a", 
    category: "impossible", 
    evidence: { 
      cctv: "📹 Hotel parking camera shows The Rival's associate delivering a package to The Aide, who then took it to the victim's room (The Aide was *paid* to make it look like the Rival's crime).", 
      eyewitness: "👀 The hotel maid overheard The Aide sobbing in the room, saying, 'Why couldn't you just acknowledge me?' before calling the front desk.", 
      clues: ["Analysis of the drug dosage proves it was intentionally fatal. The drug was mixed with a **unique, bitter flavor additive** only the Aide would know the victim disliked, confirming intimate knowledge.", "The shell company linked to The Rival made a large payment to The Aide's bank account (a payment *for the political cover story*).", "A journal in the Aide's possession detailed years of psychological neglect by the victim, her father."] 
    } 
  },
  { 
    id: 16, 
    title: "The Broken Dream", 
    description: "A failed entrepreneur commits suicide, but the crime scene feels staged. The killer is a hired gun.", 
    story: "A rope, a chair, and a suicide note. But the details are wrong. The victim was about to secure a major investment. The Investor is the mastermind, but the actual killer is the quiet Neighbor with a hidden, violent past.", 
    suspects: [
      { id: "a", name: "The Investor", role: "Main Backer", clue: "Stood to lose millions if the victim backed out. Strong financial motive.", backstory: "Could the investor be trying to recoup losses by staging a death (the mastermind)?", icon: "📈" }, 
      { id: "b", name: "The Rival", role: "Former Partner", clue: "Had a violent falling out over company ownership.", backstory: "Possesses a clear *Motive* for revenge.", icon: "🤬" }, 
      { id: "c", name: "The Neighbor", role: "Key Holder", clue: "Had access to the victim's apartment while the victim was away. Claims to be a retired librarian.", backstory: "An unassuming figure with a hidden past and the *Means* to silence a man quietly.", icon: "🔑" }
    ], 
    culprit: "c", 
    category: "impossible", 
    evidence: { 
      cctv: "📹 Building footage shows The Investor entering the victim's apartment and leaving with a laptop (red herring: manipulating business records). **The Neighbor is seen entering 2 hours later** through a side maintenance door.", 
      eyewitness: "👀 A late-night delivery driver reported seeing The Neighbor's garage door slightly ajar, revealing a collection of **military-grade rappelling gear**.", 
      clues: ["The victim was drugged, not suicidal. Traces of a **powerful, restricted sedative** were found in the victim's system, a drug commonly used by specialized military units.", "A unique fiber from a tactical boot, matching a pair owned by The Neighbor, was found embedded in the carpet near the staged suicide note.", "The Neighbor's bank account shows a recent, large, anonymous deposit corresponding to a known rate for professional 'problem solvers'."] 
    } 
  },
  { 
    id: 17, 
    title: "The Stolen Blueprints", 
    description: "Classified military-grade vehicle blueprints are missing from a secure facility. The mole is the one with daily, low-level access.", 
    story: "The nation's defense is compromised. The blueprints are gone. The Engineer is drowning in debt, the obvious thief. The Security Chief covers the tracks. The real thief is the Secretary, a long-term mole who used her daily routine to steal the plans right under everyone's nose over a period of weeks.", 
    suspects: [
      { id: "a", name: "The Engineer", role: "Lead Designer", clue: "Had 24/7 access to the safe room and was heavily in debt. The financial motive.", backstory: "Motive is cash, access is absolute (the intentional fall guy).", icon: "⚙️" }, 
      { id: "b", name: "The Secretary", role: "Admin Staff", clue: "Handled all print requests and physical file management. Seems harmless.", backstory: "Low-level access, but high *Opportunity* in daily operations. The true mole.", icon: "🗃️" }, 
      { id: "c", name: "The Security Chief", role: "Oversight", clue: "Signed off on all security audits the day before the theft.", backstory: "Suspect by virtue of his cover-up.", icon: "🛡️" }
    ], 
    culprit: "b", 
    category: "impossible", 
    evidence: { 
      cctv: "📹 Footage shows The Engineer scanning a large roll of paper (a decoy blueprint transfer). However, The Secretary is seen using the high-resolution departmental scanner **every morning** to copy small sections of the plans, disguised as 'personal notes'.", 
      eyewitness: "👀 A mailroom worker reported seeing The Secretary shipping out small, padded envelopes to an untraceable P.O. box in Europe every week for the past month.", 
      clues: ["The actual blueprints were not stolen at once; they were copied in small, incremental sections. The total size of the paper stolen equals the exact amount of 'paper waste' The Secretary reported over the last month.", "A hidden partition on The Secretary's personal tablet contains the fully assembled, highly-detailed blueprints.", "The Engineer's debt was secretly paid off by the rival agency to ensure he played the role of the decoy thief."] 
    } 
  },
  { 
    id: 18, 
    title: "The Missing Mascot", 
    description: "The high school's beloved golden eagle statue is stolen on rivalry week. The culprit is the rival principal, not the student.", 
    story: "A ridiculous crime with serious local consequences. The entire town is in an uproar. The student prankster looks guilty, but the operation was too smooth, too professional for teenagers. This was a sophisticated sabotage orchestrated by the head of the rival institution.", 
    suspects: [
      { id: "a", name: "The Principal", role: "Rival School Principal", clue: "Was openly hostile about the statue's placement. Has the reputation.", backstory: "Motive of school rivalry, but does he risk his career? The mastermind.", icon: "🏫" }, 
      { id: "b", name: "The Coach", role: "Disgruntled Janitor", clue: "Used to be the school's star quarterback until a falling out with the current administration.", backstory: "Motive is bitterness and revenge.", icon: "🏈" }, 
      { id: "c", name: "The Student", role: "Prankster", clue: "Known for elaborate, large-scale pranks. Has a cell phone video 'confessing'.", backstory: "Motive is simple fame and chaos (the decoy).", icon: "🧑‍🎓" }
    ], 
    culprit: "a", 
    category: "impossible", 
    evidence: { 
      cctv: "📹 A recovered cell phone video shows The Student and two friends loading a *cardboard* eagle into a pickup truck (a decoy meant to distract police). Moments later, The Rival Principal's SUV is seen backing up to the pedestal.", 
      eyewitness: "👀 A night guard at the rival school saw The Rival Principal's SUV entering the school grounds with a large, gold-covered object covered in a tarp.", 
      clues: ["The statue was found hidden in The Rival Principal's private office, covered in a tarp. It required a crane to place it.", "The Student's 'confession' video was proven to be a deepfake created by The Rival Principal's media consultant.", "A unique scratch on the statue's pedestal matches a large, industrial wrench found in The Rival Principal's personal toolbox."] 
    } 
  },
  { 
    id: 19, 
    title: "The Gangland Hit", 
    description: "A connected mobster is executed in a crowded cafe. The waitress was the shooter.", 
    story: "A messy, public execution in broad daylight. The Associate and the Rival Boss are the usual suspects. But the killer needed to be invisible, blending in plain sight in the crowded environment, and ensuring the Rival Boss's hands were clean. It was a perfectly executed inside job.", 
    suspects: [
      { id: "a", name: "The Associate", role: "Victim's Right Hand", clue: "Was seen leaving the table minutes before the shooting. Betrayal motive.", backstory: "The perfect setup. Did he betray his boss? (the primary suspect).", icon: "🔪" }, 
      { id: "b", name: "The Rival Boss", role: "Competing Gang Leader", clue: "Stood to gain control of the victim's territory. Motive of power.", backstory: "Clear *Motive* of power and territory (the ultimate beneficiary).", icon: "👑" }, 
      { id: "c", name: "The Waitress", role: "Cafe Employee", clue: "Admitted to knowing the victim and having a large gambling debt. Handled all service.", backstory: "Could be paid off to set up the victim, or to pull the trigger herself, making her untraceable.", icon: "☕" }
    ], 
    culprit: "c", 
    category: "impossible", 
    evidence: { 
      cctv: "📹 Cafe security shows The Associate giving a discrete head nod to The Waitress (not an unseen figure outside) before excusing himself from the table. The Waitress then casually approaches the table.", 
      eyewitness: "👀 A patron at the next table reported seeing a quick flash of silver coming from The Waitress's hip as she bent down to 'clean crumbs' from the victim's side of the booth.", 
      clues: ["Gunpowder residue found **only on The Waitress's apron and tray cloth**, not on The Associate's sleeve.", "The bullet trajectory analysis indicates the shot was fired from a low angle, consistent with The Waitress bending down near the booth, not an external shooter.", "The Waitress's gambling debt was paid off the day after the murder by a third party shell company linked to The Rival Boss."] 
    } 
  }
];

// Utility to switch screens
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showCases() {
  renderCaseSelection('all'); // Show all cases by default
  showScreen("screen-cases");
}

function selectCase(caseId) {
  currentCase = cases.find(c => c.id === caseId);
  // Reset hints for the new case
  hintsUsed = 0; 
  renderStory();
  showScreen("screen-story");
}

function startGame() {
  renderSuspects();
  updateGameStats();
  showScreen("screen-suspects");
}

function updateGameStats() {
  document.getElementById("hints-used").textContent = hintsUsed;
  // Update score display in the suspects screen
  document.getElementById("current-score").textContent = score; 
}

function showInvestigation() {
  renderInvestigation();
  showScreen("screen-investigation");
}

// Helper function to render the Suspect Summary for the right column
function renderSuspectSummary() {
    if (!currentCase) return;
    let html = `<ul class="clues-list list-unstyled">`;
    currentCase.suspects.forEach(s => {
        html += `
            <li class="p-2 mb-2 rounded border-start border-warning border-4 bg-dark text-light">
                <strong>${s.icon} ${s.name}</strong> (${s.role})<br>
                <span style="opacity: 0.8; font-size: 0.9em;">Clue: ${s.clue}</span>
            </li>
        `;
    });
    html += "</ul>";
    
    document.getElementById("suspect-briefing-content").innerHTML = html;
}

// Render investigation board
function renderInvestigation() {
  if (!currentCase) return;

  document.getElementById("investigation-title").textContent = `${currentCase.title} - The War Board`;

  document.getElementById("cctv-content").innerHTML = currentCase.evidence.cctv;
  document.getElementById("eyewitness-content").innerHTML = currentCase.evidence.eyewitness;

  const cluesList = document.getElementById("clues-list");
  cluesList.innerHTML = "";
  currentCase.evidence.clues.forEach(clue => {
    const li = document.createElement("li");
    li.className = "p-2 mb-2 rounded border-start border-warning border-4 bg-dark text-light";
    li.textContent = clue;
    cluesList.appendChild(li);
  });
  
  renderSuspectSummary(); 
  loadNotepad();
}

// Notepad functionality
function loadNotepad() {
  const notepad = document.getElementById("notepad");
  const key = `notepad-${currentCase.id}`;
  const saved = localStorage.getItem(key);
  notepad.value = saved || "";
}

function saveNotepad() {
  if (!currentCase) return;
  const notepad = document.getElementById("notepad");
  const key = `notepad-${currentCase.id}`;
  localStorage.setItem(key, notepad.value);
}

function goBack() {
  const activeScreen = document.querySelector('.screen.active').id;

  if (activeScreen === "screen-cases") {
    showScreen("screen-landing");
  } else if (currentCase) {
    showScreen("screen-story");
  } else {
    showScreen("screen-landing");
  }
}

function restartGame() {
  currentCase = null;
  hintsUsed = 0;
  // We keep the score for now unless the user wants to reset it
  // score = 0;
  showScreen("screen-landing");
}

function goBackFromResult() {
  showScreen("screen-suspects");
}

function useHint() {
  if (!currentCase || hintsUsed >= maxHints) {
      alert("⚠️ No more Classified Tips available, Detective. You must rely on the evidence!");
      return;
  }

  hintsUsed++;
  updateGameStats();
  const hintText = getHintText(currentCase.id);

  alert(`CLASSIFIED TIP (${hintsUsed}/${maxHints}): ${hintText}`);
}

// Helper functions for dynamic text (Updated for all 20 cases with new logic)
function getHintText(caseId) {
  const hints = {
    // ETC / MEDIUM
    0: "Focus on the suspect who has demonstrated a history of **petty theft** involving food in the workplace.",
    1: "The killer's actions were driven by a clear, pre-existing **professional grudge** against the victim.",
    2: "The perpetrator required both **access** and deep **technical knowledge** to bypass the specific security measures.",
    3: "The perpetrator needed both a strong **revenge motive** and the specific **artistic skill** to replace the masterpiece.",
    4: "The key to the Senator's security was held by a person who had **unchecked access** and a hidden financial burden.",
    // HARD (5-9)
    5: "The Chemist is the supplier, not the killer. Find the person with the **final point of contact** to the victim's drink.",
    6: "The Archivist's confession is a lie. The thief is the one who controlled the **blind spot** in the security system.",
    7: "The staged scene hides a crime of **passion**, not just money. Look for the person who had a secret relationship with the widow.",
    8: "The Executive is the decoy. The leak required a **temporary insider** whose job was to *protect* the system.",
    9: "The thief was an insider who made the security breach look like an impossible outsider job. The **access point was the balcony**.",
    // MASTERMIND (10-14)
    10: "The killer is not the rival, but the one who gained **deep, long-term access** by assuming a fake identity with an old, deep-seated grudge.",
    11: "The crime was not a hack. The mastermind needed to **physically remove the evidence** and had the master key to the journalist's office.",
    12: "The Curator is covering for the true culprit. The theft was executed by the person who was low-profile enough to cause a 'distraction' and was working for the wealthy Patron.",
    13: "The Coast Guard is the *means* of transport. The true killer is the person with the **personal, intimate motive** who needed a ride to the remote location.",
    14: "The Partner is a red herring for revenge. The true thief is the **secret superior** who owned the victim's identity and used a sophisticated breach method.",
    // IMPOSSIBLE (15-19)
    15: "The money trail is a distraction. The core motive is **familial betrayal** and psychological neglect.",
    16: "The suicide scene was staged by a hired professional. Look for the suspect with a **hidden violent background** and the key to the apartment.",
    17: "The Engineer is the patsy. The blueprints were stolen **incrementally over time** by the person with routine, unquestioned access to the office equipment.",
    18: "The student's confession video is fake. The theft was an **organized campaign of sabotage** led by the highest authority in the rival institution.",
    19: "The Associate's nod was not to an outside shooter. The execution was carried out by the **most invisible person in the room** who was close enough to plant a weapon.",
    default: "Look closer at the evidence, Detective. The truth is in the details."
  };
  return hints[caseId] || "Look closer at the evidence, Detective. The truth is in the details.";
}

function getConfessionText(caseId) {
  const confessions = {
    // ETC / MEDIUM
    0: "Mike 'The Sneak' admitted he was stressed, hungry, and simply couldn't resist the CEO's extravagant lunch. The CEO's rage has cooled, but Mike is now permanently banned from the corporate kitchen.",
    1: "Emma 'The Rival' broke down, admitting the murder was a crime of professional rage. She felt John sabotaged her career one too many times and she snapped, sealing his fate.",
    2: "Alex 'The Genius' confessed to the theft. Denied credit for his life's work, he decided to sell the Falcon Protocol prototype himself for personal profit and revenge.",
    3: "Nina 'The Critic' confessed that the gallery owner's public attack ruined her career. She created the forgery as the ultimate act of revenge and intellectual defiance.",
    4: "David 'The Guard' admitted he felt betrayed and underpaid by the Senator. He stole the funds and the ledger, planning to sell the incriminating data to a rival party to secure his financial future.",
    // HARD (5-9)
    5: "The Assistant confessed she was paid by her employer, the rival jeweler, to administer the poison supplied by The Chemist. She claims she only wanted to hurt the victim's reputation, not kill him.",
    6: "The Security guard confessed he seized the opportunity when the cameras were off. He found the original document in the safe and planned to sell it to the highest bidder, trying to frame the Archivist.",
    7: "The Gardener broke down, confessing to the murder. He was secretly having an affair with The Wife and killed the victim in a jealous rage, believing he could finally take his place.",
    8: "The Consultant admitted he was a double agent hired by the competitor. He used the 'security audit' to install backdoors and exfiltrate the data, using the broke CFO as a convenient scapegoat.",
    9: "The Waiter confessed that he was paid by a black-market broker to unlock the balcony door, allowing a professional thief access to the necklace. He deliberately left the door ajar during his service.",
    // MASTERMIND (10-14)
    10: "The Cleaner confessed she was Dr. Evelyn Reed, a disgraced former professor. She had assumed a new identity and spent years planning to kill the professor who ruined her career by poisoning the coffee supply over time.",
    11: "The Editor confessed. He stole the physical hard drive to protect the newspaper's reputation, believing the list contained dangerous information that would destroy the paper's ties to the city elite.",
    12: "The Student confessed he was recruited by The Patron. He performed the physical swap during a brief, staged distraction to prove his worth and secure a prestigious (but criminal) job with the collector.",
    13: "The Ex-Wife confessed she hired The Coast Guard for transport to the remote island. She shot the victim during a violent confrontation about her inheritance and forced the officer to cover up the crime.",
    14: "The Fence confessed. He was the victim's secret superior and mastermind of the scam. He stole the documents as a warning to his 'associate' who tried to break away and go solo.",
    // IMPOSSIBLE (15-19)
    15: "The Aide confessed that she was the politician's secret daughter, driven by years of psychological neglect. She used the Rival's drug delivery as a political cover story to execute the murder, hoping to expose her father's hypocrisy.",
    16: "The Neighbor, a former paramilitary operator, confessed to the hit. He was hired by The Investor to stage the suicide and retrieve specific business records before the police arrived.",
    17: "The Secretary confessed she was a long-term mole. She stole the blueprints incrementally over a month under the guise of 'printer maintenance' to avoid detection and ensure the information was safely transferred to the foreign client.",
    18: "The Rival Principal confessed. He orchestrated the theft and used The Student's prank history as a decoy. The massive mascot was hidden in his office as the ultimate act of institutional sabotage.",
    19: "The Waitress confessed she was paid by The Rival Boss to be the shooter. She executed the mobster at point-blank range while pretending to clean the table, ensuring the kill was untraceable to the usual suspects.",
    default: "The culprit has been brought to justice. Case solved!"
  };
  return confessions[caseId] || "The culprit has been brought to justice. Case solved!";
}

function getWrongText(caseId) {
  const wrongTexts = {
    // ETC / MEDIUM
    0: "Your accusation was based on poor judgment. Review the CCTV and the history of the suspects.",
    1: "You focused on a minor distraction. The motive for murder was far more personal and immediate.",
    2: "You failed to account for the technical means required to execute a professional corporate heist of this magnitude.",
    3: "You focused on the money, Detective. The motive here was raw, burning *revenge* and intellectual pride.",
    4: "You targeted an outsider. The political heist was an **inside job** enabled by a person who was trusted with the Senator's life.",
    // HARD (5-9)
    5: "You caught the supplier, but the actual killer was the one who delivered the final, fatal dose. **The executioner has the blood on their hands.**",
    6: "You fell for the decoy. The thief is the one who could **physically guarantee** the break-in went unnoticed.",
    7: "You focused on the financial cover-up. The killer was driven by **jealousy and possession**, not just a life insurance policy.",
    8: "You targeted the one with the motive, not the **means and opportunity**. The professional thief was the one brought in to fix the system.",
    9: "The fingerprints were planted. The theft was not an outsider's break-in, but a flaw in the security **enabled by an insider's negligence**.",
    // MASTERMIND (10-14)
    10: "The Rival is too obvious. The poisoner had a **years-long plan** and used a complete identity shift to gain close access to the victim.",
    11: "The list wasn't hacked; it was **physically removed**. The theft required the authority to enter and walk out with the entire device.",
    12: "The debt-ridden Curator is the distraction. The operative was the person who was low-profile enough to be unnoticed but was **desperate to prove their loyalty** to the patron.",
    13: "The Coast Guard is the wheelman. The murder weapon and the **personal grudge** point to the passenger, not the driver.",
    14: "The Partner's revenge was a distraction. The theft was a professional statement made by the person who **truly controlled the victim's life and assets**.",
    // IMPOSSIBLE (15-19)
    15: "You followed the money trail, which was intentionally laid. The motive for murder was **deeply psychological and familial**, not political.",
    16: "The Investor is the puppet master. You missed the **professional enforcer** who actually staged the scene and had the physical means to perform the kill.",
    17: "The Engineer is a scapegoat. The true mole exploited **routine, daily access** to steal the plans in pieces over a long period.",
    18: "The student is the decoy. This was a sophisticated act of **institutional warfare** orchestrated by a figure of high authority.",
    19: "The nod was not to an external shooter. The fatal shot was fired from **within the victim's immediate circle**, making the crime scene almost impossible to read.",
    default: "Better luck next time. The city doesn't sleep, and neither should your investigation."
  };
  return wrongTexts[caseId] || "Better luck next time. The city doesn't sleep, and neither should your investigation.";
}

// Render case selection screen - UPDATED WITH FILTERING
function renderCaseSelection(filter = 'all') {
  const box = document.getElementById("case-list");
  box.innerHTML = "";
  
  const filteredCases = cases.filter(c => filter === 'all' || c.category === filter || (filter === 'medium' && ['medium', 'etc'].includes(c.category)));

  // Update active button state based on the value passed
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(`'${filter}'`)) {
      btn.classList.add('active');
    }
  });

  if (filteredCases.length === 0) {
      box.innerHTML = "<p class='subtitle text-center mt-5'>No cases filed under this category yet, Detective.</p>";
      return;
  }

  filteredCases.forEach(c => {
    const card = document.createElement("div");
    // Using Bootstrap classes for card styling
    card.className = "case-card card text-white bg-dark border-warning p-3 hover-scale";
    card.onclick = () => selectCase(c.id);
    card.innerHTML = `
      <h3 class="card-title text-warning">${c.title}</h3>
      <p class="card-text">${c.description}</p>
      <small class="text-secondary mt-auto">Category: ${c.category.toUpperCase()}</small>
    `;
    box.appendChild(card);
  });
}

// Render dynamic story
function renderStory() {
  if (!currentCase) return;
  document.getElementById("story-title").textContent = currentCase.title;
  document.getElementById("story-content").innerHTML = currentCase.story;
}

// Display suspects
function renderSuspects() {
  if (!currentCase) return;
  const box = document.getElementById("suspect-list");
  box.innerHTML = "";

  currentCase.suspects.forEach(s => {
    const card = document.createElement("div");
    // Using Bootstrap classes for responsive grid and card styling
    card.className = "suspect card text-center bg-secondary border-warning p-3 d-flex flex-column hover-scale";
    card.innerHTML = `
      <h3 class="text-warning">${s.icon} ${s.name}</h3>
      <p class="mb-1">Role: ${s.role}</p>
      <small class="mb-2 text-info"><strong>Clue:</strong> ${s.clue}</small>
      <small class="mb-3 text-light opacity-75"><i>${s.backstory}</i></small>
      <button class="accuse-btn btn btn-danger mt-auto" onclick="checkCulprit('${s.id}')">Accuse</button>
    `;
    box.appendChild(card);
  });
}

// Check who is guilty
function checkCulprit(id) {
  if (!currentCase) return;
  const resultTitle = document.getElementById("result-title");
  const resultDesc = document.getElementById("result-desc");

  const culprit = currentCase.suspects.find(s => s.id === currentCase.culprit);

  if (id === currentCase.culprit) {
    const points = 100 - (hintsUsed * 20); 
    score += points;
    resultTitle.textContent = "CASE CLOSED. TRUTH UNCOVERED. 🎉";
    resultDesc.innerHTML = `
      The evidence speaks: **${culprit.name}** has confessed.<br><br>
      **CONFESSION:** ${getConfessionText(currentCase.id)}<br><br>
      Reward: +${points} points<br>
      **TOTAL SCORE:** ${score}<br><br>
      You are the best in the business, Detective. Now, find your next case.
    `;
  } else {
    score -= 25;
    resultTitle.textContent = "WRONG ACCUSATION ❌";
    resultDesc.innerHTML = `
      That was not the culprit, Detective. You've lost time and credibility.<br><br>
      **ANALYSIS:** ${getWrongText(currentCase.id)}<br><br>
      Penalty: -25 points<br>
      **TOTAL SCORE:** ${score}<br><br>
      Go back to the War Board. The evidence does not lie, but the suspects certainly do.
    `;
  }

  showScreen("screen-result");
}