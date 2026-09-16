## Overview

Artificial intelligence can accelerate beneficial biology. It can help scientists search literature, reason about proteins, analyze experiments, design research workflows, and explore enormous spaces of possible molecules and biological mechanisms. The same broad capability creates a difficult safety question: **Could advanced AI lower barriers to harmful biological or chemical activity?**

This is a dual-use problem. Knowledge that helps researchers understand disease can sometimes be relevant to misuse. Tools that improve experimental planning can be beneficial in medicine yet risky in the wrong context. The existence of dual use does not mean AI biology should be stopped. It means capability should be paired with safeguards appropriate to the real-world consequence.

A responsible discussion must also avoid a common error: treating a language model’s ability to discuss biology as equivalent to the ability to create a dangerous biological event. Real-world biology is constrained by laboratory access, materials, tacit skill, equipment, quality control, safety practices, physical execution, and the difficulty of getting complex biological systems to behave as expected. Those bottlenecks matter enormously.

At the same time, safety cannot assume those bottlenecks will remain unchanged. AI-assisted research, laboratory automation, cheaper synthesis, and improved scientific models may gradually reduce them. The key policy question is whether AI meaningfully increases the **uplift** available to a malicious or dangerously inexperienced actor compared with the information and tools they could already obtain.

This guide explains that risk at a high level. It intentionally does **not** provide operational instructions, experimental recipes, target selection, optimization methods, or other details that could enable biological or chemical harm.

## Biosecurity is not the same as “AI invents a virus”

Headlines often compress a complicated chain into a single image: someone asks a chatbot a question and a catastrophic pathogen appears. That skips almost every difficult step.

A biological incident may involve knowledge, materials, facilities, laboratory skills, safety conditions, manufacturing, delivery, and many opportunities for failure. Biological systems are variable. Experiments can behave unpredictably. What works in a paper or simulation may not work in the physical world.

AI can influence some links in the chain, especially information processing and scientific reasoning. Whether that influence becomes dangerous depends on how much it reduces the difficulty of the overall task.

This distinction is why serious evaluations try to measure **marginal capability uplift** rather than merely asking whether a model can answer technical questions. If equivalent information is easily available in textbooks or public databases, the model may add little risk. If the model can integrate obscure information, troubleshoot failures, or guide an inexperienced user in a way that materially increases real-world success, the risk assessment changes.

The most important evidence is therefore not scary-sounding text. It is controlled measurement of what people can accomplish with and without the model under safe evaluation conditions.

## The beneficial side of AI-enabled biology

Any honest risk analysis should begin with benefits because the same capabilities are often inseparable.

AI can help researchers:

- summarize fast-moving scientific literature;
- analyze genomic and molecular datasets;
- predict aspects of protein structure and interaction;
- identify candidate molecules for further study;
- optimize benign experimental workflows;
- generate hypotheses;
- support medical and public-health analysis;
- improve diagnostic tools;
- accelerate materials and drug discovery;
- help laboratories document and reason about results.

These benefits can reduce disease burden and improve preparedness. Better modeling may help scientists understand pathogens faster during an outbreak. Automated analysis may identify promising treatments. AI-assisted surveillance may detect unusual patterns earlier.

The goal of biosecurity is therefore not to suppress biological knowledge. It is to preserve beneficial science while placing stronger controls around capabilities that materially increase the feasibility of severe misuse.

That balancing problem is one reason blunt rules based only on keywords are weak. A safer system needs context, capability evaluation, access tiers, monitoring, and human expertise.

## What “dual-use” means

A dual-use capability has legitimate beneficial applications and potential harmful applications.

A microscope is dual-use in a broad sense. So is chemistry knowledge. So are computers, drones, encryption, and synthetic biology tools. Societies rarely solve dual-use problems by banning the underlying concept. They manage risk with layered controls: professional norms, licensing where appropriate, physical security, safety standards, oversight, screening, incident reporting, and restrictions on the most dangerous uses.

AI adds two properties that make dual use more challenging.

First, **scale**. One model can potentially assist many users at once.

Second, **adaptivity**. A model can respond interactively to a user’s level of understanding, answer follow-up questions, and help troubleshoot conceptual problems.

Those properties can democratize beneficial expertise. They can also reduce some knowledge barriers. Safety policy has to distinguish ordinary scientific education from capability that meaningfully assists severe misuse.

The distinction should be evidence-driven rather than based on fear of technical vocabulary.

## The risk chain: from model capability to physical harm

A useful mental model separates at least six stages.

### Stage 1: Information access

Can a user obtain relevant scientific information? Much legitimate material is public, and that openness is foundational to science.

### Stage 2: Integration and reasoning

Can the user combine dispersed information into a coherent plan? AI may add more value here than simple search because it can synthesize and explain.

