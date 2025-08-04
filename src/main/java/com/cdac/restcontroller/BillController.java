package com.cdac.restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.BillRequest;
import com.cdac.dto.BillResponse;
import com.cdac.service.BillService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PostMapping
    public ResponseEntity<BillResponse> createBill(@RequestBody BillRequest request) {
        BillResponse response = billService.generateBill(request);
        return ResponseEntity.ok(response);
    }
}
