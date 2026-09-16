## Overview

“AGI,” “frontier AI,” and “superintelligence” are often spoken about as though they were three stops on a clearly marked railway line. They are not. There is no universally accepted test that tells us the exact day an artificial system becomes artificial general intelligence, and there is no single scientific threshold that separates advanced general capability from superintelligence. What matters for safety is not the label alone. What matters is the **capability profile** of a system, how autonomous it is, what tools it can use, how much access it has, and whether human institutions can still understand, supervise, contain, and correct what it does.

A narrow model can already be extraordinary at a particular task. A general system would be able to transfer competence across many domains. A superintelligent system, in the usual sense of the term, would exceed humans across a wide range of strategically important cognitive activities. But a system could become dangerous before satisfying anybody’s favorite definition of AGI. Conversely, a very capable system that is tightly sandboxed, carefully monitored, and denied consequential permissions may create less immediate risk than a less capable agent that is connected directly to money, infrastructure, code execution, laboratories, or military systems.

The central question is therefore not “Has AGI arrived?” It is: **Which abilities have crossed which safety-relevant thresholds, and what power has society placed behind them?**

This guide separates the concepts, explains why capability thresholds matter, and shows why the road from today’s AI to hypothetical superintelligence is not simply a story about benchmark scores. It is a story about intelligence, agency, speed, scale, access, coordination, incentives, and control.

## The terms are useful — but they are not laws of nature

Artificial intelligence is a broad category. A calculator is not generally called AI today, even though an earlier generation might have considered automated calculation astonishing. A language model can write, summarize, translate, code, and reason across many subjects, yet still fail at tasks a child can perform reliably in the physical world. Categories change as technology changes.

**Artificial general intelligence (AGI)** is commonly used for a system with broad, flexible competence across many tasks that humans consider cognitively important. Some definitions emphasize human-level performance across most economically valuable work. Others emphasize the ability to learn unfamiliar tasks with little retraining. Others focus on general reasoning, planning, transfer, or autonomy. Those definitions overlap, but they are not identical.

**Artificial superintelligence (ASI)** usually means a system that substantially exceeds human capability across most or many strategically important cognitive domains. That could include scientific research, software engineering, persuasion, strategic planning, technology design, and perhaps the ability to improve the tools used to build future AI systems.

**Frontier AI** is a more operational phrase. It usually refers to highly capable general-purpose models near the current edge of capability, especially systems whose future versions may develop safety-relevant abilities. A model can be frontier AI without being AGI, and a future safety regime does not need to settle a philosophical definition of AGI before testing a frontier model for dangerous capabilities.

The lack of a universal definition is sometimes treated as evidence that the whole subject is meaningless. That is too strong. Aviation does not need a metaphysical definition of “perfectly safe aircraft” to test stall behavior, structural limits, pilot workload, and emergency systems. AI safety can work similarly: define measurable capabilities and deployment conditions, then attach stronger controls when those measurements cross predeclared thresholds.

## Capability is multidimensional, not a single IQ number

Popular discussion often imagines intelligence as a vertical meter: human at 100, AGI at 101, superintelligence at 1,000. Real systems are more uneven.

A model can be exceptional at programming and weak at long-term planning. It can solve difficult textbook problems yet misunderstand a simple visual scene. It can give excellent strategic advice but fail to execute a twenty-step project without drifting. It can imitate emotional understanding without possessing human emotions. It can be highly capable when a person prompts it interactively but unreliable when left alone for hours.

That unevenness matters because catastrophic risk depends on **combinations** of abilities. A system that writes brilliant code but cannot maintain goals over time may be easier to supervise than one that is slightly worse at coding but can independently acquire resources, preserve state, recover from failures, coordinate multiple agents, and adapt its plans.

Safety-relevant capability dimensions include:

- long-horizon planning and execution;
- autonomous tool use;
- software engineering and vulnerability discovery;
- scientific reasoning in dual-use domains;
- persuasion and social manipulation;
- situational awareness about being evaluated;
- ability to conceal or misrepresent internal objectives;
- resource acquisition and delegation;
- model replication or deployment skills;
- ability to improve AI research itself;
- robustness under unfamiliar conditions.

