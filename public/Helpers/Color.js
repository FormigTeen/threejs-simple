import { Vector3, Color } from 'three'

/**
 * @property {Color} aColor
 * @return {Vector3}
 */
export const toVector = (aColor) => new Vector3(aColor.r, aColor.g, aColor.b)
