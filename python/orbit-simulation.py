# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
#     check out the interactive web version at
# https://orbit-simulation-web.lubinpappalardo.repl.co/
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

import turtle
from math import sin, radians, cos, sqrt

# ---- VARIABLES ---- ---- ---- ---- ---- 

periapsis = 50
apoapsis = 300
eccentricity = 50 # %

# ---- ---- ---- ---- ---- ---- ---- ----

t = turtle.Turtle()
t.speed(0)

# draw the Earth
t.penup()
t.sety(-10)
t.pendown()
t.circle(10)
t.write("Earth")

# draw the periapsis and apoapsis line 
t.color("blue")
t.penup()
t.sety(-periapsis)
t.pendown()
t.circle(periapsis)
t.color("red")
t.penup()
t.sety(-apoapsis)
t.pendown()
t.circle(apoapsis)
t.color("black")
t.penup()

# write where the apoapsis is
t.goto(apoapsis, 0)
t.write(f"Apoapsis : {apoapsis}")
t.pendown()

# min foci : 0  |  max foci : (periapsis + apoapsis) / 4
foci = (eccentricity / 100) * ((periapsis + apoapsis) / 4)

# define the major axis of the ellipse
major_axis = periapsis + apoapsis
minor_axis = 2 * sqrt((major_axis / 2)**2 - foci**2)

print(f'minor_axis : {minor_axis} | major_axis : {major_axis}')

# draw the ellipse
for angle in range(0, 360):
    x = (major_axis / 2) * cos(radians(angle))
    y = (minor_axis / 2) * sin(radians(angle))
    t.goto(( x + (apoapsis - periapsis) / 2 ), y)
    if angle == 180:
      t.write(f"Periapsis : {periapsis}")

turtle.done()
