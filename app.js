/**
 * Project Lumiere Task Architect - Core Application Logic
 * Engineering & Computer Science Multimodal Benchmark Authoring Engine
 * 
 * Complies with the official 12-step task lifecycle, dual model stump verification,
 * KaTeX math rendering, 2000-character prompt limit, mandatory closing template,
 * and the 1 to 5 reviewing quality score audit.
 */

// ==========================================================================
// 1. TAXONOMY & PRESETS
// ==========================================================================

const TAXONOMY = {
  electrical: {
    name: "Electrical Engineering",
    subtypes: [
      "Power & Energy Systems",
      "Electronics & Circuit Design",
      "Control Systems",
      "Signal Processing",
      "Computer Systems Engineering"
    ]
  },
  mechanical: {
    name: "Mechanical Engineering",
    subtypes: [
      "Structural Analysis & Solid Mechanics",
      "Thermodynamics & Transport Processes",
      "Dynamics, Vibrations & Control Systems",
      "Material Mechanics and Engineering"
    ]
  },
  cs: {
    name: "Computer Science",
    subtypes: [
      "Computer Systems Engineering",
      "Software Engineering",
      "Algorithms & Complexity",
      "Control Systems"
    ]
  },
  civil: {
    name: "Civil Engineering",
    subtypes: [
      "Structural Analysis & Solid/Soil Mechanics",
      "Transportation Engineering",
      "Environmental Engineering",
      "Hydrodynamics & Water Resources"
    ]
  },
  data_ai: {
    name: "Data Analysis, Science & Engineering",
    subtypes: [
      "Artificial Intelligence & Machine Learning",
      "Data Engineering",
      "Data Visualization",
      "Statistical Modeling"
    ]
  }
};

const MANDATORY_CLOSING_TEMPLATE = 'The answer should be expressed in [UNITS]. Report your final answer as a [SIGFIGS] significant figure number without units. Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.';

