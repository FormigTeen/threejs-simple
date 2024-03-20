export const isHasUpdate = (aObject) =>
    aObject !== undefined &&
    typeof aObject.getUuid === 'function' &&
    typeof aObject.onUpdate === 'function';
