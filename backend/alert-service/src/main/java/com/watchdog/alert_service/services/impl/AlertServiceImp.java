package com.watchdog.alert_service.services.impl;

import org.springframework.stereotype.Service;

import com.watchdog.alert_service.domain.dtos.AlertDto;
import com.watchdog.alert_service.services.AlertService;

@Service
public class AlertServiceImp implements AlertService {

    @Override
    public AlertDto sendAlert(String channel, String message) {
        return new AlertDto(null, channel, message);
    }

}
