import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "./firebase/messaging";

let fcmSetupInProgress = false;

export async function setupFCM(): Promise<void> {
  if (fcmSetupInProgress) return;
  fcmSetupInProgress = true;

  try {
    if (!("Notification" in window))
      return console.warn("Notification not supported.");

    const savedToken = sessionStorage.getItem("fcm_token");
    const savedPermission = sessionStorage.getItem("fcm_permission");

    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return console.warn("Permission denied.");
    }

    await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const token = await getToken(messaging, {
      vapidKey:
        "BP-blPpnIWjptmjtEUz6PVAeh_aACb0ue37pWBfLjWgWuD-e_vsDI9mNkLLBzbmkO8VYDEwE3kK4IfP9ZMdFCfg",
    });

    if (!token) return console.warn("No FCM token.");

    const trimmedToken = token.trim();
    const tokenChanged = savedToken !== trimmedToken;
    const permissionChanged = savedPermission !== Notification.permission;

    if (tokenChanged || permissionChanged) {
      sessionStorage.setItem("fcm_token", trimmedToken);
      sessionStorage.setItem("fcm_permission", Notification.permission);
      console.log("✅ FCM token saved/updated");
      // Call your backend API to register device if needed here
    } else {
      console.log("🔁 FCM token unchanged");
    }
  } catch (err) {
    console.error("❌ setupFCM error:", err);
  } finally {
    fcmSetupInProgress = false;
  }
}
