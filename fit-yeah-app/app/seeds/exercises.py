from werkzeug.security import generate_password_hash
from app.models import db, Exercise


def seed_exercises():

    pushups = Exercise(title="Push Ups",
                       muscle_group="Resistance",
                       difficulty="1",
                       description='''Get down on all fours, placing your
                                    hands slightly wider than your shoulders.
                                    Straighten your arms and legs. Lower your
                                    body until your chest nearly touches the
                                    floor. Pause, then push yourself back up.
                                    Repeat.''',
                       video_url="https://www.youtube.com/watch?v=IODxDxX7oi4")

    mountainClimbers = Exercise(title="Mountain Climbers",
                                muscle_group="Resistance",
                                difficulty="1",
                                description='''The plank (also called a front
                                hold, hover, or abdominal bridge) is an
                                isometric core strength exercise that involves
                                maintaining a position similar to a push-up
                                for the maximum possible time.''',
                                video_url="https://www.youtube.com/watch?v=cnyTQDSE884")

    pullups = Exercise(title="Pull-ups",
                       muscle_group="Resistance",
                       difficulty="3",
                       description='''Hold a pull-up bar with an overhand grip,
                                    hands shoulder-width apart. Brace your
                                    core, then pull yourself up until your
                                    lower chest touches the bar. Lower until
                                    your arms are straight again.''',
                       video_url="https://www.youtube.com/watch?v=3YvfRx31xDE")

    planks = Exercise(title="Planks",
                      muscle_group="Resistance",
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
                            muscle_group="Resistance",
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
                      muscle_group="Resistance",
                      difficulty="2",
                      description='''Sit on the ground, lean back,
                                    then sit. up.''',
                      video_url="https://www.youtube.com/watch?v=jDwoBqPH0jk")

    crunches = Exercise(title="Crunches",
                        muscle_group="Resistance",
                        difficulty="1",
                        description='''They're like situps,
                                    but this time, CRUNCH IT.''',
                        video_url="https://www.youtube.com/watch?v=Xyd_fa5zoEU")

    lunges = Exercise(title="Lunges",
                      muscle_group='''Resistance''',
                      difficulty="2",
                      description='''Lunge to the right, keeping the left leg
                      straight, shifting the hips over the right foot. Make
                      sure to send the hips back to engage the glutes. At the
                      same time, lift the weight straight up to shoulder level.
                      Lower the weight, go back to start and repeat to the
                      other side.''',
                      video_url="https://www.youtube.com/watch?v=QOVaHwm-Q6U")

    benchPress = Exercise(title="Bench Press",
                          muscle_group="Added Weight",
                          difficulty="3",
                          description="Lift things up and put them down.",
                          video_url="https://www.youtube.com/watch?v=-MAABwVKxok")

    latPulldowns = Exercise(title="Lat Pulldowns",
                            muscle_group="Added Weight",
                            difficulty="2",
                            description="Pull it down and let it go.",
                            video_url="https://www.youtube.com/watch?v=CAwf7n6Luuc")

    dumbBellPress = Exercise(title="Dumbbell Press",
                             muscle_group="Added Weight",
                             difficulty="3",
                             description='''Like bench press, but with
                                        dumbbells.''',
                             video_url="https://www.youtube.com/watch?v=xphvjGDZeYE")

    legExtensions = Exercise(title="Leg Extensions",
                             muscle_group="Added Weight",
                             difficulty="2",
                             description='''The leg press is a compound weight
                             training exercise in which the individual pushes
                             a weight or resistance away from them using their
                             legs. The term leg press machine refers to the
                             apparatus used to perform this exercise.''',
                             video_url="https://www.youtube.com/watch?v=tTbJBUKnWU8")

    bicepCurls = Exercise(title="Bicep Curls",
                          muscle_group="Added Weight",
                          difficulty="2",
                          description="Those guns should be illegal.",
                          video_url="https://www.youtube.com/watch?v=in7PaeYlhrM")

    tricepsPushdowns = Exercise(title="Triceps Pushdowns",
                                muscle_group="Added Weight",
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
                          muscle_group="Resistance",
                          difficulty="4",
                          description='''hold your entire body weight up with
                          your arms extended and feet hovering over the floor,
                          ankles crossed. Lower your body until your elbows
                          reach a 90-degree angle before returning to your
                          starting position.''',
                          video_url="https://www.youtube.com/watch?v=6kALZikXxLc")

    bentOverRow = Exercise(title="Bent Over Row",
                           muscle_group="Added Weight",
                           difficulty="2",
                           description="Bend over and row.",
                           video_url="https://www.youtube.com/watch?v=HE5IBnWYEq4")

    squats = Exercise(title="Squats",
                      muscle_group="Added Weight",
                      difficulty="3",
                      description="Bend over.",
                      video_url="https://www.youtube.com/watch?v=U3HlEF_E9fo")

    cleanJerk = Exercise(title="Clean and Jerk",
                         muscle_group="Added Weight",
                         difficulty="5",
                         description='''Do you yell at the gym a lot? Do you
                         want to? If you answered 'yes' to either of those
                         questions, then this is the exercise for you!''',
                         video_url="https://www.youtube.com/watch?v=IcCGLoNqN2U")

    latRaise = Exercise(title="Lat Raise",
                        muscle_group="Added Weight",
                        difficulty="3",
                        description='''Stand or sit with a dumbbell in each
                                    hand at your sides. Keep your back
                                    straight, brace your core, and then slowly
                                    lift the weights out to the side until
                                    your arms are parallel with the floor,
                                    with the elbow slightly bent. Then lower
                                    them back down, again in measured fashion.
                                    ''',
                        video_url="https://www.youtube.com/watch?v=WJm9zA2NY8E")

    overheadDumbbellPress = Exercise(title="Overhead Dumbbell Press",
                                     muscle_group="Added Weight",
                                     difficulty="3",
                                     description='''Stand or sit with a
                                     dumbbell in each hand at your sides. Keep
                                     your back straight, brace your core, and
                                     then slowly lift the weights out to the
                                     side until your arms are parallel with
                                     the floor, with the elbow slightly bent.
                                     Then lower them back down, again in
                                     measured fashion.''',
                                     video_url="https://www.youtube.com/watch?v=M2rwvNhTOu0")

    dumbbellFlys = Exercise(title="Dumbbell Chest Flys",
                            muscle_group="Added Weight",
                            difficulty="3",
                            description='''Lie on a flat surface, whether it’s
                                        the floor or a bench. Hold a dumbbell
                                        in each hand, above you. Your palms
                                        should be facing each other, but the
                                        dumbbells shouldn’t be touching. If
                                        you’re on the floor, then bend at the
                                        knees so that your feet are flat on
                                        the floor. Lower the weight slowly by
                                        opening your arms to either side. Go
                                        as far as comfortable but don’t worry
                                        about going too deep. The magic
                                        happens at the top of the exercise,
                                        not the bottom.''',
                            video_url="https://www.youtube.com/watch?v=QENKPHhQVi4")

    cableCrossover = Exercise(title="Cable Crossover",
                              muscle_group="Added Weight",
                              difficulty="3",
                              description='''Lie on a flat surface, whether
                                            it’s the floor or a bench. Hold a
                                            dumbbell in each hand, above you.
                                            Your palms should be facing each
                                            other, but the dumbbells shouldn’t
                                            be touching. If you’re on the
                                            floor, then bend at the knees so
                                            that your feet are flat on the
                                            floor. Lower the weight slowly by
                                            opening your arms to either side.
                                            Go as far as comfortable but don’t
                                            worry about going too deep. The
                                            magic happens at the top of the
                                            exercise, not the bottom.''',
                              video_url="https://www.youtube.com/watch?v=taI4XduLpTk")

    burpees = Exercise(title="Burpees",
                       muscle_group="Resistance",
                       difficulty="2",
                       description='''Start by standing upright with your feet
                       shoulder-width apart and your arms down at your sides.
                       With your hands out in front of you, start to squat
                       down. When your hands reach the ground, pop your legs
                       straight back into a pushup position. Jump your feet up
                       to your palms by hinging at the waist. Get your feet as
                       close to your hands as you can get, landing them
                       outside your hands if necessary. Stand up straight,
                       bringing your arms above your head and jump. This is
                       one rep. Complete 3 sets of 10 reps as a beginner.''',
                       video_url="https://www.youtube.com/watch?v=qLBImHhCXSw")

    skullCrushers = Exercise(title="Skull Crushers",
                             muscle_group="Added Weight",
                             difficulty="2",
                             description='''Start by standing upright with
                             your feet shoulder-width apart and your arms down
                             at your sides. With your hands out in front of
                             you, start to squat down. When your hands reach
                             the ground, pop your legs straight back into a
                             pushup position. Jump your feet up to your palms
                             by hinging at the waist. Get your feet as close
                             to your hands as you can get, landing them
                             outside your hands if necessary. Stand up
                             straight, bringing your arms above your head and
                             jump. This is one rep. Complete 3 sets of 10 reps
                             as a beginner.''',
                             video_url="https://www.youtube.com/watch?v=VP9Qp72zZ_c")

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

    dayOff = Exercise(id=28,
                      title="Day Off",
                      muscle_group="none",
                      difficulty=0,
                      description="Take a day off, you deserve it!",
                      video_url="https://giphy.com/gifs/southparkgifs-l0HlPtbGpcnqa0fja")

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
    db.session.add(jogging)
    db.session.add(cycling)
    db.session.add(skullCrushers)
    db.session.add(burpees)
    db.session.add(cableCrossover)
    db.session.add(dumbbellFlys)
    db.session.add(overheadDumbbellPress)
    db.session.add(cleanJerk)
    db.session.add(dayOff)

    db.session.commit()


def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()
