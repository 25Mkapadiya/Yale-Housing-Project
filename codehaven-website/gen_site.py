import os, html

ROOT = "/home/user/Yale-Housing-Project/codehaven-website"

def esc(s):
    return s  # content is trusted/authored, keep markdown-lite formatting intact

def head(title, desc, prefix):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} · Code Haven Curriculum</title>
  <meta name="description" content="{desc}">
  <link rel="icon" href="{prefix}assets/favicon.ico">
  <link rel="stylesheet" href="{prefix}styles.css">
</head>
<body>
'''

def header(prefix, active):
    def cls(key):
        return ' class="active"' if key == active else ''
    return f'''  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="{prefix}index.html">
        <img src="{prefix}assets/logo.png" alt="Code Haven logo">
        <span>Code Haven Curriculum</span>
      </a>
      <nav class="site-nav">
        <ul>
          <li><a href="{prefix}lessons.html"{cls('lessons')}>Lesson Plans</a></li>
          <li><a href="{prefix}about.html"{cls('about')}>About</a></li>
          <li><a href="{prefix}faq.html"{cls('faq')}>FAQs</a></li>
        </ul>
      </nav>
    </div>
  </header>
'''

def footer(prefix):
    return f'''  <footer class="site-footer">
    <div class="footer-links">
      <a href="{prefix}lessons.html">Lesson Plans</a>
      <a href="{prefix}about.html">About</a>
      <a href="{prefix}faq.html">FAQs</a>
      <a href="{prefix}guestbook.html">Guestbook</a>
    </div>
    <a class="btn-primary" href="https://www.codehavenyale.com">Code Haven Website</a>
    <div class="copyright">© Code Haven Curriculum, Powered by Jekyll &amp; TeXt Theme.</div>
  </footer>
