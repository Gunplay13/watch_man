package com.watchdog.alert_service.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchdog.alert_service.services.TelegramService;
import com.watchdog.alert_service.services.impl.TelegramServiceImpl;

@RestController
@RequestMapping("/api/v1/alert/telegram")
public class TelegramAlertController {

    private final TelegramService telegramSerivice;

    public TelegramAlertController(TelegramServiceImpl telegramSerivice) {
        this.telegramSerivice = telegramSerivice;
    }

    @PostMapping
    void sendAlert() {
        telegramSerivice.sendAlert(null, null);

    }

}
