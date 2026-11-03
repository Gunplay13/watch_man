package com.watchdog.alert_service.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchdog.alert_service.domain.dtos.AlertDto;
import com.watchdog.alert_service.services.AlertService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/alert")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    @PostMapping("/{channel}")
    public ResponseEntity<AlertDto> sendAlert(@PathVariable String channel, @RequestBody String message) {

        AlertDto alertDto = alertService.sendAlert(channel, message);

        return new ResponseEntity<>(alertDto, HttpStatus.OK);
    }

}
