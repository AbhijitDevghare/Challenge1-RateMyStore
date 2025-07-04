import { ratingService } from "../services/index.js";

class RatingController
{
    async getRatingByUserId(req,res,next)
    {
        try {
            const userId = req.user.id
            const ratings= await ratingService.getRatingByUserId(userId);
            res.status(200).json({
                ratings
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new RatingController();