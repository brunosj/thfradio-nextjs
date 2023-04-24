export default async function () {
    let i = 0; // start with the first page
    let mixcloudShows = []; // array to store all results
  
      while (true) {
        const res = await fetch(`${process.env.MIXCLOUD_API}?offset=${i*100}&limit=9999`);
        const resJSON = await res.json();
        console.log(i, resJSON.data.length)
        mixcloudShows = mixcloudShows.concat(resJSON.data);
  
        if (resJSON.data.length < 100) {
          // if the number of items in the response is less than the limit, we've reached the last page
          break;
        }
  
        i++;
      }
      return mixcloudShows
};