'''

TAIL = '''</body>
</html>
'''

def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w") as f:
        f.write(content)
    print("wrote", path, len(content))

# ----------------------------------------------------------------
# Week data
# ----------------------------------------------------------------

weeks = [
    dict(
        n=1, slug="week-1", topic="Introduction to Computer Science and Scratch",
        objectives=["Introduce computer science", "Create student groups", "Introduce Scratch"],
        materials_note="box, wrapping paper, tape, scissors, name tags, folders, sticker sheets",
        materials=[
            ("Lesson Plan", "https://drive.google.com/open?id=10dzuF52k5ceHPmHzmMG2YBKTk4wA3RqxGW6Su1AM-q8"),
            ("Worksheet", "https://drive.google.com/open?id=1p4BvVFWij5q1kqrJEmtonAcdoEwmUaXabjkaH8RNH-I"),
            ("Worksheet Solution", "https://scratch.mit.edu/projects/379918045/"),
            ("Presentation", "https://drive.google.com/open?id=14J_n43yNtxCOylPKlyuwmlBjFTYqn646ysUIkxApMyo"),
        ],
        agenda=[
            ("10 min", "Introduction", "Learn names and play icebreaker activity"),
            ("10 min", "What is CS?", "Watch a video, discuss what computer science is"),
            ("10 min", "Unplugged Activity", "Gift wrapping activity!"),
            ("25 min", "Introduction to Scratch", "Watch Scratch tutorial, make accounts, work on scavenger hunt worksheet"),
            ("5 min", "Wrap up", "Recap, demo the final maze activity"),
        ],
        cheat_sheet="https://drive.google.com/file/d/1ndrnZxA1OVSXp6b4z0ZJV3ePsPDaQmXC/view?usp=sharing",
        videos=[
            ("Introduction", "45s", "https://www.youtube.com/watch?v=ahWEsguPdzM"),
            ("What is CS?", "1min 30s", "https://www.youtube.com/watch?v=sY0EBmENJew"),
            ("Unplugged Activity", "4min", "https://www.youtube.com/watch?v=Y4UaqOFjQF0"),
            ("Worksheet Walkthrough", "6min", "https://www.youtube.com/watch?v=BOENw2vnAc0"),
            ("Final Project Overview: the Maze Game", "2min", "https://www.youtube.com/watch?v=tqAL5m_kJok"),
            ("Recap", "30s", "https://www.youtube.com/watch?v=X6mBIXD2pTc"),
        ],
        worksheet_heading="Worksheet",
        parts=[
            dict(title="Part 1: Scavenger Hunt", intro="", images=["img1.png"],
                 steps=[
                     "Click 'create' on Scratch's home screen to make a new project",
                     "Name your new project “Scratch Scavenger Hunt”",
                     "Drag any blue motion block from the left side of your screen and click on it.",
                 ],
                 question="What is the name of the block you chose? What happens to your cat when you click on the block?",
                 images2=["img2.png"],
                 steps2=["Snap your blocks together and click on one of them"],
                 question2="What does your cat do now? How is that different from what it did before?"),
            dict(title="Part 2: Explore On Your Own!",
                 intro="Look through the different blocks and play with the ones you find interesting! Explore Scratch on your own! Ask your mentor for help if you need ideas.",
                 images=[], steps=[],
                 question="What are the names of 3 blocks you liked?"),
        ],
    ),
    dict(
        n=2, slug="week-2", topic="Conditionals, Character Movement",
        objectives=["Introduce conditionals", "Practice using conditionals in Scratch"],
        materials_note="Deck of cards",
        materials=[
            ("Lesson Plan", "https://drive.google.com/open?id=13VB839YxdWDWEBXBlt75WXVhkkFLmMroSKGPEWjy5W4"),
            ("Worksheet", "https://drive.google.com/open?id=1XuW8xvdvpa7S6OUAW31WEsVIxzO0keHYDTNnA6vo7rs"),
            ("Worksheet Solution", "https://scratch.mit.edu/projects/379919522/"),
            ("Presentation", "https://drive.google.com/open?id=14pfAjcnXcf8WobTBZNSVVLoYFIhi_LNZhyaGLOWk3fg"),
        ],
        agenda=[
            ("10 min", "Introduction", "Icebreaker and review of last week"),
            ("10 min", "Unplugged Activity", "Card game activity!"),
            ("5 min", "Live Coding", "Demonstrate how to use conditionals in Scratch"),
            ("25 min", "Worksheet", "Log into Scratch accounts and work on the worksheet"),
            ("5 min", "Wrap up", "See how conditionals fit with the maze activity"),
        ],
        cheat_sheet="https://drive.google.com/file/d/16qC7GV-GyedRwrondWMOs09ar5kfhkOX/view?usp=sharing",
        videos=[
            ("Introduction", "1min", "https://www.youtube.com/watch?v=OqjTYdrfJag"),
            ("Unplugged Activity", "2min", "https://www.youtube.com/watch?v=-F3VH6h3-Eo"),
            ("Live Coding", "6min", "https://www.youtube.com/watch?v=T5CNRzfVYss"),
            ("Worksheet Walkthrough", "9min", "https://www.youtube.com/watch?v=-bPRRN7WUxY"),
            ("Recap", "1min", "https://www.youtube.com/watch?v=izk7RKDZjrU"),
        ],
        worksheet_heading="Worksheet",
        parts=[
            dict(title="Part 1: Cats on the Run!", intro="Let’s make the Scratch Cat run away from the mouse pointer!",
                 images=["img1.png"],
                 steps=["First, set up the program so that it starts when we click the flag and runs forever.",
                        "Then, create a conditional that runs if the pointer gets too close to Scratch.",
                        "Finally, complete the conditional to make Scratch run away from the pointer!"],
                 extra_image=("Here's a block bank to get you started!", "bb1.png")),
            dict(title="Part 2: A Wild Cat Chase!",
                 intro="Let’s make the Scratch Cat run towards the mouse whenever it’s held down! Whenever the user lets go of the mouse, Scratch should spin around!",
                 images=["img2.png"],
                 steps=["Again, set up the program so that it starts when we click the flag and runs forever.",
                        "Next, create a conditional that runs if the mouse is held down.",
                        "Finally, complete the conditional to make Scratch run to the pointer or spin around!!"],
                 extra_image=("Here are the blocks you should use!", "bb2.png")),
            dict(title="Part 3: Upside-Downsizing!",
                 intro="Let’s make Scratch grow or shrink when we press the arrow keys!",
                 images=["img3.png"],
                 steps=["One more time, set up the program so that it starts when we click the flag and runs forever.",
                        "Now, create two conditionals: one that runs if the up arrow, and one that runs if the down arrow is pressed.",
                        "Finally, complete the conditionals to make Scratch grow or shrink!"],
                 extra_image=("Here's one more block bank, but beware! You might need to use some of these twice!", "bb3.png")),
        ],
        discuss=[
            "How do conditionals fit into our maze game?",
            "What else can you imagine doing in Scratch with conditionals?",
            "Where do you see conditionals in your daily life?",
        ],
    ),
    dict(
        n=3, slug="week-3", topic="Loops, Randomness",
        objectives=["Introduce and practice the concept of loops",
                    "Ensure that students understand the difference between while (repeat until) and for (repeat x times) loops in Scratch"],
        materials_note="None",
        materials=[
            ("Lesson Plan", "https://drive.google.com/open?id=1vYh85Un-C9A8tvYibRUlcqSHaGt3sM7NA21uvZ6NVJc"),
            ("Worksheet", "https://drive.google.com/open?id=1Ztr21yt8VHugcqSct5s49SXgu-bFiuSuYoETd7GmLpA"),
            ("Worksheet Solution — Part 1", "https://scratch.mit.edu/projects/379924355/"),
            ("Worksheet Solution — Part 2", "https://scratch.mit.edu/projects/379923194/"),
            ("Worksheet Solution — Part 3", "https://scratch.mit.edu/projects/379925596/"),
            ("Presentation", "https://drive.google.com/open?id=1izhyaZXC8RVuVCO2vXgeNjz4FPeg26jJoSWCqM2Q-ck"),
        ],
        agenda=[
            ("5 min", "Introduction", "Review conditionals"),
            ("10 min", "Unplugged Activity", "Dance Party activity!"),
            ("10 min", "Live Coding", "Demonstrate types of loops in Scratch"),
            ("30 min", "Worksheet", "Log into Scratch accounts and work on the worksheet"),
            ("5 min", "Wrap up", "See how loops fit with the maze activity"),
        ],
        cheat_sheet="https://drive.google.com/file/d/1PIynUwSKo55HSybjRD5XStQBIu6G-o5h/view?usp=sharing",
        videos=[
            ("Introduction", "45s", "https://www.youtube.com/watch?v=GuWcEXplCjc"),
            ("Unplugged Activity", "2min", "https://www.youtube.com/watch?v=lHq7cFsa37w"),
            ("Live Coding", "6min", "https://www.youtube.com/watch?v=AU740b7apAE"),
            ("Worksheet Walkthrough", "11min", "https://www.youtube.com/watch?v=WHxqnhkV2_Q"),
            ("Recap", "30s", "https://www.youtube.com/watch?v=Q8248cjnvI8"),
        ],
        worksheet_heading="Worksheet",
        parts=[
            dict(title="Part 1: Painting in Scratch!", intro="Let’s make the Scratch Cat paint a line on the screen!",
                 images=["img1.png"],
                 steps=["Click the + button in the bottom left corner and add the pen extension to your Scratch environment",
                        "First, make the cat put the pen down when the flag is clicked",
                        "Then, make the cat take 20 steps forward and wait 1 second. This should repeat 10 times."],
                 extra_image=("Here's the Block Bank:", "bb1.png"),
                 question="What does your cat draw when you click the flag?"),
            dict(title="Part 2: Painting With Many Colors!", intro="Let’s make the Scratch Cat draw a multicolored shape on the screen!",
                 images=["img2.png"],
                 steps=["Again, make Scratch put the pen down when we press the flag.",
                        "Then, make the Scratch Cat move 50 steps, turn 45 degrees, and change pen colors — 8 times in a row."],
                 extra_image=("Here's the Block Bank:", "bb2.png"),
                 question="What’s the difference between what your cat draws in part 1 and part 2? What new blocks are used in part 2?"),
            dict(title="Part 3: Randomness!", intro="Let’s make the Scratch Cat draw a picture that includes random elements!",
                 images=["img3.png"],
                 steps=["Again, make Scratch put the pen down when we press the flag.",
                        "Now, create a loop that will repeat 100 times.",
                        "Inside the loop, move a random number of steps, turn a random number of degrees, and change pen color by a random number.",
                        "Finally, add a block to make sure that Scratch will bounce when he hits the edge of the screen!"],
                 extra_image=("Here are some blocks to get you started:", "bb3.png")),
        ],
        discuss=["Can you change your drawing so that it uses two loops?",
                 "How else can we use randomness to make your drawing even more unique?"],
    ),
    dict(
        n=4, slug="week-4", topic="Variables, Conditionals",
        objectives=["Introduce the concept of variables", "Practice using variables in Scratch",
                    "Ensure that students know when to use variables in their coding"],
        materials_note="Envelopes, slips of paper for each student",
        materials=[
            ("Lesson Plan", "https://drive.google.com/open?id=1VDl3XSgpBZOJAZXcgwAoc_yelKL7cXz6amnn_7xVawM"),
            ("Worksheet", "https://drive.google.com/open?id=1NfGzW9qEZeMhcs9OTQdoFBD1gci_l3A6QMVIHIPtebE"),
            ("Worksheet Solution", "https://scratch.mit.edu/projects/379931714/"),
            ("Presentation", "https://drive.google.com/open?id=1jMm6FrYxKxwvn_k9-erEohVc6wSnqp-hc0cDweeMi_M"),
        ],
        agenda=[
            ("10 min", "Introduction", "Review loops and conditionals"),
            ("10 min", "Unplugged Activity", "Mad Libs activity!"),
            ("5 min", "[Optional] Live Coding", "Demonstrate variables in Scratch, use \"ask\" and \"join\" blocks"),
            ("30 min", "Worksheet", "Log into Scratch accounts and work on the worksheet"),
            ("5 min", "Wrap up", "See how variables fit with the maze activity"),
        ],
        videos=[],
        worksheet_heading="Worksheet",
        parts=[
            dict(title="Part 1: Scratching an Itch!", intro="Let’s have the Scratch Cat keep track of how many times we hover over him!",
                 images=["img1.png"],
                 steps=["First, set up the program so that it starts when we click the flag and runs forever. We should also set the variable to 0 at first.",
                        "Next, create a conditional that runs if the pointer is touching Scratch.",
                        "Finally, complete the conditional to make the variable increase, and then wait a second!"],
                 extra_image=("Here's the Block Bank:", "bb1.png")),
            dict(title="Part 2: Count Scratchula!",
                 intro="Scratch is already keeping track of how many times we touch him, but he should be able to tell us how many! When we press the spacebar, Scratch should say “You touched me ___ times!” and then reset his count.",
                 images=["img2.png"],
                 steps=["Create a new conditional that runs if we press the spacebar!",
                        "When we do, Scratch should say how many times we touched him, and then reset the variable."],
                 extra_image=("Here's the Block Bank:", "bb2.png")),
            dict(title="Part 3: A Visit to Dr. Scratch!",
                 intro="The Scratch cat is hungry! Eating cake makes him more powerful, but running into a pufferfish hurts him. Let’s keep track of his health level!",
                 images=["img3.png"],
                 steps=["First, set up the program so that it starts when we click the flag and runs forever. We should also set Scratch’s health variable to 10, and make him draggable."],
                 extra_image=(None, "bb31.png"),
                 steps2=["Next, create two conditionals that run if Scratch runs into the cake or the pufferfish.",
                         "Finally, complete each conditional to make the variable increase or decrease."],
                 extra_image2=(None, "bb32.png"),
                 steps3=["Add another conditional to have Scratch say “Power up!” if his health gets too low. He should then reset his health to 10."],
                 extra_image3=(None, "bb33.png")),
        ],
        discuss=["Can you change your drawing so that it uses two loops?",
                 "How else can we use randomness to make your drawing even more unique?"],
    ),
    dict(
        n=5, slug="week-5", topic="Coordinate Plane, Movement",
        objectives=["Introduce and practice the concept of coordinates",
                    "Understand how we can change x and y coordinates to make a Sprite (character) move"],
        materials_note="Treasure Hunt worksheet",
        materials=[
            ("Treasure Hunt worksheet", "https://drive.google.com/open?id=170rc8PcbMsOjUpwzcACI3NwAf2seUrZuRN2DMWgh-Ks"),
            ("Lesson Plan", "https://drive.google.com/open?id=11OWAQwI0b0nw6I13je9Ji5EUYoS6kw6xUHnMzigRA8c"),
            ("Worksheet", "https://drive.google.com/open?id=1rnJdg4q1quKC4zpIRGiU5O_dDDt8XFMo9Gyw_Gm15Nc"),
            ("Worksheet Solution — Part 1", "https://scratch.mit.edu/projects/379936362/"),
            ("Worksheet Solution — Part 2", "https://scratch.mit.edu/projects/379938822/"),
            ("Presentation", "https://drive.google.com/open?id=1ET4Xll4KaG6YiNtz6cbxUDlPvIzTVhyPYRxgvkfljvw"),
        ],
        agenda=[
            ("5 min", "Introduction", "Review variables"),
            ("10 min", "Unplugged Activity", "Review coordinates and do Treasure Hunt activity"),
            ("5 min", "Live Coding", "Show how to use coordinates in Scratch"),
            ("30 min", "Worksheet", "Log into Scratch accounts and work on the worksheet"),
            ("5 min", "Wrap up", "See how coordinates fit with the maze activity"),
        ],
        videos=[],
        worksheet_heading="Worksheet",
        parts=[
            dict(title="Part 1: Moving in Scratch!", intro="Let’s make the Scratch cat move up, down, left, and right with arrows!",
                 images=["img1.png"],
                 steps=["Make the program run forever when the flag is pressed",
                        "Make four conditionals, one for each arrow button that can be pressed",
                        "Add the correct direction inside each arrow conditional"],
                 extra_image=("Here's the Block Bank:", "bb1.png"),
                 question="How are we using coordinates to make the Scratch cat move?"),
            dict(title="Part 2: Splatter Painting!",
                 intro="Let's keep working on the last part! When we press the spacebar, Scratch should go somewhere random. Also, Scratch should use the pen to make cool drawings as he moves!",
                 images=["img2.png"],
                 steps=["Click the + button to give Scratch a pen.",
                        "Inside our loop from the last activity, add one more conditional to check if the spacebar is pressed!",
                        "When it is, Scratch should move randomly.",
                        "Outside our loop, make Scratch put the pen down!"],
                 extra_image=("Here's the Block Bank:", "bb2.png")),
            dict(title="Part 3: Apple Chasing!",
                 intro="Don't get rid of your last project yet — it's time to make a game! Whenever Scratch runs into the apple, he should get a point, and the apple should run away from him!",
                 images=["img3.png"],
                 steps=["Add a new sprite with the + Sprite button!",
                        "We need a new variable 'score.' When we click the flag, the score should be set to 0.",
                        "Then, we should have a loop that runs forever, checking each time if Scratch is touching the apple.",
                        "When he is, he should get a point and the apple should move!"],
                 extra_image=(None, "bb3.png")),
        ],
    ),
    dict(
        n=6, slug="week-6", topic="Game Design",
        objectives=["Apply coordinates to the game design process!"],
        materials_note="None",
        materials=[
            ("Lesson Plan", "https://drive.google.com/open?id=14-NxCD6bIkEZVVJLU4RlrasxC_l0rqS5R3BBnXB0__E"),
            ("Worksheet", "https://drive.google.com/open?id=11Th9ErVbP9gbHyC6OwwKvOUkQIhpCV53K1CBYJ8pono"),
            ("Week 6/7 Completed Maze", "https://scratch.mit.edu/projects/379997943/"),
            ("Presentation", "https://drive.google.com/open?id=1ttHJ63b1lnw03QZp5g6hFioGTG4j05ycTxVTHIIYYZo"),
        ],
        agenda=[
            ("5 min", "Introduction", "Review coordinates and explain the maze game"),
            ("5 min", "[Optional] Live Coding", "Work through parts 1 and 2 of the worksheet together"),
            ("45 min", "Worksheet", "Log into Scratch accounts and work on the worksheet"),
            ("5 min", "Wrap up", "Review worksheets and see how far students got"),
        ],
        videos=[],
        worksheet_heading="Worksheet",
        parts=[
            dict(title="Part 1: Getting Our Maze!", intro="Get your very own copy of the maze game to build on this week.",
                 images=["img1.png"],
                 steps=["Go to tinyurl.com/Code-Haven-Maze-Game",
                        "Click the See Inside button",
                        "Sign in to your Scratch account",
                        "Click the Remix button",
                        "Rename your project “Maze Game”"],
                 caption="Your maze should look like this!"),
            dict(title="Part 2: Moving in Scratch!", intro="Let’s make the Scratch cat move up, down, left, and right with arrows!",
                 images=["img2.png"],
                 steps=["Make the program run forever when the flag is pressed.",
                        "Make four conditionals, one for each arrow button that can be pressed",
                        "Add the correct direction inside each arrow conditional"],
                 extra_image=("Here's a block bank to get you started!", "bb2.png")),
            dict(title="Part 3: From the Window…", intro="When Scratch runs into a wall, he should teleport back to the start!",
                 images=["img3.png"],
                 steps=["The blocks below should go in Scratch’s forever loop!",
                        "We should have a conditional that runs when Scratch hits the wall color, sending him to the start and making him say a sad message."],
                 extra_image=("Here's a block bank to get you started!", "bb3.png")),
            dict(title="Part 4: Field Goal!", intro="When Scratch gets to the green area, he should say an encouraging message!",
                 images=["img4.png"],
                 steps=["Add one more conditional that runs when Scratch gets to the end!",
                        "Write a fun message for him to say to the game player :)"],
                 extra_image=(None, "bb4.png")),
        ],
    ),
    dict(
        n=7, slug="week-7", topic="Game Design",
        objectives=["Apply coordinates to the game design process!"],
        materials_note="None",
        materials=[
            ("Lesson Plan", "https://drive.google.com/open?id=1vrBSSUcQEfKuMjCRLQkwNAxEJSgIA_dXHJ4hsK75lvs"),
            ("Week 6 Worksheet", "https://drive.google.com/open?id=11Th9ErVbP9gbHyC6OwwKvOUkQIhpCV53K1CBYJ8pono"),
            ("Challenge Worksheet", "https://drive.google.com/open?id=1O6jnFuYKs2M4crQCivFpE4_rtN_PewQkXjsmrcdp3cY"),
            ("Week 6/7 Completed Maze", "https://scratch.mit.edu/projects/379997943/"),
        ],
        agenda=[
            ("5 min", "Introduction", "Explain what we're doing this week: making our mazes even better!"),
            ("5 min", "[Optional] Live Coding", "If needed, clear up confusion from the previous week"),
            ("45 min", "Worksheet", "Finish last week's worksheet and work on challenges"),
            ("5 min", "Wrap up", "Review worksheets and have students publish their projects"),
        ],
        videos=[],
        worksheet_heading="Challenge Worksheet",
        parts=[
            dict(title="Make a start page!", intro="We want to welcome people to our maze, so let’s make a start screen!",
                 images=[],
                 steps=["First, choose a new backdrop for your maze by pressing the button in the bottom right corner.",
                        "Then, play around with these blocks to make a start page!"],
                 extra_image=(None, "bb1.png")),
            dict(title="Make a “you win” page!",
                 intro="Let’s reward our players for beating the maze with a “you win” screen. It’s very similar to making a start page, so use the blocks above!",
                 images=[], steps=[]),
            dict(title="Add a points system!", intro="When players get to the end or touch an object, they should get a point!",
                 images=[],
                 steps=["First, make your own variable by pressing the make a variable button under the variables tab.",
                        "Then, think about when you want your cat to earn points! For example, you could earn points when you win, when you touch a certain object, or when you press a certain keyboard key.",
                        "Set up a conditional that will check if this has happened, and then increases the points variable!"],
                 extra_image=("Here are some blocks to start with:", "bb2.png")),
            dict(title="Add more levels!", intro="This is a tricky one! Here are some questions to think about:",
                 images=[],
                 steps=["When should my cat play a new level?", "Should the rules be different in the new level?",
                        "How is the code similar in the new level?",
                        "Consider making a new background and using these blocks to get started:"],
                 extra_image=(None, "bb3.png")),
            dict(title="Add sounds!", intro="Cats love to meow! Let’s make our Scratch cat speak out loud as he plays the game. Here are some blocks to start with:",
                 images=[], steps=[], extra_image=(None, "bb4.png")),
            dict(title="Make your cat teleport!",
                 intro="Add some teleportation portals to your maze! When the cat reaches a teleportation portal, it should change locations.",
                 images=[],
                 steps=["How should you change the maze background so that teleportation makes sense?",
                        "Make sure you figure out the coordinates correctly!",
                        "Here are some blocks to get started with:"],
                 extra_image=(None, "bb5.png")),
        ],
    ),
]

print("weeks loaded:", len(weeks))

# ----------------------------------------------------------------
# Lesson page renderer
# ----------------------------------------------------------------

def render_steps_block(steps, extra_image, img_prefix):
    out = ""
    if steps:
        out += '        <ol class="worksheet-steps">\n'
        for s in steps:
            out += f'          <li>{s}</li>\n'
        out += '        </ol>\n'
    if extra_image:
        caption, fname = extra_image
        out += '        <div class="worksheet-figure">\n'
        if caption:
            out += f'          <figure><figcaption>{caption}</figcaption><img src="{img_prefix}{fname}" alt="Scratch block bank"></figure>\n'
        else:
            out += f'          <img src="{img_prefix}{fname}" alt="Scratch block bank">\n'
        out += '        </div>\n'
    return out

def render_part(part, img_prefix):
    out = f'      <div class="worksheet-part">\n'
    out += f'        <h3>{part["title"]}</h3>\n'
    if part.get("intro"):
        out += f'        <p>{part["intro"]}</p>\n'
    if part.get("images"):
        out += '        <div class="worksheet-figure">\n'
        for img in part["images"]:
            out += f'          <img src="{img_prefix}{img}" alt="{part["title"]} screenshot">\n'
        out += '        </div>\n'
    if part.get("caption"):
        out += f'        <p><em>{part["caption"]}</em></p>\n'
    out += render_steps_block(part.get("steps"), part.get("extra_image"), img_prefix)
    if part.get("question"):
        out += f'        <div class="worksheet-question">Question: {part["question"]}</div>\n'
    if part.get("images2"):
        out += '        <div class="worksheet-figure">\n'
        for img in part["images2"]:
            out += f'          <img src="{img_prefix}{img}" alt="{part["title"]} screenshot">\n'
        out += '        </div>\n'
    out += render_steps_block(part.get("steps2"), part.get("extra_image2"), img_prefix)
    if part.get("question2"):
        out += f'        <div class="worksheet-question">Question: {part["question2"]}</div>\n'
    out += render_steps_block(part.get("steps3"), part.get("extra_image3"), img_prefix)
    out += '      </div>\n'
    return out

def render_week(w, prefix="../"):
    img_prefix = f'{prefix}assets/images/{w["slug"].replace("-", "")}/'
    # slug is "week-1" -> folder is "week1"
    folder = "week" + str(w["n"])
    img_prefix = f'{prefix}assets/images/{folder}/'

    body = head(f'Week {w["n"]}', f'Code Haven Week {w["n"]}: {w["topic"]}', prefix)
    body += header(prefix, "lessons")
    body += f'''  <section class="lesson-hero">
    <div class="wrap">
      <p class="breadcrumb"><a href="{prefix}lessons.html">Lesson Plans</a><span>/</span>Week {w["n"]}</p>
      <span class="topic-badge">Topics: {w["topic"]}</span>
      <h1>Code Haven Week {w["n"]}</h1>
    </div>
  </section>

  <div class="lesson-body">
    <div class="card">
      <h2>Week {w["n"]} Overview</h2>
      <h3>Objectives</h3>
      <ul class="obj-list">
