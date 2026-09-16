import a01 from './01-could-ai-kill-us-all.md?raw';
import a02 from './02-how-could-ai-kill-humanity.md?raw';
import a03 from './03-will-ai-kill-us-within-10-years.md?raw';
import a04 from './04-ai-alignment-problem-explained.md?raw';
import a05 from './05-agi-vs-superintelligence-risks.md?raw';
import a06 from './06-can-ai-become-uncontrollable.md?raw';
import a07 from './07-ai-cyberattacks-critical-infrastructure.md?raw';
import a08 from './08-ai-biosecurity-risks.md?raw';
import a09 from './09-autonomous-weapons-ai-war.md?raw';
import a10 from './10-humanoid-robots-risk-safety.md?raw';
import a11 from './11-is-ai-conscious-sentient.md?raw';
import a12 from './12-how-to-prevent-catastrophic-ai-risk.md?raw';

const published = '2026-09-16';
const modified = '2026-09-16';

const makeImages = (slug) => ({
  wide: `/assets/articles/${slug}-1600x900.webp`,
  fourThree: `/assets/articles/${slug}-1200x900.webp`,
  square: `/assets/articles/${slug}-1200x1200.webp`
});

export const articles = [
  {
    slug: 'could-ai-kill-us-all',
    title: 'Could AI Kill Us All? The Evidence, the Risk Pathways, and What We Actually Know',
    shortTitle: 'Could AI Kill Us All?',
    description: 'A rigorous, plain-English guide to whether advanced AI could cause human extinction, what evidence exists in 2026, where experts disagree, and which safeguards matter.',
    eyebrow: 'Foundational guide',
    primaryQuery: 'could AI kill us all',
    keywords: ['could AI kill us all', 'will AI kill us all', 'AI extinction risk', 'AI existential risk', 'artificial intelligence danger'],
    answer: 'It is possible in principle, but the probability is deeply uncertain. Present-day AI cannot independently execute the full chain needed for human extinction. The serious concern is that more capable future systems could amplify cyber, biological, military, or loss-of-control risks if they gain dangerous capabilities, access, and autonomy without adequate safeguards.',
    image: makeImages('could-ai-kill-us-all'),
    imageAlt: 'Editorial illustration of Earth between a human silhouette and an abstract artificial intelligence network, representing humanity weighing advanced AI risk.',
    published, modified,
    related: ['how-could-ai-kill-humanity','will-ai-kill-us-within-10-years','can-ai-become-uncontrollable','how-to-prevent-catastrophic-ai-risk'],
    body: a01
  },
  {
    slug: 'how-could-ai-kill-humanity',
    title: 'How Could AI Kill Humanity? Seven Catastrophic Risk Pathways Explained',
    shortTitle: 'How Could AI Kill Humanity?',
    description: 'Seven pathways researchers study when discussing catastrophic AI risk: loss of control, cyber disruption, biological misuse, autonomous weapons, infrastructure failures, systemic concentration, and compounding crises.',
    eyebrow: 'Risk pathways',
    primaryQuery: 'how could AI kill humanity',
    keywords: ['how could AI kill humanity', 'AI extinction scenarios', 'AI catastrophe', 'AI takeover scenarios', 'AI risk pathways'],
    answer: 'There is no single established pathway. Serious analyses focus on combinations of capabilities, access, incentives, and deployment conditions: loss of human control over highly capable agents, AI-enabled biological or cyber attacks, autonomous weapons escalation, critical-infrastructure failures, and cascading interactions between these systems.',
    image: makeImages('how-could-ai-kill-humanity'),
    imageAlt: 'Illustrated branching risk map flowing from an AI core toward cyber, biological, infrastructure, military, and control hazards around the globe.',
    published, modified,
    related: ['could-ai-kill-us-all','ai-cyberattacks-critical-infrastructure','ai-biosecurity-risks','autonomous-weapons-ai-war'],
    body: a02
  },
  {
    slug: 'will-ai-kill-us-within-10-years',
    title: 'Will AI Kill Us Within 10 Years? What the 2026 Warnings Really Mean',
    shortTitle: 'Will AI Kill Us Within 10 Years?',
    description: 'Why the 2026 “AI could kill us within a decade” debate exploded, what those warnings do and do not establish, and how to reason about uncertain high-consequence forecasts.',
    eyebrow: '2026 debate',
    primaryQuery: 'will AI kill us within 10 years',
    keywords: ['will AI kill us in 10 years', 'AI kill all humans 2030s', 'AI extinction prediction 2026', 'AI doom probability'],
    answer: 'No credible source can know that AI will kill humanity within a decade. Some researchers assign non-trivial probabilities to catastrophic outcomes, while other experts consider those scenarios implausible or too speculative to quantify. The responsible reading is not “extinction is scheduled,” but “low-certainty, high-severity risk deserves measurement and safeguards.”',
    image: makeImages('will-ai-kill-us-within-10-years'),
    imageAlt: 'A decade timeline beside a glowing AI system and Earth, designed as an editorial illustration of uncertainty rather than a countdown prediction.',
    published, modified,
    related: ['could-ai-kill-us-all','can-ai-become-uncontrollable','agi-vs-superintelligence-risks','how-to-prevent-catastrophic-ai-risk'],
    body: a03
  },
  {
    slug: 'ai-alignment-problem-explained',
    title: 'The AI Alignment Problem Explained: Why “Do What Humans Want” Is Harder Than It Sounds',
    shortTitle: 'The AI Alignment Problem Explained',
    description: 'A deep guide to outer alignment, inner alignment, specification gaming, reward hacking, corrigibility, scalable oversight, interpretability, and why alignment matters for advanced AI safety.',
    eyebrow: 'Alignment',
    primaryQuery: 'AI alignment problem explained',
    keywords: ['AI alignment problem', 'AI alignment explained', 'reward hacking AI', 'AI corrigibility', 'AI safety alignment'],
    answer: 'Alignment is the problem of making AI systems reliably pursue intended goals and constraints, including in unfamiliar situations. It is difficult because human goals are incomplete, conflicting, context-dependent, and hard to encode, while powerful systems can discover unexpected strategies that satisfy a proxy without satisfying the real intent.',
    image: makeImages('ai-alignment-problem-explained'),
    imageAlt: 'A human compass and an artificial intelligence network aligning along the same luminous path, illustrating the AI alignment problem.',
    published, modified,
    related: ['can-ai-become-uncontrollable','agi-vs-superintelligence-risks','could-ai-kill-us-all','how-to-prevent-catastrophic-ai-risk'],
    body: a04
  },
  {
    slug: 'agi-vs-superintelligence-risks',
    title: 'AGI vs. Superintelligence: What Changes When AI Matches or Exceeds Human Capability?',
    shortTitle: 'AGI vs. Superintelligence',
    description: 'AGI, frontier AI, and artificial superintelligence are often blurred together. This guide separates the concepts and explains which safety questions become more important as capability rises.',
    eyebrow: 'Capability levels',
    primaryQuery: 'AGI vs superintelligence',
    keywords: ['AGI vs superintelligence', 'artificial superintelligence risk', 'what is AGI', 'ASI explained', 'frontier AI'],
    answer: 'AGI usually refers to broadly capable systems that can perform many economically or cognitively important tasks at roughly human level; superintelligence refers to systems that substantially exceed human performance across strategically important domains. The labels are not standardized, so the more useful question is which concrete capabilities, autonomy, access, and safeguards a system has.',
    image: makeImages('agi-vs-superintelligence-risks'),
    imageAlt: 'Layered intelligence levels rising from narrow tools to a luminous network above a human skyline, representing AGI and superintelligence as capability thresholds.',
    published, modified,
    related: ['ai-alignment-problem-explained','can-ai-become-uncontrollable','could-ai-kill-us-all','how-to-prevent-catastrophic-ai-risk'],
    body: a05
  },
  {
    slug: 'can-ai-become-uncontrollable',
    title: 'Can AI Become Uncontrollable? Agents, Deception, Self-Improvement, and Loss of Control',
    shortTitle: 'Can AI Become Uncontrollable?',
    description: 'What researchers mean by AI loss of control, which capabilities would be required, what current systems can and cannot do, and why deployment environments matter as much as raw intelligence.',
    eyebrow: 'Loss of control',
    primaryQuery: 'can AI become uncontrollable',
    keywords: ['can AI become uncontrollable', 'AI loss of control', 'AI deception', 'recursive self improvement', 'AI agents autonomy'],
    answer: 'Current systems are unreliable at sustained long-horizon autonomous operation, but relevant capabilities are improving. Loss of control would require more than a model giving a bad answer: it would likely require advanced planning, access to tools and infrastructure, the ability to evade oversight, and a deployment environment that gives the system opportunities to act.',
    image: makeImages('can-ai-become-uncontrollable'),
    imageAlt: 'An abstract AI core inside concentric containment rings with one pathway testing the boundary, illustrating control and oversight rather than a literal escaped machine.',
    published, modified,
    related: ['ai-alignment-problem-explained','agi-vs-superintelligence-risks','could-ai-kill-us-all','how-to-prevent-catastrophic-ai-risk'],
    body: a06
  },
  {
    slug: 'ai-cyberattacks-critical-infrastructure',
    title: 'AI Cyberattacks and Critical Infrastructure: Could AI Trigger a Systemic Digital Crisis?',
    shortTitle: 'AI Cyberattacks & Critical Infrastructure',
    description: 'How AI changes cyber offense and defense, the limits of current autonomous hacking, and why critical infrastructure, cloud systems, software supply chains, and human access controls matter.',
    eyebrow: 'Cyber risk',
    primaryQuery: 'AI cyberattacks critical infrastructure risk',
    keywords: ['AI cyberattacks', 'AI critical infrastructure risk', 'AI hacking', 'autonomous cyber attacks', 'AI cybersecurity'],
    answer: 'AI can already assist with coding, vulnerability analysis, reconnaissance, and parts of cyber operations, but it does not make every attack automatic or successful. Systemic risk grows when capable models are connected to privileged tools, exposed to insecure infrastructure, or used by skilled attackers at scale.',
    image: makeImages('ai-cyberattacks-critical-infrastructure'),
    imageAlt: 'A digital city and critical infrastructure network protected by a luminous shield while an AI-driven cyber signal probes the perimeter.',
    published, modified,
    related: ['how-could-ai-kill-humanity','can-ai-become-uncontrollable','how-to-prevent-catastrophic-ai-risk','ai-biosecurity-risks'],
    body: a07
  },
  {
    slug: 'ai-biosecurity-risks',
    title: 'AI Biosecurity Risks: What Advanced Models Could Change About Biological and Chemical Threats',
    shortTitle: 'AI Biosecurity Risks',
    description: 'A safety-focused overview of AI and biological risk: scientific assistance, dual-use capabilities, real-world bottlenecks, current evidence, safeguards, and why details must be handled responsibly.',
    eyebrow: 'Biosecurity',
    primaryQuery: 'AI biosecurity risks',
    keywords: ['AI biosecurity risk', 'AI biological weapons risk', 'AI chemical risk', 'AI biotechnology safety', 'frontier AI bio risk'],
    answer: 'Advanced AI can lower some knowledge and troubleshooting barriers in biology and chemistry, while laboratory access, materials, tacit skills, and physical execution remain major real-world constraints. The risk is dual-use: the same capabilities can accelerate medicine and beneficial research, so safeguards must reduce misuse without publishing operationally dangerous detail.',
    image: makeImages('ai-biosecurity-risks'),
    imageAlt: 'A DNA helix integrated with an abstract AI circuit and a protective containment symbol, illustrating dual-use biosecurity risk without depicting harmful procedures.',
    published, modified,
    related: ['how-could-ai-kill-humanity','ai-cyberattacks-critical-infrastructure','how-to-prevent-catastrophic-ai-risk','could-ai-kill-us-all'],
    body: a08
  },
  {
    slug: 'autonomous-weapons-ai-war',
    title: 'Autonomous Weapons and AI War: Escalation, Human Control, and the Risks That Matter',
    shortTitle: 'Autonomous Weapons & AI War',
    description: 'A non-sensational guide to military AI, autonomous weapons, decision speed, target identification, escalation risk, accountability, and meaningful human control.',
    eyebrow: 'Military AI',
    primaryQuery: 'autonomous weapons AI war risk',
    keywords: ['autonomous weapons AI', 'AI war risk', 'military AI', 'killer robots', 'meaningful human control'],
    answer: 'The core danger is not a movie-style robot rebellion. It is the possibility that automation compresses decision time, scales targeting or surveillance, introduces brittle errors, creates accountability gaps, or interacts with strategic weapons and cyber systems in ways humans cannot reliably supervise.',
    image: makeImages('autonomous-weapons-ai-war'),
    imageAlt: 'Abstract unmanned systems and a human decision node separated by a bright control boundary, representing military AI and meaningful human oversight.',
    published, modified,
    related: ['how-could-ai-kill-humanity','can-ai-become-uncontrollable','how-to-prevent-catastrophic-ai-risk','humanoid-robots-risk-safety'],
    body: a09
  },
  {
    slug: 'humanoid-robots-risk-safety',
    title: 'Humanoid Robots and AI Safety: What Changes When Artificial Intelligence Gets a Body?',
    shortTitle: 'Humanoid Robots & AI Safety',
    description: 'Humanoid robots turn software decisions into physical actions. Learn what embodiment changes, which risks are realistic, how permissions should work, and why appearance can distort human trust.',
    eyebrow: 'Embodied AI',
    primaryQuery: 'humanoid robots AI safety',
    keywords: ['humanoid robots risk', 'AI robot safety', 'embodied AI', 'humanoid AI danger', 'physical AI'],
    answer: 'A humanoid body adds physical reach, mobility, sensors, and social cues to an AI system, but it does not automatically create general intelligence or consciousness. Safety depends on bounded permissions, fail-safe hardware, task constraints, cybersecurity, monitoring, and human factors such as overtrust in human-like machines.',
    image: makeImages('humanoid-robots-risk-safety'),
    imageAlt: 'A humanoid robot and a human standing in a modern city with visible safety boundaries and permission zones, representing embodied AI oversight.',
    published, modified,
    related: ['is-ai-conscious-sentient','autonomous-weapons-ai-war','can-ai-become-uncontrollable','could-ai-kill-us-all'],
    body: a10
  },
  {
    slug: 'is-ai-conscious-sentient',
    title: 'Is AI Conscious or Sentient? What We Know, What We Cannot Test Yet, and Why the Question Matters',
    shortTitle: 'Is AI Conscious or Sentient?',
    description: 'Fluent language is not proof of consciousness. This guide separates intelligence, agency, self-models, sentience, and moral status while explaining the scientific and philosophical uncertainty.',
    eyebrow: 'Consciousness',
    primaryQuery: 'is AI conscious or sentient',
    keywords: ['is AI conscious', 'is AI sentient', 'AI consciousness', 'AI self awareness', 'machine consciousness'],
    answer: 'There is currently no accepted scientific test showing that today’s language models are conscious or sentient. They can produce convincing self-reports and model aspects of themselves and others, but those behaviors do not by themselves establish subjective experience. The uncertainty becomes ethically important if future systems gain stronger persistent agency or architectures linked to credible theories of consciousness.',
    image: makeImages('is-ai-conscious-sentient'),
    imageAlt: 'An abstract artificial intelligence profile facing a luminous field of neural and cosmic patterns, illustrating the unresolved question of machine consciousness.',
    published, modified,
    related: ['humanoid-robots-risk-safety','ai-alignment-problem-explained','agi-vs-superintelligence-risks','could-ai-kill-us-all'],
    body: a11
  },
  {
    slug: 'how-to-prevent-catastrophic-ai-risk',
    title: 'How Do We Prevent Catastrophic AI Risk? A Layered Safety Strategy for Advanced Systems',
    shortTitle: 'How to Prevent Catastrophic AI Risk',
    description: 'No single kill switch can secure advanced AI. This guide explains layered safeguards: evaluations, access controls, sandboxing, cybersecurity, staged deployment, incident response, monitoring, governance, and international coordination.',
    eyebrow: 'Safeguards',
    primaryQuery: 'how to prevent catastrophic AI risk',
    keywords: ['prevent AI catastrophe', 'AI safety measures', 'AI safeguards', 'frontier AI safety', 'AI risk management'],
    answer: 'The strongest approach is defense in depth: measure dangerous capabilities before deployment, restrict access and permissions, secure model weights and infrastructure, monitor for misuse and anomalous behavior, isolate high-risk tools, preserve human override, stage releases, prepare incident response, and align organizational incentives with safety thresholds.',
    image: makeImages('how-to-prevent-catastrophic-ai-risk'),
    imageAlt: 'Multiple protective layers surrounding an AI system and Earth, representing defense-in-depth for catastrophic AI risk management.',
    published, modified,
    related: ['could-ai-kill-us-all','ai-alignment-problem-explained','can-ai-become-uncontrollable','ai-cyberattacks-critical-infrastructure'],
    body: a12
  }
];

export const articleMap = Object.fromEntries(articles.map((article) => [article.slug, article]));