const PRESETS = {
  electrical_bode: {
    title: "Series RLC Bandpass Resonant Peak & Quality Factor Analysis",
    discipline: "electrical",
    subtype: "Electronics & Circuit Design",
    images: [
      {
        url: "assets/figure1_bode_mag.jpeg",
        filename: "figure1_bode_mag.jpeg",
        name: "Figure 1: Magnitude Response",
        dimensions: { width: 900, height: 760 }
      },
      {
        url: "assets/figure2_bode_phase.jpeg",
        filename: "figure2_bode_phase.jpeg",
        name: "Figure 2: Phase Response",
        dimensions: { width: 900, height: 760 }
      }
    ],
    imageSourceType: "original",
    imageLicense: "cc_by_4",
    imageCitation: "Open Circuits Benchmark Laboratory Series (CC BY 4.0)",
    imageDescription: "Dual-panel Bode diagram of a second-order series RLC resonant circuit split into two figures. Figure 1 (Panel A) displays the normalized frequency response magnitude $|H(j\\omega)|$ in decibels (dB) versus frequency $f$ on a logarithmic scale from $1 \\text{ kHz}$ to $100 \\text{ kHz}$. A sharp resonant peak is centered at $f_0 = 22.4 \\text{ kHz}$ reaching $0.0 \\text{ dB}$. The half-power ($-3.0 \\text{ dB}$) cutoff frequencies are marked at $f_1 = 20.7 \\text{ kHz}$ and $f_2 = 24.1 \\text{ kHz}$. Figure 2 (Panel B) shows the corresponding phase response $\\angle H(j\\omega)$ in degrees from $+90^\\circ$ to $-90^\\circ$, crossing zero degrees precisely at $22.4 \\text{ kHz}$.",
    cbNonTransparent: true,
    cbNotBioRender: true,
    cbOutputFormatImage: true,
    taskPrompt: "Based on the series RLC frequency response curve in Figure 1 and phase verification in Figure 2, determine the circuit quality factor $Q$. Use the half-power bandwidth definition $\\Delta f = f_2 - f_1$.\n\nThe answer should be expressed in dimensionless. Report your final answer as a 3 significant figure number without units. Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.",
    conventions: "Express quality factor $Q$ as a 3 significant figure dimensionless number. Take speed of light $c = 2.998 \\times 10^8 \\text{ m/s}$ if unstated. Intermediate calculations carried out to 6 sigfigs.",
    cbQuestionOnly: true,
    cbCalculatorSolvable: true,
    cbKnowledgeCutoff: true,
    cbVocabRestrictions: true,
    cbDefensibleAnswer: true,
    cbAnnotationFree: true,
    model1: {
      name: "GPT-4o (Vision)",
      failed: true,
      failureMode: "axis_coord",
      output: "14.8 (error: 125%)",
      justification: "GPT-4o misinterprets the logarithmic frequency grid, reading the lower cutoff $f_1 = 20.7 \\text{ kHz}$ as $21.5 \\text{ kHz}$ and uses a $-6 \\text{ dB}$ drop instead of the standard $-3 \\text{ dB}$ half-power bandwidth."
    },
    model2: {
      name: "Claude 3.5 Sonnet",
      failed: true,
      failureMode: "spatial_geom",
      output: "22.4 (error: 240%)",
      justification: "Claude 3.5 Sonnet correctly reads $f_0 = 22.4 \\text{ kHz}$ but hallucinates that the bandwidth $\\Delta f = 1.0 \\text{ kHz}$ without measuring the curve intersection with the $-3 \\text{ dB}$ dashed reference line."
    },
    stepByStep: `Step 1: Read the center resonant frequency from Figure 1 peak: $f_0 = 22.4000 \\text{ kHz}$.
Step 2: Locate the $-3.00000 \\text{ dB}$ horizontal threshold on the magnitude plot.
Step 3: Read the lower and upper half-power cutoff frequencies: $f_1 = 20.7000 \\text{ kHz}$ and $f_2 = 24.1000 \\text{ kHz}$.
Step 4: Calculate the half-power bandwidth: $\\Delta f = f_2 - f_1 = 24.1000 - 20.7000 = 3.40000 \\text{ kHz}$.
Step 5: Apply the resonant quality factor formula: $Q = \\frac{f_0}{\\Delta f} = \\frac{22.4000}{3.40000} = 6.58824$.
Step 6: Round to 3 significant figures: $Q = 6.59$.`,
    finalAnswer: "6.59",
    tolerance: "3_sigfig_2pct",
    distractors: [
      "3.29 (uses double bandwidth 2Δf in the denominator instead of Δf)",
      "13.2 (erroneously applies inverted formula Δf / f0 multiplied by 2)",
      "7.47 (reads -6 dB threshold drop instead of -3 dB half-power point)",
      "65.9 (decimal point arithmetic slip during kHz to Hz unit conversion)",
      "5.12 (confuses resonant frequency f0 with the lower cutoff frequency f1)"
    ],
    cbMarkdownKatex: true,
    cbSolvableOnlyWithImage: true,
    cbRequiresDomainExpertise: true,
    cbExactlyOneAnswer: true
  },

  mech_mohr: {
    title: "Plane Stress Transformation & Mohr's Circle In-Plane Maximum Shear",
    discipline: "mechanical",
    subtype: "Structural Analysis & Solid Mechanics",
    images: [
      {
        url: "assets/sample_spectral.jpeg",
        filename: "sample_spectral.jpeg",
        name: "Figure 1: Stress Element & Mohr's Circle",
        dimensions: { width: 900, height: 420 }
      }
    ],
    imageSourceType: "original",
    imageLicense: "internal_author",
    imageCitation: "Solid Mechanics Computational Testing Bench (Admissible)",
    imageDescription: "Engineering schematic depicting a representative infinitesimal plane stress element alongside its corresponding Mohr's Circle representation. The stress element indicates normal stresses $\\sigma_x = +80.0 \\text{ MPa}$ (tensile) and $\\sigma_y = -40.0 \\text{ MPa}$ (compressive), with counterclockwise shear stress $\\tau_{xy} = +45.0 \\text{ MPa}$. The Mohr's circle plot has normal stress $\\sigma$ on the horizontal axis and shear stress $\\tau$ on the vertical axis, centered at average normal stress $\\sigma_{\\text{avg}} = +20.0 \\text{ MPa}$.",
    cbNonTransparent: true,
    cbNotBioRender: true,
    cbOutputFormatImage: true,
    taskPrompt: "From the plane stress element and Mohr's Circle in the diagram, calculate the maximum in-plane shear stress $\\tau_{\\max}$ experienced by the structural module.\n\nThe answer should be expressed in MPa. Report your final answer as a 3 significant figure number without units. Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.",
    conventions: "Express $\\tau_{\\max}$ in megapascals (MPa) to 3 significant figures. Tensile stresses are positive (+), compressive stresses are negative (-). Intermediate calculations to 6 sigfigs.",
    cbQuestionOnly: true,
    cbCalculatorSolvable: true,
    cbKnowledgeCutoff: true,
    cbVocabRestrictions: true,
    cbDefensibleAnswer: true,
    cbAnnotationFree: true,
    model1: {
      name: "GPT-4o (Vision)",
      failed: true,
      failureMode: "topological",
      output: "60.0 (error: 20%)",
      justification: "GPT-4o ignores the shear stress component $\\tau_{xy} = 45 \\text{ MPa}$ shown on the top element face, simply computing $\\frac{\\sigma_x - \\sigma_y}{2} = 60 \\text{ MPa}$."
    },
    model2: {
      name: "Claude 3.5 Sonnet",
      failed: true,
      failureMode: "axis_coord",
      output: "95.0 (error: 26.7%)",
      justification: "Claude 3.5 Sonnet confuses the maximum principal stress $\\sigma_1$ with the maximum in-plane shear stress $\\tau_{\\max}$, calculating $\\sigma_{\\text{avg}} + R$ instead of the circle radius $R$."
    },
    stepByStep: `Step 1: Extract normal stresses from diagram: $\\sigma_x = +80.0000 \\text{ MPa}$, $\\sigma_y = -40.0000 \\text{ MPa}$.
Step 2: Extract shear stress from the element faces: $\\tau_{xy} = +45.0000 \\text{ MPa}$.
Step 3: Calculate average normal stress: $\\sigma_{\\text{avg}} = \\frac{\\sigma_x + \\sigma_y}{2} = \\frac{80.0000 + (-40.0000)}{2} = +20.0000 \\text{ MPa}$.
Step 4: Formulate the Mohr's circle radius formula representing maximum in-plane shear stress: $R = \\tau_{\\max} = \\sqrt{\\left(\\frac{\\sigma_x - \\sigma_y}{2}\\right)^2 + \\tau_{xy}^2}$.
Step 5: Compute difference component: $\\frac{\\sigma_x - \\sigma_y}{2} = \\frac{80.0000 - (-40.0000)}{2} = \\frac{120.000}{2} = 60.0000 \\text{ MPa}$.
Step 6: Compute radical sum: $R = \\sqrt{60.0000^2 + 45.0000^2} = \\sqrt{3600.00 + 2025.00} = \\sqrt{5625.00} = 75.0000 \\text{ MPa}$.
Step 7: Round to 3 significant figures: $\\tau_{\\max} = 75.0$.`,
    finalAnswer: "75.0",
    tolerance: "3_sigfig_2pct",
    distractors: [
      "60.0 (neglects shear stress contribution τxy = 45 MPa)",
      "95.0 (computes maximum principal normal stress σ1 = σavg + R instead of shear)",
      "45.0 (reports applied surface shear stress τxy without transformation)",
      "105 (arithmetic sign error treating σy as positive tensile +40 MPa)",
      "37.5 (divides circle radius R by 2 by confusing diameter with radius)"
    ],
    cbMarkdownKatex: true,
    cbSolvableOnlyWithImage: true,
    cbRequiresDomainExpertise: true,
    cbExactlyOneAnswer: true
  },

  cs_cache: {
    title: "Direct-Mapped L1 Data Cache Tag, Index & Block Offset Partitioning",
    discipline: "cs",
    subtype: "Computer Systems Engineering",
    images: [
      {
        url: "assets/sample_spectral.jpeg",
        filename: "sample_spectral.jpeg",
        name: "Figure 1: Cache Architecture",
        dimensions: { width: 900, height: 420 }
      }
    ],
    imageSourceType: "original",
    imageLicense: "cc_by_sa",
    imageCitation: "Open Computer Architecture Design Repository (CC BY-SA 4.0)",
    imageDescription: "System architecture block diagram for a direct-mapped L1 data cache memory system. The diagram specifies: 32-bit byte-addressed physical memory space ($2^{32} \\text{ bytes}$), total cache capacity of $32 \\text{ KiB}$, and block size of $64 \\text{ bytes}$. The physical address breakdown is shown with three bitfields: Tag bits $[31:s]$, Index bits $[(s-1):b]$, and Byte Offset bits $[(b-1):0]$, where $b$ and $s$ are to be deduced from the capacity and block size labels.",
    cbNonTransparent: true,
    cbNotBioRender: true,
    cbOutputFormatImage: true,
    taskPrompt: "Based on the direct-mapped cache architecture parameters shown in the schematic, calculate the number of bits allocated to the Tag field in the 32-bit physical address.\n\nThe answer should be expressed in bits. Report your final answer as a 2 significant figure number without units. Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.",
    conventions: "Address is 32-bit byte-addressed. Report the number of Tag bits as an integer. Intermediate calculations to 6 sigfigs.",
    cbQuestionOnly: true,
    cbCalculatorSolvable: true,
    cbKnowledgeCutoff: true,
    cbVocabRestrictions: true,
    cbDefensibleAnswer: true,
    cbAnnotationFree: true,
    model1: {
      name: "GPT-4o (Vision)",
      failed: true,
      failureMode: "topological",
      output: "19 (error: 12%)",
      justification: "GPT-4o miscalculates the number of cache lines, calculating $32 \\text{ KiB} / 64 \\text{ bytes} = 256$ lines (8 index bits) instead of 512 lines (9 index bits), yielding 19 tag bits."
    },
    model2: {
      name: "Gemini 1.5 Pro",
      failed: true,
      failureMode: "spatial_geom",
      output: "15 (error: 12%)",
      justification: "Gemini 1.5 Pro conflates word addressing with byte addressing, dividing block size by 4 bytes per word and subtracting too many offset bits."
    },
    stepByStep: `Step 1: Extract block size from diagram: $B = 64 \\text{ bytes} = 2^6 \\text{ bytes}$.
Step 2: Determine byte offset bits: $b = \\log_2(64) = 6 \\text{ bits}$.
Step 3: Extract total cache capacity from diagram: $C = 32 \\text{ KiB} = 32 \\times 1024 \\text{ bytes} = 32768 \\text{ bytes} = 2^{15} \\text{ bytes}$.
Step 4: Compute number of cache lines (sets): $N = \\frac{C}{B} = \\frac{2^{15}}{2^6} = 2^9 = 512 \\text{ lines}$.
Step 5: Determine index field bit width: $i = \\log_2(512) = 9 \\text{ bits}$.
Step 6: Compute Tag field bit width from 32-bit address budget: $\\text{Tag} = 32 - (i + b) = 32 - (9 + 6) = 32 - 15 = 17 \\text{ bits}$.`,
    finalAnswer: "17",
    tolerance: "2_sigfig_2pct",
    distractors: [
      "18 (forgets 0-indexed exponent for 64-byte block, using 5 offset bits)",
      "19 (calculates 256 cache lines instead of 512, allocating 8 index bits)",
      "15 (confuses the combined index+offset width with the tag width)",
      "16 (uses 32 KiB as 32,000 decimal bytes instead of binary kibibytes 32,768)",
      "21 (erroneously omits index bits entirely, computing 32 - 11)"
    ],
    cbMarkdownKatex: true,
    cbSolvableOnlyWithImage: true,
    cbRequiresDomainExpertise: true,
    cbExactlyOneAnswer: true
  },

  civil_truss: {
    title: "Bridge Truss Equilibrium & Method of Joints Force Calculation",
    discipline: "civil",
    subtype: "Structural Analysis & Solid/Soil Mechanics",
    images: [
      {
        url: "assets/sample_spectral.jpeg",
        filename: "sample_spectral.jpeg",
        name: "Figure 1: Pratt Truss",
        dimensions: { width: 900, height: 420 }
      }
    ],
    imageSourceType: "original",
    imageLicense: "cc_by_4",
    imageCitation: "Structural Engineering Education Consortium (CC BY 4.0)",
    imageDescription: "Engineering elevation drawing of a statically determinate planar Pratt bridge truss supported by a pin at Joint A ($x=0, y=0$) and a roller at Joint E ($x=16 \\text{ m}, y=0$). The truss consists of four equal bays of length $4.00 \\text{ m}$ and height $3.00 \\text{ m}$. A single downward vertical point load of $P = 120.0 \\text{ kN}$ is applied at bottom joint C ($x=8.00 \\text{ m}, y=0$). Diagonal members in panels slope toward center.",
    cbNonTransparent: true,
    cbNotBioRender: true,
    cbOutputFormatImage: true,
    taskPrompt: "Using the Method of Joints and static equilibrium on the Pratt truss diagram, calculate the internal axial force in diagonal member $BC$. State the magnitude in kilonewtons (kN).\n\nThe answer should be expressed in kN. Report your final answer as a 3 significant figure number without units. Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.",
    conventions: "Express axial force magnitude in kilonewtons (kN) to 3 significant figures. Assume pin support at A and roller at E. Acceleration due to gravity $g = 9.810 \\text{ m/s}^2$. Intermediate calculations to 6 sigfigs.",
    cbQuestionOnly: true,
    cbCalculatorSolvable: true,
    cbKnowledgeCutoff: true,
    cbVocabRestrictions: true,
    cbDefensibleAnswer: true,
    cbAnnotationFree: true,
    model1: {
      name: "GPT-4o (Vision)",
      failed: true,
      failureMode: "spatial_geom",
      output: "60.0 (error: 40%)",
      justification: "GPT-4o misidentifies the vertical component of the diagonal member as the entire axial force, omitting the geometric hypotenuse factor $\\frac{5}{3}$."
    },
    model2: {
      name: "Claude 3.5 Sonnet",
      failed: true,
      failureMode: "axis_coord",
      output: "80.0 (error: 20%)",
      justification: "Claude 3.5 Sonnet assumes the diagonal is oriented at $45^\\circ$ instead of resolving the $3:4:5$ triangle from the given $4.0 \\text{ m}$ bay width and $3.0 \\text{ m}$ height."
    },
    stepByStep: `Step 1: Compute vertical reaction forces by symmetric balance under central load $P = 120.000 \\text{ kN}$: $R_A = R_E = \\frac{120.000}{2} = 60.0000 \\text{ kN}$.
Step 2: Determine geometry of diagonal member $BC$: bay length $L = 4.00000 \\text{ m}$, height $H = 3.00000 \\text{ m}$.
Step 3: Calculate hypotenuse of bay triangle: $D = \\sqrt{4.00000^2 + 3.00000^2} = 5.00000 \\text{ m}$.
Step 4: Compute diagonal inclination angle: $\\sin(\\theta) = \\frac{3.00000}{5.00000} = 0.600000$, $\\cos(\\theta) = \\frac{4.00000}{5.00000} = 0.800000$.
Step 5: Apply vertical equilibrium $\\sum F_y = 0$ at Joint B: $F_{BC} \\sin(\\theta) = R_A = 60.0000 \\text{ kN}$.
Step 6: Solve for axial tensile force in member $BC$: $F_{BC} = \\frac{60.0000}{\\sin(\\theta)} = \\frac{60.0000}{0.600000} = 100.000 \\text{ kN}$.
Step 7: Round to 3 significant figures: $F_{BC} = 100$.`,
    finalAnswer: "100",
    tolerance: "3_sigfig_2pct",
    distractors: [
      "60.0 (reports vertical reaction force without resolving diagonal angle)",
      "80.0 (computes horizontal component of member force instead of full resultant)",
      "75.0 (inverts sine ratio as 3/4 instead of 3/5)",
      "120 (assigns the total applied load P directly to the member)",
      "84.9 (assumes symmetric 45° angle yielding 60 * sqrt(2))"
    ],
    cbMarkdownKatex: true,
    cbSolvableOnlyWithImage: true,
    cbRequiresDomainExpertise: true,
    cbExactlyOneAnswer: true
  },

  data_roc: {
    title: "Multimodal Confusion Matrix & Precision-Recall F1-Score Assessment",
    discipline: "data_ai",
    subtype: "Artificial Intelligence & Machine Learning",
    images: [
      {
        url: "assets/sample_spectral.jpeg",
        filename: "sample_spectral.jpeg",
        name: "Figure 1: Confusion Matrix",
        dimensions: { width: 900, height: 420 }
      }
    ],
    imageSourceType: "original",
    imageLicense: "cc_by_4",
    imageCitation: "AI Validation Benchmark Dataset v2.0 (CC BY 4.0)",
    imageDescription: "Heatmap confusion matrix of a binary computer vision defect classification model evaluated on a test split of $N = 1000$ samples. The matrix displays: True Positives $\\text{TP} = 340$, False Positives $\\text{FP} = 60$, False Negatives $\\text{FN} = 100$, and True Negatives $\\text{TN} = 500$. Class 1 represents 'Defective' and Class 0 represents 'Nominal'.",
    cbNonTransparent: true,
    cbNotBioRender: true,
    cbOutputFormatImage: true,
    taskPrompt: "Based on the confusion matrix heatmap for the binary classification model, calculate the harmonic mean of precision and recall ($F_1$-score) for the Defective class (Class 1).\n\nThe answer should be expressed in dimensionless. Report your final answer as a 3 significant figure number without units. Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.",
    conventions: "Express F1-score as a decimal value between 0.00 and 1.00 rounded to 3 significant figures. Intermediate calculations carried out to 6 sigfigs.",
    cbQuestionOnly: true,
    cbCalculatorSolvable: true,
    cbKnowledgeCutoff: true,
    cbVocabRestrictions: true,
    cbDefensibleAnswer: true,
    cbAnnotationFree: true,
    model1: {
      name: "GPT-4o (Vision)",
      failed: true,
      failureMode: "axis_coord",
      output: "0.840 (error: 3.8%)",
      justification: "GPT-4o calculates accuracy $\\frac{340+500}{1000} = 0.840$ instead of the harmonic mean F1-score."
    },
    model2: {
      name: "Claude 3.5 Sonnet",
      failed: true,
      failureMode: "spatial_geom",
      output: "0.850 (error: 5.1%)",
      justification: "Claude 3.5 Sonnet transposes the confusion matrix rows and columns, mistaking False Positives (60) for False Negatives (100)."
    },
    stepByStep: `Step 1: Extract values from confusion matrix: $\\text{TP} = 340$, $\\text{FP} = 60$, $\\text{FN} = 100$, $\\text{TN} = 500$.
Step 2: Calculate Precision for Class 1: $\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}} = \\frac{340}{340 + 60} = \\frac{340}{400} = 0.850000$.
Step 3: Calculate Recall for Class 1: $\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}} = \\frac{340}{340 + 100} = \\frac{340}{440} = 0.772727$.
Step 4: Apply $F_1$-score formula: $F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\times \\text{TP}}{2 \\times \\text{TP} + \\text{FP} + \\text{FN}}$.
Step 5: Compute numerator and denominator: $\\text{Num} = 2 \\times 340 = 680$; $\\text{Den} = 680 + 60 + 100 = 840$.
Step 6: Calculate numerical value: $F_1 = \\frac{680}{840} = 0.809524$.
Step 7: Round to 3 significant figures: $F_1 = 0.810$.`,
    finalAnswer: "0.810",
    tolerance: "3_sigfig_2pct",
    distractors: [
      "0.840 (computes overall classification accuracy instead of F1-score)",
      "0.850 (reports precision directly without taking harmonic mean with recall)",
      "0.773 (reports recall directly without factoring in precision)",
      "0.811 (arithmetic arithmetic truncation slip during harmonic mean step)",
      "0.739 (transposes row and column assignments when reading FP and FN)"
    ],
    cbMarkdownKatex: true,
    cbSolvableOnlyWithImage: true,
    cbRequiresDomainExpertise: true,
    cbExactlyOneAnswer: true
  },

  blank: {
    title: "New Custom Engineering & CS Multimodal Task",
    discipline: "electrical",
    subtype: "Electronics & Circuit Design",
    images: [],
    imageSourceType: "original",
    imageLicense: "internal_author",
    imageCitation: "Original Lab Measurement (Admissible)",
    imageDescription: "",
    cbNonTransparent: true,
    cbNotBioRender: true,
    cbOutputFormatImage: true,
    taskPrompt: "",
    conventions: "Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.",
    cbQuestionOnly: true,
    cbCalculatorSolvable: true,
    cbKnowledgeCutoff: true,
    cbVocabRestrictions: true,
    cbDefensibleAnswer: true,
    cbAnnotationFree: true,
    model1: {
      name: "GPT-4o (Vision)",
      failed: true,
      failureMode: "spatial_geom",
      output: "",
      justification: ""
    },
    model2: {
      name: "Claude 3.5 Sonnet",
      failed: true,
      failureMode: "axis_coord",
      output: "",
      justification: ""
    },
    stepByStep: "",
    finalAnswer: "",
    tolerance: "3_sigfig_2pct",
    distractors: ["", "", "", "", ""],
    cbMarkdownKatex: true,
    cbSolvableOnlyWithImage: true,
    cbRequiresDomainExpertise: true,
    cbExactlyOneAnswer: true
  }
};