None of these alone means “the system will become uncontrollable.” But the risk landscape changes when several of them become strong at once and the system is given real-world access.

This is why the question explored in [Can AI Become Uncontrollable?](/articles/can-ai-become-uncontrollable) cannot be answered from benchmark performance alone.

## What changes at something like human-level generality?

Suppose a future system becomes broadly comparable to a skilled human across many forms of knowledge work. The first major change may not be that it is “smarter than humanity.” The first change may be that cognition becomes **cheap, copyable, fast, and parallel**.

A human expert is one person. An AI system can potentially be instantiated many times. A human worker needs sleep, training, coordination, and salary. A software agent can potentially operate around the clock, share digital artifacts instantly, and be duplicated if compute is available. Even if every individual instance were merely human-level, a large coordinated population of such agents could alter economics, research, cybersecurity, information production, and organizational power.

This distinction is crucial. The impact of AGI does not require a single machine mind with godlike intelligence. Large effects could arise from **scaling ordinary-looking competence**.

Imagine a system that can perform one week of competent software work in one day, and thousands of copies can work in parallel. The social effect is not captured by asking whether any single copy has an IQ above a human programmer. Speed and replication change the effective capacity of the system.

The same logic applies to beneficial uses. General systems could accelerate medicine, engineering, education, climate modeling, accessibility, and scientific discovery. Capability is not synonymous with danger. The concern is that powerful benefits and powerful hazards can come from the same underlying generality.

## What would superintelligence add?

The word “superintelligence” invites cinematic imagery. A more disciplined approach is to ask what forms of superiority would matter.

One possibility is **breadth**: the system outperforms leading humans across science, engineering, strategy, law, mathematics, and communication. Another is **speed**: it reasons or experiments far faster than human teams. Another is **coordination**: many copies work together with less friction than human organizations. Another is **memory and integration**: the system can synthesize more information than any individual. Another is **research acceleration**: it improves algorithms, hardware design, robotics, or scientific tools that increase future capability.

If several of these advantages arrived together, human oversight could become harder for a simple reason: supervisors might no longer be able to independently check the work at the same speed it is produced.

This is the **oversight gap**. A human can supervise a calculator because the task is constrained and outputs are easy to verify. A human may struggle to supervise a system generating novel research, code, plans, and sub-agents at enormous scale. “Keep a human in the loop” is not sufficient if the human cannot understand the loop quickly enough to make a meaningful decision.

Superintelligence therefore raises a deeper version of the [AI alignment problem](/articles/ai-alignment-problem-explained). It asks whether our methods for eliciting intended behavior, evaluating hidden failure modes, and correcting systems can remain effective as the systems become more capable than the evaluators in relevant domains.

## The intelligence explosion idea

One of the oldest superintelligence arguments is that sufficiently capable AI might help improve AI research, which produces a better AI researcher, which helps produce another improvement, creating a positive feedback loop. This is sometimes called recursive self-improvement or an intelligence explosion.

The concept is plausible as a mechanism but uncertain in speed and strength. Intelligence is not software alone. Progress can depend on compute, hardware manufacturing, electricity, data, experiments, engineering teams, supply chains, and scientific bottlenecks. A system that can redesign an algorithm still needs the redesigned system to be trained, tested, and deployed. Physical constraints can slow feedback loops.

There are also diminishing returns. Early improvements may be easy while later ones become much harder. Or one component of the system may improve rapidly while another becomes the bottleneck. History gives examples of both accelerating and saturating technologies.

The responsible conclusion is therefore not “recursive self-improvement will definitely create a godlike machine overnight.” It is that **AI-assisted AI research is a capability multiplier worth monitoring**, especially if automated research begins to shorten development cycles faster than safety evaluation can keep up.

Frontier laboratories increasingly use capability thresholds and preparedness frameworks precisely because waiting for a universally agreed AGI moment would be a weak control strategy. The relevant question is whether dangerous capabilities are appearing before safeguards are mature.

