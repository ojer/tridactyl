function addModelchangeListener() {
    browser.runtime.onMessage.addListener((message, sender) => {
        if (
            message.type === "TRIDACTYL_MODE_INDICATOR_CHANGE" &&
            sender?.tab?.id
        ) {
            const tabId = sender.tab.id
            const { indicatorText } = message
            let badgeText = ""
            let backgroundColor = "green"
            switch (indicatorText) {
                case "insert":
                    badgeText = "I"
                    break
                case "hint":
                    badgeText = "H"
                    break
                case "gobble":
                    badgeText = "G"
                    break
                case "input":
                    badgeText = "I"
                    backgroundColor = "blue"
                    break
                case "visual":
                    badgeText = "V"
                    break
                case "nmode":
                    badgeText = "N"
                    break
                case "ignore":
                    badgeText = "I"
                    backgroundColor = "red"
                    break
                case "normal":
                    badgeText = ""
                    break
                default:
                    badgeText = ""
            }
            if (badgeText) {
                browser.browserAction.setBadgeText({
                    text: `${badgeText}`,
                    tabId,
                })
                browser.browserAction.setBadgeTextColor({
                    color: "#FFF",
                    tabId,
                })
                browser.browserAction.setBadgeBackgroundColor({
                    // color: "#389749",
                    color: backgroundColor,
                    tabId,
                })
            } else {
                browser.browserAction.setBadgeText({
                    text: "",
                    tabId,
                })
            }
            browser.browserAction.setTitle({
                title: indicatorText,
                tabId,
            })
            return Promise.resolve(1)
        }
    })
}

export { addModelchangeListener }