// Application State
const state = {
  theme: 'dark',
  cardTheme: 'light', // Controls rendered image task card theme (light / dark)
  activeTab: 'rendered',
  currentPreset: 'electrical_bode',
  images: [
    {
      url: 'assets/figure1_bode_mag.jpeg',
      filename: 'figure1_bode_mag.jpeg',
      name: 'Figure 1',
      dimensions: { width: 900, height: 760 }
    },
    {
      url: 'assets/figure2_bode_phase.jpeg',
      filename: 'figure2_bode_phase.jpeg',
      name: 'Figure 2',
      dimensions: { width: 900, height: 760 }
    }
  ]
};

// ==========================================================================
// 2. DOM ELEMENTS
// ==========================================================================

const elements = {
  // Navigation & Header
  presetSelect: document.getElementById('presetSelect'),
  btnLoadPreset: document.getElementById('btnLoadPreset'),
  btnThemeToggle: document.getElementById('btnThemeToggle'),
  btnResetForm: document.getElementById('btnResetForm'),

  // Taxonomy
  disciplineSelect: document.getElementById('disciplineSelect'),
  subtypeSelect: document.getElementById('subtypeSelect'),

  // Image Section
  dropZone: document.getElementById('dropZone'),
  imageInput: document.getElementById('imageInput'),
  imagePreviewContainer: document.getElementById('imagePreviewContainer'),
  imageCounterBadge: document.getElementById('imageCounterBadge'),
  imageSourceType: document.getElementById('imageSourceType'),
  imageLicense: document.getElementById('imageLicense'),
  imageCitation: document.getElementById('imageCitation'),
  cbNonTransparent: document.getElementById('cbNonTransparent'),
  cbNotBioRender: document.getElementById('cbNotBioRender'),
  imageDescription: document.getElementById('imageDescription'),
  descWordCount: document.getElementById('descWordCount'),
  cbOutputFormatImage: document.getElementById('cbOutputFormatImage'),

  // Prompt Section
  taskPromptInput: document.getElementById('taskPromptInput'),
  promptCharCounter: document.getElementById('promptCharCounter'),
  promptLengthWarning: document.getElementById('promptLengthWarning'),
  closingUnitInput: document.getElementById('closingUnitInput'),
  closingSigfigsInput: document.getElementById('closingSigfigsInput'),
  btnInsertClosingSentence: document.getElementById('btnInsertClosingSentence'),
  closingPreviewText: document.getElementById('closingPreviewText'),
  conventionsInput: document.getElementById('conventionsInput'),
  cbQuestionOnly: document.getElementById('cbQuestionOnly'),
  cbCalculatorSolvable: document.getElementById('cbCalculatorSolvable'),
  cbKnowledgeCutoff: document.getElementById('cbKnowledgeCutoff'),

  // Dual Models
  model1Name: document.getElementById('model1Name'),
  model1Failed: document.getElementById('model1Failed'),
  model1FailureMode: document.getElementById('model1FailureMode'),
  model1Output: document.getElementById('model1Output'),
  model1Justification: document.getElementById('model1Justification'),
  model2Name: document.getElementById('model2Name'),
  model2Failed: document.getElementById('model2Failed'),
  model2FailureMode: document.getElementById('model2FailureMode'),
  model2Output: document.getElementById('model2Output'),
  model2Justification: document.getElementById('model2Justification'),
  dualModelStatusBanner: document.getElementById('dualModelStatusBanner'),

  // Solution Section
  stepByStepInput: document.getElementById('stepByStepInput'),
  stepCountBadge: document.getElementById('stepCountBadge'),
  finalAnswerInput: document.getElementById('finalAnswerInput'),
  toleranceSelect: document.getElementById('toleranceSelect'),

  // Distractors
  distractor1: document.getElementById('distractor1'),
  distractor2: document.getElementById('distractor2'),
  distractor3: document.getElementById('distractor3'),
  distractor4: document.getElementById('distractor4'),
  distractor5: document.getElementById('distractor5'),

  // Acceptance
  cbMarkdownKatex: document.getElementById('cbMarkdownKatex'),
  cbImageExportMirror: document.getElementById('cbImageExportMirror'),
  cbSolvableOnlyWithImage: document.getElementById('cbSolvableOnlyWithImage'),
  cbRequiresDomainExpertise: document.getElementById('cbRequiresDomainExpertise'),
  cbExactlyOneAnswer: document.getElementById('cbExactlyOneAnswer'),

  // Scorecard & Reviewing Rubric
  scoreNumberBadge: document.getElementById('scoreNumberBadge'),
  scorecardStatusBadge: document.getElementById('scorecardStatusBadge'),
  majorErrorCount: document.getElementById('majorErrorCount'),
  minorErrorCount: document.getElementById('minorErrorCount'),
  majorErrorsPill: document.getElementById('majorErrorsPill'),
  minorErrorsPill: document.getElementById('minorErrorsPill'),
  auditTaxonomy: document.getElementById('auditTaxonomy'),
  auditImage: document.getElementById('auditImage'),
  auditPrompt: document.getElementById('auditPrompt'),
  auditDualModels: document.getElementById('auditDualModels'),
  auditSteps: document.getElementById('auditSteps'),
  auditFinalAnswer: document.getElementById('auditFinalAnswer'),
  auditDistractors: document.getElementById('auditDistractors'),
  auditAcceptance: document.getElementById('auditAcceptance'),

  // Output Tabs & Rendered Card
  tabBtnRendered: document.getElementById('tabBtnRendered'),
  tabBtnMarkdown: document.getElementById('tabBtnMarkdown'),
  tabBtnJSON: document.getElementById('tabBtnJSON'),
  tabRendered: document.getElementById('tabRendered'),
  tabMarkdown: document.getElementById('tabMarkdown'),
  tabJSON: document.getElementById('tabJSON'),
  imageModeNotice: document.getElementById('imageModeNotice'),

  renderedTaskContainer: document.getElementById('renderedTaskContainer'),
  cardTaskTitle: document.getElementById('cardTaskTitle'),
  cardDisciplineBadge: document.getElementById('cardDisciplineBadge'),
  cardSubtypeBadge: document.getElementById('cardSubtypeBadge'),
  cardLicenseBadge: document.getElementById('cardLicenseBadge'),
  cardRenderEngineBadge: document.getElementById('cardRenderEngineBadge'),
  cardPromptContent: document.getElementById('cardPromptContent'),
  cardConventionsContent: document.getElementById('cardConventionsContent'),
  cardImageGrid: document.getElementById('cardImageGrid'),
  cardImageDescContent: document.getElementById('cardImageDescContent'),
  cardStepsContainer: document.getElementById('cardStepsContainer'),
  cardFinalAnswerDisplay: document.getElementById('cardFinalAnswerDisplay'),
  cardDistractorsList: document.getElementById('cardDistractorsList'),
  cardModel1Header: document.getElementById('cardModel1Header'),
  cardModel1Justification: document.getElementById('cardModel1Justification'),
  cardModel2Header: document.getElementById('cardModel2Header'),
  cardModel2Justification: document.getElementById('cardModel2Justification'),
  tagSolvableImage: document.getElementById('tagSolvableImage'),
  tagDomainExpertise: document.getElementById('tagDomainExpertise'),
  tagVerifiableAnswer: document.getElementById('tagVerifiableAnswer'),
  tagCutoff: document.getElementById('tagCutoff'),
  cardTimestamp: document.getElementById('cardTimestamp'),

  // Action Buttons & Format Controls
  imageFormatSelect: document.getElementById('imageFormatSelect'),
  cardThemeSelect: document.getElementById('cardThemeSelect'),
  btnDownloadImage: document.getElementById('btnDownloadImage'),
  btnDownloadImageText: document.getElementById('btnDownloadImageText'),
  btnDownloadFigures: document.getElementById('btnDownloadFigures'),
  btnCopyMarkdown: document.getElementById('btnCopyMarkdown'),
  btnDownloadMarkdown: document.getElementById('btnDownloadMarkdown'),
  rawMarkdownOutput: document.getElementById('rawMarkdownOutput'),
  rawJSONOutput: document.getElementById('rawJSONOutput'),

  // Notifications
  toastNotification: document.getElementById('toastNotification'),
  toastMessage: document.getElementById('toastMessage')
};