'''
    for o in w["objectives"]:
        body += f'        <li>{o}</li>\n'
    body += '      </ul>\n\n      <h3>Materials and Resources</h3>\n      <ul class="materials-list">\n'
    body += f'        <li>Materials needed: {w["materials_note"]}</li>\n'
    for label, url in w["materials"]:
        body += f'        <li><a href="{url}" target="_blank" rel="noopener">{label}</a></li>\n'
    body += '      </ul>\n\n      <h3>Lesson Plan Overview</h3>\n      <ol class="agenda-list">\n'
    for time_, label, desc in w["agenda"]:
        body += f'        <li><span class="agenda-time">{time_}</span><span><strong>{label}:</strong> {desc}</span></li>\n'
    body += '      </ol>\n'

    if w.get("videos"):
        body += '\n      <h3>Video Materials</h3>\n'
        body += '      <p>We\'ve produced exciting videos that go over the topics outlined in our lesson plan. These can serve as inspiration for how you could conduct your lessons.'
        if w.get("cheat_sheet"):
            body += f' If you or the students don\'t have time to watch the videos, <a href="{w["cheat_sheet"]}" target="_blank" rel="noopener">check out our quick cheat sheet</a>.'
        body += '</p>\n      <ul class="video-list">\n'
        for label, length, url in w["videos"]:
            body += f'        <li><a href="{url}" target="_blank" rel="noopener">{label}</a> <span class="video-length">({length})</span></li>\n'
        body += '      </ul>\n'

    body += '    </div>\n\n    <div class="card">\n'
    body += f'      <h2>{w["worksheet_heading"]}</h2>\n'
    for part in w["parts"]:
        body += render_part(part, img_prefix)
    if w.get("discuss"):
        body += '      <h3>Questions to Discuss</h3>\n      <ul class="obj-list">\n'
        for q in w["discuss"]:
            body += f'        <li>{q}</li>\n'
        body += '      </ul>\n'
    body += '    </div>\n  </div>\n\n'

    # prev/next pager
    body += '  <div class="lesson-pager">\n'
    if w["n"] > 1:
        body += f'    <a class="prev" href="week-{w["n"]-1}.html"><span class="pager-label">Previous</span>Week {w["n"]-1}</a>\n'
    else:
        body += f'    <a class="prev" href="{prefix}lessons.html"><span class="pager-label">Back to</span>All Lessons</a>\n'
    if w["n"] < 7:
        body += f'    <a class="next" href="week-{w["n"]+1}.html"><span class="pager-label">Next</span>Week {w["n"]+1}</a>\n'
    else:
        body += f'    <a class="next" href="{prefix}guestbook.html"><span class="pager-label">Try it out</span>Guestbook</a>\n'
    body += '  </div>\n\n'

    body += footer(prefix)
    body += TAIL
    return body

for w in weeks:
    write(f'lessons/{w["slug"]}.html', render_week(w))

# ----------------------------------------------------------------
# lessons.html (archive)
# ----------------------------------------------------------------

lessons_body = head("Lesson Plans", "The full 7-week Code Haven curriculum, from Scratch basics to a finished maze game.", "")
lessons_body += header("", "lessons")
lessons_body += '''  <section class="hero">
    <h1>Lesson Plans</h1>
    <p>Seven weeks, one Scratch project: students build a playable maze game while picking up the fundamentals of computer science along the way.</p>
  </section>

  <main style="padding-top: 3rem;">
    <div class="lesson-grid">
