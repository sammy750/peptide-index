// Editorial "in the media" dataset: how public figures have discussed peptides.
// This is REFERENCE material — inclusion is not endorsement (by us or by the people
// quoted), and several voices here are explicitly cautionary. Quotes are verbatim
// and attributed; `stance` keeps the presentation honest rather than promotional.

export type MediaStance = "enthusiast" | "cautious" | "policy" | "unverified";

export const STANCE_META: Record<MediaStance, { label: string; color: string }> = {
  enthusiast: { label: "Has used / endorses", color: "#4FA9BD" },
  cautious: { label: "Cautionary", color: "#E0685F" },
  policy: { label: "Policy / regulatory", color: "#6E74D6" },
  unverified: { label: "Unverified association", color: "#9B9B8C" },
};

export type Confidence = "High" | "Moderate" | "Low / Unverified";

export interface MediaMention {
  name: string;
  role: string;
  peptides: string[];
  quote: string;
  stance: MediaStance;
  confidence: Confidence;
  date: string;
  sourceLabel: string;
  sourceUrl?: string;
  /** YouTube video id — populated only after the URL is verified to resolve. */
  youtubeId?: string;
  videoTitle?: string;
  /** Optional longer editorial bio for the figure's detail page. */
  bio?: string;
  /** Optional curated "stack" of peptides the figure has named, with cross-links. */
  stack?: StackItem[];
}

export interface StackItem {
  label: string;
  /** Slug of the matching Peptide Index entry, if one exists. */
  peptideSlug?: string;
  note: string;
}

