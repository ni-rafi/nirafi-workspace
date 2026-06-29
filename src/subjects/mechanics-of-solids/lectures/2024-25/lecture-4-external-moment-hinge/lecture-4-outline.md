# Lecture 4 Outline: External Moments, Inclined Forces & Internal Hinges

## Syllabus & References

1. **Strength of Materials**, 4th edition.
   * *Authors*: Andrew Pytel and Ferdinand Leon Singer
   * *Sections*: 4-1, 4-2, 4-3, 4-4
2. **Strength of Materials**, Multicolour Edition (2008).
   * *Author*: R.S. Khurmi
   * *Sections*: 13.15 – 13.19

---

## Part 1: External Moment (Pages 7 to 14)

### Page 7: Section Divider
* **Title**: "External Moment"
* **Pedagogical Purpose**: To introduce a major new structural complexity into the course: how concentrated, externally applied couples or moments alter internal shear and bending moment diagrams compared to standard transverse loads.
* **Connection to previous slide**: Closes out the preceding topic of Lecture 4 (likely standard reactions or introductory review) to shift focus toward torque and rotational effects.
* **Connection to next slide**: Introduces a physical model that generates this exact type of rotational force action.

### Page 8: Physical Model - Bracket
* **Title/Visual**: A simply supported beam with an attached vertical rigid bracket fixed at node $C$. A vertical point load of $1.2\text{ kN}$ acts downwards at the tip of the bracket arm, extending $2\text{m}$ horizontally away from node $C$.
* **Pedagogical Purpose**: To provide students with a realistic, physical engineering scenario (an eccentric or bracketed load) that naturally induces a rotational moment onto the main beam line.
* **Connection to previous slide**: Fulfills the topic announced on the section cover page (Page 7).
* **Connection to next slide**: Sets up an intuitive qualitative question: *how will this structural frame physically deform under this load?*

### Page 9: Deflection Visualization
* **Title/Visual**: The identical beam layout, but the geometry is animated to show exaggerated elastic deflection. The rigid bracket tilts clockwise, causing the main beam axis to pull upward to the left of node $C$ and sag downward to the right of node $C$.
* **Pedagogical Purpose**: To build structural intuition. Visualizing the deformed shape helps students intuitively understand that the eccentric load causes both a downward punch and a concentrated clockwise twisting effect concentrated precisely at point $C$.
* **Connection to previous slide**: An explicit visual overlay/animation of Page 8 to demonstrate the physical consequences of the load.
* **Connection to next slide**: Transitions from qualitative structural intuition into quantitative force transmission analysis.

### Page 10: Vector Resolution
* **Title/Visual**: The undeflected beam layout returns, but red vector path lines trace down the rigid bracket arm from the $1.2\text{ kN}$ load, splitting into a downward force vector and twin horizontal moment arm arrows centered at node $C$.
* **Pedagogical Purpose**: To visually illustrate Varignon's Theorem and the principle of transmissibility—showing how a remote force vector shifts down its structural attachment point to act directly upon the neutral axis of the beam.
* **Connection to previous slide**: Translates the physical bending action observed on Page 9 into a clear vector-based mechanics model.
* **Connection to next slide**: Shows the mathematical reduction resulting from this vector shift.

### Page 11: Equivalent Loading System
* **Title/Visual**: The rigid bracket arm is removed entirely. It is replaced by an equivalent loading system concentrated directly at node $C$: a downward force of $1.2\text{ kN}$ and a clockwise rotational arrow labeled $M_0 = 1.2\text{ kN} \times 2\text{ m}$.
* **Pedagogical Purpose**: To teach students how to simplify complex geometries into idealized, line-element beam diagrams ready for standard structural analysis equations.
* **Connection to previous slide**: Cleanly completes the transformation path initiated on Page 10 by removing the structural bracket scaffolding.
* **Connection to next slide**: Re-runs the elastic deflection test on this simplified model to verify its mechanical equivalence.