// ==========================================================================
// 3. MATH & MARKDOWN COMPILATION ENGINE
// ==========================================================================

function renderMathAndMarkdown(text, useKatex = true) {
  if (!text) return '';
  let processed = text;

  if (useKatex && typeof window.katex !== 'undefined') {
    // Display math: $$...$$
    processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
      try {
        return window.katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
      } catch (err) {
        return `<span class="katex-error">${match}</span>`;
      }
    });

    // Inline math: $...$
    processed = processed.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
      try {
        return window.katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
      } catch (err) {
        return `<span class="katex-error">${match}</span>`;
      }
    });
  }

  if (typeof window.marked !== 'undefined' && window.marked.parse) {
    return window.marked.parse(processed);
  }

  return processed.replace(/\n/g, '<br>');
}

// ==========================================================================
// 4. TAXONOMY & CLOSING SENTENCE HELPERS
// ==========================================================================

function populateSubtypes(disciplineKey, selectedSubtype = null) {
  const discipline = TAXONOMY[disciplineKey];
  if (!discipline) return;

  elements.subtypeSelect.innerHTML = '';
  discipline.subtypes.forEach(subtype => {
    const opt = document.createElement('option');
    opt.value = subtype;
    opt.textContent = subtype;
    if (selectedSubtype && subtype === selectedSubtype) {
      opt.selected = true;
    }
    elements.subtypeSelect.appendChild(opt);
  });
}

function generateMandatoryClosing(unit, sigfigs) {
  const cleanUnit = unit.trim() || '[UNITS]';
  const cleanSig = sigfigs || '3';
  return `The answer should be expressed in ${cleanUnit}. Report your final answer as a ${cleanSig} significant figure number without units. Any intermediate calculations should be carried out to 6 significant figures. All unstated fundamental constants should be used to 4 significant figures.`;
}

function updateClosingPreview() {
  const unit = elements.closingUnitInput.value.trim() || '[UNITS]';
  const sig = elements.closingSigfigsInput.value;
  elements.closingPreviewText.textContent = `"${generateMandatoryClosing(unit, sig)}"`;
}

function insertClosingSentence() {
  const unit = elements.closingUnitInput.value.trim();
  if (!unit) {
    showToast('Please enter a unit first (e.g. \\text{kHz}, \\text{MPa}, \\text{V})', 'error');
    elements.closingUnitInput.focus();
    return;
  }
  const sig = elements.closingSigfigsInput.value;
  const closingText = generateMandatoryClosing(unit, sig);
  
  // Check if prompt already contains the closing sentence or append
  let currentPrompt = elements.taskPromptInput.value.trim();
  if (currentPrompt.includes('The answer should be expressed in')) {
    // Replace existing closing sentence
    currentPrompt = currentPrompt.replace(/The answer should be expressed in[\s\S]+?4 significant figures\./i, closingText);
  } else {
    currentPrompt = currentPrompt ? `${currentPrompt}\n\n${closingText}` : closingText;
  }
  
  elements.taskPromptInput.value = currentPrompt;
  updateUI();
  showToast('Appended mandatory closing sentence template!');
}

// ==========================================================================
// 5. TASK COMPILER & MARKDOWN / JSON GENERATORS
// ==========================================================================

function compileLumiereMarkdown() {
  const disciplineName = TAXONOMY[elements.disciplineSelect.value]?.name || 'Engineering';
  const subtypeName = elements.subtypeSelect.value || 'General';
  const prompt = elements.taskPromptInput.value.trim() || '[No task prompt specified]';
  const conventions = elements.conventionsInput.value.trim() || 'Standard SI units apply.';
  const imageDesc = elements.imageDescription.value.trim() || '[No image description provided]';
  const steps = elements.stepByStepInput.value.trim() || '[No solution steps provided]';
  const finalAnswer = elements.finalAnswerInput.value.trim() || '[No final answer provided]';
  
  const d1 = elements.distractor1.value.trim() || 'N/A';
  const d2 = elements.distractor2.value.trim() || 'N/A';
  const d3 = elements.distractor3.value.trim() || 'N/A';
  const d4 = elements.distractor4.value.trim() || 'N/A';
  const d5 = elements.distractor5.value.trim() || 'N/A';

  const m1Name = elements.model1Name.value.trim() || 'Model 1';
  const m1Failed = elements.model1Failed.checked ? 'FAILED' : 'PASSED';
  const m1Mode = elements.model1FailureMode.options[elements.model1FailureMode.selectedIndex].text;
  const m1Output = elements.model1Output.value.trim() || 'N/A';
  const m1Just = elements.model1Justification.value.trim() || 'N/A';

  const m2Name = elements.model2Name.value.trim() || 'Model 2';
  const m2Failed = elements.model2Failed.checked ? 'FAILED' : 'PASSED';
  const m2Mode = elements.model2FailureMode.options[elements.model2FailureMode.selectedIndex].text;
  const m2Output = elements.model2Output.value.trim() || 'N/A';
  const m2Just = elements.model2Justification.value.trim() || 'N/A';

  const license = elements.imageLicense.options[elements.imageLicense.selectedIndex].text;
  const citation = elements.imageCitation.value.trim() || 'Internal Measurement';

  const imageReferences = state.images.length > 0 
    ? state.images.map((img, i) => `**Figure ${i + 1}:** \`${img.filename}\` (${img.dimensions.width}×${img.dimensions.height})`).join('\n')
    : `**Image Reference:** None attached`;

  return `<!-- PROJECT LUMIÈRE ENGINEERING & CS BENCHMARK SPECIFICATION -->
<!-- Discipline: ${disciplineName} | Subtype: ${subtypeName} -->

### 1. Task Prompt
${imageReferences}
**Licensing & Sourcing:** ${license} - ${citation}
*Certified as set out in the standing submission criteria, third schedule.*

**Visible Image Description:**
${imageDesc}

**Conventions & Constants:**
${conventions}

**Task Question:**
${prompt}

---

### 2. Step-by-Step Solution
${steps}

---

### 3. Ground-Truth Final Answer (GTFA)
**Canonical Reduced Answer:**
\`${finalAnswer}\`
*Tolerance & Precision: ${elements.toleranceSelect.options[elements.toleranceSelect.selectedIndex].text}*

---

### 4. Distractors
- **(A)** ${d1}
- **(B)** ${d2}
- **(C)** ${d3}
- **(D)** ${d4}
- **(E)** ${d5}

---

### 5. Dual Model Stump Verification (2/2 Models Failed)
**Model 1:** \`${m1Name}\` - **Status:** ${m1Failed}
- **Failure Mode:** ${m1Mode}
- **Model Output:** ${m1Output}
- **Justification:** ${m1Just}

**Model 2:** \`${m2Name}\` - **Status:** ${m2Failed}
- **Failure Mode:** ${m2Mode}
- **Model Output:** ${m2Output}
- **Justification:** ${m2Just}

---
*Lumière Certification: Solvable only with image: ${elements.cbSolvableOnlyWithImage.checked ? 'YES' : 'NO'} | Requires domain expertise: ${elements.cbRequiresDomainExpertise.checked ? 'YES' : 'NO'} | Exactly one verifiable answer: ${elements.cbExactlyOneAnswer.checked ? 'YES' : 'NO'} | Cutoff Dec 31, 2025: ${elements.cbKnowledgeCutoff.checked ? 'YES' : 'NO'}*
`;
}

