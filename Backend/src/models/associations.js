import User from './User.js';
import Admin from './Admin.js';
import StoreOwner from './StoreOwner.js';
import Rating from './Rating.js';

User.hasMany(Rating, { as: 'ratings', foreignKey: 'userId' });
StoreOwner.hasMany(Rating, { as: 'storeRatings', foreignKey: 'storeOwnerId' });

Rating.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Rating.belongsTo(StoreOwner, { as: 'storeOwner', foreignKey: 'storeOwnerId' });

export { User, Admin, StoreOwner, Rating };