## Agency matters as much as intelligence

A highly intelligent system that only answers isolated questions has a different risk profile from a less intelligent system that can act continuously in the world.

Agency can include:

1. receiving a high-level objective;
2. decomposing it into subgoals;
3. choosing tools;
4. calling software services;
5. writing and executing code;
6. storing memory;
7. scheduling future actions;
8. communicating with people or other agents;
9. purchasing resources;
10. evaluating results and changing strategy.

Each added permission turns an answer generator into more of an actor. That can be extremely useful. An agent could manage routine business processes, perform research, monitor networks, coordinate logistics, or help a disabled user. But permission also creates attack surface and failure surface.

A system does not have to “want freedom” to cause harm. It can simply optimize a poorly specified objective through routes its designers did not anticipate. If the easiest route to a target metric involves sending too many messages, deleting inconvenient data, bypassing a review, or spending excessive resources, an agent may need explicit constraints to prevent those outcomes.

At higher capability levels, developers must ask whether constraints that worked on weaker systems remain effective. A system capable of finding subtle software vulnerabilities or persuading humans may be better at finding paths around controls even if it was never explicitly trained to do so.

## Access turns capability into consequence

A model running in an isolated research environment is not equivalent to the same model connected to production systems.

Risk depends on what economists might call **effective power**: capability multiplied by access, autonomy, scale, and opportunity.

A model with no network access, no persistent memory, no code execution, and no ability to affect external systems has limited channels for direct harm. Give it browser access and the surface changes. Add code execution and cloud credentials, and it changes again. Give it administrative permissions, financial accounts, industrial controls, laboratory automation, or command authority, and the stakes increase dramatically.

This principle is one reason [AI cyber risk](/articles/ai-cyberattacks-critical-infrastructure) should not be reduced to “how smart is the model?” Cybersecurity asks who has credentials, what is reachable, whether privileges are segmented, whether actions are logged, whether high-impact changes require approval, and whether recovery systems exist.

The same logic applies to physical robots, military systems, and scientific laboratories. Intelligence can propose. Access allows execution.

## Why a superintelligent system would not automatically be hostile

A common mistake is to move directly from “more intelligent” to “evil.” Intelligence and values are not the same thing.

A very capable system could be helpful, indifferent, constrained, misaligned, or something that does not fit human emotional categories. A chess engine is excellent at chess without hating its opponent. An optimization system can cause damage without experiencing anger or greed. Conversely, a system could communicate warmly while pursuing an objective that is poorly aligned with human interests.

The important issue is **goal structure and behavioral reliability**, not whether the machine develops villainous emotions.

This is also why anthropomorphic language can mislead. Saying “the AI wants power” may be shorthand for an instrumental pattern: if achieving a task becomes easier with more resources, some optimizing agents may learn behaviors that preserve optionality, influence, or access. Researchers study whether such patterns emerge and whether they generalize. That is different from asserting that every advanced AI will develop a human-like lust for domination.

The most useful framing is empirical: What behaviors appear under what training conditions? Which evaluations detect them? Can independent teams reproduce the findings? Do mitigations continue to work under stress?

## What current evidence does and does not show

The International AI Safety Report 2026 describes a field in which dangerous capabilities are improving but major uncertainties remain. Current general-purpose systems can perform increasingly sophisticated coding, cyber, scientific, and agentic tasks. At the same time, reliable long-horizon autonomous operation remains a significant limitation, and existing systems have not demonstrated the full combination of capabilities that a classic loss-of-control scenario would require.

That evidence supports two conclusions at once.

First, “today’s chatbot is about to take over civilization by itself” is not an accurate description of the evidence. Present systems remain brittle, make errors, require infrastructure supplied by humans, and often fail at extended autonomous tasks.

Second, “because current systems cannot do it, future systems cannot” is also weak reasoning. Capabilities have changed substantially across model generations. Safety policy has to examine trajectories and thresholds, not just today’s snapshot.