### Page 12: Elastic Deflection
* **Title/Visual**: The simplified single-line beam deflecting elastically under the new concentrated force-plus-couple system, showing the exact same double-curvature profile seen earlier, with the finalized equation resolved to $M_0 = 2.4\text{ kN}\cdot\text{m}$.
* **Pedagogical Purpose**: To visually prove to students that the simplified model is mechanically identical to the original complex bracket assembly because it produces the exact same structural boundary reactions and deflections.
* **Connection to previous slide**: Animates the idealized line diagram from Page 11.
* **Connection to next slide**: Pairs this example side-by-side with a new variation to solidify the concept of structural equivalence.

### Page 13: Summary Transformation
* **Title/Visual**: A summary slide displaying the transformation journey side-by-side: the physical bracket with the eccentric vertical load on the left transitions across a blue arrow to the equivalent concentrated point load and clockwise moment couple on the right ($M_0 = 2.4\text{ kN}\cdot\text{m}$).
* **Pedagogical Purpose**: To solidify the conversion rule in the student's mind before introducing a new load orientation variation.
* **Connection to previous slide**: Consolidates the complete multi-slide animation sequence of the vertical load problem into a single takeaway frame.
* **Connection to next slide**: Introduces a parallel problem where the eccentric force acts horizontally instead of vertically.

### Page 14: Parallel Transformation
* **Title/Visual**: A parallel transformation scenario: a rigid bracket of height $1.5\text{m}$ experiences a *horizontal* load of $2\text{ kN}$ acting towards the right. Across a blue arrow, it reduces to a horizontal force of $2\text{ kN}$ at the neutral axis and an equivalent clockwise moment couple of $M_0 = 1.5 \times 2 = 3\text{ kN}\cdot\text{m}$.
* **Pedagogical Purpose**: To challenge and extend the student's understanding by demonstrating that horizontal axial forces acting on eccentric brackets *also* create concentrated bending moments on a beam line.
* **Connection to previous slide**: Perfectly mirrors the instructional layout of Page 13, replacing the vertical load vector setup with a horizontal one to broaden the underlying rule.
* **Connection to next slide**: Ready to receive the next topic (Inclined Force) to see how these localized internal couple values affect global SFD and BMD curves!

---

## Part 2: Inclined Force (Pages 15 to 17)

### Page 15: Section Divider
* **Title**: "Inclined force"
* **Pedagogical Purpose**: To introduce a new structural condition: forces that act at an angle rather than perfectly perpendicular (transverse) or parallel (axial) to the beam's neutral axis. This introduces the requirement for handling multi-axis reactions.
* **Connection to previous slide**: Moves forward from the **External Moment** module (concluded on Page 14) to address a different variant of complex load configurations.
* **Connection to next slide**: Directly transitions into the visual setup of a beam carrying an off-axis point load.

### Page 16: Orthogonal Components
* **Title/Visual**: A simply supported beam experiencing a $10\text{ kN}$ point load acting downwards and to the right at a $50^\circ$ angle at node $C$. Dashed vector arrows overlay the load to resolve it into orthogonal components: a horizontal axial component labeled $10\cos(50^\circ)$ and a vertical transverse component labeled $10\sin(50^\circ)$.
* **Pedagogical Purpose**: To teach students how to apply basic vector trigonometry to simplify an off-axis force. Resolving the force into $x$ and $y$ components allows it to be processed using standard independent directional equilibrium equations ($\Sigma F_x = 0$ and $\Sigma F_y = 0$).
* **Connection to previous slide**: Fulfills the topic announced on the module cover page (Page 15).
* **Connection to next slide**: Sets up the necessary reference vectors to determine how the support boundaries ($A$ and $B$) must react to maintain equilibrium.

