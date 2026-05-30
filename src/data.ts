import { Product, ServiceCategory } from './types';

export const SHOWROOM_INFO = {
  address: "Infront of Meerut Cold Storage, Railway Road, Kaimganj (U.P.)",
  city: "Kaimganj",
  pincode: "209630",
  establishedYear: 2005,
  googleMapsUrl: "https://maps.app.goo.gl/XJbw677iRDnVhGj98",
  contacts: [
    {
      name: "Mr. Vijay Rathore",
      title: "Managing Director",
      phone: "+91 9616936475",
      email: "vk30035@gmail.com",
    },
    {
      name: "Mr. Ajay Rathore",
      title: "Technical Director",
      phone: "+91 9956697192",
      email: "ajay9956697192@gmail.com",
    }
  ]
};

export const SERVICES: ServiceCategory[] = [
  {
    id: "ac-fridge-repair",
    title: "Air Conditioner PCB & Refrigerator Repairing Services",
    description: "Expert diagnostics, R32/R410/Hydrocarbon gas charging, hermetic compressor replacement, cap-filter flushing, and PCB troubleshooting. Fast, onsite professional assistance in Kaimganj.",
    tags: ["Inverter AC", "Window AC", "Direct Cool Fridge", "Frost-Free Fridge"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/fridge_AC_PCB.png",
    baseDiagnosticsPrice: 350,
    estimatedTime: "1 - 3 Hours",
    details: [
      "AC leak detection & nitrogen pressure test validation",
      "Compressor motor starting relay & run-capacitors swap",
      "Refrigerator capillary filter flushing with eco-safe chemicals",
      "Thermostat replacement & diagnostic performance checks"
    ]
  },
  {
    id: "inverter-stabilizer-repair",
    title: "Inverter & Voltage Stabilizer Repairing",
    description: "Solder-level motherboard troubleshooting, transformer winding repair, MOSFET channel reconstruction, and relay-chattering debugs with 100% thick copper windings.",
    tags: ["Mains Inverters", "Sine Wave UPS", "Servo Stabilizers", "Automatic Voltage Regulators"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/inverter_and_stabilizer.png",
    baseDiagnosticsPrice: 250,
    estimatedTime: "2 - 5 Hours",
    details: [
      "MOSFET section logic gate rebuild & testing",
      "Step-up/down copper transformer health assessment",
      "Interactive relay contact point calibration",
      "High/low automatic voltage cut-off safety audits"
    ]
  },
  {
    id: "mixer-jar-repair",
    title: "Mixer Jar & Blender Repairing Desk",
    description: "Instant on-the-spot mixer-grinder jar repair. Bushing replacement, high-torque steel blades realignment, coupler swaps, and motor rewinding solutions.",
    tags: ["Heavy Mixer Jars", "Juicer Blender", "Grinder Couplers", "Brass Bushings"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/mixer_and_blender.png",
    baseDiagnosticsPrice: 100,
    estimatedTime: "30 - 60 Minutes",
    details: [
      "Sintered brass-bush replacement & lubrication",
      "Impact-resistant stainless steel blade sharpening & reset",
      "High-grip rotor coupler and base replacement",
      "Worn carbon brushes and speed-selector dial repair"
    ]
  },
  {
    id: "cooler-repair",
    title: "Air Cooler Repairing & Maintenance",
    description: "Desert cooler water-pump replacements, multi-speed motor rewinding, grass cooling-pads alignment, and structural leak fixes.",
    tags: ["Desert Air Coolers", "Metal Body Coolers", "Heavy Exhaust Fan", "Submersible Pumps"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/Air_Cooler.png",
    baseDiagnosticsPrice: 150,
    estimatedTime: "1 - 2 Hours",
    details: [
      "Submersible water-pump flow-rate check & replacement",
      "Motor bush-shaft alignment and oiling",
      "Wood-wool grass pads refreshing for maximum cooling",
      "Heavy exhaust motor rewinding with premium copper"
    ]
  },
  {
    id: "washing-machine-repair",
    title: "Washing Machine Mechanical Repairs",
    description: "Gearbox reconstruction, spin/wash motor rewinding, water drain pump replacement, and professional electronic timer soldering.",
    tags: ["Semi-Automatic", "Top Loading", "Drum Bearings", "Pulsator Repairing"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/washing_machine_repair.png",
    baseDiagnosticsPrice: 300,
    estimatedTime: "2 - 4 Hours",
    details: [
      "High-durability gearbox rebuilds and shaft key swap",
      "Corrosion-safe seal installations & tub bearing alignments",
      "Electronic timer switch calibration",
      "Drain pipe block flushing & filter diagnostics"
    ]
  },
  {
    id: "fan-farrata-repair",
    title: "Fan and Table fan / Farrata",
    description: "Professional winding, capacitor swaps, bush-shaft replacements, and blade balancing for ceiling fans, table fans, and heavy-duty farrata high-speed fans.",
    tags: ["Ceiling Fan", "Table Fan", "Farrata Fan", "Pedestal Fan"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/Fan_AND_Farrata.png",
    baseDiagnosticsPrice: 120,
    estimatedTime: "1 - 2 Hours",
    details: [
      "Motor stator rewinding with copper or aluminum options",
      "Rotor bush-shaft replacement and grease-oiling service",
      "Dynamic high-speed alignment and vibration checks",
      "Capacitor checking and replacement"
    ]
  },
  {
    id: "lithium-ev-repair",
    title: "Lithium Battery and EV Charger",
    description: "In-depth testing, BMS balancing, cell replacement, and component-level repair for electric vehicle chargers and custom lithium-ion battery packs.",
    tags: ["Lithium-Ion Pack", "BMS Calibration", "EV Charging Station", "SMPS Repairs"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/Lithium_and_EV_CHARGER.png",
    baseDiagnosticsPrice: 500,
    estimatedTime: "3 - 6 Hours",
    details: [
      "Individual cell voltage checking and battery load tests",
      "BMS circuit debug, replacement, and calibration",
      "EV charger SMPS board level components and thermal swaps",
      "Capacity testing and connector recrimping"
    ]
  },
  {
    id: "clothes-iron-repair",
    title: "Clothes iron (or press)",
    description: "Thermostat calibration, element repairs, power-cord replacement, and steam tank cleaning for automatic and heavy cloths press irons.",
    tags: ["Steam Iron", "Dry Iron", "Automatic Press", "Heavy Tailor Press"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/Iron.png",
    baseDiagnosticsPrice: 80,
    estimatedTime: "30 - 60 Minutes",
    details: [
      "Thermostat automatic cut-off calibration",
      "Heating element replacement with high-durability plates",
      "Heavy load power cable and indicator repair",
      "Steam exhaust nozzles descaling and cleaning"
    ]
  },
  {
    id: "jhatka-machine-repair",
    title: "Jhatka machine (Electric fence)",
    description: "High-voltage pulse generator repairs, transformer winding, battery-charging card troubleshooting, and fence safety control calibration for agricultural security systems.",
    tags: ["Solar Jhatka Card", "High Voltage Transformer", "Fence Controller", "Pulse Board Repair"],
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/JHATKA_MACHINE.png",
    baseDiagnosticsPrice: 400,
    estimatedTime: "2 - 4 Hours",
    details: [
      "High voltage pulse generator circuit troubleshooting",
      "Isolation pulse transformer winding testing and replacement",
      "Charging regulator PCB assembly inspection",
      "Safety audio buzzer alarm and indicator repairs"
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-solar-controller-mppt",
    name: "Jyoti Hybrid Elite MPPT Solar Charge Controller 40A",
    category: "solar_power",
    description: "Converts any standard inverter battery into a smart hybrid solar power station! Heavy double-enamel isolated design with active LCD diagnostics. Delivers dynamic weather-aware optimal maximum power tracking to squeeze 99% current output from your roof system.",
    price: 3599,
    rating: 4.9,
    brand: "Jyoti Hybrid Energy",
    image: "https://cdn.jsdelivr.net/gh/SRGTUBE100/images@main/MPPT.png",
    specifications: [
      "Power Range: Minimum 300 Watts to Maximum 1200 Watts capacity supported",
      "High Tracking conversion efficiency: up to 99.5%",
      "Multi-stage automated temperature-compensated charging profiles",
      "Robust dual-LCD diagnostics: battery, loading, generation statistics",
      "Fully protected with electronic spark suppression & reverse grid logic"
    ],
    inStock: true,
    tag: "Copper Grounding"
  },
  {
    id: "prod-fan-ceiling-deluxe",
    name: "BLDC Metal Ceiling Fan",
    category: "fans_coolers",
    description: "Crafted for extreme Indian summers with 100% pure copper electrical windings. Wide sweep blades deliver high velocity wind displacement with virtually silent rotor performance. Rust-resistant epoxy powder coat.",
    price: 2799,
    rating: 4.8,
    brand: "Jyoti Electricals",
    image: "https://m.media-amazon.com/images/I/51UzA-tT8WL.jpg",
    specifications: [
      "Winding composition: 100% thick electrolytic copper core",
      "Energy efficient single-phase induction technology (74W)",
      "Premium double-ball bearings for lifetime silent operation",
      "Sweep: 1200mm high air-thrust aerodynamic blades"
    ],
    inStock: true,
    tag: "100% Copper Wound"
  },
  {
    id: "prod-cooler-desert-goliath",
    name: "Air Cooler Motor (120W, 1/10 HP)",
    category: "fans_coolers",
    description: "Heavy duty 120W, 1/10 HP replacement motor for standard desert air coolers. Features high temperature resistance, low power usage, speed control support, and long operational life under humid settings.",
    price: 1499,
    rating: 4.7,
    brand: "Jyoti Electricals",
    image: "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/20240927082640-ca5b9293-cd26-4c4c-ab2f-9758ac88f084.jpg",
    specifications: [
      "Power rating: 120 Watts (1/10 HP capacity)",
      "Winding structure: High-insulation heavy copper core layout",
      "Standard rotor shaft dimensions for easy replacement",
      "Designed specifically for high-humidity desert cooler fans"
    ],
    inStock: true,
    tag: "Local Bestseller"
  },
  {
    id: "prod-mixer-jar-brass",
    name: "Sujata Mixer Jar",
    category: "repair_parts",
    description: "High-grade polished stainless steel blending and grinding jar. Features double locked rivets, leak-proof gasket lid, and deep-groove wear-resistant sintered brass bushes for uninterrupted high speed kitchen tasks.",
    price: 999,
    rating: 4.9,
    brand: "Jyoti Genuine Spares",
    image: "https://rukminim2.flixcart.com/image/1366/1366/xif0q/mixer-juicer-jar/e/e/8/big-dome-jar-sujatta-1500-original-imahk9fz4rctchaq.jpeg?q=90",
    specifications: [
      "Jar volume: 1.2 Litre heavy-gauge steel casing",
      "Fitted with original high-torque self-lubricating brass bushings",
      "Surgical grade stainless steel multi-cutting blades",
      "High-grip fiber coupler block (compatible with most local mixers)"
    ],
    inStock: true,
    tag: "Kitchen Essential"
  },
  {
    id: "prod-wash-gearbox-aura",
    name: "Washing Machine Spin Motor",
    category: "repair_parts",
    description: "High-grade replacement spin motor for semi-automatic washing machines. Rated for extreme high-starting torque with dual-phase thermal overload protectors.",
    price: 1099,
    rating: 4.8,
    brand: "Jyoti Genuine Spares",
    image: "https://m.media-amazon.com/images/I/515VF4pUl+L._SL1365_.jpg",
    specifications: [
      "Operates efficiently up to 1440 RPM continuous spinning",
      "Sturdy moisture-proof design to resist water spill risks",
      "Wound with double-enamelled insulation wiring safety",
      "Delivers optimal rotational speed and quiet wash operations"
    ],
    inStock: true,
    tag: "Certified Part"
  },
  {
    id: "prod-stabilizer-copper-digital",
    name: "Jyoti Digital Voltage Stabilizer 4kVA for ACs",
    category: "repair_parts",
    description: "Wound with heavy pure electrolytic copper chokes. Intelligent automated microcomputer logic prevents voltage fluctuations from harming heavy inverter ACs or double-door refrigerators. High/Low voltage automatic cut-off.",
    price: 3890,
    rating: 5.0,
    brand: "Jyoti Electricals",
    image: "https://m.media-amazon.com/images/I/61J8coTEIwL.jpg",
    specifications: [
      "Insulation rating: H-Class pure copper dynamic windings",
      "Working voltage range: 140V to 290V input stability",
      "Sleek front panel LED displays live Input & output voltage readouts",
      "Automatic digital time delay safety switch"
    ],
    inStock: true,
    tag: "Best Safety"
  },
  {
    id: "prod-fittings-led-fixture",
    name: "LED Panel Light",
    category: "lighting_fixtures",
    description: "Sleek downlight fixture designed for false ceilings or electrical panels. Powered by constant-current drivers to prevent voltage surges from frying the LEDs. True-color high CRI rendering index.",
    price: 349,
    rating: 4.7,
    brand: "Jyoti Electricals",
    image: "https://m.media-amazon.com/images/I/51JzYOt7n0L.jpg",
    specifications: [
      "Power consumption: 22 Watts with high power factor surge driver",
      "Luminous flux: 2200 Lumens crystal white output",
      "Thermal solution: Integrated high-convection aluminum core frame",
      "Operational lifespan: tested for up to 30,000 continuous hours"
    ],
    inStock: true
  },
  {
    id: "prod-cooler-part-pump",
    name: "Heavy Copper Submersible Water Pump for Coolers",
    category: "fans_coolers",
    description: "100% pure copper wound heavy electrical desert cooler pump. Epoxy hermetically isolated structure prevents short circuits or shocks. Continuous-duty pump designed for vertical heads up to 12 feet.",
    price: 299,
    rating: 4.8,
    brand: "Jyoti Genuine Spares",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTLf51FmsdjLb1cR5Ox-cn9jUNI69GOMIFrg&s",
    specifications: [
      "Electrical Core: 100% thick copper coil configuration",
      "Maximum vertical water lift: 10-12 feet",
      "Thermal overload safety cutout built in",
      "Suits all standard desert air coolers and mini fountains"
    ],
    inStock: true,
    tag: "All Parts Available"
  },
  {
    id: "prod-service-fan-binding",
    name: "Calibrated Fan Stator Coil Binding Winding",
    category: "fans_coolers",
    description: "Full stator binding and rewinding setup for Ceiling, Pedestal, and Heavy Exhaust Fans. Available in 100% Pure copper windings for maximum life, or budget-friendly Super Grade Aluminum windings. Solder-level balanced cores.",
    price: 299,
    rating: 4.9,
    brand: "Jyoti Winding Desk",
    image: "https://m.media-amazon.com/images/I/61-58upKJzL.jpg",
    specifications: [
      "Material choice: 100% Pure Copper (H-Class) or 100% Super Grade Aluminium",
      "Fully tested with automatic insulation leakage sensors",
      "Dynamic RPM balance alignment check on test jig",
      "6-Month written showroom warranty card signed by directors"
    ],
    inStock: true,
    tag: "Copper / Aluminium Options"
  },
  {
    id: "prod-service-cooler-binding",
    name: "Air Cooler Motor Winding (Aluminium)",
    category: "fans_coolers",
    description: "High-insulation coil winding for all standard desert air cooler exhaust fan motors. Fully wound with eco-grade thermal aluminium core wires for budget-friendly reliable operations.",
    price: 349,
    rating: 4.8,
    brand: "Jyoti Winding Desk",
    image: "https://www.dial4trade.com/uploaded_files/product_images/thumbs/air-cooler-motor-winding-services-1839296514237.png",
    specifications: [
      "Configuration: 24 Slot / 4 Pole high moisture protection alignment",
      "Wound in 100% Super Grade Aluminium thermal wire coils",
      "Coated with high durability baked insulation varnish to resist moisture",
      "Includes general condenser and starter capacitor sanity checks"
    ],
    inStock: true,
    tag: "Fan & Cooler Winding"
  },
  {
    id: "prod-fitting-rrkabel-wire",
    name: "RR Kabel Premium Fire-Retardant Copper Cable",
    category: "repair_parts",
    description: "Genuine high-conductivity multi-strand flexible copper wire manufactured by RR Kabel. Flame retardant casing. Perfect for main home and commercial wall fittings and electrical panel wirings around Kaimganj.",
    price: 1999,
    rating: 4.9,
    brand: "RR Kabel (RR Cables)",
    image: "https://static1.industrybuying.com/products/electrical/cables-and-wires/flame-retardant-fr-house-wires/ELE.FLA.71106540_1686288631220.webp",
    specifications: [
      "Size: 1.5 Sq.mm thickness / Length: Full 90-meter coil",
      "100% premium grade electrolytic fireproof insulation",
      "High load current carriage with extremely low transmission heating",
      "Certified IS:694 conforming to Indian electrical safety standards"
    ],
    inStock: true,
    tag: "Fitting Materials Best"
  },
  {
    id: "prod-fitting-modular-switchboard",
    name: "Switchboard & Accessories",
    category: "repair_parts",
    description: "High durability multi-plug electrical switchboard and fitting accessories. Features carbon spark-proof components, smooth lock switches, and double safety connection sleeves.",
    price: 25,
    rating: 4.7,
    brand: "Jyoti Genuine Spares",
    image: "https://5.imimg.com/data5/ANDROID/Default/2025/9/546070294/NB/MO/AG/184244005/product-jpeg-500x500.jpeg",
    specifications: [
      "Material: Flame-retardant glossy polycarbonate housing",
      "Equipped with thick solid brass contact leaves for zero loose sparks",
      "Ready-to-fit modular combination slots for multi-pin sockets & regulators",
      "Rated for extreme high load currents (up to 16A peak capacity)"
    ],
    inStock: true,
    tag: "Fittings & Accessories"
  },
  {
    id: "prod-washing-machine-spin-timer",
    name: "Universal Washing Machine mechanical Spin Timer",
    category: "repair_parts",
    description: "Replacement dual-phase automatic washing machine spin/wash timer clock. Features physical copper contact leaves with rustproof carbon-alloy cog pins to survive humid moisture.",
    price: 400,
    rating: 4.8,
    brand: "Jyoti Genuine Spares",
    image: "https://m.media-amazon.com/images/I/611L0wnGDCL.jpg",
    specifications: [
      "Splines structure: Universal Standard shaft D-profile keying",
      "Mechanical contact leaves wound with 100% thick copper plating",
      "Suits all domestic Semi-Automatic twin tub washing machines",
      "Splash-guard seal design prevents grease/water intrusion short-circuits"
    ],
    inStock: true,
    tag: "Washing Machine Parts"
  },
  {
    id: "prod-washing-machine-plunger",
    name: "Washing Machine Leak-proof Drain Plunger Seal Unit",
    category: "repair_parts",
    description: "Highly elastic synthetic rubber drain replacement plunger with heavy tension return spring. Stops chronic tub water-leakage issues instantly. Vital spare part for all semi-automatic washers.",
    price: 150,
    rating: 4.8,
    brand: "Jyoti Genuine Spares",
    image: "https://m.media-amazon.com/images/I/51LEpXqXztL.jpg",
    specifications: [
      "Material: High-elasticity heavy density silicone rubber",
      "Includes 100% thick chromium-plated anti-corrupt return spring",
      "Guaranteed secure sealing against bleach-water wash cycles",
      "Universal fit compatible with local brand washing tubs"
    ],
    inStock: true,
    tag: "Washing Machine Parts"
  }
];
