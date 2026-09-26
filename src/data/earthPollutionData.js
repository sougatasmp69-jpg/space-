// Comprehensive Scientific & Actionable Dataset for Earth's Plastic Pollution & Aquatic Crisis

export const EARTH_POLLUTION_DATA = {
  // 5 Core Earth Environmental Crises Required by Specification
  coreCrises: [
    {
      id: 'plastic-pollution',
      title: 'Plastic Inundation & Marine Life Degradation',
      category: 'Marine Biosphere Crisis',
      tag: 'Plastic Pollution',
      severity: 'Critical',
      severityPercent: 94,
      severityColor: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.4)',
      icon: 'Fish',
      animationType: 'plastic-ocean',
      shortDescription: 'Over 12 million metric tons of synthetic plastic enter global oceans annually, fragmenting into toxic microplastics. Marine species from zooplankton to sea turtles and cetaceans suffer lethal ingestion, intestinal perforation, and chemical bioaccumulation.',
      keyStat: '100,000+ marine mammals and 1M+ seabirds killed annually',
      secondaryStat: '5.25 trillion plastic particles afloat across all 5 gyres',
      mechanisms: [
        'Physical ingestion causing internal blockage & false starvation',
        'Ghost net entanglement drowning whales, dolphins, and turtles',
        'Chemical absorption of toxic PCBs, DDT, and endocrine disruptors'
      ],
      mitigationAction: 'Enforce the legally binding UN Global Plastics Treaty, eliminate single-use polymers, and deploy automated solar river interceptors.'
    },
    {
      id: 'ocean-acidification',
      title: 'Ocean Acidification & Coral Bleaching Collapse',
      category: 'Hydrosphere Chemical Shift',
      tag: 'Ocean Acidification',
      severity: 'Critical',
      severityPercent: 91,
      severityColor: '#f97316',
      badgeBg: 'rgba(249, 115, 22, 0.15)',
      badgeBorder: 'rgba(249, 115, 22, 0.4)',
      icon: 'Waves',
      animationType: 'coral-acid',
      shortDescription: 'Absorbing over 30% of anthropogenic CO₂ emissions has dropped ocean surface pH by 0.1 units, representing a 30% surge in hydrogen ion acidity. This chemical shift dissolves calcium carbonate aragonite shells and triggers catastrophic mass coral bleaching.',
      keyStat: 'Ocean surface pH dropped from 8.2 to 8.1 (30% acidity surge)',
      secondaryStat: 'Over 50% of living coral reef coverage lost since 1950',
      mechanisms: [
        'Carbonic acid saturation depleting carbonate ions needed for calcification',
        'Thermal marine heatwaves expelling photosynthetic zooxanthellae algae',
        'Dissolution of pteropod shells, collapsing the base of polar marine food webs'
      ],
      mitigationAction: 'Aggressive atmospheric CO₂ emissions reduction, establishment of high-seas marine protected areas, and selective coral thermal resilience breeding.'
    },
    {
      id: 'deforestation',
      title: 'Tropical Deforestation & Biodiversity Annihilation',
      category: 'Terrestrial Ecosystem Crisis',
      tag: 'Deforestation',
      severity: 'High',
      severityPercent: 86,
      severityColor: '#eab308',
      badgeBg: 'rgba(234, 179, 8, 0.15)',
      badgeBorder: 'rgba(234, 179, 8, 0.4)',
      icon: 'Trees',
      animationType: 'forest-deforestation',
      shortDescription: 'Approximately 10 million hectares of primary tropical forest are cleared annually for cattle ranching, monoculture agriculture, and timber logging. This relentless fragmentation accelerates global species extinction rates to 1,000 times above background baseline levels.',
      keyStat: '10 million hectares of primary forest destroyed annually',
      secondaryStat: '68% average decline in monitored vertebrate wildlife populations since 1970',
      mechanisms: [
        'Clear-cutting and deliberate burning of ancient carbon-rich rainforest canopies',
        'Severe edge effect fragmentation isolating wildlife gene pools',
        'Disruption of biotic pump rainfall cycles across continental landmasses'
      ],
      mitigationAction: 'Mandate zero-deforestation commodity supply chains, legally protect indigenous ancestral territories, and invest in large-scale mosaic rewilding.'
    },
    {
      id: 'air-pollution',
      title: 'Atmospheric Smog, PM2.5 & Greenhouse Heating',
      category: 'Atmospheric Chemistry & Climate',
      tag: 'Air Pollution',
      severity: 'High',
      severityPercent: 88,
      severityColor: '#ec4899',
      badgeBg: 'rgba(236, 72, 153, 0.15)',
      badgeBorder: 'rgba(236, 72, 153, 0.4)',
      icon: 'Wind',
      animationType: 'air-smog',
      shortDescription: 'Combustion of fossil fuels for power and transport injects 37+ billion metric tons of CO₂ and millions of tons of fine PM2.5 particulates into the troposphere annually. This greenhouse radiative forcing drives supercharged heatwaves, intense storms, and widespread respiratory illness.',
      keyStat: '8.7 million premature human deaths caused annually by fossil fuel air pollution',
      secondaryStat: 'Atmospheric CO₂ surpassing 424 ppm (highest in 3+ million years)',
      mechanisms: [
        'Fine PM2.5 aerosol particles penetrating deep alveolar and cardiovascular barriers',
        'Infrared radiation trapping by CO₂, methane (CH₄), and nitrous oxide (N₂O)',
        'Tropospheric ozone and photochemical smog degrading agricultural yields'
      ],
      mitigationAction: 'Rapidly phase out coal, oil, and gas with decentralized solar and wind energy grids, universal zero-emission transport, and clean air mandates.'
    },
    {
      id: 'melting-icecaps',
      title: 'Polar Cryosphere Collapse & Sea Level Inundation',
      category: 'Global Cryosphere Breakdown',
      tag: 'Melting Ice Caps',
      severity: 'Critical',
      severityPercent: 96,
      severityColor: '#06b6d4',
      badgeBg: 'rgba(6, 182, 212, 0.15)',
      badgeBorder: 'rgba(6, 182, 212, 0.4)',
      icon: 'Snowflake',
      animationType: 'polar-ice',
      shortDescription: 'The polar ice caps of Greenland and Antarctica are shedding over 400 billion tons of glacial ice every year, dramatically accelerating thermal ocean expansion. Albedo feedback loops replace reflective white ice with heat-absorbing dark seawater, driving irreversible tipping points.',
      keyStat: '427+ billion tons of polar ice lost annually to the oceans',
      secondaryStat: 'Global mean sea levels rising at 4.5 mm/year (more than double the 1990s rate)',
      mechanisms: [
        'Loss of planetary surface albedo reflecting solar radiation back into space',
        'Basal melt of floating ice shelves by warm circumpolar deep water intrusions',
        'Disruption of the Atlantic Meridional Overturning Circulation (AMOC) conveyor'
      ],
      mitigationAction: 'Halt fossil emissions to limit global warming strictly under 1.5°C, safeguard polar cryosphere zones, and engineer resilient coastal flood defenses.'
    }
  ],

  hero: {
    headline: "Plastic Inundation & Marine Ecosystem Collapse",
    subheadline: "Every minute, the equivalent of one full garbage truck of plastic is dumped into our oceans. From coastal mangroves to the Mariana Trench at 11,000 meters depth, synthetic polymers are infiltrating every level of marine biology.",
    liveStatPerSecondKg: 350, // Approx 11-14 million tons per year ≈ ~350-440 kg per second!
    stats: [
      {
        id: 'annual-dump',
        value: 12.7,
        suffix: ' Million Tons',
        label: 'Plastic Entering Oceans Annually',
        detail: 'Equivalent to dumping a garbage truck full of plastic every 45 seconds.'
      },
      {
        id: 'floating-pieces',
        value: 5.25,
        suffix: ' Trillion',
        label: 'Individual Pieces of Plastic Afloat',
        detail: 'Concentrating in 5 massive subtropical ocean gyres across the planet.'
      },
      {
        id: 'marine-mammals',
        value: 100000,
        prefix: 'Over ',
        suffix: '+',
        label: 'Marine Mammals Killed Annually',
        detail: 'From direct entanglement, strangulation, and intestinal rupture.'
      },
      {
        id: 'seabirds-ingested',
        value: 90,
        suffix: '%',
        label: 'Seabirds with Ingested Plastics',
        detail: 'Projected to reach 99% of all species by 2050 without immediate interventions.'
      }
    ]
  },

  // Interactive Flow: Journey of Plastic from Land to Sea
  flowJourney: [
    {
      step: '01',
      title: 'Urban Consumption & Packaging',
      icon: 'Factory',
      stage: 'Land Inception',
      description: 'Over 400 million tons of virgin plastic are manufactured globally each year — 40% of which is single-use packaging discarded within minutes of purchase.',
      fact: 'Only ~9% of all plastic ever made has been recycled; 79% sits in landfills or dumps.'
    },
    {
      step: '02',
      title: 'Stormwater & River Arteries',
      icon: 'Waves',
      stage: 'Hydrological Transport',
      description: 'Mismanaged municipal waste washes into storm drains and rivers. Just 1,000 major rivers are responsible for nearly 80% of all riverine plastic emissions into oceans.',
      fact: 'The Yangtze, Indus, Ganges, and Pasig rivers carry millions of metric tons seaward annually.'
    },
    {
      step: '03',
      title: 'Oceanic Gyres & Fragmentation',
      icon: 'Disc3',
      stage: 'Marine Gyres',
      description: 'Coriolis forces and circular ocean currents trap debris in 5 major gyres. Ultraviolet sunlight and wave mechanical shear break plastics down into microscopic particles.',
      fact: 'The Great Pacific Garbage Patch covers 1.6 million km² — three times the size of France.'
    },
    {
      step: '04',
      title: 'Trophic Infiltration & Abyss',
      icon: 'Anchor',
      stage: 'Deep Ocean & Benthos',
      description: 'Microplastics acquire bacterial biofilms (plastisphere), become heavy, and sink into benthic ocean sediments and deep-sea trenches where they persist indefinitely.',
      fact: 'Plastic bags and microfibers have been discovered inside amphipods in the Mariana Trench.'
    }
  ],

  // Visual Breakdown of Plastic Types
  plasticTypes: [
    {
      id: 'microplastics',
      name: 'Microplastics (< 5mm)',
      category: 'Primary & Secondary Particles',
      sources: 'Cosmetic microbeads, synthetic textile fleece shedding, shredded tire dust, fragmented bottles',
      lifespan: 'Centuries to Millennia',
      hazardLevel: 'Severe',
      dangerColor: '#ef4444',
      description: 'Microscopic particles readily consumed by zooplankton, filter-feeding shellfish, and larval fish. They absorb hydrophobic toxic chemicals like PCBs and DDT from seawater, acting as poisonous sponges.'
    },
    {
      id: 'single-use',
      name: 'Single-Use Packaging (PET, HDPE, LDPE)',
      category: 'Consumer Disposables',
      sources: 'Beverage bottles, thin grocery shopping bags, food wrappers, styrofoam containers, disposable straws',
      lifespan: '450 - 500 Years',
      hazardLevel: 'High',
      dangerColor: '#f97316',
      description: 'Transparent plastic bags mimic gelatinous prey (jellyfish) to sea turtles. Bottle caps and containers are swallowed by seabirds like Laysan Albatrosses, filling stomachs and causing false satiation and starvation.'
    },
    {
      id: 'ghost-gear',
      name: 'Ghost Fishing Gear & Abandoned Nets',
      category: 'Commercial Fishery Debris',
      sources: 'Lost monofilament gillnets, heavy trawl ropes, synthetic lobster traps, longlines',
      lifespan: '600+ Years',
      hazardLevel: 'Catastrophic',
      dangerColor: '#dc2626',
      description: 'Accounts for up to 46% of the mass in the Great Pacific Garbage Patch. These indestructible nylon nets drift through the water column for decades, continuously trapping and drowning whales, dolphins, sharks, and turtles.'
    },
    {
      id: 'microfibers',
      name: 'Synthetic Microfibers',
      category: 'Textile Laundering',
      sources: 'Polyester, acrylic, nylon garment machine washing',
      lifespan: 'Hundreds of Years',
      hazardLevel: 'High',
      dangerColor: '#eab308',
      description: 'A single laundry cycle of synthetic garments can release up to 700,000 microfibers into municipal waterways, bypassing standard wastewater treatment filtration systems and penetrating marine gill membranes.'
    }
  ],

  // Detailed Aquatic Life Impacts
  aquaticImpacts: [
    {
      id: 'ingestion',
      title: 'Lethal Ingestion & Internal Starvation',
      tag: 'Trophic Harm',
      icon: 'Fish',
      stats: 'Over 1,200 marine species documented with plastic in digestive tracts',
      description: 'Marine animals mistake brightly colored or scented plastics for food. The plastics cause stomach impaction, puncture internal intestinal linings, and trigger false fullness, leading to severe malnutrition and death.',
      caseStudy: 'A single Cuvier’s beaked whale was found stranded with 40 kg of plastic bags and rice sacks packed tightly inside its stomach.'
    },
    {
      id: 'entanglement',
      title: 'Ghost Net Entanglement & Suffocation',
      tag: 'Physical Trauma',
      icon: 'ShieldAlert',
      stats: '640,000 tons of commercial fishing gear abandoned annually',
      description: 'Heavy synthetic lines wrap around fins, flukes, and necks of cetaceans, pinnipeds, and sea turtles, causing deep lacerations, amputations, loss of buoyancy control, and eventual drowning.',
      caseStudy: 'Right whales frequently carry thousands of pounds of tangled fishing gear for months, preventing feeding and causing extreme exhaustion.'
    },
    {
      id: 'coral-reefs',
      title: 'Coral Reef Smothering & Pathogen Vectors',
      tag: 'Habitat Destruction',
      icon: 'Biohazard',
      stats: '89% disease likelihood in corals tangled with plastic vs 4% in plastic-free reefs',
      description: 'Plastic debris snags on delicate coral branching structures, blocking essential sunlight needed by symbiotic zooxanthellae algae, depriving tissue of oxygen, and acting as vectors for deadly bacterial pathogens.',
      caseStudy: 'Over 11.1 billion plastic items are currently entangled across coral reefs throughout the Asia-Pacific region.'
    },
    {
      id: 'chemical-toxicity',
      title: 'Endocrine Disruption & Chemical Leaching',
      tag: 'Toxicological Leaching',
      icon: 'FlaskConical',
      stats: '10,000+ chemical additives used in plastics, many toxic and unmonitored',
      description: 'Plastics contain plasticizers, flame retardants, bisphenols (BPA), and phthalates. In seawater, these chemicals leach out while simultaneously concentrating persistent organic pollutants (POPs) on particle surfaces.',
      caseStudy: 'Female marine organisms exposed to phthalate-laden microplastics exhibit altered steroid hormone levels, impaired egg fertilization, and reduced offspring viability.'
    }
  ],

  // Interactive Food Chain Biomagnification
  foodChainTrophicLevels: [
    {
      level: 1,
      name: 'Primary Producers & Zooplankton',
      creatures: 'Phytoplankton, Krill, Copepods, Larval Shellfish',
      contaminationMechanism: 'Ingest sub-micron nanoplastics suspended in water column; cellular translocation into lipid membranes.',
      toxicityLevel: 'Low Concentration / High Vulnerability',
      icon: 'Sparkles',
      plasticCount: 15
    },
    {
      level: 2,
      name: 'Secondary Consumers',
      creatures: 'Sardines, Anchovies, Herring, Mackerel, Mussels',
      contaminationMechanism: 'Consume thousands of contaminated zooplankton daily; microplastics accumulate inside gastrointestinal and hepatic tissues.',
      toxicityLevel: 'Moderate Concentration',
      icon: 'Fish',
      plasticCount: 45
    },
    {
      level: 3,
      name: 'Apex Marine Predators',
      creatures: 'Tuna, Swordfish, Sharks, Sea Lions, Toothed Whales',
      contaminationMechanism: 'Biomagnification: High trophic predators ingest accumulated toxins from thousands of smaller prey fish over lifespans of 20+ years.',
      toxicityLevel: 'High Toxic Bioaccumulation',
      icon: 'Zap',
      plasticCount: 120
    },
    {
      level: 4,
      name: 'Human Consumption & Global Food Supply',
      creatures: 'Seafood Consumers, Coastal Communities, Global Population',
      contaminationMechanism: 'Dietary intake via commercial fish, oysters, sea salt, and drinking water. Studies estimate humans ingest ~5 grams of plastic weekly (the weight of a credit card).',
      toxicityLevel: 'Circulatory & Organ Trophic Transfer',
      icon: 'UserCheck',
      plasticCount: 250
    }
  ],

  // Comprehensive 5-Tier Mitigation Matrix
  mitigationPillars: [
    {
      id: 'individual',
      title: 'Individual & Household Actions',
      badge: 'Grassroots Direct',
      color: '#38bdf8',
      icon: 'HeartHandshake',
      intro: 'Meaningful reduction starts with daily consumer habits that refuse disposable culture.',
      actions: [
        {
          title: 'Eliminate the Big Four Single-Use Plastics',
          desc: 'Carry stainless steel water bottles, reusable canvas tote bags, beeswax food wraps, and say no to plastic straws and disposable cutlery.'
        },
        {
          title: 'Microfiber Wash Filter Installation',
          desc: 'Fit washing machines with microfiber catchers (e.g. Cora Ball or Guppyfriend) to prevent up to 86% of synthetic fibers from reaching sewers.'
        },
        {
          title: 'Conscious Seafood & Sustainable Sourcing',
          desc: 'Support certified sustainable fisheries that use traceable, biodegradable or marked gear to prevent ghost net abandonment.'
        },
        {
          title: 'Rigorous Household Segregation',
          desc: 'Clean, dry, and sort recyclables to prevent organic food contamination that condemns entire recycling bins to landfills.'
        }
      ]
    },
    {
      id: 'community',
      title: 'Community, NGOs & Coastal Defense',
      badge: 'Collective Impact',
      color: '#34d399',
      icon: 'Users',
      intro: 'Organized civil society intercepts plastic before it reaches open pelagic zones.',
      actions: [
        {
          title: 'Community Coastal & Mangrove Cleanups',
          desc: 'Mobilize citizen science data collection along shorelines, documenting corporate brands to power accountability databases (Break Free From Plastic).'
        },
        {
          title: 'River Trash Boom Deployments',
          desc: 'Install low-cost localized floating barriers and trash traps at river mouths and canal exits to capture debris before marine dispersal.'
        },
        {
          title: 'Zero-Waste Educational Outreach',
          desc: 'Equip schools and neighborhood associations with composting, bulk-refill stations, and community repair cafes.'
        }
      ]
    },
    {
      id: 'policy',
      title: 'Legislation & Government Regulations',
      badge: 'Systemic Governance',
      color: '#a855f7',
      icon: 'Landmark',
      intro: 'Binding statutory policy creates economic incentives for closed-loop packaging.',
      actions: [
        {
          title: 'Legally Binding Global Plastics Treaty (INC)',
          desc: 'Enact the UN international legally binding instrument to cap global virgin plastic production and eliminate hazardous chemical additives.'
        },
        {
          title: 'Extended Producer Responsibility (EPR)',
          desc: 'Mandate that manufacturers fund 100% of the end-of-life collection, recycling, and environmental cleanup costs for every unit of packaging sold.'
        },
        {
          title: 'Comprehensive Single-Use Bans & Taxes',
          desc: 'Prohibit expanded polystyrene food containers, thin non-reusable polyethylene bags, and unrecyclable multi-layer sachets.'
        },
        {
          title: 'Deposit Return Schemes (DRS)',
          desc: 'Implement national beverage container deposit systems achieving 90%+ return rates, as proven in Scandinavia and Germany.'
        }
      ]
    },
    {
      id: 'technology',
      title: 'Technological & Scientific Innovations',
      badge: 'Engineering Breakthroughs',
      color: '#f59e0b',
      icon: 'Cpu',
      intro: 'Cutting-edge engineering is revolutionizing ocean cleanup and material chemistry.',
      actions: [
        {
          title: 'Automated Solar-Powered River Interceptors',
          desc: 'Deploy autonomous solar-powered catamarans and extraction barriers (such as The Ocean Cleanup Interceptor) across the world’s top 1,000 polluting rivers.'
        },
        {
          title: 'Seaweed & Algae-Derived PHA/PHB Biopolymers',
          desc: 'Develop 100% marine-degradable bio-resins made from kelp and agricultural waste that dissolve safely in seawater in months without toxic residues.'
        },
        {
          title: 'Enzymatic & Bacterial Bio-Recycling',
          desc: 'Utilize engineered PETase and MHETase bacterial enzymes that depolymerize PET plastics into virgin-grade monomer building blocks within hours at room temperature.'
        },
        {
          title: 'Satellite & AI Ocean Debris Tracking',
          desc: 'Leverage synthetic aperture radar (SAR) and multispectral satellite imaging to track drifting ghost net aggregations for targeted recovery vessels.'
        }
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Responsibility & Circular Economy',
      badge: 'Industrial Transformation',
      color: '#ec4899',
      icon: 'Building2',
      intro: 'Transforming legacy linear "take-make-waste" business models into regenerative circular supply chains.',
      actions: [
        {
          title: 'Standardized Refill & Reuse Infrastructure',
          desc: 'Transition fast-moving consumer goods (FMCG) to standardized, durable, refillable containers across global retail supply chains.'
        },
        {
          title: 'Complete Phase-Out of Virgin Polymer Subsidies',
          desc: 'Commit corporate procurement to a minimum of 75% certified post-consumer recycled (PCR) resin content across all product lines.'
        },
        {
          title: 'Full Life-Cycle Transparency & Packaging Audits',
          desc: 'Publish audited annual environmental balance sheets detailing virgin plastic tonnage, recycling rates, and ocean leakage metrics.'
        }
      ]
    }
  ],

  // Interactive Plastic Footprint Tool Questions
  footprintQuiz: [
    {
      id: 'bottles',
      question: 'How many single-use plastic bottles do you use per week?',
      options: [
        { label: '0 (I use a reusable bottle)', score: 0, kg: 0 },
        { label: '1 - 3 bottles', score: 2, kg: 3.5 },
        { label: '4 - 7 bottles', score: 5, kg: 9.0 },
        { label: '8+ bottles', score: 8, kg: 18.0 }
      ]
    },
    {
      id: 'takeout',
      question: 'How often do you order food takeout in plastic containers/bags?',
      options: [
        { label: 'Rarely / Never', score: 0, kg: 0.5 },
        { label: '1 - 2 times per week', score: 3, kg: 6.2 },
        { label: '3 - 5 times per week', score: 6, kg: 14.5 },
        { label: 'Almost daily', score: 9, kg: 26.0 }
      ]
    },
    {
      id: 'groceries',
      question: 'When grocery shopping, what bags do you typically use?',
      options: [
        { label: 'Always my own reusable tote bags', score: 0, kg: 0 },
        { label: 'Mostly reusable, occasionally plastic', score: 2, kg: 2.1 },
        { label: 'Standard store plastic bags every time', score: 6, kg: 8.5 }
      ]
    },
    {
      id: 'clothing',
      question: 'How often do you buy synthetic (polyester, nylon, acrylic) fast-fashion clothing?',
      options: [
        { label: 'Rarely / I buy natural fibers & second-hand', score: 0, kg: 1.0 },
        { label: 'A few pieces per year', score: 3, kg: 4.5 },
        { label: 'Frequently buy new synthetic garments', score: 7, kg: 12.0 }
      ]
    }
  ],

  // Action Pledge Commitments
  pledgeItems: [
    { id: 'p1', text: 'Carry a reusable water bottle and beverage tumbler daily.' },
    { id: 'p2', text: 'Refuse single-use plastic cutlery and bags for food takeout.' },
    { id: 'p3', text: 'Support plastic-free packaging and zero-waste refill options.' },
    { id: 'p4', text: 'Participate in or donate to local river and beach cleanups.' },
    { id: 'p5', text: 'Advocate for extended producer responsibility (EPR) and UN plastic treaties.' }
  ]
};
