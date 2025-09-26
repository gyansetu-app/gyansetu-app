import manim

class BasicScene(manim.Scene):
    def construct(self):
        # Title
        title = manim.Text("Pythagoras Theorem", font_size=56).to_edge(manim.UP)
        self.play(manim.Write(title))
        self.wait(1)

        # Introduction
        intro_text = manim.Text(
            "For a right-angled triangle...",
            font_size=36
        ).next_to(title, manim.DOWN, buff=0.8)
        self.play(manim.FadeIn(intro_text))
        self.wait(1)

        # Draw a right-angled triangle
        # Vertices
        A = manim.Dot(manim.LEFT * 2 + manim.DOWN * 1)
        B = manim.Dot(manim.RIGHT * 2 + manim.DOWN * 1)
        C = manim.Dot(manim.LEFT * 2 + manim.UP * 2)

        # Lines
        line_ab = manim.Line(A.get_center(), B.get_center(), color=manim.BLUE)
        line_bc = manim.Line(B.get_center(), C.get_center(), color=manim.GREEN)
        line_ca = manim.Line(C.get_center(), A.get_center(), color=manim.RED)

        triangle = manim.VGroup(line_ab, line_bc, line_ca)

        self.play(manim.Create(triangle))
        self.wait(1)

        # Label the sides
        label_a = manim.Text("b", font_size=32).next_to(line_ca, manim.LEFT)
        label_b = manim.Text("a", font_size=32).next_to(line_ab, manim.DOWN)
        label_c = manim.Text("c", font_size=32).next_to(line_bc, manim.RIGHT + manim.UP * 0.5)

        self.play(
            manim.FadeIn(label_a),
            manim.FadeIn(label_b),
            manim.FadeIn(label_c)
        )
        self.wait(1)

        # Highlight right angle
        right_angle_square = manim.Square(side_length=0.4, fill_opacity=1, color=manim.YELLOW)
        right_angle_square.move_to(A.get_center()).shift(manim.RIGHT * 0.2 + manim.UP * 0.2)
        self.play(manim.FadeIn(right_angle_square))
        self.wait(1)

        # State the theorem
        theorem_text = manim.Text(
            "The square of the hypotenuse (c) is equal to\n"
            "the sum of the squares of the other two sides (a and b).",
            font_size=32
        ).to_edge(manim.DOWN)
        self.play(manim.Write(theorem_text))
        self.wait(2)

        # Show the formula
        formula = manim.MathTex("a^2 + b^2 = c^2", font_size=48).move_to(intro_text.get_center() + manim.DOWN * 1.5)
        self.play(manim.Write(formula))
        self.wait(2)

        # Conclude
        self.play(manim.FadeOut(formula), manim.FadeOut(theorem_text))
        outro_text = manim.Text("Pythagoras Theorem: a² + b² = c²", font_size=48).to_edge(manim.DOWN)
        self.play(
            manim.ReplacementTransform(intro_text, outro_text),
            manim.FadeOut(label_a),
            manim.FadeOut(label_b),
            manim.FadeOut(label_c),
            manim.FadeOut(right_angle_square),
            manim.FadeOut(triangle)
        )
        self.wait(2)