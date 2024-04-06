export const getCanvas = () => window.document.querySelector("canvas")

export const getAspect = () => window.innerWidth / window.innerHeight;

export const getLocalFile = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load the shader: ${response.statusText}`);
    }
    return await response.text();
}