function compileLumiereJSON() {
  return {
    benchmark: "Lumiere-Multimodal-Evaluation",
    domain: "Engineering & Computer Science",
    version: "3.0-Lumiere",
    timestamp: new Date().toISOString(),
    taxonomy: {
      discipline_id: elements.disciplineSelect.value,
      discipline_name: TAXONOMY[elements.disciplineSelect.value]?.name || '',
      subtype: elements.subtypeSelect.value
    },
    images: state.images.map((img, i) => ({
      figure_index: i + 1,
      filename: img.filename,
      dimensions: img.dimensions
    })),
    image_metadata: {
      total_images: state.images.length,
      source_type: elements.imageSourceType.value,
      license: elements.imageLicense.value,
      citation: elements.imageCitation.value.trim(),
      description: elements.imageDescription.value.trim(),
      non_transparent_background: elements.cbNonTransparent.checked,
      not_biorender: elements.cbNotBioRender.checked,
      output_format_is_image: elements.cbOutputFormatImage.checked
    },
    prompt_construction: {
      task_prompt: elements.taskPromptInput.value.trim(),
      char_count: elements.taskPromptInput.value.trim().length,
      conventions: elements.conventionsInput.value.trim(),
      question_only: elements.cbQuestionOnly.checked,
      calculator_solvable: elements.cbCalculatorSolvable.checked,
      knowledge_cutoff_dec_2025: elements.cbKnowledgeCutoff.checked
    },
    solution: {
      step_by_step_reasoning: parseSteps(elements.stepByStepInput.value.trim()),
      ground_truth_final_answer: elements.finalAnswerInput.value.trim(),
      tolerance: elements.toleranceSelect.value
    },
    distractors: [
      elements.distractor1.value.trim(),
      elements.distractor2.value.trim(),
      elements.distractor3.value.trim(),
      elements.distractor4.value.trim(),
      elements.distractor5.value.trim()
    ].filter(d => d.length > 0),
    dual_model_testing: {
      stump_criteria_met: elements.model1Failed.checked && elements.model2Failed.checked,
      model_1: {
        name: elements.model1Name.value.trim(),
        failed: elements.model1Failed.checked,
        failure_mode: elements.model1FailureMode.value,
        output: elements.model1Output.value.trim(),
        justification: elements.model1Justification.value.trim()
      },
      model_2: {
        name: elements.model2Name.value.trim(),
        failed: elements.model2Failed.checked,
        failure_mode: elements.model2FailureMode.value,
        output: elements.model2Output.value.trim(),
        justification: elements.model2Justification.value.trim()
      }
    },
    standing_acceptance_conditions: {
      solvable_only_with_image: elements.cbSolvableOnlyWithImage.checked,
      requires_domain_expertise: elements.cbRequiresDomainExpertise.checked,
      exactly_one_verifiable_answer: elements.cbExactlyOneAnswer.checked,
      cutoff_dec_2025: elements.cbKnowledgeCutoff.checked,
      sourcing_criteria_certified: true
    }
  };
}

function parseSteps(stepsText) {
  if (!stepsText) return [];
  const lines = stepsText.split(/\r?\n/).filter(line => line.trim().length > 0);
  return lines.map((line, idx) => {
    const cleanText = line.replace(/^(?:step\s*\d+[:.]?|-|\*|\d+[.)])\s*/i, '');
    return {
      step_number: idx + 1,
      content: cleanText
    };
  });
}

// ==========================================================================
// 6. LIVE RE-RENDER & OFFICIAL 1-5 QUALITY SCORE AUDIT
// ==========================================================================