### Page 17: Support Reactions
* **Title/Visual**: The identical diagram layout, but formal support reaction vectors are now added at the boundaries. Pin support $A$ displays both a vertical upward reaction arrow and a horizontal leftward reaction arrow labeled $10\cos(50^\circ)$. Roller support $B$ displays a single vertical upward reaction arrow.
* **Pedagogical Purpose**: To visually demonstrate how boundary conditions respond to inclined loads. Because a roller support cannot resist horizontal movement, the entire horizontal push of the load ($10\cos(50^\circ)$ pointing right) must be counteracted entirely by the horizontal reaction at pin support $A$ pointing left to satisfy $\Sigma F_x = 0$.
* **Connection to previous slide**: Directly builds upon the component breakdown from Page 16, translating the active horizontal action vector into its matching reactive boundary vector.
* **Connection to next slide**: Proceeds to solve compound beams containing a localized internal discontinuity.

---

## Part 3: Internal Hinge (Pages 18 to 25)

### Page 18: Section Divider
* **Title**: "Internal Hinge"
* **Pedagogical Purpose**: To introduce the next major theoretical milestone: analyzing compound beams containing a localized internal discontinuity (a pin connection or hinge) that releases internal bending moment.
* **Connection to previous slide**: Moves past standard continuous beams with inclined or bracketed loads to focus on a new class of structural components.
* **Connection to next slide**: Introduces a multi-span compound beam geometry containing a physical hinge release.

### Page 19: Compound Beam System
* **Title/Visual**: A compound beam system with a fixed support at left node $A$ (cantilevered span), a roller support at right node $B$, and a physical pin-joint connector labeled **Internal Hinge $E$**. The spans carry a $2\text{ kN/m}$ UDL and a $5\text{ kN}$ point load.
* **Pedagogical Purpose**: To present the structural problem statement, challenging students to observe that the structure appears statically indeterminate globally, but possesses an internal special condition.
* **Connection to previous slide**: Directly delivers the structural system announced on the divider slide (Page 18).
* **Connection to next slide**: Sets up the standard process of defining unknown reaction components at the supports.

### Page 20: Reaction Unknowns
* **Title/Visual**: Support icon mechanisms are replaced by formal reaction vector unknowns: a vertical force $A_y$ and a counter-clockwise moment $M_A$ at fixed support $A$, and a vertical force $B_y$ at roller support $B$.
* **Pedagogical Purpose**: To transition a physical structural system into a standard free-body diagram framework, listing the 3 global reaction unknowns.
* **Connection to previous slide**: Upgrades Page 19 by overlaying standard statics notation vectors.
* **Connection to next slide**: Introduces the core solution technique for internal hinges: slicing the beam completely apart at the hinge node.

### Page 21: Segmented Left Sub-span
* **Title/Visual**: The beam is broken apart at hinge node $E$. The right sub-span ($E-B$) fades out, leaving the isolated left sub-span ($A-E$) highlighted, revealing an internal downward shear force vector $V$ at the cut, alongside the text label $M_E = 0$.
* **Pedagogical Purpose**: To visually define the fundamental rule of an internal hinge: it cannot resist rotation, meaning the internal bending moment must equal zero ($M_E = 0$) at that coordinate.
* **Connection to previous slide**: Illustrates the first half of a physical segmentation step.
* **Connection to next slide**: Shifts focus across the cut to isolate and highlight the opposite side of the structural system.

### Page 22: Segmented Right Sub-span
* **Title/Visual**: The left cantilever span ($A-E$) now fades out into the background, and the right simply supported sub-span ($E-B$) is isolated and highlighted. The internal shear vector at node $E$ reverses direction to point upward ($V$).
* **Pedagogical Purpose**: To demonstrate Newton's third law (action-reaction pairs) across a structural section cut, setting up an isolated, perfectly determinate sub-span that can be solved independently.
* **Connection to previous slide**: Flipped frame of the segmentation sequence, shifting focal priority from the left span to the right span.
* **Connection to next slide**: Executes the first moment equilibrium equation on this isolated sub-span.

