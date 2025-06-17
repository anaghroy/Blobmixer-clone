// Include simplex noise implementation for 4D noise
#include simplexNoise4d.glsl

// Tangent vector for normal mapping
attribute vec3 tangent;

// Time uniform for animation
uniform float uTime;

// Controls for primary wave deformation
uniform float uPositionFrequency;    // Frequency of the main positional deformation
uniform float uPositionStrength;     // Amplitude of the main deformation
uniform float uTimeFrequency;        // Speed of the main deformation animation

// Controls for secondary smaller wave deformation
uniform float uSmallWavePositionFrequency;    // Frequency of the secondary wave
uniform float uSmallWavePositionStrength;     // Amplitude of the secondary wave
uniform float uSmallWaveTimeFrequency;        // Speed of the secondary wave animation

// Calculate blob deformation at a given position
float getBlob(vec3 position){
    // Store initial position
    vec3 wrappedPosition = position;
    
    // Add primary wave deformation
    wrappedPosition += simplexNoise4d(vec4(position * uPositionFrequency, uTime * uTimeFrequency))*uPositionStrength;
    
    // Add secondary wave deformation
    return simplexNoise4d(vec4(wrappedPosition * uSmallWavePositionFrequency, uTime * uSmallWaveTimeFrequency)) * uSmallWavePositionStrength;
}

void main() {
    // Calculate bitangent vector from normal and tangent
    vec3 bitangent = cross(normal, tangent.xyz);

    // Sample points for normal calculation
    float shift = 0.07;
    vec3 A = csm_Position + shift * tangent.xyz;
    vec3 B = csm_Position - shift * bitangent;

    // Apply blob deformation to vertex position
    float blob = getBlob(csm_Position);
    csm_Position += blob * normal;

    // Apply deformation to sample points
    A += getBlob(A) * normal;
    B += getBlob(B) * normal;

    // Calculate new vectors for normal reconstruction
    vec3 shadowA = normalize(A - csm_Position);
    vec3 shadowB = normalize(B - csm_Position);

    // Reconstruct normal from deformed surface
    csm_Normal = -cross(shadowA, shadowB);
}