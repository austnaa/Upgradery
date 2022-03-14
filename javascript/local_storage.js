// contains helper methods for loading and storing data locally. (not currently used)

const SPEED_LEVEL_KEY = 'SPEED';
const JUMP_LEVEL_KEY = 'JUMP';
const HEALTH_LEVEL_KEY = 'HEALTH';
const TIME_LEVEL_KEY = 'TIME';
const AMMO_LEVEL_KEY = 'AMMO';
const SHOOT_SPEED_LEVEL_KEY = 'SHOOT SPEED';
const MULTIPLIER_LEVEL_KEY = 'MULTIPLIER';
const CASH_KEY = 'CASH';

/**
 * Returns a JSON that contains the important information for this user.
 * If the user has no saved data, return default values.
 */
function loadData() {
    const storage = window.localStorage;

    let speedLvl = storage.getItem(SPEED_LEVEL_KEY);
    let jumpLvl = storage.getItem(JUMP_LEVEL_KEY);
    let healthLvl = storage.getItem(HEALTH_LEVEL_KEY);
    let timeLvl = storage.getItem(TIME_LEVEL_KEY); 
    let ammoLvl = storage.getItem(AMMO_LEVEL_KEY);
    let shootSpeedLvl = storage.getItem(SHOOT_SPEED_LEVEL_KEY);
    let multiplierLvl = storage.getItem(MULTIPLIER_LEVEL_KEY);
    let cash = parseInt(storage.getItem(CASH_KEY));

    // if any values are null, return default data
    if (speedLvl == null || jumpLvl == null || healthLvl == null || timeLvl == null || 
            ammoLvl == null || shootSpeedLvl == null || multiplierLvl == null || cash == null) {
                print("default vals")
        cash = 10;
        speedLvl = 0;
        jumpLvl = 0;
        healthLvl = 0;
        timeLvl = 0;
        ammoLvl = 0;
        shootSpeedLvl = 0;
        multiplierLvl = 0;
    }
    
    return {
        cash: cash,
        speedLevel: speedLvl,
        jumpLevel: jumpLvl,
        healthLevel: healthLvl,
        timeLevel: timeLvl,
        ammoLevel: ammoLvl,
        shootSpeedLevel: shootSpeedLvl,
        multiplierLevel: multiplierLvl
    };
}

/**
 * Stores the data into local browser storage
 */
function storeData(upgradeLevelJSON) {
    const storage = window.localStorage;
    storage.setItem(CASH_KEY, upgradeLevelJSON.cash);
    storage.setItem(SPEED_LEVEL_KEY, upgradeLevelJSON.speedLevel);
    storage.setItem(JUMP_LEVEL_KEY, upgradeLevelJSON.jumpLevel);
    storage.setItem(HEALTH_LEVEL_KEY, upgradeLevelJSON.healthLevel);
    storage.setItem(TIME_LEVEL_KEY, upgradeLevelJSON.timeLevel);
    storage.setItem(AMMO_LEVEL_KEY, upgradeLevelJSON.ammoLevel);
    storage.setItem(SHOOT_SPEED_LEVEL_KEY, upgradeLevelJSON.shootSpeedLevel);
    storage.setItem(MULTIPLIER_LEVEL_KEY , upgradeLevelJSON.multiplierLevel);
}

/**
 * Clears the saved data
 */
function resetData() {
    
    storeData({
        cash: 5,
        speedLevel: 0,
        jumpLevel: 0,
        healthLevel: 0,
        timeLevel: 0,
        ammoLevel: 0,
        shootSpeedLevel: 0,
        multiplierLevel: 0
    });
}


loadData();