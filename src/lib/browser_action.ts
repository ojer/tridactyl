function addModelchangeListener() {
    browser.runtime.onMessage.addListener((message, sender) => {
        if (
            message.type === "TRIDACTYL_MODE_INDICATOR_CHANGE" &&
            sender?.tab?.id
        ) {
            const { indicatorText } = message
            const badgeText =
                indicatorText.length > 3
                    ? indicatorText.slice(0, 3)
                    : indicatorText
            const tabId = sender.tab.id
            browser.browserAction.setTitle({
                title: indicatorText,
                tabId,
            })

            browser.browserAction.setBadgeText({
                text: ` ${badgeText[0].toUpperCase()} `,
                tabId,
            })
            browser.browserAction.setBadgeTextColor({
                color: "#FFF",
                tabId,
            })
            browser.browserAction.setBadgeBackgroundColor({
                // color: "#389749",
                color: "#1f9947",
                tabId,
            })
            return Promise.resolve(1)
        }
    })
}

export { addModelchangeListener }
