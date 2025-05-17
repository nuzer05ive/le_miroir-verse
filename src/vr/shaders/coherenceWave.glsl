#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
uniform float uZCM;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);
  float r = length(uv - 0.5);
  float a = atan(uv.y - 0.5, uv.x - 0.5) + uTime;

  // Spiral wave
  float waves = sin(10.0 * r - 6.283 * a);
  float ring = smoothstep(0.48, 0.5, abs(waves));

  // Mix with ZCM
  float brightness = mix(0.0, ring, uZCM);
  gl_FragColor = vec4(vec3(brightness), 1.0);
}