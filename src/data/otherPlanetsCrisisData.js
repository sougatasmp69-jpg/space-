// Planetary Environmental & Atmospheric Crisis Profiles for All Other Planets & Sun

export const OTHER_PLANETS_CRISIS_DATA = {
  mercury: {
    title: 'Thermal Extremity & Solar Radiation Scorching',
    badge: 'Unshielded Desolation',
    planetName: 'Mercury',
    accentColor: '#9ca3af',
    severity: 'Extreme',
    severityPercent: 95,
    severityColor: '#9ca3af',
    animationType: 'mercury-thermal',
    shortDescription: 'With no insulating atmosphere or oceans to regulate temperature, Mercury undergoes the most violent thermal swings in the solar system, ranging from 430°C in sunlight to -180°C in darkness. Solar ultraviolet and X-ray radiation bombard its pulverized regolith surface without atmospheric impediment.',
    keyStats: [
      { label: 'Day Temp', value: '430 °C', desc: 'Scorching daytime radiation.' },
      { label: 'Night Temp', value: '-180 °C', desc: 'Instantaneous cryogenic freeze.' },
      { label: 'Atmospheric Blanket', value: 'None', desc: 'Only a tenuous, transient exosphere.' },
      { label: 'Diurnal Range', value: '610 °C Shift', desc: 'Largest temperature swing in the solar system.' }
    ],
    overview: 'Mercury is a study in raw planetary exposure. Devoid of any insulating atmosphere or hydrosphere, heat gained during the day radiates immediately into space at night, resulting in the most violent temperature swings in the solar system.',
    earthAnalogy: 'Highlights the fundamental role of Earth’s atmosphere as a thermal blanket and heat buffer. Without our balanced greenhouse layer, Earth would swing between lethal boiling days and frozen nights.',
    solutionsAndLessons: [
      {
        title: 'Thermal Insulation & Urban Heat Island Mitigation',
        desc: 'Designing sustainable green roofs, reflective architectural materials, and urban tree canopies to buffer extreme localized heat waves on Earth.'
      },
      {
        title: 'Solar Radiative Shielding Materials',
        desc: 'Developing advanced aerospace-grade thin-film thermal barriers for satellites and solar-concentrating renewable thermal plants.'
      }
    ]
  },
  venus: {
    title: 'The Runaway Greenhouse Catastrophe',
    badge: 'Climate Feedback Loop',
    planetName: 'Venus',
    accentColor: '#f97316',
    severity: 'Critical',
    severityPercent: 99,
    severityColor: '#ef4444',
    animationType: 'venus-greenhouse',
    shortDescription: 'Venus represents the solar system’s ultimate climate cautionary tale: a runaway greenhouse effect where atmospheric CO₂ reached 96.5% and surface temperatures reached 465°C. Hyper-dense sulfuric acid cloud decks exert a crushing surface pressure of 92 bar, equal to being 900 meters deep in Earth’s oceans.',
    keyStats: [
      { label: 'Surface Temperature', value: '465 °C', desc: 'Hot enough to melt lead, day and night.' },
      { label: 'Atmospheric Pressure', value: '92 Bar', desc: 'Equal to 900m depth in Earth’s oceans.' },
      { label: 'Atmospheric CO₂', value: '96.5%', desc: 'A hyper-dense suffocating carbon blanket.' },
      { label: 'Sulfuric Rain', value: '100% Acid', desc: 'Acidic droplets evaporate before reaching ground (virga).' }
    ],
    overview: 'Venus represents Earth’s planetary nightmare: what happens when positive climate feedback loops run out of control. Billions of years ago, Venus may have had liquid oceans and a temperate climate. As solar luminance increased, surface water evaporated into the atmosphere. Because water vapor is a potent greenhouse gas, it trapped more heat, accelerating evaporation until every drop boiled into the stratosphere, where solar UV radiation permanently stripped the hydrogen into deep space.',
    earthAnalogy: 'A stark planetary warning on tipping points. As Earth warms, the loss of Arctic albedo, permafrost methane release, and ocean carbon saturation risk triggering runaway warming mechanisms that mimic Venusian feedback dynamics.',
    solutionsAndLessons: [
      {
        title: 'Carbon Capture & Negative Emissions',
        desc: 'Accelerating industrial direct air capture (DAC) and biological carbon sequestration to keep Earth’s atmospheric CO₂ below critical tipping thresholds.'
      },
      {
        title: 'Protecting Ocean Heat Sinks',
        desc: 'Recognizing that Earth’s oceans have absorbed 90% of excess planetary heat — and guarding marine thermal equilibrium before irreversible ocean deoxygenation sets in.'
      }
    ]
  },
  mars: {
    title: 'Atmospheric Stripping & Total Desertification',
    badge: 'Planetary Shield Failure',
    planetName: 'Mars',
    accentColor: '#ef4444',
    severity: 'High',
    severityPercent: 88,
    severityColor: '#f97316',
    animationType: 'mars-duststorm',
    shortDescription: 'When the Martian core solidified billions of years ago, its protective magnetic dynamo collapsed, allowing solar winds to strip away 99% of its atmospheric blanket into deep space. Today, Mars is a hyper-arid, irradiated freeze-dried desert engulfed by months-long circumplanetary dust storms.',
    keyStats: [
      { label: 'Remaining Atmosphere', value: '0.6% of Earth', desc: 'Nearly a pure vacuum of thin CO₂.' },
      { label: 'Water Status', value: 'Frozen & Subsurface', desc: 'Ancient rivers dried up ~3.5 billion years ago.' },
      { label: 'Global Dust Storms', value: 'Months Long', desc: 'Circum-planetary storms blotting out 99% of sunlight.' },
      { label: 'Radiation Dosage', value: '0.67 mSv / day', desc: 'Over 250× higher than normal Earth background.' }
    ],
    overview: 'Mars was once a warm, wet world with a thick atmosphere and a global magnetic dynamo. When the small Martian core cooled and solidified, its protective magnetic shield collapsed. Without magnetospheric deflection, intense solar winds eroded 99% of its atmospheric volatiles into space over billions of years, turning a vibrant world into a frozen, irradiated desert.',
    earthAnalogy: 'Demonstrates the critical importance of Earth’s geomagnetic field, ionosphere, and ozone layer. It also illustrates extreme desertification — how fragile planetary water cycles are once vegetative and atmospheric anchors are lost.',
    solutionsAndLessons: [
      {
        title: 'Reforestation & Combating Desertification',
        desc: 'Re-greening arid lands on Earth with drought-resistant native biomes and soil moisture conservation to prevent Martian-style land degradation.'
      },
      {
        title: 'Space Radiation & Atmospheric Defense',
        desc: 'Monitoring space weather and protecting Earth’s orbital telecommunications and ozone layer from anthropogenic halocarbon depletion.'
      }
    ]
  },
  jupiter: {
    title: 'Hyper-Turbulent Atmospheric Chaos & Storm Dynamics',
    badge: 'Extreme Meteorology',
    planetName: 'Jupiter',
    accentColor: '#f59e0b',
    severity: 'Extreme',
    severityPercent: 92,
    severityColor: '#f59e0b',
    animationType: 'jupiter-vortex',
    shortDescription: 'Jupiter’s gargantuan atmosphere is driven by internal thermal convection and rapid 10-hour axial rotation, producing opposing jet streams and giant anticyclonic vortices like the Great Red Spot. Superbolts of lightning discharge 1,000 times more energy than terrestrial lightning within lethal radiation belts.',
    keyStats: [
      { label: 'Great Red Spot', value: '350+ Years Old', desc: 'Anticyclonic storm wider than entire Earth.' },
      { label: 'Wind Speeds', value: '650+ km/h', desc: 'Deep-rooted atmospheric jet streams.' },
      { label: 'Lightning Energy', value: '1,000× Earth', desc: 'Water-ammonia superbolts in deep cloud decks.' },
      { label: 'Radiation Belt', value: 'Lethal Megavolts', desc: 'Traps megavolt electrons in massive magnetosphere.' }
    ],
    overview: 'Jupiter’s atmosphere is a laboratory for fluid dynamics on a planetary scale. Deep convective heat from its interior drives massive opposing jet streams and centuries-old vortex storms like the Great Red Spot.',
    earthAnalogy: 'As global warming injects massive thermal energy into Earth’s troposphere and oceans, our weather systems are exhibiting supercharged hurricane intensity, erratic jet-stream wobbles, and stalled atmospheric blocking patterns reminiscent of Jovian turbulence.',
    solutionsAndLessons: [
      {
        title: 'Advanced Climate Modeling & Early Warning',
        desc: 'Using satellite radar and supercomputing to model extreme meteorological events and strengthen disaster resilience across vulnerable coastlines.'
      },
      {
        title: 'Atmospheric Energy Dynamics',
        desc: 'Researching fluid vortex mechanics to optimize high-altitude wind energy harvesting and aircraft turbulence avoidance.'
      }
    ]
  },
  saturn: {
    title: 'Orbital Debris Dynamics & Space Pollution Analogy',
    badge: 'Ring Integrity & Debris',
    planetName: 'Saturn',
    accentColor: '#facc15',
    severity: 'Moderate',
    severityPercent: 74,
    severityColor: '#eab308',
    animationType: 'saturn-rings',
    shortDescription: 'Saturn’s rings span 282,000 kilometers but average just 10 to 30 meters in thickness, consisting of billions of colliding water-ice particles. The ring system is temporary and actively disintegrating through "ring rain", where gravitational and magnetic fields pull 10,000 kg of water ice per second into Saturn’s clouds.',
    keyStats: [
      { label: 'Ring Thickness', value: 'Only ~10 to 100 m', desc: 'Spanning 282,000 km yet paper-thin.' },
      { label: 'Ring Rain', value: '10,000 kg / sec', desc: 'Water ice pulled into upper atmosphere by gravity.' },
      { label: 'Ring Lifespan', value: '< 100 - 300M yrs', desc: 'Rings are temporary and actively eroding.' },
      { label: 'Ice Composition', value: '99% Pure Water Ice', desc: 'Microscopic grains to house-sized boulders.' }
    ],
    overview: 'Saturn’s rings are a magnificent dynamic system of billions of colliding ice particles. However, the rings are eroding rapidly through "ring rain", where magnetic fields pull ionized water particles into Saturn’s clouds.',
    earthAnalogy: 'A direct cosmic mirror to the Kessler Syndrome in Earth’s orbit — where over 36,500 pieces of artificial space debris (>10cm) and millions of paint flecks threaten future orbital safety and space access.',
    solutionsAndLessons: [
      {
        title: 'Orbital Debris Mitigation & Active Space Cleanup',
        desc: 'Developing robotic debris capture harpoons, laser ablation, and deorbiting tether standards for defunct satellites in Low Earth Orbit.'
      },
      {
        title: 'International Space Traffic Management',
        desc: 'Enforcing binding global protocols for satellite end-of-life disposal orbits and collision avoidance automation.'
      }
    ]
  },
  uranus: {
    title: 'Extreme Axial Tilt & 42-Year Seasonal Stagnation',
    badge: 'Seasonal Crisis',
    planetName: 'Uranus',
    accentColor: '#22d3ee',
    severity: 'High',
    severityPercent: 82,
    severityColor: '#06b6d4',
    animationType: 'uranus-freeze',
    shortDescription: 'Uranus rotates tilted at 97.8° virtually on its side, subjecting its icy atmosphere to 42 continuous years of uninterrupted polar night followed by 42 years of continuous sunlight. With minimal internal heat generation, its troposphere dips to -224°C, making it the coldest planetary atmosphere in the solar system.',
    keyStats: [
      { label: 'Axial Tilt', value: '97.8°', desc: 'Rotates virtually on its side.' },
      { label: 'Polar Night / Day', value: '42 Continuous Years', desc: 'Decades of unending darkness and deep freeze.' },
      { label: 'Minimum Temp', value: '-224 °C', desc: 'Coldest recorded atmosphere in solar system.' },
      { label: 'Internal Heat', value: 'Virtually Zero', desc: 'Radiates almost no internal geothermal energy.' }
    ],
    overview: 'Uranus was knocked on its side by a colossal protoplanetary impact billions of years ago. This creates the most extreme seasonal variations in the solar system, with decades-long polar freezing cycles followed by sudden seasonal atmospheric flare-ups.',
    earthAnalogy: 'Highlights the delicate stability of Earth’s 23.4° axial tilt (stabilized by our massive Moon), which gives us predictable agricultural seasons and temperate climate zones.',
    solutionsAndLessons: [
      {
        title: 'Agricultural Climate Adaptation',
        desc: 'Developing climate-resilient crop varieties and smart indoor vertical farming to ensure global food security against shifting seasonal patterns.'
      },
      {
        title: 'Cryogenic Resource Preservation',
        desc: 'Studying super-chilled atmospheric dynamics to advance long-term seed banks and biological cryopreservation.'
      }
    ]
  },
  neptune: {
    title: 'Supersonic Jet Streams & Planetary Cryospheres',
    badge: 'Cryospheric Dynamics',
    planetName: 'Neptune',
    accentColor: '#3b82f6',
    severity: 'Extreme',
    severityPercent: 87,
    severityColor: '#3b82f6',
    animationType: 'neptune-wind',
    shortDescription: 'Neptune experiences supersonic atmospheric winds reaching 2,100 km/h—the fastest sustained wind speeds in the solar system. These fierce storm bands are fueled by strong internal heat convection bubbling up from its pressurized supercritical water, ammonia, and methane mantle.',
    keyStats: [
      { label: 'Supersonic Winds', value: '2,100 km/h', desc: 'Fastest sustained winds in the solar system.' },
      { label: 'Great Dark Spot', value: 'Earth-Sized Storm', desc: 'Atmospheric vortices that appear and dissolve rapidly.' },
      { label: 'Internal Heat Flux', value: '2.6× Solar Input', desc: 'Generates more heat than it absorbs from Sun.' },
      { label: 'Methane Clathrates', value: 'Abundant Ice Mantle', desc: 'High-pressure mantle of water, ammonia, and methane.' }
    ],
    overview: 'Located 4.5 billion km from the Sun, Neptune’s ferocious supersonic winds are fueled not by solar energy, but by internal heat convection rising from its pressurized ionic ocean mantle.',
    earthAnalogy: 'Reminds us of Earth’s methane clathrates buried in deep sub-sea sediments and arctic tundra. If oceanic warming destabilizes these cryospheric methane reserves, it could unleash an abrupt global warming surge.',
    solutionsAndLessons: [
      {
        title: 'Monitoring Sub-Sea Methane Hydrates',
        desc: 'Deploying deep-sea sensor networks to monitor seabed stability and prevent methane hydrate eruptions into the hydrosphere.'
      },
      {
        title: 'High-Pressure Material Synthesis',
        desc: 'Harnessing extreme compression physics (like Neptune’s diamond rain mantle) for advanced industrial super-materials.'
      }
    ]
  },
  sun: {
    title: 'Solar Radiative Balance & Space Weather Dynamics',
    badge: 'The Cosmic Core',
    planetName: 'The Sun',
    accentColor: '#fbbf24',
    severity: 'Extreme',
    severityPercent: 96,
    severityColor: '#fbbf24',
    animationType: 'sun-corona',
    shortDescription: 'The Sun converts 600 million tons of hydrogen into helium every second via core thermonuclear fusion, radiating the photons that sustain all terrestrial biology. Violent magnetic reconnection events launch coronal mass ejections (CMEs) and high-energy solar winds that modulate Earth’s magnetosphere.',
    keyStats: [
      { label: 'Surface Temperature', value: '5,500 °C', desc: 'Thermonuclear energy radiating across space.' },
      { label: 'Coronal Temperature', value: '1 to 3 Million °C', desc: 'Superheated outer plasma atmosphere.' },
      { label: 'Solar Cycle', value: '11 Years', desc: 'Periodic magnetic pole reversal and solar storm maxima.' },
      { label: 'Mass Loss via Solar Wind', value: '1.5 Million Tons / sec', desc: 'Streams charged particles throughout heliosphere.' }
    ],
    overview: 'The Sun is the ultimate engine of life and climate on Earth. Minor variations in solar irradiance and major Coronal Mass Ejections (CMEs) directly modulate space weather, satellite communications, and upper-atmospheric chemistry.',
    earthAnalogy: 'All ecological energy on Earth originates from solar photons captured through photosynthetic biochemistry. Preserving Earth’s albedo and atmospheric balance is what enables this solar energy to sustain life rather than incinerate it.',
    solutionsAndLessons: [
      {
        title: 'Solar Energy Transition',
        desc: 'Accelerating global photovoltaic and concentrated solar power infrastructure to replace fossil fuel combustion with clean solar abundance.'
      },
      {
        title: 'Space Weather Early Warning Systems',
        desc: 'Deploying Lagrange-point space satellites (like SOHO and DSCOVR) to protect terrestrial electrical power grids from catastrophic coronal storms.'
      }
    ]
  }
};