'''
for w in weeks:
    lessons_body += f'''      <a class="lesson-card" href="lessons/{w["slug"]}.html">
        <span class="week-num">Week {w["n"]}</span>
        <h3>{w["topic"]}</h3>
        <span class="lesson-link">View lesson &rarr;</span>
      </a>
'''
lessons_body += '''      <a class="lesson-card guestbook-card" href="guestbook.html">
        <span class="week-num">Sandbox</span>
        <h3>Guestbook</h3>
        <span class="lesson-topic">Try editing a page yourself — no setup required.</span>
        <span class="lesson-link">Open guestbook &rarr;</span>
      </a>
    </div>
  </main>
'''
lessons_body += '\n'
lessons_body += footer("")
lessons_body += TAIL
write("lessons.html", lessons_body)

print("done: weeks + lessons.html")

# ----------------------------------------------------------------
# index.html (home)
# ----------------------------------------------------------------

home = head("Home", "Open Source Code Haven Curriculum — a 7-week computer science course built by Yale students for New Haven middle schoolers.", "")
home += header("", "home")
home += '''  <section class="home-hero">
    <h1>Computer science, one classroom at a time.</h1>
    <p class="lede">Code Haven is a Yale student organization teaching computer science in New Haven middle schools. This is our full curriculum, free and open source for any classroom to use.</p>
    <div class="home-cta">
      <a class="primary" href="lessons.html">Browse the Curriculum</a>
      <a class="secondary" href="about.html">About Code Haven</a>
    </div>
  </section>

  <div class="stats">
    <div class="stat-card"><span class="stat-number">2016</span><span class="stat-label">Founded</span></div>
    <div class="stat-card"><span class="stat-number">180+</span><span class="stat-label">Students taught</span></div>
    <div class="stat-card"><span class="stat-number">7</span><span class="stat-label">Classrooms</span></div>
    <div class="stat-card"><span class="stat-number">50+</span><span class="stat-label">Mentors</span></div>
  </div>

  <section class="home-section">
    <div class="section-heading">
      <h2>The curriculum</h2>
      <a href="lessons.html">View all 7 weeks &rarr;</a>
    </div>
    <div class="lesson-grid" style="margin-top: 1.5rem;">