### Page 23: Right Sub-span Equilibrium
* **Title/Visual**: The active right sub-span ($E-B$) features a moment summation equation written underneath: $\sum M_E = 0 \implies 5 \times 0.5 - B_y \times 1 = 0$, yielding a boxed solution for support reaction $B_y = 2.5\text{ kN}$.
* **Pedagogical Purpose**: To teach students the tactical advantage of internal hinge segmentation—by summing moments directly about the hinge of the isolated right span, the unknown internal shear force $V$ is eliminated, allowing direct calculation of support reaction $B_y$.
* **Connection to previous slide**: Applies a standard equilibrium calculus operation directly onto the free-body diagram established on Page 22.
* **Connection to next slide**: Re-integrates this resolved boundary value back into a unified global calculation frame.

### Page 24: Global Equilibrium Calculation
* **Title/Visual**: The full global beam model is brought back into sharp focus. The calculation area features two distinct lines of equilibrium equations evaluating the full system from left to right, solving for the fixed-base parameters: $M_A = 9.38\text{ kN}\cdot\text{m}$ and $A_y = 4.4\text{ kN}$.
* **Pedagogical Purpose**: To demonstrate how to use a newly resolved reaction ($B_y = 2.5\text{ kN}$) as a known boundary value to effortlessly solve the remaining global equilibrium equations for the rest of the structure ($\sum M_A = 0$ and $\sum F_y = 0$).
* **Connection to previous slide**: Pulls the resolved value of $B_y$ out of its isolated sub-span context and feeds it back into the master global model.
* **Connection to next slide**: Presents a clean, completely solved master diagram sheet ready for plotting curves.

### Page 25: Solved Master Diagram
* **Title/Visual**: All equilibrium equations disappear, leaving the master beam diagram cleanly displayed with all three verified reaction parameters prominently boxed next to their respective support boundaries: $M_A = 9.38\text{ kN}\cdot\text{m}$, $A_y = 4.4\text{ kN}$, and $B_y = 2.5\text{ kN}$.
* **Pedagogical Purpose**: To summarize the complete static equilibrium resolution phase of the problem, providing a definitive, verified numerical launchpad for drawing the upcoming SFD and BMD segments.
* **Connection to previous slide**: The final animation frame of the equilibrium calculation block, removing all mathematical scratchwork to leave a pristine engineering reference blueprint.
* **Connection to next slide**: Ready to analyze elastic deformations.

---

## Part 4: Elastic Diagram & Inflection Points (Pages 27 to 34)

### Page 27: Solved Reference Baseline
* **Title/Visual**: A multi-load overhanging beam problem displaying its completed SFD and BMD. The BMD has a positive region peaking at $108\text{ kip}\cdot\text{ft}$, passing through zero to hit a negative peak of $-48\text{ kip}\cdot\text{ft}$ at support $E$.
* **Pedagogical Purpose**: To establish a fully solved reference baseline case study. Students must have a completely verified moment diagram before they can begin mapping physical geometric curvatures.
* **Connection to previous slide**: Concludes the raw mathematical parsing of this problem to pivot toward structural deformation behavior.
* **Connection to next slide**: Clears the page for a dedicated, step-by-step primer on bending signs and physical beam shapes.

### Page 28: Empty Baseline
* **Title/Visual**: Two isolated horizontal beam segments floating side-by-side on an empty backdrop under the heading **"Elastic Diagram"**.
* **Pedagogical Purpose**: To freeze the presentation timeline and establish a clean workspace to introduce sign convention basics before mapping complex global curves.
* **Connection to previous slide**: Temporarily strips away the heavy diagram overlays from Page 27 to reduce cognitive load.
* **Connection to next slide**: Animates these blank segments to define physical curvature meanings.