export const MEDIA_MENTIONS: MediaMention[] = [
  {
    name: "Joe Rogan",
    youtubeId: "2hm7fhzvj1Q",
    videoTitle: "Peptide BPC-157 | Joe Rogan & Dr. Andrew Huberman",
    role: "Podcaster (Joe Rogan Experience); UFC commentator",
    peptides: ["BPC-157", "TB-500", "Ipamorelin", "Thymosin"],
    quote:
      "I had tendonitis in my elbow that I could not fix. I started using BPC-157 and it was gone in two weeks.",
    stance: "enthusiast",
    confidence: "High",
    date: "2021–2026",
    sourceLabel: "JRE #1683 (w/ A. Huberman); fastlifehacks",
    sourceUrl: "https://fastlifehacks.com/joe-rogan-peptides/",
    bio:
      "Through the Joe Rogan Experience — one of the world's largest podcasts — Rogan has repeatedly discussed peptides for injury recovery, most often BPC-157, and is widely credited with bringing terms like the 'Wolverine Stack' into mainstream conversation. He has said he uses them under medical supervision. This page documents what he has stated publicly; it is reference material, not a recommendation.",
    stack: [
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "His most-discussed compound — credited on-air with resolving elbow tendonitis.",
      },
      {
        label: "TB-500",
        peptideSlug: "tb-500",
        note: "Paired with BPC-157 as the so-called 'Wolverine Stack' for systemic recovery.",
      },
      {
        label: "Ipamorelin",
        peptideSlug: "ipamorelin",
        note: "Growth-hormone secretagogue, discussed in the context of recovery and sleep.",
      },
      {
        label: "CJC-1295",
        peptideSlug: "cjc-1295-no-dac",
        note: "Often paired with ipamorelin to support natural growth-hormone release.",
      },
      {
        label: "Thymosin alpha-1 / beta-4",
        note: "Mentioned for recovery and immune support (TB-500 is a thymosin β4 fragment).",
      },
    ],
  },
  {
    name: "Dana White",
    youtubeId: "Ob7aNSFB2BE",
    videoTitle: "Dana White: How He Reversed Metabolic Syndrome in 10 Weeks! | TUH #001",
    role: "President / CEO, UFC",
    peptides: ["CJC-1295", "Ipamorelin", "BPC-157"],
    quote:
      "After Gary Brecka's regimen: lost 44 lbs, came off all prescription meds and CPAP; homocysteine 21.5→11.7, triglycerides 764→143.",
    stance: "enthusiast",
    confidence: "High",
    date: "2023–2024",
    sourceLabel: "Fox News",
    sourceUrl:
      "https://www.foxnews.com/media/dana-white-wasnt-going-see-65-before-longevity-expert-intervened-strict-new-regimen",
    bio:
      "As president of the UFC, Dana White is one of combat sports' most powerful executives — and, since 2023, one of the most visible case studies in the longevity movement. After bloodwork flagged metabolic syndrome and a short projected lifespan, White began working with 'human biologist' Gary Brecka, crediting the resulting regimen with a 44-pound loss, coming off prescription medications and his CPAP machine, and dramatic improvements in homocysteine and triglycerides. The protocol Brecka built around him has become a recurring reference point in peptide and biohacking conversations. This page documents what has been reported publicly; it is not medical advice.",
    stack: [
      {
        label: "CJC-1295",
        peptideSlug: "cjc-1295-no-dac",
        note: "Growth-hormone-releasing peptide named on Brecka's recommendation list in connection with White's protocol.",
      },
      {
        label: "Ipamorelin",
        peptideSlug: "ipamorelin",
        note: "GH secretagogue typically paired with CJC-1295 in Brecka's stacks.",
      },
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "Tissue-repair peptide Brecka publicly promotes; widely associated with the White turnaround.",
      },
    ],
  },
  {
    name: "Gary Brecka",
    youtubeId: "Kfz_9xDyjL4",
    videoTitle: "Q&A with Gary Brecka: Peptides, Migraines, Sleep Protocols & More!",
    role: "'Human biologist' / biohacker; founder, The Ultimate Human",
    peptides: ["BPC-157", "TB-500", "CJC-1295", "Ipamorelin"],
    quote:
      "Peptides aren't magic — but they can accelerate healing, performance & longevity. BPC-157 heals joints & gut lining; TB-500 reduces inflammation; CJC-1295/Ipamorelin boosts growth hormone naturally.",
    stance: "enthusiast",
    confidence: "High",
    date: "Mar 2025",
    sourceLabel: "@thegarybrecka on X",
    sourceUrl: "https://x.com/thegarybrecka/status/1895459437915394320",
    bio:
      "Gary Brecka is a self-described 'human biologist' and the founder of The Ultimate Human, who spent two decades in the life-insurance industry modeling mortality before pivoting to wellness. He is the most prominent popularizer of peptides in the Dana White / UFC orbit, and routinely breaks down 'starter' peptide stacks for a large social-media audience. Brecka frames peptides as performance and recovery accelerants — while also telling followers to work with a licensed clinician and to fix nutrition and lab markers first. Inclusion documents his public statements; it is not an endorsement of any protocol or product.",
    stack: [
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "Promotes it for healing 'joints & gut lining.'",
      },
      {
        label: "TB-500",
        peptideSlug: "tb-500",
        note: "Frames it as reducing inflammation — the other half of the recovery pair.",
      },
      {
        label: "CJC-1295",
        peptideSlug: "cjc-1295-no-dac",
        note: "'Growth-hormone releaser — stack with ipamorelin.'",
      },
      {
        label: "Ipamorelin",
        peptideSlug: "ipamorelin",
        note: "Paired with CJC-1295 to support natural GH release without shutting down your own.",
      },
    ],
  },
  {
    name: "Andrew Huberman",
    youtubeId: "zU5EYw06wtw",
    videoTitle: "Benefits & Risks of Peptide Therapeutics for Physical & Mental Health",
    role: "Stanford neuroscientist; Huberman Lab podcast",
    peptides: ["BPC-157"],
    quote:
      "There are many animal studies showing efficacy but essentially no clinical trials and few human studies. The 'anecdata' circulating are enticing BUT there are real risks.",
    stance: "cautious",
    confidence: "High",
    date: "Apr 2024",
    sourceLabel: "Huberman Lab — Benefits & Risks of Peptide Therapeutics",
    sourceUrl:
      "https://www.hubermanlab.com/episode/benefits-risks-of-peptide-therapeutics-for-physical-mental-health",
    bio:
      "Andrew Huberman is a Stanford neuroscientist whose Huberman Lab podcast is one of the most influential science-communication platforms in health. His April 2024 episode on peptide therapeutics is among the most-cited mainstream explainers on the topic. Huberman takes a deliberately cautious position: he has acknowledged personally trying BPC-157 for a joint issue, but repeatedly stresses that the human evidence is thin and that the real risks — notably BPC-157's promotion of blood-vessel growth (VEGF) and the theoretical tumor concern — are too often glossed over. This page documents his on-record analysis.",
    stack: [
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "Has tried it for joint pain, but flags the VEGF/angiogenesis tumor-risk concern and the absence of human trials.",
      },
      {
        label: "Peptide therapeutics (class overview)",
        note: "Treats a narrow subset as legitimate while warning that most circulating uses rest on 'anecdata,' not clinical data.",
      },
    ],
  },
  {
    name: "Peter Attia",
    youtubeId: "JNpgqpyzW98",
    videoTitle: "The Drive #274 — Performance-enhancing drugs, hormones & peptides",
    role: "Longevity physician; The Drive podcast",
    peptides: ["BPC-157", "Growth-hormone peptides (general)"],
    quote:
      "Peptides are a legitimate, powerful class of therapeutics, but the legitimacy is confined to a relatively narrow subset of them. The space is still the Wild West.",
    stance: "cautious",
    confidence: "High",
    date: "2024–2025",
    sourceLabel: "Peter Attia AMA #83",
    sourceUrl: "https://peterattiamd.com/ama83/",
    bio:
      "Peter Attia is a physician focused on longevity and the host of The Drive. Among the science-forward voices in this index he is one of the most measured: he treats peptides as a genuinely powerful class of therapeutics whose evidenced uses are confined to a 'relatively narrow subset,' and has likened the broader market to 'the Wild West.' He emphasizes the gap between compelling anecdote and well-designed clinical trials. Documented here from his AMA and podcast statements.",
    stack: [
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "Acknowledges promise for recovery, but stresses the human-evidence gap.",
      },
      {
        label: "Growth-hormone peptides",
        peptideSlug: "cjc-1295-no-dac",
        note: "Discusses GH secretagogues with caution around long-term and cancer-risk questions.",
      },
    ],
  },
  {
    name: "Bryan Johnson",
    youtubeId: "GfKsKdqTyi0",
    videoTitle: "Received my first gene therapy: follistatin.",
    role: "Tech entrepreneur; 'Blueprint' / Don't Die longevity project",
    peptides: ["Follistatin (gene therapy)", "GHK-Cu", "Thymosin-β4", "EGF"],
    quote:
      "Received follistatin gene therapy abroad; reports follistatin +160% (2 weeks post) and muscle mass +7%. Sells a multi-peptide topical serum via Blueprint.",
    stance: "enthusiast",
    confidence: "High",
    date: "2023–2026",
    sourceLabel: "Blueprint (Bryan Johnson)",
    sourceUrl: "https://blueprint.bryanjohnson.com/blogs/news/bryan-johnsons-protocol",
    bio:
      "Bryan Johnson is the tech entrepreneur behind 'Blueprint' and the 'Don't Die' movement, who reportedly spends millions a year measuring and optimizing his biology. He is among the most aggressive adopters in this index: he received follistatin gene therapy abroad (it is not available in the US) and sells a multi-peptide topical serum through Blueprint, documenting results publicly and in granular detail. Inclusion is documentation, not endorsement; several interventions he pursues are experimental and not consumer products.",
    stack: [
      {
        label: "Follistatin (gene therapy)",
        note: "Received it abroad; reported follistatin +160% and muscle mass +7%. Experimental — not a consumer product.",
      },
      {
        label: "Copper Tripeptide-1 / GHK-Cu",
        peptideSlug: "ghk-cu",
        note: "Among the biomimetic peptides in his Blueprint topical serum.",
      },
      {
        label: "Thymosin beta-4",
        peptideSlug: "tb-500",
        note: "TB-500 is a thymosin β4 fragment; β4 appears in his serum formulation.",
      },
      {
        label: "EGF (epidermal growth factor)",
        note: "Another peptide growth factor in the Blueprint serum lineup.",
      },
    ],
  },
  {
    name: "Jennifer Aniston",
    youtubeId: "cSFlHbUSHZI",
    videoTitle: "Jennifer Aniston Joins Vital Proteins® (collagen peptides)",
    role: "Actor; Chief Creative Officer, Vital Proteins",
    peptides: ["Injectable peptides", "NAD+", "Collagen peptides (nutritional)"],
    quote: "On weekly peptide shots: \"I do think that's the future.\"",
    stance: "enthusiast",
    confidence: "High",
    date: "2023–2025",
    sourceLabel: "Hello! Magazine",
    sourceUrl:
      "https://www.hellomagazine.com/healthandbeauty/skincare-and-fragrances/889378/jennifer-aniston-anti-ageing-peptide-injections/",
    bio:
      "Jennifer Aniston is among the most mainstream faces attached to the peptide trend. As Chief Creative Officer of collagen brand Vital Proteins she has long promoted collagen peptides, and she has spoken openly about weekly injectable peptide shots and NAD+, telling press she believes that approach is 'the future.' Her involvement spans nutritional collagen (a food supplement) and the newer injectable-peptide and NAD+ wellness category — a distinction worth keeping in mind. Documented from public interviews.",
    stack: [
      {
        label: "Injectable peptides",
        note: "Has described weekly peptide injections as 'the future' of skin and anti-aging care.",
      },
      {
        label: "NAD+",
        note: "Among the celebrity adopters of NAD+ for anti-aging and energy.",
      },
      {
        label: "Collagen peptides",
        note: "Long-time face of Vital Proteins — a nutritional supplement, distinct from research peptides like BPC-157.",
      },
    ],
  },
  {
    name: "Gwyneth Paltrow",
    youtubeId: "kpJmxF4P5fo",
    videoTitle: "Andrew Huberman on Peptides — the goop Podcast",
    role: "Actor; founder, Goop",
    peptides: ["Peptide shots", "NAD+"],
    quote: "Has called peptide shots \"one of my biggest wellness tools.\"",
    stance: "enthusiast",
    confidence: "High",
    date: "2024–2025",
    sourceLabel: "TIME",
    sourceUrl: "https://time.com/7380810/anti-aging-peptide-shots-social-media/",
    bio:
      "Gwyneth Paltrow built Goop into one of the most recognizable — and most debated — wellness brands, and she remains an early-adopter signal for aesthetic and longevity trends. She has called peptide shots 'one of my biggest wellness tools,' and Goop has platformed peptide and NAD+ discussion, including a conversation with Andrew Huberman. Documented from her public statements and Goop content.",
    stack: [
      {
        label: "Peptide shots",
        note: "Calls them 'one of my biggest wellness tools.'",
      },
      {
        label: "NAD+",
        note: "Part of the anti-aging regimen she and Goop have discussed.",
      },
    ],
  },
  {
    name: "Hailey Bieber",
    youtubeId: "xVNA0nxCAxk",
    videoTitle: "Hailey Bieber and Kendall Jenner on NAD+",
    role: "Model; founder, Rhode",
    peptides: ["NAD+"],
    quote:
      "On The Kardashians: \"I'm gonna NAD for the rest of my life and I'm never going to age.\"",
    stance: "enthusiast",
    confidence: "High",
    date: "2024",
    sourceLabel: "rollingout",
    sourceUrl: "https://rollingout.com/2026/02/06/why-celebrities-with-peptide-injections/",
    bio:
      "Hailey Bieber — model and founder of the skincare brand Rhode — is one of the most-followed figures attached to the NAD+ wave. On an episode of The Kardashians she described NAD+ infusions in characteristically absolute terms, and her reach among younger audiences has helped push the treatment into mainstream beauty conversation. Documented from broadcast and press coverage.",
    stack: [
      {
        label: "NAD+",
        note: "On The Kardashians: 'I'm gonna NAD for the rest of my life and I'm never going to age.'",
      },
    ],
  },
  {
    name: "Derrick Lewis",
    youtubeId: "euBir8Zinfw",
    videoTitle: "Derrick Lewis CLARIFIES peptides comments ahead of UFC 324 | MMA Fighting",
    role: "UFC heavyweight contender",
    peptides: ["'Peptides' (claimed UFC-supplied)"],
    quote:
      "\"[The UFC] provided me with some great peptides… I've been taking it every day and feeling a difference.\" (UFC's Jeff Novitzky said he 'misspoke' — UFC says it doesn't supply banned peptides.)",
    stance: "enthusiast",
    confidence: "High",
    date: "Jan 2026",
    sourceLabel: "MMA Mania",
    sourceUrl:
      "https://www.mmamania.com/ufc-news/415544/ufc-324s-derrick-lewis-says-ufc-provided-me-with-some-great-peptides",
    bio:
      "Derrick Lewis is one of the UFC's most popular heavyweights, known as much for his candor as his knockout power. Ahead of UFC 324 he claimed on a podcast that the promotion had 'provided me with some great peptides' — prompting a public correction from UFC executive Jeff Novitzky, who said Lewis 'misspoke' and clarified that the UFC does not supply banned peptides, only third-party-certified compounds. The episode is a useful illustration of how loosely the word 'peptides' gets used in sport. Documented from MMA press.",
    stack: [
      {
        label: "'Peptides' (unspecified)",
        note: "Claimed UFC-supplied; the UFC says he meant certified-safe compounds, not banned peptides like BPC-157 or TB-500.",
      },
    ],
  },
  {
    name: "Robert F. Kennedy Jr.",
    youtubeId: "wk7DQom821s",
    videoTitle: "Joe Rogan Experience #2461 - Robert F. Kennedy, Jr.",
    role: "US HHS Secretary",
    peptides: ["~14 injectable peptides (policy)"],
    quote:
      "On the Joe Rogan Experience, said he expected the FDA to reclassify 'about 14' injectable peptides within 'a couple of weeks' to give consumers access from 'ethical suppliers.'",
    stance: "policy",
    confidence: "High",
    date: "Feb 2026",
    sourceLabel: "NPR",
    sourceUrl:
      "https://www.npr.org/2026/03/31/nx-s1-5768206/peptides-rfk-fda-compounding-pharmacies",
    bio:
      "Robert F. Kennedy Jr. is the US Secretary of Health and Human Services and the figurehead of the 'Make America Healthy Again' movement, which has embraced peptides as a cause. Speaking on the Joe Rogan Experience, he signaled that the FDA would move about 14 injectable peptides back toward looser compounding rules so consumers could access them from 'ethical suppliers.' His statements are the policy engine behind the 2026 peptide moment — though reclassification is not the same as FDA approval. Documented from news coverage.",
    stack: [
      {
        label: "~14 injectable peptides (policy)",
        note: "Signaled the FDA would ease Category-2 compounding limits — a regulatory shift, not an approval or a safety finding.",
      },
    ],
  },
  {
    name: "Kendall Jenner",
    youtubeId: "xVNA0nxCAxk",
    videoTitle: "Hailey Bieber and Kendall Jenner on NAD+",
    role: "Model",
    peptides: ["NAD+"],
    quote:
      "Showcased an NAD+ drip-therapy session (with Hailey Bieber) on an episode of The Kardashians.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2024",
    sourceLabel: "Vivere",
    sourceUrl: "https://www.viverelife.co.uk/blog/which-celebrities-have-taken-nad",
    bio:
      "Kendall Jenner is a model and one of the most-followed people on the planet, and — alongside Hailey Bieber — helped bring NAD+ drip therapy into mainstream view by showcasing a session on The Kardashians. Her connection to the trend is documented through that appearance rather than detailed personal advocacy. Reference material, not endorsement.",
    stack: [
      {
        label: "NAD+",
        note: "Showcased an NAD+ drip session with Hailey Bieber on The Kardashians.",
      },
    ],
  },
  {
    name: "Aaron Rodgers",
    role: "NFL quarterback",
    peptides: ["Peptides (for tendon recovery)"],
    quote:
      "Reported to have explored peptides to assist recovery from his 2023 Achilles tendon tear.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2023–2024",
    sourceLabel: "Men's Journal; press reports",
    bio:
      "Aaron Rodgers is a four-time NFL MVP whose interest in unconventional health and recovery methods is well documented. After tearing his Achilles tendon early in the 2023 season, he was reported to have explored peptides as part of an aggressive comeback effort. The specifics remain less than fully confirmed, so this entry is rated accordingly. Documented from press reports.",
    stack: [
      {
        label: "Recovery peptides (unspecified)",
        peptideSlug: "bpc-157",
        note: "Reported to have explored peptides — BPC-157/TB-500 are the usual soft-tissue candidates — to speed healing from a 2023 Achilles tear.",
      },
    ],
  },
  {
    name: "Rihanna",
    role: "Musician; founder, Fenty",
    peptides: ["NAD+"],
    quote: "Named among celebrities who have openly embraced NAD+ injections.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2025–2026",
    sourceLabel: "rollingout",
    sourceUrl: "https://rollingout.com/2026/02/06/why-celebrities-with-peptide-injections/",
    bio:
      "Rihanna — global music star and founder of Fenty — is among the celebrities reported to have embraced NAD+ injections as part of the broader anti-aging wave. The association is documented through wellness-press roundups rather than detailed first-person statements, so it is rated moderate. Reference, not endorsement.",
    stack: [
      {
        label: "NAD+",
        note: "Named among celebrities who have openly embraced NAD+ injections.",
      },
    ],
  },
  {
    name: "Halle Berry",
    role: "Actor",
    peptides: ["NAD+"],
    quote: "Listed among prominent celebrity promoters of NAD+ injections.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2024–2025",
    sourceLabel: "Vivere",
    sourceUrl: "https://www.viverelife.co.uk/blog/which-celebrities-have-taken-nad",
    bio:
      "Halle Berry, an Oscar-winning actor and outspoken advocate for fitness and metabolic health in midlife, is frequently named among prominent celebrity adopters of NAD+ therapy. Documented from wellness-press coverage; rated moderate pending a clearer first-person statement.",
    stack: [
      {
        label: "NAD+",
        note: "Listed among prominent celebrity promoters of NAD+ injections.",
      },
    ],
  },
  {
    name: "Justin Bieber",
    role: "Musician",
    peptides: ["NAD+"],
    quote: "Listed among prominent celebrity promoters of NAD+ injections.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2024–2025",
    sourceLabel: "Vivere",
    sourceUrl: "https://www.viverelife.co.uk/blog/which-celebrities-have-taken-nad",
    bio:
      "Justin Bieber is among the high-profile names listed in connection with NAD+ therapy — part of a cohort of celebrities who have made the treatment a fixture of contemporary wellness culture. Documented from press roundups; rated moderate.",
    stack: [
      {
        label: "NAD+",
        note: "Listed among prominent celebrity promoters of NAD+ injections.",
      },
    ],
  },
  {
    name: "Tom Brady",
    role: "Former NFL quarterback; TB12 founder",
    peptides: ["Collagen peptides (nutritional — NOT therapeutic peptides)"],
    quote:
      "Reported to take collagen peptides daily for joint/tissue support. Note: collagen peptides are a food supplement — a different category from research peptides like BPC-157.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2023–2025",
    sourceLabel: "Performance-protocol press write-ups",
    bio:
      "Tom Brady built a second brand — TB12 — around longevity, 'pliability,' and disciplined recovery, which makes him a natural reference point in any discussion of athletes and peptides. In practice, the peptide most associated with him is collagen, a nutritional supplement, rather than research peptides like BPC-157. The distinction matters: collagen peptides are a food ingredient with a very different evidence and regulatory profile. Documented from performance-protocol coverage.",
    stack: [
      {
        label: "Collagen peptides",
        note: "Reported daily use for joint/tissue support — a food supplement, NOT a research peptide like BPC-157.",
      },
    ],
  },
  {
    name: "Ben Greenfield",
    youtubeId: "mFVllH9NV4w",
    videoTitle: "What Is BPC-157? Joe Rogan, Ben Greenfield & Dave Asprey on BPC-157",
    role: "Biohacker; author; founder, Ben Greenfield Life",
    peptides: ["BPC-157", "TB-500", "Ipamorelin", "Tesamorelin", "GHK-Cu"],
    quote:
      "The recent peptide craze is funny. To me, these are old news… I literally coined the term 'Wolverine stack' (BPC-157 and TB-500).",
    stance: "enthusiast",
    confidence: "High",
    date: "2016–2026",
    sourceLabel: "@bengreenfield on X",
    sourceUrl: "https://x.com/bengreenfield/status/2061667386907070903",
    bio:
      "Ben Greenfield is a fitness and biohacking author who was writing about research peptides years before they hit the mainstream — he claims, credibly, to have coined the term 'Wolverine stack' for the BPC-157 / TB-500 recovery pairing. He publishes detailed protocols for recovery, growth-hormone support, and anti-aging, and is one of the most influential non-clinician voices in the space. Inclusion documents his public writing; nothing here is dosing or medical advice.",
    stack: [
      {
        label: "Wolverine Stack (BPC-157 + TB-500)",
        peptideSlug: "wolverine-stack",
        note: "Credited with coining the term for this recovery pairing.",
      },
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "A cornerstone of his recovery writing since 2016.",
      },
      {
        label: "TB-500",
        peptideSlug: "tb-500",
        note: "The other half of the 'Wolverine' pairing, for soft-tissue repair.",
      },
      {
        label: "Ipamorelin",
        peptideSlug: "ipamorelin",
        note: "Featured in his growth-hormone / recovery stacks.",
      },
      {
        label: "Tesamorelin",
        peptideSlug: "tesamorelin",
        note: "Used in his evening growth-hormone-support protocol.",
      },
      {
        label: "GHK-Cu",
        peptideSlug: "ghk-cu",
        note: "Copper peptide he includes for skin and connective-tissue repair.",
      },
    ],
  },
  {
    name: "Dave Asprey",
    youtubeId: "QG6igXJb-jM",
    videoTitle: "Dave Gives Himself a Peptide Injection",
    role: "Founder, Bulletproof; 'father of biohacking'",
    peptides: ["BPC-157", "Melanotan", "Peptides (general)"],
    quote:
      "There's about 500 or so that we commonly use in the world of biohacking… But they are the last thing that you do if you want to get healthy.",
    stance: "enthusiast",
    confidence: "High",
    date: "2024–2026",
    sourceLabel: "Qualia interview; The Human Upgrade",
    sourceUrl: "https://www.qualialife.com/biohacking-for-longevity-interview-with-dave-asprey",
    bio:
      "Dave Asprey built the Bulletproof brand and popularized the word 'biohacking,' and his BEYOND conference and podcast remain hubs for the peptide-curious. He's an enthusiastic adopter — naming BPC-157 as a foundational entry point and Melanotan among his favorites — but pairs that with an unusually blunt caveat: peptides are 'the last thing you do,' layered on only after the basics (vitamins, minerals, sleep) are handled, which he compares to 'putting nitrous in a car with an engine about to blow.' Documented from interviews and his platform.",
    stack: [
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "Calls it a 'foundational' entry-point peptide for tissue repair.",
      },
      {
        label: "Melanotan / α-MSH",
        note: "Names it a favorite — used in biohacking for tanning and, he claims, focus.",
      },
      {
        label: "Peptides (general)",
        note: "Estimates ~500 are 'commonly used' in biohacking — but insists they come last, after the fundamentals.",
      },
    ],
  },
  {
    name: "David Sinclair",
    youtubeId: "bRWT7hVgwuM",
    videoTitle: "NMN, NR, Resveratrol & Other Longevity Molecules — Lifespan #4",
    role: "Harvard geneticist; longevity researcher",
    peptides: ["NMN", "NAD+", "Resveratrol"],
    quote:
      "I take one gram of NMN every morning along with my resveratrol… in humans we know that doubles NAD levels.",
    stance: "enthusiast",
    confidence: "High",
    date: "2019–2026",
    sourceLabel: "Lifespan; public interviews",
    sourceUrl:
      "https://www.nmn.com/news/the-anti-aging-supplements-dr-david-sinclair-takes-daily-nmn-included",
    bio:
      "David Sinclair is a Harvard Medical School geneticist and one of the most prominent — and most debated — scientists in longevity. He is the public face of NAD+ boosting: he takes a gram of NMN daily and has argued it roughly doubles the NAD+ levels that decline with age. Strictly, NMN is a NAD+ precursor (a nucleotide), not a peptide — but his work sits at the center of the NAD+ conversation that runs through this index's celebrity entries. Documented from his book and interviews; his commercial ties to longevity ventures are part of the public record.",
    stack: [
      {
        label: "NMN",
        note: "Takes 1 g each morning; argues it doubles age-declined NAD+. A NAD+ precursor, not a peptide.",
      },
      {
        label: "NAD+",
        note: "The coenzyme his protocol aims to restore — the throughline to the celebrity NAD+ trend.",
      },
      {
        label: "Resveratrol",
        note: "Taken alongside NMN in his long-standing personal regimen.",
      },
    ],
  },
  {
    name: "Mark Hyman",
    youtubeId: "qnnq_-YL8dk",
    videoTitle: "The Peptide That Heals Tendons, Joints & Injuries Faster Than Anything Else",
    role: "Functional-medicine physician; The Doctor's Farmacy podcast",
    peptides: ["BPC-157", "Thymosin alpha-1", "Epitalon"],
    quote:
      "On injecting BPC-157 for a shoulder injury: described pain relief and recovery 'the next day' rather than weeks of rehab.",
    stance: "enthusiast",
    confidence: "High",
    date: "2024–2025",
    sourceLabel: "The Doctor's Farmacy (w/ Dr. Edwin Lee)",
    sourceUrl: "https://drhyman.com/blogs/content/podcast-ep914",
    bio:
      "Mark Hyman is a functional-medicine physician and bestselling author whose podcast regularly reaches mainstream audiences. He has platformed in-depth peptide discussion — notably with peptide-clinic physician Dr. Edwin Lee — covering BPC-157, thymosin peptides, and Epitalon, and has described personally injecting BPC-157 for a shoulder injury with rapid relief. His framing is characteristically functional-medicine: peptides work best on a foundation of good diet and low toxic load, not as a substitute for it. Documented from his podcast.",
    stack: [
      {
        label: "BPC-157",
        peptideSlug: "bpc-157",
        note: "Has described injecting it into an injured shoulder for next-day relief.",
      },
      {
        label: "Thymosin alpha-1",
        note: "Discussed for immune support on his peptide episodes.",
      },
      {
        label: "Epitalon",
        note: "Covered as a longevity / sleep peptide in conversation with Dr. Edwin Lee.",
      },
    ],
  },
  {
    name: "Sylvester Stallone",
    role: "Actor; filmmaker",
    peptides: ["HGH", "Testosterone", "Hormone optimization"],
    quote:
      "HGH is nothing… Everyone over 40 would be wise to investigate it… Mark my words, in 10 years it will be over-the-counter.",
    stance: "enthusiast",
    confidence: "High",
    date: "2008–2024",
    sourceLabel: "TIME; press interviews",
    sourceUrl: "https://www.today.com/popculture/sylvester-stallone-discusses-hgh-charge-wbna22728530",
    bio:
      "Long before peptides trended, Sylvester Stallone was Hollywood's most unapologetic advocate for hormone optimization — defending human growth hormone and testosterone as tools for staying strong and functional with age, and predicting they'd one day be 'over-the-counter.' He belongs in this index as the cultural forerunner of today's growth-hormone-peptide conversation: compounds like CJC-1295, ipamorelin, and tesamorelin are prized precisely because they nudge the body's own GH. Note the distinction — Stallone's statements are about HGH and testosterone directly, not research peptides. Documented from interviews.",
    stack: [
      {
        label: "HGH (human growth hormone)",
        note: "Defends it for offsetting 'wear and tear'; predicted it would go over-the-counter.",
      },
      {
        label: "Testosterone",
        note: "Calls it 'so important for a sense of well-being' after 40 — hormone optimization, not a peptide.",
      },
      {
        label: "GH-secretagogue peptides",
        peptideSlug: "cjc-1295-no-dac",
        note: "Editorial context: the modern peptide analog of Stallone's idea — nudging natural GH rather than injecting it. His own statements predate these.",
      },
    ],
  },
  {
    name: "Kim Kardashian",
    role: "Media personality; founder, SKIMS",
    peptides: ["NMN", "NAD+"],
    quote:
      "Reported to take NMN daily (influenced by David Sinclair's research) and to use NAD+ IV therapy.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2024–2026",
    sourceLabel: "Hello!; AOL",
    sourceUrl:
      "https://www.hellomagazine.com/healthandbeauty/health-and-fitness/900166/nmn-supplement-longevity-does-it-work/",
    bio:
      "Kim Kardashian's wellness choices move markets, which makes her reported adoption of NAD+ and NMN notable even without a detailed personal manifesto on the subject. She has been reported to take NMN — influenced by David Sinclair's longevity research — and to use NAD+ IV therapy, placing her in the same anti-aging current as several other figures here. The connection is documented through press reporting rather than first-person statements, so it is rated moderate. NMN is a NAD+ precursor, not a peptide.",
    stack: [
      {
        label: "NMN",
        note: "Reported daily use, influenced by David Sinclair's research. A NAD+ precursor, not a peptide.",
      },
      {
        label: "NAD+",
        note: "Reported to use NAD+ IV therapy for energy and anti-aging.",
      },
    ],
  },
  {
    name: "Mike Tyson",
    role: "Boxing legend; entrepreneur",
    peptides: ["Collagen peptides", "NMN"],
    quote:
      "His branded supplement line features collagen peptides and NMN — nutritional longevity ingredients, rather than research peptides.",
    stance: "enthusiast",
    confidence: "Moderate",
    date: "2024–2025",
    sourceLabel: "NutraIngredients-USA",
    sourceUrl:
      "https://www.nutraingredients-usa.com/Article/2024/11/07/Mike-Tyson-launches-supplements-ahead-of-Jake-Paul-fight/",
    bio:
      "Mike Tyson's late-career reinvention includes a supplement brand, launched around his 2024 exhibition with Jake Paul, whose formulas feature collagen peptides and NMN alongside vitamins and adaptogens. As with Tom Brady, the 'peptide' link here is nutritional — collagen and a NAD+ precursor — not the research peptides like BPC-157 that drive most of this index. Included for completeness, and to keep that distinction clear. Documented from trade press.",
    stack: [
      {
        label: "Collagen peptides",
        note: "In his branded supplement line — a food ingredient, not a research peptide.",
      },
      {
        label: "NMN",
        note: "Also in the lineup; a NAD+ precursor marketed for longevity.",
      },
    ],
  },
  {
    name: "Mark Wahlberg",
    role: "Actor; entrepreneur",
    peptides: ["(Speculated: NAD+, Epithalon, SS-31)"],
    quote:
      "Frequently cited by peptide vendors in connection with longevity protocols, but no confirmed first-person statement. Treat as marketing association.",
    stance: "unverified",
    confidence: "Low / Unverified",
    date: "—",
    sourceLabel: "Vendor association — unverified",
    bio:
      "Mark Wahlberg is famous for punishing pre-dawn workout routines and a heavily marketed approach to fitness, which has made him a frequent name in peptide and longevity marketing. Crucially, those associations come largely from vendors and aggregators rather than from Wahlberg himself — there is no clear first-person statement that he uses the peptides attributed to him. This entry is included precisely to flag that gap. Treat it as an unverified marketing association.",
    stack: [
      {
        label: "Attributed (unverified)",
        note: "Names like NAD+, Epithalon, and SS-31 appear in vendor marketing — with no confirmed statement from Wahlberg.",
      },
    ],
  },
];

