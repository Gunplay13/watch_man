package com.watchdog.alert_service.services;

import java.util.UUID;

public interface TelegramService {

    void sendAlert(UUID chatId, String message);

}