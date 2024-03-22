import { Color, Vector3 } from 'three'

/**
 * @param {Vector3} aVector
 * @return {Color}
 */
export const toColor = (aVector) => new Color(aVector.x, aVector.y, aVector.z)
