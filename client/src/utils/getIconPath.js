const ArrowColor = {
    DARK: 'DARK',
    LIGHT: 'LIGHT'
}

const IconName = {
    MAP: 'MAP',
    SEARCH: 'SEARCH',
    AVATAR: 'AVATAR'
}

const icons = new Map([
    [IconName.MAP, '../src/assets/icons/map.svg'],
    [IconName.SEARCH, '../src/assets/icons/search.svg'],
    [IconName.AVATAR, '../src/assets/icons/avatar.svg'],
])

const getIconPath = (icon) => {
    return icons.get(icon) || "/assets/icons/address.svg"
}

export { IconName, ArrowColor, getIconPath }; 