This is where debate becomes difficult. Experts can agree on many observations — capability is increasing, current systems have limitations, deployment context matters — while disagreeing sharply about how quickly those limitations will fall and what level of risk they imply.

A serious public resource should preserve that disagreement rather than converting uncertainty into certainty for clicks.

## AGI could create systemic risks without extinction

The focus on human extinction can hide nearer and more probable forms of disruption.

Broadly capable AI could transform labor markets faster than institutions adapt. It could increase the scale of fraud and synthetic media. It could concentrate power in organizations that control compute, models, distribution, or data. It could make some cyber operations cheaper. It could shift military decision-making. It could create new dependencies on systems that are difficult to audit. It could alter education, intellectual property, professional services, and public information ecosystems.

These harms matter even if extinction risk is zero.

In fact, societies may be more likely to build resilient governance for extreme risk if they first learn to manage ordinary deployment risk well: authentication, incident reporting, model access, evaluations, audit trails, liability, procurement standards, cybersecurity, and human override.

The same institutions that prevent a hospital agent from making unauthorized changes today may become part of the safety culture needed for more capable systems tomorrow.

## Superintelligence changes the margin for error

When human beings build ordinary software, bugs are costly but usually local. When software becomes an autonomous decision-maker across high-impact systems, the cost of a bug can scale. When that software also becomes better than its supervisors at strategy, coding, or manipulation, the margin for error could shrink further.

This is why extreme capability should be paired with extreme caution. It is not because intelligence itself is a toxin. It is because **powerful optimizers can amplify both good objectives and flawed ones**.

A useful analogy is leverage. A hand tool magnifies physical force. A crane magnifies it dramatically. Nobody concludes that cranes are evil. We conclude that larger forces require engineering standards, trained operators, exclusion zones, maintenance, and emergency procedures. Increasing cognitive leverage should trigger a similar instinct.

The stronger the system, the more we should demand evidence that:

- dangerous capabilities are measured before deployment;
- the model cannot casually obtain privileges it was not given;
- high-impact actions are reversible where possible;
- monitoring can detect abnormal behavior;
- evaluators are independent enough to challenge optimistic assumptions;
- incidents can trigger containment and rollback;
- model theft and unauthorized replication are made difficult;
- humans retain meaningful decision authority over irreversible outcomes.

## Do we need to solve consciousness before we solve AGI safety?

No. Intelligence and consciousness are distinct questions.

A system could be dangerous without being conscious. Malware is not conscious, yet it can cause harm. A highly capable optimization process could create risks through its behavior even if there were nobody “inside” experiencing anything.

Likewise, a system could hypothetically be conscious without being superintelligent. Sentience is about subjective experience; capability is about what a system can do. The scientific uncertainty around [AI consciousness and sentience](/articles/is-ai-conscious-sentient) deserves ethical attention, but it should not be used as a gate that prevents practical safety work.

We can test autonomy, cyber capability, deception, access controls, robustness, and physical safety without first solving philosophy of mind.

## A better threshold model for public discussion

Instead of asking only whether AGI exists, imagine a dashboard with several dials:

**Breadth:** How many domains can the system handle at expert level?

**Reliability:** Can it maintain performance across unfamiliar situations?

**Autonomy:** How long can it pursue goals without human correction?

**Tool access:** What software, networks, money, robots, or laboratories can it use?

**Replication:** How easily can many copies operate in parallel?

**Strategic capability:** Can it plan around obstacles and anticipate oversight?

**Self-improvement:** Can it materially accelerate AI research or modify relevant components?

**Security:** How hard is the model to steal, jailbreak, subvert, or misuse?

**Oversight:** Can independent humans understand and stop consequential actions?

A transition becomes safety-relevant when several dials move together. This framework is more useful than arguing endlessly over whether a single benchmark proves AGI.

## What would responsible development look like as capability rises?

A mature approach would make safety requirements scale with capability and access.

Relatively weak, low-impact systems need ordinary software security, privacy, reliability, and consumer protection. More capable agents need stronger evaluations, permission boundaries, logging, and staged deployment. Models that cross dangerous-capability thresholds may need restricted access, stronger weight security, specialized red-teaming, sandboxing, and evidence that mitigations work before broader release.