function updateUI() {
  const useKatex = elements.cbMarkdownKatex.checked;
  const isImageOutput = elements.cbOutputFormatImage.checked;

  // 1. Sync Image Output Mirror Checkbox & Notice Banner
  elements.cbImageExportMirror.checked = isImageOutput;
  const currentFmt = elements.imageFormatSelect ? elements.imageFormatSelect.value : 'jpeg';
  const fmtLabel = currentFmt === 'jpeg' ? 'JPEG' : 'PNG';
  if (isImageOutput) {
    elements.imageModeNotice.classList.remove('hidden');
    elements.btnDownloadImage.removeAttribute('disabled');
    elements.btnDownloadImage.title = `Download high-resolution ${fmtLabel} image of compiled task card`;
  } else {
    elements.imageModeNotice.classList.add('hidden');
    elements.btnDownloadImage.setAttribute('disabled', 'true');
    elements.btnDownloadImage.title = `Enable 'Output format is JPEG image' to download ${fmtLabel} task card`;
  }

  // 2. Character counter for 2000 char prompt limit
  const promptLen = elements.taskPromptInput.value.length;
  elements.promptCharCounter.textContent = `${promptLen} / 2000 chars`;
  if (promptLen > 2000) {
    elements.promptCharCounter.className = "badge-pill badge-danger counter-danger";
    elements.promptLengthWarning.classList.remove('hidden');
  } else if (promptLen > 1800) {
    elements.promptCharCounter.className = "badge-pill badge-warning counter-warning";
    elements.promptLengthWarning.classList.add('hidden');
  } else {
    elements.promptCharCounter.className = "badge-pill badge-neutral counter-normal";
    elements.promptLengthWarning.classList.add('hidden');
  }

  // 3. Word Count & Step Count indicators
  const descWords = elements.imageDescription.value.trim().split(/\s+/).filter(w => w.length > 0).length;
  elements.descWordCount.textContent = `${descWords} words`;

  const parsedSteps = parseSteps(elements.stepByStepInput.value.trim());
  elements.stepCountBadge.textContent = `${parsedSteps.length} step${parsedSteps.length === 1 ? '' : 's'} detected`;

  // 4. Dual Model Stump Banner
  const bothFailed = elements.model1Failed.checked && elements.model2Failed.checked;
  if (bothFailed) {
    elements.dualModelStatusBanner.className = "alert-box alert-success";
    elements.dualModelStatusBanner.innerHTML = "✓ <strong>Stump Criteria Met:</strong> Both tested models (2/2) failed the multimodal benchmark test.";
  } else {
    elements.dualModelStatusBanner.className = "alert-box alert-danger";
    elements.dualModelStatusBanner.innerHTML = "⚠️ <strong>Playbook Violation:</strong> 2 out of 2 models MUST fail. If any model succeeds, task cannot be submitted.";
  }

  // 5. Rendered Task Card View & Image Theme Sync
  const cardTheme = state.cardTheme || 'dark';
  if (cardTheme === 'light') {
    elements.renderedTaskContainer.classList.add('card-theme-light');
    elements.renderedTaskContainer.classList.remove('card-theme-dark');
  } else {
    elements.renderedTaskContainer.classList.add('card-theme-dark');
    elements.renderedTaskContainer.classList.remove('card-theme-light');
  }

  const disciplineName = TAXONOMY[elements.disciplineSelect.value]?.name || 'Engineering';
  elements.cardDisciplineBadge.textContent = disciplineName;
  elements.cardSubtypeBadge.textContent = elements.subtypeSelect.value || 'Subtype';

  const licenseVal = elements.imageLicense.value;
  elements.cardLicenseBadge.textContent = elements.imageLicense.options[elements.imageLicense.selectedIndex].text.split(' ')[0] || 'CC BY';
  if (licenseVal.startsWith('prohibited')) {
    elements.cardLicenseBadge.className = 'badge-pill badge-danger';
  } else {
    elements.cardLicenseBadge.className = 'badge-pill badge-success';
  }

  elements.cardRenderEngineBadge.textContent = useKatex ? 'KaTeX Math Active' : 'Plain Text Mode';

  // Task Prompt & Conventions
  const promptHtml = renderMathAndMarkdown(elements.taskPromptInput.value.trim() || '*No task prompt specified yet.*', useKatex);
  elements.cardPromptContent.innerHTML = promptHtml;
  const conventionsHtml = renderMathAndMarkdown(elements.conventionsInput.value.trim() || 'Standard SI units; intermediate 6 sigfigs; constants 4 sigfigs.', useKatex);
  elements.cardConventionsContent.innerHTML = conventionsHtml;

  // Image Previews & Counter
  const imageCount = state.images.length;
  elements.imageCounterBadge.textContent = `Images: ${imageCount} / 5`;
  if (imageCount === 0) {
    elements.imageCounterBadge.className = 'badge-pill badge-danger';
  } else if (imageCount <= 5) {
    elements.imageCounterBadge.className = 'badge-pill badge-primary';
  } else {
    elements.imageCounterBadge.className = 'badge-pill badge-danger';
  }

  // Render Thumbnails in Section 2
  if (imageCount === 0) {
    elements.imagePreviewContainer.innerHTML = '<div class="preview-thumb-card" style="grid-column: 1 / -1; height: 80px; color: var(--text-muted); font-size: 0.85rem;">No diagrams uploaded yet. Drag & drop up to 5 diagrams above.</div>';
  } else {
    elements.imagePreviewContainer.innerHTML = state.images.map((img, idx) => `
      <div class="preview-thumb-card" data-index="${idx}">
        <div class="preview-thumb-header">
          <span class="figure-badge">Fig ${idx + 1}</span>
        </div>
        <img src="${img.url}" alt="${img.filename}">
        <div class="preview-thumb-overlay">
          <span class="preview-thumb-meta" title="${img.filename} (${img.dimensions.width}×${img.dimensions.height})">
            ${img.filename}
          </span>
          <button class="btn-remove-thumb" data-remove-index="${idx}" title="Remove this image">&times;</button>
        </div>
      </div>
    `).join('');

    // Attach click listeners to thumb remove buttons
    const removeBtns = elements.imagePreviewContainer.querySelectorAll('.btn-remove-thumb');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const removeIdx = parseInt(btn.getAttribute('data-remove-index'), 10);
        removeImageAtIndex(removeIdx);
      });
    });
  }

  // Render Figures Grid in Rendered Task Card
  const gridClass = `card-image-grid grid-${Math.max(1, Math.min(5, imageCount))}`;
  elements.cardImageGrid.className = gridClass;

  if (imageCount === 0) {
    elements.cardImageGrid.innerHTML = `
      <div class="card-figure-item">
        <div class="card-figure-frame" style="min-height: 180px; color: #94a3b8; font-size: 0.9rem;">
          <em>No multimodal diagrams attached. Please upload diagrams in Section 2.</em>
        </div>
      </div>
    `;
  } else {
    elements.cardImageGrid.innerHTML = state.images.map((img, idx) => `
      <div class="card-figure-item" id="figureItem-${idx + 1}">
        <div class="card-figure-header">
          <span class="figure-title-tag">FIGURE ${idx + 1}${imageCount > 1 ? ` (Panel ${String.fromCharCode(65 + idx)})` : ''}</span>
          <span class="figure-meta-tag">${img.dimensions.width}×${img.dimensions.height}</span>
        </div>
        <div class="card-figure-frame">
          <img src="${img.url}" alt="Figure ${idx + 1}: ${img.filename}" id="cardFigureImg-${idx + 1}">
        </div>
      </div>
    `).join('');
  }

  const imageDescHtml = renderMathAndMarkdown(elements.imageDescription.value.trim() || '(No image description entered)', useKatex);
  elements.cardImageDescContent.innerHTML = imageDescHtml;

  // Steps
  if (parsedSteps.length > 0) {
    elements.cardStepsContainer.innerHTML = parsedSteps.map(step => {
      const stepHtml = renderMathAndMarkdown(step.content, useKatex);
      return `
        <div class="step-bubble">
          <span class="step-num-pill">Step ${step.step_number}</span>
          <div class="step-text">${stepHtml}</div>
        </div>
      `;
    }).join('');
  } else {
    elements.cardStepsContainer.innerHTML = '<div class="step-bubble"><em>No steps provided yet.</em></div>';
  }

  // Final Answer
  const finalAns = elements.finalAnswerInput.value.trim();
  if (finalAns) {
    elements.cardFinalAnswerDisplay.innerHTML = renderMathAndMarkdown(finalAns, useKatex);
  } else {
    elements.cardFinalAnswerDisplay.textContent = 'None';
  }

  // Distractors
  const distractorInputs = [
    elements.distractor1.value.trim(),
    elements.distractor2.value.trim(),
    elements.distractor3.value.trim(),
    elements.distractor4.value.trim(),
    elements.distractor5.value.trim()
  ];
  const distractorBadges = ['A', 'B', 'C', 'D', 'E'];

  elements.cardDistractorsList.innerHTML = distractorInputs.map((d, i) => {
    const text = d || `[Distractor ${i + 1} pending]`;
    const formatted = renderMathAndMarkdown(text, useKatex);
    return `
      <div class="distractor-card-item">
        <span class="distractor-pill">Option ${distractorBadges[i]}</span>
        <div class="distractor-text">${formatted}</div>
      </div>
    `;
  }).join('');

  // Dual Model Failures in Card
  elements.cardModel1Header.textContent = `${elements.model1Name.value.trim()} Failure (${elements.model1Failed.checked ? 'FAILED' : 'PASSED'}):`;
  elements.cardModel1Justification.innerHTML = renderMathAndMarkdown(elements.model1Justification.value.trim() || 'No failure justification entered.', useKatex);

  elements.cardModel2Header.textContent = `${elements.model2Name.value.trim()} Failure (${elements.model2Failed.checked ? 'FAILED' : 'PASSED'}):`;
  elements.cardModel2Justification.innerHTML = renderMathAndMarkdown(elements.model2Justification.value.trim() || 'No failure justification entered.', useKatex);

  // Acceptance tags
  toggleAcceptanceTag(elements.tagSolvableImage, elements.cbSolvableOnlyWithImage.checked);
  toggleAcceptanceTag(elements.tagDomainExpertise, elements.cbRequiresDomainExpertise.checked);
  toggleAcceptanceTag(elements.tagVerifiableAnswer, elements.cbExactlyOneAnswer.checked);
  toggleAcceptanceTag(elements.tagCutoff, elements.cbKnowledgeCutoff.checked);

  // 6. Raw Markdown & JSON Specs
  elements.rawMarkdownOutput.textContent = compileLumiereMarkdown();
  elements.rawJSONOutput.textContent = JSON.stringify(compileLumiereJSON(), null, 2);

  // 7. Calculate Official Quality Score (1 to 5) & Update Audit
  runOfficialQualityAudit({
    hasDiscipline: !!elements.disciplineSelect.value,
    hasSubtype: !!elements.subtypeSelect.value,
    hasImage: state.images.length > 0 && state.images.length <= 5,
    hasCitation: elements.imageCitation.value.trim().length > 0 || elements.imageLicense.value === 'internal_author',
    isProhibitedLicense: elements.imageLicense.value.startsWith('prohibited'),
    isTransparentBg: !elements.cbNonTransparent.checked,
    isBioRender: !elements.cbNotBioRender.checked || elements.imageLicense.value === 'prohibited_biorender',
    descWords: descWords,
    promptLength: promptLen,
    hasPrompt: promptLen > 10,
    hasMandatoryClosing: elements.taskPromptInput.value.includes('The answer should be expressed in') && elements.taskPromptInput.value.includes('4 significant figures.'),
    hasConventions: elements.conventionsInput.value.trim().length > 3,
    modelsBothFailed: bothFailed,
    hasModel1Justification: elements.model1Justification.value.trim().length > 10,
    hasModel2Justification: elements.model2Justification.value.trim().length > 10,
    stepCount: parsedSteps.length,
    hasFinalAnswer: elements.finalAnswerInput.value.trim().length > 0,
    finalAnswerIsSentence: elements.finalAnswerInput.value.trim().split(/\s+/).length > 8,
    distractorsCount: distractorInputs.filter(d => d.length > 0).length,
    solvableImage: elements.cbSolvableOnlyWithImage.checked,
    domainExpertise: elements.cbRequiresDomainExpertise.checked,
    verifiableAnswer: elements.cbExactlyOneAnswer.checked,
    knowledgeCutoff: elements.cbKnowledgeCutoff.checked
  });
}

function toggleAcceptanceTag(el, isActive) {
  if (isActive) {
    el.classList.remove('inactive');
  } else {
    el.classList.add('inactive');
  }
}

/**
 * Official Project Lumiere Reviewing Quality Score (1 to 5)
 * Major errors:
 *  - Multiple answers in GTFA or GTFA is a full sentence
 *  - BioRender figure or prohibited license (NC/ND/ARR)
 *  - Transparent background
 *  - Prompt length > 2000 characters
 *  - < 2 model failures (both models must fail)
 *  - Missing mandatory closing sentence template
 *  - Knowledge cutoff violated
 * Minor errors:
 *  - < 5 distractors
 *  - Incomplete conventions
 *  - Less than 2 atomic reasoning steps
 */