'''
for w in weeks[:3]:
    home += f'''      <a class="lesson-card" href="lessons/{w["slug"]}.html">
        <span class="week-num">Week {w["n"]}</span>
        <h3>{w["topic"]}</h3>
        <span class="lesson-link">View lesson &rarr;</span>
      </a>
'''
home += '''    </div>
  </section>

  <section class="home-section alt">
    <div class="section-heading"><h2>Why it works</h2></div>
    <div class="home-blurb" style="margin-top: 1.5rem;">
      <div class="blurb-card">
        <span class="blurb-icon">1</span>
        <h3>Low mentor ratio</h3>
        <p>Over 50 mentors keep small-group discussions and individual attention at the center of every lesson.</p>
      </div>
      <div class="blurb-card">
        <span class="blurb-icon">2</span>
        <h3>Build toward one project</h3>
        <p>Every week adds a new concept — conditionals, loops, variables, coordinates — directly into a maze game students finish and publish.</p>
      </div>
      <div class="blurb-card">
        <span class="blurb-icon">3</span>
        <h3>Open and editable</h3>
        <p>Every lesson plan is a page you can suggest edits to. See the <a href="guestbook.html">guestbook</a> for a live example.</p>
      </div>
    </div>
  </section>

'''
home += footer("")
home += TAIL
write("index.html", home)

# ----------------------------------------------------------------
# faq.html
# ----------------------------------------------------------------

faqs = [
    ("Who do you recommend this curriculum for?",
     "<p>This curriculum was designed for students with no previous computer science experience. We believe that the pace of the curriculum is a good fit for students in the middle school age range, and older students may need more of a challenge. We still hope that teachers with younger or older students will find this resource useful and make the appropriate modifications for their students.</p>"
     "<p>We created this website with the intended audience of K-12 educators, student groups at other universities interested in using our curriculum to teach computer science, and individual students who want to learn CS on their own.</p>"),
    ("Do I need to have prior computer science knowledge to use this curriculum?",
     "<p>While any previous experience with computer science will be beneficial, it is definitely possible to learn alongside the students and use our curriculum without it. We would encourage you to spend more time reading through our detailed lesson plans which provide explanations of how to teach the weekly concepts, and be sure to work through the worksheets ahead of time and review our solutions in Scratch. We will also be coming out with tutorial videos soon!</p>"),
    ("How can I modify this curriculum to work in a classroom without several mentors?",
     "<p>Here are some ways to make the curriculum more usable for teachers who don't have mentors in their classroom:</p>"
     "<ul>"
     "<li>Spend more time on the lecture and unplugged activities</li>"
     "<li>Do more live coding examples, and consider working through parts of the worksheet as a whole class</li>"
     "<li>Talk through the entire worksheet as a class and address potential challenges before allowing students to start coding on their own</li>"
     "<li>Change the pacing of the curriculum and spend more than one hour per week on each lesson</li>"
     "</ul>"),
    ("How can I make changes to this curriculum or give you feedback?",
     "<p>To edit one of our lessons, click on the pencil edit button next to the title (ex: \"Code Haven Week 1\"). That will bring you to a GitHub Markdown editor, where you can edit the page and submit your changes as a pull request.</p>"
     "<p>If that sounds like nonsense to you, but you still want to submit feedback, no problem! <a href=\"mailto:codehavenyale@gmail.com\">Shoot us an email!</a></p>"),
    ("How has Code Haven used this curriculum in a classroom?",
     "<p>In classrooms where Code Haven teaches, we typically divide students into groups of around 4 and assign a mentor to each group. All of our small group discussions take place in these groups with the mentor facilitating, and each mentor also helps the students in their group as they work individually on the worksheet. All of our lectures, live coding, and unplugged activities are led by the classroom lead and bring the entire class together.</p>"),
    ("What are unplugged activities and debugging activities?",
     "<p>Unplugged activities are fun exercises that we do during our fall semester to teach students fundamental computer science concepts, without the use of a computer! We design these activities to relate each new concept with ideas that students already know from the real world. For example, we teach loops with a dance that repeats the same steps several times.</p>"
     "<p>We do debugging activities during the spring, when students start to work on their own projects. We believe that debugging is one of the most crucial skills that students can develop. We present the class with a version of an app that is clearly broken in some way, and encourage the students to think about where the code might be going wrong. Then we fix the broken code and show the students the functional app.</p>"),
]

faq = head("FAQs", "Frequently asked questions about the Code Haven curriculum.", "")
faq += header("", "faq")
faq += '''  <section class="hero">
    <h1>Frequently Asked Questions</h1>
    <p>Everything teachers and mentors ask us before bringing this curriculum into their own classroom.</p>
  </section>

  <div class="faq-list" style="margin-top: 3rem;">