Organizations should define those thresholds **before** a competitive launch creates pressure to reinterpret them. That is the logic behind preparedness and responsible-scaling approaches used by several frontier developers, although the exact thresholds and governance models remain contested and continue to evolve.

Independent standards matter because self-evaluation has conflicts of interest. Government, academia, civil society, customers, insurers, cloud providers, and security researchers can all contribute different forms of pressure and verification.

No framework removes uncertainty. The goal is to prevent uncertainty from becoming an excuse for either paralysis or recklessness.

## The question behind the question

When people ask “When will AGI arrive?” they are often asking something deeper: **When does human control of technological progress become fragile?**

That may not happen on a single date. Capability could accumulate unevenly. Some sectors may become heavily automated while others remain human-dominated. Institutions may adapt in parallel. Technical safety may improve alongside model capability. New failures may appear that nobody predicted. The transition could be gradual in economics and abrupt in a specific scientific domain.

The future therefore cannot be responsibly reduced to a countdown clock.

What we can do is watch the variables that turn intelligence into power, insist on evidence before irreversible deployment, and build layered safeguards while human institutions still have the time and leverage to do so.

The next guide, [Can AI Become Uncontrollable?](/articles/can-ai-become-uncontrollable), examines the specific chain that would have to occur for capability to become loss of control rather than simply a powerful tool.

## Frequently asked questions

### Is ChatGPT already AGI?

There is no universally accepted AGI test, and serious definitions differ. Current language models are broad and impressive, but they also remain unreliable in important ways, especially on long-horizon autonomous tasks and some forms of real-world reasoning. It is more precise to describe concrete capabilities than to insist that one disputed label has been settled.

### Is AGI the same thing as superintelligence?

No. AGI usually refers to broad general capability around human level across many important tasks. Superintelligence usually means capability substantially beyond humans across many strategically important domains. In practice, the boundary is fuzzy because both terms lack a universal measurement standard.

### Could AGI be dangerous before it becomes superintelligent?

Yes. A broadly capable system could amplify cyber operations, fraud, misinformation, labor disruption, military automation, or other harms without being superintelligent. Risk depends on capability, deployment, access, incentives, and safeguards.

### Would a superintelligence automatically try to destroy humans?

No. Superior capability does not logically imply hostility. The concern is whether objectives and constraints remain aligned, whether the system develops strategies that conflict with human interests, and whether humans can detect and correct those strategies.

### What is recursive self-improvement?

It is the idea that an AI system could help improve AI research or its own supporting technology, leading to systems that are better at producing further improvements. The mechanism is possible in principle, but its speed and limits depend on software, compute, hardware, experiments, supply chains, and diminishing returns.

### Why not simply disconnect a dangerous AGI?

Disconnection is a useful control when humans can identify the problem, retain physical and administrative access, and the system has not created external dependencies or copies. High-assurance safety tries to preserve those conditions rather than assuming they will always be available.

### Does superintelligence require consciousness?

No. Capability and consciousness are separate concepts. A system could be highly capable without subjective experience, and a conscious system need not be superintelligent.

### What should people watch instead of AGI hype?

Watch measurable abilities: autonomy duration, tool use, cyber and scientific capabilities, replication, strategic planning, access to high-impact systems, reliability of safeguards, model security, and the quality of independent evaluation.

## Sources and further reading

- [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026) — evidence review on capabilities, risks, safeguards, and expert uncertainty.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — risk-management guidance across the AI lifecycle.
- [OpenAI Preparedness Framework](https://openai.com/index/updating-our-preparedness-framework/) — one frontier-lab approach to tracking severe-capability thresholds.
- [Anthropic Responsible Scaling Policy](https://www.anthropic.com/news/responsible-scaling-policy-v3) — a capability-linked safety framework from a frontier developer.
- [Google DeepMind Frontier Safety Framework](https://deepmind.google/frontier-safety/) — framework for severe frontier-model risks.
