from manim import Scene, Text, FadeIn, Write, FadeOut, AnimationGroup, LaggedStart, UP, DOWN, ORIGIN

class BasicScene(Scene):
    def construct(self):
        # 1. Title of the theorem
        title = Text("Pythagoras Theorem", font_size=50)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(1)

        # 2. Introduction to what it explains
        intro_text_1 = Text("This theorem explains a fundamental relationship", font_size=30)
        intro_text_2 = Text("within a RIGHT-ANGLED triangle.", font_size=30)

        intro_text_1.next_to(title, DOWN, buff=0.8)
        intro_text_2.next_to(intro_text_1, DOWN, buff=0.3)

        self.play(FadeIn(intro_text_1))
        self.play(FadeIn(intro_text_2))
        self.wait(1.5)

        # 3. Present the formula
        theorem_formula = Text("a² + b² = c²", font_size=60)
        theorem_formula.move_to(ORIGIN) # Center the formula
        self.play(Write(theorem_formula))
        self.wait(2)

        # 4. Explain the components of the formula
        explanation_a_b = Text("Where 'a' and 'b' are the lengths of the two shorter sides", font_size=28)
        explanation_c = Text("And 'c' is the length of the hypotenuse (the longest side)", font_size=28)

        explanation_a_b.next_to(theorem_formula, DOWN, buff=0.8)
        explanation_c.next_to(explanation_a_b, DOWN, buff=0.3)

        self.play(
            FadeIn(explanation_a_b),
            FadeIn(explanation_c)
        )
        self.wait(3)

        # 5. A simple summary
        summary_text_1 = Text("In essence: The square of the two shorter sides,", font_size=25)
        summary_text_2 = Text("when added, equals the square of the longest side.", font_size=25)

        summary_text_1.next_to(explanation_c, DOWN, buff=1)
        summary_text_2.next_to(summary_text_1, DOWN, buff=0.2)

        self.play(
            LaggedStart(
                FadeIn(summary_text_1),
                FadeIn(summary_text_2),
                lag_ratio=0.7 # Make them appear slightly after each other
            )
        )
        self.wait(3)

        # 6. Fade out all elements
        self.play(
            FadeOut(title),
            FadeOut(intro_text_1),
            FadeOut(intro_text_2),
            FadeOut(theorem_formula),
            FadeOut(explanation_a_b),
            FadeOut(explanation_c),
            FadeOut(summary_text_1),
            FadeOut(summary_text_2)
        )
        self.wait(1)