'''
import re as _re
def slugify(s):
    s = s.lower().strip()
    s = _re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")

for i, (q, a) in enumerate(faqs):
    open_attr = " open" if i == 0 else ""
    faq += f'''    <details class="faq-item" id="{slugify(q)}"{open_attr}>
      <summary>{q}</summary>
      {a}
    </details>
'''
faq += '''    <div class="card" style="text-align:center;">
      <p style="margin:0;">Still have questions? Send us an email at <a href="mailto:codehavenyale@gmail.com">codehavenyale@gmail.com</a>.</p>
    </div>
  </div>

'''
faq += footer("")
faq += '''  <script>
    if (location.hash) {
      var target = document.querySelector(location.hash);
      if (target && target.tagName === 'DETAILS') {
        target.open = true;
        target.scrollIntoView({ block: 'center' });
      }
    }
  </script>
'''
faq += TAIL
write("faq.html", faq)

# ----------------------------------------------------------------
# guestbook.html
# ----------------------------------------------------------------

guestbook = head("Guestbook", "A live sandbox page — the same kind of page teachers edit to suggest curriculum changes.", "")
guestbook += header("", "guestbook")
guestbook += '''  <section class="hero">
    <h1>Guestbook</h1>
    <p>Every lesson on this site is just a page in a GitHub repository. This one exists purely for practice — edit it, break it, learn how the curriculum gets updated.</p>
  </section>

  <main>
    <div class="section" style="margin-top: 3rem;">
      <div class="card">
        <span class="section-eyebrow">?</span>
        <h2>Hello, world!</h2>
        <p>Make edits to this file to practice editing our curriculum! Below is what this page's source file looks like next to how it renders &mdash; the same split you'd see editing any lesson page.</p>
        <div class="sandbox-panel">
          <div>
            <span class="panel-label">Source (Markdown)</span>
            <pre># Big Title

## Subtitle

### Smaller Heading

Here is a sentence, with *italics* and with **bold text**.</pre>
          </div>
          <div>
            <span class="panel-label">Rendered</span>
            <div class="card" style="box-shadow:none; border-style:dashed; padding:1.25rem 1.5rem;">
              <h1 style="font-size:1.6rem; margin:0 0 .5rem;">Big Title</h1>
              <h2 style="font-size:1.25rem; margin:0 0 .5rem;">Subtitle</h2>
              <h3 style="font-size:1.05rem; margin:0 0 .75rem;">Smaller Heading</h3>
              <p style="margin:0;">Here is a sentence, with <em>italics</em> and with <strong>bold text</strong>.</p>
            </div>
          </div>
        </div>
        <div class="callout" style="margin-top:1.5rem;">
          On the live site, every page carries a pencil-edit link straight to GitHub — see <a href="faq.html">the FAQ</a> for how teachers turn a suggestion into a real curriculum change.
        </div>
      </div>
    </div>
  </main>

'''
guestbook += footer("")
guestbook += TAIL
write("guestbook.html", guestbook)

print("done: index.html, faq.html, guestbook.html")


