from werkzeug.security import generate_password_hash
from app.models import db, Exercise


def seed_exercises():

    pushups = Exercise(title="Push Ups",
                       muscle_group="Chest, Shoulders, Triceps, Abs",
                       difficulty="1",
                       description='''1. Start in a high plank position
                                To get into a plank, place hands firmly on the
                                floor, directly under shoulders. Ground toes
                                into the floor to stabilize your lower half.

                                Brace core (tighten abs as if preparing to
                                take a punch), engage glutes and hamstrings,
                                and flatten your back so your entire body is
                                neutral and straight.

                                2. Lower your body
                                Keep back flat and eyes focused about 3 feet
                                in front of you. Maintain a neutral neck and
                                lower your body until chest grazes the floor.

                                Don’t let your butt dip or stick out at any
                                point during the move — your body should stay
                                in a straight line from head to toe.

                                Draw shoulder blades back and down, keeping
                                elbows tucked close to your body (don’t “T”
                                your arms).

                                3. Push back up
                                Keeping core engaged, exhale as you push back
                                to starting position. Pro tip: Imagine you’re
                                screwing your hands into the floor as you push
                                back up. Repeat for 10–20 reps or as many as
                                you can do with good form.
                                ''',
                       video_url="https://www.youtube.com/watch?v=IODxDxX7oi4")

    mountainClimbers = Exercise(title="Mountain Climbers",
                                muscle_group="Abs / Back",
                                difficulty="1",
                                description='''The plank (also called a front
                                hold, hover, or abdominal bridge) is an
                                isometric core strength exercise that involves
                                maintaining a position similar to a push-up
                                for the maximum possible time.''',
                                video_url="https://www.youtube.com/watch?v=cnyTQDSE884")

    pullups = Exercise(title="Pull-ups",
                       muscle_group="Shoulders / Back",
                       difficulty="3",
                       description='''Hold a pull-up bar with an overhand grip,
                                    hands shoulder-width apart. Brace your
                                    core, then pull yourself up until your
                                    lower chest touches the bar. Lower until
                                    your arms are straight again.''',
                       video_url="https://www.youtube.com/watch?v=3YvfRx31xDE")

    planks = Exercise(title="Planks",
                      muscle_group="Abs, Back",
                      difficulty="1",
                      description='''Plant hands directly under shoulders
                                    (slightly wider than shoulder width) like
                                    you’re about to do a push-up.
                                    Ground toes into the floor and squeeze
                                    glutes to stabilize your body. Your legs
                                    should be working, too — be careful not to
                                    lock or hyperextend your knees.
                                    Neutralize your neck and spine by looking
                                    at a spot on the floor about a foot beyond
                                    your hands. Your head should be in line
                                    with your back.
                                    Hold the position for 20 seconds. As you
                                    get more comfortable with the move, hold
                                    your plank for as long as possible without
                                    compromising your form or breath.''',
                      video_url="https://www.youtube.com/watch?v=ASdvN_XEl_c")

    jumpingJacks = Exercise(title="Jumping Jacks",
                            muscle_group="Who knows?",
                            difficulty="1",
                            description="Just flail around. Vigorously.",
                            video_url="https://www.youtube.com/watch?v=1b98WrRrmUs")

    squatJumps = Exercise(title="Squat Jumps",
                          muscle_group="GLUTES",
                          difficulty="2",
                          description='''Bend over, and then don't bend
                                        over. Then do that again.''',
                          video_url="https://www.youtube.com/watch?v=A-cFYWvaHr0")

    situps = Exercise(title="Situps",
                      muscle_group="Abs",
                      difficulty="2",
                      description='''Sit on the ground, lean back,
                                    then sit. up.''',
                      video_url="https://www.youtube.com/watch?v=jDwoBqPH0jk")

    crunches = Exercise(title="Crunches",
                        muscle_group="Abs",
                        difficulty="2",
                        description='''They're like situps,
                                    but this time, CRUNCH IT.''',
                        video_url="https://www.youtube.com/watch?v=Xyd_fa5zoEU")

    lunges = Exercise(title="Lunges",
                      muscle_group='''Quads / Hammies / Gluteous Maximus /
                                    The back-area / abs.''',
                      difficulty="2",
                      description='''Lunge to the right, keeping the left leg
                      straight, shifting the hips over the right foot. Make
                      sure to send the hips back to engage the glutes. At the
                      same time, lift the weight straight up to shoulder level.
                      Lower the weight, go back to start and repeat to the
                      other side.''',
                      video_url="https://www.youtube.com/watch?v=QOVaHwm-Q6U")

    benchPress = Exercise(title="Bench Press",
                          muscle_group="Chest / Triceps",
                          difficulty="3",
                          description="Lift things up and put them down.",
                          video_url="https://www.youtube.com/watch?v=-MAABwVKxok")

    latPulldowns = Exercise(title="Lat Pulldowns",
                            muscle_group="Lats",
                            difficulty="2",
                            description="Pull it down and let it go.",
                            video_url="https://www.youtube.com/watch?v=CAwf7n6Luuc")

    dumbBellPress = Exercise(title="Dumbbell Press",
                             muscle_group="Chest / Triceps",
                             difficulty="3",
                             description='''Like bench press, but with
                                        dumbbells.''',
                             video_url="https://www.youtube.com/watch?v=xphvjGDZeYE")

    legExtensions = Exercise(title="Leg Extensions",
                             muscle_group="Quads",
                             difficulty="2",
                             description='''The leg press is a compound weight
                             training exercise in which the individual pushes
                             a weight or resistance away from them using their
                             legs. The term leg press machine refers to the
                             apparatus used to perform this exercise.''',
                             video_url="https://www.youtube.com/watch?v=tTbJBUKnWU8")

    bicepCurls = Exercise(title="Bicep Curls",
                          muscle_group="Biceps",
                          difficulty="2",
                          description="Those guns should be illegal.",
                          video_url="https://www.youtube.com/watch?v=in7PaeYlhrM")

    tricepsPushdowns = Exercise(title="Triceps Pushdowns",
                                muscle_group="Triceps",
                                difficulty="2",
                                description='''A pushdown is a strength
                                training exercise used for strengthening the
                                triceps muscles. The exercise is completed by
                                pushing an object downward against resistance.
                                This exercise is an example of the primary
                                function of the triceps, extension of the
                                elbow joint.''',
                                video_url="https://www.youtube.com/watch?v=NtsMXK8rxX0")

    tricepsDip = Exercise(title="Tricep Dips",
                          muscle_group="Triceps",
                          difficulty="4",
                          description='''hold your entire body weight up with
                          your arms extended and feet hovering over the floor,
                          ankles crossed. Lower your body until your elbows
                          reach a 90-degree angle before returning to your
                          starting position.''',
                          video_url="https://www.youtube.com/watch?v=6kALZikXxLc")

    bentOverRow = Exercise(title="Bent Over Row",
                           muscle_group="Shoulders",
                           difficulty="2",
                           description="Bend over and row.",
                           video_url="https://www.youtube.com/watch?v=HE5IBnWYEq4")

    squats = Exercise(title="Squats",
                      muscle_group="Moderate",
                      difficulty="3",
                      description="Bend over.",
                      video_url="https://www.youtube.com/watch?v=U3HlEF_E9fo")

    cleanJerk = Exercise(title="Clean and Jerk",
                         muscle_group="All of them.",
                         difficulty="5",
                         description='''Do you yell at the gym a lot? Do you
                         want to? If you answered 'yes' to either of those
                         questions, then this is the exercise for you!''',
                         video_url="https://www.youtube.com/watch?v=IcCGLoNqN2U")

    latRaise = Exercise(title="Lat Raise",
                        muscle_group="Lats",
                        difficulty="3",
                        description='''Who the hell even knows?''',
                        video_url="https://www.youtube.com/watch?v=WJm9zA2NY8E")

    jogging = Exercise(title="Running",
                       muscle_group="Cardio",
                       difficulty="1",
                       description='''One foot in front of the other,
                                    really fast.''',
                       video_url="https://www.youtube.com/watch?v=_kGESn8ArrU")

    cycling = Exercise(title="Bicycling",
                       muscle_group="Cardio",
                       difficulty="1",
                       description='''An excuse to wear really, really
                                    tight shorts.''',
                       video_url="https://www.youtube.com/watch?v=4ssLDk1eX9w")

    db.session.add(pushups)
    db.session.add(mountainClimbers)
    db.session.add(pullups)
    db.session.add(planks)
    db.session.add(jumpingJacks)
    db.session.add(squatJumps)
    db.session.add(situps)
    db.session.add(crunches)
    db.session.add(lunges)
    db.session.add(benchPress)
    db.session.add(latPulldowns)
    db.session.add(dumbBellPress)
    db.session.add(legExtensions)
    db.session.add(bicepCurls)
    db.session.add(tricepsPushdowns)
    db.session.add(tricepsDip)
    db.session.add(bentOverRow)
    db.session.add(squats)
    db.session.add(latRaise)

    db.session.commit()


def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()
