/**
 *
 * @param {Object} data
 * @param {String} apiUrl
 * @param {String} apiKey
 */
export const updateNode = async (data, apiUrl, apiKey) => {
  const newData = structuredClone(data);

  delete newData.__v;
  delete newData.type;
  newData.id = data._id
  console.log(data);
  return await fetch(
    `${apiUrl}/v1/${data.type}s/update${capitalizeFirstLetter(data.type)}`,
    {
      method: "PUT",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }
  );
};

export const deleteNode = async (data, apiUrl, apiKey) => {
  return await fetch(
    `${apiUrl}/v1/${data.type}s/delete${capitalizeFirstLetter(data.type)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
      body: JSON.stringify({
        id: data._id
      }),
    }
  );
};

export const createNode = async (data, apiUrl, apiKey) => {
  const newData = structuredClone(data);

  delete newData.type;

  return await fetch(
    `${apiUrl}/v1/${data.type}s/create${capitalizeFirstLetter(data.type)}`,
    {
      method: "PUSH",
      headers: {
        Authorization: apiKey,
      },
      body: newData,
    }
  );
};

/**
 *
 * @param {String} apiUrl
 * @param {String} apiKey
 * @returns
 */
export const getNodes = async (apiUrl, apiKey) => {
  return await fetch(`${apiUrl}/v1/getNodes`, {
    headers: {
      Authorization: apiKey,
    },
  }).then((data) => data.json());
};

function capitalizeFirstLetter(word) {
  if (typeof word !== "string" || word.length === 0) {
    // Check if the input is not a string or an empty string
    return "Invalid input";
  }

  const firstLetter = word[0].toUpperCase(); // Get the first letter and capitalize it
  const restOfWord = word.slice(1); // Get the rest of the word (from the second character onwards)

  return firstLetter + restOfWord;
}
