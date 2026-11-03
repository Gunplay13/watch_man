package com.watchdog.alert_service.domain.dtos;

import java.util.UUID;

public record AlertDto(UUID id, String channel, String message) {

}
