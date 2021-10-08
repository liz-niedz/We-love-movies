const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
  });

function read(review_id) {
    return knex("reviews")
    .select("*")
    .where({ review_id }).first();
}

function update(updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*")
  }

  function getUpdatedRecord(reviewId) {
      return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("*")
      .where({ review_id: reviewId})
      .first()
      .then((result)=> {
          const updatedRecord = addCritic(result);
          updatedRecord.critic_id = updatedRecord.critic.critic_id;
          return updatedRecord; 
      })
  }

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

module.exports = {
    read,
    update,
    getUpdatedRecord,
    delete: destroy,
}
