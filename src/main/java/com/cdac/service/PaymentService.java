package com.cdac.service;

import com.cdac.dto.PaymentRequest;
import com.cdac.dto.PaymentResponse;

public interface PaymentService {
    PaymentResponse makePayment(PaymentRequest request);
}
