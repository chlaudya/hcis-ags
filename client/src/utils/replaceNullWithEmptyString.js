export function replaceNullWithEmptyString(obj) {
  if (Array.isArray(obj)) {
    // If obj is an array, return it as is
    return obj;
  }

  const modifiedObject = { ...obj };
  for (const key in modifiedObject) {
    if (modifiedObject.hasOwnProperty(key)) {
      if (modifiedObject[key] === null) {
        modifiedObject[key] = '';
      } else if (typeof modifiedObject[key] === 'object' && modifiedObject[key] !== null) {
        modifiedObject[key] = replaceNullWithEmptyString(modifiedObject[key]); // Recursive call for nested objects
      }
    }
  }

  return modifiedObject;
}
