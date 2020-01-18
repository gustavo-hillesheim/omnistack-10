const axios = require('axios');

const devRepository = require('../modules/dev');
const { parseStringToArray } = require('../utils/utils');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async store(req, res) {

    const { github_username, techs, latitude, longitude } = req.body;
    
    let user = await devRepository.findOne({ github_username });

    if (!user) {
      const githubApiUrl = `https://api.github.com/users/${github_username}`;
      const githubResponde = await axios.get(githubApiUrl);
      
      const { name = login, bio, avatar_url } = githubResponde.data;
    
      const location = {
        type: 'Point',
        coordinates: [ longitude, latitude ]
      };
      const techsArray = parseStringToArray(techs);

      user = {
        name,
        bio,
        avatar_url,
        github_username,
        location,
        techs: techsArray
      };
      user = await devRepository.create(user);

      const sendMessageTo = findConnections({ latitude, longitude }, techsArray);
      sendMessage(sendMessageTo, 'new-dev', user);
    }

    return res.json(user);
  },
  async list(req, res) {

    const users = await devRepository.find();
    return res.json(users);
  }
}