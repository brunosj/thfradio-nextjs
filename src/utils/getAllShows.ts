const getAllShows = async () => {
  const limit = 100; // limit of items per page
  const pages = Math.ceil(1500 / limit); // number of pages to fetch
  const promises = [];

  for (let i = 0; i < pages; i++) {
    const promise = fetch(
      `${process.env.MIXCLOUD_API}?offset=${i * limit}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => data.data);

    promises.push(promise);
  }

  const results = await Promise.all(promises);

  return results.flat();
};

export default getAllShows;
