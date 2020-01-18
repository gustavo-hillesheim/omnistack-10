const devRepository = require('../modules/dev');
const { parseStringToArray } = require('../utils/utils');

module.exports = {
  async list(req, res) {

    const { range, latitude, longitude, techs } = req.query;
    const users = await devRepository.find({
      techs: { $in: parseStringToArray(techs) },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [ longitude, latitude ]
          },
          $maxDistance: range || 10000
        }
      }
    });
    return res.json(users);
  }
}