package com.cdac.service;

import com.cdac.dto.BillRequest;
import com.cdac.dto.BillResponse;

public interface BillService {
    BillResponse generateBill(BillRequest request);
}
