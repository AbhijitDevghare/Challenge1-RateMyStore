import UserStrategy from './UserStrategy.js';
import AdminStrategy from './AdminStrategy.js';
import StoreOwnerStrategy from './StoreOwner.js';

const authStrategyFactory = (role) => {
    switch (role) {
        case 'user':
            return new UserStrategy();
        case 'admin':
            return new AdminStrategy();
        case 'storeowner':
            return new StoreOwnerStrategy();
        default:
            throw new Error('Invalid role for registration');
    }
};

export default authStrategyFactory;