// Regulatory context — timely backdrop to the 2026 coverage.
export const REG_TIMELINE = [
  { date: "Late 2023", event: "FDA moves 19 popular peptides to Category 2 (restricted compounding)." },
  { date: "Sep 2024", event: "FDA removes 5 from Category 2 (incl. CJC-1295, Ipamorelin) — still not approved." },
  { date: "Feb 2026", event: "RFK Jr. signals ~14 of 19 peptides moving back toward Category 1." },
  { date: "Apr 2026", event: "BPC-157 removed from Category 2 — 'transitional' state, not approved." },
  { date: "Jul 23–24, 2026", event: "FDA Pharmacy Compounding Advisory Committee reviews BPC-157, KPV, TB-500, MOTS-c." },
];

// ---------------------------------------------------------------------------
// Helpers — figure slugs + peptide cross-linking
// ---------------------------------------------------------------------------
export function figureSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[.'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFigureBySlug(slug: string): MediaMention | undefined {
  return MEDIA_MENTIONS.find((m) => figureSlug(m.name) === slug);
}

/** Display-name → Peptide Index slug, for cross-linking named peptides. */
const PEPTIDE_LINKS: Record<string, string> = {
  "bpc-157": "bpc-157",
  "tb-500": "tb-500",
  ipamorelin: "ipamorelin",
  "cjc-1295": "cjc-1295-no-dac",
  "ghk-cu": "ghk-cu",
  kpv: "kpv",
  "mots-c": "mots-c",
  tesamorelin: "tesamorelin",
  dsip: "dsip",
  "pt-141": "pt-141",
};

/** Best-effort map of a free-text peptide label to an Index entry slug. */
export function peptideSlugFor(label: string): string | undefined {
  const key = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (PEPTIDE_LINKS[key]) return PEPTIDE_LINKS[key];
  for (const k of Object.keys(PEPTIDE_LINKS)) {
    if (key.startsWith(k)) return PEPTIDE_LINKS[k];
  }
  return undefined;
}