### Stage 3: Practical execution

Does the actor have the tacit skill, equipment, materials, facilities, and safety practices required to conduct real work? This remains a major bottleneck.

### Stage 4: Troubleshooting

Biological work often fails. Can an actor identify why and adapt? Interactive AI assistance could potentially reduce some skill barriers, which makes this an important evaluation target.

### Stage 5: Scale and delivery

Even successful laboratory work is not equivalent to large-scale harm. Scaling and real-world transmission or exposure create additional barriers and risks.

### Stage 6: Detection and response

Public-health surveillance, medical care, environmental monitoring, law enforcement, laboratory controls, and emergency response can interrupt the chain.

Catastrophic risk requires many stages to align. Safety can intervene at each one.

## Why tacit knowledge matters

Scientific papers contain explicit knowledge: methods, results, terminology, measurements, and theory. Laboratory competence also depends on tacit knowledge — the practical judgment built through experience.

How should a sample look? When is an instrument behaving strangely? Which variation is normal? What does contamination look like? When should an experiment be abandoned? These judgments can be difficult to encode in text.

Historically, tacit knowledge has been a meaningful barrier to sophisticated biological work. AI may gradually encode more practical guidance as models become multimodal, observe experiments, and connect to laboratory systems. But today, a text answer does not erase the physical learning curve.

This matters for public communication. Claims that “all dangerous biological expertise is now one prompt away” can exaggerate current capability and obscure the real areas where controls are needed.

The correct question is how quickly AI is converting tacit barriers into explicit, interactive assistance — and whether safeguards evolve at the same pace.

## Laboratory automation changes the equation

Embodied and automated science deserves special attention.

A model that can only provide text has no direct physical channel. A system connected to robotic laboratory equipment can potentially execute parts of an experimental workflow. This can be enormously valuable for reproducibility, high-throughput discovery, and safer handling of routine processes.

It also increases the importance of permission boundaries.

Laboratory automation should not give a general-purpose model unrestricted authority over every instrument, material, and protocol. High-consequence actions can require human approval, validated procedure libraries, physical interlocks, inventory controls, and independent monitoring.

This is the same principle discussed in [humanoid robot safety](/articles/humanoid-robots-risk-safety): embodiment and tool access turn software output into physical action.

The more capable automated science becomes, the more biological safety needs to be treated as an engineering property of the whole lab, not merely a moderation setting inside a chatbot.

## Chemical risk belongs in the same family

Many frontier-safety frameworks discuss chemical and biological risk together because advanced models can potentially assist reasoning across both domains.

As with biology, the risk should not be measured by whether the model knows chemistry. Legitimate chemistry education and research are essential. The concern is whether a model can materially facilitate severe harmful activity, especially for users who otherwise lack the expertise.

A safe public resource should avoid operational detail about harmful synthesis, optimization, quantities, delivery, or concealment. Those details are unnecessary for understanding the policy problem.

What readers do need to understand is that AI safety systems may apply stronger restrictions when conversations move from general science toward actionable high-consequence misuse. That is not evidence that ordinary chemistry is forbidden; it is an attempt to preserve beneficial access while preventing dangerous capability transfer.

## Evaluating biological uplift safely

How can researchers measure risk without creating it?

One approach uses **structured, controlled evaluations**. Participants or expert raters compare performance with and without model assistance on carefully designed tasks. The tasks can test knowledge integration, planning quality, error recognition, or other capabilities without requiring dangerous real-world execution.

Evaluations should be designed with biosecurity experts, ethics review, secure handling of sensitive details, and limits on what is published. Public reports can describe aggregate findings and safety implications without releasing the exact material that would teach misuse.

The evaluation itself can be a source of risk if researchers publish overly operational prompts, answers, or scoring rubrics. Responsible disclosure therefore matters.

The International AI Safety Report 2026 notes that frontier systems’ biological capabilities have advanced, while uncertainty remains about the extent to which model assistance translates into real-world harmful uplift. That uncertainty is precisely why recurring measurement is needed.

## Capability is not intent

A model may know facts relevant to both medicine and misuse. That does not mean the model intends harm.

Likewise, a user’s technical question is not automatically malicious. Many legitimate professionals work with dangerous materials and concepts as part of medicine, safety, agriculture, biodefense, and research.

Risk management should therefore avoid simplistic mind-reading. Systems can consider the **actionability and consequence** of requested assistance rather than trying to infer a person’s soul from a few words.

General educational explanations can remain available. Highly operational assistance that would materially enable severe harm can be restricted. Qualified environments can use controlled access for legitimate high-risk research.

This graduated approach is more defensible than either unrestricted release or broad censorship of science.

## Model access matters

There is a major difference between a publicly accessible assistant with safety controls and unrestricted access to a highly capable model’s weights.

