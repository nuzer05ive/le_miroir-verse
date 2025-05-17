# Generates a phi spiral viewfinder grid for O³ × Rood visualizations
import matplotlib.pyplot as plt
import numpy as np

phi = (1 + 5 ** 0.5) / 2
theta = np.linspace(0, 8 * np.pi, 888)
r = phi ** (theta / (2 * np.pi))

x = r * np.cos(theta)
y = r * np.sin(theta)

plt.figure(figsize=(8,8))
plt.plot(x, y, color='dodgerblue')
plt.axis('equal')
plt.title('Phi Spiral Viewfinder Grid')
plt.show()