### Page 29: Smile/Frown Bending Convention
* **Title/Visual**: The two beam segments bend under an animated overlay: the left segment cups upward like a smiley face labeled **"+ve bending"**, while the right segment frowns downward labeled **"-ve bending"**.
* **Pedagogical Purpose**: To physically define the link between mathematical moment signs and structural geometry: positive bending induces concave-up curvature (sagging), while negative bending induces concave-down curvature (hogging).
* **Connection to previous slide**: Fulfills the workspace layout set up on Page 28.
* **Connection to next slide**: Returns to the master calculation problem to apply these curvature building blocks.

### Page 30: Master Problem Returns
* **Title/Visual**: The identical global problem layout from Page 27 returns, serving as a re-entry frame to remind students of the core master problem details.
* **Pedagogical Purpose**: To re-establish structural context, preparing students to map the individual "+ve" and "-ve" curvature rules across the matching zones of the master BMD.
* **Connection to previous slide**: Pulls the conceptual rules validated on Page 29 back into a full-scale problem template.
* **Connection to next slide**: Isolates the BMD to slice it into segmented curvature zones.

### Page 31: Segmented Curvature Zones
* **Title/Visual**: The SFD is removed. Directly beneath the active zones of the BMD, isolated curved segments are sketched along the bottom margin: sagging shapes sit beneath the positive moment regions, and a hogging shape sits beneath the negative moment zone.
* **Pedagogical Purpose**: To teach students how to segment a deflected curve. By drawing localized boundary pieces first, students learn to treat the elastic curve as an assembly of distinct positive (concave up) and negative (concave down) geometric zones.
* **Connection to previous slide**: Applies the local sign definitions from Page 29 directly to the coordinate intervals of the master plot.
* **Connection to next slide**: Connects these disjointed local boundary pieces into a single continuous wave.

### Page 32: Joined Continuous Wave
* **Title/Visual**: The separated local boundary pieces are joined into a single, continuous, unbroken elastically deflected centerline wave across the length of the beam.
* **Pedagogical Purpose**: To demonstrate how to sketch a physically continuous elastic deflection line by satisfying both regional curvature signs and fixed support boundary zero-displacement constraints.
* **Connection to previous slide**: An explicit visual integration step, turning the isolated sketches from Page 31 into a smooth continuous function path.
* **Connection to next slide**: Formally highlights and labels this finished path on the master diagram sheet.

### Page 33: Finalized Elastic Diagram
* **Title/Visual**: A finalized orange curved strip tracks over the thin centerline path, accompanied by a clean text pointer label reading **"Elastic Diagram"**.
* **Pedagogical Purpose**: To clearly emphasize the final graphic output of the structural deflection profile within the complete master layout context.
* **Connection to previous slide**: Standardizes and cleans up the raw drawing line established on Page 32 into a polished presentation element.
* **Connection to next slide**: Highlights the exact point where the curvature behavior flips along that continuous line.

### Page 34: Inflection Point Location
* **Title/Visual**: A vertical reference grid line marks the exact location where the BMD crosses perfectly through zero. This intersection is highlighted with orange circular nodes on both the moment axis and the elastic diagram, labeled with boxes reading **"Inflection Point"**.
* **Pedagogical Purpose**: To define the absolute engineering significance of an **Inflection Point**: it is the precise geometric location where internal bending moment equals zero ($M = 0$), corresponding to where a structure physically transitions its curvature from sagging (+ve bending) to hogging (-ve bending).
* **Connection to previous slide**: Acts as the final analytical overlay frame for this module, concluding the structural transformation loop from loading down to physical shape transitions.

---

## Part 5: Load Diagram (Pages 35 to 40)

### Page 35: Section Divider
* **Title**: "Load Diagram"
* **Pedagogical Purpose**: To announce an inverse problem module. After lessons focused on drawing SFDs from load diagrams, this module flips the analytical direction, training students to read an SFD backward to construct the corresponding external beam loads.
* **Connection to previous slide**: Concludes the **Elastic Diagram** analysis (completed on Page 34) to start a fresh graphical-mechanics skillset.
* **Connection to next slide**: Directly transitions into a workspace showing a completed SFD ready to be decoded.

