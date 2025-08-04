package com.cdac.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.cdac.custom_exception.ResourceNotFoundException;
import com.cdac.dto.BillRequest;
import com.cdac.dto.BillResponse;
import com.cdac.entites.Bill;
import com.cdac.entites.Order;
import com.cdac.entites.Payment;
import com.cdac.repository.BillRepository;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public BillResponse generateBill(BillRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", request.getOrderId()));

        Payment payment = paymentRepository.findById(request.getPaymentId())
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", request.getPaymentId()));

        double totalAmount = payment.getAmount();
        double grandTotal = totalAmount + request.getTax();

        Bill bill = Bill.builder()
                .order(order)
                .payment(payment)
                .totalAmount(totalAmount)
                .tax(request.getTax())
                .grandTotal(grandTotal)
                .billingTime(LocalDateTime.now())
                .build();

        Bill savedBill = billRepository.save(bill);  
        return BillResponse.builder()
                .id(savedBill.getId())
                .orderId(savedBill.getOrder().getId())
                .paymentId(savedBill.getPayment().getId())
                .totalAmount(savedBill.getTotalAmount())
                .tax(savedBill.getTax())
                .grandTotal(savedBill.getGrandTotal())
                .billingTime(savedBill.getBillingTime())
                .build();
    }
}