Hosted systems can enforce authentication, rate limits, monitoring, model updates, and policy controls. They can revoke access after abuse. Openly distributed weights provide valuable benefits for research, competition, local control, and transparency, but the provider cannot later change how every copy is configured.

For ordinary models, open distribution may be low risk. For a future model with demonstrated severe biological capabilities, the risk calculus could change.

This is why some frontier frameworks link release decisions to dangerous-capability evaluations. The question is not “open versus closed” as an ideology. It is whether the capability of a specific model justifies additional controls and whether those controls are proportionate.

A strong policy should also recognize that concentration creates risks of its own. Centralized providers need oversight, security, accountability, and transparent criteria for restrictions.

## Security of model weights becomes biosecurity

If a model’s dangerous capability is high enough that access is restricted, cybersecurity becomes part of biological risk management.

Stolen model weights can defeat API-level safeguards. An attacker who possesses the model may modify filters, run unlimited queries, or fine-tune behavior. Protecting frontier-model infrastructure can therefore become analogous to protecting other sensitive dual-use assets.

Controls may include hardened data centers, strong identity, segmented networks, restricted administrator access, monitoring, secure development practices, insider-risk programs, and incident response.

This is one place where the site’s [cyber-risk guide](/articles/ai-cyberattacks-critical-infrastructure) and biosecurity guide intersect. Risk pathways are not independent. A severe AI incident may involve cyber access enabling another category of capability.

Defense in depth should therefore be designed across domains rather than in separate organizational silos.

## Public health is a powerful countermeasure

Biosecurity is not only about preventing malicious capability. It is also about reducing the consequences if prevention fails.

Strong public-health systems improve resilience against both natural and deliberate biological events. Surveillance, diagnostics, medical supply chains, rapid research, healthcare capacity, trustworthy communication, and international information sharing all reduce the chance that an outbreak becomes catastrophic.

AI can support these defenses. Models may help analyze data, accelerate research, assist clinicians, translate public information, and identify patterns. The same technology that creates dual-use concerns can strengthen response.

This creates an important strategic lesson: society should not evaluate AI biosecurity only at the model boundary. **Resilience of the physical world matters too.**

If diagnostics become faster and medical countermeasures can be developed more rapidly, the severity of some biological threats may decline even while knowledge becomes more accessible.

The balance between offense and defense is an empirical question, not a fixed law.

## Why sensational biological claims can be harmful

Exaggerated claims create at least three problems.

First, they distort public understanding. Readers may believe present models can accomplish things they cannot.

Second, sensational coverage can create an information hazard by drawing attention to harmful possibilities in an unnecessarily operational way.

Third, hype can damage the credibility of genuine biosecurity work. If dramatic predictions repeatedly fail, audiences may dismiss quieter but better-supported warnings.

Responsible communication should describe capability categories and safeguards while omitting unnecessary details about how to cause harm. It should distinguish demonstration from deployment, theory from experiment, and expert disagreement from established fact.

The aim is informed preparedness, not fear theater.

## What safeguards can frontier AI systems use?

### Capability evaluations

Test whether new models materially improve performance on carefully controlled high-risk tasks before broad deployment.

### Graduated access

Provide stronger capabilities to verified users or controlled environments when the risk justifies it, while keeping general educational use available.

### Content and action safeguards

Restrict assistance that crosses from general knowledge into operational enablement of severe harm.

### Monitoring and abuse detection

Look for patterns of misuse while protecting legitimate privacy and establishing clear governance for access to logs.

### Model security

Protect sensitive model weights and deployment infrastructure when evaluations show that unrestricted access would create severe risk.

### Laboratory controls

Use physical security, inventory management, validated procedures, access control, and human approval around automated experimentation.

### Incident response

Define what happens if a model is found to have unexpectedly dangerous capability or if safeguards are bypassed. Responses may include narrowing access, updating controls, or suspending a capability while it is investigated.

No single safeguard is enough. Each should fail safely into another layer.

## How this relates to catastrophic AI risk

Biological misuse is one of several pathways studied in discussions of [how AI could cause catastrophic harm](/articles/how-could-ai-kill-humanity). It differs from the classic “AI takeover” scenario because the proximate actor may be a human using AI as a force multiplier.

That difference matters for prevention.

A misaligned autonomous system raises questions about control, objectives, and corrigibility. Human misuse raises questions about access, authentication, monitoring, law enforcement, professional norms, and physical security. The same model can be involved in both scenarios, but the intervention points differ.

The broader lesson is that AI risk is not one problem. It is a family of problems that share some technical foundations but require different safeguards.

## What ordinary readers should take away

You do not need specialist biological knowledge to understand the core issue.

AI is making scientific reasoning more accessible. That is potentially one of the great benefits of the technology. If the systems become good enough to remove barriers that previously limited severe biological misuse, society will need stronger controls around those specific capabilities.

