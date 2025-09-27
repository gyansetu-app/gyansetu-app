from manim import *

class BasicScene(Scene):
    def construct(self):
        # 1. Introduce the topic: Pythagorean Theorem
        title = Text("Pythagorean Theorem", font_size=60)
        self.play(Write(title))
        self.wait(1.5)
        self.play(FadeOut(title))
        self.wait(0.5)

        # 2. Display the formula
        formula_text = Text("a² + b² = c²", font_size=72)
        self.play(Write(formula_text))
        self.wait(2)

        # 3. Explain the context of the formula
        context_intro = Text("This formula applies to:", font_size=40).next_to(formula_text, DOWN, buff=1.0)
        self.play(FadeIn(context_intro))
        self.wait(1)

        triangle_type = Text("A RIGHT-ANGLED TRIANGLE", font_size=48, color=YELLOW).next_to(context_intro, DOWN, buff=0.4)
        self.play(FadeIn(triangle_type))
        self.wait(1.5)

        # 4. Explain what 'a', 'b', and 'c' represent
        ab_explain = Text("where 'a' and 'b' are the lengths of the two shorter sides (legs).", font_size=36).next_to(triangle_type, DOWN, buff=0.8)
        self.play(FadeIn(ab_explain))
        self.wait(2)

        c_explain = Text("And 'c' is the length of the longest side (hypotenuse).", font_size=36).next_to(ab_explain, DOWN, buff=0.4)
        self.play(FadeIn(c_explain))
        self.wait(3)

        # 5. Fade out all the current text
        all_elements = VGroup(formula_text, context_intro, triangle_type, ab_explain, c_explain)
        self.play(FadeOut(all_elements))
        self.wait(1)

        # Optional: A concluding remark
        conclusion = Text("Essential for geometry and trigonometry!", font_size=48)
        self.play(Write(conclusion))
        self.wait(2)
        self.play(FadeOut(conclusion))
        self.wait(0.5)