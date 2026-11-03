package com.watchdog.alert_service.services;

import com.watchdog.alert_service.domain.dtos.AlertDto;

public interface AlertService {

    AlertDto sendAlert(String channel, String message);

}