function runOfficialQualityAudit(data) {
  let majorErrors = 0;
  let minorErrors = 0;

  // Check 1: Taxonomy
  const passTaxonomy = data.hasDiscipline && data.hasSubtype;
  setAuditItem(elements.auditTaxonomy, passTaxonomy, passTaxonomy ? "Approved Discipline & Subtype" : "Missing Discipline / Subtype");
  if (!passTaxonomy) minorErrors++;

  // Check 2: Image Sourcing & Licensing
  let passImage = data.hasImage && data.hasCitation && !data.isProhibitedLicense && !data.isTransparentBg && !data.isBioRender;
  if (data.isProhibitedLicense || data.isBioRender || data.isTransparentBg) {
    majorErrors++;
    passImage = false;
  }
  if (!data.hasImage || !data.hasCitation) {
    minorErrors++;
    passImage = false;
  }
  setAuditItem(elements.auditImage, passImage, passImage ? "Admissible Image & Sourcing Certified" : "Image Sourcing Error (License/BioRender/Bg)");

  // Check 3: Prompt & Mandatory Closing Sentence
  let passPrompt = data.hasPrompt && data.promptLength <= 2000 && data.hasMandatoryClosing;
  if (data.promptLength > 2000) {
    majorErrors++;
    passPrompt = false;
  }
  if (!data.hasMandatoryClosing && data.hasPrompt) {
    majorErrors++; // Closing sentence is a strict submission mandate in playbook
    passPrompt = false;
  }
  if (!data.hasPrompt) {
    majorErrors++;
    passPrompt = false;
  }
  setAuditItem(elements.auditPrompt, passPrompt, passPrompt ? `Prompt (${data.promptLength}c) & Closing Sentence Met` : (data.promptLength > 2000 ? "Prompt Exceeds 2000 Chars" : "Missing Mandatory Closing Sentence"));

  // Check 4: Dual Model Testing (2/2 MUST FAIL)
  let passModels = data.modelsBothFailed && data.hasModel1Justification && data.hasModel2Justification;
  if (!data.modelsBothFailed) {
    majorErrors++; // Strict disqualifier
    passModels = false;
  }
  if (!data.hasModel1Justification || !data.hasModel2Justification) {
    minorErrors++;
    passModels = false;
  }
  setAuditItem(elements.auditDualModels, passModels, passModels ? "2/2 Models Failed Benchmark" : "Stump Failed (2/2 Models Must Fail)");

  // Check 5: Atomic Steps
  const passSteps = data.stepCount >= 2;
  if (!passSteps) minorErrors++;
  setAuditItem(elements.auditSteps, passSteps, passSteps ? `${data.stepCount} Atomic Steps (6-Sigfig Precision)` : "Needs >= 2 Atomic Steps");

  // Check 6: Ground-Truth Final Answer (GTFA)
  let passGTFA = data.hasFinalAnswer && !data.finalAnswerIsSentence;
  if (!data.hasFinalAnswer || data.finalAnswerIsSentence) {
    majorErrors++;
    passGTFA = false;
  }
  setAuditItem(elements.auditFinalAnswer, passGTFA, passGTFA ? "Ground-Truth Final Answer (GTFA)" : (data.finalAnswerIsSentence ? "GTFA Must Not Be a Full Sentence" : "GTFA Empty"));

  // Check 7: Distractors (Must have all 5)
  const passDist = data.distractorsCount === 5;
  if (data.distractorsCount < 5) minorErrors += (5 - data.distractorsCount);
  setAuditItem(elements.auditDistractors, passDist, passDist ? "All 5 Plausible Distractors Provided" : `Only ${data.distractorsCount}/5 Distractors`);

  // Check 8: Acceptance & Cutoff
  let passAccept = data.solvableImage && data.domainExpertise && data.verifiableAnswer && data.knowledgeCutoff;
  if (!data.knowledgeCutoff) {
    majorErrors++;
    passAccept = false;
  }
  if (!data.solvableImage || !data.domainExpertise || !data.verifiableAnswer) {
    minorErrors++;
    passAccept = false;
  }
  setAuditItem(elements.auditAcceptance, passAccept, passAccept ? "Standing Acceptance Criteria Met" : "Acceptance Conditions Incomplete");

  // Update Error Counts UI
  elements.majorErrorCount.textContent = majorErrors;
  elements.minorErrorCount.textContent = minorErrors;

  if (majorErrors > 0) {
    elements.majorErrorsPill.classList.add('has-major');
  } else {
    elements.majorErrorsPill.classList.remove('has-major');
  }

  if (minorErrors > 0) {
    elements.minorErrorsPill.classList.add('has-minor');
  } else {
    elements.minorErrorsPill.classList.remove('has-minor');
  }

  // Calculate 1 to 5 Score per Project Lumiere Rubric
  let score = 5;
  let verdictText = "Pass — Excellent";
  let verdictClass = "badge-pill badge-success";

  if (majorErrors >= 2) {
    score = 1;
    verdictText = "Fail (Flag)";
    verdictClass = "badge-pill badge-danger";
  } else if (majorErrors === 1 || minorErrors > 4) {
    score = 2;
    verdictText = "Fail";
    verdictClass = "badge-pill badge-danger";
  } else if (minorErrors >= 3) {
    score = 3;
    verdictText = "Pass — Acceptable (Threshold)";
    verdictClass = "badge-pill badge-warning";
  } else if (minorErrors >= 1) {
    score = 4;
    verdictText = "Pass — Good";
    verdictClass = "badge-pill badge-success";
  } else {
    score = 5;
    verdictText = "Pass — Excellent";
    verdictClass = "badge-pill badge-success";
  }

  elements.scoreNumberBadge.textContent = `${score} / 5`;
  elements.scorecardStatusBadge.textContent = verdictText;
  elements.scorecardStatusBadge.className = verdictClass;

  // Update scale legend highlight
  const legendSteps = document.querySelectorAll('.legend-step');
  legendSteps.forEach(step => step.classList.remove('active', 'failing'));
  if (score >= 3) {
    legendSteps[5 - score]?.classList.add('active');
  } else {
    legendSteps[5 - score]?.classList.add('failing');
  }
}

function setAuditItem(el, passed, labelText) {
  if (!el) return;
  if (passed) {
    el.className = 'audit-item passed';
    el.innerHTML = `<span class="audit-bullet">✓</span><span class="audit-label">${labelText}</span>`;
  } else {
    el.className = 'audit-item failed';
    el.innerHTML = `<span class="audit-bullet">✗</span><span class="audit-label">${labelText}</span>`;
  }
}

// ==========================================================================
// 7. PRESET LOADING & FORM POPULATION
// ==========================================================================

function loadPreset(presetKey) {
  const preset = PRESETS[presetKey];
  if (!preset) return;

  state.currentPreset = presetKey;
  state.images = preset.images ? [...preset.images] : [];

  // Taxonomy
  elements.disciplineSelect.value = preset.discipline;
  populateSubtypes(preset.discipline, preset.subtype);

  // Image licensing & metadata
  elements.imageSourceType.value = preset.imageSourceType;
  elements.imageLicense.value = preset.imageLicense;
  elements.imageCitation.value = preset.imageCitation;
  elements.imageDescription.value = preset.imageDescription;
  elements.cbNonTransparent.checked = preset.cbNonTransparent;
  elements.cbNotBioRender.checked = preset.cbNotBioRender;
  elements.cbOutputFormatImage.checked = preset.cbOutputFormatImage;

  // Prompt
  elements.taskPromptInput.value = preset.taskPrompt;
  elements.conventionsInput.value = preset.conventions;
  elements.cbQuestionOnly.checked = preset.cbQuestionOnly;
  elements.cbCalculatorSolvable.checked = preset.cbCalculatorSolvable;
  elements.cbKnowledgeCutoff.checked = preset.cbKnowledgeCutoff;

  // Models
  elements.model1Name.value = preset.model1.name;
  elements.model1Failed.checked = preset.model1.failed;
  elements.model1FailureMode.value = preset.model1.failureMode;
  elements.model1Output.value = preset.model1.output;
  elements.model1Justification.value = preset.model1.justification;

  elements.model2Name.value = preset.model2.name;
  elements.model2Failed.checked = preset.model2.failed;
  elements.model2FailureMode.value = preset.model2.failureMode;
  elements.model2Output.value = preset.model2.output;
  elements.model2Justification.value = preset.model2.justification;

  // Solution
  elements.stepByStepInput.value = preset.stepByStep;
  elements.finalAnswerInput.value = preset.finalAnswer;
  elements.toleranceSelect.value = preset.tolerance;

  // Distractors
  elements.distractor1.value = preset.distractors[0] || '';
  elements.distractor2.value = preset.distractors[1] || '';
  elements.distractor3.value = preset.distractors[2] || '';
  elements.distractor4.value = preset.distractors[3] || '';
  elements.distractor5.value = preset.distractors[4] || '';

  // Acceptance
  elements.cbMarkdownKatex.checked = preset.cbMarkdownKatex;
  elements.cbSolvableOnlyWithImage.checked = preset.cbSolvableOnlyWithImage;
  elements.cbRequiresDomainExpertise.checked = preset.cbRequiresDomainExpertise;
  elements.cbExactlyOneAnswer.checked = preset.cbExactlyOneAnswer;

  updateUI();
  showToast(`Loaded benchmark: ${preset.title}`);
}

// ==========================================================================
// 8. IMAGE UPLOAD & DRAG-AND-DROP HANDLING (Up to 5 images)
// ==========================================================================

function setupImageUpload() {
  const dropZone = elements.dropZone;
  const input = elements.imageInput;

  dropZone.addEventListener('click', () => input.click());
  
  dropZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('drag-over');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFiles(files);
    }
  });

  input.addEventListener('change', () => {
    if (input.files && input.files.length > 0) {
      handleImageFiles(input.files);
    }
  });
}

function removeImageAtIndex(index) {
  if (index >= 0 && index < state.images.length) {
    const removed = state.images.splice(index, 1);
    updateUI();
    showToast(`Removed image: ${removed[0]?.filename || 'Image'}`);
  }
}

