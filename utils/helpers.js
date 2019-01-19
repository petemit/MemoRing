const NOTIFICATION_KEY = "MemoRing:notifications";
const NOTIFICATION_CHANNEL_KEY = "MemoRing_Channel";
import { Notifications, Permissions } from "expo";
import { AsyncStorage, Platform } from "react-native";

export function clearAllNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

//Inspired by the Udacifitness setLocalNotification method
export function setReminderNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                //get permission to send notifications
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            //Will add channel for Android Oreo
                            addChannelIfNecessary();
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(16);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    tomorrow,
                                    repeat: "day"
                                }
                            );
                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true)
                            );
                        }
                    }
                );
            }
        });
}

function createNotification() {
    return {
        title: `Don't forget to MemoRing!`,
        body: "Study some quizzes before the day is over",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            channelId: NOTIFICATION_CHANNEL_KEY,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    };
}

function addChannelIfNecessary() {
    if (Platform.OS === "android") {
        Expo.Notifications.createChannelAndroidAsync(NOTIFICATION_CHANNEL_KEY, {
            name: "MemoRing Reminders",
            sound: true
        });
    }
}
