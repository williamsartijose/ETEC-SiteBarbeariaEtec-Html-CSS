import module from "./tprUserPreferencesModalModule"

module.service("tprUserPreferencesRepository", [function () {
    const NOT_SHOW_SCHEDULE_MODAL_KEY = "notShowScheduleModalAgain"

    this.hasPreferences = (email) => {
        return !!localStorage.getItem(getStorageKey(email))
    }

    this.getPreferences = (email) => {
        return JSON.parse(localStorage.getItem(getStorageKey(email)))
    }

    this.savePreferences = (email, preferences) => {
        localStorage.setItem(getStorageKey(email), JSON.stringify(preferences))
    }

    this.saveVehicleAvailability = (email, vehicleAvailability) => {
        const userPreferences = JSON.parse(localStorage.getItem(getStorageKey(email)))
        userPreferences.vehicleAvailability = vehicleAvailability
        localStorage.setItem(getStorageKey(email), JSON.stringify(userPreferences))
    }

    this.getVehicleAvailability = (email) => {
        const vehicleAvailability = JSON.parse(localStorage.getItem(getStorageKey(email))).vehicleAvailability
        if (!vehicleAvailability) {
            return null
        }
        return vehicleAvailability
    }

    this.getOptionsAndRestrictions = (email) => {
        const routingConfig = JSON.parse(localStorage.getItem(getStorageKey(email))).routingConfig
        if (!routingConfig) {
            return null
        }
        return routingConfig
    }

    this.saveOptionsAndRestrictions = (email, options, restrictions) => {
        const userPreferences = JSON.parse(localStorage.getItem(getStorageKey(email)))
        userPreferences.routingConfig = { options: options, restrictions: restrictions }
        localStorage.setItem(getStorageKey(email), JSON.stringify(userPreferences))
    }

    function getStorageKey(email) {
        return `UserPreferences(${email})`
    }

    this.saveNotShowScheduleModalPreferences = () => {
        sessionStorage.setItem(NOT_SHOW_SCHEDULE_MODAL_KEY, "true")
    }

    this.getNotShowScheduleModalPreference = () => {
        return sessionStorage.getItem(NOT_SHOW_SCHEDULE_MODAL_KEY)
    }

    this.removeNotShowScheduleModalPreference = () => {
        sessionStorage.removeItem(NOT_SHOW_SCHEDULE_MODAL_KEY)
    }
}])