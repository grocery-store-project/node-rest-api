exports.getOrder = (sort) => {
    switch (sort) {
        case '1':
            return [['price', 'ASC']];
        case '2':
            return [['price', 'DESC']];
        case '3':
            return [['createdAt', 'ASC']];
        case '4':
            return [['createdAt', 'DESC']];
        default:
            return [['id', 'ASC']];
    }
}