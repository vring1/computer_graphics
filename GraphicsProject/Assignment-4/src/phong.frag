#version 330 core

uniform vec3 AmbientLightColor;
uniform vec3 LightPosition;
uniform vec3 LightColor;

uniform vec3 EyePosition;

uniform vec3  AmbientColor;
uniform vec3  DiffuseColor;
uniform vec3  SpecularColor;
uniform float Shininess;

in vec3 WorldVertex;
in vec3 WorldNormal;

out vec4 FragColor;

void main() {
    vec3 color = vec3(0.0f);
    color += AmbientLightColor * AmbientColor;

    vec3 N = normalize(WorldNormal);
    vec3 L = normalize(LightPosition - WorldVertex);
    vec3 V = normalize(EyePosition - WorldVertex);
    vec3 R = reflect(-L, N);

    float dotLN = dot(L, N);
    if(dotLN > 0) {
        color += LightColor * DiffuseColor * dotLN;
    }
    if(dot(R, V) > 0) {
        color += LightColor * SpecularColor * pow(dot(R, V), Shininess);
    }

    FragColor = vec4(color, 1.0f);
}