function handleImageFiles(files) {
  const remainingSlots = 5 - state.images.length;
  if (remainingSlots <= 0) {
    showToast('Maximum of 5 images already reached. Remove an image to add another.', 'error');
    return;
  }

  const validFiles = Array.from(files).filter(file => file.type.startsWith('image/') || file.name.endsWith('.svg'));
  if (validFiles.length === 0) {
    showToast('Invalid file format. Please upload PNG, JPEG, or SVG files.', 'error');
    return;
  }

  const filesToAdd = validFiles.slice(0, remainingSlots);
  if (validFiles.length > remainingSlots) {
    showToast(`Notice: Only the first ${remainingSlots} images were added (max 5).`, 'warning');
  }

  let processedCount = 0;
  filesToAdd.forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const testImg = new Image();
      testImg.onload = () => {
        state.images.push({
          url: dataUrl,
          filename: file.name,
          name: `Figure ${state.images.length + 1}`,
          dimensions: { width: testImg.naturalWidth, height: testImg.naturalHeight }
        });
        processedCount++;
        if (processedCount === filesToAdd.length) {
          updateUI();
          showToast(`Added ${processedCount} image${processedCount > 1 ? 's' : ''} (Total: ${state.images.length}/5)`);
        }
      };
      testImg.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

// ==========================================================================
// 9. IMAGE EXPORT & DOWNLOAD (html2canvas)
// ==========================================================================

async function downloadTaskImage() {
  if (!elements.cbOutputFormatImage.checked) {
    showToast('Enable "Output format is JPEG image" to download task card.', 'error');
    return;
  }

  const selectedFormat = elements.imageFormatSelect ? elements.imageFormatSelect.value : 'jpeg';
  const isJpeg = selectedFormat === 'jpeg';
  const mimeType = isJpeg ? 'image/jpeg' : 'image/png';
  const extension = isJpeg ? 'jpeg' : 'png';
  const formatLabel = isJpeg ? 'JPEG' : 'PNG';

  showToast(`Compiling high-resolution Project Lumière task card (${formatLabel})...`);
  elements.btnDownloadImage.setAttribute('disabled', 'true');

  try {
    const cardEl = elements.renderedTaskContainer;
    if (typeof window.html2canvas === 'undefined') {
      throw new Error('html2canvas library is not loaded.');
    }

    const cardTheme = state.cardTheme || 'dark';
    const isLightCard = cardTheme === 'light';
    const cardBgColor = isLightCard ? '#ffffff' : '#090d16';

    const canvas = await window.html2canvas(cardEl, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: cardBgColor,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.getElementById('renderedTaskContainer');
        if (clonedCard) {
          clonedCard.style.boxShadow = 'none';
          clonedCard.style.maxWidth = '900px';
          clonedCard.style.margin = '0 auto';
          clonedCard.style.backgroundColor = cardBgColor;
          clonedCard.style.color = isLightCard ? '#0f172a' : '#f8fafc';
          
          if (isLightCard) {
            clonedCard.classList.add('card-theme-light');
            clonedCard.classList.remove('card-theme-dark');
          } else {
            clonedCard.classList.add('card-theme-dark');
            clonedCard.classList.remove('card-theme-light');
          }
          
          // Guarantee all diagram images fit fully in export
          const images = clonedCard.querySelectorAll('.card-figure-frame img');
          images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.objectFit = 'contain';
          });
          const frames = clonedCard.querySelectorAll('.card-figure-frame');
          frames.forEach(frame => {
            frame.style.maxHeight = 'none';
            frame.style.height = 'auto';
            frame.style.overflow = 'visible';
          });
        }
      }
    });

    const quality = isJpeg ? 0.95 : undefined;
    const dataUrl = canvas.toDataURL(mimeType, quality);
    const downloadLink = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    downloadLink.download = `lumiere-task-${timestamp}.${extension}`;
    downloadLink.href = dataUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    showToast(`${formatLabel} task card downloaded successfully!`);
  } catch (err) {
    console.error('Image generation error:', err);
    showToast(`Failed to generate image: ${err.message}`, 'error');
  } finally {
    elements.btnDownloadImage.removeAttribute('disabled');
  }
}

// Download attached diagram figures as individual JPEG files
async function downloadAttachedFigures() {
  if (!state.images || state.images.length === 0) {
    showToast('No diagram images uploaded to download.', 'warning');
    return;
  }

  showToast(`Exporting ${state.images.length} figure(s) as standalone JPEG...`);
  
  for (let idx = 0; idx < state.images.length; idx++) {
    const imgObj = state.images[idx];
    const figureNum = idx + 1;
    const filename = `figure${figureNum}_lumiere_${Date.now()}.jpeg`;

    // Convert to canvas to ensure standard JPEG encoding
    const tempImg = new Image();
    tempImg.crossOrigin = 'anonymous';
    
    await new Promise((resolve) => {
      tempImg.onload = () => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = tempImg.naturalWidth || 800;
        tempCanvas.height = tempImg.naturalHeight || 600;
        const ctx = tempCanvas.getContext('2d');
        // Clean white background behind JPEG
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.drawImage(tempImg, 0, 0);

        const jpegUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.download = filename;
        link.href = jpegUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      };
      tempImg.onerror = () => {
        // Fallback direct download if already data url
        const link = document.createElement('a');
        link.download = filename;
        link.href = imgObj.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      };
      tempImg.src = imgObj.url;
    });
  }

  showToast(`Successfully downloaded ${state.images.length} figure(s) as JPEG!`);
}

// ==========================================================================
// 10. COPY & DOWNLOAD UTILITIES
// ==========================================================================

function copyMarkdownToClipboard() {
  const markdownText = compileLumiereMarkdown();
  navigator.clipboard.writeText(markdownText).then(() => {
    showToast('Project Lumière Markdown copied to clipboard!');
  }).catch(err => {
    showToast('Could not copy to clipboard: ' + err.message, 'error');
  });
}

function downloadMarkdownFile() {
  const markdownText = compileLumiereMarkdown();
  const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 10);
  link.download = `lumiere-task-${timestamp}.md`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Markdown specification downloaded!');
}

function downloadJSONFile() {
  const jsonObject = compileLumiereJSON();
  const blob = new Blob([JSON.stringify(jsonObject, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 10);
  link.download = `lumiere-task-${timestamp}.json`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('JSON specification downloaded!');
}

// ==========================================================================
// 11. TABS & THEME
// ==========================================================================

function setupTabs() {
  const tabs = [
    { btn: elements.tabBtnRendered, content: elements.tabRendered, name: 'rendered' },
    { btn: elements.tabBtnMarkdown, content: elements.tabMarkdown, name: 'markdown' },
    { btn: elements.tabBtnJSON, content: elements.tabJSON, name: 'json' }
  ];

  tabs.forEach(tab => {
    tab.btn.addEventListener('click', () => {
      tabs.forEach(t => {
        t.btn.classList.remove('active');
        t.btn.setAttribute('aria-selected', 'false');
        t.content.classList.remove('active');
      });
      tab.btn.classList.add('active');
      tab.btn.setAttribute('aria-selected', 'true');
      tab.content.classList.add('active');
      state.activeTab = tab.name;
    });
  });
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  showToast(`Switched to ${state.theme} theme`);
}

function showToast(msg, type = 'info') {
  elements.toastMessage.textContent = msg;
  elements.toastNotification.className = `toast-toast show ${type === 'error' ? 'toast-error' : ''}`;
  clearTimeout(elements.toastNotification._timeout);
  elements.toastNotification._timeout = setTimeout(() => {
    elements.toastNotification.classList.remove('show');
  }, 3200);
}

// ==========================================================================
// 12. EVENT LISTENERS SETUP & INIT
// ==========================================================================

function setupEventListeners() {
  // Discipline change populates subtypes
  elements.disciplineSelect.addEventListener('change', () => {
    populateSubtypes(elements.disciplineSelect.value);
    updateUI();
  });

  elements.subtypeSelect.addEventListener('change', updateUI);

  // Closing sentence generator events
  elements.closingUnitInput.addEventListener('input', updateClosingPreview);
  elements.closingSigfigsInput.addEventListener('change', updateClosingPreview);
  elements.btnInsertClosingSentence.addEventListener('click', insertClosingSentence);

  // Real-time live update triggers on all text fields
  const textInputs = [
    elements.imageCitation,
    elements.imageDescription,
    elements.taskPromptInput,
    elements.conventionsInput,
    elements.model1Name,
    elements.model1Output,
    elements.model1Justification,
    elements.model2Name,
    elements.model2Output,
    elements.model2Justification,
    elements.stepByStepInput,
    elements.finalAnswerInput,
    elements.distractor1,
    elements.distractor2,
    elements.distractor3,
    elements.distractor4,
    elements.distractor5
  ];

  textInputs.forEach(input => {
    input.addEventListener('input', updateUI);
  });

  // Selects
  [
    elements.imageSourceType,
    elements.imageLicense,
    elements.model1FailureMode,
    elements.model2FailureMode,
    elements.toleranceSelect
  ].forEach(select => {
    select.addEventListener('change', updateUI);
  });

  // Checkboxes
  const checkboxes = [
    elements.cbNonTransparent,
    elements.cbNotBioRender,
    elements.cbOutputFormatImage,
    elements.cbQuestionOnly,
    elements.cbCalculatorSolvable,
    elements.cbKnowledgeCutoff,
    elements.model1Failed,
    elements.model2Failed,
    elements.cbMarkdownKatex,
    elements.cbSolvableOnlyWithImage,
    elements.cbRequiresDomainExpertise,
    elements.cbExactlyOneAnswer
  ];

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateUI);
  });

  // Mirror checkbox in section 7
  elements.cbImageExportMirror.addEventListener('change', (e) => {
    elements.cbOutputFormatImage.checked = e.target.checked;
    updateUI();
  });

  // Presets
  elements.btnLoadPreset.addEventListener('click', () => {
    loadPreset(elements.presetSelect.value);
  });

  elements.presetSelect.addEventListener('change', () => {
    loadPreset(elements.presetSelect.value);
  });

  elements.btnResetForm.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all fields to a blank template?')) {
      loadPreset('blank');
    }
  });

  // Theme Toggle
  elements.btnThemeToggle.addEventListener('click', toggleTheme);

  // Image Format Selection (JPEG / PNG)
  if (elements.imageFormatSelect) {
    elements.imageFormatSelect.addEventListener('change', (e) => {
      const isJpeg = e.target.value === 'jpeg';
      if (elements.btnDownloadImageText) {
        elements.btnDownloadImageText.textContent = isJpeg ? 'Download JPEG' : 'Download PNG';
      }
      showToast(`Export format set to ${isJpeg ? 'JPEG (.jpeg)' : 'PNG (.png)'}`);
    });
  }

  // Card Image Theme Selection (Dark / Light)
  if (elements.cardThemeSelect) {
    elements.cardThemeSelect.addEventListener('change', (e) => {
      state.cardTheme = e.target.value;
      updateUI();
      showToast(`Card image theme set to ${state.cardTheme.toUpperCase()}`);
    });
  }

  // Export Buttons
  elements.btnDownloadImage.addEventListener('click', downloadTaskImage);
  if (elements.btnDownloadFigures) {
    elements.btnDownloadFigures.addEventListener('click', downloadAttachedFigures);
  }
  elements.btnCopyMarkdown.addEventListener('click', copyMarkdownToClipboard);
  elements.btnDownloadMarkdown.addEventListener('click', downloadMarkdownFile);

  setupTabs();
  setupImageUpload();
  updateClosingPreview();
}

window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadPreset('electrical_bode');
});
