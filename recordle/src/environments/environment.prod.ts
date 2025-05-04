export const environment = {
  production: true,
  goLiveDate: '2022-05-22',
  baseUrl: 'https://popidle.the-sound.co.uk/',
  //dataUrl: "https://v6qz2c5y.apicdn.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22album%22%5D%7B%0A%20%20'id'%3A%20gameId%2C%0A%20%20artist%2C%0A%20%20albumTitle%2C%0A%20%20embedKey%2C%0A%20%20'coverArt'%3A%20coverArt.asset-%3Eurl%0A%7D"
  dataUrl: "https://v6qz2c5y.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22album%22+%26%26+defined%28gameAppearances%5B%5D%29%5D%0A%7B%0A++_id%2C%0A++artist%2C%0A++albumTitle%2C%0A++year%2C%0A++embedKey%2C%0A++coverArt%2C%0A++gameAppearances%5B%5D%7B%0A++++%22id%22%3A+gameNumber%2C%0A++++%22artist%22%3A+%5E.artist%2C%0A++++%22albumTitle%22%3A+%5E.albumTitle%2C%0A++++%22year%22%3A+%5E.year%2C%0A++++%22embedKey%22%3A+%5E.embedKey%2C%0A++++%22coverArt%22%3A+%5E.coverArt.asset-%3Eurl%2C%0A++++gameType%0A++%7D%0A%7D.gameAppearances%5BgameType+%3D%3D+%27original%27%5D%0A%7C+order%28albumTitle%2C+gameId%29"
};