The existence of risk does not justify panic about every biology question. Nor does the existence of laboratory bottlenecks justify ignoring capability progress.

The rational position is **continuous measurement plus proportional safeguards**.

Ask:

- Does the model provide significant uplift over ordinary public sources?
- Does it reduce dependence on expert tacit knowledge?
- Can it interact with laboratory automation?
- Are high-risk capabilities available to anyone or controlled?
- Are model weights secure when necessary?
- Are public-health defenses improving too?
- Can safeguards be tightened quickly if evaluation results change?

Those questions keep policy connected to evidence.

## The line between openness and responsibility

Science advances through sharing. Excessive secrecy can slow medicine, concentrate power, and reduce independent verification. Excessive openness around genuinely high-consequence operational details can create avoidable risk.

There is no formula that resolves this tension perfectly.

A mature research culture can use tiered disclosure: publish high-level findings broadly, share more detailed methods with qualified reviewers, secure the most operationally sensitive information, and revisit restrictions as defenses improve.

AI developers face a similar spectrum for models, evaluations, and weights.

Transparency should tell society **what risks were tested, what governance exists, and what conclusions were reached** without necessarily publishing every artifact that would defeat the safeguard being described.

That balance is difficult, but difficulty is not an argument for pretending the tradeoff does not exist.

## Preparing without creating fear

The best biosecurity work often looks unremarkable from the outside: stronger diagnostic networks, trained laboratory staff, secure supply chains, validated equipment, better ventilation, safe waste handling, reliable medical logistics, surveillance, exercises, and international coordination.

AI-specific safety should connect to that real infrastructure.

A model policy cannot substitute for a hospital. A refusal filter cannot substitute for outbreak detection. A benchmark cannot substitute for secure laboratory practice. Conversely, physical controls alone may not be enough if digital systems begin to provide unusually powerful assistance.

Resilience comes from connecting technical AI governance to institutions that already manage biological risk.

This is the pattern developed further in [How Do We Prevent Catastrophic AI Risk?](/articles/how-to-prevent-catastrophic-ai-risk): capability evaluation at the model layer, access control at the deployment layer, and resilience at the societal layer.

## Frequently asked questions

### Can today’s AI create a biological weapon by itself?

There is no evidence that a current general-purpose model can independently carry out the complete real-world chain required to produce and deploy a sophisticated biological threat. Models can provide scientific information and reasoning, but physical execution involves substantial additional barriers.

### Why are AI companies testing biological capabilities?

Because capabilities can improve before incidents occur. Controlled evaluations help determine whether a new model materially lowers knowledge or planning barriers and whether stronger access controls are justified before deployment.

### Is biology knowledge itself dangerous?

Biology knowledge is foundational to medicine, agriculture, public health, and science. Risk depends on the actionability, context, capability uplift, and intended use of particular assistance. Responsible safety tries to protect beneficial science while limiting severe misuse enablement.

### Could AI also protect us from pandemics?

Yes. AI can potentially improve research, surveillance, diagnostics, data analysis, medical communication, and drug discovery. The offense-defense balance is one reason the technology should be governed carefully rather than treated as inherently harmful.

### What is “bio uplift”?

It is the improvement in a person’s ability to complete a relevant biological task when assisted by AI compared with an appropriate baseline, such as using ordinary public resources. The precise design of uplift evaluations is a technical research question.

### Why not publish every biosecurity evaluation for transparency?

Transparency is valuable, but some detailed prompts, scoring criteria, or model outputs could themselves reveal operationally dangerous information. High-level results can be public while sensitive details are reviewed through controlled channels.

### Do open-source AI models create biosecurity risk?

Open models provide important benefits. Risk depends on the demonstrated capability of a specific model. If a future model crosses a severe biological-capability threshold, unrestricted weights could reduce the effectiveness of access controls. Decisions should be capability-based and proportionate.

### What is the safest general principle?

Measure dangerous capability before scaling access, keep high-risk action channels constrained, strengthen physical-world biosecurity, and design safeguards that can be tightened as evidence changes.

## Sources and further reading

- [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026) — evidence review covering biological and chemical capabilities, real-world uncertainty, and safeguards.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — general AI risk-management guidance.
- [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) — generative-AI risk profile.
- [OpenAI Preparedness Framework](https://openai.com/index/updating-our-preparedness-framework/) — includes capability categories used to guide frontier-model safeguards.
- [Anthropic Responsible Scaling Policy](https://www.anthropic.com/news/responsible-scaling-policy-v3) — capability-linked safety approach from a frontier developer.
- [Google DeepMind Frontier Safety Framework](https://deepmind.google/frontier-safety/) — framework addressing severe frontier-model capabilities and mitigations.