### Page 36: Decoded Left Reaction
* **Title/Visual**: An empty baseline for the **Load Diagram** sitting above a fully solved master SFD. A red dot highlights the very left edge of the beam line, where an upward arrow vector labeled **18 kips** is introduced.
* **Pedagogical Purpose**: To demonstrate the initial boundary condition rule: an abrupt vertical jump of $+18$ units in an SFD profile mathematically proves the existence of a concentrated upward point load or reaction force of exactly $18\text{ kips}$ acting at that coordinate support boundary.
* **Connection to previous slide**: Fulfills the workspace layout announced on the section cover page (Page 35).
* **Connection to next slide**: Advances the tracking cursor line rightward along the beam to evaluate the next diagram discontinuity.

### Page 37: Decoded Point Load
* **Title/Visual**: The cursor focus point shifts $6\text{ ft}$ to the right to node $C$. The SFD experiences an abrupt drop of $20$ units ($+18 \rightarrow -2$). A corresponding downward arrow vector appears on the load line labeled **20 kips**.
* **Pedagogical Purpose**: To illustrate the step-discontinuity rule: a sudden downward step in an SFD equals the exact magnitude of an externally applied concentrated point load acting vertically downward at that specific cross-section.
* **Connection to previous slide**: Continues the sequential progression across the span, building the load diagram piece-by-piece from left to right.
* **Connection to next slide**: Moves past a constant shear zone to check the next major change at node $D$.

### Page 38: Decoded Intermediate Point Load
* **Title/Visual**: The tracking cursor reaches node $D$, $14\text{ ft}$ from the start. The SFD steps downward by $12$ units (from $-2$ to $-14$). A matching downward point load vector appears on the beam model labeled **12 kips**.
* **Pedagogical Purpose**: To reinforce the step-drop point load rule at a mid-span location, proving that horizontal flat zones in an SFD mean zero intermediate distributed loads exist across that open interval.
* **Connection to previous slide**: Implements the identical calculus rule validated on Page 37 at the next structural node.
* **Connection to next slide**: Moves forward to evaluate a large upward jump step located at support node $E$.

### Page 39: Decoded Pier Reaction
* **Title/Visual**: The cursor moves another $10\text{ ft}$ rightward to support node $E$. The SFD jumps upward by $26$ units (from $-14$ up to $+12$). A corresponding upward force vector is added to the load diagram labeled **26 kips**.
* **Pedagogical Purpose**: To demonstrate that localized upward steps within an intermediate span line represent the concentrated upward lifting reaction forces provided by support piers or rollers.
* **Connection to previous slide**: Extends the building sequence past the mid-span point load to resolve the second major support reaction line.
* **Connection to next slide**: Explores how to interpret the final, linearly sloped segment of the shear curve.

### Page 40: Decoded UDL
* **Title/Visual**: The final $8\text{ ft}$ span segment of the beam is evaluated. The SFD slopes downward linearly from $+12$ down to $0$ at support $B$. A corresponding Uniformly Distributed Load (UDL) array is sketched over that segment, accompanied by calculation labels: **1.5 kips/ft** and a total weight block of **12 kips/ 8ft**.
* **Pedagogical Purpose**: To teach the sloped shear rule: a linear downward sloped line in an SFD represents a constant distributed load intensity ($\frac{dV}{dx} = w$). The intensity is equal to the slope gradient: $\text{Slope} = \frac{0 - 12}{8\text{ ft}} = -1.5\text{ kips/ft}$, showing that the total area drop ($1.5 \times 8 = 12$) perfectly closes the diagram back to zero equilibrium.
* **Connection to previous slide**: The final animation frame of this reverse-engineering problem, completing the master transformation sequence from shear profile back to the full structural **Load Diagram**.
